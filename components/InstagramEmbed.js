export default function InstagramEmbed({ url }) {
  if (!url || !url.startsWith("https://www.instagram.com/")) return null;
  const clean = url.split("?")[0].replace(/\/$/, "");
  return (
    <div className="my-6 flex justify-center">
      <iframe
        src={`${clean}/embed`}
        title="Publicação do Instagram"
        className="w-full max-w-[540px] border-0 bg-white"
        style={{ minHeight: "680px" }}
        loading="lazy"
        allowTransparency
      />
    </div>
  );
}
