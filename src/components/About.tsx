"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Reveals move, they never fade. Nothing here is clipped or hidden,
      // so a trigger that never fires costs a few pixels, not the content.
      gsap.from(".about-move", {
        y: 26,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="px-6 py-24 sm:px-8 sm:py-32"
      style={{ background: "linear-gradient(to bottom, #0b0407, #150609)" }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="about-move max-w-4xl font-display text-[clamp(1.9rem,5vw,3.9rem)] leading-[1.14] text-bone">
          Studio koji je izrastao iz jednog stola za šminkanje.
        </p>

        <div className="mt-14 grid gap-10 sm:mt-20 sm:grid-cols-12">
          <p className="about-move text-[0.95rem] leading-[1.75] text-ash sm:col-span-5 sm:col-start-6">
            Anđela Jovićević godinama šminka mlade i žene Podgorice. U januaru
            2026. otvorila je prostor u kojem se sve radi na jednom mjestu, pa
            nema više trčanja od salona do salona pred svečanost.
          </p>

          <p className="about-move text-[0.8rem] leading-[1.9] text-ash sm:col-span-3 sm:col-start-10">
            Otvoreno 9. januara 2026.
            <br />
            Piperska bb, lamela 3
            <br />
            Podgorica
          </p>
        </div>
      </div>
    </section>
  );
}
