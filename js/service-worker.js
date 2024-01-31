const cacheName = 'appuntamenti-v1';
const filesToCache = [
  '/',
  '/manifest.json',
  '/index.html',
  '/css/style.css',
  '/js/popper.js',
  '/js/bootstrap.min.js',
  '/images/calendar-icon_34471.ico',
  // Aggiungi qui altri file che vuoi siano in cache offline
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (name) {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
