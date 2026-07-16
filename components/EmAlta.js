import Link from "next/link";
import { getAllPosts } from "../lib/posts";

const QUENTE = /gta|rockstar|playstation|ps5|xbox|nintendo|switch|zelda|mario|promoç|sale|desconto|grátis|lançamento|trailer|steam/i;

function tsDe(p) {
  if (p.publicadoEm) {
    const t = Date.parse(p.publicadoEm);
    if (!isNaN(t)) return t;
  }
  return 0;
}

export default function EmAlta() {
  const seteDias = Date.now() - 7 * 86400000;
  const recentes = getAllPosts().filter((p) => tsDe(p) === 0 || tsDe(p) >= seteDias);
  const quentes = recentes.filter((p) => QUENTE.test(`${p.title} ${p.excerpt}`));
  const frias = recentes.filter((p) => !QUENTE.test(`${p.title} ${p.excerpt}`));
  const posts = [...quentes, ...frias].slice(0, 5);
  if (posts.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="mb-4 font-display text-xl uppercase">
        <span className="text-arcade">🔥</span> Em alta na semana
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {posts.map((p, i) => (
          <Link
            key={p.slug}
            href={`/noticia/${p.slug}`}
            className="group flex gap-3 border border-edge bg-surface p-3 transition-colors hover:border-arcade lg:flex-col lg:gap-2"
          >
            <span className="font-display text-3xl leading-none text-arcade/50">
              {i + 1}
            </span>
            <div className="min-w-0">
              <h3 className="line-clamp-3 font-display text-sm leading-snug group-hover:text-arcade">
                {p.title}
              </h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-dim">
                {p.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
