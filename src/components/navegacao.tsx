"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { perfil } from "@/dados/perfil";

export const secoes = [
  { id: "sobre", rotulo: "Sobre" },
  { id: "experiencia", rotulo: "Experiência" },
  { id: "projetos", rotulo: "Projetos" },
  { id: "habilidades", rotulo: "Habilidades" },
  { id: "ia", rotulo: "IA" },
  { id: "cursos", rotulo: "Formação" },
  { id: "competencias", rotulo: "Competências" },
  { id: "contato", rotulo: "Contato" },
];

export function Navegacao() {
  const { scrollY, scrollYProgress } = useScroll();
  const progresso = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const [ativa, setAtiva] = useState("");
  const [escondida, setEscondida] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  // Some ao descer, volta ao subir: a barra não fica na frente do conteúdo.
  useMotionValueEvent(scrollY, "change", (atual) => {
    const anterior = scrollY.getPrevious() ?? 0;
    setEscondida(atual > anterior && atual > 400);
    setRolou(atual > 24);
  });

  // Destaca no menu a seção que está no meio da tela.
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) if (entrada.isIntersecting) setAtiva(entrada.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of secoes) {
      const el = document.getElementById(id);
      if (el) observador.observe(el);
    }
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
  }, [menuAberto]);

  const iniciais = perfil.nome
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-violeta via-ciano to-rosa"
        style={{ scaleX: progresso }}
      />

      <motion.header
        className="fixed inset-x-0 top-3 z-40 flex justify-center px-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: escondida && !menuAberto ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={`flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:px-4 ${
            rolou || menuAberto ? "fosco shadow-2xl shadow-black/40" : "border border-transparent"
          }`}
        >
          <a
            href="#inicio"
            onClick={() => setMenuAberto(false)}
            className="flex items-center gap-2.5 rounded-full py-1 pr-3 pl-1"
            aria-label="Voltar ao início"
          >
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violeta to-ciano font-display text-sm font-bold text-white">
              {iniciais}
            </span>
            <span className="font-display text-sm font-semibold">{perfil.nome}</span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {secoes.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`relative block rounded-full px-3.5 py-2 text-sm transition-colors ${
                    ativa === s.id ? "text-texto" : "text-suave hover:text-texto"
                  }`}
                >
                  {ativa === s.id && (
                    <motion.span
                      layoutId="secao-ativa"
                      className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{s.rotulo}</span>
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuAberto((v) => !v)}
            className="grid size-10 place-items-center rounded-full text-texto lg:hidden"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
          >
            {menuAberto ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuAberto && (
          <motion.div
            className="fixed inset-0 z-30 bg-fundo/90 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.ul
              className="flex h-full flex-col justify-center gap-2 px-8"
              initial="fora"
              animate="dentro"
              exit="fora"
              variants={{ dentro: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {secoes.map((s, i) => (
                <motion.li
                  key={s.id}
                  variants={{ fora: { opacity: 0, x: -30 }, dentro: { opacity: 1, x: 0 } }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setMenuAberto(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-4xl font-semibold"
                  >
                    <span className="font-mono text-sm text-violeta">0{i + 1}</span>
                    <span className={ativa === s.id ? "texto-gradiente" : ""}>{s.rotulo}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
