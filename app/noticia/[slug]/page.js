import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "../../../lib/posts";
import { Cover, CategoryTag, Nota, NewsCard } from "../../../components/Cards";
import ShareButtons from "../../../components/ShareButtons";
import QRCode from "../../../components/QRCode";

function youTubeId(texto) {
  const m = texto.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/) || texto.match(/^([\w-]{11})$/);
  return m ? m[1] : null;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `/noticia/${post.slug}`;
  return {
    title: `${post.title} — Acerto Games`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

function relacionadas(post) {
  const palavras = post.title.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const texto = `${p.title} ${p.excerpt}`.toLowerCase();
      const pontos =
        palavras.filter((w) => texto.includes(w)).length * 2 +
        (p.category === post.category ? 1 : 0);
      return { p, pontos };
    })
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, 3)
    .map((x) => x.p);
}

export default function Noticia({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const schemaArtigo = {
    "@context": "https://schema.org",
    "@type": post.category === "review" ? "Review" : "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Acerto Games" },
    inLanguage: "pt-BR",
    ...(post.publicadoEm ? { datePublished: post.publicadoEm } : {}),
    ...(post.image ? { image: [post.image] } : {}),
  };

  const leiaTambem = relacionadas(post);

  return (
    <main className="pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArtigo) }}
      />

      {/* HERO editorial — imagem grande no topo com o título sobreposto */}
      <header className="relative min-h-[420px] w-full overflow-hidden md:min-h-[560px]">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: post.imagePos || "center" }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${post.cover[0]}, ${post.cover[1]})` }}
          />
        )}
        {/* gradientes pra dar legibilidade ao texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[420px] max-w-4xl flex-col justify-end px-4 pb-8 pt-24 md:min-h-[560px] md:pb-12">
          {/* breadcrumb */}
          <nav className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-paper/70">
            <Link href="/" className="hover:text-arcade">Início</Link>
            <span className="mx-2 text-paper/40">/</span>
            <Link href={`/#${post.category === "review" ? "reviews" : "noticias"}`} className="hover:text-arcade">
              {post.category === "review" ? "Reviews" : post.category === "retrô" ? "Retrô" : post.category === "especial" ? "Especiais" : "Notícias"}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <CategoryTag category={post.category} />
            {typeof post.nota === "number" && <Nota value={post.nota} size="sm" />}
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-3xl uppercase leading-[1.05] text-paper drop-shadow-lg md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-paper/85 md:text-lg">{post.excerpt}</p>
          <p className="mt-5 font-mono text-xs uppercase tracking-widest text-paper/70">
            Por {post.author} · {post.date} · {post.readTime} de leitura
          </p>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4">
        {post.imageCredit && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-dim">
            📷 {post.imageCredit}
          </p>
        )}


        {post.nota !== undefined && (
          <div className="mt-6 flex items-center gap-4 border border-edge bg-surface p-4">
            <Nota value={post.nota} size="lg" />
            <p className="font-mono text-sm uppercase tracking-wide text-dim">
              Nota final do Acerto Games
            </p>
          </div>
        )}

        <div className="mt-8 space-y-5 text-lg leading-relaxed">
          {post.body.map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={i} className="font-display text-xl text-arcade pt-3">
                  {paragraph.slice(3)}
                </h2>
              );
            }
            if (paragraph.startsWith("img:")) {
              const [url, credito] = paragraph.slice(4).split("|").map((s) => s.trim());
              if (!url || (!url.startsWith("http") && !url.startsWith("/"))) return null;
              return (
                <figure key={i}>
                  <img src={url} alt="" loading="lazy" className="w-full border border-edge" />
                  {credito && (
                    <figcaption className="mt-1 font-mono text-[10px] uppercase tracking-widest text-dim">
                      📷 {credito}
                    </figcaption>
                  )}
                </figure>
              );
            }
            if (paragraph.startsWith("video:")) {
              const id = youTubeId(paragraph.slice(6).trim());
              if (!id) return null;
              return (
                <div key={i} className="aspect-video">
                  <iframe
                    className="h-full w-full border border-edge"
                    src={`https://www.youtube.com/embed/${id}`}
                    title="Vídeo do YouTube"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            }
            if (paragraph.startsWith("link:")) {
              const [texto, url] = paragraph.slice(5).split("|").map((s) => s.trim());
              if (!url || !url.startsWith("http")) return null;
              return (
                <p key={i}>
                  <a
                    href={url}
                    className="text-arcade underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {texto || url}
                  </a>
                </p>
              );
            }
            if (paragraph.startsWith("mp4:")) {
              const [src, legenda] = paragraph.slice(4).split("|").map((s) => s.trim());
              if (!src) return null;
              return (
                <figure key={i} className="my-6">
                  <video
                    src={src}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full rounded-lg border border-edge bg-black"
                  >
                    Seu navegador não suporta a reprodução de vídeo.
                  </video>
                  {legenda && (
                    <figcaption className="mt-2 font-mono text-xs uppercase tracking-widest text-dim">
                      {legenda}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return <p key={i}>{paragraph}</p>;
          })}
        </div>

        <ShareButtons slug={post.slug} titulo={post.title} />

        <QRCode url={`https://acertogames.com.br/noticia/${post.slug}`} />

        {post.fonte && (
          <p className="mt-8 border-t border-edge pt-4 font-mono text-xs uppercase tracking-widest text-dim">
            Com informações de:{" "}
            {post.fonteUrl ? (
              <a href={post.fonteUrl} className="text-arcade underline" target="_blank" rel="noopener noreferrer">
                {post.fonte}
              </a>
            ) : (
              post.fonte
            )}
          </p>
        )}
      </article>

      {leiaTambem.length > 0 && (
        <section className="mt-12 border-t border-edge pt-8">
          <h2 className="mb-4 font-display text-lg uppercase">
            <span className="text-arcade">▸</span> Leia também
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leiaTambem.map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
