import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import { ReviewCard } from "../../components/Cards";

export const metadata = {
  title: "Reviews — Acerto Games",
  description:
    "Todas as análises do Acerto Games num só lugar: a gente joga até o fim, dá a nota e explica o porquê — sem meio-termo.",
};

export default function Reviews() {
  const reviews = getAllPosts().filter((p) => p.category === "review");

  return (
    <main className="mx-auto max-w-6xl px-4">
      <section className="mt-8 overflow-hidden border border-violet/50">
        <div
          className="p-8 md:p-12"
          style={{ background: "linear-gradient(135deg, #16143A 0%, #12274A 55%, #0A0D10 100%)" }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet">
            Acerto Games
          </p>
          <h1 className="mt-3 font-display text-4xl uppercase text-white md:text-6xl">
            <span className="text-violet">Reviews</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Aqui é onde a gente para de noticiar e começa a julgar. Cada análise desta
            página nasceu de jogo zerado, anotação no caderno e opinião sem meio-termo —
            com a nota na frente e o porquê logo atrás. Se a gente cravou, é porque jogou.
          </p>
        </div>
      </section>

      <section className="py-10">
        {reviews.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((p) => (
              <ReviewCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <div className="border border-edge bg-surface p-8 text-center">
            <p className="font-display text-lg">Primeiro review a caminho. 🎮</p>
            <Link href="/" className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-arcade">
              ◂ Voltar para a home
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
