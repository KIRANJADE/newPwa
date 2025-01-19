const CACHE_NAME = 'my-app-cache-v2';
const OFFLINE_PAGE = '/offline.html';

// Install Service Worker and Cache Static Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Activate worker immediately
});

// Activate Service Worker and Clear Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
  self.clients.claim(); // Claim clients immediately
});

// Fetch Requests with Offline Support and Dynamic Caching
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) =>
      response ||
      fetch(event.request)
        .then((fetchResponse) => {
          // Cache dynamically fetched files
          if (
            event.request.destination === 'style' ||
            event.request.destination === 'script' ||
            event.request.destination === 'image'
          ) {
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return fetchResponse;
        })
        .catch(() => caches.match(OFFLINE_PAGE))
    )
  );
});

// Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-cache') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) =>
        fetch('/data.json')
          .then((response) => response.json())
          .then((data) => {
            const response = new Response(JSON.stringify(data), {
              headers: { 'Content-Type': 'application/json' },
            });
            return cache.put('/data.json', response);
          })
      )
    );
  }
});

// Periodic Sync (Requires registration in app)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'periodic-cache-update') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) =>
        fetch('/data.json')
          .then((response) => response.json())
          .then((data) => {
            const response = new Response(JSON.stringify(data), {
              headers: { 'Content-Type': 'application/json' },
            });
            return cache.put('/data.json', response);
          })
      )
    );
  }
});

// Push Notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Notification';
  const options = {
    body: data.body || 'You have a new message.',
    icon: '/logo192.png',
    badge: '/badge.png',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});