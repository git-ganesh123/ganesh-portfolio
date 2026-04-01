import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── DATA ───────────────────────────────────────────────────────────────────

const designProjects = [
  {
    id: 1,
    title: "FireUp Energy Drink",
    description: "Designed prototype cans for the Fire Up Energy drink brand which was promoted at the Australian Fitness Expo 2026",
    image: "fireup.png",
    tools: ["Figma", "NanoBanana", "Affinity Designer"],
    date: "2026",
    tags: ["UI/UX", "Product Design", "Graphic Design"],
  },
  {
    id: 2,
    title: "Aerox Breathing",
    description: "Helped design the website for the Nasal-Strip Company Aerox.",
    image: "aerox.png",
    tools: ["Cursor", "CSS", "Figma"],
    date: "2025",
    tags: ["Branding", "Web Design", "Marketing"],
  },
];

const artProjects = [
  {
    id: 1,
    title: "Idol Portrait",
    description: "A 4-foot tall hyperrealistic, detailed multimedia artwork of the Lord Ganesh - inspired by the Hindu God I was named after.",
    image: "art1.png",
    date: "2023",
    medium: "Charcoal, Paint, Colour Pencil",
  },
  {
    id: 2,
    title: "AI Visualised",
    description: "I had this idea of an empty room that continued to have the feeling of a presence that used to reside there. I had no idea how to visualise it and ended up using AI to visualise a base and sketched this artwork based on it.",
    image: "art2.jpg",
    date: "2023",
    medium: "Graphite Pencils",
  },
  {
    id: 3,
    title: "Hyperrealism",
    description: "My first succesful hyperrealism attempt using only HB pencils.",
    image: "art3.jpg",
    date: "2024",
    medium: "Pencil Sketching",
  },
  {
    id: 4,
    title: "Awe",
    description: "Using a block painting technique, I carried out this artwork from start to finish on a piece of scrap plywood. I wanted to show the fear and shock present in innocent children involved in war.",
    image: "art4.jpg",
    date: "2024",
    medium: "Acrylic Paint",
  },
  {
    id: 5,
    title: "Michaelangelo Revamped",
    description: "My Graphite Pencil take on one of the most famous artworks of all time.",
    image: "art5.jpg",
    date: "2024",
    medium: "Pencil Sketch",
  },
];

const codeProjects = [
  {
    id: 1,
    title: "Reel Radar",
    description: "A web application that allows content creators to discover and track popular content on Youtube, Tiktok and Instagram.",
    image: "reelradarimage.png",
    status: "completed",
    date: "2026",
    github: "https://github.com/Git-Ganesh123/reel-radar",
    tags: ["TypeScript", "Claude", "Vercel", "21st.dev", "Supabase", "Git"],
  },
  {
    id: 2,
    title: "RuTimer",
    description: "A Rubik's cube timer that allows you to track your time and progress. The Solution generator is a work in progress. The aim is to make a simplistic, user friendly timer that has every tool needed to track solve progress while also helping beginners find smart solutions.",
    image: "Rutimer.png",
    status: "wip",
    date: "In Progress (2026)",
    github: "https://github.com/Git-Ganesh123/Rutimer",
    tags: ["Javascript", "CSS", "Github Pages", "HTML"],
  },
];

const skills = {
  Design: ["Figma", "Illustrator", "Fusion360", "Web Design"],
  Art: ["Digital Art", "Charcoal Art", "Painting", "Graphite Sketching"],
  Code: ["Python", "JavaScript", "Git", "Next.js", "Fullstack Development"],
};

const workExperience = [
  {
    title: "Total E-Biz Solutions - Software Engineer Intern",
    date: "2024 June - 2024 September",
    description: "During my 3-month internship, I gained hands-on experience in Python, and chatbot development. I worked on debugging code for a bot and learned the fundamentals of LLM models. I also implemented Azure AI services, including computer and custom vision, to enhance task efficiency. Additionally, I improved my programming skills through online courses and side projects in Python and JavaScript. I contributed to building an HR bot by making use of the Google Maps API and enhancing usability with Copilot Studio features. My work also involved automating processes with Power Automate and using the Copilot adaptive card designer.",
  },
  {
    title: "Waiter & Chef",
    date: "2024 November - 2025 February",
    description: "Worked as a fast food employee in one of Australia's biggest food chains. I learned the ins-and-outs of meeting daily quotas, food-safety requirements and working in fast-paced environments.",
  },
];

const education = [
  {
    school: "University of Melbourne",
    date: "2024 - Present",
    description: "Bachelor of Design (Computing and Software Systems)",
  },
  {
    school: "United World College SEA Singapore",
    date: "2022 - 2024",
    description: "HL - Math Analysis & Approaches, Computer Science, Visual Arts. SL - Spanish B, Psychology, English",
  },
  {
    school: "NPS International",
    date: "2018 - 2022",
    description: "Completed IGCSE curriculum with 10 A*",
  },
];

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

    const createParticles = () => {
      const PARTICLE_COUNT = 35; // fewer sparkles → more subtle
      const particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const startX = -80 + Math.random() * (W * 0.4);
        const startY = -40 - Math.random() * 260;
        particles.push({
          x: startX,
          y: startY,
          size: Math.random() * 1.6 + 0.4, // smaller sparkles
          speedX: 1.4 + Math.random() * 1.6,
          speedY: 1.8 + Math.random() * 2.2,
          opacity: 0.6 + Math.random() * 0.4, // a bit brighter
          twinkleSpeed: 0.03 + Math.random() * 0.05,
          twinklePhase: Math.random() * Math.PI * 2,
          hue: 195 + Math.random() * 40,
          delay: Math.random() * 40,
          tick: 0,
        });
      }
      return particles;
    };

    let particles = createParticles();
    let frame = 0;
    let raf;
    const maxFrames = 160;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      let allDone = true;
      for (const p of particles) {
        p.tick++;
        if (p.tick < p.delay) { allDone = false; continue; }

        p.x += p.speedX;
        p.y += p.speedY;

        const twinkle = 0.5 + 0.7 * Math.sin(p.twinklePhase + p.tick * p.twinkleSpeed);
        const fadeIn = Math.min(1, (p.tick - p.delay) / 10);
        const fadeOut = frame > maxFrames - 40 ? Math.max(0, 1 - (frame - (maxFrames - 40)) / 40) : 1;
        const alpha = p.opacity * twinkle * fadeIn * fadeOut;

        if (p.y < H + 10 && p.x < W + 10) allDone = false;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(${p.hue}, 90%, 82%)`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 80%, 1)`;
        ctx.shadowBlur = 12;

        // 4-point star sparkle
        const s = p.size * (0.7 + twinkle * 0.6);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - s * 2.0);
        ctx.lineTo(p.x + s * 0.4, p.y - s * 0.4);
        ctx.lineTo(p.x + s * 2.0, p.y);
        ctx.lineTo(p.x + s * 0.4, p.y + s * 0.4);
        ctx.lineTo(p.x, p.y + s * 2.0);
        ctx.lineTo(p.x - s * 0.4, p.y + s * 0.4);
        ctx.lineTo(p.x - s * 2.0, p.y);
        ctx.lineTo(p.x - s * 0.4, p.y - s * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      if (frame < maxFrames && !allDone) {
        raf = requestAnimationFrame(draw);
      } else {
        // pause, then trigger another subtle shower
        setTimeout(() => {
          frame = 0;
          particles = createParticles();
          raf = requestAnimationFrame(draw);
        }, 7000); // every ~7 seconds
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
      className={`relative inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 hover:scale-105 h-12 px-10 rounded-full ${className}`}
      style={{ color: "#64B5F6", minWidth: 140 }}
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
    { key: "code", label: "Code" },
    { key: "art", label: "Art" },
    { key: "design", label: "Design" },
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
        style={{ cursor: "pointer", fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em", color: "#fff" }}
      >
        Ganesh's <span style={{ opacity: 0.45, fontWeight: 400 }}>Portfolio</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <button
          onClick={() => setCurrentPage("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: currentPage === "home" ? "#64B5F6" : "rgba(136,153,170,0.75)",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Home
        </button>
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: "6px 18px",
            borderRadius: 999,
            color: "#64B5F6",
            minWidth: 220,
          }}
        >
          <div
            className="absolute top-0 left-0 z-0 h-full w-full rounded-full"
            style={{
              boxShadow:
                "0 0 6px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08), inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.09), inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85), inset 1px 1px 1px -0.5px rgba(255,255,255,0.6), inset -1px -1px 1px -0.5px rgba(255,255,255,0.6), inset 0 0 6px 6px rgba(255,255,255,0.12), inset 0 0 2px 2px rgba(255,255,255,0.06), 0 0 12px rgba(0,0,0,0.15)",
            }}
          />
          <div
            className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-full"
            style={{
              backdropFilter: "blur(12px) saturate(1.4)",
              background: "rgba(100,181,246,0.08)",
            }}
          />
          {links
            .filter((l) => l.key !== "home")
            .map((l) => (
              <button
                key={l.key}
                onClick={() => setCurrentPage(l.key)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  color: currentPage === l.key ? "#E3F2FD" : "rgba(197,218,242,0.86)",
                  fontSize: 13,
                  fontWeight: currentPage === l.key ? 600 : 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "4px 6px",
                }}
              >
                {l.label}
              </button>
            ))}
        </div>
      </div>
    </motion.nav>
  );
}

// ─── MODAL ──────────────────────────────────────────────────────────────────

function Modal({ isOpen, onClose, children, contentStyle = {} }) {
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
              ...contentStyle,
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
          <h1 style={{ fontSize: "clamp(40px,5.4vw,60px)", fontWeight: 700, color: "#fff", lineHeight: 1.08, margin: 0, letterSpacing: "-0.03em" }}>
            Ganesh's
            <br />
            <span style={{ color: "#64B5F6" }}>Portfolio</span>
          </h1>
          <p style={{ fontSize: 16, color: "#64B5F6", marginTop: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Designer · Artist · Developer
          </p>
          <p style={{ color: "rgba(136,153,170,0.75)", fontSize: 15, lineHeight: 1.75, marginTop: 28, maxWidth: 460 }}>
            Hi! I'm Ganesh, a second year computer science student at the University of Melbourne, pursuing a Bachelor of Design. 
            I major in Computing and Software Systems and have a strong passion for creation. Whether it may be in web development,product design
            or even visual arts, I am always looking for new challenges and opportunities to create something new.

            Outside of school, I am a ranked Rubik's cube speedsolver and an avid runner(I recently completed my first marathon!). 
            I love pushing my boundaries in the gym and in sports such as football as well. 
            I thrive in optimistic and sociable environments and bring a positive energy to any room I walk into.

            Check out my work - I'm sure you'll love it!
            
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <LiquidGlassButton onClick={() => setCurrentPage("design")}>
              Browse
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
          style={{ fontSize: 13, fontWeight: 600, color: "#64B5F6", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}
        >
          Work Experience
        </motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 56 }}>
          {workExperience.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: 28, borderRadius: 14,
                background: "rgba(6,14,30,0.6)", border: "1px solid rgba(100,181,246,0.04)",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{job.title}</h3>
              <p style={{ color: "#64B5F6", fontSize: 12, fontWeight: 500, marginBottom: 14, letterSpacing: "0.05em", textTransform: "uppercase" }}>{job.date}</p>
              <p style={{ color: "rgba(136,153,170,0.75)", fontSize: 14, lineHeight: 1.7 }}>{job.description}</p>
            </motion.div>
          ))}
        </div>

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

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: 13, fontWeight: 600, color: "#64B5F6", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 56, marginBottom: 24 }}
        >
          Education
        </motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {education.map((item, i) => (
            <motion.div
              key={item.school}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: 28, borderRadius: 14,
                background: "rgba(6,14,30,0.6)", border: "1px solid rgba(100,181,246,0.04)",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{item.school}</h3>
              <p style={{ color: "#64B5F6", fontSize: 12, fontWeight: 500, marginBottom: 14, letterSpacing: "0.05em", textTransform: "uppercase" }}>{item.date}</p>
              <p style={{ color: "rgba(136,153,170,0.75)", fontSize: 14, lineHeight: 1.7 }}>{item.description}</p>
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
          <h1 style={{ fontSize: 40, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>Design Projects</h1>
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
          <h1 style={{ fontSize: 40, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>Art Gallery</h1>
          <p style={{ color: "rgba(136,153,170,0.65)", fontSize: 15, marginTop: 8 }}>Digital paintings, concept art, and visual explorations.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 24, marginTop: 40 }}>
          {artProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} onClick={() => setSelectedIdx(i)} index={i} />
          ))}
        </div>
        <MoreToCome />
      </div>

      <Modal
        isOpen={selectedIdx !== null}
        onClose={() => setSelectedIdx(null)}
        contentStyle={{ maxWidth: "min(96vw, 1400px)", width: "auto" }}
      >
        {selected && (
          <div>
            <img
              src={selected.image}
              alt={selected.title}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "70vh",
                objectFit: "contain",
                borderRadius: "16px 16px 0 0",
                background: "#02060f",
              }}
            />
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
          <h1 style={{ fontSize: 40, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>Code Projects</h1>
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
