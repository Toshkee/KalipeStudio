"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const services = [
  {
    n: "01",
    title: "Šminka",
    text: "Profesionalna šminka za svaku priliku — od prirodnog dnevnog izgleda do punog večernjeg glamura.",
  },
  {
    n: "02",
    title: "Mladenke",
    text: "Proba, šminka i frizura na sam dan — kompletan izgled za tvoj najvažniji dan.",
  },
  {
    n: "03",
    title: "Kosa",
    text: "Feniranje, lokne, punđe i farbanje — plus pletenice s perlicama za najmlađe.",
  },
  {
    n: "04",
    title: "Nokti",
    text: "Njegovan manikir u elegantnim tonovima — od klasičnog nude do upečatljive crvene.",
  },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>(".service-row").forEach((row) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 85%" },
          defaults: { ease: "power3.out" },
        });
        tl.from(row.querySelector(".service-line"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power4.inOut",
        })
          .from(row.querySelector(".service-n"), { y: 20, opacity: 0, duration: 0.7 }, "-=0.7")
          .from(row.querySelector(".service-title"), { y: 34, opacity: 0, duration: 0.8 }, "-=0.55")
          .from(row.querySelector(".service-text"), { y: 16, opacity: 0, duration: 0.7 }, "-=0.5");
      });

      gsap.from(".services-heading", {
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
    <section id="usluge" ref={root} className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <div className="services-heading">
        <p className="text-[0.7rem] uppercase tracking-[0.45em] text-gold">Usluge</p>
        <h2 className="mt-4 font-serif text-4xl font-light text-cream sm:text-6xl">
          Sve na <em className="italic text-cream/70">jednom</em> mjestu
        </h2>
      </div>

      <div className="mt-20">
        {services.map((s) => (
          <article key={s.n} className="service-row group relative">
            <span className="service-line block h-px w-full bg-cream/15" />
            <div className="grid gap-4 py-10 sm:grid-cols-[5rem_1fr_20rem] sm:items-baseline sm:gap-8">
              <span className="service-n font-serif text-sm tracking-widest text-gold/80">
                ({s.n})
              </span>
              <h3 className="service-title font-serif text-3xl font-light text-cream transition-transform duration-500 ease-out group-hover:translate-x-3 sm:text-5xl">
                {s.title}
              </h3>
              <p className="service-text text-sm leading-relaxed text-cream-dim transition-colors duration-500 group-hover:text-cream/90">
                {s.text}
              </p>
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-serif text-2xl text-gold opacity-0 transition-all duration-500 group-hover:-translate-x-2 group-hover:opacity-100"
            >
              →
            </span>
          </article>
        ))}
        <span className="block h-px w-full bg-cream/15" />
      </div>
    </section>
  );
}
