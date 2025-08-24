/** Fixed bottom Nepal-style mountain line art (very subtle) */
export default function MountainsBackdrop({ opacity = 0.6 }) {
  return (
    <svg
      aria-hidden
      className="fixed bottom-0 left-0 w-full h-40 z-0 pointer-events-none"
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      {/* back ridge */}
      <path
        d="M0 25 L8 18 L15 21 L24 16 L32 19 L40 15 L50 18 L60 14 L70 17 L82 15 L92 19 L100 16 L100 30 L0 30 Z"
        fill="none"
        stroke="#111"
        strokeWidth="0.5"
      />
      {/* front ridge */}
      <path
        d="M0 28 L10 18 L18 22 L28 12 L36 18 L44 10 L55 16 L64 9 L72 14 L80 11 L90 17 L100 12 L100 30 L0 30 Z"
        fill="none"
        stroke="#111"
        strokeWidth="0.7"
      />
    </svg>
  );
}
