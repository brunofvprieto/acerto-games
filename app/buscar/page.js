import { Suspense } from "react";
import { getAllPosts } from "../../lib/posts";
import SearchClient from "../../components/SearchClient";

export const metadata = {
  title: "Buscar — Acerto Games",
  description: "Busque matérias no Acerto Games.",
};

export default function Buscar() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.date,
  }));
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 font-display text-2xl uppercase">
        <span className="text-arcade">▸</span> Buscar
      </h1>
      <Suspense fallback={null}>
        <SearchClient posts={posts} />
      </Suspense>
    </main>
  );
}
