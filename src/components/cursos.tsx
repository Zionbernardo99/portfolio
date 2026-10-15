"use client";

import { ArrowUpRight, Award, Clock, GraduationCap } from "lucide-react";
import { cursos, formacao } from "@/dados/perfil";
import { CartaoBrilho, Revelar, Secao } from "./ui";

export function Cursos() {
  return (
    <Secao
      id="cursos"
      numero="06"
      rotulo={formacao.length > 0 ? "Formação" : "Cursos"}
      titulo={
        <>
          {formacao.length > 0 ? "Formação e " : "Cursos e "}
          <span className="texto-gradiente">{formacao.length > 0 ? "cursos" : "certificados"}</span>.
        </>
      }
    >
      {formacao.map((f) => (
        <Revelar key={f.curso} className="mb-4">
          <CartaoBrilho className="p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violeta to-ciano shadow-lg shadow-violeta/25 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                <GraduationCap className="size-7 text-white" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs tracking-wider text-ciano uppercase">Graduação</p>
                <h3 className="mt-1 font-display text-xl leading-snug font-semibold sm:text-2xl">{f.curso}</h3>
                <p className="mt-1 text-suave">{f.instituicao}</p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-suave">{f.periodo}</span>
                {f.emAndamento && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
                    <span className="size-1.5 animate-piscar rounded-full bg-emerald-400" /> Em andamento
                  </span>
                )}
              </div>
            </div>
          </CartaoBrilho>
        </Revelar>
      ))}

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
