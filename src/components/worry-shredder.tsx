"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WorryShredderProps {
  onComplete: () => void;
}

interface Particle {
  id: number;
  char: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
}

export function WorryShredder({ onComplete }: WorryShredderProps) {
  const [worry, setWorry] = useState("");
  const [isShredding, setIsShredding] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!worry.trim() || isShredding) return;

    // Create particles from each character with more dramatic spread
    const chars = worry.split("");
    const newParticles: Particle[] = chars.map((char, index) => ({
      id: index,
      char,
      x: (Math.random() - 0.5) * 1200,
      y: -Math.random() * 1000 - 200,
      rotation: (Math.random() - 0.5) * 1080,
      scale: Math.random() * 0.3 + 0.2,
      delay: index * 0.03,
    }));

    setParticles(newParticles);
    setIsShredding(true);

    // Trigger completion after animation
    setTimeout(() => {
      onComplete();
    }, 5000);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden"
      style={{
        backgroundColor: "#0a0a0a",
        background: "radial-gradient(ellipse at center, #141414 0%, #0a0a0a 50%, #050505 100%)",
      }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 50%)`,
        }}
      />

      {/* Ambient glow - changes color based on state */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          filter: "blur(80px)",
        }}
        animate={{
          background: isShredding
            ? "radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)"
            : isFocused
            ? "radial-gradient(circle, rgba(251, 146, 60, 0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(64, 64, 64, 0.1) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating particles in background */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/10"
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {!isShredding ? (
          <motion.div
            key="input-form"
            className="relative w-full max-w-md z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p
                style={{
                  fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                  fontWeight: 300,
                  fontSize: "0.75rem",
                  color: "rgba(255, 255, 255, 0.35)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Type your worry and release it
              </p>
            </motion.div>

            {/* Input Form */}
            <form onSubmit={handleSubmit}>
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {/* Input container with glassmorphism */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, rgba(38, 38, 38, 0.6) 0%, rgba(23, 23, 23, 0.8) 100%)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: isFocused
                      ? "1px solid rgba(251, 146, 60, 0.3)"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: isFocused
                      ? `
                        0 0 40px 5px rgba(251, 146, 60, 0.1),
                        0 0 80px 20px rgba(251, 146, 60, 0.05),
                        inset 0 1px 0 rgba(255, 255, 255, 0.05)
                      `
                      : `
                        0 0 40px 5px rgba(0, 0, 0, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.03)
                      `,
                    transition: "all 0.3s ease",
                  }}
                  animate={{
                    scale: isFocused ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    value={worry}
                    onChange={(e) => setWorry(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="What's weighing on you..."
                    autoFocus
                    className="w-full px-6 py-5 bg-transparent outline-none"
                    style={{
                      fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                      fontWeight: 300,
                      fontSize: "1.1rem",
                      color: "rgba(255, 255, 255, 0.9)",
                      caretColor: "#fb923c",
                    }}
                  />

                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px]"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(251, 146, 60, 0.6), transparent)",
                    }}
                    initial={{ width: "0%", left: "50%" }}
                    animate={{
                      width: isFocused ? "100%" : "0%",
                      left: isFocused ? "0%" : "50%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Glow effect when typing */}
                <AnimatePresence>
                  {worry && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        boxShadow: "0 0 60px rgba(239, 68, 68, 0.15), 0 0 100px rgba(239, 68, 68, 0.1)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit button */}
              <motion.div
                className="flex items-center justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <motion.button
                  type="submit"
                  disabled={!worry.trim()}
                  className="px-8 py-4 rounded-2xl cursor-pointer disabled:cursor-not-allowed"
                  style={{
                    background: worry
                      ? "linear-gradient(145deg, rgba(239, 68, 68, 0.3) 0%, rgba(220, 38, 38, 0.4) 100%)"
                      : "rgba(255, 255, 255, 0.05)",
                    border: worry
                      ? "1px solid rgba(239, 68, 68, 0.4)"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: worry
                      ? "0 0 30px rgba(239, 68, 68, 0.25), 0 0 60px rgba(239, 68, 68, 0.15)"
                      : "none",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                  animate={{
                    scale: worry ? [1, 1.03, 1] : 1,
                    boxShadow: worry
                      ? [
                          "0 0 30px rgba(239, 68, 68, 0.25), 0 0 60px rgba(239, 68, 68, 0.15)",
                          "0 0 40px rgba(239, 68, 68, 0.35), 0 0 80px rgba(239, 68, 68, 0.2)",
                          "0 0 30px rgba(239, 68, 68, 0.25), 0 0 60px rgba(239, 68, 68, 0.15)",
                        ]
                      : "none",
                  }}
                  transition={{
                    duration: 2,
                    repeat: worry ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  whileHover={
                    worry
                      ? {
                          scale: 1.05,
                          boxShadow:
                            "0 0 50px rgba(239, 68, 68, 0.4), 0 0 100px rgba(239, 68, 68, 0.25)",
                        }
                      : {}
                  }
                  whileTap={worry ? { scale: 0.95 } : {}}
                >
                  <span
                    style={{
                      fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                      fontWeight: 400,
                      fontSize: "1rem",
                      color: worry ? "rgba(252, 165, 165, 0.95)" : "rgba(255, 255, 255, 0.3)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      textShadow: worry ? "0 0 20px rgba(239, 68, 68, 0.5)" : "none",
                    }}
                  >
                    Let it go
                  </span>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="shredding"
            className="relative flex items-center justify-center z-10"
            style={{ width: "100%", height: "300px" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {/* Explosion flash */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%)",
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />

            {/* Particles */}
            {particles.map((particle) => (
              <motion.span
                key={particle.id}
                className="absolute"
                style={{
                  fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                  fontSize: "1.8rem",
                  fontWeight: 300,
                  color: "rgba(255, 255, 255, 0.9)",
                  textShadow: `
                    0 0 10px rgba(239, 68, 68, 0.8),
                    0 0 20px rgba(239, 68, 68, 0.5),
                    0 0 30px rgba(239, 68, 68, 0.3)
                  `,
                }}
                initial={{
                  x: (particle.id - particles.length / 2) * 14,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  opacity: 0,
                  scale: particle.scale,
                  rotate: particle.rotation,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.23, 1, 0.32, 1],
                  delay: particle.delay,
                }}
              >
                {particle.char}
              </motion.span>
            ))}

            {/* Release message */}
            <motion.div
              className="absolute flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Checkmark circle */}
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(145deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.3) 100%)",
                  border: "1px solid rgba(34, 197, 94, 0.4)",
                  boxShadow: "0 0 40px rgba(34, 197, 94, 0.3), 0 0 80px rgba(34, 197, 94, 0.15)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, duration: 0.4, type: "spring" }}
              >
                <motion.svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(134, 239, 172, 0.9)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.3, duration: 0.4 }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
              </motion.div>

              <motion.p
                style={{
                  fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "rgba(134, 239, 172, 0.9)",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  textShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                Released
              </motion.p>

              <motion.p
                style={{
                  fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                  fontWeight: 300,
                  fontSize: "0.7rem",
                  color: "rgba(255, 255, 255, 0.4)",
                  letterSpacing: "0.15em",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                Now, breathe...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WorryShredder;
