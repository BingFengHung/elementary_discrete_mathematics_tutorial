---
layout: null
---
'use strict';
const SCOPE = new URL(self.registration.scope).pathname;
const PREFIX = 'math21-' + encodeURIComponent(SCOPE) + '-';
const CACHE = PREFIX + '{{ site.time | date: "%s" }}-v1';
const PRECACHE = [
  {{ '/' | relative_url | jsonify }},
  {{ '/offline.html' | relative_url | jsonify }},
  {{ '/404.html' | relative_url | jsonify }},
  {{ '/assets/css/style.css' | relative_url | jsonify }},
  {{ '/assets/js/app.js' | relative_url | jsonify }},
  {{ '/manifest.webmanifest' | relative_url | jsonify }},
  {{ '/assets/icons/icon.svg' | relative_url | jsonify }},
  {{ '/assets/icons/icon-192.png' | relative_url | jsonify }},
  {{ '/assets/icons/icon-512.png' | relative_url | jsonify }},
  {{ '/assets/icons/maskable-512.png' | relative_url | jsonify }},
  {{ '/assets/icons/apple-touch-icon.png' | relative_url | jsonify }}{% assign lessons = site.lessons | sort: 'day' %}{% for lesson in lessons %},
  {{ lesson.url | relative_url | jsonify }}{% endfor %}
];
const ALLOWED = new Set(PRECACHE.map(p => new URL(p, self.location.origin).href));
const fillCache = async () => { const cache = await caches.open(CACHE); await cache.addAll(PRECACHE.map(url => new Request(url, {cache:'reload'}))); };
self.addEventListener('install', event => { event.waitUntil(fillCache()); });
self.addEventListener('activate', event => { event.waitUntil((async () => { const names = await caches.keys(); await Promise.all(names.filter(name => name.startsWith(PREFIX) && name !== CACHE).map(name => caches.delete(name))); await self.clients.claim(); })()); });
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') { event.waitUntil(self.skipWaiting()); return; }
  if (!['STATUS', 'CACHE_ALL'].includes(event.data?.type)) return;
  event.waitUntil((async () => {
    try {
      if (event.data.type === 'CACHE_ALL') await fillCache();
      const cache = await caches.open(CACHE);
      const entries = await Promise.all(PRECACHE.map(url => cache.match(url)));
      event.ports[0]?.postMessage({ok:true, complete:entries.every(Boolean), count:entries.filter(Boolean).length, total:PRECACHE.length});
    } catch (error) { event.ports[0]?.postMessage({ok:false,error:String(error)}); }
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(SCOPE)) return;
  url.search = ''; url.hash = '';
  if (url.pathname.endsWith('/index.html')) url.pathname = url.pathname.slice(0, -10);
  if (!ALLOWED.has(url.href) && event.request.mode !== 'navigate') return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (event.request.mode !== 'navigate' && ALLOWED.has(url.href)) {
      const cached = await cache.match(url.href); if (cached) return cached;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    try {
      const response = await fetch(event.request, {signal:controller.signal});
      if (response.ok && ALLOWED.has(url.href)) { try { await cache.put(url.href, response.clone()); } catch (_) { /* Reading can continue even when storage is full. */ } }
      if (response.status >= 500) { const cached = await cache.match(url.href); if (cached) return cached; }
      return response;
    } catch (_) {
      const cached = await cache.match(url.href); if (cached) return cached;
      if (event.request.mode === 'navigate') { const fallback = await cache.match({{ '/offline.html' | relative_url | jsonify }}); if (fallback) return fallback; }
      return new Response('Offline', {status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
    } finally { clearTimeout(timer); }
  })());
});
