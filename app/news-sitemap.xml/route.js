import { getAllPosts } from "../../lib/posts";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = "https://acertogames.com.br";
  const agora = Date.now();
  const doisDias = 48 * 60 * 60 * 1000;
  const recentes = getAllPosts().filter((post) => {
    if (!post.publicadoEm) return false;
    const t = Date.parse(post.publicadoEm);
    return !Number.isNaN(t) && agora - t <= doisDias;
  });

  const urls = recentes.map((post) => {
    const data = new Date(post.publicadoEm).toISOString();
    const titulo = String(post.title || "").replace(/[<&]/g, (c) => ({ "<": "&lt;", "&": "&amp;" }[c]));
    return `  <url>\n    <loc>${base}/noticia/${post.slug}</loc>\n    <news:news>\n      <news:publication>\n        <news:name>Acerto Games</news:name>\n        <news:language>pt</news:language>\n      </news:publication>\n      <news:publication_date>${data}</news:publication_date>\n      <news:title>${titulo}</news:title>\n    </news:news>\n  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
