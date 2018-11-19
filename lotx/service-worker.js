var dataCacheName = 'lotxData-v1';
var cacheName = 'lotxPWA-final-1';
var filesToCache = [
  'https://newmob.github.io/lotx/index.html',
  'https://newmob.github.io/lotx/lerbilhete.html',
  'https://newmob.github.io/lotx/js/adapter-latest.js',
  'https://newmob.github.io/lotx/js/app.js',
  'https://newmob.github.io/lotx/js/extract.js',
  'https://newmob.github.io/lotx/js/itemslide.min.js',
  'https://newmob.github.io/lotx/js/jquery-1.11.0.min.js',
  'https://newmob.github.io/lotx/js/jquery-3.3.1.js',
  'https://newmob.github.io/lotx/js/jquery.mousewheel.min.js',
  'https://newmob.github.io/lotx/js/jquery.qrcode.min.js',
  'https://newmob.github.io/lotx/js/live_w_locator.js',
  'https://newmob.github.io/lotx/js/quagga.min.js',
  'https://newmob.github.io/lotx/js/scale.fix.js',
  'https://newmob.github.io/lotx/js/sliding.js',
  'https://newmob.github.io/lotx/css/example.css',
  'https://newmob.github.io/lotx/css/lerbilhete.css',
  'https://newmob.github.io/lotx/css/main.css',
  'https://newmob.github.io/lotx/css/pygment_trac.css',
  'https://newmob.github.io/lotx/css/reset.css',
  'https://newmob.github.io/lotx/css/sliding.css',
  'https://newmob.github.io/lotx/css/style.css',
  'https://newmob.github.io/lotx/css/styles.css',
  'https://newmob.github.io/lotx/img/favicon.ico',
  'https://newmob.github.io/lotx/img/icon-180x180.png',
  'https://newmob.github.io/lotx/img/icon-barcode.png',
  'https://newmob.github.io/lotx/img/icon-close.png',
  'https://newmob.github.io/lotx/img/icon-diadesorte.png',
  'https://newmob.github.io/lotx/img/icon-duplasena.png',
  'https://newmob.github.io/lotx/img/icon-loteca.png',
  'https://newmob.github.io/lotx/img/icon-lotofacil.png',
  'https://newmob.github.io/lotx/img/icon-lotogol.png',
  'https://newmob.github.io/lotx/img/icon-lotomania.png',
  'https://newmob.github.io/lotx/img/icon-megasena.png',
  'https://newmob.github.io/lotx/img/icon-quina.png',
  'https://newmob.github.io/lotx/img/icon-resultado.png',
  'https://newmob.github.io/lotx/img/icon-timemania.png',
  'https://newmob.github.io/lotx/data/780706100091344678939682011813.json',
  'https://newmob.github.io/lotx/data/780709341265343281301447000802.json',
  'https://newmob.github.io/lotx/data/780719712414062252264406014098.json',
  'https://newmob.github.io/lotx/data/780732693343505383339387011583.json',
  'https://newmob.github.io/lotx/data/780748153025420691160273017346.json',
  'https://newmob.github.io/lotx/data/780751136291420607239275001888.json',
  'https://newmob.github.io/lotx/data/destaque.json'  
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
