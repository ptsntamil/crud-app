const FILES_TO_CACHE = [
  '/offline.html',
  '/404.html',
  '/index.html',
  'dist/js/chunk-vendors.1f3fa4c2.js',
'dist/js/app.89f45199.js',
'dist/service-worker.js',
'dist/js/about.c47c471e.js',
'dist/css/chunk-vendors.e231a253.css',
'dist/css/app.22b7f024.css'
];
const CACHE_NAME = "CRUD-PWA_1";
const DATA_CACHE_NAME = "DATA_CRUD-PWA_1";
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );  
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  // console.log('[ServiceWorker] Fetch', evt.request.url);
  // // CODELAB: Add fetch event handler here.
  // if (evt.request.mode !== 'navigate') {
  //   // Not a page navigation, bail.
  //   return;
  // }
  // evt.respondWith(fetch(evt.request).catch(_ => {
  //   return caches.open(CACHE_NAME).then(cache => {
  //     return cache.match('offline.html');
  //   });
  // }));
  if (evt.request.url.includes('reqres')) {
    console.log('[Service Worker] Fetch (data)', evt.request.url);
    evt.respondWith(
        caches.open(DATA_CACHE_NAME).then((cache) => {
            console.log("DATACACHE", cache);
          return fetch(evt.request)
              .then((response) => {
                // If the response was good, clone it and store it in the cache.
                if (response.status === 200) {
                  cache.put(evt.request.url, response.clone());
                }
                return response;
              }).catch((err) => {
                // Network request failed, try to get it from the cache.
                return cache.match(evt.request);
              });
        }));
    return;
  }
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              console.log("REQ",evt.request);
              console.log("res", response);
              return response || fetch(evt.request);
            });
      })
  );
})