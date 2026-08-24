import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "content", "publicados");
const arquivos = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")) : [];

const resultados = [];
for (const arquivo of arquivos) {
  try {
    const post = JSON.parse(fs.readFileSync(path.join(dir, arquivo), "utf8"));
    const body = Array.isArray(post.body) ? post.body : [];
    const texto = body.filter((p) => typeof p === "string" && !/^(img|video|tweet|link|mp4):/.test(p) && !p.startsWith("## ")).join(" ");
    const paragrafos = body.filter((p) => typeof p === "string" && p.length > 80 && !p.startsWith("## ") && !/^(img|video|tweet|link|mp4):/.test(p));
    const problemas = [];

    if (!post.author) problemas.push("sem autor");
    if (!post.excerpt || post.excerpt.length < 100) problemas.push("resumo curto");
    if (texto.length < 1800) problemas.push("texto curto");
    if (paragrafos.length < 5) problemas.push("poucos parágrafos");
    if (["notícia", "noticia", "artigo", "especial", "opinião", "opiniao", "review"].includes(String(post.category || "").toLowerCase())) {
      if (!post.fonte && !post.source) problemas.push("sem fonte");
      if ((post.fonte || post.source) && !post.fonteUrl && !post.sourceUrl) problemas.push("fonte sem URL");
    }

    let score = 100;
    score -= Math.min(45, Math.max(0, 1800 - texto.length) / 40);
    score -= Math.max(0, 5 - paragrafos.length) * 5;
    if (!post.author) score -= 20;
    if (!post.excerpt || post.excerpt.length < 100) score -= 10;
    if (!post.fonte && !post.source) score -= 10;
    if ((post.fonte || post.source) && !post.fonteUrl && !post.sourceUrl) score -= 5;

    const faixa = score >= 80 ? "FORTE" : score >= 60 ? "REVISAR" : "PRIORIDADE";
    resultados.push({ arquivo, slug: post.slug, title: post.title, category: post.category, chars: texto.length, paragraphs: paragrafos.length, score: Math.round(score), faixa, problemas });
  } catch (error) {
    resultados.push({ arquivo, faixa: "ERRO", problemas: [error.message] });
  }
}

resultados.sort((a, b) => a.score - b.score);
const totais = {
  total: resultados.length,
  fortes: resultados.filter((r) => r.faixa === "FORTE").length,
  revisar: resultados.filter((r) => r.faixa === "REVISAR").length,
  prioridade: resultados.filter((r) => r.faixa === "PRIORIDADE").length,
};

const linhas = [
  "# Auditoria editorial — Acerto Games",
  "",
  "## Resumo",
  `- Total analisado: ${totais.total}`,
  `- Forte: ${totais.fortes}`,
  `- Revisar: ${totais.revisar}`,
  `- Prioridade: ${totais.prioridade}`,
  "",
  "## Ordem de trabalho",
  "As páginas marcadas como PRIORIDADE devem ser reescritas, consolidadas ou arquivadas antes de uma nova solicitação de revisão do AdSense. REVISAR são boas pautas que precisam ganhar profundidade. FORTE serve como referência editorial.",
  "",
  "| Faixa | Categoria | Caracteres | Parágrafos | Score | Matéria | Problemas |",
  "|---|---|---:|---:|---:|---|---|",
  ...resultados.map((r) => `| ${r.faixa} | ${r.category || "—"} | ${r.chars || 0} | ${r.paragraphs || 0} | ${r.score || 0} | ${r.title || r.arquivo} | ${(r.problemas || []).join(", ") || "—"} |`),
  "",
  "## Critério",
  "O score é um instrumento interno de triagem, não uma previsão de aprovação do Google. Ele mede sinais básicos de profundidade, autoria e rastreabilidade da fonte. A decisão editorial final continua humana.",
];

fs.writeFileSync(path.join(process.cwd(), "AUDITORIA-EDITORIAL.md"), linhas.join("\n"));
console.log(`Auditoria concluída: ${totais.total} matérias analisadas.`);
console.log(`FORTE=${totais.fortes} REVISAR=${totais.revisar} PRIORIDADE=${totais.prioridade}`);
