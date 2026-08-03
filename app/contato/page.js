import Link from "next/link";

export const metadata = {
  title: "Contato — Acerto Games",
  description:
    "Fale com a redação do Acerto Games: sugestões de pauta, correções, publicidade, parcerias e envio de material para review.",
};

export default function Contato() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="logo-arcade text-3xl">Contato</h1>

      <div className="mt-6 space-y-5 text-lg leading-relaxed">
        <p>
          O Acerto Games é um portal brasileiro independente sobre games, editado por{" "}
          <strong>Bruno Vazquez</strong>. A gente lê tudo que chega e responde — normalmente
          em até dois dias úteis.
        </p>

        <div className="border border-edge bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-dim">E-mail da redação</p>
          <p className="mt-1 font-display text-xl text-arcade">contato@acertogames.com.br</p>
          <p className="mt-3 text-base text-dim">
            Um endereço só, pra tudo. Ajuda muito se você colocar no assunto do e-mail o
            motivo do contato: PAUTA, CORREÇÃO, PUBLICIDADE ou REVIEW.
          </p>
        </div>

        <h2 className="font-display text-xl text-arcade pt-4">Sugestões de pauta</h2>
        <p>
          Viu algo que merece cobertura e ninguém noticiou? Manda. Interessa especialmente o
          que afeta o jogador brasileiro: mudança de preço, jogo chegando (ou não) com
          dublagem, promoção que exclui o Brasil, problema com loja ou console por aqui.
        </p>

        <h2 className="font-display text-xl text-arcade pt-4">Correções</h2>
        <p>
          Achou um erro numa matéria? Avisa que a gente corrige rápido e registra a correção
          no próprio texto. Se puder mandar o link da matéria e a fonte que mostra o dado
          certo, resolvemos mais rápido ainda. Nosso compromisso com apuração e correção está
          descrito na página{" "}
          <Link href="/sobre" className="text-arcade underline">
            Sobre
          </Link>
          .
        </p>

        <h2 className="font-display text-xl text-arcade pt-4">Publicidade e parcerias</h2>
        <p>
          Quer anunciar no Acerto Games ou propor uma parceria de conteúdo? Escreva com
          PUBLICIDADE no assunto e conte o que tem em mente. Uma regra que não muda:
          conteúdo patrocinado é sempre identificado como tal para o leitor, e anunciante
          nenhum interfere em pauta, apuração ou nota de review.
        </p>

        <h2 className="font-display text-xl text-arcade pt-4">Assessorias e estúdios</h2>
        <p>
          Releases, chaves de review, convites para eventos e material de imprensa são
          bem-vindos. Aceitamos cópias antecipadas para análise e informamos ao leitor
          quando a cópia foi cedida — mas isso não compra cobertura nem influencia a nota.
          Estúdios brasileiros e projetos independentes nacionais têm nossa atenção
          especial: se você faz jogo no Brasil, escreva.
        </p>

        <h2 className="font-display text-xl text-arcade pt-4">Privacidade</h2>
        <p className="text-base">
          Usamos seus dados de contato apenas para responder a sua mensagem. Detalhes em
          nossa{" "}
          <Link href="/politica-de-privacidade" className="text-arcade underline">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
