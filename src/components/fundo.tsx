"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

/**
 * Fundo fixo do site inteiro: três manchas de luz que flutuam devagar, uma
 * grade fina que some nas bordas e um holofote que segue o mouse.
 *
 * Tudo aqui se mexe só com `transform` e nada usa `filter: blur`: as manchas
 * são degradês radiais (parecem borradas, mas não custam nada) e o holofote é
 * um círculo que muda de lugar, em vez de um degradê redesenhado a cada
 * movimento do mouse.
 */
export function Fundo() {
  const mx = useMotionValue(-2000);
  const my = useMotionValue(-2000);
  const x = useSpring(mx, { stiffness: 120, damping: 30 });
  const y = useSpring(my, { stiffness: 120, damping: 30 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const mover = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", mover, { passive: true });
    return () => window.removeEventListener("pointermove", mover);
  }, [mx, my]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Mancha className="-top-64 -left-56 size-[48rem] animate-mancha-1" cor="139 92 246 / 0.32" />
      <Mancha className="top-[20%] -right-64 size-[44rem] animate-mancha-2" cor="34 211 238 / 0.19" />
      <Mancha className="-bottom-72 left-[15%] size-[42rem] animate-mancha-3" cor="244 114 182 / 0.15" />

      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.045) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 100%)",
        }}
      />
      <motion.div
        className="absolute top-0 left-0 -mt-[520px] -ml-[520px] size-[1040px] rounded-full will-change-transform"
        style={{ x, y, background: "radial-gradient(closest-side, rgb(139 92 246 / 0.09), transparent 70%)" }}
      />
    </div>
  );
}

function Mancha({ className, cor }: { className: string; cor: string }) {
  return (
    <div
      className={`absolute rounded-full will-change-transform ${className}`}
      style={{ background: `radial-gradient(closest-side, rgb(${cor}), transparent)` }}
    />
  );
}
