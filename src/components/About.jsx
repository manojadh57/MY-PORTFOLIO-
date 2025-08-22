import { useEffect, useState } from "react";
import { FiMail, FiDownload } from "react-icons/fi";

const ROLES = [
  "Full-Stack Developer",
  "UI/UX Designer",
  "MERN Engineer",
  "Creative Builder",
];

export default function About() {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setDisplayText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section
      id="about"
      className="relative pt-36 pb-24 bg-white overflow-hidden"
    >
      <div className="mx-auto w-[min(1100px,94vw)] text-center">
        {/* NAME */}
        <div
          className="inline-block border-2 border-black bg-white
                     px-6 md:px-8 py-2 md:py-3
                     shadow-[8px_8px_0_#FACC15]"
        >
          <h1
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            className="text-[clamp(36px,7vw,80px)] leading-none tracking-wide font-black"
          >
            Manoj <span className="text-yellow-500">Adhikari</span>
          </h1>
        </div>

        {/* Typewriter role */}
        <p className="mt-6 text-xl md:text-2xl font-mono text-gray-900">
          {displayText}
          <span className="animate-blink">|</span>
        </p>

        {/* Description */}
        <p className="mt-6 max-w-3xl mx-auto text-lg leading-relaxed font-mono text-gray-700">
          A dedicated <strong>Full Stack Developer</strong> skilled in crafting
          web applications using <strong>JavaScript</strong>,{" "}
          <strong>React.js</strong>, <strong>Node.js</strong>, and{" "}
          <strong>Express</strong>, complemented by proficiency in various
          modern libraries and frameworks.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-3 border-2 border-black bg-white
                       px-6 py-3 font-bold
                       shadow-[6px_6px_0_rgba(0,0,0,0.7)]
                       hover:-translate-y-1 transition-transform"
          >
            <FiDownload size={24} />
            Download Resume
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 border-2 border-black bg-yellow-400
                       px-6 py-3 font-bold
                       shadow-[6px_6px_0_rgba(0,0,0,0.7)]
                       hover:-translate-y-1 transition-transform"
          >
            <FiMail size={24} />
            Contact Me
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <StatCard number="10+" label="Projects" />
          <StatCard number="3+" label="Years Experience" />
          <StatCard number="100%" label="Passion" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label }) {
  return (
    <div
      className="border-2 border-black bg-white p-6 text-center
                 shadow-[6px_6px_0_rgba(0,0,0,0.25)]
                 transition-transform hover:-translate-y-1"
    >
      <div className="text-3xl md:text-4xl font-extrabold">{number}</div>
      <div className="text-sm font-mono mt-1">{label}</div>
    </div>
  );
}
