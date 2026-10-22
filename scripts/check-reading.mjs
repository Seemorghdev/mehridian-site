import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parse} from '../quartz-engine/node_modules/parse5/dist/index.js';
const root=new URL('../',import.meta.url);
const walk=n=>[n,...(n.childNodes??[]).flatMap(walk)];
const attr=(n,key)=>n.attrs?.find(a=>a.name===key)?.value;
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const pages=['research/project03/evidence-explorer','index','projects/index','projects/edge-evidence','notes/index','notes/agent-vs-deterministic-inspector', 'notes/local-language-task-boundaries', 'research/project03/index', 'research/project03/verification-is-not-acceptance', 'research/project03/consumer-lab-mixed-evidence', 'research/project03/publication-and-runtime-reality', 'research/project03/what-project-03-shows', 'notes/candidate-verification', 'notes/engineering-acceptance', 'notes/evidence-verification', 'notes/lineage-and-provenance'];
for(const page of pages){
 const html=readFileSync(new URL('preview/'+page+'.html',root),'utf8');
 const nodes=walk(parse(html));
 assert.ok(!html.includes('https://seemorghdev.github.io/mehridian-site'),page+': no legacy site origin in output');
 const hints=nodes.filter(n=>(attr(n,'class')??'').split(' ').includes('popover-hint'));
 const reading=nodes.find(n=>attr(n,'id')==='mehr-content');
 const meaningful=hints.filter(n=>text(n).trim());
 assert.equal(meaningful.length,page==='index'||page==='projects/index'?0:1,page+': approved destination region only');
 if(page.startsWith('notes/') || page.startsWith('research/')) assert.equal(meaningful[0],reading);
 if(page==='projects/edge-evidence') assert.equal(attr(meaningful[0],'aria-labelledby'),'problem-title');
 assert.ok(meaningful.every(n=>!walk(n).some(x=>['header','footer'].includes(x.tagName)||/mehr-native-graph|mehr-note-tools/.test(attr(x,'class')??''))));
 for(const anchor of nodes.filter(n=>n.tagName==='a'&&(attr(n,'class')??'').split(' ').includes('internal'))){
   if(!(page.startsWith('notes/') || page.startsWith('research/'))||!walk(reading).includes(anchor)&&!nodes.filter(n=>attr(n,'class')==='mehr-note-backlinks').some(n=>walk(n).includes(anchor)))
     assert.equal(attr(anchor,'data-no-popover'),'true',page+': source link opt-out');
 }
 assert.equal(nodes.filter(n=>(attr(n,'class')??'').includes('mehr-theme-toggle')).length,1);
 const before=nodes.filter(n=>n.tagName==='script'&&/resource-before/.test(attr(n,'src')??''));
 assert.equal(before.length,1);assert.ok(!before[0].attrs.some(a=>['async','defer'].includes(a.name)));
 const href=attr(before[0],'src');const script=readFileSync(new URL('preview/'+page.replace(/[^/]+$/,'')+href,root),'utf8');
 assert.match(script,/saved-theme/);
 // Guard the actual generated role/attributes rather than a nonexistent class.
 const headings=walk(reading).filter(n=>/^h[1-6]$/.test(n.tagName??''));
 const permalinks=headings.flatMap(n=>(n.childNodes??[]).filter(a=>a.tagName==='a'&&attr(a,'role')==='anchor').map(a=>({heading:n,link:a})));
 assert.ok(permalinks.length>0,page+': generated permalink fixture present');
 for(const {heading,link} of permalinks){
  assert.equal(attr(link,'aria-hidden'),'true');assert.equal(attr(link,'data-no-popover'),'true');
  assert.equal(attr(link,'tabindex'),'-1');
  const url=new URL(attr(link,'href'),'https://mehridian.tech/'+page.replace(/index$/,''));
  assert.equal(decodeURIComponent(url.hash.slice(1)),attr(heading,'id'),page+': heading target retained');
  assert.equal(url.pathname, new URL(page.replace(/index$/, ''), 'https://mehridian.tech/').pathname, page+': permalink uses root-domain path');
 }
}
const note=readFileSync(new URL('preview/notes/agent-vs-deterministic-inspector.html',root),'utf8');
assert.match(note,/data-preview-index=/);assert.ok(note.includes('An interface can explain'));
const config=readFileSync(new URL('quartz.config.yaml',root),'utf8');assert.match(config,/enablePopovers: true/);assert.match(config,/baseUrl: mehridian\.tech/);
const index=JSON.parse(readFileSync(new URL('preview/static/contentIndex.json',root)));assert.equal(Object.keys(index).length,16);
console.log('native_reading_preview_boundary=pass');console.log('early_theme_init=pass');console.log('published_content_index=16');
console.log('generated_heading_permalink_targets=pass');
