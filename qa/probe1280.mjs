import { chromium } from "playwright";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "no-preference" });
const p = await ctx.newPage();
await p.goto(process.env.QA_URL || "http://localhost:3241", { waitUntil: "networkidle" });
await sleep(5000);
const r = await p.evaluate(() => {
  const panel = document.querySelector('[data-hero-panel]');
  const overlay = document.querySelector('[data-shoe="overlay"]');
  const body = document.querySelector('[data-shoe="body"]');
  const pcs = panel ? getComputedStyle(panel) : null;
  const ocs = overlay ? getComputedStyle(overlay) : null;
  const brect = body ? body.getBoundingClientRect() : null;
  const prect = panel ? panel.getBoundingClientRect() : null;
  return {
    panelOpacity: pcs?.opacity, panelDisplay: pcs?.display,
    panelRect: prect ? {x:Math.round(prect.x),y:Math.round(prect.y),w:Math.round(prect.width),h:Math.round(prect.height)} : null,
    overlayDisplay: ocs?.display,
    bodyRect: brect ? {x:Math.round(brect.x),y:Math.round(brect.y),w:Math.round(brect.width)} : null,
    innerWidth: window.innerWidth,
  };
});
console.log(JSON.stringify(r,null,2));
await b.close();
