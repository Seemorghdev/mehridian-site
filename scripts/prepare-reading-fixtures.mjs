// Local QA fixtures only. Never invoked by a deployment workflow or added to
// authored content / contentIndex. Only existing approved pages are referenced.
import fs from 'node:fs';
const out=new URL('../preview/review-fixtures/',import.meta.url);
fs.mkdirSync(out,{recursive:true});
const note=fs.readFileSync(new URL('../preview/notes/agent-vs-deterministic-inspector.html',import.meta.url),'utf8');
const links=note.replace('<div id="mehr-content"','<p><a class="internal" href="../notes/agent-vs-deterministic-inspector#proposed-experiment-adk--ollama">Anchor preview</a> · <a class="internal" href="../projects/edge-evidence">Relative page preview</a></p><div id="mehr-content"');
fs.writeFileSync(new URL('links.html',out),links);
const motion=note.replace('<head>','<head><script>const originalMedia=window.matchMedia.bind(window);window.matchMedia=query=>query.includes("prefers-reduced-motion")?{matches:true,addEventListener(){},removeEventListener(){}}:originalMedia(query);</script>').replace('</head>','<style>.graph-enable,.native-graph-host,.hero-motion-control{display:none!important}.graph-motion-notice{display:block!important}.popover{animation:none!important;transition:none!important}</style></head>');
fs.writeFileSync(new URL('reduced-motion.html',out),motion);
const blocked=note.replace('<head>','<head><script>Object.defineProperty(window,"localStorage",{get(){throw new DOMException("Controlled unavailable storage")}});</script>');
fs.writeFileSync(new URL('blocked-storage.html',out),blocked);
console.log('local_reading_fixtures=prepared_not_indexed');
