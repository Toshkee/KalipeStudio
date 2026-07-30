"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const stats = [
  { k: "2026", v: "New space" },
  { k: "3", v: "Service lines" },
  { k: "City kej", v: "Podgorica" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".about-portrait", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.from(".about-el", {
        y: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });

      gsap.to(".about-portrait-inner", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="mx-auto max-w-6xl px-6 py-32">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_1fr] lg:gap-20">
        {/* Portrait placeholder — swap inner div for <Image> when photos arrive */}
        <figure className="about-portrait relative aspect-[4/5] overflow-hidden">
          <div className="about-portrait-inner absolute inset-0 scale-110 bg-gradient-to-br from-burgundy via-surface to-burgundy-deep" />
          <figcaption className="absolute bottom-0 left-0 p-6">
            <span className="font-script text-3xl text-cream">Anđela</span>
            <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.3em] text-cream-dim">
              Make-up artist &amp; founder
            </span>
          </figcaption>
        </figure>

        <div>
          <p className="about-el text-[0.7rem] uppercase tracking-[0.45em] text-gold">About</p>
          <h2 className="about-el mt-5 font-serif text-4xl font-light leading-tight text-cream sm:text-5xl">
            A new chapter,{" "}
            <em className="italic text-cream/70">the same feeling</em>
          </h2>

          <div className="about-el mt-8 space-y-5 leading-relaxed text-cream-dim">
            <p>
              Kalipè began as the work of a single make-up artist and a love for
              the detail that changes an entire look. In January 2026 we opened
              the doors of a new space — designed to answer everything you need
              in one place.
            </p>
            <p>
              Today, alongside professional make-up, Kalipè offers hair and
              beauty treatments too. The same approach, more room: you come for
              the appointment and stay for the feeling.
            </p>
          </div>

          <dl className="about-el mt-12 grid grid-cols-3 gap-6 border-t border-cream/10 pt-8">
            {stats.map((s) => (
              <div key={s.k}>
                <dt className="font-serif text-2xl text-cream">{s.k}</dt>
                <dd className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-cream-dim">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
