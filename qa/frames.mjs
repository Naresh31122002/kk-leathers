import { chromium } from "playwright";
import fs from "node:fs";
const BASE = process.env.QA_URL || "http://localhost:3260";
fs.mkdirSync("qa/shots/seq", { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));
await p.goto(BASE, { waitUntil: "networkidle" });
await sleep(4500);

const top = await p.evaluate(() => {
  const el = document.getElementById("showcase");
  return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : -1;
});
const vh = 900;
const span = vh * 2.4;

// Sample 12 fine steps through the pinned region → shows how granular motion is.
for (let i = 0; i <= 11; i++) {
  const y = top + Math.round(span * (i / 11));
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await sleep(420);
  await p.screenshot({ path: `qa/shots/seq/f${String(i).padStart(2, "0")}.png`, clip: { x: 120, y: 120, width: 1200, height: 700 } });
}
// Reverse spot-check.
await p.evaluate((yy) => window.scrollTo(0, yy), top + span);
await sleep(300);
await p.evaluate((yy) => window.scrollTo(0, yy), top + span * 0.35);
await sleep(600);
await p.screenshot({ path: "qa/shots/seq/reverse.png", clip: { x: 120, y: 120, width: 1200, height: 700 } });

console.log("frame count in DOM sequence:", await p.evaluate(() => {
  // Count preloaded images the component created (best-effort).
  return performance.getEntriesByType("resource").filter((r) => r.name.includes("/frames-web/")).length;
}));
console.log("errors:", errs.length);
await b.close();
