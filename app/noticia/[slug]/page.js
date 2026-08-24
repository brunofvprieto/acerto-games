import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "../../../lib/posts";
import { Cover, CategoryTag, Nota, NewsCard } from "../../../components/Cards";
import TweetEmbed from "../../../components/TweetEmbed";
import ShareButtons from "../../../components/ShareButtons";
import QRCode from "../../../components/QRCode";

function tweetId(texto) {
  const m = texto.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
  return m ? m[1] : null;
}

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
    authors: [{ name: post.author, url: "https://acertogames.com.br/autor/bruno-vazquez" }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publicadoEm,
      authors: [post.author],
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
      const pontos = palavras.filter((w) => texto.includes(w)).length * 2 + (p.category === post.category ? 1 : 0);
      return { p, pontos };
    })
    .sort((a, b) => b.pontos - a.pontos)
    .slice(0, 3)
    .map((x) => x.p);
}

export default function Noticia({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const isReview = post.category === "review";
  const isOpinion = post.category === "opinião";
  const tipoSchema = isReview ? "Review" : isOpinion ? "Article" : "NewsArticle";
  const dataPublicacao = post.publicadoEm || undefined;
  const dataModificacao = post.atualizadoEm || dataPublicacao;
  const urlCompleta = `https://acertogames.com.br/noticia/${post.slug}`;

  const schemaArtigo = {
    "@context": "https://schema.org",
    "@type": tipoSchema,
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://acertogames.com.br/autor/bruno-vazquez",
      jobTitle: "Jornalista e editor do Acerto Games",
    },
    publisher: {
      "@type": "Organization",
      name: "Acerto Games",
      url: "https://acertogames.com.br",
      logo: {
        "@type": "ImageObject",
        url: "https://acertogames.com.br/icon.png",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": urlCompleta },
    inLanguage: "pt-BR",
    ...(dataPublicacao ? { datePublished: dataPublicacao } : {}),
    ...(dataModificacao ? { dateModified: dataModificacao } : {}),
    ...(post.image ? { image: [post.image.startsWith("http") ? post.image : `https://acertogames.com.br${post.image}`] } : {}),
    ...(isReview
      ? {
          itemReviewed: {
            "@type": "VideoGame",
            name: post.jogoReviewado || post.title.replace(/^(Review|Análise|Crítica)[: \-]+/i, "").trim(),
          },
          ...(post.nota !== undefined
            ? {
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: post.nota,
                  bestRating: 10,
                  worstRating: 0,
                },
              }
            : {}),
          reviewBody: post.excerpt,
        }
      : {}),
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acerto Games", item: "https://acertogames.com.br/" },
      { "@type": "ListItem", position: 2, name: post.category === "opinião" ? "Opinião" : post.category === "review" ? "Reviews" : "Notícias", item: `https://acertogames.com.br/${post.category === "opinião" ? "opinioes" : post.category === "review" ? "reviews" : "noticias"}` },
      { "@type": "ListItem", position: 3, name: post.title, item: urlCompleta },
    ],
  };

  const leiaTambem = relacionadas(post);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArtigo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

      <Link href="/" className="font-mono text-xs uppercase tracking-widest text-dim hover:text-arcade">
        ◂ Voltar para a home
      </Link>

      <article className="mt-6">
        <CategoryTag category={post.category} />
        <h1 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{post.title}</h1>
        <p className="mt-3 text-lg text-dim">{post.excerpt}</p>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-dim">
          Por <Link href="/autor/bruno-vazquez" rel="author" className="text-paper hover:text-arcade">{post.author}</Link> · {post.date} · {post.readTime} de leitura
        </p>

        {isOpinion && (
          <aside className="mt-5 border-l-2 border-[#FF7A45] bg-surface px-4 py-3 text-sm leading-relaxed text-dim">
            <strong className="text-[#FF9A6B]">OPINIÃO DO ACERTO GAMES</strong><br />
            Este texto apresenta uma posição editorial. Os fatos e fontes são separados da interpretação do autor.
          </aside>
        )}

        <Cover colors={post.cover} image={post.image} position={post.imagePos} fit="contain" className="mt-6 aspect-video w-full" />
        {post.imageCredit && (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-dim">📷 {post.imageCredit}</p>
        )}

        {post.nota !== undefined && (
          <div className="mt-6 flex items-center gap-4 border border-edge bg-surface p-4">
            <Nota value={post.nota} size="lg" />
            <p className="font-mono text-sm uppercase tracking-wide text-dim">Nota final do Acerto Games</p>
          </div>
        )}

        <div className="mt-8 space-y-5 text-lg leading-relaxed">
          {post.body.map((paragraph, i) => {
            if (paragraph.startsWith("## ")) return <h2 key={i} className="font-display text-xl text-arcade pt-3">{paragraph.slice(3)}</h2>;
            if (paragraph.startsWith("img:")) {
              const [url, credito] = paragraph.slice(4).split("|").map((s) => s.trim());
              if (!url || (!url.startsWith("http") && !url.startsWith("/"))) return null;
              return <figure key={i}><img src={url} alt="" loading="lazy" className="w-full border border-edge" />{credito && <figcaption className="mt-1 font-mono text-[10px] uppercase tracking-widest text-dim">📷 {credito}</figcaption>}</figure>;
            }
            if (paragraph.startsWith("video:")) {
              const id = youTubeId(paragraph.slice(6).trim());
              if (!id) return null;
              return <div key={i} className="aspect-video"><iframe className="h-full w-full border border-edge" src={`https://www.youtube.com/embed/${id}`} title="Vídeo do YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>;
            }
            if (paragraph.startsWith("link:")) {
              const [texto, url] = paragraph.slice(5).split("|").map((s) => s.trim());
              if (!url || !url.startsWith("http")) return null;
              return <p key={i}><a href={url} className="text-arcade underline" target="_blank" rel="noopener noreferrer">{texto || url}</a></p>;
            }
            if (paragraph.startsWith("tweet:")) {
              const tid = tweetId(paragraph.slice(6).trim());
              if (!tid) return null;
              return <TweetEmbed key={i} tweetId={tid} />;
            }
            if (paragraph.startsWith("mp4:")) {
              const [src, legenda] = paragraph.slice(4).split("|").map((s) => s.trim());
              if (!src) return null;
              return <figure key={i} className="my-6"><video src={src} controls playsInline preload="metadata" className="w-full rounded-lg border border-edge bg-black">Seu navegador não suporta a reprodução de vídeo.</video>{legenda && <figcaption className="mt-2 font-mono text-xs uppercase tracking-widest text-dim">{legenda}</figcaption>}</figure>;
            }
            return <p key={i}>{paragraph}</p>;
          })}
        </div>

        <section className="mt-10 border border-edge bg-surface p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-arcade">Sobre o autor</p>
          <p className="mt-2 font-display text-lg uppercase">Bruno Vazquez</p>
          <p className="mt-2 text-sm leading-relaxed text-dim">
            Jornalista formado em 2008 e editor do Acerto Games, com 18 anos de experiência profissional.
            A cobertura combina apuração jornalística, experiência de jogador e análise da indústria.
          </p>
          <Link href="/autor/bruno-vazquez" className="mt-3 inline-block text-sm text-arcade underline">Ver perfil e matérias →</Link>
        </section>

        <ShareButtons slug={post.slug} titulo={post.title} />
        <QRCode url={urlCompleta} />

        {post.fonte && (
          <p className="mt-8 border-t border-edge pt-4 font-mono text-xs uppercase tracking-widest text-dim">
            Com informações de:{" "}
            {post.fonteUrl ? <a href={post.fonteUrl} className="text-arcade underline" target="_blank" rel="noopener noreferrer">{post.fonte}</a> : post.fonte}
          </p>
        )}
      </article>

      {leiaTambem.length > 0 && (
        <section className="mt-12 border-t border-edge pt-8">
          <h2 className="mb-4 font-display text-lg uppercase"><span className="text-arcade">▸</span> Leia também</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {leiaTambem.map((p) => <NewsCard key={p.slug} post={p} />)}
          </div>
        </section>
      )}
    </main>
  );
}
