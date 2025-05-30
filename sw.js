const CACHE_NAME = 'fccascgf-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/img/UNETE1.jpg',
  '/img/UNETE2.png',
  '/img/UNETE3.png',
  '/img/CANDIDATO1.png',
  '/img/CANDIDATO2.png',
  '/img/CANDIDATO3.png',
  '/img/CANDIDATO4.png',
  '/img/NOTICIA1.png',
  '/img/NOTICIA2.png',
  '/img/NOTICIA3.png',
  '/img/LIGA UNIVESITARIA.jpeg',
  '/img/icon-192x192.png',
  '/img/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
}); 