import Link from "next/link";

export const metadata = {
  title: "Sobre — Acerto Games",
  description:
    "Conheça o Acerto Games, seu editor e a política de apuração do portal brasileiro independente de games.",
};

export default function Sobre() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-arcade">Quem somos</p>
      <h1 className="logo-arcade mt-2 text-3xl">Sobre o Acerto Games</h1>

      <div className="mt-6 space-y-5 text-lg leading-relaxed">
        <p>
          O <strong>Acerto Games</strong> é um portal brasileiro independente sobre o universo dos games:
          lançamentos, indústria, mercado, hardware, eSports, cultura gamer e a boa e velha nostalgia —
          das locadoras ao fliperama de ficha.
        </p>
        <p>
          A nossa pergunta editorial é simples: <strong>o que essa notícia muda para quem joga?</strong>
          Não queremos apenas repetir um anúncio. Sempre que a pauta permitir, acrescentamos contexto,
          comparação, impacto para o jogador brasileiro, leitura de mercado, explicação técnica ou uma
          posição editorial claramente identificada.
        </p>

        <section className="border border-edge bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-arcade">Quem está por trás</p>
          <h2 className="mt-2 font-display text-2xl uppercase">Bruno Vazquez</h2>
          <p className="mt-3 text-base leading-relaxed text-dim">
            Jornalista formado em <strong>2008</strong>, com <strong>18 anos de experiência</strong> em
            jornalismo. Editor do Acerto Games, Bruno combina a experiência profissional de redação com
            uma vida inteira acompanhando videogames — do Phantom System aos consoles atuais.
          </p>
          <p className="mt-3 text-base leading-relaxed text-dim">
            O trabalho editorial parte de uma ideia: informação precisa ser útil, mas jornalismo também
            pode ter personalidade. Por isso, notícia, análise, opinião e review são tratados como formatos
            diferentes, cada um com sua responsabilidade.
          </p>
          <Link href="/autor/bruno-vazquez" className="mt-4 inline-block text-sm text-arcade underline">
            Conheça o perfil do editor →
          </Link>
        </section>

        <h2 className="font-display text-xl text-arcade pt-4">Como apuramos</h2>
        <p>Nenhuma matéria deve nascer de uma simples troca de palavras em cima de outra matéria. O processo editorial prioriza:</p>
        <ul className="ml-5 list-disc space-y-2 text-base">
          <li><strong>Fonte primária primeiro:</strong> documentos oficiais, comunicados, páginas de produto, relatórios, entrevistas e materiais das próprias empresas quando disponíveis.</li>
          <li><strong>Apuração complementar:</strong> quando a pauta exige, cruzamos informações e buscamos fontes independentes para contextualizar o fato.</li>
          <li><strong>Valor próprio:</strong> a matéria precisa acrescentar contexto, comparação, consequência, leitura de mercado, serviço ou análise — não apenas recontar a fonte.</li>
          <li><strong>Rumor é rumor:</strong> vazamentos, boatos e especulações são identificados como tais. Nunca apresentamos especulação como fato confirmado.</li>
          <li><strong>Brasil em primeiro plano:</strong> preço, disponibilidade, idioma, servidores, datas e condições para o público brasileiro entram no texto sempre que houver informação confiável.</li>
        </ul>

        <h2 className="font-display text-xl text-arcade pt-4">Notícia, análise e opinião</h2>
        <p>
          O Acerto Games separa os formatos. <strong>Notícia informa.</strong> <strong>Análise explica.</strong>
          <strong> Opinião posiciona.</strong> <strong>Review testa.</strong> <strong>Especial contextualiza.</strong>
          Quando o texto apresenta uma leitura da redação, isso é sinalizado ao leitor em vez de ser misturado aos fatos.
        </p>
        <p>
          Opinião não significa abandonar a apuração. Uma boa opinião tem tese, evidências, contraponto e
          conclusão. A ideia é discutir a indústria com paixão, mas sem torcida cega.
        </p>

        <h2 className="font-display text-xl text-arcade pt-4">Como funcionam nossas notas</h2>
        <p>
          Review no Acerto Games só sai depois de experiência suficiente para formar uma opinião honesta.
          A nota vai de 0 a 10, com uma casa decimal, e o texto explica o que sustenta o número e o que
          impediu que fosse maior.
        </p>
        <p>
          Informamos a plataforma utilizada e, quando aplicável, se a cópia foi cedida pela publicadora.
          Cortesia não compra nota — se o jogo decepcionou, está escrito lá.
        </p>

        <h2 className="font-display text-xl text-arcade pt-4">Uso de inteligência artificial</h2>
        <p>
          Ferramentas de inteligência artificial podem participar de etapas de pesquisa, organização,
          revisão e rascunho. <strong>A IA não é a autora.</strong> A publicação é responsabilidade editorial
          humana, e nenhuma ferramenta pode inventar fonte, declaração, dado, experiência ou citação.
        </p>
        <p className="text-base text-dim">
          Nosso fluxo é: <strong>fonte → apuração → rascunho assistido → revisão humana → publicação.</strong>
        </p>

        <h2 className="font-display text-xl text-arcade pt-4">Erros e correções</h2>
        <p>
          A gente erra, como qualquer redação. O compromisso é corrigir rápido e sem esconder: encontrou um
          erro factual, escreva para <Link href="/contato" className="text-arcade underline">nosso contato</Link>.
          Quando necessário, a correção fica registrada na própria matéria.
        </p>

        <h2 className="font-display text-xl text-arcade pt-4">Independência</h2>
        <p>
          O Acerto Games não tem vínculo editorial com publicadoras, fabricantes de consoles ou lojas.
          Quando existe relação comercial ou uma cópia foi cedida para avaliação, isso é informado ao leitor.
        </p>
        <p className="text-base text-dim">
          Marcas, logos e imagens de jogos citados pertencem a seus respectivos detentores de direitos e
          podem aparecer em caráter informativo e jornalístico, com crédito quando aplicável.
        </p>

        <p className="border-t border-edge pt-5 text-base text-dim">
          Quer entender em detalhes como o portal trabalha? Leia nossa <Link href="/editorial" className="text-arcade underline">Política Editorial</Link>.
        </p>
      </div>
    </main>
  );
}
