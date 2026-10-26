---
title: Notes
description: Seven technical notes spanning project evaluations, inspection, provenance, verification and acceptance.
visibility: public
status: published
---

# Notes

Seven technical notes about implementation and evaluation. Start with a concrete project observation or explore the engineering distinctions below.

## From the projects

- **[[notes/small-evaluations|A small evaluation is not a deployment]]** — The drone experiment's selected-frame observations and the hackathon's synthetic records: what each tested, what was retained, and why neither is a deployment claim.

## Inspection and model boundaries

- **[[notes/agent-vs-deterministic-inspector|Agent vs deterministic inspector]]** — Is a rule-based explanation an AI agent? Separate deterministic classification, optional language-model explanation, tool calls and permission to act. [See the read-only Edge Evidence interface](https://mehridian.tech/projects/edge-evidence).

- **[[notes/local-language-task-boundaries|Task boundaries before model size]]** — Three paired English/German translation observations, their limits, and later learner-workflow failures kept separate from the timing comparison.

## Verification and provenance

- **[[notes/evidence-verification|Evidence verification]]** — What would someone else need to inspect to repeat a bounded claim, rather than trusting a “complete” label?
- **[[notes/lineage-and-provenance|Lineage and provenance — evidence binding]]** — When do related repositories or matching bytes for a subset fall short of proving whole-candidate identity?

## Completion and acceptance

- **[[notes/candidate-verification|Candidate verification]]** — Which checks ran against the exact candidate, and why can a mixed result not be called a pass?
- **[[notes/engineering-acceptance|Engineering acceptance]]** — What candidate-specific authority establishes acceptance, beyond a successful technical check?

## See the questions applied

- [[notes/extract-after-observation|Split out a worker after operation shows why]]
- [[notes/limitation-not-pass|A two-hour run that ended as a limitation]]
- [[notes/agent-vs-deterministic-inspector|A local model can explain a record without being trusted with it]]

- [[notes/one-gap-closed-one-narrowed|One gap closed, one narrowed]]

**[[research/project03/index|Project 03 — the research account]]** is a frozen historical comparison, not a report on today's deployments. Its accepted evidence packages are not engineering acceptance decisions.

- [[research/project03/evidence-explorer|Evidence Explorer]] — Compare the recorded verification and acceptance distributions across **15 repositories**, and independent runtime-observation states across **25 projection observations**, with their separate denominators.
- [[research/project03/verification-is-not-acceptance|Verification is not acceptance]] — A closer look at why observed checks and accepted engineering work must not be collapsed.
- [[research/project03/publication-and-runtime-reality|Publication and runtime reality]] — Why a public link, a runtime claim and an independent observation are different evidence.

For the current implementation rather than the historical study, use the [Edge Evidence technical Docs](https://docs.mehridian.tech/edge-evidence/), including the [deterministic inspector baseline](https://docs.mehridian.tech/edge-evidence/inspector/baseline/) and [optional local Llama workbench](https://docs.mehridian.tech/edge-evidence/local-workbench/).

Search above finds the curated published pages. Backlinks and optional connection maps on individual notes provide additional paths; you can start reading without using a graph.
