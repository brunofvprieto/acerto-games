"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewsletterForm({ origem = "site" }) {
  const [email, setEmail] = useState("");
  const [site, setSite] = useState(""); // campo isca contra robôs
  const [estado, setEstado] = useState("parado");
  const [mensagem, setMensagem] = useState("");

  async function enviar(e) {
    e.preventDefault();
    if (estado === "enviando") return;
    setEstado("enviando");
    setMensagem("");
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, site, origem }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) {
        setEstado("ok");
        setMensagem(d.mensagem || "Quase lá. Enviamos um e-mail para você confirmar a inscrição.");
        setEmail("");
      } else {
        setEstado("erro");
        setMensagem(d.mensagem || "Não foi possível concluir agora. Tente de novo em instantes.");
      }
    } catch {
      setEstado("erro");
      setMensagem("Sem conexão no momento. Tente de novo em instantes.");
    }
  }

  if (estado === "ok") {
    return (
      <p role="status" className="border border-arcade/40 bg-arcade/10 p-4 text-sm leading-relaxed">
        {mensagem} Se não encontrar, olhe também a caixa de spam.
      </p>
    );
  }

  return (
    <form onSubmit={enviar} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`nl-email-${origem}`} className="sr-only">
          Seu melhor e-mail
        </label>
        <input
          id={`nl-email-${origem}`}
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 border border-edge bg-ink px-4 py-3 text-paper placeholder:text-dim focus:border-arcade focus:outline-none"
        />
        <input
          type="text"
          name="site"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="hidden"
        />
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="bg-arcade px-5 py-3 font-display text-sm uppercase tracking-wide text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {estado === "enviando" ? "Enviando..." : "Quero receber"}
        </button>
      </div>
      {estado === "erro" && (
        <p role="alert" className="mt-2 text-sm text-[#FF8A8A]">
          {mensagem}
        </p>
      )}
      <p className="mt-3 text-xs leading-relaxed text-dim">
        Você vai receber um e-mail para confirmar a inscrição. Ao se inscrever, concorda com a{" "}
        <Link href="/politica-de-privacidade" className="underline hover:text-paper">
          Política de Privacidade
        </Link>
        . Dá para sair a qualquer momento, com um clique, no fim de cada e-mail.
      </p>
    </form>
  );
}
