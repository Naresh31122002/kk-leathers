import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Dynamic OG/Twitter card (doc 09 Phase 17). Dark luxury, brand-consistent.
// Edge runtime is required by next/og's ImageResponse and is the runtime used
// on the Vercel deployment target (doc 09 Final Acceptance).
export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 80% 20%, rgba(123,74,36,0.35), transparent 55%), #050505",
          color: "#F5F5F5",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C8A45D",
            marginBottom: 28,
          }}
        >
          Handcrafted · Timeless
        </div>
        <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 40, color: "#BDBDBD", marginTop: 24, maxWidth: 820 }}>
          {site.tagline}
        </div>
        <div
          style={{
            marginTop: 60,
            height: 2,
            width: 260,
            background: "linear-gradient(90deg, #C8A45D, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
