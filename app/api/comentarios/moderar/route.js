import crypto from "node:crypto";
import { slugValido, idValido, assinar, aprovar, apagar } from "../../../../lib/comentarios";

export const dynamic = "force-dynamic";

function pagina(titulo, texto, slug) {
  const link = slug ? `<p><a href="/noticia/${slug}#comentarios">Ver a matéria</a></p>` : "";
  return new Response(
    `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${titulo}</title></head>
     <body style="font-family:system-ui,sans-serif;background:#0b0d10;color:#e8e8e8;max-width:560px;margin:60px auto;padding:0 16px">
     <h1 style="color:#2ee67a">${titulo}</h1><p>${texto}</p>${link}</body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

// Links de um clique enviados no e-mail de aviso. Cada link é assinado.
export async function GET(req) {
  const p = new URL(req.url).searchParams;
  const acao = p.get("acao"), slug = p.get("slug"), id = p.get("id"), sig = p.get("sig") || "";
  if (!slugValido(slug) || !idValido(id) || !["aprovar", "apagar"].includes(acao)) return pagina("Link inválido", "Confira o link do e-mail.");
  const certa = assinar(`${slug}/${id}`);
  if (sig.length !== certa.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(certa))) {
    return pagina("Link inválido", "A assinatura do link não confere.");
  }
  if (acao === "aprovar") {
    const c = await aprovar(slug, id);
    return c ? pagina("Comentário aprovado", `O comentário de ${c.nome} já aparece na matéria.`, slug)
             : pagina("Nada a aprovar", "Esse comentário já foi aprovado ou apagado.", slug);
  }
  await apagar(slug, id);
  return pagina("Comentário apagado", "Ele não vai aparecer no site.", slug);
}
