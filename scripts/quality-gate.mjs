import fs from "fs";

const arquivos = process.argv.slice(2).filter((p) => p.endsWith(".json"));
if (!arquivos.length) {
  console.log("Nenhum conteúdo novo para validar.");
  process.exit(0);
}

const proibidos = [
  /^inacreditável/i,
  /^você não vai acreditar/i,
  /^bomba/i,
  /^urgente/i,
];

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
  const texto = body.filter((p) => typeof p === "string" && !p.startsWith("img:") && !p.startsWith("video:") && !p.startsWith("tweet:") && !p.startsWith("link:")).join(" ");
  const paragrafos = body.filter((p) => typeof p === "string" && !p.startsWith("## ") && !p.startsWith("img:") && !p.startsWith("video:") && !p.startsWith("tweet:") && !p.startsWith("link:") && p.trim().length > 80);

  if (!post.slug || !post.title) erros.push("slug/título ausente");
  if (!post.author) erros.push("autor ausente");
  if (!post.category) erros.push("categoria ausente");
  if (!post.excerpt || post.excerpt.length < 80) erros.push("resumo curto demais");
  if (texto.length < 2800) erros.push(`texto muito curto (${texto.length} caracteres; mínimo editorial: 2800)`);
  if (paragrafos.length < 5) erros.push(`poucos parágrafos substanciais (${paragrafos.length}; mínimo: 5)`);
  if (proibidos.some((re) => re.test(post.title || ""))) erros.push("título usa fórmula de clickbait proibida");

  if (["notícia", "opinião", "artigo", "especial"].includes(post.category) && !post.fonte && !post.source) {
    erros.push("fonte não identificada");
  }

  if (post.category === "opinião") {
    const opiniao = `${post.title} ${texto}`.toLowerCase();
    const temTese = /minha posição|eu acho|eu não acho|para mim|na minha visão|o problema é|a pergunta mais importante/i.test(opiniao);
    const temContraponto = /por outro lado|contra-argumento|também existe|seria injusto|é justo reconhecer|mas existe/i.test(opiniao);
    if (!temTese) erros.push("opinião sem tese claramente identificável");
    if (!temContraponto) erros.push("opinião sem contraponto identificável");
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
  console.error("Revise antes de publicar: o objetivo é impedir textos rasos, genéricos ou sem contribuição própria.");
  process.exit(1);
}
