---
title: Edge Evidence
description: An engineering experiment in reliable processing, verified copies, and read-only inspection, demonstrated with synthetic data.
visibility: public
status: review-candidate
presentation: case-study
---

<section class="case-hero" aria-labelledby="case-title">
  <p class="eyebrow">Project 01 / Software systems</p>
  <h1 id="case-title">Edge Evidence</h1>
  <p class="intro">Reliable processing. Verified copies.<br>A clearer view of what the system has actually done.</p>
  <div class="actions"><a class="button" href="https://edge-evidence-visual-gateway-2e3eaeb86f95.herokuapp.com/">Open visual demo ↗</a><a href="#public-code">Explore the public code ↓</a></div>
  <div class="case-meta"><span>Python / FastAPI</span><span>Processing + replication</span><span>Synthetic data only</span></div>
</section>

<figure class="case-figure">
  <img src="../assets/edge-evidence-gateway.jpg" alt="The real public Visual Gateway displaying three synthetic states, each with an Explain button" width="1440" height="1648" />
  <figcaption>Actual public <a href="https://edge-evidence-visual-gateway-2e3eaeb86f95.herokuapp.com/">Visual Gateway</a>, captured 13 October 2026 (UTC). A read-only demonstration—not a production monitoring console.</figcaption>
</figure>

<section class="case-section" aria-labelledby="problem-title">
  <div><p class="eyebrow">01 / The question</p><h2 id="problem-title">What should<br>“done” mean?</h2></div>
  <div class="body">
    <p class="intro">A system can say that work finished. A reviewer still needs to know what happened, what can be checked, and whether the copied result matches its source.</p>
    <p>Edge Evidence explores that handoff. Processing, copying, verification, and inspection have separate responsibilities. The demonstrations make those boundaries visible without using private evidence.</p>
  </div>
</section>

<section class="case-section" aria-labelledby="architecture-title">
  <div><p class="eyebrow">02 / The design</p><h2 id="architecture-title">Two views.<br>Different jobs.</h2></div>
  <div class="body">
    <p>The visual page explains example states. The execution proof records a synthetic processing-and-replication result. They are complementary demonstrations, not one continuous workflow triggered by the UI.</p>
    <div class="track">Read-only inspection view</div>
    <div class="flow inspection-flow" role="img" aria-label="A browser uses the visual gateway, which routes separate requests to the synthetic evidence API and deterministic inspector. The API does not call the inspector; no workers are executed by the UI.">
      <div><strong>Browser</strong><span>Choose an example</span></div>
      <div><strong>Visual Gateway</strong><span>UI + same-origin routing</span></div>
      <div class="service-pair"><strong>Evidence API</strong><span>Synthetic artifact records</span><strong>Edge inspector</strong><span>Separate explanation request</span></div>
    </div>
    <p class="flow-caption">Application responsibilities share one hosted demo runtime. This is not a claim of production-grade service isolation.</p>
    <div class="track">Separate synthetic execution proof</div>
    <div class="flow" role="img" aria-label="Processor result, verified handoff, replication, and independent readback with replay behavior are recorded by the separate JSON proof.">
      <div><strong>Processor</strong><span>Processing result</span></div>
      <div><strong>Handoff</strong><span>Verified transfer</span></div>
      <div><strong>Replication</strong><span>Copy the result</span></div>
      <div><strong>Readback</strong><span>Verify bytes + replay</span></div>
    </div>
    <p class="flow-caption">The JSON endpoint returns an execution result that may be cached. Opening it is not a promise that a fresh run occurs.</p>
  </div>
</section>

<section class="case-section" aria-labelledby="demos-title">
  <div><p class="eyebrow">03 / Try the work</p><h2 id="demos-title">Start visually.<br>Then go deeper.</h2></div>
  <div class="body demo-split">
    <div class="demo-panel">
      <p class="eyebrow">Visual / Read-only</p><h3>Three example states</h3>
      <p>Explore completed, deferred, and prepared examples. Use Explain to understand a state and what a reviewer could inspect.</p>
      <p>The page cannot start or restart work, change records, or verify a live copy. “Edge Agent” here means deterministic inspection—not an LLM making decisions.</p>
      <div class="actions"><a href="https://edge-evidence-visual-gateway-2e3eaeb86f95.herokuapp.com/">Open the Visual Gateway ↗</a></div>
    </div>
    <div class="demo-panel">
      <p class="eyebrow">Technical / JSON API</p><h3>An execution result</h3>
      <p>Inspect synthetic processing, a verified handoff, replication, and independent readback. Replay records no new writes.</p>
      <p>This is structured JSON, not a visual application. The result may be cached and is separate from the three UI examples.</p>
      <div class="actions"><a href="https://seemorgh-evidence-showcase-45655632eff2.herokuapp.com/api/demo">Open the JSON/API proof ↗</a></div>
    </div>
  </div>
</section>

<section class="case-section" aria-labelledby="boundaries-title">
  <div><p class="eyebrow">04 / Honest boundaries</p><h2 id="boundaries-title">Implemented.<br>Not overstated.</h2></div>
  <div class="body">
    <div class="limits">
      <p><strong>Implemented:</strong> the public Web UI, synthetic Evidence API, deterministic inspector, and the separate Processor + Replication demonstration.</p>
      <p><strong>Limited:</strong> synthetic inputs, a single-runtime visual gateway, and no claim of production availability or persistent hosted evidence storage.</p>
      <p><strong>Proposed:</strong> LLM-powered inspection experiments such as ADK + Ollama. They are not running in this hosted inspector; no results are claimed.</p>
    </div>
    <details><summary>Why does the inspector explain rather than act?</summary><p>Classification and authorization are different responsibilities. A state can be described by predefined rules without granting permission to mutate evidence or restart a worker. The hosted gateway keeps that boundary explicit.</p></details>
  </div>
</section>

<section class="case-section" id="public-code" aria-labelledby="code-title">
  <div><p class="eyebrow">05 / Follow the implementation</p><h2 id="code-title">Public code.<br>Clear responsibilities.</h2></div>
  <div class="body code-links">
    <div class="code-link"><a href="https://github.com/Seemorghdev/edge-evidence-processor-public">Processor ↗</a><span>Processing and recovery behavior</span></div>
    <div class="code-link"><a href="https://github.com/Seemorghdev/edge-evidence-replication-projection">Replication ↗</a><span>Copying, verification, and safe replay</span></div>
    <div class="code-link"><a href="https://github.com/Seemorghdev/edge-evidence-reference-platform-public">Reference Platform ↗</a><span>UI, API, inspector, and visual gateway</span></div>
    <details><summary>Implementation sources for the inspection boundary</summary><p>The <a href="https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/main/services/edge-agent/src/edge_evidence_edge_agent/app.py">public inspector HTTP surface</a> identifies deterministic, read-only inspection and reports mutation authorization as false. Its <a href="https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/main/services/evidence-api/src/edge_evidence_evidence_api/app.py">Evidence API</a> describes synthetic projections, not an evidence authority or worker executor.</p></details>
  </div>
</section>
