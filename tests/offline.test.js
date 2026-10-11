import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

test('offline navigation and assets use only the app cache, even with other app caches on the origin',async()=>{
  const handlers={},opened=[];
  const ownCache={match:async input=>({body:(typeof input==='string'?input:input.url).endsWith('index.html')?'Daily Prep HTML':'Daily Prep asset'})};
  const context={URL,self:{location:{href:'https://example.test/daily-prep/sw.js',origin:'https://example.test'},addEventListener:(type,fn)=>handlers[type]=fn},fetch:async()=>{throw new Error('offline');},caches:{open:async version=>{opened.push(version);return ownCache;},match:async()=>({body:'Another app HTML'})}};
  vm.runInNewContext(await readFile(new URL('../public/sw.js',import.meta.url),'utf8'),context);
  for(const [mode,path,expected]of [['navigate','https://example.test/daily-prep/','Daily Prep HTML'],['cors','https://example.test/daily-prep/src/app.js','Daily Prep asset']]){
    let response;
    handlers.fetch({request:{method:'GET',mode,url:path},respondWith:p=>response=p});
    assert.equal((await response).body,expected);
  }
  assert.ok(opened.every(name=>name.startsWith('daily-prep-')));
  let intercepted=false;
  handlers.fetch({request:{method:'GET',mode:'navigate',url:'https://example.test/daily-fuel/'},respondWith:()=>intercepted=true});
  assert.equal(intercepted,false);
});
