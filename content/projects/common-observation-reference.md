---
title: Observation-view prototype — technical reference
description: Current synthetic-runtime acceptance, bounded local-model architecture, historical provenance and public access limits.
visibility: public
status: published
presentation: case-study
---

# Observation-view prototype: technical reference

[Watch the application](./common-observation-view.md#runtime-walkthrough) · [Public evidence showcase](https://github.com/Seemorghdev/hackathon-observation-showcase) · [Engineering note](../notes/small-evaluations.md)

## Purpose and boundary

The original solo hackathon explored heterogeneous observation formats. The later application has a map-led synthetic-scenario console, AI Watch and a separate bounded Scenario Copilot. The application source remains private. Public captures are actual later-runtime evidence, not original-event screens, field-performance measurements or an interactive hosted system.

## Architecture

The real FUSE implementation supplies deterministic synthetic frames to the map and selected-track panel. A loopback-only analyst service independently loads the chosen frame, matches a versioned scenario catalog, and sends a bounded packet to local Qwen 3 4B. Model output contains approved slot IDs, evidence/uncertainty keys and an approved review-question ID, bound to the scenario and selected track.

The server validates those IDs. Approved templates and current fetched-frame values supply visible text. Watch and Copilot share the same explanation contract; stale responses are discarded. Pending requests are serialized and superseded queued requests are discarded. Copilot offers button-only approved questions and no free-text input. It cannot decide a review question, recommend a response or control playback.

Model input excludes map tiles, exact coordinates, raw reports/media, field evidence and browser-authored prompts. RF remains bearing-only. Munich is a grayscale reference map with OpenStreetMap attribution; the synthetic sensor overlays identify no real installation. Llama 3.1 8B is an explicit manual evaluation option, never an automatic fallback.

Schema-valid model output establishes structural compliance, not verified judgment, calibrated probability or field performance. The separate SENSE service serves retained evidence records; it does not run detector inference on incoming camera frames in this demo. Python REASON remains deterministic; local Qwen is a separate analyst layer.

## Current acceptance

The 24 October 2026 acceptance pass covers the later console and its scenario-bound Watch/Copilot. Earlier acceptance of a documentation assistant does not validate this workflow.

| Status | Scope |
| --- | --- |
| Works | Full real-engine synthetic timeline t=0–90; recorded browser playback reached t=90 in about 51 seconds. Positions are discrete fetched frames, not interpolated. |
| Works | Watch pause/resume, repeated playback toggles, track-context clearing and stale-result rejection; live Qwen validated slot selection shown on the desktop console. |
| Works | 152 Python tests and five JavaScript runtime regression checks, including current-frame slot values, serialized requests and stale-response protection. These are separate units, not a combined performance score. |
| Known behavior | Playback loops after t=90. Model responses may arrive after a short scenario interval has passed; deterministic content stays visible while waiting. |
| Not tested | Docker image build (daemon unavailable), cloud deployment, physical mobile devices, field reliability and operational decision quality. |

The public capture record and detailed acceptance note are in the showcase repository. The video samples browser frames approximately once per second; it is not a continuous high-frame-rate recording or a latency benchmark. Empty export margins were cropped; no UI facts or geometry were fabricated.

## Historical record

Historical declarations use different units: supplied challenge tests, regression suites and scenario timesteps. They refer to different versions and cannot be added together or treated as current acceptance receipts.

The original seven-section presentation and its screened text excerpt explain the approach. The earlier 22 October source-shell capture had scripts removed and controls disabled; it is retained as a historical static interface inspection. Those materials are not substitutes for the new runtime capture and are no longer the case study's primary visual.

The synthetic vision bridge is separate follow-on work, not evidence of a live field-camera or Edge Evidence integration. Detector-training and field-study results belong to the separate small-object project and are not scores for this console.

## Access and reproduction

The [public showcase repository](https://github.com/Seemorghdev/hackathon-observation-showcase) is documentation-only and not an installable application. It contains the recording, genuine screenshots, architecture, acceptance scope and checksums. GitHub may display the MP4 file page instead of a player; use View raw / Download raw file. The [case study](./common-observation-view.md#runtime-walkthrough) has an inline player and download link.

The application source remains private. No public interactive endpoint, model API, raw media, weights, dataset, private field-location information or deployment configuration is supplied. A live walkthrough or source review can be discussed with the owner.

## Attribution

The prototype and showcase were solo work. The current console and local-model additions are later follow-on work. No award, independently verified field result, or original-event demonstration of the later interface is inferred.
