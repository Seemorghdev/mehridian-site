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
test("pause is native, decorative motion has reduced-motion fallback, no JS is shipped",()=>{
  const css=readFileSync(new URL("hero.css",import.meta.url),"utf8");
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /animation: none/);
  assert.match(css, /animation-play-state: paused/);
  assert.match(css, /64s/);
  assert.match(css, /112s/);
  assert.equal(MehridianPresentation().externalResources().js,undefined);
});
test("only home presentation receives a hero, other page shells remain unchanged",()=>{
  for (const slug of ["projects/index","projects/edge-evidence","notes/example"]) {
    const tree={children:[{type:"element",tagName:"div",properties:{className:["field"]},children:[{tagName:"svg",properties:{id:"original"},children:[]}]}]};
    MehridianPresentation().htmlPlugins()[0]()(tree,{data:{slug,frontmatter:{presentation:"home"}}});
    assert.ok(nodes(tree).some(n=>n.properties?.id==="original"));
  }
});
