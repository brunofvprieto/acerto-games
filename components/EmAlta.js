import Link from "next/link";
import { getAllPosts } from "../lib/posts";
import { CategoryTag } from "./Cards";

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
        {posts.map((p, i) => {
          const fundo = p.image
            ? `url(${p.image}) ${p.imagePos || "center"} / cover no-repeat, linear-gradient(135deg, ${p.cover[0]}, ${p.cover[1]})`
            : `linear-gradient(135deg, ${p.cover[0]}, ${p.cover[1]})`;
          return (
            <Link
              key={p.slug}
              href={`/noticia/${p.slug}`}
              className="cover group relative block h-44 overflow-hidden border border-edge transition-all hover:border-arcade hover:shadow-[0_0_20px_rgba(46,232,108,0.2)] lg:h-52"
              style={{ background: fundo }}
            >
              {/* Gradiente pra leitura */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
              {/* Número do ranking */}
              <span className="absolute right-2 top-1 font-display text-4xl text-arcade/70 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {i + 1}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-3">
                <CategoryTag category={p.category} />
                <h3 className="mt-1.5 line-clamp-3 font-display text-sm leading-snug text-paper group-hover:text-arcade">
                  {p.title}
                </h3>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-dim">
                  {p.date}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
