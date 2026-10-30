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
    tv: '<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-5.5l1.2 2H17v2H7v-2h1.3l1.2-2H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2v8h14V7z"/>',
    rec: '<circle cx="12" cy="12" r="6"/>',
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

  // الوسيط (Cloudflare Worker): يعيد بث محطات http عبر https، ويجلب اسم الأغنية الحالية
  var PROXY = (window.PROXY_BASE || '').replace(/\/$/, '');
  var PROXY_IDS = window.PROXY_IDS || [];
  var NP_IDS = window.NP_IDS || [];

  var curated = [], hiddenCount = 0;
  window.CURATED_STATIONS.forEach(function (s) {
    var o = {}; for (var k in s) if (k !== 'match') o[k] = s[k];
    o.urls = usable(s.urls);
    if (!o.urls.length && PROXY && PROXY_IDS.indexOf(s.id) >= 0) o.urls = [PROXY + '/stream/' + s.id];
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
  // «الأكثر استماعاً» يُرسم مع القائمة
  var renderRecentBase = renderRecent;
  renderRecent = function () { renderRecentBase(); renderTop(); };

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

  function statusText() { return holding && S.state === 'buffering' ? 'انقطع البث — جاري إعادة الاتصال…' : STATUS[S.state]; }
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
    $('mini-status').textContent = S.title && S.state === 'playing' ? S.title : statusText();
    $('np-status').textContent = statusText();
    $('np-title').textContent = S.title || '';
    $('np-title').classList.toggle('hidden', !S.title);
    renderSongBtn();
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
        title: S.title || s.name,
        artist: S.title ? s.name : ([s.gov, s.genre].filter(Boolean).join(' · ') || 'راديو سوريا'),
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

  // اسم الأغنية الحالية: يُجلب من الوسيط كل 20 ثانية أثناء التشغيل
  var npTimer;
  function setTitle(t) {
    if ((t || null) === (S.title || null)) return;
    S.title = t || null;
    renderPlayer();
    updateMediaSession();
  }
  function pollNowPlaying() {
    clearTimeout(npTimer);
    var s = S.current;
    if (!PROXY || !s || S.state !== 'playing' || NP_IDS.indexOf(s.id) < 0) return;
    fetchJSON(PROXY + '/np/' + encodeURIComponent(s.id), 9000).then(function (r) {
      if (S.current && S.current.id === s.id) setTitle(r && r.title);
    }, function () { /* نبقي العنوان السابق */ }).then(function () {
      npTimer = setTimeout(pollNowPlaying, 20000);
    });
  }

  var watchdog;
  // نية المستخدم: طالما لم يضغط إيقاف، نعيد الاتصال تلقائياً بعد أي انقطاع (شبكة الجوال تذهب وتعود)
  var wantPlay = false, playedOk = false, holding = false, retryN = 0, retryTimer, silentUrl = null;
  function setState(st) {
    S.state = st;
    clearTimeout(watchdog);
    if (st !== 'playing' && st !== 'buffering') { clearTimeout(npTimer); S.title = null; }
    if (st === 'buffering' && !holding) watchdog = setTimeout(function () { if (S.state === 'buffering') tryNextUrl(); }, BUFFER_WATCHDOG_MS);
    renderPlayer();
    updateMediaSession();
  }

  function play(station, urlIdx, auto) {
    if (!station) return;
    if (!auto) { wantPlay = true; playedOk = false; retryN = 0; clearTimeout(retryTimer); }
    holding = false; audio.loop = false;
    S.current = station;
    S.urlIdx = urlIdx || 0;
    clearTimeout(npTimer); S.title = null;
    save('last', snapshot(station));
    audio.src = station.urls[S.urlIdx];
    setState('buffering');
    var p = audio.play();
    if (p && p.catch) p.catch(function (e) { if (e && e.name === 'NotAllowedError') setState('paused'); });
  }

  // صمت قصير يدور أثناء الانتظار: يُبقي جلسة الصوت حيّة فلا يوقف iOS الصفحة في الخلفية قبل عودة الشبكة
  function silence() {
    if (silentUrl) return silentUrl;
    var n = 8000, b = new Uint8Array(44 + n), v = new DataView(b.buffer);
    function str(o, s) { for (var i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); }
    str(0, 'RIFF'); v.setUint32(4, 36 + n, true); str(8, 'WAVEfmt '); v.setUint32(16, 16, true);
    v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, 8000, true); v.setUint32(28, 8000, true);
    v.setUint16(32, 1, true); v.setUint16(34, 8, true); str(36, 'data'); v.setUint32(40, n, true);
    for (var i = 44; i < b.length; i++) b[i] = 128;
    silentUrl = URL.createObjectURL(new Blob([b], { type: 'audio/wav' }));
    return silentUrl;
  }
  function hold() {
    holding = true; audio.loop = true; audio.src = silence();
    var p = audio.play();
    if (p && p.catch) p.catch(function () { /* ignore */ });
    setState('buffering');
  }
  function scheduleResume() {
    clearTimeout(retryTimer);
    if (!wantPlay || !S.current) return;
    var d = [2000, 4000, 7000, 12000][Math.min(retryN, 3)] || 15000;
    if (retryN > 3) d = 15000;
    retryTimer = setTimeout(function () {
      if (!wantPlay || !S.current || (S.state === 'playing' && !holding)) return;
      if (navigator.onLine === false) { scheduleResume(); return; }
      retryN++;
      play(S.current, 0, true);
    }, d);
  }
  function resumeNow() {
    if (!wantPlay || !S.current || navigator.onLine === false) return;
    if (!holding && (S.state === 'playing' || S.state === 'buffering')) return;
    retryN = 0; clearTimeout(retryTimer);
    play(S.current, 0, true);
  }

  function tryNextUrl() {
    var s = S.current;
    if (!s) return;
    var reconnect = wantPlay && playedOk;      // كان يعمل ثم انقطع: نبقى نحاول بدل إعلان المحطة معطّلة
    if (navigator.onLine === false) {
      if (reconnect) { hold(); toast('انقطع الإنترنت — سيعود التشغيل تلقائياً'); scheduleResume(); return; }
      audio.pause(); setState('error');
      toast('لا يوجد اتصال بالإنترنت — سأعيد المحاولة تلقائياً');
      return;
    }
    if (S.urlIdx + 1 < s.urls.length) { toast('المحطة لا تستجيب — جاري التبديل لرابط احتياطي'); play(s, S.urlIdx + 1, true); return; }
    if (reconnect) { hold(); toast('انقطع البث — جاري إعادة الاتصال'); scheduleResume(); return; }
    audio.pause();
    S.failed[s.id] = Date.now(); save('failed', S.failed);
    setState('error');
    toast('تعذّر الاتصال ببث «' + s.name + '»');
  }

  // البث المباشر: الإيقاف يفصل الاتصال، والاستئناف يعود للبث الحي
  function stop() {
    wantPlay = false; holding = false; clearTimeout(retryTimer); audio.loop = false;
    audio.pause(); setState('paused');
  }
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

  window.addEventListener('online', function () { if (S.current && S.state === 'error') play(S.current, 0, true); else resumeNow(); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) resumeNow(); });

  audio.addEventListener('playing', function () {
    if (holding) return;                       // هذا صوت الانتظار الصامت لا البث
    var s = S.current;
    playedOk = true; retryN = 0;
    if (S.failed[s.id]) { delete S.failed[s.id]; save('failed', S.failed); }
    S.recent = [snapshot(s)].concat(S.recent.filter(function (r) { return r.id !== s.id; })).slice(0, RECENT_MAX);
    save('recent', S.recent);
    setState('playing');
    renderRecent();
    pollNowPlaying();
  });
  audio.addEventListener('waiting', function () { if (S.state === 'playing' && !holding) setState('buffering'); });
  audio.addEventListener('pause', function () { if (S.state === 'playing' || S.state === 'buffering') setState('paused'); });
  audio.addEventListener('error', function () { if ((S.state === 'buffering' || S.state === 'playing') && !holding) tryNextUrl(); });
  audio.addEventListener('ended', function () { if (S.current && !holding) play(S.current, S.urlIdx, true); });
  function toggleFav(s) {
    if (!s) return;
    if (isFav(s)) { S.favs = S.favs.filter(function (f) { return f.id !== s.id; }); toast('أُزيلت من المفضلة'); }
    else { S.favs.push(snapshot(s)); toast('أُضيفت إلى المفضلة ♥'); }
    save('favs', S.favs);
    renderList();
    renderPlayer();
    syncAll();
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

  // ---------- أغاني محفوظة (اسم الأغنية فقط، للبحث عنها لاحقاً) ----------
  var songs = load('songs', []);
  function songKey(t, st) { return st + '|' + t; }
  function songSaved() { return !!S.title && songs.some(function (x) { return songKey(x.t, x.st) === songKey(S.title, S.current.name); }); }
  function renderSongs() {
    $('songs').innerHTML = songs.length ? songs.map(function (x, i) {
      return '<div class="song"><a target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' + encodeURIComponent(x.t) + '">' +
        esc(x.t) + '<small>' + esc(x.st) + '</small></a><button data-song-del="' + i + '" aria-label="حذف">✕</button></div>';
    }).join('') : '<p class="muted small">اضغط «احفظ الأغنية» أثناء الاستماع لتظهر هنا.</p>';
  }
  function renderSongBtn() {
    if (!songs) return;
    var b = $('np-song-save'), show = !!(S.title && S.current && S.state === 'playing');
    b.classList.toggle('hidden', !show);
    if (show) { var on = songSaved(); b.classList.toggle('on', on); b.querySelector('b').textContent = on ? 'محفوظة' : 'احفظ الأغنية'; }
  }
  $('np-song-save').addEventListener('click', function () {
    if (!S.title || !S.current || songSaved()) return;
    songs.unshift({ t: S.title, st: S.current.name, at: Date.now() });
    songs = songs.slice(0, 100);
    save('songs', songs); renderSongs(); renderSongBtn(); toast('حُفظت الأغنية ♥');
  });
  $('songs').addEventListener('click', function (e) {
    var d = e.target.closest('[data-song-del]');
    if (!d) return;
    songs.splice(+d.getAttribute('data-song-del'), 1);
    save('songs', songs); renderSongs(); renderSongBtn();
  });
  renderSongs();

  // ---------- الإرسال إلى التلفاز ----------
  function sendCast(cmd) {
    var code = load('castCode', '');
    if (!PROXY) { toast('الوسيط غير مفعّل'); return; }
    if (!/^\d{6}$/.test(code)) { openSheet('about'); toast('اكتب رمز الربط من التلفاز أولاً'); return; }
    if (cmd === 'play' && !S.current) return;
    fetch(PROXY + '/cast/' + code, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ cmd: cmd, id: cmd === 'play' ? S.current.id : '' })
    }).then(function (r) {
      if (!r.ok) throw 0;
      if (cmd === 'play') { toast('أُرسلت «' + S.current.name + '» إلى التلفاز'); stop(); }
      else if (cmd === 'stop') toast('أُوقف البث على التلفاز');
    }, function () { toast('تعذّر الاتصال بالوسيط'); }).catch(function () { toast('تعذّر الإرسال'); });
  }
  $('np-cast').addEventListener('click', function () { sendCast('play'); });
  $('cast-stop').addEventListener('click', function () { sendCast('stop'); });
  $('cast-code').value = load('castCode', '');
  $('cast-code').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 6);
    save('castCode', this.value);
  });

  // ---------- التذكيرات: منبّه صباحي أو تنبيه ببرنامج (إشعار Web Push من الوسيط) ----------
  var VAPID_PUBLIC = 'BNsJwY6OzWhz01bgbV0290oeSWu9qhmSjckoKmJEksh4KZ4j1rsAcZtmbiks4Zasix6Ns1ODXq9Op6WJPA6c9Yk';
  var DAY_NAMES = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
  var reminders = load('reminders', null);
  if (!reminders) {                              // ترحيل المنبّه الوحيد من النسخة 1.4
    var old = load('alarm', null);
    reminders = old && old.on ? [{ rid: '0', time: old.time, station: old.station, label: 'منبّه صباحي', days: old.days }] : [];
    save('reminders', reminders);
  }
  var draftDays = [0, 1, 2, 3, 4, 5, 6];

  function stationOptions(sel, withNone) {
    var opts = catList('syria').concat(catList('arab')), keep = sel.value;
    sel.innerHTML = (withNone ? '<option value="">— لا شيء —</option>' : '') +
      opts.map(function (s) { return '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>'; }).join('');
    if (keep) sel.value = keep;
  }
  function daysText(d) {
    if (d.length === 7) return 'يومياً';
    return d.slice().sort().map(function (i) { return DAY_NAMES[i]; }).join('، ');
  }
  function renderAlarm() {
    stationOptions($('alarm-station'));
    $('alarm-days').innerHTML = DAY_NAMES.map(function (n, i) {
      return '<button type="button" class="day' + (draftDays.indexOf(i) >= 0 ? ' on' : '') + '" data-day="' + i + '">' + n + '</button>';
    }).join('');
    $('reminders').innerHTML = reminders.length ? reminders.map(function (r) {
      var st = S.byId[r.station];
      return '<div class="song"><div style="flex:1;min-width:0"><b>' + esc(r.time) + '</b> ' + esc(r.label || '') +
        '<small>' + esc(daysText(r.days)) + (st ? ' · ' + esc(st.name) : '') + '</small></div>' +
        '<button data-rem-del="' + esc(r.rid) + '" aria-label="حذف">✕</button></div>';
    }).join('') : '<p class="muted small">لا توجد تذكيرات.</p>';
  }
  function b64ToBytes(s) {
    var raw = atob(s.replace(/-/g, '+').replace(/_/g, '/')), out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }
  function pushSub(create) {
    return navigator.serviceWorker.ready.then(function (reg) {
      return reg.pushManager.getSubscription().then(function (sub) {
        return sub || (create ? reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToBytes(VAPID_PUBLIC) }) : null);
      });
    });
  }
  function postAlarm(sub, r, on) {
    var t = (r.time || '07:00').split(':');
    return fetch(PROXY + '/alarm', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        sub: sub, on: on, rid: r.rid, label: r.label || '', station: r.station || '', hh: +t[0], mm: +t[1], days: r.days,
        tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC')
      })
    }).then(function (res) { if (!res.ok) throw 0; });
  }
  function reminderAdd() {
    if (!PROXY) { toast('الوسيط غير مفعّل'); return; }
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !window.Notification) {
      toast('ثبّت التطبيق على الشاشة الرئيسية أولاً (iOS 16.4 أو أحدث)'); return;
    }
    if (!draftDays.length) { toast('اختر يوماً واحداً على الأقل'); return; }
    var r = {
      rid: Math.random().toString(36).slice(2, 8), time: $('alarm-time').value || '07:00', station: $('alarm-station').value,
      label: $('alarm-label').value.trim(), days: draftDays.slice()
    };
    Notification.requestPermission().then(function (perm) {
      if (perm !== 'granted') throw new Error('perm');
      return pushSub(true);
    }).then(function (sub) {
      return postAlarm(sub.toJSON(), r, true);
    }).then(function () {
      reminders.push(r); save('reminders', reminders); $('alarm-label').value = ''; renderAlarm(); toast('تمت إضافة التذكير ⏰');
    }).catch(function (e) {
      toast(e && e.message === 'perm' ? 'اسمح بالإشعارات من إعدادات الأيفون' : 'تعذّر إضافة التذكير');
    });
  }
  function reminderDel(rid) {
    pushSub(false).then(function (sub) {
      return sub ? postAlarm(sub.toJSON(), { rid: rid }, false) : null;
    }).then(function () {
      reminders = reminders.filter(function (r) { return r.rid !== rid; });
      save('reminders', reminders); renderAlarm(); toast('حُذف التذكير');
    }, function () { toast('تعذّر الحذف'); });
  }
  $('alarm-save').addEventListener('click', reminderAdd);
  $('reminders').addEventListener('click', function (e) {
    var d = e.target.closest('[data-rem-del]');
    if (d) reminderDel(d.getAttribute('data-rem-del'));
  });
  $('alarm-days').addEventListener('click', function (e) {
    var b = e.target.closest('[data-day]');
    if (!b) return;
    var d = +b.getAttribute('data-day'), i = draftDays.indexOf(d);
    if (i >= 0) draftDays.splice(i, 1); else draftDays.push(d);
    b.classList.toggle('on');
  });
  $('about-btn').addEventListener('click', renderAlarm);

  // الضغط على إشعار التذكير: زر كبير للتشغيل (Safari يشترط لمسة لبدء الصوت)
  var ringStation = null;
  function showRing(stationId, label) {
    var st = S.byId[stationId] || S.current;
    if (!st) return;
    ringStation = st;
    $('ring-title').textContent = label || 'صباح الخير ☀️';
    $('alarm-play').textContent = 'تشغيل ' + st.name;
    $('alarm-ring').classList.remove('hidden');
  }
  $('alarm-play').addEventListener('click', function () {
    $('alarm-ring').classList.add('hidden');
    play(ringStation);
  });
  $('alarm-dismiss').addEventListener('click', function () { $('alarm-ring').classList.add('hidden'); });
  var qs = new URLSearchParams(location.search);
  if (qs.get('alarm') === '1') {
    try { history.replaceState(null, '', location.pathname); } catch (e) { /* ignore */ }
    showRing(qs.get('st'), qs.get('label'));
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', function (e) { if (e.data && e.data.alarm) showRing(e.data.station, e.data.label); });
  }

  // ---------- مزامنة المفضلة مع التلفاز + محطة كل فترة من اليوم ----------
  var favBase = load('favBase', null);
  var SLOT_KEYS = ['m', 'a', 'e', 'n'];
  function castCodeOk() { return /^\d{6}$/.test(load('castCode', '')); }
  function syncPost(body) {
    return fetch(PROXY + '/sync/' + load('castCode', ''), {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body)
    }).then(function (r) { if (!r.ok) throw 0; return r.json(); });
  }
  function renderSlots() {
    var slots = load('slots', {});
    SLOT_KEYS.forEach(function (k) {
      var sel = $('slot-' + k);
      stationOptions(sel, true);
      sel.value = slots[k] && S.byId[slots[k]] ? slots[k] : '';
    });
  }
  function syncAll(extra) {
    if (!PROXY || !castCodeOk()) return;
    var ids = S.favs.map(function (f) { return f.id; }), base = favBase || [];
    var body = {
      add: ids.filter(function (i) { return base.indexOf(i) < 0; }),
      remove: base.filter(function (i) { return ids.indexOf(i) < 0; })
    };
    if (extra) for (var k in extra) body[k] = extra[k];
    syncPost(body).then(function (r) {
      var next = (r.favs || []).map(function (id) {
        return S.favs.filter(function (f) { return f.id === id; })[0] || (S.byId[id] && snapshot(S.byId[id]));
      }).filter(Boolean);
      favBase = next.map(function (f) { return f.id; }); save('favBase', favBase);   // معرّفات مجهولة هنا تبقى على الخادم
      save('slots', r.slots || {});
      if (next.map(function (f) { return f.id; }).join() !== ids.join()) { S.favs = next; save('favs', S.favs); renderList(); renderPlayer(); }
      renderSlots();
    }, function () { /* نعيد المحاولة لاحقاً */ });
  }
  SLOT_KEYS.forEach(function (k) {
    $('slot-' + k).addEventListener('change', function () {
      var slots = {};
      SLOT_KEYS.forEach(function (x) { if ($('slot-' + x).value) slots[x] = $('slot-' + x).value; });
      save('slots', slots);
      if (!castCodeOk()) { toast('اكتب رمز الربط أولاً ليصل إلى التلفاز'); return; }
      syncAll({ slots: slots }); toast('حُفظ');
    });
  });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) syncAll(); });

  // ---------- ريموت التلفاز ----------
  var remoteTimer;
  function remoteTick() {
    if (!$('remote').classList.contains('open')) { clearInterval(remoteTimer); return; }
    if (!castCodeOk()) { $('tv-now').textContent = 'اكتب رمز الربط أولاً'; return; }
    fetch(PROXY + '/cast/' + load('castCode', '') + '/state?t=' + Date.now()).then(function (r) { return r.json(); }).then(function (st) {
      var online = st.at && Date.now() - st.at < 30000;
      var s = st.sid && S.byId[st.sid];
      $('tv-now').textContent = online ? (s ? s.name : 'لا محطة') : 'التلفاز غير متصل';
      $('tv-state').textContent = online ? (st.p ? 'يعمل الآن' : 'متوقف') + ' · الصوت ' + st.v + '%' : 'افتح تطبيق راديو سوريا على التلفاز';
    }, function () { /* نبقي القيمة السابقة */ });
  }
  $('remote-open').addEventListener('click', function () {
    closeSheet('about'); openSheet('remote');
    remoteTick(); clearInterval(remoteTimer); remoteTimer = setInterval(remoteTick, 3000);
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-rc]'), function (b) {
    b.addEventListener('click', function () { sendCast(b.getAttribute('data-rc')); setTimeout(remoteTick, 1500); });
  });

  // ---------- الاستماع: الأكثر استماعاً ----------
  var stats = load('stats', { s: {} });
  setInterval(function () {
    if (S.state !== 'playing' || !S.current) return;
    stats.s[S.current.id] = (stats.s[S.current.id] || 0) + 30;
    save('stats', stats);
  }, 30000);
  function topStations() {
    return Object.keys(stats.s).filter(function (id) { return stats.s[id] >= 300 && S.byId[id] && !deadIds[id]; })
      .sort(function (a, b) { return stats.s[b] - stats.s[a]; }).slice(0, 5).map(function (id) { return S.byId[id]; });
  }
  function renderTop() {
    var list = topStations(), show = S.tab === 'syria' && !S.query && list.length > 0;
    $('top-wrap').classList.toggle('hidden', !show);
    if (!show) return;
    $('top').innerHTML = list.map(function (s) {
      return '<button class="tile" data-sid="' + esc(s.id) + '">' + artHTML(s) + '<b>' + esc(s.name) + '</b></button>';
    }).join('');
    hydrateLogos($('top'));
    var total = Object.keys(stats.s).reduce(function (a, k) { return a + stats.s[k]; }, 0);
    $('stat-note').textContent = 'إجمالي استماعك: ' + (total / 3600).toFixed(1) + ' ساعة';
  }

  // ---------- تسجيل البث (يُحفظ في الأيفون) ----------
  var REC_MAX_MS = 60 * 60 * 1000;
  var rec = null, recFile = null;
  function recName(station, ext) {
    var d = new Date(), p = function (n) { return String(n).padStart(2, '0'); };
    return (station.name.replace(/[^\w؀-ۿ]+/g, '-') + '-' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '-' + p(d.getHours()) + p(d.getMinutes()) + '.' + ext);
  }
  function renderRec() {
    var b = $('np-rec');
    b.classList.toggle('on', !!rec);
    b.querySelector('b').textContent = rec ? '● ' + Math.floor((Date.now() - rec.t0) / 60000) + ':' + String(Math.floor((Date.now() - rec.t0) / 1000) % 60).padStart(2, '0') : 'تسجيل';
    $('rec-save').classList.toggle('hidden', !recFile);
    if (recFile) $('rec-save').querySelector('b').textContent = 'حفظ التسجيل (' + (recFile.size / 1048576).toFixed(1) + ' MB)';
  }
  function recStop() {
    if (!rec) return;
    var r = rec; rec = null;
    clearInterval(r.timer); r.ctl.abort();
    if (r.bytes > 0) {
      var ext = /aac|mp4/i.test(r.type) ? 'aac' : 'mp3';
      recFile = new File(r.chunks, recName(r.station, ext), { type: r.type || 'audio/mpeg' });
      toast('انتهى التسجيل — اضغط «حفظ التسجيل»');
    }
    renderRec();
  }
  function recStart() {
    var s = S.current;
    if (!s) return;
    if (!PROXY || NP_IDS.indexOf(s.id) < 0) { toast('التسجيل غير متاح لهذه المحطة'); return; }
    recFile = null;
    var r = rec = { station: s, chunks: [], bytes: 0, t0: Date.now(), ctl: new AbortController(), type: '' };
    r.timer = setInterval(function () { if (Date.now() - r.t0 > REC_MAX_MS) recStop(); else renderRec(); }, 1000);
    fetch(PROXY + '/stream/' + encodeURIComponent(s.id), { signal: r.ctl.signal }).then(function (res) {
      if (!res.ok || !res.body) throw 0;
      r.type = res.headers.get('content-type') || '';
      var reader = res.body.getReader();
      (function pump() {
        return reader.read().then(function (x) {
          if (x.done || rec !== r) return;
          r.chunks.push(x.value); r.bytes += x.value.length;
          return pump();
        });
      })().then(function () { if (rec === r) recStop(); }, function () { if (rec === r) recStop(); });
    }).catch(function () { if (rec === r) { rec = null; clearInterval(r.timer); renderRec(); toast('تعذّر بدء التسجيل'); } });
    toast('بدأ التسجيل — أبقِ التطبيق مفتوحاً');
    renderRec();
  }
  $('np-rec').addEventListener('click', function () { if (rec) recStop(); else recStart(); });
  $('rec-save').addEventListener('click', function () {
    if (!recFile) return;
    var f = recFile;
    if (navigator.canShare && navigator.canShare({ files: [f] })) {
      navigator.share({ files: [f] }).catch(function () { /* أُلغيت المشاركة */ });
    } else {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(f); a.download = f.name; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
    }
  });

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
    ? hiddenCount + ' محطات لا تعمل هنا: إما تبث بروابط غير آمنة (http) يمنعها Safari، أو لا تفتح إلا من داخل سوريا. بعضها يعمل على تطبيق التلفاز.'
    : '';
  var cached = load('directory', null);
  if (cached && cached.rows) mergeDirectory(cached.rows); else renderList();
  var last = load('last', null);
  if (last) {
    var ls = S.byId[last.id] || (usable(last.urls || []).length ? last : null);
    if (ls) { S.current = ls; S.state = 'idle'; }
  }
  // محطة هذه الفترة من اليوم (من الإعدادات) تُعرض في المشغّل الصغير جاهزة للتشغيل
  var slotKey = (function () { var h = new Date().getHours(); return h < 5 ? 'n' : h < 12 ? 'm' : h < 18 ? 'a' : 'e'; })();
  var slotSt = S.byId[load('slots', {})[slotKey]];
  if (slotSt) { S.current = slotSt; S.state = 'idle'; }
  renderPlayer();
  renderSleep();
  renderSlots();
  renderRec();
  renderTop();
  syncAll();
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
