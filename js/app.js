(function () {
  'use strict';

  var ICONS = {
    play: '<path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/>',
    pause: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
    next: '<path d="M5 6.2v11.6a.8.8 0 0 0 1.25.66l8.25-5.76a.8.8 0 0 0 0-1.4L6.25 5.54A.8.8 0 0 0 5 6.2z"/><rect x="16" y="5" width="3" height="14" rx="1"/>',
    prev: '<path d="M19 6.2v11.6a.8.8 0 0 1-1.25.66L9.5 12.7a.8.8 0 0 1 0-1.4l8.25-5.76A.8.8 0 0 1 19 6.2z"/><rect x="5" y="5" width="3" height="14" rx="1"/>',
    heart: '<path d="M12 20.5s-7.5-4.6-9.6-9.1C1 8.3 2.9 4.5 6.6 4.5c2.1 0 3.6 1.1 5.4 3.1 1.8-2 3.3-3.1 5.4-3.1 3.7 0 5.6 3.8 4.2 6.9-2.1 4.5-9.6 9.1-9.6 9.1z"/>',
    radio: '<path d="M4 9h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zm4 2.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zM13.5 12.5V14h5v-1.5zm0 3.5v1.5h5V16zM5.6 7.6 16.8 3l.6 1.4L9.6 7.6z"/>',
    globe: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.9a15.6 15.6 0 0 0-1.4-3.9A8 8 0 0 1 18.9 8zM12 4c.9 1.2 1.6 2.6 2 4h-4c.4-1.4 1.1-2.8 2-4zM4.3 14a8.2 8.2 0 0 1 0-4h3.3a16.5 16.5 0 0 0 0 4zm.8 2h2.9c.3 1.4.8 2.7 1.4 3.9A8 8 0 0 1 5.1 16zM8 8H5.1a8 8 0 0 1 4.3-3.9C8.8 5.3 8.3 6.6 8 8zm4 12c-.9-1.2-1.6-2.6-2-4h4c-.4 1.4-1.1 2.8-2 4zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4zm.3 5.9c.6-1.2 1.1-2.5 1.4-3.9h2.9a8 8 0 0 1-4.3 3.9zm1.8-5.9a16.5 16.5 0 0 0 0-4h3.3a8.2 8.2 0 0 1 0 4z"/>',
    timer: '<path d="M9.5 1.5h5v2h-5zM12 5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm0 15a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zm1-11h-2v5.4l3.6 2.2 1-1.7-2.6-1.6zM18.7 4.9l1.4 1.4-1.6 1.6-1.4-1.4z"/>',
    airplay: '<path d="M3 4h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-3l-1.7-2H20V6H4v9h2.7L5 17H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm9 9 6 8H6z"/>',
    search: '<path d="M10.5 3a7.5 7.5 0 0 1 6 12l4.3 4.3-1.5 1.5-4.3-4.3A7.5 7.5 0 1 1 10.5 3zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"/>',
    info: '<path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm-1 8v7h2v-7zm1-4a1.3 1.3 0 1 0 0 2.6A1.3 1.3 0 0 0 12 6z"/>',
    close: '<path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z"/>',
    chevron: '<path d="M5.6 8.6 12 15l6.4-6.4L19.8 10 12 17.8 4.2 10z"/>',
    share: '<path d="M12 2.5 16.5 7l-1.4 1.4L13 6.3V15h-2V6.3L8.9 8.4 7.5 7zM5 10h3v2H6v8h12v-8h-2v-2h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1z"/>'
  };
  function svg(n) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || '') + '</svg>'; }
  function paintIcons(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-icon]'), function (el) { el.innerHTML = svg(el.getAttribute('data-icon')); });
  }

  var API_MIRRORS = ['https://de1.api.radio-browser.info', 'https://fi1.api.radio-browser.info', 'https://all.api.radio-browser.info'];
  var FAILED_TTL_MS = 6 * 60 * 60 * 1000;
  var BUFFER_WATCHDOG_MS = 15000;
  var SLEEP_STEPS = [0, 15, 30, 60, 90];
  var RECENT_MAX = 12;
  var GROUP_COLORS = ['#34d399', '#22d3ee', '#fbbf24', '#f87171', '#c084fc', '#60a5fa', '#f472b6', '#a3e635'];
  var TAB_TITLES = { syria: 'المحطات السورية', arab: 'محطات عربية', favs: 'المفضلة' };

  var $ = function (id) { return document.getElementById(id); };
  function load(k, f) { try { var v = localStorage.getItem('rsm.' + k); return v === null ? f : JSON.parse(v); } catch (e) { return f; } }
  function save(k, v) { try { localStorage.setItem('rsm.' + k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // Safari يمنع تشغيل روابط http من صفحة https، لذا نبقي روابط https فقط
  var HTTPS_ONLY = location.protocol === 'https:';
  function usable(urls) { return HTTPS_ONLY ? urls.filter(function (u) { return /^https:/i.test(u); }) : urls.slice(); }

  var curated = [], hiddenCount = 0;
  window.CURATED_STATIONS.forEach(function (s) {
    var o = {}; for (var k in s) if (k !== 'match') o[k] = s[k];
    o.urls = usable(s.urls);
    if (o.urls.length) curated.push(o); else hiddenCount++;
  });

  var S = {
    all: curated.slice(), byId: {},
    current: null, urlIdx: 0, state: 'idle',
    favs: load('favs', []), recent: load('recent', []), failed: load('failed', {}),
    tab: 'syria', filter: 'الكل', query: '',
    sleepEnd: 0, sleepStep: 0
  };
  function index() { S.byId = {}; S.all.forEach(function (s) { S.byId[s.id] = s; }); }
  index();
  Object.keys(S.failed).forEach(function (id) { if (Date.now() - S.failed[id] > FAILED_TTL_MS) delete S.failed[id]; });

  var audio = $('audio');

  // ---------- الفحص اليومي (status.json يكتبه GitHub Actions كل يوم) ----------
  // المحطة التي فشلت في فحصين متتاليين تُخفى من القوائم، وتعود وحدها عندما تعمل
  var STATUS_MAX_AGE_MS = 3 * 24 * 60 * 60 * 1000;
  var deadIds = {};
  function applyStatus(st) {
    deadIds = {};
    if (!st || !st.stations || Date.now() - Date.parse(st.checkedAt) > STATUS_MAX_AGE_MS) return;
    var limit = st.deadAfter || 2;
    var dead = Object.keys(st.stations).filter(function (id) { return st.stations[id].streak >= limit; });
    // إذا بدت أغلب المحطات معطّلة فالخلل في الفحص نفسه، فنتجاهله
    if (dead.length > window.CURATED_STATIONS.length / 2) return;
    dead.forEach(function (id) { deadIds[id] = true; });
  }
  applyStatus(load('status', null));

  // ---------- مساعدات ----------
  function catList(cat) { return S.all.filter(function (s) { return (s.cat || 'syria') === cat && !deadIds[s.id]; }); }
  function isFav(s) { return S.favs.some(function (f) { return f.id === s.id; }); }
  function findStation(id) {
    return S.byId[id] || S.favs.filter(function (f) { return f.id === id; })[0] || S.recent.filter(function (f) { return f.id === id; })[0];
  }
  function snapshot(s) {
    return { id: s.id, name: s.name, en: s.en, mono: s.mono, cat: s.cat, gov: s.gov, genre: s.genre, color: s.color, urls: s.urls, logo: s.logo, codec: s.codec, bitrate: s.bitrate };
  }
  function quality(s) { return s.codec ? s.codec + (s.bitrate ? ' · ' + s.bitrate + ' kbps' : '') : ''; }
  // توحيد الحروف العربية للبحث (أ/إ/آ → ا، ة → ه، ى → ي)
  function norm(t) {
    return String(t || '').toLowerCase().replace(/[ً-ْ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
  }
  function playList() {
    if (S.tab === 'favs' && S.favs.length) return S.favs;
    var cat = S.current && S.current.cat === 'arab' ? 'arab' : (S.tab === 'arab' ? 'arab' : 'syria');
    return catList(cat);
  }

  function artHTML(s, cls) {
    return '<div class="art ' + (cls || '') + '" style="--c:' + esc(s.color) + '"><img alt="" loading="lazy"' +
      (s.logo ? ' data-src="' + esc(s.logo) + '"' : '') + '><span class="mono">' + esc(s.mono) + '</span></div>';
  }
  // الشعار يظهر فقط إذا كان بدقة كافية؛ وإلا يبقى الاسم الملوّن
  function hydrateLogos(root) {
    Array.prototype.forEach.call(root.querySelectorAll('img[data-src]'), function (img) {
      var art = img.parentElement;
      img.onload = function () { if (img.naturalWidth >= 96) art.classList.add('has-logo'); };
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }
  function setArt(el, s) {
    el.style.setProperty('--c', s.color);
    el.classList.remove('has-logo');
    el.querySelector('.mono').textContent = s.mono;
    var img = el.querySelector('img');
    img.onload = null; img.removeAttribute('src');
    if (s.logo) { img.onload = function () { if (img.naturalWidth >= 96) el.classList.add('has-logo'); }; img.src = s.logo; }
  }

  // ---------- القائمة ----------
  function groups(list) {
    var m = {};
    list.forEach(function (s) { m[s.gov] = (m[s.gov] || 0) + 1; });
    return Object.keys(m).sort(function (a, b) { return m[b] - m[a]; }).map(function (g) { return { g: g, n: m[g] }; });
  }

  function renderList() {
    var base = S.tab === 'favs' ? S.favs : catList(S.tab);
    $('tab-title').textContent = TAB_TITLES[S.tab];

    // الشرائح (محافظات / دول)
    if (S.tab === 'favs' || S.query) { $('chips').innerHTML = ''; }
    else {
      var gs = [{ g: 'الكل', n: base.length }].concat(groups(base));
      $('chips').innerHTML = gs.map(function (x, i) {
        return '<button class="chip' + (x.g === S.filter ? ' on' : '') + '" data-group="' + esc(x.g) + '">' + esc(x.g) + ' <i>' + x.n + '</i></button>';
      }).join('');
    }

    var list = base;
    if (S.query) {
      // البحث يشمل كل المحطات وليس التبويب الحالي فقط
      var q = norm(S.query);
      list = (S.tab === 'favs' ? S.favs : S.all).filter(function (s) {
        return norm([s.name, s.en, s.gov, s.genre].join(' ')).indexOf(q) >= 0;
      });
    } else if (S.filter !== 'الكل' && S.tab !== 'favs') {
      list = base.filter(function (s) { return s.gov === S.filter; });
    }

    $('list').innerHTML = list.map(function (s) {
      var cls = 'row' + (S.current && S.current.id === s.id ? ' current' : '') + (S.failed[s.id] || deadIds[s.id] ? ' down' : '');
      return '<div class="' + cls + '" data-sid="' + esc(s.id) + '">' + artHTML(s) +
        '<div class="meta"><div class="name">' + esc(s.name) + '</div><div class="sub">' +
        esc([s.gov, s.genre || quality(s)].filter(Boolean).join(' · ')) + '</div></div>' +
        '<button class="fav-btn' + (isFav(s) ? ' on' : '') + '" data-fav="' + esc(s.id) + '" aria-label="مفضلة">' + svg('heart') + '</button></div>';
    }).join('');
    hydrateLogos($('list'));

    var empty = $('empty');
    if (!list.length) {
      empty.innerHTML = S.tab === 'favs' && !S.query
        ? svg('heart') + '<b>لا توجد محطات مفضلة بعد</b>اضغط القلب بجانب أي محطة لإضافتها'
        : svg('search') + '<b>لا توجد نتائج</b>جرّب اسماً آخر';
      empty.classList.remove('hidden');
    } else empty.classList.add('hidden');

    renderRecent();
  }

  function renderRecent() {
    var show = S.tab === 'syria' && !S.query && S.recent.length > 0;
    $('recent-wrap').classList.toggle('hidden', !show);
    if (!show) return;
    $('recent').innerHTML = S.recent.map(function (r) {
      var s = S.byId[r.id] || r;
      return '<button class="tile" data-sid="' + esc(s.id) + '">' + artHTML(s) + '<b>' + esc(s.name) + '</b></button>';
    }).join('');
    hydrateLogos($('recent'));
  }

  // ---------- المشغّل ----------
  function setAccent(hex) {
    var n = parseInt(hex.slice(1), 16);
    var rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
    document.documentElement.style.setProperty('--accent', hex);
    document.documentElement.style.setProperty('--accent-soft', 'rgba(' + rgb + ',0.2)');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#020305');
  }

  var STATUS = { idle: 'اضغط للتشغيل', buffering: 'جاري الاتصال…', playing: 'مباشر الآن', paused: 'متوقف', error: 'تعذّر التشغيل' };

  var artFor = null;
  function renderPlayer() {
    var s = S.current;
    document.body.classList.toggle('no-mini', !s);
    $('mini').classList.toggle('hidden', !s);
    document.body.classList.toggle('is-playing', S.state === 'playing');
    document.body.classList.toggle('is-buffering', S.state === 'buffering');
    if (!s) return;
    var on = S.state === 'playing' || S.state === 'buffering';
    $('mini-play').innerHTML = svg(on ? 'pause' : 'play');
    $('np-play').innerHTML = svg(on ? 'pause' : 'play');
    $('mini-name').textContent = s.name;
    $('mini-status').textContent = STATUS[S.state];
    $('np-status').textContent = STATUS[S.state];
    $('np-name').textContent = s.name;
    $('np-en').textContent = s.en || '';
    $('np-gov').textContent = s.gov || '';
    $('np-genre').textContent = s.genre || '';
    $('np-quality').textContent = quality(s);
    $('np-fav').classList.toggle('on', isFav(s));
    if (artFor !== s.id) {
      artFor = s.id;
      setAccent(s.color);
      setArt($('mini-art'), s);
      setArt($('np-art'), s);
    }
    Array.prototype.forEach.call(document.querySelectorAll('.row'), function (r) {
      var id = r.getAttribute('data-sid');
      r.classList.toggle('current', id === s.id);
      r.classList.toggle('down', !!S.failed[id]);
    });
  }

  // شاشة القفل ومركز التحكم
  function updateMediaSession() {
    if (!('mediaSession' in navigator) || !S.current) return;
    var s = S.current;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: s.name,
        artist: [s.gov, s.genre].filter(Boolean).join(' · ') || 'راديو سوريا',
        album: 'راديو سوريا',
        artwork: [
          { src: s.logo || 'icons/icon-512.png', sizes: '512x512' },
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' }
        ]
      });
    } catch (e) { /* ignore */ }
    navigator.mediaSession.playbackState = S.state === 'playing' ? 'playing' : 'paused';
  }
  if ('mediaSession' in navigator) {
    var ms = navigator.mediaSession;
    var handlers = {
      play: function () { if (S.current) play(S.current, 0); },
      pause: function () { stop(); },
      stop: function () { stop(); },
      nexttrack: function () { step(1); },
      previoustrack: function () { step(-1); }
    };
    Object.keys(handlers).forEach(function (a) { try { ms.setActionHandler(a, handlers[a]); } catch (e) { /* غير مدعوم */ } });
  }

  var watchdog;
  function setState(st) {
    S.state = st;
    clearTimeout(watchdog);
    if (st === 'buffering') watchdog = setTimeout(function () { if (S.state === 'buffering') tryNextUrl(); }, BUFFER_WATCHDOG_MS);
    renderPlayer();
    updateMediaSession();
  }

  function play(station, urlIdx) {
    if (!station) return;
    S.current = station;
    S.urlIdx = urlIdx || 0;
    save('last', snapshot(station));
    audio.src = station.urls[S.urlIdx];
    setState('buffering');
    var p = audio.play();
    if (p && p.catch) p.catch(function (e) { if (e && e.name === 'NotAllowedError') setState('paused'); });
  }

  function tryNextUrl() {
    var s = S.current;
    if (!s) return;
    if (S.urlIdx + 1 < s.urls.length) { play(s, S.urlIdx + 1); return; }
    audio.pause();
    S.failed[s.id] = Date.now(); save('failed', S.failed);
    setState('error');
    toast('تعذّر الاتصال ببث «' + s.name + '»');
  }

  // البث المباشر: الإيقاف يفصل الاتصال، والاستئناف يعود للبث الحي
  function stop() { audio.pause(); setState('paused'); }
  function toggle() {
    if (!S.current) return;
    if (S.state === 'playing' || S.state === 'buffering') stop(); else play(S.current, 0);
  }
  function step(d) {
    var list = playList();
    if (!list.length) return;
    var i = S.current ? list.map(function (s) { return s.id; }).indexOf(S.current.id) : -1;
    play(list[(i + d + list.length) % list.length]);
  }

  audio.addEventListener('playing', function () {
    var s = S.current;
    if (S.failed[s.id]) { delete S.failed[s.id]; save('failed', S.failed); }
    S.recent = [snapshot(s)].concat(S.recent.filter(function (r) { return r.id !== s.id; })).slice(0, RECENT_MAX);
    save('recent', S.recent);
    setState('playing');
    renderRecent();
  });
  audio.addEventListener('waiting', function () { if (S.state === 'playing') setState('buffering'); });
  audio.addEventListener('pause', function () { if (S.state === 'playing' || S.state === 'buffering') setState('paused'); });
  audio.addEventListener('error', function () { if (S.state === 'buffering' || S.state === 'playing') tryNextUrl(); });
  audio.addEventListener('ended', function () { if (S.current) play(S.current, S.urlIdx); });

  function toggleFav(s) {
    if (!s) return;
    if (isFav(s)) { S.favs = S.favs.filter(function (f) { return f.id !== s.id; }); toast('أُزيلت من المفضلة'); }
    else { S.favs.push(snapshot(s)); toast('أُضيفت إلى المفضلة ♥'); }
    save('favs', S.favs);
    renderList();
    renderPlayer();
  }

  // ---------- مؤقت النوم ----------
  var sleepTimer;
  function cycleSleep() {
    var next = S.sleepEnd ? SLEEP_STEPS[(SLEEP_STEPS.indexOf(S.sleepStep) + 1) % SLEEP_STEPS.length] : SLEEP_STEPS[1];
    S.sleepStep = next;
    clearInterval(sleepTimer);
    S.sleepEnd = next ? Date.now() + next * 60000 : 0;
    if (next) sleepTimer = setInterval(sleepTick, 5000);
    renderSleep();
    toast(next ? 'سيتوقف البث بعد ' + next + ' دقيقة' : 'أُلغي مؤقت النوم');
  }
  function sleepTick() {
    if (Date.now() >= S.sleepEnd) {
      clearInterval(sleepTimer); S.sleepEnd = 0; S.sleepStep = 0;
      stop(); renderSleep();
      return;
    }
    renderSleep();
  }
  function renderSleep() {
    var on = !!S.sleepEnd;
    $('np-sleep').classList.toggle('on', on);
    $('np-sleep-label').textContent = on ? Math.max(1, Math.ceil((S.sleepEnd - Date.now()) / 60000)) + ' دقيقة' : 'مؤقت النوم';
  }

  // ---------- الشاشات المنزلقة ----------
  function openSheet(id) { $(id).classList.add('open'); $(id).setAttribute('aria-hidden', 'false'); }
  function closeSheet(id) { $(id).classList.remove('open'); $(id).setAttribute('aria-hidden', 'true'); }

  // السحب للأسفل لإغلاق شاشة التشغيل
  (function swipeToClose() {
    var body = $('sheet-body'), y0 = null, dy = 0;
    body.addEventListener('touchstart', function (e) { if (body.scrollTop <= 0) { y0 = e.touches[0].clientY; dy = 0; } }, { passive: true });
    body.addEventListener('touchmove', function (e) {
      if (y0 === null) return;
      dy = Math.max(0, e.touches[0].clientY - y0);
      body.style.transition = 'none';
      body.style.transform = 'translateY(' + dy + 'px)';
    }, { passive: true });
    body.addEventListener('touchend', function () {
      body.style.transition = ''; body.style.transform = '';
      if (dy > 110) closeSheet('sheet');
      y0 = null; dy = 0;
    });
  })();

  var toastTimer;
  function toast(m) {
    var t = $('toast'); t.textContent = m; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  // ---------- الأحداث ----------
  document.addEventListener('click', function (e) {
    var fav = e.target.closest('[data-fav]');
    if (fav) { e.stopPropagation(); toggleFav(findStation(fav.getAttribute('data-fav'))); return; }
    var item = e.target.closest('[data-sid]');
    if (item) {
      var s = findStation(item.getAttribute('data-sid'));
      if (!s) return;
      if (S.current && S.current.id === s.id && S.state !== 'paused' && S.state !== 'error' && S.state !== 'idle') openSheet('sheet');
      else play(s);
      return;
    }
    var chip = e.target.closest('[data-group]');
    if (chip) { S.filter = chip.getAttribute('data-group'); renderList(); return; }
    var tab = e.target.closest('[data-tab]');
    if (tab) {
      S.tab = tab.getAttribute('data-tab'); S.filter = 'الكل';
      Array.prototype.forEach.call(document.querySelectorAll('.tab'), function (t) { t.classList.toggle('active', t === tab); });
      renderList(); $('scroll').scrollTop = 0;
      return;
    }
    var closer = e.target.closest('[data-close]');
    if (closer) { closeSheet(closer.getAttribute('data-close')); return; }
  });

  $('mini').addEventListener('click', function (e) { if (!e.target.closest('#mini-play')) openSheet('sheet'); });
  $('mini-play').addEventListener('click', toggle);
  $('np-play').addEventListener('click', toggle);
  $('np-prev').addEventListener('click', function () { step(-1); });
  $('np-next').addEventListener('click', function () { step(1); });
  $('np-fav').addEventListener('click', function () { toggleFav(S.current); });
  $('np-sleep').addEventListener('click', cycleSleep);
  $('sheet-close').addEventListener('click', function () { closeSheet('sheet'); });
  $('sheet-bg').addEventListener('click', function () { closeSheet('sheet'); });
  $('about-btn').addEventListener('click', function () { openSheet('about'); });
  $('refresh-btn').addEventListener('click', function () { toast('جاري التحديث…'); fetchDirectory(true); });
  $('clear-btn').addEventListener('click', function () {
    S.recent = []; S.failed = {}; save('recent', []); save('failed', {});
    renderList(); toast('تم المسح');
  });
  $('q').addEventListener('input', function () { S.query = this.value.trim(); renderList(); });
  $('q').addEventListener('search', function () { this.blur(); });

  // AirPlay (يظهر الزر فقط إذا وُجد جهاز AirPlay)
  if (window.WebKitPlaybackTargetAvailabilityEvent) {
    audio.addEventListener('webkitplaybacktargetavailabilitychanged', function (e) {
      $('np-airplay').classList.toggle('hidden', e.availability !== 'available');
    });
    $('np-airplay').addEventListener('click', function () { audio.webkitShowPlaybackTargetPicker(); });
  }

  // إرشاد التثبيت عند الفتح من Safari
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  var standalone = navigator.standalone || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
  if (isIOS && !standalone && !load('hideInstall', false)) $('install').classList.remove('hidden');
  $('install-close').addEventListener('click', function () { $('install').classList.add('hidden'); save('hideInstall', true); });

  // ---------- دليل المحطات ----------
  function normUrl(u) { return String(u || '').replace(/^https?:\/\//, '').replace(/[\/;]+$/, '').toLowerCase(); }
  function mergeDirectory(rows) {
    var seenUrl = {}, seenName = {};
    window.CURATED_STATIONS.forEach(function (s) {
      s.urls.forEach(function (u) { seenUrl[normUrl(u)] = true; });
      seenName[s.en.toLowerCase()] = true;
    });
    var extra = [];
    rows.forEach(function (r) {
      var url = r.url_resolved || r.url;
      if (!url || window.STATION_BLOCKLIST.test(r.name)) return;
      if (window.CURATED_STATIONS.some(function (c) { return c.match.test(r.name); })) {
        var cur = curated.filter(function (c) { return window.CURATED_STATIONS.some(function (x) { return x.id === c.id && x.match.test(r.name); }); })[0];
        if (cur && !cur.logo && /^https:/.test(r.favicon || '')) cur.logo = r.favicon;
        return;
      }
      if (!usable([url]).length) return;
      var key = r.name.trim().toLowerCase();
      if (seenUrl[normUrl(url)] || seenName[key]) return;
      seenUrl[normUrl(url)] = true; seenName[key] = true;
      var name = r.name.trim().replace(/\s+/g, ' ');
      extra.push({
        id: r.stationuuid, name: name, en: '',
        mono: (name.replace(/^(radio|راديو|إذاعة)\s+/i, '').split(/[\s\-|]+/)[0] || name).slice(0, 7),
        cat: 'syria', gov: window.GOV_NAMES[(r.state || '').trim().toLowerCase()] || 'أونلاين',
        genre: (r.tags || '').split(',')[0] || '', color: GROUP_COLORS[extra.length % GROUP_COLORS.length],
        urls: [url], logo: /^https:/.test(r.favicon || '') ? r.favicon : '', codec: r.codec || '', bitrate: r.bitrate || 0
      });
    });
    S.all = curated.concat(extra);
    index();
    renderList();
  }
  function fetchJSON(url, ms) {
    return new Promise(function (res, rej) {
      var x = new XMLHttpRequest(); x.open('GET', url); x.timeout = ms;
      x.onload = function () { try { x.status === 200 ? res(JSON.parse(x.responseText)) : rej(); } catch (e) { rej(e); } };
      x.onerror = x.ontimeout = rej; x.send();
    });
  }
  function fetchDirectory(notify) {
    var path = '/json/stations/bycountrycodeexact/SY?hidebroken=true&order=votes&reverse=true&limit=200', i = 0;
    (function attempt() {
      if (i >= API_MIRRORS.length) { if (notify) toast('تعذّر الوصول إلى الدليل'); return; }
      fetchJSON(API_MIRRORS[i++] + path, 8000).then(function (rows) {
        save('directory', { at: Date.now(), rows: rows });
        mergeDirectory(rows);
        if (notify) toast('تم التحديث — ' + catList('syria').length + ' محطة سورية');
      }, attempt);
    })();
  }

  // ---------- البدء ----------
  paintIcons();
  $('hidden-note').textContent = hiddenCount
    ? hiddenCount + ' محطات (مثل روتانا وأورمان وصوت الشباب) تبث بروابط http غير آمنة، ولا يسمح Safari بتشغيلها هنا. تعمل على تطبيق التلفاز.'
    : '';
  var cached = load('directory', null);
  if (cached && cached.rows) mergeDirectory(cached.rows); else renderList();
  var last = load('last', null);
  if (last) {
    var ls = S.byId[last.id] || (usable(last.urls || []).length ? last : null);
    if (ls) { S.current = ls; S.state = 'idle'; }
  }
  renderPlayer();
  renderSleep();
  fetchDirectory(false);
  fetchJSON('status.json?t=' + Date.now(), 8000).then(function (st) {
    save('status', st);
    applyStatus(st);
    renderList();
  }, function () { /* لا يوجد فحص بعد */ });

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(function () { /* ignore */ });
  }
})();
