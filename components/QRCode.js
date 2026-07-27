import QRCodeLib from "qrcode";

/*
 * QRCode.js — Acerto Games
 * Server Component. Gera um QR Code em SVG estático no momento do build,
 * usando a biblioteca "qrcode" (nível de correção M). Sem JavaScript no
 * cliente e sem hidratação — o SVG já vai pronto no HTML.
 */
export default function QRCode({ url, size = 128 }) {
  let qr;
  try {
    qr = QRCodeLib.create(url, { errorCorrectionLevel: "M" });
  } catch {
    return null;
  }

  const n = qr.modules.size;
  const bits = qr.modules.data;
  const quiet = 4;
  const dim = n + quiet * 2;

  // Monta um único <path> com todos os módulos escuros (eficiente).
  let d = "";
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (bits[r * n + c]) {
        d += `M${c + quiet} ${r + quiet}h1v1h-1z`;
      }
    }
  }

  return (
    <div className="mt-8 flex items-center gap-4 border-t border-edge pt-6">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${dim} ${dim}`}
        role="img"
        aria-label="QR code que abre esta matéria"
        shapeRendering="crispEdges"
        className="shrink-0 rounded bg-white p-1"
      >
        <rect x="0" y="0" width={dim} height={dim} fill="#ffffff" />
        <path d={d} fill="#0A0D10" />
      </svg>
      <div className="font-mono text-xs uppercase tracking-widest text-dim">
        <p className="text-paper">Leia no celular</p>
        <p className="mt-1">Aponte a câmera e abra esta matéria</p>
      </div>
    </div>
  );
}
