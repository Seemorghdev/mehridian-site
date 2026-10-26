---
title: A two-hour run that ended as a limitation
description: One long test run held two different problems. One was the project's own bug and got fixed; the other was a property of the input and stayed in the result.
type: note
visibility: public
status: published
publication_approved: true
source_checked: 2026-10-25
---

# A two-hour run that ended as a limitation

On 31 January 2017, an engineer at GitLab deleted roughly 300 GB of production data from the wrong database server. That was the accident. What turned it into an 18-hour outage with permanent data loss was what the team found when they went to restore. Their [postmortem](https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/) is one of the most honest documents in the industry. The nightly `pg_dump` backups had been failing silently, because the backup job used the wrong PostgreSQL version, and the failure emails were being rejected by the mail server. The S3 bucket meant to hold the backups was empty. Everything *looked* fine because nothing reported a problem.

I think about that postmortem a lot, because it names the failure mode I most want my own systems to avoid. Not the crash: crashes are loud. The quiet one, where a process runs, says nothing, and the absence of a complaint gets read as success.

Edge Evidence's two-hour run, OPBD-2, is a small example of the opposite habit. It went wrong in two different ways, and each got a different response.

## The run

OPBD-2 was a controlled 7,200-second scheduling run with two physical sources, an append-only diagnostic ledger and a terminal receipt. Its job was to show that the accounting stays truthful over a longer stretch than the earlier baseline: every capture accounted for, every replica read back, nothing quietly dropped.

## Problem one: my harness was wrong

The first attempt stopped before its 90-minute checkpoint could finish. The reconcile command hit the test harness's 240-second control timeout. Then the timeout cleanup referred to `signal`, which had never been imported, and raised `NameError`. An undrained subprocess pipe was confirmed as a separate helper defect, though the record doesn't show it caused the stop.

The tempting move at this point is to patch the harness, resume, and call the run a pass. The attempt was instead classified as a run-level breach. Its partial SQLite, spool, ledger and replica evidence still passed their integrity checks, but it was neither resumed nor relabelled.

Then I measured instead of guessing. A benchmark on a scratch copy put canonical reconciliation at about 270 seconds, past the limit the harness allowed:

![Bar chart: the harness allowed 240 seconds, reconciliation was measured at about 270 seconds, and the corrected budget is 600 seconds](../assets/edge-evidence-opbd2-timeout-2026-10-25.svg)

The correction raised the budget to 600 seconds, imported `signal`, replaced the monitored pipes with temporary files, and added regression tests for the cleanup path. The corrected run started on **fresh state**, not on top of the breached one.

## Problem two: the source was lossy

The corrected run finished as `OPBD2_2H_LIMITATION`, not `OPBD2_2H_PASS`:

- every intended capture reached a terminal state, with none missing and none left `PREPARED`;
- every replica was verified by reading it back from the target;
- there were no integrity-breach findings;
- **75 iPad records were `source_gap_observed`**, and the run carried an aggregate `truthful_gaps_present` finding.

The first three lines are the bookkeeping closing: nothing was lost between capture, processing and the copy. They'd have read exactly the same whether the iPad stream was clean or not. The fourth line is the actual result. The iPad's stream had holes in it, and the system recorded every one.

So I could have changed the accounting rules until the gaps stopped counting. That's the version of this story that ends in a green badge. The gaps were a property of what was being measured, not of the system measuring it, so they stayed in the result. The limitation also did not authorise the next tier, an eight-hour run.

## Two kinds of problem

![Four-step sequence: the first attempt hit the 240-second timeout and was a run-level breach, not resumed; a benchmark measured about 270 seconds; the correction raised the budget to 600 seconds and fixed the cleanup; the fresh 7,200-second run ended as OPBD2_2H_LIMITATION with 75 iPad source gaps kept](../assets/edge-evidence-opbd2-sequence-2026-10-25.svg)

The sociologist Diane Vaughan studied the *Challenger* launch decision and gave a name to how organisations drift into disaster: the [normalization of deviance](https://en.wikipedia.org/wiki/Normalization_of_deviance), where a deviation that doesn't immediately cause a catastrophe slowly becomes accepted as normal. In engineering, one way it starts is with a label. A run with a known problem gets called a pass "because we know why." Next time the known problem is a little bigger, and the label is the same.

The discipline that guards against it is simple to state and annoying to follow. Sort every problem into one of two piles:

- **The project's own bug.** Fix it, and repeat the run from scratch. Don't stitch the fixed part onto the broken part.
- **A property of what you measured.** Keep it in the result, with a label that says so. Don't repair it out of the evidence by changing the rules.

The harness timeout went in the first pile, the iPad gaps in the second. That separation is the only reason the final label, `LIMITATION`, means anything. GitLab's backups taught the industry that a silent pass is the most expensive kind. A loud limitation is cheap by comparison.

---

*The run is a retained record of one named lab exercise, not current telemetry. The records don't show whether the platform caused or could prevent the source gaps. The full account is in [Development and operations](https://docs.mehridian.tech/edge-evidence/development-and-operations/). See also the [Edge Evidence project](../projects/edge-evidence).*

**Further reading:** GitLab, [Postmortem of database outage of January 31](https://about.gitlab.com/blog/postmortem-of-database-outage-of-january-31/) (2017). Diane Vaughan, *The Challenger Launch Decision* (University of Chicago Press); summary at [Normalization of deviance](https://en.wikipedia.org/wiki/Normalization_of_deviance).
