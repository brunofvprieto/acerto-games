"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CategoryTag, Cover } from "./Cards";

function MiniCard({ post }) {
  return (
    <Link
      href={`/noticia/${post.slug}`}
      className="group relative flex aspect-square min-h-0 flex-col overflow-hidden border border-edge bg-surface transition-colors hover:border-arcade"
    >
      <div className="relative h-[58%] shrink-0 overflow-hidden">
        <Cover
          colors={post.cover || ["#111", "#222"]}
          image={post.image}
          position={post.imagePos}
          className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2">
          <CategoryTag category={post.category} />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between p-2.5 sm:p-3">
        <h3 className="line-clamp-3 font-display text-[0.68rem] leading-snug group-hover:text-arcade sm:text-xs lg:text-[0.76rem] xl:text-[0.82rem]">
          {post.title}
        </h3>
        <p className="mt-2 font-mono text-[8px] uppercase tracking-wide text-dim sm:text-[9px]">
          {post.date}
        </p>
      </div>
    </Link>
  );
}

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

  if (!total) return null;

  const p = posts[Math.min(atual, total - 1)];
  const ultimas = posts.slice(0, 4);

  return (
    <section
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel"
      aria-label="Principais manchetes"
      className="py-5 sm:py-6"
    >
      <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch xl:gap-6">
        <div className="relative aspect-square min-w-0">
          <Link
            href={`/noticia/${p.slug}`}
            className="group relative block h-full w-full overflow-hidden border border-arcade/80 bg-black shadow-[0_0_0_1px_rgba(46,232,108,.12),0_0_40px_rgba(46,232,108,.08)] transition-shadow hover:shadow-[0_0_0_1px_rgba(46,232,108,.5),0_0_55px_rgba(46,232,108,.18)]"
            style={{
              clipPath:
                "polygon(20px 0,100% 0,100% calc(100% - 20px),calc(100% - 20px) 100%,0 100%,0 20px)",
            }}
          >
            {p.image ? (
              <>
                <img
                  src={p.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-lg"
                  style={{ objectPosition: p.heroImagePos || p.imagePos || "center center" }}
                />
                <img
                  src={p.image}
                  alt={p.imageAlt || p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                  style={{ objectPosition: p.heroImagePos || p.imagePos || "center center" }}
                />
              </>
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${p.cover?.[0] || "#111"}, ${p.cover?.[1] || "#222"})`,
                }}
              />
            )}

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,.98) 0%, rgba(0,0,0,.84) 30%, rgba(0,0,0,.34) 58%, rgba(0,0,0,.08) 78%, transparent 100%)",
              }}
            />

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 lg:p-8 xl:p-9">
              <CategoryTag category={p.category} />
              <h2 className="mt-2 max-w-[95%] font-display text-xl leading-[1.06] text-paper sm:text-2xl md:text-3xl lg:text-[1.8rem] xl:text-[2.1rem]">
                {p.title}
              </h2>
              <p className="mt-3 line-clamp-3 max-w-[92%] text-xs leading-relaxed text-paper/80 sm:text-sm lg:text-[0.82rem] xl:text-sm">
                {p.excerpt}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[8px] uppercase tracking-[.12em] text-paper/65 sm:text-[9px] xl:text-[10px]">
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
                className="absolute left-0 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-arcade bg-ink/95 font-mono text-xl text-arcade backdrop-blur transition-colors hover:bg-arcade hover:text-ink sm:h-12 sm:w-12 lg:left-1"
              >
                ‹
              </button>

              <button
                onClick={() => ir(atual + 1)}
                aria-label="Próxima manchete"
                className="absolute right-0 top-1/2 z-30 translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-arcade bg-ink/95 font-mono text-xl text-arcade backdrop-blur transition-colors hover:bg-arcade hover:text-ink sm:h-12 sm:w-12 lg:right-1"
              >
                ›
              </button>

              <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 rounded-full bg-black/55 px-3 py-2 backdrop-blur">
                {posts.map((_, i) => (
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

        <div className="relative min-w-0 lg:aspect-square">
          <div className="mb-3 flex items-center justify-between lg:absolute lg:inset-x-0 lg:top-0 lg:z-20 lg:mb-0 lg:h-10 lg:bg-gradient-to-b lg:from-ink lg:to-transparent lg:px-1 lg:pt-1">
            <h2 className="font-display text-base uppercase sm:text-lg">
              <span className="mr-1 text-arcade">▸</span>
              Últimas Notícias
            </h2>
            <Link
              href="/noticias"
              className="font-mono text-[10px] uppercase tracking-widest text-arcade hover:text-paper sm:text-xs"
            >
              Ver todas ▸
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:h-full lg:grid-rows-2 lg:pt-11">
            {ultimas.map((post) => (
              <MiniCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
