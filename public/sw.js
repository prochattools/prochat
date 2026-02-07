// No-op service worker placeholder.
// Prevents noisy 404 requests from browsers/extensions expecting /sw.js.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})
