import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

const SurpriseSection = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const triggerSurprise = () => {
    setIsRevealed(true);
    
    // Confetti explosion
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 }, colors: ['#ffb6c1', '#ff69b4', '#ffd700', '#ffffff'] });
    }, 250);
  };

  return (
    <section className="py-32 px-4 relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {!isRevealed ? (
          <motion.button
            exit={{ opacity: 0, scale: 0, filter: "blur(10px)" }}
            onClick={triggerSurprise}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,182,193,0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 text-white font-serif text-2xl md:text-3xl shadow-[0_0_20px_rgba(255,182,193,0.5)] flex items-center gap-4 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span>Open Your Surprise</span>
            <Heart className="w-8 h-8 fill-white animate-pulse" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center z-10"
          >
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight text-glow">
              You are my favorite chapter, <br/>
              <span className="text-rose-300">my favorite memory,</span> <br/>
              and my favorite person.
            </h2>
            <p className="text-2xl text-gold-400 font-serif mt-8 font-bold tracking-widest uppercase">
              Happy Birthday My Love ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SurpriseSection;
