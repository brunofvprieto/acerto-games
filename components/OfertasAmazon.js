"use client";
import { useEffect, useState } from "react";

// Banner de ofertas de afiliado. Mostra produtos do tema pedido (ou todos) e gira sozinho.
export default function OfertasAmazon({ ofertas = [], tema, titulo = "Ofertas selecionadas" }) {
  const lista = ofertas.filter((o) => o.link && o.titulo && (!tema || o.tema === tema || o.tema === "geral"));
  const [i, setI] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (lista.length < 2 || pausado) return;
    const t = setInterval(() => setI((n) => (n + 1) % lista.length), 5000);
    return () => clearInterval(t);
  }, [lista.length, pausado]);

  if (!lista.length) return null;
  const o = lista[i % lista.length];

  return (
    <section className="py-8" aria-label={titulo} onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}>
      <div className="overflow-hidden rounded-lg border border-arcade/40 bg-black/40">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          {o.imagem && <img src={o.imagem} alt={o.titulo} loading="lazy" className="h-28 w-28 shrink-0 rounded object-contain bg-white/5" />}
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-arcade">{titulo}</p>
            <h3 className="mt-1 text-lg font-bold leading-snug text-paper">{o.titulo}</h3>
            {o.preco && <p className="mt-1 text-paper/80">{o.preco}</p>}
          </div>
          <a href={o.link} target="_blank" rel="sponsored nofollow noopener noreferrer" className="rounded bg-arcade px-5 py-3 text-center text-sm font-bold uppercase tracking-wider text-black hover:opacity-90">
            Ver na Amazon
          </a>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-2">
          <p className="text-[11px] text-dim">Links de afiliado: o Acerto Games pode ganhar comissão nas compras qualificadas. Preço e disponibilidade podem mudar na Amazon.</p>
          {lista.length > 1 && (
            <div className="flex gap-1.5" role="tablist" aria-label="Ofertas">
              {lista.map((_, k) => (
                <button key={k} type="button" aria-label={`Oferta ${k + 1}`} onClick={() => setI(k)} className={`h-2 w-2 rounded-full ${k === i % lista.length ? "bg-arcade" : "bg-white/30"}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
