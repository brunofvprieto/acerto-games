import Link from "next/link";
import { getAllPosts } from "../../../lib/posts";
import { NewsCard } from "../../../components/Cards";

export const metadata = {
  title: "Bruno Vazquez — Acerto Games",
  description:
    "Perfil de Bruno Vazquez, jornalista formado em 2008 e editor do Acerto Games, com matérias, análises e opiniões sobre games e a indústria.",
};

export default function AutorBrunoVazquez() {
  const posts = getAllPosts().filter((p) => p.author === "Bruno Vazquez");

  const schemaPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bruno Vazquez",
    jobTitle: "Jornalista e editor do Acerto Games",
    url: "https://acertogames.com.br/autor/bruno-vazquez",
    worksFor: {
      "@type": "Organization",
      name: "Acerto Games",
      url: "https://acertogames.com.br",
    },
    description:
      "Jornalista formado em 2008 e editor do Acerto Games, com 18 anos de experiência profissional e cobertura dedicada ao universo dos games.",
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaPerson) }}
      />

      <section className="max-w-3xl border border-edge bg-surface p-7 md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-arcade">Autor</p>
        <h1 className="mt-3 font-display text-4xl uppercase md:text-5xl">Bruno Vazquez</h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-dim">
          Jornalista · formado em 2008 · 18 anos de experiência
        </p>
        <p className="mt-5 text-lg leading-relaxed text-dim">
          Jornalista formado em 2008 e editor do Acerto Games. A cobertura combina experiência de redação,
          uma vida inteira jogando e uma leitura crítica da indústria: não basta contar o que aconteceu;
          é preciso explicar por que aquilo importa para quem joga.
        </p>
        <p className="mt-4 text-base leading-relaxed text-dim">
          O foco é entender anúncios, decisões de mercado, mudanças tecnológicas e lançamentos a partir do
          ponto de vista do jogador — com atenção especial ao público brasileiro.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <div className="border border-edge p-4">
            <strong className="block font-display text-2xl text-arcade">2008</strong>
            <span className="font-mono text-[10px] uppercase tracking-widest text-dim">Formação em Jornalismo</span>
          </div>
          <div className="border border-edge p-4">
            <strong className="block font-display text-2xl text-arcade">18</strong>
            <span className="font-mono text-[10px] uppercase tracking-widest text-dim">Anos de experiência</span>
          </div>
          <div className="border border-edge p-4">
            <strong className="block font-display text-2xl text-arcade">BR</strong>
            <span className="font-mono text-[10px] uppercase tracking-widest text-dim">Olhar para o jogador brasileiro</span>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest">
          <Link href="/editorial" className="border border-edge px-4 py-2 hover:border-arcade hover:text-arcade">
            Política editorial
          </Link>
          <Link href="/opinioes" className="border border-[#FF7A45]/50 px-4 py-2 text-[#FF9A6B] hover:border-[#FF9A6B]">
            Ver opiniões
          </Link>
          <Link href="/sobre" className="border border-edge px-4 py-2 hover:border-arcade hover:text-arcade">
            Sobre o Acerto Games
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
