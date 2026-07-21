import fs from "fs";
import path from "path";
import { posts as manuais } from "../data/posts";

const DIR_PUBLICADOS = path.join(process.cwd(), "content", "publicados");

// Aceita variações que o robô possa escrever ("noticia", "Notícia", "review", "retro"...)
function normalizarCategoria(c) {
  const v = String(c || "").toLowerCase();
  if (v.startsWith("rev")) return "review";
  if (v.startsWith("retr")) return "retrô";
  if (v.startsWith("espec")) return "especial";
  return "notícia";
}

// Converte "13 jul 2026" em timestamp para ordenar (mais recente primeiro)
const MESES = { jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5, jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11 };
function timestampDe(post) {
  // Carimbo preciso (matérias novas) tem prioridade
  if (post.publicadoEm) {
    const ts = Date.parse(post.publicadoEm);
    if (!isNaN(ts)) return ts;
  }
  // Fallback: data por extenso (matérias antigas) = meia-noite do dia
  const m = /(\d{1,2})\s+([a-zç]{3})\w*\.?\s+(\d{4})/i.exec(post.date || "");
  if (!m) return 0;
  const mes = MESES[m[2].toLowerCase().slice(0, 3)];
  return new Date(Number(m[3]), mes ?? 0, Number(m[1])).getTime();
}

// Blindagem: corrige e preenche campos imperfeitos vindos do robô
function sanitizar(p) {
  if (!p || typeof p !== "object" || !p.slug || !p.title) return null;
  p.category = normalizarCategoria(p.category);
  if (!Array.isArray(p.cover) || p.cover.length < 2) p.cover = ["#2EE86C", "#0B3D91"];
  p.cover = p.cover.map((c) => (typeof c === "string" && c.startsWith("#") ? c : "#2EE86C"));
  if (typeof p.body === "string") p.body = [p.body];
  if (!Array.isArray(p.body)) p.body = [p.excerpt || ""];
  p.body = p.body.filter((x) => typeof x === "string");
  if (p.nota !== undefined) {
    const n = parseFloat(p.nota);
    if (isNaN(n)) delete p.nota;
    else p.nota = Math.min(10, Math.max(0, n));
  }
  if (typeof p.image !== "string" || !(p.image.startsWith("http") || p.image.startsWith("/"))) {
    delete p.image;
    delete p.imageCredit;
  }
  if (typeof p.imagePos !== "string") delete p.imagePos;
  if (typeof p.especial !== "string") delete p.especial;
  p.excerpt = typeof p.excerpt === "string" ? p.excerpt : "";
  p.author = typeof p.author === "string" ? p.author : "Bruno Vazquez";
  p.date = typeof p.date === "string" ? p.date : "";
  // Exibir data + hora de Brasília quando houver carimbo preciso
  if (p.publicadoEm) {
    const d = new Date(p.publicadoEm);
    if (!isNaN(d)) {
      const tz = { timeZone: "America/Sao_Paulo" };
      const dia = d.toLocaleString("pt-BR", { ...tz, day: "2-digit" });
      const mes = d.toLocaleString("pt-BR", { ...tz, month: "short" }).replace(".", "");
      const ano = d.toLocaleString("pt-BR", { ...tz, year: "numeric" });
      const hora = d.toLocaleString("pt-BR", { ...tz, hour: "2-digit", minute: "2-digit" });
      p.date = `${dia} ${mes} ${ano} · ${hora}`;
    }
  }
  p.readTime = typeof p.readTime === "string" ? p.readTime : "3 min";
  return p;
}

function lerPublicados() {
  if (!fs.existsSync(DIR_PUBLICADOS)) return [];
  return fs
    .readdirSync(DIR_PUBLICADOS)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        const p = JSON.parse(fs.readFileSync(path.join(DIR_PUBLICADOS, f), "utf-8"));
        return sanitizar(p);
      } catch {
        return null; // arquivo com erro de sintaxe não derruba o site
      }
    })
    .filter(Boolean)
    .sort((a, b) => timestampDe(b) - timestampDe(a)); // mais recente primeiro
}

export function getAllPosts() {
  return [...lerPublicados(), ...manuais];
}

export function getPost(slug) {
  return getAllPosts().find((p) => p.slug === slug);
}
