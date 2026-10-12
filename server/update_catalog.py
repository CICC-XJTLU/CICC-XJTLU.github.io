#!/usr/bin/env python3
"""Refresh the publication catalogue and dated news from public scholarly metadata."""
from __future__ import annotations
import argparse, calendar, datetime as dt, hashlib, json, os, re, sys, time
from pathlib import Path
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor, as_completed

UA = 'CICC-Platform-Publications/1.0 (+https://cicc-xjtlu.github.io/)'

def load(path, default=None):
    return json.loads(Path(path).read_text(encoding='utf-8-sig')) if Path(path).exists() else default

def save(path, value):
    path=Path(path); path.parent.mkdir(parents=True,exist_ok=True)
    temp=path.with_suffix(path.suffix+'.tmp')
    temp.write_bytes((json.dumps(value,ensure_ascii=False,indent=2)+'\n').encode('utf-8'))
    os.replace(temp,path)

def norm(value):
    return re.sub(r'[^\w]+','',value.casefold(),flags=re.UNICODE)

def doi_norm(value):
    value=re.sub(r'^https?://(?:dx\.)?doi\.org/','',str(value or '').strip(),flags=re.I)
    return value.lower() if value.startswith('10.') else ''

def date_parts(parts):
    if not parts: return '', ''
    try:
        contiguous=[]
        for x in parts:
            if x is None: break
            contiguous.append(int(x))
        parts=contiguous
        if not parts or not 1900 <= parts[0] <= 2200: return '', ''
        if len(parts)>=3:
            return dt.date(*parts[:3]).isoformat(),'day'
        if len(parts)==2 and 1<=parts[1]<=12: return f'{parts[0]:04d}-{parts[1]:02d}','month'
        if len(parts)==1: return str(parts[0]),'year'
    except (ValueError,TypeError): pass
    return '', ''

def publication_date(message):
    # Online publication is not the issue date, deposit date, or index timestamp.
    for key in ('published-online','published-print','published','issued'):
        parts=message.get(key,{}).get('date-parts',[[]])
        value,precision=date_parts(parts[0] if parts else [])
        if value: return value,precision,'Crossref '+key
    return '','',''

def three_months_before(today):
    n=today.year*12+today.month-1-3
    year,month=n//12,n%12+1
    return dt.date(year,month,min(today.day,calendar.monthrange(year,month)[1]))

def in_news_window(value, precision, start, end):
    try:
        if precision=='day': return start <= dt.date.fromisoformat(value) <= end
        if precision=='month':
            y,m=map(int,value.split('-'))
            return start <= dt.date(y,m,1) and dt.date(y,m,calendar.monthrange(y,m)[1]) <= end
    except (ValueError,TypeError): pass
    return False

class PublicAPI:
    def __init__(self,state):
        self.cache=state/'cache'; self.cache.mkdir(parents=True,exist_ok=True)
    def get(self,url,ttl=86400):
        path=self.cache/(hashlib.sha256(url.encode()).hexdigest()+'.json')
        cached=load(path)
        if cached and time.time()-cached['fetched_at']<ttl: return cached['body']
        error=None
        for attempt in range(2):
            try:
                req=Request(url,headers={'User-Agent':UA,'Accept':'application/json'})
                with urlopen(req,timeout=35) as r:
                    body=json.loads(r.read().decode('utf-8'))
                save(path,{'url':url,'fetched_at':time.time(),'body':body})
                return body
            except Exception as exc:
                error=exc
                if attempt==0: time.sleep(2)
        # Caller records the failure and preserves the previous published catalogue.
        raise RuntimeError(f'{url}: {error}')

def crossref_record(m, member_ids=()):
    title=re.sub(r'<[^>]+>','',str((m.get('title') or [''])[0])).strip()
    authors=[' '.join(filter(None,[a.get('given',''),a.get('family','')])).strip() or a.get('name','') for a in m.get('author',[])]
    date,precision,source=publication_date(m)
    typ=m.get('type','')
    return {'title':title,'authors':[a for a in authors if a], 'doi':doi_norm(m.get('DOI')),
        'year':int(date[:4]) if date else 0, 'date':date,'date_precision':precision,'date_source':source,
        'venue':(m.get('container-title') or [m.get('publisher','')])[0],
        'type':'conference' if typ=='proceedings-article' else 'preprint' if typ=='posted-content' else 'book' if typ in ('book','book-chapter','monograph','edited-book') else 'journal',
        'source_urls':['https://api.crossref.org/works/'+quote(doi_norm(m.get('DOI')),safe='')],
        'member_ids':list(member_ids)}

def orcid_candidates(body, member):
    records=[]
    for group in body.get('group',[]):
        for work in group.get('work-summary',[]):
            if work.get('type') in ('peer-review','edited-book','conference-poster'): continue
            ext=work.get('external-ids') or {}
            doi=next((doi_norm(x.get('external-id-value')) for x in ext.get('external-id',[]) if x.get('external-id-type')=='doi' and x.get('external-id-relationship') in ('self',None)), '')
            d=work.get('publication-date') or {}
            parts=[(d.get(k) or {}).get('value') for k in ('year','month','day')]
            date,precision=date_parts(parts)
            title=((work.get('title') or {}).get('title') or {}).get('value','')
            records.append({'title':title,'doi':doi,'authors':[], 'year':int(date[:4]) if date else 0,
                'date':date,'date_precision':precision,'date_source':'ORCID publication-date',
                'venue':(work.get('journal-title') or {}).get('value',''),'type':'conference' if work.get('type')=='conference-paper' else 'journal',
                'member_ids':[member['id']],'source_urls':[f"https://pub.orcid.org/v3.0/{member['orcid']}/work/{work['put-code']}"],
                'orcid_work_url':f"https://pub.orcid.org/v3.0/{member['orcid']}/work/{work['put-code']}"})
    return records

def discover_member(api,member):
    records=[]; errors=[]; success=0
    if not member.get('orcid'): return records,errors,success
    url=f"https://pub.orcid.org/v3.0/{member['orcid']}/works"
    try:
        records += orcid_candidates(api.get(url),member); success+=1
    except Exception as exc: errors.append(str(exc))
    cursor='*'
    for page in range(30):
        url='https://api.crossref.org/works?'+urlencode({'filter':'orcid:'+member['orcid'],'rows':1000,'cursor':cursor})
        try:
            msg=api.get(url)['message']; items=msg.get('items',[])
            records += [crossref_record(m,[member['id']]) for m in items if m.get('type')!='peer-review'];success+=1
            next_cursor=msg.get('next-cursor')
            if not items or len(items)<1000 or not next_cursor or next_cursor==cursor: break
            cursor=next_cursor
        except Exception as exc:
            errors.append(str(exc));break
    return records,errors,success

def merge_records(records, excluded_dois=(),excluded_titles=()):
    result={}; titles={}
    for raw in records:
        r=dict(raw); r['doi']=doi_norm(r.get('doi'))
        title=norm(r.get('title',''))
        if not title or r['doi'] in excluded_dois or title in excluded_titles: continue
        if isinstance(r.get('authors'),str): r['authors']=[x.strip() for x in r['authors'].split(',') if x.strip()]
        r.setdefault('authors',[]);r.setdefault('member_ids',[]);r.setdefault('source_urls',[])
        key='doi:'+r['doi'] if r['doi'] else 'title:'+title
        # Merge a DOI-less entry with its otherwise identical titled record.
        previous=titles.get(title)
        if previous and previous in result:
            if not r['doi']:
                key=previous
            elif not result[previous].get('doi') and previous!=key:
                prior=result.pop(previous)
                if key in result:
                    existing=result[key]
                    for field in ('member_ids','source_urls'):
                        existing[field]=sorted(set(existing.get(field,[])+prior.get(field,[])))
                    if len(prior.get('authors',[]))>len(existing.get('authors',[])):
                        existing['authors']=prior['authors']
                    if len(prior.get('date',''))>len(existing.get('date','')) and not existing.get('date_source','').startswith('Crossref published-online'):
                        for field in ('date','date_precision','date_source'):existing[field]=prior.get(field,'')
                        existing['year']=int(existing['date'][:4])
                    if prior.get('news_eligible') is False:existing['news_eligible']=False
                else:
                    result[key]=prior
                for alias,alias_key in list(titles.items()):
                    if alias_key==previous: titles[alias]=key
        if key in result:
            old=result[key]
            for field in ('member_ids','source_urls'):
                old[field]=sorted(set(old.get(field,[])+r.get(field,[])))
            if len(r['authors'])>len(old['authors']): old['authors']=r['authors']
            for field in ('doi','venue','year','type','orcid_work_url'):
                if not old.get(field) and r.get(field): old[field]=r[field]
            # Authoritative online/print metadata takes precedence over coarse seed dates.
            prefer=r.get('date_source','').startswith('Crossref published-online') or (not old.get('date_source','').startswith('Crossref published-online') and len(r.get('date',''))>len(old.get('date','')))
            if prefer:
                for field in ('date','date_precision','date_source'): old[field]=r.get(field,'')
                if old.get('date'): old['year']=int(old['date'][:4])
            if r.get('news_eligible') is False: old['news_eligible']=False
            if r.get('date_conflict'): old['date_conflict']=True
        else:
            result[key]=r
        titles[title]=key
    return list(result.values())

def collapse_versions(records,aliases):
    by_doi={doi_norm(r.get('doi')):r for r in records if doi_norm(r.get('doi')) not in aliases}
    output=[]
    for record in records:
        canonical=aliases.get(doi_norm(record.get('doi')))
        if canonical and canonical in by_doi:
            target=by_doi[canonical]
            for field in ('member_ids','source_urls'):
                target[field]=sorted(set(target.get(field,[])+record.get(field,[])))
            continue
        output.append(record)
    return output

def hydrate(api,record):
    if record.get('doi','').startswith('10.48550/'):
        url='https://api.datacite.org/dois/'+quote(record['doi'],safe='')
        item=api.get(url,86400*7)['data']['attributes']
        creators=[]
        for creator in item.get('creators',[]):
            name=' '.join(filter(None,[creator.get('givenName'),creator.get('familyName')]))
            creators.append(name or creator.get('name',''))
        record['authors']=[name for name in creators if name]
        record['source_urls']=sorted(set(record.get('source_urls',[])+[url]))
        record['type']='preprint';record['venue']='arXiv'
        for typ in ('Available','Issued'):
            candidates=sorted(d.get('date','')[:10] for d in item.get('dates',[]) if d.get('dateType')==typ and d.get('dateInformation','v1') in ('v1',''))
            if candidates:
                value,precision=date_parts(candidates[0].split('-'))
                if value:
                    record.update(date=value,date_precision=precision,date_source='DataCite '+typ,year=int(value[:4]));break
        for related in item.get('relatedIdentifiers',[]):
            if related.get('relationType') in ('IsVersionOf','IsPreprintOf') and related.get('relatedIdentifierType')=='DOI':
                target=doi_norm(related.get('relatedIdentifier'))
                if target and not target.startswith('10.48550/'): record['version_of']=target;break
        return record
    if record.get('doi'):
        url='https://api.crossref.org/works/'+quote(record['doi'],safe='')
        message=api.get(url,86400*7)['message']
        enriched=crossref_record(message,record['member_ids'])
        return merge_records([record,enriched])[0]
    if not record.get('authors') and record.get('orcid_work_url'):
        work=api.get(record['orcid_work_url'],86400*7)
        citation=(work.get('citation') or {}).get('citation-value','')
        match=re.search(r'\bauthor\s*=\s*[{\"](.*?)[}\"]\s*,',citation,re.I|re.S)
        if match:
            record['authors']=[a.strip().replace('{','').replace('}','') for a in match.group(1).split(' and ')]
        else:
            record['authors']=[(a.get('credit-name') or {}).get('value','') for a in (work.get('contributors') or {}).get('contributor',[])]
    return record

def render_catalog(records,members,today,coverage):
    papers=[]; byid={m['id']:m for m in members}
    for r in records:
        if not r.get('authors') or not r.get('title') or not r.get('year'): continue
        known=set(r.get('member_ids',[]))
        names={norm(a) for a in r['authors']}
        for m in members:
            if norm(m['name']) in names or any(norm(a) in names for a in m.get('aliases',[])): known.add(m['id'])
        doi=doi_norm(r.get('doi')); key=doi or norm(r['title'])
        member_authors=[byid[i]['name'] for i in sorted(known) if i in byid]
        sources=sorted(set(u for u in r.get('source_urls',[]) if u.startswith('https://')))
        links=[{'type':'doi','url':'https://doi.org/'+doi}] if doi else []
        if not links and sources: links=[{'type':'source','url':sources[0]}]
        future = bool(r.get('date')) and r['date'][:7] > today.isoformat()[:len(r['date'][:7])]
        papers.append({'id':hashlib.sha256(key.encode()).hexdigest()[:16], 'title':r['title'],'title_en':r['title'],
            'authors':', '.join(r['authors']),'authors_en':', '.join(r['authors']), 'journal':r.get('venue',''),
            'year':int(r['year']), 'date':r.get('date',''),'date_precision':r.get('date_precision',''),
            'date_source':r.get('date_source',''), 'type':r.get('type','journal'),'doi':doi,
            'news_eligible':r.get('news_eligible',True),'date_conflict':r.get('date_conflict',False),
            'member_authors':member_authors,'member_ids':sorted(known),'source_urls':sources,'links':links,
            'tags':[{'text':'后续卷期：'+r['date'],'text_en':'Scheduled issue: '+r['date']}] if future else []})
    papers.sort(key=lambda p:(p['year'],p['date'],p['title']),reverse=True)
    meta={'updated_at':today.isoformat(),'paper_count':len(papers),'member_count':len(members),'sources':['ORCID','Crossref','DataCite','Google Scholar profile links'],'coverage':coverage}
    catalogue={'papers':papers,'patents':[],'awards':[],'transfers':[],'meta':meta}
    start=three_months_before(today);items=[]
    for p in papers:
        if not p.get('news_eligible',True):continue
        if not in_news_window(p['date'],p['date_precision'],start,today):continue
        names='、'.join(byid[i].get('name_zh',byid[i]['name']) for i in p['member_ids'] if i in byid)
        items.append({'id':p['id'],'date':p['date'],'date_precision':p['date_precision'],
            'title':p['title'],'title_en':p['title'],
            'desc':f"{names}的研究成果发表于 {p['journal']}。",'desc_en':f"Research by {', '.join(p['member_authors'])}, published in {p['journal']}.",
            'link':p['links'][0]['url'] if p['links'] else 'publications.html','members':p['member_authors'],
            'date_source':p['date_source'],'doi':p['doi']})
    items.sort(key=lambda x:(x['date'],x['title']),reverse=True)
    news={'items':items,'meta':{'window_start':start.isoformat(),'window_end':today.isoformat(),'updated_at':today.isoformat()}}
    return catalogue,news

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--root',type=Path,default=Path(__file__).resolve().parents[1])
    parser.add_argument('--state-dir',type=Path,required=True)
    parser.add_argument('--as-of',type=dt.date.fromisoformat,default=dt.date.today())
    parser.add_argument('--seed-only',action='store_true')
    args=parser.parse_args();root=args.root;state=args.state_dir
    config=load(root/'server/sources.json');seed=load(root/'server/catalog_seed.json',{'papers':[]})
    members=config['members'];api=PublicAPI(state)
    records=list(seed['papers'])+load(state/'last_records.json',[])
    errors=[];success=0
    if not args.seed_only:
        with ThreadPoolExecutor(max_workers=3) as pool:
            futures={pool.submit(discover_member,api,m):m for m in members if m.get('orcid')}
            for f in as_completed(futures):
                m=futures[f];r,e,n=f.result();records+=r;errors+=e;success+=n
                print(json.dumps({'member':m['name'],'found':len(r),'source_success':n,'errors':len(e)}),flush=True)
        if success==0: raise RuntimeError('All discovery sources failed; existing publication and news files retained.')
    records=collapse_versions(records,config.get('version_aliases',{}))
    records=merge_records(records,config.get('excluded_dois',[]),[norm(t) for t in config.get('excluded_titles',[])])
    if not args.seed_only:
        needs=[r for r in records if not r.get('authors') or (r.get('doi') and int(r.get('year') or 0)>=args.as_of.year-1 and not r.get('date_source','').startswith('Crossref published-online'))]
        with ThreadPoolExecutor(max_workers=3) as pool:
            futures={pool.submit(hydrate,api,r):r for r in needs}
            for f in as_completed(futures):
                r=futures[f]
                try: r.update(f.result())
                except Exception as exc: errors.append(str(exc))
    aliases=dict(config.get('version_aliases',{}))
    aliases.update({r['doi']:r['version_of'] for r in records if r.get('doi') and r.get('version_of')})
    records=merge_records(collapse_versions(records,aliases),config.get('excluded_dois',[]),[norm(t) for t in config.get('excluded_titles',[])])
    for record in records:
        override=config.get('record_overrides',{}).get(record.get('doi',''))
        if override: record.update(override)
    pending=[r for r in records if not r.get('authors') or not r.get('year')]
    coverage={'mode':'seed' if args.seed_only else 'daily','source_successes':success,'source_error_count':len(errors),'pending_metadata_count':len(pending)}
    catalogue,news=render_catalog(records,members,args.as_of,coverage)
    if not catalogue['papers']: raise RuntimeError('No complete publication records; existing files retained.')
    ids=[p['id'] for p in catalogue['papers']]
    if len(ids)!=len(set(ids)): raise RuntimeError('Duplicate stable publication IDs')
    if any(p['doi'] in config.get('excluded_dois',[]) for p in catalogue['papers']):raise RuntimeError('Excluded DOI reached output')
    state.mkdir(parents=True,exist_ok=True)
    save(state/'last_records.json',records)
    save(state/'pending_metadata.json',pending)
    save(state/'last_run.json',{'finished_at':dt.datetime.now(dt.timezone.utc).isoformat(),'papers':len(ids),'news':len(news['items']),'coverage':coverage,'errors':errors})
    save(root/'data/publications.json',catalogue); save(root/'data/news.json',news)
    print(json.dumps({'result':'updated','papers':len(ids),'news':len(news['items']),'errors':len(errors),'pending':len(pending)},ensure_ascii=False))

if __name__=='__main__':
    try: main()
    except Exception as exc:
        print(str(exc),file=sys.stderr);sys.exit(1)
