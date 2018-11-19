var dataCacheName = 'lotxData-v1';
var cacheName = 'lotxPWA-final-1';
var filesToCache = [
  'index.html',
  'lerbilhete.html',
  'service-worker.js',
  'manifest.json',
  'js/adapter-latest.js',
  'js/app.js',
  'js/extract.js',
  'js/itemslide.min.js',
  'js/jquery-1.11.0.min.js',
  'js/jquery-3.3.1.js',
  'js/jquery.mousewheel.min.js',
  'js/jquery.qrcode.min.js',
  'js/live_w_locator.js',
  'js/quagga.min.js',
  'js/scale.fix.js',
  'js/sliding.js',
  'css/example.css',
  'css/lerbilhete.css',
  'css/main.css',
  'css/pygment_trac.css',
  'css/reset.css',
  'css/sliding.css',
  'css/style.css',
  'css/styles.css',
  'img/favicon.ico',
  'img/icon-180x180.png',
  'img/icon-barcode.png',
  'img/icon-close.png',
  'img/icon-diadesorte.png',
  'img/icon-duplasena.png',
  'img/icon-loteca.png',
  'img/icon-lotofacil.png',
  'img/icon-lotogol.png',
  'img/icon-lotomania.png',
  'img/icon-megasena.png',
  'img/icon-quina.png',
  'img/icon-resultado.png',
  'img/icon-timemania.png',
  'data/780706100091344678939682011813.json',
  'data/780709341265343281301447000802.json',
  'data/780719712414062252264406014098.json',
  'data/780732693343505383339387011583.json',
  'data/780748153025420691160273017346.json',
  'data/780751136291420607239275001888.json',
  'data/destaque.json'  
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

  return self.clients.claim();
});
