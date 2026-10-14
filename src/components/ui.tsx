"use client";

import { motion, useMotionTemplate, useMotionValue, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

const suave = [0.22, 1, 0.36, 1] as const;

/** Sobe e aparece quando entra na tela. Só anima uma vez. */
export function Revelar({
  children,
  atraso = 0,
  className,
  ...resto
}: { children: ReactNode; atraso?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: suave, delay: atraso }}
      className={className}
      {...resto}
    >
      {children}
    </motion.div>
  );
}

export function Secao({
  id,
  numero,
  rotulo,
  titulo,
  children,
}: {
  id: string;
  numero: string;
  rotulo: string;
  titulo: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <Revelar className="mb-12 md:mb-16">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-violeta uppercase">
          <span>{numero}</span>
          <motion.span
            className="h-px w-10 origin-left bg-gradient-to-r from-violeta to-ciano"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: suave, delay: 0.2 }}
          />
          <span className="text-suave">{rotulo}</span>
        </p>
        <h2 className="max-w-3xl font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
          {titulo}
        </h2>
      </Revelar>
      {children}
    </section>
  );
}

/** Cartão de vidro com um brilho que acompanha o mouse por dentro. */
export function CartaoBrilho({
  children,
  className = "",
  cor = "139 92 246",
}: {
  children: ReactNode;
  className?: string;
  /** RGB separado por espaço, ex.: "34 211 238". */
  cor?: string;
}) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const brilho = useMotionTemplate`radial-gradient(360px circle at ${x}px ${y}px, rgb(${cor} / 0.16), transparent 70%)`;

  return (
    <div
      onPointerMove={(e) => {
        const caixa = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - caixa.left);
        y.set(e.clientY - caixa.top);
      }}
      onPointerLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
      className={`group vidro relative overflow-hidden rounded-2xl transition-colors duration-300 hover:border-white/15 ${className}`}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: brilho }} />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export function Etiqueta({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-borda bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-suave">
      {children}
    </span>
  );
}

/** Idade calculada na hora, no navegador: o site não "envelhece" parado. */
export function Idade({ nascimento }: { nascimento: string }) {
  const [ano, mes, dia] = nascimento.split("-").map(Number);
  const hoje = new Date();
  let idade = hoje.getFullYear() - ano;
  if (hoje.getMonth() + 1 < mes || (hoje.getMonth() + 1 === mes && hoje.getDate() < dia)) idade--;
  return <span suppressHydrationWarning>{idade} anos</span>;
}
