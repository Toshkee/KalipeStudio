"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  hasOpeningHours,
  mapEmbedSrc,
  mapLink,
  openingHours,
  primaryPhone,
  studio,
  viberLink,
} from "@/lib/site";

/** Sve osim studijskog broja, koji je zlatno dugme iznad liste. */
const channels: { label: string; value: string; href: string; external?: boolean }[] = [
  ...studio.phones.slice(1).map((p) => ({ label: p.label, value: p.display, href: `tel:${p.tel}` })),
  { label: "Viber", value: primaryPhone.display, href: viberLink },
  { label: "Instagram", value: `${studio.instagram.handle} ↗`, href: studio.instagram.url, external: true },
];

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".contact-el", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      gsap.from(".contact-map", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.3,
        ease: "power4.inOut",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="kontakt"
      ref={root}
      data-hides-bar
      className="scroll-mt-14 border-t border-cream/10 bg-surface py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="contact-el section-title">Dođi kod nas</h2>
          <p className="contact-el mt-4 max-w-md text-[0.95rem] leading-relaxed text-cream-dim sm:text-base">
            Termine zakazujemo telefonom, na Viberu ili porukom na Instagramu.
          </p>

          {/* Jedno puno dugme za studijski broj. Ostali kanali su redovi kao
              lista tima u sekciji Studio: klikću se isto, a ne prave zid od
              četiri dugmeta. */}
          <a
            href={`tel:${primaryPhone.tel}`}
            className="contact-el mt-8 flex h-14 items-center justify-between rounded-full bg-gold px-6 text-background transition-colors duration-300 hover:bg-cream sm:max-w-md"
          >
            <span className="text-[0.68rem] uppercase tracking-[0.25em]">{primaryPhone.label}</span>
            <span className="font-serif text-xl tabular-nums">{primaryPhone.display}</span>
          </a>

          <ul className="contact-el mt-6 border-t border-cream/10 sm:max-w-md">
            {channels.map((c) => (
              <li key={c.label} className="border-b border-cream/10">
                <a
                  href={c.href}
                  {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="text-[0.68rem] uppercase tracking-[0.22em] text-cream-dim">
                    {c.label}
                  </span>
                  <span className="font-serif text-xl text-cream tabular-nums transition-colors duration-300 group-hover:text-gold">
                    {c.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <address className="contact-el mt-10 grid gap-8 not-italic sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-cream-dim/80">Adresa</p>
              <p className="mt-2 font-serif text-xl leading-snug text-cream">
                {studio.address.street}
                <br />
                {studio.address.district}, {studio.address.city}
              </p>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block py-1 text-sm text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
              >
                Otvori u mapama ↗
              </a>
            </div>

            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-cream-dim/80">
                Radno vrijeme
              </p>
              {hasOpeningHours ? (
                <dl className="mt-3 space-y-1.5">
                  {openingHours.map((d) => (
                    <div key={d.schema} className="flex max-w-xs items-baseline justify-between gap-4">
                      <dt className="text-sm text-cream-dim">{d.label}</dt>
                      <dd className="font-serif text-base text-cream">
                        {d.open && d.close ? `${d.open} – ${d.close}` : "Ne radimo"}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-2 max-w-xs text-[0.95rem] leading-relaxed text-cream-dim">
                  Javi se i reći ćemo ti kad imamo slobodan termin.
                </p>
              )}
            </div>
          </address>
        </div>

        {/* Mapa samo od lg naviše. Na telefonu je iframe Google mapa težak,
            hvata prst pri skrolu, a "Otvori u mapama" ionako vodi u pravu
            aplikaciju s navigacijom. Skriven lazy iframe se ne učitava.

            Mapa se vodi pretragom adrese, ne ukucanim koordinatama: dva
            nezavisna geokodera daju tačke udaljene ~370 m za samu ulicu.
            Kad vlasnica pošalje pin, mijenja se `mapEmbedSrc` u site.ts. */}
        <div className="contact-map hidden min-h-[28rem] overflow-hidden border border-cream/10 lg:block">
          <iframe
            title={`${studio.name} — mapa`}
            src={mapEmbedSrc}
            className="h-full w-full grayscale-[0.5] contrast-[0.85] invert-[0.9] hue-rotate-180"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
