# Portfólio — Zion Bernardo

Site pessoal / currículo online. Next.js 16 · React 19 · TypeScript · Tailwind v4 · Motion (animações).

## Rodando

```bash
npm install
npm run dev
```

Abre em http://localhost:3000.

## Editando o conteúdo

**Tudo** o que aparece no site está em [`src/dados/perfil.ts`](src/dados/perfil.ts):
nome, data de nascimento (a idade é calculada sozinha), cidade, foto, empresas,
projetos, linguagens, cursos, competências, idiomas e links. As linhas marcadas com
`// EXEMPLO` são de mentirinha — troque antes de publicar.

| Quero… | Faço… |
|---|---|
| Pôr minha foto | Salvo em `public/foto.jpg` e escrevo `foto: "/foto.jpg"` |
| Pôr o currículo em PDF | Salvo em `public/curriculo.pdf` e escrevo `curriculo: "/curriculo.pdf"` — aparece o botão "Baixar currículo" |
| Adicionar fotos de um projeto | Salvo em `public/projetos/<nome>/` e listo os caminhos em `imagens` |
| Adicionar uma linguagem | Acrescento em `linguagens`; o `icone` é o nome dela em [simpleicons.org](https://simpleicons.org) |
| Destacar um projeto | `destaque: true` — ele ganha um card largo |

## Seções

Início (foto, nome animado, idade, cargos digitados) · Sobre (números que contam) ·
Experiência (linha do tempo que se desenha ao rolar) · Projetos (filtros, cards 3D e
galeria com setas/arrastar/teclado) · Habilidades (barras animadas e faixa de
ferramentas) · Cursos · Competências e idiomas · Contato (copiar e-mail).

Quem tem "reduzir movimento" ligado no sistema recebe o site sem as animações de deslocamento.

## Publicando na Vercel

1. Na Vercel, **Add New → Project** e escolha este repositório.
2. Deixe tudo como vier (a Vercel reconhece o Next.js sozinha) e clique em **Deploy**.
3. Depois dá para ligar um domínio próprio (ex.: `zionbernardo.dev`).

Cada push na `main` atualiza o site no ar.
