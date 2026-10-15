import * as simpleIcons from "simple-icons";

/**
 * Resolve os logos das linguagens NO SERVIDOR. O pacote tem milhares de
 * ícones; importar isto num componente "use client" mandaria todos para o
 * navegador. Assim só o desenho dos que você usa chega à página.
 */

export type IconeMarca = { path: string; cor: string } | null;

const porSlug = new Map<string, { path: string; hex: string }>();
for (const icone of Object.values(simpleIcons)) {
  if (icone && typeof icone === "object" && "slug" in icone) porSlug.set(icone.slug, icone);
}

/** Marcas que o simple-icons não tem (a Microsoft pediu para tirar as dela). */
const extras: Record<string, { path: string; hex: string }> = {
  powerbi: { path: "M3 21h18v-2H3zM5 17h3V9H5zm5.5 0h3V4h-3zM16 17h3v-6h-3z", hex: "F2C811" },
};

export function iconeMarca(slug: string): IconeMarca {
  const icone = porSlug.get(slug.toLowerCase()) ?? extras[slug.toLowerCase()];
  if (!icone) return null;
  return { path: icone.path, cor: legivelNoEscuro(icone.hex) };
}

/** Logos pretos (Next.js, Vercel, GitHub…) sumiriam no fundo escuro. */
function legivelNoEscuro(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luz < 0.22 ? "#ececf3" : `#${hex}`;
}
