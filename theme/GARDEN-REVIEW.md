# Mehridian v0.6 — official graph infrastructure review

Local verification: 14 October 2026 (UTC). Draft only; no publish or deployment.

## Implementation

- Existing five public Markdown pages plus one existing image. No new content in this revision.
- Homemade SVG renderer removed. Official Quartz Graph source is retained under theme/graph,
  pinned to 46f0ba1c3c0cc484697572e7bcf315fa384d80d2 with MIT license and explicit local-change notes.
- Source-level fixes: click/drag displacement threshold, zoom-adjusted 44px node hit area,
  wrapped labels, wider collision spacing, opt-in lifecycle and cleanup. No generated-code patching.
- D3 7.9.0 and Pixi 8.18.0 are npm-lock pinned and emitted as same-origin minified assets.
  Total raw library size: 1,076,106 bytes; gzip estimate: 317,587 bytes. This is an estimate,
  not a measured mobile transfer or frame-rate benchmark. Dependencies load only after opt-in.
- One authored-link index feeds native graph, search and backlinks. Shared menus do not create graph edges.
- Retained native Search and keyboard/close/focus adapter. Notes alone show graph/search;
  portfolio pages and existing homepage hero stay unchanged.
- Text alternatives and native backlinks remain available without the graph. Canvas nodes are not
  individually keyboard-focusable; all five pages are linked in the modal text alternative.
- Reduced motion skips graph loading; browser-local visited state is best-effort, not analytics.

## Checks and observed interactions

- Actual pinned Quartz engine 9cf87ff1c248a8ca551093214b0fec3b31415009; Node 22.23.3 production build.
- Five Markdown files, 54 emitted files before copied dependency assets.
- 19 unit tests pass: gesture displacement/round-trip drag, target sizing, routes, privacy,
  source lifecycle, presentation and retained hero tests.
- Build, curated manifest, native wikilink/backlink, five-page search/graph and asset checks pass.
- Real browser: desktop 1280x800 and mobile 390x844. Wrapped labels and linked alternatives fit;
  no horizontal page overflow observed. Mobile testing used a desktop browser viewport, not a physical phone.
- Actual node drag moves the node without navigation; normal node click navigates to Notes.
- Native zoom and empty-space pan tested. Global close, Tab into text links, Escape and focus return pass.
- Search finds the technical note and Enter opens it. Backlinks remain visible.
- Hide graph removes canvas. Controlled missing-library test shows explicit fallback text;
  connected-page links remain usable. Expected 404/console errors apply only to that fault fixture.
- Controlled reduced-motion fixture: zero graph library requests/canvas, normal links retained.
  OS media preference was not changed or emulated.
- Fresh successful browser tab has no warnings/errors. All observed graph dependency requests are same-origin.
- No timing/FPS benchmark, real-device multi-touch/pinch test, or large-garden usability claim.

## Publishing boundary

- content/ stays identical to the existing Public/site selection, with no unpublished research.
- Repository theme, source build script and asset-copy step survive GitHub Publish's base-tree delta.
- Credential-free per-site supported YAML override is synchronized to quartz.config.yaml.
- Do not invoke GitHub Publish while this draft is pending: it targets main, not the review branch.
- PR-only graph-review workflow builds/tests without Pages permissions or deployment.
  Existing production workflow still runs only on main push or manual dispatch; neither was invoked.

Review assets: official-graph-desktop.jpg, official-graph-mobile-local.jpg,
official-graph-mobile-global.jpg under .github/review-assets/mehridian-v0.6/.
