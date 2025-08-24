// src/components/About.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiVite,
  SiRedux,
  SiDocker,
  SiGithub,
} from "react-icons/si";
import {
  FiMail,
  FiDownload,
  FiClock,
  FiMapPin,
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
} from "react-icons/fi";

/* ===================== CONFIG ===================== */
const AVATAR_SRC = "/manoj-portrait.svg";
const ROLES = [
  "Full-Stack Developer",
  "UI/UX Designer",
  "MERN Engineer",
  "Creative Builder",
];

const SKILLS = [
  { Icon: SiReact, label: "React" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiJavascript, label: "JavaScript" },
  { Icon: SiNodedotjs, label: "Node.js" },
  { Icon: SiExpress, label: "Express" },
  { Icon: SiMongodb, label: "MongoDB" },
  { Icon: SiTailwindcss, label: "Tailwind CSS" },
  { Icon: SiVite, label: "Vite" },
  { Icon: SiRedux, label: "Redux" },
  { Icon: SiDocker, label: "Docker" },
  { Icon: SiGithub, label: "GitHub" },
];

const FEATURED = [
  {
    title: "E-Commerce Website",
    blurb: "Full MERN stack shop (Stripe, auth, product dashboard).",
    tags: ["React", "Node", "Stripe"],
    href: "#projects",
  },
  {
    title: "Library Management System",
    blurb: "Borrow/return tracking, dashboards, secure auth.",
    tags: ["React", "Node", "MongoDB"],
    href: "#projects",
  },
  {
    title: "MovieWorld App",
    blurb: "Browse & save movies with watchlist and detail pages.",
    tags: ["React", "TMDB", "Vite"],
    href: "#projects",
  },
];

/* ===================== UTIL ===================== */
const useReduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===================== TYPEWRITER (roles) ===================== */
function Typewriter({ items = ROLES, speed = 80, pause = 900 }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = items[i];
    const t = setTimeout(
      () => {
        if (!del && text.length < full.length)
          setText(full.slice(0, text.length + 1));
        else if (!del && text.length === full.length)
          setTimeout(() => setDel(true), pause);
        else if (del && text.length > 0)
          setText(full.slice(0, text.length - 1));
        else if (del && text.length === 0) {
          setDel(false);
          setI((v) => (v + 1) % items.length);
        }
      },
      del ? speed / 2 : speed
    );
    return () => clearTimeout(t);
  }, [text, del, i, items, speed, pause]);

  return (
    <>
      <style>{`@keyframes caret{0%,45%{opacity:1}50%,100%{opacity:0}}`}</style>
      <div className="font-mono text-sm md:text-base text-muted">
        {text}
        <span
          className="inline-block w-2 align-middle"
          style={{ animation: "caret 1s steps(1) infinite" }}
        >
          |
        </span>
      </div>
    </>
  );
}

/* ===================== POINTER RING ===================== */
function PointerRing({ items = SKILLS, innerPct = 0.27, outerPct = 0.39 }) {
  const ref = useRef(null);
  const [geom, setGeom] = useState({ rInner: 110, rOuter: 160, cx: 0, cy: 0 });
  const reduce = useReduceMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      const s = Math.min(rect.width, rect.height);
      setGeom({
        rInner: s * innerPct,
        rOuter: s * outerPct,
        cx: rect.width / 2,
        cy: rect.height / 2,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [innerPct, outerPct]);

  useEffect(() => {
    if (reduce) return;
    const root = document.documentElement;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      root.style.setProperty(
        "--orbitBoost",
        String(1 + Math.min(0.35, Math.hypot(x, y) * 0.2))
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  const slots = useMemo(() => {
    const step = 360 / items.length;
    return items.map((it, i) => ({ ...it, deg: i * step }));
  }, [items.length]);

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        .orbit { position:absolute; inset:0; pointer-events:none; }
        .orbit-inner,.orbit-outer{ position:absolute; inset:0; transform-origin:50% 50%;
          animation: spin calc(var(--dur, 38s) / var(--orbitBoost, 1)) linear infinite; }
        .orbit-outer{ animation-duration: calc(52s / var(--orbitBoost, 1)); animation-direction: reverse; }
        .slot{ position:absolute; left:50%; top:50%; transform-origin:center; }
        .marker{ width:34px; height:34px; display:grid; place-items:center;
          border:2px solid var(--border); background:var(--card); border-radius:10px;
          box-shadow:4px_4px_0 var(--shadow-weak);}
        .marker svg{ width:16px; height:16px }
        @media (max-width:640px){ .marker{ width:28px; height:28px } .marker svg{ width:14px; height:14px } }
        @media (prefers-reduced-motion: reduce){ .orbit-inner,.orbit-outer{ animation:none !important } }
        @keyframes draw{ to{ stroke-dashoffset:0 } }
      `}</style>

      <div ref={ref} className="absolute inset-0">
        <svg
          className="absolute inset-0"
          width="100%"
          height="100%"
          aria-hidden
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 6 6"
              refX="4.5"
              refY="3"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 z" fill="currentColor" opacity=".65" />
            </marker>
          </defs>
          <g className="orbit-inner">
            {slots.map(({ deg }, i) => {
              const a = (deg - 90) * (Math.PI / 180);
              const x1 = geom.cx + geom.rInner * Math.cos(a);
              const y1 = geom.cy + geom.rInner * Math.sin(a);
              const x2 = geom.cx + geom.rOuter * Math.cos(a);
              const y2 = geom.cy + geom.rOuter * Math.sin(a);
              return (
                <line
                  key={`in-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="1.4"
                  markerEnd="url(#arrow)"
                  style={{
                    opacity: 0.45,
                    strokeDasharray: 110,
                    strokeDashoffset: 110,
                    animation: `draw 1.1s ease-out ${i * 0.05}s forwards`,
                  }}
                />
              );
            })}
          </g>
          <g className="orbit-outer">
            {slots.map(({ deg }, i) => {
              const a = (deg - 90) * (Math.PI / 180);
              const x1 = geom.cx + geom.rInner * Math.cos(a) * 1.08;
              const y1 = geom.cy + geom.rInner * Math.sin(a) * 1.08;
              const x2 = geom.cx + geom.rOuter * Math.cos(a) * 1.08;
              const y2 = geom.cy + geom.rOuter * Math.sin(a) * 1.08;
              return (
                <line
                  key={`out-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth="1.1"
                  markerEnd="url(#arrow)"
                  style={{
                    opacity: 0.28,
                    strokeDasharray: 110,
                    strokeDashoffset: 110,
                    animation: `draw 1.1s ease-out ${0.5 + i * 0.05}s forwards`,
                  }}
                />
              );
            })}
          </g>
        </svg>

        <div className="orbit-inner">
          {slots.map(({ Icon, label, deg }, i) => {
            const transform = `rotate(${deg}deg) translateX(${
              geom.rOuter
            }px) rotate(${-deg}deg)`;
            return (
              <div
                key={`icon-${label}-${i}`}
                className="slot"
                style={{ transform }}
              >
                <div className="marker" title={label}>
                  <Icon />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ===================== RIGHT EXTRAS ===================== */
function AvailabilityCard() {
  return (
    <div className="mt-8 inline-flex items-center gap-4 border-2 border-border bg-card px-4 py-3 shadow-[6px_6px_0_var(--shadow-weak)]">
      <span className="relative inline-flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
      </span>
      <div className="font-mono text-sm leading-tight">
        <div className="font-bold">
          Available for full-time & select freelance
        </div>
        <div className="mt-0.5 flex gap-3 text-muted">
          <span className="inline-flex items-center gap-1">
            <FiMapPin /> Sydney, UTC+10/11
          </span>
          <span className="inline-flex items-center gap-1">
            <FiClock /> ~24h response
          </span>
        </div>
      </div>
    </div>
  );
}

function FeaturedStrip() {
  const scroller = useRef(null);
  const scrollBy = (dir) => {
    if (!scroller.current) return;
    const card = scroller.current.querySelector("[data-card]");
    const w = card ? card.getBoundingClientRect().width : 320;
    scroller.current.scrollBy({ left: dir * (w + 16), behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .snapx { scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch }
        .snapc { scroll-snap-align: start }
      `}</style>
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-extrabold tracking-tight">Featured work</h3>
          <div className="flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              className="btn-brutal px-2 py-1"
              aria-label="Previous"
            >
              <FiArrowLeft />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="btn-brutal px-2 py-1"
              aria-label="Next"
            >
              <FiArrowRight />
            </button>
          </div>
        </div>
        <div
          ref={scroller}
          className="snapx overflow-x-auto no-scrollbar flex gap-4 pr-1"
        >
          {FEATURED.map((p) => (
            <a
              key={p.title}
              href={p.href}
              data-card
              className="snapc min-w-[320px] border-2 border-border bg-card p-4 shadow-[6px_6px_0_var(--shadow-weak)] hover:-translate-y-[2px] transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-extrabold">{p.title}</div>
                <FiExternalLink className="opacity-70" />
              </div>
              <p className="font-mono text-sm text-muted mt-2">{p.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] border border-border px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

/* ===================== MAIN ===================== */
export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-bg text-fg pt-28 md:pt-36 pb-16"
    >
      {/* subtle grid + warm wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "linear-gradient(#00000010 1px, transparent 1px), linear-gradient(90deg, #00000010 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 70% at 30% 90%, rgba(255,214,0,0.22) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto w-[min(1200px,94vw)]">
        <div className="grid grid-cols-12 gap-12 md:gap-10 items-start">
          {/* LEFT — portrait stage */}
          <div className="col-span-12 md:col-span-5">
            <div className="relative w-[min(520px,88vw)] aspect-square">
              <PointerRing />
              <img
                src={AVATAR_SRC}
                alt="Manoj Adhikari"
                className="absolute inset-0 m-auto max-w-[74%] md:max-w-[78%] h-auto drop-shadow-[0_16px_34px_rgba(0,0,0,0.18)]"
                style={{
                  background: "transparent",
                  objectFit: "contain",
                  animation: "float 6s ease-in-out infinite",
                }}
                loading="eager"
              />
            </div>
          </div>

          {/* RIGHT — name box + roles + details + CTAs + new extras */}
          <div className="col-span-12 md:col-span-7">
            {/* name box */}
            <div className="inline-block border-2 border-border bg-card px-5 py-3 shadow-[8px_8px_0_var(--shadow-weak)]">
              <div
                className="text-[clamp(26px,5.2vw,48px)] leading-none font-black tracking-wide"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Manoj <span className="text-accent">Adhikari</span>
              </div>
              <Typewriter />
            </div>

            {/* details */}
            <p className="mt-6 font-mono text-lg md:text-xl leading-relaxed max-w-[62ch]">
              A dedicated <strong>Full Stack Developer</strong> skilled in
              crafting web applications using
              <strong> JavaScript</strong>, <strong>React.js</strong>,{" "}
              <strong>Node.js</strong>, and
              <strong> Express</strong>, complemented by proficiency in various
              modern libraries and frameworks.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-4">
              <a href="#projects" className="btn-brutal btn-accent">
                View Projects
              </a>
              <a href="/resume.pdf" download className="btn-brutal">
                <FiDownload /> Download Resume
              </a>
              <a href="#contact" className="btn-brutal">
                <FiMail /> Contact Me
              </a>
            </div>

            {/* NEW: right-down filler */}
            <AvailabilityCard />
            <FeaturedStrip />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== float keyframes (scoped once) ===== */
const style =
  typeof document !== "undefined" ? document.createElement("style") : null;
if (style && !document.getElementById("about-float")) {
  style.id = "about-float";
  style.innerHTML = `@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`;
  document.head.appendChild(style);
}
