// Monta o HTML do resumo diário da newsletter com as matérias recentes.
// Uso:
//   node scripts/newsletter-digest.mjs --horas 24 --saida resumo.html [--preview]
//   node scripts/newsletter-digest.mjs --desde 2026-10-22T00:00:00-03:00
// Com --preview, os marcadores do Brevo ({{ unsubscribe }}, {{ mirror }}) viram links de teste.
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const arg = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : d;
};
const preview = args.includes("--preview");
const horas = Number(arg("horas", 24));
const desde = arg("desde") ? Date.parse(arg("desde")) : Date.now() - horas * 3600 * 1000;
const maximo = Number(arg("max", 8));
const saida = arg("saida", "resumo.html");

const BASE = "https://acertogames.com.br";
const DIR = path.join(process.cwd(), "content", "publicados");

const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const imagem = (src, w = 640) =>
  !src ? "" : src.startsWith("/") ? `${BASE}/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75` : src;

const posts = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => {
    try { return JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")); } catch { return null; }
  })
  .filter((p) => p && p.slug && p.title && p.publicadoEm)
  .map((p) => ({ ...p, ts: Date.parse(p.publicadoEm) }))
  .filter((p) => p.ts >= desde && p.ts <= Date.now())
  .sort((a, b) => b.ts - a.ts);

if (!posts.length) {
  console.error("Nenhuma matéria no período. Nada gerado.");
  process.exit(2);
}

// Destaque: review, especial ou análise recente sobe; depois vale a ordem de publicação.
const peso = (p) => (/^(review|especial)/i.test(p.category || "") ? 1 : 0);
const lista = [...posts].sort((a, b) => peso(b) - peso(a) || b.ts - a.ts).slice(0, maximo);
const [destaque, ...demais] = lista;

const C = { fundo: "#0A0D10", cartao: "#10161C", borda: "#22303A", texto: "#EDEFF7", suave: "#93A3AF", verde: "#2EE86C" };
const FONTE = "Arial,Helvetica,sans-serif";
const link = (p) => `${BASE}/noticia/${p.slug}?utm_source=newsletter&utm_medium=email&utm_campaign=resumo-diario`;

const dataExtenso = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Sao_Paulo" }).format(new Date());

const bloqueDestaque = `
<tr><td style="padding:0 24px 8px 24px;">
  <a href="${link(destaque)}" style="text-decoration:none;color:${C.texto};">
    ${destaque.image ? `<img src="${imagem(destaque.image, 640)}" width="552" alt="${esc(destaque.imageAlt || destaque.title)}" style="display:block;width:100%;max-width:552px;height:auto;border:0;">` : ""}
    <p style="margin:16px 0 6px 0;font:700 11px ${FONTE};letter-spacing:2px;text-transform:uppercase;color:${C.verde};">${esc(destaque.category || "notícia")}</p>
    <h2 style="margin:0 0 8px 0;font:700 24px/1.25 ${FONTE};color:${C.texto};">${esc(destaque.title)}</h2>
    <p style="margin:0;font:400 15px/1.55 ${FONTE};color:${C.suave};">${esc(destaque.excerpt || "")}</p>
  </a>
</td></tr>`;

const linhas = demais
  .map(
    (p) => `
<tr><td style="padding:16px 24px;border-top:1px solid ${C.borda};">
  <a href="${link(p)}" style="text-decoration:none;color:${C.texto};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      ${p.image ? `<td width="132" valign="top" style="padding-right:14px;"><img src="${imagem(p.image, 384)}" width="132" alt="${esc(p.imageAlt || p.title)}" style="display:block;width:132px;height:auto;border:0;"></td>` : ""}
      <td valign="top">
        <p style="margin:0 0 4px 0;font:700 10px ${FONTE};letter-spacing:2px;text-transform:uppercase;color:${C.verde};">${esc(p.category || "notícia")}</p>
        <p style="margin:0;font:700 16px/1.3 ${FONTE};color:${C.texto};">${esc(p.title)}</p>
      </td>
    </tr></table>
  </a>
</td></tr>`
  )
  .join("");

const unsub = preview ? "#cancelar" : "{{ unsubscribe }}";
const espelho = preview ? "#navegador" : "{{ mirror }}";

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light"><meta name="supported-color-schemes" content="dark light">
<title>Acerto Games: resumo do dia</title></head>
<body style="margin:0;padding:0;background:${C.fundo};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(destaque.title)}. Veja também as outras notícias do dia.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.fundo};"><tr><td align="center" style="padding:20px 8px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${C.cartao};border:1px solid ${C.borda};">
  <tr><td style="padding:24px 24px 4px 24px;">
    <p style="margin:0;font:900 22px ${FONTE};letter-spacing:1px;color:${C.texto};">ACERTO<span style="color:${C.verde};">GAMES</span></p>
    <p style="margin:6px 0 0 0;font:400 12px ${FONTE};letter-spacing:2px;text-transform:uppercase;color:${C.suave};">Dê o start na informação certa</p>
  </td></tr>
  <tr><td style="padding:16px 24px 16px 24px;">
    <p style="margin:0;font:700 11px ${FONTE};letter-spacing:2px;text-transform:uppercase;color:${C.verde};">Seu resumo de ${esc(dataExtenso)}</p>
  </td></tr>
  ${bloqueDestaque}
  ${linhas}
  <tr><td align="center" style="padding:24px;border-top:1px solid ${C.borda};">
    <a href="${BASE}/?utm_source=newsletter&utm_medium=email&utm_campaign=resumo-diario" style="display:inline-block;background:${C.verde};color:${C.fundo};font:700 13px ${FONTE};letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:13px 22px;">Ver todas as notícias no site</a>
  </td></tr>
  <tr><td style="padding:18px 24px 26px 24px;border-top:1px solid ${C.borda};">
    <p style="margin:0;font:400 12px/1.6 ${FONTE};color:${C.suave};">Você recebe este e-mail porque se inscreveu na newsletter do Acerto Games.<br>
    <a href="${espelho}" style="color:${C.suave};">Abrir no navegador</a> · <a href="${unsub}" style="color:${C.suave};">Cancelar inscrição</a> · <a href="${BASE}/politica-de-privacidade" style="color:${C.suave};">Privacidade</a></p>
  </td></tr>
</table></td></tr></table></body></html>`;

fs.writeFileSync(saida, html);
const assunto = `${destaque.title}`.slice(0, 90);
console.log(JSON.stringify({ arquivo: saida, materias: lista.length, assunto }, null, 2));
