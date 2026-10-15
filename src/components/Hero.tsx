"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { primaryPhone, studio } from "@/lib/site";
import SilkCanvas from "./SilkCanvas";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-label", { y: 14, opacity: 0, duration: 0.9, delay: 0.3 })
        .from(
          ".hero-title",
          {
            clipPath: "inset(0% 100% 0% 0%)",
            y: 30,
            duration: 1.6,
            ease: "power4.inOut",
          },
          "-=0.5"
        )
        .from(
          ".hero-tagline",
          { opacity: 0, letterSpacing: "0.1em", duration: 1.2 },
          "-=0.7"
        )
        .from(".hero-copy", { y: 24, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-cta", { y: 18, opacity: 0, stagger: 0.1, duration: 0.7 }, "-=0.5")
        .from(".hero-corner", { opacity: 0, duration: 1.2 }, "-=0.4");

      gsap.to(".hero-inner", {
        yPercent: 18,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "85% top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="vrh"
      ref={root}
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      <SilkCanvas className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      <div className="hero-inner relative z-10 w-full px-5 text-center">
        <p className="hero-label text-[0.7rem] uppercase tracking-[0.45em] text-gold">
          Studio ljepote
        </p>

        <h1
          className="hero-title mt-6 font-script text-[clamp(4.5rem,15vw,10.5rem)] leading-none text-cream"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          {studio.short}
        </h1>

        <p className="hero-tagline mt-5 text-[0.7rem] uppercase tracking-[0.5em] text-cream-dim sm:text-xs">
          {studio.tagline}
        </p>

        <p className="hero-copy mx-auto mt-8 max-w-[22rem] font-serif text-[1.15rem] leading-relaxed text-cream/80 sm:max-w-md sm:text-xl">
          Šminka, kosa i nokti. Studio Anđele Jovićević u City keju u
          Podgorici.
        </p>

        {/* Samo jedno dugme. Većina dolazi preko linka sa Instagram profila,
            pa bi dugme za Instagram vraćalo ljude odakle su došli. */}
        <a
          href={`tel:${primaryPhone.tel}`}
          className="hero-cta mt-10 inline-flex h-12 items-center justify-center rounded-full bg-gold px-10 whitespace-nowrap text-[0.7rem] uppercase tracking-[0.25em] text-background transition-colors duration-300 hover:bg-cream"
        >
          Zakaži termin
        </a>
      </div>

      <div className="hero-corner absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="block h-12 w-px animate-pulse bg-gradient-to-b from-transparent via-cream/50 to-transparent" />
      </div>
    </section>
  );
}
