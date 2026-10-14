"use client";

import { motion } from "motion/react";
import type { IconeMarca } from "@/lib/icones";
import { Revelar, Secao } from "./ui";

type Linguagem = { nome: string; nivel: number; svg: IconeMarca };
type Ferramenta = { nome: string; svg: IconeMarca };

export function Habilidades({ linguagens, ferramentas }: { linguagens: Linguagem[]; ferramentas: Ferramenta[] }) {
  return (
    <Secao
      id="habilidades"
      numero="04"
      rotulo="Habilidades"
      titulo={
        <>
          Linguagens e <span className="texto-gradiente">ferramentas</span> que eu uso.
        </>
      }
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {linguagens.map((l, i) => {
          const cor = l.svg?.cor ?? "#8b5cf6";
          return (
            <Revelar key={l.nome} atraso={(i % 4) * 0.07}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ "--cor": cor } as React.CSSProperties}
                className="group vidro relative h-full overflow-hidden rounded-2xl p-5 transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--cor)_45%,transparent)]"
              >
                <div
                  aria-hidden
                  className="absolute -top-10 -right-10 size-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: cor }}
                />
                <div className="relative flex items-center gap-3">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
                    style={{ background: `color-mix(in srgb, ${cor} 14%, transparent)` }}
                  >
                    <Logo svg={l.svg} nome={l.nome} className="size-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{l.nome}</span>
                    <span className="font-mono text-xs text-apagado">{l.nivel}%</span>
                  </span>
                </div>
                <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full origin-left rounded-full"
                    style={{ background: `linear-gradient(90deg, ${cor}, color-mix(in srgb, ${cor} 40%, white))`, width: `${l.nivel}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 + (i % 4) * 0.07 }}
                  />
                </div>
              </motion.div>
            </Revelar>
          );
        })}
      </div>

      {ferramentas.length > 0 && (
        <Revelar className="mt-14">
          <p className="mb-5 text-center font-mono text-xs tracking-[0.2em] text-apagado uppercase">E também</p>
          <div className="mascara-lados group overflow-hidden">
            <div className="flex w-max animate-faixa gap-3 group-hover:[animation-play-state:paused]">
              {[...ferramentas, ...ferramentas].map((f, i) => (
                <span
                  key={i}
                  aria-hidden={i >= ferramentas.length}
                  className="vidro inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm whitespace-nowrap"
                >
                  <Logo svg={f.svg} nome={f.nome} className="size-4" />
                  {f.nome}
                </span>
              ))}
            </div>
          </div>
        </Revelar>
      )}
    </Secao>
  );
}

function Logo({ svg, nome, className }: { svg: IconeMarca; nome: string; className: string }) {
  if (!svg) {
    return <span className="font-display text-sm font-bold text-violeta">{nome.slice(0, 2).toUpperCase()}</span>;
  }
  return (
    <svg viewBox="0 0 24 24" fill={svg.cor} className={className} aria-hidden>
      <path d={svg.path} />
    </svg>
  );
}
