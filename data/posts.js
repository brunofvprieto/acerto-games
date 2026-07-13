// Conteúdo de exemplo. Troque pelos seus posts reais.
// cover: par de cores usado para gerar a capa em gradiente (sem precisar de imagem).

export const posts = [
  {
    slug: "gta-6-tudo-que-sabemos",
    category: "notícia",
    title: "GTA VI: tudo o que sabemos até agora sobre o lançamento",
    excerpt:
      "Data, mapa, protagonistas e o que esperar do jogo mais aguardado da década. Reunimos tudo em um só lugar.",
    author: "Redação Acerto Games",
    date: "12 jul 2026",
    readTime: "6 min",
    cover: ["#2EE86C", "#0B3D91"],
    body: [
      "O hype em torno de GTA VI não dá sinais de esfriar. A cada trailer, a Rockstar quebra recordes de visualização e reacende o debate sobre o que um mundo aberto pode ser nesta geração.",
      "Neste guia, reunimos as informações confirmadas oficialmente, separando fato de boato: janela de lançamento, plataformas, protagonistas e os detalhes do mapa inspirado na Flórida.",
      "Este é um texto de exemplo. Substitua pelo conteúdo real da sua redação — a estrutura do site já está pronta para receber matérias longas, com parágrafos, imagens e embeds.",
    ],
  },
  {
    slug: "switch-2-um-ano-depois",
    category: "notícia",
    title: "Switch 2 completa um ano: os números que explicam o sucesso",
    excerpt:
      "O console híbrido da Nintendo virou o lançamento mais rápido da história da empresa. Entenda o porquê.",
    author: "Redação Acerto Games",
    date: "11 jul 2026",
    readTime: "4 min",
    cover: ["#4D9FFF", "#123C6B"],
    body: [
      "Um ano após o lançamento, o Switch 2 consolidou a estratégia da Nintendo de evoluir sem abandonar a base instalada.",
      "Texto de exemplo — substitua pelo seu conteúdo.",
    ],
  },
  {
    slug: "review-jogo-do-ano",
    category: "review",
    nota: 9.5,
    title: "Review: o candidato a jogo do ano chegou — e é brasileiro",
    excerpt:
      "Direção de arte impecável, trilha inspirada e uma história que fica com você. Poucos tropeços não tiram o brilho.",
    author: "Redação Acerto Games",
    date: "10 jul 2026",
    readTime: "9 min",
    cover: ["#2EE86C", "#1F6FEB"],
    body: [
      "De tempos em tempos aparece um jogo que redefine o que esperamos de um estúdio independente. Este é um desses casos.",
      "Texto de exemplo de review. Aqui entram análise de gameplay, gráficos, som, performance e o veredito final com a nota.",
    ],
  },
  {
    slug: "review-fps-competitivo",
    category: "review",
    nota: 7.0,
    title: "Review: o novo FPS competitivo acerta no gunplay, erra no resto",
    excerpt:
      "Tiroteio excelente, progressão frustrante. Vale o download gratuito, mas segure a carteira nas microtransações.",
    author: "Redação Acerto Games",
    date: "9 jul 2026",
    readTime: "7 min",
    cover: ["#1BB558", "#0E2A45"],
    body: ["Texto de exemplo de review. Substitua pelo seu conteúdo."],
  },
  {
    slug: "review-rpg-mundo-aberto",
    category: "review",
    nota: 8.5,
    title: "Review: 80 horas depois, este RPG ainda me surpreende",
    excerpt:
      "Um mundo que reage às suas escolhas de verdade. A tradução em português é um capricho à parte.",
    author: "Redação Acerto Games",
    date: "8 jul 2026",
    readTime: "11 min",
    cover: ["#4D9FFF", "#0A3D62"],
    body: ["Texto de exemplo de review. Substitua pelo seu conteúdo."],
  },
  {
    slug: "ps3-joias-esquecidas",
    category: "retrô",
    title: "10 joias do PS3 que merecem sua atenção antes que desapareçam",
    excerpt:
      "Da era de ouro dos exclusivos aos experimentos que só existiram naquela geração: um guia de resgate.",
    author: "Redação Acerto Games",
    date: "7 jul 2026",
    readTime: "8 min",
    cover: ["#1F6FEB", "#0A0D10"],
    body: [
      "O PS3 teve um começo difícil e um final glorioso. Entre 2011 e 2013, o console recebeu alguns dos jogos mais marcantes da história da Sony.",
      "Texto de exemplo — substitua pelo seu conteúdo retrô.",
    ],
  },
  {
    slug: "historia-dos-arcades-no-brasil",
    category: "retrô",
    title: "A história dos fliperamas no Brasil: das galerias ao streaming",
    excerpt:
      "Como uma geração inteira aprendeu a jogar em máquinas de ficha — e por que essa cultura resiste até hoje.",
    author: "Redação Acerto Games",
    date: "5 jul 2026",
    readTime: "10 min",
    cover: ["#2BD9C8", "#0B4F6C"],
    body: ["Texto de exemplo — substitua pelo seu conteúdo retrô."],
  },
  {
    slug: "industria-brasileira-em-alta",
    category: "notícia",
    title: "Estúdios brasileiros batem recorde de lançamentos no primeiro semestre",
    excerpt:
      "Cena nacional cresce com apoio de editais, publishers internacionais e uma comunidade cada vez mais forte.",
    author: "Redação Acerto Games",
    date: "4 jul 2026",
    readTime: "5 min",
    cover: ["#2EE86C", "#1F6FEB"],
    body: ["Texto de exemplo — substitua pelo seu conteúdo."],
  },
];

export const ticker = [
  "GTA VI ganha novo trailer com gameplay inédito",
  "Promoção de inverno da Steam começa nesta quinta",
  "Estúdio brasileiro anuncia parceria com publisher japonesa",
  "Torneio nacional de fighting games abre inscrições",
];

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
