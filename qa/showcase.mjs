import { chromium } from "playwright";
import fs from "node:fs";
const BASE = process.env.QA_URL || "http://localhost:3252";
const OUT = "qa/shots";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push("PAGEERR: " + e.message));
await p.goto(BASE, { waitUntil: "networkidle" });
await sleep(4500);

// Find the showcase top offset.
const showTop = await p.evaluate(() => {
  const el = document.getElementById("showcase");
  return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : -1;
});
console.log("showcase top:", showTop);

// Scroll slowly through the pinned region (approx +2.4 viewports) and screenshot.
const vh = 900;
const start = showTop;
const positions = [];
for (let i = 0; i <= 8; i++) {
  const y = start + Math.round((vh * 2.4) * (i / 8));
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await sleep(500);
  await p.screenshot({ path: `${OUT}/showcase-${i}.png` });
  positions.push(y);
}
console.log("captured showcase frames at:", positions.join(", "));

// Reverse: scroll back up through the region, screenshot midway to confirm reverse.
await p.evaluate((yy) => window.scrollTo(0, yy), start + vh * 2.4);
await sleep(400);
await p.evaluate((yy) => window.scrollTo(0, yy), start + vh * 0.6);
await sleep(700);
await p.screenshot({ path: `${OUT}/showcase-reverse.png` });

console.log("pageerrors:", errs);
await b.close();
