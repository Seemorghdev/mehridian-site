---
title: "Candidate verification"
description: "What was checked against a specific candidate, and what mixed evidence means."
type: concept
visibility: public
status: review-candidate
---

# Candidate verification

Candidate verification asks what check result was actually observed for the particular version being examined. A repository name alone is not enough: the candidate, check surface and observation scope matter.

In the frozen [[research/project03/index|Project 03]] comparison, the repository-level states are 13 `SUCCESS_OBSERVED`, one `MIXED` and one `NOT_ESTABLISHED`. This is not an overall CI or quality score. `SUCCESS_OBSERVED` says a candidate-bound positive check was observed; it does not by itself establish engineering acceptance or deployment.

[[research/project03/consumer-lab-mixed-evidence|Consumer Lab]] demonstrates why `MIXED` must survive: three exact-head checks were observed, with two successes and one failure. Saying “verification passed” would erase an actual failed result. Conversely, `NOT_ESTABLISHED` does not imply that a failing check was observed; the required positive evidence was not established.

Verification is separate from [[notes/engineering-acceptance|engineering acceptance]], exact lineage and runtime observation. A check can succeed without answering any of those questions.

For the case-level comparison, read [[research/project03/verification-is-not-acceptance|Verification is not acceptance]]. For the general practice, see [[notes/evidence-verification|Evidence verification]].

Research basis: original connected Project 03 story/concept and frozen schema-v1.1 comparison. Exact private tab, range, screenshot and claim pointers are retained in the internal review matrix; no source-workbook links are published.
