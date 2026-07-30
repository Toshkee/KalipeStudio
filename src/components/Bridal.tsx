"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ArrowUpRight } from "./Mark";

export default function Bridal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(".bridal-ghost", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".bridal-move", {
        y: 28,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="mladenke"
      ref={root}
      className="relative scroll-mt-24 overflow-hidden px-6 py-36 sm:px-8 sm:py-52"
      style={{
        background: "linear-gradient(to bottom, #1e080e 0%, #2e0b16 48%, #1a070c 100%)",
      }}
    >
      {/*
        The word rides the right edge and bleeds off it on purpose, well
        clear of the copy: a composed watermark, never a wash sitting behind
        the text it has to share a line with.
      */}
      <span
        aria-hidden
        className="bridal-ghost pointer-events-none absolute -right-[6vw] top-1/2 -translate-y-1/2 select-none font-display leading-none text-rose/[0.09]"
        style={{ fontSize: "clamp(13rem, 30vw, 27rem)" }}
      >
        Da
      </span>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-xl">
          <h2 className="bridal-move font-display text-[clamp(2.1rem,5.5vw,4.25rem)] leading-[1.1] text-bone">
            Za dan kad kažeš da.
          </h2>
          <p className="bridal-move mt-8 max-w-md text-[0.95rem] leading-[1.8] text-ash">
            Proba šminke, dogovorena frizura i neko ko pazi na svaki detalj. Na
            dan vjenčanja ostaje ti samo da uživaš.
          </p>
          <a
            href="tel:+38260091410"
            className="bridal-move group mt-12 inline-flex items-baseline gap-2 font-display text-xl text-bone transition-colors duration-300 hover:text-rose sm:text-2xl"
          >
            Rezerviši datum
            <ArrowUpRight className="h-3.5 w-3.5 translate-y-px transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
