// Central site + brand configuration (doc 01, doc 11 spirit).
export const site = {
  name: "KK Leathers",
  tagline: "Handcrafted Leather, Timeless by Design",
  description:
    "KK Leathers crafts premium handmade leather shoes, belts, bags and accessories. A cinematic luxury experience built around craftsmanship and timeless design.",
  url: "https://kkleathers.example",
  locale: "en_US",
  email: "atelier@kkleathers.example",
  phone: "+91 00000 00000",
  address: "The Leather Atelier, Chennai, India",
  hours: "Mon – Sat · 10:00 – 19:00",
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    pinterest: "https://pinterest.com",
  },
} as const;

export const nav = [
  { label: "Collections", href: "#collections" },
  { label: "Craft", href: "#craft" },
  { label: "Business", href: "#business" },
  { label: "Gallery", href: "#gallery" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
] as const;
