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
    const id = setInterval(() => setAtual((a) => (a + 1) % total), 6000);
    return () => clearInterval(id);
  }, [pausado, total]);

  if (!total) return null;
  const p = posts[atual];

  return (
    <section className="relative border-b border-edge/70 py-8 md:py-10"
      onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel" aria-label="Principais manchetes">
      <div className="mx-auto w-full max-w-[1500px] px-5 md:px-10">
        <Link href={`/noticia/${p.slug}`} className="group relative block overflow-hidden rounded-[10px] border border-arcade bg-black shadow-[0_0_35px_rgba(46,232,108,0.16)]" aria-label={p.title}>
          <div className="relative min-h-[470px] w-full overflow-hidden md:min-h-[560px] lg:min-h-[620px]">
            {p.image ? (
              <img key={p.slug} src={p.image} alt={p.imageAlt || ""} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.018]"
                style={{ objectPosition: p.heroImagePos || p.imagePos || "center center" }} />
            ) : (
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.cover[0]}, ${p.cover[1]})` }} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-9 lg:p-12">
              <CategoryTag category={p.category} />
              <h2 className="mt-4 max-w-5xl font-display text-[2rem] uppercase leading-[1.02] text-paper drop-shadow-[0_2px_8px_rgba(0,0,0,.9)] md:text-[2.65rem] lg:text-[3.15rem]">
                {p.title}
              </h2>
              <p className="mt-4 hidden max-w-3xl text-base leading-relaxed text-paper/85 md:block lg:text-lg">{p.excerpt}</p>
              <p className="mt-4 flex gap-5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/65 md:text-xs">
                <span>▣ {p.date}</span><span>◷ {p.readTime} de leitura</span>
              </p>
            </div>
          </div>
        </Link>
      </div>
      {total > 1 && <>
        <button onClick={() => ir(atual - 1)} aria-label="Manchete anterior" className="absolute left-7 top-1/2 z-20 -translate-y-1/2 rounded-full border border-arcade/80 bg-ink/80 px-4 py-3 font-mono text-lg text-arcade backdrop-blur hover:bg-arcade hover:text-ink md:left-12">‹</button>
        <button onClick={() => ir(atual + 1)} aria-label="Próxima manchete" className="absolute right-7 top-1/2 z-20 -translate-y-1/2 rounded-full border border-arcade/80 bg-ink/80 px-4 py-3 font-mono text-lg text-arcade backdrop-blur hover:bg-arcade hover:text-ink md:right-12">›</button>
        <div className="mt-5 flex justify-center gap-2">{posts.map((_,i)=><button key={i} onClick={()=>ir(i)} aria-label={`Ir para manchete ${i+1}`} className={`h-2 rounded-full transition-all ${i===atual?"w-10 bg-arcade shadow-[0_0_12px_rgba(46,232,108,.65)]":"w-2 bg-edge hover:bg-dim"}`} />)}</div>
      </>}
    </section>
  );
}
