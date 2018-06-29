var dataCacheName = 'coffeeData-v1';
var cacheName = 'coffeePWA-final-1';
var filesToCache = [
  '/coffeeshop',
  '/coffeeshop/index.html',
  '/coffeeshop/scripts/app.js',
  '/coffeeshop/scripts/jquery.qrcode.min.js',
  '/coffeeshop/scripts/jquery-3.3.1.js',
  '/coffeeshop/images/caixa.png',
  '/coffeeshop/images/cafe1.jpg',
  '/coffeeshop/images/cafe2.jpg',
  '/coffeeshop/images/cafe3.jpg',
  '/coffeeshop/images/cafe4.jpg',
  '/coffeeshop/images/cafe5.jpg',
  '/coffeeshop/images/cafe6.jpg',
  '/coffeeshop/images/cafe7.jpg',
  '/coffeeshop/images/cafe8.jpg',
  '/coffeeshop/images/icons/icon-192x192.png',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});
