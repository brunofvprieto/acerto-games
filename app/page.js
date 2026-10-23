import Link from "next/link";
import { getAllPosts } from "../lib/posts";
import { Cover, CategoryTag, NewsCard, Nota } from "../components/Cards";
import CountdownGTA from "../components/CountdownGTA";
import CountdownZelda from "../components/CountdownZelda";
import HeroCarousel from "../components/HeroCarousel";
import NewsletterBox from "../components/NewsletterBox";
import OfertasAmazon from "../components/OfertasAmazon";
import ofertasData from "../content/ofertas.json";
import { imgOtimizada } from "../lib/img";

function FaixaNews({posts}) {
  const items=posts.filter(p=>p.image).slice(0,10);
  if (!items.length) return null;
  return (
    <section className="py-8" aria-label="Notícias">
      <div className="mb-5 flex items-end justify-between gap-3">
        <h2 className="text-5xl font-black tracking-[-.075em] text-paper sm:text-7xl lg:text-[6rem]">Notícias</h2>
        <Link href="/noticias" className="pb-2 text-sm font-bold uppercase tracking-wider text-arcade hover:text-paper">Mais notícias&nbsp; ›</Link>
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 sm:gap-6" style={{scrollbarWidth:"thin",scrollbarColor:"#2ee86c transparent"}}>
        {items.map((p)=><Link key={p.slug} href={`/noticia/${p.slug}`} className="group w-[83%] shrink-0 snap-start sm:w-[47%] lg:w-[32%]">
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-black">
            <img {...imgOtimizada(p.image,"(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw")} alt={p.imageAlt||p.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" style={{objectPosition:p.imagePos||"center"}} />
          </div>
          <h3 className="mt-4 text-lg font-bold leading-[1.3] text-paper transition-colors group-hover:text-arcade">{p.title}</h3>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-dim"><span className="mr-3 text-arcade">◆ ◆ ◆</span>{p.date}</p>
        </Link>)}
      </div>
    </section>
  );
}

function ArtigosEspeciais({posts}) {
  const items=posts.filter((p)=>["artigo","especial"].includes(p.category) && p.image).slice(0,12);
  if (!items.length) return null;
  return (
    <section className="py-8" aria-label="Artigos especiais">
      <div className="mb-5 flex items-end justify-between gap-3">
        <h2 className="text-[2.5rem] font-black leading-none tracking-[-.065em] text-paper sm:text-6xl lg:text-[5rem]">Artigos especiais</h2>
        <Link href="/artigos" className="shrink-0 pb-1 text-xs font-bold uppercase tracking-wider text-arcade hover:text-paper sm:text-sm">Mais artigos&nbsp; ›</Link>
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 sm:gap-6" style={{scrollbarWidth:"thin",scrollbarColor:"#2ee86c transparent"}}>
        {items.map((p)=><Link key={p.slug} href={`/noticia/${p.slug}`} className="group w-[83%] shrink-0 snap-start sm:w-[47%] lg:w-[32%]">
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-black">
            <img {...imgOtimizada(p.image,"(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw")} alt={p.imageAlt||p.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" style={{objectPosition:p.imagePos||"center"}} />
          </div>
          <h3 className="mt-4 text-lg font-bold leading-[1.3] text-paper transition-colors group-hover:text-arcade">{p.title}</h3>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-dim"><span className="mr-3 text-arcade">◆ ◆ ◆</span>{p.date}</p>
        </Link>)}
      </div>
      <Link href="/especial-metal-gear" className="mt-1 inline-block text-sm font-semibold text-[#E4C860] hover:text-paper">Conheça também o especial Metal Gear&nbsp; ›</Link>
    </section>
  );
}

function FaixaEditorial({ posts, titulo, href, mais, categorias, id }) {
  const items = posts.filter((p) => categorias.includes(p.category) && p.image).slice(0, 12);
  if (!items.length) return null;
  return (
    <section id={id} className="py-8" aria-label={titulo}>
      <div className="mb-5 flex items-end justify-between gap-3">
        <h2 className="text-[2.5rem] font-black leading-none tracking-[-.075em] text-paper sm:text-7xl lg:text-[6rem]">{titulo}</h2>
        <Link href={href} className="shrink-0 pb-2 text-xs font-bold uppercase tracking-wider text-arcade hover:text-paper sm:text-sm">{mais}&nbsp; ›</Link>
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 sm:gap-6" style={{scrollbarWidth:"thin",scrollbarColor:"#2ee86c transparent"}}>
        {items.map((p) => <Link key={p.slug} href={`/noticia/${p.slug}`} className="group w-[83%] shrink-0 snap-start sm:w-[47%] lg:w-[32%]">
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-black">
            <img {...imgOtimizada(p.image,"(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw")} alt={p.imageAlt||p.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" style={{objectPosition:p.imagePos||"center"}} />
          </div>
          <h3 className="mt-4 text-lg font-bold leading-[1.3] text-paper transition-colors group-hover:text-arcade">{p.title}</h3>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-dim"><span className="mr-3 text-arcade">◆ ◆ ◆</span>{p.date}{p.nota != null ? ` · Nota ${p.nota}` : ""}</p>
        </Link>)}
      </div>
    </section>
  );
}

function OpiniaoDestaque({ posts }) {
  return <FaixaEditorial posts={posts} titulo="Voz do Acerto" href="/opinioes" mais="Mais opiniões" categorias={["opinião"]} id="opinioes" />;
}

function ReviewDestaque({ posts }) {
  return <FaixaEditorial posts={posts} titulo="Reviews" href="/reviews" mais="Mais reviews" categorias={["review"]} id="reviews" />;
}

const ARTE_GTA6 = "/img/gta-6-lucia-jason-arte-oficial.jpg";

function SecaoGTA6() {
  return (
    <section className="py-8">
      <div className="overflow-hidden border border-[#FF2E97]/50">
        <div className="grid md:grid-cols-2">
          <Link href="/gta6" className="cover relative block min-h-52 md:min-h-full">
            <img {...imgOtimizada(ARTE_GTA6)} alt="Jason e Lucia, protagonistas de GTA 6" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-widest text-paper/70">Divulgação/Rockstar Games</span>
          </Link>
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

function SecaoZelda() {
  return (
    <section className="py-8">
      <div className="overflow-hidden border border-[#28E978]/50">
        <div className="grid md:grid-cols-2">
          <Link href="/noticias?busca=zelda" className="cover relative block min-h-52 md:min-h-full">
            <img {...imgOtimizada("/img/zelda-ocarina-remake-capa.webp")} alt="Link em The Legend of Zelda: Ocarina of Time" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-widest text-paper/70">Divulgação/Nintendo</span>
          </Link>
          <div className="flex flex-col justify-center gap-3 p-6 md:p-8" style={{ background: "linear-gradient(135deg, #071D12 0%, #0B2B1C 55%, #102A21 100%)" }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7CFFA8]">Especial · Contagem regressiva</p>
            <h2 className="font-display text-2xl uppercase leading-tight text-paper md:text-3xl">The Legend of Zelda: <span className="text-[#D7B45A]">Ocarina of Time</span></h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/60">Nintendo Switch 2 · 5 de novembro de 2026</p>
            <CountdownZelda compact />
            <Link href="/noticias?busca=zelda" className="mt-1 inline-block font-mono text-xs uppercase tracking-widest text-[#28E978] hover:text-[#7CFFA8]">Cobertura completa ▸</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteZerado() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
      <p className="logo-arcade text-3xl md:text-4xl">INSERT COIN</p>
      <p className="mt-6 max-w-md text-dim">O Acerto Games está no ar. As primeiras matérias chegam em instantes.</p>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-arcade">▸ Press start to continue</p>
    </main>
  );
}

export default function Home() {
  const posts = getAllPosts();
  if (posts.length === 0) return <SiteZerado />;

  const resto = posts.slice(5);
  const noticias = resto.filter(
    (p) => !["review", "retrô", "especial", "artigo", "opinião"].includes(p.category)
  );
  const retro = posts.filter((p) => p.category === "retrô");

  return (
    <main>
      <h1 className="sr-only">Acerto Games: notícias, análises, reviews e opinião sobre games</h1>
      <HeroCarousel posts={posts.slice(0, 10)} />
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-5 lg:px-0">
      <FaixaNews posts={posts.slice(5, 20)} />
      <NewsletterBox origem="home" variante="home" />
      <SecaoGTA6 />
      <ReviewDestaque posts={posts} />
      <SecaoZelda />
      <OfertasAmazon ofertas={ofertasData.ofertas} />
      <ArtigosEspeciais posts={posts} />
      <OpiniaoDestaque posts={posts} />
      <FaixaEditorial posts={noticias} titulo="Notícias" href="/noticias" mais="Mais notícias" categorias={["notícia", "noticias", "notícias", "news"]} id="noticias" />
      {retro.length > 0 && (
        <section id="retro" className="py-8">
          <h2 className="mb-4 font-display text-xl uppercase"><span className="text-retro">▸</span> Retrô</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {retro.map((p) => (
              <Link key={p.slug} href={`/noticia/${p.slug}`} className="group flex gap-4 border border-edge bg-surface p-4 transition-colors hover:border-retro">
                <Cover colors={p.cover} image={p.image} position={p.imagePos} className="h-24 w-24 shrink-0" />
                <div className="space-y-1.5">
                  <CategoryTag category={p.category} />
                  <h3 className="font-display leading-snug group-hover:text-retro">{p.title}</h3>
                  <p className="font-mono text-[11px] uppercase tracking-wide text-dim">{p.date} · {p.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      </div>
    </main>
  );
}
