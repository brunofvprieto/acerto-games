import { getAllPosts } from "../../lib/posts";

export const dynamic = "force-static";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const BASE = "https://acertogames.com.br";
  const itens = getAllPosts()
    .slice(0, 30)
    .map((p) => {
      const pub = p.publicadoEm ? new Date(p.publicadoEm).toUTCString() : "";
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${BASE}/noticia/${p.slug}</link>
      <guid>${BASE}/noticia/${p.slug}</guid>
      <description>${esc(p.excerpt)}</description>${pub ? `\n      <pubDate>${pub}</pubDate>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Acerto Games</title>
    <link>${BASE}</link>
    <description>Portal brasileiro de games: notícias, reviews e retrô.</description>
    <language>pt-BR</language>
${itens}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
