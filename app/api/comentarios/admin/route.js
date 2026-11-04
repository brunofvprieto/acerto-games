import { getPost } from "../../../../lib/posts";
import {
  chaveAdminValida, slugValido, idValido, todosPendentes, aprovadosRecentes, aprovar, apagar, responderComoRedacao,
} from "../../../../lib/comentarios";

export const dynamic = "force-dynamic";

const negar = () => Response.json({ mensagem: "Acesso negado." }, { status: 401 });
const titulo = (slug) => getPost(slug)?.title || slug;

export async function GET(req) {
  if (!chaveAdminValida(req.headers.get("x-chave") || "")) return negar();
  const [pendentes, aprovados] = await Promise.all([todosPendentes(), aprovadosRecentes(60)]);
  const comTitulo = (l) => l.map((c) => ({ ...c, ip: undefined, titulo: titulo(c.slug) }));
  return Response.json({ pendentes: comTitulo(pendentes), aprovados: comTitulo(aprovados) }, { headers: { "cache-control": "no-store" } });
}

export async function POST(req) {
  if (!chaveAdminValida(req.headers.get("x-chave") || "")) return negar();
  let b;
  try { b = await req.json(); } catch { return Response.json({ mensagem: "Pedido inválido." }, { status: 400 }); }
  const { acao, slug, id } = b || {};
  if (!slugValido(slug)) return Response.json({ mensagem: "Matéria inválida." }, { status: 400 });
  if (acao === "aprovar" && idValido(id)) {
    await aprovar(slug, id);
  } else if (acao === "apagar" && idValido(id)) {
    await apagar(slug, id);
  } else if (acao === "responder") {
    const texto = String(b.texto || "").trim();
    if (texto.length < 2 || texto.length > 2000) return Response.json({ mensagem: "Resposta vazia ou longa demais." }, { status: 400 });
    // Se o comentário respondido ainda estiver pendente, aprova junto.
    if (idValido(id)) await aprovar(slug, id).catch(() => {});
    await responderComoRedacao(slug, idValido(id) ? id : null, texto);
  } else {
    return Response.json({ mensagem: "Ação inválida." }, { status: 400 });
  }
  return Response.json({ ok: true });
}
