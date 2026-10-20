import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHero, heroMarkup, installHero } from "./hero.js";
import { MehridianPresentation } from "./index.js";
const nodes = node => [node, ...(node.children ?? []).flatMap(nodes)];
test("three local directions use bounded inline SVG without external assets",()=>{
  for (const direction of ["meridian","flight","signals"]) {
    const svg=createHero(direction);
    assert.equal(svg.properties.viewBox,"0 0 420 420");
    assert.equal(svg.properties["aria-hidden"],"true");
    assert.ok(nodes(svg).length < 100);
    assert.ok(!/script|foreignObject|<image|https?:\/\//.test(heroMarkup(direction).replace('http://www.w3.org/2000/svg','')));
  }
});
test("hero replacement preserves authored copy, caption and other images",()=>{
  const caption={type:"element",tagName:"div",properties:{className:["field-caption"]},children:[{type:"text",value:"A space for exploration"}]};
  const tree={children:[{type:"element",tagName:"div",properties:{className:["field"]},children:[{tagName:"svg"},caption]},{tagName:"img",properties:{src:"demo.jpg"}}]};
  installHero(tree);
  assert.ok(nodes(tree).includes(caption));
  assert.ok(nodes(tree).some(n=>n.properties?.src==="demo.jpg"));
  assert.equal(nodes(tree).filter(n=>n.tagName==="input").length,1);
});
test("pause is native, decorative motion has reduced-motion fallback, no hero JS is shipped",()=>{
  const css=readFileSync(new URL("hero.css",import.meta.url),"utf8");
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /animation: none/);
  assert.match(css, /animation-play-state: paused/);
  assert.match(css, /72s/);
  assert.doesNotMatch(css, /meridian-companion/);
  const scripts=MehridianPresentation().externalResources().js;
  assert.ok(!scripts.some(r=>/meridian|animation|requestAnimationFrame/.test(r.script)));
});
test("meridian has one orbit and one moving marker without the competing frame",()=>{
  const svg=createHero("meridian");
  const all=nodes(svg);
  assert.equal(all.filter(n=>n.properties?.className?.includes("meridian-traveller")).length,1);
  assert.equal(all.filter(n=>n.properties?.className?.includes("meridian-orbit-track")).length,1);
  assert.equal(all.filter(n=>n.properties?.className?.includes("meridian-companion")).length,0);
  assert.equal(all.filter(n=>n.tagName==="ellipse").length,4);
  assert.equal(all.filter(n=>n.tagName==="line").length,4);
  const composition=readFileSync(new URL("workfront.css",import.meta.url),"utf8");
  assert.doesNotMatch(composition,/\.work-opening-art::before/);
  assert.match(composition,/\.hero-motion-control\s*\{\s*position:static/);
  assert.match(composition,/\.field svg \{width:65%;max-width:255px;/);
});
test("only home presentation receives a hero, other page shells remain unchanged",()=>{
  for (const slug of ["projects/index","projects/edge-evidence","notes/example"]) {
    const tree={children:[{type:"element",tagName:"div",properties:{className:["field"]},children:[{tagName:"svg",properties:{id:"original"},children:[]}]}]};
    MehridianPresentation().htmlPlugins()[0]()(tree,{data:{slug,frontmatter:{presentation:"home"}}});
    assert.ok(nodes(tree).some(n=>n.properties?.id==="original"));
  }
});
