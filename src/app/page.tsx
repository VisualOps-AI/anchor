"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HomeMenu } from "@/components/home-menu";
import { BreathingCircle } from "@/components/breathing-circle";
import { WorryShredder } from "@/components/worry-shredder";
import { ClarityReframer } from "@/components/clarity-reframer";

type View = "home" | "breathe" | "vent" | "clarity";

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("home");

  const handleBreatheClick = () => setCurrentView("breathe");
  const handleVentClick = () => setCurrentView("vent");
  const handleClarityClick = () => setCurrentView("clarity");
  const handleGoHome = () => setCurrentView("home");
  const handleVentComplete = () => setCurrentView("breathe");

  return (
    <AnimatePresence mode="wait">
      {currentView === "home" && (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HomeMenu
            onBreatheClick={handleBreatheClick}
            onVentClick={handleVentClick}
            onClarityClick={handleClarityClick}
          />
        </motion.div>
      )}

      {currentView === "breathe" && (
        <motion.div
          key="breathe"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <BreathingCircle onClose={handleGoHome} />
        </motion.div>
      )}

      {currentView === "vent" && (
        <motion.div
          key="vent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <WorryShredder onComplete={handleVentComplete} />
        </motion.div>
      )}

      {currentView === "clarity" && (
        <motion.div
          key="clarity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ClarityReframer onComplete={handleGoHome} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
