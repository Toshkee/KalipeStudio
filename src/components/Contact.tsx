"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  hasOpeningHours,
  mapEmbedSrc,
  openingHours,
  studio,
} from "@/lib/site";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".contact-el", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.from(".contact-map", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.3,
        ease: "power4.inOut",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="kontakt"
      ref={root}
      className="scroll-mt-24 border-t border-cream/10 bg-surface py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="contact-el text-[0.7rem] uppercase tracking-[0.45em] text-gold">
            Kontakt
          </p>
          <h2 className="contact-el mt-5 font-serif text-4xl text-cream sm:text-6xl">
            Dođi kod nas
          </h2>

          <address className="contact-el mt-12 space-y-8 not-italic">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-cream-dim/80">
                Adresa
              </p>
              <p className="mt-2 font-serif text-xl text-cream">
                {studio.address.street}
                <br />
                {studio.address.district}, {studio.address.city}
              </p>
            </div>

            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-cream-dim/80">
                Telefon
              </p>
              <p className="mt-2 font-serif text-xl">
                {studio.phones.map((p, i) => (
                  <span key={p.tel}>
                    {i > 0 && <span className="mx-3 text-cream-dim/50">·</span>}
                    <a
                      href={`tel:${p.tel}`}
                      className="inline-block py-1 text-cream transition-colors hover:text-gold"
                    >
                      {p.display}
                    </a>
                  </span>
                ))}
              </p>
            </div>

            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-cream-dim/80">
                Instagram
              </p>
              <p className="mt-2 font-serif text-xl">
                <a
                  href={studio.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 text-cream transition-colors hover:text-gold"
                >
                  {studio.instagram.handle} ↗
                </a>
              </p>
            </div>

            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-cream-dim/80">
                Radno vrijeme
              </p>
              {hasOpeningHours ? (
                <dl className="mt-3 space-y-1.5">
                  {openingHours.map((d) => (
                    <div
                      key={d.schema}
                      className="flex max-w-xs items-baseline justify-between gap-4"
                    >
                      <dt className="text-sm text-cream-dim">{d.label}</dt>
                      <dd className="font-serif text-base text-cream">
                        {d.open && d.close ? `${d.open} – ${d.close}` : "Ne radimo"}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream-dim">
                  Javi se telefonom ili porukom i reći ćemo ti kad smo slobodni.
                </p>
              )}
            </div>
          </address>

          <p className="contact-el mt-12 max-w-sm text-sm leading-relaxed text-cream-dim">
            Termini se zakazuju telefonom ili porukom na Instagramu — javi se i
            naći ćemo vrijeme koje ti odgovara.
          </p>
        </div>

        <div className="contact-map min-h-80 overflow-hidden border border-cream/10 lg:min-h-full">
          {/* Mapa se vodi pretragom adrese, ne ukucanim koordinatama: dva
              nezavisna geokodera daju tačke udaljene ~370 m za samu ulicu,
              a nijedan izvor ne pinuje studio. Kad vlasnica pošalje pin,
              mijenja se `mapEmbedSrc` u src/lib/site.ts. */}
          <iframe
            title={`${studio.name} — mapa`}
            src={mapEmbedSrc}
            className="h-full min-h-80 w-full grayscale-[0.5] contrast-[0.85] invert-[0.9] hue-rotate-180"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
