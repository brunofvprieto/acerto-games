import fs from "fs";
import path from "path";
import { posts as manuais } from "../data/posts";

const DIR_PUBLICADOS = path.join(process.cwd(), "content", "publicados");

function lerPublicados() {
  if (!fs.existsSync(DIR_PUBLICADOS)) return [];
  return fs
    .readdirSync(DIR_PUBLICADOS)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(DIR_PUBLICADOS, f), "utf-8"));
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

export function getAllPosts() {
  const roboPost = lerPublicados();
  // Posts do robô entram primeiro (mais recentes no topo)
  return [...roboPost, ...manuais];
}

export function getPost(slug) {
  return getAllPosts().find((p) => p.slug === slug);
}
