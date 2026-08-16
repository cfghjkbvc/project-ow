/* Odd Word service worker.

   Strategy is deliberately blunt because the app is a single bundle with a
   handful of static assets and no server:

   - the app shell is precached on install, so a cold start with no signal works
   - fonts and art are cache-first and never revalidated (they are immutable;
     new art means a new filename)
   - everything else is network-first with a cache fallback

   Bump VERSION whenever you deploy. The old cache is dropped on activate.
*/

const VERSION = "odd-word-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(SHELL))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const immutable = (url) =>
  /\/(fonts|art|assets)\//.test(url) || /\.(woff2|webp|png|svg|css|js)$/.test(url);

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (immutable(url.pathname)) {
    e.respondWith(
      caches.match(req).then((hit) =>
        hit ||
        fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
          return res;
        })
      )
    );
    return;
  }

  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match("./index.html")))
  );
});
