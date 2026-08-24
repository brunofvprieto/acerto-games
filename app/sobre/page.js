import Link from "next/link";

export const metadata = {
  title: "Sobre — Acerto Games",
  description:
    "Quem faz o Acerto Games, como apuramos nossas matérias, como funcionam as notas dos reviews e como corrigimos erros. Portal brasileiro de games editado por Bruno Vazquez, jornalista formado em 2008.",
};

export default function Sobre() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="logo-arcade text-3xl">Sobre o Acerto Games</h1>

      <div className="mt-6 space-y-5 text-lg leading-relaxed">
        <p>
          O <strong>Acerto Games</strong> é um portal brasileiro independente sobre o
          universo dos games: lançamentos, indústria, mercado, hardware, eSports e a boa
          e velha nostalgia — das locadoras ao fliperama de ficha.
        </p>
        <p>
          A gente existe por um motivo simples: quase tudo que se lê sobre games no Brasil
          é tradução apressada do que saiu lá fora, sem responder o que o leitor daqui
          realmente quer saber. Quanto custa em real? Vem dublado em português? A promoção
          vale no Brasil? É essa camada que a gente faz questão de acrescentar em toda
          matéria — porque ela separa uma notícia útil de uma simples repetição.
        </p>

        <h2 className="font-display text-xl text-arcade pt-4">Quem escreve</h2>
        <p>
          O Acerto Games é editado por <strong>Bruno Vazquez</strong>, jornalista formado em
          <strong> 2008</strong> e profissional da área há 18 anos. A linha editorial
          combina experiência jornalística com a experiência de jogador e uma leitura crítica
          da indústria: o objetivo não é apenas contar o que aconteceu, mas explicar por que
          aquilo importa para quem joga.
        </p>
        <p>
          A história começou como a de muito brasileiro dos anos 90: o primeiro console
          foi o famigerado <strong>Phantom System</strong>, o clone nacional do Nintendinho
          que marcou uma geração inteira. De lá pra cá vieram o Super Nintendo, os
          PlayStations, e uma paixão moldada por franquias como <strong>Metal Gear</strong>,{" "}
          <strong>Zelda</strong> e <strong>GTA</strong> — que até hoje definem o gosto (e o
          coração) por trás deste site.
        </p>
        <p>
          Quer conhecer o trabalho do editor? Acesse o <Link href="/autor/bruno-vazquez" className="text-arcade underline">perfil de Bruno Vazquez</Link> e veja suas matérias, análises e opiniões.
        </p>

        <h2 className="font-display text-xl text-arcade pt-4">Como apuramos</h2>
        <p>
          Nenhuma matéria daqui nasce de um único link. O método é sempre o mesmo:
        </p>
        <ul className="ml-5 list-disc space-y-2 text-base">
          <li>
            <strong>Fonte primária primeiro.</strong> Quando o assunto tem origem oficial —
            relatório financeiro, patch note, comunicado de estúdio, classificação etária —
            a gente vai atrás do documento original em vez de reescrever o resumo de outro site.
          </li>
          <li>
            <strong>Crédito explícito.</strong> Toda matéria informa a fonte da apuração e
            leva link para ela. Se a informação veio de terceiros, isso está dito no texto.
          </li>
          <li>
            <strong>Rumor é rumor.</strong> Vazamento, boato e teoria de comunidade são
            publicados como tal, com aviso claro. A gente nunca apresenta especulação como
            fato confirmado.
          </li>
          <li>
            <strong>Contexto brasileiro sempre.</strong> Preços convertidos e checados em
            real, disponibilidade de dublagem, e o aviso honesto quando uma promoção não
            vale por aqui.
          </li>
        </ul>

        <h2 className="font-display text-xl text-arcade pt-4">Como funcionam nossas notas</h2>
        <p>
          Review no Acerto Games só sai depois de jogo zerado ou de tempo suficiente para
          formar opinião honesta — nunca a partir de material promocional. A nota vai de 0 a
          10, com uma casa decimal, e sempre acompanhada do porquê: o texto explica o que
          sustenta o número e o que impediu que fosse maior.
        </p>
        <p>
          A gente informa em qual plataforma jogou e diz quando a cópia foi cedida pela
          publicadora. Cortesia não compra nota — se o jogo decepcionou, está escrito lá.
        </p>

        <h2 className="font-display text-xl text-arcade pt-4">Erros e correções</h2>
        <p>
          A gente erra, como qualquer redação. O compromisso é corrigir rápido e sem
          esconder: achou um erro, escreva pra{" "}
          <Link href="/contato" className="text-arcade underline">
            nosso contato
          </Link>{" "}
          que a correção sai e fica registrada na matéria.
        </p>

        <h2 className="font-display text-xl text-arcade pt-4">Independência</h2>
        <p>
          O Acerto Games não tem vínculo com nenhuma publicadora, fabricante de console ou
          loja. Opinião aqui é opinião da casa, assinada, e quando existe qualquer relação
          comercial envolvida num conteúdo, isso é informado ao leitor de forma clara.
        </p>
        <p className="text-base text-dim">
          Marcas, logos e imagens de jogos citados pertencem a seus respectivos detentores
          de direitos e são usados aqui em caráter informativo e jornalístico, sempre com
          crédito.
        </p>
      </div>
    </main>
  );
}
