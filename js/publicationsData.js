/* Research catalogue, served from the same origin as the website. */
(() => {
    'use strict';
    const dataURL = new URL('../data/publications.json', document.currentScript.src);
    const pageSize = 12;
    let data = null;
    let language = 'zh';
    let limit = pageSize;
    let loadFailed = false;
    const $ = id => document.getElementById(id);
    const list = value => Array.isArray(value) ? value : [];
    const text = value => value == null ? '' : String(value);
    const local = (zh, en) => language === 'en' ? en : zh;
    const translated = (item, key) => text(language === 'en' ? item[key + '_en'] || item[key] : item[key] || item[key + '_en']);
    const element = (tag, className, value) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (value != null) node.textContent = text(value);
        return node;
    };
    const safeURL = value => {
        try {
            const url = new URL(text(value));
            return /^https?:$/.test(url.protocol) ? url.href : null;
        } catch (_) { return null; }
    };
    const memberName = value => typeof value === 'string' ? value : translated(value || {}, 'name');
    const members = paper => [...new Set(list(paper.member_authors).map(memberName).filter(Boolean))];
    const dateKey = paper => {
        const parts = text(paper.date || paper.year).split('-');
        return [parts[0], parts[1] || '00', parts[2] || '00'].join('-');
    };
    const typeNames = {
        journal: ['期刊论文', 'Journal'], conference: ['会议论文', 'Conference'],
        preprint: ['预印本', 'Preprint'], book: ['书籍/章节', 'Books/chapters'], 'book-chapter': ['书籍章节', 'Book chapter'],
        'journal-article': ['期刊论文', 'Journal'], 'proceedings-article': ['会议论文', 'Conference'],
        other: ['其他', 'Other']
    };
    const typeLabel = value => typeNames[value] ? typeNames[value][language === 'en' ? 1 : 0] : text(value);

    function translateInterface() {
        document.querySelectorAll('[data-catalog-zh]').forEach(node => {
            const value = node.getAttribute(language === 'en' ? 'data-catalog-en' : 'data-catalog-zh');
            if (node.tagName === 'INPUT') node.placeholder = value;
            else node.textContent = value;
        });
        if ($('paper-search')) $('paper-search').setAttribute('aria-label', local('搜索论文标题或作者', 'Search titles or authors'));
    }

    function buildFilters() {
        for (const [id, values, label] of [
            ['paper-year', [...new Set(data.papers.map(p => text(p.year)).filter(Boolean))].sort((a, b) => Number(b) - Number(a)), value => value],
            ['paper-type', [...new Set(data.papers.map(p => text(p.type)).filter(Boolean))].sort(), typeLabel]
        ]) {
            const select = $(id);
            if (!select) continue;
            const selected = select.value || 'all';
            select.replaceChildren();
            const all = element('option', '', local('全部', 'All'));
            all.value = 'all';
            select.append(all);
            values.forEach(value => {
                const option = element('option', '', label(value));
                option.value = value;
                select.append(option);
            });
            select.value = values.includes(selected) ? selected : 'all';
        }
    }

    function addLink(container, url, label, known) {
        const href = safeURL(url);
        if (!href || known.has(href)) return;
        known.add(href);
        const link = element('a', 'publication-link', label);
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        container.append(link);
    }

    function paperCard(paper) {
        const card = element('article', 'publication-card');
        card.id = 'paper-' + text(paper.id).replace(/[^a-zA-Z0-9_-]/g, '-');
        const year = element('div', 'publication-year', paper.year);
        const content = element('div', 'publication-content');
        content.append(element('h3', 'publication-title', translated(paper, 'title')));
        content.append(element('p', 'publication-authors', translated(paper, 'authors')));
        content.append(element('p', 'publication-journal', paper.journal));
        const tags = element('div', 'publication-tags');
        if (paper.type) tags.append(element('span', 'publication-tag catalog-type', typeLabel(paper.type)));
        list(paper.tags).forEach(tag => {
            const value = typeof tag === 'string' ? tag : translated(tag || {}, 'text');
            if (value) tags.append(element('span', 'publication-tag', value));
        });
        if (tags.childNodes.length) content.append(tags);
        const team = members(paper);
        if (team.length) {
            const teamLine = element('p', 'catalog-members');
            teamLine.append(element('span', 'catalog-members-label', local('团队作者：', 'Team authors: ')));
            teamLine.append(document.createTextNode(team.join(' · ')));
            if (team.length > 1) teamLine.append(element('span', 'catalog-collaboration', local('团队共同作者', 'Team co-authorship')));
            content.append(teamLine);
        }
        const links = element('div', 'publication-links');
        const known = new Set();
        if (paper.doi) {
            const doi = text(paper.doi).replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '');
            if (/^10\.\d{4,9}\//.test(doi)) addLink(links, 'https://doi.org/' + doi, 'DOI', known);
        }
        list(paper.links).forEach(link => addLink(links, link.url, text(link.type || 'Link').toUpperCase(), known));
        list(paper.source_urls).forEach((source, i) => addLink(links, typeof source === 'string' ? source : source.url,
            local('来源', 'Source') + (i ? ' ' + (i + 1) : ''), known));
        if (links.childNodes.length) content.append(links);
        card.append(year, content);
        return card;
    }

    function renderPapers() {
        if (!data) return;
        const query = text($('paper-search') && $('paper-search').value).trim().toLocaleLowerCase();
        const year = $('paper-year') ? $('paper-year').value : 'all';
        const type = $('paper-type') ? $('paper-type').value : 'all';
        const filtered = data.papers.filter(paper =>
            (year === 'all' || text(paper.year) === year) &&
            (type === 'all' || text(paper.type) === type) &&
            (!query || [paper.title, paper.title_en, paper.authors, paper.authors_en, ...members(paper)]
                .map(text).join(' ').toLocaleLowerCase().includes(query))
        ).sort((a, b) => dateKey(b).localeCompare(dateKey(a)) || text(a.title).localeCompare(text(b.title)));
        const container = $('papers-list');
        container.replaceChildren();
        filtered.slice(0, limit).forEach(paper => container.append(paperCard(paper)));
        if (!filtered.length) container.append(element('p', 'catalog-empty', local('没有找到符合条件的论文。', 'No publications match these filters.')));
        $('load-more-papers').hidden = filtered.length <= limit;
        $('catalog-results').textContent = local('共 ' + filtered.length + ' 篇论文', filtered.length + ' publications');
        $('catalog-status').textContent = data.meta && data.meta.updated_at ? local('最近更新：', 'Last updated: ') + text(data.meta.updated_at).slice(0, 10) : '';
    }

    function renderOther(kind) {
        const records = list(data[kind]);
        const section = $(kind + '-section');
        if (section) section.hidden = !records.length;
        const container = $(kind + '-list');
        if (!container) return;
        container.replaceChildren();
        records.forEach(record => {
            const card = element('article', 'catalog-other-card');
            card.append(element('h3', 'publication-title', translated(record, 'title')));
            const description = kind === 'patents' ? [record.number, translated(record, 'inventors'), translated(record, 'status')].filter(Boolean).join(' · ') : translated(record, 'description');
            if (description) card.append(element('p', 'publication-authors', description));
            if (record.year) card.append(element('p', 'catalog-date', record.year));
            const links = element('div', 'publication-links');
            const known = new Set();
            list(record.links).forEach(link => addLink(links, link.url, text(link.type || 'Link').toUpperCase(), known));
            if (links.childNodes.length) card.append(links);
            container.append(card);
        });
    }

    function render() {
        translateInterface();
        if (!data) {
            if (loadFailed) $('papers-list').replaceChildren(element('p', 'catalog-empty', local('成果目录暂时无法加载，请刷新重试。', 'The publication catalogue is temporarily unavailable. Please refresh to try again.')));
            return;
        }
        buildFilters();
        renderPapers();
        ['patents', 'awards', 'transfers'].forEach(renderOther);
        $('papers-total').textContent = data.papers.length;
        $('collaborations-total').textContent = data.papers.filter(paper => members(paper).length > 1).length;
        $('years-total').textContent = new Set(data.papers.map(p => p.year).filter(Boolean)).size;
    }

    document.addEventListener('languageChanged', event => {
        language = event.detail.language === 'en' ? 'en' : 'zh';
        render();
    });
    document.addEventListener('DOMContentLoaded', async () => {
        if (!$('papers-list')) return;
        language = document.documentElement.lang === 'en' ? 'en' : 'zh';
        translateInterface();
        ['paper-search', 'paper-year', 'paper-type'].forEach(id => $(id).addEventListener(id === 'paper-search' ? 'input' : 'change', () => { limit = pageSize; renderPapers(); }));
        $('load-more-papers').addEventListener('click', () => { limit += pageSize; renderPapers(); });
        try {
            const response = await fetch(dataURL.href, {cache: 'no-cache'});
            if (!response.ok) throw new Error('Catalogue request failed: ' + response.status);
            const result = await response.json();
            if (!Array.isArray(result.papers)) throw new Error('Invalid catalogue');
            data = result;
            render();
        } catch (error) {
            loadFailed = true;
            console.error('Publication catalogue:', error.message);
            $('load-more-papers').hidden = true;
            render();
        }
    });
})();
