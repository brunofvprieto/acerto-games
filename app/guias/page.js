import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import { NewsCard } from "../../components/Cards";

export const metadata = {
  alternates: { canonical: "/guias" },
  title: "Guias — Acerto Games",
  description:
    "Guias de jogos do Acerto Games: localização de tesouros, easter eggs, carros, armas e dicas para ir mais longe.",
};

const TIPOS = [
  ["tesouros", "Tesouros"],
  ["easter-eggs", "Easter eggs"],
  ["carros", "Carros"],
  ["armas", "Armas"],
  ["dicas", "Dicas"],
];

function filtro(href, ativo, texto) {
  return (
    <Link
      key={href}
      href={href}
      className={`border px-3 py-1 font-mono text-[11px] uppercase tracking-widest ${
        ativo ? "border-[#FFD23F] bg-[#FFD23F] text-ink" : "border-edge text-dim hover:border-[#FFD23F] hover:text-paper"
      }`}
    >
      {texto}
    </Link>
  );
}

export default function Guias({ searchParams = {} }) {
  const todos = getAllPosts().filter((p) => p.category === "guia");
  const jogos = [...new Set(todos.map((p) => p.jogo).filter(Boolean))].sort();
  const jogo = typeof searchParams.jogo === "string" ? searchParams.jogo : "";
  const tipo = typeof searchParams.tipo === "string" ? searchParams.tipo : "";
  const lista = todos.filter((p) => (!jogo || p.jogo === jogo) && (!tipo || p.tipoGuia === tipo));
  const url = (j, t) => {
    const q = new URLSearchParams();
    if (j) q.set("jogo", j);
    if (t) q.set("tipo", t);
    const s = q.toString();
    return s ? `/guias?${s}` : "/guias";
  };

  return (
    <main className="mx-auto max-w-6xl px-4">
      <section className="mt-8 overflow-hidden border border-[#FFD23F]/50">
        <div
          className="p-8 md:p-12"
          style={{ background: "linear-gradient(135deg, #2A2208 0%, #1E1A0C 55%, #0A0D10 100%)" }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#FFD23F]">Acerto Games</p>
          <h1 className="mt-3 font-display text-4xl uppercase text-paper md:text-6xl">
            <span className="text-[#FFD23F]">Guias</span>
          </h1>
          <p className="mt-4 max-w-2xl text-paper/80">
            Onde estão os tesouros, os carros raros, as armas e os segredos escondidos pelos
            desenvolvedores. Cada guia mostra o caminho com imagens, para você ir direto ao ponto.
          </p>
        </div>
      </section>

      {todos.length > 0 && (
        <section className="mt-6 space-y-3">
          {jogos.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {filtro(url("", tipo), !jogo, "Todos os jogos")}
              {jogos.map((j) => filtro(url(j, tipo), jogo === j, j))}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {filtro(url(jogo, ""), !tipo, "Tudo")}
            {TIPOS.map(([v, t]) => filtro(url(jogo, v), tipo === v, t))}
          </div>
        </section>
      )}

      <section className="py-10">
        {lista.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <div className="border border-edge bg-surface p-8 text-center">
            <p className="font-display text-lg">Nenhum guia aqui ainda.</p>
            <Link href="/guias" className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-[#FFD23F]">
              ◂ Ver todos os guias
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
