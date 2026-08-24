import Link from "next/link";

export const metadata = {
  title: "Política editorial — Acerto Games",
  description:
    "Como o Acerto Games apura, escreve, revisa, corrige e identifica conteúdo jornalístico e opinativo.",
};

export default function Editorial() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-arcade">Acerto Games</p>
      <h1 className="mt-3 font-display text-4xl">Política editorial</h1>
      <p className="mt-4 text-lg text-dim">
        O leitor precisa conseguir entender não só o que publicamos, mas como chegamos ao que publicamos.
      </p>

      <div className="mt-8 space-y-8 text-lg leading-relaxed">
        <section>
          <h2 className="font-display text-xl text-arcade">O que é notícia e o que é opinião?</h2>
          <p className="mt-3">
            Notícias apresentam fatos apurados e identificam suas fontes. Análises interpretam fatos e consequências. Opiniões assumem uma posição editorial. Reviews são avaliações baseadas em experiência com o jogo ou produto. O Acerto Games procura deixar essa diferença visível para o leitor.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-arcade">Fontes</h2>
          <p className="mt-3">
            Priorizamos fontes primárias: comunicados oficiais, páginas de desenvolvedores e fabricantes, relatórios financeiros, classificações etárias, trailers oficiais e entrevistas. Quando uma informação nasce em outro veículo, identificamos a origem e acrescentamos contexto próprio em vez de simplesmente reproduzir o texto.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-arcade">Rumores e vazamentos</h2>
          <p className="mt-3">
            Rumor é tratado como rumor. Vazamento não vira anúncio oficial só porque parece convincente. Quando não existe confirmação, isso aparece no título, no texto ou nos dois, conforme a importância da informação.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-arcade">Uso de inteligência artificial</h2>
          <p className="mt-3">
            Ferramentas de inteligência artificial podem ser usadas como apoio à pesquisa, organização, revisão e produção de rascunhos. A publicação continua sob responsabilidade editorial humana. A IA não é apresentada como autora e não deve fabricar experiência, citação, fonte, dado ou declaração.
          </p>
          <p className="mt-3">
            Quando uma matéria depende de experiência de primeira mão, essa experiência precisa existir de fato. Se não testamos um produto, não escrevemos como se tivéssemos testado.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-arcade">Opinião com responsabilidade</h2>
          <p className="mt-3">
            O Acerto Games não pretende ser neutro em textos de opinião. Pretende ser honesto. Uma posição editorial deve partir de fatos verificáveis, apresentar argumentos e, quando relevante, reconhecer o melhor contraponto. Discordar de uma empresa, jogo ou decisão não é motivo para distorcer informação.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-arcade">Correções</h2>
          <p className="mt-3">
            Se encontrarmos um erro factual, corrigimos o conteúdo. O leitor também pode avisar a redação pelo <Link href="/contato" className="text-arcade underline">formulário de contato</Link>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-arcade">Publicidade e independência editorial</h2>
          <p className="mt-3">
            Publicidade não deve determinar a conclusão de uma notícia, análise, opinião ou review. Quando houver relação comercial relevante com um conteúdo, ela deve ser informada de maneira clara ao leitor.
          </p>
        </section>
      </div>
    </main>
  );
}
