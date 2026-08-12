import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import { Cover, CategoryTag } from "../../components/Cards";

export const dynamic = "force-static";

export const metadata = {
  title: "Especiais — Acerto Games",
  description: "O acervo de especiais do Acerto Games: mergulhos profundos nas maiores sagas dos games.",
};

export default function EspeciaisPage() {
  const posts = getAllPosts();
  // capítulos de especiais e conteúdo retrô entram no acervo
  const especiais = posts.filter(
    (p) => p.category === "especial" || p.especial || p.category === "retrô"
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
        <Link href="/" className="hover:text-arcade">Início</Link>
        <span className="mx-2 text-dim/50">/</span>
        <span className="text-paper">Especiais</span>
      </nav>

      <h1 className="font-display text-3xl uppercase leading-none text-paper md:text-5xl">
        Antigos <span className="text-arcade">Especiais</span>
      </h1>
      <p className="mt-3 max-w-2xl text-dim">
        Todos os mergulhos profundos que a gente já fez nas maiores sagas dos games, reunidos num só lugar.
      </p>

      {/* destaque do especial em cartaz */}
      <Link
        href="/especial-metal-gear"
        className="group relative mt-8 flex min-h-[220px] flex-col justify-end overflow-hidden border border-[#C9A227]/50 p-6 transition-all hover:border-[#E4C860] md:min-h-[260px]"
      >
        <img
          src="/img/especiais/metal-gear-shinkawa.jpg"
          alt="Arte da saga Metal Gear por Yoji Shinkawa"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E4C860]">
            Especial em cartaz
          </p>
          <h2 className="mt-2 font-display text-3xl uppercase leading-none text-paper md:text-4xl">
            A Saga <span className="text-[#E4C860]">Metal Gear</span>
          </h2>
        </div>
      </Link>

      {/* grade com os capítulos/artigos */}
      {especiais.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {especiais.map((p) => (
            <Link
              key={p.slug}
              href={`/noticia/${p.slug}`}
              className="group flex flex-col border border-edge bg-surface transition-colors hover:border-arcade"
            >
              <Cover colors={p.cover} image={p.image} position={p.imagePos} className="h-40 w-full" />
              <div className="space-y-2 p-4">
                <CategoryTag category={p.category} />
                <h3 className="font-display leading-snug group-hover:text-arcade">
                  {p.title}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-wide text-dim">
                  {p.date} · {p.readTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
