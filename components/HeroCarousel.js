"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CategoryTag, Cover } from "./Cards";

function MiniCard({ post }) {
  return (
    <Link href={`/noticia/${post.slug}`} className="group flex flex-col overflow-hidden border border-edge bg-surface transition-colors hover:border-arcade">
      <div className="relative h-[120px] shrink-0 sm:h-[130px]">
        <Cover colors={post.cover || ["#111","#222"]} image={post.image} position={post.imagePos} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2"><CategoryTag category={post.category} /></div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <h3 className="line-clamp-3 font-display text-xs leading-snug group-hover:text-arcade sm:text-sm">{post.title}</h3>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-dim">{post.date}</p>
      </div>
    </Link>
  );
}

export default function HeroCarousel({ posts }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = posts?.length || 0;
  const ir = useCallback((i) => { if (!total) return; setAtual(((i % total) + total) % total); }, [total]);

  useEffect(() => {
    if (pausado || total <= 1) return;
    const id = setInterval(() => setAtual((a) => (a + 1) % total), 6000);
    return () => clearInterval(id);
  }, [pausado, total]);

  if (!total) return null;
  const p = posts[Math.min(atual, total - 1)];
  const ultimas = posts.slice(0, 5);

  return (
    <section onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel" aria-label="Principais manchetes" className="py-5 sm:py-6">

      <div className="relative mx-auto px-8 sm:px-10">

        {total > 1 && (
          <button onClick={() => ir(atual - 1)} aria-label="Manchete anterior"
            className="absolute left-0 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-arcade bg-ink/90 font-mono text-xl text-arcade backdrop-blur transition-colors hover:bg-arcade hover:text-ink sm:h-12 sm:w-12">‹</button>
        )}

        <Link href={`/noticia/${p.slug}`}
          className="group relative block overflow-hidden border border-arcade/80 bg-black shadow-[0_0_0_1px_rgba(46,232,108,.12),0_0_40px_rgba(46,232,108,.08)] transition-shadow hover:shadow-[0_0_0_1px_rgba(46,232,108,.5),0_0_55px_rgba(46,232,108,.18)]"
          style={{ clipPath: "polygon(20px 0,100% 0,100% calc(100% - 20px),calc(100% - 20px) 100%,0 100%,0 20px)" }}>

          <div className="relative w-full bg-black" style={{ paddingBottom: "42%" }}>

            {p.image ? (
              <>
                <div className="absolute inset-y-0 right-0 w-[74%] overflow-hidden sm:w-[72%] md:w-[70%] lg:w-[68%]">
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-110 object-cover object-right opacity-35 blur-sm"
                  />
                </div>

                <div className="absolute inset-y-0 right-0 flex w-[74%] items-center justify-end overflow-hidden sm:w-[72%] md:w-[70%] lg:w-[68%]">
                  <img
                    src={p.image}
                    alt=""
                    className="h-full w-full object-contain object-right transition-transform duration-700 group-hover:scale-[1.012]"
                    style={{ objectPosition: p.heroImagePos || "right center" }}
                  />
                </div>
              </>
            ) : (
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${p.cover?.[0]||"#111"}, ${p.cover?.[1]||"#222"})` }} />
            )}

            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to right, #000 0%, #000 31%, rgba(0,0,0,0.94) 40%, rgba(0,0,0,0.72) 49%, rgba(0,0,0,0.34) 59%, rgba(0,0,0,0.08) 69%, transparent 78%)" }} />

            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%)" }} />

            <div className="absolute inset-y-0 left-0 z-10 flex w-[52%] flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 md:px-10 lg:px-12">
              <CategoryTag category={p.category} />
              <h2 className="mt-1.5 font-display text-[0.76rem] leading-[1.08] text-paper sm:mt-2 sm:text-[1.08rem] md:text-[1.45rem] lg:text-[1.7rem]">
                {p.title}
              </h2>
              <p className="mt-2 hidden text-[0.7rem] leading-[1.55] text-paper/80 sm:block md:text-[0.8rem] lg:text-[0.85rem]">
                {p.excerpt}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[7px] uppercase tracking-[.11em] text-paper/65 sm:mt-3 sm:gap-x-4 sm:text-[10px] sm:tracking-[.13em]">
                <span><span className="mr-1 text-arcade">▣</span>{p.date}</span>
                {p.readTime && <span><span className="mr-1 text-arcade">◷</span>{p.readTime} de leitura</span>}
              </div>
            </div>

          </div>
        </Link>

        {total > 1 && (
          <button onClick={() => ir(atual + 1)} aria-label="Próxima manchete"
            className="absolute right-0 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-arcade bg-ink/90 font-mono text-xl text-arcade backdrop-blur transition-colors hover:bg-arcade hover:text-ink sm:h-12 sm:w-12">›</button>
        )}
      </div>

      {total > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {posts.map((_, i) => (
            <button key={i} onClick={() => ir(i)} aria-label={`Ir para manchete ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === atual ? "w-10 bg-arcade shadow-[0_0_10px_rgba(46,232,108,.65)]" : "w-2.5 bg-paper/25 hover:bg-paper/50"}`} />
          ))}
        </div>
      )}

      {ultimas.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base uppercase sm:text-lg"><span className="mr-1 text-arcade">▸</span>Últimas Notícias</h2>
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
