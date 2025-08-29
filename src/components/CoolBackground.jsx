import { useEffect, useRef } from "react";

export default function CoolBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });

    // ---------- Sizing / Hi-DPI ----------
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    const maxDpr = 2; // cap for perf
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, maxDpr));

    const resize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      canvas.width = Math.floor(vw * dpr);
      canvas.height = Math.floor(vh * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // ---------- Motion / Time ----------
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let time = 0;

    // ---------- Palette ----------
    const colors = {
      ochre: ["#D2B48C", "#CD853F", "#DEB887", "#F4A460"],
      earth: ["#BC8F8F", "#D2691E", "#CD853F", "#F0E68C"],
      green: ["#9ACD32", "#8FBC8F", "#90EE90", "#98FB98"],
      grey: ["#A9A9A9", "#C0C0C0", "#D3D3D3", "#DCDCDC"],
      brown: ["#8B7355", "#A0826D", "#BC9A6A", "#D4B896"],
      blue: ["#87CEEB", "#B0E0E6", "#E0F6FF", "#F0F8FF"],
    };
    const sets = [
      colors.ochre,
      colors.earth,
      colors.green,
      colors.grey,
      colors.brown,
      colors.blue,
    ];
    const getSetColor = (setIdx, i = 0) =>
      sets[setIdx % sets.length][i % sets[setIdx % sets.length].length];
    const getColor = (setName, index = 0) => {
      const set = colors[setName] || colors.ochre;
      return set[index % set.length];
    };

    // Screen-scaled density
    const scaleFactor = Math.sqrt((vw * vh) / (1280 * 720));
    const ease = (n) => Math.max(1, Math.round(n * scaleFactor));

    // ---------- Existing Background Dots (minimal) ----------
    const backgroundDots = [];
    const dotCount = prefersReduced ? 50 : ease(150);
    for (let i = 0; i < dotCount; i++) {
      backgroundDots.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        size: Math.random() * 3 + 1,
        colorSet: (Math.random() * sets.length) | 0,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    // ---------- Plants ----------
    const plants = [];
    const plantTypes = [
      "eucalyptus",
      "acacia",
      "banksia",
      "grass_tree",
      "bottlebrush",
    ];
    const plantCount = prefersReduced ? 8 : ease(16);
    for (let i = 0; i < plantCount; i++) {
      plants.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        type: plantTypes[(Math.random() * plantTypes.length) | 0],
        size: Math.random() * 50 + 25,
        colorSet: (Math.random() * sets.length) | 0,
        opacity: Math.random() * 0.25 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        swayPhase: Math.random() * Math.PI * 2,
      });
    }

    // ---------- Animals ----------
    const animalTypes = [
      "kangaroo",
      "koala",
      "wombat",
      "echidna",
      "platypus",
      "dingo",
    ];
    const animals = [];
    const animalCount = prefersReduced ? 6 : ease(12);
    for (let i = 0; i < animalCount; i++) {
      animals.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        type: animalTypes[(Math.random() * animalTypes.length) | 0],
        size: Math.random() * 40 + 30,
        colorSet: (Math.random() * sets.length) | 0,
        opacity: Math.random() * 0.3 + 0.15,
        rotation: Math.random() * Math.PI * 2,
        driftPhase: Math.random() * Math.PI * 2,
        isStatic: Math.random() > 0.3,
      });
    }

    // ---------- Birds ----------
    const birds = [];
    const birdTypes = ["kookaburra", "cockatoo", "magpie", "lorikeet", "galah"];
    const birdCount = prefersReduced ? 5 : ease(10);
    for (let i = 0; i < birdCount; i++) {
      birds.push({
        x: Math.random() * vw,
        y: Math.random() * vh * 0.6,
        type: birdTypes[(Math.random() * birdTypes.length) | 0],
        size: Math.random() * 25 + 15,
        colorSet: (Math.random() * sets.length) | 0,
        opacity: Math.random() * 0.4 + 0.2,
        wingPhase: Math.random() * Math.PI * 2,
        isFlying: Math.random() > 0.6,
        speed: Math.random() * 0.3 + 0.1,
      });
    }

    // =============== NEW ABORIGINAL-INSPIRED MOTIFS ===============

    // Waterholes (concentric dotted rings)
    const waterholes = [];
    const waterholeCount = prefersReduced ? 6 : ease(14);
    for (let i = 0; i < waterholeCount; i++) {
      waterholes.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        rings: 3 + ((Math.random() * 3) | 0),
        base: Math.random() * 20 + 18,
        gap: Math.random() * 7 + 6,
        dotCount: 10 + ((Math.random() * 20) | 0),
        colorSet: (Math.random() * sets.length) | 0,
        opacity: Math.random() * 0.4 + 0.25,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        phase: Math.random() * Math.PI * 2,
        pulse: Math.random() * 0.02 + 0.01,
      });
    }

    // Songlines (meandering dotted paths)
    const songlines = [];
    const songlineCount = prefersReduced ? 5 : ease(12);
    for (let i = 0; i < songlineCount; i++) {
      const pts = [];
      const n = 8 + ((Math.random() * 6) | 0);
      for (let j = 0; j < n; j++) {
        pts.push({
          x: (vw / (n - 1)) * j + (Math.random() - 0.5) * 120,
          y: vh * (0.15 + Math.random() * 0.7) + Math.sin(j * 0.6) * 80,
        });
      }
      songlines.push({
        pts,
        colorSet: (Math.random() * sets.length) | 0,
        opacity: Math.random() * 0.35 + 0.2,
        dotSize: Math.random() * 2.6 + 1.6,
        wave: Math.random() * 0.012 + 0.006,
      });
    }

    // Meeting places (hubs with concentric rings + dotted spokes)
    const meetings = [];
    const meetingCount = prefersReduced ? 4 : ease(10);
    for (let i = 0; i < meetingCount; i++) {
      meetings.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        rings: 2 + ((Math.random() * 2) | 0),
        gap: Math.random() * 8 + 8,
        spokes: 4 + ((Math.random() * 4) | 0),
        colorSet: (Math.random() * sets.length) | 0,
        opacity: Math.random() * 0.45 + 0.25,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
      });
    }

    // Boomerangs (twin dotted arcs)
    const boomerangs = [];
    const boomerangCount = prefersReduced ? 5 : ease(12);
    for (let i = 0; i < boomerangCount; i++) {
      boomerangs.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        radius: Math.random() * 24 + 22,
        span: (110 + Math.random() * 30) * (Math.PI / 180),
        thickness: Math.random() * 6 + 5,
        colorSet: (Math.random() * sets.length) | 0,
        opacity: Math.random() * 0.35 + 0.2,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.2,
      });
    }

    // Hand "stencils" (dotted outlines, abstracted)
    const hands = [];
    const handCount = prefersReduced ? 3 : ease(6);
    for (let i = 0; i < handCount; i++) {
      hands.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        scale: Math.random() * 0.4 + 0.6,
        rot: Math.random() * Math.PI * 2,
        colorSet: (Math.random() * sets.length) | 0,
        opacity: Math.random() * 0.25 + 0.15,
      });
    }

    // Footprint trails (paired dots stepping along short paths)
    const footprints = [];
    const footCount = prefersReduced ? 3 : ease(7);
    for (let i = 0; i < footCount; i++) {
      const pts = [];
      const n = 5 + ((Math.random() * 4) | 0);
      const startX = Math.random() * vw * 0.8 + vw * 0.1;
      const startY = Math.random() * vh * 0.8 + vh * 0.1;
      for (let j = 0; j < n; j++) {
        pts.push({
          x:
            startX +
            (Math.random() - 0.5) * 140 +
            j * (Math.random() * 18 + 22),
          y: startY + (Math.random() - 0.5) * 40 + Math.sin(j) * 10,
        });
      }
      footprints.push({
        pts,
        colorSet: (Math.random() * sets.length) | 0,
        opacity: Math.random() * 0.35 + 0.2,
        progress: Math.random(),
        speed: Math.random() * 0.003 + 0.001,
      });
    }

    // ================= DRAW HELPERS =================

    // Light background
    const bgGradient = () => {
      const g = ctx.createLinearGradient(0, 0, 0, vh);
      g.addColorStop(0.0, "#FEFEFE");
      g.addColorStop(0.3, "#FAFAFA");
      g.addColorStop(0.7, "#F5F5F5");
      g.addColorStop(1.0, "#F0F0F0");
      return g;
    };

    // Plants
    const drawPlant = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      if (!prefersReduced) {
        const sway = Math.sin(time * 0.001 + p.swayPhase) * 2;
        ctx.rotate(sway * 0.05);
      }
      switch (p.type) {
        case "eucalyptus":
          ctx.strokeStyle = getColor("brown", 0);
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(0, 20);
          ctx.lineTo(0, -p.size);
          ctx.stroke();
          ctx.fillStyle = getColor("green", 0);
          for (let i = 0; i < 12; i++) {
            const ang = (i / 12) * Math.PI * 2;
            const radius = 15 + Math.random() * 10;
            const x = Math.cos(ang) * radius;
            const y = Math.sin(ang) * radius - p.size / 2;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        case "acacia":
          ctx.strokeStyle = getColor("brown", 1);
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(0, 15);
          ctx.lineTo(0, -p.size / 2);
          ctx.stroke();
          ctx.fillStyle = getColor("earth", 3);
          for (let i = 0; i < 8; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = -p.size / 2 + Math.random() * 15;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        case "banksia":
          ctx.strokeStyle = getColor("brown", 0);
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(0, 10);
          ctx.lineTo(0, -p.size / 3);
          ctx.stroke();
          ctx.fillStyle = getColor("earth", 1);
          for (let i = 0; i < 15; i++) {
            const y = -p.size / 3 + (i / 15) * (p.size / 2);
            const w = 8 - Math.abs(i - 7);
            for (let j = 0; j < w; j++) {
              ctx.beginPath();
              ctx.arc((j - w / 2) * 2, y, 1, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          break;
        case "grass_tree":
          ctx.fillStyle = getColor("brown", 2);
          for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.arc(0, i * 3, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.strokeStyle = getColor("green", 1);
          ctx.lineWidth = 2;
          for (let i = 0; i < 16; i++) {
            const ang = (i / 16) * Math.PI * 2;
            const x = Math.cos(ang) * 15;
            const y = Math.sin(ang) * 15 - 25;
            ctx.beginPath();
            ctx.moveTo(0, -20);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          break;
        case "bottlebrush":
          ctx.strokeStyle = getColor("brown", 0);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, 10);
          ctx.lineTo(0, -p.size / 2);
          ctx.stroke();
          ctx.fillStyle = getColor("earth", 0);
          for (let i = 0; i < 20; i++) {
            const ang = (i / 20) * Math.PI * 2;
            const radius = 8;
            const x = Math.cos(ang) * radius;
            const y = Math.sin(ang) * radius - p.size / 3;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
      }
      ctx.restore();
    };

    // Animals (dot patterns)
    const drawAnimal = (a) => {
      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.rotate(a.rotation);
      ctx.globalAlpha = a.opacity;
      switch (a.type) {
        case "kangaroo":
          ctx.fillStyle = getColor("brown", 0);
          for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.arc(0, i * 4 - 10, 3 + (i % 2), 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.strokeStyle = getColor("brown", 1);
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(-a.size / 3, 0, a.size / 3, Math.PI * 0.2, Math.PI * 0.8);
          ctx.stroke();
          ctx.fillStyle = getColor("brown", 2);
          ctx.beginPath();
          ctx.arc(0, -15, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = getColor("brown", 0);
          ctx.beginPath();
          ctx.arc(8, 15, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(-5, 15, 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "koala":
          ctx.fillStyle = getColor("grey", 0);
          for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
              ctx.beginPath();
              ctx.arc(c * 4, r * 4, 3, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          ctx.beginPath();
          ctx.arc(-8, -10, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(8, -10, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = getColor("brown", 0);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, a.size / 2, Math.PI * 1.2, Math.PI * 1.8);
          ctx.stroke();
          break;
        case "wombat":
          ctx.fillStyle = getColor("brown", 1);
          for (let i = 0; i < 8; i++) {
            const ang = (i / 8) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(Math.cos(ang) * 8, Math.sin(ang) * 5, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.beginPath();
          ctx.arc(0, -8, 3, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "echidna":
          ctx.fillStyle = getColor("brown", 2);
          for (let i = 0; i < 12; i++) {
            const ang = (i / 12) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(Math.cos(ang) * 6, Math.sin(ang) * 4, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.strokeStyle = getColor("brown", 3);
          ctx.lineWidth = 2;
          for (let i = 0; i < 8; i++) {
            const ang = (i / 8) * Math.PI * 2;
            const x1 = Math.cos(ang) * 6;
            const y1 = Math.sin(ang) * 4;
            const x2 = Math.cos(ang) * 12;
            const y2 = Math.sin(ang) * 8;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
          ctx.fillStyle = getColor("brown", 0);
          ctx.beginPath();
          ctx.arc(10, 0, 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "platypus":
          ctx.fillStyle = getColor("brown", 1);
          ctx.beginPath();
          ctx.ellipse(0, 0, 12, 6, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = getColor("ochre", 0);
          ctx.beginPath();
          ctx.ellipse(15, 0, 8, 4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = getColor("brown", 2);
          ctx.beginPath();
          ctx.ellipse(-15, 0, 8, 10, 0, 0, Math.PI * 2);
          ctx.fill();
          for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.arc(-5 + i * 3, 8, 1, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        case "dingo":
          ctx.fillStyle = getColor("ochre", 1);
          for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(i * 3 - 6, 0, 3, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.beginPath();
          ctx.arc(10, -2, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(8, -8, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(12, -8, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = getColor("ochre", 2);
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(-10, 0, 8, Math.PI * 1.5, Math.PI * 2);
          ctx.stroke();
          for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.arc(-4 + i * 3, 8, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
      }
      ctx.restore();
    };

    // Birds
    const drawBird = (b) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.globalAlpha = b.opacity;
      let wingOffset = 0;
      if (!prefersReduced && b.isFlying)
        wingOffset = Math.sin(b.wingPhase + time * 0.1) * 5;

      const wing = (x, y) => {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      };

      switch (b.type) {
        case "kookaburra":
          ctx.fillStyle = getColor("brown", 0);
          ctx.beginPath();
          ctx.ellipse(0, 0, 6, 4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(-8, -2, 4, 0, Math.PI * 2);
          ctx.fill();
          wing(-2, -2 + wingOffset);
          wing(2, -2 - wingOffset);
          ctx.beginPath();
          ctx.arc(8, 0, 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "cockatoo":
          ctx.fillStyle = "#F8F8FF";
          ctx.beginPath();
          ctx.ellipse(0, 0, 5, 3, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(-6, -2, 3, 0, Math.PI * 2);
          ctx.fill();
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(-6 + i, -8, 1, 0, Math.PI * 2);
            ctx.fill();
          }
          wing(-2, -2 + wingOffset);
          wing(2, -2 - wingOffset);
          break;
        case "magpie":
          ctx.fillStyle = "#2F2F2F";
          ctx.beginPath();
          ctx.ellipse(0, 0, 5, 3, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#F8F8FF";
          ctx.beginPath();
          ctx.arc(-1, -1, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#2F2F2F";
          wing(-2, -2 + wingOffset);
          wing(2, -2 - wingOffset);
          ctx.beginPath();
          ctx.arc(-6, -1, 3, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "lorikeet":
          ctx.fillStyle = getColor("green", 0);
          ctx.beginPath();
          ctx.ellipse(0, 0, 4, 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = getColor("blue", 0);
          ctx.beginPath();
          ctx.arc(-5, -1, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = getColor("green", 1);
          wing(-1, -1 + wingOffset);
          wing(1, -1 - wingOffset);
          break;
        case "galah":
          ctx.fillStyle = "#FFB6C1";
          ctx.beginPath();
          ctx.ellipse(0, 0, 4, 3, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = getColor("grey", 0);
          wing(-1, -1 + wingOffset);
          wing(1, -1 - wingOffset);
          ctx.fillStyle = "#FFB6C1";
          ctx.beginPath();
          ctx.arc(-5, -1, 2, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
      ctx.restore();
    };

    // Waterhole
    const drawWaterhole = (w, t) => {
      ctx.save();
      ctx.translate(w.x, w.y);
      ctx.rotate(w.rot);
      ctx.globalAlpha = w.opacity;
      const pulse = 1 + Math.sin(w.phase + t * w.pulse) * 0.25;
      for (let r = 0; r < w.rings; r++) {
        const radius = (w.base + r * w.gap) * pulse;
        const dots = w.dotCount + r * 4;
        for (let i = 0; i < dots; i++) {
          const ang = (i / dots) * Math.PI * 2;
          const x = Math.cos(ang) * radius;
          const y = Math.sin(ang) * radius;
          ctx.fillStyle = getSetColor(w.colorSet, r);
          ctx.beginPath();
          ctx.arc(x, y, 2 + r * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    // Songline
    const drawSongline = (s, t) => {
      if (s.pts.length < 2) return;
      ctx.save();
      ctx.globalAlpha = s.opacity;
      for (let i = 0; i < s.pts.length - 1; i++) {
        const a = s.pts[i];
        const b = s.pts[i + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(2, (dist / 8) | 0);
        for (let k = 0; k <= steps; k++) {
          const u = k / steps;
          const x = a.x + dx * u;
          const y = a.y + dy * u + Math.sin(x * 0.01 + t * s.wave) * 8;
          ctx.fillStyle = getSetColor(s.colorSet, k % 4);
          ctx.beginPath();
          ctx.arc(x, y, s.dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    // Meeting place
    const drawMeeting = (m) => {
      ctx.save();
      ctx.translate(m.x, m.y);
      ctx.rotate(m.rot);
      ctx.globalAlpha = m.opacity;
      // Rings
      for (let r = 0; r < m.rings; r++) {
        const radius = 14 + r * m.gap;
        const dots = 16 + r * 6;
        for (let i = 0; i < dots; i++) {
          const ang = (i / dots) * Math.PI * 2;
          const x = Math.cos(ang) * radius;
          const y = Math.sin(ang) * radius;
          ctx.fillStyle = getSetColor(m.colorSet, r);
          ctx.beginPath();
          ctx.arc(x, y, 2 + r * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // Spokes (dotted lines)
      const maxR = 14 + (m.rings - 1) * m.gap;
      for (let s = 0; s < m.spokes; s++) {
        const ang = (s / m.spokes) * Math.PI * 2;
        const steps = 14;
        for (let i = 0; i <= steps; i++) {
          const r = (i / steps) * (maxR + 10);
          const x = Math.cos(ang) * r;
          const y = Math.sin(ang) * r;
          ctx.fillStyle = getSetColor(m.colorSet, 0);
          ctx.beginPath();
          ctx.arc(x, y, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    // Boomerang (twin arcs of dots)
    const drawBoomerang = (b) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      ctx.globalAlpha = b.opacity;
      const start = -b.span / 2;
      const end = b.span / 2;
      const layers = 2;
      for (let L = 0; L < layers; L++) {
        const radius = b.radius + (L === 0 ? 0 : -b.thickness);
        const dots = 64;
        for (let i = 0; i <= dots; i++) {
          const ang = start + (i / dots) * (end - start);
          const x = Math.cos(ang) * radius;
          const y = Math.sin(ang) * radius;
          ctx.fillStyle = getSetColor(b.colorSet, L);
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    // Hand "stencil" (very abstract dotted outline)
    const drawHand = (h) => {
      ctx.save();
      ctx.translate(h.x, h.y);
      ctx.rotate(h.rot);
      ctx.scale(h.scale, h.scale);
      ctx.globalAlpha = h.opacity;

      // Palm (oval outline)
      const dots = 36;
      const rx = 28;
      const ry = 22;
      for (let i = 0; i < dots; i++) {
        const ang = (i / dots) * Math.PI * 2;
        const x = Math.cos(ang) * rx;
        const y = Math.sin(ang) * ry;
        ctx.fillStyle = getSetColor(h.colorSet, i % 4);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Fingers (five short arcs)
      const finger = (bx, by, r, rot) => {
        const fdots = 10;
        for (let i = 0; i < fdots; i++) {
          const ang = -0.6 + (i / (fdots - 1)) * 1.2 + rot;
          const x = bx + Math.cos(ang) * r;
          const y = by + Math.sin(ang) * r;
          ctx.beginPath();
          ctx.arc(x, y, 1.7, 0, Math.PI * 2);
          ctx.fill();
        }
      };
      ctx.fillStyle = getSetColor(h.colorSet, 1);
      finger(0, -ry, 16, 0); // middle
      finger(-10, -ry + 4, 13, -0.2); // index
      finger(10, -ry + 4, 13, 0.2); // ring
      finger(-20, -ry + 10, 10, -0.5); // thumb-ish
      finger(20, -ry + 10, 10, 0.5); // pinky-ish

      ctx.restore();
    };

    // Footprints
    const drawFootprints = (fp) => {
      // progress moves along piecewise linear path
      const totalSeg = fp.pts.length - 1;
      if (totalSeg <= 0) return;
      const steps = 10; // number of footprints to render
      for (let s = 0; s < steps; s++) {
        const pr = (fp.progress + s * 0.06) % 1;
        const segFloat = pr * totalSeg;
        const i = Math.min(totalSeg - 1, Math.floor(segFloat));
        const t = segFloat - i;
        const a = fp.pts[i];
        const b = fp.pts[i + 1];
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        const ang = Math.atan2(b.y - a.y, b.x - a.x);
        const off = 5; // foot separation
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang);
        ctx.globalAlpha = fp.opacity;
        ctx.fillStyle = getSetColor(fp.colorSet, s % 4);
        // left toe/heel dots
        ctx.beginPath();
        ctx.arc(0, -off, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-3, -off - 2, 1.1, 0, Math.PI * 2);
        ctx.fill();
        // right toe/heel dots
        ctx.beginPath();
        ctx.arc(0, off, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-3, off - 2, 1.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    // ================== ANIMATION ==================
    const animate = () => {
      time += 1;

      // Light background + optional wash for extra airiness
      ctx.fillStyle = bgGradient();
      ctx.fillRect(0, 0, vw, vh);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillRect(0, 0, vw, vh);

      // background dots
      for (const d of backgroundDots) {
        ctx.save();
        ctx.globalAlpha = d.opacity;
        ctx.fillStyle = getSetColor(d.colorSet, 0);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // back layer motifs
      for (const s of songlines) drawSongline(s, time);
      for (const w of waterholes) {
        if (!prefersReduced) {
          w.rot += w.rotSpeed;
          w.phase += w.pulse;
        }
        drawWaterhole(w, time);
      }

      // plants
      for (const p of plants) drawPlant(p);

      // animals
      for (const a of animals) {
        if (!prefersReduced && !a.isStatic) {
          a.x += Math.sin(time * 0.0005 + a.driftPhase) * 0.1;
          a.y += Math.cos(time * 0.0003 + a.driftPhase) * 0.05;
          if (a.x < -50) a.x = vw + 50;
          if (a.x > vw + 50) a.x = -50;
          if (a.y < -50) a.y = vh + 50;
          if (a.y > vh + 50) a.y = -50;
        }
        drawAnimal(a);
      }

      // mid/fore motifs
      for (const m of meetings) {
        if (!prefersReduced) m.rot += m.rotSpeed;
        drawMeeting(m);
      }

      for (const b of boomerangs) {
        if (!prefersReduced) {
          b.x += b.vx;
          b.y += b.vy;
          b.rot += b.rotSpeed;
          if (b.x < -60) b.x = vw + 60;
          if (b.x > vw + 60) b.x = -60;
          if (b.y < -60) b.y = vh + 60;
          if (b.y > vh + 60) b.y = -60;
        }
        drawBoomerang(b);
      }

      for (const h of hands) drawHand(h);

      for (const fp of footprints) {
        if (!prefersReduced) fp.progress = (fp.progress + fp.speed) % 1;
        drawFootprints(fp);
      }

      // birds (topmost)
      for (const bd of birds) {
        if (!prefersReduced && bd.isFlying) {
          bd.x += bd.speed;
          bd.wingPhase += 0.3;
          if (bd.x > vw + 30) {
            bd.x = -30;
            bd.y = Math.random() * vh * 0.6;
          }
        }
        drawBird(bd);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: "linear-gradient(to bottom, #FEFEFE 0%, #F0F0F0 100%)",
      }}
    />
  );
}
