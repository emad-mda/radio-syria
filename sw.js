// عامل الخدمة: يحفظ ملفات التطبيق ليفتح بسرعة وحتى دون اتصال.
// لا يتدخل أبداً في روابط البث أو دليل المحطات.
var CACHE = 'radio-syria-v7';
var SHELL = [
  './', 'index.html', 'css/app.css', 'js/stations.js', 'js/proxy.js', 'js/app.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

// منبّه الصباح: الوسيط يرسل إشعاراً بلا نص، ونعرض الرسالة هنا
self.addEventListener('push', function (e) {
  e.waitUntil(self.registration.showNotification('راديو سوريا ⏰', {
    body: 'صباح الخير — اضغط لتشغيل محطتك',
    icon: 'icons/icon-192.png',
    tag: 'alarm',
    renotify: true
  }));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    if (list.length) {
      list[0].postMessage({ alarm: 1 });
      return list[0].focus();
    }
    return self.clients.openWindow('./?alarm=1');
  }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  // ملفات التطبيق: من الشبكة أولاً لتصل التحديثات فوراً، ومن الذاكرة عند انقطاع الاتصال
  if (url.origin === self.location.origin) {
    // no-cache: يتحقق من الخادم في كل مرة (GitHub Pages يحفظ الملفات 10 دقائق في ذاكرة المتصفح)
    e.respondWith(fetch(req, { cache: 'no-cache' }).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); });
      return res;
    }).catch(function () {
      return caches.match(req).then(function (r) { return r || caches.match('index.html'); });
    }));
    return;
  }

  // الخطوط: من الذاكرة أولاً
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      });
    }));
  }
});
