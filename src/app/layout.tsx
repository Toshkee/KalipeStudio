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
  title: "Kalipè Studio — definition of beauty | Podgorica",
  description:
    "Kalipè Studio u Podgorici — profesionalno šminkanje, svadbeni glam, frizerske usluge i njega noktiju. Piperska bb, City kej. Zakažite termin: 060 091 410.",
  keywords: [
    "salon ljepote Podgorica",
    "šminkanje Podgorica",
    "svadbena šminka",
    "frizerski salon Podgorica",
    "manikir Podgorica",
    "Kalipe Studio",
  ],
  openGraph: {
    title: "Kalipè Studio — definition of beauty",
    description:
      "Beauty studio u Podgorici: šminka, kosa, nokti. Piperska bb, City kej.",
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
      lang="sr-Latn-ME"
      className={`${cormorant.variable} ${script.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
