"use client";

import { useState } from "react";
import SmoothScroll from "./SmoothScroll";
import Loader from "./Loader";
import Navbar from "./Navbar";
import ScrollProgress from "./ScrollProgress";
import PageBackground from "./PageBackground";
import { ShoeStageProvider } from "./shoe/ShoeStageContext";
import TravellingShoe from "./shoe/TravellingShoe";

/**
 * Global client shell. The page (not any section) owns the travelling Oxford:
 * ShoeStageProvider collects pose targets and TravellingShoe flies one shoe
 * between them. Native OS cursor is used — only hover effects are kept.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <ShoeStageProvider>
      <PageBackground />
      <Loader onComplete={() => setLoaded(true)} />
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <TravellingShoe />
      {children}
      <span hidden aria-hidden data-loaded={loaded} />
    </ShoeStageProvider>
  );
}
