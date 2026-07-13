import Link from "next/link";
import { getAllPosts } from "../lib/posts";
import { Cover, CategoryTag, NewsCard, ReviewCard } from "../components/Cards";

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

  const [destaque, ...resto] = posts;
  const noticias = resto.filter((p) => p.category !== "review" && p.category !== "retrô");
  const reviews = posts.filter((p) => p.category === "review");
  const retro = posts.filter((p) => p.category === "retrô");

  return (
    <main className="mx-auto max-w-6xl px-4">
      {/* Manchete */}
      <section className="py-8">
        <Link
          href={`/noticia/${destaque.slug}`}
          className="group grid overflow-hidden border border-edge bg-surface md:grid-cols-2"
        >
          <Cover colors={destaque.cover} image={destaque.image} className="min-h-56 md:min-h-full" />
          <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
            <CategoryTag category={destaque.category} />
            <h1 className="font-display text-3xl leading-tight group-hover:text-arcade md:text-4xl">
              {destaque.title}
            </h1>
            <p className="text-dim">{destaque.excerpt}</p>
            <p className="font-mono text-xs uppercase tracking-widest text-dim">
              {destaque.date} · {destaque.readTime} de leitura
            </p>
          </div>
        </Link>
      </section>

      {/* Notícias */}
      {noticias.length > 0 && (
        <section id="noticias" className="py-8">
          <h2 className="mb-4 font-display text-xl uppercase">
            <span className="text-arcade">▸</span> Notícias
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}
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
                <Cover colors={p.cover} image={p.image} className="h-24 w-24 shrink-0" />
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
