"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { studio } from "@/lib/site";

// Namjerno ostaje na četiri stavke. Cjenovnik i Česta pitanja su sekcije na
// stranici, ali peta i šesta stavka bi na telefonu razbile red — mjereno.
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
      // it never travels through the viewport itself. Na mišu Lenis hrani
      // ScrollTrigger.update, a na dodiru ScrollTrigger sluša prirodni skrol —
      // oba puta ista granica.
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
      {/* Razmaci, tracking i logo su stegnuti na telefonu. Mjereno stvarnom
          širinom sadržaja: stara verzija je tražila 425px, pa se prelivala na
          svakom telefonu, a overflow-x:hidden je to tiho sjekao.

          Ispod 360px i ispod 320px se steže još dvaput, jer se red mjeri od
          ivice do ivice a ne po okvirima: zamah slova "è" u Great Vibes izlazi
          1,9px preko svoje širine, pa se okviri mogu ne dodirivati dok se
          slova već dodiruju. Izmjereno na čistom viewportu — na 320px je
          razmak do "USLUGE" bio −0,3px (dodir), na 280px je posljednja stavka
          izlazila 7,4px van ekrana. Sada: 280px +7,0px, 320px +19,7px. */}
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 max-[359px]:px-3 sm:px-6 sm:py-2.5">
        <a
          href="#"
          className="font-script text-xl leading-none text-cream max-[319px]:text-lg sm:text-2xl"
          aria-label={`${studio.name} — na vrh strane`}
        >
          {studio.short}
        </a>

        <ul className="flex items-center gap-3 max-[359px]:gap-2 max-[319px]:gap-1.5 sm:gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                // py-3.5 diže dodirnu zonu na ~42px; ranije je bila 15,6px,
                // tj. sama visina teksta.
                className="group relative block py-3.5 text-[0.6rem] uppercase tracking-[0.08em] text-cream-dim transition-colors duration-300 hover:text-cream max-[319px]:tracking-[0.02em] sm:text-[0.7rem] sm:tracking-[0.25em]"
              >
                {l.label}
                <span className="absolute bottom-2.5 left-0 h-px w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
