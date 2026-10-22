import assert from 'node:assert/strict';
import {readFileSync,existsSync,statSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
const root=new URL('../',import.meta.url);
const index=JSON.parse(readFileSync(new URL('preview/static/contentIndex.json',root)));
assert.deepEqual(Object.keys(index).sort(),['research/project03/evidence-explorer','index','notes/index','notes/agent-vs-deterministic-inspector','notes/local-language-task-boundaries','projects/index','projects/edge-evidence','projects/small-object-detection',"projects/small-object-reference","projects/common-observation-view","projects/common-observation-reference","notes/small-evaluations","research/project03/index","research/project03/verification-is-not-acceptance","research/project03/consumer-lab-mixed-evidence","research/project03/publication-and-runtime-reality","research/project03/what-project-03-shows","notes/candidate-verification","notes/engineering-acceptance","notes/evidence-verification","notes/lineage-and-provenance"].sort());
const note=readFileSync(new URL('preview/notes/agent-vs-deterministic-inspector.html',root),'utf8');
assert.match(note,/class="mehr-native-graph"/);assert.match(note,/class="graph-enable"/);
assert.match(note,/class="native-graph-host" hidden/);assert.match(note,/Connected pages — text alternative/);
assert.match(note,/class="search-button"/);assert.ok(!note.includes('mehr-graph-map'));
const landing=readFileSync(new URL('preview/notes/index.html',root),'utf8');
assert.match(landing,/class="search-button"/);assert.ok(!landing.includes('class="mehr-native-graph"'));
for(const page of ['index','projects/index','projects/edge-evidence','projects/small-object-detection']){
 const html=readFileSync(new URL('preview/'+page+'.html',root),'utf8');
 assert.ok(!html.includes('class="mehr-native-graph"')&&!html.includes('class="search-button"'));
}
let total=0,gzip=0;
for(const name of ['d3-7.9.0.min.js','pixi-8.18.0.min.js']){
 const file=new URL('preview/static/graph/'+name,root);assert.ok(existsSync(file));
 const data=readFileSync(file);total+=statSync(file).size;gzip+=gzipSync(data).length;
}
console.log('published_search_and_graph_index=21_actual_pages');
console.log('official_graph_source=pass');console.log('local_pinned_dependencies=pass');
console.log('graph_library_raw_bytes='+total);console.log('graph_library_gzip_bytes='+gzip);
console.log('portfolio_widgets_unchanged=pass');
