import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pagePolicy } from './page-policy.js';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const index = read('content/projects/index.md');
const drone = read('content/projects/small-object-detection.md');

test('drone case study is selected for review builds under normal public page policy', () => {
  assert.match(drone, /^visibility: public$/m);
  assert.match(drone, /^status: published$/m);
  assert.match(drone, /^presentation: case-study$/m);
  assert.match(drone, /<h1 id="case-title">Small Objects in Big Frames<\/h1>/);
  const sections = [...drone.matchAll(/<section class="case-section" aria-labelledby="([^"]+)">/g)].map(m => m[1]);
  assert.deepEqual(sections, ['problem-title', 'approach-title', 'finding-title', 'recovered-model', 'training-results', 'source-access']);
  for (const id of sections) assert.ok(drone.includes('id="' + id + '"'), id + ': heading target exists');
  assert.equal(pagePolicy('projects/small-object-detection').role, 'case-study');
  assert.equal(pagePolicy('projects/small-object-detection').triggers, false);
  assert.equal(pagePolicy('projects/small-object-detection').target, null);
});

test('Projects keeps Edge featured, has a real drone link and a self-contained solo entry', () => {
  assert.equal((index.match(/class="project-card(?: project-card--text)?"/g) ?? []).length, 3);
  assert.equal((index.match(/class="project-card project-card--text"/g) ?? []).length, 0);
  assert.equal((index.match(/href="\.\/small-object-detection\.md"/g) ?? []).length, 2);
  assert.match(index, /id="hackathon-entry" aria-labelledby="hackathon-project-title"/);
  assert.match(index, /Solo hackathon prototype/);
  const hackathon = index.slice(index.indexOf('id="hackathon-entry"'));
  assert.match(hackathon, /hackathon-presentation-excerpt\.png/);
  assert.match(hackathon, /not the original application interface/);
  assert.match(hackathon, /common-observation-view\.md/);
  assert.match(index, /Working synthetic demonstration/);
  assert.match(index, /Try the visual demo/);
  assert.ok(index.indexOf('Edge Evidence') < index.indexOf('Small Objects in Big Frames'));
  assert.ok(index.indexOf('Small Objects in Big Frames') < index.indexOf('A common view for mismatched observations'));
});

test('new content preserves retained-result, visual and private-source boundaries', () => {
  assert.match(drone, /eight selected field frames/);
  assert.match(drone, /two of four paired observations/);
  assert.match(drone, /manually marked/);
  assert.match(drone, /does not establish general accuracy/);
  assert.match(index, /checks were not reproduced/);
  assert.match(index, /presentation is not a runtime screenshot/);
  for (const source of [index, drone]) {
    assert.doesNotMatch(source, /\/Users\/|file:\/\/|github_pat_|BEGIN PRIVATE KEY|private-review|field coordinates/i);
    for(const url of source.match(/https:\/\/github\.com\/[^\s"<)]+/g)??[]) assert.ok(['https://github.com/Seemorghdev/drone-detection-showcase','https://github.com/Seemorghdev/hackathon-observation-showcase'].includes(url),url);
  }
  assert.match(drone, /drone-capture-context\.jpg/);
  assert.match(drone, /not detector output/);
  assert.doesNotMatch(drone, /\.mp4|public code|live demo/i);
});

test('text-only cards have a real single-column layout, not a blank media column', () => {
  const css = read('theme/styles.css');
  assert.match(css, /\.project-card--text\s*\{\s*grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(css, /\.project-list > \.project-card \+ \.project-card\s*\{/);
});

test('Projects uses real visual previews and explicit access instead of fake source/demo buttons',()=>{
 assert.match(index,/drone-capture-context\.jpg/);
 assert.match(index,/Actual capture input/);
 assert.match(index,/8 frames, manually referenced/);
 assert.match(index,/2 of 4 paired observations/);
 assert.match(index,/Application source private;/);
 assert.match(index,/href="https:\/\/huggingface\.co\/Seemorgh\/yolo11n-aod4-v6">checkpoint and reviewed notebooks public<\/a>; no live inference/);
 assert.match(index,/no working-app demo supplied/);
 assert.equal((index.match(/<figure class="project-media project-artifact"/g)??[]).length,2);
 const css=read('theme/styles.css');
 assert.match(css,/\.project-availability table \{ table-layout:fixed; width:100%/);
 assert.match(css,/\.project-record \{ grid-template-columns:1fr/);
});
