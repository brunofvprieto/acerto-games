"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CategoryTag } from "./Cards";

function normalizar(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function SearchClient({ posts }) {
  const params = useSearchParams();
  const [termo, setTermo] = useState(params.get("q") || "");

  const resultados = useMemo(() => {
    const q = normalizar(termo.trim());
    if (q.length < 2) return [];
    return posts.filter((p) =>
      normalizar(`${p.title} ${p.excerpt}`).includes(q)
    );
  }, [termo, posts]);

  return (
    <div>
      <input
        autoFocus
        type="search"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Digite o nome de um jogo, empresa, assunto..."
        className="w-full border border-edge bg-surface px-4 py-3 text-lg text-paper placeholder:text-dim focus:border-arcade focus:outline-none"
      />
      {termo.trim().length >= 2 && (
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-dim">
          {resultados.length} resultado{resultados.length === 1 ? "" : "s"} para “{termo.trim()}”
        </p>
      )}
      <div className="mt-4 space-y-3">
        {resultados.map((p) => (
          <Link
            key={p.slug}
            href={`/noticia/${p.slug}`}
            className="group block border border-edge bg-surface p-4 hover:border-arcade"
          >
            <CategoryTag category={p.category} />
            <h2 className="mt-2 font-display leading-snug group-hover:text-arcade">
              {p.title}
            </h2>
            <p className="mt-1 text-sm text-dim">{p.excerpt}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-dim">
              {p.date}
            </p>
          </Link>
        ))}
        {termo.trim().length >= 2 && resultados.length === 0 && (
          <div className="border border-edge bg-surface p-8 text-center">
            <p className="font-display">Nada encontrado. 🕹️</p>
            <p className="mt-2 text-sm text-dim">
              Tenta outro termo — ou pode ser que a gente ainda não tenha coberto esse assunto.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
