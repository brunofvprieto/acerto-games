import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import { NewsCard } from "../../components/Cards";

export const metadata = {
  title: "Artigos Especiais — Acerto Games",
  description:
    "Textos que vão além da notícia: memória afetiva, cultura gamer e as histórias por trás dos jogos que marcaram a gente.",
};

export default function Artigos() {
  const artigos = getAllPosts().filter((p) => p.category === "artigo");

  return (
    <main className="mx-auto max-w-6xl px-4">
      <section className="mt-8 overflow-hidden border border-[#4D9FFF]/50">
        <div
          className="p-8 md:p-12"
          style={{ background: "linear-gradient(135deg, #0E1B2E 0%, #10233A 55%, #0A0D10 100%)" }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#7DBBFF]">
            Acerto Games
          </p>
          <h1 className="mt-3 font-display text-4xl uppercase text-paper md:text-6xl">
            Artigos <span className="text-[#7DBBFF]">Especiais</span>
          </h1>
          <p className="mt-4 max-w-2xl text-paper/80">
            Aqui a gente desacelera. Enquanto o resto do site corre atrás da notícia do
            minuto, esta é a seção pra respirar e pensar sobre o que os games significam
            de verdade — a memória afetiva, a cultura, as histórias por trás dos
            controles. Textos pra ler com calma, de preferência com uma trilha de fundo.
          </p>
        </div>
      </section>

      <section className="py-10">
        {artigos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {artigos.map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <div className="border border-edge bg-surface p-8 text-center">
            <p className="font-display text-lg">Primeiro artigo a caminho. ✍️</p>
            <Link href="/" className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-arcade">
              ◂ Voltar para a home
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
