#!/usr/bin/env python3
"""Aplica atualização visual do review sem alterar outros artigos."""
from pathlib import Path
p=Path(__file__).resolve().parent/'app/noticia/[slug]/page.js'
if not p.exists():
 raise SystemExit('Arquivo app/noticia/[slug]/page.js não encontrado. Execute dentro da raiz do repositório.')
s=p.read_text(encoding='utf-8')
needle='              if (paragraph.startsWith("## ")) return <h2 key={i} className="font-display text-xl text-arcade pt-3">{paragraph.slice(3)}</h2>;'
if 'paragraph.startsWith("veredito:")' not in s:
 if needle not in s: raise SystemExit('Versão diferente do componente: nenhuma alteração aplicada. Verifique o código atual.')
 replacement='              if (paragraph.startsWith("veredito:")) {\n                const [nome, valor, rotulo, resumo, positivos, negativos] = paragraph.slice(9).split("|").map(s => s.trim());\n                const pontosPositivos = (positivos || "").split(";").filter(Boolean);\n                const pontosNegativos = (negativos || "").split(";").filter(Boolean);\n                return <section key={i} className="my-7 overflow-hidden rounded-xl border border-edge bg-surface">\n                  <div className="flex flex-col sm:flex-row">\n                    <div className="flex min-w-[135px] flex-col items-center justify-center bg-[#24213C] px-6 py-5 text-[#2EE86C]">\n                      <span className="font-display text-4xl font-extrabold">{valor}</span>\n                      <span className="font-mono text-xs">/10 · ACERTO GAMES</span>\n                    </div>\n                    <div className="flex-1 p-5"><p className="font-mono text-[10px] uppercase tracking-widest text-[#2EE86C]">Nosso veredito</p><h3 className="mt-1 text-xl font-bold">{rotulo}</h3><p className="mt-2 text-sm leading-relaxed text-dim">{resumo}</p></div>\n                  </div>\n                  <div className="grid gap-0 border-t border-edge sm:grid-cols-2">\n                    <div className="p-4"><h4 className="mb-2 text-sm font-bold text-[#2EE86C]">Pontos positivos</h4><ul className="space-y-1 text-sm">{pontosPositivos.map((v,j)=><li key={j}>+ {v}</li>)}</ul></div>\n                    <div className="border-t border-edge p-4 sm:border-l sm:border-t-0"><h4 className="mb-2 text-sm font-bold text-[#FF7995]">Pontos a melhorar</h4><ul className="space-y-1 text-sm">{pontosNegativos.map((v,j)=><li key={j}>− {v}</li>)}</ul></div>\n                  </div>\n                </section>;\n              }\n' + needle
 s=s.replace(needle,replacement,1)
 p.write_text(s,encoding='utf-8')
 print('Veredito visual instalado no componente da matéria.')
else:print('Veredito visual já instalado.')
