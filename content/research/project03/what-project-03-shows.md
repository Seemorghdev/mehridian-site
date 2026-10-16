---
title: "What Project 03 actually shows"
description: "What the frozen evidence supports, and what it cannot establish."
type: research
visibility: public
status: published
---

# What Project 03 actually shows

[[research/project03/index|← Back to the Story Map]]

I started by asking what the retained engineering evidence could tell me about “done.” The answer is less clean than a single verdict, but clearer than where I started: several separate questions whose answers could disagree—or remain unresolved.

That isn't a failed investigation. It means the word *done* was carrying more authority than any single check could justify.

## Four lessons survived the simplification

**Verification is not acceptance.** The historical verification distribution is 13 `SUCCESS_OBSERVED`, one `MIXED` and one `NOT_ESTABLISHED`. Acceptance is one `ESTABLISHED`, one `UNKNOWN` and 13 `NOT_ESTABLISHED`. Eleven repositories show verification success alongside acceptance `NOT_ESTABLISHED`. The pairing is supported; its cause is not. A missing authoritative acceptance record is not an observed rejection. [[research/project03/verification-is-not-acceptance|Read the case comparison.]]

**The scope of a proof matters.** [[research/project03/consumer-lab-mixed-evidence|Consumer Lab]] has a `MIXED` result across three checks and positive provenance for a manifest-declared 27-file subset. Its whole exact candidate lineage is still `NOT_ESTABLISHED`. A bounded positive result stays positive only at its own scope.

**A relationship is not whole-candidate lineage.** All 15 whole exact candidate lineage states remain `NOT_ESTABLISHED` in the frozen comparison, yet lower-scope recorded relationships and scoped provenance exist. The result does not show that no repositories were related. [[notes/lineage-and-provenance|Trace the distinction.]]

**A live claim is not a live observation.** None of the 25 accepted projection observations recorded positive independent runtime establishment. The distribution spans `NOT_ESTABLISHED`, `NOT_OBSERVED`, `NOT_COLLECTED` and `UNKNOWN`; these states preserve different limits. The zero does not show that every service was offline or failed a runtime test. [[research/project03/publication-and-runtime-reality|See the runtime account.]]

## What I will not conclude

I cannot infer from these records that AI caused missing evidence, improved or harmed productivity, accelerated development, or created the acceptance gaps. My description of the period as AI-heavy belongs to author retrospective. The comparison does not provide a controlled intervention or a counterfactual.

I cannot rank the repositories by quality or readiness, claim no system was ever live, or derive a single production-acceptance verdict. The historical source also has a conflict in its activity totals; this collection deliberately makes **no activity-total claim**.

There may be reasons for missing or uncertain evidence. The freeze preserves the limits; it doesn't pick explanations the source cannot settle.

## The conclusion I am willing to keep

Project 03 does not provide one clean definition of “done.” It provides evidence dimensions—verification, acceptance, lineage, publication, runtime observation—that may align, diverge or remain unknown.

When I stop treating them as synonyms, I sometimes have to say less. But I know why I can trust what remains.

This is the same discipline I want to carry into [[projects/edge-evidence|Edge Evidence]] as a living engineering system: precise identities, explicit readback, durable state transitions and documented refusals. That connection is a *methodological bridge*, not a claim that today's implementations were a new frozen Project 03 result. The existing [[notes/agent-vs-deterministic-inspector|Agent vs deterministic inspector]] article makes a related distinction between explanation and authority to act.

*Research basis: frozen closeout, dashboard, repository and projection comparisons, and the original final synthesis. Private claim-to-evidence pointers remain in the accompanying review register, not on the public page.*
