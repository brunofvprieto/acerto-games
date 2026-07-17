import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "../../../lib/posts";
import { Cover, CategoryTag, Nota, NewsCard } from "../../../components/Cards";
import ShareButtons from "../../../components/ShareButtons";

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
    <main className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArtigo) }}
      />
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-widest text-dim hover:text-arcade"
      >
        ◂ Voltar para a home
      </Link>

      <article className="mt-6">
        <CategoryTag category={post.category} />
        <h1 className="mt-3 font-display text-3xl leading-tight md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-lg text-dim">{post.excerpt}</p>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-dim">
          Por {post.author} · {post.date} · {post.readTime} de leitura
        </p>

        <Cover colors={post.cover} image={post.image} className="mt-6 h-72 md:h-96 lg:h-[480px]" />
        {post.imageCredit && (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-dim">
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
            return <p key={i}>{paragraph}</p>;
          })}
        </div>

        <ShareButtons slug={post.slug} titulo={post.title} />

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
