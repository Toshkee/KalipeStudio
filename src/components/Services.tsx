"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

/*
 * Laid out as a staircase: each group steps further right than the one
 * above it. Not a numbered rail, not a card grid, not a table. The indent
 * is a fixed, deliberate step per row, so it never goes ragged on the
 * length of the copy.
 */
const groups = [
  {
    name: "Šminka",
    items: ["dnevna šminka", "večernja šminka", "šminka za proslave", "probna šminka"],
  },
  {
    name: "Mladenke",
    items: ["proba šminke i frizure", "šminka na dan vjenčanja", "svečane frizure"],
  },
  {
    name: "Kosa",
    items: ["feniranje i lokne", "svečane punđe", "farbanje i pramenovi", "pletenice s perlicama"],
  },
  {
    name: "Nokti",
    items: ["manikir", "gel lak", "njega ruku"],
  },
];

const indent = ["sm:ml-0", "sm:ml-[8%]", "sm:ml-[16%]", "sm:ml-[24%]"];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".svc-move", {
        y: 30,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      // Each name drifts at its own rate as the section passes: the
      // staircase loosens and settles instead of sitting dead.
      gsap.utils.toArray<HTMLElement>(".svc-name").forEach((el, i) => {
        gsap.to(el, {
          x: [10, -8, 12, -6][i] ?? 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      id="usluge"
      ref={root}
      className="scroll-mt-24 px-6 py-24 sm:px-8 sm:py-32"
      style={{ background: "linear-gradient(to bottom, #150609, #1e080e)" }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="svc-move max-w-md text-[0.95rem] leading-[1.75] text-ash">
          Šminka, kosa i nokti. Sve u istom prostoru, kod istih ruku.
        </p>

        <div className="mt-16 sm:mt-28">
          {groups.map((g, i) => (
            <div
              key={g.name}
              className={`svc-move flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-12 ${
                i === groups.length - 1 ? "" : "mb-16 sm:mb-24"
              } ${indent[i]}`}
            >
              <h2 className="svc-name font-display text-[clamp(2.4rem,7vw,4.75rem)] leading-[1.08] text-bone">
                {g.name}
              </h2>
              <ul className="max-w-[15rem] text-[0.9rem] leading-[2.05] text-ash sm:pt-[0.55em]">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
