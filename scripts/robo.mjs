// Robô Acerto Games — coleta notícias, escreve com personalidade e salva RASCUNHOS.
// Nada vai ao ar sem aprovação humana (npm run publicar <slug>).
//
// Uso:  ANTHROPIC_API_KEY=sk-... node scripts/robo.mjs

import fs from "fs";
import path from "path";

const RAIZ = process.cwd();
const CONFIG = JSON.parse(fs.readFileSync(path.join(RAIZ, "scripts/fontes.json"), "utf-8"));
const PERSONA = fs.readFileSync(path.join(RAIZ, "scripts/persona.md"), "utf-8");
const DIR_RASCUNHOS = path.join(RAIZ, "content/rascunhos");
const DIR_PUBLICADOS = path.join(RAIZ, "content/publicados");

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error("❌ Defina a variável ANTHROPIC_API_KEY antes de rodar.");
  process.exit(1);
}

// ---------- 1. Coleta ----------

function extrair(xml, tag) {
  const tagEsc = tag.replace(":", "\\:");
  const m = xml.match(new RegExp(`<${tagEsc}[^>]*>([\\s\\S]*?)</${tagEsc}>`, "i"));
  if (!m) return "";
  return m[1]
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#\d+;/g, "")
    .trim();
}

function extrairImagem(itemXml) {
  const padroes = [
    /<media:content[^>]*url="([^"]+)"/i,
    /<media:thumbnail[^>]*url="([^"]+)"/i,
    /<enclosure[^>]*type="image[^"]*"[^>]*url="([^"]+)"/i,
    /<enclosure[^>]*url="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i,
    /<img[^>]*src="([^"]+)"/i,
  ];
  for (const p of padroes) {
    const m = itemXml.match(p);
    if (m) return m[1];
  }
  return "";
}

async function buscarOgImage(link) {
  try {
    const res = await fetch(link, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,pt-BR;q=0.8",
      },
      signal: AbortSignal.timeout(12000),
      redirect: "follow",
    });
    if (!res.ok) return "";
    const html = (await res.text()).slice(0, 300000);
    const padroes = [
      /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
      /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i,
      /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i,
    ];
    for (const p of padroes) {
      const m = html.match(p);
      if (m && m[1].startsWith("http")) return m[1];
    }
    return "";
  } catch {
    return "";
  }
}

async function coletarFeed(fonte) {
  try {
    const res = await fetch(fonte.url, {
      headers: { "User-Agent": "AcertoGamesBot/1.0" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const itens = [...xml.matchAll(/<item[\s\S]*?<\/item>/gi)].map((m) => m[0]);
    return itens.map((item) => ({
      fonte: fonte.nome,
      pais: fonte.pais,
      idioma: fonte.idioma,
      imagem: fonte.imagensLiberadas ? extrairImagem(item) : "",
      credito: fonte.credito || "Reprodução",
      titulo: extrair(item, "title"),
      link: extrair(item, "link"),
      data: extrair(item, "pubDate") || extrair(item, "dc:date"),
      resumo: extrair(item, "description").slice(0, 2000),
    }));
  } catch (err) {
    console.warn(`⚠️  Falha ao coletar "${fonte.nome}": ${err.message}`);
    return [];
  }
}

function dentroDaJanela(pubDate, horas) {
  const d = new Date(pubDate);
  if (isNaN(d)) return true; // sem data válida, deixa passar para triagem
  return Date.now() - d.getTime() <= horas * 3600 * 1000;
}

function slugsExistentes() {
  const slugs = new Set();
  for (const dir of [DIR_RASCUNHOS, DIR_PUBLICADOS]) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".json")) slugs.add(f.replace(/\.json$/, ""));
    }
  }
  return slugs;
}

// ---------- 2. Redação com Claude ----------

function titulosJaPublicados() {
  if (!fs.existsSync(DIR_PUBLICADOS)) return [];
  return fs.readdirSync(DIR_PUBLICADOS)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try { return JSON.parse(fs.readFileSync(path.join(DIR_PUBLICADOS, f), "utf-8")).title; }
      catch { return null; }
    })
    .filter(Boolean)
    .slice(-20);
}

async function escreverMateria(item) {
  const hoje = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });

  const material = [
    `FONTE: ${item.fonte} (${item.pais || "?"} — material original em ${item.idioma || "?"})`,
    `LINK ORIGINAL: ${item.link}`,
    `DATA DE PUBLICAÇÃO DA FONTE: ${item.data}`,
    `TÍTULO ORIGINAL: ${item.titulo}`,
    `RESUMO/CONTEÚDO DISPONÍVEL: ${item.resumo}`,
    ``,
    `DATA DE HOJE: ${hoje}`,
    ``,
    `MATÉRIAS JÁ PUBLICADAS NO SITE (não repita estas notícias; se o material for a MESMA notícia de alguma delas, responda {"pular": true, "motivo": "notícia já publicada"}):`,
    ...titulosJaPublicados().map((t) => `- ${t}`),
    ``,
    `Escreva a matéria seguindo a persona e as regras. Lembre: se o material for insuficiente, sinalize na "observacao".`,
  ].join("\n");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: PERSONA,
      messages: [{ role: "user", content: material }],
    }),
  });

  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const texto = data.content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("\n")
    .replace(/```json|```/g, "")
    .trim();

  return JSON.parse(texto);
}

// ---------- 3. Rodada ----------

async function pautaManual(url) {
  console.log(`📌 PAUTA MANUAL: ${url}`);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AcertoGamesBot/1.0)" },
      signal: AbortSignal.timeout(15000),
      redirect: "follow",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = (await res.text()).slice(0, 400000);
    const pegar = (re) => { const m = html.match(re); return m ? m[1].trim() : ""; };
    return {
      fonte: new URL(url).hostname.replace("www.", ""),
      pais: "?", idioma: "?", credito: "Reprodução",
      link: url,
      data: new Date().toUTCString(),
      titulo: pegar(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i) || pegar(/<title[^>]*>([^<]+)<\/title>/i),
      resumo: pegar(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) || pegar(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i),
      imagem: pegar(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i),
    };
  } catch (err) {
    console.error(`❌ Não consegui apurar a pauta manual: ${err.message}`);
    return null;
  }
}

async function main() {
  const AUTO = CONFIG.publicacaoAutomatica === true;
  const DIR_DESTINO = AUTO ? DIR_PUBLICADOS : DIR_RASCUNHOS;
  console.log(`🤖 Robô Acerto Games iniciando rodada... (modo: ${AUTO ? "PUBLICAÇÃO DIRETA" : "rascunho"})\n`);
  fs.mkdirSync(DIR_RASCUNHOS, { recursive: true });
  fs.mkdirSync(DIR_PUBLICADOS, { recursive: true });

  // Pauta manual tem passagem VIP: escreve só ela e encerra
  const PAUTA = (process.env.PAUTA || "").trim();
  let coletas;
  if (PAUTA) {
    if (!PAUTA.startsWith("http")) {
      console.error("❌ A pauta manual precisa ser o LINK da notícia (regra da casa: sem fonte, sem matéria).");
      return;
    }
    const item = await pautaManual(PAUTA);
    coletas = item && item.titulo ? [[item]] : [[]];
  } else {
    coletas = await Promise.all(CONFIG.fontes.map(coletarFeed));
  }
  // Rodízio: intercala 1 item de cada fonte para diversificar a pauta
  const filas = coletas.map((c) => c.filter((i) => i.titulo && dentroDaJanela(i.data, CONFIG.horasJanela)));
  let itens = [];
  for (let rodada = 0; filas.some((f) => f.length > rodada); rodada++) {
    for (const fila of filas) if (fila[rodada]) itens.push(fila[rodada]);
  }
  // Prioridade editorial: pautas com palavras quentes furam a fila
  const quentes = (CONFIG.palavrasPrioritarias || []).map((p) => p.toLowerCase());
  const ehQuente = (i) => {
    const texto = `${i.titulo} ${i.resumo}`.toLowerCase();
    return quentes.some((p) => texto.includes(p));
  };
  itens = [...itens.filter(ehQuente), ...itens.filter((i) => !ehQuente(i))];

  // Cota GTA: se houver pauta de GTA (janela estendida), ela garante vaga no topo da rodada
  const cota = CONFIG.cotaGTA || {};
  if (cota.ativa && !PAUTA) {
    const REGEX_GTA_COTA = /gta\s*(6|vi)?\b|grand theft auto|rockstar/i;
    const ehGTA = (i) => REGEX_GTA_COTA.test(`${i.titulo} ${i.resumo}`);
    const jaTemGTA = itens.slice(0, CONFIG.maxMateriasPorRodada).some(ehGTA);
    if (!jaTemGTA) {
      const candidatasGTA = coletas
        .flat()
        .filter((i) => i.titulo && ehGTA(i) && dentroDaJanela(i.data, cota.janelaHoras || 72))
        .filter((i) => !itens.slice(0, CONFIG.maxMateriasPorRodada).some((x) => x.link === i.link));
      if (candidatasGTA.length) {
        console.log(`🎯 Cota GTA: garantindo pauta "${candidatasGTA[0].titulo.slice(0, 60)}..."`);
        itens = [candidatasGTA[0], ...itens.filter((i) => i.link !== candidatasGTA[0].link)];
      } else {
        console.log("🎯 Cota GTA: nenhuma pauta de GTA nas fontes (janela de " + (cota.janelaHoras || 72) + "h) — rodada segue normal.");
      }
    }
  }
  console.log(`📡 ${itens.length} itens coletados dentro da janela de ${CONFIG.horasJanela}h.`);

  const existentes = slugsExistentes();
  const meta = CONFIG.maxMateriasPorRodada;
  const maxTentativas = meta * 4; // pautas recusadas não desperdiçam a rodada
  let tentativas = 0;

  let novos = 0;
  for (const item of itens) {
    if (novos >= meta || tentativas >= maxTentativas) break;
    tentativas++;
    try {
      if (!item.imagem && item.link) {
        console.log(`🖼️  Buscando imagem na página...`);
        item.imagem = await buscarOgImage(item.link);
        console.log(item.imagem ? `   📷 Imagem encontrada` : `   ⬜ Sem imagem (site pode ter bloqueado) — capa em gradiente`);
      }
      console.log(`✍️  Escrevendo: ${item.titulo.slice(0, 70)}...`);
      const materia = await escreverMateria(item);

      if (materia.pular) {
        console.log(`   ⛔ Fora do escopo (${materia.motivo || "não é pauta de games"}), próxima pauta...`);
        continue;
      }

      if (!materia.slug || !materia.title || !Array.isArray(materia.body)) {
        console.warn("   ⚠️  JSON incompleto, pulando.");
        continue;
      }
      if (existentes.has(materia.slug)) {
        console.log("   ↩️  Já existe, pulando.");
        continue;
      }

      if (item.imagem) {
        materia.image = item.imagem;
        materia.imageCredit = `${item.credito}/${item.fonte}`;
      }

      if (materia.observacao) console.log(`   📝 Obs do robô: ${materia.observacao}`);
      if (AUTO) delete materia.observacao; // nota interna não vai ao ar

      const destino = path.join(DIR_DESTINO, `${materia.slug}.json`);
      fs.writeFileSync(destino, JSON.stringify(materia, null, 2), "utf-8");
      existentes.add(materia.slug);
      novos++;
      console.log(`   ✅ ${AUTO ? "Publicado" : "Rascunho salvo"}: ${AUTO ? "content/publicados" : "content/rascunhos"}/${materia.slug}.json`);
    } catch (err) {
      console.warn(`   ❌ Erro nesta matéria: ${err.message}`);
    }
  }

  console.log(`\n🏁 Rodada concluída: ${novos} matéria(s) nova(s).`);
  if (!AUTO) console.log("👀 Revise em content/rascunhos/ e aprove com: npm run publicar <slug>");
}

main().catch((err) => {
  console.error("❌ ERRO FATAL DO ROBÔ:", err.message);
  console.error(err.stack);
  process.exit(1);
});
