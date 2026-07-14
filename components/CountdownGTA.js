"use client";

import { useEffect, useState } from "react";

const LANCAMENTO = new Date("2026-11-19T00:00:00-03:00").getTime();

function calcular() {
  const diff = LANCAMENTO - Date.now();
  if (diff <= 0) return null;
  return {
    dias: Math.floor(diff / 86400000),
    horas: Math.floor((diff % 86400000) / 3600000),
    min: Math.floor((diff % 3600000) / 60000),
    seg: Math.floor((diff % 60000) / 1000),
  };
}

function Bloco({ valor, rotulo }) {
  return (
    <div className="flex flex-col items-center border border-[#FF2E97]/40 bg-ink/60 px-4 py-3 min-w-[72px]">
      <span className="font-display text-3xl text-paper md:text-4xl">
        {String(valor).padStart(2, "0")}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF9AD1]">
        {rotulo}
      </span>
    </div>
  );
}

export default function CountdownGTA() {
  const [t, setT] = useState(null);

  useEffect(() => {
    setT(calcular());
    const id = setInterval(() => setT(calcular()), 1000);
    return () => clearInterval(id);
  }, []);

  if (t === null) {
    return (
      <p className="font-mono text-sm uppercase tracking-widest text-[#FF9AD1]">
        19 de novembro de 2026
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Bloco valor={t.dias} rotulo="dias" />
      <Bloco valor={t.horas} rotulo="horas" />
      <Bloco valor={t.min} rotulo="min" />
      <Bloco valor={t.seg} rotulo="seg" />
    </div>
  );
}
