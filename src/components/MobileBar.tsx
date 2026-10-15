"use client";

import { useEffect, useState } from "react";
import { primaryPhone, viberLink } from "@/lib/site";

/**
 * Donja traka za zakazivanje, samo na telefonu.
 *
 * Pojavljuje se kad hero ode s ekrana, a sklanja se čim se vidi kontakt ili
 * footer — tamo su isti pozivi već na stranici, pa bi bila duplikat koji
 * pokriva sadržaj.
 */
export default function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("vrh");
    const enders = document.querySelectorAll("[data-hides-bar]");
    if (!hero) return;

    let heroOn = true;
    const endersOn = new Set<Element>();
    const update = () => setShow(!heroOn && endersOn.size === 0);

    // Hero se računa kao "prošao" kad mu je na ekranu ostalo manje od 35%.
    const heroIo = new IntersectionObserver(
      ([e]) => {
        heroOn = e.intersectionRatio > 0.35;
        update();
      },
      { threshold: [0, 0.35, 1] }
    );
    heroIo.observe(hero);

    const endIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) endersOn.add(e.target);
          else endersOn.delete(e.target);
        }
        update();
      },
      // Kontakt "stiže" kad mu vrh pređe donju trećinu ekrana.
      { rootMargin: "0px 0px -30% 0px" }
    );
    enders.forEach((el) => endIo.observe(el));

    return () => {
      heroIo.disconnect();
      endIo.disconnect();
    };
  }, []);

  return (
    <div
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-background/85 backdrop-blur-md transition-transform duration-500 ease-out motion-reduce:transition-none md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Samo dva načina za zakazivanje: poziv i Viber. Instagram već ima
          svoje mjesto u galeriji, kontaktu i footeru. */}
      <div className="grid grid-cols-2 gap-2 px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <a
          href={`tel:${primaryPhone.tel}`}
          className="flex h-12 items-center justify-center rounded-full bg-gold text-[0.7rem] whitespace-nowrap uppercase tracking-[0.22em] text-background"
        >
          Pozovi
        </a>
        <a
          href={viberLink}
          className="flex h-12 items-center justify-center rounded-full border border-cream/25 text-[0.7rem] whitespace-nowrap uppercase tracking-[0.22em] text-cream"
        >
          Viber
        </a>
      </div>
    </div>
  );
}
