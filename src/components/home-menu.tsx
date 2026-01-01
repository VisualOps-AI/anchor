"use client";

import { motion } from "framer-motion";

interface HomeMenuProps {
  onBreatheClick: () => void;
  onVentClick: () => void;
  onClarityClick: () => void;
}

export function HomeMenu({ onBreatheClick, onVentClick, onClarityClick }: HomeMenuProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const pulseTransition = {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen p-6 overflow-hidden"
      style={{
        backgroundColor: "#0a0a0a",
        background: "radial-gradient(ellipse at center, #171717 0%, #0a0a0a 50%, #050505 100%)",
      }}
    >
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center"
        style={{
          paddingTop: "max(1.5rem, env(safe-area-inset-top, 1.5rem))",
          paddingBottom: "0.75rem",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span
          className="text-zinc-500 text-xs font-bold uppercase"
          style={{
            letterSpacing: "0.5em",
          }}
        >
          A N C H O R
        </span>
      </motion.header>

      {/* Footer */}
      <motion.footer
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center"
        style={{
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))",
          paddingTop: "0.75rem",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <span
          className="text-zinc-600 text-xs"
          style={{
            letterSpacing: "0.15em",
          }}
        >
          v1.0 • System Active
        </span>
      </motion.footer>

      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
        }}
      />

      {/* Ambient glow spots */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        className="relative flex flex-col gap-4 w-full max-w-sm z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Breathe Card - Glowing Portal */}
        <motion.button
          variants={cardVariants}
          onClick={onBreatheClick}
          className="relative flex flex-col items-center justify-center p-6 rounded-3xl cursor-pointer overflow-hidden"
          style={{
            height: "180px",
            background: "linear-gradient(145deg, rgba(30, 58, 138, 0.8) 0%, rgba(22, 78, 99, 0.8) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(34, 211, 238, 0.2)",
            boxShadow: `
              0 0 40px 5px rgba(34, 211, 238, 0.15),
              0 0 80px 20px rgba(6, 182, 212, 0.1),
              0 0 120px 40px rgba(6, 182, 212, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              inset 0 -1px 0 rgba(0, 0, 0, 0.2)
            `,
          }}
          animate={{
            scale: [1, 1.02, 1],
            boxShadow: [
              `0 0 40px 5px rgba(34, 211, 238, 0.15), 0 0 80px 20px rgba(6, 182, 212, 0.1), 0 0 120px 40px rgba(6, 182, 212, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2)`,
              `0 0 50px 10px rgba(34, 211, 238, 0.2), 0 0 100px 30px rgba(6, 182, 212, 0.15), 0 0 150px 50px rgba(6, 182, 212, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2)`,
              `0 0 40px 5px rgba(34, 211, 238, 0.15), 0 0 80px 20px rgba(6, 182, 212, 0.1), 0 0 120px 40px rgba(6, 182, 212, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2)`,
            ],
          }}
          transition={pulseTransition}
          whileHover={{
            scale: 1.05,
            boxShadow: `
              0 0 60px 15px rgba(34, 211, 238, 0.3),
              0 0 120px 40px rgba(6, 182, 212, 0.2),
              0 0 180px 60px rgba(6, 182, 212, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.15),
              inset 0 -1px 0 rgba(0, 0, 0, 0.2)
            `,
            borderColor: "rgba(34, 211, 238, 0.4)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Inner glow gradient overlay */}
          <div
            className="absolute inset-0 rounded-3xl opacity-60"
            style={{
              background: "radial-gradient(ellipse at 30% 20%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)",
            }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />

          {/* Circle Icon */}
          <motion.div
            className="relative mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div
              className="w-14 h-14 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #67e8f9 0%, #22d3ee 40%, #06b6d4 100%)",
                boxShadow: `
                  0 0 40px rgba(34, 211, 238, 0.6),
                  0 0 60px rgba(6, 182, 212, 0.4),
                  inset 0 0 20px rgba(255, 255, 255, 0.3)
                `,
              }}
            />
            {/* Icon inner highlight */}
            <div
              className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
              }}
            />
          </motion.div>

          {/* Label */}
          <span
            className="relative text-2xl tracking-[0.25em] uppercase"
            style={{
              fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
              fontWeight: 300,
              color: "rgba(255, 255, 255, 0.95)",
              textShadow: "0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(6, 182, 212, 0.5)",
            }}
          >
            Breathe
          </span>
        </motion.button>

        {/* Vent Card - Glowing Portal */}
        <motion.button
          variants={cardVariants}
          onClick={onVentClick}
          className="relative flex flex-col items-center justify-center p-6 rounded-3xl cursor-pointer overflow-hidden"
          style={{
            height: "180px",
            background: "linear-gradient(145deg, rgba(38, 38, 38, 0.8) 0%, rgba(63, 63, 70, 0.8) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: `
              0 0 40px 5px rgba(255, 255, 255, 0.05),
              0 0 80px 20px rgba(255, 255, 255, 0.03),
              0 0 120px 40px rgba(255, 255, 255, 0.02),
              inset 0 1px 0 rgba(255, 255, 255, 0.08),
              inset 0 -1px 0 rgba(0, 0, 0, 0.3)
            `,
          }}
          animate={{
            scale: [1, 1.02, 1],
            boxShadow: [
              `0 0 40px 5px rgba(255, 255, 255, 0.05), 0 0 80px 20px rgba(255, 255, 255, 0.03), 0 0 120px 40px rgba(255, 255, 255, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.3)`,
              `0 0 50px 10px rgba(255, 255, 255, 0.08), 0 0 100px 30px rgba(255, 255, 255, 0.05), 0 0 150px 50px rgba(255, 255, 255, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.3)`,
              `0 0 40px 5px rgba(255, 255, 255, 0.05), 0 0 80px 20px rgba(255, 255, 255, 0.03), 0 0 120px 40px rgba(255, 255, 255, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.3)`,
            ],
          }}
          transition={pulseTransition}
          whileHover={{
            scale: 1.05,
            boxShadow: `
              0 0 60px 15px rgba(255, 255, 255, 0.1),
              0 0 120px 40px rgba(255, 255, 255, 0.06),
              0 0 180px 60px rgba(255, 255, 255, 0.03),
              inset 0 1px 0 rgba(255, 255, 255, 0.12),
              inset 0 -1px 0 rgba(0, 0, 0, 0.3)
            `,
            borderColor: "rgba(255, 255, 255, 0.2)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Inner glow gradient overlay */}
          <div
            className="absolute inset-0 rounded-3xl opacity-40"
            style={{
              background: "radial-gradient(ellipse at 70% 80%, rgba(161, 161, 170, 0.2) 0%, transparent 50%)",
            }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeInOut",
            }}
          />

          {/* Wind Icon */}
          <motion.div
            className="relative mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3)) drop-shadow(0 0 40px rgba(255,255,255,0.2))",
              }}
            >
              <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
              <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
              <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
            </svg>
          </motion.div>

          {/* Label */}
          <span
            className="relative text-2xl tracking-[0.25em] uppercase"
            style={{
              fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
              fontWeight: 300,
              color: "rgba(255, 255, 255, 0.8)",
              textShadow: "0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2)",
            }}
          >
            Vent
          </span>
        </motion.button>

        {/* Clarity Card - Glowing Amber Portal */}
        <motion.button
          variants={cardVariants}
          onClick={onClarityClick}
          className="relative flex flex-col items-center justify-center p-6 rounded-3xl cursor-pointer overflow-hidden"
          style={{
            height: "180px",
            background: "linear-gradient(145deg, rgba(120, 53, 15, 0.8) 0%, rgba(154, 52, 18, 0.8) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(251, 191, 36, 0.25)",
            boxShadow: `
              0 0 40px 5px rgba(251, 191, 36, 0.15),
              0 0 80px 20px rgba(251, 191, 36, 0.08),
              0 0 120px 40px rgba(217, 119, 6, 0.05),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              inset 0 -1px 0 rgba(0, 0, 0, 0.2)
            `,
          }}
          animate={{
            scale: [1, 1.02, 1],
            boxShadow: [
              `0 0 40px 5px rgba(251, 191, 36, 0.15), 0 0 80px 20px rgba(251, 191, 36, 0.08), 0 0 120px 40px rgba(217, 119, 6, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2)`,
              `0 0 50px 10px rgba(251, 191, 36, 0.2), 0 0 100px 30px rgba(251, 191, 36, 0.12), 0 0 150px 50px rgba(217, 119, 6, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2)`,
              `0 0 40px 5px rgba(251, 191, 36, 0.15), 0 0 80px 20px rgba(251, 191, 36, 0.08), 0 0 120px 40px rgba(217, 119, 6, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2)`,
            ],
          }}
          transition={pulseTransition}
          whileHover={{
            scale: 1.05,
            boxShadow: `
              0 0 60px 15px rgba(251, 191, 36, 0.3),
              0 0 120px 40px rgba(251, 191, 36, 0.18),
              0 0 180px 60px rgba(217, 119, 6, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.15),
              inset 0 -1px 0 rgba(0, 0, 0, 0.2)
            `,
            borderColor: "rgba(251, 191, 36, 0.4)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Inner glow gradient overlay */}
          <div
            className="absolute inset-0 rounded-3xl opacity-50"
            style={{
              background: "radial-gradient(ellipse at 30% 20%, rgba(251, 191, 36, 0.35) 0%, transparent 50%)",
            }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2.2,
              ease: "easeInOut",
            }}
          />

          {/* Sun/Sparkle Icon */}
          <motion.div
            className="relative mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(253, 230, 138, 0.9)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.6)) drop-shadow(0 0 40px rgba(251, 191, 36, 0.4))",
              }}
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </motion.div>

          {/* Label */}
          <span
            className="relative text-2xl tracking-[0.25em] uppercase"
            style={{
              fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
              fontWeight: 300,
              color: "rgba(253, 230, 138, 0.95)",
              textShadow: "0 0 30px rgba(251, 191, 36, 0.8), 0 0 60px rgba(251, 191, 36, 0.5)",
            }}
          >
            Clarity
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default HomeMenu;
