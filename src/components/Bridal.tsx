"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Bridal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".bridal-el", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="mladenke"
      ref={root}
      className="relative scroll-mt-24 overflow-hidden border-y border-cream/10 bg-burgundy-deep py-28"
    >
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="bridal-el text-[0.7rem] uppercase tracking-[0.45em] text-gold">Mladenke</p>
        <h2 className="bridal-el mt-6 font-serif text-4xl font-light leading-tight text-cream sm:text-6xl">
          Za dan kad kažeš{" "}
          <span className="font-script text-gold">da</span>
        </h2>
        <p className="bridal-el mx-auto mt-9 max-w-xl font-serif text-lg leading-relaxed text-cream/75">
          Vjenčanje se pamti cijeli život — i zaslužuje besprekoran izgled. Uz
          probu šminke, pažljivo odabranu frizuru i tim koji misli na svaki
          detalj, na svoj veliki dan stižeš potpuno opuštena.
        </p>
        <a
          href="tel:+38260091410"
          className="bridal-el mt-12 inline-block rounded-full border border-gold/70 px-11 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-gold transition-all duration-300 hover:bg-gold hover:text-burgundy-deep"
        >
          Rezerviši svoj datum
        </a>
      </div>
    </section>
  );
}
