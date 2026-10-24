---
title: A small evaluation is not a deployment
description: What selected frames and synthetic scenarios can tell us without overstating the result.
visibility: public
status: published
---

# A small evaluation is not a deployment

Two projects made the distinction concrete in different ways: an [[projects/small-object-detection|offline vision experiment]] and a solo hackathon integration prototype. Both produced useful artifacts. Neither becomes a deployed system because a portfolio page exists.

## Finding and choosing are different checks

In the vision project's retained eight-frame observation, a candidate could be matched to a manually marked reference in each selected frame. That answers a narrow question about those frames with that evaluation procedure. It does not establish that a system can choose the intended object unaided.

The separate selection check reported two successes in four paired observations. The denominator and task changed. Combining both observations into one score would obscure the failure rather than explain the project.

The [technical reference](../projects/small-object-reference.md) records those distinctions. The actual capture still is input context, not a model-output screenshot or an accuracy measurement.

## A scenario is not an environment

The hackathon's synthetic scenarios were useful for exercising an implementation under supplied conditions. They do not establish performance on live inputs, and different historical counts should not be combined without reconciling their version and unit.

A presentation can make the design understandable. A test summary can document a reported execution. Source can reveal an implementation. None of those substitutes for the others. The hackathon case study and recording are currently withheld pending editorial review.

## What changed in the portfolio

The project pages now separate an overview, a technical reference and an access statement. This is not a new experiment. It is a more useful way to inspect the existing work without treating a missing repository link or a static presentation as proof of runtime behavior.

For the same distinction applied to software release decisions, see [[notes/candidate-verification|Candidate verification]] and [[notes/engineering-acceptance|Engineering acceptance]]. For a hosted synthetic application with a different release boundary, see [[projects/edge-evidence|Edge Evidence]].
