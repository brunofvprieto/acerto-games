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
      <div className="relative h-[120px] shrink-0 sm:h-[130px]">
        <Cover
          colors={post.cover || ["#111", "#222"]}
          image={post.image}
          position={post.imagePos}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2">
          <CategoryTag category={post.category} />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <h3 className="line-clamp-3 font-display text-xs leading-snug group-hover:text-arcade sm:text-sm">
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
    (i) => { if (!total) return; setAtual(((i % total) + total) % total); },
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
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel"
      aria-label="Principais manchetes"
      className="py-5 sm:py-6"
    >
      {/* Wrapper — setas ficam FORA da imagem nas laterais */}
      <div className="relative mx-auto px-8 sm:px-10">

        {total > 1 && (
          <button
            onClick={() => ir(atual - 1)}
            aria-label="Manchete anterior"
            className="absolute left-0 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-arcade bg-ink/90 font-mono text-xl text-arcade backdrop-blur transition-colors hover:bg-arcade hover:text-ink sm:h-12 sm:w-12"
          >‹</button>
        )}

        {/* Card hero */}
        <Link
          href={`/noticia/${p.slug}`}
          className="group relative block overflow-hidden border border-arcade/80 bg-ink shadow-[0_0_0_1px_rgba(46,232,108,.12),0_0_40px_rgba(46,232,108,.08)] transition-shadow hover:shadow-[0_0_0_1px_rgba(46,232,108,.5),0_0_55px_rgba(46,232,108,.18)]"
          style={{ clipPath: "polygon(20px 0,100% 0,100% calc(100% - 20px),calc(100% - 20px) 100%,0 100%,0 20px)" }}
        >
          {/* Aspecto fixo 42% = ~2.4:1 */}
          <div className="relative w-full" style={{ paddingBottom: "42%" }}>
            {p.image ? (
              <img
                src={p.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.018]"
                style={{ objectPosition: p.imagePos || p.imagePosition || "center top" }}
              />
            ) : (
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.cover?.[0] || "#111"}, ${p.cover?.[1] || "#222"})` }} />
            )}

            {/* Gradientes leitura */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            {/* Texto sobre a imagem */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5 pt-8 sm:px-7 sm:pb-7 md:px-9 md:pb-8 lg:max-w-[72%]">
              <CategoryTag category={p.category} />
              <h2 className="mt-2 font-display text-[1.45rem] leading-[1.07] text-paper drop-shadow-[0_2px_14px_rgba(0,0,0,.95)] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.6rem]">
                {p.title}
              </h2>
              <p className="mt-2 hidden max-w-[760px] text-sm leading-[1.6] text-paper/82 drop-shadow-[0_2px_10px_rgba(0,0,0,.9)] sm:block md:text-base">
                {p.excerpt}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[.13em] text-paper/70">
                <span><span className="mr-1 text-arcade">▣</span>{p.date}</span>
                {p.readTime && <span><span className="mr-1 text-arcade">◷</span>{p.readTime} de leitura</span>}
              </div>
            </div>
          </div>
        </Link>

        {total > 1 && (
          <button
            onClick={() => ir(atual + 1)}
            aria-label="Próxima manchete"
            className="absolute right-0 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-arcade bg-ink/90 font-mono text-xl text-arcade backdrop-blur transition-colors hover:bg-arcade hover:text-ink sm:h-12 sm:w-12"
          >›</button>
        )}
      </div>

      {/* Dots */}
      {total > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {posts.map((_, i) => (
            <button key={i} onClick={() => ir(i)} aria-label={`Ir para manchete ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === atual ? "w-10 bg-arcade shadow-[0_0_10px_rgba(46,232,108,.65)]" : "w-2.5 bg-paper/25 hover:bg-paper/50"}`}
            />
          ))}
        </div>
      )}

      {/* Últimas Notícias */}
      {ultimas.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base uppercase sm:text-lg">
              <span className="mr-1 text-arcade">▸</span>Últimas Notícias
            </h2>
            <Link href="/noticias" className="font-mono text-[10px] uppercase tracking-widest text-arcade hover:text-paper sm:text-xs">Ver todas ▸</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {ultimas.map((post) => <MiniCard key={post.slug} post={post} />)}
          </div>
        </div>
      )}
    </section>
  );
}
