// src/components/Hobbies.jsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

/** Usage: <Hobbies open={isOpen} onClose={()=>setOpen(false)} /> */
export default function Hobbies({ open = true, onClose = () => {} }) {
  const [active, setActive] = useState("meetups");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const H = [
    {
      k: "oss",
      t: "Open-Source",
      desc: "PRs on JS/TS repos; tests, docs & triage.",
      story:
        "I started contributing to small utilities to learn code review from strangers. My rule: leave a repo better than I found it—tighten tests, clarify docs, and file issues that include a minimal repro.",
      I: IconOpenSource,
    },
    {
      k: "meetups",
      t: "Meetups & Hackathons",
      desc: "Regular at local dev meetups; 2× hackathons (FE lead).",
      story:
        "Meetups are my sprint review with the community. I volunteer when I can, take notes, and post a short recap. In hackathons I keep the team lightweight—component library first, demo path second, and ship a working slice.",
      I: IconMeetup,
    },
    {
      k: "writing",
      t: "Technical Writing",
      desc: "React performance & DX posts with repros.",
      story:
        "I write ‘bug postcards’: tiny sandboxes that show one idea clearly. Topics range from p95 improvements to state colocation and network shaping for cheap wins.",
      I: IconWriting,
    },
    {
      k: "mentoring",
      t: "Mentoring",
      desc: "Guide juniors on JS/React & Git flow.",
      story:
        "My approach is ‘pair, then document’. We fix one thing together, then I turn it into a checklist or snippet so others can move faster without me.",
      I: IconMentor,
    },
    {
      k: "analytics",
      t: "Sports Analytics",
      desc: "Football xG dashboards; EV/Kelly betting models.",
      story:
        "I model Chinese Super League matches: team form, BTTS/over trends, and injury news flow into a probability line. I only ‘bet’ when EV is positive and confidence is high—discipline over emotion.",
      I: IconAnalytics,
    },
    {
      k: "cricket",
      t: "Cricket",
      desc: "BBL/ODIs; field placement strategy.",
      story:
        "I track risk over-by-over: when to keep the single, when to target the short side boundary, and how spinners change the geometry in the middle overs.",
      I: IconCricket,
    },
    {
      k: "football",
      t: "Football (Soccer)",
      desc: "La Liga & EPL; form/xG + squad news.",
      story:
        "I love how a press triggers like a function call—one mistimed step and the whole chain breaks. I study sequences, not just highlights. I play Weekend league matches myself",
      I: IconFootball,
    },
    {
      k: "ukulele",
      t: "Ukulele",
      desc: "Daily fingerstyle practice.",
      story:
        "Ten quiet minutes a day. It resets my focus. I practice slow, clean transitions and record short clips to hear timing honestly.",
      I: IconMusic,
    },
    {
      k: "music",
      t: "Music (Listening)",
      desc: "Lo-fi, Hindi classics, film scores.",
      story:
        "Coding mix: lo-fi and Zimmer strings. Long reads get old Hindi tracks—lyrics that feel like letters from home.",
      I: IconHeadphones,
    },
    {
      k: "gaming",
      t: "Gaming (PS5)",
      desc: "FIFA, Gran Turismo, story RPGs.",
      story:
        "FIFA is pattern recognition; Gran Turismo is patience. I tune lines, not lap times—brake earlier, exit cleaner, win more.",
      I: IconGamepad,
    },
    {
      k: "scifi",
      t: "Sci-Fi Movies",
      desc: "From Interstellar to Arrival.",
      story:
        "Sci-fi feeds my builder brain—what if constraints change? I keep a list of ‘systems thinking’ scenes that inspire UX and data modeling choices.",
      I: IconFilm,
    },
    {
      k: "hiking",
      t: "Hiking",
      desc: "Blue Mountains, coastal NSW.",
      story:
        "Weekend hikes are my sprint retro with nature. I pack light, leave early, and log trail notes like I log bugs—terrain, weather, what I’d change next time.",
      I: IconHike,
    },
    {
      k: "trekking",
      t: "Trekking (Nepal)",
      desc: "Dream routes to trek all the way to Everest Base Camp.",
      story:
        "I grew up hearing stories of trails where every turn is a postcard. Trekking sharpens my planning skills—gear lists, altitude prep, and contingency routes for unpredictable mountain weather.",
      I: IconMountain,
    },
    {
      k: "bbq",
      t: "Aussie BBQ Weekends",
      desc: "Community, food, and football chat.",
      story:
        "BBQ is networking without the name tags—share salmon tips, swap PS5 handles, then someone knows someone who needs a dev. It’s honest, warm, and very Australian.",
      I: IconBBQ,
    },
    {
      k: "fitness",
      t: "Running, Gym, Fitness",
      desc: "5 km ~3×/week.",
      story:
        "Runs sharpen my thinking for the day. I track cadence, not just pace—small form improvements compound like good code, reducing injury and improving efficiency over time.",
      I: IconRun,
    },
    {
      k: "cooking",
      t: "Cooking (Nepali)",
      desc: "Dal-bhat tarkari; weekly meal prep.",
      story:
        "I love cooking. Simple food that fuels long coding blocks. I batch on Sundays and keep spices consistent so weekday meals are zero-decision.",
      I: IconCook,
    },
    {
      k: "chess",
      t: "Chess",
      desc: "Rapid 10|0 ~1200.",
      story:
        "Openings teach me discipline; endgames teach me patience. I review blunders immediately—same rule I use for failed deploys.",
      I: IconChess,
    },
  ];

  const activeItem = H.find((x) => x.k === active) ?? H[0];
  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.button
        aria-label="Close hobbies"
        onClick={onClose}
        className="fixed inset-0 z-[95] bg-black/10 backdrop-blur-[1px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Compact drawer (md+) / compact bottom sheet (sm) */}
      <motion.div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 30, x: 280, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        exit={{ y: 30, x: 280, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="
          fixed z-[100] border-2 border-black bg-white shadow-[6px_6px_0_#000]
          left-0 right-0 bottom-0 md:left-auto md:right-0 md:top-0 md:bottom-0
          w-full md:w-[min(86vw,700px)]
        "
        style={{ maxHeight: "90vh" }}
      >
        {/* Header (smaller) */}
        <div className="flex items-center justify-between border-b-2 border-black px-4 py-3">
          <h2 className="text-xl font-extrabold tracking-tight">My Hobbies</h2>
          <button
            onClick={onClose}
            className="border-2 border-black bg-white px-2.5 py-1 text-sm font-semibold shadow-[4px_4px_0_#000] hover:-translate-y-0.5 transition"
          >
            Close
          </button>
        </div>

        {/* Chips (compact) */}
        <div className="px-4 pt-3">
          <div className="md:hidden -mx-4 px-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2">
              {H.map(({ k, t, I }) => (
                <Chip
                  key={k}
                  active={active === k}
                  onClick={() => setActive(k)}
                  title={t}
                  Icon={I}
                />
              ))}
            </div>
          </div>
          <div className="hidden md:flex md:flex-wrap md:gap-2.5">
            {H.map(({ k, t, I }) => (
              <Chip
                key={k}
                active={active === k}
                onClick={() => setActive(k)}
                title={t}
                Icon={I}
              />
            ))}
          </div>
        </div>

        {/* Detail card (story) */}
        <div
          className="px-4 py-4 overflow-auto"
          style={{ maxHeight: "calc(90vh - 130px)" }}
        >
          <motion.article
            key={activeItem.k}
            initial={{ x: 18, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -18, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="border-2 border-black bg-white p-3.5 shadow-[4px_4px_0_#000]"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center border-2 border-black bg-[#ffd600]">
                <activeItem.I className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold tracking-tight">
                  {activeItem.t}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed opacity-90">
                  {activeItem.desc}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{activeItem.story}</p>
          </motion.article>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ---------- Chip (compact) ---------- */
function Chip({ active, onClick, title, Icon }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border-2 border-black h-9 px-3 text-xs font-semibold shadow-[4px_4px_0_#000] transition
        ${active ? "bg-[#ffd600]" : "bg-white"}
        hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffd600]`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="whitespace-nowrap">{title}</span>
    </button>
  );
}

/* ---------- Icons (minimal, monochrome) ---------- */
function baseSvg(p) {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...p,
  };
}
function IconOpenSource(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7a5 5 0 0 0-2 9l2-5 2 5a5 5 0 0 0-2-9z" />
    </svg>
  );
}
function IconMeetup(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 8h10M7 12h6M7 16h4" />
    </svg>
  );
}
function IconWriting(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}
function IconMentor(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="11" r="3" />
      <path d="M2 21c0-3.3 2.7-6 6-6M14 21c0-2.8 2.2-5 5-5" />
    </svg>
  );
}
function IconAnalytics(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 15V9M12 15V5M17 15v-3" />
    </svg>
  );
}
function IconMusic(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <path d="M9 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM15 6v9a3 3 0 1 0 2 2V8l4-1V4l-6 2z" />
    </svg>
  );
}
function IconHeadphones(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <path d="M3 12a9 9 0 0 1 18 0" />
      <rect x="2" y="12" width="5" height="8" rx="2" />
      <rect x="17" y="12" width="5" height="8" rx="2" />
    </svg>
  );
}
function IconGamepad(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <rect x="3" y="9" width="18" height="8" rx="4" />
      <path d="M8 13h-2M7 12v2M15 12h.01M17 14h.01" />
    </svg>
  );
}
function IconFilm(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 5v14M17 5v14M3 9h4M17 9h4M3 15h4M17 15h4" />
    </svg>
  );
}
function IconHike(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <circle cx="16" cy="4" r="2" />
      <path d="M6 22l3-6 2 2 3-3-2-3 3-2" />
      <path d="M4 12l4 1" />
    </svg>
  );
}
function IconMountain(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <path d="M3 20h18L13 7l-3 5-2-2z" />
    </svg>
  );
}
function IconBBQ(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <circle cx="12" cy="10" r="6" />
      <path d="M6 16h12M9 20h6" />
    </svg>
  );
}
function IconRun(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <circle cx="16" cy="4" r="2" />
      <path d="M6 22l3-6 2 2 3-3-2-3 3-2" />
      <path d="M4 12l4 1" />
    </svg>
  );
}
function IconCook(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <path d="M4 3h16" />
      <path d="M6 3v9a6 6 0 1 0 12 0V3" />
    </svg>
  );
}
function IconChess(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <path d="M6 20h12M8 20v-3l2-2-1-3 3-2 3 2-1 3 2 2v3" />
    </svg>
  );
}
function IconLanguage(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <path d="M4 5h16M9 5c0 7 6 9 6 14" />
      <path d="M15 19l2-4 2 4" />
    </svg>
  );
}
function IconTalk(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  );
}
function IconCricket(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <circle cx="18" cy="6" r="2" />
      <path d="M3 21l9-9M12 12l6 6" />
      <path d="M7 17l4 4" />
    </svg>
  );
}
function IconFootball(p) {
  return (
    <svg {...baseSvg(p)} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9h6v6H9z" />
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
    </svg>
  );
}
