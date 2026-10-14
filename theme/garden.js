// A presentation adapter over Quartz's resolved authored links. No client library,
// force simulation, remote data, navigation-derived edges, or invented nodes.
export const normalizedSlug = slug => String(slug).replace(/\/index$/, "").replace(/\/$/, "") || "index";

export function localConnections(current, files) {
  const pages = new Map(files.filter(file => file.frontmatter?.visibility === "public" && file.unlisted !== true && file.frontmatter?.draft !== true)
    .map(file => [normalizedSlug(file.slug), file]));
  const slug = normalizedSlug(current.slug);
  const outgoing = new Set((current.mehridianLinks ?? []).map(normalizedSlug));
  const neighbors = [...pages.entries()]
    .filter(([key, file]) => key !== slug && (outgoing.has(key)
      || (file.mehridianLinks ?? []).some(link => normalizedSlug(link) === slug)))
    .map(([key, file]) => ({ slug: key, route: String(file.slug).replace(/\/index$/, "/"), title: String(file.frontmatter.title ?? key) }))
    .sort((a, b) => a.title.localeCompare(b.title, "en"));
  return { current: { slug, route: String(current.slug).replace(/\/index$/, "/"), title: String(current.frontmatter?.title ?? slug) }, neighbors };
}

export function graphGeometry(map) {
  // Show at most six neighbors in the compact diagram; the full linked text list
  // remains available. Two columns remain readable at a 320px mobile viewport.
  const shown = map.neighbors.slice(0, 6);
  const nodes = [{ ...map.current, x: 160, y: 57, width: 290, current: true },
    ...shown.map((node, index) => ({ ...node,
      x: shown.length === 1 ? 160 : index % 2 ? 240 : 80,
      y: 177 + Math.floor(index / 2) * 95, width: 144, current: false }))];
  return { height: shown.length ? 225 + Math.floor((shown.length - 1) / 2) * 95 : 115,
    nodes, edges: nodes.slice(1).map(node => `M160 89 C160 120 ${node.x} 120 ${node.x} ${node.y - 32}`) };
}

export function titleLines(title, limit) {
  const lines = [""];
  for (const word of title.split(/\s+/)) {
    const last = lines.length - 1;
    if (lines[last] && `${lines[last]} ${word}`.length > limit) lines.push(word);
    else lines[last] = `${lines[last]} ${word}`.trim();
  }
  return lines.slice(0, 3).map((line, i) => i === 2 && lines.length > 3 ? `${line}…` : line);
}
