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
const ARQ_REGISTRO = path.join(RAIZ, "content/processados.json");

function lerRegistro() {
  try {
    return new Set(JSON.parse(fs.readFileSync(ARQ_REGISTRO, "utf-8")));
  } catch {
    return new Set();
  }
}

function salvarRegistro(reg) {
  fs.writeFileSync(ARQ_REGISTRO, JSON.stringify([...reg].slice(-500)), "utf-8");
}
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

async function buscarTextoCompleto(link) {
  try {
    const res = await fetch(link, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9,pt-BR;q=0.8",
      },
      signal: AbortSignal.timeout(15000),
      redirect: "follow",
    });
    if (!res.ok) return "";
    let html = (await res.text()).slice(0, 600000);
    // Remover blocos que não são conteúdo
    html = html.replace(/<(script|style|noscript|nav|header|footer|aside|form|svg)[\s\S]*?<\/\1>/gi, " ");
    // Preferir o miolo da matéria quando existir
    const art = html.match(/<article[\s\S]*?<\/article>/i);
    if (art) html = art[0];
    const texto = html
      .replace(/<(h[1-6]|li|p|br|tr)[^>]*>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .replace(/&#\d+;|&\w+;/g, " ")
      .replace(/[ \t]+/g, " ")
      .replace(/\n\s*\n+/g, "\n")
      .trim();
    return texto.length > 400 ? texto.slice(0, 8000) : "";
  } catch {
    return "";
  }
}

const EXT_POR_TIPO = {
  "image/jpeg": "jpg", "image/jpg": "jpg", "image/png": "png",
  "image/webp": "webp", "image/avif": "avif", "image/gif": "gif",
};

async function baixarImagem(url, slug, referer) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "Accept": "image/avif,image/webp,image/png,image/jpeg,*/*;q=0.8",
        ...(referer ? { Referer: referer } : {}),
      },
      signal: AbortSignal.timeout(15000),
      redirect: "follow",
    });
    if (!res.ok) return "";
    const tipo = (res.headers.get("content-type") || "").split(";")[0].trim();
    const ext = EXT_POR_TIPO[tipo];
    if (!ext) return "";
    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.length < 5000 || bytes.length > 4 * 1024 * 1024) return ""; // nem ícone, nem elefante
    const dir = path.join(RAIZ, "public/img");
    fs.mkdirSync(dir, { recursive: true });
    const nome = `${slug}.${ext}`;
    fs.writeFileSync(path.join(dir, nome), bytes);
    return `/img/${nome}`;
  } catch {
    return "";
  }
}

async function buscarVideoNoYouTube(termo) {
  try {
    const q = encodeURIComponent(termo.slice(0, 80));
    const res = await fetch(`https://www.youtube.com/results?search_query=${q}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return "";
    const html = await res.text();
    const m = html.match(/"videoId":"([\w-]{11})"/);
    return m ? m[1] : "";
  } catch {
    return "";
  }
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

const STOPWORDS = new Set(["de","da","do","das","dos","e","o","a","os","as","um","uma","para","pra","com","em","no","na","nos","nas","que","por","mais","sem","apos","após","sobre","seu","sua","tem","vai","foi","ser","esta","está","ate","até"]);

function tokensDe(titulo) {
  return new Set(
    String(titulo).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ").split(/\s+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w))
  );
}

function tituloDuplicado(novo, existentes) {
  const A = tokensDe(novo);
  for (const antigo of existentes) {
    const B = tokensDe(antigo);
    let comuns = 0;
    for (const w of A) if (B.has(w)) comuns++;
    const menor = Math.min(A.size, B.size) || 1;
    if (comuns >= 4 && comuns / menor >= 0.6) return antigo;
  }
  return "";
}

function titulosJaPublicados() {
  if (!fs.existsSync(DIR_PUBLICADOS)) return [];
  return fs.readdirSync(DIR_PUBLICADOS)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        const p = JSON.parse(fs.readFileSync(path.join(DIR_PUBLICADOS, f), "utf-8"));
        const ts = p.publicadoEm ? Date.parse(p.publicadoEm) : 0;
        return { title: p.title, ts: isNaN(ts) ? 0 : ts };
      } catch { return null; }
    })
    .filter((x) => x && x.title)
    .sort((a, b) => b.ts - a.ts)          // mais recentes PRIMEIRO
    .map((x) => x.title);                  // lista completa, do novo pro antigo
}

async function escreverMateria(item, titulosRodada = []) {
  const hoje = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit", month: "short", year: "numeric",
  });

  const material = [
    item.manual ? `⚠️ PAUTA MANUAL DO EDITOR — já aprovada na linha editorial; não recuse por escopo.` : "",
    `FONTE: ${item.fonte} (${item.pais || "?"} — material original em ${item.idioma || "?"})`,
    `LINK ORIGINAL: ${item.link}`,
    `DATA DE PUBLICAÇÃO DA FONTE: ${item.data}`,
    `TÍTULO ORIGINAL: ${item.titulo}`,
    `RESUMO DO FEED: ${item.resumo}`,
    item.textoCompleto ? `\nCONTEÚDO COMPLETO DA MATÉRIA (texto extraído da página original — sua principal fonte de apuração):\n${item.textoCompleto}` : "",
    ``,
    `DATA DE HOJE: ${hoje}`,
    ``,
    `MATÉRIAS JÁ PUBLICADAS NO SITE — compare o ASSUNTO, não as palavras: se o material tratar do mesmo fato/anúncio de qualquer uma delas (mesmo com título diferente ou vindo de outro veículo), responda {"pular": true, "motivo": "notícia já publicada"}:`,
    ...[...titulosRodada, ...titulosJaPublicados().slice(0, 30)].map((t) => `- ${t}`),
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
      manual: true,
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
  const registro = lerRegistro();
  const titulosRodada = [];
  const meta = CONFIG.maxMateriasPorRodada;
  const maxTentativas = meta * 4; // pautas recusadas não desperdiçam a rodada
  let tentativas = 0;

  let novos = 0;
  for (const item of itens) {
    if (novos >= meta || tentativas >= maxTentativas) break;
    if (item.link && registro.has(item.link)) continue; // já escrito ou recusado antes
    tentativas++;
    try {
      if (item.link) {
        console.log(`📄 Lendo a matéria completa na fonte...`);
        item.textoCompleto = await buscarTextoCompleto(item.link);
        console.log(item.textoCompleto ? `   ✓ ${item.textoCompleto.length} caracteres apurados` : `   ⚠ Página bloqueou a leitura — usando só o resumo do feed`);
      }
      if (!item.imagem && item.link) {
        console.log(`🖼️  Buscando imagem na página...`);
        item.imagem = await buscarOgImage(item.link);
        console.log(item.imagem ? `   📷 Imagem encontrada na fonte` : `   ⬜ Fonte não deu imagem`);
      }
      const pautaDeVideo = /trailer|teaser|gameplay|revela|reveal/i.test(item.titulo);
      if (!item.imagem || pautaDeVideo) {
        console.log(`🔎 Caçando vídeo da notícia no YouTube...`);
        const consultas = [
          item.titulo,
          `${item.titulo} trailer`,
          [...tokensDe(item.titulo)].slice(0, 4).join(" ") + " game trailer",
        ];
        for (const q of consultas) {
          item.videoYT = await buscarVideoNoYouTube(q);
          if (item.videoYT) break;
        }
        console.log(item.videoYT ? `   📺 Vídeo achado` : `   ⬜ Nenhum vídeo encontrado (raro)`);
      }
      console.log(`✍️  Escrevendo: ${item.titulo.slice(0, 70)}...`);
      const materia = await escreverMateria(item, titulosRodada);

      if (materia.pular) {
        console.log(`   ⛔ Pauta recusada (${materia.motivo || "fora do escopo"}), registrando e seguindo...`);
        if (item.link) registro.add(item.link);
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
      const parecido = tituloDuplicado(materia.title, [...titulosRodada, ...titulosJaPublicados()]);
      if (parecido) {
        console.log(`   🔁 TRAVA ANTI-DUPLICATA: título muito parecido com "${parecido.slice(0, 60)}..." — descartando.`);
        if (item.link) registro.add(item.link);
        continue;
      }

      if (
        item.videoYT &&
        /trailer|teaser|gameplay|revela|reveal/i.test(`${item.titulo} ${materia.title}`) &&
        Array.isArray(materia.body) &&
        !materia.body.some((l) => typeof l === "string" && l.startsWith("video:"))
      ) {
        materia.body.splice(1, 0, `video: https://www.youtube.com/watch?v=${item.videoYT}`);
        console.log(`   🎬 Player do trailer embutido na matéria`);
      }

      const candidatas = [];
      if (item.imagem) candidatas.push({ url: item.imagem, credito: `${item.credito}/${item.fonte}` });
      if (item.videoYT) {
        candidatas.push({ url: `https://img.youtube.com/vi/${item.videoYT}/maxresdefault.jpg`, credito: "Reprodução/YouTube" });
        candidatas.push({ url: `https://img.youtube.com/vi/${item.videoYT}/hqdefault.jpg`, credito: "Reprodução/YouTube" });
      }
      if (candidatas.length) console.log(`💾 Baixando imagem pra casa (${candidatas.length} candidata(s))...`);
      for (const c of candidatas) {
        const local = await baixarImagem(c.url, materia.slug, item.link);
        if (local) {
          materia.image = local;
          materia.imageCredit = c.credito;
          console.log(`   ✓ Imagem hospedada em ${local}`);
          break;
        }
      }
      if (!materia.image && item.imagem) {
        materia.image = item.imagem;
        materia.imageCredit = `${item.credito}/${item.fonte}`;
        console.log(`   ⚠ Downloads falharam — usando link remoto como último recurso`);
      }
      if (!materia.image) console.log(`   ⚠ ATENÇÃO: nenhuma imagem em nenhuma camada — caso raríssimo, adicione manualmente.`);

      if (materia.observacao) console.log(`   📝 Obs do robô: ${materia.observacao}`);
      if (AUTO) delete materia.observacao; // nota interna não vai ao ar
      materia.publicadoEm = new Date().toISOString(); // carimbo p/ ordenação precisa

      const destino = path.join(DIR_DESTINO, `${materia.slug}.json`);
      fs.writeFileSync(destino, JSON.stringify(materia, null, 2), "utf-8");
      existentes.add(materia.slug);
      titulosRodada.push(materia.title);
      if (item.link) registro.add(item.link);
      novos++;
      console.log(`   ✅ ${AUTO ? "Publicado" : "Rascunho salvo"}: ${AUTO ? "content/publicados" : "content/rascunhos"}/${materia.slug}.json`);
    } catch (err) {
      console.warn(`   ❌ Erro nesta matéria: ${err.message}`);
    }
  }

  salvarRegistro(registro);
  console.log(`\n🏁 Rodada concluída: ${novos} matéria(s) nova(s).`);
  if (!AUTO) console.log("👀 Revise em content/rascunhos/ e aprove com: npm run publicar <slug>");
}

main().catch((err) => {
  console.error("❌ ERRO FATAL DO ROBÔ:", err.message);
  console.error(err.stack);
  process.exit(1);
});
