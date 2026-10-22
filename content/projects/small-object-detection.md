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
</section>

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
  </div>
</section>
