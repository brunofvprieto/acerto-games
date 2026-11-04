export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/comentarios"] },
    sitemap: [
      "https://acertogames.com.br/sitemap.xml",
      "https://acertogames.com.br/news-sitemap.xml",
    ],
  };
}
