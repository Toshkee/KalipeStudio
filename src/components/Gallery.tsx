"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

// Placeholder tiles — swap the inner div for <Image> once original
// photos arrive (public/gallery/*.jpg). Columns parallax at different
// speeds while scrolling.
const columns: { label: string; ratio: string }[][] = [
  [
    { label: "Mladenke", ratio: "aspect-[3/4]" },
    { label: "Nokti", ratio: "aspect-square" },
  ],
  [
    { label: "Šminka", ratio: "aspect-square" },
    { label: "Kosa", ratio: "aspect-[3/4]" },
  ],
  [
    { label: "Pletenice", ratio: "aspect-[3/4]" },
    { label: "Studio", ratio: "aspect-square" },
  ],
];

export default function Gallery() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>(".gallery-col").forEach((col, i) => {
        gsap.to(col, {
          yPercent: [-4, -14, -8][i] ?? -6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".gallery-tile").forEach((tile, i) => {
        gsap.from(tile, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.2,
          delay: (i % 3) * 0.12,
          ease: "power4.inOut",
          scrollTrigger: { trigger: tile, start: "top 88%" },
        });
      });

      gsap.from(".gallery-heading", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root }
  );

  return (
    <section id="galerija" ref={root} className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <div className="gallery-heading flex items-end justify-between">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.45em] text-gold">Galerija</p>
          <h2 className="mt-4 font-serif text-4xl font-light text-cream sm:text-6xl">
            Naši radovi
          </h2>
        </div>
        <a
          href="https://www.instagram.com/kalipe.studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-[0.7rem] uppercase tracking-[0.3em] text-cream-dim transition-colors hover:text-gold sm:block"
        >
          @kalipe.studio ↗
        </a>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {columns.map((col, i) => (
          <div key={i} className={`gallery-col flex flex-col gap-4 sm:gap-6 ${i === 1 ? "sm:mt-16" : ""}`}>
            {col.map((t) => (
              <figure
                key={t.label}
                className={`gallery-tile group relative overflow-hidden ${t.ratio}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-burgundy via-surface to-burgundy-deep transition-transform duration-700 ease-out group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-baseline justify-between p-5">
                  <span className="font-serif text-lg italic text-cream/90">{t.label}</span>
                  <span className="text-[0.6rem] uppercase tracking-[0.25em] text-cream-dim/60">
                    Kalipè
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-cream-dim sm:hidden">
        Još radova na{" "}
        <a
          href="https://www.instagram.com/kalipe.studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline-offset-4 hover:underline"
        >
          @kalipe.studio
        </a>
      </p>
    </section>
  );
}
