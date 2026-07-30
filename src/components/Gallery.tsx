"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ArrowUpRight } from "./Mark";

/*
 * The plates are a material, not empty boxes: the same oxblood velvet the
 * hero is lit from, raked by a highlight running in the same direction as
 * the shader's light, so the section belongs to the hero.
 *
 * Each plate is sized and cropped exactly as the real photograph will be.
 * Swap the inner <span> for <Image> once Anđela's photos arrive
 * (public/radovi/*.jpg) and nothing else needs to move.
 */
const plates = [
  { caption: "Mladenke", ratio: "aspect-[3/4]", tone: 0 },
  { caption: "Večernja šminka", ratio: "aspect-square", tone: 1 },
  { caption: "Punđe", ratio: "aspect-[3/4]", tone: 2 },
  { caption: "Pletenice", ratio: "aspect-square", tone: 1 },
  { caption: "Farbanje", ratio: "aspect-[3/4]", tone: 0 },
  { caption: "Nokti", ratio: "aspect-square", tone: 2 },
];

/*
 * Each plate is lit from the upper left, the same direction the hero's
 * velvet is raked from, so the material belongs to the same room.
 */
const tones = [
  "radial-gradient(125% 95% at 16% 6%, rgba(240,230,217,0.075) 0%, rgba(240,230,217,0) 58%), linear-gradient(146deg, #46121f 0%, #240a15 54%, #10050b 100%)",
  "radial-gradient(125% 95% at 16% 6%, rgba(240,230,217,0.065) 0%, rgba(240,230,217,0) 58%), linear-gradient(146deg, #3b0f1c 0%, #1e0812 56%, #0d0409 100%)",
  "radial-gradient(125% 95% at 16% 6%, rgba(240,230,217,0.055) 0%, rgba(240,230,217,0) 58%), linear-gradient(146deg, #340d19 0%, #1a0710 58%, #0b0407 100%)",
];

export default function Gallery() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>(".plate-col").forEach((col, i) => {
        gsap.to(col, {
          yPercent: [-3, -11, -6][i] ?? -5,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.from(".plate-move", {
        y: 34,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 76%" },
      });
    },
    { scope: root }
  );

  const columns = [plates.slice(0, 2), plates.slice(2, 4), plates.slice(4, 6)];

  return (
    <section
      id="radovi"
      ref={root}
      className="scroll-mt-24 px-6 py-24 sm:px-8 sm:py-32"
      style={{ background: "linear-gradient(to bottom, #1a070c, #120509)" }}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="plate-move font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] text-bone">
          Radovi
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:mt-20 sm:grid-cols-3 sm:gap-7">
          {columns.map((col, i) => (
            <div
              key={i}
              className={`plate-col flex flex-col gap-4 sm:gap-7 ${i === 1 ? "sm:mt-14" : ""}`}
            >
              {col.map((p) => (
                <figure key={p.caption} className="plate-move">
                  <span
                    className={`block w-full overflow-hidden ${p.ratio}`}
                    style={{
                      background: tones[p.tone],
                      boxShadow: "inset 0 1px 0 0 rgba(240,230,217,0.055)",
                    }}
                  />
                  <figcaption className="mt-3 font-display text-[0.95rem] text-ash">
                    {p.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>

        <a
          href="https://www.instagram.com/kalipe.studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="plate-move group mt-16 inline-flex items-baseline gap-2 font-display text-lg text-bone transition-colors duration-300 hover:text-rose sm:mt-20 sm:text-xl"
        >
          Još radova na @kalipe.studio
          <ArrowUpRight className="h-3.5 w-3.5 translate-y-px transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
