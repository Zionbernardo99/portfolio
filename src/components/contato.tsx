"use client";

import { ArrowUp, Check, Copy, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { perfil } from "@/dados/perfil";
import { IconeSocial } from "./icone-social";
import { Revelar } from "./ui";

export function Contato() {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(perfil.email);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      window.location.href = `mailto:${perfil.email}`;
    }
  }

  return (
    <section id="contato" className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <Revelar>
        <div className="relative overflow-hidden rounded-[2rem] border border-borda bg-gradient-to-br from-violeta/15 via-superficie to-ciano/10 px-6 py-16 text-center sm:px-12 md:py-24">
          <motion.div
            aria-hidden
            className="absolute -top-1/2 left-1/2 size-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.2),transparent)]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative">
            <p className="font-mono text-xs tracking-[0.2em] text-violeta uppercase">07 · Contato</p>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Vamos construir algo <span className="texto-gradiente">juntos</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-suave sm:text-lg">
              Estou aberto a vagas, freelas e boas ideias. Me chama que eu respondo rápido.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${perfil.email}`}
                className="inline-flex h-13 items-center gap-2.5 rounded-full bg-gradient-to-r from-violeta to-ciano px-7 font-medium text-white shadow-lg shadow-violeta/30 transition-transform hover:scale-[1.03]"
              >
                <Mail className="size-5" /> Mandar e-mail
              </a>
              <button
                type="button"
                onClick={copiar}
                className="vidro inline-flex h-13 items-center gap-2.5 rounded-full px-6 font-mono text-sm transition-colors hover:bg-white/[0.07]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copiado ? "ok" : "copiar"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {copiado ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                  </motion.span>
                </AnimatePresence>
                {copiado ? "Copiado!" : perfil.email}
              </button>
            </div>

            <div className="mt-10 flex justify-center gap-2">
              {perfil.links.map((l, i) => (
                <motion.a
                  key={l.rotulo}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={l.rotulo}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.08 }}
                  className="vidro grid size-12 place-items-center rounded-full text-suave transition-colors hover:text-texto"
                >
                  <IconeSocial icone={l.icone} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </Revelar>
    </section>
  );
}

export function Rodape() {
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-borda px-4 py-8 text-sm text-apagado sm:flex-row sm:px-6">
      <p suppressHydrationWarning>
        © {new Date().getFullYear()} {perfil.nome}. Feito com Next.js e muito café.
      </p>
      <a href="#inicio" className="group inline-flex items-center gap-2 transition-colors hover:text-texto">
        Voltar ao topo
        <span className="grid size-8 place-items-center rounded-full border border-borda transition-transform group-hover:-translate-y-1">
          <ArrowUp className="size-4" />
        </span>
      </a>
    </footer>
  );
}
