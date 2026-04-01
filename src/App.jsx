import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── DATA ───────────────────────────────────────────────────────────────────

const designProjects = [
  {
    id: 1,
    title: "Meridian Banking App",
    description: "A complete redesign of a digital banking experience focusing on clarity, trust, and seamless transaction flows.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tools: ["Figma", "Protopie", "Illustrator"],
    date: "2025",
    tags: ["UI/UX", "Mobile", "Fintech"],
  },
  {
    id: 2,
    title: "Aether Brand System",
    description: "Comprehensive brand identity for a climate-tech startup. Logo, typography system, color palette, and full guidelines.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    tools: ["Illustrator", "Photoshop", "Figma"],
    date: "2024",
    tags: ["Branding", "Identity", "Print"],
  },
];

const artProjects = [
  {
    id: 1,
    title: "Ethereal Cascades",
    description: "Abstract digital painting exploring the interplay between water and light in surreal environments.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
    date: "2025",
    medium: "Digital Painting — Procreate",
  },
  {
    id: 2,
    title: "Neon Metropolis",
    description: "Cyberpunk-inspired cityscape with volumetric lighting and atmospheric fog effects.",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    date: "2024",
    medium: "Digital Art — Photoshop",
  },
  {
    id: 3,
    title: "Organic Forms Study",
    description: "Explorations in biomorphic shapes and natural textures rendered in a minimalist style.",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80",
    date: "2024",
    medium: "Digital Illustration — Procreate",
  },
  {
    id: 4,
    title: "Fragments of Memory",
    description: "Mixed media series combining photography, illustration, and generative patterns into cohesive compositions.",
    image: "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=800&q=80",
    date: "2025",
    medium: "Mixed Media — Photoshop & Illustrator",
  },
  {
    id: 5,
    title: "Void Architecture",
    description: "Concept art series depicting impossible structures in empty space, inspired by Escher and brutalism.",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80",
    date: "2024",
    medium: "Concept Art — Blender & Photoshop",
  },
  {
    id: 6,
    title: "Bioluminescence",
    description: "A series of deep-sea inspired artworks featuring glowing creatures in abyssal darkness.",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
    date: "2025",
    medium: "Digital Painting — Procreate",
  },
];

const codeProjects = [
  {
    id: 1,
    title: "Synth Engine",
    description: "Browser-based modular synthesizer built with Web Audio API. Supports MIDI input, custom oscillators, and real-time visualization.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    status: "completed",
    date: "2025",
    github: "https://github.com",
    tags: ["TypeScript", "Web Audio", "React"],
  },
  {
    id: 2,
    title: "Pixel Forge",
    description: "Real-time collaborative pixel art editor with WebSocket sync, layer support, and animation timeline.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    status: "wip",
    date: "In Progress",
    github: "https://github.com",
    tags: ["Next.js", "WebSocket", "Canvas"],
  },
];

const skills = {
  Design: ["Figma", "Photoshop", "Illustrator", "After Effects", "Principle"],
  Art: ["Digital Painting", "Concept Art", "Sketching", "3D Sculpting"],
  Code: ["Python", "JavaScript", "TypeScript", "React", "Next.js", "Rust"],
};

// ─── SPARKLE SHOWER ON LOAD ─────────────────────────────────────────────────

function SparkleShower() {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = (canvas.width = window.innerWidth);
    const H = (canvas.height = window.innerHeight);

    const PARTICLE_COUNT = 80;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const startX = -100 + Math.random() * (W * 0.5);
      const startY = -60 - Math.random() * 400;
      particles.push({
        x: startX,
        y: startY,
        size: Math.random() * 2.8 + 0.8,
        speedX: 2.2 + Math.random() * 2.8,
        speedY: 2.8 + Math.random() * 3.2,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: 0.025 + Math.random() * 0.05,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: 195 + Math.random() * 50,
        delay: Math.random() * 50,
        tick: 0,
      });
    }

    let frame = 0;
    let raf;
    const maxFrames = 200;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      let allDone = true;
      for (const p of particles) {
        p.tick++;
        if (p.tick < p.delay) { allDone = false; continue; }

        p.x += p.speedX;
        p.y += p.speedY;

        const twinkle = 0.4 + 0.6 * Math.sin(p.twinklePhase + p.tick * p.twinkleSpeed);
        const fadeIn = Math.min(1, (p.tick - p.delay) / 12);
        const fadeOut = frame > maxFrames - 50 ? Math.max(0, 1 - (frame - (maxFrames - 50)) / 50) : 1;
        const alpha = p.opacity * twinkle * fadeIn * fadeOut;

        if (p.y < H + 20 && p.x < W + 20) allDone = false;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(${p.hue}, 85%, 80%)`;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 78%, 1)`;
        ctx.shadowBlur = 10;

        // 4-point star sparkle
        const s = p.size * (0.6 + twinkle * 0.7);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - s * 2.2);
        ctx.lineTo(p.x + s * 0.4, p.y - s * 0.4);
        ctx.lineTo(p.x + s * 2.2, p.y);
        ctx.lineTo(p.x + s * 0.4, p.y + s * 0.4);
        ctx.lineTo(p.x, p.y + s * 2.2);
        ctx.lineTo(p.x - s * 0.4, p.y + s * 0.4);
        ctx.lineTo(p.x - s * 2.2, p.y);
        ctx.lineTo(p.x - s * 0.4, p.y - s * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      if (frame < maxFrames && !allDone) {
        raf = requestAnimationFrame(draw);
      } else {
        setVisible(false);
      }
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none" }}
    />
  );
}

// ─── MOUSE GLOW (smaller + brighter) ───────────────────────────────────────

function MouseGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const handleMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);

    let raf;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.current.x - 100}px, ${pos.current.y - 100}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 200,
        height: 200,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(100,181,246,0.22) 0%, rgba(100,181,246,0.08) 30%, transparent 60%)",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      }}
    />
  );
}

// ─── ANIMATED BACKGROUND ────────────────────────────────────────────────────

function AnimatedBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(60,120,200,0.025) 0%, transparent 70%)",
        animation: "float1 20s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "-15%", left: "-5%", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(60,120,200,0.02) 0%, transparent 70%)",
        animation: "float2 25s ease-in-out infinite",
      }} />
      <style>{`
        @keyframes float1 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px, 30px) scale(1.1); } }
        @keyframes float2 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px, -40px) scale(1.05); } }
      `}</style>
    </div>
  );
}

// ─── LIQUID GLASS BUTTON ────────────────────────────────────────────────────

function LiquidGlassButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 hover:scale-105 h-12 px-8 rounded-full ${className}`}
      style={{ color: "#64B5F6" }}
    >
      <div
        className="absolute top-0 left-0 z-0 h-full w-full rounded-full"
        style={{
          boxShadow: "0 0 6px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08), inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.09), inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85), inset 1px 1px 1px -0.5px rgba(255,255,255,0.6), inset -1px -1px 1px -0.5px rgba(255,255,255,0.6), inset 0 0 6px 6px rgba(255,255,255,0.12), inset 0 0 2px 2px rgba(255,255,255,0.06), 0 0 12px rgba(0,0,0,0.15)",
        }}
      />
      <div
        className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
        style={{ backdropFilter: 'blur(12px) saturate(1.4)', background: 'rgba(100,181,246,0.08)' }}
      />
      <span className="pointer-events-none z-10 font-semibold tracking-wide">{children}</span>
    </button>
  );
}

// ─── "MORE TO COME" FOOTER ──────────────────────────────────────────────────

function MoreToCome() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{
        textAlign: "center",
        color: "rgba(136,153,170,0.3)",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.1em",
        padding: "52px 0 24px",
        fontStyle: "italic",
      }}
    >
      more to come...
    </motion.p>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────

function Navbar({ currentPage, setCurrentPage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { key: "home", label: "Home" },
    { key: "design", label: "Design" },
    { key: "art", label: "Art" },
    { key: "code", label: "Code" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 clamp(16px, 4vw, 48px)",
        height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(3,7,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.5)" : "none",
        borderBottom: scrolled ? "1px solid rgba(100,181,246,0.05)" : "1px solid transparent",
        transition: "background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s",
      }}
    >
      <div
        onClick={() => setCurrentPage("home")}
        style={{ cursor: "pointer", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: "#fff" }}
      >
        Ganesh's <span style={{ opacity: 0.4, fontWeight: 400 }}>Portfolio</span>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {links.map((l) => (
          <button
            key={l.key}
            onClick={() => setCurrentPage(l.key)}
            style={{
              background: "none", border: "none", cursor: "pointer", position: "relative",
              color: currentPage === l.key ? "#64B5F6" : "rgba(136,153,170,0.7)",
              fontSize: 14, fontWeight: 500, letterSpacing: "0.02em", padding: "4px 0",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => { if (currentPage !== l.key) e.target.style.color = "#64B5F6"; }}
            onMouseLeave={(e) => { if (currentPage !== l.key) e.target.style.color = "rgba(136,153,170,0.7)"; }}
          >
            {l.label}
            {currentPage === l.key && (
              <motion.div
                layoutId="nav-underline"
                style={{
                  position: "absolute", bottom: -2, left: 0, right: 0, height: 2,
                  background: "#64B5F6", borderRadius: 1,
                  boxShadow: "0 0 8px rgba(100,181,246,0.5)",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </motion.nav>
  );
}

// ─── MODAL ──────────────────────────────────────────────────────────────────

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(1,4,10,0.9)", backdropFilter: "blur(12px)", padding: 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(6,14,30,0.98)", border: "1px solid rgba(100,181,246,0.08)",
              borderRadius: 16, maxWidth: 720, width: "100%", maxHeight: "85vh", overflow: "auto",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(100,181,246,0.03)",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "sticky", top: 16, float: "right", marginRight: 16, marginTop: 16,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8, width: 36, height: 36, cursor: "pointer", color: "rgba(136,153,170,0.6)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, zIndex: 10,
              }}
            >
              ✕
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── PROJECT CARD ───────────────────────────────────────────────────────────

function ProjectCard({ project, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(project)}
      style={{
        cursor: "pointer", borderRadius: 14, overflow: "hidden",
        background: "rgba(6,14,30,0.7)", border: "1px solid rgba(100,181,246,0.04)",
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      whileHover={{
        y: -6,
        boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(100,181,246,0.06)",
        borderColor: "rgba(100,181,246,0.15)",
      }}
    >
      <div style={{ overflow: "hidden", aspectRatio: "16/10" }}>
        <motion.img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
          whileHover={{ scale: 1.06 }}
        />
      </div>
      <div style={{ padding: "20px 24px 24px" }}>
        <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 600, marginBottom: 8, letterSpacing: "-0.01em" }}>
          {project.title}
        </h3>
        <p style={{ color: "rgba(136,153,170,0.7)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
          {project.description}
        </p>
        {project.tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
            {project.tags.map((t) => (
              <span key={t} style={{
                fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20,
                background: "rgba(100,181,246,0.06)", color: "#64B5F6", border: "1px solid rgba(100,181,246,0.08)",
              }}>{t}</span>
            ))}
          </div>
        )}
        {project.status && (
          <div style={{ marginTop: 14 }}>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em",
              background: project.status === "completed" ? "rgba(76,175,80,0.08)" : "rgba(255,152,0,0.08)",
              color: project.status === "completed" ? "#66BB6A" : "#FFA726",
              border: `1px solid ${project.status === "completed" ? "rgba(76,175,80,0.15)" : "rgba(255,152,0,0.15)"}`,
            }}>{project.status === "completed" ? `Completed ${project.date}` : "Work in Progress"}</span>
          </div>
        )}
        {project.medium && (
          <p style={{ color: "rgba(136,153,170,0.45)", fontSize: 12, marginTop: 12, fontStyle: "italic" }}>
            {project.medium}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────────

function HomePage({ setCurrentPage }) {
  return (
    <div style={{ minHeight: "100vh", paddingTop: 72 }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64,
        maxWidth: 1100, margin: "0 auto", padding: "80px clamp(24px,5vw,48px) 40px",
        alignItems: "center",
      }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{
            position: "relative", borderRadius: 20, overflow: "hidden",
            boxShadow: "0 0 40px rgba(100,181,246,0.05), 0 20px 60px rgba(0,0,0,0.5)",
            border: "1px solid rgba(100,181,246,0.08)",
          }}>
            <motion.img
              src="/aboutme.png"
              alt="Ganesh portrait"
              style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, margin: 0, letterSpacing: "-0.03em" }}>
            Ganesh's
            <br />
            <span style={{ color: "#64B5F6" }}>Portfolio</span>
          </h1>
          <p style={{ fontSize: 16, color: "#64B5F6", marginTop: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Designer · Artist · Developer
          </p>
          <p style={{ color: "rgba(136,153,170,0.75)", fontSize: 15, lineHeight: 1.75, marginTop: 28, maxWidth: 460 }}>
            I craft digital experiences at the intersection of design, art, and engineering.
            With a deep passion for visual storytelling and clean code, I build things that
            are beautiful to look at and a joy to use. Every project is an opportunity to
            push creative and technical boundaries.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <LiquidGlassButton onClick={() => setCurrentPage("design")}>
              View Work →
            </LiquidGlassButton>
          </div>
        </motion.div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px clamp(24px,5vw,48px) 100px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: 13, fontWeight: 600, color: "#64B5F6", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 40 }}
        >
          Skills & Tools
        </motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {Object.entries(skills).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: 28, borderRadius: 14,
                background: "rgba(6,14,30,0.6)", border: "1px solid rgba(100,181,246,0.04)",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 16 }}>{category}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.map((s) => (
                  <span key={s} style={{
                    fontSize: 12, fontWeight: 500, padding: "5px 14px", borderRadius: 20,
                    background: "rgba(100,181,246,0.04)", color: "rgba(136,153,170,0.65)",
                    border: "1px solid rgba(100,181,246,0.05)",
                  }}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DESIGN PAGE ────────────────────────────────────────────────────────────

function DesignPage() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const allTags = ["All", ...new Set(designProjects.flatMap((p) => p.tags))];
  const filtered = filter === "All" ? designProjects : designProjects.filter((p) => p.tags.includes(filter));

  return (
    <div style={{ minHeight: "100vh", paddingTop: 72 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px clamp(24px,5vw,48px) 40px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>Design Projects</h1>
          <p style={{ color: "rgba(136,153,170,0.65)", fontSize: 15, marginTop: 8 }}>Selected work across product, brand, and interface design.</p>
        </motion.div>

        <div style={{ display: "flex", gap: 8, marginTop: 32, marginBottom: 40, flexWrap: "wrap" }}>
          {allTags.map((t) => (
            <button key={t} onClick={() => setFilter(t)} style={{
              fontSize: 12, fontWeight: 500, padding: "6px 16px", borderRadius: 20, cursor: "pointer",
              background: filter === t ? "rgba(100,181,246,0.1)" : "rgba(6,14,30,0.6)",
              color: filter === t ? "#64B5F6" : "rgba(136,153,170,0.6)",
              border: `1px solid ${filter === t ? "rgba(100,181,246,0.2)" : "rgba(100,181,246,0.04)"}`,
              transition: "all 0.25s",
            }}>{t}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 24 }}>
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} onClick={setSelected} index={i} />
          ))}
        </div>
        <MoreToCome />
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <img src={selected.image} alt={selected.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: "16px 16px 0 0" }} />
            <div style={{ padding: "28px 32px 36px" }}>
              <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{selected.title}</h2>
              <p style={{ color: "#64B5F6", fontSize: 13, fontWeight: 500, marginBottom: 16 }}>{selected.date}</p>
              <p style={{ color: "rgba(136,153,170,0.75)", fontSize: 14, lineHeight: 1.7 }}>{selected.description}</p>
              <div style={{ marginTop: 20 }}>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Tools Used</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {selected.tools.map((t) => (
                    <span key={t} style={{
                      fontSize: 12, padding: "4px 12px", borderRadius: 20,
                      background: "rgba(100,181,246,0.06)", color: "#64B5F6", border: "1px solid rgba(100,181,246,0.08)",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ─── ART PAGE ───────────────────────────────────────────────────────────────

function ArtPage() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const goPrev = useCallback(() => {
    setSelectedIdx((i) => (i > 0 ? i - 1 : artProjects.length - 1));
  }, []);
  const goNext = useCallback(() => {
    setSelectedIdx((i) => (i < artProjects.length - 1 ? i + 1 : 0));
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIdx === null) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIdx, goPrev, goNext]);

  const selected = selectedIdx !== null ? artProjects[selectedIdx] : null;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 72 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px clamp(24px,5vw,48px) 40px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>Art Gallery</h1>
          <p style={{ color: "rgba(136,153,170,0.65)", fontSize: 15, marginTop: 8 }}>Digital paintings, concept art, and visual explorations.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 24, marginTop: 40 }}>
          {artProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} onClick={() => setSelectedIdx(i)} index={i} />
          ))}
        </div>
        <MoreToCome />
      </div>

      <Modal isOpen={selectedIdx !== null} onClose={() => setSelectedIdx(null)}>
        {selected && (
          <div>
            <img src={selected.image} alt={selected.title} style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", borderRadius: "16px 16px 0 0" }} />
            <div style={{ padding: "28px 32px 36px" }}>
              <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{selected.title}</h2>
              <p style={{ color: "#64B5F6", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{selected.date}</p>
              {selected.medium && <p style={{ color: "rgba(136,153,170,0.4)", fontSize: 12, fontStyle: "italic", marginBottom: 16 }}>{selected.medium}</p>}
              <p style={{ color: "rgba(136,153,170,0.75)", fontSize: 14, lineHeight: 1.7 }}>{selected.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
                <button onClick={(e) => { e.stopPropagation(); goPrev(); }} style={{
                  background: "rgba(100,181,246,0.06)", border: "1px solid rgba(100,181,246,0.1)",
                  borderRadius: 10, padding: "8px 20px", cursor: "pointer", color: "#64B5F6", fontSize: 13, fontWeight: 500,
                }}>← Previous</button>
                <button onClick={(e) => { e.stopPropagation(); goNext(); }} style={{
                  background: "rgba(100,181,246,0.06)", border: "1px solid rgba(100,181,246,0.1)",
                  borderRadius: 10, padding: "8px 20px", cursor: "pointer", color: "#64B5F6", fontSize: 13, fontWeight: 500,
                }}>Next →</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ─── CODE PAGE ──────────────────────────────────────────────────────────────

function CodePage() {
  return (
    <div style={{ minHeight: "100vh", paddingTop: 72 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px clamp(24px,5vw,48px) 40px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>Code Projects</h1>
          <p style={{ color: "rgba(136,153,170,0.65)", fontSize: 15, marginTop: 8 }}>Open source tools, creative experiments, and engineering work.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 24, marginTop: 40 }}>
          {codeProjects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              onClick={() => window.open(p.github, "_blank", "noopener")}
              index={i}
            />
          ))}
        </div>
        <MoreToCome />
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleSetPage = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#030710",
      fontFamily: "'DM Sans', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet" />

      <SparkleShower />
      <AnimatedBackground />
      <MouseGlow />
      <Navbar currentPage={currentPage} setCurrentPage={handleSetPage} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {currentPage === "home" && <HomePage setCurrentPage={handleSetPage} />}
          {currentPage === "design" && <DesignPage />}
          {currentPage === "art" && <ArtPage />}
          {currentPage === "code" && <CodePage />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
