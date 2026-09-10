export const dynamic = "force-static";

const ADS_TXT = "google.com, pub-5246089745607111, DIRECT, f08c47fec0942fa0\n";

export async function GET() {
  return new Response(ADS_TXT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
