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

Na vrhu tog fajla stoji:

```ts
export const DATA_CONFIRMED = false;
```

Dok je `false`, **JSON-LD se ne emituje.** To je namjerno. Sweep od 20 agenata
nije uspio da nezavisno potvrdi nijedan kontakt podatak ovog studija, a jedan
alat je uhvaćen kako izmišlja Instagram podatke koji su ih „potvrđivali". Za
novootvoreni salon bez Google profila to je očekivano — ali znači da podaci
moraju doći od vlasnice.

Redoslijed prije objave:

1. Vlasnica potvrdi telefone, adresu, radno vrijeme, cijene i Instagram nalog.
2. Upisati potvrđene vrijednosti u `src/lib/site.ts`.
3. Popuniti `openingHours` i `from` cijene (sekcije se same pale kad podaci postoje).
4. Poslati Google Maps pin → upisati `studio.geo`.
5. Tek onda `DATA_CONFIRMED = true`.

## Domen

Nije još kupljen. Kad bude — mijenja se **jedna linija**, `SITE_URL` u
`src/lib/site.ts`. Odatle čitaju `metadataBase`, canonical, `sitemap.ts`,
`robots.ts` i JSON-LD.

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
    opengraph-image.png   1200×630 — privremeno, zamijeniti pravom fotografijom
  components/             sekcije + JsonLd + SilkCanvas (WebGL) + ScrollProvider
  lib/
    site.ts               jedini izvor istine o biznisu
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
- **Godina u footeru** je fiksna (`studio.founded`), ne `new Date()` — stranica se
  prerenderuje statički, pa bi se tekuća godina ispekla u build i zamrzla.
