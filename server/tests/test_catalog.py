"""Offline regression tests. All records and source failures below are fixtures."""
import datetime as dt
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest
import shutil
import subprocess
from unittest.mock import Mock, patch

MODULE = Path(__file__).resolve().parents[1] / 'update_catalog.py'
SPEC = importlib.util.spec_from_file_location('update_catalog', MODULE)
catalog = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(catalog)


def record(title='Shared work', doi='', **overrides):
    value = dict(title=title, doi=doi, authors=['Alice Researcher', 'Bo Student'],
                 member_ids=['alice'], source_urls=['https://example.org/paper'],
                 year=2026, date='2026-09', date_precision='month',
                 date_source='ORCID publication-date', venue='Research Journal', type='journal')
    value.update(overrides)
    return value


MEMBERS = [dict(id='alice', name='Alice Researcher', aliases=[]),
           dict(id='bo', name='Bo Student', aliases=['Student Bo']),
           dict(id='someone_else', name='Bea Student', aliases=[])]


class CatalogueTests(unittest.TestCase):
    def test_doi_less_upgrade_then_repeated_doi_is_one_record(self):
        merged = catalog.merge_records([record(), record(doi='10.1234/shared'), record(doi='https://doi.org/10.1234/shared')])
        self.assertEqual(len(merged), 1)
        self.assertEqual(merged[0]['doi'], '10.1234/shared')

    def test_doi_less_upgrade_then_variant_title_is_one_record(self):
        merged = catalog.merge_records([record(), record(doi='10.1234/shared'), record('Shared work: extended title', doi='10.1234/shared')])
        self.assertEqual(len(merged), 1)

    def test_distinct_dois_are_not_collapsed_by_title(self):
        merged = catalog.merge_records([record(doi='10.1234/one'), record(doi='10.1234/two')])
        self.assertEqual(len(merged), 2)

    def test_title_alias_convergence_preserves_complete_authors(self):
        merged = catalog.merge_records([
            record('Earlier title', doi='10.1234/shared', authors=['Alice Researcher']),
            record('Later title', authors=['Alice Researcher', 'Bo Student', 'Full Third Author']),
            record('Later title', doi='10.1234/shared', authors=['Alice Researcher'])])
        self.assertEqual(len(merged), 1)
        self.assertEqual(merged[0]['authors'], ['Alice Researcher', 'Bo Student', 'Full Third Author'])

    def test_duplicate_merges_members_sources_and_complete_authors(self):
        merged = catalog.merge_records([
            record(doi='10.1234/work', authors=['Alice Researcher']),
            record(doi='10.1234/work', member_ids=['bo'], source_urls=['https://example.org/second'])])
        self.assertEqual(len(merged), 1)
        self.assertEqual(merged[0]['member_ids'], ['alice', 'bo'])
        self.assertEqual(len(merged[0]['authors']), 2)
        self.assertEqual(len(merged[0]['source_urls']), 2)

    def test_online_date_overrides_print_and_keeps_year_consistent(self):
        merged = catalog.merge_records([
            record(doi='10.1234/work', year=2026, date='2026-01-03', date_precision='day', date_source='Crossref published-print'),
            record(doi='10.1234/work', year=2025, date='2025-12-20', date_precision='day', date_source='Crossref published-online')])
        self.assertEqual(merged[0]['date'], '2025-12-20')
        self.assertEqual(merged[0]['year'], 2025)

    def test_publication_date_does_not_use_deposit_timestamp(self):
        message = {'published-online': {'date-parts': [[2025, 12]]},
                   'published-print': {'date-parts': [[2026, 1, 3]]},
                   'created': {'date-time': '2026-02-01'}}
        self.assertEqual(catalog.publication_date(message), ('2025-12', 'month', 'Crossref published-online'))
        self.assertEqual(catalog.publication_date({'created': {'date-time': '2026-10-01'}}), ('', '', ''))

    def test_missing_month_does_not_promote_day_to_month(self):
        self.assertEqual(catalog.date_parts([2026, None, 12]), ('2026', 'year'))

    def test_month_end_and_three_month_window(self):
        self.assertEqual(catalog.three_months_before(dt.date(2026, 5, 31)), dt.date(2026, 2, 28))
        start, end = dt.date(2026, 7, 12), dt.date(2026, 10, 12)
        self.assertTrue(catalog.in_news_window('2026-07-12', 'day', start, end))
        self.assertTrue(catalog.in_news_window('2026-10-12', 'day', start, end))
        self.assertFalse(catalog.in_news_window('2026-07-11', 'day', start, end))
        self.assertFalse(catalog.in_news_window('2026-10-13', 'day', start, end))
        self.assertTrue(catalog.in_news_window('2026-09', 'month', start, end))
        self.assertFalse(catalog.in_news_window('2026', 'year', start, end))

    def test_no_fake_day_in_rendered_news(self):
        pubs, news = catalog.render_catalog([record()], MEMBERS, dt.date(2026, 10, 12), {})
        self.assertEqual(news['items'][0]['date'], '2026-09')
        self.assertEqual(news['items'][0]['date_precision'], 'month')
        self.assertEqual(pubs['papers'][0]['authors'], 'Alice Researcher, Bo Student')

    def test_student_match_requires_full_name_not_family_initial(self):
        pubs, _ = catalog.render_catalog([record(authors=['Alice Researcher', 'B Student'])], MEMBERS, dt.date(2026, 10, 12), {})
        self.assertEqual(pubs['papers'][0]['member_authors'], ['Alice Researcher'])
        pubs, _ = catalog.render_catalog([record(authors=['Alice Researcher', 'Student Bo'])], MEMBERS, dt.date(2026, 10, 12), {})
        self.assertEqual(pubs['papers'][0]['member_authors'], ['Alice Researcher', 'Bo Student'])

    def test_all_sources_failing_preserves_both_existing_files(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / 'site'
            (root / 'server').mkdir(parents=True)
            (root / 'data').mkdir()
            catalog.save(root / 'server/sources.json', {'members': [dict(MEMBERS[0], orcid='0000-0000-0000-0000')]})
            catalog.save(root / 'server/catalog_seed.json', {'papers': [record()]})
            original = {'publications.json': b'{"existing":"publication"}\n', 'news.json': b'{"existing":"news"}\n'}
            for name, value in original.items(): (root / 'data' / name).write_bytes(value)
            argv = ['update_catalog.py', '--root', str(root), '--state-dir', str(Path(tmp) / 'state'), '--as-of', '2026-10-12']
            with patch.object(sys, 'argv', argv), patch.object(catalog, 'discover_member', return_value=([], ['offline fixture failure'], 0)):
                with self.assertRaisesRegex(RuntimeError, 'All discovery sources failed'):
                    catalog.main()
            for name, value in original.items(): self.assertEqual((root / 'data' / name).read_bytes(), value)

    def test_empty_render_does_not_overwrite_existing_files(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / 'site'
            (root / 'server').mkdir(parents=True)
            (root / 'data').mkdir()
            catalog.save(root / 'server/sources.json', {'members': MEMBERS})
            catalog.save(root / 'server/catalog_seed.json', {'papers': [record(authors=[])]})
            original = {'publications.json': b'{"existing":"publication"}\n', 'news.json': b'{"existing":"news"}\n'}
            for name, value in original.items(): (root / 'data' / name).write_bytes(value)
            argv = ['update_catalog.py', '--root', str(root), '--state-dir', str(Path(tmp) / 'state'), '--as-of', '2026-10-12', '--seed-only']
            with patch.object(sys, 'argv', argv):
                with self.assertRaisesRegex(RuntimeError, 'No complete publication records'):
                    catalog.main()
            for name, value in original.items(): self.assertEqual((root / 'data' / name).read_bytes(), value)


class DataCiteTests(unittest.TestCase):
    """Use minimal registry responses; hydration must never contact the network."""
    doi = '10.48550/arxiv.2401.00001'
    url = 'https://api.datacite.org/dois/10.48550%2Farxiv.2401.00001'

    def hydrate_fixture(self, attributes, **record_overrides):
        api = Mock()
        api.get.return_value = {'data': {'attributes': attributes}}
        seed = record(doi=self.doi, **record_overrides)
        with patch.object(catalog, 'urlopen', side_effect=AssertionError('Network access in offline test')):
            result = catalog.hydrate(api, seed)
        api.get.assert_called_once_with(self.url, 86400 * 7)
        return result

    def test_available_v1_precedes_issued_and_ignores_updated_or_later_versions(self):
        result = self.hydrate_fixture({
            'creators': [{'name': 'Alice Researcher'}],
            'dates': [
                {'dateType': 'Updated', 'date': '2026-10-10'},
                {'dateType': 'Available', 'date': '2026-09-10', 'dateInformation': 'v2'},
                {'dateType': 'Issued', 'date': '2024-02-01'},
                {'dateType': 'Available', 'date': '2024-01-12', 'dateInformation': 'v1'},
                {'dateType': 'Available', 'date': '2024-01-10', 'dateInformation': 'v1'},
            ],
        })
        self.assertEqual((result['date'], result['date_precision'], result['year']), ('2024-01-10', 'day', 2024))
        self.assertEqual(result['date_source'], 'DataCite Available')

    def test_issued_is_used_without_an_eligible_available_date(self):
        result = self.hydrate_fixture({
            'creators': [{'name': 'Alice Researcher'}],
            'dates': [
                {'dateType': 'Updated', 'date': '2026-10-10'},
                {'dateType': 'Available', 'date': '2026-09-10', 'dateInformation': 'v2'},
                {'dateType': 'Issued', 'date': '2024-03'},
            ],
        })
        self.assertEqual((result['date'], result['date_precision'], result['year']), ('2024-03', 'month', 2024))
        self.assertEqual(result['date_source'], 'DataCite Issued')

    def test_updated_and_registration_dates_never_replace_publication_date(self):
        result = self.hydrate_fixture({
            'creators': [{'name': 'Alice Researcher'}],
            'dates': [{'dateType': 'Updated', 'date': '2026-10-10'}],
            'created': '2026-10-09T12:00:00Z',
            'registered': '2026-10-09T12:05:00Z',
            'published': '2026-10-10',
        }, year=2024, date='2024', date_precision='year', date_source='ORCID publication-date')
        self.assertEqual((result['date'], result['date_precision'], result['year']), ('2024', 'year', 2024))
        self.assertEqual(result['date_source'], 'ORCID publication-date')
        _, news = catalog.render_catalog([result], MEMBERS, dt.date(2026, 10, 12), {})
        self.assertEqual(news['items'], [])

    def test_all_creators_remain_in_source_order_with_full_names(self):
        result = self.hydrate_fixture({
            'creators': [
                {'givenName': 'Alice Jane', 'familyName': 'Researcher', 'name': 'Researcher, Alice Jane'},
                {'name': 'Bo Student'},
                {'givenName': 'Clara', 'familyName': "O'Neil"},
                {'name': 'Research Consortium', 'nameType': 'Organizational'},
            ],
            'dates': [{'dateType': 'Available', 'date': '2026-09-01'}],
        }, authors=['A. Researcher'])
        self.assertEqual(result['authors'], ['Alice Jane Researcher', 'Bo Student', "Clara O'Neil", 'Research Consortium'])
        self.assertEqual(result['type'], 'preprint')
        self.assertEqual(result['venue'], 'arXiv')
        self.assertEqual(result['member_ids'], ['alice'])
        self.assertIn('https://example.org/paper', result['source_urls'])
        self.assertIn(self.url, result['source_urls'])

    def test_year_month_day_precision_is_not_invented(self):
        cases = [('2024', '2024', 'year'), ('2024-02', '2024-02', 'month'),
                 ('2024-02-29', '2024-02-29', 'day'),
                 ('2024-02-29T15:04:05Z', '2024-02-29', 'day')]
        for raw, expected, precision in cases:
            with self.subTest(raw=raw):
                result = self.hydrate_fixture({'creators': [{'name': 'Alice Researcher'}],
                                               'dates': [{'dateType': 'Available', 'date': raw}]})
                self.assertEqual(result['date'], expected)
                self.assertEqual(result['date_precision'], precision)
                self.assertEqual(result['year'], 2024)

    def test_is_version_of_maps_to_formal_doi_and_collapses_with_provenance(self):
        preprint = self.hydrate_fixture({
            'creators': [{'name': 'Alice Researcher'}, {'name': 'Bo Student'}],
            'dates': [{'dateType': 'Available', 'date': '2024-01-10'}],
            'relatedIdentifiers': [
                {'relationType': 'IsVersionOf', 'relatedIdentifierType': 'DOI', 'relatedIdentifier': '10.48550/arxiv.2301.00001'},
                {'relationType': 'IsVersionOf', 'relatedIdentifierType': 'URL', 'relatedIdentifier': 'https://example.org/article'},
                {'relationType': 'IsVersionOf', 'relatedIdentifierType': 'DOI', 'relatedIdentifier': 'https://doi.org/10.1234/FORMAL'},
            ],
        }, member_ids=['bo'])
        self.assertEqual(preprint['version_of'], '10.1234/formal')
        formal = record(doi='10.1234/formal', date='2025-01-10', year=2025, date_precision='day',
                        date_source='Crossref published-online', source_urls=['https://example.org/formal'])
        merged = catalog.merge_records(catalog.collapse_versions([preprint, formal],
                                       {preprint['doi']: preprint['version_of']}))
        self.assertEqual(len(merged), 1)
        self.assertEqual(merged[0]['doi'], '10.1234/formal')
        self.assertEqual(merged[0]['date'], '2025-01-10')
        self.assertEqual(merged[0]['member_ids'], ['alice', 'bo'])
        self.assertEqual(merged[0]['authors'], ['Alice Researcher', 'Bo Student'])
        self.assertIn(self.url, merged[0]['source_urls'])
        self.assertIn('https://example.org/formal', merged[0]['source_urls'])

    def test_is_preprint_of_is_supported_but_other_relations_do_not_alias(self):
        for relation, expected in [('IsPreprintOf', '10.1234/formal'), ('Cites', None), ('IsSupplementTo', None)]:
            with self.subTest(relation=relation):
                result = self.hydrate_fixture({
                    'creators': [{'name': 'Alice Researcher'}],
                    'relatedIdentifiers': [{'relationType': relation, 'relatedIdentifierType': 'DOI',
                                            'relatedIdentifier': '10.1234/formal'}],
                })
                self.assertEqual(result.get('version_of'), expected)


class DailyJobTests(unittest.TestCase):
    def test_unpushed_data_commit_retried_even_when_catalogue_unchanged(self):
        """Exercise the real shell/Git flow against a local bare remote; no network."""
        git = shutil.which('git') or ('D:/Git/cmd/git.exe' if Path('D:/Git/cmd/git.exe').exists() else None)
        bash = 'D:/Git/usr/bin/bash.exe' if Path('D:/Git/usr/bin/bash.exe').exists() else shutil.which('bash')
        if not git or not bash:
            self.skipTest('Git and Bash are required for the local-remote retry regression')
        with tempfile.TemporaryDirectory(prefix='cicc-daily-retry-') as tmp:
            base = Path(tmp) / 'platform'
            repo = base / 'site'
            remote = Path(tmp) / 'remote.git'
            def run(*args, **kwargs):
                return subprocess.run(args, check=True, capture_output=True, text=True, encoding='utf-8', **kwargs)
            run(git, 'init', '--bare', '--initial-branch=main', str(remote))
            run(git, 'clone', str(remote), str(repo))
            run(git, '-C', str(repo), 'config', 'user.name', 'Offline Test')
            run(git, '-C', str(repo), 'config', 'user.email', 'offline@example.invalid')
            run(git, '-C', str(repo), 'config', 'core.autocrlf', 'false')
            (repo / 'data').mkdir()
            (repo / 'data/publications.json').write_text('{"papers":[]}\n', encoding='utf-8')
            (repo / 'data/news.json').write_text('{"items":[]}\n', encoding='utf-8')
            run(git, '-C', str(repo), 'add', '.')
            run(git, '-C', str(repo), 'commit', '-m', 'Initial data')
            run(git, '-C', str(repo), 'push', '-u', 'origin', 'main')
            (repo / 'data/publications.json').write_text('{"papers":[],"updated":true}\n', encoding='utf-8')
            run(git, '-C', str(repo), 'commit', '-am', 'Update publications and news (offline retry)')
            self.assertEqual(run(git, '-C', str(repo), 'rev-list', '--count', 'origin/main..HEAD').stdout.strip(), '1')
            fakebin = Path(tmp) / 'bin'
            fakebin.mkdir()
            for name in ['python3', 'flock']:
                stub = fakebin / name
                stub.write_text('#!/bin/sh\nexit 0\n', encoding='utf-8', newline='\n')
                stub.chmod(0o755)
            def shell_path(value):
                if sys.platform == 'win32':
                    cygpath = str(Path(bash).with_name('cygpath.exe'))
                    return run(cygpath, '-u', str(value)).stdout.strip()
                return str(value)
            script = MODULE.with_name('run_daily.sh').read_text(encoding='utf-8')
            script = script.replace('BASE=/home/ubuntu/cicc-platform', 'BASE=' + repr(shell_path(base)))
            script = script.replace('set -euo pipefail', 'set -euo pipefail\nexport PATH=' + repr(shell_path(fakebin)) + ':/usr/bin:/bin:' + repr(shell_path(Path(git).parent)) + ':"$PATH"', 1)
            runner = Path(tmp) / 'run_daily.sh'
            runner.write_text(script, encoding='utf-8', newline='\n')
            outcome = subprocess.run([bash, shell_path(runner)], capture_output=True, text=True, encoding='utf-8')
            self.assertEqual(outcome.returncode, 0, outcome.stdout + outcome.stderr)
            run(git, '-C', str(repo), 'fetch', 'origin')
            ahead = run(git, '-C', str(repo), 'rev-list', '--count', 'origin/main..HEAD').stdout.strip()
            self.assertEqual(ahead, '0', 'Daily job must push the prior pending commit, even with no new data.\n' + outcome.stdout + outcome.stderr)


if __name__ == '__main__':
    unittest.main(verbosity=2)
