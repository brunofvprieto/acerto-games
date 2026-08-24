import { getAllPosts } from "../lib/posts";

const BASE = "https://acertogames.com.br";

export default function sitemap() {
  const fixas = [
    { url: BASE, changeFrequency: "hourly", priority: 1 },
    { url: `${BASE}/gta6`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/reviews`, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/opinioes`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/artigos`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/autor/bruno-vazquez`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/sobre`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/editorial`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contato`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const materias = getAllPosts().map((p) => ({
    url: `${BASE}/noticia/${p.slug}`,
    ...((p.atualizadoEm || p.publicadoEm) ? { lastModified: new Date(p.atualizadoEm || p.publicadoEm) } : {}),
    changeFrequency: p.category === "opinião" || p.category === "artigo" ? "monthly" : "weekly",
    priority: p.category === "opinião" || p.category === "artigo" || p.category === "especial" ? 0.8 : 0.7,
  }));

  return [...fixas, ...materias];
}
