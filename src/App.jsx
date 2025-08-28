import Navbar from "./components/Navbar";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CoolBackground from "./components/CoolBackground"; // New background

export default function App() {
  return (
    <main className="relative z-10 min-h-screen font-mono text-fg">
      {/* New single cool background */}
      <CoolBackground />

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
