import { newsletterAtiva } from "../../../lib/newsletter";

export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Limite simples por IP (em memória): segura abusos leves sem depender de banco.
const janela = new Map();
function limitado(ip) {
  const agora = Date.now();
  const lista = (janela.get(ip) || []).filter((t) => agora - t < 10 * 60 * 1000);
  lista.push(agora);
  janela.set(ip, lista);
  if (janela.size > 5000) janela.clear();
  return lista.length > 5;
}

const resposta = (status, mensagem) => Response.json({ mensagem }, { status });

export async function POST(req) {
  if (!newsletterAtiva()) {
    return resposta(503, "A newsletter ainda não está aberta. Volte em breve.");
  }

  let corpo;
  try {
    corpo = await req.json();
  } catch {
    return resposta(400, "Pedido inválido.");
  }

  // Campo isca preenchido: finge sucesso para o robô não insistir.
  if (corpo?.site) return resposta(200, "Quase lá. Enviamos um e-mail para você confirmar a inscrição.");

  const email = String(corpo?.email || "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return resposta(400, "Digite um e-mail válido.");
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "desconhecido";
  if (limitado(ip)) return resposta(429, "Muitas tentativas. Tente de novo em alguns minutos.");

  const origem = String(corpo?.origem || "site").slice(0, 30).replace(/[^a-z0-9_-]/gi, "");

  // Inscrição com confirmação por e-mail (double opt-in) pelo Brevo.
  // O contato só entra na lista depois de clicar no link do e-mail de confirmação.
  try {
    const r = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        includeListIds: [Number(process.env.BREVO_LIST_ID)],
        templateId: Number(process.env.BREVO_DOI_TEMPLATE_ID),
        redirectionUrl:
          process.env.NEWSLETTER_REDIRECT_URL || "https://acertogames.com.br/newsletter/confirmado",
        attributes: { ORIGEM: origem },
      }),
    });

    if (r.ok || r.status === 204) {
      return resposta(200, "Quase lá. Enviamos um e-mail para você confirmar a inscrição.");
    }

    const erro = await r.json().catch(() => ({}));
    // Contato já existente: não revelamos, para não expor quem já está na lista.
    if (r.status === 400 && /already|exist/i.test(String(erro?.message || ""))) {
      return resposta(200, "Quase lá. Enviamos um e-mail para você confirmar a inscrição.");
    }
    console.error("Brevo recusou o cadastro:", r.status, erro?.code || "", erro?.message || "");
    return resposta(502, "Não foi possível concluir agora. Tente de novo em instantes.");
  } catch (e) {
    console.error("Falha ao falar com o Brevo:", e?.message);
    return resposta(502, "Não foi possível concluir agora. Tente de novo em instantes.");
  }
}
