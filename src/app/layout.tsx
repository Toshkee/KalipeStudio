import type { Metadata, Viewport } from "next";
import { EB_Garamond, Great_Vibes, Jost } from "next/font/google";
import "./globals.css";
import { SITE_URL, addressLine, primaryPhone, studio } from "@/lib/site";

// EB Garamond umjesto Cormorant Garamond: Cormorant crta kvačice na malim
// slovima odvojeno od slova (š, ž, č lebde iznad), na svim težinama — što na
// crnogorskom tekstu izgleda kao greška. Ista mana je i kod Cormorant Infant.
// EB Garamond je isti garamond karakter, a dijakritike postavlja ispravno.
// Napomena: osa težine mu ide 400–800, pa nema 300 kao Cormorant.
const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
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
