"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Cover, CategoryTag } from "./Cards";

export default function HeroCarousel({ posts }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = posts.length;

  const ir = useCallback(
    (i) => setAtual(((i % total) + total) % total),
    [total]
  );

  useEffect(() => {
    if (pausado || total <= 1) return;
    const id = setInterval(() => setAtual((a) => (a + 1) % total), 6000);
    return () => clearInterval(id);
  }, [pausado, total]);

  if (total === 0) return null;
  const p = posts[atual];

  return (
    <section
      className="relative py-8"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel"
      aria-label="Principais manchetes"
    >
      <Link
        href={`/noticia/${p.slug}`}
        className="group grid overflow-hidden border border-edge bg-surface md:grid-cols-2"
      >
        <Cover colors={p.cover} image={p.image} className="min-h-56 md:min-h-full" />
        <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
          <CategoryTag category={p.category} />
          <h1 className="font-display text-2xl leading-tight group-hover:text-arcade md:text-4xl">
            {p.title}
          </h1>
          <p className="text-dim">{p.excerpt}</p>
          <p className="font-mono text-xs uppercase tracking-widest text-dim">
            {p.date} · {p.readTime} de leitura
          </p>
        </div>
      </Link>

      {total > 1 && (
        <>
          {/* Setas */}
          <button
            onClick={() => ir(atual - 1)}
            aria-label="Manchete anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 border border-edge bg-ink/80 px-3 py-2 font-mono text-arcade backdrop-blur hover:border-arcade"
          >
            ◂
          </button>
          <button
            onClick={() => ir(atual + 1)}
            aria-label="Próxima manchete"
            className="absolute right-2 top-1/2 -translate-y-1/2 border border-edge bg-ink/80 px-3 py-2 font-mono text-arcade backdrop-blur hover:border-arcade"
          >
            ▸
          </button>

          {/* Indicadores */}
          <div className="mt-3 flex justify-center gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => ir(i)}
                aria-label={`Ir para manchete ${i + 1}`}
                className={`h-2 transition-all ${
                  i === atual ? "w-6 bg-arcade" : "w-2 bg-edge hover:bg-dim"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
