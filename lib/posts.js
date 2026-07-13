import fs from "fs";
import path from "path";
import { posts as manuais } from "../data/posts";

const DIR_PUBLICADOS = path.join(process.cwd(), "content", "publicados");

// Aceita variações que o robô possa escrever ("noticia", "Notícia", "review", "retro"...)
function normalizarCategoria(c) {
  const v = String(c || "").toLowerCase();
  if (v.startsWith("rev")) return "review";
  if (v.startsWith("retr")) return "retrô";
  return "notícia";
}

// Converte "13 jul 2026" em timestamp para ordenar (mais recente primeiro)
const MESES = { jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5, jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11 };
function timestampDe(post) {
  const m = /(\d{1,2})\s+([a-zç]{3})\w*\.?\s+(\d{4})/i.exec(post.date || "");
  if (!m) return 0;
  const mes = MESES[m[2].toLowerCase().slice(0, 3)];
  return new Date(Number(m[3]), mes ?? 0, Number(m[1])).getTime();
}

function lerPublicados() {
  if (!fs.existsSync(DIR_PUBLICADOS)) return [];
  return fs
    .readdirSync(DIR_PUBLICADOS)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        const p = JSON.parse(fs.readFileSync(path.join(DIR_PUBLICADOS, f), "utf-8"));
        p.category = normalizarCategoria(p.category);
        return p;
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
