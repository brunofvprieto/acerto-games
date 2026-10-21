import "./globals.css";
import Script from "next/script";
import { Archivo, Archivo_Black, Bungee, Space_Mono } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL("https://acertogames.com.br"),
  alternates: { canonical: "/" },
  title: "Acerto Games — Notícias, análises, reviews e opinião",
  description:
    "Portal brasileiro independente de games: notícias, análises, opiniões, reviews e especiais sobre jogos, indústria, hardware e cultura gamer.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Acerto Games",
    title: "Acerto Games: notícias, análises, reviews e opinião sobre games",
    description:
      "Portal brasileiro independente de games: notícias, análises, opiniões, reviews e especiais sobre jogos, indústria, hardware e cultura gamer.",
    images: [{ url: "/og-acerto-games.jpg", width: 1200, height: 630, alt: "Acerto Games" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acerto Games: notícias, análises, reviews e opinião sobre games",
    images: ["/og-acerto-games.jpg"],
  },
};

const GA4_ID = "G-JMHJN5CLSY";

// Fontes hospedadas pelo próprio site (next/font): sem ida ao Google Fonts
// no carregamento e sem bloquear o primeiro texto na tela.
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap", variable: "--font-archivo" });
const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-archivo-black" });
const bungee = Bungee({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-bungee" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--font-space-mono" });

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
    <html lang="pt-BR" className={`${archivo.variable} ${archivoBlack.variable} ${bungee.variable} ${spaceMono.variable}`}>
      <head>

        <meta name="google-adsense-account" content="ca-pub-5246089745607111" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />

        {/* Scripts de terceiros ficam fora do caminho crítico de renderização. */}
        <Script
          id="adsense-loader"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5246089745607111"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`,
          }}
        />
      </body>
    </html>
  );
}
