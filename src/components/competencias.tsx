"use client";

import { Brain, Clock, Languages, Lightbulb, Megaphone, MessageCircle, Palette, Rocket, Target, Users } from "lucide-react";
import { motion } from "motion/react";
import { competencias, idiomas, type Competencia } from "@/dados/perfil";
import { CartaoBrilho, Revelar, Secao } from "./ui";

const icones: Record<Competencia["icone"], typeof Brain> = {
  users: Users,
  brain: Brain,
  rocket: Rocket,
  message: MessageCircle,
  target: Target,
  palette: Palette,
  clock: Clock,
  lightbulb: Lightbulb,
  megaphone: Megaphone,
};

export function Competencias() {
  return (
    <Secao
      id="competencias"
      numero="07"
      rotulo="Competências"
      titulo={
        <>
          Além do código, o que eu <span className="texto-gradiente">levo para o time</span>.
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {competencias.map((c, i) => {
          const Icone = icones[c.icone];
          return (
            <Revelar key={c.titulo} atraso={(i % 3) * 0.08}>
              <CartaoBrilho className="h-full p-6">
                <Icone className="size-7 text-violeta transition-all duration-500 group-hover:scale-110 group-hover:text-ciano" strokeWidth={1.6} />
                <h3 className="mt-5 font-display text-lg font-semibold">{c.titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-suave">{c.descricao}</p>
              </CartaoBrilho>
            </Revelar>
          );
        })}
      </div>

      {idiomas.length > 0 && (
        <Revelar className="mt-16">
          <h3 className="mb-6 flex items-center gap-2.5 font-display text-xl font-semibold">
            <Languages className="size-5 text-ciano" /> Idiomas
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {idiomas.map((idioma, i) => (
              <div key={idioma.nome} className="vidro flex items-center gap-5 rounded-2xl p-5">
                <Anel porcentagem={idioma.porcentagem} atraso={i * 0.15} />
                <div>
                  <p className="font-medium">{idioma.nome}</p>
                  <p className="text-sm text-suave">{idioma.nivel}</p>
                </div>
              </div>
            ))}
          </div>
        </Revelar>
      )}
    </Secao>
  );
}

function Anel({ porcentagem, atraso }: { porcentagem: number; atraso: number }) {
  const raio = 24;
  return (
    <div className="relative size-16 shrink-0">
      <svg viewBox="0 0 60 60" className="size-full -rotate-90">
        <defs>
          <linearGradient id="anel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle cx="30" cy="30" r={raio} fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth="5" />
        <motion.circle
          cx="30"
          cy="30"
          r={raio}
          fill="none"
          stroke="url(#anel)"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: porcentagem / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 + atraso }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-mono text-xs">{porcentagem}%</span>
    </div>
  );
}
