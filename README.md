# Watershed Wednesday

An operations guide to 27 security incidents collected in an October 2026 X thread: what is affected, which sources support the guidance, and what to patch, rotate, hunt or monitor.

**October 2026 edition · Compiled October 22, 2026**

[Read the website](https://meefs.github.io/watershed-wednesday/) · [Read the Markdown guide](Watershed-Wednesday.md) · [Original thread by @aisafetymemes](https://x.com/aisafetymemes/status/2113113711644737835)

The guide keeps the original thread's incident numbering. Start with triage, use the master table to find your exposure, then open an incident note for its full sources, indicators and unresolved questions. This is a dated edition; its dates, versions and availability checks describe the research snapshot, and corrections should preserve that context.

## Sources and method

Research agents gathered the incident notes, prioritizing vendor advisories, operator statements, CVE records, government alerts and regulatory filings. Discovery firms' original research supports the relevant campaigns; secondary reporting supplies additional context. Individual notes distinguish source types and record open questions.

The original X thread is the collection's starting point. Operational claims should be traced to the cited incident sources. A source being reachable, returning HTTP 200, or appearing in the link-check report does **not** establish that it supports a claim. Read the primary source before applying guidance, and obtain IOCs, hashes and fixed versions directly from that source.

This publication pass preserves the compiled research; it does not represent a new, independent verification of every technical claim. The [link-check report](link-check.md) records the original availability checks, including blocked, missing and incomplete responses.

## Public files

| Path | Contents |
|---|---|
| [Watershed-Wednesday.md](Watershed-Wednesday.md) | Main guide: triage, master table, action checklists and open items |
| [incidents/](incidents/) | 27 detail notes with identifiers, affected systems, guidance, IOCs and numbered sources |
| [link-check.md](link-check.md) | Dated HTTP availability report for cited URLs |
| [verification.md](verification.md) | Targeted publication checks, corrections and verification limits |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to propose corrections to this edition |
| [ATTRIBUTION.md](ATTRIBUTION.md) | Origin, design credits and third-party licensing boundaries |
| `site/` | Website templates, styles and browser assets |
| `scripts/` | Static build and local preview scripts |
| `package.json`, `package-lock.json` | Build commands and pinned dependencies |
| `.github/workflows/` | GitHub Pages build and deployment workflow |

Raw research captures in `sources/` and the internal `HANDOFF.md` stay local and are excluded from version control and the public website. The public incident notes link to upstream evidence. Generated `dist/`, local dependencies, environment files and browser-test artifacts are also excluded.

## Build and preview

With Node.js 22 or later and npm installed, run from the repository root:

```sh
npm ci
npm run build
npm run check
npm run preview
```

Open the preview address printed by the command. The build generates the website in `dist/` from the Markdown and site assets. Edit the source files and rebuild; generated files are not the editing source.

GitHub Pages is deployed by GitHub Actions, using the generated `dist/` directory as its deployment artifact. The project URL is [meefs.github.io/watershed-wednesday](https://meefs.github.io/watershed-wednesday/). Relative links and assets must work under the `/watershed-wednesday/` project path as well as in local preview.

## Corrections and reuse

See [CONTRIBUTING.md](CONTRIBUTING.md) for source-backed corrections. This repository publishes a specific edition rather than promising a continuously updated incident feed.

No project-wide reuse license has been granted for the original prose or site code yet. Upstream material remains subject to its own terms; see [ATTRIBUTION.md](ATTRIBUTION.md).
