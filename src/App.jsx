import Navbar from "./components/Navbar";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Backdrop from "./components/Backdrop"; // if you keep the global BG switcher
import MountainsBackdrop from "./components/MountainsBackdrop"; // NEW

export default function App() {
  return (
    <main className="relative z-10 min-h-screen font-mono text-fg">
      {/* Keep global BG clean or grid; the hero burst is inside About */}
      <Backdrop initial="clean" showControls={true} grain={false} />
      <MountainsBackdrop opacity={0.45} />

      <Navbar />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
