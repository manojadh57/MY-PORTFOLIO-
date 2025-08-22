const PROJECTS = [
  {
    title: "E‑Commerce Website",
    blurb:
      "Full MERN stack app with authentication, products, cart and Stripe payments.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    image: "/projects/ecommerce.jpg", // put file in /public/projects/
    repo: "https://github.com/your/ecommerce",
    demo: "https://your-ecommerce-demo.com",
  },
  {
    title: "Library Management System",
    blurb: "Catalog, borrow/return tracking, admin dashboards and user auth.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    image: "/projects/library.jpg",
    repo: "https://github.com/your/library",
    demo: "https://your-library-demo.com",
  },
  {
    title: "MovieWorld App",
    blurb:
      "Browse & search movies via OMDb API with watchlist and details pages.",
    tech: ["React", "Tailwind", "OMDb API"],
    image: "/projects/movieworld.jpg",
    repo: "https://github.com/your/movieworld",
    demo: "https://your-movieworld-demo.com",
  },
];

function SubtleTag({ children }) {
  return (
    <span className="inline-block border-2 border-black px-2 py-0.5 text-xs font-mono mr-2 mb-2 bg-white shadow-[3px_3px_0_rgba(0,0,0,0.65)]">
      {children}
    </span>
  );
}

function ActionBtn({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-block border-2 border-black bg-white font-semibold px-3 py-2 mr-3 shadow-[4px_4px_0_rgba(0,0,0,0.65)] hover:-translate-y-[2px] transition"
    >
      {children}
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="mx-auto w-[min(1100px,94vw)]">
        {/* Section header – boxed brutalist */}
        <div className="w-full flex justify-center mb-12">
          <div className="inline-block border-2 border-black bg-white px-6 py-2 shadow-[6px_6px_0_rgba(0,0,0,0.7)]">
            <h2 className="text-2xl font-extrabold tracking-wide">PROJECTS</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <article
              key={i}
              className="border-2 border-black bg-white shadow-[8px_8px_0_rgba(0,0,0,0.18)] flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden border-b-2 border-black">
                {/* Maintain aspect ratio without CLS */}
                <div className="w-full pt-[56%]" />
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml;utf8," +
                      encodeURIComponent(
                        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'><rect width='800' height='450' fill='white' stroke='black' stroke-width='6'/><text x='50%' y='50%' font-family='monospace' font-size='32' text-anchor='middle' fill='black'>Preview unavailable</text></svg>`
                      );
                  }}
                />
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white px-4 py-3">
                  <h3 className="text-lg md:text-xl font-extrabold tracking-wide">
                    {p.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[15px] leading-relaxed mb-3">{p.blurb}</p>

                {/* Tech tags */}
                <div className="mt-1 mb-4 -m-1">
                  {p.tech.map((t, idx) => (
                    <SubtleTag key={idx}>{t}</SubtleTag>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-auto pt-2">
                  <ActionBtn href={p.repo}>GitHub</ActionBtn>
                  <ActionBtn href={p.demo}>Live Demo</ActionBtn>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
