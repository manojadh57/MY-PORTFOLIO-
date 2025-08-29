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
    logo: "aih.png", // file in /public
    hasDropdownPhoto: true,
  },
  {
    school: "Kingsford International Institute",
    degree: "Diploma of Information Technology",
    period: "Feb 2018 – Feb 2019",
    badge: "KII",
    address: "Kingsford, Sydney NSW, Australia",
    url: "https://kii.edu.au",
    logo: "kii.png", // file in /public
  },
];

export default function Education() {
  const [openAIH, setOpenAIH] = useState(false);

  const cand = [
    "/graduction.jpg",
    "/graduction.jpeg",
    "/graduction.png",
    "/graduction.webp",
  ];
  const [srcIdx, setSrcIdx] = useState(0);
  const handleImgError = () =>
    setSrcIdx((i) => (i < cand.length - 1 ? i + 1 : i));

  return (
    <section id="education" className="relative py-24 text-white grid-bg">
      <div className="mx-auto w-[min(1100px,94vw)]">
        {/* Heading */}
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
                {/* Header: responsive stack on mobile */}
                <button
                  type="button"
                  onClick={() => isAIH && setOpenAIH((v) => !v)}
                  className={[
                    "w-full text-left border-b-2 border-black",
                    "p-4 md:p-5",
                  ].join(" ")}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                    {/* Left group */}
                    <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black overflow-hidden flex items-center justify-center bg-white shrink-0">
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

                      <div className="min-w-0">
                        {/* School link (don’t toggle when clicked) */}
                        <a
                          href={edu.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-lg sm:text-xl font-extrabold leading-tight underline decoration-2 decoration-yellow-300 underline-offset-2 hover:opacity-90 break-words"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {edu.school}
                        </a>

                        <div className="font-mono font-semibold text-teal-700 mt-0.5">
                          {edu.degree}
                        </div>
                        <div className="text-xs mt-1 text-gray-700">
                          {edu.address}
                        </div>
                      </div>
                    </div>

                    {/* Right group (moves below on mobile) */}
                    <div className="flex items-center justify-between md:justify-end gap-2 md:gap-3">
                      <div className="font-mono text-xs sm:text-sm">
                        {edu.period}
                      </div>
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
                </button>

                {/* Dropdown: AIH photo */}
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
                        <div className="p-4 md:p-5">
                          <div className="border-2 border-black bg-white p-3 shadow-[6px_6px_0_#000]">
                            <img
                              src={cand[srcIdx]}
                              onError={handleImgError}
                              alt="AIH graduation ceremony"
                              className="w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] object-contain"
                              loading="lazy"
                            />
                            <p className="mt-2 text-xs text-gray-700">
                              graduation day 2022, Sydney CBD
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
