export default function Footer() {
  return (
    <footer className="mt-16 border-t border-edge">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="logo-arcade text-base">
          ACERTO<span className="text-arcade">GAMES</span>
        </p>
        <p className="font-mono text-xs uppercase tracking-widest text-dim">
          © 2026 · Feito no Brasil · Insert coin to continue
        </p>
      </div>
    </footer>
  );
}
