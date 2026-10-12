# Publications and News updater

The website reads versioned JSON from `data/`. A dedicated Ubuntu job refreshes scholarly metadata and publishes changes to the website repository. No browser-side connection to a separate API is required.

## Sources

Member identities and Google Scholar profile links are recorded in `sources.json`. Daily discovery uses each verified ORCID record and Crossref's ORCID filter. Crossref and DataCite DOI metadata supply author lists, venues, publication dates and explicit version relationships. `catalog_seed.json` preserves the verified initial catalogue; previously collected records are retained when an upstream source is temporarily unavailable.

Records are merged by DOI and normalized title. Full-name matches identify team coauthors. News covers the preceding three calendar months using publication dates, not collection dates. Year-only records are not converted into dated announcements. Known mistaken identity matches are excluded in `sources.json`.

## Server

Project directory: `/home/ubuntu/cicc-platform`

- `site/`: website repository and updater
- `state/`: metadata cache, pending records and latest run report
- `logs/`: update logs
- `snapshots/`: previous data snapshots
- `keys/`: repository-specific deployment credentials, outside the repository

The systemd timer runs every day at **08:00 Asia/Shanghai**, with catch-up after downtime. The job uses a file lock, preserves the last published data when discovery fails, and commits only the publication and News JSON files. GitHub Pages serves the resulting site over HTTPS.

```bash
sudo systemctl status cicc-platform-update.timer
sudo systemctl start cicc-platform-update.service
journalctl -u cicc-platform-update.service -n 50 --no-pager
python3 -m unittest discover -s server/tests
```

To pause updates: `sudo systemctl stop cicc-platform-update.timer`.
