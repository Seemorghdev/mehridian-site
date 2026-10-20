# Mehridian v0.4 — hero exploration

Review-only. No deployment, DNS, Obsidian source/configuration, or application change.

## Directions

| Study | Character | Tradeoff |
| --- | --- | --- |
| Meridian / Navigation | Survey grid, globe, bearing marks, orbital paths. Closest connection to the name and existing visual identity. | Familiar cartographic geometry; understated rather than spectacular. **Selected.** |
| Flight / Motion | Airflow contours and a rising trajectory with an abstract wing form. | Elegant movement, but implies a more specifically aerospace practice. Static study only. |
| Signals / Fields | Interleaved curves and sparse sample points. | Strong research vocabulary, but less distinctive to Mehridian. Static study only. |

All geometry is illustrative—not observed telemetry, a simulation result, or an invented project achievement.

## Selected implementation

Build-time SVG replaces only the homepage's decorative field. Authored Markdown,
hero layout, links, caption, and the other two public pages remain unchanged.
Two markers complete orbital cycles in 64 and 112 seconds using CSS transforms.
There is no added browser JavaScript, dependency, media download, filter or network request.

A native, labeled checkbox pauses motion; it works with keyboard Space. The
`prefers-reduced-motion: reduce` rule disables both animations and hides the
unneeded control. The SVG has explicit static positions and remains meaningful
without animation. Decorative geometry is hidden from assistive technology;
the control is outside that hidden region.

SVG: 6,255 bytes; animation CSS: 1,533 bytes; combined gzip: 2,092 bytes.
These are component sizes, before subtracting the replaced artwork. CSS transforms
can still consume rendering/battery resources; physical-device FPS/battery testing
has not been performed. The pause selector uses modern CSS `:has`; no persistence
across reloads is added. TouchDesigner was not found in `/Applications` and is not required.

## Review and validation

- Pinned production Quartz engine / Node 22 build: three Markdown pages, 50 emitted files.
- Eleven presentation/hero tests and built-page asset/link checks pass.
- Desktop 1440px, mobile 390px, additional 320px: no horizontal overflow.
- Browser: motion advances; pointer and keyboard pause/resume work; paused transform stays fixed.
- Static fallback fixture renders with animation `none` and the control hidden.
  This forces the same declarations locally; OS reduced-motion settings were not changed/emulated.
- Review-study routes omit the Quartz runtime (they are not additional public pages).

After preparing the engine using the existing deployment workflow, build with
`npx quartz build -d ../content -o ../preview` from `quartz-engine/`. From the
repository root run `node scripts/hero-review.mjs`, then
`MEHRIDIAN_PREVIEW_PORT=8177 node scripts/preview.mjs`.
The ignored local `preview/review/` contains three static studies, a fallback
fixture, and a self-contained `prototype.html` (no scripts or network-loaded assets).
These are not added to `content/` or published by the deployment workflow.

Publishing compatibility: implementation stays in retained repository-local
`theme/`; the existing plugin config is unchanged. The private Obsidian homepage
keeps its original static SVG. No Publish operation has been invoked.

## 20 October — integrated work-first candidate

The chosen meridian remains the **only** live decorative direction. The homepage
now gives it a wider visual role beside a specific Edge Evidence opening and its
genuine Inspect image, not a standalone hero study. Grid and globe strokes have
been strengthened slightly; the two orbital motions slow to 72s and 120s. A
visible native pause checkbox and CSS-only reduced-motion static state remain.
The research and notebook material are authored content, not simulation labels.

The older v0.4 measurements and browser observations above describe the previous
candidate, **not** this one. Recheck exact new SVG/CSS byte and gzip counts and
real browser light/dark, desktop/mobile, pause/resume, reduced-motion and ordinary
reading surfaces before approval. No new runtime animation JavaScript.

### Exact candidate browser acceptance — 20 October

The Notes index owns both `mehr-note` and `mehr-notes-index` on the same
element. Corrected its compound CSS selectors and added a regression test;
the intended two-column desktop shelves and one-column phone shelves now render.

- Production build: 15 Markdown pages; all 43 presentation tests pass.
- Real browser: homepage and Notes reviewed in light/dark at measured 1440px
  and 390px viewport widths; homepage also checked at 1280px and 768px.
  No horizontal page overflow, broken homepage images, or browser errors observed.
- Native pause checkbox: pointer pause and keyboard Space resume work;
  animation transforms advance while running and stay fixed while paused.
- Notes search returns published content; theme selection survives navigation
  and reload.
- Reduced-motion static fixture: both animations are `none`, control hidden,
  layout intact. This is a declaration-level browser rehearsal, not OS media
  preference emulation. Physical-device performance remains unmeasured.
- Build, asset, link, curated-content/privacy, Explorer download-integrity,
  reading-preview, graph and branded-favicon checks pass.

## 20 October — bounded animation simplification

Supersedes the integrated candidate artwork above, not the homepage composition:
remove the extra CSS background circle, survey grid, dense bearing ticks,
second orbit/marker and diagonal line. Keep one globe with sparse meridians,
one 72-second orbit and one moving marker. Place the native pause control in
normal flow below the artwork. The phone SVG now fits inside its field instead
of being vertically clipped.

No authored content, links, homepage sections, dependencies or workflows changed.
All 44 presentation tests and production build/asset/link/privacy/reading/graph/
favicon checks pass. Browser review: 1440px desktop and 390px phone, light/dark;
320px phone also has no overflow or artwork clipping. Pointer pause freezes the
transform; keyboard Space resumes it. The static reduced-motion fixture has no
animation and hides the control. OS preference emulation and physical-device
performance remain untested; no claim of those tests is made.
