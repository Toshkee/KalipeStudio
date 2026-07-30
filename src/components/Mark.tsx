/*
 * The house mark. One arrow, drawn for this brand and reused everywhere a
 * link leaves the page or a call is placed: a 45 degree shaft with an open
 * bracket head, rounded caps, hairline weight to match the type. Not an
 * icon-pack glyph and never sitting in a tile.
 */
export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3.2 12.8 12.5 3.5" />
      <path d="M6.1 3.2h6.6v6.6" />
    </svg>
  );
}
