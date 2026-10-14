/**
 * TUDO o que aparece no site sai deste arquivo.
 *
 * Para atualizar o portfólio você só precisa mexer aqui: trocar textos,
 * acrescentar um projeto, um curso, uma empresa. O resto do código lê estas
 * listas e monta as seções (com as animações) sozinho.
 *
 * Os itens marcados com `// EXEMPLO` são de mentirinha: troque pelos seus
 * antes de publicar.
 *
 * Imagens: coloque os arquivos dentro de `public/` e escreva o caminho a
 * partir da barra. Ex.: `public/foto.jpg` vira "/foto.jpg".
 */

// ─── Tipos ────────────────────────────────────────────────────────────────

export type Link = { rotulo: string; url: string; icone: "github" | "linkedin" | "instagram" | "email" | "site" | "whatsapp" };

export type Experiencia = {
  empresa: string;
  cargo: string;
  /** Ex.: "Mar 2024". */
  inicio: string;
  /** Deixe vazio ("") se você ainda trabalha lá — aparece "Atual". */
  fim: string;
  local: string;
  descricao: string;
  conquistas: string[];
  tecnologias: string[];
};

export type Projeto = {
  titulo: string;
  /** Uma frase curta que aparece no card. */
  resumo: string;
  /** Texto completo, aparece quando a pessoa clica no projeto. */
  descricao: string;
  /** Fotos/prints do projeto. A primeira é a capa do card. */
  imagens: string[];
  /** Usado nos filtros no topo da seção. */
  categoria: string;
  tecnologias: string[];
  ano: string;
  link?: string;
  codigo?: string;
  /** Projetos em destaque ocupam um card maior. */
  destaque?: boolean;
};

export type Habilidade = {
  nome: string;
  /**
   * Nome do ícone em https://simpleicons.org (o "slug", em minúsculas, sem
   * espaço). Ex.: "javascript", "react", "nextdotjs", "python". Se não
   * existir, aparecem as iniciais.
   */
  icone: string;
  /** De 0 a 100. */
  nivel: number;
};

export type Curso = {
  nome: string;
  instituicao: string;
  ano: string;
  /** Ex.: "40h". Opcional. */
  carga?: string;
  /** Link do certificado. Opcional. */
  certificado?: string;
};

export type Competencia = {
  titulo: string;
  descricao: string;
  icone: "users" | "brain" | "rocket" | "message" | "target" | "palette" | "clock" | "lightbulb";
};

export type Idioma = { nome: string; nivel: string; porcentagem: number };

// ─── Você ─────────────────────────────────────────────────────────────────

export const perfil = {
  nome: "Zion Bernardo",
  /** Usado para calcular a idade automaticamente (AAAA-MM-DD). */
  nascimento: "2000-01-01", // EXEMPLO
  cidade: "Sua cidade, Brasil", // EXEMPLO
  /**
   * Coloque sua foto em `public/foto.jpg` e escreva "/foto.jpg" aqui.
   * Vazio ("") mostra suas iniciais no lugar.
   */
  foto: "",
  /** Frases que vão se alternando, digitadas, no topo do site. */
  cargos: ["Desenvolvedor Full Stack", "Criador do Lifelyst", "Apaixonado por produto"],
  apresentacao:
    "Construo aplicações web completas — do banco de dados à última animação da interface — com foco em produtos que as pessoas usam de verdade.",
  sobre: [
    "Sou desenvolvedor e gosto de transformar ideias em produtos completos. Criei o Lifelyst, um organizador pessoal e familiar que cuida de tarefas, rotina, saúde, estudos, finanças e metas num lugar só.",
    "Trabalho principalmente com TypeScript, React e Next.js, e me sinto em casa em todas as camadas: modelagem de banco, APIs, pagamentos, notificações, PWA e publicação na Play Store.",
  ],
  disponivel: true,
  /** Coloque o PDF em `public/curriculo.pdf`. Vazio ("") esconde o botão. */
  curriculo: "",
  email: "seuemail@exemplo.com", // EXEMPLO
  links: [
    { rotulo: "GitHub", url: "https://github.com/Zionbernardo99", icone: "github" },
    { rotulo: "LinkedIn", url: "https://www.linkedin.com/", icone: "linkedin" }, // EXEMPLO
    { rotulo: "Instagram", url: "https://www.instagram.com/", icone: "instagram" }, // EXEMPLO
  ] satisfies Link[],
};

/** Os números grandes da seção "Sobre". */
export const numeros = [
  { valor: 3, sufixo: "+", rotulo: "anos programando" }, // EXEMPLO
  { valor: 12, sufixo: "+", rotulo: "projetos entregues" }, // EXEMPLO
  { valor: 8, sufixo: "", rotulo: "cursos concluídos" }, // EXEMPLO
  { valor: 10, sufixo: "+", rotulo: "tecnologias" }, // EXEMPLO
];

// ─── Onde trabalhei ───────────────────────────────────────────────────────

export const experiencias: Experiencia[] = [
  {
    empresa: "Lifelyst",
    cargo: "Fundador & Desenvolvedor Full Stack",
    inicio: "2025",
    fim: "",
    local: "Remoto",
    descricao:
      "Criação, do zero, de um organizador pessoal e familiar disponível na web e na Play Store.",
    conquistas: [
      "Arquitetura completa com Next.js, Prisma e PostgreSQL",
      "Assinaturas com Mercado Pago e programa de indicação para criadores",
      "PWA com notificações push e modo offline",
    ],
    tecnologias: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
  },
  {
    // EXEMPLO
    empresa: "Empresa Exemplo Ltda",
    cargo: "Desenvolvedor Front-end",
    inicio: "Jan 2023",
    fim: "Dez 2024",
    local: "São Paulo, SP",
    descricao: "Troque por uma frase sobre o que você fazia nessa empresa.",
    conquistas: ["Uma conquista de que você se orgulha", "Outra entrega importante"],
    tecnologias: ["React", "JavaScript", "CSS"],
  },
  {
    // EXEMPLO
    empresa: "Outra Empresa",
    cargo: "Estagiário de Desenvolvimento",
    inicio: "Mar 2022",
    fim: "Dez 2022",
    local: "Híbrido",
    descricao: "Troque por uma frase sobre o seu estágio ou primeiro emprego.",
    conquistas: ["O que você aprendeu ou construiu"],
    tecnologias: ["HTML", "CSS", "JavaScript"],
  },
];

// ─── Projetos ─────────────────────────────────────────────────────────────

export const projetos: Projeto[] = [
  {
    titulo: "Lifelyst",
    resumo: "Organizador pessoal e familiar: seu dia inteiro em uma tela.",
    descricao:
      "Afazeres, rotina, saúde, estudos, finanças, calendário e metas num app só, com espaço compartilhado para a família. Tem assinatura paga, notificações push, funciona offline e está publicado na Google Play.",
    imagens: [
      "/projetos/lifelyst/inicio.webp",
      "/projetos/lifelyst/financas.webp",
      "/projetos/lifelyst/afazeres.webp",
      "/projetos/lifelyst/saude.webp",
      "/projetos/lifelyst/familia.webp",
      "/projetos/lifelyst/metas.webp",
    ],
    categoria: "Web & Mobile",
    tecnologias: ["Next.js 16", "React 19", "TypeScript", "Tailwind", "Prisma", "PostgreSQL", "Vercel"],
    ano: "2025",
    link: "https://lifelyst.com.br",
    destaque: true,
  },
  {
    // EXEMPLO
    titulo: "Projeto Exemplo",
    resumo: "Troque por um projeto seu — site, app, automação…",
    descricao: "Conte o problema que o projeto resolve, o que você fez e o que aprendeu.",
    imagens: [],
    categoria: "Web",
    tecnologias: ["React", "Node.js"],
    ano: "2024",
    codigo: "https://github.com/Zionbernardo99",
  },
  {
    // EXEMPLO
    titulo: "Outro Projeto",
    resumo: "Sem imagem? O card ganha uma capa colorida automática.",
    descricao: "Coloque prints em `public/projetos/` e liste os caminhos em `imagens`.",
    imagens: [],
    categoria: "Automação",
    tecnologias: ["Python"],
    ano: "2023",
  },
];

// ─── Linguagens e ferramentas ─────────────────────────────────────────────

export const linguagens: Habilidade[] = [
  { nome: "TypeScript", icone: "typescript", nivel: 90 },
  { nome: "JavaScript", icone: "javascript", nivel: 90 },
  { nome: "React", icone: "react", nivel: 88 },
  { nome: "Next.js", icone: "nextdotjs", nivel: 85 },
  { nome: "HTML", icone: "html5", nivel: 92 },
  { nome: "CSS", icone: "css", nivel: 85 },
  { nome: "Node.js", icone: "nodedotjs", nivel: 78 },
  { nome: "SQL / PostgreSQL", icone: "postgresql", nivel: 72 },
  { nome: "Python", icone: "python", nivel: 60 }, // EXEMPLO
];

/** Aparecem na faixa que desliza sozinha. */
export const ferramentas = [
  { nome: "Tailwind CSS", icone: "tailwindcss" },
  { nome: "Prisma", icone: "prisma" },
  { nome: "Git", icone: "git" },
  { nome: "GitHub", icone: "github" },
  { nome: "Vercel", icone: "vercel" },
  { nome: "Figma", icone: "figma" },
  { nome: "Docker", icone: "docker" },
  { nome: "Firebase", icone: "firebase" },
];

// ─── Cursos e certificados ────────────────────────────────────────────────

export const cursos: Curso[] = [
  { nome: "Curso Exemplo de JavaScript", instituicao: "Plataforma Exemplo", ano: "2024", carga: "40h" }, // EXEMPLO
  { nome: "Curso Exemplo de React", instituicao: "Plataforma Exemplo", ano: "2024", carga: "60h" }, // EXEMPLO
  { nome: "Curso Exemplo de Banco de Dados", instituicao: "Escola Exemplo", ano: "2023", carga: "30h" }, // EXEMPLO
  { nome: "Graduação / Técnico (se tiver)", instituicao: "Instituição Exemplo", ano: "2022" }, // EXEMPLO
];

// ─── Outras competências ──────────────────────────────────────────────────

export const competencias: Competencia[] = [
  { titulo: "Visão de produto", descricao: "Penso no problema de quem usa antes de pensar no código.", icone: "target" },
  { titulo: "Autonomia", descricao: "Levo um projeto da ideia à loja de aplicativos sozinho.", icone: "rocket" },
  { titulo: "Aprendizado rápido", descricao: "Estudo a documentação e coloco em prática no mesmo dia.", icone: "brain" },
  { titulo: "Comunicação", descricao: "Explico decisões técnicas para quem não é da área.", icone: "message" },
  { titulo: "Design de interface", descricao: "Cuido do visual e da experiência, não só da lógica.", icone: "palette" },
  { titulo: "Trabalho em equipe", descricao: "Gosto de revisar, ser revisado e dividir o que sei.", icone: "users" },
];

export const idiomas: Idioma[] = [
  { nome: "Português", nivel: "Nativo", porcentagem: 100 },
  { nome: "Inglês", nivel: "Intermediário", porcentagem: 60 }, // EXEMPLO
  { nome: "Espanhol", nivel: "Básico", porcentagem: 30 }, // EXEMPLO
];
