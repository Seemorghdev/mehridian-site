# Mehridian presentation

One repository-local theme for the pinned Quartz v5 engine. Portfolio content and
homepage animation are unchanged. Notes reuse native Quartz search and backlinks.

## Ownership and future Obsidian publishes

- Curated public content: Obsidian Public/site only, mirrored to content/.
- Quartz configuration: GitHub Publish's supported per-site YAML override.
- Theme, graph source, lockfile and build scripts: reviewed repository code.

GitHub Publish 0.1.37 applies content/config deltas over the existing Git tree,
retaining these repository-owned folders. The supported override matches the
released custom-domain YAML (baseUrl and footer links use mehridian.tech).
No Publish operation was invoked. Do not Publish while this PR is
pending: the plugin targets main rather than this review branch.

## Official graph and accessible fallbacks

The homemade SVG graph is removed. The sole graph is the official Quartz Community
D3/Pixi implementation, vendored at a pinned source revision under graph/ with
license, source-level fixes and an explicit change inventory. See graph/README.md.
No installed plugin or generated bundle is patched. Generated source-build output
is ignored and rebuilt on every CI invocation, including dependency-cache hits.

Opt-in local and global graphs inherit the shared theme for technical notes.
Nodes use authored links, never menu links. The native index, search and backlinks
share these resolved relationships. Actual tags participate only when authored.
Normal links, backlinks and the full published-page text list work for keyboard
readers or graph failures; no private vault is read by the website.

D3/Pixi assets are minified, npm-lock pinned, licensed and served from the site.
No runtime CDN or new service. The graph is optional and skipped for reduced motion.
Canvas nodes have keyboard focus targets and title/excerpt previews; normal links
remain the accessible fallback.
Frontmatter graph: false can suppress a note's graph.

Search remains native Quartz/FlexSearch with keyboard shortcuts, result navigation
and the existing close/focus adapter. The index contains exactly five curated pages.
No new Notes, Research or Journal content is introduced by this infrastructure revision.

## Page roles and native previews

The policy in page-policy.js implements SITE-ARCHITECTURE.md Section 4 without
modifying the pinned engine or its generated plugins. Home, Projects index and
case studies opt out at the source-link level using Quartz's data-no-popover.
Notes allow eligible authored links and native backlinks. Shared navigation,
footers, decorative heading anchors and graph text controls do not trigger them.

Destination hints are independent: Notes expose authored reading content; the
Edge Evidence case study exposes only its existing problem-title section. Other
portfolio pages expose no authored preview content. New case-study excerpts
require an explicit entry in approvedCaseExcerpts; they are not silently chosen.
The same five public pages and authored edges remain in search/graph indexes.
Search stays on both Notes pages, backlinks on technical notes, graphs opt-in.

## Local rehearsal

Run after installing the pinned engine and plugins:

```sh
npm ci --prefix theme/graph
node scripts/build-graph.mjs
node --test theme/*.test.mjs
cd quartz-engine
node quartz/bootstrap-cli.mjs build -d ../content -o ../preview
cd ..
node scripts/copy-graph-assets.mjs
node scripts/check-build.mjs
node scripts/check-connected-notes.mjs
node scripts/check-garden.mjs
node scripts/check-reading.mjs
node scripts/prepare-page-policy-fixtures.mjs # local QA copies; never deployment inputs
node scripts/preview.mjs
```

Deployment remains main-only/manual; the PR review workflow builds without deploying.
See GARDEN-REVIEW.md for observed browser results and remaining limitations.
