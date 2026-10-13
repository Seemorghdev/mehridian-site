import test from "node:test";
import assert from "node:assert/strict";
import { MehridianPresentation, MehridianProjectIndex } from "./index.js";

const t = (value) => ({ type: "text", value });
const el = (tagName, children, properties = {}) => ({ type: "element", tagName, properties, children });
const nodes = (node) => [node, ...(node.children ?? []).flatMap(nodes)];
function render(slug, children, frontmatter = {}) {
  const tree = { type: "root", children };
  MehridianPresentation().htmlPlugins()[0]()(tree, { data: { slug, frontmatter } });
  return tree;
}

test("root and nested pages get usable relative Home/Projects links", () => {
  for (const [slug, prefix] of [["index", "./"], ["projects/index", "../"], ["projects/edge-evidence", "../"], ["notes/example", "../"]]) {
    const tree = render(slug, [el("h1", [t("Title")])]);
    const links = nodes(tree).filter((n) => n.tagName === "a");
    assert.ok(links.some((n) => n.properties.href === `${prefix}index.md`));
    assert.ok(links.some((n) => n.properties.href === `${prefix}projects/index.md`));
    assert.equal(nodes(tree).filter((n) => n.properties?.ariaLabel === "Main navigation").length, 1);
    assert.equal(nodes(tree).filter((n) => n.properties?.ariaLabel === "Footer navigation").length, 1);
  }
});

test("existing authored H1 is not duplicated", () => {
  const tree = render("index", [el("section", [el("h1", [t("Curiosity, made concrete.")])])], { title: "Mehridian", presentation: "home" });
  assert.equal(nodes(tree).filter((n) => n.tagName === "h1").length, 1);
});

test("ordinary connected notes need no copied styles or shell", () => {
  const originalLink = el("a", [t("Other note")], { href: "other.md" });
  const tree = render("notes/example", [el("p", [t("See "), originalLink])], { title: "Example note", visibility: "public" });
  assert.equal(nodes(tree).filter((n) => n.tagName === "h1").length, 1);
  assert.ok(nodes(tree).includes(originalLink));
  assert.ok(nodes(tree).some((n) => n.properties?.className?.includes("mehr-note")));
});

test("presentation injects shared styles without client JavaScript", () => {
  const resources = MehridianPresentation().externalResources();
  assert.equal(resources.css.length, 1);
  assert.equal(resources.css[0].inline, true);
  assert.ok(resources.css[0].content.includes("--mehr-paper"));
  assert.equal(resources.js, undefined);
  assert.ok(!/https?:\/\//.test(resources.css[0].content));
});

test("presentation does not expose arbitrary frontmatter values", () => {
  const tree = render("notes/example", [el("p", [t("Public body")])], { title: "Example", private_internal_field: "DO_NOT_RENDER_THIS_FIELD" });
  assert.ok(!JSON.stringify(tree).includes("DO_NOT_RENDER_THIS_FIELD"));
});

test("current navigation distinguishes home from project pages", () => {
  for (const slug of ["index", "projects/index", "projects/edge-evidence"]) {
    const tree = render(slug, [el("h1", [t("Title")])]);
    assert.equal(nodes(tree).filter((n) => n.properties?.ariaCurrent).length, 1);
  }
});

test("only the authored Projects index overrides the folder listing", () => {
  const page = MehridianProjectIndex();
  assert.equal(page.match({ slug: "projects/index" }), true);
  assert.equal(page.match({ slug: "notes/index" }), false);
  assert.equal(page.match({ slug: "projects/edge-evidence" }), false);
  assert.equal(page.layout, "content");
  assert.equal(typeof page.body, "function");
});
