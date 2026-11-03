import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = process.argv[2] ?? fileURLToPath(new URL('../', import.meta.url));
await mkdir(join(root, 'assets/icons'), { recursive: true });
await mkdir(join(root, 'scripts'), { recursive: true });
const escape = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function hero(dark, still) {
  const foreground = dark ? '#e6edf3' : '#24292f';
  const muted = dark ? '#9ca8b5' : '#586069';
  const link = dark ? '#82b4ff' : '#0969da';
  const background = dark ? '#0d1117' : '#ffffff';
  const phrases = ['commit ก่อน เดี๋ยวค่อยเข้าใจ', 'แก้บั๊ก 1 ตัว ได้เพิ่มมาอีก 3', 'มันรันได้ แต่ยังไม่กล้าแตะ', 'README ดูดีแล้ว เหลือโค้ด'];
  const letters = [...'moses0100'].map((letter, i) => `<g class="letter" style="animation-delay:${(i*.11).toFixed(2)}s"><text x="${30+i*45}" y="125">${letter}</text></g>`).join('');
  const typed = still ? `<text x="30" y="183">${phrases[0]}</text>` : phrases.map((phrase, i) => `<g class="phrase" style="animation-delay:${i*6}s"><text x="30" y="183" class="typed" style="animation-delay:${i*6}s">${escape(phrase)}</text></g>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="350" viewBox="0 0 900 350" role="img" aria-labelledby="title desc">
<title id="title">moses0100 — commit ก่อน เดี๋ยวค่อยเข้าใจ</title>
<desc id="desc">ชื่อเด้งทีละตัว ข้อความพิมพ์สลับมุก และแมวตัวอักษรวิ่งพร้อมข้อความ อย่า push .env นะพ่อ</desc>
<style>
text{font-family:Tahoma,'Noto Sans Thai',sans-serif;fill:${foreground}}.name text{font-family:Consolas,monospace;font-size:64px;font-weight:700}.letter{animation:bounce 2.5s ease-in-out infinite}.phrase{opacity:0;animation:phrase 24s linear infinite}.typed{clip-path:inset(0 100% 0 0);animation:typing 24s steps(28,end) infinite}.cursor{animation:blink 1s step-end infinite}.cat{animation:run 12s linear infinite}.cat text{font-family:Consolas,monospace;font-size:18px}.typing text{fill:${link};font-size:24px}.speech{fill:${muted};font-size:15px}
@keyframes bounce{0%,20%,100%{transform:translateY(0)}8%{transform:translateY(-14px)}14%{transform:translateY(3px)}}
@keyframes phrase{0%,24.9%{opacity:1}25%,100%{opacity:0}}
@keyframes typing{0%{clip-path:inset(0 100% 0 0)}9%,19%{clip-path:inset(0 0 0 0)}24%,100%{clip-path:inset(0 100% 0 0)}}
@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes run{from{transform:translateX(-180px)}to{transform:translateX(950px)}}
@media(prefers-reduced-motion:reduce){.letter,.phrase,.typed,.cursor,.cat{animation:none!important}.phrase{display:none}.phrase:first-of-type{display:inline;opacity:1}.typed{clip-path:none}.cat{transform:translateX(350px)}}
${still ? '.letter,.phrase,.typed,.cursor,.cat{animation:none!important}.cat{transform:translateX(350px)}' : ''}
</style>
<rect width="900" height="350" fill="${background}"/>
<text x="30" y="34" style="fill:${muted};font-size:17px">// เข้ามาแล้วอย่าเพิ่งกดออก</text>
<g class="name">${letters}<text x="440" y="125" class="cursor" style="fill:${link}">_</text></g>
<g class="typing">${typed}</g>
<g class="cat"><text x="0" y="276" xml:space="preserve">${' /'+String.fromCharCode(92)+'_/'+String.fromCharCode(92)}</text><text x="0" y="296" xml:space="preserve">( o.o )</text><text x="0" y="316" xml:space="preserve"> &gt; ^ &lt;</text><text x="0" y="247" class="speech" style="font-family:Tahoma,sans-serif;font-size:15px;fill:${muted}">อย่า push .env นะพ่อ</text></g>
<path d="M30 338H870" stroke="${dark?'#30363d':'#d0d7de'}" stroke-dasharray="4 5"/>
</svg>\n`;
}
for (const dark of [true,false]) for (const still of [false,true]) {
 await writeFile(join(root,`assets/chaos-${dark?'dark':'light'}${still?'-still':''}.svg`),hero(dark,still));
}
const readme = `<picture>
  <source media="(prefers-reduced-motion: reduce) and (prefers-color-scheme: dark)" srcset="assets/chaos-dark-still.svg">
  <source media="(prefers-reduced-motion: reduce)" srcset="assets/chaos-light-still.svg">
  <source media="(prefers-color-scheme: dark)" srcset="assets/chaos-dark.svg">
  <img src="assets/chaos-light.svg" alt="moses0100 — commit ก่อน เดี๋ยวค่อยเข้าใจ พร้อมแมวเตือนอย่า push .env" width="900">
</picture>

<sub><a href="assets/chaos-light-still.svg">ดูแบบไม่ขยับ</a></sub>

กำลังฝึก Laravel, React กับ Next.js  
ช่วงนี้กำลังศึกษา AI — ลอง Jev กับ Hermes อยู่  
อันไหนพัง ก็ถือว่าได้เรียนรู้เพิ่ม

### เครื่องมือที่ใช้

<p>
${['php','laravel','react','typescript','nextjs','postgresql','git','n8n'].map((name,i)=>`<img src="assets/icons/${name}.svg" width="48" height="48" alt="${['PHP','Laravel','React','TypeScript','Next.js','PostgreSQL','Git','n8n'][i]}">&nbsp;&nbsp;`).join('\n')}
</p>

### ของที่ทำไว้ เผื่อมีประโยชน์ ↓

| โปรเจกต์ | ทำอะไร |
| --- | --- |
| **RMUTI DORM** | แชตบอตหอพักผ่าน LINE — ถามกฎ เช็กค่าไฟ มีหน้าเจ้าหน้าที่และนำเข้าค่าไฟ PDF/Excel · n8n / RAG / Supabase |
| [**FixIT**](https://github.com/moses0100/fixit) | ระบบแจ้งซ่อมคอมพิวเตอร์ ติดตามสถานะ ออกใบรับซ่อม และรายงาน PDF/Excel · Laravel / MySQL |
| [**Thai PDF Rescue**](https://github.com/moses0100/thai-pdf-rescue) | PDF ภาษาไทย มาคุยกันหน่อย — ดึงข้อความและ OCR ในเบราว์เซอร์ |
| [**RoomFix**](https://github.com/moses0100/roomfix) | ห้องพังแจ้งซ่อม เว็บพังแจ้งผม — แจ้งซ่อม นัดช่าง ติดตามงาน |
| [**RepairDesk**](https://github.com/moses0100/repairdesk) | ระบบร้านซ่อม ที่คนเขียนก็ต้องซ่อม — รับงานซ่อม POS และสต็อก |
| [**DevQuest**](https://github.com/moses0100/devquest) | ทำไปก่อน เก่งทีหลัง — เก็บเป้าหมาย งานย่อย และสิ่งที่เรียนรู้ |

<sub>RMUTI DORM คือโปรเจกต์ที่ใช้ชื่อ RMUTI HOME ในบันทึกช่วงแรก</sub>

---

ถ้าอ่านถึงตรงนี้แล้ว **ไปดูโค้ดด้วย อย่าดูแต่แมว**

<sub>ไอคอน: <a href="https://github.com/devicons/devicon">Devicon</a> · <a href="https://github.com/simple-icons/simple-icons">Simple Icons</a></sub>

<!-- Profile assets: see PROFILE.md for regeneration and rollback. -->
`;
await writeFile(join(root, 'README.md'),readme);
// Ship the source alongside the generated assets so the animation remains editable.
if (fileURLToPath(import.meta.url) !== join(root,'scripts/build-profile.mjs')) {
 await copyFile(fileURLToPath(import.meta.url),join(root,'scripts/build-profile.mjs'));
}
console.log(`Prepared README and four self-contained SVG variants in ${root}`);
