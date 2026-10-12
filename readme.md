# Affective Computing & Interactive Health

Website of the Suzhou Industrial Park Affective Computing & Interactive Health Interdisciplinary Innovation (Research) Platform.

[Website](https://cicc-xjtlu.github.io/) · [Publications](https://cicc-xjtlu.github.io/pages/publications.html) · [News](https://cicc-xjtlu.github.io/pages/news.html)

## Structure

- `pages/`, `js/`, `css/`: bilingual website
- `data/publications.json`: deduplicated publication catalogue
- `data/news.json`: research outputs from the preceding three months
- `server/`: daily metadata updater, source identities and systemd configuration

Publications retain their source author lists, dates and DOI links. Papers shared by several team members appear once. Google Scholar profile links are available on the team page; automated metadata collection uses ORCID and Crossref.

For local preview, run `python3 -m http.server 8765` and open `http://localhost:8765`.

Operational instructions are in [`server/README.md`](server/README.md).
