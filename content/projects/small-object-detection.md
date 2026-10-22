---
title: Small Objects in Big Frames
description: An offline vision experiment on preserving image detail when searching for small aerial objects.
visibility: public
status: published
presentation: case-study
---

<section class="case-hero" aria-labelledby="case-title">
  <p class="eyebrow">Computer vision / Offline experiment</p>
  <h1 id="case-title">Small Objects in Big Frames</h1>
  <p class="intro">A tiny object can disappear when a large camera frame is reduced to fit a detector. What changes when the image is examined in smaller pieces?</p>
  <div class="case-meta"><span>Python / YOLO</span><span>Tiled inference</span><span>Consumer-camera footage</span></div>
  <div class="actions"><a class="button" href="./small-object-reference.md">Technical reference →</a><a href="../notes/small-evaluations.md">Read the engineering note →</a></div>
</section>

<figure class="showcase-capture">
  <img src="../assets/drone-capture-context.jpg" alt="A small dark aerial object against a cloudy sky above trees" width="540" loading="lazy" />
  <figcaption>Screened field-capture input. This is not detector output. No bounding boxes, scores or positions have been added.</figcaption>
</figure>

<nav class="showcase-jump" aria-label="Project reading path"><a href="#problem-title">Problem</a><a href="#approach-title">Implementation</a><a href="#finding-title">Results</a><a href="#retained-outputs">Annotated outputs</a><a href="#recovered-model">Saved model</a><a href="#source-access">Source access</a></nav>

<section class="case-section" aria-labelledby="problem-title">
  <div><p class="eyebrow">01 / The problem</p><h2 id="problem-title">The pixels<br>matter.</h2></div>
  <div class="body">
    <p>Most of a sky image is background; the object of interest may occupy only a small part of it. Shrinking the entire frame for inference can discard useful detail. This project explored how to preserve more of that detail in an offline detection workflow.</p>
  </div>
</section>



<section class="case-section" aria-labelledby="approach-title">
  <div><p class="eyebrow">02 / The prototype</p><h2 id="approach-title">Examine crops.<br>Reassemble candidates.</h2></div>
  <div class="body">
    <p>The prototype runs a YOLO-based detector over overlapping square crops, maps the resulting candidates back into the original frame, and consolidates overlapping results. Whole-frame and tiled approaches were compared, with a small consumer-camera field set retained for review.</p>
  </div>
</section>

<section class="case-section" aria-labelledby="finding-title">
  <div><p class="eyebrow">03 / The finding</p><h2 id="finding-title">Finding a candidate<br>is not choosing it.</h2></div>
  <div class="body">
    <p>In eight selected field frames, the tiled run returned at least one candidate near the manually marked object in each frame. The matching used those reference marks during evaluation; it was not automatic target identification.</p>
    <p>The same scans produced competing candidates. In a separate operator-cued selection check, only two of four paired observations succeeded.</p>
    <p>The result is a useful offline prototype, not a field-ready detection system. This small, manually referenced evaluation does not establish general accuracy, autonomous selection, validated position estimates, or live phone deployment.</p>
    <div class="result-facts" aria-label="Two separate retained observations">
      <div><strong>8 selected frames</strong><p>A reference-matched candidate was reported in each. Manual marks were used during evaluation.</p></div>
      <div><strong>2 of 4 paired observations</strong><p>A separate operator-cued selection check succeeded in two. This is a different task and denominator.</p></div>
    </div>
  </div>
</section>

<section class="showcase-results" aria-labelledby="retained-outputs">
  <p class="eyebrow">Existing evaluation artifacts / No new inference</p>
  <h2 id="retained-outputs">Look at the actual outputs.</h2>
  <p>Open either view and select the image to inspect the original at full size. The image annotations are retained as-is, including their source labels and orientation. Those labels are not independently verified distance measurements.</p>
  <details open class="output-detail"><summary>View A — a candidate beside the manual reference</summary><figure><a href="../assets/drone-retained-output-a.png"><img src="../assets/drone-retained-output-a.png" alt="Original retained evaluation output A showing overlapping reference, matched-candidate and operator-cue markers on a small aerial object" loading="lazy" /></a><figcaption>Unmodified retained output. The original legend distinguishes reference, matched and cued markers. This is a manually referenced evaluation image, not autonomous target identification.</figcaption></figure></details>
  <details class="output-detail"><summary>View B — competing candidates remain visible</summary><figure><a href="../assets/drone-retained-output-b.png"><img src="../assets/drone-retained-output-b.png" alt="Original retained sideways output B showing numerous candidate markers over sky and vegetation, with the manual reference separately marked" loading="lazy" /></a><figcaption>Unmodified retained output, with original sideways orientation. Competing candidates are part of the result, not hidden failures. A matched candidate does not mean the system selected the intended object unaided.</figcaption></figure></details>
  <p class="project-notice">These are genuine historical image artifacts, not a live model demo. No new overlay, score or detection has been added. The outputs preserve both the manually referenced match and the competing candidates.</p>
</section>

<section class="case-section" aria-labelledby="recovered-model">
  <div><p class="eyebrow">04 / Saved artifact</p><h2 id="recovered-model">The checkpoint<br>was recovered.</h2></div>
  <div class="body"><p>A retained <code>best.pt</code> checkpoint was recovered. Its SHA-256 exactly matches a retained model-reference record identifying it as YOLO11n. This confirms matching artifact bytes, not a fresh training result or inference acceptance.</p><p>A second <code>last.pt</code> file has a different digest. Its relationship to the training run has not been established. Neither model was loaded, converted, executed or redistributed for this showcase.</p><details><summary>What else was retained?</summary><p>The training/export notebook contains saved text outputs. Field-result tables and separate geometry reports also exist, including later work. They are not presented here as a validated integrated system. No embedded training chart or rendered detection video was located in the inspected project folders.</p></details><p>Read the <a href="./small-object-reference.md">technical reference</a> for artifact classes, evaluation units and reproduction limits.</p></div>
</section>

<section class="case-section" aria-labelledby="source-access">
  <div><p class="eyebrow">05 / Inspect the work</p><h2 id="source-access">Source and<br>reproduction.</h2></div>
  <div class="body"><p>The implementation and model weights remain private. There is no public runnable package linked here, and this page does not run inference.</p><p>The <a href="./small-object-reference.md">technical reference</a> separates the retained results from missing reproduction prerequisites. The inspectable material here is the documentation and original output imagery—not an application-source or model release.</p></div>
</section>
