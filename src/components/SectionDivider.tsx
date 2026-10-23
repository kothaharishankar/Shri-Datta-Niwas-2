/**
 * An original, rangoli-inspired divider: a horizon line of small arcs with a
 * single dot at the centre. Geometry is hand-drawn here, not borrowed.
 */
export function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none w-full overflow-hidden py-10 sm:py-14"
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <svg
        viewBox="0 0 1200 40"
        className="mx-auto block h-8 w-full max-w-7xl px-6"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 20 H360 C380 20 388 4 404 4 C420 4 428 20 448 20 H1200"
          stroke="var(--line-strong)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M0 20 H360 C380 20 388 36 404 36 C420 36 428 20 448 20 H1200"
          stroke="var(--accent)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeDasharray="2 6"
          opacity="0.55"
        />
        <circle cx="404" cy="20" r="3.2" fill="var(--accent)" />
        <circle cx="404" cy="20" r="8" stroke="var(--accent)" strokeWidth="1" opacity="0.45" />
        <circle cx="380" cy="20" r="1.6" fill="var(--line-strong)" />
        <circle cx="428" cy="20" r="1.6" fill="var(--line-strong)" />
      </svg>
    </div>
  );
}
