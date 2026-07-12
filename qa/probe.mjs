import { chromium } from "playwright";

const BASE = process.env.QA_URL || "http://localhost:3231";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "no-preference",
});
const page = await ctx.newPage();
const errs = [];
page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
page.on("pageerror", (e) => errs.push("PAGEERR: " + e.message));
page.on("requestfailed", (r) =>
  errs.push("REQFAIL: " + r.url() + " " + (r.failure()?.errorText || ""))
);

await page.goto(BASE, { waitUntil: "networkidle" });
await sleep(4500);

const probe = await page.evaluate(() => {
  const overlay = document.querySelector('[data-shoe="overlay"]');
  const body = document.querySelector('[data-shoe="body"]');
  const stages = Array.from(document.querySelectorAll("[data-shoe-stage]")).map(
    (s) => s.getAttribute("data-shoe-stage")
  );
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const overlayCS = overlay ? getComputedStyle(overlay) : null;
  return {
    reducedMatch: reduced,
    overlayExists: !!overlay,
    bodyExists: !!body,
    overlayDisplay: overlayCS?.display,
    overlayVisibility: overlayCS?.visibility,
    stageCount: stages.length,
    stages,
    innerWidth: window.innerWidth,
  };
});
console.log(JSON.stringify(probe, null, 2));
console.log("errors:", errs.slice(0, 10));
await browser.close();
