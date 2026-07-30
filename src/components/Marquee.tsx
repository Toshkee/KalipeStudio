"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const items = ["Make-up", "Bridal glam", "Hair styling", "Colouring", "Nails", "Braids"];

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const loop = gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      // Scrolling nudges the strip's speed, so it feels reactive rather than canned.
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          gsap.to(loop, {
            timeScale: 1 + Math.min(Math.abs(self.getVelocity() / 900), 3),
            duration: 0.3,
            overwrite: true,
          });
        },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative overflow-hidden border-y border-cream/10 bg-surface py-6">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center font-serif text-xl italic text-cream-dim">
            <span className="px-8">{item}</span>
            <span className="text-gold/70">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent" />
    </div>
  );
}
