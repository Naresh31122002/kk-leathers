import { chromium } from "playwright";
import fs from "node:fs";
const BASE = process.env.QA_URL || "http://localhost:3253";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
const p = await ctx.newPage();
await p.goto(BASE, { waitUntil: "networkidle" });
await sleep(4000);

for (const id of ["business", "craft", "story", "accessories", "testimonials", "contact"]) {
  await p.evaluate((sid) => {
    const el = document.getElementById(sid);
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 60);
  }, id);
  await sleep(4500); // dwell so lazy video loads + plays
  await p.screenshot({ path: `qa/shots/dwell-${id}.png` });
  const vids = await p.evaluate(() => Array.from(document.querySelectorAll("video"))
    .filter((v) => { const r = v.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0 && r.width > 0; })
    .map((v) => ({ src: (v.currentSrc||"").split("/").pop(), rs: v.readyState, paused: v.paused, w: v.videoWidth })));
  console.log(id, JSON.stringify(vids));
}
await b.close();
