# Mehridian — Site Architecture v1

**Status:** Architecture agreed; page-specific reading boundaries implemented on `main` via merged PR #9 (2026-10-14). Docs and Apps destinations remain planned and not yet launched.  
**Scope:** Public information architecture, domains, page features, navigation, publishing boundaries, and release gates.  
**Applies to:** The existing Mehridian site and proposed Docs / Apps destinations.  
**Change rule:** This is the canonical Mehridian website architecture decision. Detailed implementation guides should reference it rather than redefine policy. This document does not itself authorize DNS, hosting, application migration, content publication, or production deployment.

## 1. Intent

Mehridian is an independent engineering and research presence, not one homogeneous Quartz knowledge base. Separate the visitor's first impression, exploratory writing, implementation references, and running systems while retaining a coherent identity.

- **Portfolio first:** Home explains the work with restraint; Projects are editorial case studies.
- **Knowledge garden within the portfolio:** Notes remain on the main domain and support connected technical reading.
- **Documentation by project:** Detailed, stable technical references belong in a future Docs experience.
- **Demonstrations at their own runtimes:** The Apps experience indexes and links to applications; it does not require migrating application backends.
- **Explicit public boundary:** No private research becomes public merely because a Docs or Apps destination exists.

Maintain the existing Home design and the five curated public pages. Do not create empty Research, Journal, Docs, or Apps sections to suggest work that is not published yet.

## 2. Domain and ownership map

| Destination | Role | Current decision | Deployment ownership |
| --- | --- | --- | --- |
| `https://mehridian.tech/` | Main identity and portfolio | Live primary canonical domain | This repository, Quartz, GitHub Pages |
| `https://www.mehridian.tech/` | Convenience address | Redirect to the apex; no independent content | Existing Pages/DNS settings |
| `https://mehridian.tech/projects/` | Editorial project index and case studies | Keep on main site | This repository |
| `https://mehridian.tech/notes/` | Connected public technical notes | Keep on main site | This repository |
| `https://mehridian.tech/research/` | Curated research writing | Reserved concept; do not publish empty pages | Main site, future review |
| `https://mehridian.tech/journal/` | Curated public journal | Reserved concept; do not publish empty pages | Main site, future review |
| `https://docs.mehridian.tech/` | Project documentation and technical reference | Planned; not provisioned | Separately reviewed static documentation build |
| `https://apps.mehridian.tech/` | Curated application / demo directory | Planned; not provisioned | Lightweight independent directory |
| `https://edge-evidence.apps.mehridian.tech/` | Live public Edge Evidence Visual Gateway | Local operator review verified Heroku, DNS, HTTPS and HTTP 200 on 2026-10-14; recheck availability when linking | Existing Heroku application |

The configured `edge-evidence.apps.mehridian.tech` hostname exemplifies independent demo endpoints. Other applications may use `<app>.apps.mehridian.tech` when warranted; do not create a wildcard DNS record, reserved hostname, or shared runtime as part of this architecture decision.

The `apps.mehridian.tech` directory and its nested application hostnames are independent DNS/hosting concerns. The directory is **not** a reverse proxy requirement and does not imply that Heroku, Cloud Run, or other backends move to GitHub Pages.

### URL stability

Existing public Home, Projects and Notes URLs retain their paths when using the canonical `mehridian.tech` origin. Preserve authored links, fragment IDs, assets, cross-page links, and backlinks. Use redirects only for actual retired routes and test each proposed redirect. A local-agent sample of two legacy GitHub Pages URLs redirected successfully on 2026-10-14; this is not exhaustive redirect acceptance. Do not duplicate content between the portfolio, Docs and Apps.

## 3. Content taxonomy and visitor journey

| Content type | Primary purpose | Destination | Guideline |
| --- | --- | --- | --- |
| Home | Establish identity, selected work, approach | `/` | Quiet editorial entry; no graph/search/popover controls |
| Projects index | Show selected work | `/projects/` | Project cards and links, not a documentation index |
| Project case study | Explain problem, architecture at a high level, evidence, limits and outcomes | `/projects/<slug>` | Clear links to code, approved docs and live demos |
| Note | Explore a technical question and its connections | `/notes/<slug>` | Authored links, backlinks, previews and optional graph |
| Research article | Present a considered public investigation | `/research/<slug>` (future) | Selective connected-reading features |
| Journal entry | Public editorial update | `/journal/<slug>` (future) | Publish only after explicit curation |
| Documentation | Explain APIs, contracts, architecture, operations and validated procedures | `docs.mehridian.tech/<project>/...` (future) | Organized by project/version; precision over marketing |
| App entry | Explain what a demo does, its state, limits, and where to try it | `apps.mehridian.tech/<app>/` (future) | Link to a dedicated live runtime; do not clone the case study |

A typical path is **Home → Project case study → approved documentation OR running demo**. A note may link into a related project; a project may reference a note when it clarifies the technical question. Cross-site links should clearly identify their destination rather than masquerade as local navigation.

## 4. Feature-boundary policy

The user-facing behavior depends on page role, not simply on Quartz's global configuration or a broad CSS rule.

| Source page / experience | Hover preview **triggers** | Search control | Backlink UI | Graph UI |
| --- | --- | --- | --- | --- |
| Home | Off | Off | Off | Off |
| Projects index | Off | Off | Off | Off |
| Individual case study | Off by default; explicit opt-in only | Off by default | Off by default | Off |
| Notes index and notes | On for eligible authored internal links | On | On where relevant | Opt-in on individual notes; never mandatory |
| Research (future) | Selective | Optional | Optional | Optional |
| Journal (future) | Off by default | Optional | Off by default | Off |
| Docs (future site) | On when useful for internal references | On | Optional | Not required for v1 |
| Apps directory | Off | Not required for v1 | Off | Off |

**Current implementation (merged PR #9):** The main-site `quartz.config.yaml` retains `enablePopovers: true`, but `theme/page-policy.js`, called by `theme/index.js`, gates **source-link triggers** independently of **destination excerpts**. Home, the Projects index and case studies do not trigger native text previews by default; Notes retain eligible authored-link and backlink previews. Only Notes reading content and the explicitly approved Edge Evidence `problem-title` excerpt are exposed as preview destinations. Search stays on the two Notes pages, backlinks on technical notes, and the graph is opt-in on individual notes. All five approved pages and their authored note↔project relationships remain indexed. PR #9's unit, build/output and documented local-browser checks cover this policy; its mobile observations are viewport-based, not physical-device certification. The policy table describes both the implemented current roles and the gates for any future roles.

### Three independent feature boundaries

1. **Preview triggers (source page/link):** Quartz hover behavior is attached to eligible internal links. Disabling or removing `popover-hint` from a destination alone does **not** prevent a Home or Projects link from triggering a preview of a linked Note. Enforce source-page eligibility, and exclude global navigation, footer, cards/actions where inappropriate, search, and graph controls from native text-popover triggers. Keep normal links clickable and keyboard accessible.
2. **Preview targets (destination content):** `popover-hint` selects which *authored destination content* may appear in a fetched popover. An eligible Note may preview a reviewed technical case-study excerpt if explicitly permitted, **without** giving the case-study page preview triggers of its own. Never include the page shell, global controls, private content or unpublished pages. Target eligibility is separate from source eligibility.
3. **Search/graph index membership:** Hiding search, backlinks or graph **controls** on Home or Projects does not remove genuinely published project pages or authored note↔project relationships from the site's curated public index. Search and graph membership are determined by publication/content policy and real authored connections—not by a page's visual control state. A page may be a valid link/preview destination without hosting any exploratory UI.

**Cross-site limit:** Separate Docs and Apps deployments do not automatically join the main Quartz content index, search, popovers, backlinks, or graph. Cross-site references are ordinary outbound links unless an independently designed and approved integration is introduced.

**Implemented approach:** Retain Quartz's native renderer, apply `data-no-popover` according to page role at the **link source**, independently approve destination excerpts, and preserve indexed published-page relationships. Do not disable all popovers globally, rewrite Quartz internals without cause, or rely on ad hoc CSS alone. PR #9 covered Home→Note and Projects→Note using local-only test fixtures (no such authored links on those public pages), plus Notes previews, Note→Project, navigation/footer exclusions, permitted excerpts, ordinary link fallback and published-page relationships. Keep these checks when extending the policy.

### Accessibility and graceful fallback

- Links must remain usable without hover; popovers are enhancements, not navigation prerequisites.
- Keyboard and reduced-motion fallbacks remain available; graphs are optional.
- The source index contains only curated published pages. Do not index arbitrary vault notes or private documentation.
- No default Home graph/search controls; do not interrupt the existing homepage visual identity.
- Preserve accessible theme switching and light/dark styling across the features that remain enabled.

## 5. Content and publication boundaries

### Main site

- **Authoring/publication boundary:** Curated Obsidian `Public/site/` content mirrored into this repository's `content/`; current public manifest is five Markdown pages plus the approved project image.
- **Repository-owned implementation:** Quartz configuration, theme, graph source, scripts, pinned dependencies, CI and deployment workflows remain reviewed code.
- **GitHub Publish (operator-reported, not repository-verified):** The initial 2026-10-14 local review reported a stale per-site Obsidian YAML override (the old GitHub Pages base URL and footer Home/Projects links). Merged PR #9 and `theme/STEP4-REVIEW.md` **report** that an operator backed up the local override and reconciled those three values to `mehridian.tech`, `https://mehridian.tech/` and `https://mehridian.tech/projects/`, respectively. This repository documents that report but cannot inspect or independently verify the operator-local file, its current state, or subsequent changes. Before any separately authorized GitHub Publish operation, the operator should confirm that the effective local override still matches the released repository configuration and that the curated `Public/site/` selection has not expanded. A GitHub PR does not update local Obsidian settings; Publish targets `main` and must not be invoked as part of this documentation-only draft.
- **Commit-level privacy:** `visibility: private`, frontmatter, plugins and rendered-page filters are **not** a universal privacy guarantee. ExplicitPublish is currently disabled. Anything committed to a public Git repository—including excluded pages, source files, history or assets—is potentially disclosed even when it never appears in the rendered site. Before commit/publish, explicitly allowlist public pages **and assets**, exclude secrets/private artifacts, and review public diffs and output. Never rely on a metadata flag to make committed private bytes safe.
- **Telemetry distinction:** Browser analytics are disabled, but the `main` deployment workflow still sends build/update telemetry to a third-party endpoint. Do not claim that no third-party tracking or telemetry exists; review that workflow separately if policy changes.

### Docs

- Publish only a selected, approved, public-safe subset of technical material.
- Private Project 03 / Edge Evidence sources, notes, operational records, credentials, or unapproved drafts are **not** automatically synchronized into Docs.
- Favor public projections and carefully reviewed excerpts; distinguish demonstrated behavior from plans, synthetic examples, and private/internal implementation.
- Select the first documentation collection, its authoritative source, repository and build system **before** provisioning the subdomain. Quartz is a candidate, not a locked choice.
- **Document authority contract:** For every approved technical document, name the owning project/repository, source path and release/version, editorial/public approval, and whether Docs renders the approved source directly or maintains a separately reviewed adaptation. Establish an update/synchronization owner and review process before launch; don't silently fork or duplicate divergent instructions.
- **Source provenance:** Preserve the distinction between original Project 03 engineering records, separately adapted public text and externally demonstrated behavior. Pending Project 03 adaptations remain **private/unapproved** until a separate explicit editorial release. Maintain historical scope, evidence gaps and the difference between observation, interpretation and retrospective claim; technical wording alone does not qualify content for Docs.
- Avoid competing sources of truth: **case studies explain why; Docs explains how; Apps explains where to try it**. Link between distinct interpretations rather than copying complete pages.

### Apps

- The directory publishes only app descriptions, stable links, status/limitations, and reviewed screenshots.
- An application's code, runtime, secrets, deployment and authorization remain with the app's own owner/provider.
- Dedicated custom subdomains may point directly to Heroku or another host using provider-issued DNS targets and provider-specific TLS. Each hostname requires independent checks.
- Do not imply a synthetic read-only demo is a production service, monitoring console, or autonomous agent.

## 6. Navigation and shared visual language

The main site keeps **Home, Projects, Notes** as its primary visible navigation until substantive new sections exist. Add Docs and Apps entry points when each destination is ready and has something meaningful to offer; no dead/placeholder links.

Across destinations, share Mehridian identity, naming, typography, color semantics and clear links back to Home. Independent deployments need not share the same JavaScript runtime or Quartz plugin set, and do not automatically share native search/backlinks/graph indexes. Avoid global navigation changes that complicate the initial homepage.

## 7. Implementation order and release gates

1. **Complete — v0.6.1:** Native authored previews, accessible reading controls, theme coordination and graph improvements released via PR #6.
2. **Complete — primary domain:** Quartz root-origin migration released via PR #7; GitHub Pages has the custom domain and HTTPS. Confirm continued browser behavior during subsequent releases.
3. **Complete — architecture decision:** This canonical architecture was merged via PR #8. Documentation-only merges to `main` still trigger the existing GitHub Pages build/deploy workflow; a draft PR does not.
4. **Complete — page-feature boundaries:** PR #9 enforced `Home/Projects minimal; Notes rich` with separately gated preview **source triggers**, approved **target excerpts**, and preserved **public index membership** and note↔project relationships. Its unit, build/output and documented local-browser checks covered authored navigation, anchors, light/dark appearance, search, optional graphs and mobile viewport behavior without expanding published content.
5. **Later — Docs MVP:** Select one approved document set; decide builder/repository, public boundary, URLs, build/test/deploy ownership and TLS; provision `docs.mehridian.tech` only when useful content is ready.
6. **Later — Apps MVP:** Select supported live demonstrations; define entry schema, user-facing disclaimers and deployment model; provision `apps.mehridian.tech` when a useful directory exists. Validate any nested demo hostnames separately.

Keep each phase independently reviewable with checks. A draft PR must not deploy. Production changes require explicit merge authorization and a passed production workflow, plus browser acceptance.

## 8. Open decisions (intentionally not locked)

- Docs builder (separate Quartz instance or alternative), repository and authoritative documentation source.
- First Docs collection, its public approval, versioning and whether migration from current references is needed.
- Apps directory builder, initial entries, operational status convention, and health/availability claims.
- Any future expansion of source-link eligibility or approved destination excerpts requires a scoped policy and regression review; the current mechanism is implemented in `theme/page-policy.js` and `theme/index.js`.
- Launch timing for Research and Journal based on genuine public content, not placeholder routes.
- Long-term handling of legacy external links to the former `seemorghdev.github.io/mehridian-site/` project path, after actual browser and URL checks.

### Related documentation maintenance

This documentation reconciliation updates `theme/README.md` to distinguish graph-canvas nodes from keyboard focus alternatives and to attribute Obsidian override reconciliation to the PR #9 operator report rather than independent repository verification. Older private vault publishing guides may describe a historical pre-deployment state; they are outside this repository review and must not be treated as verified current operating instructions.

## 9. Non-goals

This decision does **not** migrate the Obsidian vault, private Project 03 sources, Heroku applications or backends; add DNS records; create subdomains; introduce a new framework; alter the existing five public pages; publish more research; grant credentials; or modify hosting settings.

All such work needs a scoped plan, appropriate validation, and separate authorization.
