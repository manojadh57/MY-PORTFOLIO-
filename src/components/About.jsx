// src/components/About.jsx
import { useEffect, useMemo, useState } from "react";
import { Mail, ArrowRight, FileText } from "lucide-react";
import ArtisticPortrait from "./ArtisticPortrait";
import HelloRotator from "./HelloRotator";
import Resume from "./Resume";
import Hobbies from "./Hobbies"; // keep filename exactly

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
    <span className={className} aria-live="polite" aria-atomic="true">
      {txt}
      <span className="inline-block w-[1ch] ml-0.5">|</span>
    </span>
  );
}

export default function About() {
  const [showResume, setShowResume] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);
  const roles = ["Full-Stack Developer", "React • Node.js", "Simple, Reliable"];

  const card =
    "bg-white border-2 border-black shadow-[6px_6px_0_#000] rounded-none";

  return (
    <>
      <section
        id="about"
        className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-32 sm:pt-36 pb-10 md:min-h-[80vh] scroll-mt-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* LEFT: portrait + availability */}
          <aside className="md:col-span-5">
            <div className={`${card} p-4`}>
              <div className="overflow-hidden">
                <ArtisticPortrait className="w-full h-auto" />
              </div>

              {/* Availability pill */}
              <div className="mt-3 inline-flex items-center gap-2 rounded-none border-2 border-black bg-green-200 px-3 py-2 shadow-[4px_4px_0_#000]">
                <span className="relative inline-block h-2.5 w-2.5">
                  <span className="absolute inset-0 rounded-full bg-green-600" />
                </span>
                <span className="font-mono text-sm">
                  <strong>Available</strong> — Australia · Remote/Hybrid
                </span>
              </div>
            </div>
          </aside>

          {/* RIGHT: intro + CTAs */}
          <main className="md:col-span-7 space-y-4">
            {/* Name + subtitle */}
            <div className={`${card} p-5 sm:p-6`}>
              <HelloRotator name="Manoj Adhikari" />
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono leading-none mt-2">
                Manoj Adhikari
              </h2>
              <p className="mt-2 text-xl font-mono">
                <Typewriter phrases={roles} />
              </p>
            </div>

            {/* Bio + buttons */}
            <div className={`${card} p-5 sm:p-6`}>
              <p className="text-[1.05rem] leading-relaxed">
                A dedicated{" "}
                <strong className="font-extrabold">Full-Stack Developer</strong>{" "}
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
                value
                <span className="font-semibold underline decoration-4 decoration-yellow-300 underline-offset-2 ml-1">
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

              {/* CTA row (uniform buttons) */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowResume(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 border-2 border-black bg-yellow-300 px-4 py-2 font-semibold shadow-[6px_6px_0_#000] transition hover:-translate-y-0.5"
                  aria-haspopup="dialog"
                >
                  <FileText className="h-4 w-4" /> Resume
                </button>

                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-4 py-2 font-semibold shadow-[6px_6px_0_#000] transition hover:-translate-y-0.5"
                >
                  <ArrowRight className="h-4 w-4" /> View Projects
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-4 py-2 font-semibold shadow-[6px_6px_0_#000] transition hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>

                {/* Opens Hobbies modal (no emoji) */}
                <button
                  onClick={() => setShowHobbies(true)}
                  className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-4 py-2 font-semibold shadow-[6px_6px_0_#000] transition hover:-translate-y-0.5"
                  aria-haspopup="dialog"
                >
                  Hobbies
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* Popups */}
      {showResume && <Resume onClose={() => setShowResume(false)} />}
      {showHobbies && <Hobbies onClose={() => setShowHobbies(false)} />}
    </>
  );
}
