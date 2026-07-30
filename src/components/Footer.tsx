export default function Footer() {
  return (
    <footer className="border-t border-cream/10 py-14">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="font-script text-4xl text-cream">Kalipè</p>
        <p className="mt-3 text-[0.6rem] uppercase tracking-[0.4em] text-cream-dim">
          definicija ljepote
        </p>
        <p className="mt-8 text-[0.65rem] uppercase tracking-[0.2em] text-cream-dim/50">
          © {new Date().getFullYear()} Kalipè Studio · Piperska bb, Podgorica
        </p>
      </div>
    </footer>
  );
}
