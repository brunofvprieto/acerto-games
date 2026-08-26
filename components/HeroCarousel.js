"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CategoryTag, Cover } from "./Cards";

function MiniCard({ post }) {
  return (
    <Link
      href={`/noticia/${post.slug}`}
      className="group flex flex-col overflow-hidden border border-edge bg-surface transition-colors hover:border-arcade"
    >
      <div className="relative h-32 shrink-0 sm:h-36">
        <Cover
          colors={post.cover || ["#111", "#222"]}
          image={post.image}
          position={post.imagePos}
          className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2">
          <CategoryTag category={post.category} />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <h3 className="font-display text-sm leading-snug group-hover:text-arcade">
          {post.title}
        </h3>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-dim">
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
  const ultimas = posts.slice(0, 5);

  return (
    <section
      className="py-4 sm:py-6"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel"
      aria-label="Principais manchetes"
    >
      {/* ── Hero principal: imagem à esquerda, texto à direita ── */}
      <div className="relative">
        <Link
          href={`/noticia/${p.slug}`}
          className="group grid overflow-hidden border border-arcade/60 bg-ink shadow-[0_0_32px_rgba(46,232,108,.10)] transition-shadow hover:border-arcade hover:shadow-[0_0_48px_rgba(46,232,108,.18)] md:grid-cols-[1.45fr_1fr]"
        >
          {/* Imagem */}
          <div className="relative min-h-[240px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[460px]">
            {p.image ? (
              <img
                src={p.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                style={{ objectPosition: p.imagePos || p.imagePosition || "center center" }}
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${p.cover?.[0] || "#111"}, ${p.cover?.[1] || "#222"})`,
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/80 md:to-ink/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent md:hidden" />
          </div>

          {/* Texto */}
          <div className="flex flex-col justify-center gap-4 p-6 md:p-8 lg:p-10">
            <CategoryTag category={p.category} />
            <h2 className="font-display text-[1.6rem] leading-[1.05] text-paper sm:text-[2rem] md:text-[2.2rem] lg:text-[2.6rem]">
              {p.title}
            </h2>
            <p className="hidden text-sm leading-relaxed text-paper/75 sm:block md:text-base lg:text-lg">
              {p.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[.13em] text-paper/65">
              <span>
                <span className="text-arcade">▣</span> {p.date}
              </span>
              {p.readTime && (
                <span>
                  <span className="text-arcade">◷</span> {p.readTime} de leitura
                </span>
              )}
            </div>
            <span className="mt-1 inline-block font-mono text-xs uppercase tracking-widest text-arcade">
              Ler matéria completa ▸
            </span>
          </div>
        </Link>

        {/* Setas */}
        {total > 1 && (
          <>
            <button
              onClick={() => ir(atual - 1)}
              aria-label="Manchete anterior"
              className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-arcade bg-ink/90 font-mono text-lg text-arcade backdrop-blur hover:bg-arcade hover:text-ink sm:h-11 sm:w-11 sm:text-xl"
            >
              ‹
            </button>
            <button
              onClick={() => ir(atual + 1)}
              aria-label="Próxima manchete"
              className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-arcade bg-ink/90 font-mono text-lg text-arcade backdrop-blur hover:bg-arcade hover:text-ink sm:h-11 sm:w-11 sm:text-xl"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {total > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {posts.map((_, i) => (
            <button
              key={i}
              onClick={() => ir(i)}
              aria-label={`Ir para manchete ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === atual
                  ? "w-8 bg-arcade shadow-[0_0_8px_rgba(46,232,108,.6)]"
                  : "w-2 bg-paper/25 hover:bg-paper/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* ── Grade Últimas Notícias ── */}
      {ultimas.length > 0 && (
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base uppercase sm:text-lg">
              <span className="text-arcade">▸</span> Últimas Notícias
            </h2>
            <Link
              href="/noticias"
              className="font-mono text-[10px] uppercase tracking-widest text-arcade hover:text-paper sm:text-xs"
            >
              Ver todas ▸
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {ultimas.map((post) => (
              <MiniCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
