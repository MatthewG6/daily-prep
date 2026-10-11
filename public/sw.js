const VERSION='daily-prep-v1';
const BASE=new URL('./',self.location.href).href;
const PRECACHE=['./','index.html'];
self.addEventListener('install',event=>event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(PRECACHE.map(path=>new URL(path,BASE).href)))));
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('daily-prep-')&&key!==VERSION).map(key=>caches.delete(key)))),self.clients.claim()])));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(BASE))return;
  if(request.mode==='navigate')event.respondWith(fetch(request).catch(()=>caches.open(VERSION).then(cache=>cache.match(new URL('index.html',BASE).href))));
  else event.respondWith(caches.open(VERSION).then(cache=>cache.match(request)).then(cached=>cached||fetch(request)));
});
