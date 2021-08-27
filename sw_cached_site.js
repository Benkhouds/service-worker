const cacheName= 'v2'

self.addEventListener('install', e=>{
  console.log('service worker installed')
})

self.addEventListener('activate',e=>{
   console.log('service worker activated')
   async function clearUnwantedCache(){
    try{
      const cacheNames = await caches.keys()
      return Promise.all(cacheNames.map((cache)=>{
            if(cache != cacheName){
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
 if (e.request.url.indexOf('http') !== 0) return; 
  else{ e.respondWith(
    fetch(e.request)
    .then((res)=>{
       //make copy of response
       const resClone = res.clone()
       //open cache 
       caches.open(cacheName)
             .then((cache)=>{
               //add response the the cache
               cache.put(e.request.url, resClone)
             })
       return res;
    })
    .catch(()=>caches.match(e.request.url).then(res=>res))
   )
  }
})