import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync,readdirSync} from 'node:fs';
import {parse} from '../quartz-engine/node_modules/parse5/dist/index.js';
const root=new URL('../',import.meta.url);
const html=readFileSync(new URL('preview/research/project03/evidence-explorer.html',root),'utf8');
const walk=n=>[n,...(n.childNodes??[]).flatMap(walk)];
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const has=(n,c)=>(attr(n,'class')??'').split(' ').includes(c);
const text=n=>n.nodeName==='#text'?n.value:(n.childNodes??[]).map(text).join('');
const nodes=walk(parse(html));
assert.equal(nodes.filter(n=>has(n,'mehr-evidence-card')).length,3);
assert.equal(nodes.filter(n=>has(n,'mehr-evidence-fill')).length,11);
const region=nodes.find(n=>has(n,'mehr-evidence-table-region'));
assert.equal(attr(region,'tabindex'),'0');assert.equal(attr(region,'role'),'region');
const rows=walk(region).filter(n=>n.tagName==='th'&&attr(n,'scope')==='row');
assert.deepEqual(rows.map(text),Array.from({length:15},(_,i)=>'Case '+String(i+1).padStart(2,'0')));
assert.equal(nodes.filter(n=>has(n,'mehr-native-graph')).length,0,'Optional graph disabled on the dense comparison');
assert.equal(nodes.filter(n=>has(n,'mehr-theme-toggle')).length,1);
assert.equal(nodes.filter(n=>has(n,'search-button')).length,1);
assert.ok(nodes.some(n=>n.tagName==='aside'&&attr(n,'aria-label')==='Backlinks'));
assert.doesNotMatch(html,/docs\.google\.com|private-source-and-redaction|\/Users\/|github_pat_|public-safe-figures\.json|PLANNING/);
const projectLink=nodes.find(n=>n.tagName==='a'&&text(n)==='Edge Evidence case study');
assert.ok(projectLink,'Existing public case-study link');
assert.equal(new URL(attr(projectLink,'href'),'https://mehridian.tech/research/project03/evidence-explorer').pathname,'/projects/edge-evidence');
const index=JSON.parse(readFileSync(new URL('preview/static/contentIndex.json',root),'utf8'));
assert.equal(Object.keys(index).length,22);assert.ok(index['notes/local-language-task-boundaries']);assert.ok(index['research/project03/index'].links.includes('research/project03/evidence-explorer'));
assert.ok(index['research/project03/evidence-explorer'].links.includes('research/project03/verification-is-not-acceptance'));
const forbidden=/private-source|public-safe-comparison|public-safe-figures/;
const files=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(new URL(e.name+'/',dir)):[e.name]);
assert.ok(!files(new URL('preview/',root)).some(n=>forbidden.test(n)),'No private register or downloadable dataset in output');

// The two owner-authorized downloads are byte-for-byte copies of the frozen Explorer
// candidate values; do not silently regenerate, add identity columns, or change tokens.
const approved=[
 {name:'project03-selected-evidence-cases.csv',gitBlob:'1179e8936e7fa1fd50e7fb8cbd76bfa5754be3ce'},
 {name:'project03-frozen-chart-states.json',gitBlob:'37e0267ff11a2200b2288b2e4207ccdf4d3afbaa'}
];
const gitSha=data=>createHash('sha1').update('blob '+data.length+'\u0000').update(data).digest('hex');
for(const {name,gitBlob} of approved){
 const authored=readFileSync(new URL('content/assets/'+name,root));
 const emitted=readFileSync(new URL('preview/assets/'+name,root));
 assert.deepEqual(emitted,authored,name+': emitted download must match source bytes');
 assert.equal(gitSha(emitted),gitBlob,name+': source candidate Git blob is frozen');
 assert.doesNotMatch(emitted.toString('utf8'),/docs\.google\.com|app\.notion\.com|Seemorghdev\/PLANNING|github_pat_|acceptance\/evidence\/|private-source-and-redaction/i,name+': no private references');
 assert.ok(html.includes('/assets/'+name),name+': download must be linked');
}
const csv=readFileSync(new URL('content/assets/project03-selected-evidence-cases.csv',root),'utf8').trimEnd().split('\n');
assert.equal(csv.length,16,'exactly 15 case rows and one header');
assert.equal(csv[0].split(',').length,6,'no new CSV columns');
assert.ok(csv.every((line,i)=>i===0||line.startsWith('Case '+String(i).padStart(2,'0')+',')),'original editorial pseudonyms remain stable');
const counts=JSON.parse(readFileSync(new URL('content/assets/project03-frozen-chart-states.json',root),'utf8'));
assert.equal(counts.repository_count,15);assert.equal(counts.projection_observation_count,25);
assert.deepEqual(counts.verification.map(x=>[x.state,x.count]),[['SUCCESS_OBSERVED',13],['MIXED',1],['NOT_ESTABLISHED',1]]);
assert.deepEqual(counts.engineering_acceptance.map(x=>[x.state,x.count]),[['ESTABLISHED',1],['UNKNOWN',1],['NOT_ESTABLISHED',13]]);
assert.deepEqual(counts.projection_runtime_observation.map(x=>[x.state,x.count]),[['ESTABLISHED',0],['NOT_ESTABLISHED',18],['NOT_OBSERVED',4],['NOT_COLLECTED',1],['UNKNOWN',2]]);
assert.match(html,/source_gap_observed/);
assert.match(html,/cannot independently reconstruct or verify all underlying private/);
console.log('frozen_csv_json=approved_bytes_15_cases_15_15_25_states_privacy_pass');

console.log('evidence_explorer=three_charts_15_cases_keyboard_region_shared_theme_pass');
console.log('private_register_and_unapproved_downloads=absent');
