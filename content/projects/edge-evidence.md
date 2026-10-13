---
title: Edge Evidence
description: A synthetic demonstration of evidence processing, verified copies, and read-only inspection.
visibility: public
status: approved-for-publication
---
# Edge Evidence

Edge Evidence explores a practical engineering question: how do you process evidence
reliably and show that a copied result matches its source?

The project separates processing, replication, and inspection so their responsibilities
are clear. Its public demonstrations use synthetic data.

## Start with the visual demo

[Open the Visual Gateway](https://edge-evidence-visual-gateway-2e3eaeb86f95.herokuapp.com/)
and explore three example states: completed, waiting, and prepared. Each Explain button
describes what that state means and what a reviewer can inspect.

The page combines a Web UI, Evidence API, and read-only Edge Agent. Its explanations
follow deterministic rules. It does not start workers or execute the complete processing
and replication workflow. This demonstration combines the application responsibilities
in one runtime; it does not claim production-grade service isolation.

## Follow the execution proof

[Processor + Replication technical proof — JSON/API](https://seemorgh-evidence-showcase-45655632eff2.herokuapp.com/api/demo)
returns a synthetic execution result that may be cached. The result records processing,
a verified handoff to replication, independent readback of the copied bytes, and replay
with no new writes. This endpoint returns JSON rather than a visual application.

Both demonstrations are engineering examples, with no claim of production availability
or persistent hosted evidence storage.

## Explore the public code

- [Processor](https://github.com/Seemorghdev/edge-evidence-processor-public) — processing and recovery behavior.
- [Replication](https://github.com/Seemorghdev/edge-evidence-replication-projection) — copying, independent verification, and safe replay.
- [Reference Platform](https://github.com/Seemorghdev/edge-evidence-reference-platform-public) — the UI, API, inspector, and gateway.

[Back to Mehridian](../index.md)
