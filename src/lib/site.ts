/**
 * Jedini izvor istine o studiju.
 *
 * Sve što zna ime, adresu, telefon, radno vrijeme ili cijene čita odavde —
 * metadata, JSON-LD, sitemap, robots i sve komponente. Ništa se ne kuca dvaput.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  UPOZORENJE
 *
 *  Podaci ispod označeni sa `unconfirmed` preneseni su iz ranije verzije
 *  sajta. Sweep od 20 agenata nije uspio da ijedan od njih potvrdi iz
 *  nezavisnog izvora, a jedan alat je uhvaćen kako izmišlja Instagram
 *  podatke koji su ih "potvrđivali".
 *
 *  Za novootvoreni salon bez Google profila to je očekivano — ali znači da
 *  ovi podaci moraju doći od vlasnice, ne sa interneta.
 *
 *  Dok je `DATA_CONFIRMED` false, JSON-LD se ne emituje. Ne želimo da Google
 *  indeksira netačan telefon ili adresu pravog biznisa.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Prebaciti na `true` tek kad vlasnica potvrdi telefon, adresu i radno vrijeme. */
export const DATA_CONFIRMED = false;

/**
 * Domen još nije kupljen. Kad bude — mijenja se samo ova linija.
 * `kalipe-studio.com` i `kalipestudio.com` su provjereno slobodni (Verisign RDAP).
 */
export const SITE_URL = "https://kalipe-studio.com";

export const studio = {
  name: "Kalipè Studio",
  short: "Kalipè",
  tagline: "definicija ljepote",

  /** Zvanično registrovano ime za footer. Nije nađeno ni u jednom registru. */
  legalName: null as string | null,

  address: {
    street: "Piperska bb, lamela 3",
    district: "City kej",
    city: "Podgorica",
    /** Lokativ, za "u ___". Ne izvodi se lijepljenjem slova na nominativ. */
    cityLocative: "Podgorici",
    postalCode: "81000",
    country: "ME",
    countryName: "Crna Gora",
  },

  /**
   * Namjerno prazno. Dva nezavisna geokodera se razilaze za ~370 m i daju
   * različite poštanske brojeve za samu ulicu, a nijedan izvor ne pinuje
   * studio. Do vlasničinog pina mapa ide preko pretrage mjesta.
   */
  geo: null as { lat: number; lng: number } | null,

  phones: [
    { display: "060 091 410", tel: "+38260091410" },
    { display: "069 551 250", tel: "+38269551250" },
  ],

  instagram: {
    handle: "@kalipe.studio",
    url: "https://www.instagram.com/kalipe.studio/",
  },

  /** Prva godina rada — koristi se za copyright, da se ne peče u build-u. */
  founded: 2026,
} as const;

export const primaryPhone = studio.phones[0];

/** Jednoredna adresa za metadata i tekst. */
export const addressLine = `${studio.address.street}, ${studio.address.district}, ${studio.address.city}`;

/**
 * Mapa se vrti oko pretrage mjesta, ne oko koordinata — vidi `studio.geo`.
 * Kad vlasnica pošalje pin, ovdje ide `?q=<lat>,<lng>`.
 */
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${studio.address.street}, ${studio.address.district}, ${studio.address.city}`,
)}&output=embed`;

/* ────────────────────────────── Radno vrijeme ────────────────────────────── */

export type DayHours = {
  /** Skraćenica za prikaz. */
  label: string;
  /** schema.org DayOfWeek. */
  schema: string;
  /** `null` = ne radi. */
  open: string | null;
  close: string | null;
};

/** Čeka potvrdu vlasnice — nije nađeno nigdje na internetu. */
export const openingHours: DayHours[] = [
  { label: "Ponedjeljak", schema: "Monday", open: null, close: null },
  { label: "Utorak", schema: "Tuesday", open: null, close: null },
  { label: "Srijeda", schema: "Wednesday", open: null, close: null },
  { label: "Četvrtak", schema: "Thursday", open: null, close: null },
  { label: "Petak", schema: "Friday", open: null, close: null },
  { label: "Subota", schema: "Saturday", open: null, close: null },
  { label: "Nedjelja", schema: "Sunday", open: null, close: null },
];

export const hasOpeningHours = openingHours.some((d) => d.open !== null);

/* ─────────────────────────────── Usluge ─────────────────────────────── */

export type Service = {
  key: string;
  title: string;
  text: string;
  src: string;
  alt: string;
  /** Cijena u eurima, kao donja granica ("od XX€"). `null` dok ne potvrdi. */
  from: number | null;
};

export const services: Service[] = [
  {
    key: "sminka",
    title: "Šminka",
    text: "Dnevna, večernja i šminka za posebne prilike.",
    src: "/gallery/sminka.jpg",
    alt: "Šminkerka sa četkicama za šminkanje",
    from: null,
  },
  {
    key: "mladenke",
    title: "Mladenke",
    text: "Proba prije vjenčanja, pa šminka i frizura na sam dan.",
    src: "/gallery/mladenke.jpg",
    alt: "Šminkanje mladenke prije vjenčanja",
    from: null,
  },
  {
    key: "kosa",
    title: "Kosa",
    text: "Feniranje, lokne, punđe i farbanje, a za djevojčice pletenice s perlicama.",
    src: "/gallery/kosa.jpg",
    alt: "Uvijanje lokni figarom",
    from: null,
  },
  {
    key: "nokti",
    title: "Nokti",
    text: "Manikir i gel lak u bojama koje ti stoje.",
    src: "/gallery/nokti.jpg",
    alt: "Crveni manikir",
    from: null,
  },
];

export const hasPrices = services.some((s) => s.from !== null);

/* ──────────────────────────── Česta pitanja ──────────────────────────── */

/**
 * Samo ono što sadržaj sajta već tvrdi. Pitanja o parkingu, kapari, radu na
 * terenu i trajanju termina namjerno nedostaju — na njih se ne može odgovoriti
 * bez vlasnice, a izmišljen odgovor na sajtu salona je gori od nikakvog.
 *
 * Bez FAQPage JSON-LD-a: Google je 2023. ukinuo FAQ rich results za sve osim
 * državnih i zdravstvenih sajtova, pa bi ovdje bio mrtav teret.
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: "Kako da zakažem termin?",
    a: `Pozovi ${primaryPhone.display} ili nam piši poruku na Instagramu — dogovorićemo vrijeme koje ti odgovara.`,
  },
  {
    q: "Gdje se nalazite?",
    a: `${studio.address.street}, ${studio.address.district} u ${studio.address.cityLocative}.`,
  },
  {
    q: "Radite li šminku i frizuru za mladenke?",
    a: "Da. Uz probu prije vjenčanja, a onda šminka i frizura na sam dan.",
  },
  {
    q: "Mogu li kod vas i ošišati se i srediti nokte isti dan?",
    a: "Možeš — šminka, kosa i nokti su na jednom mjestu, pa se termini mogu spojiti.",
  },
];

/**
 * Tržišni orijentiri iz istraživanja (SrediMe prosjeci za Podgoricu),
 * da se vlasničine cijene mogu uporediti prije objave — NE za prikaz na sajtu.
 *
 *   šminkanje ~44–53€ · šišanje ~24€ · nadogradnja noktiju ~29€
 *   gel lak ~22€ · manikir ~22€
 */
