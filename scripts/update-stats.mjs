import { mkdir, writeFile } from 'node:fs/promises';
const user = 'moses0100';
const projects = ['thai-pdf-rescue', 'roomfix', 'repairdesk', 'devquest'];
const headers = { 'User-Agent': 'Tanawat-Profile', Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
async function get(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${path}`);
  return response.json();
}
const repos = await get(`/users/${user}/repos?per_page=100`);
const since = new Date(Date.now() - 30 * 86400000).toISOString();
const languages = {};
let updates = 0;
for (const project of projects) {
  const sizes = await get(`/repos/${user}/${project}/languages`);
  for (const [name, bytes] of Object.entries(sizes)) languages[name] = (languages[name] ?? 0) + bytes;
  let page = 1;
  for (;;) {
    const commits = await get(`/repos/${user}/${project}/commits?since=${since}&per_page=100&page=${page}`);
    updates += commits.length;
    if (commits.length < 100) break;
    page++;
  }
}
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
const wrap = (title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="188" viewBox="0 0 440 188" role="img"><title>${escape(title)}</title><rect x=".5" y=".5" width="439" height="187" rx="16" fill="#0d1625" stroke="#26364e"/><g font-family="Arial, sans-serif">${body}</g></svg>\n`;
const activity = wrap('Public repositories and commits in four project repositories over the last 30 days', `<text x="24" y="34" fill="#8cabc9" font-size="12" letter-spacing="2">GITHUB / ACTIVITY</text><text x="24" y="98" fill="#f0f6fc" font-size="46" font-weight="700">${repos.length}</text><text x="226" y="98" fill="#78d8ed" font-size="46" font-weight="700">${updates}</text><text x="24" y="126" fill="#b7c9dc" font-size="13">public repositories</text><text x="226" y="126" fill="#b7c9dc" font-size="13">project commits / 30 days</text><text x="24" y="162" fill="#8196ad" font-size="11">Across Thai PDF Rescue, RoomFix, RepairDesk and DevQuest</text>`);
const total = Object.values(languages).reduce((a, b) => a + b, 0);
const top = Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 3);
const colors = ['#78d8ed', '#9b9aee', '#e7b86e'];
const bars = top.map(([name, bytes], i) => {
  const y = 64 + i * 35;
  const pct = total ? bytes / total * 100 : 0;
  return `<text x="24" y="${y}" fill="#dce8f4" font-size="12">${escape(name)}</text><rect x="122" y="${y - 10}" width="230" height="8" rx="4" fill="#1f3046"/><rect x="122" y="${y - 10}" width="${(230 * pct / 100).toFixed(2)}" height="8" rx="4" fill="${colors[i]}"/><text x="366" y="${y}" fill="#b7c9dc" font-size="12">${pct.toFixed(1)}%</text>`;
}).join('');
const language = wrap('Language share by code bytes in four project repositories, not skill ratings', `<text x="24" y="34" fill="#8cabc9" font-size="12" letter-spacing="2">PROJECT LANGUAGES</text>${bars}<text x="24" y="166" fill="#8196ad" font-size="11">Code bytes in the four projects, not proficiency scores.</text>`);
await mkdir('assets', { recursive: true });
await writeFile('assets/activity.svg', activity);
await writeFile('assets/languages.svg', language);
console.log(`Generated cards: ${repos.length} repositories; ${updates} project commits in 30 days.`);
