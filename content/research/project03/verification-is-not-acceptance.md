---
title: "Verification is not acceptance"
description: "Why observed candidate checks do not establish an authorized engineering acceptance."
type: research
visibility: public
status: published
---

# Verification is not acceptance

[[research/project03/index|← Project 03 Story Map]]

There is a number in the frozen dashboard that is difficult not to notice. Across the **15 confirmed in-scope repositories**, each with an accepted W0–W8 evidence package, the two evidence questions give strikingly different distributions:

| Frozen evidence question | Recorded states across 15 repositories |
| --- | --- |
| **Candidate verification** | `SUCCESS_OBSERVED`: **13** · `MIXED`: **1** · `NOT_ESTABLISHED`: **1** |
| **Engineering acceptance** | `ESTABLISHED`: **1** · `UNKNOWN`: **1** · `NOT_ESTABLISHED`: **13** |

These are **separate distributions, not a cross-tab**. The totals do not identify which repositories overlap. The **11/15 pairing** discussed below is a separately recorded finding, not something deduced by aligning the counts. Acceptance of a W0–W8 evidence package is not engineering acceptance of its software.

At first the story almost writes itself. The checks passed. The engineering was not accepted.

Except that is not what the evidence says.

[[notes/candidate-verification|Candidate verification]] and [[notes/engineering-acceptance|engineering acceptance]] are separate questions. That is the whole reason this note exists.

## Three cases that resist the shortcut

Operations has `SUCCESS_OBSERVED` verification and `ESTABLISHED` engineering acceptance. There is an explicit candidate-specific review record. This matters because it shows that the model can establish acceptance when the required authority is present.

Processor also has `SUCCESS_OBSERVED` verification. Its acceptance state is `NOT_ESTABLISHED`. I could write “Processor passed technically but failed engineering review.” Cleaner sentence. Unsupported sentence. The retained evidence does not establish the required acceptance disposition; it does not record rejection as the conclusion.

Replication Projection again has `SUCCESS_OBSERVED` verification. Acceptance is `UNKNOWN`. The sources do not resolve the question. A binary table would be easier to explain and less accurate.

## The 11/15 pattern

Eleven repositories combine `SUCCESS_OBSERVED` verification with acceptance `NOT_ESTABLISHED`.

That is a recurring observation, not a diagnosis of why the record looks this way. Its cause is unresolved. Perhaps explicit acceptance records were uncommon; perhaps expectations differed; perhaps acceptance happened outside the retained evidence. The frozen estate does not choose between those explanations.

So I keep the observation and leave the cause open.

## What survives

One layer of evidence can look complete while another remains unresolved. That does not make the first layer false. It was answering a different question.

The concrete Consumer Lab case is different again: [[research/project03/consumer-lab-mixed-evidence|mixed checks and scoped provenance]] resist any single pass/fail label. The conclusion is not “CI passed but engineering failed.” It is that successful verification and engineering acceptance are not interchangeable evidence states.

The same discipline applies to [[notes/lineage-and-provenance|lineage]] and [[research/project03/publication-and-runtime-reality|runtime observation]]. A stronger conclusion needs its own evidence.

Continue to [[research/project03/what-project-03-shows|the synthesis]] for the overall limits.

Research basis: original connected Project 03 story/concept and frozen schema-v1.1 comparison. Exact private tab, range, screenshot and claim pointers are retained in the internal review matrix; no source-workbook links are published.
