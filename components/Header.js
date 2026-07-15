import Link from "next/link";
import { getAllPosts } from "../lib/posts";

function Ticker() {
  const titulos = getAllPosts().slice(0, 5).map((p) => p.title);
  const base = titulos.length
    ? titulos
    : ["Acerto Games no ar — as primeiras matérias chegam em instantes"];
  const items = [...base, ...base]; // duplicado para loop contínuo
  return (
    <div className="bg-arcade text-ink overflow-hidden">
      <div className="flex items-stretch">
        <span className="shrink-0 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest bg-ink text-arcade">
          Últimas
        </span>
        <div className="relative flex-1 overflow-hidden py-1.5">
          <div className="ticker-track font-mono text-xs uppercase tracking-wide">
            {items.map((t, i) => (
              <span key={i} className="whitespace-nowrap">
                ▸ {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-ink/95 backdrop-blur">
      <Ticker />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="logo-arcade text-xl">
          ACERTO<span className="text-arcade">GAMES</span>
        </Link>
        <nav className="flex items-center gap-5 font-mono text-xs uppercase tracking-widest text-dim">
          <Link href="/buscar" aria-label="Buscar" className="hover:text-arcade">🔍</Link>
          <Link href="/gta6" className="text-[#FF2E97] hover:text-[#FF9AD1]">GTA 6</Link>
          <Link href="/#noticias" className="hover:text-paper">Notícias</Link>
          <Link href="/#reviews" className="hover:text-paper">Reviews</Link>
          <Link href="/#retro" className="hover:text-retro">Retrô</Link>
        </nav>
      </div>
    </header>
  );
}
