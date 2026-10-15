/**
 * TUDO o que aparece no site sai deste arquivo.
 *
 * Para atualizar o portfólio você só precisa mexer aqui: trocar textos,
 * acrescentar um projeto, um curso, uma empresa. O resto do código lê estas
 * listas e monta as seções (com as animações) sozinho.
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
  /** De onde saiu o nível: aparece embaixo da barra. */
  detalhe: string;
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

export type Formacao = {
  curso: string;
  instituicao: string;
  /** Ex.: "2026 — atual" ou "2026 — 2028". */
  periodo: string;
  /** Mostra o selo "Em andamento". */
  emAndamento: boolean;
};

export type Competencia = {
  titulo: string;
  descricao: string;
  icone: "users" | "brain" | "rocket" | "message" | "target" | "palette" | "clock" | "lightbulb" | "megaphone";
};

export type Idioma = { nome: string; nivel: string; porcentagem: number };

export type CapacidadeIa = {
  titulo: string;
  descricao: string;
  icone: "chat" | "foto" | "json" | "regras" | "testes" | "custo" | "conteudo" | "agente";
};

/** Uma frase dita para a Lys e o que ela vira no app (a animação da seção de IA). */
export type ExemploIa = { frase: string; tipo: string; valor: string; detalhe: string };

// ─── Você ─────────────────────────────────────────────────────────────────

export const perfil = {
  nome: "Zion Bernardo",
  /** Usado no currículo em PDF. */
  nomeCompleto: "Zion Bernardo dos Santos",
  /** Usado para calcular a idade automaticamente (AAAA-MM-DD). */
  nascimento: "2008-01-09",
  cidade: "Florianópolis, SC",
  /** Endereço do site no ar. Troque se ligar um domínio próprio. */
  site: "https://zionbernardo.vercel.app",
  /**
   * Coloque sua foto em `public/foto.jpg` e escreva "/foto.jpg" aqui.
   * Vazio ("") mostra suas iniciais no lugar.
   */
  foto: "/foto.webp",
  /** Frases que vão se alternando, digitadas, no topo do site. */
  cargos: ["Desenvolvedor Full Stack", "Analista de Infraestrutura", "Criador do Lifelyst", "IA aplicada a produtos"],
  apresentacao:
    "Construo aplicações web completas — do banco de dados à última animação da interface, com IA onde ela ajuda — com foco em produtos que as pessoas usam de verdade.",
  sobre: [
    "Cresci acompanhando de perto a HSystem, startup de software fundada pelo meu pai e vendida em 2024 para um grande grupo de turismo. Foi ali que entendi como um produto de software nasce e cresce.",
    "Sou Analista de Infraestrutura no Grupo ND, tenho minha própria empresa, a Nex, e criei o Lifelyst, um organizador pessoal e familiar. Trabalho principalmente com TypeScript, React e Next.js, em todas as camadas: banco de dados, APIs, pagamentos, notificações e publicação na Play Store.",
    "Também coloco inteligência artificial em produção: a Lys, assistente do Lifelyst, entende o que você escreve, fala ou fotografa e transforma em ações no app.",
  ],
  /** Selo verde no topo do site, com o que você faz hoje. Vazio ("") esconde. */
  agora: "Analista de Infraestrutura no Grupo ND",
  /**
   * O PDF do botão "Baixar currículo". Ele é a página /curriculo impressa:
   * abra o site, vá em /curriculo, Ctrl+P → "Salvar como PDF" e substitua o
   * arquivo em `public/`. Vazio ("") esconde o botão.
   */
  curriculo: "/Curriculo-Zion-Bernardo.pdf",
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
    empresa: "Grupo ND",
    cargo: "Analista de Infraestrutura",
    inicio: "Ago 2026",
    fim: "",
    local: "Florianópolis, SC",
    descricao: "Analista de Infraestrutura no maior grupo de comunicação de Santa Catarina.",
    conquistas: ["Desenvolvi o portal de carreiras do grupo (vagas.grupond.com.br)"],
    tecnologias: ["React", "Vite"],
  },
  {
    empresa: "Nex Soluções Digitais",
    cargo: "Fundador",
    inicio: "",
    fim: "",
    local: "Florianópolis, SC",
    descricao: "Minha empresa: sites, cardápios digitais e sistemas de pedidos para o comércio de Florianópolis.",
    conquistas: [
      "9 lojas de demonstração no ar, em três ramos e três planos",
      "Pedidos pelo WhatsApp e Pix, agendamento e painel do lojista",
      "Atendimento presencial: visita, fotos e cadastro na loja do cliente",
    ],
    tecnologias: ["HTML", "CSS", "JavaScript", "Cloudflare Workers", "Python"],
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
      "Lys, assistente com IA que entende texto, voz e foto de comprovante",
    ],
    tecnologias: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind", "OpenAI"],
  },
  // Para acrescentar outra empresa, copie um bloco { ... } acima e troque os textos.
];

// ─── Projetos ─────────────────────────────────────────────────────────────

export const projetos: Projeto[] = [
  {
    titulo: "Lifelyst",
    resumo: "Organizador pessoal e familiar: seu dia inteiro em uma tela.",
    descricao:
      "Afazeres, rotina, saúde, estudos, finanças, calendário e metas num app só, com espaço compartilhado para a família. Tem a Lys, uma assistente com IA: você escreve, fala ou manda a foto de um comprovante e ela registra a despesa, a tarefa ou o compromisso. Tem assinatura paga, notificações push, funciona offline e está publicado na Google Play.",
    imagens: [
      "/projetos/lifelyst/inicio.webp",
      "/projetos/lifelyst/financas.webp",
      "/projetos/lifelyst/afazeres.webp",
      "/projetos/lifelyst/saude.webp",
      "/projetos/lifelyst/familia.webp",
      "/projetos/lifelyst/metas.webp",
    ],
    categoria: "Web & Mobile",
    tecnologias: ["Next.js 16", "React 19", "TypeScript", "Tailwind", "Prisma", "PostgreSQL", "OpenAI", "Vercel"],
    ano: "2025",
    link: "https://lifelyst.com.br",
    destaque: true,
  },
  {
    titulo: "Nex Soluções Digitais",
    resumo: "Minha empresa: sites, cardápios digitais e pedidos online para o comércio de Florianópolis.",
    descricao:
      "Site próprio, catálogo ou cardápio digital e sistema de pedidos para lojas, restaurantes, salões, oficinas e clínicas, sem comissão de aplicativo. O site tem 9 demonstrações no ar: uma pizzaria, um salão e um mercadinho, cada um nos planos Básico, Intermediário e Avançado, com carrinho, pedido pelo WhatsApp, Pix, agendamento, QR Code na mesa e painel do lojista.",
    imagens: [
      "/projetos/nex/inicio.webp",
      "/projetos/nex/galeria.webp",
      "/projetos/nex/restaurante.webp",
      "/projetos/nex/salao.webp",
      "/projetos/nex/mercado.webp",
    ],
    categoria: "Web",
    tecnologias: ["HTML", "CSS", "JavaScript", "Cloudflare Workers", "Python"],
    link: "https://nexsolucoesdigitais.com.br/",
  },
  {
    titulo: "Carreiras Grupo ND",
    resumo: "Portal de vagas que desenvolvi para o maior grupo de comunicação de Santa Catarina.",
    descricao:
      "Portal de carreiras das 11 marcas do Grupo ND, como NDTV e ND+. O candidato filtra as vagas por área, cidade e modelo de trabalho, se candidata e acompanha cada etapa pelo portal, entra no banco de talentos e pode receber as vagas novas por e-mail.",
    imagens: [
      "/projetos/grupo-nd/inicio.webp",
      "/projetos/grupo-nd/vagas.webp",
      "/projetos/grupo-nd/vaga.webp",
      "/projetos/grupo-nd/sobre.webp",
    ],
    categoria: "Web",
    tecnologias: ["React", "Vite"],
    link: "https://vagas.grupond.com.br/",
  },
];

// ─── Linguagens e ferramentas ─────────────────────────────────────────────

/**
 * Os níveis não são chute: saíram do código dos seus repositórios (Lifelyst,
 * Nex, portfólio e estudos) — quantas linhas, em quantos projetos e se está
 * em produção. Atualize quando o código crescer.
 */
export const linguagens: Habilidade[] = [
  { nome: "TypeScript", icone: "typescript", nivel: 92, detalhe: "≈ 87 mil linhas no Lifelyst" },
  { nome: "React", icone: "react", nivel: 90, detalhe: "≈ 270 telas e componentes" },
  { nome: "Next.js", icone: "nextdotjs", nivel: 88, detalhe: "App Router, server actions e cron" },
  { nome: "JavaScript", icone: "javascript", nivel: 86, detalhe: "≈ 14 mil linhas · Nex e scripts" },
  { nome: "HTML", icone: "html5", nivel: 86, detalhe: "Sites da Nex e do Grupo ND" },
  { nome: "CSS", icone: "css", nivel: 84, detalhe: "Tailwind + ≈ 4 mil linhas à mão" },
  { nome: "Node.js", icone: "nodedotjs", nivel: 80, detalhe: "APIs e 40 scripts de automação" },
  { nome: "SQL · PostgreSQL", icone: "postgresql", nivel: 74, detalhe: "≈ 2 mil linhas de modelo no Prisma" },
  { nome: "Python", icone: "python", nivel: 55, detalhe: "Curso de Python e Django + scripts da Nex" },
];

/** Aparecem na faixa que desliza sozinha. */
export const ferramentas = [
  { nome: "Tailwind CSS", icone: "tailwindcss" },
  { nome: "Prisma", icone: "prisma" },
  { nome: "Zod", icone: "zod" },
  { nome: "Git", icone: "git" },
  { nome: "GitHub", icone: "github" },
  { nome: "Vercel", icone: "vercel" },
  { nome: "Cloudflare", icone: "cloudflare" },
  { nome: "Vite", icone: "vite" },
  { nome: "Google Play", icone: "googleplay" },
  { nome: "Mercado Pago", icone: "mercadopago" },
  { nome: "Claude Code", icone: "claude" },
  { nome: "Django", icone: "django" },
  { nome: "Google Ads", icone: "googleads" },
  { nome: "Power BI", icone: "powerbi" },
];

// ─── Inteligência artificial ──────────────────────────────────────────────

export const ia = {
  resumo:
    "Não é só usar o ChatGPT: eu construo produtos com IA. No Lifelyst, a Lys entende texto, voz e foto e vira ação no app — com saída validada, testes automáticos e custo sob controle.",
  /** Frases que a animação vai "digitando" para a Lys. */
  exemplos: [
    { frase: "gastei 48 no mercado no pix", tipo: "Despesa", valor: "R$ 48,00", detalhe: "Mercado · Pix" },
    { frase: "dentista quinta às 15h", tipo: "Compromisso", valor: "Quinta, 15:00", detalhe: "Dentista" },
    { frase: "comprei um tênis de 600 em 3x", tipo: "Parcelado", valor: "3× R$ 200,00", detalhe: "Tênis · Compras" },
    { frase: "bebi dois copos de água", tipo: "Água", valor: "+ 500 ml", detalhe: "Saúde · hoje" },
  ] satisfies ExemploIa[],
  capacidades: [
    {
      titulo: "Assistente em linguagem natural",
      descricao: "A Lys transforma uma frase, digitada ou falada, em despesa, tarefa, evento, meta ou relatório.",
      icone: "chat",
    },
    {
      titulo: "Leitura de comprovantes",
      descricao: "Manda a foto do recibo e a IA lê valor, loja e data para criar a despesa sozinha.",
      icone: "foto",
    },
    {
      titulo: "Saída estruturada",
      descricao: "O modelo responde em JSON, conferido com Zod. As contas ficam com o banco, nunca com a IA.",
      icone: "json",
    },
    {
      titulo: "Regras antes do modelo",
      descricao: "Saudações, correções e perguntas simples se resolvem no código, sem gastar uma chamada.",
      icone: "regras",
    },
    {
      titulo: "IA testada",
      descricao: "≈ 160 frases de teste, placar de acertos contra o provedor e testes no navegador.",
      icone: "testes",
    },
    {
      titulo: "Custo sob controle",
      descricao: "Cada chamada registrada com o preço do modelo, limite por plano e alerta de crédito.",
      icone: "custo",
    },
    {
      titulo: "Conteúdo automático",
      descricao: "Todo dia a IA pesquisa tendências na web e escreve posts para o Instagram, que eu aprovo.",
      icone: "conteudo",
    },
    {
      titulo: "Programo com agentes",
      descricao: "Uso agentes de IA, como o Claude Code, no dia a dia — e reviso tudo o que eles escrevem.",
      icone: "agente",
    },
  ] satisfies CapacidadeIa[],
  tecnicas: [
    "OpenAI · GPT-5",
    "Anthropic · Claude",
    "Google Gemini",
    "Engenharia de prompt",
    "JSON + Zod",
    "Visão (imagens)",
    "Voz no navegador",
    "Busca na web",
    "Adaptador multi-provedor",
  ],
};

// ─── Cursos e certificados ────────────────────────────────────────────────

/**
 * Faculdade, técnico etc. Vazio esconde o cartão no site e o bloco no
 * currículo. Exemplo:
 * { curso: "Análise e Desenvolvimento de Sistemas", instituicao: "Universidade Estácio", periodo: "2027 — atual", emAndamento: true },
 */
export const formacao: Formacao[] = [];

export const cursos: Curso[] = [
  { nome: "Fluência em IA", instituicao: "Fundação Bradesco" },
  { nome: "IA na Prática: Como Dados bem Estruturados fazem a Diferença", instituicao: "Fundação Bradesco", ano: "2026" },
  { nome: "Inteligência Artificial para Estudantes" },
  { nome: "Curso Python e Django Completo", instituicao: "Udemy" },
  { nome: "Administrando Banco de Dados", instituicao: "Fundação Bradesco" },
  { nome: "Análise de Dados no Power BI", instituicao: "Fundação Bradesco" },
  { nome: "Como Conseguir um Novo Emprego", instituicao: "Fundação Bradesco", ano: "2026" },
];

// ─── Outras competências ──────────────────────────────────────────────────

export const competencias: Competencia[] = [
  { titulo: "Visão de produto", descricao: "Penso no problema de quem usa antes de pensar no código.", icone: "target" },
  { titulo: "Autonomia e dedicação", descricao: "Levo um projeto da ideia à loja de aplicativos, com responsabilidade do início ao fim.", icone: "rocket" },
  { titulo: "Aprendizado rápido", descricao: "Estudo a documentação e coloco em prática no mesmo dia.", icone: "brain" },
  { titulo: "Comunicação e equipe", descricao: "Explico decisões técnicas para quem não é da área e gosto de dividir o que sei.", icone: "users" },
  { titulo: "Design de interface", descricao: "Cuido do visual e da experiência, não só da lógica.", icone: "palette" },
  { titulo: "Marketing digital", descricao: "Google Ads e anúncios nas redes sociais: sei levar gente até o produto.", icone: "megaphone" },
];

export const idiomas: Idioma[] = [
  { nome: "Português", nivel: "Fluente", porcentagem: 100 },
  { nome: "Inglês", nivel: "Intermediário · estudando", porcentagem: 60 },
];

// ─── Números da seção "Sobre" ─────────────────────────────────────────────

/** Os que saem das listas acima se atualizam sozinhos. */
export const numeros = [
  { valor: 3, sufixo: "", rotulo: "anos programando" },
  { valor: projetos.length, sufixo: "", rotulo: projetos.length === 1 ? "projeto no ar" : "projetos no ar" },
  { valor: cursos.length, sufixo: "", rotulo: cursos.length === 1 ? "curso concluído" : "cursos concluídos" },
  { valor: linguagens.length + ferramentas.length, sufixo: "", rotulo: "tecnologias" },
];
