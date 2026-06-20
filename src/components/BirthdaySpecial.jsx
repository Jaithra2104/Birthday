import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { getPhotosByCategory } from '../data/photoUtils';

// Helper for typewriter text
const TypewriterText = ({ text, delay }) => {
  const characters = Array.from(text);
  
  return (
    <motion.p 
      className="text-2xl md:text-4xl font-dancing text-rose-200 leading-relaxed text-glow"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05, delayChildren: delay } },
        hidden: {}
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 10 }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.p>
  );
};

const BirthdaySpecial = () => {
  const [stage, setStage] = useState(0);
  const [isHoveringPile, setIsHoveringPile] = useState(false);
  const photos = getPhotosByCategory('birthday special').slice(0, 5); // Take exactly 5 for a nice fan

  // Generate random stars
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }));

  // Generate random lanterns
  const lanterns = Array.from({ length: 15 }).map((_, i) => ({
    x: Math.random() * 100,
    size: Math.random() * 30 + 20,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 5
  }));

  const triggerSurprise = () => {
    setStage(1);
    setTimeout(() => setStage(2), 4000);
  };

  return (
    <section className="py-32 px-4 relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950">
      
      {/* Dynamic Starry Night Background (Visible in Stage 1 and 2) */}
      <AnimatePresence>
        {stage > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d] via-[#111827] to-[#0f172a] z-0"
          >
            {stars.map((star, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full bg-white shadow-[0_0_8px_#fff]"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: star.duration, delay: star.delay, repeat: Infinity }}
              />
            ))}

            {/* Floating Lanterns (Visible in Stage 2) */}
            {stage === 2 && lanterns.map((lantern, i) => (
              <motion.div
                key={`lantern-${i}`}
                className="absolute rounded-t-xl rounded-b-md bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 shadow-[0_0_30px_#f59e0b] opacity-80"
                style={{
                  left: `${lantern.x}%`,
                  width: lantern.size,
                  height: lantern.size * 1.5,
                  bottom: '-10%',
                }}
                animate={{
                  y: ['0vh', '-110vh'],
                  x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
                }}
                transition={{
                  duration: lantern.duration,
                  delay: lantern.delay,
                  ease: "linear",
                  repeat: Infinity
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 0: The Button */}
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

        {/* STAGE 1: Make a Wish */}
        {stage === 1 && (
          <motion.div
            key="wish"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 2 }}
              className="text-4xl md:text-6xl font-cursive text-rose-200 text-glow text-center drop-shadow-2xl"
            >
              Close your eyes... <br/><br/>
              <span className="text-3xl md:text-5xl text-rose-100/70">and make a wish...</span>
            </motion.p>
          </motion.div>
        )}

        {/* STAGE 2: The Grand Finale */}
        {stage === 2 && (
          <motion.div
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 pt-20"
          >
            {/* The 3D Hover Fan Polaroid Stack */}
            {photos.length > 0 && (
              <div 
                className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center cursor-pointer mt-10 perspective-[1000px]"
                onMouseEnter={() => setIsHoveringPile(true)}
                onMouseLeave={() => setIsHoveringPile(false)}
                onTouchStart={() => setIsHoveringPile(!isHoveringPile)}
              >
                <div className="absolute -top-10 text-rose-200/50 font-serif tracking-widest text-sm uppercase animate-pulse">
                  Hover to fan out
                </div>

                {photos.map((url, i) => {
                  // Calculate the fan spread
                  const offset = i - Math.floor(photos.length / 2);
                  const isCenter = offset === 0;

                  return (
                    <motion.div 
                      key={i}
                      initial={{ y: -1000, opacity: 0, rotate: Math.random() * 180 }}
                      animate={{ 
                        opacity: 1, 
                        y: isHoveringPile ? 0 : 0,
                        x: isHoveringPile ? offset * 120 : offset * 5, // Spread out on hover, stack otherwise
                        rotate: isHoveringPile ? offset * 10 : offset * 2,
                        scale: isHoveringPile && isCenter ? 1.1 : 1,
                        zIndex: isHoveringPile ? (isCenter ? 50 : 40 - Math.abs(offset)) : i
                      }}
                      transition={{ 
                        type: 'spring', 
                        damping: 15, 
                        stiffness: 100,
                        delay: isHoveringPile ? 0 : i * 0.2 + 0.5 // Fly in delay
                      }}
                      className="absolute w-48 h-56 md:w-64 md:h-80 glass p-3 pb-12 rounded-xl shadow-[0_0_40px_rgba(255,182,193,0.3)] bg-white/10 backdrop-blur-md"
                    >
                      <img src={url} alt="Memory" className="w-full h-full object-cover rounded-lg pointer-events-none" />
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Title and Typewriter Message */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1.5 }}
              className="text-center z-50 mt-12 bg-slate-950/20 p-8 rounded-3xl backdrop-blur-sm border border-rose-500/10 shadow-[0_0_50px_rgba(255,182,193,0.05)] max-w-4xl"
            >
              <h1 className="text-6xl md:text-8xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-rose-200 mb-6 drop-shadow-[0_5px_15px_rgba(255,182,193,0.6)]">
                Happy Birthday!
              </h1>
              
              <TypewriterText 
                text="From our very first memory to this exact moment, every second with you has been pure magic. Here is to a lifetime of birthdays together..." 
                delay={4.0} 
              />
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BirthdaySpecial;
