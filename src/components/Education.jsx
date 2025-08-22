const education = [
  {
    school: "Dented Code Academy",
    degree: "Full Stack Development Bootcamp",
    period: "Jan 2025",
    badge: "dc",
  },
  {
    school: "Australian Institute of Higher Education",
    degree: "Bachelor's in Computer & Information Systems Security / Assurance",
    period: "Feb 2019 – Oct 2022",
    badge: "aih",
  },
  {
    school: "Kingsford International Institute",
    degree: "Diploma of Information Technology",
    period: "Feb 2018 – Feb 2019",
    badge: "kii",
  },
  {
    school: "National College of Computer Studies",
    degree: "+2 Computer Science/Management",
    period: "2014 – 2016",
    badge: "nccs",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 text-white grid-bg">
      <div className="mx-auto w-[min(1100px,94vw)]">
        {/* HEADING IN A BOX */}
        <div className="flex justify-center mb-12">
          <h2
            className="uppercase font-extrabold tracking-tight
                       border-2 border-black bg-white text-black
                       px-6 py-2 shadow-[6px_6px_0_rgba(0,0,0,0.18)]"
          >
            Education
          </h2>
        </div>

        {/* Education Cards */}
        <div className="space-y-8">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="border-2 border-black bg-white text-black 
                         shadow-[8px_8px_0_rgba(0,0,0,0.18)]"
            >
              {/* Header row */}
              <div className="flex items-center justify-between gap-4 p-5 border-b-2 border-black">
                <div className="flex items-center gap-4">
                  {/* Badge */}
                  <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center font-extrabold uppercase">
                    {edu.badge}
                  </div>
                  <div>
                    <div className="text-xl font-extrabold leading-tight">
                      {edu.school}
                    </div>
                    <div className="font-mono font-semibold text-teal-700">
                      {edu.degree}
                    </div>
                  </div>
                </div>
                <div className="font-mono text-sm">{edu.period}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
