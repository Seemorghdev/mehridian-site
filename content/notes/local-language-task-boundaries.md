---
title: Task boundaries before model size
description: A small local English/German translation experiment, and why parser and model responsibilities matter more than a leaderboard.
type: concept
visibility: public
status: published
source_checked: 2026-10-22
---

# Task boundaries before model size

A language application can appear unreliable for several reasons: a service boundary fails, a model is asked for too much, or a well-formed answer is linguistically wrong. Those are different failures.

In **Linguistic Pipeline**, fixing the gRPC message bindings let the local workflow use the installed English and German spaCy parsers instead of silently falling back to approximate parsing. Wire-level tests matter here: an interface mock cannot prove that a real RPC message can be serialized.

The next change reduced the local model's responsibility. It produces a natural translation. The application separately compares parser-derived part-of-speech sequences, while additional model-written teaching notes are optional. Statistical parser labels and mechanical register suggestions can be wrong. Neither schema checks nor matching part-of-speech sequences establish grammatical or semantic correctness.

## A bounded comparison

On one Apple M4 Mac with 16 GiB of RAM and Ollama 0.40.7, I ran the same three application requests sequentially with Qwen3 4B and Llama 3.1 8B. Both models were preloaded; application response caches were fresh. The prompts, inputs and output schema were held constant. Both used Q4_K_M, a 4,096-token resident context, temperature zero and a 512-token output limit. Thinking was disabled for Qwen.

These values measure **API request to completed translation event**, not first token, cold load or the full four-stage journey.

| Input → target | Qwen3 4B | Llama 3.1 8B |
| --- | ---: | ---: |
| The small bird waits near the window. → German | 4.325 s | 8.816 s |
| Guten Morgen. → English | 4.063 s | 5.825 s |
| Breaking the ice was easier than I expected. → German | 5.196 s | 7.592 s |

Both models returned a translation, a separate parser comparison and a terminal result in each of these six application requests, with no recorded cache hits or correction retries. Qwen reached the completed translation sooner in these individual observations. This was one pass per input, always Qwen first—not a randomized benchmark, an accuracy ranking, or a reliability rate.

## Check the words, not just the clock

Both models translated “Guten Morgen.” as “Good morning.” Both added a diminutive—“Vögelchen”—to the bird sentence, even though it is not explicit in the English. For the idiom sentence, Qwen returned “Das Eis zu brechen war einfacher, als ich erwartet hatte.” Llama returned “Das Eis brechen war leichter als erwartet.” The latter compresses “I expected.” These are observations about specific outputs, not expert-scored grades.

The matched pass did not assess optional free-form teaching notes. Earlier inaccurate explanations belonged to other configurations and cannot be treated as errors newly measured here.

Later checks on a revised Qwen learner workflow exposed other limits: a lesson explained the rain idiom correctly, but its separate German translation still rendered “cats and dogs” literally. A German bicycle translation had an agreement error. A Persian politeness expression was misread as a statement about hand pain rather than thanks. These are separate qualitative observations, not additions to the six timing measurements or a matched comparison with Llama.

## The practical decision

The local default is Qwen3 4B, with Llama 3.1 8B still an installed alternative. The engineering takeaway is to make each task inspectable; this small comparison does not isolate the effect of task boundaries or prove that one model generally wins.

The revised learner path is Words → Understand → optional Translate, with Style available separately. An optional question concerns the current sentence; turns have no conversation memory. Translation uses the original source, not the model's lesson as an authoritative intermediate. Persian input and translation are experimental: segmentation is available, but there is no trained Persian grammar parser in this configuration.

The interface distinguishes parser observations, rule-based style hints, fallible model interpretation and translation. It can preload a local model for a finite interval, cancel or retry a request, and stream **completed stages**. It does not stream individual generation tokens. Browser cancellation does not verify that the external model server stopped immediately.

This is a local implementation under review, not an announcement of a hosted model demo or a published benchmark.

For related distinctions, read [[notes/agent-vs-deterministic-inspector|Agent vs deterministic inspector]] or return to [[notes/index|Notes]].
