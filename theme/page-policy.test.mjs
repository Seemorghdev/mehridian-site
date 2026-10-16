import test from 'node:test';
import assert from 'node:assert/strict';
import { MehridianPresentation, MehridianProjectIndex } from './index.js';
import { eligiblePreviewTarget, pagePolicy } from './page-policy.js';
import { fromHtml } from '../quartz-engine/node_modules/hast-util-from-html/index.js';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const walk = n => [n, ...(n.children ?? []).flatMap(walk)];
const el = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const t = value => ({ type: 'text', value });
const allSlugs = ['index', 'projects/index', 'projects/edge-evidence', 'notes/index', 'notes/agent-vs-deterministic-inspector'];
function render(slug, children) {
  const tree = { type: 'root', children };
  const data = { slug, frontmatter: { title: 'Fixture', visibility: 'public' } };
  MehridianPresentation().htmlPlugins({ allSlugs })[0]()(tree, { data });
  return { tree, data };
}
test('source policy gates actual authored Home/Projects/case → Note links, not just target hints', () => {
  for (const slug of ['index', 'projects/index', 'projects/edge-evidence', 'notes/index']) {
    const link = el('a', { href: slug === 'index' ? 'notes/agent-vs-deterministic-inspector.md' : '../notes/agent-vs-deterministic-inspector.md' }, [t('Read note')]);
    const { tree, data } = render(slug, [el('p', {}, [link])]);
    assert.equal(link.properties['data-no-popover'], String(!slug.startsWith('notes/')));
    assert.ok(link.properties.className.includes('internal'));
    assert.ok(data.links.includes('notes/agent-vs-deterministic-inspector'), 'Preview policy must not delete authored index edges');
    const shell = tree.children.filter(n => n.properties?.id !== 'mehr-content');
    assert.ok(shell.flatMap(walk).filter(n => n.tagName === 'a').every(n => n.properties['data-no-popover'] === 'true'));
  }
});
test('destination policy is independent; only an approved existing case-study section is exposed', () => {
  const section = fromHtml('<section aria-labelledby="problem-title"><h2 id="problem-title">Question</h2><p>Approved prose</p></section>', {fragment:true}).children[0];
  const { tree } = render('projects/edge-evidence', [section, el('section', { ariaLabelledBy: 'demos-title' }, [t('Unrelated controls')])]);
  const hints = walk(tree).filter(n => n.properties?.className?.includes('popover-hint'));
  assert.deepEqual(hints, [section]);
  assert.equal(pagePolicy('projects/edge-evidence').triggers, false);
  for (const slug of ['index', 'projects/index', 'projects/unapproved', 'unknown/page']) {
    assert.equal(walk(render(slug, [el('p', {}, [t('Body')])]).tree).filter(n => n.properties?.className?.includes('popover-hint')).length, 0);
  }
});
test('Notes preserve eligible relative/anchored previews; explicit opt-outs and non-reading targets stay off', () => {
  const good = el('a', { href: '../projects/edge-evidence.md#problem-title' }, [t('Case study')]);
  const optedOut = el('a', { href: 'index.md', 'data-no-popover': 'true' }, [t('No preview')]);
  const home = el('a', { href: '../index.md' }, [t('Home')]);
  const { data } = render('notes/agent-vs-deterministic-inspector', [good, optedOut, home]);
  assert.equal(good.properties['data-no-popover'], 'false');
  assert.match(good.properties.href, /#problem-title$/);
  assert.equal(optedOut.properties['data-no-popover'], 'true');
  assert.equal(home.properties['data-no-popover'], 'true');
  assert.ok(data.links.includes('projects/edge-evidence'));
  assert.equal(eligiblePreviewTarget('https://other.invalid/notes/example', 'notes/index'), false);
  assert.equal(eligiblePreviewTarget('/notes', 'notes/example'), true);
});
test('reduced-motion graph controller cannot opt into animation and retains its link fallback', () => {
  const listeners = {}, events = [];
  const button = { textContent:'Enable interactive graph', addEventListener:(k,cb)=>listeners[k]=cb, setAttribute(){} };
  const host = {hidden:true};
  const modal = {classList:{contains:()=>false},addEventListener(){}};
  const parts = {'.graph-enable':button,'.native-graph-host':host,'.global-graph-outer':modal,'.global-graph-icon':{focus(){}},'.graph-close':{addEventListener(){}}};
  vm.runInNewContext(readFileSync(new URL('./graph-controls.js',import.meta.url),'utf8'),{
    document:{querySelectorAll:()=>[{querySelector:s=>parts[s]}],dispatchEvent:e=>events.push(e)},
    matchMedia:()=>({matches:true,addEventListener(){}}),
    MutationObserver:class {observe(){}},
  });
  listeners.click();
  assert.equal(host.hidden,true);
  assert.deepEqual(events,[]);
});
test('native backlinks share the policy; graph text alternatives do not trigger native popovers', () => {
  const { tree, data } = render('notes/agent-vs-deterministic-inspector', [el('p', {}, [t('Body')])]);
  const files = ['index', 'projects/edge-evidence', 'notes/index'].map(slug => ({slug,links:[data.slug],frontmatter:{title:slug,visibility:'public'}}));
  const article = MehridianProjectIndex().body()({ tree, fileData: data, allFiles: files, cfg: {locale:'en-US'} });
  const nodes = n => Array.isArray(n) ? n.flatMap(nodes) : !n?.props ? [] : [n, ...nodes(n.props.children)];
  const sections = nodes(article);
  const backlinks = nodes(sections.find(n => n.props.class === 'mehr-note-backlinks')).filter(n => n.type === 'a');
  assert.equal(backlinks.length, 3);
  assert.equal(backlinks.find(n => n.props.children === 'index').props['data-no-popover'], 'true');
  assert.ok(backlinks.filter(n => n.props.children !== 'index').every(n => n.props['data-no-popover'] === 'false'));
  const alternatives = sections.filter(n => /^(local|global)-text-links$/.test(n.props.class ?? '')).flatMap(nodes).filter(n => n.type === 'a');
  assert.ok(alternatives.length > 0 && alternatives.every(n => n.props['data-no-popover'] === 'true'));
});

test('research uses the existing readable-note policy without giving Home rich controls',()=>{
 const slug='research/project03/index';
 assert.deepEqual(pagePolicy(slug),{role:'note',triggers:true,target:'reading'});
 assert.equal(eligiblePreviewTarget('../../notes/candidate-verification',slug),true);
 assert.equal(eligiblePreviewTarget('https://docs.mehridian.tech/edge-evidence/',slug),false);
 assert.equal(pagePolicy('index').triggers,false);
 const {tree,data}=render(slug,[el('p',{},[t('Historical research, not current runtime.')])]);
 const hints=walk(tree).filter(n=>n.properties?.className?.includes('popover-hint'));
 assert.equal(hints.length,1);
 assert.equal(hints[0].properties.id,'mehr-content');
 assert.equal(MehridianProjectIndex().match({slug}),true);
 const article=MehridianProjectIndex().body()({tree,fileData:data,allFiles:[],cfg:{locale:'en-US'}});
 const nodes=n=>Array.isArray(n)?n.flatMap(nodes):!n?.props?[]:[n,...nodes(n.props.children)];
 const sections=nodes(article);
 assert.ok(sections.some(n=>n.props.class==='mehr-note-tools'));
 assert.ok(sections.some(n=>n.props.class==='mehr-note-backlinks'));
 assert.ok(sections.some(n=>n.props.class==='mehr-native-graph'));
});
