"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CategoryTag } from "./Cards";

function Thumb({ post, className = "" }) {
  if (post.image) {
    return <img src={post.image} alt={post.imageAlt || post.title} className={`h-full w-full object-cover ${className}`} style={{ objectPosition: post.heroImagePos || post.imagePos || "center center" }} />;
  }
  return <div className={`h-full w-full ${className}`} style={{ background: `linear-gradient(135deg, ${post.cover?.[0] || "#111"}, ${post.cover?.[1] || "#222"})` }} />;
}

function HighlightCard({ post }) {
  return (
    <Link href={`/noticia/${post.slug}`} className="group relative min-h-0 overflow-hidden border border-edge bg-black transition-colors hover:border-arcade">
      <div className="absolute inset-0"><Thumb post={post} className="transition-transform duration-700 group-hover:scale-[1.03]" /></div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-3 xl:p-4">
        <h3 className="line-clamp-3 font-display text-[0.78rem] uppercase leading-[1.08] text-paper transition-colors group-hover:text-arcade xl:text-[0.92rem]">{post.title}</h3>
        <p className="mt-2 font-mono text-[8px] uppercase tracking-[.1em] text-paper/60">{post.date}</p>
      </div>
    </Link>
  );
}

function LatestItem({ post }) {
  return (
    <Link href={`/noticia/${post.slug}`} className="group grid min-h-0 grid-cols-[1fr_92px] gap-3 border-b border-edge/80 py-3 first:pt-0 last:border-b-0">
      <div className="min-w-0 self-center">
        <span className="font-mono text-[8px] font-bold uppercase tracking-[.12em] text-arcade">{post.category || "Notícia"}</span>
        <h3 className="mt-1 line-clamp-3 font-display text-[0.78rem] uppercase leading-[1.08] text-paper transition-colors group-hover:text-arcade xl:text-[0.86rem]">{post.title}</h3>
        <p className="mt-2 truncate font-mono text-[7px] uppercase tracking-[.08em] text-paper/50">{post.author ? `Por ${post.author}` : post.date}</p>
      </div>
      <div className="h-[58px] self-center overflow-hidden rounded-sm bg-surface xl:h-[64px]"><Thumb post={post} className="transition-transform duration-500 group-hover:scale-105" /></div>
    </Link>
  );
}

export default function HeroCarousel({ posts }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const destaques = posts?.slice(0, 5) || [];
  const ultimas = posts?.slice(5, 10) || [];
  const total = destaques.length;
  const ir = useCallback((i) => { if (total) setAtual(((i % total) + total) % total); }, [total]);

  useEffect(() => {
    if (pausado || total <= 1) return;
    const id = setInterval(() => setAtual((a) => (a + 1) % total), 6500);
    return () => clearInterval(id);
  }, [pausado, total]);

  const cardsInferiores = useMemo(() => destaques.length <= 1 ? [] : destaques.filter((_, i) => i !== atual).slice(0, 3), [destaques, atual]);
  if (!total) return null;
  const p = destaques[Math.min(atual, total - 1)];

  return (
    <section onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)} aria-roledescription="carrossel" aria-label="Principais manchetes" className="mx-auto w-full max-w-[1240px] px-4 py-3 sm:px-5 sm:py-4 lg:px-0">
      <div className="grid gap-4 lg:min-h-[580px] lg:grid-cols-[minmax(0,2.05fr)_minmax(280px,.95fr)] lg:items-stretch">
        <div className="min-h-0 lg:grid lg:grid-rows-[minmax(0,2.35fr)_minmax(150px,.95fr)] lg:gap-3 xl:gap-4">
          <div className="relative aspect-[4/5] min-h-0 max-h-[520px] overflow-hidden sm:aspect-[16/10] sm:max-h-none lg:aspect-auto lg:max-h-none">
            <Link href={`/noticia/${p.slug}`} className="group relative block h-full w-full overflow-hidden border border-arcade/80 bg-black shadow-[0_0_0_1px_rgba(46,232,108,.12),0_0_35px_rgba(46,232,108,.07)] transition-shadow hover:shadow-[0_0_0_1px_rgba(46,232,108,.5),0_0_50px_rgba(46,232,108,.14)]">
              <div className="absolute inset-0"><Thumb post={p} className="transition-transform duration-700 group-hover:scale-[1.015]" /></div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/0" />
              <div className="absolute inset-x-0 bottom-0 z-10 max-w-[92%] p-4 sm:max-w-[82%] sm:p-6 xl:p-7">
                <CategoryTag category={p.category} />
                <h2 className="mt-3 line-clamp-3 font-display text-xl uppercase leading-[1.02] text-paper transition-colors group-hover:text-arcade sm:text-2xl md:text-3xl xl:text-[2rem]">{p.title}</h2>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[8px] uppercase tracking-[.1em] text-paper/60"><span>{p.date}</span>{p.readTime && <span>{p.readTime} de leitura</span>}</div>
              </div>
            </Link>

            {total > 1 && <>
              <button onClick={() => ir(atual - 1)} aria-label="Manchete anterior" className="absolute left-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-arcade/70 bg-ink/85 font-mono text-lg text-arcade backdrop-blur transition-colors hover:bg-arcade hover:text-ink">‹</button>
              <button onClick={() => ir(atual + 1)} aria-label="Próxima manchete" className="absolute right-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-arcade/70 bg-ink/85 font-mono text-lg text-arcade backdrop-blur transition-colors hover:bg-arcade hover:text-ink">›</button>
              <div className="absolute bottom-3 right-3 z-30 flex gap-1.5 rounded-full bg-black/60 px-2.5 py-2 backdrop-blur">{destaques.map((_, i) => <button key={i} onClick={() => ir(i)} aria-label={`Ir para manchete ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === atual ? "w-7 bg-arcade" : "w-1.5 bg-paper/35 hover:bg-paper/60"}`} />)}</div>
            </>}
          </div>

          <div className="hidden min-h-0 grid-cols-3 gap-3 lg:grid xl:gap-4">
            {cardsInferiores.map((post) => <HighlightCard key={post.slug} post={post} />)}
          </div>
        </div>

        <aside className="min-h-0 border-t border-edge/70 pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0 xl:pl-5">
          <div className="flex h-full min-h-0 flex-col">
            <div className="mb-2 flex items-end justify-between">
              <h2 className="font-display text-lg uppercase leading-none text-paper xl:text-xl">Últimas notícias</h2>
              <span className="font-mono text-[8px] uppercase tracking-[.18em] text-arcade">Agora</span>
            </div>
            <div className="min-h-0 flex-1">{ultimas.map((post) => <LatestItem key={post.slug} post={post} />)}</div>
            <Link href="/noticias" className="mt-2 self-end font-mono text-[9px] font-bold uppercase tracking-[.14em] text-paper/60 transition-colors hover:text-arcade">Mais notícias ↓</Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
