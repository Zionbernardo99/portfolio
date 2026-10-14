import { Competencias } from "@/components/competencias";
import { Contato, Rodape } from "@/components/contato";
import { Cursos } from "@/components/cursos";
import { Experiencias } from "@/components/experiencias";
import { Fundo } from "@/components/fundo";
import { Habilidades } from "@/components/habilidades";
import { Hero } from "@/components/hero";
import { Movimento } from "@/components/movimento";
import { Navegacao } from "@/components/navegacao";
import { Projetos } from "@/components/projetos";
import { Sobre } from "@/components/sobre";
import { ferramentas, linguagens } from "@/dados/perfil";
import { iconeMarca } from "@/lib/icones";

export default function Pagina() {
  return (
    <Movimento>
      <Fundo />
      <Navegacao />
      <main>
        <Hero />
        <Sobre />
        <Experiencias />
        <Projetos />
        <Habilidades
          linguagens={linguagens.map((l) => ({ nome: l.nome, nivel: l.nivel, svg: iconeMarca(l.icone) }))}
          ferramentas={ferramentas.map((f) => ({ nome: f.nome, svg: iconeMarca(f.icone) }))}
        />
        <Cursos />
        <Competencias />
        <Contato />
      </main>
      <Rodape />
    </Movimento>
  );
}
