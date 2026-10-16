---
title: "Lineage and provenance — evidence binding"
description: "Why repository relations and partial byte checks differ from exact-candidate lineage."
type: concept
visibility: public
status: review-candidate
---

# Lineage and provenance — evidence binding

Three claims can sound similar while requiring different evidence.

**Repository relationship:** a public projection can be related to a source repository. A recorded `projection_of` relationship is useful, but does not automatically bind every file to an exact source candidate.

**Scoped provenance:** a declared subset can be checked precisely. [[research/project03/consumer-lab-mixed-evidence|Consumer Lab]]'s frozen record establishes provenance for 27 manifest-declared files whose source and target blob identities matched. The subset is part of the result, not a detail that can be dropped.

**Whole exact candidate lineage:** the stronger claim binds the whole candidate across the source-to-target path. In [[research/project03/index|Project 03]], this remained `NOT_ESTABLISHED` for all 15 repositories, including Consumer Lab. That is not proof that all relationships or all provenance were absent.

The concept connects to [[notes/evidence-verification|Evidence verification]]: name the claim and the scope before choosing the check. It also matters in [[projects/edge-evidence|Edge Evidence]], where content fingerprints and receipts must not be confused with approval or a universal source-to-deployment identity proof.

The stronger claim would need evidence binding the **whole exact candidate**, not merely those files.

Research basis: original connected Project 03 story/concept and frozen schema-v1.1 comparison. Exact private tab, range, screenshot and claim pointers are retained in the internal review matrix; no source-workbook links are published.
