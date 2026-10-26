---
title: "One failed check and a 27-file provenance match"
description: "Consumer Lab: mixed check results and a positive subset match without whole-candidate lineage."
type: research
visibility: public
status: published
source_checked: 2026-10-25
---

# One failed check and a 27-file provenance match

Consumer Lab is the case to read if you doubt the method. Among 15 repositories it holds the only recorded failed check and the only positive provenance result. Had the study simply rounded every repository to pass or fail, one would have hidden the other. They concern different objects, so neither cancels the other, and the record keeps both.

## Three checks

The retained exact-candidate verification evidence contains **three check components: two successes and one failure**. The repository-level state is `MIXED`. Calling it a pass would erase the failure; treating all three checks as failed would erase the observed successes.

## A match for 27 files

A separate scoped check establishes matching source and target blob identities for **27 manifest-declared files**. This is a positive result for that declared subset. It is not “27 of all files passed” without a justified whole-candidate denominator.

| Question | What the frozen evidence records |
| --- | --- |
| Candidate-bound verification | `MIXED`: two observed successes, one observed failure, among three checks |
| Engineering acceptance | `NOT_ESTABLISHED` |
| Provenance of declared 27-file subset | Established within that declared scope |
| Whole exact candidate lineage | `NOT_ESTABLISHED` |

![Left: three checks on the exact candidate, two pass and one fail, giving MIXED. Right: nested scopes. A relationship between repositories is recorded; whole exact candidate lineage is not established; inside it, 27 declared files have matching blob identities, established for that subset only. Box sizes are not proportional.](../../assets/project03-consumer-lab-scopes-2026-10-25.svg)

## Relationships, subsets and whole candidates

A recorded relationship between repositories is one claim. Matching blob identities for selected files is a narrower, directly scoped check. Binding a complete exact candidate across its source-to-target path is a stronger claim again.

The comparison preserves lower-scope relationships and positive subset provenance while whole exact candidate lineage remains `NOT_ESTABLISHED` for all 15 repositories. That does not mean that no relationship or provenance existed.

For Consumer Lab, the 27-file result stays positive within its scope; it cannot be expanded into a claim about the whole candidate. The [[research/project03/evidence-explorer#the-fifteen-case-comparison|case table]] keeps that distinction alongside the mixed verification result.

## What remains unresolved

The records do not establish why the failed check failed, whether the successes were representative, why only that subset had a positive provenance record or whether broader evidence existed elsewhere. The historical screenshot contains a private workbook reference and is not reproduced here.

One repository can therefore contain positive, negative and unestablished evidence at the same time. Keeping those claims separate is more informative than forcing one overall label.

Part of [[research/project03/index|Project 03]]. Term used here: [[notes/lineage-and-provenance|lineage and provenance]].

*Basis: the frozen comparison and scoped-provenance record. No raw workbooks, private screenshots or new measurements are included.*
