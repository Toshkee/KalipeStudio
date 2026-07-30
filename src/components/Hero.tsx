"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ArrowUpRight } from "./Mark";
import SilkCanvas from "./SilkCanvas";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-word", {
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 1.6,
        delay: 0.25,
        ease: "power4.inOut",
      })
        .from(".hero-tagline", { y: 14, duration: 1 }, "-=0.75")
        .from(".hero-base", { y: 18, duration: 0.9, stagger: 0.09 }, "-=0.7");

      // The cue travels, it does not blink.
      gsap.fromTo(
        ".hero-cue-run",
        { yPercent: -110 },
        { yPercent: 210, duration: 2.4, ease: "power1.inOut", repeat: -1, repeatDelay: 0.5 }
      );

      gsap.to(".hero-inner", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-svh flex-col justify-between overflow-hidden"
    >
      <SilkCanvas className="absolute inset-0 h-full w-full" />

      {/* Title card: the wordmark and one line. Nothing else competes. */}
      <div className="hero-inner relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-24">
        <h1
          className="hero-word font-display text-[clamp(4.5rem,17vw,13rem)] leading-[1.06] text-bone"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          Kalipè
        </h1>
        <p className="hero-tagline mt-2 font-display text-[clamp(0.95rem,2.2vw,1.4rem)] text-ash">
          definicija ljepote
        </p>
      </div>

      {/* Information baseline, on the same grid as the rest of the page. */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-end gap-6 px-6 pb-10 text-center sm:grid-cols-3 sm:px-8 sm:pb-12 sm:text-left">
        <p className="hero-base order-2 text-[0.8rem] leading-relaxed text-ash sm:order-1">
          Piperska bb, lamela 3
          <br className="hidden sm:block" />
          <span className="sm:hidden">, </span>
          Podgorica
        </p>

        <div className="hero-base order-3 hidden justify-self-center sm:order-2 sm:block">
          <span className="relative block h-16 w-px overflow-hidden bg-bone/20" aria-hidden>
            <span className="hero-cue-run absolute inset-x-0 top-0 h-6 rounded-full bg-bone/85" />
          </span>
        </div>

        <a
          href="tel:+38260091410"
          className="hero-base group order-1 inline-flex items-baseline justify-center gap-2 font-display text-xl text-bone transition-colors duration-300 hover:text-rose sm:order-3 sm:justify-self-end sm:text-2xl"
        >
          Zakaži termin
          <ArrowUpRight className="h-3.5 w-3.5 translate-y-px transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
