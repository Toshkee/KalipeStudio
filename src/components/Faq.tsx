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
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root }
  );

  if (faqs.length === 0) return null;

  return (
    <section
      id="pitanja"
      ref={root}
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24"
    >
      <div className="faq-el">
        <p className="text-[0.7rem] uppercase tracking-[0.45em] text-gold">
          Česta pitanja
        </p>
        <h2 className="mt-4 font-serif text-4xl text-cream sm:text-6xl">
          Dobro je znati
        </h2>
      </div>

      <dl className="mt-16 grid gap-x-16 gap-y-10 sm:grid-cols-2">
        {faqs.map((f) => (
          <div key={f.q} className="faq-el">
            <dt className="font-serif text-xl text-cream sm:text-2xl">{f.q}</dt>
            <dd className="mt-3 text-sm leading-relaxed text-cream-dim">
              {f.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
