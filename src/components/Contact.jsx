import { FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 grid-bg text-white">
      <div className="mx-auto w-[min(900px,94vw)]">
        {/* Heading in a box */}
        <div className="flex justify-center mb-12">
          <h2
            className="uppercase font-extrabold tracking-tight
                       border-2 border-black bg-white text-black
                       px-6 py-2 shadow-[6px_6px_0_rgba(0,0,0,0.18)]"
          >
            Contact
          </h2>
        </div>

        {/* Card */}
        <div className="border-2 border-black bg-white text-black shadow-[8px_8px_0_rgba(0,0,0,0.18)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: quick info / socials */}
            <div className="md:col-span-1 space-y-4">
              <p className="text-sm">
                Want to collaborate or hire me? Drop a message here — I’ll reply
                ASAP.
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FiMail /> <span>manojadhikari57@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin /> <span>Sydney, Australia</span>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://github.com/manojadh57"
                  target="_blank"
                  rel="noreferrer"
                  className="border-2 border-black bg-white p-2 shadow-[4px_4px_0_rgba(0,0,0,0.18)]"
                  aria-label="GitHub"
                >
                  <FiGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/manojadh57/"
                  target="_blank"
                  rel="noreferrer"
                  className="border-2 border-black bg-white p-2 shadow-[4px_4px_0_rgba(0,0,0,0.18)]"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>
              </div>
            </div>

            {/* Right: form (Formspree) */}
            <div className="md:col-span-2">
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                action="https://formspree.io/f/xrblnqng"
                method="POST"
                acceptCharset="UTF-8"
              >
                {/* Honeypot (spam trap) */}
                <input
                  type="text"
                  name="_gotcha"
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />

                {/* Optional custom subject in received email */}
                <input
                  type="hidden"
                  name="_subject"
                  value="New message from Manoj’s portfolio"
                />

                <div className="md:col-span-1">
                  <label className="block text-xs font-bold mb-1">Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    className="w-full border-2 border-black px-3 py-2 bg-white focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-bold mb-1">Email</label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="w-full border-2 border-black px-3 py-2 bg-white focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold mb-1">
                    Subject
                  </label>
                  <input
                    required
                    name="subject"
                    type="text"
                    className="w-full border-2 border-black px-3 py-2 bg-white focus:outline-none"
                    placeholder="What’s this about?"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows="6"
                    className="w-full border-2 border-black px-3 py-2 bg-white focus:outline-none"
                    placeholder="Tell me a bit more…"
                  />
                </div>

                <div className="md:col-span-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="border-2 border-black bg-white px-6 py-3 font-extrabold uppercase
                               shadow-[6px_6px_0_rgba(0,0,0,0.18)]"
                  >
                    Send Message
                  </button>

                  {/* Optional: keep a mailto fallback */}
                  <a
                    href="mailto:manojadhikari57@gmail.com?subject=Hello%20Manoj"
                    className="text-xs underline"
                  >
                    or email me directly
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
