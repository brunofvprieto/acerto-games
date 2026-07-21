import Link from "next/link";
import { getAllPosts } from "../lib/posts";

// Capa do especial (arte hospedada na casa)
const ARTE_MGS = "/img/especiais/metal-gear-hero.svg";

export default function Especiais() {
  const partes = getAllPosts()
    .filter((p) => p.especial === "metal-gear")
    .length;

  return (
    <section className="py-8">
      <h2 className="mb-4 font-display text-xl uppercase">
        <span className="text-arcade">◆</span> Especiais
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Quadrado 1 — Especial Metal Gear (porta pro hub) */}
        <Link
          href="/especial-metal-gear"
          className="cover group relative block h-64 overflow-hidden border border-edge transition-all hover:border-arcade hover:shadow-[0_0_30px_rgba(46,232,108,0.25)] md:h-72"
          style={{
            background: `url(${ARTE_MGS}) center / cover no-repeat, linear-gradient(135deg, #1A1A1A, #0A0D10)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-arcade">
              Especial · Saga completa
            </p>
            <h3 className="mt-2 font-display text-3xl uppercase leading-none text-paper md:text-4xl">
              A Saga<br />Metal Gear
            </h3>
            <p className="mt-3 max-w-sm text-sm text-dim">
              Análise, história e cronologia dos sete capítulos que marcaram o
              stealth para sempre. De Shadow Moses a Phantom Pain.
            </p>
            <span className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-arcade">
              {partes > 0 ? `${partes} capítulo${partes > 1 ? "s" : ""} no ar ▸` : "Começa em breve ▸"}
            </span>
          </div>
        </Link>

        {/* Quadrado 2 — Em Breve */}
        <div
          className="relative flex h-64 items-center justify-center overflow-hidden border border-edge md:h-72"
          style={{ background: "linear-gradient(135deg, #0E2A45, #0A0D10)" }}
        >
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 6px)" }} />
          <div className="text-center">
            <p className="logo-arcade text-2xl md:text-3xl">EM BREVE</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-dim">
              Novo especial a caminho
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-arcade/60">
              ▸ Press start to continue
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
