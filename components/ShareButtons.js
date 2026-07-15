"use client";

import { useState } from "react";

export default function ShareButtons({ slug, titulo }) {
  const [copiado, setCopiado] = useState(false);
  const url = `https://acertogames.com.br/noticia/${slug}`;
  const texto = encodeURIComponent(`${titulo} — via Acerto Games`);
  const urlEnc = encodeURIComponent(url);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {}
  }

  const btn =
    "border border-edge bg-surface px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-arcade";

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <span className="font-mono text-xs uppercase tracking-widest text-dim">
        Compartilhar:
      </span>
      <a
        href={`https://wa.me/?text=${texto}%20${urlEnc}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} text-arcade`}
      >
        WhatsApp
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${texto}&url=${urlEnc}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} text-violet`}
      >
        X
      </a>
      <button onClick={copiar} className={`${btn} text-paper`}>
        {copiado ? "Copiado! ✓" : "Copiar link"}
      </button>
    </div>
  );
}
