"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
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
    <section ref={root} className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <SilkCanvas className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      <p className="hero-corner absolute left-6 top-24 hidden text-[0.65rem] uppercase tracking-[0.35em] text-cream-dim/70 lg:block">
        Est. 2026
      </p>
      <p className="hero-corner absolute right-6 top-24 hidden text-[0.65rem] uppercase tracking-[0.35em] text-cream-dim/70 lg:block">
        City kej — Podgorica
      </p>

      <div className="hero-inner relative z-10 px-6 text-center">
        <p className="hero-label text-[0.7rem] uppercase tracking-[0.45em] text-gold">
          Beauty studio
        </p>

        <h1
          className="hero-title mt-6 font-script text-[clamp(4.5rem,15vw,10.5rem)] leading-none text-cream"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          Kalipè
        </h1>

        <p className="hero-tagline mt-5 text-[0.7rem] uppercase tracking-[0.5em] text-cream-dim sm:text-xs">
          definition of beauty
        </p>

        <p className="hero-copy mx-auto mt-9 max-w-md font-serif text-lg leading-relaxed text-cream/75">
          Make-up, hair and nails — Anđela Jovićević&rsquo;s studio, all under one
          roof in the heart of Podgorica.
        </p>

        <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="tel:+38260091410"
            className="hero-cta rounded-full bg-gold px-9 py-3.5 text-[0.7rem] uppercase tracking-[0.25em] text-background transition-colors duration-300 hover:bg-cream"
          >
            Book an appointment
          </a>
          <a
            href="https://www.instagram.com/kalipe.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta rounded-full border border-cream/25 px-9 py-3.5 text-[0.7rem] uppercase tracking-[0.25em] text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="hero-corner absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="block h-12 w-px animate-pulse bg-gradient-to-b from-transparent via-cream/50 to-transparent" />
      </div>
    </section>
  );
}
