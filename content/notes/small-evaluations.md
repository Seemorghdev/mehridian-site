---
title: A small evaluation is not a deployment
description: What eight selected frames, one public rerun and a training record can each tell you, and why they stay separate.
visibility: public
status: published
---

# A small evaluation is not a deployment

Two projects made the distinction concrete in different ways: an [[projects/small-object-detection|offline vision experiment]] and a solo hackathon integration prototype. Both produced useful results. Each result answers one specific question, and the useful habit is to say which.

## Finding and choosing are different checks

The vision project's main result is a good one. In each of eight selected field frames, the tiled scan returned a candidate next to the object marked by hand. The scan kept the object instead of resizing it away, which is what it was built to do. The check used the manual marks to find the match, so it answers "was the right box among the candidates?" for those frames. It doesn't show that the system can choose that box unaided.

Choosing is the separate, harder question. A separate operator-cued selection check succeeded in two of four paired observations. The task and the count both changed, so the two results stay side by side instead of being merged into one score. Merged, they'd hide exactly what the project learned.

## A rerun anyone can repeat

On 27 October 2026, the released checkpoint was run once on the public field image, with the settings fixed beforehand. Both the whole-frame pass and the tiled pass put a box on the drone, and nothing else in the frame, but they classified it differently: bird at 0.14 for the whole frame, airplane at 0.42 for the tiles. Under the study's own rule, where airplane, drone and helicopter all count as an aerial-object alert, only the tiled pass raises one.

That's one image, chosen, with a reference drawn by eye, and neither pass called it a drone. It's a change in classification, not proof of reliable drone recognition. The script and receipt let anyone check it. The [technical reference](../projects/small-object-reference.md) keeps it apart from the field observations and the training record.

## A scenario is not an environment

The hackathon's synthetic scenarios were useful for exercising an implementation under supplied conditions. They don't establish performance on live inputs, and historical counts from different versions shouldn't be combined until their version and unit are reconciled.

A presentation can make a design understandable. A test summary can document a reported execution. Source can reveal an implementation. None of them substitutes for the others. The hackathon case study and recording are withheld pending editorial review.

## What changed in the portfolio

The project pages now separate an overview, a technical reference and an access statement, and the vision project now includes one public, rerunnable model run. Each page says which question its numbers answer.

For the same distinction applied to software release decisions, see [[notes/candidate-verification|Candidate verification]] and [[notes/engineering-acceptance|Engineering acceptance]]. For a hosted synthetic application with a different release boundary, see [[projects/edge-evidence|Edge Evidence]].
