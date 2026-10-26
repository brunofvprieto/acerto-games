# Teste: capa com arte oficial (iniciado em 26/10/2026)

Pedido do editor (Bruno Vazquez): capas das matérias preferencialmente com pôster, capa do jogo ou wallpaper oficial, em variantes, sem repetir. Quando a matéria é sobre algo do próprio assunto, a foto desse assunto tem prioridade.

## Como era antes do teste
- Robô (scripts/robo.mjs): a capa vinha da imagem da fonte da notícia, nesta ordem: imagem do feed RSS, og:image da página da fonte, miniatura do trailer no YouTube (maxresdefault e hqdefault). Nenhuma checagem de repetição.
- Padrão Acerto (scripts/persona.md): versão 2026-10-23d, sem a regra de arte oficial.
- Estado completo salvo na branch `backup/antes-capa-arte-oficial` (commit d15ab62).

## Como ficou
- O robô pede ao modelo os campos `jogo` e `capaDoAssunto`.
- Busca o jogo na Steam (storesearch + appdetails) e monta as candidatas: arte oficial da página (background_raw, 1438x810) e depois capturas oficiais (1920x1080).
- Descarta imagens já usadas (campo `imageOrigem` gravado em cada matéria).
- Se `capaDoAssunto` for true, a imagem da fonte vem primeiro; senão, a arte oficial vem primeiro. A imagem da fonte e o YouTube continuam como reserva.
- Persona: versão 2026-10-26a, com a regra de capa com arte oficial.

## Como voltar
    git checkout backup/antes-capa-arte-oficial -- scripts/robo.mjs scripts/persona.md
    git commit -m "Volta capas ao modelo anterior" && git push
