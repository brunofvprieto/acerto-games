import { getPost } from "../../../lib/posts";
import {
  comentariosAtivos, slugValido, idValido, novoId, aprovadosDe, publicar,
} from "../../../lib/comentarios";

export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const resposta = (status, dados) => Response.json(dados, { status });

// Filtro básico de ofensas e golpes, já que o comentário vai ao ar sem aprovação.
const OFENSAS = /\b(buceta|fdp|vsf|vtnc|viad[oa]s?|arrombad[oa]s?|cuz[aã]o|filh[oa] da puta|retardad[oa]s?|crioul[oa]s?|cassino|apostas? online|bet\d+)\b/i;

// Limite simples por IP (em memória).
const janela = new Map();
function limitado(ip) {
  const agora = Date.now();
  const lista = (janela.get(ip) || []).filter((t) => agora - t < 10 * 60 * 1000);
  lista.push(agora);
  janela.set(ip, lista);
  if (janela.size > 5000) janela.clear();
  return lista.length > 5;
}

export async function GET(req) {
  const slug = new URL(req.url).searchParams.get("slug");
  if (!slugValido(slug) || !comentariosAtivos(slug)) return resposta(200, { comentarios: [] });
  try {
    const lista = await aprovadosDe(slug);
    const publico = lista.map(({ id, paiId, nome, redacao, texto, criadoEm }) => ({ id, paiId, nome, redacao: !!redacao, texto, criadoEm }));
    return Response.json({ comentarios: publico }, { headers: { "cache-control": "no-store" } });
  } catch {
    return resposta(200, { comentarios: [] });
  }
}

export async function POST(req) {
  let corpo;
  try { corpo = await req.json(); } catch { return resposta(400, { mensagem: "Pedido inválido." }); }

  const slug = String(corpo?.slug || "");
  if (!slugValido(slug) || !comentariosAtivos(slug)) return resposta(400, { mensagem: "Comentários fechados nesta matéria." });
  const post = getPost(slug);
  if (!post) return resposta(404, { mensagem: "Matéria não encontrada." });

  const ok = { mensagem: "Comentário publicado!" };
  // Campo isca ou envio rápido demais: finge sucesso para o robô não insistir.
  if (corpo?.site) return resposta(200, ok);
  if (Number(corpo?.abertoEm) && Date.now() - Number(corpo.abertoEm) < 3000) return resposta(200, ok);

  const nome = String(corpo?.nome || "").trim().replace(/\s+/g, " ");
  const email = String(corpo?.email || "").trim().toLowerCase();
  const texto = String(corpo?.texto || "").trim().replace(/\r/g, "").replace(/\n{3,}/g, "\n\n");
  const paiId = corpo?.paiId && idValido(corpo.paiId) ? corpo.paiId : null;

  if (nome.length < 2 || nome.length > 60) return resposta(400, { mensagem: "Digite seu nome (de 2 a 60 caracteres)." });
  if (/acerto\s*games|reda[cç][aã]o/i.test(nome)) return resposta(400, { mensagem: "Escolha outro nome." });
  if (!EMAIL.test(email) || email.length > 254) return resposta(400, { mensagem: "Digite um e-mail válido." });
  if (texto.length < 3 || texto.length > 1500) return resposta(400, { mensagem: "O comentário precisa ter de 3 a 1.500 caracteres." });
  if ((texto.match(/https?:\/\/|www\./gi) || []).length > 1) return resposta(400, { mensagem: "Use no máximo um link." });
  if (OFENSAS.test(`${nome} ${texto}`)) return resposta(400, { mensagem: "Seu comentário tem palavras que não são permitidas aqui." });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "desconhecido";
  if (limitado(ip)) return resposta(429, { mensagem: "Muitos comentários seguidos. Tente de novo em alguns minutos." });

  const c = { id: novoId(), slug, paiId, nome, email, texto, ip, criadoEm: new Date().toISOString() };
  try {
    await publicar(c);
  } catch {
    return resposta(500, { mensagem: "Não foi possível enviar agora. Tente de novo em instantes." });
  }
  const { email: _e, ip: _i, ...publico } = c;
  return resposta(200, { ...ok, comentario: { ...publico, redacao: false } });
}
