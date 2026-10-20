// Fail closed if Quartz copied its default mark or generated a mismatched favicon.
// Uses the exact pinned build dependency; checks the actual emitted public files.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import sharp from '../quartz-engine/node_modules/sharp/lib/index.js';

const output=process.argv[2]??'preview';
if(!['preview','quartz-engine/public'].includes(output))throw new Error('Unexpected output directory');
const source=readFileSync(new URL('../branding/favicon.svg',import.meta.url),'utf8');
const expected=await sharp(Buffer.from(source),{density:72})
  .resize(200,200).png({compressionLevel:9,adaptiveFiltering:false,palette:false}).toBuffer();
const actual=readFileSync(new URL('../'+output+'/static/icon.png',import.meta.url));
assert.deepEqual(actual,expected,'Built icon.png differs from the reviewed Mehridian mark');
const ico=readFileSync(new URL('../'+output+'/favicon.ico',import.meta.url));
const icoMeta=await sharp(ico).metadata();
assert.equal(icoMeta.width,48);
assert.equal(icoMeta.height,48);
const actualPixels=await sharp(ico).ensureAlpha().raw().toBuffer();
const expectedPixels=await sharp(expected).resize(48,48).ensureAlpha().raw().toBuffer();
assert.deepEqual(actualPixels,expectedPixels,'Built favicon.ico does not match the branded source');
console.log('branded_favicon_png_ico=pass');
