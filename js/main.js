if('serviceWorker' in navigator){
  window.addEventListener('load',async()=>{
   try{
     const registration = await navigator.serviceWorker.register('./../sw_cached_pages.js')
     console.log(`service worker registered`)
     console.log(registration)

   }catch(err){
     console.log(`Service Worker didn't register : ${err}`)
   }

  })
}