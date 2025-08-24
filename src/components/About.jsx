// src/components/About.jsx
import { useEffect, useState } from "react";
import { FiMail, FiDownload, FiMapPin } from "react-icons/fi";
import ArtisticPortrait from "./ArtisticPortrait";

/* ===================== CONFIG ===================== */
const ROLES = [
  "Full Stack Developer",
  "MERN Stack Engineer",
  "React Developer",
  "Backend Specialist",
];

/* ===================== TYPEWRITER ===================== */
function Typewriter({ items = ROLES, speed = 80, pause = 1200 }) {
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
    <div className="font-mono text-lg md:text-xl text-muted font-medium">
      {text}
      <span
        className="inline-block w-0.5 ml-1 bg-accent"
        style={{
          height: "1.2em",
          animation: "caret 1s steps(1) infinite",
        }}
      />
    </div>
  );
}

/* ===================== MAIN ABOUT SECTION ===================== */
export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center bg-bg text-fg py-20 overflow-hidden"
    >
      {/* Subtle Background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(255,214,0,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,214,0,0.08) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto w-[min(1100px,92vw)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT — Artistic Portrait */}
          <div className="flex justify-center lg:justify-start">
            <ArtisticPortrait
              className="w-full max-w-md"
              enableGlitch={true}
              enableCodeRain={true}
              enablePixelTrail={true}
              enableScanlines={true}
            />
          </div>

          {/* RIGHT — Minimal Content */}
          <div className="space-y-6">
            {/* Name with Cool Font */}
            <div>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-2"
                style={{
                  fontFamily: "'Space Grotesk', 'Bebas Neue', sans-serif",
                  background:
                    "linear-gradient(135deg, #111 0%, #111 60%, #FFD600 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                MANOJ
              </h1>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-accent mb-4"
                style={{
                  fontFamily: "'Space Grotesk', 'Bebas Neue', sans-serif",
                }}
              >
                ADHIKARI
              </h2>
              <Typewriter />
            </div>

            {/* Compact Bio */}
            <div className="border-2 border-border bg-card p-6 shadow-[8px_8px_0_var(--shadow-weak)]">
              <p className="font-mono text-base leading-relaxed mb-4">
                <strong>2+ years</strong> building scalable web applications
                with the <strong>MERN stack</strong>. Based in Sydney, I create
                pixel-perfect UIs and robust backend systems.
              </p>

              {/* What I Bring - Compact */}
              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-bold text-sm mb-2 uppercase tracking-wide">
                  What I Bring
                </h3>
                <ul className="text-sm space-y-1">
                  <li>
                    • <strong>Full Stack:</strong> React, Node.js, MongoDB,
                    Express
                  </li>
                  <li>
                    • <strong>Production Ready:</strong> CI/CD, Docker, Agile
                    workflows
                  </li>
                  <li>
                    • <strong>Team Player:</strong> Cross-functional
                    collaboration
                  </li>
                </ul>
              </div>
            </div>

            {/* Compact Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="border-2 border-border bg-card p-4 text-center shadow-[6px_6px_0_var(--shadow-weak)]">
                <div className="text-2xl font-black text-accent">2+</div>
                <div className="text-xs font-mono font-bold">Years</div>
              </div>
              <div className="border-2 border-border bg-card p-4 text-center shadow-[6px_6px_0_var(--shadow-weak)]">
                <div className="text-2xl font-black text-accent">15+</div>
                <div className="text-xs font-mono font-bold">Projects</div>
              </div>
              <div className="border-2 border-border bg-card p-4 text-center shadow-[6px_6px_0_var(--shadow-weak)]">
                <div className="text-2xl font-black text-accent">24h</div>
                <div className="text-xs font-mono font-bold">Response</div>
              </div>
            </div>

            {/* Actions + Status */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="bg-accent border-2 border-black px-6 py-3 font-bold shadow-[6px_6px_0_rgba(0,0,0,0.3)] hover:-translate-y-1 transition"
              >
                View Work
              </a>

              <a
                href="/resume.pdf"
                download
                className="bg-card border-2 border-border px-6 py-3 font-bold shadow-[6px_6px_0_var(--shadow-weak)] hover:-translate-y-1 transition inline-flex items-center gap-2"
              >
                <FiDownload className="w-4 h-4" /> Resume
              </a>

              <a
                href="#contact"
                className="bg-card border-2 border-border px-6 py-3 font-bold shadow-[6px_6px_0_var(--shadow-weak)] hover:-translate-y-1 transition inline-flex items-center gap-2"
              >
                <FiMail className="w-4 h-4" /> Contact
              </a>
            </div>

            {/* Current Status - Small Box */}
            <div className="bg-green-50 border-2 border-green-500 p-4 shadow-[4px_4px_0_rgba(34,197,94,0.2)]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-mono text-sm font-bold text-green-800">
                  Currently seeking
                </span>
              </div>
              <p className="text-sm text-green-700 leading-tight">
                Full-time React/Node.js opportunities. Available immediately for
                remote & hybrid roles in Sydney.
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <FiMapPin className="w-3 h-3" />
                Sydney, Australia • UTC+10/11
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Animations */
const style =
  typeof document !== "undefined" ? document.createElement("style") : null;
if (style && !document.getElementById("about-minimal")) {
  style.id = "about-minimal";
  style.innerHTML = `
    @keyframes caret {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700@display=swap');
  `;
  document.head.appendChild(style);
}
