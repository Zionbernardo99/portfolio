"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

/**
 * Fundo fixo do site inteiro: três manchas de luz que flutuam devagar, uma
 * grade fina que some nas bordas e um holofote que segue o mouse.
 */
export function Fundo() {
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const x = useSpring(mx, { stiffness: 120, damping: 30 });
  const y = useSpring(my, { stiffness: 120, damping: 30 });
  const holofote = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgb(139 92 246 / 0.09), transparent 70%)`;

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
      <Mancha className="-top-40 -left-32 size-[34rem] bg-violeta/25" x={[0, 120, -40, 0]} y={[0, 80, 160, 0]} duracao={26} />
      <Mancha className="top-1/3 -right-40 size-[30rem] bg-ciano/15" x={[0, -140, -60, 0]} y={[0, 100, -80, 0]} duracao={32} />
      <Mancha className="-bottom-48 left-1/4 size-[28rem] bg-rosa/12" x={[0, 100, -120, 0]} y={[0, -90, -30, 0]} duracao={38} />

      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.045) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 100%)",
        }}
      />
      <motion.div className="absolute inset-0" style={{ background: holofote }} />
    </div>
  );
}

function Mancha({ className, x, y, duracao }: { className: string; x: number[]; y: number[]; duracao: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[110px] ${className}`}
      animate={{ x, y }}
      transition={{ duration: duracao, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
