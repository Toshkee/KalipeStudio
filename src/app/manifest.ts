import type { MetadataRoute } from "next";
import { studio } from "@/lib/site";

/**
 * Web manifest: ime i boje kad se sajt doda na početni ekran telefona.
 * Ikone su iste koje Next već servira iz app/ (icon.svg, apple-icon.png).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: studio.name,
    short_name: studio.short,
    description: `${studio.tagline[0].toUpperCase()}${studio.tagline.slice(1)} — šminka, kosa i nokti u ${studio.address.cityLocative}.`,
    lang: "sr-Latn-ME",
    start_url: "/",
    display: "standalone",
    background_color: "#120507",
    theme_color: "#120507",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
