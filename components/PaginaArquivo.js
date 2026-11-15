import Link from "next/link";
import { NewsCard } from "./Cards";

export default function PaginaArquivo({ posts, pagina, totalPaginas, base = "/noticias", titulo = "Todas as notícias", intro }) {
  const linkDe = (n) => (n <= 1 ? base : `${base}/pagina/${n}`);
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-2xl uppercase">
        <span className="text-arcade">▸</span> {titulo}
      </h1>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-dim">
        Página {pagina} de {totalPaginas}
      </p>
      {intro && <p className="mt-3 max-w-3xl text-sm text-dim">{intro}</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <NewsCard key={p.slug} post={p} />
        ))}
      </div>
      {totalPaginas > 1 && (
        <nav className="mt-8 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest">
          {pagina > 1 && (
            <Link href={linkDe(pagina - 1)} className="border border-edge bg-surface px-4 py-2 text-arcade hover:border-arcade">
              ◂ Mais recentes
            </Link>
          )}
          <span className="text-dim">{pagina} / {totalPaginas}</span>
          {pagina < totalPaginas && (
            <Link href={linkDe(pagina + 1)} className="border border-edge bg-surface px-4 py-2 text-arcade hover:border-arcade">
              Mais antigas ▸
            </Link>
          )}
        </nav>
      )}
    </main>
  );
}
