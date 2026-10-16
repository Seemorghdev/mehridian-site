---
title: Agent vs deterministic inspector
description: Rules, language models, tool use, and action permissions are different responsibilities. Edge Evidence makes the distinction concrete.
type: concept
visibility: public
status: published
source_checked: 2026-10-14
---

# Agent vs deterministic inspector

An interface can explain a result without using an AI model. Calling a component an “Agent” does not tell us how it reaches a conclusion—or what it is allowed to do.

The [[projects/edge-evidence|Edge Evidence]] visual demo is a useful example. Its Explain button uses predefined rules to inspect three synthetic states. It is not an LLM-powered agent performing work behind the scenes.

## Four separate questions

### 1. Deterministic inspection: what do the rules say?

A programmer defines the conditions and responses. For the same supplied state, the inspector follows the same branch and returns the same classification and explanation.

This can be the right choice when the states are well understood and the response needs to be predictable. It does not make the supplied record true: a rule can classify a “complete” state without independently verifying that a stored copy matches its source.

### 2. LLM-based reasoning: how might a model interpret this?

A language model can interpret context and generate an explanation instead of selecting only from predefined text. That flexibility may help with unfamiliar questions, but a convincing answer can still be wrong.

Generated explanations need checks against source evidence. Model output is not, by itself, a verification result or an approval.

### 3. Tool use: what can the system call?

A tool is a callable operation: reading a record, inspecting an artifact, or running a process. Tools can contain deterministic logic. Using a tool does not automatically involve a language model.

In an agentic workflow, a system may choose a tool, supply its inputs, examine the result, and choose a next step. A predefined workflow can also call tools without making those choices dynamically. Neither arrangement tells us whether its tools are read-only or can change something.

### 4. Authorization: who permitted the action?

Authorization is a separate decision about which actions may run, on which resources, and under whose approval. A model suggestion or a proposed command does not grant permission to execute it.

Safe boundaries need to be enforced by the application and its execution environment—not merely described in an explanation or prompt.

## What Edge Evidence actually implements

In the public Reference Platform source, the `/api/v1/inspect` HTTP handler directly calls `inspect_artifact`. That function does not call an LLM. It selects a classification and explanatory text from explicit state branches:

- `complete` → `healthy-complete`: a finished state is recorded; that label alone does not verify every stored copy.
- `deferred` → `bounded-defer`: the example is waiting, not complete; inspection does not retry it.
- `prepared` → `prepared-awaiting-catch-up`: the example is ready for processing, but no completed result is shown.
- Other supported states → `attention-required`: the inspector does not guess or act automatically.

The relevant implementation is the [inspection handler](https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/37e8a8f9a34ff04eea621d146fea078632ed9125/services/edge-agent/src/edge_evidence_edge_agent/app.py#L49) and the [classification rules and explanations](https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/37e8a8f9a34ff04eea621d146fea078632ed9125/services/edge-agent/src/edge_evidence_edge_agent/core.py#L8).

Some responses contain a proposal and request human approval. The inspector does not execute that proposal. The [response contract](https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/37e8a8f9a34ff04eea621d146fea078632ed9125/packages/shared-contracts/src/edge_evidence_contracts/models.py#L65) defaults `mutation_authorized` to `false`. That flag describes the boundary; it is not a universal security mechanism on its own.

The [gateway route selection](https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/37e8a8f9a34ff04eea621d146fea078632ed9125/services/web-ui/src/edge_evidence_web_ui/gateway.py#L46) exposes selected retrieval and inspection routes and deliberately omits the demo-reset endpoint. Clicking Explain does not run the Processor or Replication workers. Sending an inspection payload with HTTP POST is not permission to change the underlying state.

## Proposed experiment: ADK + Ollama

An optional [ADK adapter](https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/37e8a8f9a34ff04eea621d146fea078632ed9125/services/edge-agent/src/edge_evidence_edge_agent/adk_adapter.py#L13) already wraps the same deterministic function as a read-only tool. It requires explicit enablement and a model setting. The [gateway Dockerfile](https://github.com/Seemorghdev/edge-evidence-reference-platform-public/blob/37e8a8f9a34ff04eea621d146fea078632ed9125/services/web-ui/Dockerfile.gateway#L2) sets ADK to disabled, and the inspection HTTP handler remains a direct deterministic call.

ADK + Ollama would be a future experiment: use ADK to coordinate tool use and Ollama to serve a language model, then compare model-assisted explanations against the deterministic baseline. The existing adapter does not establish a working Ollama integration. No accuracy, latency, safety, or experiment results are claimed here.

Adding a model would not grant permission to process evidence, replicate it, or change a provider resource. Reasoning, tool access, and action authorization would still need separate boundaries.

## The useful distinction

Ask four questions when someone says “agent”: **What reaches the conclusion? What tools can it call? What can those tools change? Who authorized that change?**

For the concrete demos and public code, return to [[projects/edge-evidence|Edge Evidence]]. For the curated collection, see [[notes/index|Notes]].

Implementation references are pinned to public commit `37e8a8f9a34ff04eea621d146fea078632ed9125`, checked on 14 October 2026 (UTC). They describe that implementation, not a new deployment or an experiment result.
