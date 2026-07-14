import { getAllPosts } from "../lib/posts";

const BASE = "https://acertogames.com.br";

export default function sitemap() {
  const fixas = [
    { url: BASE, changeFrequency: "hourly", priority: 1 },
    { url: `${BASE}/gta6`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/sobre`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/contato`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.1 },
  ];
  const materias = getAllPosts().map((p) => ({
    url: `${BASE}/noticia/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  return [...fixas, ...materias];
}
