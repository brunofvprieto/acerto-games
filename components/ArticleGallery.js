export default function ArticleGallery({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="my-8">
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <figure key={`${item.url}-${index}`} className="overflow-hidden border border-edge bg-surface">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
              <img
                src={item.url}
                alt={item.alt || "Imagem da galeria"}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition duration-300 hover:scale-[1.02]"
              />
            </a>
            {item.credito && (
              <figcaption className="px-3 py-2 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-dim">
                📷 {item.credito}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
