# Mehridian presentation

One shared stylesheet and page shell for the existing Quartz v5 engine.
No added dependencies, hosted services, analytics, or new publishing framework.
Notes reuse Quartz's native client-side Search and built-time Backlinks. A small
accessibility adapter adds a close button and modal focus containment.

The site config uses `source: ../theme`, relative to the existing workflow's
`quartz-engine/` working directory. Quartz's supported local-plugin loader
links the checked-out theme and reads its CSS from this same repository commit.
The existing build workflow does not need to change.

## Publishing ownership

- Curated page text, frontmatter, and screenshots: Obsidian `Public/site/` → `content/`.
- Configuration: GitHub Publish's supported per-site YAML override.
- Presentation code: this repository's `theme/` folder, reviewed in Git.

GitHub Publish v0.1.37 updates selected content/config paths in the existing
Git tree; it does not remove unrelated repository folders. The generated
workflow, lockfile, and Quartz engine remain unchanged. A plugin/toolchain
upgrade should receive the usual compatibility review before publishing.

Do not click Publish changes while a design PR is awaiting review:
the plugin publishes to the repository's default branch, not a preview branch.

## Connected notes

The theme is applied automatically. A newly selected public Markdown note
can retain native wikilinks, frontmatter, headings, and backlinks in Quartz's
content index without copying CSS or navigation. No Notes/Research/Journal
or Journal section is created for this milestone. Properties remain hidden publicly.
An ordinary note without its own H1 gets its frontmatter title as the heading.

## Local connection map and search

Quartz's pinned graph plugin was inspected: its canvas renderer loads D3 7 and
PixiJS 8 from jsDelivr and runs a force simulation. For this small garden, the
theme instead presents Quartz-resolved authored links in an expandable linked
SVG, with ordinary linked text as an accessible alternative. No graph client
library, CDN request, simulation, visited tracking, or graph animation is added.
This is a presentation adapter, not the native force-directed Graph widget.

Before adding shared navigation, the theme resolves a copy of the authored HAST
with Quartz's existing CrawlLinks transformer (same `shortest` strategy). Those
resolved relationships are retained separately from header/footer links. The map
includes only actual emitted pages with `visibility: public`, in either direction.
It is local, excludes synthetic tag nodes, and shows at most six neighbors in the
diagram; the full text list remains available. It never reads the private vault.

All technical pages under `notes/` except the landing page inherit this behavior.
The map starts collapsed, works without JavaScript, has keyboard-focusable links,
and never animates. Optional frontmatter `graph: false` omits it for an individual
note. No map layout or styling needs to be copied into Markdown.

Search uses the standard Quartz public content index and bundled FlexSearch.
It is exposed on the Notes landing page and technical notes, with previews off
to avoid extra page fetches. Ctrl/Cmd+K, arrow-key result selection, and Escape
remain Quartz behavior. Tab/Shift+Tab traverse controls and links inside the
modal; the adapter provides explicit focus containment. Empty generated pages
are excluded by the supported `includeEmptyFiles: false` ContentIndex option.
No content is indexed outside the build's `content/` directory.
Native wikilinks, backlinks, and tag parsing remain enabled and unchanged.
No full-site graph is added while there is only one technical note.

## Local checks

```sh
node --test theme/index.test.mjs
# Run from the already-installed, pinned engine directory:
cd quartz-engine
node quartz/bootstrap-cli.mjs build -d ../content -o ../preview --concurrency 1
cd ..
node scripts/preview.mjs
```

The public gateway screenshot is an actual browser capture from
https://edge-evidence-visual-gateway-2e3eaeb86f95.herokuapp.com/
on 2026-10-13 UTC. It is not a mockup or a new deployment.
