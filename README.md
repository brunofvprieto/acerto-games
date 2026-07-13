# Acerto Games — Portal de games

Site de notícias sobre games feito em Next.js 14 + Tailwind CSS, pronto para deploy na Vercel. Inclui notícias, reviews com nota e seção retrô.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Deploy na Vercel (passo a passo)

1. Crie um repositório no GitHub e suba este projeto:
   ```bash
   git init
   git add .
   git commit -m "Acerto Games inicial"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/acertogames.git
   git push -u origin main
   ```
2. Acesse https://vercel.com e faça login com o GitHub.
3. Clique em **Add New → Project** e importe o repositório `acertogames`.
4. A Vercel detecta o Next.js automaticamente. Clique em **Deploy**.
5. Pronto — o site fica no ar em `acertogames.vercel.app` (ou o nome que você escolher). Depois dá pra conectar um domínio próprio em **Settings → Domains**.

Todo push na branch `main` gera um deploy novo automaticamente.

## Onde editar o conteúdo

Todos os posts ficam em `data/posts.js`. Cada post tem:

- `slug`: endereço da matéria (sem espaços nem acentos)
- `category`: `"notícia"`, `"review"` ou `"retrô"`
- `nota`: só para reviews (ex.: `9.5`)
- `cover`: duas cores que formam o gradiente da capa
- `body`: os parágrafos da matéria

Adicionou um post novo no array? Ele aparece na home e ganha página própria automaticamente.

## Próximos passos possíveis

- Trocar as capas em gradiente por imagens reais (pasta `public/` + componente `next/image`)
- Conectar um CMS (Sanity, Contentful ou Notion) para publicar sem mexer em código
- Adicionar busca e páginas de categoria
- Google Analytics / Vercel Analytics

## 🤖 Robô redator (automação com IA)

O robô coleta notícias de fontes oficiais (RSS), escreve matérias com a personalidade do Acerto Games (nostálgica, apaixonada e bem-humorada, seguindo regras de jornalismo) e salva como **rascunhos**. Nada vai ao ar sem a sua aprovação.

### Como funciona o fluxo

1. **Coleta e redação** — `npm run robo` busca as últimas notícias das fontes em `scripts/fontes.json` e gera rascunhos em `content/rascunhos/`. Precisa da variável `ANTHROPIC_API_KEY` (crie a sua em https://console.anthropic.com).
2. **Revisão** — `npm run publicar` (sem argumento) lista os rascunhos pendentes. Abra o JSON, leia, ajuste o que quiser.
3. **Aprovação** — `npm run publicar <slug>` move a matéria para `content/publicados/`. Ela entra no site automaticamente no próximo build.
4. **Deploy** — commit + push, e a Vercel publica sozinha.

### Automação total (GitHub Actions)

O arquivo `.github/workflows/robo.yml` roda o robô 3x por dia e commita os rascunhos no repositório. Para ativar:

1. No GitHub, vá em **Settings → Secrets and variables → Actions**
2. Crie um secret chamado `ANTHROPIC_API_KEY` com a sua chave
3. Pronto — a cada rodada, os rascunhos aparecem em `content/rascunhos/` no repo

Você pode revisar e aprovar direto pelo celular no app do GitHub: é só mover o arquivo de `rascunhos/` para `publicados/` (ou editar antes).

### Personalizar a personalidade

Edite `scripts/persona.md` — é ali que mora a alma do robô. As fontes ficam em `scripts/fontes.json` (adicione quantos feeds RSS quiser).

⚠️ **Recomendação**: mantenha a etapa de aprovação humana, principalmente no começo. IA pode interpretar mal uma fonte, e a credibilidade do site é seu maior patrimônio.
