# Include Gurias

Este repositório contém o site do projeto Include Gurias, focado em divulgação e empoderamento feminino em STEM.

## Estrutura do Projeto

- **/app**: Rotas e páginas do Next.js (API, páginas, materiais, etc)
- **/components**: Componentes reutilizáveis de UI
- **/public**: Assets estáticos (imagens, favicon, etc)
- **/prisma**: Schema do banco de dados (usado para Supabase/Postgres)
- **/styles**: Estilos globais e Tailwind
- **/types**: Tipagens TypeScript customizadas
- **/utils**: Funções utilitárias e helpers
- **State Management**: O gerenciamento de estado global é feito com **Zustand** e está localizado em arquivos dentro de `/app/states`.

## Tecnologias Utilizadas

- **Next.js** (React, SSR/SSG, API routes)
- **TypeScript**
- **TailwindCSS**
- **Supabase** (banco de dados e autenticação)
- **Prisma** (ORM, opcional para Supabase)
- **ESLint** (lint de código)
- **Prettier** (formatação de código)
- **Zustand** (state management)
- **Chakra UI** (componentes de UI)
- **Embla Carousel** (carrosséis)

## Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Edite o `.env.example` para `.env` e coloque:
   ```env
   DATABASE_URL=... (database url do Supabase)
   DIRECT_URL=... (direct url postgres do Supabase)
   NEXT_PUBLIC_SITE_URL=https://includegurias.com.br
   ```
3. Rode o projeto:
   ```bash
   npm run dev
   ```
   OBS: As variaveis estao como secrets no repositorio do github e na vercel.

## Scripts úteis

- `npm run dev` — roda local
- `npm run build` — build de produção
- `npm start` — inicia produção
- `npm run lint` — checa problemas de código
- `npm run lint:fix` — corrige problemas de lint automaticamente
- `npm run prettier` — checa formatação do código
- `npm run prettier:fix` — formata o código automaticamente

## Deploy na Vercel

1. Importe o repositório na [Vercel](https://vercel.com/)
2. Configure as variáveis de ambiente (iguais ao `.env.local`)
3. Faça o deploy
4. Configure o domínio em "Settings > Domains"

## Boas práticas

- Use sempre variáveis de ambiente padrão Next.js (`process.env.NEXT_PUBLIC_...`)
- Mantenha o código limpo e tipado
- Prefira componentes reutilizáveis
- Atualize este README se mudar a estrutura
- Use `npm run prettier:fix` antes de fazer commit para manter o código formatado

---

# Não sabe muito bem por onde começar?

- As **cores do site** poderiam ser padronizadas em alguns locais. Eu sou daltônico e ficou complicado para mim padronizar tudo.
- Os **componentes não estão todos com nomes padronizados**. Seria bom revisar e padronizar os nomes para facilitar a manutenção.
- Algumas partes precisam de **melhoria de UX**. Quando fiz esse site eu era bem iniciante, então há muitos pontos que podem ser melhorados em usabilidade e experiência do usuário.
- Se encontrar algo estranho, provavelmente é porque eu estava aprendendo na época. Sinta-se à vontade para refatorar e melhorar!
- fazer laz laoding no https://includegurias.com.br/materials/mulheres-da-stem
- terminar paginas em contrução (linha do tempo e eventos e atividades)
- atualizar equipe e suas imagens (pelo )
- Ver o que precisa fazer para atualizar o primsa do 5.22.0 -> 6.0 ou superior

Dúvidas? pode me chamar no whats que eu ajudo qualquer coisa +55 51 99524-5504 .
