"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".foot-move", {
        y: 22,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 90%" },
      });
    },
    { scope: root }
  );

  return (
    <footer
      ref={root}
      className="relative overflow-hidden pt-24 sm:pt-32"
      style={{ background: "linear-gradient(to bottom, #0b0407, #050203)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-12 sm:px-8">
        <p className="foot-move font-display text-lg text-ash sm:col-span-4">
          definicija ljepote
        </p>
        <p className="foot-move text-[0.82rem] leading-[1.9] text-ash sm:col-span-4">
          Piperska bb, lamela 3, Podgorica
          <br />
          060 091 410
        </p>
        <p className="foot-move text-[0.82rem] leading-[1.9] text-ash sm:col-span-4">
          © {new Date().getFullYear()} Kalipè Studio
        </p>
      </div>

      {/*
        The signature: anchored flush to the bottom edge with no gap beneath
        it, on the layer above the grain, whole and uncropped.

        Measured, not guessed: with leading-none the line box sits 0.195em
        inside the glyphs, and the ink descender of "Kalipè" ends 0.127em
        above that. 0.068em of bottom margin puts the tail of the p exactly
        on the page edge. Font-size relative, so it holds at every clamp step.
      */}
      <p
        aria-hidden
        className="mt-14 select-none px-6 text-center font-display leading-none text-bone/[0.13] sm:mt-20 sm:px-8"
        style={{ fontSize: "clamp(5rem, 21vw, 17rem)", marginBottom: "0.068em" }}
      >
        Kalipè
      </p>
    </footer>
  );
}
