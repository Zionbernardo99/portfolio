"use client";

import { ArrowUpRight, Award, Clock } from "lucide-react";
import { cursos } from "@/dados/perfil";
import { CartaoBrilho, Revelar, Secao } from "./ui";

export function Cursos() {
  return (
    <Secao
      id="cursos"
      numero="06"
      rotulo="Formação"
      titulo={
        <>
          Cursos e <span className="texto-gradiente">certificados</span>.
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {cursos.map((c, i) => (
          <Revelar key={c.nome} atraso={(i % 2) * 0.08}>
            <CartaoBrilho className="h-full p-6" cor={i % 2 ? "244 114 182" : "34 211 238"}>
              <div className="flex h-full gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violeta/25 to-ciano/20 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Award className="size-6 text-ciano" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg leading-snug font-semibold">{c.nome}</h3>
                    {c.ano && (
                      <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-xs text-suave">{c.ano}</span>
                    )}
                  </div>
                  {c.instituicao && <p className="mt-1 text-sm text-suave">{c.instituicao}</p>}
                  <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-apagado empty:hidden">
                    {c.carga && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3.5" /> {c.carga}
                      </span>
                    )}
                    {c.certificado && (
                      <a
                        href={c.certificado}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-ciano hover:underline"
                      >
                        Ver certificado <ArrowUpRight className="size-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CartaoBrilho>
          </Revelar>
        ))}
      </div>
    </Secao>
  );
}
