---
title: Edge Evidence
description: A synthetic demonstration of evidence processing, verified copies, and read-only inspection.
visibility: public
status: approved-for-publication
---

<style>
/* Mehridian v0.2: carried by the two curated source pages, not an engine overlay. */
:root {
  --mehr-ink: #172322;
  --mehr-muted: #596865;
  --mehr-paper: #fafbf8;
  --mehr-line: #dce4de;
  --mehr-accent: #255a4d;
  --mehr-tint: #edf3ed;
}
html { scroll-behavior: smooth; }
body { background: var(--mehr-paper); color: var(--mehr-ink); }
#quartz-root.page { box-sizing: border-box; width: 100%; max-width: 1160px; padding: 0 40px; margin: 0 auto; }
#quartz-root #quartz-body { box-sizing: border-box; display: block; width: 100%; padding: 0; }
#quartz-root .sidebar { display: none; }
#quartz-root .center { width: 100%; min-width: 0; margin: 0; padding: 0; }
#quartz-root .page-header, #quartz-root .center > hr, #quartz-root .page-footer { display: none; }
#quartz-root article {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
  font-size: 17px; line-height: 1.65; color: var(--mehr-ink);
}
#quartz-root article h1, #quartz-root article h2, #quartz-root article h3 {
  font-family: inherit; color: var(--mehr-ink); line-height: 1.15; letter-spacing: -.035em;
}
#quartz-root article h1 { font-size: clamp(2.8rem, 5vw, 4.6rem); margin: 18px 0 24px; }
#quartz-root article h2 { font-size: 2rem; margin: 0 0 20px; }
#quartz-root article h3 { font-size: 1.65rem; margin: 10px 0 16px; }
#quartz-root article p { color: var(--mehr-muted); margin: 0 0 20px; }
#quartz-root article a { color: var(--mehr-accent); font-weight: 500; text-decoration: none; background: none; }
#quartz-root article a:hover { text-decoration: underline; text-underline-offset: 4px; }
#quartz-root article a:focus-visible { outline: 2px solid var(--mehr-accent); outline-offset: 5px; border-radius: 2px; }
#quartz-root .mehr-nav { display: flex; align-items: center; justify-content: space-between; gap: 28px; padding: 28px 0; border-bottom: 1px solid var(--mehr-line); }
#quartz-root .mehr-brand { font-size: 18px; letter-spacing: .06em; font-weight: 650; color: var(--mehr-ink); }
#quartz-root .mehr-nav-links { display: flex; gap: 28px; font-size: 14px; }
#quartz-root .mehr-nav a[aria-current] { color: var(--mehr-ink); text-decoration: underline; text-underline-offset: 6px; }
#quartz-root .mehr-hero { display: grid; grid-template-columns: 1.3fr 1fr; align-items: center; gap: 64px; padding: 76px 0 68px; }
#quartz-root .mehr-eyebrow { text-transform: uppercase; font-size: 11px; font-weight: 600; letter-spacing: .16em; color: var(--mehr-accent); margin: 0 0 14px; }
#quartz-root .mehr-lede { max-width: 520px; font-size: 19px; line-height: 1.6; }
#quartz-root .mehr-art { position: relative; min-height: 275px; overflow: hidden; border: 1px solid var(--mehr-line); border-radius: 4px; background: var(--mehr-tint); display: grid; place-items: center; }
#quartz-root .mehr-art::before { content: ""; position: absolute; width: 220px; height: 220px; border: 1px solid #b4c8ba; border-radius: 50%; box-shadow: 0 0 0 27px var(--mehr-tint), 0 0 0 28px #c8d7cb, 0 0 0 55px var(--mehr-tint), 0 0 0 56px #d6e1d8; }
#quartz-root .mehr-art::after { content: ""; position: absolute; width: 1px; height: 100%; background: #c1d0c5; transform: rotate(37deg); }
#quartz-root .mehr-art-label { z-index: 1; padding: 8px 13px; background: var(--mehr-paper); border: 1px solid var(--mehr-line); font-size: 11px; letter-spacing: .16em; text-transform: uppercase; }
#quartz-root .mehr-actions { display: flex; flex-wrap: wrap; gap: 12px 22px; align-items: center; margin-top: 26px; font-size: 15px; }
#quartz-root a.mehr-button { display: inline-block; color: #fff; background: var(--mehr-accent); border: 1px solid var(--mehr-accent); border-radius: 3px; padding: 10px 18px; font-weight: 600; }
#quartz-root a.mehr-button:hover { background: #194439; text-decoration: none; }
#quartz-root .mehr-section { padding: 45px 0; border-top: 1px solid var(--mehr-line); scroll-margin-top: 24px; }
#quartz-root .mehr-card { display: grid; grid-template-columns: 1.65fr 1fr; gap: 40px; padding: 30px; border: 1px solid var(--mehr-line); border-radius: 4px; background: #fff; }
#quartz-root .mehr-card p:last-child { margin: 0; }
#quartz-root .mehr-card-side { padding-left: 28px; border-left: 1px solid var(--mehr-line); display: flex; flex-direction: column; justify-content: center; gap: 16px; font-size: 15px; }
#quartz-root .mehr-small { font-size: 14px; }
#quartz-root .mehr-two { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; }
#quartz-root .mehr-code { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
#quartz-root .mehr-code > div { padding-top: 18px; border-top: 1px solid var(--mehr-line); }
#quartz-root .mehr-code h3 { font-size: 1.2rem; }
#quartz-root .mehr-code p { font-size: 15px; }
#quartz-root .mehr-foot { display: flex; justify-content: space-between; gap: 28px; padding: 30px 0 40px; border-top: 1px solid var(--mehr-line); font-size: 13px; }
#quartz-root .mehr-foot span { color: var(--mehr-muted); }
#quartz-root .mehr-foot nav { display: flex; gap: 22px; }
@media (max-width: 700px) {
  #quartz-root.page { padding: 0 24px; }
  #quartz-root article { font-size: 16px; }
  #quartz-root .mehr-nav { padding: 22px 0; gap: 18px; }
  #quartz-root .mehr-nav-links { gap: 20px; font-size: 13px; }
  #quartz-root .mehr-hero { grid-template-columns: 1fr; gap: 32px; padding: 48px 0 42px; }
  #quartz-root article h1 { font-size: 2.8rem; }
  #quartz-root .mehr-lede { font-size: 17px; }
  #quartz-root .mehr-art { min-height: 160px; }
  #quartz-root .mehr-art::before { width: 135px; height: 135px; }
  #quartz-root .mehr-card, #quartz-root .mehr-two, #quartz-root .mehr-code { grid-template-columns: 1fr; gap: 25px; }
  #quartz-root .mehr-card { padding: 24px; }
  #quartz-root .mehr-card-side { padding: 22px 0 0; border-left: 0; border-top: 1px solid var(--mehr-line); }
  #quartz-root .mehr-section { padding: 34px 0; }
  #quartz-root .mehr-foot { flex-direction: column; gap: 18px; }
}
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
</style>

<nav class="mehr-nav" aria-label="Main navigation">
  <a class="mehr-brand" href="../">Mehridian</a>
  <div class="mehr-nav-links"><a href="../">Home</a><a href="../#projects" aria-current="location">Projects</a></div>
</nav>

<section class="mehr-hero" aria-labelledby="project-title">
  <div>
    <p class="mehr-eyebrow">Project 01 · Synthetic engineering demo</p>
    <h1 id="project-title">Edge Evidence</h1>
    <p class="mehr-lede">Preserving evidence.<br>Processing it reliably.<br>Verifying the copies.</p>
    <p>How do you show that a copied result matches its source? This experiment separates processing, replication, and inspection to make those responsibilities visible.</p>
    <div class="mehr-actions"><a class="mehr-button" href="https://edge-evidence-visual-gateway-2e3eaeb86f95.herokuapp.com/">Open visual demo ↗</a><a href="#public-code">Explore the code ↓</a></div>
  </div>
  <div class="mehr-art" aria-hidden="true"><span class="mehr-art-label">Preserve · Process · Verify</span></div>
</section>

<section class="mehr-section mehr-two" aria-label="Two ways to explore">
  <div>
    <p class="mehr-eyebrow">01 · Start visually</p>
    <h2>Inspect three states</h2>
    <p>The <a href="https://edge-evidence-visual-gateway-2e3eaeb86f95.herokuapp.com/">Visual Gateway</a> presents completed, waiting, and prepared synthetic examples. Each Explain button describes what the state means and what a reviewer can inspect.</p>
    <p class="mehr-small">Web UI + Evidence API + read-only Edge Agent. Explanations use deterministic rules: they do not start workers or execute the complete processing and replication workflow. These responsibilities share one demo runtime, not production-grade service isolation.</p>
  </div>
  <div>
    <p class="mehr-eyebrow">02 · Follow the execution</p>
    <h2>Look beyond the UI</h2>
    <p>The <a href="https://seemorgh-evidence-showcase-45655632eff2.herokuapp.com/api/demo">Processor + Replication JSON/API proof</a> returns a synthetic execution result that may be cached.</p>
    <p>It records processing, a verified handoff, independent readback of the copied bytes, and replay with no new writes.</p>
    <p class="mehr-small">This is structured JSON, not a visual application. Neither demo claims production availability or persistent hosted evidence storage.</p>
  </div>
</section>

<section class="mehr-section" id="public-code" aria-labelledby="code-title">
  <p class="mehr-eyebrow">Public engineering repositories</p>
  <h2 id="code-title">Follow the work into the code</h2>
  <div class="mehr-code">
    <div><h3><a href="https://github.com/Seemorghdev/edge-evidence-processor-public">Processor ↗</a></h3><p>Processing and recovery behavior.</p></div>
    <div><h3><a href="https://github.com/Seemorghdev/edge-evidence-replication-projection">Replication ↗</a></h3><p>Copying, independent verification, and safe replay.</p></div>
    <div><h3><a href="https://github.com/Seemorghdev/edge-evidence-reference-platform-public">Reference Platform ↗</a></h3><p>The interface, API, inspector, and single-app gateway.</p></div>
  </div>
</section>

<footer class="mehr-foot">
  <span>Mehridian · Independent engineering &amp; research</span>
  <nav aria-label="Footer navigation"><a href="../">Home</a><a href="../#projects">Projects</a><a href="https://github.com/Seemorghdev/mehridian-site">Site source ↗</a></nav>
</footer>
