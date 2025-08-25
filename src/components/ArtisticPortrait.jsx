import { useEffect, useRef, useState } from "react";

// Glitch effect data
const GLITCH_CHARS = "▓▒░█▄▀■▪▫";
const PIXEL_COLORS = ["#FFD600", "#111111", "#757575", "#FFFFFF"];

// Matrix-style binary and code characters
const MATRIX_CHARS = [
  "0",
  "0",
  "0",
  "0",
  "0",
  "1",
  "1",
  "1",
  "1",
  "1", // Heavy emphasis on 0s and 1s
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "ア",
  "イ",
  "ウ",
  "エ",
  "オ",
  "カ",
  "キ",
  "ク",
  "ケ",
  "コ",
  "{",
  "}",
  "[",
  "]",
  "(",
  ")",
  "=",
  "+",
  "-",
  "*",
  "/",
  "|",
];

// Name characters for glitch effect
const NAME_CHARS = [
  "M",
  "A",
  "N",
  "O",
  "J",
  " ",
  "A",
  "D",
  "H",
  "I",
  "K",
  "A",
  "R",
  "I",
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

function MatrixCodeRain({ containerRef }) {
  const canvasRef = useRef(null);
  const dropsRef = useRef([]);
  const frameRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    let rect = container.getBoundingClientRect();

    const updateCanvas = () => {
      rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvas();

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = dropsRef.current;

    // Initialize drops
    if (drops.length === 0) {
      for (let i = 0; i < columns; i++) {
        drops[i] = {
          y: Math.random() * canvas.height,
          speed: Math.random() * 4 + 2,
          chars: Array.from(
            { length: Math.floor(Math.random() * 30) + 10 },
            () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          ),
          opacity: Math.random() * 0.8 + 0.4,
          length: Math.floor(Math.random() * 20) + 10,
          lastCharChange: 0,
        };
      }
    }

    function draw() {
      // Dark background with slight transparency for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px "Courier New", monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Draw the trail of characters
        for (let k = 0; k < drop.length; k++) {
          const charY = drop.y - k * fontSize;

          if (charY > -fontSize && charY < canvas.height + fontSize) {
            // Calculate brightness - brightest at head
            const brightness = Math.max(0, (drop.length - k) / drop.length);

            if (k === 0) {
              // Head character - bright white
              ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
            } else if (k < 3) {
              // First few characters - bright green
              ctx.fillStyle = `rgba(100, 255, 100, ${brightness * 0.9})`;
            } else {
              // Trail - darker green
              ctx.fillStyle = `rgba(0, 255, 65, ${brightness * 0.7})`;
            }

            // Change characters occasionally for animation
            if (Date.now() - drop.lastCharChange > 150 && Math.random() < 0.3) {
              drop.chars[k] =
                MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
              if (k === drop.length - 1) drop.lastCharChange = Date.now();
            }

            ctx.fillText(
              drop.chars[k] || "0",
              i * fontSize + fontSize / 2,
              charY
            );
          }
        }

        // Move the drop
        drop.y += drop.speed;

        // Reset when off screen
        if (drop.y - drop.length * fontSize > canvas.height) {
          drop.y = -Math.random() * 200;
          drop.speed = Math.random() * 4 + 2;
          drop.chars = Array.from(
            { length: Math.floor(Math.random() * 30) + 10 },
            () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          );
          drop.opacity = Math.random() * 0.8 + 0.4;
          drop.length = Math.floor(Math.random() * 20) + 10;
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    const resizeObserver = new ResizeObserver(() => {
      updateCanvas();
    });
    resizeObserver.observe(container);

    draw();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-70"
      style={{
        mixBlendMode: "normal",
        background: "transparent",
      }}
    />
  );
}

function FloatingName({ isActive }) {
  const [namePositions, setNamePositions] = useState([]);

  useEffect(() => {
    // Initialize positions for each character
    const positions = NAME_CHARS.map((char, index) => ({
      char,
      x: 20 + index * 25 + Math.random() * 10,
      y: 60 + Math.random() * 20,
      opacity: Math.random() * 0.6 + 0.2,
      glitchIntensity: Math.random(),
      id: index,
    }));
    setNamePositions(positions);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setNamePositions((prev) =>
        prev.map((pos) => ({
          ...pos,
          x: pos.x + (Math.random() - 0.5) * 4,
          y: pos.y + (Math.random() - 0.5) * 4,
          opacity: Math.random() * 0.8 + 0.2,
          glitchIntensity: Math.random(),
        }))
      );
    }, 200);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {namePositions.map((pos) => (
        <div
          key={pos.id}
          className="absolute text-green-400 font-mono font-bold text-lg"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            opacity: pos.opacity,
            transform: `skew(${pos.glitchIntensity * 10 - 5}deg) scale(${
              0.8 + pos.glitchIntensity * 0.4
            })`,
            textShadow: `0 0 ${pos.glitchIntensity * 10}px #00ff41`,
            filter: `blur(${pos.glitchIntensity * 2}px)`,
            animation: isActive
              ? `glitch-float-${pos.id} 0.5s linear infinite`
              : "none",
          }}
        >
          {Math.random() < 0.1
            ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            : pos.char}
        </div>
      ))}

      <style jsx>{`
        ${namePositions
          .map(
            (pos) => `
          @keyframes glitch-float-${pos.id} {
            0%, 100% { transform: translateX(0) translateY(0) skew(0deg); }
            25% { transform: translateX(-1px) translateY(-1px) skew(-1deg); }
            50% { transform: translateX(1px) translateY(1px) skew(1deg); }
            75% { transform: translateX(-1px) translateY(1px) skew(-0.5deg); }
          }
        `
          )
          .join("")}
      `}</style>
    </div>
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
        color:
          Math.random() < 0.7
            ? "#00ff41"
            : PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)],
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
      color:
        Math.random() < 0.7
          ? "#00ff41"
          : PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)],
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
          className="absolute border border-green-400"
          style={{
            left: pixel.x - pixel.size / 2,
            top: pixel.y - pixel.size / 2,
            width: pixel.size,
            height: pixel.size,
            backgroundColor: pixel.color,
            opacity: pixel.life * 0.7,
            transform: `scale(${pixel.life})`,
            boxShadow: `0 0 ${pixel.life * 10}px ${pixel.color}`,
          }}
        />
      ))}
    </div>
  );
}

function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-10"
      style={{
        backgroundImage:
          "linear-gradient(transparent 50%, rgba(0,255,65,0.1) 50%)",
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
      className={`relative w-full max-w-md mx-auto aspect-square overflow-hidden border-2 border-black bg-black shadow-[8px_8px_0_var(--shadow-weak)] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        filter: isGlitching ? "contrast(1.2) saturate(1.5)" : "none",
        transition: "filter 0.1s ease",
      }}
    >
      {/* Matrix Code Rain Effect */}
      {enableCodeRain && <MatrixCodeRain containerRef={containerRef} />}

      {/* Floating Name with Glitch */}
      <FloatingName isActive={isGlitching || isHovered} />

      {/* Portrait Image - Keep original colors */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
        <img
          src="/manoj-portrait.svg"
          alt="Manoj Adhikari - Artistic Portrait"
          className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
          style={{
            filter: isHovered
              ? "brightness(1.1) contrast(1.1)"
              : "brightness(1.0)",
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

      {/* Corner Brackets (Matrix-themed) */}
      <div className="absolute top-2 left-2 w-6 h-6 border-l-4 border-t-4 border-green-400" />
      <div className="absolute top-2 right-2 w-6 h-6 border-r-4 border-t-4 border-green-400" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-l-4 border-b-4 border-green-400" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-r-4 border-b-4 border-green-400" />

      {/* Status Indicator - Matrix themed */}
      <div className="absolute top-4 right-4 flex items-center gap-2 px-2 py-1 bg-black border-2 border-green-400 text-green-400 text-xs font-mono font-bold">
        <div
          className={`w-2 h-2 ${
            isGlitching
              ? "bg-red-500 shadow-[0_0_6px_#ff0000]"
              : isHovered
              ? "bg-green-400 shadow-[0_0_6px_#00ff41]"
              : "bg-green-700 shadow-[0_0_4px_#00ff41]"
          } border border-green-400`}
        />
        {isGlitching ? "BREACH" : isHovered ? "ONLINE" : "MATRIX"}
      </div>
    </div>
  );
}
