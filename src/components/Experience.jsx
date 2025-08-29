import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HIGHLIGHTS = [
  "React.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "Chart.js",
  "JWT",
  "CI/CD",
  "GitHub Actions",
  "Microsoft 365",
  "Office 365",
  "Active Directory",
  "Windows",
  "macOS",
  "Moodle",
  "Agile",
];

function Emph({ text }) {
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${HIGHLIGHTS.map(esc).join("|")})`, "g");
  return (
    <>
      {text.split(re).map((part, i) =>
        HIGHLIGHTS.includes(part) ? (
          <strong key={i} className="font-semibold text-yellow-600">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const JOBS = [
  {
    company: "Rebb-Tech",
    badge: "RT",
    logo: "rebb.jpeg",
    role: "Full Stack Developer Intern",
    period: "Jun 2025 – Aug 2025 · 3 mos",
    sub: "Sydney, New South Wales, Australia · Hybrid",
    bullets: [
      "Built a bootcamp student tracking app (My Progress App) from scratch as an intern project.",
      "Implemented core features with React.js, Tailwind CSS, Node.js, and MongoDB.",
      "Designed dashboards using Chart.js and added secure JWT authentication.",
      "Set up CI/CD using GitHub Actions and followed Agile development practices.",
      "Collaborated with senior developers and gained hands-on full-stack experience.",
    ],
  },
  {
    company: "Evolution Hospitality Institute",
    badge: "EHI",
    logo: "evolution.jpeg",
    role: "Information Technology Support Specialist",
    period: "Jun 2024 – Dec 2024 · 7 mos",
    sub: "Sydney, New South Wales, Australia · On-site",
    bullets: [
      "Handled onboarding/offboarding and device deployments to improve efficiency.",
      "Maintained hardware, printers, and networking; supported Windows and macOS.",
      "Managed Office 365 / Active Directory accounts and permissions.",
      "Delivered staff training on Moodle and Microsoft 365 tools.",
      "Helped ship a full-stack learning portal using React.js, Node.js, and MongoDB.",
    ],
  },
];

export default function Experience() {
  const [open, setOpen] = useState(() => new Set([0]));
  const toggle = (idx) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto w-[min(1100px,94vw)]">
        {/* Header */}
        <div className="w-full flex justify-center mb-10">
          <div className="inline-block border-2 border-black bg-white px-6 py-2 shadow-[6px_6px_0_#000]">
            <h2 className="text-2xl font-extrabold tracking-wide">
              EXPERIENCE
            </h2>
          </div>
        </div>

        <div className="space-y-9">
          {JOBS.map((job, i) => {
            const isOpen = open.has(i);
            const bodyId = `job-${i}-body`;

            return (
              <div
                key={i}
                className="border-2 border-black bg-white shadow-[8px_8px_0_rgba(0,0,0,0.18)]"
              >
                {/* Responsive header (stacks on mobile) */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={bodyId}
                  className="w-full text-left p-4 md:p-5 border-b-2 border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                    {/* Left group */}
                    <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black overflow-hidden flex items-center justify-center bg-white shrink-0">
                        {job.logo ? (
                          <img
                            src={job.logo}
                            alt={`${job.company} logo`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="font-extrabold">{job.badge}</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="text-lg sm:text-xl font-extrabold leading-tight break-words">
                          {job.company}
                        </div>
                        <div className="font-mono text-teal-700 font-semibold mt-0.5">
                          {job.role}
                        </div>
                        {job.sub && (
                          <div className="text-xs mt-1 text-gray-600">
                            {job.sub}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right group (moves below on mobile) */}
                    <div className="flex items-center justify-between md:justify-end gap-2 md:gap-3">
                      <div className="font-mono text-xs sm:text-sm">
                        {job.period}
                      </div>
                      <span
                        className={`border-2 border-black bg-white p-1 shadow-[4px_4px_0_#000] transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>

                {/* Collapsible body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={bodyId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 md:p-5">
                        <div className="pl-3 md:pl-4 border-l-4 border-red-500">
                          <ul className="list-disc pl-5 mt-2 space-y-2">
                            {job.bullets.map((b, idx) => (
                              <li
                                key={idx}
                                className="leading-relaxed text-[15px]"
                              >
                                <Emph text={b} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
