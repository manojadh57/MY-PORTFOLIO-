// src/components/Skills.jsx
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaDocker,
} from "react-icons/fa";
import { SiTailwindcss, SiRedux, SiMongodb, SiExpress } from "react-icons/si";

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
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white">
      <div className="mx-auto w-[min(1100px,94vw)] text-center">
        {/* Header */}
        <div className="inline-block border-2 border-black px-6 py-2 bg-white shadow-[6px_6px_0_rgba(0,0,0,0.7)] mb-12">
          <h2 className="font-extrabold text-2xl tracking-wide">SKILLS</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="group border-2 border-black p-6 rounded-xl bg-white 
                         shadow-[6px_6px_0_rgba(0,0,0,0.25)]
                         transition-transform transform hover:-translate-y-2 hover:shadow-[10px_10px_0_rgba(0,0,0,0.5)]"
            >
              <div className="text-5xl mb-4 flex justify-center">
                {skill.icon}
              </div>
              <h3 className="font-mono font-bold text-lg">{skill.name}</h3>
              <p className="mt-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
