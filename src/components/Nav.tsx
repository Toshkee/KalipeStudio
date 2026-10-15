"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { addressLine, primaryPhone, studio, viberLink } from "@/lib/site";

const links = [
  { href: "#usluge", label: "Usluge" },
  { href: "#studio", label: "Studio" },
  { href: "#mladenke", label: "Mladenke" },
  { href: "#galerija", label: "Galerija" },
  { href: "#kontakt", label: "Kontakt" },
];

// Zaključavanje ide sinhrono, ne kroz efekat: ScrollProvider hvata klik na
// link tek kad događaj stigne do document-a, a do tad <html> već mora biti
// otključan — inače window.scrollTo nema šta da pomjeri.
const lockPage = (locked: boolean) =>
  document.documentElement.classList.toggle("menu-open", locked);

export default function Nav() {
  const root = useRef<HTMLElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  /** href sekcije koja je trenutno na sredini ekrana — zlatna linija u meniju. */
  const [active, setActive] = useState<string | null>(null);

  const toggle = (next: boolean) => {
    lockPage(next);
    setOpen(next);
  };

  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();

    const close = () => {
      lockPage(false);
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    // Ako se prozor raširi do desktop navigacije dok je meni otvoren.
    const wide = window.matchMedia("(min-width: 768px)");
    const onWide = () => wide.matches && close();

    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  useGSAP(
    () => {
      // Koja je sekcija "trenutna": ona čiji dio prelazi sredinu ekrana.
      // Radi i uz smanjeno kretanje — nije animacija nego orijentacija.
      links.forEach((l) => {
        const section = document.querySelector(l.href);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) =>
            setActive((prev) => (self.isActive ? l.href : prev === l.href ? null : prev)),
        });
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".nav-bg", { opacity: 1 });
        return;
      }

      gsap.from(".nav-row", { y: -60, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });

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
      <div className="nav-bg absolute inset-0 border-b border-cream/10 bg-background/75 opacity-0 backdrop-blur-md" />

      {/* Meni na telefonu. Stoji ispod reda s logom, pa "Zatvori" ostaje
          tamo gdje je bilo "Meni". data-lenis-prevent: na uskom prozoru s
          mišem Lenis inače skroluje stranicu ispod. */}
      <div
        id="meni"
        data-lenis-prevent
        inert={!open}
        className={`fixed inset-0 overflow-y-auto overscroll-contain bg-background transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col px-5 pt-24 pb-[calc(1.75rem+env(safe-area-inset-bottom))]">
          <ul>
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-cream/10">
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={l.href}
                  onClick={() => toggle(false)}
                  className="flex items-baseline justify-between py-3.5 font-serif text-[2.1rem] leading-tight text-cream active:text-gold"
                >
                  {l.label}
                  <span aria-hidden className="text-base text-cream-dim/60">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto grid gap-3 pt-12">
            <a
              href={`tel:${primaryPhone.tel}`}
              className="flex h-13 items-center justify-center rounded-full bg-gold text-[0.72rem] uppercase tracking-[0.22em] text-background"
            >
              Pozovi {primaryPhone.display}
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={viberLink}
                className="flex h-13 items-center justify-center rounded-full border border-cream/25 text-[0.72rem] uppercase tracking-[0.22em] text-cream"
              >
                Viber
              </a>
              <a
                href={studio.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-13 items-center justify-center rounded-full border border-cream/25 text-[0.72rem] uppercase tracking-[0.22em] text-cream"
              >
                Instagram
              </a>
            </div>
            <p className="mt-3 text-center text-xs leading-relaxed text-cream-dim">
              {addressLine}
            </p>
          </div>
        </div>
      </div>

      <nav className="nav-row relative mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8 md:h-16">
        <a
          href="#"
          onClick={() => open && toggle(false)}
          className="font-script text-[1.7rem] leading-none text-cream sm:text-3xl"
          aria-label={`${studio.name} — na vrh strane`}
        >
          {studio.short}
        </a>

        <ul className="hidden items-center gap-7 md:flex lg:gap-9">
          {links.map((l) => {
            const current = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={current ? "location" : undefined}
                  className={`group relative block py-3 text-[0.7rem] uppercase tracking-[0.25em] transition-colors duration-300 hover:text-cream ${
                    current ? "text-cream" : "text-cream-dim"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute bottom-2 left-0 h-px bg-gold transition-all duration-500 ease-out group-hover:w-full ${
                      current ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => toggle(!open)}
          aria-expanded={open}
          aria-controls="meni"
          className="-mr-2.5 flex h-11 items-center gap-3 px-2.5 text-[0.68rem] uppercase tracking-[0.25em] text-cream md:hidden"
        >
          {open ? "Zatvori" : "Meni"}
          <span aria-hidden className="relative block h-2.5 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${
                open ? "top-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </nav>
    </header>
  );
}
