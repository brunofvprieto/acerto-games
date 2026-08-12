import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import { NewsCard } from "../../components/Cards";

export const metadata = {
  title: "Especial: A Saga Metal Gear — Acerto Games",
  description:
    "Análise completa, história e cronologia da franquia Metal Gear, de Solid Snake a Big Boss. Sete capítulos que redefiniram o stealth.",
};

const CRONOLOGIA = [
  { ano: "1964", titulo: "Snake Eater", jogo: "Metal Gear Solid 3", nota: "A origem: Naked Snake vira Big Boss na Operação Snake Eater, no auge da Guerra Fria." },
  { ano: "1970", titulo: "Peace Walker", jogo: "Metal Gear Solid: Peace Walker", nota: "Big Boss ergue os Soldados Sem Fronteira e o embrião de sua própria nação militar." },
  { ano: "1975", titulo: "Ground Zeroes", jogo: "Metal Gear Solid V: Ground Zeroes", nota: "O prólogo da queda: a Mother Base é atacada e tudo desmorona." },
  { ano: "1984", titulo: "The Phantom Pain", jogo: "Metal Gear Solid V", nota: "Venom Snake e a vingança que fecha o arco de Big Boss." },
  { ano: "2005", titulo: "Shadow Moses", jogo: "Metal Gear Solid", nota: "Solid Snake enfrenta a FOXHOUND e descobre o projeto Les Enfants Terribles." },
  { ano: "2009", titulo: "Big Shell", jogo: "Metal Gear Solid 2: Sons of Liberty", nota: "Raiden, os Patriots e a mais ousada quebra de expectativa da série." },
  { ano: "2014", titulo: "Guns of the Patriots", jogo: "Metal Gear Solid 4", nota: "O último ato de Solid Snake e o encerramento da guerra sem fim." },
];

export default function HubMetalGear() {
  const capitulos = getAllPosts().filter((p) => p.especial === "metal-gear");

  return (
    <main className="mx-auto max-w-6xl px-4">
      <section className="mt-8 overflow-hidden border border-edge">
        <div className="cover relative p-8 md:p-12" style={{ background: "url(/img/especiais/metal-gear-hero.svg) center / cover no-repeat, linear-gradient(135deg, #1A1A1A, #0A0D10)" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-arcade">Especial Acerto Games</p>
            <h1 className="mt-3 font-display text-4xl uppercase leading-none text-paper md:text-6xl">A Saga<br />Metal Gear</h1>
            <p className="mt-4 max-w-2xl text-dim">Mais de três décadas, sete capítulos principais e uma história que amarra clonagem, guerra nuclear e o preço de ser um soldado. A gente mergulhou em cada jogo da saga de Hideo Kojima — com análise, contexto e os bastidores de como cada um nasceu. Sente o Codec tocar.</p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <h2 className="mb-4 font-display text-xl uppercase"><span className="text-arcade">▸</span> A cronologia definitiva</h2>
        <div className="aspect-video">
          <iframe className="h-full w-full border border-edge" src="https://www.youtube.com/embed/O_FWdBCOiXo" title="Cronologia da franquia Metal Gear" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      </section>

      <section className="py-8">
        <h2 className="mb-4 font-display text-xl uppercase"><span className="text-arcade">▸</span> A história em ordem</h2>
        <p className="mb-6 max-w-3xl text-dim">Curiosidade que confunde todo mundo: a ordem de lançamento é bem diferente da ordem dos acontecimentos. A saga começa em 1964 — mas só foi contada décadas depois. Veja a linha do tempo da narrativa:</p>
        <div className="space-y-2">
          {CRONOLOGIA.map((c) => (
            <div key={c.jogo} className="flex gap-4 border border-edge bg-surface p-4">
              <span className="font-display text-2xl text-arcade">{c.ano}</span>
              <div>
                <p className="font-display text-sm uppercase">{c.titulo} <span className="text-dim">· {c.jogo}</span></p>
                <p className="mt-1 text-sm text-dim">{c.nota}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8">
        <h2 className="mb-4 font-display text-xl uppercase"><span className="text-arcade">▸</span> As análises</h2>
        {capitulos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capitulos.map((p) => (<NewsCard key={p.slug} post={p} />))}
          </div>
        ) : (
          <div className="border border-edge bg-surface p-8 text-center">
            <p className="font-display text-lg">O primeiro capítulo está a caminho.</p>
            <p className="mt-2 text-dim">Duas análises novas por semana. A saga completa, do começo ao fim.</p>
          </div>
        )}
      </section>
    </main>
  );
}
