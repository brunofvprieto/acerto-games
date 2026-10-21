/** @type {import('next').NextConfig} */
const nextConfig = {
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
