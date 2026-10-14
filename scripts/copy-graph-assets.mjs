import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const dest=path.resolve(process.argv[2]??path.join(root,'preview'),'static/graph');
fs.mkdirSync(dest,{recursive:true});
for(const [source,target] of [
 ['d3/dist/d3.min.js','d3-7.9.0.min.js'],
 ['pixi.js/dist/pixi.min.js','pixi-8.18.0.min.js'],
 ['d3/LICENSE','D3-LICENSE'], ['pixi.js/LICENSE','PIXI-LICENSE'],
]) fs.copyFileSync(path.join(root,'theme/graph/node_modules',source),path.join(dest,target));
// Retain license notices for bundled transitive packages as well as the two
// top-level libraries. These are static attribution, not additional runtime code.
const modules=path.join(root,'theme/graph/node_modules');
const packages=fs.readdirSync(modules).filter(n=>!n.startsWith('.')).flatMap(n=>
  n.startsWith('@')?fs.readdirSync(path.join(modules,n)).map(p=>n+'/'+p):[n]);
for(const name of packages){
  const directory=path.join(modules,name);
  if(!fs.statSync(directory).isDirectory())continue;
  for(const file of fs.readdirSync(directory).filter(f=>/^(LICENSE|LICENCE|COPYING|NOTICE)(?:\.|$)/i.test(f))){
    const target=path.join(dest,'licenses',name,file);
    fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(directory,file),target);
  }
}
console.log('pinned_local_graph_assets=pass');
