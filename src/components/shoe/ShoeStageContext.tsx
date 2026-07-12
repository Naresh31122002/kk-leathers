"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * A "stage" is a spot on the page the travelling Oxford flies to. Each section
 * registers one (or more) invisible anchor elements describing where — and in
 * what pose — the shoe should be when that anchor is centred in the viewport.
 * The TravellingShoe reads these to build ONE continuous master timeline.
 */
export type ShoePose = {
  /** Rendered shoe width in px at this stage (scale is derived from this). */
  width?: number;
  rotation?: number;
  /** Slight 3D tilt for cinematic perspective. */
  tiltX?: number;
  tiltY?: number;
  /** 0 hides the shoe (e.g. inside the closing gift box). */
  opacity?: number;
  /** Which image to show — lets the shoe change facing along the journey. */
  variant?: "main" | "side" | "pair" | "floating";
  /** Glow intensity 0–1 for lighting changes. */
  glow?: number;
};

export type ShoeStage = {
  id: string;
  el: HTMLElement;
  pose: ShoePose;
  order: number;
};

type Ctx = {
  register: (stage: ShoeStage) => () => void;
  getStages: () => ShoeStage[];
  version: number;
};

const ShoeStageCtx = createContext<Ctx | null>(null);

export function ShoeStageProvider({ children }: { children: React.ReactNode }) {
  const stagesRef = useRef<Map<string, ShoeStage>>(new Map());
  const [version, setVersion] = useState(0);

  const register = useCallback((stage: ShoeStage) => {
    stagesRef.current.set(stage.id, stage);
    // Nudge consumers to rebuild the master timeline once mounted.
    setVersion((v) => v + 1);
    return () => {
      stagesRef.current.delete(stage.id);
      setVersion((v) => v + 1);
    };
  }, []);

  const getStages = useCallback(
    () =>
      Array.from(stagesRef.current.values()).sort((a, b) => a.order - b.order),
    []
  );

  const value = useMemo(
    () => ({ register, getStages, version }),
    [register, getStages, version]
  );

  return <ShoeStageCtx.Provider value={value}>{children}</ShoeStageCtx.Provider>;
}

export function useShoeStages() {
  const ctx = useContext(ShoeStageCtx);
  if (!ctx) throw new Error("useShoeStages must be used within ShoeStageProvider");
  return ctx;
}
