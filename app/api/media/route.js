import { NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set([
  "cdn.akamai.steamstatic.com",
  "www.callofduty.com",
  "assets.nintendo.com",
  "images.nintendolife.com",
  "www.sega.com",
  "media.graphassets.com",
]);

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const src = searchParams.get("src");
    if (!src) return new NextResponse("Missing src", { status: 400 });

    const target = new URL(src);
    if (target.protocol !== "https:" || !ALLOWED_HOSTS.has(target.hostname)) {
      return new NextResponse("Host not allowed", { status: 403 });
    }

    const response = await fetch(target.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 AcertoGames/1.0",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return new NextResponse("Upstream image unavailable", { status: 502 });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const bytes = await response.arrayBuffer();

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new NextResponse("Image proxy error", { status: 500 });
  }
}
