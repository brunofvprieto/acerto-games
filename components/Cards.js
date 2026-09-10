import Link from "next/link";

export function Cover({ colors, image, position, className = "", fit = "cover", children }) {
  const paleta = Array.isArray(colors) && colors.length >= 2 ? colors : ["#111111", "#222222"];
  const gradiente = `linear-gradient(135deg, ${paleta[0]}, ${paleta[1]})`;

  // fit="contain": mostra a foto INTEIRA, sem cortar.
  // O fundo desfocado continua preenchendo as laterais, mas a imagem principal
  // usa decoding assíncrono para reduzir trabalho durante a renderização.
  if (image && fit === "contain") {
    return (
      <div className={`cover ${className}`} style={{ background: gradiente }}>
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-125 opacity-50 blur-2xl"
          style={{ background: `url(${image}) center / cover no-repeat` }}
        />
        <img
          src={image}
          alt=""
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain"
        />
        {children}
      </div>
    );
  }

  // Antes, as capas de todos os cards eram CSS background-image, que o navegador
  // baixava mesmo muito abaixo da dobra. Como <img>, o lazy loading passa a funcionar.
  return (
    <div className={`cover ${className}`} style={{ background: gradiente }}>
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: position || "center" }}
        />
      )}
      {children}
    </div>
  );
}

export function CategoryTag({ category }) {
  const styles = {
    notícia: "bg-arcade text-ink",
    review: "bg-violet text-paper",
    retrô: "bg-retro text-ink",
    especial: "bg-[#C9A227] text-ink",
    artigo: "bg-[#4D9FFF] text-ink",
    opinião: "bg-[#FF7A45] text-ink",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest ${styles[category] || styles["notícia"]}`}
    >
      {category}
    </span>
  );
}

export function Nota({ value, size = "md" }) {
  const sizes = {
    md: "h-12 w-12 text-lg",
    lg: "h-20 w-20 text-3xl",
  };
  return (
    <div
      className={`flex ${sizes[size]} items-center justify-center border-2 border-arcade bg-ink font-mono font-bold text-arcade shadow-[4px_4px_0_#FFD60A]`}
      aria-label={`Nota ${value}`}
    >
      {value.toFixed(1)}
    </div>
  );
}

export function NewsCard({ post }) {
  const hover = post.category === "opinião" ? "hover:border-[#FF7A45]" : "hover:border-arcade";
  return (
    <Link
      href={`/noticia/${post.slug}`}
      className={`group block border border-edge bg-surface transition-colors ${hover}`}
    >
      <Cover colors={post.cover} image={post.image} position={post.imagePos} className="h-40" />
      <div className="space-y-2 p-4">
        <CategoryTag category={post.category} />
        <h3 className="font-display text-lg leading-snug group-hover:text-paper">
          {post.title}
        </h3>
        <p className="text-sm text-dim">{post.excerpt}</p>
        <p className="font-mono text-[11px] uppercase tracking-wide text-dim">
          {post.date} · {post.readTime}
        </p>
      </div>
    </Link>
  );
}

export function ReviewCard({ post }) {
  return (
    <Link
      href={`/noticia/${post.slug}`}
      className="group relative block border border-edge bg-surface transition-colors hover:border-violet"
    >
      <Cover colors={post.cover} image={post.image} position={post.imagePos} className="h-40" />
      <div className="absolute right-4 top-28">
        <Nota value={post.nota} />
      </div>
      <div className="space-y-2 p-4 pt-6">
        <CategoryTag category={post.category} />
        <h3 className="font-display text-lg leading-snug group-hover:text-violet">
          {post.title}
        </h3>
        <p className="text-sm text-dim">{post.excerpt}</p>
        <p className="font-mono text-[11px] uppercase tracking-wide text-dim">
          {post.date} · {post.readTime}
        </p>
      </div>
    </Link>
  );
}
