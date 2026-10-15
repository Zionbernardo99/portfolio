"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, Images, X } from "lucide-react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { projetos, type Projeto } from "@/dados/perfil";
import { IconeSocial } from "./icone-social";
import { Etiqueta, Revelar, Secao } from "./ui";

const capas = [
  "from-violeta/50 via-fuchsia-500/20 to-ciano/30",
  "from-ciano/45 via-sky-500/20 to-emerald-400/25",
  "from-rosa/45 via-orange-400/20 to-violeta/30",
];

export function Projetos() {
  const categorias = ["Todos", ...new Set(projetos.map((p) => p.categoria))];
  const [filtro, setFiltro] = useState("Todos");
  const [aberto, setAberto] = useState<Projeto | null>(null);
  const visiveis = projetos.filter((p) => filtro === "Todos" || p.categoria === filtro);

  return (
    <Secao
      id="projetos"
      numero="03"
      rotulo="Projetos"
      titulo={
        <>
          Coisas que eu <span className="texto-gradiente">construí</span>.
        </>
      }
    >
      {categorias.length > 2 && (
        <Revelar className="mb-10 flex flex-wrap gap-2">
          {categorias.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFiltro(c)}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                filtro === c ? "text-texto" : "text-suave hover:text-texto"
              }`}
            >
              {filtro === c && (
                <motion.span
                  layoutId="filtro-ativo"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violeta/30 to-ciano/30 ring-1 ring-white/15"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </Revelar>
      )}

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visiveis.map((p) => (
            <motion.div
              key={p.titulo}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={p.destaque ? "md:col-span-2" : ""}
            >
              <CartaoProjeto projeto={p} indice={projetos.indexOf(p)} abrir={() => setAberto(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>{aberto && <Detalhes projeto={aberto} fechar={() => setAberto(null)} />}</AnimatePresence>
    </Secao>
  );
}

function CartaoProjeto({ projeto, indice, abrir }: { projeto: Projeto; indice: number; abrir: () => void }) {
  // Inclinação 3D + reflexo que acompanha o mouse.
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 20 });
  const reflexo = useMotionTemplate`radial-gradient(500px circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.10), transparent 45%)`;

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.button
        type="button"
        onClick={abrir}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const c = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - c.left) / c.width;
          const py = (e.clientY - c.top) / c.height;
          ry.set((px - 0.5) * 8);
          rx.set(-(py - 0.5) * 8);
          gx.set(px * 100);
          gy.set(py * 100);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        style={{ rotateX, rotateY }}
        whileTap={{ scale: 0.98 }}
        className="group vidro relative flex h-full w-full flex-col overflow-hidden rounded-3xl text-left transition-colors hover:border-white/20"
      >
        <div className={`relative w-full overflow-hidden ${projeto.destaque ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
          {projeto.imagens.length > 0 ? (
            projeto.destaque && projeto.imagens.length >= 3 ? (
              <Vitrine imagens={projeto.imagens} titulo={projeto.titulo} />
            ) : (
              <Image
                src={projeto.capa ?? projeto.imagens[0]}
                alt={projeto.titulo}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                quality={90}
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            )
          ) : (
            <CapaAutomatica titulo={projeto.titulo} gradiente={capas[indice % capas.length]} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-fundo via-fundo/10 to-transparent" />
          {projeto.imagens.length > 1 && (
            <span className="fosco absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-texto/90">
              <Images className="size-3.5" /> {projeto.imagens.length}
            </span>
          )}
        </div>

        <div className="relative flex flex-1 flex-col p-6 pt-2">
          <p className="font-mono text-xs text-ciano">
            {[projeto.categoria, projeto.ano].filter(Boolean).join(" · ")}
          </p>
          <h3 className="mt-2 flex items-center justify-between gap-3 font-display text-2xl font-semibold">
            {projeto.titulo}
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/5 transition-all duration-300 group-hover:rotate-45 group-hover:bg-gradient-to-br group-hover:from-violeta group-hover:to-ciano">
              <ArrowUpRight className="size-4" />
            </span>
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-suave">{projeto.resumo}</p>
          <div className="mt-5 flex flex-wrap gap-1.5 empty:hidden">
            {projeto.tecnologias.slice(0, 5).map((t) => (
              <Etiqueta key={t}>{t}</Etiqueta>
            ))}
          </div>
        </div>

        <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: reflexo }} />
      </motion.button>
    </div>
  );
}

/** Três prints em leque para o projeto em destaque. Abrem no hover. */
function Vitrine({ imagens, titulo }: { imagens: string[]; titulo: string }) {
  const posicoes = [
    "left-[8%] rotate-[-8deg] group-hover:-translate-x-3 group-hover:rotate-[-11deg]",
    "left-1/2 z-10 -translate-x-1/2 group-hover:-translate-y-3",
    "right-[8%] rotate-[8deg] group-hover:translate-x-3 group-hover:rotate-[11deg]",
  ];
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgb(139_92_246/0.45),transparent_65%)]">
      {imagens.slice(0, 3).map((src, i) => (
        <div
          key={src}
          className={`absolute top-[12%] aspect-[9/16] w-[30%] max-w-56 overflow-hidden rounded-2xl shadow-2xl ring-1 shadow-black/60 ring-white/10 transition-transform duration-700 ease-out ${posicoes[i]}`}
        >
          <Image src={src} alt={`${titulo}, tela ${i + 1}`} fill sizes="(min-width: 1024px) 220px, 30vw" quality={90} className="object-cover object-top" />
        </div>
      ))}
    </div>
  );
}

function CapaAutomatica({ titulo, gradiente }: { titulo: string; gradiente: string }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradiente}`}>
      <div
        className="absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: "radial-gradient(rgb(255 255 255 / 0.25) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <span className="absolute inset-0 grid place-items-center font-display text-8xl font-bold text-white/80 transition-transform duration-700 group-hover:scale-110">
        {titulo[0]}
      </span>
    </div>
  );
}

function Detalhes({ projeto, fechar }: { projeto: Projeto; fechar: () => void }) {
  const [foto, setFoto] = useState(0);
  const [direcao, setDirecao] = useState(1);
  const total = projeto.imagens.length;
  // Print de computador (deitado) pede uma galeria mais larga que print de
  // celular (em pé). Descobre pelo tamanho real da primeira imagem que carrega.
  const [deitada, setDeitada] = useState(false);

  const ir = useCallback(
    (passo: number) => {
      if (total < 2) return;
      setDirecao(passo);
      setFoto((f) => (f + passo + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowRight") ir(1);
      if (e.key === "ArrowLeft") ir(-1);
    };
    window.addEventListener("keydown", tecla);
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", tecla);
      document.body.style.overflow = anterior;
    };
  }, [fechar, ir]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={fechar}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={projeto.titulo}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className={`relative grid max-h-[92svh] w-full overflow-y-auto rounded-t-3xl border border-borda bg-superficie shadow-2xl transition-[max-width] duration-300 sm:rounded-3xl md:overflow-hidden ${
          deitada ? "max-w-6xl md:grid-cols-[1.7fr_1fr]" : "max-w-5xl md:grid-cols-[1.1fr_1fr]"
        }`}
      >
        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar"
          className="fosco absolute top-4 right-4 z-20 grid size-10 place-items-center rounded-full transition-transform hover:rotate-90"
        >
          <X className="size-5" />
        </button>

        {/* Galeria */}
        <div
          className={`relative flex flex-col bg-black/40 md:min-h-[34rem] ${deitada ? "min-h-64" : "min-h-[26rem]"}`}
        >
          <div className="relative flex-1 overflow-hidden">
            {total > 0 ? (
              <AnimatePresence initial={false} custom={direcao} mode="popLayout">
                <motion.div
                  key={foto}
                  custom={direcao}
                  variants={{
                    entra: (d: number) => ({ x: d * 80, opacity: 0 }),
                    centro: { x: 0, opacity: 1 },
                    sai: (d: number) => ({ x: d * -80, opacity: 0 }),
                  }}
                  initial="entra"
                  animate="centro"
                  exit="sai"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  drag={total > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) ir(1);
                    else if (info.offset.x > 60) ir(-1);
                  }}
                  className="absolute inset-0 cursor-grab p-6 active:cursor-grabbing"
                >
                  <div className="relative size-full">
                    <Image
                      src={projeto.imagens[foto]}
                      alt={`${projeto.titulo}, imagem ${foto + 1}`}
                      fill
                      sizes="(min-width: 768px) 720px, 100vw"
                      quality={90}
                      onLoad={(e) => setDeitada(e.currentTarget.naturalWidth > e.currentTarget.naturalHeight)}
                      draggable={false}
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <CapaAutomatica titulo={projeto.titulo} gradiente={capas[0]} />
            )}

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => ir(-1)}
                  aria-label="Imagem anterior"
                  className="fosco absolute top-1/2 left-3 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full hover:bg-white/10"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => ir(1)}
                  aria-label="Próxima imagem"
                  className="fosco absolute top-1/2 right-3 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full hover:bg-white/10"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>

          {total > 1 && (
            <div className="flex justify-center gap-2 overflow-x-auto p-4">
              {projeto.imagens.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => {
                    setDirecao(i > foto ? 1 : -1);
                    setFoto(i);
                  }}
                  aria-label={`Ver imagem ${i + 1}`}
                  className={`relative shrink-0 overflow-hidden rounded-md transition-all ${deitada ? "h-10 w-16" : "h-14 w-9"} ${
                    i === foto ? "ring-2 ring-ciano" : "opacity-50 hover:opacity-90"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="36px" className="object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Texto */}
        <div className="flex flex-col p-7 md:overflow-y-auto md:p-9">
          <p className="font-mono text-xs text-ciano">
            {[projeto.categoria, projeto.ano].filter(Boolean).join(" · ")}
          </p>
          <h3 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">{projeto.titulo}</h3>
          <p className="mt-2 text-lg text-texto/85">{projeto.resumo}</p>
          <p className="mt-5 leading-relaxed text-suave">{projeto.descricao}</p>

          {projeto.tecnologias.length > 0 && (
            <>
              <p className="mt-7 mb-3 font-mono text-xs tracking-widest text-apagado uppercase">Tecnologias</p>
              <div className="flex flex-wrap gap-1.5">
                {projeto.tecnologias.map((t) => (
                  <Etiqueta key={t}>{t}</Etiqueta>
                ))}
              </div>
            </>
          )}

          {(projeto.link || projeto.codigo) && (
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              {projeto.link && (
                <a
                  href={projeto.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-violeta to-ciano px-5 text-sm font-medium text-white"
                >
                  Ver online <ExternalLink className="size-4" />
                </a>
              )}
              {projeto.codigo && (
                <a
                  href={projeto.codigo}
                  target="_blank"
                  rel="noreferrer"
                  className="vidro inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium hover:bg-white/[0.07]"
                >
                  <IconeSocial icone="github" className="size-4" /> Código
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
