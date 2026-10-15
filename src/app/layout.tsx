import type { Metadata, Viewport } from "next";
import { EB_Garamond, Great_Vibes, Jost } from "next/font/google";
import "./globals.css";
import { SITE_URL, addressLine, primaryPhone, studio } from "@/lib/site";

// EB Garamond umjesto Cormorant Garamond: Cormorant crta kvačice na malim
// slovima odvojeno od slova (š, ž, č lebde iznad), na svim težinama — što na
// crnogorskom tekstu izgleda kao greška. Ista mana je i kod Cormorant Infant.
// EB Garamond je isti garamond karakter, a dijakritike postavlja ispravno.
// Napomena: osa težine mu ide 400–800, pa nema 300 kao Cormorant.
//
// Težine su zakucane na 400 jer sajt nijednu drugu ne koristi. Bez `weight`
// next/font vuče varijabilni fajl s cijelom osom — za EB Garamond je samo
// latin-ext bio 113 KB, a ide u preload, tj. čeka se prije prvog crtanja.
const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

// Script ispisuje samo "Kalipè" i "da" — sva slova su u latin podskupu, pa
// se samo on učitava unaprijed. `subsets` bira šta ide u preload; @font-face
// za latin-ext i dalje postoji, pa bi "Anđela" u ovom fontu i dalje dobila
// pravo "đ", samo bi se taj fajl skinuo tek kad zatreba.
const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${studio.name} — ${studio.tagline} | ${studio.address.city}`,
    template: `%s | ${studio.name}`,
  },
  description: `${studio.name} u ${studio.address.cityLocative} — profesionalna šminka, mladenačka šminka, frizure i nokti. ${addressLine}. Zakaži termin: ${primaryPhone.display}.`,
  applicationName: studio.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: studio.name,
    title: `${studio.name} — ${studio.tagline}`,
    description: `Studio ljepote u ${studio.address.cityLocative}: šminka, kosa, nokti. ${studio.address.district}.`,
    locale: "sr_ME",
  },
  twitter: {
    card: "summary_large_image",
    title: `${studio.name} — ${studio.tagline}`,
    description: `Studio ljepote u ${studio.address.cityLocative}: šminka, kosa, nokti.`,
  },
};

// themeColor i colorScheme su deprecated u `metadata` od Next 14 —
// od tada žive u zasebnom `viewport` exportu.
export const viewport: Viewport = {
  themeColor: "#120507",
  colorScheme: "dark",
  // Bez `cover` je env(safe-area-inset-bottom) uvijek 0, pa bi donja traka
  // za zakazivanje na iPhone-u sjela ispod home indikatora.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr-Latn-ME"
      className={`${garamond.variable} ${script.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
