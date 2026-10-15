"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { numeros, perfil } from "@/dados/perfil";
import { CartaoBrilho, Revelar, Secao } from "./ui";

export function Sobre() {
  return (
    <Secao
      id="sobre"
      numero="01"
      rotulo="Sobre mim"
      titulo={
        <>
          Código, design e produto <span className="texto-gradiente">no mesmo lugar</span>.
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div className="space-y-5 text-lg leading-relaxed text-pretty text-suave">
          {perfil.sobre.map((p, i) => (
            <Revelar key={i} atraso={i * 0.1}>
              <p>{p}</p>
            </Revelar>
          ))}
        </div>

        <div className="grid grid-cols-2 content-start gap-4">
          {numeros.map((n, i) => (
            <Revelar key={n.rotulo} atraso={0.1 + i * 0.08}>
              <CartaoBrilho className="p-6" cor={i % 2 ? "34 211 238" : "139 92 246"}>
                <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  <Contador ate={n.valor} />
                  <span className="texto-gradiente">{n.sufixo}</span>
                </p>
                <p className="mt-2 text-sm text-suave">{n.rotulo}</p>
              </CartaoBrilho>
            </Revelar>
          ))}
        </div>
      </div>
    </Secao>
  );
}

function Contador({ ate }: { ate: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { once: true, margin: "-60px" });
  const valor = useMotionValue(0);
  const arredondado = useTransform(valor, (v) => Math.round(v));

  useEffect(() => {
    if (!visto) return;
    const controle = animate(valor, ate, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => controle.stop();
  }, [visto, ate, valor]);

  return <motion.span ref={ref}>{arredondado}</motion.span>;
}
