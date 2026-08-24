import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL("https://acertogames.com.br"),
  alternates: { canonical: "/" },
  title: "Acerto Games — Notícias, análises, reviews e opinião",
  description:
    "Portal brasileiro independente de games: notícias, análises, opiniões, reviews e especiais sobre jogos, indústria, hardware e cultura gamer.",
};

const GA4_ID = "G-JMHJN5CLSY";

const schemaWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Acerto Games",
  description:
    "Portal brasileiro independente de games com notícias, análises, opiniões, reviews e especiais.",
  url: "https://acertogames.com.br",
  inLanguage: "pt-BR",
  publisher: {
    "@type": "Organization",
    name: "Acerto Games",
    url: "https://acertogames.com.br",
    founder: {
      "@type": "Person",
      name: "Bruno Vazquez",
      jobTitle: "Jornalista e editor",
      url: "https://acertogames.com.br/autor/bruno-vazquez",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Bungee&family=Archivo:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />

        <meta name="google-adsense-account" content="ca-pub-5246089745607111" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5246089745607111"
          crossOrigin="anonymous"
        />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }} />

        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`,
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
