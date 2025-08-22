export default function BatCatMark({ size = 28, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      role="img"
      aria-label="BatCat mark"
      className={className}
    >
      <circle cx="90" cy="90" r="90" className="fill-white dark:fill-black" />
      <path d="M163 180L120 34L53 180H163Z" className="fill-black/80 dark:fill-white/90" />
      <path d="M17 180L60 34L127 180H17Z" className="fill-black/80 dark:fill-white/90" />
      <circle cx="90.5" cy="111.5" r="37.5" className="fill-black/80 dark:fill-white/90" />
      <ellipse cx="103.5" cy="112" rx="7.5" ry="15" className="fill-white dark:fill-black" />
      <ellipse cx="77.5" cy="112" rx="7.5" ry="15" className="fill-white dark:fill-black" />
    </svg>
  );
}
