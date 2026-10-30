// عامل الخدمة: يحفظ ملفات التطبيق ليفتح بسرعة وحتى دون اتصال.
// لا يتدخل أبداً في روابط البث أو دليل المحطات.
var CACHE = 'radio-syria-v10';
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
var PROXY = 'https://radio-syria-proxy.emad-mda.workers.dev';

// الإشعار يصل بلا نص؛ نسأل الوسيط عن آخر تذكير (اسمه ومحطته) بنفس بصمة العنوان التي حسبها الوسيط
function lastReminder() {
  return self.registration.pushManager.getSubscription().then(function (sub) {
    if (!sub) return {};
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(sub.endpoint)).then(function (h) {
      var s = '';
      new Uint8Array(h).forEach(function (b) { s += String.fromCharCode(b); });
      var id = btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '').slice(0, 24);
      return fetch(PROXY + '/alarm/last/' + id).then(function (r) { return r.json(); });
    });
  });
}

self.addEventListener('push', function (e) {
  var timeout = new Promise(function (res) { setTimeout(function () { res({}); }, 4000); });
  e.waitUntil(Promise.race([lastReminder().catch(function () { return {}; }), timeout]).then(function (info) {
    return self.registration.showNotification(info.label || 'راديو سوريا ⏰', {
      body: 'اضغط لتشغيل محطتك',
      icon: 'icons/icon-192.png',
      tag: 'alarm',
      renotify: true,
      data: { station: info.station || '', label: info.label || '' }
    });
  }));
});

self.addEventListener('notificationclick', function (e) {
  var d = e.notification.data || {};
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    if (list.length) {
      list[0].postMessage({ alarm: 1, station: d.station, label: d.label });
      return list[0].focus();
    }
    return self.clients.openWindow('./?alarm=1&st=' + encodeURIComponent(d.station || '') + '&label=' + encodeURIComponent(d.label || ''));
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


