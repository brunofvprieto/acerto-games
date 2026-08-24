import Link from "next/link";
import { getAllPosts } from "../../../lib/posts";
import { NewsCard } from "../../../components/Cards";

export const metadata = {
  title: "Bruno Vazquez — Acerto Games",
  description:
    "Perfil editorial de Bruno Vazquez, editor do Acerto Games, com suas matérias, análises e opiniões sobre games e a indústria.",
};

export default function AutorBrunoVazquez() {
  const posts = getAllPosts().filter((p) => p.author === "Bruno Vazquez");

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="max-w-3xl border border-edge bg-surface p-7 md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-arcade">Autor</p>
        <h1 className="mt-3 font-display text-4xl uppercase md:text-5xl">Bruno Vazquez</h1>
        <p className="mt-5 text-lg leading-relaxed text-dim">
          Editor do Acerto Games. A cobertura combina notícia, contexto, análise e opinião,
          sempre com a preocupação de separar o que é fato do que é leitura editorial.
        </p>
        <p className="mt-4 text-base leading-relaxed text-dim">
          O foco é entender não apenas o que aconteceu na indústria dos games, mas o que cada
          anúncio, decisão de mercado ou mudança tecnológica significa para quem joga —
          especialmente para o público brasileiro.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest">
          <Link href="/editorial" className="border border-edge px-4 py-2 hover:border-arcade hover:text-arcade">
            Política editorial
          </Link>
          <Link href="/opinioes" className="border border-[#FF7A45]/50 px-4 py-2 text-[#FF9A6B] hover:border-[#FF9A6B]">
            Ver opiniões
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl uppercase">
          <span className="text-arcade">▸</span> Textos de Bruno Vazquez
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 18).map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
