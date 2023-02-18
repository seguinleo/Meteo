'use strict';

// Version du cache
const cacheName = 'v1';

// Liste des fichiers à mettre en cache
const cacheFiles = [
  './',
  './index.html',
  './assets/icons/icon48.png',
  './assets/icons/icon72.png',
  './assets/icons/icon96.png',
  './assets/icons/icon144.png',
  './assets/icons/icon168.png',
  './assets/icons/icon196.png',
  './assets/icons/icon256.png',
  './assets/icons/icon512.png',
  './assets/icons/sun.png',
  './assets/icons/sunnight.png',
  './assets/icons/clouds.png',
  './assets/icons/fewclouds.png',
  './assets/icons/fewcloudsnight.png',
  './assets/icons/haze.png',
  './assets/icons/hazenight.png',
  './assets/icons/shower.png',
  './assets/icons/snow.png',
  './assets/icons/thunder.png',
  './assets/icons/rain.png',
  './logo512.png',
];

// Installation du service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(cacheFiles);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              return caches.delete(cache);
            }
          })
        );
      })
  );
});

// Mise en cache des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            const responseClone = response.clone();
            caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, responseClone);
              });
            return response;
          });
      })
  );
});

// Stratégie de mise à jour du cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => {
        return cache.match(event.request)
          .then(response => {
            if (response) {
              fetch(event.request)
                .then(response => {
                  cache.put(event.request, response);
                });
              return response;
            }
            return fetch(event.request);
          });
      })
  );
});

// Stratégie de mise en cache des réponses de type "opaque"
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin) && event.request.mode === 'no-cors') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(cacheName)
            .then(cache => {
              cache.put(event.request, responseClone);
            });
          return response;
        })
    );
  }
});
