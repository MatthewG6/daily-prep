import {cp,mkdir,readFile,writeFile,readdir,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {recipes} from '../src/catalog.js';
import {validateRecipe} from '../src/model.js';
recipes.forEach(validateRecipe);
await rm('dist',{recursive:true,force:true});await mkdir('dist');
await cp('public','dist',{recursive:true});await cp('src','dist/src',{recursive:true});await cp('index.html','dist/index.html');
const files=[];
async function collect(dir,prefix=''){for(const e of await readdir(dir,{withFileTypes:true})){const p=prefix+e.name;if(e.isDirectory())await collect(`${dir}/${e.name}`,`${p}/`);else if(e.name!=='sw.js')files.push(p);}}
await collect('dist');files.sort();const hash=createHash('sha256');for(const f of files)hash.update(await readFile(`dist/${f}`));
let sw=await readFile('dist/sw.js','utf8');hash.update(sw);sw=sw.replace("'daily-prep-v1'",`'daily-prep-${hash.digest('hex').slice(0,12)}'`).replace(/^const PRECACHE=.*;$/m,`const PRECACHE=${JSON.stringify(['./',...files])};`);await writeFile('dist/sw.js',sw);
console.log(`Built ${recipes.length} recipes. Offline shell includes ${files.length} local assets.`);
