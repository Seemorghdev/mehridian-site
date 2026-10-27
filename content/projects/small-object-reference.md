---
title: Small-object experiment — technical reference
description: Artifact inventory, result interpretation and reproduction limits for the offline vision prototype.
visibility: public
status: published
presentation: case-study
---

# Small-object experiment: technical reference

[Project overview](./small-object-detection.md) · [Engineering note](../notes/small-evaluations.md)

This reference documents existing work, plus one bounded run of the public checkpoint added on 27 October 2026. It is not an installation guide for an operational detector, and no new field measurement was made.

## What was built

The standalone Python project contains an offline inference implementation, evaluation scripts, experiment notebooks, retained result files and technical decision documents. The detector used a YOLO-based model. Image crops were evaluated in the original frame's coordinate system. The repository also contains separate geometry work; this showcase makes no position-accuracy claim and does not reproduce that functionality.

## Artifact map

This inventory spans retained private materials and public artifacts. The original application source and decision documents remain private; the Hugging Face notebooks are edited public derivatives, not the full application.

| Artifact class | What it contributes | What it does not establish |
| --- | --- | --- |
| Inference source | A reviewable offline implementation | A running service or live phone application |
| Evaluation scripts and notebooks | How the author organized comparisons | A fresh execution in this review |
| Retained field summaries | Selected, manually referenced candidate observations | Blind precision/recall or general accuracy |
| Capture still | Actual appearance of an input scene | A detection, a correct selection or model quality |
| Two annotated output images | Original retained evaluation markers, including competing candidates | Autonomous identification or a new inference result |
| Recovered checkpoint | Bytes matching a retained model-reference digest | Training quality, fresh acceptance or redistribution clearance |
| Recovered training record | Notebook and checkpoint metric-history agreement; recorded four-class validation scores | Independently reproduced metrics, drone-only accuracy or proven transfer provenance |
| Decision documents | Implementation choices and unresolved limitations | Independent validation of those choices |

## Read the result correctly

The retained report covers **eight selected field frames**. A candidate near the manual reference was reported in each. The evaluation had access to the reference marks; this is not an eight-out-of-eight autonomous identification score.

The scans also produced competing candidates. A separate operator-cued selection check succeeded in **two of four paired observations**. These are different checks with different units: do not add their counts or turn them into a single success rate.

What worked: in every selected frame, the scan kept the object as a candidate instead of losing it to resizing. What's still open is choosing the intended object from among the candidates. The record supports both statements, not a claim of a validated deployment.

| Retained check | Unit | Reported observation | Interpretation limit |
| --- | --- | --- | --- |
| Reference-matched candidate recovery | 8 selected frames | A candidate near the manual reference in each | Reference-assisted review; not precision, recall or autonomous identification |
| Separate operator-cued selection | 4 paired observations | 2 selections succeeded | Different task and denominator; do not combine with the frame count |
| Checkpoint identity | One recovered checkpoint | Digest matches a retained reference | Artifact identity, not training quality |
| Public rerun, 27 October 2026 | One public image, two passes | A box on the drone in both; tiled 0.42 airplane, whole frame 0.14 bird | One chosen image; not accuracy or a false-positive rate |

## Public rerun, 27 October 2026

The released `best.pt` (SHA-256 `2ebf2e1f5a36c8df0cc44664c35596aecbd25f762bed9f9edc25ae1bb08eae5b`, 5,475,418 bytes) was run once on the public 1080 × 1920 field image, on CPU with Ultralytics 8.4.87 and Python 3.12. The settings and the reference box were fixed in the script before the run, and the run wasn't repeated.

| Setting | Value |
| --- | --- |
| Whole-frame input | Resized to 640 px on the long side |
| Tiles | 640 px at full resolution, 20% overlap, 8 tiles |
| Merging | Greedy non-maximum suppression at IoU 0.50 |
| Confidence floor | 0.10 |
| Reference box, drawn by eye before the run | x 300–375, y 630–680 |
| Counted at the reference | A box whose centre lies inside the reference box |

| Pass | Boxes | At the reference | Label, confidence | Elsewhere |
| --- | ---: | ---: | --- | ---: |
| Whole frame | 1 | 1 | bird, 0.1354 | 0 |
| Tiled | 1 | 1 | airplane, 0.4154 | 0 |

The study's evaluation notebook counts airplane, drone and helicopter as one aerial-object alert and bird separately. Under that rule, only the tiled pass raises an alert. Neither pass labelled the object "drone". The whole-frame time, 4.3 seconds, includes the model's first-call start-up, so it isn't compared with the tiled time.

The [script, receipt, environment list and input image](https://huggingface.co/Seemorgh/yolo11n-aod4-v6/tree/8d8f622270dffef4a1529443b3ec781935fb4c7c/reproduce) are published next to the unchanged weights. The receipt records the input, checkpoint and script hashes, the package versions and every box. This is one chosen image: it shows the public model behaving as the design intends on that frame, not general accuracy.

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

Read the [complete sanitized training report](https://github.com/Seemorghdev/drone-detection-showcase/blob/79b3a2096453f45d7d010fc7b1fdc987cf9e3764/docs/training-report.md) for the recorded results, provenance method and remaining limitations. The link pins the reviewed report revision. The report excludes keys, raw logs and private source references. A separate Hugging Face release now supplies the recovered weights and reviewed notebook derivatives, as linked below; the pinned report predates that release. No new training, inference or evaluation was performed for that update.

## Public model and reviewed notebooks

Published 22 October 2026 on [Hugging Face](https://huggingface.co/Seemorgh/yolo11n-aod4-v6):

- [Recovered YOLO11n checkpoint and model card](https://huggingface.co/Seemorgh/yolo11n-aod4-v6); [release files](https://huggingface.co/Seemorgh/yolo11n-aod4-v6/tree/692377dc55f682cbe5fe17fc5944514574ca9b08).
- [Sanitized training and Core ML export notebook](https://huggingface.co/Seemorgh/yolo11n-aod4-v6/blob/692377dc55f682cbe5fe17fc5944514574ca9b08/notebooks/01_train_export.ipynb): edited code with a labeled historical-results summary; original raw outputs and the credential literal are excluded.
- [Exploratory evaluation notebook](https://huggingface.co/Seemorgh/yolo11n-aod4-v6/blob/692377dc55f682cbe5fe17fc5944514574ca9b08/notebooks/02_eval_tiling_range.ipynb): an **unexecuted draft in the retained record**, with unsupported validation claims corrected.
- [Notebook review and sanitization notes](https://huggingface.co/Seemorgh/yolo11n-aod4-v6/blob/692377dc55f682cbe5fe17fc5944514574ca9b08/NOTEBOOK_REVIEW.md), including method limitations and publication edits.

The notebook links pin the reviewed release revision. Publication-file checksums identify the released bytes; they do not supply the missing original cloud-to-local transfer receipt or independently authenticate the old training run. No new training, inference, conversion or evaluation was performed for that publication; the later rerun is described above. Exact checkpoint-to-Core-ML equivalence and successful device inference remain unverified.

The public evaluation draft uses non-overlapping grids and does not reproduce the overlapping-crop field workflow described in the overview. Its image-level counts must not be presented as a reproduction of the retained field observations.

The evaluation draft implements two exploratory steps despite its original three-step title. It counts aerial predictions without matching boxes to ground truth; bird predictions are class counts, not measured false positives. Increased prediction frequency does not validate tiling, recall, a detection floor or physical range. Neither notebook establishes field reliability or on-device performance.

The model release preserves the checkpoint's AGPL-3.0 designation; dataset CC BY 4.0 attribution is separate. The links do not establish an Enterprise agreement, Apache-2.0 relicensing permission or redistribution compliance. The original application, unsanitized notebooks, raw media and operational components are not released here.

## Recorded exploratory evaluation

The [saved evaluation summary](https://github.com/Seemorghdev/drone-detection-showcase/blob/1abd61840ad58d8a945c91a2dca6b47665afa523/docs/recorded-evaluation-summary.md) and [structured counts](https://github.com/Seemorghdev/drone-detection-showcase/blob/1abd61840ad58d8a945c91a2dca6b47665afa523/docs/recorded-evaluation-counts.json) describe historical outputs from a separate executed companion, not the identical public evaluation draft. These are prediction-presence counters without ground-truth matching, not accuracy, recall or a measured false-positive rate. The bird count is predicted boxes, not images with birds.

These records do not reproduce the separate historical 7% → 22% table and must not be pooled with the selected field observations or training-validation metrics above. The links pin the reviewed public summary and counts; raw execution records and evidence references remain private. No new experiment or inference was performed for these records; the 27 October rerun is separate and doesn't reproduce these counts.

## Reproduction prerequisites

The original application source remains private. The recovered checkpoint and sanitized notebook copies are now public on Hugging Face. An archive inspection located a saved checkpoint whose SHA-256 matches a retained model-reference record. This establishes an artifact identity link. Inputs and third-party datasets have separate distribution considerations. The 27 October rerun can be repeated from its published script; the eight-frame field result can't, because its frames and application aren't public.

The public checkpoint and edited notebooks provide inspectable artifacts, but do not establish a complete reproducible benchmark. The environment is not locked, dataset rights and split independence require separate review, and the exploratory evaluation lacks ground-truth matching. This page does not automatically download weights or datasets.

## Current access

- **Public implementation:** not released.
- **Public study artifacts:** [documentation and screened original images](https://github.com/Seemorghdev/drone-detection-showcase), not executable detector code.
- **Original application implementation:** private.
- **Recovered model and sanitized notebooks:** public on Hugging Face, as linked above; original unsanitized notebooks remain private.
- **Public rerun:** script, receipt and input on Hugging Face, as linked above.
- **Hosted model endpoint:** none offered here.
- **Visuals in the overview:** screened input still and two unmodified annotated evaluation outputs, available full-size; not a fresh runtime demonstration.
- **Later monorepo:** separately inventoried, not treated as acceptance of an integrated system.

## Limits and next documentation work

No new accuracy, field reliability, live capture, autonomous selection or on-device performance result is asserted. Public redistribution of code, media and weights requires separate review. The narrow technical account can stand without exposing those materials, but it must not claim to be a self-contained demo.
