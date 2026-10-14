import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { perfil } from "@/dados/perfil";
import "./globals.css";

const display = Sora({ subsets: ["latin"], variable: "--fonte-display" });
const texto = Inter({ subsets: ["latin"], variable: "--fonte-texto" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--fonte-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(perfil.site),
  title: `${perfil.nome} — ${perfil.cargos[0]}`,
  description: perfil.apresentacao,
  openGraph: {
    title: perfil.nome,
    description: perfil.apresentacao,
    url: "/",
    type: "profile",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#07070c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${texto.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
