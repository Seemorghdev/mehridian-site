import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {decorateEvidenceExplorer, EXPLORER_SLUG} from './evidence-explorer.js';
const t = value => ({type:'text', value:String(value)});
const el = (tagName, children=[], properties={}) => ({type:'element',tagName,properties,children});
const all = n => [n,...(n.children??[]).flatMap(all)];
const text = n => n.type==='text'?n.value:(n.children??[]).map(text).join('');
const table = rows => el('table',[
  el('thead',[el('tr',[el('th',[t('State')]),el('th',[t('Count')])])]),
  el('tbody',rows.map(row=>el('tr',row.map(v=>el('td',[t(v)]))))),
]);
function fixture(){
  const tree={type:'root',children:[]};
  for(const [i,rows] of [[['SUCCESS_OBSERVED',13],['MIXED',1],['NOT_ESTABLISHED',1]],
    [['ESTABLISHED',1],['UNKNOWN',1],['NOT_ESTABLISHED',13]],
    [['ESTABLISHED',0],['NOT_ESTABLISHED',18],['NOT_OBSERVED',4],['NOT_COLLECTED',1],['UNKNOWN',2]],
    Array.from({length:15},(_,i)=>['Case '+String(i+1).padStart(2,'0'),'SUCCESS_OBSERVED','NOT_ESTABLISHED','NOT_ESTABLISHED','ACCEPTED','Qualification'])].entries()){
    tree.children.push(el('h2',[t('Heading '+i)],{id:'heading-'+i}),el('p',[t('Scope and caption')]),table(rows));
  }
  return tree;
}
test('explorer is opt-in by exact route; ordinary pages are unchanged',()=>{
  const tree=fixture();const before=structuredClone(tree);
  decorateEvidenceExplorer(tree,'research/project03/index');assert.deepEqual(tree,before);
});
test('three source tables become decorative bars, with original state/count text and scope',()=>{
  const tree=fixture();decorateEvidenceExplorer(tree,EXPLORER_SLUG);
  const cards=all(tree).filter(n=>n.properties?.className?.includes('mehr-evidence-card'));
  assert.equal(cards.length,3);
  assert.deepEqual(cards.map(n=>n.properties.ariaLabelledBy),['heading-0','heading-1','heading-2']);
  const bars=all(tree).filter(n=>n.properties?.className?.includes('mehr-evidence-fill'));
  assert.equal(bars.length,11);assert.equal(bars[6].properties.style,'width:0%');
  assert.equal(bars[7].properties.style,'width:72%');
  assert.equal(all(tree).filter(n=>n.properties?.ariaHidden==='true').length,26);
  assert.ok(all(cards[0]).some(n=>n.tagName==='strong'&&text(n)==='13'));
  assert.ok(all(cards[0]).some(n=>n.tagName==='th'&&n.properties.scope==='row'&&text(n)==='MIXED'));
});
test('comparison keeps fifteen rows and a named keyboard-scrollable region',()=>{
  const tree=fixture();decorateEvidenceExplorer(tree,EXPLORER_SLUG);
  const region=all(tree).find(n=>n.properties?.role==='region');
  assert.equal(region.properties.tabIndex,0);assert.match(region.properties.ariaLabel,/arrow keys/);
  const rows=all(region).filter(n=>n.tagName==='th'&&n.properties.scope==='row');
  assert.equal(rows.length,15);assert.equal(text(rows[14]),'Case 15');
  const css=readFileSync(new URL('./evidence-explorer.css',import.meta.url),'utf8');
  assert.match(css,/\.mehr-evidence-table-region > \.table-container\s*\{\s*overflow:visible/,'Quartz must not nest a competing scroll owner inside the focusable region');
  assert.match(css,/@media\(max-width:700px\)/,'Mobile viewport must use the reviewed single-column chart layout');
  assert.match(css,/\.mehr-evidence-table-region\s*\{\s*overflow-x:auto/,'Wide table must remain scrollable at desktop and mobile widths');
});
test('malformed and denominator-drifting chart inputs fail rather than silently render',()=>{
  const missing=fixture();missing.children.pop();assert.throws(()=>decorateEvidenceExplorer(missing,EXPLORER_SLUG));
  const invalid=fixture();const cells=all(invalid).filter(n=>n.tagName==='td');cells[1].children=[t('-1')];
  assert.throws(()=>decorateEvidenceExplorer(invalid,EXPLORER_SLUG),/Invalid authored/);
  const drift=fixture();all(drift).find(n=>n.type==='text'&&n.value==='13').value='12';
  assert.throws(()=>decorateEvidenceExplorer(drift,EXPLORER_SLUG),/denominator/);
});
test('public Markdown preserves the reviewed cases and never imports the private source register',()=>{
  const source=readFileSync(new URL('../content/research/project03/evidence-explorer.md',import.meta.url),'utf8');
  const rows=source.split('\n').filter(l=>/^\| Case \d\d \|/.test(l)).map(l=>l.split('|').slice(1,-1).map(v=>v.trim().replaceAll('`','')));
  assert.equal(rows.length,15);
  assert.deepEqual(rows.map(r=>r[0]),Array.from({length:15},(_,i)=>'Case '+String(i+1).padStart(2,'0')));
  const counts=column=>Object.fromEntries([...new Set(rows.map(r=>r[column]))].map(s=>[s,rows.filter(r=>r[column]===s).length]));
  assert.deepEqual(counts(1),{SUCCESS_OBSERVED:13,MIXED:1,NOT_ESTABLISHED:1});
  assert.deepEqual(counts(2),{ESTABLISHED:1,NOT_ESTABLISHED:13,UNKNOWN:1});
  assert.deepEqual(counts(3),{NOT_ESTABLISHED:15});
  assert.match(rows[2][5],/27-file subset/);assert.match(rows[11][5],/runtime observation remains UNKNOWN/);
  assert.match(source,/pseudonyms, not guaranteed anonymity/);
  assert.doesNotMatch(source,/docs\.google\.com|PLANNING|private-source-and-redaction|\/Users\/|file:\/\/|github_pat_|<style|<script/);
  assert.match(source,/\/assets\/project03-selected-evidence-cases\.csv/);
  assert.match(source,/\/assets\/project03-frozen-chart-states\.json/);
  assert.match(source,/75 `source_gap_observed` records/);
  assert.match(source,/cannot independently reconstruct or verify all underlying private/);
  assert.match(source,/\(\.\.\/\.\.\/projects\/edge-evidence\)/);
  assert.doesNotMatch(source,/projects\/edge-evidence\/\)/);
});
