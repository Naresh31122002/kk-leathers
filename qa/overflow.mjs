import { chromium } from "playwright";
const BASE = process.env.QA_URL || "http://localhost:3240";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
for (const w of [1280, 1366, 1440]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: 900 },
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await sleep(4500);
  // Walk the whole page a bit so lazy content mounts, then scan.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 800) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await sleep(500);
  const offenders = await page.evaluate((vw) => {
    const out = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 || r.left < -1) {
        if (r.width > 0 && r.height > 0) {
          out.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className || "").toString().slice(0, 60),
            left: Math.round(r.left),
            right: Math.round(r.right),
            w: Math.round(r.width),
          });
        }
      }
    });
    // De-dupe similar, keep the widest offenders.
    return out.sort((a, b) => b.right - a.right).slice(0, 8);
  }, w);
  console.log(`\n=== ${w}px offenders (right > ${w}) ===`);
  offenders.forEach((o) =>
    console.log(`  <${o.tag} class="${o.cls}"> left=${o.left} right=${o.right} w=${o.w}`)
  );
  await ctx.close();
}
await browser.close();
