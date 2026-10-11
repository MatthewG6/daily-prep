import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve(process.argv[2]||'dist'),port=Number(process.env.PORT||4174);
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.woff2':'font/woff2','.svg':'image/svg+xml','.png':'image/png'};
http.createServer(async(req,res)=>{
  try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname),file=resolve(root,'.'+path);if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}const meta=await stat(file),target=meta.isDirectory()?resolve(file,'index.html'):file;res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(await readFile(target));}
  catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Daily Prep: http://127.0.0.1:${port}/`));
