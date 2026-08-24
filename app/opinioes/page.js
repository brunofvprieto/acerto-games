import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import { NewsCard } from "../../components/Cards";

export const metadata = {
  title: "Opiniões — Acerto Games",
  description:
    "Opiniões e análises do Acerto Games sobre jogos, indústria, consoles, mercado e cultura gamer.",
};

export default function Opinioes() {
  const opinioes = getAllPosts().filter((p) => p.category === "opinião");

  return (
    <main className="mx-auto max-w-6xl px-4">
      <section className="mt-8 overflow-hidden border border-[#FF7A45]/50">
        <div
          className="p-8 md:p-12"
          style={{ background: "linear-gradient(135deg, #2A1510 0%, #32170F 55%, #0A0D10 100%)" }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#FF9A6B]">
            Acerto Games
          </p>
          <h1 className="mt-3 font-display text-4xl uppercase text-paper md:text-6xl">
            <span className="text-[#FF9A6B]">Opinião</span>
          </h1>
          <p className="mt-4 max-w-2xl text-paper/80">
            Aqui a notícia é só o começo. A gente olha para os fatos, pesa os argumentos,
            discorda quando precisa e diz o que pensa — sempre deixando claro onde termina
            a informação e começa a nossa leitura.
          </p>
        </div>
      </section>

      <section className="py-10">
        {opinioes.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {opinioes.map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <div className="border border-edge bg-surface p-8">
            <p className="font-display text-xl">A primeira opinião está chegando.</p>
            <p className="mt-2 text-dim">
              Esta seção vai reunir os textos em que o Acerto Games assume uma posição e explica o porquê.
            </p>
            <Link href="/" className="mt-5 inline-block font-mono text-xs uppercase tracking-widest text-arcade">
              ◂ Voltar para a home
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
