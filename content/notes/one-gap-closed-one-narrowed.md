---
title: "One gap closed, one narrowed"
description: "Project 03 found no published surface traced to its source and none independently seen running. For one deployment afterwards, the second is now observed daily by something other than me, and the first is down to the build itself."
type: note
visibility: public
status: published
source_checked: 2026-10-26
---

# One gap closed, one narrowed

[[research/project03/index|Project 03]] ended with two zeros. Across fifteen repositories, no published candidate could be traced as a whole to its exact source, and none of 25 published surfaces had been independently observed running. Afterwards, I took one deployment, the [[projects/edge-evidence|Edge Evidence]] hosted demo, and tried to produce both kinds of evidence for it.

One is now closed by the study's own definition. The other is much narrower than it was, and what's left of it is specific.

Project 03 is frozen, and nothing here changes its results. This is one repository, after the study, and I set up every check described below.

## Seen running, by something other than me

The study's definition of a positive runtime observation is a dated check, made by someone or something other than the author, kept with the record.

Once a day, a scheduled GitHub Actions workflow in the public repository fetches the three files the demo serves: the page, its script and its stylesheet. It computes each file's git blob ID and compares it with the same file at a pinned public commit, `78136e8`. It also asks the Proof endpoint what it is, and expects `recorded-playback` with `executes: false`. Then it appends a dated record to a public `live-observations` branch. If anything differs, the run fails publicly.

The first run, at 17:09 UTC on 26 October 2026, passed. All three files matched their pinned versions byte for byte, and Proof reported recorded playback that executes nothing.

That meets the definition, with three limits worth stating:

- **I wrote the observer.** It runs on GitHub's machines, not mine, and its record is public. But the choice of what to check was mine.
- **It sees only what is served.** The three files and one endpoint can be fetched. The server code behind them can't be, so the daily check says nothing direct about it.
- **Once a day is once a day.** It's a sampled observation, not monitoring.

## Traced to source: down to the build

The study's question was whether a published copy could be bound, as a whole, to the exact source that produced it.

Before this, the answer for the demo was "partly". The inspector and its shared contracts were pinned to a public commit, but the interface files had been changed privately and deployed. Those are now public, exactly as deployed. I then compared every source file in the deployed build with both the public and the private repository:

- every service file the demo runs had shipped its public version;
- the interface files had shipped the private versions, which are now public.

So every source file in the image I compared now has a public, byte-identical counterpart.

Getting there turned up something I hadn't looked for. The public test suite installed whatever FastAPI and Starlette versions its loose version range allowed, and that had drifted well past the versions pinned in the image. The tests were passing, but not against what was deployed. They now install the image's exact versions.

What's left is the build itself:

- **The link from source to image rests on my machine.** I built the image locally and pushed it. Nothing outside my machine records that this source produced that image.
- **I switched off the record that would have shown it.** The host rejected the image in Docker's default format. What it accepted was a push without the provenance attestation Docker normally attaches, `--provenance=false`. That attestation is the build record frameworks like [SLSA](https://slsa.dev/) are built around.
- **The source spans two commits.** The inspector is pinned at one public commit (`773d8b8`) and the interface at another (`78136e8`). Both are public, but no single commit is "the demo".

Closing this means building the image in public CI from one commit and keeping the attestation, even if the host needs a stripped copy. Until then, I'd describe the lineage as file-for-file public, with the build unattested.

## What the exercise showed

Each gap had opened at a moment of convenience:
- private interface changes, because they were faster to ship than to publish;
- the disabled attestation, because it was the fastest way past a rejected push;
- loose test versions, because they were the default.

None of those was wrong for a demo, and nothing in a green deploy log mentioned any of them. Finding them took asking the two questions Project 03 asked, of one system, and refusing to accept "the checks passed" as the answer to either.

*Basis: the release and build records for the 25 October 2026 deploy; the file-by-file comparison of the deployed build context against the public and private repositories; the public interface files at commit `78136e8`; and the first scheduled observation, run 40365884712, on 26 October 2026. Project 03's definitions are from its [[research/project03/publication-and-runtime-reality|runtime chapter]].*

More in [[notes/index|Notes]].
