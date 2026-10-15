"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { bridalPhotos } from "@/lib/photos";
import { primaryPhone } from "@/lib/site";

export default function Bridal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".bridal-photo", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".bridal-photos", start: "top 85%" },
      });

      gsap.from(".bridal-el", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bridal-text", start: "top 85%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="mladenke"
      ref={root}
      className="scroll-mt-14 bg-burgundy-deep py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Druga fotografija je spuštena — par se čita kao dva trenutka
            istog dana, a ne kao mreža. */}
        <div className="bridal-photos grid grid-cols-2 gap-3 sm:gap-4">
          {bridalPhotos.map((p, i) => (
            <div
              key={p.src.src}
              className={`bridal-photo relative aspect-[3/4] overflow-hidden ${i === 1 ? "mt-10 sm:mt-16" : ""}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 45vw"
                className="object-cover"
                style={{ objectPosition: p.focus }}
              />
            </div>
          ))}
        </div>

        <div className="bridal-text">
          <h2 className="bridal-el section-title">
            Za dan kad kažeš <span className="font-script text-gold">da</span>
          </h2>
          <p className="bridal-el mt-6 max-w-md font-serif text-[1.15rem] leading-relaxed text-cream/80 sm:text-xl">
            Šminka i frizura za mladu, iz istog studija i istog tima. Javi se
            čim znaš datum, da ga sačuvamo za tebe.
          </p>
          <a
            href={`tel:${primaryPhone.tel}`}
            className="bridal-el mt-9 inline-flex h-12 items-center justify-center rounded-full border border-gold/70 px-9 text-[0.7rem] uppercase tracking-[0.25em] text-gold transition-colors duration-300 hover:bg-gold hover:text-burgundy-deep max-sm:w-full"
          >
            Rezerviši datum
          </a>
        </div>
      </div>
    </section>
  );
}
