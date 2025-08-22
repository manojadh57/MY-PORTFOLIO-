import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const initParticles = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={initParticles}
      className="absolute inset-0 -z-10 pointer-events-none"
      options={{
        // ← important: transparent so it doesn’t paint the page black
        background: { color: "transparent" },
        fpsLimit: 60,
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 100, duration: 0.4 } },
        },
        particles: {
          color: { value: "#666" },
          links: {
            color: "#444",
            distance: 140,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: { enable: true, speed: 0.6 },
          number: { value: 60 },
          opacity: { value: 0.4 },
          size: { value: { min: 1, max: 3 } },
        },
      }}
    />
  );
}
