const CACHE_NAME = "starsoft-v1";
const RUNTIME_CACHE = "starsoft-runtime-v1";

const STATIC_ASSETS = [
  "/",
  "/favicon-32x32.png",
  "/favicon-16x16.png",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/site.webmanifest",
];

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error("Fetch failed:", error);
    const offlinePage = await cache.match("/offline.html");
    if (offlinePage) {
      return offlinePage;
    }
    throw error;
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log("[Service Worker] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  if (url.protocol === "chrome-extension:") {
    return;
  }

  if (url.origin === location.origin) {
    if (
      url.pathname.startsWith("/_next/static/") ||
      url.pathname.startsWith("/images/") ||
      url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/i)
    ) {
      event.respondWith(cacheFirst(request, CACHE_NAME));
    } else if (url.pathname.startsWith("/api/")) {
      event.respondWith(networkFirst(request, RUNTIME_CACHE));
    } else {
      event.respondWith(
        networkFirst(request, RUNTIME_CACHE).catch(() => {
          return caches.match("/");
        })
      );
    }
  } else {
    if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp)$/i)) {
      event.respondWith(cacheFirst(request, RUNTIME_CACHE));
    } else {
      event.respondWith(networkFirst(request, RUNTIME_CACHE));
    }
  }
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CACHE_URLS") {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});
