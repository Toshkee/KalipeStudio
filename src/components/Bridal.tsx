"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Bridal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(".bridal-ghost", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 65%" },
        defaults: { ease: "power3.out" },
      });
      tl.from(".bridal-el", { y: 40, opacity: 0, duration: 1, stagger: 0.15 });
    },
    { scope: root }
  );

  return (
    <section
      id="mladenke"
      ref={root}
      className="relative scroll-mt-24 overflow-hidden border-y border-cream/10 bg-burgundy-deep py-40"
    >
      {/* giant parallax ghost word */}
      <span
        aria-hidden
        className="bridal-ghost pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 select-none font-script text-[26rem] leading-none text-burgundy-glow/15"
      >
        Da
      </span>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="bridal-el text-[0.7rem] uppercase tracking-[0.45em] text-gold">
          Mladenke
        </p>
        <h2 className="bridal-el mt-6 font-serif text-4xl font-light leading-tight text-cream sm:text-6xl">
          Za vaše sudbonosno{" "}
          <span className="font-script text-gold">„DA&rdquo;</span>
        </h2>
        <p className="bridal-el mx-auto mt-9 max-w-xl font-serif text-lg leading-relaxed text-cream/75">
          Vjenčanje je dan koji se pamti cijeli život — i zaslužuje savršen
          izgled. Uz probu šminke, pažljivo biranu frizuru i tim koji brine o
          svakom detalju, na svoj veliki dan dolazite potpuno mirni.
        </p>
        <a
          href="tel:+38260091410"
          className="bridal-el mt-14 inline-block rounded-full border border-gold/70 px-11 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-gold transition-all duration-300 hover:bg-gold hover:text-burgundy-deep"
        >
          Rezerviši svoj datum
        </a>
      </div>
    </section>
  );
}
