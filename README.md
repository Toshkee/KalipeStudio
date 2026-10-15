# Kalipè Studio

Jednostranični sajt za studio ljepote u Podgorici — šminka, mladenke, kosa i nokti.

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · GSAP ScrollTrigger · Lenis · WebGL shader u herou.

## Pokretanje

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produkcijski build
npm start          # servira build
npx eslint .       # lint (`next lint` je uklonjen u Next 16)
npx tsc --noEmit   # provjera tipova
```

## Prije objave — obavezno

`src/lib/site.ts` drži **sve** podatke o biznisu: ime, adresu, telefone, radno
vrijeme, usluge i cijene. Ništa od toga se ne kuca po komponentama.

Telefoni, adresa, usluge i tim su provjereni 15. 10. 2026. na studijskom
Instagramu (`@kalipe.studio`) — izvori su pobrojani na vrhu `site.ts`. Zato je
`DATA_CONFIRMED = true` i JSON-LD se emituje.

Još fali od vlasnice:

1. Radno vrijeme → `openingHours` (kontakt i JSON-LD se sami prebace).
2. Cijene → `from` kod svake usluge (cijena se sama pojavi na kartici usluge).
3. Google Maps pin → `studio.geo` i `mapEmbedSrc`.
4. Saglasnost klijentkinja čije su fotografije u galeriji — na Instagramu su
   objavljene, ali sajt je druga upotreba.

## Fotografije

Sve su sa studijskog Instagrama, u `src/assets/photos/`, i uvoze se statički
kroz `src/lib/photos.ts` (Next sam daje dimenzije i blur placeholder, a servira
AVIF/WebP). Zamjena slike = novi fajl istog imena; nova slika = jedan red u
`photos.ts`.

## Domen

Nije još kupljen. `SITE_URL` u `src/lib/site.ts` se uzima iz Vercelove
`VERCEL_PROJECT_PRODUCTION_URL`, pa kad se domen kupi, dovoljno ga je dodati u
Vercel projekat (Settings → Domains) i ponovo deployovati — `metadataBase`,
canonical, `sitemap.ts`, `robots.ts` i JSON-LD se sami prebace. U kodu se ne
mijenja ništa. Lokalno je `http://localhost:3000`.

Provjereno slobodni u trenutku pisanja: `kalipe-studio.com`, `kalipestudio.com`.

## Deploy

Hosting na **Vercelu**. Cloudflare **samo za DNS — siva kuglica, bez proxy-ja**;
Vercel izričito ne preporučuje reverse proxy ispred sebe (gubi se vidljivost
saobraćaja, dodaje se drugi sloj keša i još jedan mrežni skok).

## Struktura

```
src/
  app/
    layout.tsx            metadata, viewport, fontovi
    page.tsx              redoslijed sekcija
    robots.ts             MetadataRoute.Robots
    sitemap.ts            MetadataRoute.Sitemap
    icon.svg              monogram (moderni browseri)
    favicon.ico           16/32/48/256
    apple-icon.png        180×180
    opengraph-image.jpg   1200×630, ~75 KB — enterijer + "Kalipè"; JPEG jer
                          WhatsApp/Viber preskaču pregled linka kad je slika teška
  components/             sekcije + JsonLd + SilkCanvas (WebGL) + ScrollProvider
                          + MobileBar (donja traka za zakazivanje na telefonu)
  assets/photos/          fotografije sa Instagrama (1080px)
  lib/
    site.ts               jedini izvor istine o biznisu
    photos.ts             statički importi fotografija + alt tekstovi
    gsap.ts               registracija GSAP plugina na jednom mjestu
```

## Napomene o kodu

- **Fontovi:** naslovi su EB Garamond, ne Cormorant. Cormorant (i Cormorant
  Infant) crtaju kvačice na malim slovima odvojeno od slova — na crnogorskom
  tekstu to izgleda kao greška. EB Garamond ima osu težine 400–800, pa nema
  `font-light`.
- **GSAP:** sve ide kroz `src/lib/gsap.ts`, koji jedini registruje ScrollTrigger.
- **Animacije:** svaka sekcija provjerava `prefers-reduced-motion` i preskače
  reveal ako je uključen.
- **Telefon prvo:** raspored se piše za 390px, pa se širi (`sm`, `lg`). Meni
  na telefonu je preko cijelog ekrana; mapa je samo na desktopu, telefon dobija
  „Otvori u mapama" koje vodi u aplikaciju.
- **WebGL u herou** crta na 0.5× (telefon) / 0.6× (desktop) CSS veličine i na
  30 fps — šum je mutan i spor, pa se razlika ne vidi, a GPU radi ~6× manje.
- **Godina u footeru** je fiksna (`studio.founded`), ne `new Date()` — stranica se
  prerenderuje statički, pa bi se tekuća godina ispekla u build i zamrzla.
