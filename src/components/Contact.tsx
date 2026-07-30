"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ArrowUpRight } from "./Mark";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".kontakt-move", {
        y: 26,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 76%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="kontakt"
      ref={root}
      className="scroll-mt-24 px-6 py-24 sm:px-8 sm:py-32"
      style={{ background: "linear-gradient(to bottom, #120509, #0b0407)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="kontakt-move font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-bone">
            Dođi kod nas.
          </h2>

          <address className="mt-12 space-y-9 not-italic sm:mt-16">
            <div className="kontakt-move">
              <p className="text-[0.78rem] text-ash">Adresa</p>
              <p className="mt-1.5 font-display text-xl text-bone">
                Piperska bb, lamela 3
                <br />
                City kej, Podgorica
              </p>
            </div>

            <div className="kontakt-move">
              <p className="text-[0.78rem] text-ash">Telefon</p>
              <p className="mt-1.5 font-display text-xl">
                <a
                  href="tel:+38260091410"
                  className="text-bone transition-colors duration-300 hover:text-rose"
                >
                  060 091 410
                </a>
                <span className="px-3 text-ash">·</span>
                <a
                  href="tel:+38269551250"
                  className="text-bone transition-colors duration-300 hover:text-rose"
                >
                  069 551 250
                </a>
              </p>
            </div>

            <div className="kontakt-move">
              <p className="text-[0.78rem] text-ash">Instagram</p>
              <p className="mt-1.5 font-display text-xl">
                <a
                  href="https://www.instagram.com/kalipe.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-2 text-bone transition-colors duration-300 hover:text-rose"
                >
                  @kalipe.studio
                  <ArrowUpRight className="h-3 w-3 translate-y-px transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </a>
              </p>
            </div>
          </address>

          <p className="kontakt-move mt-12 max-w-sm text-[0.9rem] leading-[1.75] text-ash">
            Termini se dogovaraju telefonom ili porukom na Instagramu. Javi se i
            naći ćemo vrijeme koje ti odgovara.
          </p>
        </div>

        <div
          className="kontakt-move min-h-80 overflow-hidden lg:min-h-full"
          style={{ boxShadow: "inset 0 0 0 1px rgba(240,230,217,0.07)" }}
        >
          <iframe
            title="Kalipè Studio na mapi"
            src="https://www.google.com/maps?q=Piperska%20bb%20Podgorica&output=embed"
            className="h-full min-h-80 w-full"
            style={{
              filter:
                "grayscale(1) invert(0.92) contrast(0.82) brightness(0.82) sepia(0.75) saturate(0.9) hue-rotate(-14deg)",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
