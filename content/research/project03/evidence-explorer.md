---
title: "Project 03 — Evidence Explorer"
description: "A selected frozen comparison of 15 repository evidence cases and 25 projection observations—not a score or live-status dashboard."
type: research
visibility: public
status: published
graph: false
---

# Project 03 — Evidence Explorer

[[research/project03/index|← Project 03 Story Map]]

What did the records actually establish? This selected extract lets you compare fifteen repository evidence cases and twenty-five projection observations without turning verification, engineering acceptance, lineage and runtime into one score.

**Historical evidence, not live status.** All figures describe the frozen schema-v1.1 Project 03 comparison. An accepted W0–W8 package means the evidence was reviewed for the study—not that its software was accepted, deployed, healthy or operating today.

Case 01–15 are stable **editorial pseudonyms, not guaranteed anonymity**. Already-published examples may make some cases recognizable. This is not the complete underlying dataset; source references and the case-to-repository mapping remain private.

## Candidate verification

**15 repositories.** What check results were observed for an exact candidate?

| Recorded state | Count |
| --- | ---: |
| `SUCCESS_OBSERVED` | 13 |
| `MIXED` | 1 |
| `NOT_ESTABLISHED` | 1 |

The mixed case includes two successful checks and one failed check. It is not a pass. Candidate verification is separate from engineering acceptance.

## Engineering acceptance

**15 repositories.** Was the required candidate-specific acceptance authority established?

| Recorded state | Count |
| --- | ---: |
| `ESTABLISHED` | 1 |
| `UNKNOWN` | 1 |
| `NOT_ESTABLISHED` | 13 |

These are **separate distributions, not a cross-tab**. They do not identify which repositories overlap. The separately recorded 11/15 pairing is explained in [[research/project03/verification-is-not-acceptance|Verification is not acceptance]]; it cannot be deduced by aligning the chart totals. Package acceptance is not engineering acceptance.

## Independent runtime observation

**25 projection observations—not 15 repositories.** These are not necessarily twenty-five distinct deployed services.

| Recorded state | Count |
| --- | ---: |
| `ESTABLISHED` | 0 |
| `NOT_ESTABLISHED` | 18 |
| `NOT_OBSERVED` | 4 |
| `NOT_COLLECTED` | 1 |
| `UNKNOWN` | 2 |

Zero positive independent observations do not prove that the systems were offline. These historical records do not establish current uptime. [[research/project03/publication-and-runtime-reality|Publication and runtime reality]] explains why publication, runtime claims and independent observation answer different questions.

## The fifteen-case comparison

Each column asks a different question. The row states are **not grades**. Whole-candidate lineage can remain unestablished even where provenance for a smaller declared subset is positive.

Wide table: swipe or scroll sideways to read every field. Keyboard users can Tab to the table region and use the left/right arrow keys. On a narrow screen, the qualification column repeats its case label.

| Case | Candidate verification | Engineering acceptance | Whole exact candidate lineage | W0–W8 package review | Reading qualification |
| --- | --- | --- | --- | --- | --- |
| Case 01 | `SUCCESS_OBSERVED` | `ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED` | Explicit candidate-specific engineering acceptance; public projection relation is not whole-candidate lineage. |
| Case 02 | `SUCCESS_OBSERVED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED` | Successful exact-head checks do not establish acceptance; one public projection observation has no recorded stable ID. |
| Case 03 | `MIXED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED_WITH_QUALIFICATIONS` | MIXED: two successful checks and one failed check. Positive provenance is limited to a declared 27-file subset. |
| Case 04 | `SUCCESS_OBSERVED` | `UNKNOWN` | `NOT_ESTABLISHED` | `ACCEPTED_WITH_QUALIFICATION` | Engineering acceptance UNKNOWN remains unresolved; absent runtime observation is not proof of service failure. |
| Case 05 | `SUCCESS_OBSERVED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED` | Seven separately keyed projections; one different direct-public technical surface is not an additional projection. Historical visibility drift remains. |
| Case 06 | `SUCCESS_OBSERVED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED_WITH_QUALIFICATIONS` | Four successful checks; public surface lacks a source-recorded projection ID; no whole-candidate lineage established. |
| Case 07 | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED_WITH_QUALIFICATIONS` | Qualifying exact-head verification NOT_ESTABLISHED; formal activity collection gap must not be called a failed check. |
| Case 08 | `SUCCESS_OBSERVED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED_WITH_QUALIFICATIONS` | Three keyed projection observations; independent runtime observation not positively established. |
| Case 09 | `SUCCESS_OBSERVED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED_WITH_QUALIFICATION` | One public surface without a stable recorded projection ID; exact-candidate relation not established. |
| Case 10 | `SUCCESS_OBSERVED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED_WITH_QUALIFICATIONS` | Final W0–W8 reviewer lock retains qualifications; publication review is not engineering acceptance. |
| Case 11 | `SUCCESS_OBSERVED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED` | Successful checks are bounded to offline/mock/backend-disabled conditions, not actual cloud runtime. |
| Case 12 | `SUCCESS_OBSERVED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED_WITH_QUALIFICATION` | Two keyed projected candidates; historical visibility conflict persists and runtime observation remains UNKNOWN. |
| Case 13 | `SUCCESS_OBSERVED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED_WITH_QUALIFICATIONS` | Three distinct projection candidates; a live claim is not a positive independent runtime observation. |
| Case 14 | `SUCCESS_OBSERVED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED` | Generated, history-light visible projection; recorded zero public activity does not establish upstream inactivity. |
| Case 15 | `SUCCESS_OBSERVED` | `NOT_ESTABLISHED` | `NOT_ESTABLISHED` | `ACCEPTED_WITH_QUALIFICATIONS` | Private generated export; bounded zero activity not upstream inactivity; repository-level W4 without a projection instance. |

## How to read the limits

- `NOT_ESTABLISHED` means the required evidence was not established in the frozen collection—not that the system failed or never existed.
- `UNKNOWN`, `NOT_OBSERVED` and `NOT_COLLECTED` retain their distinct recorded meanings.
- Whole exact candidate lineage is a complete candidate-binding question, not a denial of every repository relationship or scoped provenance result.
- W0–W8 package review concerns the evidence package, potentially with qualifications—not engineering acceptance of its software.

[[research/project03/consumer-lab-mixed-evidence|Consumer Lab]] shows this concretely: a mixed verification result and established provenance for a declared 27-file subset coexist with whole-candidate lineage `NOT_ESTABLISHED`. [[notes/lineage-and-provenance|Lineage and provenance]] explains the scope distinction.

## What is deliberately withheld

Repository names and mappings, private source coordinates, receipts, selectors, raw activity windows and screenshots are omitted by editorial choice. **Withheld information is not the same as missing or unestablished evidence.** No CSV/JSON downloads or private workbook links are supplied.

Activity windows were not fully aligned and historical conflicts remain unresolved. This extract does not total them, create productivity or readiness scores, or extend the original three-case conclusions to all fifteen.

The [Edge Evidence case study](../../projects/edge-evidence) describes separate engineering demonstrations; it is not a current deployment attestation supplied by this frozen comparison.

*Research basis: the previously reviewed frozen schema-v1.1 repository comparison and dashboard. Exact source references, field mappings and redaction decisions are retained privately. This presentation introduces no new measurements.*
