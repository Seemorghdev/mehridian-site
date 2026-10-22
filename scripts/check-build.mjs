import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const pages = ["research/project03/evidence-explorer", "index", "projects/index", "projects/edge-evidence", "projects/small-object-detection","projects/small-object-reference","projects/common-observation-view","projects/common-observation-reference","notes/small-evaluations", "notes/index", "notes/agent-vs-deterministic-inspector", "notes/local-language-task-boundaries", "research/project03/index", "research/project03/verification-is-not-acceptance", "research/project03/consumer-lab-mixed-evidence", "research/project03/publication-and-runtime-reality", "research/project03/what-project-03-shows", "notes/candidate-verification", "notes/engineering-acceptance", "notes/evidence-verification", "notes/lineage-and-provenance"];
const generated = pages.map((page) => {
  const source = readFileSync(new URL(`content/${page}.md`, root), "utf8");
  assert.ok(!source.includes("<style>"), `${page}: duplicated page CSS`);
  assert.ok(source.includes("visibility: public"), `${page}: public selection metadata`);
  const html = readFileSync(new URL(`preview/${page}.html`, root), "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${page}: one H1`);
  assert.equal((html.match(/aria-label="Main navigation"/g) ?? []).length, 1, `${page}: shared navigation`);
  assert.equal((html.match(/aria-label="Footer navigation"/g) ?? []).length, 1, `${page}: shared footer`);
  assert.ok(!html.includes("item under this folder"), `${page}: no automatic folder listing`);
  assert.ok(!html.includes("Properties</"), `${page}: no Properties panel`);
  assert.ok(!/\/(?:Users|private|home)\/|file:\/\/|github_pat_|BEGIN PRIVATE KEY/.test(html), `${page}: public-output boundary`);
  assert.ok(!html.includes("plausible.io"), `${page}: no analytics drift`);
  for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const href = match[1].split("#")[0].split("?")[0];
    if (/^(https?:|data:|mailto:|\/)/.test(href)) continue;
    const from = `https://preview.invalid/${page === "index" ? "" : page.replace(/\/index$/, "/")}`;
    const target = new URL(href.replaceAll("&amp;", "&"), from).pathname.replace(/^\//, "");
    assert.ok([
      new URL(`preview/${target}`, root),
      new URL(`preview/${target}.html`, root),
      new URL(`preview/${target.replace(/\/$/, "")}/index.html`, root),
    ].some((p) => existsSync(p)), `${page}: unresolved local resource ${href}`);
  }
  return html;
});
const stylesheet = generated.map((html) => [...html.matchAll(/href="([^"]*resource-style-[^"]+\.css)"/g)].map((m) => m[1].split("/").pop()));
assert.deepEqual(stylesheet[0], stylesheet[1]);
assert.deepEqual(stylesheet[1], stylesheet[2]);
assert.ok(existsSync(fileURLToPath(new URL("preview/assets/edge-evidence-gateway.jpg", root))));
console.log(`built_pages=${pages.length}`);
console.log("headings_navigation_links_assets=pass");
console.log("shared_styles=pass");
console.log("public_output_boundary=pass");

// Also exercised by the existing PR workflow; no deployment changes.
await import('./check-evidence-explorer.mjs');
