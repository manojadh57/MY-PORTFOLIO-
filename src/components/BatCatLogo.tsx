import { useEffect, useRef, useState, useCallback } from "react";

/**
 * BatCat brand mark (interactive).
 * Inspired by Mark Horn’s post “How I made the batcat brand logo”.
 * If you ship publicly, add an attribution note (e.g. in your footer/about).
 */
export default function BatCatLogo({
  size = 40,
  className = "",
  idleBob = true,
}: {
  size?: number;
  className?: string;
  idleBob?: boolean;
}) {
  const blinkRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [pos, setPos] = useState({
    head: { x: 90, y: 110 },
    leftEye: { x: 78, y: 112 },
    rightEye: { x: 104, y: 112 },
    leftEarX: 60,
    rightEarX: 120,
  });

  const handleMove = useCallback((clientX: number, clientY: number) => {
    const el = document.getElementById("batcat-logo");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const offX = clientX - cx;
    const offY = clientY - cy;

    const dist = Math.hypot(offX, offY);

    const headMax = 6; // how far the head shifts
    const headFactor = Math.min(dist, headMax) / (dist || 1);
    const headMoveX = offX * headFactor;
    const headMoveY = offY * headFactor;

    const eyeMax = 20; // eye movement range
    const eyeFactor = Math.min(dist, eyeMax) / (dist || 1);
    const eyeMoveX = offX * eyeFactor;
    const eyeMoveY = offY * eyeFactor;

    const earMoveX = headMoveX * 0.5;

    setPos({
      head: { x: 90 + headMoveX, y: 110 + headMoveY },
      leftEye: { x: 77.5 + eyeMoveX, y: 112 + eyeMoveY },
      rightEye: { x: 103.5 + eyeMoveX, y: 112 + eyeMoveY },
      leftEarX: 60 - earMoveX,
      rightEarX: 120 - earMoveX,
    });
  }, []);

  // track mouse/touch globally
  useEffect(() => {
    const onMouse = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length) {
        const t = e.touches[0];
        handleMove(t.clientX, t.clientY);
      }
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [handleMove]);

  // random blink
  useEffect(() => {
    const schedule = () => {
      const ms = 2000 + Math.random() * 3000;
      blinkRef.current = setTimeout(() => {
        setIsBlinking(true);
        blinkRef.current = setTimeout(() => setIsBlinking(false), 160);
        schedule();
      }, ms);
    };
    schedule();
    return () => {
      if (blinkRef.current) clearTimeout(blinkRef.current);
    };
  }, []);

  return (
    <svg
      id="batcat-logo"
      width={size}
      height={size}
      viewBox="0 0 180 180"
      role="img"
      aria-label="BatCat brand mark"
      className={`${idleBob ? "batcat-bob" : ""} ${className}`}
    >
      <defs>
        <clipPath id="bc-clip">
          <circle cx="90" cy="90" r="90" />
        </clipPath>
      </defs>

      <g clipPath="url(#bc-clip)">
        {/* bg circle (auto flips in dark with CSS below) */}
        <circle cx="90" cy="90" r="90" className="fill-white dark:fill-black" />

        {/* Ears */}
        <path d={`M${pos.rightEarX} 34L53 180H163Z`} className="fill-black/80 dark:fill-white/90" />
        <path d={`M${pos.leftEarX} 34L127 180H17Z`} className="fill-black/80 dark:fill-white/90" />

        {/* Head */}
        <circle cx={pos.head.x} cy={pos.head.y} r="37.5" className="fill-black/80 dark:fill-white/90" />

        {/* Eyes */}
        <ellipse
          cx={pos.rightEye.x}
          cy={pos.rightEye.y}
          rx="7.5"
          ry={isBlinking ? "0.01" : "15"}
          className="fill-white dark:fill-black transition-[ry] duration-150"
        />
        <ellipse
          cx={pos.leftEye.x}
          cy={pos.leftEye.y}
          rx="7.5"
          ry={isBlinking ? "0.01" : "15"}
          className="fill-white dark:fill-black transition-[ry] duration-150"
        />
      </g>
    </svg>
  );
}
