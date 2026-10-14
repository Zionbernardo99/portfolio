"use client";

import { ArrowDown, ArrowUpRight, Download, MapPin, Sparkles } from "lucide-react";
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { perfil } from "@/dados/perfil";
import { IconeSocial } from "./icone-social";
import { Idade } from "./ui";

const suave = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const descerFoto = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const descerTexto = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const sumir = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const palavras = perfil.nome.split(" ");

  return (
    <section ref={ref} id="inicio" className="relative flex min-h-svh items-center pt-28 pb-16">
      <motion.div
        style={{ opacity: sumir }}
        className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-10"
      >
        <motion.div style={{ y: descerTexto }} className="order-2 lg:order-1">
          {perfil.disponivel && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: suave }}
              className="vidro mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs text-suave"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Disponível para novas oportunidades
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-3 font-mono text-sm text-ciano"
          >
            Olá, eu sou
          </motion.p>

          <h1 className="font-display text-5xl leading-[1.02] font-bold tracking-tight sm:text-7xl lg:text-[5.5rem]">
            {palavras.map((palavra, p) => (
              <span key={p} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
                {[...palavra].map((letra, l) => (
                  <motion.span
                    key={l}
                    className={`inline-block ${p === palavras.length - 1 ? "texto-gradiente" : ""}`}
                    // Cada letra mostra a sua fatia do degradê, para a palavra
                    // parecer pintada de uma vez só mesmo animando letra a letra.
                    style={
                      p === palavras.length - 1
                        ? {
                            backgroundSize: `${palavra.length * 100}% 100%`,
                            backgroundPosition: `${(l / Math.max(palavra.length - 1, 1)) * 100}% 0`,
                          }
                        : undefined
                    }
                    initial={{ y: "110%", rotate: 8 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 0.8, ease: suave, delay: 0.25 + (p * 6 + l) * 0.035 }}
                  >
                    {letra}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6, ease: suave }}
            className="mt-5 h-9 font-display text-xl text-texto/90 sm:text-2xl"
          >
            <MaquinaDeEscrever frases={perfil.cargos} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: suave }}
            className="mt-5 max-w-xl leading-relaxed text-pretty text-suave sm:text-lg"
          >
            {perfil.apresentacao}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: suave }}
            className="mt-6 flex flex-wrap gap-2 text-sm text-suave"
          >
            <span className="vidro inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
              <Sparkles className="size-4 text-violeta" /> <Idade nascimento={perfil.nascimento} />
            </span>
            <span className="vidro inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
              <MapPin className="size-4 text-ciano" /> {perfil.cidade}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: suave }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <BotaoMagnetico href="#projetos" principal>
              Ver projetos <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </BotaoMagnetico>
            {perfil.curriculo ? (
              <BotaoMagnetico href={perfil.curriculo} download>
                <Download className="size-4" /> Baixar currículo
              </BotaoMagnetico>
            ) : (
              <BotaoMagnetico href="#contato">Fale comigo</BotaoMagnetico>
            )}
            <div className="ml-1 flex items-center gap-1">
              {perfil.links.map((l) => (
                <a
                  key={l.rotulo}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={l.rotulo}
                  className="grid size-11 place-items-center rounded-full text-suave transition-all hover:-translate-y-0.5 hover:bg-white/5 hover:text-texto"
                >
                  <IconeSocial icone={l.icone} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: descerFoto }} className="order-1 flex justify-center lg:order-2">
          <Foto />
        </motion.div>
      </motion.div>

      <motion.a
        href="#sobre"
        aria-label="Rolar para baixo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ opacity: sumir }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-apagado uppercase sm:flex"
      >
        rolar
        <span className="animate-quicar">
          <ArrowDown className="size-4" />
        </span>
      </motion.a>
    </section>
  );
}

function Foto() {
  const iniciais = perfil.nome
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  // Inclina a foto um pouquinho na direção do mouse.
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 18 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: suave, delay: 0.2 }}
      className="relative"
      style={{ perspective: 900 }}
    >
      <motion.div
        onPointerMove={(e) => {
          const c = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - c.left) / c.width - 0.5) * 16);
          rx.set(-((e.clientY - c.top) / c.height - 0.5) * 16);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        style={{ rotateX, rotateY }}
        className="relative size-64 sm:size-80 lg:size-[22rem]"
      >
        {/* Brilho atrás */}
        <div className="absolute -inset-16 bg-[radial-gradient(closest-side,rgb(139_92_246/0.45),rgb(34_211_238/0.18)_55%,transparent)]" />
        {/* Borda girando */}
        <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] p-[2px]">
          <div className="absolute -inset-1/2 animate-girar bg-[conic-gradient(from_0deg,transparent_0%,#8b5cf6_15%,#22d3ee_35%,transparent_50%,#f472b6_70%,transparent_85%)]" />
          <div className="relative size-full overflow-hidden rounded-[calc(2.5rem-2px)] bg-superficie">
            {perfil.foto ? (
              <Image src={perfil.foto} alt={perfil.nome} fill priority sizes="(min-width: 1024px) 352px, 320px" className="object-cover" />
            ) : (
              <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(139_92_246/0.35),transparent_60%),radial-gradient(circle_at_80%_90%,rgb(34_211_238/0.25),transparent_55%)]">
                <span className="texto-gradiente font-display text-8xl font-bold sm:text-9xl">{iniciais}</span>
              </div>
            )}
          </div>
        </div>

        <Flutuante className="-top-4 -left-6 sm:-left-10" atraso={0}>
          <span className="font-mono text-ciano">{"</>"}</span> Full Stack
        </Flutuante>
        <Flutuante className="top-1/2 -right-6 sm:-right-12" atraso={1.2}>
          <span className="text-violeta">▲</span> Next.js
        </Flutuante>
        <Flutuante className="-bottom-4 left-4 sm:left-8" atraso={0.6}>
          <span className="text-rosa">★</span> Lifelyst
        </Flutuante>
      </motion.div>
    </motion.div>
  );
}

function Flutuante({ children, className, atraso }: { children: React.ReactNode; className: string; atraso: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ opacity: { delay: 1.2 + atraso * 0.2 }, scale: { delay: 1.2 + atraso * 0.2, type: "spring" } }}
      className={`absolute ${className}`}
      style={{ z: 40 }}
    >
      {/* A flutuação é CSS: roda na placa de vídeo, sem JavaScript a cada quadro. */}
      <div
        className="flex animate-flutuar border border-borda bg-superficie/90 items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-medium whitespace-nowrap shadow-xl shadow-black/30 sm:text-sm"
        style={{ animationDelay: `${atraso}s` }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function MaquinaDeEscrever({ frases }: { frases: string[] }) {
  const [indice, setIndice] = useState(0);
  const [letras, setLetras] = useState(0);
  const [apagando, setApagando] = useState(false);
  // Fora da tela, para de digitar: não tem por que redesenhar o que ninguém vê.
  const ref = useRef<HTMLSpanElement>(null);
  const visivel = useInView(ref);

  useEffect(() => {
    if (!visivel) return;
    const frase = frases[indice % frases.length];
    let espera = apagando ? 35 : 70;
    if (!apagando && letras === frase.length) espera = 1800;
    if (apagando && letras === 0) espera = 300;

    const t = setTimeout(() => {
      if (!apagando && letras === frase.length) setApagando(true);
      else if (apagando && letras === 0) {
        setApagando(false);
        setIndice((i) => i + 1);
      } else setLetras((n) => n + (apagando ? -1 : 1));
    }, espera);
    return () => clearTimeout(t);
  }, [frases, indice, letras, apagando, visivel]);

  const frase = frases[indice % frases.length];
  return (
    <span ref={ref} aria-label={frases.join(", ")}>
      <span aria-hidden className="text-suave">
        ~/
      </span>
      <span aria-hidden>{frase.slice(0, letras)}</span>
      <span aria-hidden className="ml-0.5 inline-block h-[1.1em] w-[3px] translate-y-[3px] animate-piscar bg-ciano" />
    </span>
  );
}

function BotaoMagnetico({
  href,
  children,
  principal,
  download,
}: {
  href: string;
  children: React.ReactNode;
  principal?: boolean;
  download?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15 });
  const sy = useSpring(y, { stiffness: 250, damping: 15 });

  return (
    <motion.a
      href={href}
      download={download}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const c = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - c.left - c.width / 2) * 0.25);
        y.set((e.clientY - c.top - c.height / 2) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-6 text-sm font-medium transition-shadow ${
        principal
          ? "bg-gradient-to-r from-violeta to-ciano text-white shadow-lg shadow-violeta/30 hover:shadow-violeta/50"
          : "vidro text-texto hover:bg-white/[0.07]"
      }`}
    >
      {principal && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
