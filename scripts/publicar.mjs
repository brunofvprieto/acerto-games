// Aprova um rascunho: move de content/rascunhos/ para content/publicados/.
// Uso: npm run publicar <slug>   |   npm run publicar --todos

import fs from "fs";
import path from "path";

const RAIZ = process.cwd();
const RASCUNHOS = path.join(RAIZ, "content/rascunhos");
const PUBLICADOS = path.join(RAIZ, "content/publicados");

const arg = process.argv[2];
if (!arg) {
  console.log("Uso: npm run publicar <slug>   ou   npm run publicar --todos\n");
  console.log("Rascunhos aguardando aprovação:");
  const pendentes = fs.existsSync(RASCUNHOS)
    ? fs.readdirSync(RASCUNHOS).filter((f) => f.endsWith(".json"))
    : [];
  if (!pendentes.length) console.log("  (nenhum)");
  for (const f of pendentes) {
    const m = JSON.parse(fs.readFileSync(path.join(RASCUNHOS, f), "utf-8"));
    console.log(`  • ${f.replace(".json", "")} — "${m.title}"`);
  }
  process.exit(0);
}

fs.mkdirSync(PUBLICADOS, { recursive: true });

const alvos =
  arg === "--todos"
    ? fs.readdirSync(RASCUNHOS).filter((f) => f.endsWith(".json"))
    : [`${arg.replace(/\.json$/, "")}.json`];

for (const f of alvos) {
  const origem = path.join(RASCUNHOS, f);
  if (!fs.existsSync(origem)) {
    console.error(`❌ Rascunho não encontrado: ${f}`);
    continue;
  }
  const materia = JSON.parse(fs.readFileSync(origem, "utf-8"));
  delete materia.observacao; // nota interna não vai ao ar
  fs.writeFileSync(path.join(PUBLICADOS, f), JSON.stringify(materia, null, 2), "utf-8");
  fs.unlinkSync(origem);
  console.log(`✅ Publicado: ${materia.title}`);
}

console.log("\n🚀 Agora é só commitar e dar push — a Vercel publica sozinha.");
