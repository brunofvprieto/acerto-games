import Link from "next/link";
import { newsletterAtiva } from "../../lib/newsletter";
import NewsletterForm from "../../components/NewsletterForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Newsletter | Acerto Games",
  description:
    "Receba no e-mail o resumo diário do Acerto Games: as principais notícias, lançamentos e análises do mundo dos games.",
  alternates: { canonical: "/newsletter" },
};

export default function Newsletter() {
  const ativa = newsletterAtiva();
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-arcade">Newsletter Acerto Games</p>
      <h1 className="logo-arcade mt-2 text-3xl">Dê o start na informação certa</h1>
      <p className="mt-4 text-lg leading-relaxed">
        Um resumo por dia com as principais notícias de games, os lançamentos mais importantes e as
        análises do Acerto Games, direto no seu e-mail. Sem spam e sem repetir o que você já viu.
      </p>

      <div className="mt-8 border border-edge bg-surface p-6">
        {ativa ? (
          <NewsletterForm origem="pagina" />
        ) : (
          <p className="text-dim">A newsletter abre em breve. Enquanto isso, acompanhe as notícias no site.</p>
        )}
      </div>

      <h2 className="mt-10 font-display text-lg text-arcade">O que você recebe</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
        <li>As notícias mais importantes do dia, com link para a matéria completa.</li>
        <li>Lançamentos, datas e preços no Brasil, quando fizer diferença para quem joga.</li>
        <li>Análises e reviews novos do Acerto Games.</li>
      </ul>

      <h2 className="mt-10 font-display text-lg text-arcade">Seus dados</h2>
      <p className="mt-3 leading-relaxed text-dim">
        Pedimos só o seu e-mail e enviamos uma mensagem para você confirmar a inscrição. Você pode
        cancelar quando quiser, no link no fim de cada e-mail. Veja os detalhes na{" "}
        <Link href="/politica-de-privacidade" className="underline hover:text-paper">
          Política de Privacidade
        </Link>
        .
      </p>
    </main>
  );
}
