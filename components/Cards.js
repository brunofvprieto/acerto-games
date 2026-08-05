import Link from "next/link";

export function Cover({ colors, image, position, className = "", children }) {
  const fundo = image
    ? `url(${image}) ${position || "center"} / cover no-repeat, linear-gradient(135deg, ${colors[0]}, ${colors[1]})`
    : `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
  return (
    <div className={`cover ${className}`} style={{ background: fundo }}>
      {children}
    </div>
  );
}

export function CategoryTag({ category }) {
  const styles = {
    notícia: "bg-arcade text-white",
    review: "bg-violet text-white",
    retrô: "bg-retro text-white",
    especial: "bg-[#8A6D12] text-white",
    artigo: "bg-[#1A5FC8] text-white",
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
      className={`flex ${sizes[size]} items-center justify-center border-2 border-arcade bg-shade font-mono font-bold text-white shadow-[4px_4px_0_#8A6D12]`}
      aria-label={`Nota ${value}`}
    >
      {value.toFixed(1)}
    </div>
  );
}

export function NewsCard({ post }) {
  return (
    <Link
      href={`/noticia/${post.slug}`}
      className="group block border border-edge bg-surface transition-colors hover:border-arcade"
    >
      <Cover colors={post.cover} image={post.image} position={post.imagePos} className="h-40" />
      <div className="space-y-2 p-4">
        <CategoryTag category={post.category} />
        <h3 className="font-display text-lg leading-snug group-hover:text-arcade">
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
