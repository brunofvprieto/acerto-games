import Link from "next/link";
import { getAllPosts } from "../lib/posts";
import { Cover, CategoryTag, NewsCard, ReviewCard } from "../components/Cards";
import CountdownGTA from "../components/CountdownGTA";
import HeroCarousel from "../components/HeroCarousel";
import EmAlta from "../components/EmAlta";

function DoisEspeciais() {
  return (
    <section className="py-8">
      <h2 className="mb-4 font-display text-xl uppercase">
        <span className="text-arcade">◆</span> Especiais
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
      {/* Quadrado 1 — Especial Metal Gear (leva ao hub) */}
      <Link
        href="/especial-metal-gear"
        className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden border border-[#C9A227]/50 p-6 transition-all hover:border-[#E4C860]"
        style={{ background: "linear-gradient(135deg, #1A1D14 0%, #2E3320 55%, #0A0D10 100%)" }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E4C860]">
          Especial · Análise da saga
        </p>
        <h3 className="mt-2 font-display text-3xl uppercase leading-none text-paper md:text-4xl">
          A Saga <span className="text-[#E4C860]">Metal Gear</span>
        </h3>
        <p className="mt-2 text-sm text-paper/70">
          De Shadow Moses a Phantom Pain: história, bastidores e cronologia, jogo a jogo.
        </p>
        <span className="mt-3 font-mono text-xs uppercase tracking-widest text-[#E4C860]">
          Entrar no especial ▸
        </span>
      </Link>

      {/* Quadrado 2 — Artigos Especiais */}
      <Link
        href="/artigos"
        className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden border border-[#4D9FFF]/50 p-6 transition-all hover:border-[#7DBBFF]"
        style={{ background: "linear-gradient(135deg, #0E1B2E 0%, #10233A 55%, #0A0D10 100%)" }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7DBBFF]">
          Artigos · Cultura gamer
        </p>
        <h3 className="mt-2 font-display text-3xl uppercase leading-none text-paper md:text-4xl">
          Artigos <span className="text-[#7DBBFF]">Especiais</span>
        </h3>
        <p className="mt-2 text-sm text-paper/70">
          Textos que vão além da notícia: memória, cultura e as histórias por trás dos games que a gente ama.
        </p>
        <span className="mt-3 font-mono text-xs uppercase tracking-widest text-[#7DBBFF]">
          Ler os artigos ▸
        </span>
      </Link>
      </div>
    </section>
  );
}

const ARTE_GTA6 = "https://www.rockstargames.com/VI/-/opengraph-image.jpg?opengraph-image.0t8ty~nlmxq2s.jpg";
const REGEX_GTA = /gta\s*(6|vi)?\b|grand theft auto|rockstar/i;
const ehSobreGTA = (p) =>
  REGEX_GTA.test([p.title, p.excerpt, ...(Array.isArray(p.body) ? p.body : [])].join(" "));

function SecaoGTA6() {
  return (
    <section className="py-8">
      <div className="overflow-hidden border border-[#FF2E97]/50">
        <div className="grid md:grid-cols-2">
          <Link href="/gta6" className="cover relative block min-h-52 md:min-h-full">
            <img
              src={ARTE_GTA6}
              alt="Jason e Lucia, protagonistas de GTA 6"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-widest text-paper/70">
              Divulgação/Rockstar Games
            </span>
          </Link>
          <div
            className="flex flex-col justify-center gap-3 p-6 md:p-8"
            style={{ background: "linear-gradient(135deg, #1A0A2E 0%, #0E1B4D 100%)" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF9AD1]">
              Especial · Contagem regressiva
            </p>
            <h2 className="logo-arcade text-3xl">GTA 6</h2>
            <CountdownGTA compact />
            <Link
              href="/gta6"
              className="mt-1 inline-block font-mono text-xs uppercase tracking-widest text-[#FF2E97] hover:text-[#FF9AD1]"
            >
              Cobertura completa ▸
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export const dynamic = "force-static";

function SiteZerado() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <p className="logo-arcade text-3xl md:text-4xl">INSERT COIN</p>
      <p className="mt-6 max-w-md text-dim">
        O Acerto Games está no ar. As primeiras matérias chegam em instantes —
        nossa redação já está apurando.
      </p>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-arcade">
        ▸ Press start to continue
      </p>
    </main>
  );
}

export default function Home() {
  const posts = getAllPosts();
  if (posts.length === 0) return <SiteZerado />;

  const resto = posts.slice(5); // as 5 primeiras vivem no carrossel
  const noticias = resto.filter((p) => !["review", "retrô", "especial", "artigo"].includes(p.category));
  const reviews = posts.filter((p) => p.category === "review");
  const retro = posts.filter((p) => p.category === "retrô");

  return (
    <main className="mx-auto max-w-6xl px-4">
      {/* Carrossel de manchetes */}
      <HeroCarousel posts={posts.slice(0, 5)} />

      {/* GTA 6 — seção fixa */}
      <SecaoGTA6 />

      {/* Em alta na semana */}
      <EmAlta />

      {/* Especiais — dois quadrados */}
      <DoisEspeciais />

      {/* Notícias */}
      {noticias.length > 0 && (
        <section id="noticias" className="py-8">
          <h2 className="mb-4 font-display text-xl uppercase">
            <span className="text-arcade">▸</span> Notícias
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.slice(0, 12).map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/noticias"
              className="inline-block border border-edge bg-surface px-6 py-3 font-mono text-xs uppercase tracking-widest text-arcade hover:border-arcade"
            >
              Ver todas as notícias ▸
            </Link>
          </div>
        </section>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <section id="reviews" className="py-8">
          <h2 className="mb-4 font-display text-xl uppercase">
            <span className="text-violet">▸</span> Reviews
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((p) => (
              <ReviewCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* Retrô */}
      {retro.length > 0 && (
        <section id="retro" className="py-8">
          <h2 className="mb-4 font-display text-xl uppercase">
            <span className="text-retro">▸</span> Retrô
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {retro.map((p) => (
              <Link
                key={p.slug}
                href={`/noticia/${p.slug}`}
                className="group flex gap-4 border border-edge bg-surface p-4 transition-colors hover:border-retro"
              >
                <Cover colors={p.cover} image={p.image} position={p.imagePos} className="h-24 w-24 shrink-0" />
                <div className="space-y-1.5">
                  <CategoryTag category={p.category} />
                  <h3 className="font-display leading-snug group-hover:text-retro">
                    {p.title}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-dim">
                    {p.date} · {p.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}