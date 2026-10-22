import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
test('both showcases link their real technical references and the connected note',()=>{
 for(const [page,reference] of [['small-object-detection','small-object-reference'],['common-observation-view','common-observation-reference']]){
  const text=read('content/projects/'+page+'.md');
  assert.ok(text.includes(reference+'.md'));
  assert.ok(text.includes('small-evaluations.md'));
  assert.ok(existsSync(new URL('content/projects/'+reference+'.md',root)));
 }
});
test('public references do not invent source access or runtime acceptance',()=>{
 assert.match(read('content/projects/small-object-reference.md'),/Public implementation:\*\* not released/);
 assert.match(read('content/projects/common-observation-reference.md'),/application source remains private/);
 assert.match(read('content/projects/common-observation-view.md'),/underlying application source remains private/);
 for(const p of ['small-object-reference','common-observation-reference','common-observation-view']){
  const source=read('content/projects/'+p+'.md');
  assert.doesNotMatch(source,/\/Users\/|file:\/\/|local review desk/i);
  for(const url of source.match(/https:\/\/github\.com\/[^\s"<)]+/g)??[]) assert.ok(['https://github.com/Seemorghdev/drone-detection-showcase','https://github.com/Seemorghdev/hackathon-observation-showcase'].includes(url),url);
 }
});
test('approved visuals retain artifact labels without leaking review-only dependencies',()=>{
 assert.match(read('content/projects/small-object-detection.md'),/not detector output/);
 assert.match(read('content/projects/small-object-detection.md'),/genuine historical image artifacts, not a live model demo/);
 for(const p of ['small-object-detection','common-observation-view','small-object-reference','common-observation-reference']){
  assert.doesNotMatch(read('content/projects/'+p+'.md'),/local-review\/|local review desk|Private review only|not cleared by this preview/);
 }
});
test('drone page itself exposes original outputs and bounded checkpoint findings',()=>{
 const page=read('content/projects/small-object-detection.md');
 for(const name of ['drone-retained-output-a.png','drone-retained-output-b.png']){
  assert.ok(page.includes(name));
  assert.ok(existsSync(new URL('content/assets/'+name,root)));
 }
 assert.match(page,/details open class="output-detail"/);
 assert.match(page,/different task and denominator/);
 assert.match(page,/SHA-256 exactly matches/);
 assert.match(page,/Neither model was loaded/);
 assert.match(page,/preserve both the manually referenced match and the competing candidates/);
});
test('hackathon visual is an existing screened excerpt, not application UI',()=>{
 const page=read('content/projects/common-observation-view.md');
 assert.match(page,/hackathon-presentation-excerpt\.png/);
 assert.match(page,/not the original seven-section layout or an application executing/);
 assert.match(page,/no application-runtime evidence is implied/);
 assert.match(page,/aria-label="Hackathon project reading path"/);
 assert.ok(existsSync(new URL('content/assets/hackathon-presentation-excerpt.png',root)));
});
