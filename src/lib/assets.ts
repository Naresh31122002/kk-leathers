// Single source of truth for every asset path.
// Paths verified against /public — never invent new ones (doc 01 §17-19, doc 02 §37).

export const images = {
  shoes: {
    oxfordBrownMain: "/images/products/shoes/oxford-brown-main.png",
    oxfordBrownSide: "/images/products/shoes/oxford-brown-side.png",
    oxfordBrownPair: "/images/products/shoes/oxford-brown-pair.png",
    oxfordBrownFloating: "/images/products/shoes/oxford-brown-floating.webp",
    oxfordBlackMain: "/images/products/shoes/oxford-black-main.png",
  },
  belts: {
    brownMain: "/images/products/belts/belt-brown-main.png",
    brownFloating: "/images/products/belts/belt-brown-floating.webp",
    brownRolled: "/images/products/belts/belt-brown-rolled.png",
  },
  slippers: {
    brownMain: "/images/products/slippers/slipper-brown-main.png",
    brownFloating: "/images/products/slippers/slipper-brown-floating.webp",
  },
  bags: {
    duffle: "/images/products/bags/duffle-brown-main.png",
    laptop: "/images/products/bags/laptop-black-main.png",
    tote: "/images/products/bags/tote-black-main.png",
  },
  packaging: {
    giftBox: "/images/products/packaging/gift-box.png",
  },
} as const;

// Scroll-scrubbed cinematic image sequences (public/frames-web/<slug>).
// Compact WebP extracted from the product films — the whole page's motion
// language runs on these instead of autoplay video. ~4.6MB for all three.
function frameSeq(slug: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/frames-web/${slug}/f-${String(i + 1).padStart(3, "0")}.webp`
  );
}

export const frameSequences = {
  // Gift box opening — the overture (Hero) and its mirror close (Footer).
  giftbox: frameSeq("giftbox", 125),
  // Oxford front-facing rotation — the hero product turntable.
  rotation: frameSeq("rotation", 120),
  // Oxford exploded construction — the anatomy climax (Showcase).
  exploded: frameSeq("exploded", 85),
} as const;

// Back-compat alias used by the Showcase.
export const shoeExplodeFrames = frameSequences.exploded;

export const videos = {
  hero: {
    giftBoxOpening: "/videos/hero/video-01-gift-box-opening.mp4",
    oxfordRotation: "/videos/hero/video-02-oxford-hero-rotation.mp4",
    oxfordExploded: "/videos/hero/video-03-oxford-exploded.mp4",
    duffleRotation: "/videos/hero/video-04-duffle-hero-rotation.mp4",
    laptopReveal: "/videos/hero/video-06-laptop-bag-reveal.mp4",
  },
  story: {
    workshop: "/videos/story/video-05-luxury-workshop.mp4",
    cutting: "/videos/story/video-07-leather-cutting.mp4",
    stitching: "/videos/story/video-08-hand-stitching.mp4",
    burnishing: "/videos/story/video-09-edge-burnishing.mp4",
    polishing: "/videos/story/video-10-leather-polishing.mp4",
    inspection: "/videos/story/video-11-quality-inspection.mp4",
    packaging: "/videos/story/video-12-packaging-process.mp4",
    finishing: "/videos/story/video-13-final-product-finishing.mp4",
  },
} as const;
