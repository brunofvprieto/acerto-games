import sharp from "sharp";
import { getPost } from "../../../lib/posts";

// Imagem de compartilhamento (WhatsApp, Facebook, X, Telegram, Discord).
// Gera, a partir da capa da matéria, um JPEG 1200x630 leve (bem abaixo de 300 KB).
// WhatsApp e Facebook ignoram capas pesadas, em WebP/AVIF/SVG ou hospedadas em
// sites de terceiros que bloqueiam robôs; aqui tudo vira JPEG servido pelo próprio domínio.

export const runtime = "nodejs";

const BASE = "https://acertogames.com.br";
const PADRAO = `${BASE}/og-acerto-games.jpg`;
const W = 1200;
const H = 630;

const CACHE = "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800";

async function baixar(url) {
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; AcertoGamesOG/1.0; +https://acertogames.com.br)" },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

async function gerar(buffer) {
  return sharp(buffer, { failOn: "none", limitInputPixels: false })
    .rotate()
    .resize(W, H, { fit: "cover", position: "attention" })
    .flatten({ background: "#111111" })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toBuffer();
}

function resposta(buffer) {
  return new Response(buffer, {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": CACHE, "Content-Length": String(buffer.length) },
  });
}

export async function GET(_req, { params }) {
  const slug = String(params.slug || "").replace(/\.jpe?g$/i, "");
  const post = getPost(slug);
  const capa = post?.image;
  const origem = capa ? (capa.startsWith("http") ? capa : `${BASE}${capa.startsWith("/") ? "" : "/"}${capa}`) : PADRAO;

  try {
    return resposta(await gerar(await baixar(origem)));
  } catch {
    try {
      return resposta(await gerar(await baixar(PADRAO)));
    } catch {
      return Response.redirect(PADRAO, 302);
    }
  }
}
