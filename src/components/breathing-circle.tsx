"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

interface BreathingCircleProps {
  onClose?: () => void;
}

export function BreathingCircle({ onClose }: BreathingCircleProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");
  const circleControls = useAnimation();
  const glowControls = useAnimation();

  useEffect(() => {
    let isCancelled = false;

    if (isPressed) {
      const animateBreathing = async () => {
        while (!isCancelled) {
          // Inhale - scale up over 5 seconds
          setPhase("inhale");
          await Promise.all([
            circleControls.start({
              scale: 1.6,
              transition: { duration: 5, ease: "easeInOut" },
            }),
            glowControls.start({
              opacity: 1,
              scale: 1.2,
              transition: { duration: 5, ease: "easeInOut" },
            }),
          ]);

          if (isCancelled) break;

          // Exhale - scale down over 5 seconds
          setPhase("exhale");
          await Promise.all([
            circleControls.start({
              scale: 1,
              transition: { duration: 5, ease: "easeInOut" },
            }),
            glowControls.start({
              opacity: 0.4,
              scale: 1,
              transition: { duration: 5, ease: "easeInOut" },
            }),
          ]);
        }
      };

      animateBreathing();
    } else {
      // Gentle reset when released
      circleControls.start({
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });
      glowControls.start({
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.8, ease: "easeOut" },
      });
      setPhase("inhale");
    }

    return () => {
      isCancelled = true;
    };
  }, [isPressed, circleControls, glowControls]);

  const handlePressStart = () => setIsPressed(true);
  const handlePressEnd = () => setIsPressed(false);

  return (
    <div
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Close button */}
      {onClose && (
        <motion.button
          onClick={onClose}
          className="absolute top-6 left-6 z-50 flex items-center justify-center w-10 h-10 rounded-full"
          style={{
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
      )}

      {/* Ambient background glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 70%)",
        }}
        animate={glowControls}
        initial={{ opacity: 0, scale: 0.8 }}
      />

      {/* Outer pulsing glow rings */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, transparent 30%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)",
        }}
        animate={{
          scale: isPressed ? [1, 1.3, 1] : 1,
          opacity: isPressed ? [0.5, 0.8, 0.5] : 0,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main breathing circle */}
      <motion.div
        className="relative flex items-center justify-center cursor-pointer select-none"
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: isPressed
            ? "radial-gradient(circle at 30% 30%, #22d3ee 0%, #0891b2 50%, #0e7490 100%)"
            : "radial-gradient(circle at 30% 30%, #1e3a4a 0%, #164e63 50%, #0c4a5e 100%)",
          boxShadow: isPressed
            ? `
              0 0 60px 10px rgba(34, 211, 238, 0.6),
              0 0 120px 40px rgba(6, 182, 212, 0.4),
              0 0 200px 80px rgba(6, 182, 212, 0.2),
              0 0 300px 120px rgba(6, 182, 212, 0.1),
              inset 0 0 60px rgba(255, 255, 255, 0.1)
            `
            : `
              0 0 30px 5px rgba(6, 182, 212, 0.2),
              0 0 60px 10px rgba(6, 182, 212, 0.1),
              inset 0 0 30px rgba(255, 255, 255, 0.05)
            `,
          transition: "background 0.5s ease, box-shadow 0.5s ease",
        }}
        animate={circleControls}
        initial={{ scale: 1 }}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        whileHover={{ scale: isPressed ? undefined : 1.05 }}
      >
        {/* Inner highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: "60%",
            height: "60%",
            top: "10%",
            left: "10%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Text */}
        <AnimatePresence mode="wait">
          <motion.span
            key={isPressed ? phase : "hold"}
            className="relative z-10 uppercase tracking-[0.3em]"
            style={{
              fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
              fontWeight: 300,
              fontSize: "1rem",
              color: isPressed ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.6)",
              textShadow: isPressed
                ? "0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4)"
                : "none",
              letterSpacing: "0.3em",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {isPressed ? (phase === "inhale" ? "Inhale" : "Exhale") : "Hold"}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* Subtle instruction text */}
      <motion.p
        className="absolute bottom-12 text-center"
        style={{
          fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
          fontWeight: 300,
          fontSize: "0.75rem",
          color: "rgba(255, 255, 255, 0.3)",
          letterSpacing: "0.2em",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isPressed ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        PRESS AND HOLD TO BEGIN
      </motion.p>
    </div>
  );
}

export default BreathingCircle;
