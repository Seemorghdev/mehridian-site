---
title: Small-object experiment — technical reference
description: Artifact inventory, result interpretation and reproduction limits for the offline vision prototype.
visibility: public
status: published
presentation: case-study
---

# Small-object experiment: technical reference

[Project overview](./small-object-detection.md) · [Engineering note](../notes/small-evaluations.md)

This reference documents existing work. It is not an installation guide for an operational detector. No new model run or field measurement was performed for this showcase.

## What was built

The standalone Python project contains an offline inference implementation, evaluation scripts, experiment notebooks, retained result files and technical decision documents. The detector used a YOLO-based model. Image crops were evaluated in the original frame's coordinate system. The repository also contains separate geometry work; this showcase makes no position-accuracy claim and does not reproduce that functionality.

## Artifact map

| Artifact class | What it contributes | What it does not establish |
| --- | --- | --- |
| Inference source | A reviewable offline implementation | A running service or live phone application |
| Evaluation scripts and notebooks | How the author organized comparisons | A fresh execution in this review |
| Retained field summaries | Selected, manually referenced candidate observations | Blind precision/recall or general accuracy |
| Capture still | Actual appearance of an input scene | A detection, a correct selection or model quality |
| Two annotated output images | Original retained evaluation markers, including competing candidates | Autonomous identification or a new inference result |
| Recovered checkpoint | Bytes matching a retained model-reference digest | Training quality, fresh acceptance or a distributable model |
| Recovered training record | Notebook and checkpoint metric-history agreement; recorded four-class validation scores | Independently reproduced metrics, drone-only accuracy or proven transfer provenance |
| Decision documents | Implementation choices and unresolved limitations | Independent validation of those choices |

## Read the result correctly

The retained report covers **eight selected field frames**. A candidate near the manual reference was reported in each. The evaluation had access to the reference marks; this is not an eight-out-of-eight autonomous identification score.

The scans also produced competing candidates. A separate operator-cued selection check succeeded in **two of four paired observations**. These are different checks with different units: do not add their counts or turn them into a single success rate.

The useful finding is that surfacing a plausible candidate and choosing the intended object are different problems. The record supports discussing that distinction, not a claim of a validated deployment.

| Retained check | Unit | Reported observation | Interpretation limit |
| --- | --- | --- | --- |
| Reference-matched candidate recovery | 8 selected frames | A candidate near the manual reference in each | Reference-assisted review; not precision, recall or autonomous identification |
| Separate operator-cued selection | 4 paired observations | 2 selections succeeded | Different task and denominator; do not combine with the frame count |
| Checkpoint identity | One recovered checkpoint | Digest matches a retained reference | Artifact identity, not training quality or fresh inference acceptance |

## Recorded training results

The retained Modal training/export notebook records a 50-epoch run based on Ultralytics YOLO11n and the public AOD4 version-6 dataset. The checkpoint's stored history contains the same 50 epochs: all **200 comparisons** across precision, recall, mAP50 and mAP50–95 agree with the notebook's printed training rows within rounding precision. The largest absolute difference is 0.00050. This is a provenance comparison, not a new evaluation or statistical confidence estimate.

The matching run-name text and metric histories strongly support the checkpoint's same-run origin. An original checksum receipt linking the cloud output to the recovered file was not located. Saved metadata and notebook output are historical records, not independently authenticated execution receipts.

### Two recorded metric origins

| Aggregate box metric | Stored checkpoint training metrics | Subsequent notebook validation |
| --- | ---: | ---: |
| Precision | 0.94164 | 0.941, printed to three decimals |
| Recall | 0.93812 | 0.938, printed to three decimals |
| mAP50 | 0.96511 | 0.9651819355211275 |
| mAP50–95 | 0.66650 | 0.66663031065507 |

These values cover **four classes: airplane, bird, drone and helicopter**. They are not drone-specific accuracy, field reliability, or held-out test results. mAP50 is mean average precision at IoU 0.50; mAP50–95 averages across IoU thresholds 0.50–0.95. Neither is simply the percentage of images classified correctly.

The notebook reports **4,514 validation images and 6,369 annotated instances**. Its final validation entry differs slightly from the metrics stored in the checkpoint. Both origins are preserved; the cause of that difference was not established by a new run. The separate eight-frame and two-of-four field observations above must not be pooled with these results.

### Dataset and model license findings

The notebook's dataset configuration and the [public AOD4 version-6 page](https://universe.roboflow.com/airborne-object-detection/airborne-object-detection-4-aod4/dataset/6) both declare **CC BY 4.0**. Dataset attribution: Airborne Object Detection, *Airborne-Object-Detection-4-AOD4 Dataset*, version 6, Roboflow Universe; accessed 22 October 2026. The published split is 15,761 training, 4,514 validation and 2,241 test images. Split independence and original-image provenance were not independently audited, and no held-out test metric was established here. The [CC BY 4.0 terms](https://creativecommons.org/licenses/by/4.0/) include attribution and indication of changes; the declaration does not guarantee every underlying right.

The checkpoint contains an **AGPL-3.0** notice, consistent with the [Ultralytics 8.4.87 source license](https://raw.githubusercontent.com/ultralytics/ultralytics/v8.4.87/LICENSE). Ultralytics describes its AGPL and Enterprise arrangements in its [licensing statement](https://www.ultralytics.com/license). No separate Enterprise agreement or permission to relicense the weights as Apache-2.0 was established in the inspected records. Dataset and model licenses are separate; this account documents notices, not legal clearance for distribution.

Read the [complete sanitized training report](https://github.com/Seemorghdev/drone-detection-showcase/blob/79b3a2096453f45d7d010fc7b1fdc987cf9e3764/docs/training-report.md) for the recorded results, provenance method and remaining limitations. The link pins the reviewed report revision. The report excludes keys, raw logs and private source references; neither the notebook nor weights are distributed here. No new training, inference or evaluation was performed for this update.

## Reproduction prerequisites

The source repository and model weights remain private. An archive inspection located a saved checkpoint whose SHA-256 matches a retained model-reference record. This establishes an artifact identity link, not a fresh model run. Inputs and third-party datasets have separate distribution considerations. A visitor cannot reproduce the reported result merely by copying a command from this page.

A reproducible release would need a specifically reviewed source snapshot, permitted inputs, a permitted model artifact, environment information and a clear evaluation protocol. Those are missing public-release components, not something this website silently supplies. No weights or datasets are downloaded by the preview.

## Current access

- **Public implementation:** not released.
- **Public study artifacts:** [documentation and screened original images](https://github.com/Seemorghdev/drone-detection-showcase), not executable detector code.
- **Implementation and model weights:** retained privately; not distributed through this website.
- **Hosted model endpoint:** none offered here.
- **Visuals in the overview:** screened input still and two unmodified annotated evaluation outputs, available full-size; not a fresh runtime demonstration.
- **Later monorepo:** separately inventoried, not treated as acceptance of an integrated system.

## Limits and next documentation work

No new accuracy, field reliability, live capture, autonomous selection or on-device performance result is asserted. Public redistribution of code, media and weights requires separate review. The narrow technical account can stand without exposing those materials, but it must not claim to be a self-contained demo.
