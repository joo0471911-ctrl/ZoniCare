// Bump VERSION whenever you change prices or products, so customers get the new files.
var VERSION = 'zoni-v9';
var FILES = ["./", "index.html", "manifest.webmanifest", "apple-touch-icon.png", "favicon.png", "g10a.jpg", "g10b.jpg", "g10c.jpg", "g11a.jpg", "g11b.jpg", "g11c.jpg", "g12a.jpg", "g12b.jpg", "g12c.jpg", "g13a.jpg", "g13b.jpg", "g13c.jpg", "g14a.jpg", "g14b.jpg", "g14c.jpg", "g15a.jpg", "g15b.jpg", "g15c.jpg", "g16a.jpg", "g16b.jpg", "g16c.jpg", "g17a.jpg", "g17b.jpg", "g17c.jpg", "g18a.jpg", "g18b.jpg", "g18c.jpg", "g1a.jpg", "g1b.jpg", "g1c.jpg", "g2a.jpg", "g2b.jpg", "g2c.jpg", "g3a.jpg", "g3b.jpg", "g3c.jpg", "g4a.jpg", "g4b.jpg", "g4c.jpg", "g5a.jpg", "g5b.jpg", "g5c.jpg", "g6a.jpg", "g6b.jpg", "g6c.jpg", "g7a.jpg", "g7b.jpg", "g7c.jpg", "g8a.jpg", "g8b.jpg", "g8c.jpg", "g9a.jpg", "g9b.jpg", "g9c.jpg", "icon-192.png", "icon-512.png", "l-apple.png", "l-bank.png", "l-bkash.png", "l-card.png", "l-nagad.png", "l-play.png", "l-rocket.png", "logo.png", "maskable-512.png", "p1.jpg", "p10.jpg", "p12.jpg", "p17.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg", "p6.jpg", "p7.jpg", "t10n.jpg", "t11n.jpg", "t12n.jpg", "t13n.jpg", "t14n.jpg", "t15n.jpg", "t16n.jpg", "t17n.jpg", "t18n.jpg", "t1n.jpg", "t2n.jpg", "t3n.jpg", "t4n.jpg", "t5n.jpg", "t6n.jpg", "t7n.jpg", "t8n.jpg", "t9b.jpg", "t9n.jpg"];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;   // WhatsApp, Facebook and fonts always go to the network
  e.respondWith(
    fetch(e.request).then(function (r) {
      var copy = r.clone(); caches.open(VERSION).then(function (c) { c.put(e.request, copy); }); return r;
    }).catch(function () { return caches.match(e.request).then(function (m) { return m || caches.match('index.html'); }); })
  );
});
