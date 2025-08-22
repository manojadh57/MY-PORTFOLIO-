import SocialButtons from "./SocialButtons";
import BatCatLogo from "./BatCatLogo"; // 👈 import the logo component

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_#FFD600] px-4 py-3 w-[min(1100px,92vw)]">
        <div className="flex items-center justify-between gap-4">
          {/* Logo + Name */}
          <div className="flex items-center gap-2 select-none">
            <div className="border-2 border-black bg-white rounded-full p-1 shadow-[3px_3px_0px_0px_#000000] hover:-translate-y-[2px] transition">
              <BatCatLogo size={32} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">
              MANOJ<span className="ml-1">.</span>
            </h1>
          </div>

          {/* Boxed nav items */}
          <ul className="hidden md:flex items-center gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="
                    inline-flex items-center justify-center
                    px-3 py-2
                    border-2 border-black
                    bg-white
                    text-sm font-extrabold uppercase tracking-wide
                    shadow-[3px_3px_0px_0px_#000000]
                    transition
                    hover:-translate-y-0.5 hover:bg-yellow-400
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
                  "
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social buttons */}
          <SocialButtons />
        </div>
      </div>
    </nav>
  );
}
