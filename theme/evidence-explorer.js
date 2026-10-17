// Progressive presentation over authored Markdown tables. No client JS or data fetch.
// The Markdown remains the sole public data source and works unstyled in Obsidian.
export const EXPLORER_SLUG = 'research/project03/evidence-explorer';
const text = node => node.type === 'text' ? node.value : (node.children ?? []).map(text).join('');
const el = (tagName, properties, children) => ({type:'element', tagName, properties, children});
const t = value => ({type:'text', value});
const addClass = (node, name) => {
  node.properties ??= {};
  node.properties.className = [...(node.properties.className ?? []), name];
};
const all = node => [node, ...(node.children ?? []).flatMap(all)];

export function decorateEvidenceExplorer(tree, slug) {
  if (String(slug) !== EXPLORER_SLUG) return;
  const tables = all(tree).filter(node => node.tagName === 'table');
  if (tables.length !== 4) throw new Error('Evidence Explorer requires three authored distributions and one comparison');
  const denominators = [15, 15, 25];
  for (const [index, table] of tables.entries()) {
    all(table).filter(n => n.tagName === 'th').forEach(n => { n.properties ??= {}; n.properties.scope = 'col'; });
    if (index < 3) {
      addClass(table, 'mehr-evidence-distribution');
      const rows = all(table).filter(n => n.tagName === 'tr' && n.children?.some(c => c.tagName === 'td'));
      let total = 0;
      for (const row of rows) {
        const cells = row.children.filter(n => n.tagName === 'td');
        if (cells.length !== 2) throw new Error('Expected a state and count');
        const count = Number(text(cells[1]).trim());
        if (!/^\d+$/.test(text(cells[1]).trim()) || !Number.isSafeInteger(count) || count > denominators[index]) {
          throw new Error('Invalid authored distribution count');
        }
        total += count;
        // Keep original state/count text accessible; the bar is decorative only.
        cells[0].tagName = 'th';
        cells[0].properties.scope = 'row';
        cells[1].children = [el('div', {className:['mehr-evidence-count']}, [
          el('span', {className:['mehr-evidence-track'], ariaHidden:'true'}, [
            el('span', {className:['mehr-evidence-fill'], style:`width:${count / denominators[index] * 100}%`}, []),
          ]), el('strong', {}, [t(String(count))]),
        ])];
      }
      if (total !== denominators[index]) throw new Error('Authored distribution does not match its stated denominator');
    } else {
      addClass(table, 'mehr-evidence-comparison');
      const rows = all(table).filter(n => n.tagName === 'tr' && n.children?.some(c => c.tagName === 'td'));
      if (rows.length !== 15) throw new Error('Expected fifteen comparison cases');
      for (const [caseIndex,row] of rows.entries()) {
        const cells = row.children.filter(n => n.tagName === 'td');
        if (cells.length !== 6) throw new Error('Expected six public comparison fields');
        const label = text(cells[0]).trim();
        if (label !== 'Case ' + String(caseIndex+1).padStart(2,'0')) throw new Error('Unstable editorial case ID');
        cells[0].tagName = 'th'; cells[0].properties.scope = 'row';
        cells[5].children.unshift(el('span', {className:['mehr-evidence-case-label'], ariaHidden:'true'}, [t(label)]));
      }
    }
  }
  // Group the existing sections, not a second page shell. IDs, links and captions survive.
  const headings = tree.children.map((n,i) => n.tagName === 'h2' ? i : -1).filter(i => i >= 0);
  const cards = headings.slice(0,3).map((start,i) => el('section', {
    className:['mehr-evidence-card'], ariaLabelledBy:tree.children[start].properties.id,
  }, tree.children.slice(start,headings[i+1])));
  tree.children.splice(headings[0], headings[3] - headings[0], el('div', {className:['mehr-evidence-charts']}, cards));
  function wrap(parent) {
    parent.children = (parent.children ?? []).map(node => {
      if (node === tables[3]) return el('div', {
        className:['mehr-evidence-table-region'], tabIndex:0, role:'region',
        ariaLabel:'Fifteen-case comparison; scroll horizontally with the arrow keys',
      }, [node]);
      if (node.children) wrap(node);
      return node;
    });
  }
  wrap(tree);
}
