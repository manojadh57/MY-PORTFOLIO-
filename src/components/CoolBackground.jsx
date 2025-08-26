// Replace your current Backdrop.jsx with this cool single background

import { useEffect, useRef } from "react";

export default function CoolBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener("resize", resize);

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Floating geometric shapes
    const shapes = [];
    const shapeCount = prefersReduced ? 12 : 25;

    // Create shapes
    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 40 + 20,
        type: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        vx: (Math.random() - 0.5) * (prefersReduced ? 0.2 : 0.8),
        vy: (Math.random() - 0.5) * (prefersReduced ? 0.2 : 0.8),
        opacity: Math.random() * 0.15 + 0.05,
        color: Math.floor(Math.random() * 4), // Different color variations
      });
    }

    // Color palette
    const colors = [
      "rgba(255, 214, 0, ", // Yellow
      "rgba(17, 17, 17, ", // Dark
      "rgba(117, 117, 117, ", // Gray
      "rgba(0, 123, 191, ", // Blue accent
    ];

    // Draw shape function
    const drawShape = (shape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.fillStyle = colors[shape.color] + shape.opacity + ")";
      ctx.strokeStyle = colors[shape.color] + shape.opacity * 0.8 + ")";
      ctx.lineWidth = 2;

      switch (shape.type) {
        case 0: // Circle
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;

        case 1: // Square
          ctx.fillRect(
            -shape.size / 2,
            -shape.size / 2,
            shape.size,
            shape.size
          );
          ctx.strokeRect(
            -shape.size / 2,
            -shape.size / 2,
            shape.size,
            shape.size
          );
          break;

        case 2: // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
      }
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      // Clear with a subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.5, "#fefefe");
      gradient.addColorStop(1, "#fdfdfd");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add subtle noise texture
      if (!prefersReduced) {
        for (let i = 0; i < 200; i++) {
          ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.02})`;
          ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
        }
      }

      // Update and draw shapes
      shapes.forEach((shape) => {
        // Move shapes
        if (!prefersReduced) {
          shape.x += shape.vx;
          shape.y += shape.vy;
          shape.rotation += shape.rotationSpeed;

          // Wrap around screen
          if (shape.x > width + 50) shape.x = -50;
          if (shape.x < -50) shape.x = width + 50;
          if (shape.y > height + 50) shape.y = -50;
          if (shape.y < -50) shape.y = height + 50;
        }

        drawShape(shape);
      });

      // Add geometric grid overlay (very subtle)
      if (!prefersReduced) {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.02)";
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x <= width; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= height; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      }}
    />
  );
}
