import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "../../../lib/posts";
import { Cover, CategoryTag, Nota } from "../../../components/Cards";

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
  return { title: `${post.title} — Acerto Games`, description: post.excerpt };
}

export default function Noticia({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const schemaArtigo = {
    "@context": "https://schema.org",
    "@type": post.category === "review" ? "Review" : "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Acerto Games" },
    inLanguage: "pt-BR",
  };

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

        <Cover colors={post.cover} image={post.image} className="mt-6 h-64 md:h-80" />
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
    </main>
  );
}
