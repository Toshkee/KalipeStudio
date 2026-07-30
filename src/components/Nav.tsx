"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#bridal", label: "Bridal" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
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

      // Frosted bar only appears once the hero is behind us.
      gsap.to(".nav-bg", {
        opacity: 1,
        duration: 0.4,
        ease: "none",
        scrollTrigger: { start: "top -80", end: "max", toggleActions: "play none none reverse" },
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

        <ul className="hidden items-center gap-9 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative block text-[0.7rem] uppercase tracking-[0.25em] text-cream-dim transition-colors duration-300 hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="tel:+38260091410"
          className="rounded-full border border-gold/50 px-5 py-2 text-[0.65rem] uppercase tracking-[0.25em] text-gold transition-colors duration-300 hover:bg-gold hover:text-background"
        >
          060 091 410
        </a>
      </nav>
    </header>
  );
}
