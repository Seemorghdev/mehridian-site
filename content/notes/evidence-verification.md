---
title: "Evidence verification"
description: "How to connect a bounded technical claim to independently checkable evidence."
type: concept
visibility: public
status: review-candidate
---

# Evidence verification

Verification connects a **specific claim** to an observable check. This public-facing concept describes a practice; it is not itself a fresh audit result. Record what was checked,
against which source, under what conditions, and when; keep the result narrower than
the evidence that supports it.

For example, to check that a copy matches an original, compare the expected byte count and content hash, then read the destination independently. A checked subset does not prove the integrity of a whole candidate. A recorded “complete” label
alone is not that check.

## Question to explore

What evidence would let someone else repeat the check without trusting my conclusion?

## Connections

- [[projects/edge-evidence|Edge Evidence]] uses this idea in processing and replication.

This is a general concept note, not a new finding about any frozen project audit.
