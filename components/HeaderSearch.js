"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderSearch() {
  const [termo, setTermo] = useState("");
  const router = useRouter();

  function buscar(e) {
    e.preventDefault();
    const q = termo.trim();
    router.push(q ? `/buscar?q=${encodeURIComponent(q)}` : "/buscar");
  }

  return (
    <form onSubmit={buscar} className="hidden md:block">
      <div className="flex items-center border border-edge bg-ink focus-within:border-arcade">
        <input
          type="search"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Buscar..."
          aria-label="Buscar no site"
          className="w-36 bg-transparent px-3 py-1.5 font-mono text-xs text-paper placeholder:text-dim focus:outline-none lg:w-48"
        />
        <button type="submit" aria-label="Buscar" className="px-2 text-arcade">
          🔍
        </button>
      </div>
    </form>
  );
}
