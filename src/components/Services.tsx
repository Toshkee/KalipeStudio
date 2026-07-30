"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";

const services = [
  {
    title: "Šminka",
    text: "Dnevna, večernja i šminka za posebne prilike.",
    src: "/gallery/sminka.jpg",
    alt: "Šminkerka sa četkicama za šminkanje",
  },
  {
    title: "Mladenke",
    text: "Proba prije vjenčanja, pa šminka i frizura na sam dan.",
    src: "/gallery/mladenke.jpg",
    alt: "Šminkanje mladenke prije vjenčanja",
  },
  {
    title: "Kosa",
    text: "Feniranje, lokne, punđe i farbanje, a za djevojčice pletenice s perlicama.",
    src: "/gallery/kosa.jpg",
    alt: "Uvijanje lokni figarom",
  },
  {
    title: "Nokti",
    text: "Manikir i gel lak u bojama koje ti stoje.",
    src: "/gallery/nokti.jpg",
    alt: "Crveni manikir",
  },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".services-heading", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.from(".service-item", {
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-body", start: "top 80%" },
      });

      gsap.from(".services-photo", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".services-body", start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <section id="usluge" ref={root} className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <div className="services-heading">
        <p className="text-[0.7rem] uppercase tracking-[0.45em] text-gold">Usluge</p>
        <h2 className="mt-4 font-serif text-4xl font-light text-cream sm:text-6xl">
          Sve na jednom mjestu
        </h2>
      </div>

      <div className="services-body mt-16 grid items-start gap-12 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-20">
        <ul>
          {services.map((s, i) => (
            <li key={s.title} className="service-item">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`block w-full py-3 text-left font-serif text-4xl font-light transition-all duration-500 ease-out sm:py-4 sm:text-6xl ${
                  active === i
                    ? "translate-x-3 text-cream"
                    : "text-cream/30 hover:text-cream/60"
                }`}
              >
                {s.title}
              </button>
            </li>
          ))}
          <li className="service-item mt-10 max-w-sm text-sm leading-relaxed text-cream-dim">
            Ne znaš šta ti tačno treba? Piši nam na{" "}
            <a
              href="https://www.instagram.com/kalipe.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline-offset-4 hover:underline"
            >
              Instagram
            </a>{" "}
            pa ćemo smisliti zajedno.
          </li>
        </ul>

        <div>
          <div className="services-photo relative aspect-[3/4] overflow-hidden">
            {services.map((s, i) => (
              <Image
                key={s.title}
                src={s.src}
                alt={active === i ? s.alt : ""}
                fill
                sizes="(max-width: 1024px) 100vw, 24rem"
                className={`object-cover transition-opacity duration-500 ease-out ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <p
            key={services[active].title}
            className="mt-5 min-h-12 text-sm leading-relaxed text-cream-dim"
          >
            {services[active].text}
          </p>
        </div>
      </div>
    </section>
  );
}
