"use client";

import { ArrowUpRight, Award, Check, ChevronDown, Clock, GraduationCap, Lightbulb } from "lucide-react";
import { useId, useState } from "react";
import { cursos, formacao, type Curso } from "@/dados/perfil";
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

      <div className="grid items-start gap-4 md:grid-cols-2">
        {cursos.map((c, i) => (
          <Revelar key={c.nome} atraso={(i % 2) * 0.08}>
            <CartaoCurso curso={c} cor={i % 2 ? "244 114 182" : "34 211 238"} />
          </Revelar>
        ))}
      </div>
    </Secao>
  );
}

/** Card de um curso. Se tiver `aprendizados`, abre ao clicar e mostra o que você aprendeu. */
function CartaoCurso({ curso: c, cor }: { curso: Curso; cor: string }) {
  const [aberto, setAberto] = useState(false);
  const id = useId();
  const abre = (c.aprendizados?.length ?? 0) > 0;

  const cabecalho = (
    <>
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violeta/25 to-ciano/20 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
        <Award className="size-6 text-ciano" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex items-start justify-between gap-3">
          <span className="font-display text-lg leading-snug font-semibold">{c.nome}</span>
          {c.ano && <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-xs text-suave">{c.ano}</span>}
        </span>
        {c.instituicao && <span className="mt-1 text-sm text-suave">{c.instituicao}</span>}
        {abre && (
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ciano">
            {aberto ? "Fechar" : "O que aprendi"}
            <ChevronDown className={`size-4 transition-transform duration-500 ${aberto ? "rotate-180" : ""}`} />
          </span>
        )}
      </span>
    </>
  );

  return (
    <CartaoBrilho className="p-6" cor={cor}>
      {abre ? (
        <button
          type="button"
          onClick={() => setAberto((a) => !a)}
          aria-expanded={aberto}
          aria-controls={id}
          className="flex w-full cursor-pointer gap-5 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ciano"
        >
          {cabecalho}
        </button>
      ) : (
        <div className="flex gap-5">{cabecalho}</div>
      )}

      {abre && (
        // 0fr → 1fr anima a altura sem medir nada no JavaScript.
        <div
          id={id}
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${aberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          inert={!aberto}
        >
          <div className="overflow-hidden">
            <ul className="mt-5 space-y-2.5 border-t border-borda pt-5">
              {c.aprendizados!.map((a, i) => (
                <li
                  key={a}
                  className={`flex gap-3 text-sm leading-relaxed text-texto/85 transition-[opacity,transform] duration-500 ${aberto ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`}
                  style={{ transitionDelay: aberto ? `${120 + i * 50}ms` : "0ms" }}
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ciano/15">
                    <Check className="size-3 text-ciano" strokeWidth={2.5} />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
            {c.naPratica && (
              <p
                className={`mt-4 flex gap-3 rounded-xl border border-violeta/20 bg-violeta/10 p-3.5 text-sm leading-relaxed text-texto/85 transition-opacity duration-500 ${aberto ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: aberto ? `${150 + c.aprendizados!.length * 50}ms` : "0ms" }}
              >
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-violeta" />
                {c.naPratica}
              </p>
            )}
          </div>
        </div>
      )}

      {(c.carga || c.certificado) && (
        <div className="mt-4 flex items-center gap-4 pl-17 text-xs text-apagado">
          {c.carga && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" /> {c.carga}
            </span>
          )}
          {c.certificado && (
            <a href={c.certificado} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-ciano hover:underline">
              Ver certificado <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
      )}
    </CartaoBrilho>
  );
}
