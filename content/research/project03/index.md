---
title: "Project 03 — The information was there; what could I prove?"
description: "An evidence-led, first-person map of the frozen Project 03 investigation and its limits."
type: research
visibility: public
status: published
---

# Project 03 — The information was there; what could I prove?

The information was there. The language was not mine.

I had records, checks, repositories, review notes, and terms like *candidate*, *acceptance*, *lineage* and *runtime*. But I could read an apparently precise sentence and still be unsure what it entitled me to conclude. Sometimes I understood the work; sometimes I understood only the shape of the terminology.

When I later reorganized my Project 03 notes, I chose a simpler way to read them: a plain question, then a concept, then the supporting evidence. Not a giant graph where every note links to everything. A trunk, a few branches, and smaller branches only where an explanation genuinely needs one. That describes how I chose to explain the investigation, not why the investigation originally began.

The historical question is straightforward: **after a period of engineering work, what evidence remained that another person could inspect, and what could it actually say about “done”?** I remember the period as AI-heavy. That is *my retrospective description*, not a fact or causal productivity result measured by the repository records.

## Begin with the questions

The frozen analytical comparison covers **15 confirmed in-scope repositories**, each with an accepted W0–W8 evidence package. The package's acceptance means the evidence collection was accepted for this analysis; it does **not** mean the software was accepted for engineering or production use.

### How the comparisons fit together

The comparison began with three contrasting repository types and later expanded to fifteen. The original three-case **Cohort 1** conclusions concerned a private control, a multi-projection platform, and a generated, history-light public projection. The final fifteen-repository estate offers a broader **descriptive comparison**; it does not extend every Cohort 1 conclusion to all fifteen. And fifteen accepted evidence packages are not fifteen engineering acceptances.

The generated, history-light projection recorded zero commits, pull requests and issues in its bounded visible activity window. That says what was visible **in that projection**, not how much engineering work occurred upstream. Activity windows and cutoffs were not fully aligned, so adding raw counts would not produce a trustworthy portfolio throughput or productivity measure.

Some **projection observations** lack a source-recorded `projection_id`. They remain unkeyed observations; I cannot invent an identity or infer an independently verified deployment. A **direct-public technical surface** is different: it is public but is **not a projection instance**, so it does not add another projection to the count. Incomplete observation windows and unresolved historical visibility or source conflicts remain qualified; none of these historical records reports what is live today.

The detailed evidence already has its own places: [verification versus acceptance](https://mehridian.tech/research/project03/verification-is-not-acceptance), [Consumer Lab's mixed evidence](https://mehridian.tech/research/project03/consumer-lab-mixed-evidence), and [publication versus runtime](https://mehridian.tech/research/project03/publication-and-runtime-reality). The point here is how to read the existing findings, not to create another result.

Follow a branch when you need it:

- **What was actually checked?** [[notes/candidate-verification|Candidate verification]] examines the check results associated with an exact candidate, not a vague judgment about a repository.
- **What was explicitly accepted?** [[notes/engineering-acceptance|Engineering acceptance]] asks whether the retained authority recorded acceptance for that candidate. A passing check does not provide it.
- **What was copied, related, or proved identical?** [[notes/lineage-and-provenance|Lineage and provenance]] separates a repository relationship from a verified subset and from whole-candidate lineage.
- **What was visible, described as running, or independently observed?** [[research/project03/publication-and-runtime-reality|Publication and runtime reality]] keeps those as separate states.

If the terms feel too abstract, [[research/project03/consumer-lab-mixed-evidence|Consumer Lab]] is a concrete case: a mixed verification result coexists with a positive **27-file** provenance check, without establishing whole-candidate lineage. These are not contradictions. They answer different questions.

## What the frozen comparison found

Candidate verification was recorded as **13 `SUCCESS_OBSERVED`, 1 `MIXED`, and 1 `NOT_ESTABLISHED`**. Engineering acceptance was **1 `ESTABLISHED`, 1 `UNKNOWN`, and 13 `NOT_ESTABLISHED`**. That difference prompted [[research/project03/verification-is-not-acceptance|Verification is not acceptance]]. Those 13 repository-level `NOT_ESTABLISHED` acceptance states do not show that the work was rejected.

Whole exact candidate lineage remained **`NOT_ESTABLISHED` for 15 of 15**. At a narrower scope, the evidence still records relationships and positive provenance for a declared subset. “Not established” is a limit of the retained proof, not a finding that the relationship never existed.

Across **25 accepted projection observations**, no positive *independent runtime observation* was established. This does not show that every historical system was offline, nor does it describe what is live today. There are separate `NOT_ESTABLISHED`, `NOT_OBSERVED`, `NOT_COLLECTED`, and `UNKNOWN` cases. Their distinctions are the finding, not noise to tidy away.

## A result can be true without being the answer to every question

Eleven repositories combined observed verification success with engineering acceptance `NOT_ESTABLISHED`. I can describe that recurrence. I cannot determine from the frozen estate why it happened. The sources do not settle whether the difference reflects evidence retention, process, authority, or something else.

That's why I use [[notes/evidence-verification|Evidence verification]] as a habit: decide exactly what a claim asserts, check the matching evidence, and stop at its scope. [[research/project03/what-project-03-shows|What Project 03 actually shows]] brings the branches back together, including what this investigation cannot answer.

## Two connected bodies of work, not one blended result

This is a **frozen historical research account**, not a monitor of current deployments or proof of AI productivity. The live engineering story belongs to [[projects/edge-evidence|Edge Evidence]] and its [implementation documentation](https://docs.mehridian.tech/edge-evidence/). An existing [[notes/agent-vs-deterministic-inspector|Agent vs deterministic inspector]] note explains why deterministic inspection, model explanation and authorization to act are separate even in present-day engineering.

The public version can explain findings and their limits without opening private spreadsheets, raw source registers, review screenshots or internal claim-support records. Those remain available for the private editorial trace, not as public web links.

*Frozen numbers refer to the historical schema-v1.1 comparison, not a current audit.*
