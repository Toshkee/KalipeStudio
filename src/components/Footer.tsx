import { addressLine, studio } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 py-14">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-script text-4xl text-cream">{studio.short}</p>
        <p className="mt-3 text-[0.6rem] uppercase tracking-[0.4em] text-cream-dim">
          {studio.tagline}
        </p>
        {/* Godina je fiksna, ne `new Date()`: stranica se prerenderuje statički,
            pa bi se tekuća godina ispekla u build i ostala zamrznuta do sljedećeg
            deploy-a — što tiho postaje netačno svakog 1. januara. */}
        <p className="mt-8 text-[0.65rem] uppercase tracking-[0.2em] text-cream-dim/70">
          © {studio.founded} {studio.legalName ?? studio.name} · {addressLine}
        </p>
      </div>
    </footer>
  );
}
