// Restore the checked project tree from the source archive during deployment.
// This keeps the existing repository/domain connection while using native Next.js.
import { unzipSync } from 'fflate';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
const prefix='luxore-project/',root=process.cwd();
const directories=['app/','lib/','db/','components/','hooks/','public/','drizzle/'];
const files=['next.config.ts','postcss.config.mjs','tsconfig.json','components.json'];
const entries=unzipSync(readFileSync('luxore-project-source.zip'));
let count=0;
for(const [entry,bytes] of Object.entries(entries)){
  if(!entry.startsWith(prefix))throw new Error('Unexpected archive root');
  const name=entry.slice(prefix.length);
  if(name.endsWith('/')||(!directories.some(p=>name.startsWith(p))&&!files.includes(name)))continue;
  const target=resolve(root,name);
  if(!target.startsWith(root+sep)||name.split('/').includes('..'))throw new Error('Unsafe archive path');
  mkdirSync(dirname(target),{recursive:true});writeFileSync(target,bytes);count++;
}
for(const name of ['app/page.tsx','lib/mobility/server.ts','db/sqlite.ts']){
  if(!entries[prefix+name])throw new Error('Missing required source: '+name);
}
console.log('Prepared '+count+' independent application files.');
