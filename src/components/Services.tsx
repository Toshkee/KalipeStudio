"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { servicePhotos } from "@/lib/photos";
import { hasPrices, primaryPhone, services } from "@/lib/site";

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".services-heading", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      // Svaka kartica se otkriva kad sama stigne na ekran: na telefonu su
      // jedna ispod druge, pa jedan zajednički okidač ne bi imao smisla.
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card) => {
        gsap.from(card.querySelector(".service-photo"), {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
        gsap.from(card.querySelectorAll(".service-text"), {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="usluge" ref={root} className="scroll-mt-14 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="services-heading max-w-xl">
          <h2 className="section-title">Usluge</h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-cream-dim sm:text-base">
            Šminka, kosa i nokti u istom studiju, pa se termini mogu spojiti u
            isti dan.
          </p>
        </div>

        <div className="mt-10 grid gap-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:mt-14 lg:grid-cols-3 lg:gap-8">
          {services.map((s) => {
            const photo = servicePhotos[s.key];
            return (
              <article key={s.key} className="service-card">
                <div className="service-photo relative aspect-[4/3] overflow-hidden sm:aspect-[4/5]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, calc(100vw - 2.5rem)"
                    className="object-cover"
                    style={{ objectPosition: photo.focus }}
                  />
                </div>

                <div className="service-text mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-[2rem] leading-none text-cream">{s.title}</h3>
                  {s.from !== null && (
                    <p className="whitespace-nowrap font-serif text-lg text-gold">od {s.from}€</p>
                  )}
                </div>

                <ul className="service-text mt-4 border-t border-cream/10">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-cream/10 py-2.5 text-[0.92rem] leading-snug text-cream-dim"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {!hasPrices && (
          // Cijene još nisu objavljene. Radije iskrena rečenica nego
          // izmišljeni brojevi na sajtu pravog salona.
          <p className="mt-12 text-[0.95rem] leading-relaxed text-cream-dim lg:mt-16">
            Cijenu ti kažemo unaprijed, zavisi od usluge i dužine kose.{" "}
            <a
              href={`tel:${primaryPhone.tel}`}
              className="whitespace-nowrap text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
            >
              Pozovi {primaryPhone.display}
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
