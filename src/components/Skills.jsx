// src/components/Skills.jsx
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGit,
  FaGithub,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiRedux,
  SiMongodb,
  SiExpress,
  SiGithub,
} from "react-icons/si";

const skills = [
  {
    icon: <FaHtml5 className="text-orange-600" />,
    name: "HTML",
    desc: "Semantic & accessible markup",
  },
  {
    icon: <FaCss3Alt className="text-blue-600" />,
    name: "CSS / Tailwind",
    desc: "Responsive & utility-first design",
  },
  {
    icon: <span className="text-yellow-500 font-bold">JS</span>,
    name: "JavaScript (ES6+)",
    desc: "Modern, scalable JavaScript",
  },
  {
    icon: <FaReact className="text-sky-500" />,
    name: "React",
    desc: "Component-based UIs",
  },
  {
    icon: <SiRedux className="text-purple-500" />,
    name: "Redux Toolkit",
    desc: "State management made simple",
  },
  {
    icon: <FaNodeJs className="text-green-600" />,
    name: "Node.js",
    desc: "Backend with JavaScript",
  },
  {
    icon: <SiExpress className="text-gray-700" />,
    name: "Express.js",
    desc: "Fast REST APIs",
  },
  {
    icon: <SiMongodb className="text-green-700" />,
    name: "MongoDB",
    desc: "NoSQL Database",
  },
  {
    icon: <FaDocker className="text-sky-600" />,
    name: "Docker",
    desc: "Containerized apps",
  },
  {
    icon: <FaGithub className="-600" />,
    name: "GitHub",
    desc: "Code collaboration platform",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-12">
      <div className="mx-auto w-[min(1100px,94vw)] text-center">
        {/* Header */}
        <div className="inline-block border-2 border-black px-4 py-1 bg-white shadow-[4px_4px_0_rgba(0,0,0,0.7)] mb-8">
          <h2 className="font-extrabold text-xl tracking-wide">SKILLS</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="group border-2 border-black p-4 rounded-xl bg-white 
                         shadow-[4px_4px_0_rgba(0,0,0,0.25)]
                         transition-transform transform hover:-translate-y-2 hover:shadow-[6px_6px_0_rgba(0,0,0,0.5)]"
            >
              <div className="text-3xl mb-2 flex justify-center">
                {skill.icon}
              </div>
              <h3 className="font-mono font-bold text-sm">{skill.name}</h3>
              <p className="mt-1 text-xs text-gray-600 group-hover:text-gray-900 transition-colors">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
