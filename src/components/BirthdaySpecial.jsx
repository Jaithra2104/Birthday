import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { getPhotosByCategory } from '../data/photoUtils';

const BirthdaySpecial = () => {
  const [stage, setStage] = useState(0);
  const photos = getPhotosByCategory('birthday special');

  const triggerSurprise = () => {
    setStage(1);
    
    // After 3 seconds of "Make a wish", go to grand finale
    setTimeout(() => {
      setStage(2);
      fireConfetti();
    }, 3500);
  };

  const fireConfetti = () => {
    const duration = 7 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 40, spread: 360, ticks: 100, zIndex: 100 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Fire from both sides
      confetti({ ...defaults, particleCount, origin: { x: Math.random() * 0.2, y: Math.random() - 0.2 }, colors: ['#ffb6c1', '#ff69b4', '#ffd700', '#ffffff'] });
      confetti({ ...defaults, particleCount, origin: { x: 1 - Math.random() * 0.2, y: Math.random() - 0.2 }, colors: ['#ffb6c1', '#ff69b4', '#ffd700', '#ffffff'] });
    }, 250);
  };

  return (
    <section className="py-32 px-4 relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950">
      
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div 
            key="button"
            exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            className="flex flex-col items-center z-10"
          >
            <h2 className="text-4xl md:text-6xl font-cursive text-center mb-16 text-rose-300 text-glow tracking-wide">The Final Chapter</h2>
            <motion.button
              onClick={triggerSurprise}
              whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(255,182,193,0.8)" }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="px-12 py-8 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white font-serif text-2xl md:text-3xl shadow-[0_0_30px_rgba(255,182,193,0.5)] flex items-center gap-4 relative overflow-hidden group border-2 border-rose-300/50"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Sparkles className="w-8 h-8 text-gold-400 animate-pulse" />
              <span>Open Your Surprise</span>
              <Heart className="w-8 h-8 fill-white animate-bounce" />
            </motion.button>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="wish"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50 bg-black flex items-center justify-center"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 2 }}
              className="text-4xl md:text-6xl font-cursive text-rose-200 text-glow text-center"
            >
              Close your eyes... <br/><br/>
              <span className="text-3xl md:text-5xl text-rose-100/70">and make a wish...</span>
            </motion.p>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/40 via-slate-950 to-slate-950 flex flex-col items-center justify-center p-4"
          >
            {/* The animated photos */}
            {photos.length > 0 && (
              <div className="relative w-full max-w-3xl h-[50vh] md:h-[60vh] flex items-center justify-center mt-10">
                {photos.slice(0, 4).map((url, i) => {
                  // Calculate dynamic entry points
                  const entryProps = [
                    { x: -500, y: -500, rotate: -45 }, // Top left
                    { x: 500, y: -500, rotate: 45 },  // Top right
                    { x: -500, y: 500, rotate: -45 }, // Bottom left
                    { x: 500, y: 500, rotate: 45 },   // Bottom right
                  ];

                  const finalProps = [
                    { x: -100, y: -60, rotate: -10 },
                    { x: 100, y: -40, rotate: 15 },
                    { x: -80, y: 80, rotate: -5 },
                    { x: 120, y: 60, rotate: 8 },
                  ];

                  return (
                    <motion.div 
                      key={i}
                      initial={{ ...entryProps[i], opacity: 0, scale: 0.5 }}
                      animate={{ ...finalProps[i], opacity: 1, scale: 1 }}
                      transition={{ 
                        type: 'spring', 
                        damping: 12, 
                        stiffness: 40,
                        delay: i * 0.4 + 0.5
                      }}
                      whileHover={{ scale: 1.1, zIndex: 50, rotate: 0 }}
                      className="absolute w-40 h-48 md:w-56 md:h-72 glass p-2 pb-8 rounded-xl shadow-[0_0_30px_rgba(255,182,193,0.3)] z-10"
                    >
                      <img src={url} alt="Birthday" className="w-full h-full object-cover rounded-lg" />
                    </motion.div>
                  );
                })}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 1.5 }}
              className="text-center z-50 mt-12 bg-slate-950/40 p-8 rounded-3xl backdrop-blur-md border border-rose-500/20 shadow-[0_0_50px_rgba(255,182,193,0.1)]"
            >
              <h1 className="text-6xl md:text-8xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-rose-200 mb-6 drop-shadow-[0_5px_15px_rgba(255,182,193,0.6)]">
                Happy Birthday!
              </h1>
              <p className="text-2xl md:text-4xl font-dancing text-rose-200">
                You are my greatest adventure. ❤️
              </p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BirthdaySpecial;
