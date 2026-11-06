"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Motion follows the OS "reduce motion" setting: transforms are skipped, fades stay. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
