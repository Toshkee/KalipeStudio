"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { hasPrices, primaryPhone, services } from "@/lib/site";

export default function Pricing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".pricing-el", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="cjenovnik"
      ref={root}
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24"
    >
      <div className="pricing-el">
        <p className="text-[0.7rem] uppercase tracking-[0.45em] text-gold">
          Cjenovnik
        </p>
        <h2 className="mt-4 font-serif text-4xl text-cream sm:text-6xl">
          Koliko košta
        </h2>
      </div>

      {hasPrices ? (
        <>
          <dl className="mt-16 max-w-2xl">
            {services
              .filter((s) => s.from !== null)
              .map((s) => (
                <div
                  key={s.key}
                  className="pricing-el flex items-baseline gap-4 border-b border-cream/10 py-5"
                >
                  <dt className="font-serif text-2xl text-cream sm:text-3xl">
                    {s.title}
                  </dt>
                  <span
                    aria-hidden
                    className="min-w-8 flex-1 translate-y-[-0.35rem] border-b border-dotted border-cream/20"
                  />
                  <dd className="whitespace-nowrap font-serif text-2xl text-gold sm:text-3xl">
                    od {s.from}€
                  </dd>
                </div>
              ))}
          </dl>
          <p className="pricing-el mt-8 max-w-md text-sm leading-relaxed text-cream-dim">
            Cijena zavisi od dužine kose i obima posla — tačnu cijenu ti kažemo
            kad se čujemo.
          </p>
        </>
      ) : (
        // Cijene još nisu potvrđene. Radije prazno i iskreno nego izmišljeni
        // brojevi na sajtu pravog salona.
        <div className="pricing-el mt-14 max-w-md">
          <p className="font-serif text-xl leading-relaxed text-cream/80">
            Cijene zavise od usluge i obima posla.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-cream-dim">
            Javi se i reći ćemo ti tačno, bez obaveze.
          </p>
          <a
            href={`tel:${primaryPhone.tel}`}
            className="mt-8 inline-block rounded-full border border-gold/70 px-9 py-3.5 text-[0.7rem] uppercase tracking-[0.25em] text-gold transition-colors duration-300 hover:bg-gold hover:text-background"
          >
            {primaryPhone.display}
          </a>
        </div>
      )}
    </section>
  );
}
