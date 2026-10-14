import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {canNavigateGesture,nodeHitRadius,pageRoute} from './graph/src/interaction.mjs';
import {publishedConnections,publishedPages} from './connections.js';
test('quick node drag never navigates; returning to origin remains a drag',()=>{
  assert.equal(canNavigateGesture({x:0,y:0},{x:70,y:20},73,90),false);
  assert.equal(canNavigateGesture({x:0,y:0},{x:0,y:0},50,120),false);
  assert.equal(canNavigateGesture({x:0,y:0},{x:2,y:1},3,100),true);
  assert.equal(canNavigateGesture({x:0,y:0},{x:0,y:0},0,600),false);
});
test('node target stays 44 screen pixels when zooming',()=>{
  for(const k of [0.25,0.8,1,2,4]) assert.equal(nodeHitRadius(k)*k*2,44);
});
test('index and tag navigation use correct native routes',()=>{
  assert.equal(pageRoute('index'),'');assert.equal(pageRoute('notes/index'),'notes/');
  assert.equal(pageRoute('notes/agent'),'notes/agent');assert.equal(pageRoute('tags/ai'),'tags/ai');
});
const p=(slug,links=[],visibility='public')=>({slug,links,frontmatter:{title:slug,visibility}});
test('text alternatives preserve actual authored links and exclude private/draft/unlisted',()=>{
  const current=p('notes/agent',['projects/example','missing','private/secret']);
  const hidden=p('notes/hidden');hidden.unlisted=true;
  const draft=p('notes/draft');draft.frontmatter.draft=true;
  const files=[current,p('projects/example',['notes/agent']),p('notes/index',['notes/agent']),p('index'),p('private/secret',[],'private'),hidden,draft];
  assert.deepEqual(publishedConnections(current,files).neighbors.map(f=>f.slug),['projects/example','notes/index']);
  assert.equal(publishedPages(files).length,4);
});
test('graph lifecycle is source-level; no generated bundle replacements or CDN URLs',()=>{
  const source=readFileSync(new URL('./graph/src/graph.inline.ts',import.meta.url),'utf8');
  const theme=readFileSync(new URL('./index.js',import.meta.url),'utf8');
  assert.ok(!source.includes('cdn.jsdelivr.net'));assert.match(source,/d3-7\.9\.0/);assert.match(source,/pixi-8\.18\.0/);
  assert.match(source,/canNavigateGesture\(dragOrigin/);assert.match(source,/mehridian:graph-close/);
  assert.ok(!/afterDOMLoaded\.(?:replace|match)/.test(theme));
  assert.match(theme,/graph.afterDOMLoaded/);
});
