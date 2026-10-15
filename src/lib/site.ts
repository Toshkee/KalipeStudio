/**
 * Jedini izvor istine o studiju.
 *
 * Sve što zna ime, adresu, telefon, radno vrijeme ili cijene čita odavde —
 * metadata, JSON-LD, sitemap, robots i sve komponente. Ništa se ne kuca dvaput.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  IZVORI (provjereno 15. 10. 2026. na studijskom Instagramu, @kalipe.studio)
 *
 *  - telefon 060 091 410: bio profila i objave o zakazivanju
 *  - 069 551 250: Anđelin broj, uz studijski, u objavi o rezervacijama
 *  - adresa: objava o otvaranju — „Od 09. januara otvaramo vrata našeg
 *    novog prostora … Naša nova adresa je Piperska bb - lamela 3, City kej."
 *  - usluge: opisi objava (šminka, kosa, pramenovi i farbanje, tretmani,
 *    pletenice s perlicama, manikir, gel ojačavanje, pedikir s trajnim lakom)
 *  - Marijana, nokti, 15 godina iskustva: objava „Sa potpisom Marijana"
 *
 *  Radno vrijeme i cijene nisu nigdje objavljeni — moraju doći od vlasnice.
 * ─────────────────────────────────────────────────────────────────────────
 */

/**
 * Telefon i adresa su potvrđeni iz studijskog Instagrama, pa JSON-LD ide van.
 * Radno vrijeme i cijene se u njega dodaju sami čim se upišu ispod.
 */
export const DATA_CONFIRMED = true;

/**
 * Adresa sajta za canonical, sitemap, robots, og:image i JSON-LD.
 *
 * Domen još nije kupljen, pa se adresa uzima od Vercela:
 * VERCEL_PROJECT_PRODUCTION_URL je produkcijski domen projekta — danas
 * *.vercel.app, a sam postaje pravi domen čim se doda u Vercel. Zakucan
 * nepostojeći domen bi slao canonical i og:image u prazno, pa link podijeljen
 * u Viberu ili na Instagramu ne bi imao sliku.
 *
 * `kalipe-studio.com` i `kalipestudio.com` su provjereno slobodni (Verisign RDAP).
 */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

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
    { label: "Studio", display: "060 091 410", tel: "+38260091410" },
    { label: "Anđela", display: "069 551 250", tel: "+38269551250" },
  ],

  instagram: {
    handle: "@kalipe.studio",
    url: "https://www.instagram.com/kalipe.studio/",
  },

  /** Prva godina rada — koristi se za copyright, da se ne peče u build-u. */
  founded: 2026,
} as const;

export const primaryPhone = studio.phones[0];

/**
 * U Crnoj Gori se termin češće dogovara porukom na Viberu nego pozivom.
 * Na telefonu otvara prepisku sa studijskim brojem; na desktopu Viber
 * aplikaciju, ako je instalirana.
 */
export const viberLink = `viber://chat?number=${encodeURIComponent(primaryPhone.tel)}`;

/** Jednoredna adresa za metadata i tekst. */
export const addressLine = `${studio.address.street}, ${studio.address.district}, ${studio.address.city}`;

/**
 * Mapa se vrti oko pretrage mjesta, ne oko koordinata — vidi `studio.geo`.
 * Kad vlasnica pošalje pin, ovdje ide `?q=<lat>,<lng>`.
 */
const mapQuery = encodeURIComponent(addressLine);
export const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
/** Na telefonu otvara Google Maps aplikaciju. */
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

/* ─────────────────────────────── Tim ─────────────────────────────── */

export const team: { name: string; role: string; note?: string }[] = [
  { name: "Anđela Jovićević", role: "Šminka", note: "osnivačica studija" },
  { name: "Marijana", role: "Nokti", note: "15 godina iskustva" },
];

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

/** Čeka potvrdu vlasnice — nije objavljeno ni na Instagramu. */
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
  key: "sminka" | "kosa" | "nokti";
  title: string;
  /** Pojedinačne usluge, onako kako ih studio nudi na Instagramu. */
  items: string[];
  /** Cijena u eurima, kao donja granica ("od XX€"). `null` dok ne potvrdi. */
  from: number | null;
};

export const services: Service[] = [
  {
    key: "sminka",
    title: "Šminka",
    items: [
      "Dnevna i večernja šminka",
      "Mature i proslave",
      "Mladenke",
      "Šminka i frizura u istom terminu",
    ],
    from: null,
  },
  {
    key: "kosa",
    title: "Kosa",
    items: [
      "Feniranje i lokne",
      "Punđe i svečane frizure",
      "Pramenovi i farbanje",
      "Tretmani njege",
      "Pletenice s perlicama za djevojčice",
    ],
    from: null,
  },
  {
    key: "nokti",
    title: "Nokti",
    items: [
      "Manikir i trajni lak",
      "Ojačavanje prirodnih noktiju gelom",
      "Pedikir s trajnim lakom",
      "HEYLOVE lakovi",
    ],
    from: null,
  },
];

export const hasPrices = services.some((s) => s.from !== null);

/* ──────────────────────────── Česta pitanja ──────────────────────────── */

/**
 * Samo ono što studio sam tvrdi na Instagramu. Pitanja o parkingu, kapari i
 * radu na terenu namjerno nedostaju — izmišljen odgovor je gori od nikakvog.
 *
 * Bez FAQPage JSON-LD-a: Google je 2023. ukinuo FAQ rich results za sve osim
 * državnih i zdravstvenih sajtova, pa bi ovdje bio mrtav teret.
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: "Kako da zakažem termin?",
    a: `Pozovi studio na ${studio.phones[0].display}, piši nam na Viberu na isti broj ili u poruke na Instagramu. Za šminku možeš zvati i Anđelu na ${studio.phones[1].display}.`,
  },
  {
    q: "Koliko košta?",
    a: "Zavisi od usluge, a kod kose i od dužine. Javi se i reći ćemo ti tačnu cijenu prije termina.",
  },
  {
    q: "Mogu li isti dan i šminku, i kosu, i nokte?",
    a: "Možeš, sve je u istom studiju. Reci nam kad zakazuješ, pa ćemo termine složiti jedan za drugim.",
  },
  {
    q: "Radite li pletenice za djevojčice?",
    a: "Da, pletenice s perlicama. Imamo veliki izbor boja i detalja, pa perlice biramo zajedno.",
  },
  {
    q: "Gdje se nalazite?",
    a: `${studio.address.street}, ${studio.address.district}, ${studio.address.city}.`,
  },
];

/**
 * Tržišni orijentiri iz istraživanja (SrediMe prosjeci za Podgoricu),
 * da se vlasničine cijene mogu uporediti prije objave — NE za prikaz na sajtu.
 *
 *   šminkanje ~44–53€ · šišanje ~24€ · nadogradnja noktiju ~29€
 *   gel lak ~22€ · manikir ~22€
 */
