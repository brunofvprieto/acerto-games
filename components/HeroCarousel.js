"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CategoryTag } from "./Cards";

export default function HeroCarousel({ posts }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = posts?.length || 0;

  const ir = useCallback((i) => {
    if (!total) return;
    setAtual(((i % total) + total) % total);
  }, [total]);

  useEffect(() => {
    if (pausado || total <= 1) return;
    const id = setInterval(() => setAtual((a) => (a + 1) % total), 6000);
    return () => clearInterval(id);
  }, [pausado, total]);

  if (!total) return null;
  const p = posts[Math.min(atual, total - 1)];

  return (
    <section
      className="relative px-4 py-5 sm:px-6 md:py-7 lg:px-8"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel"
      aria-label="Principais manchetes"
    >
      <div className="relative mx-auto max-w-[1740px]">
        <Link
          href={`/noticia/${p.slug}`}
          className="group relative block min-h-[430px] overflow-hidden border border-arcade bg-ink shadow-[0_0_42px_rgba(46,232,108,.13)] sm:min-h-[500px] lg:min-h-[570px] xl:min-h-[620px]"
          style={{ clipPath: "polygon(7% 0,100% 0,100% 88%,94% 100%,0 100%,0 18%)" }}
        >
          {p.image ? (
            <img
              src={p.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.012]"
              style={{ objectPosition: p.imagePos || p.imagePosition || "center center" }}
            />
          ) : (
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.cover?.[0] || "#111"}, ${p.cover?.[1] || "#222"})` }} />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 z-10 w-full px-6 pb-8 pt-24 sm:px-9 sm:pb-10 md:px-12 lg:max-w-[72%] lg:px-14 lg:pb-12 xl:max-w-[66%] xl:px-16">
            <CategoryTag category={p.category} />
            <h2 className="mt-4 font-display text-[2rem] leading-[1.02] text-paper drop-shadow-[0_3px_16px_rgba(0,0,0,.95)] sm:text-[2.45rem] md:text-[3rem] lg:text-[3.45rem] xl:text-[3.8rem]">
              {p.title}
            </h2>
            <p className="mt-4 hidden max-w-[900px] text-base leading-[1.55] text-paper/85 drop-shadow-[0_2px_10px_rgba(0,0,0,.9)] sm:block md:text-lg lg:text-xl">
              {p.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[.13em] text-paper/80 sm:text-xs">
              <span className="text-arcade">▣</span><span>{p.date}</span>
              <span className="text-arcade">◷</span><span>{p.readTime} de leitura</span>
            </div>
          </div>
        </Link>

        {total > 1 && (
          <>
            <button onClick={() => ir(atual - 1)} aria-label="Manchete anterior" className="absolute left-[-14px] top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-arcade bg-ink/90 font-mono text-xl text-arcade backdrop-blur hover:bg-arcade hover:text-ink sm:left-[-20px] lg:h-14 lg:w-14">‹</button>
            <button onClick={() => ir(atual + 1)} aria-label="Próxima manchete" className="absolute right-[-14px] top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-arcade bg-ink/90 font-mono text-xl text-arcade backdrop-blur hover:bg-arcade hover:text-ink sm:right-[-20px] lg:h-14 lg:w-14">›</button>
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {posts.map((_, i) => (
                <button key={i} onClick={(e) => { e.preventDefault(); ir(i); }} aria-label={`Ir para manchete ${i + 1}`} className={`h-2.5 rounded-full transition-all ${i === atual ? "w-10 bg-arcade shadow-[0_0_10px_rgba(46,232,108,.65)]" : "w-2.5 bg-paper/30 hover:bg-paper/60"}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
