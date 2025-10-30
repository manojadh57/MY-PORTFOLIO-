import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

/**
 * Robot/HUD intro overlay (mobile friendly).
 * - Shows on every page load.
 * - Auto-closes after 2.8s (configurable) or on Skip tap.
 * - Tailwind + your yellow accent, harsh borders (brutalist).
 */
export default function RobotScanIntro({
  name = "MANOJ ADHIKARI",
  subtitle = "FULL-STACK DEVELOPER",
  autoCloseMs = 2800, // set null to disable auto close
}) {
  const [show, setShow] = useState(true);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (!show || reduce || !autoCloseMs) return;
    const t = setTimeout(() => setShow(false), autoCloseMs);
    return () => clearTimeout(t);
  }, [show, reduce, autoCloseMs]);

  const chars = useMemo(() => name.split(""), [name]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Intro"
          className="fixed inset-0 z-[80] bg-white grid place-items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          {/* Light grid background (HUD feel) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              color: "#111",
            }}
          />

          {/* Scanline sweep */}
          {!reduce && (
            <>
              <motion.div
                aria-hidden
                className="absolute inset-0"
                initial={{
                  background:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)",
                }}
              />
              <motion.div
                aria-hidden
                className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-yellow-300/60 to-transparent"
                initial={{ y: "-100%" }}
                animate={{ y: "100vh" }}
                transition={{
                  duration: 1.6,
                  ease: [0.22, 1, 0.36, 1],
                  repeat: 1,
                  repeatType: "reverse",
                }}
              />
            </>
          )}

          {/* Card */}
          <div className="relative w-[min(92vw,720px)] rounded-2xl border-2 border-black bg-white shadow-[10px_10px_0_#000] p-4 sm:p-6">
            {/* Header strip */}
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full border-2 border-black bg-[#ffd600]" />
              <span className="inline-block h-3 w-3 rounded-full border-2 border-black bg-white" />
              <span className="inline-block h-3 w-3 rounded-full border-2 border-black bg-white" />
              <div className="ml-auto text-[12px] tracking-wide uppercase">
                System Init
              </div>
            </div>

            {/* Name line: robot typing + bracket cursor */}
            <div className="overflow-hidden">
              <div className="text-center">
                <motion.div
                  className="inline-flex flex-wrap items-end justify-center gap-x-1"
                  initial={false}
                >
                  {chars.map((c, i) => (
                    <motion.span
                      key={i}
                      className="inline-block text-2xl sm:text-4xl font-extrabold tracking-wide border-2 border-black px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white"
                      initial={reduce ? {} : { y: 12, opacity: 0, rotate: -2 }}
                      animate={reduce ? {} : { y: 0, opacity: 1, rotate: 0 }}
                      transition={{
                        delay: 0.03 * i,
                        type: "spring",
                        stiffness: 600,
                        damping: 24,
                      }}
                    >
                      {c === " " ? (
                        <span className="inline-block w-2 sm:w-3" />
                      ) : (
                        c
                      )}
                    </motion.span>
                  ))}
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      className="ml-1 inline-block align-bottom h-[1.1em] w-[0.55em] bg-black"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Subtitle with “typing” reveal */}
                <TypeLine
                  text={subtitle}
                  className="mt-2 text-sm sm:text-base tracking-[0.2em] uppercase text-black/70"
                  reduce={reduce}
                  delay={0.25 + chars.length * 0.03}
                />
              </div>
            </div>

            {/* Status row */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[12px]">
              <StatusBadge label="ID" value="MA-57" />
              <StatusBadge label="MODE" value="ONLINE" />
              <StatusBadge label="VERIFIED" value="✔︎" accent />
            </div>

            {/* Scan bar */}
            {!reduce && (
              <motion.div
                aria-hidden
                className="mt-4 h-2 w-full rounded-full border-2 border-black overflow-hidden bg-white"
              >
                <motion.div
                  className="h-full bg-[#ffd600]"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.2,
                    ease: "linear",
                    repeat: 1,
                    repeatType: "reverse",
                    delay: 0.1,
                  }}
                />
              </motion.div>
            )}

            {/* Skip */}
            <button
              onClick={() => setShow(false)}
              className="absolute -bottom-4 right-4 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-semibold shadow-[6px_6px_0_#000] hover:translate-y-[-1px] active:translate-y-0 transition"
            >
              Skip
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Helpers */
function StatusBadge({ label, value, accent = false }) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border-2 border-black px-2 py-1 ${
        accent ? "bg-[#ffd600]" : "bg-white"
      }`}
    >
      <span className="font-semibold">{label}</span>
      <span className="tracking-wider">{value}</span>
    </div>
  );
}

function TypeLine({ text, className = "", reduce, delay = 0 }) {
  if (reduce) return <div className={className}>{text}</div>;
  const letters = text.split("");
  return (
    <div className={className} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.02 * i, duration: 0.02 }}
        >
          {ch}
        </motion.span>
      ))}
    </div>
  );
}
