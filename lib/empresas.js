import { getAllPosts } from "./posts";

// Seções das três plataformas principais. Cada matéria entra numa seção quando o título cita
// a empresa, seus consoles, serviços ou franquias próprias, ou quando o resumo cita a empresa
// ou o console (campo "nucleo").
// Para forçar ou corrigir a classificação de uma matéria, use no JSON: "empresas": ["xbox"].
export const EMPRESAS = {
  nintendo: {
    slug: "nintendo",
    nome: "Nintendo",
    cor: "#E60012",
    corTexto: "#FFFFFF",
    gradiente: "linear-gradient(135deg, #E60012 0%, #8C000B 60%, #1A0204 100%)",
    empresaCredito: "Nintendo",
    origem: "Desde 1889 · Kyoto",
    descricao: "Notícias, lançamentos, guias e análises de Nintendo e Switch 2: Zelda, Mario, Pokémon e tudo o que sai para os consoles da Nintendo.",
    ano: "1889",
    anoRotulo: "Fundação",
    consoleCurto: "Switch 2",
    console: "Nintendo Switch 2",
    consoleImg: "/img/secao-nintendo-switch-2-dock-sala-foto-oficial.jpg",
    consoleAlt: "Nintendo Switch 2 com os Joy-Con 2 no grip, à frente do dock e de uma TV, sobre fundo vermelho",
    consolePos: "center",
    bio: [
      "Fundada em Kyoto em 1889 como fabricante de baralhos hanafuda, a Nintendo entrou nos videogames nos anos 1970 e marcou gerações com o NES, o Game Boy, o Wii e o Switch.",
      "É a casa de Mario, Zelda, Metroid, Kirby e Donkey Kong, e divide Pokémon com a Game Freak e a Creatures.",
      "O console atual é o Nintendo Switch 2, lançado em 5 de junho de 2025.",
    ],
    nucleo: /\bnintendo\b|switch 2|\bswitch\b/i,
    regex:
      /\bnintendo\b|\bswitch\b|\bzelda\b|super mario|\bmario\b|pok[eé]mon|\bmetroid\b|\bkirby\b|\bpikmin\b|donkey kong|splatoon|smash bros|animal crossing|xenoblade|fire emblem|miyamoto|furukawa|aonuma|game boy|\bwii\b|\bn64\b|nintendo 64|\bsnes\b|famicom|\bamiibo/i,
  },
  playstation: {
    slug: "playstation",
    nome: "PlayStation",
    cor: "#0070D1",
    corTexto: "#FFFFFF",
    gradiente: "linear-gradient(135deg, #0070D1 0%, #00439C 55%, #000F2E 100%)",
    empresaCredito: "Sony",
    origem: "Desde 1994 · Sony",
    descricao: "Notícias, lançamentos e análises de PlayStation: PS5, PS5 Pro, PS Plus, estúdios da Sony e o que vem por aí na próxima geração.",
    ano: "1994",
    anoRotulo: "Primeiro console",
    consoleCurto: "PS5",
    console: "PlayStation 5 e PS5 Pro",
    consoleImg: "/img/secao-playstation-5-slim-dualsense-foto-oficial.jpg",
    consoleAlt: "PlayStation 5 de pé ao lado do controle DualSense, em fundo cinza claro",
    consolePos: "72% center",
    bio: [
      "A divisão de games da Sony estreou com o PlayStation original, lançado no Japão em dezembro de 1994. O PlayStation 2 se tornou o console mais vendido da história, com mais de 160 milhões de unidades.",
      "Hoje a Sony Interactive Entertainment comanda o PS5, lançado em novembro de 2020, o PS5 Pro, a PlayStation Plus e estúdios como Naughty Dog, Insomniac, Santa Monica e Guerrilla.",
      "A próxima geração já está em desenvolvimento, segundo a própria Sony.",
    ],
    nucleo: /playstation|\bps[45]\b|ps5 pro|ps plus|\bsony\b/i,
    regex:
      /playstation|\bps[1-6]\b|ps5 pro|ps plus|psn\b|\bsony\b|naughty dog|insomniac|santa monica studio|guerrilla games|\bbungie\b|dualsense|ps vita|\bpsp\b|god of war|uncharted|the last of us|ghost of y[oō]tei|ghost of tsushima|wolverine|ratchet|gran turismo|astro bot|\bsaros\b|bloodborne|horizon (zero dawn|forbidden west)|death stranding/i,
  },
  xbox: {
    slug: "xbox",
    nome: "Xbox",
    cor: "#107C10",
    corTexto: "#FFFFFF",
    gradiente: "linear-gradient(135deg, #107C10 0%, #0B5A0B 55%, #031A03 100%)",
    empresaCredito: "Microsoft",
    origem: "Desde 2001 · Microsoft",
    descricao: "Notícias, lançamentos e análises de Xbox: Series X|S, Game Pass, Cloud Gaming, Call of Duty, Bethesda e o futuro Project Helix.",
    ano: "2001",
    anoRotulo: "Primeiro console",
    consoleCurto: "Series X|S",
    console: "Xbox Series X|S",
    consoleImg: "/img/secao-xbox-series-x-controle-foto-oficial.jpg",
    consoleAlt: "Xbox Series X preto, Xbox Series X branco e Xbox Series S com seus controles, num cenário noturno de dunas",
    consolePos: "center",
    bio: [
      "A Microsoft entrou no mercado de consoles com o Xbox, lançado em novembro de 2001 ao lado de Halo, e viveu o auge da marca na geração do Xbox 360.",
      "Com as compras da ZeniMax e da Activision Blizzard, passou a controlar séries como Call of Duty, The Elder Scrolls, Fallout, Doom e Warcraft, e hoje também lança seus jogos no PC e no PS5.",
      "A família atual é a Xbox Series X|S, de 2020, ao lado do Game Pass e do Xbox Cloud Gaming. A próxima geração atende pelo nome de Project Helix.",
    ],
    nucleo: /\bxbox\b|game pass/i,
    regex:
      /\bxbox\b|game pass|microsoft gaming|\bhalo\b|gears of war|\bforza\b|bethesda|activision|blizzard|call of duty|modern warfare|warzone|elder scrolls|\bfallout\b|starfield|\bdoom\b|indiana jones|\bfable\b|phil spencer|asha sharma|project helix|ninja theory|obsidian|double fine|minecraft|\bdiablo\b|world of warcraft|overwatch/i,
  },
};

export const LISTA_EMPRESAS = Object.values(EMPRESAS);

export const POR_PAGINA_EMPRESA = 24;

// Devolve as empresas de uma matéria, na ordem em que aparecem primeiro no título.
export function empresasDoPost(post) {
  if (Array.isArray(post.empresas)) {
    return post.empresas.map((e) => EMPRESAS[String(e).toLowerCase()]).filter(Boolean);
  }
  const titulo = post.title || "";
  const resumo = post.excerpt || "";
  return LISTA_EMPRESAS.filter((e) => e.regex.test(titulo) || e.nucleo.test(resumo))
    .map((e) => {
      const m = titulo.match(e.regex);
      return { e, pos: m ? m.index : Infinity };
    })
    .sort((a, b) => a.pos - b.pos)
    .map((x) => x.e);
}

export function postsDaEmpresa(slug) {
  return getAllPosts().filter((p) => empresasDoPost(p).some((e) => e.slug === slug));
}

export function paginarEmpresa(slug, n) {
  const posts = postsDaEmpresa(slug);
  const totalPaginas = Math.max(1, Math.ceil(posts.length / POR_PAGINA_EMPRESA));
  const pagina = Math.min(Math.max(1, n), totalPaginas);
  const inicio = (pagina - 1) * POR_PAGINA_EMPRESA;
  return { posts: posts.slice(inicio, inicio + POR_PAGINA_EMPRESA), pagina, totalPaginas, total: posts.length };
}
