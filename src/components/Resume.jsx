"use client";
import { useRef, useState } from "react";
import { X, Download, ExternalLink } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

// If you keep the PDF in /public:
const RESUME_URL = "/Manoj Adhikari - Resume.pdf";
const DOWNLOAD_NAME = "Manoj Adhikari - Resume.pdf";

// If you instead keep it under src/assets, import it like:
// import resumePdf from "@/assets/Manoj_Adhikari_Resume.pdf";
// const RESUME_URL = resumePdf;

export default function Resume({ onClose }) {
  const resumeRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => window.print();

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);

    const supportsDownloadAttr = (() => {
      const a = document.createElement("a");
      return "download" in a;
    })();

    try {
      const res = await fetch(RESUME_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      if (supportsDownloadAttr) {
        const a = document.createElement("a");
        a.href = url;
        a.download = DOWNLOAD_NAME;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        // Mobile/Safari fallback: open in new tab so user can save
        window.open(RESUME_URL, "_blank", "noopener,noreferrer");
      }

      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download failed, opening in a new tab.", e);
      window.open(RESUME_URL, "_blank", "noopener,noreferrer");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border-2 border-black shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
        {/* Header Controls */}
        <div className="sticky top-0 z-10 bg-yellow-300 border-b-2 border-black p-3 flex justify-between items-center print:hidden">
          <h2 className="font-extrabold text-lg">RESUME</h2>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 px-3 py-1 bg-white border-2 border-black shadow-[3px_3px_0_#000] hover:shadow-[4px_4px_0_#000] hover:-translate-y-0.5 transition-all text-sm font-semibold disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_#000]"
            >
              <Download className="w-4 h-4" />
              {downloading ? "Downloading…" : "Download PDF"}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1 bg-white border-2 border-black shadow-[3px_3px_0_#000] hover:shadow-[4px_4px_0_#000] hover:-translate-y-0.5 transition-all text-sm font-semibold"
            >
              Print
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white border-2 border-black shadow-[3px_3px_0_#000] hover:shadow-[4px_4px_0_#000] hover:-translate-y-0.5 transition-all"
              aria-label="Close resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* (Optional) print helpers */}
        <style>{`
          @media print { .print\\:hidden { display: none !important; } }
          .break-before { page-break-before: always; }
          .break-after  { page-break-after:  always; }
          .avoid-break  { page-break-inside: avoid; }
        `}</style>

        {/* Resume Content (UI only; download uses the static PDF) */}
        <div
          ref={resumeRef}
          className="resume-content max-h-[80vh] overflow-y-auto bg-white"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            lineHeight: "1.4",
            color: "#333",
          }}
        >
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6 border-b-2 border-blue-600 pb-4">
              <h1 className="text-4xl font-bold text-blue-800 mb-1 tracking-tight">
                Manoj Adhikari
              </h1>
              <div className="text-lg text-gray-600 font-medium mb-3">
                MERN Full Stack Developer
              </div>
              <div className="flex justify-center flex-wrap gap-5 text-sm">
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  Sydney, NSW, Australia
                </span>
                <a
                  href="mailto:manojadhikari57@gmail.com"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <FaEnvelope />
                  manojadhikari57@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/manojadh57/"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/manojadh57"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                  GitHub
                </a>
                <a
                  href="https://manojportfolioo.vercel.app/"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGlobe />
                  Portfolio
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-5">
              <h2 className="text-lg font-bold text-blue-800 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Professional Summary
              </h2>
              <p className="text-justify leading-relaxed text-gray-600">
                Full-stack developer with a Bachelor's in Computer and
                Information Systems Security, bringing a strong foundation in
                software engineering and modern web development. Proficient in
                HTML, CSS, JavaScript, C++, and experienced with React, Node.js,
                MongoDB, MySQL, plus hands-on skills in AWS, Docker, REST APIs,
                Git, and CI/CD pipelines. I specialise in building scalable,
                secure, and user-centric web applications from the ground up.
                <br />
                <br />
                Known for strong problem-solving, collaboration, and
                communication skills, I thrive in Agile environments and enjoy
                turning business requirements into technical solutions. My goal
                is to contribute as a junior full-stack developer, delivering
                high-quality features that support team success and drive
                innovation.
              </p>
            </div>

            {/* Work Experience */}
            <div className="mb-5">
              <h2 className="text-lg font-bold text-blue-800 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Work Experience
              </h2>

              {/* Job 1 */}
              <div className="mb-4 avoid-break">
                <div className="mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Full-Stack Developer Intern
                      </h3>
                      <div className="text-sm text-gray-600 italic">
                        REBB TECH Pty Ltd, Sydney
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">
                      Jun–Aug 2025
                    </span>
                  </div>
                </div>
                <ul className="list-none ml-0 space-y-1">
                  <li className="relative pl-4 text-xs leading-relaxed text-gray-700">
                    <span className="absolute left-0 text-blue-600 font-bold">
                      ▪
                    </span>
                    Built a student-tracking web app from scratch to MVP,
                    gathering requirements and shipping iteratively in Agile
                    sprints
                  </li>
                  <li className="relative pl-4 text-xs leading-relaxed text-gray-700">
                    <span className="absolute left-0 text-blue-600 font-bold">
                      ▪
                    </span>
                    Developed responsive, accessible front-end with React +
                    Tailwind; built instructor dashboards with Chart.js
                  </li>
                  <li className="relative pl-4 text-xs leading-relaxed text-gray-700">
                    <span className="absolute left-0 text-blue-600 font-bold">
                      ▪
                    </span>
                    Engineered secure back-end APIs using Node.js/Express and
                    MongoDB; implemented REST endpoints with JWT authentication
                    and RBAC
                  </li>
                  <li className="relative pl-4 text-xs leading-relaxed text-gray-700">
                    <span className="absolute left-0 text-blue-600 font-bold">
                      ▪
                    </span>
                    Set up CI/CD pipelines via GitHub Actions
                    (build/test/deploy), managed code reviews, and collaborated
                    using ClickUp, Figma, and GitHub
                  </li>
                  <li className="relative pl-4 text-xs leading-relaxed text-gray-700">
                    <span className="absolute left-0 text-blue-600 font-bold">
                      ▪
                    </span>
                    Optimised performance, reducing page load times by 35% and
                    improving user experience
                  </li>
                  <li className="relative pl-4 text-xs leading-relaxed text-gray-700">
                    <span className="absolute left-0 text-blue-600 font-bold">
                      ▪
                    </span>
                    Increased engagement-tracking coverage by 40%, enabling
                    real-time insights for instructors
                  </li>
                  <li className="relative pl-4 text-xs leading-relaxed text-gray-700">
                    <span className="absolute left-0 text-blue-600 font-bold">
                      ▪
                    </span>
                    Improved maintainability and security of the codebase,
                    supporting scalable growth
                  </li>
                </ul>
                <div className="mt-2 p-3 bg-blue-50 rounded border-l-4 border-blue-600">
                  <div className="text-xs font-semibold text-blue-800 mb-1">
                    Tech Stack:
                  </div>
                  <div className="text-xs text-gray-600">
                    React, Tailwind, Chart.js, Node.js, Express, MongoDB, JWT,
                    GitHub Actions, ClickUp, Figma, Agile
                  </div>
                </div>
              </div>

              {/* Job 2 */}
              <div className="mb-4 avoid-break">
                <div className="mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Information Technology Support Specialist
                      </h3>
                      <div className="text-sm text-gray-600 italic">
                        Evolution Hospitality Institute, Sydney
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">
                      Jun–Dec 2024
                    </span>
                  </div>
                </div>
                <ul className="list-none ml-0 space-y-1">
                  <li className="relative pl-4 text-xs leading-relaxed text-gray-700">
                    <span className="absolute left-0 text-blue-600 font-bold">
                      ▪
                    </span>
                    Delivered Tier 1/2 support across Windows and macOS,
                    resolving hardware, networking, printing, and application
                    issues with 96% SLA compliance
                  </li>
                  <li className="relative pl-4 text-xs leading-relaxed text-gray-700">
                    <span className="absolute left-0 text-blue-600 font-bold">
                      ▪
                    </span>
                    Administered Microsoft 365 & Active Directory user lifecycle
                    (joiners/movers/leavers), licensing, and access controls
                  </li>
                  <li className="relative pl-4 text-xs leading-relaxed text-gray-700">
                    <span className="absolute left-0 text-blue-600 font-bold">
                      ▪
                    </span>
                    Standardised device imaging/onboarding, reducing setup time
                    by 35% and improving time-to-productivity
                  </li>
                  <li className="relative pl-4 text-xs leading-relaxed text-gray-700">
                    <span className="absolute left-0 text-blue-600 font-bold">
                      ▪
                    </span>
                    Authored knowledge base content and trained staff/students
                    on Moodle & Microsoft 365
                  </li>
                  <li className="relative pl-4 text-xs leading-relaxed text-gray-700">
                    <span className="absolute left-0 text-blue-600 font-bold">
                      ▪
                    </span>
                    Partnered with dev teams on web/UI fixes and a
                    React/Node/Mongo learning portal
                  </li>
                </ul>
                <div className="mt-2 p-3 bg-blue-50 rounded border-l-4 border-blue-600">
                  <div className="text-xs font-semibold text-blue-800 mb-1">
                    Tech Stack:
                  </div>
                  <div className="text-xs text-gray-600">
                    Microsoft Azure, Microsoft 365, Active Directory,
                    Windows/macOS, Moodle, Office 365 Admin
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-5 avoid-break">
              <h2 className="text-lg font-bold text-blue-800 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Education & Training
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    Bachelor of Computer & Information Systems Security
                    (Information Assurance)
                  </div>
                  <div className="text-xs text-gray-600 italic">
                    Australian Institute of Higher Education — Feb 2019 to Oct
                    2022
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    Diploma of Information Technology
                  </div>
                  <div className="text-xs text-gray-600 italic">
                    Kingsford International Institute — Feb 2018 to Feb 2019
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">
                    Full-Stack Development Coding Bootcamp
                  </div>
                  <div className="text-xs text-gray-600 italic">
                    Dented Code Academy, Sydney
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Gained expertise in end-to-end development of web
                    applications using the MERN stack and related technologies.
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-5 avoid-break">
              <h2 className="text-lg font-bold text-blue-800 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Technical Skills
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600">
                  <div className="text-xs font-semibold text-blue-800 mb-2">
                    Programming Languages
                  </div>
                  <div className="text-xs text-gray-600">
                    HTML, CSS, JavaScript (ES6+), Python, R, C++
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600">
                  <div className="text-xs font-semibold text-blue-800 mb-2">
                    Front-End Development
                  </div>
                  <div className="text-xs text-gray-600">
                    React.js, Tailwind CSS, SASS, Chart.js, Responsive &
                    Accessible UI Design
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600">
                  <div className="text-xs font-semibold text-blue-800 mb-2">
                    Back-End Development
                  </div>
                  <div className="text-xs text-gray-600">
                    Node.js, Express.js, RESTful APIs, Authentication (JWT,
                    RBAC), MVC Architecture
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600">
                  <div className="text-xs font-semibold text-blue-800 mb-2">
                    Databases
                  </div>
                  <div className="text-xs text-gray-600">
                    MongoDB, MySQL; Experienced with both relational and
                    non-relational DBs
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600">
                  <div className="text-xs font-semibold text-blue-800 mb-2">
                    DevOps & Cloud
                  </div>
                  <div className="text-xs text-gray-600">
                    AWS (Elastic Beanstalk, S3), Docker, CI/CD pipelines (GitHub
                    Actions)
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600">
                  <div className="text-xs font-semibold text-blue-800 mb-2">
                    Version Control & Tools
                  </div>
                  <div className="text-xs text-gray-600">
                    Git, GitHub, VS Code, Figma, Adobe Photoshop, Agile
                    Methodologies
                  </div>
                </div>
              </div>
            </div>

            {/* Key Projects */}
            <div className="mb-5 avoid-break">
              <h2 className="text-lg font-bold text-blue-800 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Key Projects
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-gray-800">
                      B@M TechStore — Full-Stack eCommerce Platform
                    </h3>
                    <div className="flex gap-3">
                      <a
                        href="http://ecommerce-client-fe-global-bucket.s3-website-ap-southeast-2.amazonaws.com/"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live Demo
                      </a>
                      <a
                        href="https://github.com/manojadh57"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub className="w-3 h-3" />
                        GitHub
                      </a>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    Built a mobile-first eCommerce app using React, Node.js,
                    Express, and MongoDB, deployed on AWS. Implemented JWT
                    authentication, Stripe checkout, and secure role-based
                    access. Designed responsive UI with React + Tailwind,
                    ensuring fast performance and accessibility.
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Admin CMS — eCommerce Management Dashboard
                    </h3>
                    <div className="flex gap-3">
                      <a
                        href="http://ecommerce-global-bucket.s3-website-ap-southeast-2.amazonaws.com/"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live Demo
                      </a>
                      <a
                        href="https://github.com/manojadh57"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub className="w-3 h-3" />
                        GitHub
                      </a>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    Developed an admin dashboard for product, order, category,
                    review, and user management. Integrated RBAC (Role-Based
                    Access Control), JWT authentication, and AWS deployment.
                    Added analytics with real-time metrics.
                  </div>
                </div>
              </div>
            </div>

            {/* Soft Skills */}
            <div className="mb-5 avoid-break">
              <h2 className="text-lg font-bold text-blue-800 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
                Soft Skills
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="text-xs font-semibold text-blue-800 mb-1">
                    Teamwork
                  </div>
                  <div className="text-xs text-gray-700">
                    Collaborated with cross-functional teams to deliver software
                    projects on time
                  </div>
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <div className="text-xs font-semibold text-blue-800 mb-1">
                    Critical Thinking
                  </div>
                  <div className="text-xs text-gray-700">
                    Strong problem-solving ability; design and implement
                    effective solutions
                  </div>
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <div className="text-xs font-semibold text-blue-800 mb-1">
                    Communication
                  </div>
                  <div className="text-xs text-gray-700">
                    Clearly convey complex technical information to stakeholders
                  </div>
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <div className="text-xs font-semibold text-blue-800 mb-1">
                    Continuous Learning
                  </div>
                  <div className="text-xs text-gray-700">
                    Proactive in adopting new tools, frameworks, and industry
                    practices
                  </div>
                </div>
              </div>
            </div>

            {/* References */}
            <div className="mb-5 avoid-break">
              <h2 className="text-lg font-bold text-blue-800 mb-3 pb-1 border-b border-gray-300 uppercase tracking-wide">
                References
              </h2>
              <p className="text-xs text-gray-600">Available upon request.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
