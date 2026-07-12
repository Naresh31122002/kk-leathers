import { images, videos } from "./assets";

// --- Featured collections (doc 09 Phase 06 / doc 01 §16) ---
export const collections = [
  {
    id: "shoes",
    kicker: "Oxford Series",
    title: "Handcrafted Shoes",
    description:
      "Full-grain leather Oxfords, hand-lasted and finished with a mirror burnish.",
    image: images.shoes.oxfordBrownMain,
    alt: "Handcrafted brown Oxford leather shoe by KK Leathers",
    span: "large" as const,
  },
  {
    id: "belts",
    kicker: "Everyday Essential",
    title: "Leather Belts",
    description: "Single-piece cut, edge-painted, built to age beautifully.",
    image: images.belts.brownMain,
    alt: "Handmade brown full-grain leather belt",
    span: "small" as const,
  },
  {
    id: "slippers",
    kicker: "House Comfort",
    title: "Leather Slippers",
    description: "Soft, structured comfort with an artisan finish.",
    image: images.slippers.brownMain,
    alt: "Premium brown leather slippers",
    span: "small" as const,
  },
  {
    id: "bags",
    kicker: "Travel Companion",
    title: "The Duffle",
    description: "A generous weekender in supple, hand-selected hide.",
    image: images.bags.duffle,
    alt: "Brown leather duffle travel bag",
    span: "wide" as const,
  },
] as const;

// --- Craftsmanship steps (doc 09 Phase 07) ---
export const craftSteps = [
  {
    id: "cutting",
    step: "01",
    title: "The Cut",
    copy: "Every panel is cut by hand from a single hide, respecting the grain.",
    video: videos.story.cutting,
  },
  {
    id: "stitching",
    step: "02",
    title: "Hand Stitching",
    copy: "Saddle-stitched with waxed thread — a bond that outlasts the wearer.",
    video: videos.story.stitching,
  },
  {
    id: "burnishing",
    step: "03",
    title: "Edge Burnishing",
    copy: "Edges are sealed and polished until they gleam like glass.",
    video: videos.story.burnishing,
  },
  {
    id: "polishing",
    step: "04",
    title: "The Polish",
    copy: "Layered patina, worked by hand, to reveal the leather's depth.",
    video: videos.story.polishing,
  },
  {
    id: "inspection",
    step: "05",
    title: "Inspection",
    copy: "Nothing leaves the atelier until it is, quite simply, perfect.",
    video: videos.story.inspection,
  },
  {
    id: "finishing",
    step: "06",
    title: "Final Finishing",
    copy: "A last considered touch before the piece begins its life with you.",
    video: videos.story.finishing,
  },
] as const;

// --- Gallery (doc 09 Phase 10) ---
export const gallery = [
  { src: images.shoes.oxfordBrownMain, alt: "Brown Oxford shoe, front view", size: "tall" as const },
  { src: images.belts.brownRolled, alt: "Rolled leather belt", size: "small" as const },
  { src: images.shoes.oxfordBrownSide, alt: "Oxford shoe, side profile", size: "small" as const },
  { src: images.bags.tote, alt: "Black leather tote bag", size: "tall" as const },
  { src: images.slippers.brownMain, alt: "Brown leather slippers", size: "small" as const },
  { src: images.shoes.oxfordBlackMain, alt: "Black Oxford shoe", size: "small" as const },
  { src: images.bags.duffle, alt: "Brown leather duffle bag", size: "wide" as const },
  { src: images.shoes.oxfordBrownPair, alt: "Pair of brown Oxford shoes", size: "small" as const },
  { src: images.bags.laptop, alt: "Black leather laptop bag", size: "small" as const },
  { src: images.shoes.oxfordBrownFloating, alt: "Brown Oxford shoe, floating study", size: "tall" as const },
  { src: images.belts.brownMain, alt: "Brown leather belt", size: "small" as const },
] as const;

// --- Brand story timeline (doc 09 Phase 11) ---
export const storyTimeline = [
  {
    year: "The Hide",
    title: "Chosen, never rushed",
    copy: "We source only full-grain leather — the strongest, most characterful cut, aged to develop a patina unique to you.",
  },
  {
    year: "The Hand",
    title: "Made by one maker",
    copy: "A single artisan sees each piece from cut to finish. Their signature is in the stitch.",
  },
  {
    year: "The Years",
    title: "Built to be inherited",
    copy: "Leather this honest only improves with time. Our pieces are made to be worn for decades — and passed on.",
  },
] as const;

// --- Testimonials (doc 09 Phase 12) ---
export const testimonials = [
  {
    quote:
      "The Oxfords are the finest I have ever owned. Four years in and they only look better.",
    name: "A. Menon",
    role: "Advocate, Chennai",
  },
  {
    quote:
      "You can feel the hours in every stitch. This is what craftsmanship is supposed to mean.",
    name: "R. Sharma",
    role: "Architect",
  },
  {
    quote:
      "I gifted the duffle to my father. He hasn't travelled without it since.",
    name: "S. Iyer",
    role: "Founder",
  },
] as const;
