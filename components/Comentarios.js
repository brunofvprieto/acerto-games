"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function dataCurta(iso) {
  try {
    return new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });
  } catch { return ""; }
}

function Formulario({ slug, paiId = null, aoCancelar, aoPublicar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [texto, setTexto] = useState("");
  const [site, setSite] = useState(""); // campo isca contra robôs
  const [abertoEm] = useState(() => Date.now());
  const [estado, setEstado] = useState("parado");
  const [mensagem, setMensagem] = useState("");

  async function enviar(e) {
    e.preventDefault();
    if (estado === "enviando") return;
    setEstado("enviando");
    setMensagem("");
    try {
      const r = await fetch("/api/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, paiId, nome, email, texto, site, abertoEm }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) { setEstado("ok"); setMensagem(d.mensagem); setTexto(""); if (d.comentario && aoPublicar) aoPublicar(d.comentario); }
      else { setEstado("erro"); setMensagem(d.mensagem || "Não foi possível enviar agora."); }
    } catch {
      setEstado("erro");
      setMensagem("Sem conexão no momento. Tente de novo em instantes.");
    }
  }

  if (estado === "ok") {
    return <p role="status" className="border border-arcade/40 bg-arcade/10 p-4 text-sm leading-relaxed">{mensagem}</p>;
  }

  const campo = "w-full border border-edge bg-ink px-3 py-2 text-sm text-paper placeholder:text-dim focus:border-arcade focus:outline-none";
  return (
    <form onSubmit={enviar} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Nome</span>
          <input className={campo} placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} maxLength={60} required autoComplete="name" />
        </label>
        <label className="block">
          <span className="sr-only">E-mail</span>
          <input className={campo} type="email" placeholder="Seu e-mail (não será publicado)" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={254} required autoComplete="email" inputMode="email" />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Comentário</span>
        <textarea className={`${campo} min-h-[110px]`} placeholder={paiId ? "Escreva sua resposta" : "O que você achou?"} value={texto} onChange={(e) => setTexto(e.target.value)} maxLength={1500} required />
      </label>
      <div aria-hidden="true" className="hidden">
        <input tabIndex={-1} autoComplete="off" value={site} onChange={(e) => setSite(e.target.value)} placeholder="Deixe em branco" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={estado === "enviando"} className="border border-arcade bg-arcade px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest text-ink transition hover:bg-transparent hover:text-arcade disabled:opacity-60">
          {estado === "enviando" ? "Enviando..." : paiId ? "Responder" : "Comentar"}
        </button>
        {aoCancelar && <button type="button" onClick={aoCancelar} className="font-mono text-xs uppercase tracking-widest text-dim hover:text-paper">Cancelar</button>}
        <span className="text-xs text-dim">{texto.length}/1500</span>
      </div>
      {estado === "erro" && <p role="alert" className="text-sm text-red-400">{mensagem}</p>}
      <p className="text-xs leading-relaxed text-dim">
        Seu e-mail não é publicado. Comentários ofensivos ou com propaganda podem ser removidos.{" "}
        <Link href="/politica-de-privacidade" className="underline hover:text-paper">Política de privacidade</Link>.
      </p>
    </form>
  );
}

function Comentario({ c, respostas, slug, aoPublicar }) {
  const [respondendo, setRespondendo] = useState(false);
  return (
    <li className={`border-l-2 pl-4 ${c.redacao ? "border-arcade" : "border-edge"}`}>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className={`font-display text-base ${c.redacao ? "text-arcade" : "text-paper"}`}>{c.nome}</span>
        {c.redacao && <span className="bg-arcade px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-ink">Redação</span>}
        <span className="font-mono text-[11px] uppercase tracking-widest text-dim">{dataCurta(c.criadoEm)}</span>
      </div>
      <p className="mt-2 whitespace-pre-line break-words leading-relaxed">{c.texto}</p>
      {!c.paiId && (
        <button type="button" onClick={() => setRespondendo((v) => !v)} className="mt-2 font-mono text-[11px] uppercase tracking-widest text-arcade hover:text-paper">
          Responder
        </button>
      )}
      {respondendo && <div className="mt-3"><Formulario slug={slug} paiId={c.id} aoCancelar={() => setRespondendo(false)} aoPublicar={(n) => { aoPublicar(n); setRespondendo(false); }} /></div>}
      {respostas.length > 0 && (
        <ul className="mt-4 space-y-4">
          {respostas.map((r) => <Comentario key={r.id} c={r} respostas={[]} slug={slug} aoPublicar={aoPublicar} />)}
        </ul>
      )}
    </li>
  );
}

export default function Comentarios({ slug }) {
  const [lista, setLista] = useState(null);

  useEffect(() => {
    let vivo = true;
    fetch(`/api/comentarios?slug=${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then((r) => r.json()).then((d) => { if (vivo) setLista(d.comentarios || []); })
      .catch(() => { if (vivo) setLista([]); });
    return () => { vivo = false; };
  }, [slug]);

  const { raiz, filhos } = useMemo(() => {
    const raiz = [], filhos = {};
    for (const c of lista || []) {
      if (c.paiId) (filhos[c.paiId] ||= []).push(c); else raiz.push(c);
    }
    return { raiz, filhos };
  }, [lista]);

  const total = lista?.length || 0;
  const aoPublicar = (n) => setLista((l) => [...(l || []), n]);
  return (
    <section id="comentarios" className="mt-10 border border-edge bg-surface p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-arcade">Comentários{total ? ` · ${total}` : ""}</p>
      <h2 className="mt-2 font-display text-xl">O QUE VOCÊ ACHOU?</h2>
      <div className="mt-4"><Formulario slug={slug} aoPublicar={aoPublicar} /></div>
      {lista === null ? (
        <p className="mt-6 text-sm text-dim">Carregando comentários...</p>
      ) : raiz.length === 0 ? (
        <p className="mt-6 text-sm text-dim">Ainda não há comentários. Seja o primeiro.</p>
      ) : (
        <ul className="mt-6 space-y-6">
          {raiz.map((c) => <Comentario key={c.id} c={c} respostas={filhos[c.id] || []} slug={slug} aoPublicar={aoPublicar} />)}
        </ul>
      )}
    </section>
  );
}
