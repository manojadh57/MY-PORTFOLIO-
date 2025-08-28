import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import SocialButtons from "./SocialButtons";
import BatCatLogo from "./BatCatLogo";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white border-2 border-black shadow-[6px_6px_0_#FFD600] px-4 py-3 w-[min(1100px,92vw)] rounded-none">
        <div className="flex items-center justify-between gap-4">
          {/* Logo + Name */}
          <a
            href="#top"
            className="flex items-center gap-2 select-none"
            onClick={closeMenu}
          >
            <div className="border-2 border-black bg-white rounded-full p-1 shadow-[3px_3px_0_#000] hover:-translate-y-[2px] transition">
              <BatCatLogo size={32} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">
              MANOJ<span className="ml-1">.</span>
            </h1>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex items-center justify-center px-3 py-2 border-2 border-black bg-white text-sm font-extrabold uppercase tracking-wide shadow-[3px_3px_0_#000] transition hover:-translate-y-0.5 hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop socials */}
          <div className="hidden md:block">
            <SocialButtons />
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center border-2 border-black bg-white p-2 shadow-[3px_3px_0_#000] active:translate-y-[2px]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile panel */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
            open ? "max-h-[420px]" : "max-h-0"
          }`}
        >
          <div className="pt-3 border-t-2 border-black mt-3">
            <ul className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={closeMenu}
                    className="block text-center px-3 py-2 border-2 border-black bg-white text-xs font-extrabold uppercase tracking-wide shadow-[3px_3px_0_#000] hover:bg-yellow-300 active:translate-y-[1px]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile socials */}
            <div className="mt-3 flex justify-center">
              <SocialButtons />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
