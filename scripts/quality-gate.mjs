import fs from "fs";

const arquivos = process.argv.slice(2).filter((p) => p.endsWith(".json"));
if (!arquivos.length) {
  console.log("Nenhum conteúdo novo para validar.");
  process.exit(0);
}

const proibidos = [/^inacreditável/i, /^você não vai acreditar/i, /^bomba/i, /^urgente/i];
const categorias = new Set(["notícia", "opinião", "artigo", "especial", "review", "retrô"]);
let falhas = 0;

for (const arquivo of arquivos) {
  let post;
  try {
    post = JSON.parse(fs.readFileSync(arquivo, "utf8"));
  } catch (err) {
    console.error(`❌ ${arquivo}: JSON inválido (${err.message})`);
    falhas++;
    continue;
  }

  const erros = [];
  const body = Array.isArray(post.body) ? post.body : [];
  const texto = body.filter((p) => typeof p === "string" && !/^(img|video|tweet|link|mp4):/.test(p)).join(" ");
  const paragrafos = body.filter((p) => typeof p === "string" && !p.startsWith("## ") && !/^(img|video|tweet|link|mp4):/.test(p) && p.trim().length > 80);

  if (!post.slug || !post.title) erros.push("slug/título ausente");
  if (!post.author) erros.push("autor ausente");
  if (!post.category) erros.push("categoria ausente");
  if (post.category && !categorias.has(post.category)) erros.push(`categoria desconhecida: ${post.category}`);
  if (!post.excerpt || post.excerpt.length < 100) erros.push("resumo curto demais");
  if (texto.length < 2800) erros.push(`texto muito curto (${texto.length} caracteres; mínimo editorial: 2800)`);
  if (paragrafos.length < 6) erros.push(`poucos parágrafos substanciais (${paragrafos.length}; mínimo: 6)`);
  if (proibidos.some((re) => re.test(post.title || ""))) erros.push("título usa fórmula de clickbait proibida");
  if (!(post.editorialAngle || post.observacao) || String(post.editorialAngle || post.observacao).length < 60) erros.push("ângulo editorial/observação de apuração ausente ou superficial");

  if (["notícia", "opinião", "artigo", "especial", "review"].includes(post.category)) {
    if (!post.fonte && !post.source) erros.push("fonte não identificada");
    if ((post.fonte || post.source) && !post.fonteUrl && !post.sourceUrl) erros.push("fonte sem URL verificável");
  }

  if (post.category === "opinião") {
    const opiniao = `${post.title} ${texto}`.toLowerCase();
    const temTese = /minha posição|eu acho|eu não acho|para mim|na minha visão|o problema é|a pergunta mais importante|eu defendo|não me convence|me parece/i.test(opiniao);
    const temContraponto = /por outro lado|contra-argumento|também existe|seria injusto|é justo reconhecer|mas existe|porém|ao mesmo tempo/i.test(opiniao);
    if (!temTese) erros.push("opinião sem tese claramente identificável");
    if (!temContraponto) erros.push("opinião sem contraponto identificável");
  }

  if (post.category === "review") {
    if (post.nota === undefined) erros.push("review sem nota");
    if (!post.jogoReviewado) erros.push("review sem jogoReviewado identificado");
  }

  if (erros.length) {
    console.error(`❌ ${arquivo}`);
    for (const erro of erros) console.error(`   - ${erro}`);
    falhas++;
  } else {
    console.log(`✅ ${arquivo}: passou pelo gate editorial`);
  }
}

if (falhas) {
  console.error(`\n${falhas} conteúdo(s) não passaram pelo gate editorial.`);
  console.error("Revise antes de publicar: o objetivo é impedir textos rasos, genéricos, sem fonte verificável ou sem contribuição própria.");
  process.exit(1);
}
