import { chromium } from "playwright";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch();
for (const w of [1440, 1280]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: "no-preference" });
  const p = await ctx.newPage();
  await p.goto(process.env.QA_URL || "http://localhost:3256", { waitUntil: "networkidle" });
  await sleep(4500);
  await p.screenshot({ path: `qa/shots/final-hero-${w}.png` });
  await ctx.close();
}
await b.close();
