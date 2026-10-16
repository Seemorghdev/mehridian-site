---
title: "Engineering acceptance"
description: "The scope and authority required for a meaningful acceptance disposition."
type: concept
visibility: public
status: published
---

# Engineering acceptance

Engineering acceptance asks whether the retained evidence contains an authoritative disposition for the exact candidate. It is a different question from “did its checks pass?”

The frozen [[research/project03/index|Project 03]] examples make the distinction concrete:

- Operations: verification `SUCCESS_OBSERVED`, engineering acceptance `ESTABLISHED`, supported by explicit candidate-specific review records.
- Processor: verification `SUCCESS_OBSERVED`, acceptance `NOT_ESTABLISHED`.
- Replication Projection: verification `SUCCESS_OBSERVED`, acceptance `UNKNOWN`.

The only `ESTABLISHED` acceptance in the frozen 15-repository comparison is Operations; do not infer a common approval policy across repositories. `NOT_ESTABLISHED` is not rejection. `UNKNOWN` is not a synonym for it. Preserve the source's unresolved state rather than making a binary decision the evidence does not support.

Acceptance of a W0–W8 **evidence package** is also different from engineering acceptance of the software. A reviewed package can faithfully preserve failed checks, uncertainty or missing authority.

Read [[research/project03/verification-is-not-acceptance|the connected investigation]] and [[notes/candidate-verification|Candidate verification]]. Neither a model explanation nor a proposed action establishes acceptance; see [[notes/agent-vs-deterministic-inspector|Agent vs deterministic inspector]].

Research basis: original connected Project 03 story/concept and frozen schema-v1.1 comparison. Exact private tab, range, screenshot and claim pointers are retained in the internal review matrix; no source-workbook links are published.
