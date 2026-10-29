// فحص يومي لروابط المحطات المختارة في js/stations.js، ويكتب النتيجة في status.json.
// التطبيقان (التلفاز والأيفون) يقرآن الملف ويخفيان المحطة إذا فشلت في فحصين متتاليين.
// يستخدم curl لأن خوادم SHOUTcast القديمة ترد بـ "ICY 200" الذي لا يقبله fetch في Node.
import fs from 'node:fs';
import vm from 'node:vm';
import { execFile } from 'node:child_process';

const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
const DEAD_AFTER = 2; // عدد الفحوص الفاشلة المتتالية قبل الإخفاء

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('js/stations.js', 'utf8'), ctx);
const stations = ctx.window.CURATED_STATIONS;

const prev = fs.existsSync('status.json') ? JSON.parse(fs.readFileSync('status.json', 'utf8')) : { stations: {} };

// ok | dead | unknown — unknown (401/403) لا يغيّر حالة المحطة لأن بعض الخوادم ترفض curl وتقبل المتصفح
function probe(url) {
  return new Promise((resolve) => {
    execFile('curl', ['-s', '-L', '-o', process.platform === 'win32' ? 'NUL' : '/dev/null', '-A', UA, '--connect-timeout', '10', '--max-time', '10',
      '-w', '%{http_code}|%{content_type}|%{size_download}', url], (err, stdout) => {
      const [code, type = '', size = '0'] = String(stdout || '').split('|');
      const ct = type.toLowerCase();
      if (code === '401' || code === '403') return resolve('unknown');
      if (code !== '200') return resolve('dead');
      if (ct.includes('mpegurl')) return resolve(Number(size) > 0 ? 'ok' : 'dead');
      if (ct.includes('text/html')) return resolve('dead');
      resolve(Number(size) > 4000 ? 'ok' : 'dead');
    });
  });
}

const now = new Date().toISOString();
const out = { checkedAt: now, deadAfter: DEAD_AFTER, stations: {} };
const newlyDead = [], recovered = [];

await Promise.all(stations.map(async (s) => {
  const results = await Promise.all(s.urls.map(probe));
  const old = prev.stations[s.id] || { streak: 0, lastOk: null };
  let state = results.includes('ok') ? 'ok' : results.includes('unknown') ? 'unknown' : 'dead';
  let streak = old.streak || 0;
  if (state === 'ok') { if (streak >= DEAD_AFTER) recovered.push(s.name); streak = 0; }
  if (state === 'dead') { streak += 1; if (streak === DEAD_AFTER) newlyDead.push(s.name); }
  out.stations[s.id] = { name: s.name, state, streak, lastOk: state === 'ok' ? now : old.lastOk || null };
}));

fs.writeFileSync('status.json', JSON.stringify(out, null, 1) + '\n');

const hidden = Object.values(out.stations).filter((x) => x.streak >= DEAD_AFTER).map((x) => x.name);
const lines = [
  `# فحص المحطات — ${now.slice(0, 10)}`,
  '',
  `- تعمل: ${Object.values(out.stations).filter((x) => x.state === 'ok').length} من ${stations.length}`,
  `- مخفية (فشلت ${DEAD_AFTER} مرات متتالية): ${hidden.length ? hidden.join('، ') : 'لا شيء'}`,
  `- تعطّلت اليوم: ${newlyDead.length ? newlyDead.join('، ') : 'لا شيء'}`,
  `- عادت للعمل: ${recovered.length ? recovered.join('، ') : 'لا شيء'}`
];
fs.writeFileSync('report.md', lines.join('\n') + '\n');
console.log(lines.join('\n'));

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `newly_dead=${newlyDead.length}\n`);
}
