"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { galleryPhotos } from "@/lib/photos";
import { studio } from "@/lib/site";

const count = galleryPhotos.length;

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const swipeX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const step = (dir: 1 | -1) =>
    setIndex((i) => (i === null ? i : (i + dir + count) % count));

  // <dialog> daje fokus unutra, Esc i inert pozadinu bez ijedne linije
  // koda; stanje ga samo otvara i zatvara.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".gallery-heading", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      // Jedan batch umjesto okidača po slici: pločice koje uđu zajedno
      // dobijaju mali stagger, a na brzom skrolu ništa ne kasni.
      gsap.set(".gallery-tile", { opacity: 0, y: 24 });
      ScrollTrigger.batch(".gallery-tile", {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.07,
            ease: "power3.out",
          }),
      });
    },
    { scope: root }
  );

  const photo = index === null ? null : galleryPhotos[index];

  return (
    <section id="galerija" ref={root} className="scroll-mt-14 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="gallery-heading flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="section-title">Radovi</h2>
          <a
            href={studio.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start py-1 text-[0.7rem] uppercase tracking-[0.25em] text-cream-dim transition-colors hover:text-gold sm:self-auto"
          >
            Još na {studio.instagram.handle} ↗
          </a>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-2 sm:mt-10 sm:grid-cols-4 sm:gap-3 lg:mt-14 lg:gap-4">
          {galleryPhotos.map((p, i) => (
            <li key={p.src.src} className="gallery-tile">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Uvećaj: ${p.alt}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden"
              >
                <Image
                  src={p.src}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 23vw, 48vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: p.focus }}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        aria-label="Radovi studija"
        data-lenis-prevent
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-cream backdrop:bg-background/80"
      >
        {photo && index !== null && (
          <div
            // pan-y: vodoravni potez ide u JS kao swipe, a pinch-zoom
            // ostaje pregledniku za uvećanje fotografije.
            className="flex h-full touch-pan-y touch-pinch-zoom flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
            onPointerDown={(e) => (swipeX.current = e.clientX)}
            onPointerCancel={() => (swipeX.current = null)}
            onPointerUp={(e) => {
              if (swipeX.current === null) return;
              const dx = e.clientX - swipeX.current;
              swipeX.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            <div className="flex h-14 shrink-0 items-center justify-between px-5 sm:px-8">
              <p className="text-[0.7rem] tracking-[0.25em] text-cream-dim tabular-nums">
                {index + 1} / {count}
              </p>
              <button
                type="button"
                onClick={() => setIndex(null)}
                className="-mr-2.5 h-11 px-2.5 text-[0.68rem] uppercase tracking-[0.25em] text-cream"
              >
                Zatvori
              </button>
            </div>

            <div className="relative mx-5 min-h-0 flex-1 sm:mx-20">
              <Image
                key={index}
                src={photo.src}
                alt={photo.alt}
                fill
                placeholder="blur"
                sizes="100vw"
                draggable={false}
                className="object-contain select-none"
              />
            </div>

            <div className="flex h-16 shrink-0 items-center justify-between px-2 sm:px-6">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Prethodna fotografija"
                className="flex size-12 items-center justify-center text-xl text-cream-dim transition-colors hover:text-cream"
              >
                ←
              </button>
              <p className="text-[0.7rem] uppercase tracking-[0.25em] text-cream-dim">{photo.kind}</p>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Sljedeća fotografija"
                className="flex size-12 items-center justify-center text-xl text-cream-dim transition-colors hover:text-cream"
              >
                →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
