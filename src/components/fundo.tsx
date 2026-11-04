"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

/**
 * Fundo fixo do site inteiro: três manchas de luz que flutuam devagar, uma
 * grade fina que some nas bordas, estrelas subindo e um holofote que segue o
 * mouse.
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
      <Estrelas />
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

/**
 * Pontinhos de luz subindo devagar pela tela. Posições fixas (sorteadas
 * com uma conta inteira, igual no servidor e no navegador) e só CSS:
 * transform e opacity, sem JavaScript rodando a cada quadro.
 */
const estrelas = (() => {
  let semente = 7;
  const sorteio = () => {
    semente = (Math.imul(semente, 1103515245) + 12345) & 0x7fffffff;
    return semente / 0x7fffffff;
  };
  const cores = ["255 255 255", "255 255 255", "196 181 253", "103 232 249"];
  return Array.from({ length: 48 }, (_, i) => ({
    esquerda: `${(sorteio() * 100).toFixed(2)}%`,
    tamanho: 1.5 + Math.round(sorteio() * 4) / 2,
    duracao: `${(12 + sorteio() * 14).toFixed(1)}s`,
    atraso: `-${(sorteio() * 26).toFixed(1)}s`,
    deriva: `${Math.round((sorteio() - 0.5) * 60)}px`,
    cintilar: `${(2 + sorteio() * 3).toFixed(1)}s`,
    cor: cores[Math.floor(sorteio() * cores.length)],
    soNoPc: i % 3 !== 0,
    parada: sorteio().toFixed(2),
  }));
})();

function Estrelas() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 [mask-image:linear-gradient(to_top,transparent,#000_12%,#000_80%,transparent)]"
    >
      {estrelas.map((e, i) => (
        <span
          key={i}
          className={`absolute top-0 h-full animate-subir will-change-transform ${e.soNoPc ? "max-sm:hidden" : ""}`}
          style={{
            left: e.esquerda,
            width: e.tamanho,
            animationDuration: e.duracao,
            animationDelay: e.atraso,
            ["--deriva" as string]: e.deriva,
            ["--parada" as string]: e.parada,
          }}
        >
          <span
            className="absolute bottom-0 left-0 animate-cintilar rounded-full"
            style={{
              width: e.tamanho,
              height: e.tamanho,
              background: `rgb(${e.cor})`,
              boxShadow: `0 0 ${e.tamanho * 4}px ${e.tamanho / 2}px rgb(${e.cor} / 0.55)`,
              animationDuration: e.cintilar,
            }}
          />
        </span>
      ))}
    </div>
  );
}
