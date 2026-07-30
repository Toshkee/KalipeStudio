"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const links = [
  { href: "#usluge", label: "Usluge" },
  { href: "#mladenke", label: "Mladenke" },
  { href: "#radovi", label: "Radovi" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Nav() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".nav-surface", { opacity: 1 });
        return;
      }

      // Enter by moving, never by fading in: if this never runs the bar is
      // already on screen and readable.
      gsap.from(root.current, { y: -64, duration: 1.1, delay: 0.15, ease: "power3.out" });

      // The bar takes on a surface only once the velvet is behind us.
      //
      // Measured as absolute scroll positions, not from an element: the
      // surface sits inside a fixed header, so it never travels through the
      // viewport and has no geometry of its own to trigger on. Lenis drives
      // ScrollTrigger.update, so this stays in step with the smooth scroll
      // where a native scroll listener never fires at all.
      const fade = (opacity: number) =>
        gsap.to(".nav-surface", { opacity, duration: 0.4, ease: "power2.out", overwrite: true });

      ScrollTrigger.create({
        start: 120,
        end: () => ScrollTrigger.maxScroll(window),
        onEnter: () => fade(1),
        onLeaveBack: () => fade(0),
      });
    },
    { scope: root }
  );

  return (
    <header ref={root} className="fixed inset-x-0 top-0 z-50">
      {/* Tonal surface, resolving to nothing at its lower edge: no drawn line. */}
      <div
        className="nav-surface pointer-events-none absolute inset-x-0 -bottom-6 top-0 opacity-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11,4,7,0.94) 0%, rgba(11,4,7,0.9) 55%, rgba(11,4,7,0) 100%)",
        }}
      />

      <nav className="relative mx-auto flex max-w-6xl items-baseline justify-between px-5 py-5 sm:px-8 sm:py-6">
        <a
          href="#"
          className="font-display text-lg text-bone transition-colors duration-300 hover:text-rose sm:text-2xl"
        >
          Kalipè
        </a>

        <ul className="flex items-baseline gap-3.5 sm:gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-display text-[0.7rem] text-ash transition-colors duration-300 hover:text-bone sm:text-[0.95rem]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
