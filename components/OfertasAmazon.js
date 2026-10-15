// Faixa de ofertas de afiliado em cards (foto, nome, preço opcional, botão).
// Mostra os produtos do tema pedido (mais os "geral"), ou todos se não houver tema.
export default function OfertasAmazon({ ofertas = [], tema, titulo = "Ofertas" }) {
  const lista = ofertas.filter((o) => o.link && o.titulo && (!tema || o.tema === tema || o.tema === "geral"));
  if (!lista.length) return null;

  return (
    <section className="py-8" aria-label={titulo}>
      <h2 className="mb-5 text-[2.5rem] font-black leading-none tracking-[-.075em] text-paper sm:text-7xl lg:text-[6rem]">{titulo}</h2>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5" style={{ scrollbarWidth: "thin", scrollbarColor: "#2ee86c transparent" }}>
        {lista.map((o) => (
          <a
            key={o.link}
            href={o.link}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className="group flex w-[62%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1120] transition-colors hover:border-arcade sm:w-[30%] lg:w-[19%]"
          >
            <div className="relative aspect-[4/5] bg-white">
              {o.desconto && <span className="absolute left-3 top-3 z-10 rounded-md bg-[#ff6a3d] px-2 py-1 text-xs font-bold text-white">{o.desconto}</span>}
              {o.imagem ? (
                <img src={o.imagem} alt={o.titulo} loading="lazy" decoding="async" className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]" />
              ) : null}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <h3 className="min-h-[3.2rem] rounded-lg bg-white/5 px-3 py-2 text-sm font-bold leading-snug text-paper">{o.titulo}</h3>
              <div className="mt-auto text-center">
                {o.precoAntigo && <p className="text-xs text-dim line-through">{o.precoAntigo}</p>}
                {o.preco ? (
                  <p className="text-2xl font-black text-arcade">{o.preco}</p>
                ) : (
                  <p className="rounded-lg bg-arcade px-3 py-2 text-sm font-bold uppercase tracking-wider text-black">Ver na Amazon</p>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
