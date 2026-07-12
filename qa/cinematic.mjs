import { chromium } from "playwright";
import fs from "node:fs";
const BASE = process.env.QA_URL || "http://localhost:3261";
const OUT = "qa/shots/cine";
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const b = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference" });
const p = await ctx.newPage();
const errs = [];
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
p.on("pageerror", (e) => errs.push("PAGEERR: " + e.message));
await p.goto(BASE, { waitUntil: "networkidle" });
await sleep(4500);

const pageH = await p.evaluate(() => document.body.scrollHeight);
const vh = 900;
const steps = 26;

// One shoe element only?
const shoeCount = await p.evaluate(() => document.querySelectorAll('[data-shoe="body"]').length);
// Background present?
const bg = await p.evaluate(() => !!document.querySelector('.fixed.-z-50, [class*="-z-50"]'));

const path = [];
for (let i = 0; i <= steps; i++) {
  const y = Math.round((pageH - vh) * (i / steps));
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await sleep(520);
  const s = await p.evaluate(() => {
    const el = document.querySelector('[data-shoe="body"]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el.closest('[data-shoe="overlay"]') || el);
    return {
      cx: Math.round(r.x + r.width / 2), cy: Math.round(r.y + r.height / 2),
      w: Math.round(r.width), op: parseFloat(getComputedStyle(el).opacity || "1"),
      wrapOp: parseFloat(cs.opacity),
      on: r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth,
    };
  });
  path.push({ y, s });
  if (i % 2 === 0) await p.screenshot({ path: `${OUT}/${String(i).padStart(2, "0")}.png` });
}

// Fast-scroll recovery
await p.evaluate((h) => window.scrollTo(0, h), pageH);
await sleep(120);
await p.evaluate(() => window.scrollTo(0, 0));
await sleep(120);
await p.evaluate((h) => window.scrollTo(0, h * 0.5), pageH);
await sleep(1000);
const fast = await p.evaluate(() => {
  const el = document.querySelector('[data-shoe="body"]');
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { on: r.bottom > 0 && r.top < innerHeight, op: parseFloat(getComputedStyle(el).opacity || "1") };
});

console.log("=== CINEMATIC QA ===");
console.log("shoe elements (must be 1):", shoeCount);
console.log("background layer present:", bg);
console.log("visible frames:", path.filter((x) => x.s && x.s.on && x.s.wrapOp > 0.02 && x.s.op > 0.02).length + "/" + path.length);
console.log("after fast scroll:", JSON.stringify(fast));
console.log("console errors:", errs.length);
errs.slice(0, 6).forEach((e) => console.log("  ⚠", e));
console.log("\nshoe path (y → screen cx,cy w op):");
path.forEach((x) => console.log(`  ${String(x.y).padStart(6)} → ${x.s ? `(${String(x.s.cx).padStart(4)},${String(x.s.cy).padStart(4)}) w=${x.s.w} op=${x.s.op.toFixed(2)} ${x.s.on ? "on" : "OFF"}` : "none"}`));
await b.close();
