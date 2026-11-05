// ملحقات راديو سوريا: سجل الأغاني، قوائم مخصصة وترتيب، مشاركة، وضع السيارة، أخبار كل ساعة،
// استهلاك البيانات، صحة المحطات، نسخة احتياطية، واللغة. تعتمد على الجسر window.RS من app.js
(function () {
  'use strict';
  var RS = window.RS;
  if (!RS) return;
  var S, $ = function (id) { return document.getElementById(id); };
  var esc = RS.esc, load = RS.load, save = RS.save;

  // ---------- مساعدات ----------
  function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
  function sheet(id, title, body) {
    var h = '<div class="sheet" id="' + id + '" aria-hidden="true"><div class="sheet-bg" data-close="' + id + '"></div>' +
      '<div class="sheet-body about-body"><button class="grab" data-close="' + id + '" aria-label="إغلاق">' + RS.svg('chevron') + '</button>' +
      '<h2>' + title + '</h2>' + body + '</div></div>';
    document.body.appendChild(el(h));
  }
  var I = {
    share: RS.svg('share'),
    list: '<svg viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h10v2H4z"/></svg>',
    car: '<svg viewBox="0 0 24 24"><path d="M5.5 11 7 7.2A2 2 0 0 1 8.9 6h6.2A2 2 0 0 1 17 7.2L18.5 11H20a1 1 0 0 1 1 1v5h-2v1.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V17H8v1.5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V17H3v-5a1 1 0 0 1 1-1zm2.6 0h7.8l-1-2.5H9.1zM6.5 13.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm11 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>',
    tools: RS.svg('gear')
  };

  // ---------- اللغة (ترجمة جزئية للواجهة الثابتة) ----------
  var X = load('x', {});
  function xs() { save('x', X); }
  var LANGS = {
    en: {
      'سورية': 'Syria', 'عربية': 'Arabic', 'المفضلة': 'Favorites', 'الإعدادات': 'Settings',
      'المحطات السورية': 'Syrian stations', 'محطات عربية': 'Arab stations',
      'مفضلة': 'Favorite', 'مؤقت النوم': 'Sleep timer', 'على التلفاز': 'On TV', 'تسجيل': 'Record',
      'مباشر': 'Live', 'الأكثر استماعاً': 'Most played', 'استمعت مؤخراً': 'Recently played',
      'اضغط للتشغيل': 'Tap to play', 'جاري الاتصال…': 'Connecting…', 'مباشر الآن': 'Live now', 'متوقف': 'Paused', 'تعذّر التشغيل': 'Cannot play',
      'السمة': 'Theme', 'لون التطبيق': 'Accent color', 'حجم الخط': 'Font size', 'كثافة القائمة': 'List density',
      'توهّج الخلفية': 'Background glow', 'تقليل الحركة': 'Reduce motion', 'المظهر': 'Appearance', 'الأقسام': 'Sections',
      'آخر ما استمعت': 'Recently played', 'شرائح المحافظات': 'Region chips', 'شريط البحث': 'Search bar',
      'التلفاز والتذكيرات والمزيد': 'TV, reminders & more', 'استعادة الإعدادات الافتراضية': 'Reset to defaults',
      'سجل الأغاني': 'Song history', 'صحة المحطات': 'Station health', 'نسخة احتياطية': 'Backup', 'أدوات إضافية': 'More tools',
      'مشاركة': 'Share', 'قائمة': 'List', 'سيارة': 'Car mode', 'ابحث عن محطة أو مدينة…': 'Search a station or city…'
    },
    de: {
      'سورية': 'Syrien', 'عربية': 'Arabisch', 'المفضلة': 'Favoriten', 'الإعدادات': 'Einstellungen',
      'المحطات السورية': 'Syrische Sender', 'محطات عربية': 'Arabische Sender',
      'مفضلة': 'Favorit', 'مؤقت النوم': 'Einschlaftimer', 'على التلفاز': 'Am TV', 'تسجيل': 'Aufnahme',
      'مباشر': 'Live', 'الأكثر استماعاً': 'Meistgehört', 'استمعت مؤخراً': 'Zuletzt gehört',
      'اضغط للتشغيل': 'Zum Abspielen tippen', 'جاري الاتصال…': 'Verbinde…', 'مباشر الآن': 'Live', 'متوقف': 'Pausiert', 'تعذّر التشغيل': 'Wiedergabe nicht möglich',
      'السمة': 'Design', 'لون التطبيق': 'Akzentfarbe', 'حجم الخط': 'Schriftgröße', 'كثافة القائمة': 'Listendichte',
      'توهّج الخلفية': 'Hintergrund-Glanz', 'تقليل الحركة': 'Weniger Bewegung', 'المظهر': 'Aussehen', 'الأقسام': 'Bereiche',
      'آخر ما استمعت': 'Zuletzt gehört', 'شرائح المحافظات': 'Regionen-Chips', 'شريط البحث': 'Suchleiste',
      'التلفاز والتذكيرات والمزيد': 'TV, Erinnerungen & mehr', 'استعادة الإعدادات الافتراضية': 'Standard wiederherstellen',
      'سجل الأغاني': 'Songverlauf', 'صحة المحطات': 'Senderstatus', 'نسخة احتياطية': 'Sicherung', 'أدوات إضافية': 'Weitere Tools',
      'مشاركة': 'Teilen', 'قائمة': 'Liste', 'سيارة': 'Auto-Modus', 'ابحث عن محطة أو مدينة…': 'Sender oder Stadt suchen…'
    }
  };
  var lang = X.lang || 'ar';
  function T(s) { return lang !== 'ar' && LANGS[lang] && LANGS[lang][s] ? LANGS[lang][s] : s; }
  function translateDom(root) {
    if (lang === 'ar') return;
    var w = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(function (t) {
      var v = t.nodeValue.trim();
      if (v && LANGS[lang][v]) t.nodeValue = t.nodeValue.replace(v, LANGS[lang][v]);
    });
    var q = $('q'); if (q) q.placeholder = T('ابحث عن محطة أو مدينة…');
  }
  function applyLang() {
    if (lang === 'ar') return;
    document.documentElement.lang = lang;
    Object.keys(RS.STATUS).forEach(function (k) { RS.STATUS[k] = T(RS.STATUS[k]); });
    Object.keys(RS.TAB_TITLES).forEach(function (k) { RS.TAB_TITLES[k] = T(RS.TAB_TITLES[k]); });
    RS.PREF_UI.forEach(function (sec) { sec.title = T(sec.title); sec.items.forEach(function (it) { it.label = T(it.label); }); });
  }

  // ---------- سجل الأغاني ----------
  var hist = load('hist', []);
  function histAdd(title, st) {
    if (!title || !st) return;
    if (hist[0] && hist[0].t === title && hist[0].st === st.name) return;
    hist.unshift({ t: title, st: st.name, at: Date.now() });
    if (hist.length > 300) hist.length = 300;
    save('hist', hist);
  }
  function fmtTime(ts) {
    var d = new Date(ts);
    return d.toLocaleDateString('ar', { day: 'numeric', month: 'short' }) + ' ' + d.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' });
  }
  function renderHist() {
    var q = ($('hist-q').value || '').trim().toLowerCase();
    var rows = hist.filter(function (h) { return !q || (h.t + ' ' + h.st).toLowerCase().indexOf(q) >= 0; }).slice(0, 80);
    $('hist-list').innerHTML = rows.length ? rows.map(function (h) {
      return '<div class="xrow"><div class="xmeta"><b>' + esc(h.t) + '</b><span>' + esc(h.st) + ' · ' + fmtTime(h.at) + '</span></div>' +
        '<a class="xbtn" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' + encodeURIComponent(h.t) + '">بحث</a></div>';
    }).join('') : '<p class="muted small">لا توجد أغاني مسجّلة بعد. تظهر هنا الأغاني التي تعرض المحطة اسمها أثناء البث.</p>';
  }

  // ---------- القوائم المخصصة وترتيب المفضلة ----------
  var lists = load('lists', {});            // { اسم: [id, ...] }
  var listSel = '', editMode = false;
  function saveLists() { save('lists', lists); }
  RS.hooks.favBase = function (favs) {
    if (!listSel || !lists[listSel]) return favs;
    return lists[listSel].map(function (id) { return favs.filter(function (f) { return f.id === id; })[0] || RS.findStation(id); }).filter(Boolean);
  };
  RS.hooks.title2 = function (tab) { return tab === 'favs' && listSel && lists[listSel] ? T('المفضلة') + ' · ' + listSel : ''; };
  RS.hooks.after = function () {
    if (S.tab !== 'favs' || S.query) return;
    var names = Object.keys(lists);
    $('chips').innerHTML = ['<button class="chip' + (!listSel ? ' on' : '') + '" data-xlist="">' + T('المفضلة') + ' <i>' + S.favs.length + '</i></button>']
      .concat(names.map(function (n) { return '<button class="chip' + (listSel === n ? ' on' : '') + '" data-xlist="' + esc(n) + '">' + esc(n) + ' <i>' + lists[n].length + '</i></button>'; }))
      .concat(['<button class="chip" data-xnew="1">＋ قائمة</button>', '<button class="chip' + (editMode ? ' on' : '') + '" data-xedit="1">ترتيب</button>']).join('');
    if (editMode) {
      Array.prototype.forEach.call(document.querySelectorAll('#list .row'), function (r) {
        var b = el('<span class="mv"><button type="button" data-mv="-1" aria-label="أعلى">▲</button><button type="button" data-mv="1" aria-label="أسفل">▼</button></span>');
        r.insertBefore(b, r.querySelector('.fav-btn'));
      });
    }
  };
  function moveFav(id, d) {
    var arr = listSel && lists[listSel] ? lists[listSel] : null;
    if (arr) {
      var i = arr.indexOf(id), j = i + d;
      if (i < 0 || j < 0 || j >= arr.length) return;
      arr.splice(j, 0, arr.splice(i, 1)[0]); saveLists();
    } else {
      var k = S.favs.map(function (f) { return f.id; }).indexOf(id), m = k + d;
      if (k < 0 || m < 0 || m >= S.favs.length) return;
      S.favs.splice(m, 0, S.favs.splice(k, 1)[0]); save('favs', S.favs);
    }
    RS.renderList();
  }
  function newList(name) {
    name = (name || '').trim().slice(0, 24);
    if (!name || lists[name]) return name && lists[name] ? name : '';
    if (Object.keys(lists).length >= 12) { RS.toast('الحد الأقصى 12 قائمة'); return ''; }
    lists[name] = []; saveLists(); return name;
  }
  document.addEventListener('click', function (e) {
    var c;
    if ((c = e.target.closest('[data-xlist]'))) { listSel = c.getAttribute('data-xlist'); RS.renderList(); return; }
    if (e.target.closest('[data-xnew]')) { var n = newList(prompt('اسم القائمة الجديدة')); if (n) { listSel = n; RS.renderList(); } return; }
    if (e.target.closest('[data-xedit]')) { editMode = !editMode; RS.renderList(); return; }
  });
  $('list').addEventListener('click', function (e) {
    var b = e.target.closest('[data-mv]');
    if (!b) return;
    e.stopPropagation();
    moveFav(b.closest('.row').getAttribute('data-sid'), +b.getAttribute('data-mv'));
  }, true);
  // اختيار القوائم للمحطة الحالية
  function renderPick() {
    var s = S.current; if (!s) return;
    var names = Object.keys(lists);
    $('pick-list').innerHTML = (names.length ? names.map(function (n) {
      var on = lists[n].indexOf(s.id) >= 0;
      return '<button class="wide-btn ghost pick' + (on ? ' on' : '') + '" data-pick="' + esc(n) + '">' + (on ? '✓ ' : '') + esc(n) + '</button>';
    }).join('') : '<p class="muted small">لا توجد قوائم بعد، أنشئ واحدة.</p>') +
      '<button class="wide-btn" id="pick-new">＋ قائمة جديدة</button>';
  }
  function pickFav(n) {
    var s = S.current; if (!s || !lists[n]) return;
    var i = lists[n].indexOf(s.id);
    if (i >= 0) lists[n].splice(i, 1);
    else {
      lists[n].push(s.id);
      if (!S.favs.some(function (f) { return f.id === s.id; })) { S.favs.push(RS.snapshot(s)); save('favs', S.favs); }
    }
    saveLists(); renderPick(); RS.renderList();
  }

  // ---------- المشاركة ----------
  function shareUrl(s) { return location.origin + location.pathname + '?st=' + encodeURIComponent(s.id) + '&play=1'; }
  function shareStation() {
    var s = S.current; if (!s) return;
    var url = shareUrl(s), data = { title: s.name, text: 'استمع إلى ' + s.name + ' على راديو سوريا', url: url };
    if (navigator.share) { navigator.share(data).catch(function () { /* ألغى المستخدم */ }); return; }
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { RS.toast('نُسخ الرابط'); }, function () { prompt('الرابط', url); });
    else prompt('الرابط', url);
  }

  // ---------- وضع السيارة ----------
  var wake = null;
  function carPaint() {
    var s = S.current, on = S.state === 'playing' || S.state === 'buffering';
    $('car-name').textContent = s ? s.name : '';
    $('car-title').textContent = S.title || RS.STATUS[S.state] || '';
    $('car-play').innerHTML = RS.svg(on ? 'pause' : 'play');
  }
  function carOpen() {
    $('car').classList.add('open'); carPaint();
    try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then(function (w) { wake = w; }, function () {}); } catch (e) { /* ignore */ }
  }
  function carClose() { $('car').classList.remove('open'); try { if (wake) wake.release(); } catch (e) { /* ignore */ } wake = null; }

  // ---------- أخبار كل ساعة ----------
  var newsHour = -1;
  function newsTick() {
    var n = X.news; if (!n || !n.on || !n.id) return;
    var d = new Date(), key = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '-' + d.getHours();
    if (d.getMinutes() > 1 || newsHour === key) return;
    newsHour = key;
    var st = RS.findStation(n.id); if (!st) return;
    if (S.current && S.current.id === st.id && S.state === 'playing') return;
    RS.toast('نشرة الأخبار: ' + st.name); RS.play(st);
  }

  // ---------- استهلاك البيانات (تقدير من نسبة البث × زمن التشغيل) ----------
  var usage = load('usage', {});
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function usageTick() {
    if (S.state !== 'playing' || !S.current) return;
    var kbps = (S.current.bitrate | 0) || 64, k = dayKey();
    usage[k] = (usage[k] || 0) + kbps * 1000 / 8 * 10;
    var keys = Object.keys(usage); if (keys.length > 45) { keys.slice(0, keys.length - 45).forEach(function (x) { delete usage[x]; }); }
    save('usage', usage);
  }
  function mb(b) { return (b / 1048576).toFixed(b > 104857600 ? 0 : 1) + ' MB'; }
  function usageText() {
    var today = usage[dayKey()] || 0, month = 0, now = Date.now();
    Object.keys(usage).forEach(function (k) { var p = k.split('-'); if (now - new Date(+p[0], +p[1] - 1, +p[2]).getTime() < 30 * 864e5) month += usage[k]; });
    return 'اليوم ≈ ' + mb(today) + ' · آخر 30 يوماً ≈ ' + mb(month) + ' (تقدير حسب جودة البث)';
  }

  // ---------- صحة المحطات ----------
  function renderHealth() {
    var dead = [], fail = [];
    S.all.forEach(function (s) { if (RS.deadIds[s.id]) dead.push(s); else if (S.failed[s.id]) fail.push(s); });
    var out = '';
    if (!dead.length && !fail.length) out = '<p class="muted small">كل المحطات تعمل 👌</p>';
    dead.forEach(function (s) { out += '<div class="xrow"><div class="xmeta"><b>' + esc(s.name) + '</b><span>متوقفة (أخفاها الفحص اليومي وتعود وحدها)</span></div></div>'; });
    fail.forEach(function (s) { out += '<div class="xrow"><div class="xmeta"><b>' + esc(s.name) + '</b><span>فشلت مؤخراً</span></div><button class="xbtn" data-retry="' + esc(s.id) + '">جرّب</button></div>'; });
    $('health-list').innerHTML = out;
  }

  // ---------- النسخ الاحتياطي ----------
  var BACKUP_SKIP = { directory: 1, status: 1, failed: 1, usage: 1 };
  function backupData() {
    var d = {};
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k.indexOf('rsm.') !== 0 || BACKUP_SKIP[k.slice(4)]) continue;
      d[k.slice(4)] = localStorage.getItem(k);
    }
    return JSON.stringify({ app: 'radio-syria', v: 1, at: new Date().toISOString(), d: d });
  }
  function backupExport() {
    var txt = backupData(), name = 'radio-syria-backup-' + dayKey() + '.json';
    try {
      var f = new File([txt], name, { type: 'application/json' });
      if (navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f], title: name }).catch(function () {}); return; }
    } catch (e) { /* ننتقل للتنزيل */ }
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([txt], { type: 'application/json' })); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
  }
  function backupImport(file) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var o = JSON.parse(r.result);
        if (!o || o.app !== 'radio-syria' || !o.d) throw new Error('bad');
        Object.keys(o.d).forEach(function (k) { if (!BACKUP_SKIP[k] && typeof o.d[k] === 'string') localStorage.setItem('rsm.' + k, o.d[k]); });
        RS.toast('تمت الاستعادة، جاري إعادة التشغيل…'); setTimeout(function () { location.reload(); }, 900);
      } catch (e) { RS.toast('الملف غير صالح'); }
    };
    r.readAsText(file);
  }

  // ---------- البحث الصوتي ----------
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function voiceSearch() {
    if (!SR) return;
    var r = new SR(); r.lang = lang === 'ar' ? 'ar-SA' : lang === 'de' ? 'de-DE' : 'en-US'; r.interimResults = false;
    RS.toast('تكلّم الآن…');
    r.onresult = function (e) { var t = e.results[0][0].transcript; $('q').value = t; S.query = t.trim(); RS.renderList(); };
    r.onerror = function () { RS.toast('تعذّر التعرّف على الصوت'); };
    try { r.start(); } catch (e) { /* ignore */ }
  }

  // ---------- بناء الواجهة ----------
  function build() {
    S = RS.S;
    // أزرار صف ثانٍ في شاشة التشغيل
    var row = el('<div class="np-actions"><button class="act" id="x-share">' + I.share + '<b>مشاركة</b></button>' +
      '<button class="act" id="x-list">' + I.list + '<b>قائمة</b></button>' +
      '<button class="act" id="x-car">' + I.car + '<b>سيارة</b></button></div>');
    $('np-quality').parentNode.insertBefore(row, $('np-quality'));
    // زر الأدوات في صفحة الإعدادات
    var pm = $('prefs-more'), tb = el('<button class="wide-btn ghost" id="x-tools">أدوات إضافية: سجل الأغاني، النسخ الاحتياطي، اللغة…</button>');
    pm.parentNode.insertBefore(tb, pm);
    // ميكروفون البحث
    if (SR) {
      var mic = el('<button type="button" class="mic" id="x-mic" aria-label="بحث صوتي">🎤</button>');
      $('q').parentNode.appendChild(mic); mic.addEventListener('click', voiceSearch);
    }
    // الشاشات
    sheet('tools-sheet', 'أدوات إضافية',
      '<div class="pref"><span>اللغة</span><div class="seg" id="x-lang"><button type="button" data-l="ar">عربي</button><button type="button" data-l="en">EN</button><button type="button" data-l="de">DE</button></div></div>' +
      '<p class="muted small" style="margin-top:-4px">ترجمة الواجهة الرئيسية فقط، وتُطبَّق بعد إعادة التشغيل.</p>' +
      '<h3>أخبار كل ساعة</h3>' +
      '<div class="pref"><span>شغّل المحطة في أول كل ساعة</span><button type="button" class="switch" id="x-news-on" role="switch"><i></i></button></div>' +
      '<select id="x-news-st" class="xsel"></select>' +
      '<p class="muted small">يعمل ما دام التطبيق مفتوحاً أو يشغّل بثاً في الخلفية. للتنبيه وهو مغلق استعمل «التذكيرات».</p>' +
      '<h3>استهلاك البيانات</h3><p class="muted small" id="x-usage"></p>' +
      '<h3>أدوات</h3>' +
      '<button class="wide-btn ghost" id="x-hist-open">سجل الأغاني</button>' +
      '<button class="wide-btn ghost" id="x-health-open">صحة المحطات</button>' +
      '<h3>نسخة احتياطية</h3>' +
      '<p class="muted small">تحفظ المفضلة والقوائم والإعدادات والتذكيرات المحلية في ملف، وتفيد عند تغيير الجوال أو الفصل بين Safari والتطبيق المثبّت.</p>' +
      '<button class="wide-btn ghost" id="x-bk-out">تصدير نسخة احتياطية</button>' +
      '<button class="wide-btn ghost" id="x-bk-in">استيراد نسخة</button>' +
      '<input type="file" id="x-bk-file" accept="application/json,.json" hidden>' +
      '<h3>اختصار Siri</h3><p class="muted small">أنشئ في تطبيق «الاختصارات» إجراء «فتح عناوين URL» برابط المحطة (زر «مشاركة» في شاشة التشغيل)، ثم قل: «يا Siri، شغّل …».</p>');
    sheet('hist-sheet', 'سجل الأغاني', '<label class="search"><input id="hist-q" type="search" placeholder="ابحث في السجل…"></label><div id="hist-list" class="xlist"></div><button class="wide-btn ghost" id="hist-clear">مسح السجل</button>');
    sheet('health-sheet', 'صحة المحطات', '<div id="health-list" class="xlist"></div><button class="wide-btn ghost" id="health-reset">إعادة المحاولة لكل المحطات</button>');
    sheet('pick-sheet', 'أضف إلى قائمة', '<div id="pick-list" class="xlist"></div>');
    document.body.appendChild(el('<div id="car"><button class="car-x" id="car-x" aria-label="إغلاق">✕</button><div class="car-name" id="car-name"></div><div class="car-title" id="car-title"></div>' +
      '<div class="car-btns"><button id="car-prev" aria-label="السابقة"><span class="mirror">' + RS.svg('prev') + '</span></button><button id="car-play" class="big" aria-label="تشغيل/إيقاف"></button><button id="car-next" aria-label="التالية"><span class="mirror">' + RS.svg('next') + '</span></button></div></div>'));

    // أحداث
    $('x-share').addEventListener('click', shareStation);
    $('x-list').addEventListener('click', function () { renderPick(); RS.openSheet('pick-sheet'); });
    $('x-car').addEventListener('click', carOpen);
    $('car-x').addEventListener('click', carClose);
    $('car-play').addEventListener('click', function () { RS.toggle(); setTimeout(carPaint, 150); });
    $('car-prev').addEventListener('click', function () { RS.step(-1); setTimeout(carPaint, 150); });
    $('car-next').addEventListener('click', function () { RS.step(1); setTimeout(carPaint, 150); });
    setInterval(function () { if ($('car').classList.contains('open')) carPaint(); }, 1500);
    $('pick-list').addEventListener('click', function (e) {
      var b = e.target.closest('[data-pick]');
      if (b) { pickFav(b.getAttribute('data-pick')); return; }
      if (e.target.closest('#pick-new')) { var n = newList(prompt('اسم القائمة الجديدة')); if (n) { pickFav(n); } }
    });
    $('x-tools').addEventListener('click', function () { RS.closeSheet('prefs-sheet'); paintTools(); RS.openSheet('tools-sheet'); });
    $('x-lang').addEventListener('click', function (e) {
      var b = e.target.closest('[data-l]'); if (!b) return;
      X.lang = b.getAttribute('data-l'); xs(); RS.toast('سيُطبّق بعد إعادة التشغيل'); setTimeout(function () { location.reload(); }, 700);
    });
    $('x-news-on').addEventListener('click', function () { X.news = X.news || {}; X.news.on = !X.news.on; if (X.news.on && !X.news.id) X.news.id = $('x-news-st').value; xs(); paintTools(); });
    $('x-news-st').addEventListener('change', function () { X.news = X.news || {}; X.news.id = this.value; xs(); });
    $('x-hist-open').addEventListener('click', function () { RS.closeSheet('tools-sheet'); renderHist(); RS.openSheet('hist-sheet'); });
    $('hist-q').addEventListener('input', renderHist);
    $('hist-clear').addEventListener('click', function () { hist = []; save('hist', hist); renderHist(); });
    $('x-health-open').addEventListener('click', function () { RS.closeSheet('tools-sheet'); renderHealth(); RS.openSheet('health-sheet'); });
    $('health-list').addEventListener('click', function (e) {
      var b = e.target.closest('[data-retry]'); if (!b) return;
      var s = RS.findStation(b.getAttribute('data-retry')); delete S.failed[s.id]; save('failed', S.failed);
      RS.closeSheet('health-sheet'); RS.play(s);
    });
    $('health-reset').addEventListener('click', function () { S.failed = {}; save('failed', {}); renderHealth(); RS.renderList(); RS.toast('أُعيد ضبط الفشل'); });
    $('x-bk-out').addEventListener('click', backupExport);
    $('x-bk-in').addEventListener('click', function () { $('x-bk-file').click(); });
    $('x-bk-file').addEventListener('change', function () { if (this.files[0]) backupImport(this.files[0]); });
  }
  function paintTools() {
    Array.prototype.forEach.call(document.querySelectorAll('#x-lang button'), function (b) { b.classList.toggle('on', b.getAttribute('data-l') === lang); });
    var on = !!(X.news && X.news.on);
    $('x-news-on').classList.toggle('on', on); $('x-news-on').setAttribute('aria-checked', on);
    var sel = $('x-news-st');
    if (!sel.options.length) {
      sel.innerHTML = S.all.filter(function (s) { return (s.cat || 'syria') === 'syria'; }).map(function (s) { return '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>'; }).join('');
    }
    if (X.news && X.news.id) sel.value = X.news.id;
    $('x-usage').textContent = usageText();
  }

  // ---------- رابط المحطة المشتركة ----------
  function openShared() {
    var m = /[?&]st=([^&]+)/.exec(location.search); if (!m) return;
    var s = RS.findStation(decodeURIComponent(m[1]));
    try { history.replaceState(null, '', location.pathname); } catch (e) { /* ignore */ }
    if (!s) { RS.toast('المحطة غير متوفرة'); return; }
    RS.play(s);
  }

  function start() {
    build();
    RS.hooks.title = function (t, st) { histAdd(t, st); };
    setInterval(usageTick, 10000);
    setInterval(newsTick, 20000);
    applyLang();
    translateDom();
    RS.renderPrefs(); RS.renderList(); RS.renderPlayer();
    translateDom($('prefs'));
    openShared();
  }
  if (RS.ready) start(); else RS.onReady = start;
})();
