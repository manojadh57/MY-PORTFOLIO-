import { useEffect, useRef } from "react";

export default function WordFieldCanvas({
  words = [
    "React",
    "TypeScript",
    "Node",
    "Express",
    "MongoDB",
    "Tailwind",
    "Vite",
    "UI/UX",
    "JWT",
    "Stripe",
    "REST",
    "Charts",
    "CI/CD",
    "A11y",
    "Systems",
  ],
  density = 22, // more/less words
  opacity = 0.14, // subtle by default
  font = '12px "IBM Plex Mono", ui-monospace, monospace',
  color = "var(--fg)",
  className = "",
}) {
  const ref = useRef(null);
  const frame = useRef(0);
  const stop = useRef(false);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.scale(dpr, dpr);

    // reduced motion?
    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // seed particles
    const pool = Array.from({ length: density }).map((_, i) => {
      const widx = i % words.length;
      const x = Math.random() * w;
      const y = Math.random() * h * 0.7 + h * 0.06;
      const z = Math.random() * 1 + 0.4; // depth 0.4–1.4
      const vx = (Math.random() * 0.4 + 0.1) * (Math.random() < 0.5 ? -1 : 1);
      const vy = Math.random() * 0.25 - 0.12;
      const rot = (Math.random() * 10 - 5) * (Math.PI / 180);
      return { text: words[widx], x, y, z, vx, vy, rot };
    });

    let mx = 0,
      my = 0; // parallax target
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2) || 0;
      my = (e.clientY - (r.top + r.height / 2)) / (r.height / 2) || 0;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.font = font;
      ctx.textBaseline = "middle";

      for (const p of pool) {
        // movement
        if (!prefersReduce) {
          p.x += p.vx * p.z;
          p.y += p.vy * p.z;
          // gentle parallax
          p.x += mx * 0.2 * p.z;
          p.y += my * 0.2 * p.z;
        }

        // wrap around
        if (p.x < -80) p.x = w + 40;
        if (p.x > w + 80) p.x = -40;
        if (p.y < h * 0.06) p.y = h * 0.76;
        if (p.y > h * 0.82) p.y = h * 0.08;

        // size by depth
        const size = 11 + p.z * 4; // 11–15 px
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.font = `${size}px ${font.split(" ").slice(1).join(" ")}`;
        ctx.fillText(p.text, 0, 0);
        ctx.restore();
      }
      frame.current = requestAnimationFrame(draw);
    };

    // resize
    const ro = new ResizeObserver(() => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    ro.observe(canvas);

    draw();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame.current);
      ro.disconnect();
      stop.current = true;
    };
  }, [words, density, opacity, font, color]);

  return (
    <canvas
      ref={ref}
      className={`absolute inset-0 -z-10 pointer-events-none ${className}`}
      aria-hidden
    />
  );
}
