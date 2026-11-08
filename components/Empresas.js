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
      <section className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-ink md:min-h-[440px]">
        {/* Foto do console em tela cheia, escurecida à esquerda para o texto respirar */}
        {e.consoleImg && (
          <div className="relative h-56 sm:h-72 md:absolute md:inset-0 md:h-auto">
            <img
              src={e.consoleImg}
              alt={e.consoleAlt}
              className="absolute inset-0 h-full w-full object-cover md:left-[30%] md:w-[70%]"
              style={{ objectPosition: e.consolePos || "center" }}
            />
            <div aria-hidden="true" className="secao-veu absolute inset-0" />
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0"
          style={{ background: `radial-gradient(60% 80% at 0% 100%, ${e.cor}59 0%, transparent 70%)` }}
        />

        <div className="relative z-10 p-6 md:max-w-[56%] md:p-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-paper/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full" style={{ background: e.cor, boxShadow: `0 0 10px ${e.cor}` }} />
            Seção
          </p>
          <h1 className="mt-5 font-display text-5xl font-black leading-none tracking-tight text-paper md:text-7xl">
            {e.nome}
          </h1>
          <span
            aria-hidden="true"
            className="mt-5 block h-[3px] w-24 rounded-full"
            style={{ background: `linear-gradient(90deg, ${e.cor}, transparent)` }}
          />
          <div lang="pt-BR" className="mt-5 space-y-3 text-justify text-[15px] leading-relaxed text-paper/75 [hyphens:auto]">
            {e.bio.map((linha, i) => (
              <p key={i}>{linha}</p>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
            {[
              [e.ano, e.anoRotulo],
              [e.consoleCurto, "Console atual"],
              [total, "Matérias"],
            ].map(([valor, rotulo]) => (
              <div key={rotulo} className="min-w-0">
                <dd className="font-display text-xl font-black leading-tight text-paper md:text-2xl">{valor}</dd>
                <dt className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper/50">{rotulo}</dt>
              </div>
            ))}
          </dl>
          {e.consoleImg && (
            <p className="mt-5 font-mono text-[9px] uppercase tracking-widest text-paper/35">Foto: Divulgação/{e.empresaCredito}</p>
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
