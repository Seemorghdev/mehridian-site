import test from "node:test";
import assert from "node:assert/strict";
import { localConnections, graphGeometry, titleLines } from "./garden.js";
const page = (slug, links = [], visibility = "public") => ({ slug, mehridianLinks: links, frontmatter: { title: slug, visibility } });

test("map contains only authored relationships to real public pages", () => {
  const current = page("notes/test", ["projects/example", "missing", "private/secret"]);
  const result = localConnections(current, [current, page("projects/example"), page("notes/index", ["notes/test"]), page("index"), page("private/secret", [], "private")]);
  assert.deepEqual(result.neighbors.map(p => p.slug), ["notes", "projects/example"]);
  assert.equal(result.neighbors.some(p => ["index", "missing", "private/secret"].includes(p.slug)), false);
});
test("reciprocal relationships are not duplicated, self-links are excluded", () => {
  const current = page("notes/test", ["projects/example", "notes/test"]);
  assert.equal(localConnections(current, [current, page("projects/example", ["notes/test"])]).neighbors.length, 1);
});
test("authored index nodes preserve their trailing slash for project-subpath assets", () => {
  const current = page("notes/test", ["notes/"]);
  const result = localConnections(current, [current, page("notes/index")]);
  assert.equal(result.neighbors[0].slug, "notes");
  assert.equal(result.neighbors[0].route, "notes/");
});
test("unlisted and draft pages cannot appear in a public map", () => {
  const current = page("notes/test", ["notes/unlisted", "notes/draft"]);
  const draft = page("notes/draft"); draft.frontmatter.draft = true;
  const unlisted = page("notes/unlisted"); unlisted.unlisted = true;
  assert.equal(localConnections(current, [current, draft, unlisted]).neighbors.length, 0);
});
test("future notes and native tag pages can participate only when genuinely public", () => {
  const current = page("notes/test", ["notes/future", "tags/engineering"]);
  const files = [current, page("notes/future"), { slug: "tags/engineering" }];
  assert.deepEqual(localConnections(current, files).neighbors.map(p => p.slug), ["notes/future"]);
});
test("graph stays compact while the full text alternative remains available", () => {
  const map = { current: { slug: "notes/test", title: "Test" }, neighbors: Array.from({ length: 20 }, (_, i) => ({ slug: `notes/${i}`, title: `Note ${i}` })) };
  const geometry = graphGeometry(map);
  assert.equal(geometry.nodes.length, 7);
  assert.equal(geometry.edges.length, 6);
  assert.equal(map.neighbors.length, 20);
  assert.ok(geometry.height <= 420);
});
test("long labels wrap without changing full accessible titles", () => {
  assert.deepEqual(titleLines("Agent vs deterministic inspector", 30), ["Agent vs deterministic", "inspector"]);
});
