import Link from "next/link";
import { getAllPosts } from "../lib/posts";
import HeaderSearch from "./HeaderSearch";

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
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-2 px-4 py-3 md:py-4">
        <Link href="/" className="logo-arcade text-xl">
          ACERTO<span className="text-arcade">GAMES</span>
        </Link>
        <div className="flex items-center gap-5 max-md:w-full max-md:order-last">
        <HeaderSearch />
        <nav className="flex items-center gap-5 font-mono text-xs uppercase tracking-widest text-dim max-md:w-full max-md:justify-between max-md:overflow-x-auto max-md:pb-1">
          <Link href="/buscar" aria-label="Buscar" className="md:hidden hover:text-arcade">🔍</Link>
          <Link href="/gta6" className="whitespace-nowrap text-[#FF2E97] hover:text-[#FF9AD1]">GTA 6</Link>
          <Link href="/especial-metal-gear" className="whitespace-nowrap text-[#E4C860] hover:text-paper">METAL GEAR</Link>
          <Link href="/artigos" className="whitespace-nowrap text-[#7DBBFF] hover:text-paper">ARTIGOS</Link>
          <Link href="/#noticias" className="whitespace-nowrap hover:text-paper">Notícias</Link>
          <Link href="/#reviews" className="whitespace-nowrap hover:text-paper">Reviews</Link>
          <Link href="/#retro" className="whitespace-nowrap hover:text-retro">Retrô</Link>
        </nav>
        </div>
      </div>
    </header>
  );
}
