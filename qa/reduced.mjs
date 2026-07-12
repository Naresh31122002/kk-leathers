import { chromium } from "playwright";
import fs from "node:fs";
const BASE = process.env.QA_URL || "http://localhost:3255";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch();
// reducedMotion "reduce" → our GSAP layer disables; static fallbacks must show.
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
const errs = [];
p.on("pageerror", (e) => errs.push("PAGEERR: " + e.message));
await p.goto(BASE, { waitUntil: "networkidle" });
await sleep(2500);
// Shoe overlay should NOT render under reduced motion; slots show static shoes.
const info = await p.evaluate(() => ({
  overlay: !!document.querySelector('[data-shoe="overlay"]'),
  staticShoes: document.querySelectorAll('.motion-reduce\\:flex img, img[alt*="Oxford"]').length,
}));
console.log("reduced-motion:", JSON.stringify(info), "errors:", errs.length);
// Screenshot hero + showcase to confirm content is visible (not stuck opacity 0).
await p.screenshot({ path: "qa/shots/reduced-hero.png" });
await p.evaluate(() => { const e = document.getElementById("showcase"); if (e) window.scrollTo(0, e.offsetTop); });
await sleep(1500);
await p.screenshot({ path: "qa/shots/reduced-showcase.png" });
await b.close();
