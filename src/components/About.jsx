import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import ArtisticPortrait from "./ArtisticPortrait";

// super-minimal typewriter
function Typewriter({
  phrases,
  typingSpeed = 55,
  pause = 900,
  className = "",
}) {
  const list = useMemo(() => phrases.filter(Boolean), [phrases]);
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [dir, setDir] = useState(1);
  useEffect(() => {
    if (!list.length) return;
    const full = list[i % list.length];
    const done = dir === 1 && txt === full;
    const empty = dir === -1 && txt === "";
    const t = setTimeout(
      () => {
        if (done) return setDir(-1);
        if (empty) {
          setDir(1);
          setI((v) => (v + 1) % list.length);
          return;
        }
        setTxt(full.slice(0, txt.length + dir));
      },
      done ? pause : typingSpeed
    );
    return () => clearTimeout(t);
  }, [txt, dir, i, list, typingSpeed, pause]);
  return (
    <span className={className} aria-live="polite" aria-atomic>
      {txt}
      <span className="inline-block w-[1ch] ml-0.5">|</span>
    </span>
  );
}

export default function About() {
  const roles = ["Full‑Stack Developer", "React • Node.js", "Simple, Reliable"];
  const card = "bg-white border-2 border-black shadow-[6px_6px_0_#000]";

  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-10 md:min-h-[80vh] scroll-mt-32"
    >
      {/* base-line accent */}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
        {/* LEFT: portrait + availability */}
        <aside className="md:col-span-5">
          <div className={`${card} rounded-2xl p-4`}>
            <div className="rounded-xl overflow-hidden">
              <ArtisticPortrait className="w-full h-auto" />
            </div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-xl border-2 border-black bg-green-200 px-3 py-2 shadow-[4px_4px_0_#000]">
              <span className="relative inline-block h-2.5 w-2.5">
                <span className="absolute inset-0 rounded-full bg-green-600" />
              </span>
              <span className="font-mono text-sm">
                <strong>Available</strong> — React/Node · Sydney · Remote/Hybrid
              </span>
            </div>
          </div>
        </aside>

        {/* RIGHT: content (brutalist + minimal) */}
        <main className="md:col-span-7">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono leading-none">
            Manoj Adhikari
          </h2>
          <p className="mt-2 text-xl font-mono">
            <Typewriter phrases={roles} />
          </p>

          <p className="mt-5 text-[1.05rem] leading-relaxed max-w-prose">
            A dedicated{" "}
            <strong className="font-extrabold">Full‑Stack Developer</strong>{" "}
            skilled in crafting web applications using
            <span className="font-semibold bg-yellow-200 px-1 ml-1">
              JavaScript
            </span>
            ,
            <span className="font-semibold bg-yellow-200 px-1 ml-1">
              React.js
            </span>
            ,
            <span className="font-semibold bg-yellow-200 px-1 ml-1">
              Node.js
            </span>
            , and
            <span className="font-semibold bg-yellow-200 px-1 ml-1">
              Express
            </span>
            , complemented by proficiency in modern libraries and tooling. I
            value{" "}
            <span className="font-semibold underline decoration-4 decoration-yellow-300 underline-offset-2">
              clean architecture
            </span>
            ,
            <span className="font-semibold underline decoration-4 decoration-yellow-300 underline-offset-2 ml-1">
              accessible UI
            </span>
            ,
            <span className="font-semibold underline decoration-4 decoration-yellow-300 underline-offset-2 ml-1">
              strong API design
            </span>
            , and
            <span className="font-semibold underline decoration-4 decoration-yellow-300 underline-offset-2 ml-1">
              measurable performance
            </span>
            .
          </p>

          {/* tiny stack line (keep to essentials) */}
          <p className="mt-4 font-mono text-sm">
            React · Node.js · MongoDB · Tailwind · Stripe
          </p>

          {/* CTAs — Resume, Email, View Projects */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 border-2 border-black bg-yellow-300 px-4 py-2 font-semibold shadow-[6px_6px_0_#000] hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
            >
              <ArrowRight className="h-4 w-4" /> Resume
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-semibold shadow-[6px_6px_0_#000] hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 font-semibold shadow-[6px_6px_0_#000] hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </main>
      </div>
    </section>
  );
}
