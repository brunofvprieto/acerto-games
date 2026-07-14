export const metadata = {
  title: "Contato — Acerto Games",
  description: "Fale com a equipe do Acerto Games: pautas, parcerias, publicidade e correções.",
};

export default function Contato() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="logo-arcade text-3xl">Contato</h1>
      <div className="mt-6 space-y-5 text-lg leading-relaxed">
        <p>Quer falar com a gente? É por aqui:</p>
        <div className="border border-edge bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-dim">E-mail</p>
          <p className="mt-1 font-display text-xl text-arcade">contato@acertogames.com.br</p>
        </div>
        <p>Recebemos e respondemos:</p>
        <p>
          <strong>Sugestões de pauta</strong> — viu algo que merece cobertura? Manda pra
          gente. <strong>Correções</strong> — erramos? Avisou, corrigimos e registramos.{" "}
          <strong>Publicidade e parcerias</strong> — quer anunciar no Acerto Games ou
          propor uma parceria? Vamos conversar. <strong>Assessorias e estúdios</strong> —
          releases, chaves de review e convites são bem-vindos.
        </p>
      </div>
    </main>
  );
}
