const cacheName= 'v1'
const cacheAssets= ['/','./index.html','./about.html','./js/main.js','./css/tailwind.css']

self.addEventListener('install', e=>{
  console.log('service worker installed')
  async function preCache(){
    try{
      const cache = await caches.open(cacheName)
      await cache.addAll(cacheAssets)
      return self.skipWaiting()
    }catch(err){
          return err
    }
  }
  e.waitUntil(preCache())
})

self.addEventListener('activate',e=>{
   console.log('service worker activated')
   async function clearUnwantedCache(){
    try{
      const cacheNames = await caches.keys()
      return Promise.all(cacheNames.map((cache)=>{
            if(cache !== cacheName){
              return caches.delete(cache)
            }
      } 
      ))

    }catch(err){
     return err
    }
   }
   e.waitUntil(clearUnwantedCache())
})

//showing files when offline
self.addEventListener('fetch', (e)=>{
 console.log('service worker fetching')
   e.respondWith(
    fetch(e.request).catch(()=>caches.match(e.request.url))
   )
})