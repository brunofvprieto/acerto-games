"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { CategoryTag } from "./Cards";

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
      className="relative border-b border-edge/70 py-8 md:py-10 lg:py-12"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel"
      aria-label="Principais manchetes"
    >
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-6 px-5 md:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 xl:gap-14">
        <Link
          href={`/noticia/${p.slug}`}
          className="group relative block overflow-hidden rounded-[10px] border border-arcade bg-black shadow-[0_0_35px_rgba(46,232,108,0.18)]"
          aria-label={p.title}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black lg:aspect-[1.42/1] xl:aspect-[1.48/1]">
            {p.image ? (
              <>
                <div
                  className="absolute inset-0 scale-110 bg-cover bg-center opacity-20 blur-2xl"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <img
                  key={p.slug}
                  src={p.image}
                  alt=""
                  className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                  style={{ objectPosition: p.imagePos || "center center" }}
                />
              </>
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${p.cover[0]}, ${p.cover[1]})` }}
              />
            )}
          </div>
        </Link>

        <div className="flex min-w-0 flex-col justify-center lg:pr-8">
          <div>
            <CategoryTag category={p.category} />
          </div>

          <Link href={`/noticia/${p.slug}`} className="group mt-4 block">
            <h2 className="font-display text-3xl leading-[1.08] text-paper transition-colors group-hover:text-arcade md:text-4xl lg:text-[2.6rem] xl:text-5xl">
              {p.title}
            </h2>
          </Link>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-dim md:text-lg lg:text-xl">
            {p.excerpt}
          </p>

          <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim md:text-xs">
            <span>▣ {p.date}</span>
            <span>◷ {p.readTime} de leitura</span>
          </p>
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={() => ir(atual - 1)}
            aria-label="Manchete anterior"
            className="absolute left-2 top-[37%] z-20 -translate-y-1/2 rounded-full border border-arcade/70 bg-ink/90 px-4 py-3 font-mono text-lg text-arcade backdrop-blur transition-all hover:bg-arcade hover:text-ink hover:shadow-[0_0_22px_rgba(46,232,108,0.5)] md:left-5 lg:top-1/2"
          >
            ‹
          </button>

          <button
            onClick={() => ir(atual + 1)}
            aria-label="Próxima manchete"
            className="absolute right-2 top-[37%] z-20 -translate-y-1/2 rounded-full border border-arcade/70 bg-ink/90 px-4 py-3 font-mono text-lg text-arcade backdrop-blur transition-all hover:bg-arcade hover:text-ink hover:shadow-[0_0_22px_rgba(46,232,108,0.5)] md:right-5 lg:top-1/2"
          >
            ›
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => ir(i)}
                aria-label={`Ir para manchete ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === atual
                    ? "w-10 bg-arcade shadow-[0_0_12px_rgba(46,232,108,0.65)]"
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
