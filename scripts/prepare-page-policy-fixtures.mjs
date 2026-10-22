// Local browser fixtures only: copies of built public pages, never content/index
// inputs or deployment assets. Exercise missing source-link combinations through
// the real transformer, not manually forced data-no-popover attributes.
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { parse, serialize } from '../quartz-engine/node_modules/parse5/dist/index.js';
import { toJsxRuntime } from '../quartz-engine/node_modules/hast-util-to-jsx-runtime/index.js';
import { Fragment, jsx, jsxs } from '../quartz-engine/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js';
import renderToString from '../quartz-engine/node_modules/preact-render-to-string/dist/index.mjs';
import { MehridianPresentation } from '../theme/index.js';
const root = new URL('../', import.meta.url);
const out = new URL('preview/review-fixtures/', root);
mkdirSync(out, {recursive:true});
const slugs = ['research/project03/evidence-explorer','index','projects/index','projects/edge-evidence','projects/small-object-detection','notes/index','notes/agent-vs-deterministic-inspector','notes/local-language-task-boundaries',"research/project03/index","research/project03/verification-is-not-acceptance","research/project03/consumer-lab-mixed-evidence","research/project03/publication-and-runtime-reality","research/project03/what-project-03-shows","notes/candidate-verification","notes/engineering-acceptance","notes/evidence-verification","notes/lineage-and-provenance"];
for (const slug of ['index','projects/index','notes/index']) {
  const link = { type:'element', tagName:'a', properties:{ href:(slug==='index'?'':'../')+'notes/agent-vs-deterministic-inspector.md#proposed-experiment-adk--ollama' }, children:[{type:'text',value:'QA authored note link'}] };
  const tree = {type:'root',children:[{type:'element',tagName:'p',properties:{},children:[link]}]};
  MehridianPresentation().htmlPlugins({allSlugs:slugs})[0]()(tree,{data:{slug,frontmatter:{title:'Fixture'}}});
  assert.equal(link.properties['data-no-popover'], String(!slug.startsWith('notes/')));
  assert.ok(link.properties.className.includes('internal'));
  const origin = 'https://fixture.invalid/';
  const base = new URL(slug.replace(/index$/, ''), origin);
  const absolute = value => {
    const url = new URL(value, base);
    return url.origin === new URL(origin).origin ? url.pathname+url.search+url.hash : value;
  };
  link.properties.href = absolute(link.properties.href);
  const html = readFileSync(new URL('preview/'+slug+'.html',root),'utf8')
    .replace(/(<div id="mehr-content"[^>]*>)/, '$1<p>'+renderToString(toJsxRuntime(link,{Fragment,jsx,jsxs}))+'</p>');
  const dom = parse(html);
  function rebase(node) {
    for (const attr of node.attrs ?? []) if (['href','src'].includes(attr.name)) attr.value = absolute(attr.value);
    for (const child of node.childNodes ?? []) rebase(child);
  }
  rebase(dom);
  writeFileSync(new URL(slug.replaceAll('/','-')+'.html',out),serialize(dom));
}
const index = JSON.parse(readFileSync(new URL('preview/static/contentIndex.json',root),'utf8'));
assert.deepEqual(Object.keys(index).sort(), slugs.sort(), 'QA fixtures never enter the public index');
console.log('page_policy_browser_fixtures=local_only_not_indexed');
