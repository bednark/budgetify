importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js");

if (workbox) {
  workbox.precaching.precacheAndRoute([
    { url: "/offline", revision: null },
    { url: "/favicon.ico", revision: null },
    { url: "/manifest.webmanifest", revision: null },
    { url: "/icons/android-chrome-192x192.png", revision: null },
    { url: "/icons/android-chrome-512x512.png", revision: null }
  ]);

  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith('/_next/') || url.pathname.startsWith('/static/'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'next-static-assets',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'style' || request.destination === 'font' || request.destination === 'image',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'assets',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages',
      networkTimeoutSeconds: 5,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 7,
        }),
      ],
    })
  );

  workbox.routing.setCatchHandler(async ({ event }) => {
    if (event.request.destination === 'document') {
      return caches.match('/offline');
    }
    return Response.error();
  });

  self.addEventListener('push', function(event) {
    console.log('Odebrano push event:', event);
  
    let data = {};
    try {
      data = event.data.json();
    } catch (e) {
      data = { 
        title: 'Budgetify', 
        body: event.data.text()
      };
    }
  
    const title = data.title || 'Powiadomienie Budgetify';
    const options = {
      body: data.body || 'Masz nowe wydarzenie w swoim budżecie!',
      icon: '/icons/android-chrome-192x192.png',
      badge: '/icons/android-chrome-192x192.png'
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });

} else {
  console.error("Workbox nie załadował się");
}
