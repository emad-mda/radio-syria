// إضافات ثانية: الأغنية الحالية على البطاقة، ثيم موسمي، تقييم المحطات، إحصائيات الاستماع، شارة «جديد»، ترجمة أوسع.
(function () {
  'use strict';
  var RS = window.RS;
  if (!RS) return;
  var S, $ = function (id) { return document.getElementById(id); };
  var esc = RS.esc, load = RS.load, save = RS.save;
  var M = load('more', { rate: {}, stat: {}, hours: [], known: [], knownAt: 0, season: true });
  if (!M.rate) M.rate = {}; if (!M.stat) M.stat = {}; if (!M.hours || M.hours.length !== 24) M.hours = new Array(24).fill(0);
  function ms() { save('more', M); }
  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }

  // ---------- ترجمة إضافية ----------
  var EXTRA = {
    en: { 'احفظ الأغنية': 'Save song', 'التذكيرات والأغاني والمزيد': 'Reminders, songs & more', 'مؤقت النوم': 'Sleep timer', 'تقييمك': 'Your rating',
      'إحصائيات الاستماع': 'Listening stats', 'ثيم المناسبات': 'Seasonal theme', 'جديد': 'New', 'أضف إلى قائمة': 'Add to list', 'المزيد': 'More',
      'ترتيب': 'Reorder', 'مسح السجل': 'Clear history', 'إغلاق': 'Close', 'اختر محطة': 'Pick a station', 'أدوات': 'Tools', 'اللغة': 'Language' },
    de: { 'احفظ الأغنية': 'Song speichern', 'التذكيرات والأغاني والمزيد': 'Erinnerungen, Songs & mehr', 'مؤقت النوم': 'Einschlaftimer', 'تقييمك': 'Deine Bewertung',
      'إحصائيات الاستماع': 'Hörstatistik', 'ثيم المناسبات': 'Saisonales Design', 'جديد': 'Neu', 'أضف إلى قائمة': 'Zur Liste', 'المزيد': 'Mehr',
      'ترتيب': 'Sortieren', 'مسح السجل': 'Verlauf löschen', 'إغلاق': 'Schließen', 'اختر محطة': 'Sender wählen', 'أدوات': 'Tools', 'اللغة': 'Sprache' }
  };
  var lang = (load('x', {}).lang) || 'ar';
  function T(s) { return lang !== 'ar' && EXTRA[lang] && EXTRA[lang][s] ? EXTRA[lang][s] : s; }
  function xlate(root) {
    if (lang === 'ar' || !EXTRA[lang]) return;
    var w = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(function (t) { var v = t.nodeValue.trim(); if (v && EXTRA[lang][v]) t.nodeValue = t.nodeValue.replace(v, EXTRA[lang][v]); });
  }

  // ---------- ثيم موسمي (رمضان / العيد) ----------
  function season() {
    if (M.preview === 'ramadan') return { k: 'ramadan', t: 'رمضان كريم 🌙' };
    if (M.preview === 'eid') return { k: 'eid', t: 'عيد مبارك 🎉' };
    try {
      var f = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { month: 'numeric', day: 'numeric' }).formatToParts(new Date()), m = 0, d = 0;
      f.forEach(function (p) { if (p.type === 'month') m = +p.value; if (p.type === 'day') d = +p.value; });
      if (m === 9) return { k: 'ramadan', t: 'رمضان كريم 🌙' };
      if (m === 10 && d <= 3) return { k: 'eid', t: 'عيد مبارك 🎉' };
      if (m === 12 && d >= 9 && d <= 12) return { k: 'eid', t: 'عيد أضحى مبارك 🎉' };
    } catch (e) { /* ignore */ }
    return null;
  }
  function applySeason() {
    var old = $('x-season'); if (old) old.remove();
    document.body.classList.remove('season-ramadan', 'season-eid');
    var s = (M.season || M.preview) ? season() : null; if (!s) return;
    document.body.classList.add('season-' + s.k);
    var hero = $('home-hero');
    if (hero) hero.insertBefore(el('<div id="x-season" class="x-season">' + s.t + '</div>'), hero.firstChild);
  }

  // ---------- الأغنية الحالية + التقييم + شارة جديد ----------
  function stars(id) {
    var r = M.rate[id] || 0, h = '';
    for (var i = 1; i <= 5; i++) h += '<button type="button" class="star' + (i <= r ? ' on' : '') + '" data-star="' + i + '" aria-label="' + i + '">★</button>';
    return h;
  }
  function paintRows() {
    var cur = S.current;
    Array.prototype.forEach.call(document.querySelectorAll('.row[data-sid]'), function (r) {
      var id = r.getAttribute('data-sid'), sub = r.querySelector('.sub'), nm = r.querySelector('.name');
      if (sub && !sub.hasAttribute('data-orig')) sub.setAttribute('data-orig', sub.textContent);
      if (sub) sub.textContent = (cur && cur.id === id && S.state === 'playing' && S.title) ? '♪ ' + S.title : sub.getAttribute('data-orig');
      if (nm && M.rate[id] && !r.querySelector('.rt')) nm.insertAdjacentHTML('beforeend', ' <span class="rt">' + M.rate[id] + '★</span>');
      if (nm && M.fresh && M.fresh[id] && !r.querySelector('.newb')) nm.insertAdjacentHTML('beforeend', ' <span class="newb">' + T('جديد') + '</span>');
    });
  }
  function paintRate() {
    var box = $('x-rate'); if (!box) return;
    box.classList.toggle('hidden', !S.current);
    if (S.current) box.querySelector('.stars').innerHTML = stars(S.current.id);
  }
  function detectNew() {
    if (!S.all || !S.all.length) return;
    var ids = S.all.map(function (s) { return s.id; });
    if (!M.known || !M.known.length) { M.known = ids; M.knownAt = Date.now(); ms(); return; }
    M.fresh = M.fresh || {};
    ids.forEach(function (id) { if (M.known.indexOf(id) < 0) { M.fresh[id] = Date.now(); M.known.push(id); } });
    Object.keys(M.fresh).forEach(function (id) { if (Date.now() - M.fresh[id] > 7 * 864e5) delete M.fresh[id]; });
    ms();
  }

  // ---------- الإحصائيات ----------
  function tick() {
    if (S.state !== 'playing' || !S.current) return;
    M.stat[S.current.id] = (M.stat[S.current.id] || 0) + 10;
    M.hours[new Date().getHours()] += 10;
    var dk = new Date().toISOString().slice(0, 10); M.days = M.days || {};
    M.days[dk] = (M.days[dk] || 0) + 10;
    var ks = Object.keys(M.days).sort(); if (ks.length > 60) ks.slice(0, ks.length - 60).forEach(function (k) { delete M.days[k]; });
    ms();
  }
  function fmt(sec) { var m = Math.round(sec / 60); return m >= 60 ? Math.floor(m / 60) + ' س ' + (m % 60) + ' د' : m + ' د'; }
  function renderStats() {
    var tot = Object.keys(M.stat).reduce(function (a, k) { return a + M.stat[k]; }, 0), week = 0, now = Date.now();
    Object.keys(M.days || {}).forEach(function (k) { if (now - new Date(k).getTime() < 7 * 864e5) week += M.days[k]; });
    var top = Object.keys(M.stat).sort(function (a, b) { return M.stat[b] - M.stat[a]; }).slice(0, 5);
    var mx = Math.max.apply(null, M.hours.concat([1]));
    var bars = M.hours.map(function (v, i) { return '<i style="height:' + Math.max(3, Math.round(v / mx * 100)) + '%" title="' + i + ':00"></i>'; }).join('');
    $('x-stat-body').innerHTML =
      '<p class="muted small">آخر 7 أيام: <b>' + fmt(week) + '</b> · المجموع: <b>' + fmt(tot) + '</b></p>' +
      '<h3>أكثر المحطات</h3>' + (top.length ? top.map(function (id) {
        var s = RS.findStation(id); return '<div class="xrow"><div class="xmeta"><b>' + esc(s ? s.name : id) + '</b><span>' + fmt(M.stat[id]) + (M.rate[id] ? ' · ' + M.rate[id] + '★' : '') + '</span></div></div>';
      }).join('') : '<p class="muted small">لا بيانات بعد، ابدأ بالاستماع.</p>') +
      '<h3>ساعات الاستماع</h3><div class="x-hist">' + bars + '</div><div class="x-hist-l"><span>0</span><span>6</span><span>12</span><span>18</span><span>23</span></div>';
  }

  // ---------- بناء الواجهة ----------
  function build() {
    var acts = document.querySelector('.np-actions');
    if (acts) acts.parentNode.insertBefore(el('<div id="x-rate" class="x-rate hidden"><span>' + T('تقييمك') + '</span><div class="stars"></div></div>'), acts);
    $('x-rate').addEventListener('click', function (e) {
      var b = e.target.closest('[data-star]'); if (!b || !S.current) return;
      var v = +b.getAttribute('data-star'), id = S.current.id;
      if (M.rate[id] === v) delete M.rate[id]; else M.rate[id] = v;
      ms(); paintRate(); RS.renderList();
    });
    var tb = $('tools-sheet');
    if (tb) {
      var body = tb.querySelector('.sheet-body');
      body.appendChild(el('<h3>' + T('ثيم المناسبات') + '</h3>'));
      body.appendChild(el('<div class="pref"><span>رمضان والأعياد (ألوان وتهنئة)</span><button type="button" class="switch" id="x-season-on" role="switch"><i></i></button></div>'));
      body.appendChild(el('<div class="pref"><span>معاينة الثيم</span><div class="seg" id="x-prev"><button type="button" data-p="">إيقاف</button><button type="button" data-p="ramadan">رمضان</button><button type="button" data-p="eid">عيد</button></div></div>'));
      $('x-prev').addEventListener('click', function (e) { var b = e.target.closest('[data-p]'); if (!b) return; M.preview = b.getAttribute('data-p'); ms(); applySeason(); paintSeasonSwitch(); });
      body.appendChild(el('<button class="wide-btn ghost" id="x-stat-open">' + T('إحصائيات الاستماع') + '</button>'));
      $('x-season-on').addEventListener('click', function () { M.season = !M.season; ms(); paintSeasonSwitch(); applySeason(); });
      $('x-stat-open').addEventListener('click', function () { RS.closeSheet('tools-sheet'); renderStats(); RS.openSheet('stat-sheet'); });
      var obs = new MutationObserver(paintSeasonSwitch); obs.observe(tb, { attributes: true, attributeFilter: ['class', 'aria-hidden'] });
    }
    var sh = '<div class="sheet" id="stat-sheet" aria-hidden="true"><div class="sheet-bg" data-close="stat-sheet"></div><div class="sheet-body about-body">' +
      '<button class="grab" data-close="stat-sheet" aria-label="إغلاق">' + RS.svg('chevron') + '</button><h2>' + T('إحصائيات الاستماع') + '</h2><div id="x-stat-body"></div></div></div>';
    document.body.appendChild(el(sh));
  }
  function paintSeasonSwitch() { Array.prototype.forEach.call(document.querySelectorAll('#x-prev button'), function (b) { b.classList.toggle('on', (M.preview || '') === b.getAttribute('data-p')); }); var b = $('x-season-on'); if (b) { b.classList.toggle('on', !!M.season); b.setAttribute('aria-checked', !!M.season); } }

  function start() {
    S = RS.S;
    build(); detectNew(); applySeason(); paintSeasonSwitch();
    var pa = RS.hooks.after;
    RS.hooks.after = function (l) { if (pa) pa(l); paintRows(); };
    var pp = RS.hooks.player;
    RS.hooks.player = function () { if (pp) pp(); paintRate(); paintRows(); };
    var pt = RS.hooks.title;
    RS.hooks.title = function (t, st) { if (pt) pt(t, st); paintRows(); };
    // الأفضل تقييماً أولاً في قائمة المفضلة
    var pf = RS.hooks.favBase;
    RS.hooks.favBase = function (favs) {
      var base = pf ? pf(favs) : favs;
      return Object.keys(M.rate).length ? base.slice().sort(function (a, b) { return (M.rate[b.id] || 0) - (M.rate[a.id] || 0); }) : base;
    };
    setInterval(tick, 10000);
    setInterval(applySeason, 6 * 3600 * 1000);
    xlate();
    RS.renderList(); RS.renderPlayer(); paintRate();
  }
  if (RS.ready) start(); else { var prev = RS.onReady; RS.onReady = function () { if (prev) prev(); start(); }; }
})();
