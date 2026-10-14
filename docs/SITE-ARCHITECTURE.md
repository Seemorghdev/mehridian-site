# Mehridian — Site Architecture v1

**Status:** Agreed architectural direction; staged implementation.  
**Scope:** Public information architecture, domains, page features, navigation, publishing boundaries, and release gates.  
**Applies to:** The existing Mehridian site and proposed Docs / Apps destinations.  
**Change rule:** This document does not itself authorize DNS, hosting, application migration, content publication, or production deployment.

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
| `https://edge-evidence.apps.mehridian.tech/` | Proposed / operator-configured public Edge Evidence Visual Gateway hostname | Verify external Heroku + DNS + HTTPS state separately; not owned by this repo | Existing Heroku application |

The `edge-evidence.apps.mehridian.tech` hostname is a pattern for independent demo endpoints. Other applications may use `<app>.apps.mehridian.tech` when warranted; do not create a wildcard DNS record, reserved hostname, or shared runtime as part of this architecture decision.

The `apps.mehridian.tech` directory and its nested application hostnames are independent DNS/hosting concerns. The directory is **not** a reverse proxy requirement and does not imply that Heroku, Cloud Run, or other backends move to GitHub Pages.

### URL stability

Existing public Home, Projects and Notes URLs retain their paths when using the canonical `mehridian.tech` origin. Preserve authored links, fragment IDs, assets, cross-page links, and backlinks. Use redirects only for actual retired routes and test each proposed redirect. Do not duplicate content between the portfolio, Docs and Apps.

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

| Area | Native text popovers | Search UI | Backlinks | Graph |
| --- | --- | --- | --- | --- |
| Home | Off | Off | Off | Off |
| Projects index | Off | Off | Off | Off |
| Individual case study | Off by default; explicit opt-in only | Off by default | Off by default | Off |
| Notes index and notes | On for eligible authored internal links | On | On where relevant | Opt-in on individual notes; never mandatory |
| Research (future) | Selective | Optional | Optional | Optional |
| Journal (future) | Off by default | Optional | Off by default | Off |
| Docs (future site) | On when useful for internal references | On | Optional | Not required for v1 |
| Apps directory | Off | Not required for v1 | Off | Off |

**Current implementation versus target:** The released main-site `quartz.config.yaml` uses `enablePopovers: true` globally, and `theme/index.js` applies `popover-hint` to authored content on Home, Projects and Notes. The Notes-specific search/graph UI is already substantially scoped. Therefore this table is an **implementation target**, not a claim that every row is enforced today. A focused future PR must enforce the policy and add regression coverage.

Preferred implementation: keep Quartz's native preview renderer, explicitly determine page role, and scope eligible authored-content boundaries to the pages that need them. Do not disable all popovers globally, rewrite Quartz internals without cause, or hide functionality solely with ad hoc visual CSS.

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
- **GitHub Publish:** Keep the local per-site YAML override aligned with the committed Quartz configuration **before a future Publish operation**. Local vault configuration is not changed by a GitHub PR; never treat a remote configuration update as local synchronization. Publish only when intentionally authorized.

### Docs

- Publish only a selected, approved, public-safe subset of technical material.
- Private Project 03 / Edge Evidence sources, notes, operational records, credentials, or unapproved drafts are **not** automatically synchronized into Docs.
- Favor public projections and carefully reviewed excerpts; distinguish demonstrated behavior from plans, synthetic examples, and private/internal implementation.
- Select the first documentation collection, its authoritative source, repository and build system **before** provisioning the subdomain. Quartz is a candidate, not a locked choice.
- Avoid competing sources of truth: documentation should identify the relevant project/release and link to code where appropriate.

### Apps

- The directory publishes only app descriptions, stable links, status/limitations, and reviewed screenshots.
- An application's code, runtime, secrets, deployment and authorization remain with the app's own owner/provider.
- Dedicated custom subdomains may point directly to Heroku or another host using provider-issued DNS targets and provider-specific TLS. Each hostname requires independent checks.
- Do not imply a synthetic read-only demo is a production service, monitoring console, or autonomous agent.

## 6. Navigation and shared visual language

The main site keeps **Home, Projects, Notes** as its primary visible navigation until substantive new sections exist. Add Docs and Apps entry points when each destination is ready and has something meaningful to offer; no dead/placeholder links.

Across destinations, share Mehridian identity, naming, typography, color semantics and clear links back to Home. Independent deployments need not share the same JavaScript runtime or Quartz plugin set. Avoid global navigation changes that complicate the initial homepage.

## 7. Implementation order and release gates

1. **Complete — v0.6.1:** Native authored previews, accessible reading controls, theme coordination and graph improvements released via PR #6.
2. **Complete — primary domain:** Quartz root-origin migration released via PR #7; GitHub Pages has the custom domain and HTTPS. Confirm continued browser behavior during subsequent releases.
3. **Current — architecture decision:** Review/merge this spec as a documentation-only change. No DNS, new content, site runtime or application deployment is in scope.
4. **Next — page-feature boundaries:** Separate PR to enforce `Home/Projects minimal; Notes rich` behavior. Tests must prove popovers are absent from Home/Projects and intact on Notes; preserve authored navigation, anchors, dark/light, search, optional graphs and mobile behavior. No content expansion.
5. **Later — Docs MVP:** Select one approved document set; decide builder/repository, public boundary, URLs, build/test/deploy ownership and TLS; provision `docs.mehridian.tech` only when useful content is ready.
6. **Later — Apps MVP:** Select supported live demonstrations; define entry schema, user-facing disclaimers and deployment model; provision `apps.mehridian.tech` when a useful directory exists. Validate any nested demo hostnames separately.

Keep each phase independently reviewable with checks. A draft PR must not deploy. Production changes require explicit merge authorization and a passed production workflow, plus browser acceptance.

## 8. Open decisions (intentionally not locked)

- Docs builder (separate Quartz instance or alternative), repository and authoritative documentation source.
- First Docs collection, its public approval, versioning and whether migration from current references is needed.
- Apps directory builder, initial entries, operational status convention, and health/availability claims.
- Exact eligibility mechanism for selective case-study or Research popovers (frontmatter versus explicit page policy), subject to a focused code review.
- Launch timing for Research and Journal based on genuine public content, not placeholder routes.
- Long-term handling of legacy external links to the former `seemorghdev.github.io/mehridian-site/` project path, after actual browser and URL checks.

## 9. Non-goals

This decision does **not** migrate the Obsidian vault, private Project 03 sources, Heroku applications or backends; add DNS records; create subdomains; introduce a new framework; alter the existing five public pages; publish more research; grant credentials; or modify hosting settings.

All such work needs a scoped plan, appropriate validation, and separate authorization.
