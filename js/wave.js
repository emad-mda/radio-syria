// موجة صوتية متحركة تحاكي البث الحي (طاقة تتغير مع «نبضات» عشوائية وتتلاشى بسلاسة).
// ملاحظة: التحليل الحقيقي للصوت غير ممكن مع بث المحطات (يمنعه المتصفح بدون CORS)، لذا الرسم محاكاة واقعية.
(function () {
  'use strict';
  var canvases = document.querySelectorAll('canvas.wave-cv');
  if (!canvases.length) return;
  var host = document.getElementById('app') || document.body;

  function Wave(cv) {
    var N = 56, h = [], ph = [], f1 = [], f2 = [], i;
    for (i = 0; i < N; i++) { h.push(0); ph.push(Math.random() * 6.28); f1.push(1.5 + Math.random() * 4); f2.push(3 + Math.random() * 7); }
    var ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
    var energy = 0.5, energyT = 0.6, nextE = 0, beat = 0, nextBeat = 0, color = '#34d399', cc = 0, t0 = Date.now();

    this.draw = function (state) {
      var t = (Date.now() - t0) / 1000;
      if (cc++ % 40 === 0) { var c = getComputedStyle(cv).color; if (c) color = c; }
      // طاقة بطيئة (كلام / موسيقى) + نبضات إيقاعية
      if (t > nextE) { energyT = 0.35 + Math.random() * 0.65; nextE = t + 0.6 + Math.random() * 1.6; }
      energy += (energyT - energy) * 0.06;
      if (t > nextBeat) { beat = 0.55 + Math.random() * 0.45; nextBeat = t + 0.32 + Math.random() * 0.4; }
      beat *= 0.9;
      var live = state === 'playing', buf = state === 'buffering';
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = color;
      var gap = W / N, bw = Math.max(2, gap * 0.52), mid = H / 2;
      for (i = 0; i < N; i++) {
        var x = (i / (N - 1)) * 2 - 1;
        var env = 0.16 + 0.84 * Math.exp(-Math.pow(x * 1.55, 2));          // أعلى في الوسط
        var n = 0.5 + 0.5 * Math.sin(t * f1[i] + ph[i]) * Math.sin(t * f2[i] * 0.6 + ph[i] * 1.7);
        var target;
        if (live) target = env * Math.min(1, (0.18 + 0.82 * n) * (0.35 + 0.65 * energy) + beat * 0.45 * (1 - Math.abs(x) * 0.7));
        else if (buf) target = 0.1 + 0.16 * (0.5 + 0.5 * Math.sin(t * 3 - i * 0.35));
        else target = 0.04;
        h[i] += (target - h[i]) * (target > h[i] ? 0.45 : 0.14);
        var bh = Math.max(3, h[i] * H * 0.96);
        ctx.globalAlpha = 0.55 + 0.45 * Math.min(1, h[i] * 1.4);
        var r = bw / 2, x0 = i * gap + (gap - bw) / 2, y0 = mid - bh / 2;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x0, y0, bw, bh, r); else ctx.rect(x0, y0, bw, bh);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
  }

  var waves = Array.prototype.map.call(canvases, function (cv) { return new Wave(cv); });
  var last = 0;
  function frame(ts) {
    requestAnimationFrame(frame);
    if (document.hidden || ts - last < 33) return;     // ≈30 إطاراً/ث
    last = ts;
    var state = host.classList.contains('is-playing') ? 'playing' : host.classList.contains('is-buffering') ? 'buffering' : 'idle';
    waves.forEach(function (w) { w.draw(state); });
  }
  requestAnimationFrame(frame);
})();
