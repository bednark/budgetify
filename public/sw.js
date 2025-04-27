importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js");

if (workbox) {
  workbox.precaching.precacheAndRoute([
    { url: "/", revision: null },
    { url: "/wydatki", revision: null },
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

} else {
  console.error("Workbox failed to load");
}
