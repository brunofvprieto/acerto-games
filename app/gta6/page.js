import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import { NewsCard } from "../../components/Cards";
import CountdownGTA from "../../components/CountdownGTA";

export const metadata = {
  title: "GTA 6 — Especial Acerto Games",
  description:
    "Tudo sobre GTA 6 em um só lugar: contagem regressiva, notícias, trailers e o que sabemos sobre Vice City, Jason e Lucia.",
};

const REGEX_GTA = /gta\s*(6|vi)?\b|grand theft auto|rockstar/i;

function ehSobreGTA(p) {
  const texto = [p.title, p.excerpt, ...(Array.isArray(p.body) ? p.body : [])].join(" ");
  return REGEX_GTA.test(texto);
}

export default function HubGTA6() {
  const materias = getAllPosts().filter(ehSobreGTA);

  return (
    <main className="mx-auto max-w-6xl px-4">
      {/* Banner Vice City */}
      <section className="mt-8 overflow-hidden border border-[#FF2E97]/50">
        <div
          className="cover p-8 md:p-12"
          style={{ background: "linear-gradient(135deg, #FF2E97 0%, #7B2FBE 55%, #0E1B4D 100%)" }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper/90">
            Especial Acerto Games
          </p>
          <h1 className="logo-arcade mt-3 text-4xl md:text-6xl">GTA 6</h1>
          <p className="mt-4 max-w-xl text-paper/90">
            O maior lançamento da década tem endereço marcado: Vice City, 19 de
            novembro de 2026. Aqui você acompanha cada trailer, vazamento
            confirmado e movimento da Rockstar — com a contagem regressiva rodando.
          </p>
          <div className="mt-6">
            <CountdownGTA />
          </div>
        </div>
      </section>

      {/* Ficha rápida */}
      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Lançamento", "19 de novembro de 2026"],
          ["Plataformas", "PS5 e Xbox Series X|S"],
          ["Cenário", "Vice City, estado de Leonida"],
          ["Protagonistas", "Jason e Lucia"],
        ].map(([rotulo, valor]) => (
          <div key={rotulo} className="border border-edge bg-surface p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#FF9AD1]">
              {rotulo}
            </p>
            <p className="mt-1 font-display text-sm leading-snug">{valor}</p>
          </div>
        ))}
      </section>

      {/* Matérias sobre GTA 6 (automático) */}
      <section className="py-10">
        <h2 className="mb-4 font-display text-xl uppercase">
          <span className="text-[#FF2E97]">▸</span> Cobertura completa
        </h2>
        {materias.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materias.map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <div className="border border-edge bg-surface p-8 text-center">
            <p className="font-display text-lg">Radar ligado. 📡</p>
            <p className="mt-2 text-dim">
              Nossa redação monitora a Rockstar 24/7 — assim que sair novidade de
              GTA 6, ela aparece aqui automaticamente.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-arcade"
            >
              ◂ Voltar para as últimas notícias
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
