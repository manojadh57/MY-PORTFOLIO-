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
    company: "Rebb‑Tech",
    badge: "RT",
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
    role: "Information Technology Support Specialist",
    period: "Jun 2024 – Dec 2024 · 7 mos",
    sub: "Sydney, New South Wales, Australia · On‑site",
    bullets: [
      "Handled onboarding/offboarding and device deployments to improve efficiency.",
      "Maintained hardware, printers, and networking; supported Windows and macOS.",
      "Managed Office 365 / Active Directory accounts and permissions.",
      "Delivered staff training on Moodle and Microsoft 365 tools.",
      "Helped ship a full‑stack learning portal using React.js, Node.js, and MongoDB.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto w-[min(1100px,94vw)]">
        {/* Section header – boxed brutalist */}
        <div className="w-full flex justify-center mb-10">
          <div className="inline-block border-2 border-black bg-white px-6 py-2 shadow-[6px_6px_0_rgba(0,0,0,0.7)]">
            <h2 className="text-2xl font-extrabold tracking-wide">
              EXPERIENCE
            </h2>
          </div>
        </div>

        <div className="space-y-9">
          {JOBS.map((job, i) => (
            <div
              key={i}
              className="border-2 border-black bg-white shadow-[8px_8px_0_rgba(0,0,0,0.18)]"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 p-5 border-b-2 border-black">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-extrabold">
                    {job.badge}
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-extrabold leading-tight">
                      {job.company}
                    </div>
                    <div className="font-mono text-teal-700 font-semibold">
                      {job.role}
                    </div>
                    {job.sub && (
                      <div className="text-xs mt-1 text-gray-600">
                        {job.sub}
                      </div>
                    )}
                  </div>
                </div>
                <div className="font-mono text-sm">{job.period}</div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="pl-4 border-l-4 border-red-500">
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    {job.bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed text-[15px]">
                        <Emph text={b} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
