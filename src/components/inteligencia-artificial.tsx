"use client";

import {
  Bot,
  Braces,
  CalendarDays,
  Check,
  CreditCard,
  FlaskConical,
  Gauge,
  GlassWater,
  MessageSquareText,
  Mic,
  Newspaper,
  ScanLine,
  Sparkles,
  Wallet,
  Workflow,
} from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ia, type CapacidadeIa } from "@/dados/perfil";
import { CartaoBrilho, Revelar, Secao } from "./ui";

const icones: Record<CapacidadeIa["icone"], typeof Bot> = {
  chat: MessageSquareText,
  foto: ScanLine,
  json: Braces,
  regras: Workflow,
  testes: FlaskConical,
  custo: Gauge,
  conteudo: Newspaper,
  agente: Bot,
};

const iconesTipo: Record<string, typeof Bot> = {
  Despesa: Wallet,
  Compromisso: CalendarDays,
  Parcelado: CreditCard,
  Água: GlassWater,
};

export function InteligenciaArtificial() {
  return (
    <Secao
      id="ia"
      numero="05"
      rotulo="Inteligência artificial"
      titulo={
        <>
          IA que eu coloco <span className="texto-gradiente">em produção</span>.
        </>
      }
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Revelar>
          <Conversa />
        </Revelar>

        <Revelar atraso={0.1}>
          <p className="text-lg leading-relaxed text-suave">{ia.resumo}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {ia.tecnicas.map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.05, type: "spring", stiffness: 260, damping: 20 }}
                className="vidro rounded-full px-3.5 py-1.5 font-mono text-xs text-texto/85"
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </Revelar>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ia.capacidades.map((c, i) => {
          const Icone = icones[c.icone];
          return (
            <Revelar key={c.titulo} atraso={(i % 4) * 0.07}>
              <CartaoBrilho className="h-full p-6" cor={i % 2 ? "34 211 238" : "139 92 246"}>
                <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-violeta/25 to-ciano/20 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <Icone className="size-5 text-ciano" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold">{c.titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-suave">{c.descricao}</p>
              </CartaoBrilho>
            </Revelar>
          );
        })}
      </div>
    </Secao>
  );
}

type Fase = "digitando" | "pensando" | "pronto";

/** Uma conversa de mentirinha com a Lys: digita a frase, "pensa" e mostra o que ela virou. */
function Conversa() {
  const ref = useRef<HTMLDivElement>(null);
  const visivel = useInView(ref, { margin: "-80px" });
  const reduzir = useReducedMotion();
  const [indice, setIndice] = useState(0);
  const [letras, setLetras] = useState(0);
  const [fase, setFase] = useState<Fase>("digitando");

  const exemplo = ia.exemplos[indice];

  useEffect(() => {
    if (!visivel) return;
    let espera: number;
    let proximo: () => void;
    if (fase === "digitando") {
      if (reduzir || letras >= exemplo.frase.length) {
        espera = reduzir ? 600 : 350;
        proximo = () => {
          setLetras(exemplo.frase.length);
          setFase("pensando");
        };
      } else {
        espera = 38 + Math.random() * 40;
        proximo = () => setLetras((n) => n + 1);
      }
    } else if (fase === "pensando") {
      espera = 900;
      proximo = () => setFase("pronto");
    } else {
      espera = 2600;
      proximo = () => {
        setIndice((i) => (i + 1) % ia.exemplos.length);
        setLetras(0);
        setFase("digitando");
      };
    }
    const t = window.setTimeout(proximo, espera);
    return () => window.clearTimeout(t);
  }, [visivel, fase, letras, exemplo.frase.length, reduzir]);

  const Icone = iconesTipo[exemplo.tipo] ?? Sparkles;

  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute -inset-3 -z-10 rounded-[2rem] sm:-inset-6 bg-gradient-to-br from-violeta/20 via-transparent to-ciano/15 blur-2xl" />
      <div className="vidro overflow-hidden rounded-3xl">
        <div className="flex items-center gap-3 border-b border-borda px-5 py-4">
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violeta to-ciano">
            <Sparkles className="size-4 text-white" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-semibold">Lys</p>
            <p className="text-xs text-apagado">assistente do Lifelyst</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="size-1.5 animate-piscar rounded-full bg-emerald-400" /> online
          </span>
        </div>

        <div className="flex min-h-64 flex-col gap-3 p-5" aria-live="polite">
          <div className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-gradient-to-br from-violeta to-violeta/70 px-4 py-2.5 text-sm text-white">
            {exemplo.frase.slice(0, letras)}
            {fase === "digitando" && <span className="ml-0.5 inline-block h-4 w-px animate-piscar bg-white align-middle" />}
          </div>

          <AnimatePresence mode="wait">
            {fase === "pensando" && (
              <motion.div
                key="pensando"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-1 self-start rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-3.5"
                aria-label="Lys está pensando"
              >
                {[0, 1, 2].map((p) => (
                  <motion.span
                    key={p}
                    className="size-1.5 rounded-full bg-suave"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: p * 0.12 }}
                  />
                ))}
              </motion.div>
            )}
            {fase === "pronto" && (
              <motion.div
                key={"pronto" + indice}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className="w-full max-w-[85%] self-start rounded-2xl rounded-bl-md border border-ciano/25 bg-ciano/[0.06] p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ciano/15">
                    <Icone className="size-5 text-ciano" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] tracking-wider text-ciano uppercase">{exemplo.tipo}</p>
                    <p className="font-display text-lg font-semibold">{exemplo.valor}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-suave">{exemplo.detalhe}</p>
                <p className="mt-3 flex items-center gap-1.5 border-t border-borda pt-3 font-mono text-[11px] text-emerald-400">
                  <Check className="size-3.5" /> salvo no app · JSON validado
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 border-t border-borda px-5 py-3.5 text-sm text-apagado">
          <span className="flex-1">Escreva, fale ou mande uma foto…</span>
          <Mic className="size-4" />
        </div>
      </div>
    </div>
  );
}
