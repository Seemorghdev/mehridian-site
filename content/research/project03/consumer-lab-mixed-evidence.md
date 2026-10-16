---
title: "Consumer Lab — Mixed evidence"
description: "A scoped mixed-verification result and 27-file provenance example."
type: research
visibility: public
status: published
---

# Consumer Lab — Mixed evidence

[[research/project03/index|← Back to the Project 03 Story Map]]

Consumer Lab refuses to become one clean label. That's exactly why I need this example.

Its frozen exact-candidate verification evidence includes **three check components: two successes and one failure**. The repository-level state is `MIXED`. Calling it “mostly passed” would erase the failure; calling all its verification “failed” would erase the two observed successes. Neither shortcut is the recorded comparison state.

## A second, positive result—at a different scope

Another part of the record establishes provenance for a **declared subset of 27 files**. Those files had matching source and target blob identities under the scoped check.

That matters. It is a positive, specific result. It is also **not** proof that the *whole exact candidate* travelled intact from source to public projection. Whole-candidate lineage remains `NOT_ESTABLISHED` for this repository.

The useful distinctions are:

| Question | What the frozen evidence records |
| --- | --- |
| Candidate-bound verification | `MIXED`: two observed successes, one observed failure, among three checks |
| Engineering acceptance | `NOT_ESTABLISHED` |
| Provenance of declared 27-file subset | Established within that declared scope |
| Whole exact candidate lineage | `NOT_ESTABLISHED` |

A positive provenance check and an unresolved whole-candidate lineage state can coexist without contradiction. They evaluate different objects and claims.

## What this case does not establish

The comparison alone does not explain **why** the failed check failed, whether the other two successes were representative of the candidate, why only that subset had a positive provenance record, or whether broader lineage evidence existed elsewhere.

Even the number 27 has a boundary: it is **not** “27 of all files passed” without a justified whole-candidate denominator. It's 27 *manifest-declared* files in a scoped check. The historical screenshot of this result contains a private workbook reference and isn't reproduced here.

If I have to describe Consumer Lab in one sentence, it is this: **one repository can contain positive, negative and unestablished evidence at the same time; a good analysis preserves all three.**

Read [[notes/candidate-verification|candidate verification]], [[notes/engineering-acceptance|engineering acceptance]] and [[notes/lineage-and-provenance|lineage and provenance]] separately. Then return to [[research/project03/what-project-03-shows|the synthesis]].

*Research basis: frozen repository comparison and scoped-provenance record. No raw workbooks or screenshots are included.*
