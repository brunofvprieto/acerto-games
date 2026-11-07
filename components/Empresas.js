import Link from "next/link";
import { NewsCard } from "./Cards";
import { EMPRESAS, empresasDoPost } from "../lib/empresas";

// Selo clicável da empresa (Nintendo, PlayStation, Xbox) exibido no topo da matéria.
export function EmpresaTags({ post }) {
  const empresas = empresasDoPost(post);
  if (!empresas.length) return null;
  return (
    <>
      {empresas.map((e) => (
        <Link
          key={e.slug}
          href={`/${e.slug}`}
          title={`Tudo sobre ${e.nome} no Acerto Games`}
          className="inline-block px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-opacity hover:opacity-80"
          style={{ background: e.cor, color: e.corTexto }}
        >
          {e.nome} ▸
        </Link>
      ))}
    </>
  );
}

// Página de seção de uma empresa: apresentação curta e todas as matérias relacionadas.
export function PaginaEmpresa({ slug, posts, pagina, totalPaginas, total }) {
  const e = EMPRESAS[slug];
  const linkDe = (n) => (n <= 1 ? `/${slug}` : `/${slug}/pagina/${n}`);
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="relative overflow-hidden border" style={{ borderColor: e.cor, background: e.gradiente }}>
        {e.consoleImg && (
          <div className="relative h-56 sm:h-72 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[46%]">
            <img
              src={e.consoleImg}
              alt={e.consoleAlt}
              className="secao-foto absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: e.consolePos || "center" }}
            />

          </div>
        )}
        <div className="relative p-8 md:w-[58%] md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper/90">Seção Acerto Games</p>
          <h1 className="logo-arcade mt-3 text-4xl md:text-5xl">{e.nome}</h1>
          <div lang="pt-BR" className="mt-4 space-y-2 text-justify leading-relaxed text-paper/90 [hyphens:auto]">
            {e.bio.map((linha, i) => (
              <p key={i}>{linha}</p>
            ))}
          </div>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-paper/80">
            Console atual: <span className="text-paper">{e.console}</span> · {total} matérias
            {e.consoleImg && <span className="block mt-1 text-paper/60">Foto: Divulgação/{e.empresaCredito}</span>}
          </p>
        </div>
      </section>

      <nav aria-label="Outras plataformas" className="mt-4 flex flex-wrap gap-2">
        {Object.values(EMPRESAS)
          .filter((o) => o.slug !== slug)
          .map((o) => (
            <Link
              key={o.slug}
              href={`/${o.slug}`}
              className="border border-edge bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-dim hover:text-paper"
            >
              {o.nome} ▸
            </Link>
          ))}
      </nav>

      <h2 className="mt-8 font-display text-2xl uppercase">
        <span style={{ color: e.cor }}>▸</span> Notícias de {e.nome}
      </h2>
      {totalPaginas > 1 && (
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-dim">
          Página {pagina} de {totalPaginas}
        </p>
      )}
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
