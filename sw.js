const CACHE_NAME = 'alpha-collection-v4';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './games/alphabet/index.html',
  './games/alphabet/style.css',
  './games/alphabet/game.js',
  './games/alphabet/i18n.js',
  './games/country-locator/index.html',
  './games/country-locator/style.css',
  './games/country-locator/map-data.js',
  './games/country-locator/game.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});