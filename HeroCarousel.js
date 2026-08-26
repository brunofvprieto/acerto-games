"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { CategoryTag } from "./Cards";

function Slide({ p, ativo }) {
  return (
    <div
      className={`cover relative h-full w-full overflow-hidden border bg-ink transition-all duration-500 ${
        ativo
          ? "border-arcade shadow-[0_0_50px_rgba(46,232,108,0.28)]"
          : "border-edge"
      }`}
    >
      {p.image ? (
        <>
          <div
            className="absolute inset-0 scale-110 bg-cover bg-center opacity-35 blur-xl"
            style={{ backgroundImage: `url(${p.image})` }}
          />
          <img
            src={p.image}
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
            style={{ objectPosition: p.imagePos || "center" }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${p.cover[0]}, ${p.cover[1]})` }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 lg:p-10">
        <CategoryTag category={p.category} />
        <h2
          className={`mt-2 line-clamp-2 max-w-5xl font-display leading-tight text-paper ${
            ativo ? "text-xl md:text-4xl lg:text-5xl" : "text-base md:text-xl"
          }`}
        >
          {p.title}
        </h2>
        {ativo && (
          <>
            <p className="mt-3 hidden max-w-3xl text-dim md:line-clamp-2 md:block lg:text-lg">
              {p.excerpt}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-dim md:text-xs">
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

  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsMd(mq.matches);
    const handler = (e) => setIsMd(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Destaque maior no desktop, mantendo um pequeno "peek" dos slides vizinhos.
  const slideW = isMd ? 86 : 100;
  const offsetInicio = isMd ? 7 : 0;
  const translateX = offsetInicio - atual * slideW;

  return (
    <section
      className="relative py-8 md:py-10"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-roledescription="carrossel"
      aria-label="Principais manchetes"
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            height: isMd ? "clamp(520px, 52vw, 700px)" : "320px",
            transform: `translateX(${translateX}%)`,
          }}
        >
          {posts.map((p, i) => {
            const ativo = i === atual;
            return (
              <div
                key={p.slug}
                className="h-full shrink-0 px-1.5 transition-all duration-500 md:px-3"
                style={{ width: `${slideW}%` }}
              >
                <div
                  className={`h-full transition-all duration-500 ${
                    ativo ? "scale-100 opacity-100" : "scale-[0.94] opacity-35"
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
              </div>
            );
          })}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={() => ir(atual - 1)}
            aria-label="Manchete anterior"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-arcade/60 bg-ink/80 px-3.5 py-2.5 font-mono text-arcade backdrop-blur transition-all hover:bg-arcade hover:text-ink hover:shadow-[0_0_20px_rgba(46,232,108,0.5)] md:left-5"
          >
            ◂
          </button>
          <button
            onClick={() => ir(atual + 1)}
            aria-label="Próxima manchete"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-arcade/60 bg-ink/80 px-3.5 py-2.5 font-mono text-arcade backdrop-blur transition-all hover:bg-arcade hover:text-ink hover:shadow-[0_0_20px_rgba(46,232,108,0.5)] md:right-5"
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
                    ? "w-10 bg-arcade shadow-[0_0_10px_rgba(46,232,108,0.6)]"
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
