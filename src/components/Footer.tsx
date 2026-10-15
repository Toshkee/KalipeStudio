import { addressLine, primaryPhone, studio } from "@/lib/site";

export default function Footer() {
  return (
    <footer data-hides-bar className="border-t border-cream/10 pt-12 pb-[calc(3rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <p className="font-script text-4xl text-cream">{studio.short}</p>
        <p className="mt-2 text-[0.62rem] uppercase tracking-[0.4em] text-cream-dim">
          {studio.tagline}
        </p>

        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-cream-dim">
          <a href={`tel:${primaryPhone.tel}`} className="py-2 transition-colors hover:text-gold">
            {primaryPhone.display}
          </a>
          <a
            href={studio.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 transition-colors hover:text-gold"
          >
            {studio.instagram.handle}
          </a>
        </p>

        {/* Godina je fiksna, ne `new Date()`: stranica se prerenderuje statički,
            pa bi se tekuća godina ispekla u build i ostala zamrznuta do sljedećeg
            deploy-a — što tiho postaje netačno svakog 1. januara. */}
        <p className="mt-6 text-[0.65rem] uppercase leading-relaxed tracking-[0.2em] text-cream-dim/70">
          © {studio.founded} {studio.legalName ?? studio.name}
          <span className="max-sm:hidden"> · </span>
          <br className="sm:hidden" />
          {addressLine}
        </p>
      </div>
    </footer>
  );
}
