# Step 4 — page-specific reading boundaries

Baseline: `2d55de211426f7a07564f63ff09ac4e6de003ae0`.
Review only: no deployment or GitHub Publish operation.

## Implementation

- `page-policy.js` gates source links through native Quartz `data-no-popover`.
  Home, Projects index and case studies opt out, independent of destination hints.
- Notes expose authored reading content and eligible backlink previews. Shared
  navigation/footer, decorative heading anchors and graph text controls opt out.
- Notes may preview the existing Edge Evidence `problem-title` section only.
  This exposes no demo controls, image, shell or graph. New case-study excerpts
  require explicit review; no generic portfolio excerpt is silently selected.
- Index membership and authored relationships are untouched. All five approved
  Markdown pages and the one existing image remain byte-for-byte unchanged.
- No generated Quartz code, lockfile, global popover switch, hero, graph renderer,
  application code or publication content was modified.

## Checks

The unit suite includes source/destination separation, parsed HTML excerpt
selection, anchored links, backlink gates, unchanged index edges and reduced
motion. Generated-page checks validate actual source opt-outs, preview regions,
heading links, theme initialization, five-page manifest and custom-domain URLs.
The PR-only CI rehearses the production configuration; it has no deployment job.

Local browser observations, 14 October 2026 (UTC):

| Behavior | Observed result |
|---|---|
| Home → Note; Projects index → Note | No active native popover |
| Case study → Note | No active native popover |
| Notes → Note | Native authored-content preview |
| Notes → case study; backlink → case study | Approved section only |
| Navigation/footer | No active popover |
| Keyboard link / fragment | Enter navigates to the existing ADK/Ollama heading |
| Case-study fragment | Public-code link retains its target section |
| Search | Technical note returned; Escape restores trigger focus |
| Opt-in graph | Canvas loads; drag stays on page; keyboard node navigates |
| Graph asset failure | Explicit fallback plus normal connected links/backlinks |
| Light/dark | Header toggle, reading previews and portfolio rendering work |
| Mobile | 390 × 844 viewport, no horizontal overflow; normal navigation and graph work |
| Console | No warnings/errors in normal desktop journey |

Home/Projects have no authored Note links today. The missing combinations were
tested with local-only copies containing a QA link processed by the **actual
theme transformer**. They never enter content or the public index. Browser tests
are observed manual regression evidence; they are not a hosted browser suite.
Reduced motion uses the existing controlled local fixture plus a focused test
of the real controller and existing CSS assertions, not a physical device/OS
preference test. Mobile is a viewport test, not a physical-phone certification.

Screenshots: `.github/review-assets/step4/` (public pages only).

## Obsidian reconciliation

The operator-local per-site YAML was backed up outside the publishing tree.
Exactly three stale values were reconciled with the released repository YAML:

- `baseUrl`: `Seemorghdev.github.io/mehridian-site` → `mehridian.tech`
- Footer Home: `https://seemorghdev.github.io/mehridian-site/` → `https://mehridian.tech/`
- Footer Projects: `https://seemorghdev.github.io/mehridian-site/#projects` → `https://mehridian.tech/projects/`

The reconciled file matches the repository YAML exactly. Curated source content
is unchanged and matches the five pages/one image in content. Publishing remains
restricted to Public/site; no credential or selection change was made.

No operator action is required for that reconciliation. **Do not invoke GitHub
Publish while this draft is pending**: it targets main, not the review branch.
Merge/release approval remains separate.
