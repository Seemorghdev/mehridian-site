const text=node=>node.type==='text'?node.value:node.tagName==='br'?' ':(node.children??[]).map(text).join('');
export function readingExcerpt(tree,limit=220){
  const paragraphs=[];
  function visit(node){if(node.tagName==='p'){
    const classes=node.properties?.className??[];
    if(!(Array.isArray(classes)?classes:String(classes).split(/\s+/)).some(c=>['eyebrow','track','number'].includes(c)))paragraphs.push(text(node));
  }else(node.children??[]).forEach(visit);}
  visit(tree);
  const first=paragraphs.find(p=>p.trim())??text(tree);
  const clean=first.replace(/\s+/g,' ').trim();
  return clean.length<=limit?clean:clean.slice(0,limit).replace(/\s+\S*$/,'')+'…';
}
export function readingOnly(article,cloneElement){
  return cloneElement(article,{class:String(article.props.class??'').split(/\s+/).filter(c=>c!=='popover-hint').join(' ')});
}
// Quartz rebases ./ and ../ links in fetched previews, but not bare fragments.
// Give authored anchors their own page context without hard-coding a host/mount.
export function rebaseReadingAnchors(tree,slug){
  const leaf=String(slug).split('/').at(-1);
  const page=leaf==='index'?'./':'./'+leaf;
  function visit(node){
    const href=node.properties?.href;
    if(node.tagName==='a' && typeof href==='string' && href.startsWith('#'))node.properties.href=page+href;
    (node.children??[]).forEach(visit);
  }
  visit(tree);
}
