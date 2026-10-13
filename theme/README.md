# Mehridian presentation

One shared stylesheet and page shell for the existing Quartz v5 engine.
No dependencies, browser scripts, network calls, or new publishing framework.

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
section is created for this milestone. Properties remain hidden publicly.
An ordinary note without its own H1 gets its frontmatter title as the heading.

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
