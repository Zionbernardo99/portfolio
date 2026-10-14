"use client";

import { MotionConfig } from "motion/react";

/**
 * "user": quem pediu ao sistema menos movimento recebe o site sem as
 * animações de deslocamento (as de opacidade continuam).
 */
export function Movimento({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
