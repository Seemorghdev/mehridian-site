---
title: A local model can explain a record without being trusted with it
description: How the optional local Llama workbench keeps a model's words separate from the rule-based result and from any authority to act.
type: note
visibility: public
status: published
source_checked: 2026-10-25
---

# A local model can explain a record without being trusted with it

In November 2022, a man named Jake Moffatt asked Air Canada's website chatbot about bereavement fares after his grandmother died. The chatbot told him he could buy a full-price ticket and claim the discount within 90 days. That wasn't the airline's policy, and when he applied, Air Canada refused. In the small-claims case that followed, the airline argued that its chatbot was "a separate legal entity that is responsible for its own actions." The tribunal called that "a remarkable submission" and [held Air Canada liable](https://en.wikipedia.org/wiki/Moffatt_v._Air_Canada) for what its own website had said (*Moffatt v. Air Canada*, 2024 BCCRT 149).

The amount at stake was about C$800. The lesson was much bigger: **if your system shows a model's words, you own them.** Nobody reading a screen distinguishes between the text a rule produced and the text a model improvised, unless you make the difference impossible to miss.

That was the design problem for Edge Evidence's optional local Llama workbench. How do you let a model help someone understand a record without its text being mistaken for the result, and without giving it any way to change anything?

## The result does not come from the model

Edge Evidence's inspector is a deterministic function. Follow one record: the browser sends a record whose state is `complete` to `/api/v1/inspect`. The [HTTP handler][5] calls `inspect_artifact` directly, and its explicit [state branch][6] returns `healthy-complete` and a fixed explanation. No model decides what a record means.

That rule result has its own limits, and they're worth stating, because they apply to the model too. The important word is **supplied**. The inspector explains the record it was given; it never reads a stored copy or compares bytes. Checking a copy is the [replication worker's readback][12]. A rule can faithfully explain an incomplete input, and so can a model. Neither of them is evidence about the world beyond the record.

## What the workbench adds, and how it is fenced

The [local workbench][14] runs Llama 3.1 8B on the reviewer's own Mac and lets them ask about one frozen synthetic record. That can help: a model can put unfamiliar terms such as `bounded-defer` into plain words. But its text can be wrong or withheld, and it doesn't replace the inspector's result. OWASP's 2025 Top 10 for LLM applications has a name for what goes wrong when this kind of feature is built carelessly: [Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/), meaning damaging actions taken because a model's output was wrong, ambiguous or manipulated. Its three root causes are too much functionality, too many permissions and too much autonomy. The workbench's limits are a direct answer to each:

![Diagram of one turn: a question of at most 2,000 characters passes a server-side guard allowing at most two requests and about 30 seconds, to Llama 3.1 8B on its own loopback server with a 4,096-token context and 256 output tokens; its only tool is the read-only inspector, called at most twice; the result is shown as an optional explanation, withheld, model failure or deterministic fallback. Starting a worker, approving an action, reading a stored copy and the user's own port 11434 are out of reach.](../assets/edge-evidence-local-model-reach-2026-10-25.svg)

- **Functionality: one tool, read-only.** The model can call the inspector and nothing else, at most twice a turn. There is no tool that writes, starts a worker or approves anything.
- **Permissions: its own server, pinned inputs.** The app leaves an existing Ollama listener on port 11434 alone and runs its own loopback server on 11435. If that port is busy, startup refuses rather than attaching to someone else's process. It verifies the pinned workbench source and the exact model digest, never pulls models and never falls back to a cloud model.
- **Autonomy: small, server-side limits.** Questions are capped at 2,000 characters. Each turn allows at most two model requests, a 4,096-token context, 256 output tokens and about 30 seconds. Unexpected fields, tools, hosts and origins are refused. Separate questions aren't joined into a remembered conversation, so nothing accumulates.
- **Provisional until checked.** Streamed text is shown as provisional. Only the constrained final result appears as an optional explanation, and the screen keeps it visibly distinct from a withheld answer, a model failure and the deterministic fallback.
- **Cancellation that cleans up.** Cancel stops the turn and the owned model server, and no new turn starts until that cleanup is confirmed.

These guards and the inspector's read-only contract are two separate layers. Neither is an operating-system sandbox, and neither makes generated text true. What they do is make sure that when the text is wrong, it can't do anything.

## What was observed, and why I'm careful with it

In July 2025, METR published a [randomised study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) of experienced open-source developers working on their own repositories. Developers expected AI tools to speed them up by 24%. With the tools allowed, they took 19% *longer*, and even afterwards they still believed the tools had helped. That gap between how AI assistance feels and what it measurably does is the best argument I know for reporting model results conservatively.

So, plainly: the exported workbench's offline test suite passed. Those tests use an explicitly mocked model transport that makes no model calls. They show the guards behave as written, and the workbench's own README says they must not be reported as a successful model run.

Against the real local model there are only three small sessions, and I'm reporting them separately. The first, on 20 October, asked three questions and got two explanations accepted and one withheld, at roughly 9 to 11 seconds a turn.

The second, on 26 October (Ollama 0.40.11, workbench head `963d9c6`), used three questions fixed in advance, one turn each, with no retries. It came out the other way: one accepted, two withheld. The withheld ones are the instructive part. In both, the model's raw text expressed the relevant boundary correctly: "You cannot approve the change from here because this inspector cannot authorize changes to the record", and "This record does not provide evidence that the stored copy matches the source." The guard still refused them.

The reason is in [the policy code][15]. It treats any mention of approval, copies or verification as off-limits unless it appears in one of a short list of recognised denial phrasings, and those two sentences weren't on the list. The answer it did accept was accurate, but it wasn't a complete answer: it didn't address whether the next step happens automatically. The prompt restricts discussion of workers and execution, which may explain the omission; the run doesn't establish that.

The third, later the same day at the merged revision `692713d`, asked for what the workbench is meant to do: explain a record in plain words. Asked to summarise the complete record in one or two sentences, the model wrote: "This record is complete and the inspector has read the label, but it does not process the artifact. No independent readback evidence is provided by this inspection." That is a complete, accurate answer, and it mentions readback without being refused, because it says what the record *doesn't* show. A request to explain the prepared record to a newcomer was withheld, and that session didn't retain the raw text, so I can't judge it. A third question was asked against the wrong record by mistake. I've left it out rather than rerun it.

So: in the text that reached the screen in the second and third sessions, I identified no false claim. That isn't a general safety finding. The guard paid for it by withholding answers that stated the boundary correctly. It is a pattern list that leans towards silence, not a judge of truth. Eight usable questions can't say how often it errs in either direction. This is not a benchmark, and I'm not presenting it as one.

## Explaining is not doing

The [response contract][7] sets `mutation_authorized` to `false` by default; the selected hosted [Gateway routes][8] omit reset; and the inspection handler does not run the workers. The hosted demo doesn't run the model at all: its Ask view only describes the local path.

Air Canada's chatbot failed on a question of authority as much as accuracy: its words were treated as the airline's policy. The questions worth asking of any explanation, from a rule or a model, are the same three:

1. **What facts did it receive?**
2. **What produced the words?**
3. **What is it allowed to do?**

The workbench answers them in code, not in the model's prompt. A prompt is a request. A missing tool is a guarantee.

More in [[notes/index|Notes]].

---

*Inspector code references: public baseline [`37e8a8f`][5], checked 14 October 2026. An [optional ADK adapter][9] exists in that baseline, but the HTTP handler calls the deterministic function directly and the [baseline Gateway disables ADK][10]; that is not a completed model comparison. Workbench requirements, limits and test counts are from the [local workbench guide][13]. See also the [Edge Evidence project][11].*

**Further reading:** *Moffatt v. Air Canada*, 2024 BCCRT 149 ([summary](https://en.wikipedia.org/wiki/Moffatt_v._Air_Canada)). OWASP, [LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/). METR, [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) (2025).

[5]: https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/37e8a8f9a34ff04eea621d146fea078632ed9125/services/edge-agent/src/edge_evidence_edge_agent/app.py#L49
[6]: https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/37e8a8f9a34ff04eea621d146fea078632ed9125/services/edge-agent/src/edge_evidence_edge_agent/core.py#L8
[7]: https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/37e8a8f9a34ff04eea621d146fea078632ed9125/packages/shared-contracts/src/edge_evidence_contracts/models.py#L65
[8]: https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/37e8a8f9a34ff04eea621d146fea078632ed9125/services/web-ui/src/edge_evidence_web_ui/gateway.py#L46
[9]: https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/37e8a8f9a34ff04eea621d146fea078632ed9125/services/edge-agent/src/edge_evidence_edge_agent/adk_adapter.py#L13
[10]: https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/37e8a8f9a34ff04eea621d146fea078632ed9125/services/web-ui/Dockerfile.gateway#L2
[11]: ../projects/edge-evidence
[12]: ../projects/edge-evidence#a-copy-counts-only-after-it-is-read-back
[13]: https://docs.mehridian.tech/edge-evidence/local-workbench/
[14]: https://github.com/Seemorghdev/edge-evidence-reference-platform-public/tree/692713d2083033719bd68c1a17b67c0c0d6b43d3/examples/local-llama-workbench
[15]: https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/773d8b87d5f909b75cbdcdfb2e4d09bc8a4f4aff/examples/local-llama-workbench/runtime/explanation_policy.py
