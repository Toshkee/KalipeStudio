"use client";

import Lenis from "lenis";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

export default function ScrollProvider() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Na dodir Lenis ionako ne preuzima skrol (syncTouch je podrazumijevano
    // isključen) — ostane samo prazna rAF petlja i klasa na <html>. Telefon
    // zato ide na svoj prirodni skrol, a ScrollTrigger sluša njega.
    const touch = window.matchMedia("(pointer: coarse)").matches;

    // lerp 0.09 je značio 872 ms po jednom potezu točkića — izmjereno, i to
    // sa zadnjom trećinom puta u puzanju. 0.15 se smiri za ~470 ms i i dalje
    // klizi. wheelMultiplier je vraćen na 1: sa 0.9 je jedan zavrtaj nosio
    // manje nego u svakom drugom sajtu, pa se osjećalo kao da vuče.
    const lenis = touch
      ? null
      : new Lenis({ lerp: 0.15, wheelMultiplier: 1 });

    let update: ((time: number) => void) | null = null;

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      update = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
    }

    // Anchor links glide through Lenis instead of jumping, so nav clicks
    // feel like the rest of the scroll.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!link) return;

      const hash = link.getAttribute("href");
      if (!hash) return;

      if (hash === "#") {
        e.preventDefault();
        if (lenis) lenis.scrollTo(0, { duration: 1.2 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();

      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.2 });
      } else {
        // globals.css gasi scroll-behavior, pa se glatkoća traži ovdje.
        const top =
          (target as HTMLElement).getBoundingClientRect().top +
          window.scrollY -
          80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      if (update) gsap.ticker.remove(update);
      lenis?.destroy();
    };
  });

  return null;
}
