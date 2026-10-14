// Text alternatives use the same authored links as native Quartz Graph/search.
export const simplify = value => String(value).replace(/\/index$/, '').replace(/\/$/, '');
export function publishedPages(files) {
  return files.filter(f => f.frontmatter?.visibility === 'public' && !f.frontmatter.draft && !f.unlisted);
}
export function publishedConnections(current, files) {
  const slug=simplify(current.slug);
  const outgoing=new Set((current.links??[]).map(simplify));
  return {neighbors:publishedPages(files).filter(f=>simplify(f.slug)!==slug &&
    (outgoing.has(simplify(f.slug)) || (f.links??[]).some(s=>simplify(s)===slug)))};
}
