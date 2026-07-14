export const metadata = {
  title: "Política de Privacidade — Acerto Games",
  description: "Como o Acerto Games trata dados de navegação, cookies e serviços de terceiros.",
};

export default function PoliticaDePrivacidade() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="logo-arcade text-3xl">Política de Privacidade</h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-dim">
        Última atualização: julho de 2026
      </p>
      <div className="mt-6 space-y-5 leading-relaxed">
        <p>
          Esta Política de Privacidade descreve como o <strong>Acerto Games</strong>{" "}
          (acertogames.com.br) trata as informações de quem visita o site, em
          conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
        </p>

        <h2 className="font-display text-lg text-arcade">1. Quais dados coletamos</h2>
        <p>
          O Acerto Games não exige cadastro para leitura. Coletamos apenas dados de
          navegação de forma automática e anônima, por meio de cookies e tecnologias
          semelhantes: páginas visitadas, tempo de permanência, tipo de dispositivo,
          navegador e região aproximada. Não coletamos nome, CPF ou dados sensíveis.
        </p>

        <h2 className="font-display text-lg text-arcade">2. Como usamos esses dados</h2>
        <p>
          Os dados de navegação são usados para medir audiência, entender quais
          conteúdos interessam aos leitores e melhorar o site. Se você nos escrever por
          e-mail, usaremos seu endereço apenas para responder ao contato.
        </p>

        <h2 className="font-display text-lg text-arcade">3. Serviços de terceiros</h2>
        <p>
          Utilizamos (ou poderemos utilizar) serviços de terceiros que coletam dados de
          navegação por meio de cookies próprios: <strong>Google Analytics</strong>{" "}
          (métricas de audiência), <strong>Meta Pixel</strong> (medição e publicidade) e{" "}
          <strong>Google AdSense</strong> (exibição de anúncios, que podem ser
          personalizados com base na sua navegação). Cada um desses serviços possui
          política de privacidade própria, disponível nos sites de suas empresas. Você
          pode gerenciar a personalização de anúncios do Google em
          adssettings.google.com.
        </p>

        <h2 className="font-display text-lg text-arcade">4. Cookies</h2>
        <p>
          Cookies são pequenos arquivos armazenados no seu navegador. Você pode
          bloqueá-los ou apagá-los a qualquer momento nas configurações do próprio
          navegador — o site continuará funcionando normalmente.
        </p>

        <h2 className="font-display text-lg text-arcade">5. Seus direitos (LGPD)</h2>
        <p>
          Você pode solicitar informações sobre o tratamento de seus dados, bem como
          correção ou exclusão de dados fornecidos por você (como e-mails de contato),
          escrevendo para <strong>contato@acertogames.com.br</strong>.
        </p>

        <h2 className="font-display text-lg text-arcade">6. Links externos</h2>
        <p>
          Nossas matérias citam e linkam fontes externas. Não nos responsabilizamos
          pelas práticas de privacidade de outros sites.
        </p>

        <h2 className="font-display text-lg text-arcade">7. Alterações</h2>
        <p>
          Esta política pode ser atualizada a qualquer momento. A data da última
          atualização estará sempre indicada no topo desta página.
        </p>
      </div>
    </main>
  );
}
