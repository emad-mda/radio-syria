// موجة صوتية متحركة تحاكي البث الحي: عيّنات سعة جديدة تُولَّد عند المركز وتنتشر نحو الأطراف مثل مخطط الصوت الحقيقي.
// ملاحظة: التحليل الحقيقي لصوت المحطات غير ممكن (يمنعه المتصفح بدون CORS)، لذا الرسم محاكاة.
(function () {
  'use strict';
  var canvases = document.querySelectorAll('canvas.wave-cv');
  if (!canvases.length) return;
  var host = document.getElementById('app') || document.body;

  function Wave(cv) {
    var W = cv.width, H = cv.height, ctx = cv.getContext('2d');
    var N = Math.max(40, Math.floor(W / 9)), half = Math.ceil(N / 2) + 1, mid = (N - 1) / 2;
    var hist = [], h = [], stat = [], i;
    for (i = 0; i < half; i++) hist.push(0);
    for (i = 0; i < N; i++) { h.push(0); stat.push(0.25 + 0.75 * Math.pow(Math.random(), 0.8)); }
    var energy = 0.6, energyT = 0.7, nextE = 0, phrase = 1, beat = 0, nextBeat = 0, acc = 0, last = Date.now();
    var color = '#34d399', cc = 0, t0 = last;

    function sample(state, t) {
      if (state !== 'playing') return state === 'buffering' ? 0.12 + 0.1 * Math.sin(t * 4) : 0;
      if (t > nextE) {                                   // مقاطع كلام/موسيقى بطاقات مختلفة وفواصل قصيرة
        energyT = Math.random() < 0.14 ? 0.08 : 0.4 + Math.random() * 0.6;
        nextE = t + 0.25 + Math.random() * 0.9;
      }
      energy += (energyT - energy) * 0.25;
      if (t > nextBeat) { beat = 0.5 + Math.random() * 0.5; nextBeat = t + 0.3 + Math.random() * 0.35; }
      beat *= 0.82;
      var r = Math.pow(Math.random(), 0.7);              // تفاوت حاد بين العيّنات المتجاورة
      return Math.min(1, energy * (0.18 + 0.82 * r) + beat * 0.35 * Math.random());
    }

    this.draw = function (state) {
      var now = Date.now(), t = (now - t0) / 1000, dt = Math.min(0.2, (now - last) / 1000);
      last = now;
      if (cc++ % 40 === 0) { var c = getComputedStyle(cv).color; if (c) color = c; }
      acc += dt;
      while (acc >= 0.04) { acc -= 0.04; hist.pop(); hist.unshift(sample(state, t)); }   // عيّنة جديدة في المركز كل 40ms
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = color;
      var gap = W / N, bw = Math.max(2, gap * 0.5), cy = H / 2;
      for (i = 0; i < N; i++) {
        var d = Math.abs(i - mid), x = d / mid;
        var win = 0.14 + 0.86 * Math.exp(-Math.pow(x * 1.35, 2));          // نافذة: الوسط أعلى والأطراف نقاط
        var k = Math.floor(d), f = d - k;
        var s = hist[k] * (1 - f) + (hist[k + 1] || 0) * f;
        var target = state === 'idle' ? stat[i] * win * 0.55 : s * win;
        h[i] += (target - h[i]) * (target > h[i] ? 0.6 : 0.28);
        var bh = Math.max(bw, h[i] * H * 0.96), x0 = i * gap + (gap - bw) / 2, y0 = cy - bh / 2;
        ctx.globalAlpha = 0.45 + 0.55 * Math.min(1, h[i] * 1.6);
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x0, y0, bw, bh, bw / 2); else ctx.rect(x0, y0, bw, bh);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
  }

  var waves = Array.prototype.map.call(canvases, function (cv) { return new Wave(cv); });
  var lastTs = 0;
  function frame(ts) {
    requestAnimationFrame(frame);
    if (document.hidden || ts - lastTs < 33) return;     // ≈30 إطاراً/ث
    lastTs = ts;
    var state = host.classList.contains('is-playing') ? 'playing' : host.classList.contains('is-buffering') ? 'buffering' : 'idle';
    waves.forEach(function (w) { w.draw(state); });
  }
  requestAnimationFrame(frame);
})();
