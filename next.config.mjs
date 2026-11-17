/** @type {import('next').NextConfig} */
const nextConfig = {
  // As rotas de comentários leem o título das matérias em content/publicados.
  experimental: {
    outputFileTracingIncludes: {
      "/api/comentarios": ["./content/publicados/**/*"],
      "/api/comentarios/admin": ["./content/publicados/**/*"],
    },
  },
  // Matérias duplicadas: a versão retirada aponta de vez para a que ficou.
  async redirects() {
    return [
      {
        source: "/noticia/opiniao-midia-fisica-nao-esta-morrendo-switch-2-explica",
        destination: "/noticia/opiniao-midia-fisica-games-2026-quem-ainda-precisa-de-cartucho",
        permanent: true,
      },
      {
        source: "/noticia/the-game-awards-2026-indicados-gta-vi-oito-indicacoes-jogo-do-ano-zelda-ocarina-of-time",
        destination: "/noticia/the-game-awards-2026-indicados-lista-completa-manni-perez-lucia-gta-vi-melhor-atuacao",
        permanent: true,
      },
    ];
  },
  images: {
    // Larguras usadas pelo helper lib/img.js. Poucas larguras e cache longo
    // para manter o número de conversões baixo na Vercel.
    deviceSizes: [640, 960, 1280, 1920],
    imageSizes: [96, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
  },
};
export default nextConfig;
