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
  /** Ex.: "Mar 2024". Vazio ("") mostra só o fim (ou "Atual"). */
  inicio: string;
  /** Deixe vazio ("") se você ainda trabalha lá — aparece "Atual". */
  fim: string;
  /** Opcional: vazio ("") esconde. */
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
  /** Opcional. */
  ano?: string;
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
  /** Opcional. */
  instituicao?: string;
  /** Opcional. */
  ano?: string;
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
  foto: "/foto.webp",
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
  email: "zionbernardo@gmail.com",
  links: [
    { rotulo: "GitHub", url: "https://github.com/Zionbernardo99", icone: "github" },
    { rotulo: "LinkedIn", url: "https://www.linkedin.com/in/zion-bernardo/", icone: "linkedin" },
    { rotulo: "Instagram", url: "https://www.instagram.com/zionbernardo/", icone: "instagram" },
  ] satisfies Link[],
};


// ─── Onde trabalhei ───────────────────────────────────────────────────────

export const experiencias: Experiencia[] = [
  {
    empresa: "Nex Soluções Digitais",
    cargo: "Fundador",
    inicio: "",
    fim: "",
    local: "",
    descricao: "Minha empresa de soluções digitais.",
    conquistas: [],
    tecnologias: [],
  },
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
  // Para acrescentar outra empresa, copie um bloco { ... } acima e troque os textos.
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
    titulo: "Nex Soluções Digitais",
    resumo: "Site da Nex Soluções Digitais.",
    descricao: "Site da Nex Soluções Digitais, no ar em nexsolucoesdigitais.com.br.",
    imagens: [],
    categoria: "Web",
    tecnologias: [],
    link: "https://nexsolucoesdigitais.com.br/",
  },
  {
    titulo: "Vagas Grupo ND",
    resumo: "Portal de vagas do Grupo ND.",
    descricao: "Portal de vagas do Grupo ND, no ar em vagas.grupond.com.br.",
    imagens: [],
    categoria: "Web",
    tecnologias: [],
    link: "https://vagas.grupond.com.br/",
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
  { nome: "Como Conseguir um Novo Emprego", instituicao: "Fundação Bradesco", ano: "2026" },
  { nome: "IA na Prática: Como Dados bem Estruturados fazem a Diferença", instituicao: "Fundação Bradesco", ano: "2026" },
  { nome: "Inteligência Artificial para Estudantes" },
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
  { nome: "Português", nivel: "Fluente", porcentagem: 100 },
  { nome: "Inglês", nivel: "Intermediário", porcentagem: 60 },
];

// ─── Números da seção "Sobre" ─────────────────────────────────────────────

/** Os que saem das listas acima se atualizam sozinhos. */
export const numeros = [
  { valor: 3, sufixo: "+", rotulo: "anos programando" }, // EXEMPLO
  { valor: projetos.length, sufixo: "", rotulo: projetos.length === 1 ? "projeto no ar" : "projetos no ar" },
  { valor: cursos.length, sufixo: "", rotulo: cursos.length === 1 ? "curso concluído" : "cursos concluídos" },
  { valor: linguagens.length + ferramentas.length, sufixo: "", rotulo: "tecnologias" },
];
