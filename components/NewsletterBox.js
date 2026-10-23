import { newsletterAtiva } from "../lib/newsletter";
import NewsletterForm from "./NewsletterForm";

// Caixa de cadastro para o fim das matérias e para a home.
// Não renderiza nada enquanto a newsletter não estiver configurada.
export default function NewsletterBox({ origem = "materia", variante = "materia" }) {
  if (!newsletterAtiva()) return null;
  if (variante === "home") {
    return (
      <section className="py-8" aria-labelledby={`nl-titulo-${origem}`}>
        <div className="grid gap-5 border border-arcade/40 bg-surface p-5 md:grid-cols-[1.1fr_1fr] md:items-center md:p-7">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-arcade">Newsletter Acerto Games</p>
            <h2 id={`nl-titulo-${origem}`} className="mt-2 font-display text-xl uppercase md:text-2xl">
              Dê o start na informação certa
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-dim">
              Todo dia, um resumo com as principais notícias de games no seu e-mail. Grátis, e você cancela quando quiser.
            </p>
          </div>
          <NewsletterForm origem={origem} />
        </div>
      </section>
    );
  }
  return (
    <section className="mt-10 border border-edge bg-surface p-5" aria-labelledby={`nl-titulo-${origem}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-arcade">Newsletter Acerto Games</p>
      <h2 id={`nl-titulo-${origem}`} className="mt-2 font-display text-lg uppercase">
        Dê o start na informação certa
      </h2>
      <p className="mb-4 mt-2 text-sm leading-relaxed text-dim">
        Um resumo diário com as principais notícias de games, direto no seu e-mail.
      </p>
      <NewsletterForm origem={origem} />
    </section>
  );
}
