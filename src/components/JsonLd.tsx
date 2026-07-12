import { site } from "@/lib/site";

// Organization + brand structured data (doc 09 Phase 17 — Schema).
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Chennai",
      addressCountry: "IN",
    },
    sameAs: [
      site.social.instagram,
      site.social.linkedin,
      site.social.pinterest,
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Structured data must be a plain JSON string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
