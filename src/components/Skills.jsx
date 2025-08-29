// src/components/Skills.jsx
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGithub,
  FaAws,
  FaCogs,
  FaEllipsisH,
  FaMicrosoft, // <- use FA Microsoft instead of SiMicrosoftazure
} from "react-icons/fa";
import {
  SiRedux,
  SiMongodb,
  SiExpress,
  SiCplusplus,
  SiFigma,
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
    icon: <FaGithub className="text-gray-900" />,
    name: "GitHub",
    desc: "Code collaboration platform",
  },

  // Added skills
  {
    icon: <FaAws className="text-orange-500" />,
    name: "AWS",
    desc: "EC2, S3, Lambda, more",
  },
  {
    icon: <FaMicrosoft className="text-blue-700" />,
    name: "Azure",
    desc: "App Service, Functions",
  }, // <- changed
  {
    icon: <SiCplusplus className="text-blue-700" />,
    name: "C++",
    desc: "STL, OOP, performance",
  },
  {
    icon: <SiFigma className="text-pink-500" />,
    name: "Figma",
    desc: "Wireframes & handoff",
  },
  {
    icon: <FaCogs className="text-gray-800" />,
    name: "CI/CD",
    desc: "Pipelines & automation",
  },
  {
    icon: <FaEllipsisH className="text-gray-700" />,
    name: "Many more",
    desc: "Postgres, Vercel, Nginx…",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-12">
      <div className="mx-auto w-[min(1100px,94vw)] text-center">
        <div className="inline-block border-2 border-black bg-white px-5 py-2 shadow-[6px_6px_0_#000] rounded-none mb-8">
          <h2 className="font-extrabold text-xl tracking-wide">SKILLS</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="group border-2 border-black bg-white p-4 rounded-none
                         shadow-[6px_6px_0_#000] transition-transform
                         hover:translate-x-0.5 hover:-translate-y-0.5"
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
