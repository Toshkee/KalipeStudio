import {
  DATA_CONFIRMED,
  SITE_URL,
  hasOpeningHours,
  hasPrices,
  openingHours,
  services,
  studio,
} from "@/lib/site";

/**
 * schema.org BeautySalon.
 *
 * Od pet provjerenih konkurentskih sajtova u Podgorici samo jedan ima ispravno
 * tipiziran LocalBusiness blok — ovo je stvarna prednost, ne formalnost.
 *
 * Emituje se kao običan <script>, ne kroz next/script: JSON-LD su podaci, a ne
 * kod koji se izvršava, i Next dokumentacija to izričito tako propisuje.
 *
 * Ne emituje se dok podaci nisu potvrđeni — netačan telefon ili adresa u
 * strukturiranim podacima je gori nego nikakvi strukturirani podaci. Radno
 * vrijeme i cijene ulaze sami, tek kad se upišu u site.ts.
 */
export default function JsonLd() {
  if (!DATA_CONFIRMED) return null;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${SITE_URL}/#studio`,
    name: studio.name,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.jpg`,
    description: `Studio ljepote u ${studio.address.cityLocative}: šminka, mladenačka šminka, kosa i nokti.`,
    founder: { "@type": "Person", name: "Anđela Jovićević" },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${studio.address.street}, ${studio.address.district}`,
      addressLocality: studio.address.city,
      postalCode: studio.address.postalCode,
      addressCountry: studio.address.country,
    },
    telephone: studio.phones.map((p) => p.tel),
    sameAs: [studio.instagram.url],
    areaServed: {
      "@type": "City",
      name: studio.address.city,
    },
    currenciesAccepted: "EUR",
  };

  if (studio.legalName) data.legalName = studio.legalName;

  // Koordinate namjerno izostaju dok vlasnica ne pošalje pin — dva nezavisna
  // geokodera se razilaze za ~370 m i za samu ulicu.
  if (studio.geo) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: studio.geo.lat,
      longitude: studio.geo.lng,
    };
  }

  if (hasOpeningHours) {
    data.openingHoursSpecification = openingHours
      .filter((d) => d.open && d.close)
      .map((d) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${d.schema}`,
        opens: d.open,
        closes: d.close,
      }));
  }

  if (hasPrices) {
    const priced = services.filter((s) => s.from !== null);
    const lowest = Math.min(...priced.map((s) => s.from as number));
    const highest = Math.max(...priced.map((s) => s.from as number));

    data.priceRange =
      lowest === highest ? `€${lowest}` : `€${lowest}–€${highest}`;
    data.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Usluge",
      itemListElement: priced.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.items.join(", ") },
        price: s.from,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      // `<` se escape-uje u < da se zatvaranje script taga ne može ubaciti
      // kroz podatke — preporuka iz Next dokumentacije.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
