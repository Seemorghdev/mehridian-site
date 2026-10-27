import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
test('published showcase links its real technical reference and the connected note',()=>{
 for(const [page,reference] of [['small-object-detection','small-object-reference']]){
  const text=read('content/projects/'+page+'.md');
  assert.ok(text.includes(reference+'.md'));
  assert.ok(text.includes('small-evaluations.md'));
  assert.ok(existsSync(new URL('content/projects/'+reference+'.md',root)));
 }
});
test('public references do not invent source access or runtime acceptance',()=>{
 assert.match(read('content/projects/small-object-reference.md'),/Public implementation:\*\* not released/);
 for(const p of ['small-object-reference']){
  const source=read('content/projects/'+p+'.md');
  assert.doesNotMatch(source,/\/Users\/|file:\/\/|local review desk/i);
  for(const url of source.match(/https:\/\/github\.com\/[^\s"<)]+/g)??[]) assert.ok(['https://github.com/Seemorghdev/drone-detection-showcase','https://github.com/Seemorghdev/hackathon-observation-showcase','https://github.com/Seemorghdev/drone-detection-showcase/blob/79b3a2096453f45d7d010fc7b1fdc987cf9e3764/docs/training-report.md','https://github.com/Seemorghdev/hackathon-observation-showcase/blob/main/docs/interface-review.md','https://github.com/Seemorghdev/drone-detection-showcase/blob/1abd61840ad58d8a945c91a2dca6b47665afa523/docs/recorded-evaluation-summary.md','https://github.com/Seemorghdev/drone-detection-showcase/blob/1abd61840ad58d8a945c91a2dca6b47665afa523/docs/recorded-evaluation-counts.json'].includes(url),url);
 }
});
test('approved visuals retain artifact labels without leaking review-only dependencies',()=>{
 assert.match(read('content/projects/small-object-detection.md'),/not detector output/);
 assert.match(read('content/projects/small-object-detection.md'),/genuine historical image artifacts, not a live model demo/);
 for(const p of ['small-object-detection','small-object-reference']){
  assert.doesNotMatch(read('content/projects/'+p+'.md'),/local-review\/|local review desk|Private review only|not cleared by this preview/);
 }
});
test('drone page itself exposes original outputs and bounded checkpoint findings',()=>{
 const page=read('content/projects/small-object-detection.md');
 for(const name of ['drone-retained-output-a.png','drone-retained-output-b.png','drone-s2-whole-frame-2026-10-27.png','drone-s2-tiled-2026-10-27.png']){
  assert.ok(page.includes(name));
  assert.ok(existsSync(new URL('content/assets/'+name,root)));
 }
 assert.match(page,/details open class="output-detail"/);
 assert.match(page,/different task and denominator/);
 assert.match(page,/SHA-256 exactly matches/);
 assert.match(page,/Neither model was loaded/);
 assert.match(page,/preserve both the manually referenced match and the competing candidates/);
});
test('hackathon pages and media stay withdrawn until owner approves publication',()=>{
 for(const slug of ['common-observation-view','common-observation-reference'])
  assert.ok(!existsSync(new URL('content/projects/'+slug+'.md',root)));
 assert.ok(!readdirSync(new URL('content/assets/',root)).some(name=>name.startsWith('hackathon-')));
 assert.doesNotMatch(read('content/projects/index.md'),/hackathon|common-observation/i);
 assert.doesNotMatch(read('content/notes/small-evaluations.md'),/\[\[projects\/common-observation|\]\([^)]*common-observation/);
});

test('recovered training results stay distinct from field observations and model availability',()=>{
 const overview=read('content/projects/small-object-detection.md');
 const reference=read('content/projects/small-object-reference.md');
 assert.match(overview,/href="#training-results"/);
 assert.match(overview,/small-object-reference\.md#recorded-training-results/);
 assert.match(overview,/not drone-specific accuracy/);
 assert.match(reference,/## Recorded training results/);
 assert.match(reference,/all \*\*200 comparisons\*\*/);
 assert.match(reference,/within rounding precision/);
 assert.match(reference,/original checksum receipt[\s\S]*not located/);
 assert.match(reference,/\| Precision \| 0\.94164 \| 0\.941, printed/);
 assert.match(reference,/\| mAP50 \| 0\.96511 \| 0\.9651819355211275 \|/);
 assert.match(reference,/\| mAP50–95 \| 0\.66650 \| 0\.66663031065507 \|/);
 assert.match(reference,/four classes: airplane, bird, drone and helicopter/);
 assert.match(reference,/not drone-specific accuracy, field reliability, or held-out test results/);
 assert.match(reference,/CC BY 4\.0/);
 assert.match(reference,/AGPL-3\.0/);
 assert.match(reference,/No separate Enterprise agreement or permission to relicense the weights as Apache-2\.0 was established/);
 assert.match(reference,/No new training, inference or evaluation was performed/);
 assert.doesNotMatch(reference,/api_key\s*=|PENDING_HUGGINGFACE_PUBLISH|\/__modal\/|vo-[A-Za-z0-9]+/);
});

test('saved evaluation links preserve the historical counter boundaries',()=>{
 const reference=read('content/projects/small-object-reference.md');
 const section=reference.split('## Recorded exploratory evaluation\n')[1]?.split('\n## ')[0];
 assert.ok(section);
 for(const file of ['recorded-evaluation-summary.md','recorded-evaluation-counts.json']){
  assert.ok(section.includes('https://github.com/Seemorghdev/drone-detection-showcase/blob/1abd61840ad58d8a945c91a2dca6b47665afa523/docs/'+file));
 }
 for(const boundary of ['prediction-presence counters without ground-truth matching','not accuracy, recall or a measured false-positive rate','predicted boxes, not images with birds','do not reproduce the separate historical 7% → 22% table','raw execution records and evidence references remain private','No new experiment or inference']) assert.ok(section.includes(boundary),boundary);
 assert.doesNotMatch(section,/\/Users\/|file:\/\/|github_pat_|BEGIN PRIVATE KEY/);
});
