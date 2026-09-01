import Link from "next/link";

export const metadata = {
  title: "Imprensa & PR — Acerto Games",
  description:
    "Área profissional do Acerto Games para assessorias, publishers, desenvolvedoras e agências: press releases, review keys, eventos, entrevistas e parcerias editoriais.",
};

const assuntos = [
  ["PRESS RELEASES", "Notícias, anúncios, assets, press kits e comunicados oficiais para avaliação editorial."],
  ["REVIEW KEYS", "Códigos de jogos e acessos antecipados para análises, previews e cobertura editorial."],
  ["EVENTOS", "Convites para eventos presenciais e digitais, showcases, sessões de preview e apresentações."],
  ["ENTREVISTAS", "Entrevistas com desenvolvedores, produtores, diretores, artistas e outros profissionais da indústria."],
  ["INDIES BRASILEIROS", "Projetos e estúdios nacionais são bem-vindos. Queremos ampliar a visibilidade de quem desenvolve jogos no Brasil."],
  ["PARCERIAS", "Propostas institucionais, ações especiais e oportunidades de colaboração podem ser encaminhadas para avaliação."],
];

export default function Imprensa() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <section className="relative overflow-hidden border border-arcade bg-surface p-6 md:p-10">
        <div className="absolute right-0 top-0 h-28 w-28 border-b border-l border-arcade/30 bg-arcade/5" />
        <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-arcade">Acerto Games · Área profissional</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-6xl">IMPRENSA <span className="text-arcade">& PR</span></h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-dim">
          Este é o canal profissional do Acerto Games para assessorias de imprensa, publishers, desenvolvedoras, distribuidoras, agências e profissionais da indústria de games.
        </p>
        <a href="mailto:contato@acertogames.com.br?subject=IMPRENSA%20%2F%20PR" className="mt-7 inline-flex border border-arcade bg-arcade px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-ink transition hover:bg-transparent hover:text-arcade">
          Falar com a redação →
        </a>
      </section>

      <section className="mt-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-arcade">O que recebemos</p>
        <h2 className="mt-2 font-display text-3xl">CONTATO EDITORIAL</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assuntos.map(([titulo, texto]) => (
            <article key={titulo} className="border border-edge bg-surface p-5 transition hover:border-arcade">
              <h3 className="font-mono text-sm font-bold tracking-widest text-arcade">▸ {titulo}</h3>
              <p className="mt-3 leading-relaxed text-dim">{texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="border border-edge p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-dim">Reviews & acesso antecipado</p>
          <h2 className="mt-2 font-display text-2xl text-arcade">POLÍTICA DE KEYS</h2>
          <p className="mt-4 leading-relaxed">
            O Acerto Games aceita review keys, códigos promocionais, versões de preview e acessos antecipados. O fornecimento de uma cópia não garante publicação, prazo específico, avaliação positiva ou qualquer tipo de tratamento editorial favorável.
          </p>
          <p className="mt-3 leading-relaxed text-dim">
            Quando relevante, informamos ao leitor que o código ou acesso foi fornecido pela publisher, desenvolvedora ou assessoria. A independência editorial e a nota da análise não são negociáveis.
          </p>
        </div>

        <div className="border border-edge p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-dim">Para agilizar o contato</p>
          <h2 className="mt-2 font-display text-2xl text-arcade">ENVIO DE MATERIAL</h2>
          <p className="mt-4 leading-relaxed">Ao enviar uma pauta, recomendamos incluir release, data e horário de embargo quando houver, plataformas, assets em alta resolução, trailer oficial, links relevantes e contato responsável.</p>
          <p className="mt-3 leading-relaxed text-dim">Para pedidos de cobertura ou review, inclua também a plataforma disponível, janela de acesso e eventuais restrições de publicação.</p>
        </div>
      </section>

      <section className="mt-12 border-l-4 border-arcade bg-surface p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-dim">Contato direto</p>
        <h2 className="mt-2 font-display text-3xl">REDAÇÃO ACERTO GAMES</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-dim">Para press releases, review keys, convites, entrevistas e demais contatos profissionais, escreva diretamente para a redação.</p>
        <a href="mailto:contato@acertogames.com.br?subject=IMPRENSA%20%2F%20PR" className="mt-5 inline-block font-display text-xl text-arcade underline decoration-1 underline-offset-4">contato@acertogames.com.br</a>
        <p className="mt-5 font-mono text-xs uppercase tracking-widest text-dim">Assunto recomendado: IMPRENSA / PR — NOME DO JOGO OU EMPRESA</p>
      </section>

      <section className="mt-10 flex flex-wrap gap-5 border-t border-edge pt-6 font-mono text-xs uppercase tracking-widest">
        <Link href="/editorial" className="text-arcade hover:text-paper">Política editorial →</Link>
        <Link href="/sobre" className="text-arcade hover:text-paper">Sobre o Acerto Games →</Link>
        <Link href="/autor/bruno-vazquez" className="text-arcade hover:text-paper">Editor →</Link>
      </section>
    </main>
  );
}
