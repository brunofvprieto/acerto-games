"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CategoryTag } from "./Cards";

function NewsCard({ post, compact = false }) {
  return (
    <Link
      href={`/noticia/${post.slug}`}
      className="group relative min-h-[220px] overflow-hidden border border-edge bg-black transition-colors hover:border-arcade lg:min-h-0"
    >
      {post.image ? (
        <img
          src={post.image}
          alt={post.imageAlt || post.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
          style={{ objectPosition: post.heroImagePos || post.imagePos || "center center" }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${post.cover?.[0] || "#111"}, ${post.cover?.[1] || "#222"})`,
          }}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5" />

      <div className={`absolute inset-x-0 bottom-0 z-10 ${compact ? "p-3 xl:p-4" : "p-4 xl:p-5"}`}>
        <CategoryTag category={post.category} />
        <h3
          className={`mt-2 font-display uppercase leading-[1.08] text-paper transition-colors group-hover:text-arcade ${
            compact
              ? "text-sm lg:text-[0.78rem] xl:text-[0.9rem]"
              : "text-base lg:text-[0.88rem] xl:text-[1rem]"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-2 font-mono text-[8px] uppercase tracking-[.1em] text-paper/65">
          {post.date}
          {post.readTime ? ` · ${post.readTime}` : ""}
        </p>
      </div>
    </Link>
  );
}

export default function HeroCarousel({ posts }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  const destaques = posts?.slice(0, 5) || [];
  const ultimas = posts?.slice(5, 10) || [];
  const total = destaques.length;

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

  if (!total) return null;

  const p = destaques[Math.min(atual, total - 1)];

  return (
    <section
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel"
      aria-label="Principais manchetes"
      className="py-3 sm:py-4 lg:py-4"
    >
      <div className="grid gap-3 lg:h-[calc(100vh-210px)] lg:min-h-[500px] lg:max-h-[640px] lg:grid-cols-[1.3fr_1fr] lg:items-stretch xl:gap-4">
        <div className="relative min-h-[470px] overflow-visible sm:min-h-[560px] lg:min-h-0">
          <Link
            href={`/noticia/${p.slug}`}
            className="group relative block h-full w-full overflow-hidden border border-arcade/80 bg-black shadow-[0_0_0_1px_rgba(46,232,108,.12),0_0_40px_rgba(46,232,108,.08)] transition-shadow hover:shadow-[0_0_0_1px_rgba(46,232,108,.5),0_0_55px_rgba(46,232,108,.18)]"
          >
            {p.image ? (
              <img
                src={p.image}
                alt={p.imageAlt || p.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.018]"
                style={{ objectPosition: p.heroImagePos || p.imagePos || "center center" }}
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${p.cover?.[0] || "#111"}, ${p.cover?.[1] || "#222"})`,
                }}
              />
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/42 to-black/5" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 lg:p-6 xl:p-8">
              <CategoryTag category={p.category} />
              <h2 className="mt-3 max-w-[95%] font-display text-2xl uppercase leading-[1.03] text-paper transition-colors group-hover:text-arcade md:text-3xl lg:text-[1.7rem] xl:text-[2rem]">
                {p.title}
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[8px] uppercase tracking-[.11em] text-paper/65 xl:text-[9px]">
                <span>
                  <span className="mr-1 text-arcade">▣</span>
                  {p.date}
                </span>
                {p.readTime && (
                  <span>
                    <span className="mr-1 text-arcade">◷</span>
                    {p.readTime} de leitura
                  </span>
                )}
              </div>
            </div>
          </Link>

          {total > 1 && (
            <>
              <button
                onClick={() => ir(atual - 1)}
                aria-label="Manchete anterior"
                className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-arcade bg-ink/90 font-mono text-xl text-arcade backdrop-blur transition-colors hover:bg-arcade hover:text-ink sm:h-12 sm:w-12"
              >
                ‹
              </button>

              <button
                onClick={() => ir(atual + 1)}
                aria-label="Próxima manchete"
                className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-arcade bg-ink/90 font-mono text-xl text-arcade backdrop-blur transition-colors hover:bg-arcade hover:text-ink sm:h-12 sm:w-12"
              >
                ›
              </button>

              <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-black/55 px-3 py-2 backdrop-blur">
                {destaques.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => ir(i)}
                    aria-label={`Ir para manchete ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === atual
                        ? "w-8 bg-arcade shadow-[0_0_10px_rgba(46,232,108,.65)]"
                        : "w-2 bg-paper/35 hover:bg-paper/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid gap-3 lg:grid-cols-6 lg:grid-rows-2 xl:gap-4">
          {ultimas.slice(0, 2).map((post) => (
            <div key={post.slug} className="lg:col-span-3">
              <NewsCard post={post} />
            </div>
          ))}

          {ultimas.slice(2, 5).map((post) => (
            <div key={post.slug} className="lg:col-span-2">
              <NewsCard post={post} compact />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
