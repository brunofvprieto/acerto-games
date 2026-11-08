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
      <section
        className="secao-banner relative overflow-hidden border-2"
        style={{ borderColor: e.cor, background: e.gradiente, boxShadow: `6px 6px 0 ${e.cor}55` }}
      >
        {/* Camadas decorativas: linhas de varredura e o nome da marca em marca d'água */}
        <div aria-hidden="true" className="secao-scanlines pointer-events-none absolute inset-0" />
        <span
          aria-hidden="true"
          className="logo-arcade pointer-events-none absolute -bottom-6 -left-3 select-none whitespace-nowrap text-[7rem] opacity-[0.07] [text-shadow:none] md:text-[11rem]"
        >
          {e.nome}
        </span>

        {e.consoleImg && (
          <div className="relative h-56 sm:h-72 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[48%]">
            <img
              src={e.consoleImg}
              alt={e.consoleAlt}
              className="secao-foto absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: e.consolePos || "center" }}
            />
          </div>
        )}

        <div className="relative p-7 md:w-[56%] md:p-10">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-paper/90">
            <span className="px-2 py-0.5 font-bold tracking-widest" style={{ background: e.corTexto, color: e.cor }}>
              Seção
            </span>
            Acerto Games
          </p>
          <h1 className="logo-arcade mt-4 text-5xl md:text-6xl">{e.nome}</h1>
          <span aria-hidden="true" className="mt-4 block h-1 w-20" style={{ background: e.corTexto }} />
          <div lang="pt-BR" className="mt-4 space-y-2 text-justify leading-relaxed text-paper/90 [hyphens:auto]">
            {e.bio.map((linha, i) => (
              <p key={i}>{linha}</p>
            ))}
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-widest">
            {[
              ["Origem", e.origem],
              ["Console atual", e.console],
              ["No Acerto", `${total} matérias`],
            ].map(([rotulo, valor]) => (
              <div key={rotulo} className="border border-white/20 bg-black/25 px-3 py-2 backdrop-blur-sm">
                <dt className="text-paper/60">{rotulo}</dt>
                <dd className="mt-1 text-[11px] font-bold leading-snug text-paper">{valor}</dd>
              </div>
            ))}
          </dl>
          {e.consoleImg && (
            <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-paper/50">Foto: Divulgação/{e.empresaCredito}</p>
          )}
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
