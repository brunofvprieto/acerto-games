"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CategoryTag } from "./Cards";

export default function HeroCarousel({ posts }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = posts?.length || 0;

  const ir = useCallback(
    (i) => {
      if (!total) return;
      setAtual(((i % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (pausado || total <= 1) return;
    const id = setInterval(() => setAtual((a) => (a + 1) % total), 6000);
    return () => clearInterval(id);
  }, [pausado, total]);

  useEffect(() => {
    if (total > 0 && atual >= total) setAtual(0);
  }, [atual, total]);

  if (!total) return null;

  const p = posts[Math.min(atual, total - 1)];

  return (
    <section
      className="relative py-8 md:py-10 lg:py-12"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel"
      aria-label="Principais manchetes"
    >
      <div className="mx-auto grid max-w-[1500px] items-center gap-6 px-12 md:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] md:gap-9 lg:gap-12 lg:px-16">
        <Link
          href={`/noticia/${p.slug}`}
          className="group relative block overflow-hidden border border-arcade bg-ink shadow-[0_0_42px_rgba(46,232,108,0.17)]"
        >
          <div className="relative aspect-[16/10] min-h-[290px] w-full sm:min-h-[360px] md:min-h-[470px] lg:min-h-[540px]">
            {p.image ? (
              <>
                <div
                  className="absolute inset-0 scale-110 bg-cover bg-center opacity-20 blur-2xl"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <div className="absolute inset-0 bg-ink/20" />
                <img
                  src={p.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </>
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${p.cover?.[0] || "#111111"}, ${p.cover?.[1] || "#222222"})`,
                }}
              />
            )}
          </div>
        </Link>

        <div className="flex min-w-0 flex-col justify-center pb-1 md:pb-0">
          <div>
            <CategoryTag category={p.category} />
          </div>

          <Link href={`/noticia/${p.slug}`} className="group">
            <h2 className="mt-4 font-display text-3xl leading-[1.06] text-paper transition-colors group-hover:text-arcade md:text-4xl lg:text-5xl">
              {p.title}
            </h2>
          </Link>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-dim md:text-lg lg:text-xl">
            {p.excerpt}
          </p>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-dim md:text-xs">
            {p.date} · {p.readTime} de leitura
          </p>
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={() => ir(atual - 1)}
            aria-label="Manchete anterior"
            className="absolute left-1 top-[35%] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-arcade/80 bg-ink/85 font-mono text-xl text-arcade backdrop-blur transition-all hover:bg-arcade hover:text-ink hover:shadow-[0_0_20px_rgba(46,232,108,0.5)] md:left-3 md:top-1/2 lg:left-4"
          >
            ◂
          </button>

          <button
            onClick={() => ir(atual + 1)}
            aria-label="Próxima manchete"
            className="absolute right-1 top-[35%] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-arcade/80 bg-ink/85 font-mono text-xl text-arcade backdrop-blur transition-all hover:bg-arcade hover:text-ink hover:shadow-[0_0_20px_rgba(46,232,108,0.5)] md:right-3 md:top-1/2 lg:right-4"
          >
            ▸
          </button>

          <div className="mt-5 flex justify-center gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => ir(i)}
                aria-label={`Ir para manchete ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === atual
                    ? "w-10 bg-arcade shadow-[0_0_10px_rgba(46,232,108,0.6)]"
                    : "w-2 bg-edge hover:bg-dim"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
