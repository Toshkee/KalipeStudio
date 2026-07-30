"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

const links = [
  { href: "#usluge", label: "Usluge" },
  { href: "#mladenke", label: "Mladenke" },
  { href: "#galerija", label: "Galerija" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Nav() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".nav-bg", { opacity: 1 });
        return;
      }

      gsap.from(root.current, { y: -70, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });

      // Frosted bar only appears once the hero is behind us. Absolute scroll
      // positions, not element geometry: the bar sits in a fixed header, so
      // it never travels through the viewport itself. Lenis feeds
      // ScrollTrigger.update, so this stays in sync with the smooth scroll.
      const fade = (opacity: number) =>
        gsap.to(".nav-bg", { opacity, duration: 0.4, ease: "power2.out", overwrite: true });

      ScrollTrigger.create({
        start: 80,
        end: () => ScrollTrigger.maxScroll(window),
        onEnter: () => fade(1),
        onLeaveBack: () => fade(0),
      });
    },
    { scope: root }
  );

  return (
    <header ref={root} className="fixed inset-x-0 top-0 z-50">
      <div className="nav-bg absolute inset-0 border-b border-cream/10 bg-background/70 opacity-0 backdrop-blur-md" />
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="font-script text-2xl text-cream">
          Kalipè
        </a>

        <ul className="flex items-center gap-5 sm:gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative block text-[0.65rem] uppercase tracking-[0.2em] text-cream-dim transition-colors duration-300 hover:text-cream sm:text-[0.7rem] sm:tracking-[0.25em]"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
