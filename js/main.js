if('serviceWorker' in navigator){
  window.addEventListener('load',async()=>{
   try{
     const registration = await navigator.serviceWorker.register('/service-worker/sw_cached_site.js')
     console.log(`service worker registered`)
     console.log(registration)

   }catch(err){
     console.log(`Service Worker didn't register : ${err}`)
   }

  })
}