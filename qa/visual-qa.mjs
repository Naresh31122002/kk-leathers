import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.env.QA_URL || "http://localhost:3231";
const OUT = "qa/shots";
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  const browser = await chromium.launch();
  const consoleErrors = [];
  const report = {};

  // ---- Desktop 1440 full scroll walk ----
  // Force normal-motion so we test the REAL animated experience (headless
  // Chromium defaults to reduced-motion, which disables our GSAP layer).
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + e.message));

  await page.goto(BASE, { waitUntil: "networkidle" });
  // Wait out the loader (2.3s intro + lift).
  await sleep(4200);

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const vh = 900;
  const steps = Math.ceil(pageHeight / (vh * 0.9));
  report.pageHeight = pageHeight;
  report.steps = steps;

  const shoeSamples = [];
  for (let i = 0; i <= steps; i++) {
    const y = Math.round((pageHeight - vh) * (i / steps));
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await sleep(650); // let scrub + lenis settle

    // Measure the travelling shoe overlay's actual on-screen rect + opacity.
    const shoe = await page.evaluate(() => {
      const el = document.querySelector('[data-shoe="overlay"]');
      if (!el) return null;
      const inner = el.querySelector('[data-shoe="body"]');
      const r = (inner || el).getBoundingClientRect();
      const cs = getComputedStyle(inner || el);
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        opacity: parseFloat(cs.opacity),
        onScreen:
          r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth,
      };
    });
    shoeSamples.push({ scrollY: y, shoe });
    await page.screenshot({ path: `${OUT}/1440-${String(i).padStart(2, "0")}.png` });
  }
  report.shoeSamples = shoeSamples;

  // Shoe visibility summary
  const visibleCount = shoeSamples.filter(
    (s) => s.shoe && s.shoe.onScreen && s.shoe.opacity > 0.02
  ).length;
  report.shoeVisibleFrames = `${visibleCount}/${shoeSamples.length}`;

  // ---- Empty-space check: for each section, how much of its first viewport is "dark/empty"? ----
  const sectionIds = [
    "top", "manifesto", "collections", "craft", "showcase",
    "business", "accessories", "gallery", "story", "testimonials", "contact",
  ];
  const sectionInfo = {};
  for (const id of sectionIds) {
    const info = await page.evaluate((sid) => {
      const el = document.getElementById(sid);
      if (!el) return { exists: false };
      const r = el.getBoundingClientRect();
      return {
        exists: true,
        heightPx: Math.round(el.offsetHeight),
        top: Math.round(r.top + window.scrollY),
      };
    }, id);
    sectionInfo[id] = info;
  }
  report.sections = sectionInfo;

  // ---- Cursor: force-move mouse over different backgrounds, snapshot cursor visibility ----
  // Move to hero video area, gallery, buttons.
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(500);
  await page.mouse.move(720, 450);
  await sleep(200);
  const cursorState = await page.evaluate(() => {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    return {
      dot: dot ? getComputedStyle(dot).opacity : "missing",
      ring: ring ? getComputedStyle(ring).opacity : "missing",
    };
  });
  report.cursor = cursorState;

  // ---- Fast-scroll desync test: jump around, then read shoe ----
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(400);
  await page.evaluate((h) => window.scrollTo(0, h), pageHeight);
  await sleep(120);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(120);
  await page.evaluate((h) => window.scrollTo(0, h * 0.5), pageHeight);
  await sleep(1200);
  const afterFast = await page.evaluate(() => {
    const el = document.querySelector('[data-shoe="body"]');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el.closest('[data-shoe="overlay"]') || el);
    return {
      onScreen: r.bottom > 0 && r.top < window.innerHeight,
      opacity: parseFloat(getComputedStyle(el).opacity || "1"),
      wrapOpacity: parseFloat(cs.opacity),
    };
  });
  report.afterFastScroll = afterFast;

  await ctx.close();

  // ---- Multi-viewport overlap/overflow check ----
  const viewports = [1920, 1600, 1440, 1366, 1280];
  report.viewports = {};
  for (const w of viewports) {
    const c = await browser.newContext({
      viewport: { width: w, height: 900 },
      reducedMotion: "no-preference",
    });
    const p = await c.newPage();
    await p.goto(BASE, { waitUntil: "networkidle" });
    await sleep(4000);
    const hasHScroll = await p.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 2
    );
    await p.evaluate(() => window.scrollTo(0, 0));
    await sleep(300);
    await p.screenshot({ path: `${OUT}/hero-${w}.png` });
    report.viewports[w] = { horizontalScroll: hasHScroll };
    await c.close();
  }

  report.consoleErrors = consoleErrors;
  fs.writeFileSync("qa/report.json", JSON.stringify(report, null, 2));
  await browser.close();

  // Console summary
  console.log("=== VISUAL QA SUMMARY ===");
  console.log("page height:", report.pageHeight, "px, walk steps:", report.steps);
  console.log("SHOE visible frames:", report.shoeVisibleFrames);
  console.log("cursor:", JSON.stringify(report.cursor));
  console.log("after fast scroll:", JSON.stringify(report.afterFastScroll));
  console.log("viewports:", JSON.stringify(report.viewports));
  console.log("console errors:", report.consoleErrors.length);
  report.consoleErrors.slice(0, 8).forEach((e) => console.log("  ⚠", e));
  console.log("\nshoe walk (scrollY → onScreen/opacity):");
  report.shoeSamples.forEach((s) =>
    console.log(
      `  y=${String(s.scrollY).padStart(5)} → ${
        s.shoe ? `${s.shoe.onScreen ? "ON " : "OFF"} op=${s.shoe.opacity} @(${s.shoe.x},${s.shoe.y}) ${s.shoe.w}px` : "NO SHOE EL"
      }`
    )
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
