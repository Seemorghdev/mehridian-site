// Reuse the approved Mehridian mark (also used by Docs) instead of Quartz's
// default icon. This is a build-time overlay only; no engine source is committed.
import {readFileSync, writeFileSync} from 'node:fs';
import sharp from '../quartz-engine/node_modules/sharp/lib/index.js';

const source=readFileSync(new URL('../branding/favicon.svg',import.meta.url),'utf8');
if(!source.startsWith('<svg ') || /<(?:script|text|image|foreignObject)\b|(?:href|url)\s*[=(]/i.test(source))
  throw new Error('Favicon must be a self-contained, font-free SVG');
const png=await sharp(Buffer.from(source),{density:72})
  .resize(200,200).png({compressionLevel:9,adaptiveFiltering:false,palette:false}).toBuffer();
writeFileSync(new URL('../quartz-engine/quartz/static/icon.png',import.meta.url),png);
console.log('branding_input=Mehridian icon (200x200)');
