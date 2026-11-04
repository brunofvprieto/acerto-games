// Comentários do Acerto Games, guardados no Vercel Blob (loja privada).
// Cada comentário é um arquivo JSON:
//   comentarios/pendentes/<slug>/<id>.json  (com e-mail, aguardando aprovação)
//   comentarios/aprovados/<slug>/<id>.json  (sem e-mail, exibido no site)
import crypto from "node:crypto";
import { put, list, get, del } from "@vercel/blob";

const RAIZ = "comentarios";
const ACESSO = { access: "private" };

// Piloto: enquanto a lista não estiver vazia, os comentários aparecem só nestas matérias.
// Para ligar em todas, deixe a lista vazia.
export const COMENTARIOS_PILOTO = [
  "zelda-ocarina-of-time-remake-96-metacritic-jogo-mais-bem-avaliado-2026-o-que-dizem-as-analises",
];

export function comentariosAtivos(slug) {
  if (!process.env.BLOB_READ_WRITE_TOKEN || !process.env.COMENTARIOS_SEGREDO) return false;
  return COMENTARIOS_PILOTO.length === 0 || COMENTARIOS_PILOTO.includes(slug);
}

export const slugValido = (s) => typeof s === "string" && /^[a-z0-9-]{1,200}$/.test(s);
export const idValido = (s) => typeof s === "string" && /^[a-z0-9]{8,40}$/.test(s);

export function novoId() {
  return Date.now().toString(36) + crypto.randomBytes(6).toString("hex");
}

function caminho(estado, slug, id) {
  return `${RAIZ}/${estado}/${slug}/${id}.json`;
}

export function assinar(texto) {
  return crypto.createHmac("sha256", process.env.COMENTARIOS_SEGREDO || "").update(texto).digest("hex").slice(0, 32);
}

export function chaveAdmin() {
  return assinar("admin-acerto-games");
}

export function chaveAdminValida(chave) {
  const certa = chaveAdmin();
  return typeof chave === "string" && chave.length === certa.length &&
    crypto.timingSafeEqual(Buffer.from(chave), Buffer.from(certa));
}

async function lerJson(pathname) {
  const r = await get(pathname, { ...ACESSO, useCache: false });
  if (!r) return null;
  const texto = await new Response(r.stream).text();
  try { return JSON.parse(texto); } catch { return null; }
}

async function gravar(pathname, dados) {
  await put(pathname, JSON.stringify(dados), {
    ...ACESSO,
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function listarPasta(prefixo) {
  const itens = [];
  let cursor;
  do {
    const r = await list({ prefix: prefixo, cursor, limit: 1000 });
    itens.push(...r.blobs);
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  return itens;
}

async function lerPasta(prefixo) {
  const blobs = await listarPasta(prefixo);
  const dados = await Promise.all(blobs.map((b) => lerJson(b.pathname)));
  return dados.filter(Boolean).sort((a, b) => a.criadoEm.localeCompare(b.criadoEm));
}

export async function aprovadosDe(slug) {
  return lerPasta(`${RAIZ}/aprovados/${slug}/`);
}

export async function todosPendentes() {
  return lerPasta(`${RAIZ}/pendentes/`);
}

export async function aprovadosRecentes(limite = 50) {
  const todos = await lerPasta(`${RAIZ}/aprovados/`);
  return todos.slice(-limite).reverse();
}

export async function salvarPendente(c) {
  await gravar(caminho("pendentes", c.slug, c.id), c);
}

export async function lerPendente(slug, id) {
  return lerJson(caminho("pendentes", slug, id));
}

// Na aprovação, o e-mail fica só no registro interno e não vai para o arquivo público.
export async function aprovar(slug, id) {
  const c = await lerPendente(slug, id);
  if (!c) return null;
  const { email, ip, ...publico } = c;
  await gravar(caminho("aprovados", slug, id), { ...publico, aprovadoEm: new Date().toISOString() });
  await del(caminho("pendentes", slug, id));
  return c;
}

export async function apagar(slug, id) {
  await del([caminho("pendentes", slug, id), caminho("aprovados", slug, id)]).catch(() => {});
}

export async function responderComoRedacao(slug, paiId, texto) {
  const id = novoId();
  const c = {
    id, slug, paiId: paiId || null, nome: "Acerto Games", redacao: true,
    texto, criadoEm: new Date().toISOString(), aprovadoEm: new Date().toISOString(),
  };
  await gravar(caminho("aprovados", slug, id), c);
  return c;
}

// Aviso por e-mail ao contato@ (Brevo), com links de aprovar e apagar.
export async function avisarNovoComentario(c, titulo) {
  if (!process.env.BREVO_API_KEY) return;
  const base = "https://acertogames.com.br";
  const sig = assinar(`${c.slug}/${c.id}`);
  const q = `slug=${encodeURIComponent(c.slug)}&id=${c.id}&sig=${sig}`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  const html = `
    <p><strong>Novo comentário aguardando aprovação</strong></p>
    <p>Matéria: <a href="${base}/noticia/${c.slug}">${esc(titulo || c.slug)}</a></p>
    <p>Nome: ${esc(c.nome)}<br>E-mail: ${esc(c.email)}${c.paiId ? "<br>(resposta a outro comentário)" : ""}</p>
    <blockquote style="border-left:3px solid #2ee67a;padding-left:10px">${esc(c.texto).replace(/\n/g, "<br>")}</blockquote>
    <p><a href="${base}/api/comentarios/moderar?acao=aprovar&${q}">✅ Aprovar</a> &nbsp;·&nbsp;
       <a href="${base}/api/comentarios/moderar?acao=apagar&${q}">🗑️ Apagar</a></p>
    <p><a href="${base}/admin/comentarios?chave=${chaveAdmin()}">Abrir o painel de comentários</a> (aprovar, apagar e responder como Acerto Games)</p>`;
  const r = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": process.env.BREVO_API_KEY, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: "Acerto Games", email: "contato@acertogames.com.br" },
      to: [{ email: "contato@acertogames.com.br", name: "Redação Acerto Games" }],
      subject: `Novo comentário: ${c.nome} em "${(titulo || c.slug).slice(0, 80)}"`,
      htmlContent: html,
    }),
  }).catch((e) => { console.error("comentarios: falha ao avisar", e?.message); return null; });
  if (r && !r.ok) console.error("comentarios: Brevo respondeu", r.status, (await r.text().catch(() => "")).slice(0, 300));
}
