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
  <p class="intro">A hosted synthetic demonstration and an offline vision experiment—different kinds of engineering work, with different limits on what the evidence shows.</p>
</section>

[[projects/edge-evidence|Overview, hosted inspector and retained worker result]] · [Public source](https://github.com/Seemorghdev/edge-evidence-reference-platform-public) · [Docs](https://docs.mehridian.tech/edge-evidence/)

<section class="project-list" aria-label="Project collection">
  <div class="list-label"><span>Selected engineering work</span><span>Two distinct project types</span></div>
  <div class="project-card">
    <div class="project-copy">
      <span class="badge">Working synthetic demonstration</span>
      <h2><a href="./edge-evidence.md">Edge Evidence</a></h2>
      <p>How can you process evidence reliably and show that a copy matches its source?</p>
      <p>The experiment separates processing, replication, and inspection. Its public demos offer a visual introduction and a deeper execution result.</p>
      <div class="actions"><a class="button" href="./edge-evidence.md">Read the case study →</a><a href="https://edge-evidence.apps.mehridian.tech/">Try the visual demo ↗</a></div>
      <div class="project-meta"><span>Python / FastAPI</span><span>Read-only inspection</span><span>Public repositories</span></div>
    </div>
    <a class="project-media" href="./edge-evidence.md" aria-label="Read the Edge Evidence case study"><img src="../assets/edge-evidence-gateway-inspect-2026-10-25.png" alt="Hosted Inspect view: a table of three synthetic records with state, classification, approval and digest, and the deferred record selected" width="1280" height="900" /></a>
  </div>
  <section class="project-card" aria-labelledby="drone-project-title">
    <div class="project-copy">
      <span class="badge">Offline computer-vision experiment</span>
      <h2 id="drone-project-title"><a href="./small-object-detection.md">Small Objects in Big Frames</a></h2>
      <p>What happens to a tiny object when a large camera frame is reduced for detection?</p>
      <p>Scanning full-resolution crops kept the object as a candidate in every one of eight selected field frames. A public rerun of the released model on one image boxed the object in both passes but classified it differently: bird for the whole frame, airplane for the tiles. Choosing the right candidate among several is the open problem.</p>
      <dl class="project-record"><div><dt>Candidate found, 8 of 8 selected frames</dt><dd>8 frames, manually referenced</dd></div><div><dt>Same image, different classification</dt><dd>bird 0.14 whole frame, airplane 0.42 tiled</dd></div><div><dt>Separate selection check</dt><dd>2 of 4 paired observations</dd></div></dl>
      <div class="actions"><a class="button" href="./small-object-detection.md#rerun-title">See the public model run →</a><a href="./small-object-reference.md">Technical reference →</a><a href="https://github.com/Seemorghdev/drone-detection-showcase">Study repository ↗</a></div>
      <div class="project-meta"><span>Python / YOLO</span><span>Tiled inference</span><span>Offline evaluation</span></div>
    </div>
    <figure class="project-media project-artifact"><a href="./small-object-detection.md" aria-label="Open the small-object project and retained results"><img src="../assets/drone-capture-context.jpg" alt="Screened field-capture input showing a small aerial object against cloudy sky above trees" width="540" loading="lazy" /></a><figcaption>Actual capture input, the same image used in the public rerun.</figcaption></figure>
  </section>
  <p class="project-notice">Edge Evidence is the hosted synthetic inspector. Small Objects supplies a public checkpoint, a rerunnable script and the original evaluation outputs.</p>
</section>

<section class="project-availability" aria-labelledby="availability-title"><p class="eyebrow">Access at a glance</p><h2 id="availability-title">What you can inspect.</h2><table><caption>Different projects, different evidence and access boundaries</caption><thead><tr><th scope="col">Project</th><th scope="col">Open now</th><th scope="col">Source and runtime</th></tr></thead><tbody><tr><th scope="row">Edge Evidence</th><td>Hosted synthetic inspector, retained Proof, technical Docs</td><td>Public source; optional Llama stays local</td></tr><tr><th scope="row">Small Objects</th><td>Public rerun with script and receipt, original output images, technical reference</td><td>Application source private; <a href="https://huggingface.co/Seemorgh/yolo11n-aod4-v6">checkpoint and reviewed notebooks public</a>; no live inference endpoint</td></tr></tbody></table></section>
