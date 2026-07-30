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
    "Kalipè Studio in Podgorica — professional make-up, bridal glam, hair styling and nails. Piperska bb, City kej. Book an appointment: 060 091 410.",
  keywords: [
    "beauty salon Podgorica",
    "make-up artist Podgorica",
    "bridal make-up Montenegro",
    "hair salon Podgorica",
    "manicure Podgorica",
    "Kalipe Studio",
  ],
  openGraph: {
    title: "Kalipè Studio — definition of beauty",
    description:
      "Beauty studio in Podgorica: make-up, hair, nails. Piperska bb, City kej.",
    locale: "en_US",
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
      lang="en"
      className={`${cormorant.variable} ${script.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
