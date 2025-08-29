import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const education = [
  {
    school: "Australian Institute of Higher Education",
    degree: "Bachelor's in Computer & Information Systems Security / Assurance",
    period: "Feb 2019 – Oct 2022",
    badge: "AIH",
    address: "Level 11, 545 Kent St, Sydney NSW 2000, Australia",
    url: "https://aih.nsw.edu.au",
    logo: "aih.png",
    hasDropdownPhoto: true,
  },
  {
    school: "Kingsford International Institute",
    degree: "Diploma of Information Technology",
    period: "Feb 2018 – Feb 2019",
    badge: "KII",
    address: "Kingsford, Sydney NSW, Australia",
    url: "https://kii.edu.au",
    logo: "kii.png",
  },
];

export default function Education() {
  // toggle for AIH photo section (closed by default)
  const [openAIH, setOpenAIH] = useState(false);

  const cand = [
    "/graduction.jpg",
    "/graduction.jpeg",
    "/graduction.png",
    "/graduction.webp",
  ];
  const [srcIdx, setSrcIdx] = useState(0);
  const handleImgError = () => {
    setSrcIdx((i) => (i < cand.length - 1 ? i + 1 : i));
  };

  return (
    <section id="education" className="relative py-24 text-white grid-bg">
      <div className="mx-auto w-[min(1100px,94vw)]">
        {/* Heading – same box style */}
        <div className="flex justify-center mb-12">
          <h2 className="uppercase font-extrabold tracking-tight border-2 border-black bg-white text-black px-6 py-2 shadow-[6px_6px_0_#000]">
            Education
          </h2>
        </div>

        <div className="space-y-8">
          {education.map((edu, idx) => {
            const isAIH = !!edu.hasDropdownPhoto;
            const isOpen = isAIH ? openAIH : false;

            return (
              <div
                key={idx}
                className="border-2 border-black bg-white text-black shadow-[8px_8px_0_rgba(0,0,0,0.18)]"
              >
                {/* Header row (AIH is clickable to toggle) */}
                <div
                  className={[
                    "flex items-start justify-between gap-4 p-5 border-b-2 border-black",
                    isAIH ? "cursor-pointer select-none" : "",
                  ].join(" ")}
                  onClick={() => isAIH && setOpenAIH((v) => !v)}
                >
                  <div className="flex items-start gap-4">
                    {/* Logo-in-circle (fallback to initials) */}
                    <div className="w-12 h-12 rounded-full border-2 border-black overflow-hidden flex items-center justify-center bg-white">
                      {edu.logo ? (
                        <img
                          src={edu.logo}
                          alt={`${edu.school} logo`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span className="font-extrabold uppercase">
                          {edu.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      {/* School name as link */}
                      <a
                        href={edu.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-extrabold leading-tight underline decoration-2 decoration-yellow-300 underline-offset-2 hover:opacity-90"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {edu.school}
                      </a>

                      <div className="font-mono font-semibold text-teal-700">
                        {edu.degree}
                      </div>
                      <div className="text-xs mt-1 text-gray-700">
                        {edu.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="font-mono text-sm">{edu.period}</div>
                    {isAIH && (
                      <span
                        className={`border-2 border-black bg-white p-1 shadow-[4px_4px_0_#000] transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>

                {/* AIH dropdown with static graduation photo */}
                {isAIH && (
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5">
                          <div className="border-2 border-black bg-white p-3 shadow-[6px_6px_0_#000]">
                            <img
                              src={cand[srcIdx]}
                              onError={handleImgError}
                              alt="AIH graduation ceremony"
                              className="w-full max-h-[75vh] object-contain"
                              loading="lazy"
                            />
                            <p className="mt-2 text-xs text-gray-700">
                              graducation day 2022, Sydney CBD
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
