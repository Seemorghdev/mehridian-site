// Local-only study pages. Never put these in content/ or the Obsidian source.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { heroMarkup } from "../theme/hero.js";
const root = new URL("../", import.meta.url);
const home=readFileSync(new URL("preview/index.html",root),"utf8");
// Review-only subpaths are not real Quartz pages; omit its runtime, which would
// otherwise request a content index relative to the unregistered review route.
const reviewHome=home.replace(/<script\b[\s\S]*?<\/script>/g,"");
mkdirSync(new URL("preview/review/",root),{recursive:true});
for (const direction of ["meridian","flight","signals"]) {
  let html=reviewHome.replace(/<svg(?=[^>]*class="mehr-hero-art)[\s\S]*?<\/svg>/,heroMarkup(direction));
  // Keep the exact homepage context; review-only links/assets resolve one level up.
  html=html.replaceAll('href="./','href="../').replaceAll('src="./','src="../');
  html=html.replace('</head>','<style>.meridian-traveller,.meridian-companion{animation:none!important}.hero-motion-control{display:none!important}</style></head>');
  writeFileSync(new URL(`preview/review/${direction}.html`,root),html);
}
// Deterministic fixture for the reduced-motion styling when OS preference cannot
// be emulated through the browser reviewer API. It does not change OS settings.
writeFileSync(new URL("preview/review/reduced-motion.html",root),reviewHome.replaceAll('href="./','href="../').replaceAll('src="./','src="../').replace('</head>','<style>.meridian-traveller,.meridian-companion{animation:none!important}.hero-motion-control{display:none!important}</style></head>'));
// Offline review artifact: existing homepage + native animation, no scripts or
// network-loaded assets. This file stays in ignored preview/, not public content.
let offline=home.replace(/<script\b[\s\S]*?<\/script>/g,"");
offline=offline.replace(/<link\b[^>]*>/g,tag=>{
  if (!/rel="stylesheet"/.test(tag)) return "";
  const href=tag.match(/href="([^"]+)"/)?.[1];
  if (!href || !href.startsWith("./")) throw new Error("Unexpected non-local review stylesheet");
  return `<style>${readFileSync(new URL(`preview/${href.slice(2)}`,root),"utf8")}</style>`;
});
const photo=readFileSync(new URL("content/assets/edge-evidence-gateway.jpg",root)).toString("base64");
offline=offline.replaceAll('src="./assets/edge-evidence-gateway.jpg"',`src="data:image/jpeg;base64,${photo}"`);
offline=offline.replaceAll('href="./','href="https://seemorghdev.github.io/mehridian-site/');
writeFileSync(new URL("preview/review/prototype.html",root),offline);
console.log("local review directions and static fallback prepared");
