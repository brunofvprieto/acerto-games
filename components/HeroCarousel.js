"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { CategoryTag } from "./Cards";

function Slide({ p, ativo }) {
  const fundo = p.image
    ? `url(${p.image}) ${p.imagePos || "center"} / cover no-repeat, linear-gradient(135deg, ${p.cover[0]}, ${p.cover[1]})`
    : `linear-gradient(135deg, ${p.cover[0]}, ${p.cover[1]})`;
  return (
    <div
      className={`cover relative h-full w-full overflow-hidden border transition-all duration-500 ${
        ativo
          ? "border-arcade shadow-[0_0_40px_rgba(46,232,108,0.25)]"
          : "border-edge"
      }`}
      style={{ background: fundo }}
    >
      {/* Gradiente para leitura do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
        <CategoryTag category={p.category} />
        <h2
          className={`mt-2 line-clamp-2 font-display leading-tight text-paper ${
            ativo ? "text-xl md:text-4xl" : "text-lg md:text-2xl"
          }`}
        >
          {p.title}
        </h2>
        {ativo && (
          <>
            <p className="mt-2 hidden max-w-2xl text-dim md:line-clamp-2 md:block">
              {p.excerpt}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-dim md:text-xs">
              {p.date} · {p.readTime} de leitura
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function HeroCarousel({ posts }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = posts.length;

  const ir = useCallback(
    (i) => setAtual(((i % total) + total) % total),
    [total]
  );

  useEffect(() => {
    if (pausado || total <= 1) return;
    const id = setInterval(() => setAtual((a) => (a + 1) % total), 6000);
    return () => clearInterval(id);
  }, [pausado, total]);

  if (total === 0) return null;

  return (
    <section
      className="relative overflow-hidden py-8"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel"
      aria-label="Principais manchetes"
    >
      <div
        className="flex h-[380px] translate-x-[calc(-1*var(--i)*100%)] transition-transform duration-500 ease-out md:h-[520px] md:translate-x-[calc(15%-var(--i)*70%)]"
        style={{ "--i": atual }}
      >
        {posts.map((p, i) => {
          const ativo = i === atual;
          return (
            <div
              key={p.slug}
              className={`h-full w-full shrink-0 px-1.5 transition-all duration-500 md:w-[70%] md:px-3 ${
                ativo ? "scale-100 opacity-100" : "scale-[0.92] opacity-40"
              }`}
            >
              {ativo ? (
                <Link href={`/noticia/${p.slug}`} className="block h-full">
                  <Slide p={p} ativo />
                </Link>
              ) : (
                <button
                  onClick={() => ir(i)}
                  aria-label={`Ver manchete: ${p.title}`}
                  className="block h-full w-full cursor-pointer text-left"
                >
                  <Slide p={p} ativo={false} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {total > 1 && (
        <>
          <button
            onClick={() => ir(atual - 1)}
            aria-label="Manchete anterior"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-arcade/60 bg-ink/80 px-3.5 py-2.5 font-mono text-arcade backdrop-blur transition-all hover:bg-arcade hover:text-ink hover:shadow-[0_0_20px_rgba(46,232,108,0.5)]"
          >
            ◂
          </button>
          <button
            onClick={() => ir(atual + 1)}
            aria-label="Próxima manchete"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-arcade/60 bg-ink/80 px-3.5 py-2.5 font-mono text-arcade backdrop-blur transition-all hover:bg-arcade hover:text-ink hover:shadow-[0_0_20px_rgba(46,232,108,0.5)]"
          >
            ▸
          </button>

          <div className="mt-4 flex justify-center gap-2">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => ir(i)}
                aria-label={`Ir para manchete ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === atual
                    ? "w-8 bg-arcade shadow-[0_0_10px_rgba(46,232,108,0.6)]"
                    : "w-2 bg-edge hover:bg-dim"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
