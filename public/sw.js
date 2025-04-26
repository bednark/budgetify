importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js");

if (workbox) {
  workbox.precaching.precacheAndRoute([
    { url: "/", revision: null },
    { url: "/offline", revision: null },
    { url: "/favicon.ico", revision: null },
    { url: "manifest.webmanifest", revision: null },
    { url: "/icons/android-chrome-192x192.png", revision: null },
    { url: "/icons/android-chrome-512x512.png", revision: null }
  ]);

  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith("/_next/static/"),
    new workbox.strategies.CacheFirst({
      cacheName: "static-resources",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ request }) => request.mode === "navigate",
    new workbox.strategies.NetworkFirst({
      cacheName: "pages",
    })
  );

  workbox.routing.setCatchHandler(async ({ event }) => {
    if (event.request.destination === "document") {
      return caches.match("/offline");
    }
    return Response.error();
  });

} else {
  console.error("Failed to load Workbox. No offline support.");
}
