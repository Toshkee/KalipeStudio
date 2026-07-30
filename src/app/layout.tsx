import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Kalipè Studio — definicija ljepote | Podgorica",
  description:
    "Kalipè Studio u Podgorici — profesionalna šminka, mladenačka šminka, frizure i nokti. Piperska bb, City kej. Zakaži termin: 060 091 410.",
  keywords: [
    "salon ljepote Podgorica",
    "šminkanje Podgorica",
    "mladenačka šminka Crna Gora",
    "frizerski salon Podgorica",
    "manikir Podgorica",
    "Kalipe Studio",
  ],
  openGraph: {
    title: "Kalipè Studio — definicija ljepote",
    description:
      "Studio ljepote u Podgorici: šminka, kosa, nokti. Piperska bb, City kej.",
    locale: "sr_ME",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cnr"
      className={`${cormorant.variable} ${script.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
