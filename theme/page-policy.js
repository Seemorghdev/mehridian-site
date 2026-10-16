// Source triggers, destination excerpts and index membership are independent.
// This module does not remove pages or relationships from Quartz's public index.
const approvedCaseExcerpts = { 'projects/edge-evidence': 'problem-title' };
export function pagePolicy(slug) {
  slug = String(slug).replace(/\.html$/, '').replace(/\/$/, '/index');
  if (slug === 'notes' || slug === 'projects') slug += '/index';
  if (slug.startsWith('notes/') || slug.startsWith('research/')) return { role: 'note', triggers: true, target: 'reading' };
  if (slug === 'index') return { role: 'home', triggers: false, target: null };
  if (slug === 'projects/index') return { role: 'projects-index', triggers: false, target: null };
  return { role: slug.startsWith('projects/') ? 'case-study' : 'other', triggers: false,
    target: approvedCaseExcerpts[slug] ? 'case-excerpt' : null,
    excerptHeading: approvedCaseExcerpts[slug] };
}

export function eligiblePreviewTarget(href, sourceSlug) {
  try {
    const origin = 'https://mehridian.invalid';
    const base = new URL(String(sourceSlug).replace(/index$/, ''), origin + '/');
    const url = new URL(href, base);
    if (url.origin !== origin) return false;
    const path = decodeURIComponent(url.pathname).replace(/^\//, '').replace(/\.(?:md|html)$/, '');
    return Boolean(pagePolicy(path || 'index').target);
  } catch { return false; }
}

export function previewLinkDisabled(properties, slug, authored = true) {
  return !authored || !pagePolicy(slug).triggers ||
    String(properties['data-no-popover']) === 'true' ||
    !eligiblePreviewTarget(properties.href, slug);
}

export function applyPagePolicy(tree, slug) {
  const policy = pagePolicy(slug);
  function visit(node, authored = false) {
    if (node.type === 'element') {
      const props = node.properties ??= {};
      // A destination must expose only its approved reading region.
      const classes = (props.className ?? []).filter(c => c !== 'popover-hint');
      if (props.id === 'mehr-content') {
        authored = true;
        props['data-page-role'] = policy.role;
        if (policy.target === 'reading') classes.push('popover-hint');
      }
      if (authored && policy.target === 'case-excerpt' &&
          node.tagName === 'section' && String(props.ariaLabelledBy) === policy.excerptHeading) {
        classes.push('popover-hint', 'mehr-preview-excerpt');
      }
      if (classes.length || props.className) props.className = classes;
      if (node.tagName === 'a') {
        props['data-no-popover'] = String(previewLinkDisabled(props, slug, authored));
      }
    }
    for (const child of node.children ?? []) visit(child, authored);
  }
  visit(tree);
}

// Backlinks are rendered by Quartz after the HAST transformer. Apply the same
// link policy to that component without patching Quartz or its generated output.
export function gateBacklinkPreviews(node, slug, cloneElement) {
  if (!node?.props) return node;
  const props = node.type === 'a'
    ? { 'data-no-popover': String(previewLinkDisabled(node.props, slug)) } : {};
  const children = node.props.children;
  if (children === undefined) return cloneElement(node, props);
  return cloneElement(node, props, ...(Array.isArray(children) ? children : [children])
    .map(child => Array.isArray(child) ? child.map(n => gateBacklinkPreviews(n, slug, cloneElement))
      : gateBacklinkPreviews(child, slug, cloneElement)));
}
