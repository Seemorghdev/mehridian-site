import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {readingExcerpt,readingOnly,rebaseReadingAnchors} from './reading.js';
import {MehridianPresentation,MehridianProjectIndex} from './index.js';
test('graph excerpt comes from authored prose, not shell navigation',()=>{
  const tree={children:[{tagName:'h1',children:[{type:'text',value:'Title'}]},{tagName:'p',children:[{type:'text',value:'Actual note explanation.'}]}]};
  assert.equal(readingExcerpt(tree),'Actual note explanation.');
  assert.ok(readingExcerpt({children:[{tagName:'p',children:[{type:'text',value:'long sentence '.repeat(100)}]}]}).length<=221);
});
test('only the authored content has popover-hint; shell stays outside',()=>{
  const tree={children:[{tagName:'h1',children:[{type:'text',value:'Example'}]}]};
  const data={slug:'notes/example',frontmatter:{title:'Example'}};
  MehridianPresentation().htmlPlugins()[0]()(tree,{data});
  const hints=tree.children.filter(n=>n.properties?.className?.includes('popover-hint'));
  assert.equal(hints.length,1);assert.equal(hints[0].properties.id,'mehr-content');
  assert.ok(!JSON.stringify(hints[0]).includes('mehr-header'));
  const article=MehridianProjectIndex().body()({tree,fileData:data,allFiles:[],cfg:{locale:'en-US'}});
  assert.ok(!String(article.props.class).includes('popover-hint'));
});
test('preview anchors retain destination page at the custom-domain root',()=>{
  for(const [slug,base,expected] of [
    ['projects/edge-evidence','https://mehridian.tech/projects/edge-evidence','/projects/edge-evidence#public-code'],
    ['notes/index','https://mehridian.tech/notes/','/notes/#public-code'],
    ['index','https://mehridian.tech/','/#public-code'],
  ]){
    const link={tagName:'a',properties:{href:'#public-code'}};
    rebaseReadingAnchors({children:[link]},slug);
    assert.equal(new URL(link.properties.href,base).pathname+new URL(link.properties.href,base).hash,expected);
  }
});
test('only generated decorative heading permalinks are hidden in pages and previews',()=>{
  const selector=':is(h1,h2,h3,h4,h5,h6) > a[role="anchor"][aria-hidden="true"][data-no-popover="true"]';
  for(const [file,scope] of [['styles.css','#quartz-root article'],['reading.css','.popover']]){
    const css=readFileSync(new URL('./'+file,import.meta.url),'utf8');
    assert.ok(css.includes(scope+' '+selector));
    const rule=css.slice(css.indexOf(scope+' '+selector)).split('}')[0];
    assert.match(rule,/display:\s*none/);
    assert.ok(!css.includes('a.anchor'), 'Do not depend on the nonexistent class or hide authored links by class');
  }
  const authored={tagName:'a',properties:{href:'#section',className:['anchor']},children:[{type:'text',value:'Read the section'}]};
  const heading={tagName:'h2',properties:{id:'section'},children:[authored]};
  rebaseReadingAnchors({children:[heading]},'notes/example');
  assert.equal(authored.properties.href,'./example#section');
  assert.equal(heading.properties.id,'section');
  assert.equal(authored.properties.role,undefined);
});
test('saved theme takes precedence; system dark respected; fallback is light',()=>{
  const script=readFileSync(new URL('./theme-init.js',import.meta.url),'utf8');
  for(const [saved,systemDark,expected] of [['light',true,'light'],['dark',false,'dark'],[null,true,'dark'],[null,false,'light'],['invalid',false,'light']]){
    const attrs={};const root={style:{},setAttribute:(k,v)=>attrs[k]=v};
    vm.runInNewContext(script,{localStorage:{getItem:()=>saved},matchMedia:()=>({matches:systemDark}),document:{documentElement:root}});
    assert.equal(attrs['saved-theme'],expected);assert.equal(root.style.colorScheme,expected);
  }
});
test('blocked browser storage does not break early theme initialization',()=>{
  const attrs={};vm.runInNewContext(readFileSync(new URL('./theme-init.js',import.meta.url),'utf8'),{
    localStorage:{getItem(){throw new Error('blocked');}},matchMedia:()=>({matches:false}),
    document:{documentElement:{style:{},setAttribute:(k,v)=>attrs[k]=v}},
  });assert.equal(attrs['saved-theme'],'light');
});
function luminance(hex){const v=hex.replace('#','').match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return v[0]*.2126+v[1]*.7152+v[2]*.0722;}
test('coordinated palettes meet 4.5:1 for ordinary reading and link text',()=>{
  const ratios=[];
  for(const [bg,colors] of [['#f8f7f4',['#17242b','#5c696e','#2e4a55','#995037']],['#141f25',['#e7ece8','#b0bfbd','#a8cbd4','#dea48a']]]){
    for(const color of colors){const a=luminance(bg),b=luminance(color);const ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);assert.ok(ratio>=4.5);ratios.push(ratio);}
  }
});
test('graph preview uses safe text and native node positions, not a new renderer',()=>{
  const script=readFileSync(new URL('./graph/src/graph.inline.ts',import.meta.url),'utf8');
  assert.match(script,/previewTitle.textContent=info.title/);assert.match(script,/previewExcerpt.textContent=info.excerpt/);
  assert.match(script,/const keyboardNode=node/);assert.match(script,/focusButton.addEventListener\('focus'/);
  assert.ok(!script.includes('preview.innerHTML'));
});
