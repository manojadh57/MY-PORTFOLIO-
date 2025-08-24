import { useEffect, useRef, useState } from "react";

// Glitch effect data
const GLITCH_CHARS = "▓▒░█▄▀■▪▫";
const PIXEL_COLORS = ["#FFD600", "#111111", "#757575", "#FFFFFF"];

// Code rain characters (tech stack related)
const CODE_CHARS = [
  "React",
  "Node",
  "JS",
  "CSS",
  "HTML",
  "MongoDB",
  "Express",
  "{",
  "}",
  "[",
  "]",
  "(",
  ")",
  ";",
  "=",
  "+",
  "-",
  "*",
  "/",
  "0",
  "1",
  "→",
  "←",
  "↑",
  "↓",
  "λ",
  "∆",
  "∞",
];

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition, { passive: true });
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return position;
}

function CodeRain({ containerRef }) {
  const canvasRef = useRef(null);
  const dropsRef = useRef([]);
  const frameRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    const columns = Math.floor(canvas.width / 20);
    const drops = dropsRef.current;

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      if (!drops[i]) {
        drops[i] = {
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
          opacity: Math.random() * 0.8 + 0.2,
        };
      }
    }

    function draw() {
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '12px "IBM Plex Mono", monospace';

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Randomize color
        const colors = ["#FFD600", "#111111", "#757575"];
        ctx.fillStyle =
          colors[Math.floor(Math.random() * colors.length)] +
          Math.floor(drop.opacity * 255)
            .toString(16)
            .padStart(2, "0");

        ctx.fillText(drop.char, i * 20, drop.y);

        drop.y += drop.speed;

        // Reset drop when it goes off screen
        if (drop.y > canvas.height && Math.random() > 0.975) {
          drop.y = 0;
          drop.char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
          drop.opacity = Math.random() * 0.8 + 0.2;
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}

function GlitchOverlay({ isActive, intensity = 5 }) {
  const [glitchData, setGlitchData] = useState([]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const newGlitchData = Array.from({ length: intensity }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        width: Math.random() * 30 + 10,
        height: Math.random() * 5 + 2,
        char: GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
        color: PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)],
        opacity: Math.random() * 0.8 + 0.2,
      }));

      setGlitchData(newGlitchData);

      setTimeout(() => setGlitchData([]), 100);
    }, 200);

    return () => clearInterval(interval);
  }, [isActive, intensity]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {glitchData.map((glitch) => (
        <div
          key={glitch.id}
          className="absolute font-mono text-xs font-bold"
          style={{
            left: `${glitch.x}%`,
            top: `${glitch.y}%`,
            width: `${glitch.width}px`,
            height: `${glitch.height}px`,
            color: glitch.color,
            opacity: glitch.opacity,
            transform: `skew(${Math.random() * 10 - 5}deg)`,
            animation: `glitch-${glitch.id} 0.1s linear infinite`,
          }}
        >
          {glitch.char.repeat(Math.ceil(glitch.width / 8))}
        </div>
      ))}

      <style jsx>{`
        ${glitchData
          .map(
            (glitch) => `
          @keyframes glitch-${glitch.id} {
            0%, 100% { transform: translateX(0) skew(0deg); }
            25% { transform: translateX(-2px) skew(-1deg); }
            50% { transform: translateX(2px) skew(1deg); }
            75% { transform: translateX(-1px) skew(-0.5deg); }
          }
        `
          )
          .join("")}
      `}</style>
    </div>
  );
}

function PixelTrail({ mousePosition, containerRef }) {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = mousePosition.x - rect.left;
    const relativeY = mousePosition.y - rect.top;

    if (
      relativeX < 0 ||
      relativeX > rect.width ||
      relativeY < 0 ||
      relativeY > rect.height
    ) {
      return;
    }

    const newPixel = {
      id: Date.now() + Math.random(),
      x: relativeX,
      y: relativeY,
      size: Math.random() * 8 + 4,
      color: PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)],
      life: 1,
    };

    setTrail((prev) => [...prev.slice(-20), newPixel]);
  }, [mousePosition, containerRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((pixel) => ({ ...pixel, life: pixel.life - 0.05 }))
          .filter((pixel) => pixel.life > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {trail.map((pixel) => (
        <div
          key={pixel.id}
          className="absolute border-2 border-black"
          style={{
            left: pixel.x - pixel.size / 2,
            top: pixel.y - pixel.size / 2,
            width: pixel.size,
            height: pixel.size,
            backgroundColor: pixel.color,
            opacity: pixel.life * 0.7,
            transform: `scale(${pixel.life})`,
            boxShadow: `2px 2px 0 rgba(0,0,0,${pixel.life * 0.3})`,
          }}
        />
      ))}
    </div>
  );
}

function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-20"
      style={{
        backgroundImage:
          "linear-gradient(transparent 50%, rgba(0,0,0,0.1) 50%)",
        backgroundSize: "100% 4px",
        animation: "scanlines 2s linear infinite",
      }}
    >
      <style jsx>{`
        @keyframes scanlines {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(4px);
          }
        }
      `}</style>
    </div>
  );
}

export default function ArtisticPortrait({
  className = "",
  enableGlitch = true,
  enableCodeRain = true,
  enablePixelTrail = true,
  enableScanlines = true,
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const mousePosition = useMousePosition();

  // Random glitch triggers
  useEffect(() => {
    if (!enableGlitch) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [enableGlitch]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-md mx-auto aspect-square overflow-hidden border-2 border-black bg-white shadow-[8px_8px_0_var(--shadow-weak)] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        filter: isGlitching ? "contrast(1.2) saturate(1.5)" : "none",
        transition: "filter 0.1s ease",
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #111 25%, transparent 25%), linear-gradient(-45deg, #111 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #111 75%), linear-gradient(-45deg, transparent 75%, #111 75%)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        }}
      />

      {/* Code Rain Effect */}
      {enableCodeRain && <CodeRain containerRef={containerRef} />}

      {/* Portrait Image */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
        <img
          src="/manoj-portrait.svg"
          alt="Manoj Adhikari - Artistic Portrait"
          className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
          style={{
            filter: isHovered ? "brightness(1.1) contrast(1.1)" : "none",
            transform: isGlitching
              ? `translateX(${Math.random() * 4 - 2}px) translateY(${
                  Math.random() * 4 - 2
                }px)`
              : "none",
            transition: "filter 0.3s ease",
          }}
        />
      </div>

      {/* Pixel Trail */}
      {enablePixelTrail && (
        <PixelTrail mousePosition={mousePosition} containerRef={containerRef} />
      )}

      {/* Glitch Overlay */}
      {enableGlitch && (
        <GlitchOverlay
          isActive={isGlitching || isHovered}
          intensity={isHovered ? 8 : 3}
        />
      )}

      {/* Scanlines */}
      {enableScanlines && <ScanLines />}

      {/* Corner Brackets (Brutalist accent) */}
      <div className="absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-accent" />
      <div className="absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-accent" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-accent" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-accent" />

      {/* Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 px-2 py-1 bg-accent border-2 border-black text-black text-xs font-mono font-bold">
        <div
          className={`w-2 h-2 ${
            isGlitching
              ? "bg-red-500"
              : isHovered
              ? "bg-green-500"
              : "bg-gray-400"
          } border border-black`}
        />
        {isGlitching ? "GLITCH" : isHovered ? "ACTIVE" : "IDLE"}
      </div>
    </div>
  );
}
