const CACHE_NAME = 'isaakiy-roof-offline-v10';
const APP_CACHE_PREFIX = 'isaakiy-roof-offline-';
const CORE_LOCAL_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './sw.js'
];
const STATIC_ASSETS = [
  ...CORE_LOCAL_ASSETS,
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32x32.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js'
];

const OFFLINE_FALLBACK_URL = './index.html';
const APP_BASE_URL = new URL('./', self.location.href);
const STATIC_ASSET_URLS = new Set(STATIC_ASSETS.map(function(asset) {
  return new URL(asset, APP_BASE_URL).href;
}));

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async function(cache) {
      await cache.addAll(CORE_LOCAL_ASSETS);
      const extraAssets = STATIC_ASSETS.slice(CORE_LOCAL_ASSETS.length);
      const results = await Promise.allSettled(
        extraAssets.map(function(url) {
          return cache.add(url);
        })
      );
      results.forEach(function(res, idx) {
        if (res.status === 'rejected') {
          console.warn('[SW] Failed to pre-cache optional asset:', extraAssets[idx], res.reason);
        }
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name.indexOf(APP_CACHE_PREFIX) === 0 && name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  const request = event.request;
  if (request.method !== 'GET') return;

  const requestURL = new URL(request.url);
  const isAppAsset = STATIC_ASSET_URLS.has(requestURL.href);
  const isNavigation = request.mode === 'navigate';

  if (isNavigation || isAppAsset) {
    event.respondWith((async function() {
      const cache = await caches.open(CACHE_NAME);
      try {
        const networkResponse = await fetch(request, { cache: 'no-cache' });
        if (networkResponse.ok && (isNavigation || isAppAsset)) {
          await cache.put(isNavigation ? OFFLINE_FALLBACK_URL : request, networkResponse.clone());
        }
        return networkResponse;
      } catch (err) {
        console.warn('[SW] Network fetch failed; using cached app shell:', err);
        const cachedResponse = await cache.match(isNavigation ? OFFLINE_FALLBACK_URL : request);
        if (cachedResponse) return cachedResponse;
        if (!isNavigation) {
          return new Response('', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' }
          });
        }
        return Response.error();
      }
    })());
    return;
  }

  event.respondWith(caches.match(request).then(function(cachedResponse) {
    if (cachedResponse) return cachedResponse;
    return fetch(request).catch(function() {
      return new Response('', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'text/plain' }
      });
    });
  }));
});

self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
