import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

export default function IntroOverlay({ name = "MANOJ ADHIKARI", onDone }) {
  const [show, setShow] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const done = localStorage.getItem("introDone") === "1";
    if (!done) setShow(true);
    else onDone?.();
  }, [onDone]);

  useEffect(() => {
    if (!show || reduce) return;
    // Auto-close after animation (~2.6s)
    const t = setTimeout(() => handleClose(), 2600);
    return () => clearTimeout(t);
  }, [show, reduce]);

  function handleClose() {
    localStorage.setItem("introDone", "1");
    setShow(false);
    onDone?.();
  }

  if (!show) return null;

  const letters = name.split("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Intro"
          className="fixed inset-0 z-[80] grid place-items-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background block that slides up to reveal content behind */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="absolute inset-0 bg-white"
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              transition={{
                delay: 2.2,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )}

          {/* Wordmark */}
          <div
            className="relative isolate"
            onClick={handleClose}
            onKeyDown={(e) => (e.key === "Enter" ? handleClose() : null)}
            tabIndex={0}
          >
            {/* Outline draw (SVG stroke animation) */}
            <motion.svg
              width="720"
              height="120"
              viewBox="0 0 720 120"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden sm:block"
              initial={reduce ? {} : { opacity: 1 }}
            >
              {/* We render text via <text> converted to outline by stroke; simpler trick: dashed stroke along a path */}
              <motion.text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                style={{
                  fontFamily: "Inter, ui-sans-serif, system-ui",
                  fontWeight: 800,
                  letterSpacing: "2px",
                }}
                fontSize="56"
                fill="transparent"
                stroke="#000"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeDasharray="1600"
                strokeDashoffset="1600"
                animate={reduce ? {} : { strokeDashoffset: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                {name}
              </motion.text>
            </motion.svg>

            {/* Mobile / fallback: letter tiles popping in */}
            <div className="sm:hidden flex gap-1">
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block rounded-lg border-2 border-black px-2 py-1 text-xl font-extrabold"
                  initial={reduce ? {} : { y: 12, opacity: 0, rotate: -2 }}
                  animate={reduce ? {} : { y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    delay: 0.05 * i,
                    duration: 0.25,
                    type: "spring",
                    stiffness: 500,
                    damping: 26,
                  }}
                >
                  {ch === " " ? <span className="w-2 inline-block" /> : ch}
                </motion.span>
              ))}
            </div>

            {/* Fill shimmer over the stroked text */}
            {!reduce && (
              <motion.div
                aria-hidden
                className="absolute inset-0 mx-auto w-[min(720px,92vw)] h-[120px] hidden sm:block"
                initial={{ WebkitMaskPosition: "-200% 0%" }}
                animate={{ WebkitMaskPosition: "200% 0%" }}
                transition={{ delay: 1.1, duration: 1.0, ease: "easeInOut" }}
                style={{
                  background:
                    "linear-gradient(90deg, #111 20%, #666 50%, #111 80%)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, transparent 0%, black 40%, black 60%, transparent 100%)",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "200% 100%",
                }}
              />
            )}
          </div>

          {/* Skip / continue */}
          <button
            onClick={handleClose}
            className="absolute bottom-6 right-6 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-semibold shadow-[6px_6px_0_#000] hover:translate-y-[-1px] active:translate-y-0 transition"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
