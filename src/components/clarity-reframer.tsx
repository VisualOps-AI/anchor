"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClarityReframerProps {
  onComplete: () => void;
}

export function ClarityReframer({ onComplete }: ClarityReframerProps) {
  const [clarity, setClarity] = useState("");
  const [isTransforming, setIsTransforming] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarity.trim() || isTransforming) return;

    setIsTransforming(true);

    // After text transforms into orb, show SAVED
    setTimeout(() => {
      setShowSaved(true);
    }, 2000);

    // Redirect to home after 5 seconds (SAVED visible for ~3 seconds)
    setTimeout(() => {
      onComplete();
    }, 5000);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden"
      style={{
        backgroundColor: "#0a0a0a",
        background: "radial-gradient(ellipse at center, #1a1408 0%, #0a0a0a 50%, #050505 100%)",
      }}
    >
      {/* Close button with safe-area fix */}
      <motion.button
        onClick={onComplete}
        className="absolute z-50 flex items-center justify-center w-10 h-10 rounded-full"
        style={{
          top: "max(1.5rem, env(safe-area-inset-top, 1.5rem))",
          left: "max(1.5rem, env(safe-area-inset-left, 1.5rem))",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </motion.button>

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.03) 0%, transparent 50%)`,
        }}
      />

      {/* Ambient glow - warm gold */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          filter: "blur(80px)",
        }}
        animate={{
          background: isTransforming
            ? "radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%)"
            : isFocused
            ? "radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(180, 140, 60, 0.08) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Floating particles in background - gold themed */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 3) * 20}%`,
            backgroundColor: "rgba(251, 191, 36, 0.15)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
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
        {!isTransforming ? (
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
                  color: "rgba(251, 191, 36, 0.6)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Name one thing that went well today
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
                {/* Input container with glassmorphism - gold themed */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, rgba(50, 40, 20, 0.6) 0%, rgba(30, 25, 15, 0.8) 100%)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: isFocused
                      ? "1px solid rgba(251, 191, 36, 0.4)"
                      : "1px solid rgba(251, 191, 36, 0.15)",
                    boxShadow: isFocused
                      ? `
                        0 0 40px 5px rgba(251, 191, 36, 0.15),
                        0 0 80px 20px rgba(251, 191, 36, 0.08),
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
                    value={clarity}
                    onChange={(e) => setClarity(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Something good happened..."
                    autoFocus
                    className="w-full px-6 py-5 bg-transparent outline-none"
                    style={{
                      fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                      fontWeight: 300,
                      fontSize: "1.1rem",
                      color: "rgba(255, 255, 255, 0.9)",
                      caretColor: "#fbbf24",
                    }}
                  />

                  {/* Animated underline - gold */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px]"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.6), transparent)",
                    }}
                    initial={{ width: "0%", left: "50%" }}
                    animate={{
                      width: isFocused ? "100%" : "0%",
                      left: isFocused ? "0%" : "50%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Glow effect when typing - gold */}
                <AnimatePresence>
                  {clarity && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        boxShadow: "0 0 60px rgba(251, 191, 36, 0.2), 0 0 100px rgba(251, 191, 36, 0.1)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit button - gold themed */}
              <motion.div
                className="flex items-center justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <motion.button
                  type="submit"
                  disabled={!clarity.trim()}
                  className="px-8 py-4 rounded-2xl cursor-pointer disabled:cursor-not-allowed"
                  style={{
                    background: clarity
                      ? "linear-gradient(145deg, rgba(251, 191, 36, 0.3) 0%, rgba(217, 119, 6, 0.4) 100%)"
                      : "rgba(255, 255, 255, 0.05)",
                    border: clarity
                      ? "1px solid rgba(251, 191, 36, 0.4)"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: clarity
                      ? "0 0 30px rgba(251, 191, 36, 0.25), 0 0 60px rgba(251, 191, 36, 0.15)"
                      : "none",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                  animate={{
                    scale: clarity ? [1, 1.03, 1] : 1,
                    boxShadow: clarity
                      ? [
                          "0 0 30px rgba(251, 191, 36, 0.25), 0 0 60px rgba(251, 191, 36, 0.15)",
                          "0 0 40px rgba(251, 191, 36, 0.35), 0 0 80px rgba(251, 191, 36, 0.2)",
                          "0 0 30px rgba(251, 191, 36, 0.25), 0 0 60px rgba(251, 191, 36, 0.15)",
                        ]
                      : "none",
                  }}
                  transition={{
                    duration: 2,
                    repeat: clarity ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  whileHover={
                    clarity
                      ? {
                          scale: 1.05,
                          boxShadow:
                            "0 0 50px rgba(251, 191, 36, 0.4), 0 0 100px rgba(251, 191, 36, 0.25)",
                        }
                      : {}
                  }
                  whileTap={clarity ? { scale: 0.95 } : {}}
                >
                  <span
                    style={{
                      fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                      fontWeight: 400,
                      fontSize: "1rem",
                      color: clarity ? "rgba(253, 230, 138, 0.95)" : "rgba(255, 255, 255, 0.3)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      textShadow: clarity ? "0 0 20px rgba(251, 191, 36, 0.5)" : "none",
                    }}
                  >
                    Save Moment
                  </span>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="transforming"
            className="relative flex items-center justify-center z-10"
            style={{ width: "100%", height: "300px" }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {/* Text that glows gold and scales up before morphing */}
            {!showSaved && (
              <motion.div
                className="absolute flex items-center justify-center"
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [1, 1.15, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  times: [0, 0.4, 1],
                  ease: "easeInOut"
                }}
              >
                <span
                  className="text-amber-400 text-center px-4"
                  style={{
                    fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                    fontWeight: 400,
                    fontSize: "1.5rem",
                    textShadow: `
                      0 0 20px rgba(251, 191, 36, 0.8),
                      0 0 40px rgba(251, 191, 36, 0.6),
                      0 0 60px rgba(251, 191, 36, 0.4),
                      0 0 80px rgba(251, 191, 36, 0.2)
                    `,
                    maxWidth: "300px",
                    wordBreak: "break-word",
                  }}
                >
                  {clarity}
                </span>
              </motion.div>
            )}

            {/* Pulsing golden orb */}
            <motion.div
              className="absolute rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #fde68a 0%, #fbbf24 30%, #d97706 70%, #92400e 100%)",
                boxShadow: `
                  0 0 60px rgba(251, 191, 36, 0.8),
                  0 0 120px rgba(251, 191, 36, 0.5),
                  0 0 180px rgba(251, 191, 36, 0.3),
                  inset 0 0 30px rgba(255, 255, 255, 0.3)
                `,
              }}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{
                width: showSaved ? [80, 100, 0] : [0, 80],
                height: showSaved ? [80, 100, 0] : [0, 80],
                opacity: showSaved ? [1, 1, 0] : [0, 1],
                boxShadow: showSaved
                  ? [
                      "0 0 60px rgba(251, 191, 36, 0.8), 0 0 120px rgba(251, 191, 36, 0.5), 0 0 180px rgba(251, 191, 36, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.3)",
                      "0 0 100px rgba(251, 191, 36, 1), 0 0 200px rgba(251, 191, 36, 0.6), 0 0 300px rgba(251, 191, 36, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.4)",
                      "0 0 0px rgba(251, 191, 36, 0), 0 0 0px rgba(251, 191, 36, 0), 0 0 0px rgba(251, 191, 36, 0), inset 0 0 0px rgba(255, 255, 255, 0)"
                    ]
                  : "0 0 60px rgba(251, 191, 36, 0.8), 0 0 120px rgba(251, 191, 36, 0.5), 0 0 180px rgba(251, 191, 36, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.3)"
              }}
              transition={{
                duration: showSaved ? 1.5 : 1,
                ease: "easeInOut",
              }}
            />

            {/* Soft pulsing animation on the orb */}
            {!showSaved && (
              <motion.div
                className="absolute w-20 h-20 rounded-full"
                style={{
                  background: "transparent",
                  boxShadow: "0 0 80px rgba(251, 191, 36, 0.6)",
                }}
                initial={{ scale: 1, opacity: 0 }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              />
            )}

            {/* SAVED message */}
            <AnimatePresence>
              {showSaved && (
                <motion.div
                  className="absolute flex flex-col items-center gap-4"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.p
                    style={{
                      fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
                      fontWeight: 300,
                      fontSize: "2.5rem",
                      color: "rgba(253, 230, 138, 0.95)",
                      letterSpacing: "0.4em",
                      textTransform: "uppercase",
                      textShadow: `
                        0 0 30px rgba(251, 191, 36, 0.8),
                        0 0 60px rgba(251, 191, 36, 0.5),
                        0 0 90px rgba(251, 191, 36, 0.3)
                      `,
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Saved
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ClarityReframer;
