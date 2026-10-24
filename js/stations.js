// المحطات المختارة — روابط بث حقيقية (تم فحصها في 2026-10-24).
// كل محطة يمكن أن تحمل أكثر من رابط؛ إذا فشل الأول يجرّب التطبيق التالي تلقائياً.
// "match" يُستخدم لدمج نفس المحطة القادمة من دليل Radio Browser وعدم تكرارها.
// cat: 'syria' للمحطات السورية، 'arab' للمحطات العربية. في العربية يحمل gov اسم البلد.
window.CURATED_STATIONS = [
  // ---------- سورية ----------
  {
    id: 'damascus', name: 'إذاعة دمشق', en: 'Damascus Radio', mono: 'دمشق',
    cat: 'syria', gov: 'دمشق', genre: 'منوعات وطرب', color: '#ef4444',
    urls: ['https://stream.damasradio.fm/radio'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /damascus radio|damasradio/i
  },
  {
    id: 'shamfm', name: 'شام إف إم', en: 'Sham FM', mono: 'شام',
    cat: 'syria', gov: 'دمشق', genre: 'أخبار ومنوعات', color: '#f59e0b',
    urls: ['https://radioshamfm.grtvstream.com:8400/;', 'http://66.248.205.220:8400/stream'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /sham ?fm/i
  },
  {
    id: 'ninar', name: 'نينار إف إم', en: 'Ninar FM', mono: 'نينار',
    cat: 'syria', gov: 'دمشق', genre: 'أغاني ومنوعات', color: '#f97316',
    urls: ['https://ninarfm.grtvstream.com:8896/;', 'http://ninarfm.grtvstream.com:8896/;'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /ninar/i
  },
  {
    id: 'asima', name: 'العاصمة أونلاين', en: 'Asima Online Radio', mono: 'العاصمة',
    cat: 'syria', gov: 'دمشق', genre: 'منوعات', color: '#10b981',
    urls: ['https://asima.out.airtime.pro/asima_a', 'http://asima.out.airtime.pro:8000/asima_a'],
    logo: 'https://www.asima-online.net/wp-content/uploads/2020/06/cropped-logo-asima-180x180.png',
    codec: 'MP3', bitrate: 128,
    match: /asima|asemeh/i
  },
  {
    id: 'syriatv', name: 'راديو تلفزيون سوريا', en: 'Syria TV Radio', mono: 'سوريا',
    cat: 'syria', gov: 'عموم سوريا', genre: 'أخبار', color: '#06b6d4',
    urls: ['https://live.kwikmotion.com/syriatvlive/syriatv_audio/playlist.m3u8',
           'https://stream2.syria.fm/syriatv1live/syriatv_audio/icecast.audio'],
    logo: '', codec: 'AAC', bitrate: 128,
    match: /syria tv|althania/i
  },
  {
    id: 'rozana', name: 'راديو روزنة', en: 'Rozana FM', mono: 'روزنة',
    cat: 'syria', gov: 'عموم سوريا', genre: 'أخبار وبرامج', color: '#8b5cf6',
    urls: ['https://stream.radio.co/sea7ed1c60/listen'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /rozana/i
  },
  {
    id: 'karma', name: 'الكرمة إف إم', en: 'Al Karma FM', mono: 'الكرمة',
    cat: 'syria', gov: 'السويداء', genre: 'منوعات', color: '#a855f7',
    urls: ['https://broadcast.shoutstream.co.uk/stream/8112'],
    logo: '', codec: 'AAC', bitrate: 128,
    match: /karma/i
  },
  {
    id: 'sadaljabal', name: 'صدى الجبل', en: 'Sada Al Jabal', mono: 'صدى',
    cat: 'syria', gov: 'السويداء', genre: 'منوعات', color: '#84cc16',
    urls: ['https://radio.hhost.host:8004/stream'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /sada ?al ?ja?bal/i
  },
  {
    id: 'orman', name: 'أورمان جبل العرب', en: 'Orman Radio', mono: 'أورمان',
    cat: 'syria', gov: 'السويداء', genre: 'منوعات', color: '#3b82f6',
    urls: ['http://ormanland.no-ip.info:8200/mp3'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /orman/i
  },
  {
    id: 'arta', name: 'آرتا إف إم', en: 'Arta FM', mono: 'آرتا',
    cat: 'syria', gov: 'الحسكة', genre: 'متعددة اللغات', color: '#14b8a6',
    urls: ['https://edge.mixlr.com/channel/qtgru', 'http://edge.mixlr.com/channel/qtgru'],
    logo: '', codec: 'MP3', bitrate: 0,
    match: /arta/i
  },
  {
    id: 'denge', name: 'دنگێ قامشلو', en: 'Denge Qamishlo', mono: 'قامشلو',
    cat: 'syria', gov: 'الحسكة', genre: 'تراث كردي', color: '#eab308',
    urls: ['https://dengeqamishlo.stream.laut.fm/dengeqamishlo'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /denge qamishlo/i
  },
  {
    id: 'arabesk', name: 'راديو أرابيسك', en: 'Radio Arabesk', mono: 'أرابيسك',
    cat: 'syria', gov: 'أونلاين', genre: 'طرب', color: '#d946ef',
    urls: ['http://185.4.87.79:8000/stream.mp3'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /arabes[kq]/i
  },
  {
    id: 'rayan', name: 'ريان إف إم', en: 'Rayan FM', mono: 'ريان',
    cat: 'syria', gov: 'أونلاين', genre: 'منوعات', color: '#ec4899',
    urls: ['https://broadcast.shoutstream.co.uk:8078/stream'],
    logo: '', codec: 'MP3', bitrate: 96,
    match: /rayan/i
  },
  {
    id: 'helmna', name: 'راديو حلمنا', en: 'Radio Helmna', mono: 'حلمنا',
    cat: 'syria', gov: 'أونلاين', genre: 'منوعات', color: '#22c55e',
    urls: ['https://radiohelmna.com/stream/;'],
    logo: '', codec: 'AAC+', bitrate: 32,
    match: /helmna/i
  },

  {
    id: 'shabab', name: 'صوت الشباب', en: 'Sawt Al Shabab', mono: 'الشباب',
    cat: 'syria', gov: 'دمشق', genre: 'شبابية', color: '#0ea5e9',
    // خادم حكومي — قد لا يعمل إلا من داخل سوريا
    urls: ['http://radioliveb.rtv.gov.sy:8002/RadioShabab'],
    logo: '', codec: 'MP3', bitrate: 0,
    match: /sawt ?al ?shabab/i
  },

  // ---------- عربية ----------
  {
    id: 'rotana', name: 'روتانا إف إم', en: 'Rotana FM', mono: 'روتانا',
    cat: 'arab', gov: 'السعودية', genre: 'أغاني عربية', color: '#be185d',
    urls: ['http://philae.shoutca.st:8250/stream'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /^rotana fm$/i
  },
  {
    id: 'rotanajo', name: 'روتانا الأردن', en: 'Rotana Radio Jordan', mono: 'روتانا',
    cat: 'arab', gov: 'الأردن', genre: 'أغاني عربية', color: '#9d174d',
    urls: ['http://45.63.116.205:8000/stream'],
    logo: '', codec: 'MP3', bitrate: 0,
    match: /rotana radio 99/i
  },
  {
    id: 'mazaj', name: 'مزاج إف إم', en: 'Mazaj FM', mono: 'مزاج',
    cat: 'arab', gov: 'الأردن', genre: 'أغاني عربية', color: '#f43f5e',
    urls: ['https://mazajfm.ice.infomaniak.ch/mazajfm-192.mp3'],
    logo: 'https://mazaj.fm/apple-touch-icon.png', codec: 'MP3', bitrate: 192,
    match: /^mazaj fm$/i
  },
  {
    id: 'fann', name: 'فن إف إم', en: 'Fann FM', mono: 'فن',
    cat: 'arab', gov: 'الأردن', genre: 'أغاني عربية', color: '#fb923c',
    urls: ['http://45.63.116.205:8000/stream2'],
    logo: '', codec: 'MP3', bitrate: 0,
    match: /fann fm/i
  },
  {
    id: 'sawtelghad', name: 'صوت الغد', en: 'Sawt El Ghad', mono: 'الغد',
    cat: 'arab', gov: 'لبنان', genre: 'أغاني عربية', color: '#dc2626',
    urls: ['https://l3.itworkscdn.net/itwaudio/9030/stream'],
    logo: 'https://www.sawtelghad.com/seg.png', codec: 'MP3', bitrate: 128,
    match: /^sawt el ghad( - fm 96\.7)?$/i
  },
  {
    id: 'sawtelghadtarab', name: 'صوت الغد طرب', en: 'Sawt El Ghad Tarab', mono: 'طرب',
    cat: 'arab', gov: 'لبنان', genre: 'طرب أصيل', color: '#b45309',
    urls: ['https://sawtelghad.org:7007/;'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /sawt el ghad - tarab/i
  },
  {
    id: 'nagham', name: 'صوت النغم', en: 'Sawt El Nagham', mono: 'النغم',
    cat: 'arab', gov: 'لبنان', genre: 'طرب', color: '#ca8a04',
    urls: ['https://stream.zeno.fm/66sfwug4ag0uv'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /sawt el nagham/i
  },
  {
    id: 'fairuz', name: 'فيروزيات', en: 'Fairuz', mono: 'فيروز',
    cat: 'arab', gov: 'لبنان', genre: 'فيروز', color: '#0284c7',
    urls: ['https://stream.zeno.fm/xkhnk4vee18uv'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /fairuz/i
  },
  {
    id: 'mixfmlb', name: 'ميكس إف إم', en: 'Mix FM Lebanon', mono: 'MIX',
    cat: 'arab', gov: 'لبنان', genre: 'أجنبي وعربي', color: '#7c3aed',
    urls: ['https://playerservices.streamtheworld.com/api/livestream-redirect/MIXFM_LEBANONAAC_SC'],
    logo: '', codec: 'AAC', bitrate: 64,
    match: /mix fm lebanon/i
  },
  {
    id: 'virginlb', name: 'فيرجن راديو لبنان', en: 'Virgin Radio Lebanon', mono: 'Virgin',
    cat: 'arab', gov: 'لبنان', genre: 'أجنبي', color: '#e11d48',
    urls: ['https://stream.zeno.fm/dwxw3p9vea0uv'],
    logo: '', codec: 'MP3', bitrate: 128,
    match: /^virgin radio lebanon$/i
  },
  {
    id: 'mcd', name: 'مونت كارلو الدولية', en: 'Monte Carlo Doualiya', mono: 'MCD',
    cat: 'arab', gov: 'فرنسا', genre: 'أخبار', color: '#2563eb',
    urls: ['https://montecarlodoualiya128k.ice.infomaniak.ch/mc-doualiya.mp3'],
    logo: 'https://www.mc-doualiya.com/apple-touch-icon.png', codec: 'MP3', bitrate: 128,
    match: /monte carlo doualiya/i
  },
  {
    id: 'bbcarabic', name: 'بي بي سي عربي', en: 'BBC Arabic Radio', mono: 'BBC',
    cat: 'arab', gov: 'بريطانيا', genre: 'أخبار', color: '#b91c1c',
    urls: ['https://stream.live.vc.bbcmedia.co.uk/bbc_arabic_radio'],
    logo: 'https://static.files.bbci.co.uk/ws/simorgh-assets/public/arabic/images/icons/icon-128x128.png',
    codec: 'MP3', bitrate: 56,
    match: /bbc arabic/i
  },
  {
    id: 'skynews', name: 'سكاي نيوز عربية', en: 'Sky News Arabia Radio', mono: 'Sky',
    cat: 'arab', gov: 'الإمارات', genre: 'أخبار', color: '#0891b2',
    urls: ['https://stream.skynewsarabia.com/hls/sna.m3u8'],
    logo: '', codec: 'AAC', bitrate: 128,
    match: /sky news arabia/i
  }
];

// أسماء المحافظات كما تأتي من دليل Radio Browser
window.GOV_NAMES = {
  'damascus': 'دمشق', 'rif dimashq': 'ريف دمشق', 'aleppo': 'حلب', 'latakia': 'اللاذقية',
  'homs': 'حمص', 'hama': 'حماة', 'tartus': 'طرطوس', 'suwayda': 'السويداء', 'as-suwayda': 'السويداء',
  'daraa': 'درعا', 'idlib': 'إدلب', 'raqqa': 'الرقة', 'deir ez-zor': 'دير الزور',
  'al-hasakah': 'الحسكة', 'hasakah': 'الحسكة', 'quneitra': 'القنيطرة'
};

// محطات مُدرجة خطأً تحت سوريا في الدليل، أو رابطها معطّل (Farah FM يعيد صفحة HTML لا بثاً)
window.STATION_BLOCKLIST = /meat ?loaf|farah fm/i;
