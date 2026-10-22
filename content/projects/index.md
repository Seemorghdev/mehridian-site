---
title: Projects
description: Selected engineering experiments from Mehridian, starting with Edge Evidence.
visibility: public
status: published
presentation: projects
---

<section class="page-intro" aria-labelledby="projects-title">
  <p class="eyebrow">Selected engineering experiments</p>
  <h1 id="projects-title">Projects</h1>
  <p class="intro">A hosted synthetic demonstration, an offline vision experiment, and a solo hackathon prototype—different kinds of engineering work, with different limits on what the evidence shows.</p>
</section>

<section class="project-list" aria-label="Project collection">
  <div class="list-label"><span>Selected engineering work</span><span>Three distinct project types</span></div>
  <div class="project-card">
    <div class="project-copy">
      <span class="badge">Working synthetic demonstration</span>
      <h2><a href="./edge-evidence.md">Edge Evidence</a></h2>
      <p>How can you process evidence reliably and show that a copy matches its source?</p>
      <p>The experiment separates processing, replication, and inspection. Its public demos offer a visual introduction and a deeper execution result.</p>
      <div class="actions"><a class="button" href="./edge-evidence.md">Read the case study →</a><a href="https://edge-evidence-visual-gateway-2e3eaeb86f95.herokuapp.com/">Try the visual demo ↗</a></div>
      <div class="project-meta"><span>Python / FastAPI</span><span>Read-only inspection</span><span>Public repositories</span></div>
    </div>
    <a class="project-media" href="./edge-evidence.md" aria-label="Read the Edge Evidence case study"><img src="../assets/edge-evidence-gateway-inspect-2026-10-20.jpg" alt="Hosted Edge Evidence Inspect view showing three independent synthetic records and the read-only classification for the selected recorded-complete example" width="1440" height="1100" /></a>
  </div>
  <section class="project-card project-card--text" aria-labelledby="drone-project-title">
    <div class="project-copy">
      <span class="badge">Offline computer-vision experiment</span>
      <h2 id="drone-project-title"><a href="./small-object-detection.md">Small Objects in Big Frames</a></h2>
      <p>What happens to a tiny object when a large camera frame is reduced for detection?</p>
      <p>Overlapping image crops helped surface candidates in a small, manually referenced field evaluation. Choosing the correct candidate remained a separate challenge—not a field-accuracy claim.</p>
      <div class="actions"><a href="./small-object-detection.md">Read the case study →</a></div>
      <div class="project-meta"><span>Python / YOLO</span><span>Tiled inference</span><span>Offline evaluation</span></div>
    </div>
  </section>
  <section class="project-card project-card--text" id="hackathon-entry" aria-labelledby="hackathon-project-title">
    <div class="project-copy">
      <span class="badge">Solo hackathon prototype</span>
      <h2 id="hackathon-project-title">A common view for mismatched observations</h2>
      <p>A solo application prototype explored bringing differently formatted observations—units, timestamps and identifiers—into a common software view. The retained work includes a solution account, historical synthetic-scenario check summaries and an explanatory HTML presentation.</p>
      <p>A synthetic vision bridge was documented as later work. The checks were not reproduced for this entry; neither field performance nor a live sensor deployment is established. The presentation is not a runtime screenshot.</p>
      <div class="project-meta"><span>Solo hackathon work</span><span>Synthetic scenarios</span><span>Presentation, not live UI</span></div>
    </div>
  </section>
  <p class="project-notice">Edge Evidence is the linked hosted synthetic demonstration. The other two entries describe offline or synthetic prototype work; neither offers a public runnable application or source release.</p>
</section>
