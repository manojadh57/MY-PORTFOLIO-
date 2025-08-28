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

    // Time-based variables for natural animation
    let time = 0;

    // Seabirds (Silver Gulls inspired)
    const birds = [];
    const birdCount = prefersReduced ? 3 : 8;
    for (let i = 0; i < birdCount; i++) {
      birds.push({
        x: Math.random() * width,
        y: height * 0.15 + Math.random() * height * 0.3,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 0.5 + 0.3,
        wingPhase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.4 + 0.3,
      });
    }

    // Floating eucalyptus leaves
    const leaves = [];
    const leafCount = prefersReduced ? 5 : 15;
    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        vx: Math.random() * 0.3 - 0.15,
        vy: Math.random() * 0.2 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
        leafType: Math.floor(Math.random() * 2), // 2 different leaf shapes
      });
    }

    // Wave particles for subtle movement
    const waveParticles = [];
    const waveCount = prefersReduced ? 8 : 20;
    for (let i = 0; i < waveCount; i++) {
      waveParticles.push({
        x: Math.random() * width,
        y: height * 0.7 + Math.random() * height * 0.3,
        size: Math.random() * 6 + 3,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.2 + 0.1,
      });
    }

    // Draw a seabird (simplified gull shape)
    const drawBird = (bird) => {
      ctx.save();
      ctx.translate(bird.x, bird.y);
      ctx.globalAlpha = bird.opacity;
      ctx.fillStyle = "#555555";

      // Wing animation
      const wingAngle = Math.sin(bird.wingPhase + time * 0.05) * 0.3;

      // Body (small oval)
      ctx.fillRect(
        -bird.size * 0.3,
        -bird.size * 0.1,
        bird.size * 0.6,
        bird.size * 0.2
      );

      // Wings (V-shape)
      ctx.strokeStyle = "#555555";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-bird.size * 0.8, -bird.size * 0.5 + wingAngle);
      ctx.moveTo(0, 0);
      ctx.lineTo(bird.size * 0.8, -bird.size * 0.5 - wingAngle);
      ctx.stroke();

      ctx.restore();
    };

    // Draw eucalyptus leaf
    const drawLeaf = (leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.globalAlpha = leaf.opacity;

      if (leaf.leafType === 0) {
        // Oval eucalyptus leaf
        ctx.fillStyle = "#7A9B76";
        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.size * 0.3, leaf.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Leaf vein
        ctx.strokeStyle = "#6B8A67";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -leaf.size * 0.8);
        ctx.lineTo(0, leaf.size * 0.8);
        ctx.stroke();
      } else {
        // Longer narrow leaf
        ctx.fillStyle = "#8FAA8B";
        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.size * 0.2, leaf.size, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // Draw wave particle (simple circle with soft glow)
    const drawWaveParticle = (particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;

      // Soft glow effect
      const grd = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 2
      );
      grd.addColorStop(0, "rgba(173, 216, 230, 0.4)");
      grd.addColorStop(1, "rgba(173, 216, 230, 0)");

      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Create beautiful Australian beach gradient
    const createBackgroundGradient = () => {
      // Golden hour Australian beach gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);

      // Sky colors inspired by Australian sunsets
      gradient.addColorStop(0, "#FFE8D1"); // Warm cream (morning sky)
      gradient.addColorStop(0.2, "#FFF5E6"); // Soft ivory
      gradient.addColorStop(0.4, "#F0F8FF"); // Alice blue (clear day)
      gradient.addColorStop(0.65, "#E6F3F7"); // Light cyan (horizon)
      gradient.addColorStop(0.8, "#D4E5F0"); // Light blue (water)
      gradient.addColorStop(1, "#C8DDE8"); // Deeper blue (foreground)

      return gradient;
    };

    // Animation loop
    const animate = () => {
      time += 1;

      // Clear and draw background
      const bgGradient = createBackgroundGradient();
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Add subtle texture with very light dots (sand-like)
      if (!prefersReduced) {
        for (let i = 0; i < 150; i++) {
          ctx.fillStyle = `rgba(139, 119, 101, ${Math.random() * 0.08})`;
          const x = Math.random() * width;
          const y = Math.random() * height;
          ctx.fillRect(x, y, 1, 1);
        }
      }

      // Animate and draw birds
      birds.forEach((bird) => {
        if (!prefersReduced) {
          bird.x += bird.speed;
          bird.wingPhase += 0.2;

          // Wrap around screen
          if (bird.x > width + 50) {
            bird.x = -50;
            bird.y = height * 0.15 + Math.random() * height * 0.3;
          }
        }
        drawBird(bird);
      });

      // Animate and draw eucalyptus leaves
      leaves.forEach((leaf) => {
        if (!prefersReduced) {
          leaf.x += leaf.vx;
          leaf.y += leaf.vy;
          leaf.rotation += leaf.rotationSpeed;

          // Gentle floating motion
          leaf.y += Math.sin(time * 0.01 + leaf.x * 0.001) * 0.1;

          // Wrap around screen
          if (leaf.x > width + 30) leaf.x = -30;
          if (leaf.x < -30) leaf.x = width + 30;
          if (leaf.y > height + 30) leaf.y = -30;
        }
        drawLeaf(leaf);
      });

      // Animate and draw wave particles
      waveParticles.forEach((particle) => {
        if (!prefersReduced) {
          // Gentle bobbing motion
          particle.y += Math.sin(time * 0.02 + particle.phase) * 0.3;
          particle.x += Math.cos(time * 0.015 + particle.phase) * 0.2;

          // Keep particles in water area
          if (particle.x > width + 20) particle.x = -20;
          if (particle.x < -20) particle.x = width + 20;
          if (particle.y < height * 0.65) particle.y = height * 0.8;
          if (particle.y > height + 20) particle.y = height * 0.7;
        }
        drawWaveParticle(particle);
      });

      // Add subtle horizon line (very faint)
      ctx.strokeStyle = "rgba(176, 196, 222, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.65);
      ctx.lineTo(width, height * 0.65);
      ctx.stroke();

      // Add some very subtle cloud-like shapes
      if (!prefersReduced) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";

        // Cloud 1
        ctx.beginPath();
        ctx.ellipse(width * 0.2, height * 0.2, 80, 25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cloud 2
        ctx.beginPath();
        ctx.ellipse(width * 0.7, height * 0.15, 60, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        // Cloud 3
        ctx.beginPath();
        ctx.ellipse(width * 0.9, height * 0.25, 40, 15, 0, 0, Math.PI * 2);
        ctx.fill();
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
        background: "linear-gradient(135deg, #FFE8D1 0%, #C8DDE8 100%)",
      }}
    />
  );
}
