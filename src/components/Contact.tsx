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

          {/* Pozivi kao puna dugmad: na telefonu je ovo jedina stvar koju
              neko na ovoj sekciji zapravo radi. */}
          <div className="contact-el mt-8 grid gap-3 sm:max-w-md">
            {studio.phones.map((p, i) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className={`flex h-14 items-center justify-between rounded-full px-6 transition-colors duration-300 ${
                  i === 0
                    ? "bg-gold text-background hover:bg-cream"
                    : "border border-cream/20 text-cream hover:border-gold hover:text-gold"
                }`}
              >
                <span className="text-[0.68rem] uppercase tracking-[0.25em]">{p.label}</span>
                <span className="font-serif text-xl tabular-nums">{p.display}</span>
              </a>
            ))}
            <a
              href={viberLink}
              className="flex h-14 items-center justify-between rounded-full border border-cream/20 px-6 text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <span className="text-[0.68rem] uppercase tracking-[0.25em]">Viber</span>
              <span className="font-serif text-xl tabular-nums">{primaryPhone.display}</span>
            </a>
            <a
              href={studio.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-between rounded-full border border-cream/20 px-6 text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <span className="text-[0.68rem] uppercase tracking-[0.25em]">Instagram</span>
              <span className="font-serif text-xl">{studio.instagram.handle} ↗</span>
            </a>
          </div>

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
