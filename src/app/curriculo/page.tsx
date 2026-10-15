import type { Metadata } from "next";
import { Download } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import {
  competencias,
  cursos,
  experiencias,
  ferramentas,
  formacao,
  ia,
  idiomas,
  linguagens,
  perfil,
  projetos,
  rotulosUso,
  type Uso,
} from "@/dados/perfil";

/**
 * O currículo em uma folha A4, montado com os mesmos dados do site.
 *
 * Na tela aparece como uma folha sobre o fundo escuro; na impressão sai só a
 * folha. O PDF do botão "Baixar currículo" é esta página salva como PDF
 * (Ctrl+P → "Salvar como PDF"), então não tem endereço nem telefone: só o
 * que já está no site.
 */

export const metadata: Metadata = {
  title: `Currículo de ${perfil.nomeCompleto}`,
  description: `Currículo de ${perfil.nomeCompleto}: ${perfil.cargos[0]} em ${perfil.cidade}.`,
};

/** Junta com " · " sem deixar um item ("Power BI") quebrar no meio da linha. */
const lista = (itens: string[]) => itens.map((i) => i.replaceAll(" ", "\u00a0")).join(" · ");

const semProtocolo = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default function Curriculo() {
  const linkedin = perfil.links.find((l) => l.icone === "linkedin");
  const github = perfil.links.find((l) => l.icone === "github");
  const contatos = [
    { texto: perfil.cidade },
    { texto: perfil.email, href: `mailto:${perfil.email}` },
    { texto: semProtocolo(perfil.site), href: perfil.site },
    // Só o nome, sem o endereço: o do LinkedIn tem hífen e o link continua clicável.
    linkedin && { texto: "LinkedIn", href: linkedin.url },
    github && { texto: "GitHub", href: github.url },
  ].filter(Boolean) as { texto: string; href?: string }[];

  const ferramentasTexto = lista(ferramentas.map((f) => f.nome));

  return (
    <main className="min-h-svh px-3 py-8 sm:py-12 print:p-0">
      <style>{`
        @page { size: A4; margin: 12mm 14mm; }
        @media print { html, body { background: #fff !important; color-scheme: light; } }
      `}</style>

      <div className="mx-auto mb-6 flex max-w-[210mm] items-center justify-between gap-3 print:hidden">
        <Link href="/" className="text-sm text-suave hover:text-texto">
          ← Voltar ao site
        </Link>
        <a
          href={perfil.curriculo}
          download
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violeta to-ciano px-5 py-2.5 text-sm font-medium text-white"
        >
          <Download className="size-4" /> Baixar PDF
        </a>
      </div>

      <article className="mx-auto max-w-[210mm] bg-white px-[8mm] py-[10mm] text-[10.5pt] leading-[1.45] text-zinc-700 shadow-2xl shadow-black/50 sm:px-[14mm] sm:py-[12mm] print:max-w-none print:p-0 print:shadow-none">
        <header className="border-b border-zinc-200 pb-4">
          <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-violeta via-ciano to-rosa" />
          <h1 className="font-display text-[24pt] leading-tight font-bold tracking-tight text-zinc-900">
            {perfil.nomeCompleto}
          </h1>
          <p className="mt-0.5 font-display text-[12pt] font-medium text-violet-700">
            {perfil.cargos[0]} · Analista de Infraestrutura
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[9pt] text-zinc-500">
            {contatos.map((c, i) => (
              <li key={c.texto} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-zinc-300">|</span>}
                {c.href ? (
                  <a href={c.href} className="text-zinc-600 underline decoration-zinc-300 underline-offset-2">
                    {c.texto}
                  </a>
                ) : (
                  c.texto
                )}
              </li>
            ))}
          </ul>
        </header>

        <Bloco titulo="Resumo">
          <p>
            {perfil.sobre[0]} {perfil.sobre[1]}
          </p>
        </Bloco>

        <Bloco titulo="Experiência">
          <div className="space-y-3">
            {experiencias.map((e) => (
              <div key={e.empresa} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-semibold text-zinc-900">
                    {e.cargo} <span className="font-normal text-zinc-400">·</span>{" "}
                    <span className="text-violet-700">{e.empresa}</span>
                  </h3>
                  <span className="text-[9pt] text-zinc-500">
                    {[e.inicio ? `${e.inicio} até ${e.fim || "hoje"}` : e.fim || "Atual", e.local].filter(Boolean).join(" · ")}
                  </span>
                </div>
                <p className="mt-0.5">{e.descricao}</p>
                {e.conquistas.length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-violet-400">
                    {e.conquistas.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                )}
                {e.tecnologias.length > 0 && (
                  <p className="mt-1 text-[9pt] text-zinc-500">{lista(e.tecnologias)}</p>
                )}
              </div>
            ))}
          </div>
        </Bloco>

        <Bloco titulo="Projetos">
          <ul className="space-y-1">
            {projetos.map((p) => (
              <li key={p.titulo} className="break-inside-avoid">
                <span className="font-semibold text-zinc-900">{p.titulo}</span>
                {p.link && (
                  <>
                    {" "}
                    <a href={p.link} className="text-[9pt] text-zinc-500 underline decoration-zinc-300 underline-offset-2">
                      {semProtocolo(p.link)}
                    </a>
                  </>
                )}
                <span className="text-zinc-400">: </span>
                {p.resumo}
              </li>
            ))}
          </ul>
        </Bloco>

        <Bloco titulo="Inteligência artificial">
          <p>{ia.resumo}</p>
          <p className="mt-1 text-[9pt] text-zinc-500">{lista(ia.tecnicas)}</p>
        </Bloco>

        <Bloco titulo="Habilidades técnicas">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            {(Object.keys(rotulosUso) as Uso[]).map((u) => (
              <Fragment key={u}>
                <dt className="font-semibold text-zinc-900">{rotulosUso[u].texto}</dt>
                <dd>{lista(linguagens.filter((l) => l.uso === u).map((l) => l.nome))}</dd>
              </Fragment>
            ))}
            <dt className="font-semibold text-zinc-900">Ferramentas</dt>
            <dd>{ferramentasTexto}</dd>
            <dt className="font-semibold text-zinc-900">Outros</dt>
            <dd>{lista(["Pacote Office", "Google Workspace", "Marketing digital (Google Ads e anúncios em redes sociais)"])}</dd>
          </dl>
        </Bloco>

        <div className={formacao.length > 0 ? "grid gap-x-8 sm:grid-cols-2 print:grid-cols-2" : ""}>
          {formacao.length > 0 && (
            <Bloco titulo="Formação">
              {formacao.map((f) => (
                <div key={f.curso} className="break-inside-avoid">
                  <p className="font-semibold text-zinc-900">{f.curso}</p>
                  <p>
                    {f.instituicao} <span className="text-zinc-400">·</span>{" "}
                    <span className="text-[9pt] text-zinc-500">
                      {f.periodo}
                      {f.emAndamento && " (em andamento)"}
                    </span>
                  </p>
                </div>
              ))}
            </Bloco>
          )}

          <Bloco titulo="Idiomas">
            <ul>
              {idiomas.map((i) => (
                <li key={i.nome}>
                  <span className="font-semibold text-zinc-900">{i.nome}:</span> {i.nivel}
                </li>
              ))}
            </ul>
          </Bloco>
        </div>

        <Bloco titulo="Cursos">
          <ul className="space-y-0.5">
            {cursos.map((c) => (
              <li key={c.nome}>
                {c.nome}
                {(c.instituicao || c.ano) && (
                  <span className="text-[9pt] text-zinc-500"> ({[c.instituicao, c.ano].filter(Boolean).join(", ")})</span>
                )}
              </li>
            ))}
          </ul>
        </Bloco>

        <Bloco titulo="Competências">
          <p>{lista(competencias.map((c) => c.titulo))}</p>
        </Bloco>
      </article>
    </main>
  );
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-4 break-inside-avoid-page">
      <h2 className="mb-1.5 font-mono text-[8.5pt] font-semibold tracking-[0.18em] text-violet-700 uppercase">{titulo}</h2>
      {children}
    </section>
  );
}
