import { NextResponse } from "next/server";

const SOURCE = "https://universonintendo.com/the-witcher-3-wild-hunt-remastered-ganha-novas-imagens-para-o-switch-2/";
const FALLBACK = "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch2/70010000128692/da1a51c79e918768af5d1556e7416c0bc906665606fd273622ecbbd5cc8cfa26";

export const dynamic = "force-dynamic";

function clean(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/\\u0026/g, "&")
    .replace(/\\\//g, "/");
}

function candidates(html) {
  const found = [];
  const add = (raw) => {
    if (!raw) return;
    const value = clean(raw.trim());
    const url = value.startsWith("//") ? `https:${value}` : value;
    if (!url.startsWith("https://")) return;
    if (!/\.(?:jpe?g|png|webp)(?:\?|$)/i.test(url)) return;
    if (!/witcher|w3|wild-hunt|remastered/i.test(url)) return;
    if (/logo|avatar|icon|emoji|author/i.test(url)) return;
    if (!found.includes(url)) found.push(url);
  };

  for (const match of html.matchAll(/(?:src|data-src|data-lazy-src|data-large-file)=["']([^"']+)["']/gi)) add(match[1]);
  for (const match of html.matchAll(/srcset=["']([^"']+)["']/gi)) {
    for (const item of match[1].split(",")) add(item.trim().split(/\s+/)[0]);
  }
  for (const match of html.matchAll(/https:\/\/[^"'<>\s]+?\.(?:jpe?g|png|webp)(?:\?[^"'<>\s]*)?/gi)) add(match[0]);
  return found;
}

async function fetchImage(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 AcertoGames/1.0",
      Referer: SOURCE,
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`image ${response.status}`);
  return response;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const requested = Number.parseInt(searchParams.get("index") || "0", 10);
    const index = Number.isFinite(requested) && requested >= 0 ? requested : 0;

    const page = await fetch(SOURCE, {
      headers: { "User-Agent": "Mozilla/5.0 AcertoGames/1.0" },
      cache: "no-store",
    });
    const html = page.ok ? await page.text() : "";
    const images = candidates(html);
    const target = images[index] || images[0] || FALLBACK;

    let image;
    try {
      image = await fetchImage(target);
    } catch {
      image = await fetchImage(FALLBACK);
    }

    const bytes = await image.arrayBuffer();
    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "Content-Type": image.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new NextResponse("Witcher gallery image unavailable", { status: 502 });
  }
}
