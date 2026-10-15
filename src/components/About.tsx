"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { studioPhotos } from "@/lib/photos";
import { team } from "@/lib/site";

const [main, ...rest] = studioPhotos;

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".about-photo", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.3,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".about-photo", start: "top 85%" },
      });

      gsap.from(".about-el", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-text", start: "top 82%" },
      });

      gsap.from(".about-strip li", {
        x: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-strip", start: "top 88%" },
      });

      // Paralaksa samo na desktopu. Na telefonu skrol ide prirodno i svaki
      // scrub je još jedan posao po frejmu za ono malo pomjeraja.
      gsap.matchMedia().add("(min-width: 1024px)", () => {
        gsap.to(".about-photo-inner", {
          yPercent: -7,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="studio" ref={root} className="scroll-mt-14 border-t border-cream/10 bg-surface py-14 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_minmax(0,0.85fr)] lg:items-center lg:gap-20">
        <figure className="about-photo relative aspect-[4/5] overflow-hidden lg:order-2">
          <div className="about-photo-inner absolute inset-0 lg:-bottom-[8%]">
            <Image
              src={main.src}
              alt={main.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 460px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
              className="object-cover"
            />
          </div>
        </figure>

        <div className="about-text lg:order-1">
          <h2 className="about-el section-title">Novi prostor u City keju</h2>

          <p className="about-el mt-6 max-w-xl text-[0.95rem] leading-relaxed text-cream-dim sm:text-base">
            Kalipè je počeo kao Anđelin rad sa šminkom: mladenke, mature,
            proslave. Od 9. januara 2026. radimo u novom prostoru u Piperskoj,
            a uz šminku sada radimo i kosu i nokte.
          </p>

          <blockquote className="about-el mt-8 max-w-xl border-l border-gold/60 pl-5">
            <p className="font-serif text-[1.3rem] leading-snug text-cream/90 italic sm:text-2xl">
              „Nestrpljivo sam čekala dan kada ćemo otvoriti vrata novog
              prostora i pružiti vam kompletnu uslugu uljepšavanja.“
            </p>
            <footer className="mt-3 text-[0.68rem] uppercase tracking-[0.22em] text-cream-dim">
              Anđela Jovićević
            </footer>
          </blockquote>

          <dl className="about-el mt-10 max-w-xl border-t border-cream/10">
            {team.map((t) => (
              <div
                key={t.name}
                className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-4"
              >
                <dt className="font-serif text-xl text-cream sm:text-2xl">{t.name}</dt>
                <dd className="text-right">
                  <span className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">
                    {t.role}
                  </span>
                  {t.note && (
                    <span className="mt-1 block text-[0.8rem] text-cream-dim">{t.note}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Na telefonu traka koja se prevlači prstom — sljedeća slika viri s
          desne strane da se vidi da ima još. Na desktopu pet u redu. */}
      <ul
        aria-label="Fotografije studija"
        className="about-strip no-scrollbar mt-12 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 sm:scroll-px-8 sm:px-8 lg:mx-auto lg:mt-20 lg:grid lg:max-w-6xl lg:grid-cols-5 lg:gap-4 lg:overflow-visible"
      >
        {rest.map((p) => (
          <li
            key={p.src.src}
            className="relative aspect-[4/5] w-[72%] shrink-0 snap-start overflow-hidden sm:w-[42%] lg:w-auto"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 220px, (min-width: 640px) 42vw, 72vw"
              className="object-cover"
            />
          </li>
        ))}
        {/* Desni odmak na kraju trake: padding-right u flex skroleru Safari
            ne računa uvijek, pa posljednja slika lijepi uz ivicu ekrana. */}
        <li aria-hidden className="w-2 shrink-0 sm:w-5 lg:hidden" />
      </ul>
    </section>
  );
}
