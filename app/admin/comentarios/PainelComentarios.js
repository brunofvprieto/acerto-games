"use client";

import { useCallback, useEffect, useState } from "react";

function data(iso) {
  try { return new Date(iso).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }); } catch { return ""; }
}

function Cartao({ c, chave, aoMudar, pendente }) {
  const [resposta, setResposta] = useState("");
  const [ocupado, setOcupado] = useState(false);

  async function acao(corpo) {
    setOcupado(true);
    const r = await fetch("/api/comentarios/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-chave": chave },
      body: JSON.stringify({ slug: c.slug, id: c.id, ...corpo }),
    });
    setOcupado(false);
    if (r.ok) { setResposta(""); aoMudar(); } else { const d = await r.json().catch(() => ({})); alert(d.mensagem || "Erro"); }
  }

  return (
    <li className={`border p-4 ${pendente ? "border-arcade/60" : "border-edge"} bg-surface`}>
      <p className="font-mono text-[11px] uppercase tracking-widest text-dim">
        <a href={`/noticia/${c.slug}#comentarios`} target="_blank" rel="noreferrer" className="text-arcade hover:underline">{c.titulo}</a>
      </p>
      <p className="mt-2">
        <strong className={c.redacao ? "text-arcade" : ""}>{c.nome}</strong>
        {c.email && <span className="ml-2 text-sm text-dim">{c.email}</span>}
        <span className="ml-2 font-mono text-[11px] text-dim">{data(c.criadoEm)}</span>
        {c.paiId && <span className="ml-2 font-mono text-[11px] text-dim">(resposta)</span>}
      </p>
      <p className="mt-2 whitespace-pre-line break-words">{c.texto}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {pendente && <button disabled={ocupado} onClick={() => acao({ acao: "aprovar" })} className="border border-arcade bg-arcade px-3 py-1 font-mono text-xs font-bold uppercase text-ink">Aprovar</button>}
        <button disabled={ocupado} onClick={() => { if (confirm("Apagar este comentário?")) acao({ acao: "apagar" }); }} className="border border-red-500 px-3 py-1 font-mono text-xs uppercase text-red-400">Apagar</button>
      </div>
      {!c.redacao && !c.paiId && (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <textarea value={resposta} onChange={(e) => setResposta(e.target.value)} placeholder="Responder como Acerto Games (Redação)" className="min-h-[60px] flex-1 border border-edge bg-ink px-3 py-2 text-sm" />
          <button disabled={ocupado || resposta.trim().length < 2} onClick={() => acao({ acao: "responder", texto: resposta })} className="border border-arcade px-3 py-1 font-mono text-xs uppercase text-arcade disabled:opacity-50">
            {pendente ? "Aprovar e responder" : "Responder"}
          </button>
        </div>
      )}
    </li>
  );
}

export default function PainelComentarios() {
  const [chave, setChave] = useState("");
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get("chave") || "";
    setChave(k);
  }, []);

  const carregar = useCallback(async () => {
    if (!chave) return;
    const r = await fetch("/api/comentarios/admin", { headers: { "x-chave": chave }, cache: "no-store" });
    if (!r.ok) { setErro("Acesso negado. Use o link do e-mail de aviso."); return; }
    setErro("");
    setDados(await r.json());
  }, [chave]);

  useEffect(() => { carregar(); }, [carregar]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl">COMENTÁRIOS</h1>
      <p className="mt-2 text-sm text-dim">Painel da redação. Não compartilhe este link.</p>
      {!chave && <p className="mt-6">Abra este painel pelo link que chega no e-mail de aviso de novo comentário.</p>}
      {erro && <p className="mt-6 text-red-400">{erro}</p>}
      {dados && (
        <>
          <h2 className="mt-8 font-mono text-sm uppercase tracking-widest text-arcade">Aguardando aprovação ({dados.pendentes.length})</h2>
          {dados.pendentes.length === 0 ? <p className="mt-3 text-dim">Nenhum comentário pendente.</p> : (
            <ul className="mt-3 space-y-3">{dados.pendentes.map((c) => <Cartao key={c.id} c={c} chave={chave} aoMudar={carregar} pendente />)}</ul>
          )}
          <h2 className="mt-10 font-mono text-sm uppercase tracking-widest text-arcade">Publicados recentes ({dados.aprovados.length})</h2>
          {dados.aprovados.length === 0 ? <p className="mt-3 text-dim">Nenhum comentário publicado ainda.</p> : (
            <ul className="mt-3 space-y-3">{dados.aprovados.map((c) => <Cartao key={c.id} c={c} chave={chave} aoMudar={carregar} />)}</ul>
          )}
        </>
      )}
    </main>
  );
}
