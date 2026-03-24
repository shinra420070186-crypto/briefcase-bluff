// Cache name for this version of the PWA
const cacheName = 'deck-bluff-pwa-v1';

// Initial roster of essential files to cache
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/src/main.jsx',
  '/src/store.js',
  '/src/sfx.js',
  '/src/GameBoard.jsx'
];

// 1. Install Event: Cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Service Worker: Caching files');
      return cache.addAll(filesToCache);
    })
  );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          console.log('Service Worker: Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// 3. Fetch Event: Cache-First Strategy with Network Fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Check cache first
      if (response) {
        console.log('Service Worker: Returning from cache', event.request.url);
        return response;
      }
      // If not in cache, fallback to network
      console.log('Service Worker: Fetching from network', event.request.url);
      return fetch(event.request);
    })
  );
});
