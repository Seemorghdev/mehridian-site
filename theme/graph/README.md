# Official Quartz graph — reviewed source adaptation

Upstream: https://github.com/quartz-community/graph
Pinned source: `46f0ba1c3c0cc484697572e7bcf315fa384d80d2`, MIT license retained.

This is the official D3/Pixi renderer, not a second graph implementation.
The source is retained here because upstream does not expose opt-in lifecycle,
movement-threshold, or same-origin-library options. Review updates against this
exact upstream revision. No installed-plugin files or generated bundles are patched.

Local changes: English title for this en-US site; opt-in open/close lifecycle;
same-origin version-pinned dependencies; gesture displacement guard; 44px node
hit areas; wrapped/clamped labels and wider collision spacing; cleanup of stale
async renders; accessible fallback and modal controls supplied by the theme.

Build: `npm ci --prefix theme/graph`, `node scripts/build-graph.mjs`, Quartz build,
then `node scripts/copy-graph-assets.mjs <Quartz output directory>`.
The npm lockfile pins transitive integrity hashes. Libraries are fetched at build
time only; visitors make no CDN requests. Generated output remains ignored.

The native Canvas graph is pointer-oriented. Normal links, backlinks and a full
page list remain keyboard-usable without JavaScript/WebGL. Reduced motion skips
graph loading. Browser-local visited state is best-effort and not telemetry.

No Project 03 material is included. Graph and search read the same five curated
pages. Adding content remains a separate publication approval.
