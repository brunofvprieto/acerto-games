"use client";

import { useState, useEffect } from "react";

/*
 * PreviewToggle.js — Acerto Games
 * Botão (só visível no desktop) que alterna a visualização do site entre
 * "Desktop" (normal) e "Mobile" (o conteúdo é enquadrado numa moldura de
 * celular centralizada). Útil para gravar shorts reagindo ao site.
 *
 * Como funciona: ao ativar o modo mobile, adiciona a classe `ag-mobile-preview`
 * no <html>. O CSS correspondente (em globals.css) reduz a largura do <body>
 * para a de um celular e desenha a moldura. Nada do layout original é alterado
 * de forma permanente — é só uma "casca" visual que liga e desliga.
 */
export default function PreviewToggle() {
  const [mobile, setMobile] = useState(false);

  // aplica/remove a classe no <html> quando o estado muda
  useEffect(() => {
    const root = document.documentElement;
    if (mobile) root.classList.add("ag-mobile-preview");
    else root.classList.remove("ag-mobile-preview");
    return () => root.classList.remove("ag-mobile-preview");
  }, [mobile]);

  return (
    <button
      type="button"
      onClick={() => setMobile((v) => !v)}
      // hidden em telas pequenas: só aparece no desktop (md pra cima)
      className="ag-preview-toggle hidden md:inline-flex items-center gap-1.5 rounded border border-edge bg-ink/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-dim transition-colors hover:border-arcade hover:text-arcade"
      aria-label={mobile ? "Ver em modo desktop" : "Ver em modo celular"}
      title={mobile ? "Voltar para desktop" : "Ver como celular (para gravar shorts)"}
    >
      {mobile ? (
        <>
          <span aria-hidden="true">🖥️</span>
          <span>Desktop</span>
        </>
      ) : (
        <>
          <span aria-hidden="true">📱</span>
          <span>Celular</span>
        </>
      )}
    </button>
  );
}
