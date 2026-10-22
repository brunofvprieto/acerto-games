import Link from "next/link";

export const metadata = {
  title: "Inscrição confirmada | Acerto Games",
  robots: { index: false, follow: false },
};

export default function Confirmado() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-arcade">Newsletter Acerto Games</p>
      <h1 className="logo-arcade mt-2 text-3xl">Inscrição confirmada</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed">
        Pronto, seu e-mail está na lista. Você vai receber o resumo diário do Acerto Games a partir da
        próxima edição.
      </p>
      <Link href="/" className="mt-8 inline-block bg-arcade px-5 py-3 font-display text-sm uppercase tracking-wide text-ink">
        Ir para as notícias
      </Link>
    </main>
  );
}
