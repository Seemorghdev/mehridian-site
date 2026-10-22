import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const source=path=>readFileSync(new URL(path,root),'utf8');
const home=source('content/index.md'), notes=source('content/notes/index.md');
const css=source('theme/workfront.css');
test('homepage leads with working evidence rather than a personal pitch',()=>{
  assert.match(home, /<h1 id="home-title">Edge Evidence/);
  assert.equal((home.match(/<h1\b/g)??[]).length,1);
  assert.doesNotMatch(home,/Curiosity,|Follow the evidence\.|Build\. Observe\. Share\.|independent engineering and research by|Python systems and platform engineer/i);
  for(const url of ['./projects/edge-evidence.md','./assets/edge-evidence-gateway-inspect-2026-10-20.jpg','./research/project03/evidence-explorer.md','./notes/index.md','https://docs.mehridian.tech/edge-evidence/','https://github.com/Seemorghdev/edge-evidence-reference-platform-public']) assert.ok(home.includes(url),url);
  assert.match(home,/Separate repository-level distributions/);
  assert.match(home,/frozen schema-v1\.1/);
  assert.match(home,/Proof shows a separate retained synthetic execution result/);
});
test('six approved notes are visible and the homepage count agrees',()=>{
  assert.match(home,/Browse all six notes and their connections/);
  assert.match(home,/SIX PUBLISHED TECHNICAL NOTES/);
  assert.doesNotMatch(home,/five (?:published|notes)/i);
  assert.match(notes,/Six technical notes/);
  for(const slug of ['agent-vs-deterministic-inspector','local-language-task-boundaries','evidence-verification','lineage-and-provenance','candidate-verification','engineering-acceptance']){
    const target='[[notes/'+slug;
    assert.ok(notes.includes(target),target);
  }
  assert.match(notes,/## Inspection and model boundaries/);
  assert.match(notes,/## Verification and provenance/);
  assert.match(notes,/## Completion and acceptance/);
  assert.match(notes,/\[\[research\/project03\/evidence-explorer/);
  assert.doesNotMatch(notes,/This garden is deliberately small|full-site knowledge map can wait/i);
});
test('visual styles are scoped to home and Notes index, with a phone-sized fallback',()=>{
  assert.match(css,/#quartz-root \.mehr-home \.work-opening/);
  assert.match(css,/#quartz-root \.mehr-notes-index/);
  assert.match(css,/@media\(max-width:650px\)/);
  assert.match(css,/grid-template-columns:1fr/);
  assert.doesNotMatch(css,/@import|https?:\/\/|animation:\s*[^;]*infinite|100vw\s*\+/);
});
test('Notes shelves target the same element that owns both theme classes',()=>{
  const theme=source('theme/index.js');
  assert.match(theme,/mehr-notes-index/);
  assert.match(css,/#quartz-root \.mehr-notes-index\.mehr-note h2 \+ ul \{[^}]*display:grid/);
  assert.doesNotMatch(css,/\.mehr-notes-index\s+\.mehr-note/);
});
