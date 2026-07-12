import { chromium } from "playwright";
const BASE = process.env.QA_URL || "http://localhost:3252";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
const p = await ctx.newPage();
await p.goto(BASE, { waitUntil: "networkidle" });
await sleep(4000);
// Scroll to business section and let video attempt to load.
await p.evaluate(() => {
  const el = document.getElementById("business");
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 100);
});
await sleep(3000);
const info = await p.evaluate(() => {
  const vids = Array.from(document.querySelectorAll("video"));
  return vids.map((v) => ({
    src: v.currentSrc || v.getAttribute("src") || v.getAttribute("data-src") || "none",
    readyState: v.readyState, // 0=nothing 4=enough
    paused: v.paused,
    w: v.videoWidth,
    inViewport: (() => { const r = v.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; })(),
  }));
});
console.log(JSON.stringify(info, null, 2));
await b.close();
