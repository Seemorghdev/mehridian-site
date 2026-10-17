# Mehridian presentation

One repository-local theme for the pinned Quartz v5 engine. Portfolio content and
homepage animation are unchanged. Notes reuse native Quartz search and backlinks.

## Ownership and future Obsidian publishes

- Curated public content: Obsidian Public/site only, mirrored to content/.
- Quartz configuration: GitHub Publish's supported per-site YAML override.
- Theme, graph source, lockfile and build scripts: reviewed repository code.

GitHub Publish 0.1.37 applies content/config deltas over the existing Git tree,
retaining these repository-owned folders. Merged PR #9 and `STEP4-REVIEW.md`
**report** that the operator-local per-site YAML override was backed up and
reconciled (baseUrl and footer Home/Projects URLs) to the released
`mehridian.tech` configuration on 2026-10-14. The operator-local file is
not in this repository, and this documentation review does **not** independently
verify its current contents. Before any separately authorized Publish action,
the operator must recheck the effective override and the `Public/site/`
selection. No GitHub Publish operation is authorized by this documentation PR;
the plugin targets `main`, not this review branch.

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
The canvas nodes themselves are not native keyboard-focusable elements; the
reviewed adaptation provides separate keyboard focus targets with title/excerpt
previews. Normal authored links, backlinks and the text-linked page list remain
accessible fallbacks. This is not physical-device or screen-reader certification.
Frontmatter `graph: false` can suppress a note's graph.

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

### Frozen Evidence Explorer

The Project 03 companion is authored once in
`content/research/project03/evidence-explorer.md`, mirrored from the curated
Obsidian source. Its ordinary Markdown tables retain the reviewed state/count
values and fifteen editorial case IDs. `evidence-explorer.js` decorates those
tables at build time on that exact route only; it supplies no data fetches,
browser chart library, new palette, or duplicate page shell. The existing
theme supplies navigation, light/dark controls, search, reading previews and
backlinks. The dense comparison opts out of its optional graph.

The fifteen-case table is a named, focusable horizontal-scroll region. Its
inner Quartz table wrapper must not own a competing scroll container.
The normal Markdown tables remain a text alternative, including in Obsidian
or without website CSS. No private field/source register, identity mapping,
CSV/JSON download, or raw workbook is part of the published content.

Repository-owned theme code survives normal content/config delta publishes;
the publication source must remain exactly `Public/site/`. This PR does not
invoke the plugin or change its configuration. Do not invoke Publish while
the review branch is pending: the plugin targets main, not this branch.

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

The PR review workflow (`.github/workflows/graph-review.yml`) builds and checks
without a deploy job or Pages write permissions. In contrast,
`.github/workflows/deploy.yml` builds **and deploys** on pushes to `main` or
manual dispatch: even a documentation-only merge to `main` triggers it.
This draft PR must not be merged or deployed without explicit authorization.
See `STEP4-REVIEW.md` for PR #9's local-browser observations and limitations,
and `GARDEN-REVIEW.md` for earlier graph/search review evidence.
