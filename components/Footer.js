import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-edge">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="logo-arcade text-base">
          ACERTO<span className="text-arcade">GAMES</span>
        </p>
        <nav className="flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-widest text-dim">
          <Link href="/gta6" className="text-[#FF2E97] hover:text-[#FF9AD1]">GTA 6</Link>
          <Link href="/sobre" className="hover:text-paper">Sobre</Link>
          <Link href="/contato" className="hover:text-paper">Contato</Link>
          <Link href="/politica-de-privacidade" className="hover:text-paper">Privacidade</Link>
        </nav>
        <p className="font-mono text-xs uppercase tracking-widest text-dim">
          © 2026 · Feito no Brasil
        </p>
      </div>
    </footer>
  );
}
