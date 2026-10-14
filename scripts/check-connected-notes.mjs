import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const root = new URL("../", import.meta.url);
const files = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? files(new URL(`${entry.name}/`, directory)).map(p => `${entry.name}/${p}`) : [entry.name]);
assert.deepEqual(files(new URL("content/", root)).sort(), [
  "assets/edge-evidence-gateway.jpg", "index.md", "notes/agent-vs-deterministic-inspector.md",
  "notes/index.md", "projects/edge-evidence.md", "projects/index.md",
].sort(), "Only the curated content manifest is allowed");

const graph = JSON.parse(readFileSync(new URL("preview/static/contentIndex.json", root), "utf8"));
const note = "notes/agent-vs-deterministic-inspector";
const project = "projects/edge-evidence";
assert.ok(graph[note].links.includes(project), "Native wikilink: note → project");
assert.ok(graph[project].links.includes(note), "Native wikilink: project → note");
assert.ok(graph["notes/index"].links.includes(note), "Notes index → note");
assert.ok(graph[note].links.includes("notes/"), "Note → Notes index");
const html = readFileSync(new URL(`preview/${note}.html`, root), "utf8");
const backlinks = html.match(/<aside[^>]*aria-label="Backlinks"[\s\S]*?<\/aside>/)?.[0];
assert.ok(backlinks, "Native Quartz backlinks must be visible");
assert.match(backlinks, /href="\.\.\/projects\/edge-evidence"/);
assert.match(backlinks, /href="\.\.\/notes\/"/);
assert.ok(html.indexOf('aria-label="Backlinks"') < html.indexOf('<footer class="mehr-footer"'), "Backlinks precede the footer");
assert.ok(!html.includes("[["), "Wikilinks are rendered, not raw syntax");
assert.ok(!html.includes('class="project-card"'), "Readable note, not a marketing card");
for (const file of files(new URL("content/", root)).filter(p => p.endsWith(".md"))) {
  const source = readFileSync(new URL(`content/${file}`, root), "utf8");
  assert.match(source, /visibility: public/);
  assert.ok(!/<style|mehr-header|mehr-footer/.test(source), "Notes/content must inherit the shared shell");
  assert.ok(!/\[\[(?:Journal|Public\/Start Here|Notes\/Evidence verification)|\/(?:Users|private|home)\/|github_pat_|BEGIN.*PRIVATE KEY/.test(source), "No private source dependencies");
}
console.log("curated_manifest=6_files_5_markdown");
console.log("native_wikilinks=pass");
console.log("quartz_backlinks=pass");
console.log("note_presentation_and_privacy=pass");
