import type { Metadata } from "next";
import Link from "next/link";
import { studio } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stranica ne postoji",
  robots: { index: false },
};

/**
 * Sajt je jedna strana, pa se ovdje stiže samo pogrešno ukucanim ili
 * zastarjelim linkom. Umjesto Next-ove bijele 404 — isti bordo i isto ime,
 * i jedan put nazad.
 */
export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
      <p className="font-script text-[clamp(4rem,14vw,7rem)] leading-none text-cream">
        {studio.short}
      </p>
      <h1 className="mt-6 font-serif text-[1.6rem] leading-tight text-cream sm:text-3xl">
        Ova stranica ne postoji
      </h1>
      <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-cream-dim">
        Link je možda pogrešno ukucan. Sve što nudimo je na početnoj strani.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex h-12 items-center justify-center rounded-full bg-gold px-10 text-[0.7rem] uppercase tracking-[0.25em] text-background transition-colors duration-300 hover:bg-cream"
      >
        Na početnu
      </Link>
    </section>
  );
}
