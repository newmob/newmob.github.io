const staticCacheName = 'lotpwa-1.0.3';

var filesToCache = [
  'index.html',
  'lerbilhete.html',
  'offline.html',
  'service-worker.js',
  'manifest.json',
  'js/adapter-latest.js',
  'js/app.js',
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
  'img/icon-192x192.png',
  'img/icon-512x512.png',
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
  'img/icon-federal.png',
  'img/icon-coracao.png',
  'img/calendar.svg',
  'img/clock.svg',
  'data/780706100091344678939682011813.json',
  'data/780709341265343281301447000802.json',
  'data/780719712414062252264406014098.json',
  'data/780732693343505383339387011583.json',
  'data/780748153025420691160273017346.json',
  'data/780751136291420607239275001888.json',
  'html/dia_de_sorte_normal.html',
  'html/dupla_sena_normal.html',
  'html/loteca_normal.html',
  'html/lotofacil_normal.html',
  'html/lotogol_normal.html',
  'html/lotomania_normal.html',
  'html/mega_sena_normal.html',
  'html/quina_normal.html',
  'html/timemania_normal.html'
];

// faz o cache dos arquivos na instalação
this.addEventListener("install", event => {
  this.skipWaiting();

  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
    })
  )
});

// limpa o cache na ativação
this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => (cacheName.startsWith('lotpwa-')))
          .filter(cacheName => (cacheName !== staticCacheName))
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// tenta na rede se não conseguir pega os arquivos do cache
this.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

/* 
this.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(() => {
        return caches.match('offline.html');
      })
  )
});
*/