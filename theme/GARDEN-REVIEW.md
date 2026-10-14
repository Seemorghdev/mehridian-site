# Mehridian v0.6 review

Local validation: 14 October 2026 (UTC). Draft only; no publish or deployment.

## Scope and tradeoffs

- Existing five public Markdown pages and one existing image; no new notes or sections.
- Notes landing copy improves the connection between the one technical note and Edge Evidence.
- Native Quartz Search is exposed on Notes pages. Search index: exactly five authored pages.
- Technical notes automatically receive an optional, initially collapsed local map and existing native Backlinks.
- Native graph renderer investigated: it loads D3 and PixiJS from a CDN. This PR instead uses Quartz's CrawlLinks-resolved authored relationships, rendered as a linked SVG at build time. It is **not** the force-directed canvas widget. No drag/zoom, physics simulation, or graph client libraries; all nodes are ordinary navigable links. A full linked text alternative is provided.
- Diagram: three actual pages, two relationships. Current graph markup: 1,818 bytes / 668 bytes gzip. No added graph network request, animation, or visited tracking.
- Only authored links participate; common header/footer navigation does not inflate the graph.
- Six-neighbor diagram cap keeps future maps compact; every neighbor remains in the linked text list. No full-site map at this scale.
- The existing hero implementation and portfolio content are unchanged.

## Local checks

- Pinned production engine `9cf87ff1c248a8ca551093214b0fec3b31415009`, Node 22.23.3, actual deployment YAML/lock, fresh site checkout with restored engine dependency cache.
- Quartz build: five Markdown inputs, 53 emitted files. Cold dependency installation was not repeated; cache-restored local-plugin rebinding was exercised.
- `node --test theme/*.test.mjs`: 21 passing tests.
- `node scripts/check-build.mjs`: headings, shared theme, all relative links/assets, public-output boundary pass.
- `node scripts/check-connected-notes.mjs`: six-file curated manifest, native wikilinks and Backlinks pass.
- `node scripts/check-garden.mjs`: five-page search index, three real graph nodes, two authored connections, no graph widget on portfolio pages, native tag/wikilink configuration unchanged.
- Browser: desktop 1440×960 and mobile 390×844; additional 320px CSS-viewport layout check. No horizontal overflow observed.
- Node navigation: Edge Evidence and Notes open correctly; technical note backlink and reciprocal case-study wikilink work.
- Search returns the technical note; arrow/Enter navigation, Tab/Shift+Tab containment, Escape/focus return, Cmd+K, and explicit close button tested. Mobile result list scrolls within the modal.
- Fresh final desktop/mobile browser tabs: no console warnings/errors observed.
- Hero normal animation and pause control tested. Forced reduced-motion CSS fixture yields static hero and hidden pause control; **OS media preference was not emulated**. Actual media rules remain intact, and the graph itself never animates.
- Local preview clean-URL redirects now retain `/mehridian-site/`; this corrects the local rehearsal only, not the hosted application.

## Publishing boundary and ownership

- `content/` is byte-identical to the curated Obsidian `Public/site/` folder (five Markdown files and the existing image).
- Only the curated Notes landing source changed. Original private note and all private journal/research/Project 03 material remain unchanged and excluded.
- `quartz.config.yaml` is byte-identical to GitHub Publish's supported per-site YAML override; `includeEmptyFiles: false` removes an empty generated tag index from search.
- GitHub Publish 0.1.37 still selects exactly `Public/site`. Its content update creates a delta Git tree over `base_tree`, retaining repository-owned `theme/` and scripts. No Publish action was invoked.
- Shared styling/components are in the repository-local plugin, not copied into individual notes. Future curated technical notes inherit them under `notes/`.
- YAML override contains no credentials. Credential settings were not changed or published.
- Existing Actions workflow remains main-push/manual only. A draft PR or branch push does not deploy Pages. No workflow dispatch, merge, DNS, or live-site update performed.

Do not invoke GitHub Publish while this draft is pending: it publishes to the default branch rather than the draft branch.
