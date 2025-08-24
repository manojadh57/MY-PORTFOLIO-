import { useEffect, useState } from "react";

const MODES = ["clean", "grid", "sunray", "mountains", "poster", "halftone"];
const KEY = "portfolio_bg_mode";

function styleFor(mode) {
  const base = { backgroundColor: "transparent" };

  if (mode === "grid") {
    return {
      ...base,
      backgroundImage:
        "linear-gradient(#00000014 1px, transparent 1px), linear-gradient(90deg, #00000014 1px, transparent 1px)",
      backgroundSize: "28px 28px, 28px 28px",
      backgroundPosition: "center center",
    };
  }

  if (mode === "sunray") {
    return {
      ...base,
      backgroundImage:
        // brighter center + clearer rays
        "radial-gradient(circle at 50% 22%, rgba(255,214,0,0.34), transparent 46%)," +
        "repeating-conic-gradient(from 0deg at 50% 22%, rgba(0,0,0,0.08) 0deg, rgba(0,0,0,0.08) 3deg, transparent 3deg, transparent 9deg)",
      backgroundBlendMode: "multiply",
    };
  }

  if (mode === "poster") {
    return {
      ...base,
      backgroundImage:
        "repeating-linear-gradient(135deg, rgba(255,214,0,0.16) 0 12px, transparent 12px 28px)",
    };
  }

  if (mode === "halftone") {
    return {
      ...base,
      backgroundImage:
        "radial-gradient(600px 300px at 100% 0%, rgba(17,17,17,0.07), transparent)," +
        "radial-gradient(520px 260px at 0% 100%, rgba(17,17,17,0.07), transparent)",
    };
  }

  return base; // clean
}

export default function Backdrop({
  initial = "sunray",
  showControls = true,
  grain = false,
}) {
  const [mode, setMode] = useState(initial);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved && MODES.includes(saved)) setMode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, mode);
  }, [mode]);

  const style = styleFor(mode);

  return (
    <>
      {/* BASE BACKGROUND (below content, above page) */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={style}
      />

      {/* MOUNTAINS LINE ART */}
      {mode === "mountains" && (
        <svg
          className="fixed bottom-0 left-0 w-full h-40 z-0 pointer-events-none"
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
        >
          <path
            d="M0 28 L10 18 L18 22 L28 12 L36 18 L44 10 L55 16 L64 9 L72 14 L80 11 L90 17 L100 12 L100 30 L0 30 Z"
            fill="none"
            stroke="#111"
            strokeWidth="0.6"
            opacity="0.6"
          />
        </svg>
      )}

      {/* OPTIONAL GRAIN (off unless grain=true) */}
      {grain && (
        <div
          aria-hidden
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            opacity: 0.1,
            backgroundImage:
              "radial-gradient(rgba(0,0,0,.35) 1px, transparent 1.2px)",
            backgroundSize: "3px 3px",
          }}
        />
      )}

      {/* QUICK SWITCHER */}
      {showControls && (
        <div className="fixed right-3 bottom-3 z-40">
          <div className="border-2 border-black bg-white px-2 py-1 shadow-[6px_6px_0_#0000001f]">
            <span className="text-xs font-bold mr-2">BG:</span>
            {MODES.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`text-xs px-2 py-0.5 border-2 border-black bg-white mr-1 mb-1 ${
                  m === mode ? "bg-[#FFD600]" : ""
                }`}
                title={m}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
