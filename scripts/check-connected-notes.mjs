import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import {parse} from '../quartz-engine/node_modules/parse5/dist/index.js';

const root = new URL("../", import.meta.url);
const files = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? files(new URL(`${entry.name}/`, directory)).map(p => `${entry.name}/${p}`) : [entry.name]);
assert.deepEqual(files(new URL("content/", root)).sort(), [
  "assets/edge-evidence-gateway.jpg", "index.md", "notes/agent-vs-deterministic-inspector.md",
  "notes/index.md", "projects/edge-evidence.md", "projects/index.md",
  "research/project03/index.md", "research/project03/verification-is-not-acceptance.md", "research/project03/consumer-lab-mixed-evidence.md", "research/project03/publication-and-runtime-reality.md", "research/project03/what-project-03-shows.md", "notes/candidate-verification.md", "notes/engineering-acceptance.md", "notes/evidence-verification.md", "notes/lineage-and-provenance.md",
].sort(), "Only the curated content manifest is allowed");

const graph = JSON.parse(readFileSync(new URL("preview/static/contentIndex.json", root), "utf8"));
const note = "notes/agent-vs-deterministic-inspector";
const project = "projects/edge-evidence";
assert.ok(graph[note].links.includes(project), "Native wikilink: note → project");
assert.ok(graph[project].links.includes(note), "Native wikilink: project → note");
assert.ok(graph["notes/index"].links.includes(note), "Notes index → note");
assert.ok(graph[note].links.includes("notes/"), "Note → Notes index");
const html = readFileSync(new URL(`preview/${note}.html`, root), "utf8");
const backlinks = html.match(/<aside[^>]*aria-label="Backlinks"[\s\S]*?<\/aside>/)?.[0];
assert.ok(backlinks, "Native Quartz backlinks must be visible");
assert.match(backlinks, /href="\.\.\/projects\/edge-evidence"/);
assert.match(backlinks, /href="\.\.\/notes\/"/);
assert.ok(html.indexOf('aria-label="Backlinks"') < html.indexOf('<footer class="mehr-footer"'), "Backlinks precede the footer");
assert.ok(!html.includes("[["), "Wikilinks are rendered, not raw syntax");
assert.ok(!html.includes('class="project-card"'), "Readable note, not a marketing card");
for (const file of files(new URL("content/", root)).filter(p => p.endsWith(".md"))) {
  const source = readFileSync(new URL(`content/${file}`, root), "utf8");
  assert.match(source, /visibility: public/);
  assert.ok(!/<style|mehr-header|mehr-footer/.test(source), "Notes/content must inherit the shared shell");
  assert.ok(!/\[\[(?:Journal|Public\/Start Here|Notes\/Evidence verification)|\/(?:Users|private|home)\/|github_pat_|BEGIN.*PRIVATE KEY/.test(source), "No private source dependencies");
}
console.log("curated_manifest=15_files_14_markdown");
console.log("native_wikilinks=pass");
console.log("quartz_backlinks=pass");
console.log("note_presentation_and_privacy=pass");

const researchCandidates=[
 'research/project03/index','research/project03/verification-is-not-acceptance',
 'research/project03/consumer-lab-mixed-evidence','research/project03/publication-and-runtime-reality',
 'research/project03/what-project-03-shows','notes/candidate-verification',
 'notes/engineering-acceptance','notes/evidence-verification','notes/lineage-and-provenance',
];
const normalize=s=>s.replace(/\.md$/,'').replace(/\/index$/,'').replace(/\/$/,'');
const indexed=new Map(Object.keys(graph).map(k=>[normalize(k),k]));
const walk=n=>[n,...(n.childNodes??[]).flatMap(walk)];
let checked=0;
for(const slug of researchCandidates){
 const source=readFileSync(new URL(`content/${slug}.md`,root),'utf8');
 const html=readFileSync(new URL(`preview/${slug}.html`,root),'utf8');
 const anchors=walk(parse(html)).filter(n=>n.tagName==='a').map(n=>n.attrs.find(a=>a.name==='href')?.value).filter(Boolean);
 for(const match of source.matchAll(/\[\[([^\]|#]+)(?:[^\]]*)\]\]/g)){
  const target=normalize(match[1]);const key=indexed.get(target);
  assert.ok(key,`${slug}: authored target must be an indexed public page`);
  assert.ok(graph[slug].links.map(normalize).includes(target),`${slug}: authored edge missing from Quartz index`);
  assert.ok(anchors.some(href=>normalize(decodeURIComponent(new URL(href,'https://mehridian.tech/'+slug.replace(/index$/,'')).pathname).replace(/^\//,''))===target),`${slug}: missing rendered wikilink`);
  assert.ok(existsSync(new URL(`preview/${key}.html`,root)),`${slug}: missing built target`);
  if(target.startsWith('notes/')||target.startsWith('research/')){
   const destination=readFileSync(new URL(`preview/${key}.html`,root),'utf8');
   const backlink=destination.match(/<aside[^>]*aria-label="Backlinks"[\s\S]*?<\/aside>/)?.[0];
   assert.ok(backlink,`${key}: no native backlink region`);
   const backlinkHrefs=walk(parse(backlink)).filter(n=>n.tagName==='a').map(n=>n.attrs.find(a=>a.name==='href')?.value).filter(Boolean);
   assert.ok(backlinkHrefs.some(href=>normalize(new URL(href,'https://mehridian.tech/'+key.replace(/index$/,'')).pathname.replace(/^\//,''))===normalize(slug)),`${key}: authored backlink missing`);
  }
  checked++;
 }
}
assert.equal(checked,48,'Exact reviewed research wikilink count');
assert.ok(!existsSync(new URL('preview/research/index.html',root)),'No unreviewed parent folder page');
console.log('reviewed_research_wikilinks_rendered=48 backlinks_and_real_targets=pass no_parent_folder_leak=pass');
