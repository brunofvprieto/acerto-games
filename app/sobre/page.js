export const metadata = {
  title: "Sobre — Acerto Games",
  description:
    "Conheça o Acerto Games e Bruno Vazquez: jornalista há 18 anos, gamer desde o Phantom System.",
};

export default function Sobre() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="logo-arcade text-3xl">Sobre o Acerto Games</h1>
      <div className="mt-6 space-y-5 text-lg leading-relaxed">
        <p>
          O <strong>Acerto Games</strong> é um portal brasileiro de notícias sobre o
          universo dos games: lançamentos, indústria, mercado, hardware, eSports e a
          boa e velha nostalgia — das locadoras ao fliperama de ficha.
        </p>

        <h2 className="font-display text-xl text-arcade pt-2">Quem escreve</h2>
        <p>
          O Acerto Games é editado por <strong>Bruno Vazquez</strong>, jornalista
          formado há 18 anos e apaixonado por games desde que se entende por gente.
        </p>
        <p>
          A história começou como a de muito brasileiro dos anos 90: o primeiro
          console foi o famigerado <strong>Phantom System</strong> — o clone nacional
          do Nintendinho que marcou uma geração inteira. De lá pra cá vieram o Super
          Nintendo, os PlayStations, e uma paixão moldada por franquias como{" "}
          <strong>Metal Gear</strong>, <strong>Zelda</strong> e <strong>GTA</strong> —
          que até hoje definem o gosto (e o coração) por trás deste site.
        </p>
        <p>
          É essa combinação — o rigor de quase duas décadas de jornalismo com a
          memória afetiva de quem soprou cartucho — que dá o tom do Acerto Games.
        </p>

        <h2 className="font-display text-xl text-arcade pt-2">Como trabalhamos</h2>
        <p>
          Nossa redação apura notícias diretamente das fontes internacionais mais
          respeitadas — imprensa especializada dos Estados Unidos, Reino Unido e Japão,
          além dos canais oficiais de PlayStation e Xbox — e escreve cada matéria em
          português, com texto próprio e fonte citada ao final.
        </p>
        <p>
          Utilizamos tecnologia de inteligência artificial como ferramenta de apuração
          e redação, sob responsabilidade editorial de Bruno Vazquez.
        </p>
        <p>
          Nossa linha editorial é simples: aqui só se fala de games. Se a notícia
          sobrevive sem o game, ela não é nossa.
        </p>
      </div>
    </main>
  );
}
