"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { faqs } from "@/lib/site";

export default function Faq() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".faq-el", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );

  if (faqs.length === 0) return null;

  return (
    <section
      id="pitanja"
      ref={root}
      className="scroll-mt-14 border-t border-cream/10 py-14 sm:py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_1.2fr] lg:gap-20">
        <h2 className="faq-el section-title">Česta pitanja</h2>

        {/* Harmonika: na telefonu pet otvorenih odgovora je ekran i po
            teksta koji većina neće čitati. Prvo pitanje je otvoreno. */}
        <div className="border-t border-cream/10">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="faq-el group border-b border-cream/10"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-serif text-[1.3rem] leading-snug text-cream sm:text-2xl">
                {f.q}
                <span
                  aria-hidden
                  className="relative size-3 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45"
                >
                  <span className="absolute top-1/2 left-0 h-px w-3 bg-current" />
                  <span className="absolute top-0 left-1/2 h-3 w-px bg-current" />
                </span>
              </summary>
              <p className="-mt-1 max-w-xl pr-8 pb-6 text-[0.95rem] leading-relaxed text-cream-dim">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
