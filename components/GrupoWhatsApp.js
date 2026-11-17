import { GRUPO_WHATSAPP } from "../lib/grupo";

function Icone({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.42-9.41 2.51 0 4.88.98 6.65 2.76a9.35 9.35 0 0 1 2.75 6.66c0 5.19-4.23 9.41-9.42 9.41m8.01-17.42A11.25 11.25 0 0 0 12.05.75C5.81.75.73 5.83.73 12.07c0 2 .52 3.94 1.51 5.65L.64 23.25l5.66-1.48a11.3 11.3 0 0 0 5.75 1.47h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.02-1.18-5.87-3.32-8.01" />
    </svg>
  );
}

// variante "card": bloco no fim das matérias e na home
// variante "link": link compacto no rodapé
export default function GrupoWhatsApp({ variante = "card" }) {
  if (!GRUPO_WHATSAPP) return null;

  if (variante === "link") {
    return (
      <a href={GRUPO_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-arcade hover:text-paper">
        <Icone className="h-3.5 w-3.5" /> Grupo no WhatsApp
      </a>
    );
  }

  return (
    <aside className="my-8 flex flex-col items-start gap-4 rounded-xl border border-arcade/40 bg-[#07130d] p-5 border-arcade sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-arcade text-ink">
          <Icone className="h-7 w-7" />
        </span>
        <div>
          <p className="font-display text-lg leading-tight text-paper">Entre na comunidade do Acerto Games</p>
          <p className="mt-1 text-sm text-dim">Notícias, reviews e lançamentos direto no seu WhatsApp. É grátis.</p>
        </div>
      </div>
      <a
        href={GRUPO_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-arcade inline-flex shrink-0 items-center gap-2 rounded-lg px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-ink transition hover:brightness-110"
      >
        <Icone className="h-4 w-4" /> Entrar no grupo
      </a>
    </aside>
  );
}
