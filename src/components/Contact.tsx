"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

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
      className="scroll-mt-24 border-t border-cream/10 bg-surface py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="contact-el text-[0.7rem] uppercase tracking-[0.45em] text-gold">
            Kontakt
          </p>
          <h2 className="contact-el mt-5 font-serif text-4xl font-light text-cream sm:text-6xl">
            Čekamo vas
          </h2>

          <address className="contact-el mt-12 space-y-8 not-italic">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-cream-dim/70">
                Adresa
              </p>
              <p className="mt-2 font-serif text-xl text-cream">
                Piperska bb, lamela 3
                <br />
                City kej, Podgorica
              </p>
            </div>

            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-cream-dim/70">
                Telefon
              </p>
              <p className="mt-2 font-serif text-xl">
                <a
                  href="tel:+38260091410"
                  className="text-cream transition-colors hover:text-gold"
                >
                  060 091 410
                </a>
                <span className="mx-3 text-cream-dim/40">·</span>
                <a
                  href="tel:+38269551250"
                  className="text-cream transition-colors hover:text-gold"
                >
                  069 551 250
                </a>
              </p>
            </div>

            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-cream-dim/70">
                Instagram
              </p>
              <p className="mt-2 font-serif text-xl">
                <a
                  href="https://www.instagram.com/kalipe.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream transition-colors hover:text-gold"
                >
                  @kalipe.studio ↗
                </a>
              </p>
            </div>
          </address>

          <p className="contact-el mt-12 max-w-sm text-sm leading-relaxed text-cream-dim">
            Termine zakazujemo pozivom ili porukom na Instagramu — javite nam se
            i pronaći ćemo vrijeme koje vam odgovara.
          </p>
        </div>

        <div className="contact-map min-h-80 overflow-hidden border border-cream/10 lg:min-h-full">
          <iframe
            title="Kalipè Studio — mapa"
            src="https://www.google.com/maps?q=Piperska%20bb%20Podgorica&output=embed"
            className="h-full min-h-80 w-full grayscale-[0.5] contrast-[0.85] invert-[0.9] hue-rotate-180"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
