---
title: "Findings and unanswered questions"
description: "What the three-repository test supported, what the fifteen-repository estate shows, ten tempting claims the records rule out, and why this matters beyond my own work."
type: research
visibility: public
status: published
publication_approved: false
owner_approval_required: true
source_checked: 2026-10-25
---

# Findings and unanswered questions

I started Project 03 with a vague discomfort: a lot of what I'd built recently had been written fast, with heavy AI assistance, and it all *looked* finished. The checks were green and the repositories were public. What I couldn't say was what another person could verify about any of it.

Fifteen repositories later, I can be precise about that. This chapter puts the results together: four findings across the estate, the claims tested on the three-repository cohort, ten claims the records rule out, and what it all means beyond my own work.

## Four findings

Across the 15 repositories, read per repository:

1. **Checks passed almost everywhere.** 13 of 15 exact candidates passed. One was `MIXED`, with a failed check kept in the record, and one had no qualifying check. [[research/project03/verification-is-not-acceptance|Read the case comparison.]]
2. **Acceptance was recorded once.** Of those 13, one has an acceptance record, one is `UNKNOWN` and eleven have none, although the checks looked the same on all of them. A missing acceptance record isn't a rejection; it's a decision nobody wrote down.
3. **No whole candidate was traced to its source.** All 15 are `NOT_ESTABLISHED` for whole-candidate lineage, even though relationships were recorded and [[research/project03/consumer-lab-mixed-evidence|Consumer Lab]] proved an exact match for a declared 27-file subset. A positive result at one scope stays positive only at that scope.
4. **Nothing was independently observed running.** None of 25 published surfaces has a positive independent observation. That doesn't mean the services were down. [[research/project03/publication-and-runtime-reality|See the runtime account.]]

Together they make one shape: the cheapest evidence was nearly universal, and each more expensive kind dropped to one or zero. I would not have seen that from the green checks alone. That's the point of the exercise.

## Why this matters beyond my repositories

This is one person's estate, so I can't say whether it's typical. What I can say is that the shape matches what larger studies are finding about AI-assisted software work:

![Left: METR 2025, developers expected AI tools to make them 24 percent faster and measured 19 percent slower. Right: DORA 2024, a 25 percent increase in AI adoption associated with 1.5 percent lower delivery throughput and 7.2 percent lower delivery stability.](../../assets/context-ai-measured-vs-felt-2026-10-25.svg)

- In METR's 2025 [randomised controlled trial](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/), 16 experienced open-source developers expected AI tools to speed them up by 24%. Measured across 246 real issues, they took 19% longer, and afterwards still believed they'd been faster.
- DORA's 2024 research found a 25% increase in AI adoption was associated with a [7.2% decrease in delivery stability](https://dora.dev/ai/gen-ai-report/), and pointed at larger, harder-to-review batches of generated code.

Neither study measured my repositories, and my comparison has no control period, so none of this says AI caused my gaps. But both point at the same mechanism Project 03 makes visible: **producing code and passing checks have become cheap, and the evidence that the code is trustworthy hasn't.** It still has to be made deliberately, by a person or a system designed to make it.

## What the three-repository test supported

These are the study's claims, and they hold for Cohort 1 only (n=3: a private control, a history-heavy multi-projection platform and a generated, history-light public projection).

- **The evidence states held across very different repositories.** The same distinctions, including `NOT_ESTABLISHED`, survived all three profiles without collapsing into one label.
- **Verification stayed separate from acceptance.** All three passed their checks; acceptance was evaluated independently and wasn't established for any of them.
- **One model handled one surface and many.** Publication, lineage and runtime were kept per surface, whether a repository had one or several.
- **States compare; raw activity doesn't.** Evidence states could be compared across repositories; commit and issue counts only made sense with their window and history attached.
- **Public findings didn't need private evidence.** The public outputs kept the useful findings without exposing private identities or lineage internals. The cost is that a reader can't reproduce the private evidence.

## Claims the study rejected

The records are just as useful for ruling things out. Each of these is a tempting one-line summary, and each is unsupported:

| Rejected claim | Why |
| --- | --- |
| Successful CI demonstrates engineering acceptance. | Acceptance was not established; CI is verification, not acceptance authority. |
| The repositories have high CI quality or a 100% CI score. | No overall CI score is defined; check surfaces have different scopes and denominators. |
| Higher activity means greater productivity. | Activity is bounded instrumentation, not a performance measure. |
| The generated repository had no meaningful activity. | Its zeros describe visible projection history only. |
| Exact private-to-public candidate lineage is established. | It is not, wherever authoritative evidence was absent. |
| A repository's runtime status fits one value. | The multi-surface case has different states per surface. |
| A failed runtime read means the runtime failed. | It leaves observation not established; it does not establish failure. |
| "Explicitly not claimed" and "no claim found" are the same. | The runtime record keeps them as different states. |
| Public-safe output makes all evidence reproducible. | Useful findings were public while the underlying evidence stayed private. |
| Cohort 1 proves the method generalises. | Three tested profiles are bounded support, not universal validity. |

The second and third rows are the ones I'd have been most tempted to put on a portfolio page. "15 repositories, green CI almost everywhere, hundreds of commits" reads well and says almost nothing.

## What I will not conclude

I can't infer from these records that AI caused the missing evidence, improved or harmed my productivity, accelerated development, or created the acceptance gaps. The comparison has no controlled intervention and no counterfactual. The AI-heavy period is why I asked the question, not something the comparison measured.

I also can't rank the repositories by quality or readiness, claim that no system was ever live, or give one production-acceptance verdict. The historical source also has a conflict in its activity totals, so the study makes no activity-total claim at all.

## The conclusion supported by the record

Project 03 doesn't give one definition of "done." It shows that four questions have to be asked separately: did it pass, was it accepted, can it be traced, was it seen running. In my own repositories the answers were 13 of 15, 1 of 15, 0 of 15 and 0 of 25 surfaces. The answers can align, diverge or stay unknown, and the comparison keeps a positive check next to an unresolved stronger claim instead of treating every missing answer as a failure.

[[projects/edge-evidence|Edge Evidence]] is where I carry that into a working system: exact identities, readback before a copy counts, durable state transitions and recorded refusals. That's a method carried forward, not a new Project 03 result. [[notes/agent-vs-deterministic-inspector|A local model can explain a record without being trusted with it]] applies the same separation to AI: what a model says, and what it's allowed to do, are different questions too.

*Research basis: the frozen closeout, final aggregate (copied, not recomputed), repository and projection comparisons, and the Cohort 1 academic roll-up, including its rejected-claims list. External context: METR (2025) and DORA (2024), linked above; neither studied these repositories.*