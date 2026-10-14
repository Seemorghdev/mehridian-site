// Compile reviewed source. Never edits installed-plugin or generated JS files.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from '../quartz-engine/node_modules/esbuild/lib/main.js';
import * as sass from '../quartz-engine/node_modules/sass/sass.node.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'theme/.graph-build');
fs.mkdirSync(output, {recursive:true});
const utils = path.join(root,'quartz-engine/node_modules/@quartz-community/utils');
const aliases = { '@quartz-community/utils':utils, '@quartz-community/utils/lang':path.join(utils,'dist/lang.js') };
await build({
  entryPoints:[path.join(root,'theme/graph/src/Graph.tsx')], outfile:path.join(output,'index.js'),
  bundle:true, format:'esm', platform:'node', target:'es2022', jsx:'automatic', jsxImportSource:'preact',
  alias:aliases,
  plugins:[{name:'source-resources',setup(parent){
    parent.onResolve({filter:/^preact(?:\/jsx-runtime)?$/},args=>({
      path:args.path==='preact'?'../../quartz-engine/node_modules/preact/dist/preact.module.js':'../../quartz-engine/node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js',external:true
    }));
    parent.onLoad({filter:/\.scss$/},args=>({contents:sass.compile(args.path).css,loader:'text'}));
    parent.onLoad({filter:/\.inline\.ts$/},async args=>{
      const compiled=await build({entryPoints:[args.path],bundle:true,write:false,minify:true,platform:'browser',format:'iife',target:'es2020',alias:aliases});
      return {contents:compiled.outputFiles[0].text,loader:'text'};
    });
  }}],
});
// Resolve Preact from the engine in both CI and local builds without bundling a
// second singleton. This is emitted by the compiler, not a post-build patch.
// esbuild's alias maps module specifiers directly to the engine singleton.
console.log('official_graph_source_build=pass');
