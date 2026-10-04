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
  const apoio = posts.filter((_, i) => i !== atual).slice(0, 4);

  return (
    <section className="border-b border-edge/70 py-7 md:py-10"
      onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel" aria-label="Principais manchetes">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-6">

        <div className="relative">
          <Link href={`/noticia/${p.slug}`} className="group relative block overflow-hidden border border-arcade bg-black shadow-[0_0_35px_rgba(46,232,108,.14)]" aria-label={p.title}>
            <div className="relative aspect-[16/7.6] w-full overflow-hidden bg-black">
              {p.image ? <>
                <div className="absolute inset-0 scale-105 bg-cover bg-center opacity-20 blur-3xl" style={{backgroundImage:`url(${p.image})`}} />
                <img key={p.slug} src={p.image} alt={p.imageAlt || ""} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]" style={{objectPosition:p.heroImagePos || p.imagePos || "center center"}} />
              </> : <div className="absolute inset-0" style={{background:`linear-gradient(135deg,${p.cover[0]},${p.cover[1]})`}} />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-8 lg:p-10">
                <CategoryTag category={p.category} />
                <h2 className="mt-3 max-w-4xl font-display text-[1.7rem] uppercase leading-[1.02] text-paper drop-shadow-[0_2px_8px_rgba(0,0,0,.95)] md:text-[2.35rem] lg:text-[2.8rem]">{p.title}</h2>
                <p className="mt-3 hidden max-w-3xl text-sm leading-relaxed text-paper/80 md:block lg:text-base">{p.excerpt}</p>
                <p className="mt-3 flex gap-5 font-mono text-[9px] uppercase tracking-[.16em] text-paper/60 md:text-[10px]"><span>▣ {p.date}</span><span>◷ {p.readTime} de leitura</span></p>
              </div>
            </div>
          </Link>

          {total > 1 && <>
            <button onClick={()=>ir(atual-1)} aria-label="Manchete anterior" className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-arcade bg-ink/85 px-4 py-3 text-lg text-arcade backdrop-blur hover:bg-arcade hover:text-ink">‹</button>
            <button onClick={()=>ir(atual+1)} aria-label="Próxima manchete" className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-arcade bg-ink/85 px-4 py-3 text-lg text-arcade backdrop-blur hover:bg-arcade hover:text-ink">›</button>
            <div className="absolute bottom-5 right-5 z-20 flex gap-2 md:bottom-8 md:right-8">{posts.map((_,i)=><button key={i} onClick={(e)=>{e.preventDefault();ir(i)}} aria-label={`Ir para manchete ${i+1}`} className={`h-2 rounded-full transition-all ${i===atual?"w-9 bg-arcade":"w-2 bg-paper/35 hover:bg-paper/70"}`} />)}</div>
          </>}
        </div>

        {apoio.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {apoio.map((n) => (
              <Link key={n.slug} href={`/noticia/${n.slug}`} className="group relative aspect-square overflow-hidden border border-edge bg-surface hover:border-arcade">
                {n.image ? <img src={n.image} alt={n.imageAlt || ""} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" style={{objectPosition:n.imagePos || "center center"}} /> : <div className="absolute inset-0" style={{background:`linear-gradient(135deg,${n.cover[0]},${n.cover[1]})`}} />}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                  <CategoryTag category={n.category} />
                  <h3 className="mt-2 line-clamp-3 font-display text-sm uppercase leading-tight text-paper drop-shadow md:text-base lg:text-lg">{n.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
