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
      className="relative py-6 md:py-8 lg:py-9"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel"
      aria-label="Principais manchetes"
    >
      <div className="mx-auto grid max-w-[1760px] items-start gap-7 px-5 sm:px-8 md:grid-cols-[minmax(0,1.62fr)_minmax(360px,.78fr)] md:gap-9 lg:gap-11 lg:px-10 xl:px-14">
        <Link
          href={`/noticia/${p.slug}`}
          className="group relative block w-full overflow-hidden rounded-sm border border-arcade bg-ink shadow-[0_0_34px_rgba(46,232,108,0.12)]"
        >
          <div className="relative aspect-[2.05/1] w-full overflow-hidden">
            {p.image ? (
              <img
                src={p.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.012]"
                style={{ objectPosition: p.imagePos || "center center" }}
              />
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

        <div className="flex min-w-0 flex-col pt-0 md:pt-1 lg:pt-2">
          <div>
            <CategoryTag category={p.category} />
          </div>

          <Link href={`/noticia/${p.slug}`} className="group">
            <h2 className="mt-3 font-display text-[1.9rem] leading-[1.08] text-paper transition-colors group-hover:text-arcade md:text-[2rem] lg:text-[2.35rem] xl:text-[2.65rem]">
              {p.title}
            </h2>
          </Link>

          <p className="mt-4 max-w-[680px] text-[0.98rem] leading-[1.55] text-dim md:text-base lg:text-[1.05rem] xl:text-[1.12rem]">
            {p.excerpt}
          </p>

          <p className="mt-5 border-t border-edge pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-dim md:text-[11px] lg:text-xs">
            {p.date} · {p.readTime} de leitura
          </p>
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={() => ir(atual - 1)}
            aria-label="Manchete anterior"
            className="absolute left-1 top-[38%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-arcade/80 bg-ink/90 font-mono text-lg text-arcade backdrop-blur transition-all hover:bg-arcade hover:text-ink hover:shadow-[0_0_20px_rgba(46,232,108,0.5)] md:left-2 md:top-[46%] lg:left-3"
          >
            ◂
          </button>

          <button
            onClick={() => ir(atual + 1)}
            aria-label="Próxima manchete"
            className="absolute right-1 top-[38%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-arcade/80 bg-ink/90 font-mono text-lg text-arcade backdrop-blur transition-all hover:bg-arcade hover:text-ink hover:shadow-[0_0_20px_rgba(46,232,108,0.5)] md:right-2 md:top-[46%] lg:right-3"
          >
            ▸
          </button>

          <div className="mt-4 flex justify-center gap-2">
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
