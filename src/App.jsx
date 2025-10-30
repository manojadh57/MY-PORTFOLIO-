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
import RobotScanIntro from "./components/RobotScanIntro"; // <— new intro

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

      {/* Background behind everything */}
      <CoolBackground />

      {/* Robot/HUD intro overlay (plays on each load) */}
      <RobotScanIntro
        name="MANOJ ADHIKARI"
        subtitle="FULL-STACK DEVELOPER"
        autoCloseMs={2800} // set to null to require tap on Skip
      />

      {/* Main content */}
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
