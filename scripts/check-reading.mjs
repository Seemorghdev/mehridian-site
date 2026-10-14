import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {parse} from '../quartz-engine/node_modules/parse5/dist/index.js';
const root=new URL('../',import.meta.url);
const walk=n=>[n,...(n.childNodes??[]).flatMap(walk)];
const attr=(n,key)=>n.attrs?.find(a=>a.name===key)?.value;
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const pages=['index','projects/index','projects/edge-evidence','notes/index','notes/agent-vs-deterministic-inspector'];
for(const page of pages){
 const html=readFileSync(new URL('preview/'+page+'.html',root),'utf8');
 const nodes=walk(parse(html));
 const hints=nodes.filter(n=>(attr(n,'class')??'').split(' ').includes('popover-hint'));
 const reading=hints.filter(n=>attr(n,'id')==='mehr-content');
 assert.equal(reading.length,1,page+': one authored preview boundary');
 assert.ok(!walk(reading[0]).some(n=>['header','footer'].includes(n.tagName)||/mehr-native-graph|mehr-note-tools/.test(attr(n,'class')??'')));
 assert.ok(hints.filter(n=>attr(n,'id')!=='mehr-content').every(n=>!text(n).trim()),page+': all other native hints empty');
 assert.equal(nodes.filter(n=>(attr(n,'class')??'').includes('mehr-theme-toggle')).length,1);
 const before=nodes.filter(n=>n.tagName==='script'&&/resource-before/.test(attr(n,'src')??''));
 assert.equal(before.length,1);assert.ok(!before[0].attrs.some(a=>['async','defer'].includes(a.name)));
 const href=attr(before[0],'src');const script=readFileSync(new URL('preview/'+page.replace(/[^/]+$/,'')+href,root),'utf8');
 assert.match(script,/saved-theme/);
}
const note=readFileSync(new URL('preview/notes/agent-vs-deterministic-inspector.html',root),'utf8');
assert.match(note,/data-preview-index=/);assert.ok(note.includes('An interface can explain'));
const config=readFileSync(new URL('quartz.config.yaml',root),'utf8');assert.match(config,/enablePopovers: true/);
const index=JSON.parse(readFileSync(new URL('preview/static/contentIndex.json',root)));assert.equal(Object.keys(index).length,5);
console.log('native_reading_preview_boundary=pass');console.log('early_theme_init=pass');console.log('published_content_index=5');
