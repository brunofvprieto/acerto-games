"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { CategoryTag } from "./Cards";

export default function HeroCarousel({ posts }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = posts.length;
  const ir = useCallback((i) => setAtual(((i % total) + total) % total), [total]);

  useEffect(() => {
    if (pausado || total <= 1) return;
    const id = setInterval(() => setAtual((a) => (a + 1) % total), 6500);
    return () => clearInterval(id);
  }, [pausado, total]);

  if (!total) return null;
  const p = posts[atual];

  return (
    <section className="relative border-b border-edge/70 py-7 md:py-9"
      onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel" aria-label="Principais manchetes">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8">
        <Link href={`/noticia/${p.slug}`} className="group relative block overflow-hidden rounded-[8px] border border-arcade bg-black shadow-[0_0_32px_rgba(46,232,108,0.14)]" aria-label={p.title}>
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
            {p.image ? (
              <>
                <div className="absolute inset-0 scale-105 bg-cover bg-center opacity-25 blur-2xl" style={{ backgroundImage: `url(${p.image})` }} />
                <img key={p.slug} src={p.image} alt={p.imageAlt || ""} className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.008]"
                  style={{ objectPosition: p.heroImagePos || p.imagePos || "center center" }} />
              </>
            ) : (
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.cover[0]}, ${p.cover[1]})` }} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-8 lg:p-10">
              <CategoryTag category={p.category} />
              <h2 className="mt-3 max-w-4xl font-display text-[1.7rem] uppercase leading-[1.03] text-paper drop-shadow-[0_2px_8px_rgba(0,0,0,.95)] md:text-[2.2rem] lg:text-[2.65rem]">
                {p.title}
              </h2>
              <p className="mt-3 hidden max-w-3xl text-sm leading-relaxed text-paper/80 md:block lg:text-base">{p.excerpt}</p>
              <p className="mt-3 flex gap-5 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/60 md:text-[10px]">
                <span>▣ {p.date}</span><span>◷ {p.readTime} de leitura</span>
              </p>
            </div>
          </div>
        </Link>
      </div>
      {total > 1 && <>
        <button onClick={() => ir(atual - 1)} aria-label="Manchete anterior" className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full border border-arcade/80 bg-ink/85 px-4 py-3 font-mono text-lg text-arcade backdrop-blur hover:bg-arcade hover:text-ink md:left-10">‹</button>
        <button onClick={() => ir(atual + 1)} aria-label="Próxima manchete" className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full border border-arcade/80 bg-ink/85 px-4 py-3 font-mono text-lg text-arcade backdrop-blur hover:bg-arcade hover:text-ink md:right-10">›</button>
        <div className="mt-5 flex justify-center gap-2">{posts.map((_,i)=><button key={i} onClick={()=>ir(i)} aria-label={`Ir para manchete ${i+1}`} className={`h-2 rounded-full transition-all ${i===atual?"w-10 bg-arcade shadow-[0_0_12px_rgba(46,232,108,.65)]":"w-2 bg-edge hover:bg-dim"}`} />)}</div>
      </>}
    </section>
  );
}
