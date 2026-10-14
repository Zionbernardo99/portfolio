"use client";

import { Briefcase, CircleCheck, MapPin } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { experiencias } from "@/dados/perfil";
import { CartaoBrilho, Etiqueta, Secao } from "./ui";

export function Experiencias() {
  const ref = useRef<HTMLDivElement>(null);
  // A linha da linha do tempo vai se desenhando conforme a página rola.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const linha = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Secao
      id="experiencia"
      numero="02"
      rotulo="Experiência"
      titulo={
        <>
          Onde já <span className="texto-gradiente">trabalhei</span>.
        </>
      }
    >
      <div ref={ref} className="relative">
        <div aria-hidden className="absolute top-2 bottom-2 left-[15px] w-px bg-borda md:left-1/2" />
        <motion.div
          aria-hidden
          style={{ scaleY: linha }}
          className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-gradient-to-b from-violeta via-ciano to-rosa md:left-1/2"
        />

        <ol>
        {experiencias.map((exp, i) => {
          const direita = i % 2 === 1;
          return (
            <li key={exp.empresa + exp.inicio} className="relative grid pb-12 last:pb-0 md:grid-cols-2 md:gap-16">
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="absolute top-1 left-0 z-10 grid size-[31px] place-items-center rounded-full border border-violeta/50 bg-fundo md:left-1/2 md:-translate-x-1/2"
              >
                <Briefcase className="size-3.5 text-violeta" />
              </motion.span>

              <motion.div
                initial={{ opacity: 0, x: direita ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`pl-12 md:pl-0 ${direita ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}
              >
                <p className={`mb-3 font-mono text-xs text-ciano ${direita ? "" : "md:pr-1"}`}>
                  {exp.inicio} — {exp.fim || <span className="text-emerald-400">Atual</span>}
                </p>
                <CartaoBrilho className="p-6 text-left">
                  <h3 className="font-display text-xl font-semibold">{exp.cargo}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="texto-gradiente font-semibold">{exp.empresa}</span>
                    <span className="inline-flex items-center gap-1 text-apagado">
                      <MapPin className="size-3.5" /> {exp.local}
                    </span>
                  </p>
                  <p className="mt-4 leading-relaxed text-suave">{exp.descricao}</p>
                  {exp.conquistas.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {exp.conquistas.map((c) => (
                        <li key={c} className="flex gap-2.5 text-sm text-texto/85">
                          <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.tecnologias.map((t) => (
                      <Etiqueta key={t}>{t}</Etiqueta>
                    ))}
                  </div>
                </CartaoBrilho>
              </motion.div>
            </li>
          );
        })}
        </ol>
      </div>
    </Secao>
  );
}
