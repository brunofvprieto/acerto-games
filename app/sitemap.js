import { getAllPosts } from "../lib/posts";

const BASE = "https://acertogames.com.br";

export default function sitemap() {
  const fixas = [
    { url: BASE, changeFrequency: "hourly", priority: 1 },
    { url: `${BASE}/gta6`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/reviews`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/opinioes`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/artigos`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/sobre`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/editorial`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/contato`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.1 },
  ];
  const materias = getAllPosts().map((p) => ({
    url: `${BASE}/noticia/${p.slug}`,
    ...(p.publicadoEm ? { lastModified: new Date(p.publicadoEm) } : {}),
    changeFrequency: "weekly",
    priority: p.category === "opinião" || p.category === "artigo" ? 0.8 : 0.7,
  }));
  return [...fixas, ...materias];
}
