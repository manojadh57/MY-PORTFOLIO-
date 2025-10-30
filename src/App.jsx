import Navbar from "./components/Navbar";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CoolBackground from "./components/CoolBackground";
import ChatbotWidget from "./components/ChatbotWidget";
import IntroOverlay from "./components/IntroOverlay";

export default function App() {
  return (
    <>
      {/* Skip link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:border-2 focus:border-black focus:bg-white focus:px-3 focus:py-2 focus:shadow-[6px_6px_0_#000]"
      >
        Skip to content
      </a>

      {/* Background lives behind everything */}
      <CoolBackground />

      {/* One-time intro animation overlay */}
      <IntroOverlay name="MANOJ ADHIKARI" />

      {/* Page content */}
      <main id="main" className="relative z-10 min-h-screen font-mono text-fg">
        <Navbar />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </main>

      {/* Floating chatbot */}
      <ChatbotWidget />
    </>
  );
}
