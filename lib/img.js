// Imagens otimizadas pelo endpoint do Next.js (/_next/image), que a Vercel
// converte para WebP e redimensiona para cada tela. Só vale para arquivos
// locais em /img; links externos (YouTube, Amazon etc.) passam direto.
// As larguras precisam bater com images.deviceSizes/imageSizes do next.config.mjs.
const LARGURAS = [384, 640, 960, 1280, 1920];

function otimizavel(src) {
  return (
    typeof src === "string" &&
    src.startsWith("/") &&
    !src.startsWith("/_next/") &&
    !/\.(svg|gif)$/i.test(src)
  );
}

function urlOtimizada(src, w, q = 75) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${q}`;
}

// Uso: <img {...imgOtimizada(src, "(min-width:1024px) 33vw, 100vw")} alt="..." />
export function imgOtimizada(src, sizes = "100vw", { max = 1920 } = {}) {
  if (!otimizavel(src)) return { src };
  const larguras = LARGURAS.filter((w) => w <= max);
  return {
    src: urlOtimizada(src, larguras[larguras.length - 1]),
    srcSet: larguras.map((w) => `${urlOtimizada(src, w)} ${w}w`).join(", "),
    sizes,
  };
}

// Texto alternativo a partir da legenda, sem a frase de crédito
// ("Divulgação/...", "Imagem oficial de ...", "Créditos: ...").
export function altDaLegenda(legenda, reserva = "") {
  if (!legenda) return reserva;
  const frases = legenda
    .split(/(?<=\.)\s+/)
    .filter((f) => !/(divulga[çc][ãa]o|cr[ée]ditos?:|imagem oficial|arte oficial|reprodu[çc][ãa]o|captura oficial|foto:)/i.test(f));
  const alt = frases.join(" ").replace(/^📷\s*/, "").trim();
  return alt || reserva;
}
