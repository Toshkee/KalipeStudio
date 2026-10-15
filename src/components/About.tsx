"use client";

import Image from "next/image";
import { useRef } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { studioPhotos } from "@/lib/photos";
import { team } from "@/lib/site";

const [main, ...rest] = studioPhotos;

/**
 * Vrteška ispod desktopa: pet fotografija složenih u 3D prsten koji se sam
 * polako okreće dok je na ekranu, a može se zavrtjeti i prstom.
 *
 * Svaka fotografija stoji dvaput, jedna naspram druge (10 kartica na 36°).
 * Prednja polovina prstena tako uvijek pokazuje pet različitih, a kartice su
 * dovoljno gusto da se sa strane vide susjedne, ne samo prednja. Na desktopu
 * duplikati su skriveni i ostaje mreža od pet.
 *
 * Ranije je ovo bila traka sa scroll-snap-om, a GSAP je kartice pri ulasku
 * pomjerao po X osi — browser je svaki frejm iznova snapovao traku, pa se
 * sve treslo. Prsten nema skrol kontejner, pa nema ni šta da se snapuje.
 */
const ringCards = [...rest, ...rest];

export default function About() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        const stageEl = stage.current;
        const ringEl = ring.current;
        if (!stageEl || !ringEl) return;

        // Jedan ugao; CSS iz `--rot` računa položaj prstena i prozirnost
        // svake kartice.
        const state = { rot: 0 };
        const apply = () => ringEl.style.setProperty("--rot", `${state.rot}deg`);

        // Samostalno okretanje: jedna kartica (36°) svake dvije sekunde, pa
        // svih pet fotografija prođe naprijed za 10 s. Vrti se samo dok je
        // prsten na ekranu, i staje dok se prevlači prstom.
        const SPEED = 18; // stepeni u sekundi
        let onScreen = false;
        let held = false;
        const tick = (_time: number, deltaMs: number) => {
          if (!onScreen || held || reduce) return;
          // Poslije povratka iz pozadine deltaMs zna biti ogroman; bez
          // ograničenja bi prsten skočio.
          state.rot -= (Math.min(deltaMs, 100) / 1000) * SPEED;
          apply();
        };
        gsap.ticker.add(tick);
        ScrollTrigger.create({
          trigger: stageEl,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            onScreen = self.isActive;
          },
        });

        // Prevlačenje: širina jedne kartice = jedno mjesto (36°).
        let dragging = false;
        let lastX = 0;
        let lastT = 0;
        let velocity = 0;
        let degPerPx = 0.18;
        let inertia: gsap.core.Tween | null = null;

        const onDown = (e: PointerEvent) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          inertia?.kill();
          stageEl.setPointerCapture(e.pointerId);
          const card = ringEl.firstElementChild as HTMLElement | null;
          degPerPx = 36 / Math.max(120, card?.offsetWidth ?? 200);
          dragging = true;
          held = true;
          lastX = e.clientX;
          lastT = e.timeStamp;
          velocity = 0;
        };
        const onMove = (e: PointerEvent) => {
          if (!dragging) return;
          const dx = e.clientX - lastX;
          const dt = Math.max(1, e.timeStamp - lastT);
          lastX = e.clientX;
          lastT = e.timeStamp;
          const d = dx * degPerPx;
          state.rot += d;
          velocity = velocity * 0.7 + (d / dt) * 0.3;
          apply();
        };
        const onUp = () => {
          if (!dragging) return;
          dragging = false;
          // Zamah: brzina u stepenima po milisekundi, zaustavi se za ~1 s,
          // pa se samostalno okretanje nastavi.
          const extra = gsap.utils.clamp(-240, 240, velocity * 350);
          if (Math.abs(extra) < 1) {
            held = false;
            return;
          }
          inertia = gsap.to(state, {
            rot: state.rot + extra,
            duration: 1,
            ease: "power3.out",
            onUpdate: apply,
            onComplete: () => {
              held = false;
            },
          });
        };

        stageEl.addEventListener("pointerdown", onDown);
        stageEl.addEventListener("pointermove", onMove);
        stageEl.addEventListener("pointerup", onUp);
        stageEl.addEventListener("pointercancel", onUp);

        if (!reduce) {
          gsap.from(stageEl, {
            opacity: 0,
            y: 24,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: stageEl, start: "top 90%" },
          });
        }

        return () => {
          gsap.ticker.remove(tick);
          inertia?.kill();
          stageEl.removeEventListener("pointerdown", onDown);
          stageEl.removeEventListener("pointermove", onMove);
          stageEl.removeEventListener("pointerup", onUp);
          stageEl.removeEventListener("pointercancel", onUp);
          ringEl.style.removeProperty("--rot");
        };
      });

      if (reduce) return;

      gsap.from(".about-photo", {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.3,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".about-photo", start: "top 85%" },
      });

      gsap.from(".about-el", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-text", start: "top 82%" },
      });

      mm.add("(min-width: 1024px)", () => {
        gsap.from(".orbit-card", {
          x: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: stage.current, start: "top 88%" },
        });

        // Paralaksa samo na desktopu. Na telefonu skrol ide prirodno i svaki
        // scrub je još jedan posao po frejmu za ono malo pomjeraja.
        gsap.to(".about-photo-inner", {
          yPercent: -7,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="studio" ref={root} className="scroll-mt-14 border-t border-cream/10 bg-surface py-14 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_minmax(0,0.85fr)] lg:items-center lg:gap-20">
        <figure className="about-photo relative aspect-[4/5] overflow-hidden lg:order-2">
          <div className="about-photo-inner absolute inset-0 lg:-bottom-[8%]">
            <Image
              src={main.src}
              alt={main.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 460px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
              className="object-cover"
            />
          </div>
        </figure>

        <div className="about-text lg:order-1">
          <h2 className="about-el section-title">Novi prostor u City keju</h2>

          <p className="about-el mt-6 max-w-xl text-[0.95rem] leading-relaxed text-cream-dim sm:text-base">
            Kalipè je počeo kao Anđelin rad sa šminkom: mladenke, mature,
            proslave. Od 9. januara 2026. radimo u novom prostoru u Piperskoj,
            a uz šminku sada radimo i kosu i nokte.
          </p>

          <blockquote className="about-el mt-8 max-w-xl border-l border-gold/60 pl-5">
            <p className="font-serif text-[1.3rem] leading-snug text-cream/90 italic sm:text-2xl">
              „Nestrpljivo sam čekala dan kada ćemo otvoriti vrata novog
              prostora i pružiti vam kompletnu uslugu uljepšavanja.“
            </p>
            <footer className="mt-3 text-[0.68rem] uppercase tracking-[0.22em] text-cream-dim">
              Anđela Jovićević
            </footer>
          </blockquote>

          <dl className="about-el mt-10 max-w-xl border-t border-cream/10">
            {team.map((t) => (
              <div
                key={t.name}
                className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-4"
              >
                <dt className="font-serif text-xl text-cream sm:text-2xl">{t.name}</dt>
                <dd className="text-right">
                  <span className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">
                    {t.role}
                  </span>
                  {t.note && (
                    <span className="mt-1 block text-[0.8rem] text-cream-dim">{t.note}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Ispod lg: 3D prsten (stilovi u globals.css, .orbit-*). Od lg: pet u redu. */}
      <div
        ref={stage}
        className="orbit-stage mt-12 lg:mx-auto lg:mt-20 lg:max-w-6xl lg:px-8"
      >
        <ul
          ref={ring}
          aria-label="Fotografije studija"
          className="orbit lg:grid lg:grid-cols-5 lg:gap-4"
        >
          {ringCards.map((p, i) => (
            <li
              key={`${p.src.src}-${i}`}
              style={{ "--i": i } as React.CSSProperties}
              aria-hidden={i >= rest.length || undefined}
              className={`orbit-card relative aspect-[4/5] overflow-hidden ${
                i >= rest.length ? "lg:hidden" : ""
              }`}
            >
              <Image
                src={p.src}
                alt={i >= rest.length ? "" : p.alt}
                fill
                placeholder="blur"
                draggable={false}
                sizes="(min-width: 1024px) 220px, 240px"
                className="object-cover select-none"
              />
            </li>
          ))}
        </ul>

        {/* Mekane ivice prstena, samo dok je vrteška. */}
        <div aria-hidden className="orbit-fade orbit-fade-l lg:hidden" />
        <div aria-hidden className="orbit-fade orbit-fade-r lg:hidden" />
      </div>
    </section>
  );
}
