import Link from "next/link";
import { getAllPosts } from "../lib/posts";
import { Cover, CategoryTag, NewsCard, Nota } from "../components/Cards";
import CountdownGTA from "../components/CountdownGTA";
import HeroCarousel from "../components/HeroCarousel";
import EmAlta from "../components/EmAlta";

function DoisEspeciais() {
  return (
    <section className="py-8">
      <h2 className="mb-4 font-display text-xl uppercase"><span className="text-arcade">◆</span> Especiais</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/especial-metal-gear" className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden border border-[#C9A227]/50 p-6 transition-all hover:border-[#E4C860] md:min-h-[340px]">
          <img src="/img/especiais/metal-gear-shinkawa.jpg" alt="Arte da saga Metal Gear por Yoji Shinkawa" className="absolute inset-0 h-full w-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E4C860]">Especial em cartaz</p>
            <h3 className="mt-2 font-display text-3xl uppercase leading-none text-paper md:text-4xl">A Saga <span className="text-[#E4C860]">Metal Gear</span></h3>
            <p className="mt-2 max-w-sm text-sm text-paper/80">De Shadow Moses ao campo de flores de Snake Eater: história, bastidores e a cronologia genial, jogo a jogo.</p>
            <span className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-[#E4C860]">Entrar no especial ▸</span>
          </div>
        </Link>
        <Link href="/artigos" className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden border border-[#4D9FFF]/40 bg-surface p-6 transition-all hover:border-[#7DBBFF] md:min-h-[340px]">
          <div className="absolute inset-0 bg-gradient-to-br from-surface via-ink to-ink opacity-90" />
          <div className="pointer-events-none absolute right-4 top-4 font-display text-[7rem] leading-none text-[#4D9FFF]/5 md:text-[9rem]">✦</div>
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7DBBFF]">Além da notícia</p>
            <h3 className="mt-2 font-display text-3xl uppercase leading-none text-paper md:text-4xl">Artigos <span className="text-[#7DBBFF]">Especiais</span></h3>
            <p className="mt-2 max-w-sm text-sm text-paper/70">Memória afetiva, cultura gamer e as histórias por trás dos jogos que marcaram a gente. Textos pra ler com calma.</p>
            <span className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-[#7DBBFF]">Ver os artigos ▸</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function OpiniaoDestaque({ posts }) {
  const opinion = posts.find((p) => p.category === "opinião");
  if (!opinion) return null;
  return (
    <section className="py-8">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="font-display text-xl uppercase"><span className="text-[#FF9A6B]">▸</span> Voz do Acerto</h2>
        <Link href="/opinioes" className="font-mono text-xs uppercase tracking-widest text-[#FF9A6B] hover:text-paper">Ver opiniões ▸</Link>
      </div>
      <Link href={`/noticia/${opinion.slug}`} className="group grid overflow-hidden border border-[#FF7A45]/50 bg-surface md:grid-cols-[1.15fr_1fr] hover:border-[#FF9A6B]">
        <div className="relative min-h-[240px]">
          <Cover colors={opinion.cover} image={opinion.image} position={opinion.imagePos} className="absolute inset-0 h-full w-full" />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF9A6B]">Opinião do Acerto Games</span>
          <h3 className="mt-3 font-display text-2xl uppercase leading-tight group-hover:text-[#FF9A6B] md:text-3xl">{opinion.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-dim md:text-base">{opinion.excerpt}</p>
          <span className="mt-5 font-mono text-xs uppercase tracking-widest text-[#FF9A6B]">Ler a análise ▸</span>
        </div>
      </Link>
    </section>
  );
}

function ReviewDestaque({ posts }) {
  const review = posts.find((p) => p.category === "review");
  if (!review) return null;
  const fundo = review.image ? `url(${review.image}) ${review.imagePos || "center"} / cover no-repeat` : `linear-gradient(135deg, ${review.cover[0]}, ${review.cover[1]})`;
  return (
    <section id="reviews" className="py-8">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="font-display text-xl uppercase"><span className="text-violet">▸</span> Reviews</h2>
        <Link href="/reviews" className="font-mono text-xs uppercase tracking-widest text-violet hover:text-paper">Ver todos ▸</Link>
      </div>
      <Link href={`/noticia/${review.slug}`} className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden border border-violet/50 p-6 transition-all hover:border-violet md:min-h-[400px] md:p-10" style={{ background: fundo }}>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
        {review.nota != null && <div className="absolute right-6 top-6 md:right-10 md:top-10"><Nota value={review.nota} size="lg" /></div>}
        <div className="relative max-w-3xl">
          <span className="inline-block bg-violet px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ink">Review</span>
          <h3 className="mt-3 font-display text-2xl uppercase leading-tight text-paper group-hover:text-violet md:text-4xl">{review.title}</h3>
          <p className="mt-3 max-w-2xl text-dim md:text-lg">{review.excerpt}</p>
          <span className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-violet">Ler o review ▸</span>
        </div>
      </Link>
    </section>
  );
}

const ARTE_GTA6 = "https://www.rockstargames.com/VI/-/opengraph-image.jpg?opengraph-image.0t8ty~nlmxq2s.jpg";

function SecaoGTA6() {
  return (
    <section className="py-8">
      <div className="overflow-hidden border border-[#FF2E97]/50">
        <div className="grid md:grid-cols-2">
          <Link href="/gta6" className="cover relative block min-h-52 md:min-h-full"><img src={ARTE_GTA6} alt="Jason e Lucia, protagonistas de GTA 6" className="absolute inset-0 h-full w-full object-cover" /><span className="absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-widest text-paper/70">Divulgação/Rockstar Games</span></Link>
          <div className="flex flex-col justify-center gap-3 p-6 md:p-8" style={{ background: "linear-gradient(135deg, #1A0A2E 0%, #0E1B4D 100%)" }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF9AD1]">Especial · Contagem regressiva</p>
            <h2 className="logo-arcade text-3xl">GTA 6</h2>
            <CountdownGTA compact />
            <Link href="/gta6" className="mt-1 inline-block font-mono text-xs uppercase tracking-widest text-[#FF2E97] hover:text-[#FF9AD1]">Cobertura completa ▸</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export const dynamic = "force-static";

function SiteZerado() {
  return <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center"><p className="logo-arcade text-3xl md:text-4xl">INSERT COIN</p><p className="mt-6 max-w-md text-dim">O Acerto Games está no ar. As primeiras matérias chegam em instantes — nossa redação já está apurando.</p><p className="mt-4 font-mono text-xs uppercase tracking-widest text-arcade">▸ Press start to continue</p></main>;
}

export default function Home() {
  const posts = getAllPosts();
  if (posts.length === 0) return <SiteZerado />;
  const resto = posts.slice(5);
  const noticias = resto.filter((p) => !["review", "retrô", "especial", "artigo", "opinião"].includes(p.category));
  const retro = posts.filter((p) => p.category === "retrô");

  return (
    <main className="mx-auto max-w-6xl px-4">
      <HeroCarousel posts={posts.slice(0, 5)} />
      <SecaoGTA6 />
      <EmAlta />
      <DoisEspeciais />
      <OpiniaoDestaque posts={posts} />
      <ReviewDestaque posts={posts} />
      {noticias.length > 0 && (
        <section id="noticias" className="py-8">
          <h2 className="mb-4 font-display text-xl uppercase"><span className="text-arcade">▸</span> Notícias</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{noticias.slice(0, 12).map((p) => <NewsCard key={p.slug} post={p} />)}</div>
          <div className="mt-6 text-center"><Link href="/noticias" className="inline-block border border-edge bg-surface px-6 py-3 font-mono text-xs uppercase tracking-widest text-arcade hover:border-arcade">Ver todas as notícias ▸</Link></div>
        </section>
      )}
      {retro.length > 0 && (
        <section id="retro" className="py-8">
          <h2 className="mb-4 font-display text-xl uppercase"><span className="text-retro">▸</span> Retrô</h2>
          <div className="grid gap-4 md:grid-cols-2">{retro.map((p) => <Link key={p.slug} href={`/noticia/${p.slug}`} className="group flex gap-4 border border-edge bg-surface p-4 transition-colors hover:border-retro"><Cover colors={p.cover} image={p.image} position={p.imagePos} className="h-24 w-24 shrink-0" /><div className="space-y-1.5"><CategoryTag category={p.category} /><h3 className="font-display leading-snug group-hover:text-retro">{p.title}</h3><p className="font-mono text-[11px] uppercase tracking-wide text-dim">{p.date} · {p.readTime}</p></div></Link>)}</div>
        </section>
      )}
    </main>
  );
}