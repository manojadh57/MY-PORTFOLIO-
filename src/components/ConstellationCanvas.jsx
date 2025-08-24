import { useEffect, useRef } from "react";

/**
 * Minimal constellation / particle field.
 * - subtle parallax to mouse
 * - lines connect when dots are near
 * - respects prefers-reduced-motion
 */
export default function ConstellationCanvas({
  className = "",
  dots = 60,
  color = "var(--fg)",
  lineOpacity = 0.12,
  dotOpacity = 0.28,
}) {
  const ref = useRef(null);
  const raf = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const pts = Array.from({ length: dots }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.5,
    }));

    let mx = 0,
      my = 0; // -1..1
    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2) || 0;
      my = (e.clientY - (r.top + r.height / 2)) / (r.height / 2) || 0;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (const p of pts) {
        if (!prefersReduce) {
          p.x += p.vx + mx * 0.06;
          p.y += p.vy + my * 0.06;
        }
        // wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.globalAlpha = dotOpacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // connections
      ctx.strokeStyle = color;
      ctx.globalAlpha = lineOpacity;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i],
            b = pts[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMouse);
      ro.disconnect();
    };
  }, [dots, color, lineOpacity, dotOpacity]);

  return (
    <canvas
      ref={ref}
      className={`absolute inset-0 -z-10 pointer-events-none ${className}`}
      aria-hidden
    />
  );
}
