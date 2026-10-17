Site published with Quartz with the help of the [GitHub Publish](https://community.obsidian.md/plugins/github-publish) Obsidian plugin.

## Evidence Explorer downloads

The two approved frozen extracts in `content/assets/` are **repository-managed**:

- `project03-selected-evidence-cases.csv`
- `project03-frozen-chart-states.json`

GitHub Publish 0.1.37 does not scan CSV or JSON content files. Matching copies in the curated Obsidian publication folder are local reference copies; the plugin does not upload updates to them. Keep these downloads out of the plugin's content manifest: its current incremental publishing logic leaves untracked repository assets in place, but schedules missing manifest-tracked files for deletion.

Update downloads through a reviewed repository PR, keep the local reference copies synchronized, and run the existing integrity/privacy checks. Ordinary Obsidian edits must not regenerate or change the frozen values. Before publishing after a plugin upgrade, verify this behavior and stop if either download is proposed for deletion. No plugin, publishing workflow, or publication-scope change is required.
