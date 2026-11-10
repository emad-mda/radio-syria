// عدّاد زيارات خاص: بدون كوكيز ولا تتبع شخصي، يرسل لوسيط التطبيق على Cloudflare.
(function () {
  var ENDPOINT = 'https://hub-analytics.emad-mda.workers.dev/hit', SITE = 'radio-syria';
  function send(o) {
    try {
      if (localStorage.getItem('no-hit')) return; // لتعطيل العدّ على جهازك: localStorage.setItem('no-hit','1')
      o.s = SITE;
      var body = JSON.stringify(o);
      if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain' }))) return;
      fetch(ENDPOINT, { method: 'POST', body: body, keepalive: true, headers: { 'Content-Type': 'text/plain' } }).catch(function () {});
    } catch (e) { /* العدّ لا يجب أن يكسر التطبيق */ }
  }
  window.hubEvent = function (name, detail) { send({ p: location.pathname, e: name + (detail ? ':' + detail : '') }); };
  send({ p: location.pathname, r: document.referrer });
})();
