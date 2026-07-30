import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/*
 * One display voice for the whole brand, self-hosted. Gambarino carries
 * the wordmark, the nav and every headline; body text sits in the system
 * neutral so nothing argues with it.
 */
const gambarino = localFont({
  src: "./fonts/Gambarino-Regular.woff2",
  variable: "--font-gambarino",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kalipè Studio · šminka, kosa i nokti u Podgorici",
  description:
    "Kalipè Studio na Piperskoj bb u Podgorici. Šminka, mladenke, kosa i nokti na jednom mjestu. Termini na 060 091 410.",
  keywords: [
    "šminkanje Podgorica",
    "make up Podgorica",
    "mladenačka šminka Crna Gora",
    "frizerski salon Podgorica",
    "manikir Podgorica",
    "Kalipe Studio",
  ],
  openGraph: {
    title: "Kalipè Studio · definicija ljepote",
    description:
      "Šminka, mladenke, kosa i nokti. Piperska bb, lamela 3, Podgorica.",
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
    <html lang="cnr" className={`${gambarino.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
