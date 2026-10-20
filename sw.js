const CACHE_NAME = "vcryptoscope-v25";

const APP_FILES = [
  "./",
  "./index.html",
  "./analysis.html",
  "./backtest.html",
  "./news.html",
  "./quant.html",
  "./mobile.css",
  "./icon.svg?v=8",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(APP_FILES)
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("vcryptoscope-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Haber verisini eski önbellekten sunma.
  if (url.pathname.endsWith("/news.json")) {
    event.respondWith(fetch(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(request).then((cached) =>
          cached || caches.match("./index.html")
        )
      )
    );
  }
});
