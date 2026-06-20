import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { getPhotosByCategory } from '../data/photoUtils';

const HeroSection = () => {
  const heroPhotos = getPhotosByCategory('hero photos');
  const [currentIdx, setCurrentIdx] = useState(0);

  // New premium romantic background
  const defaultBg = '/premium_romantic_hero_bg.png';

  useEffect(() => {
    if (heroPhotos.length > 0) {
      const interval = setInterval(() => {
        // We can cycle between the premium bg and her hero photos, or just use the premium bg 
        // as the base, and slowly crossfade the hero photos over it. 
        // For now, if there are hero photos, we cycle them. If not, we stay on defaultBg.
        setCurrentIdx((prev) => (prev + 1) % heroPhotos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroPhotos.length]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-slate-950/40 z-10" />
        <AnimatePresence>
          <motion.img 
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            src={heroPhotos.length > 0 ? heroPhotos[currentIdx] : defaultBg} 
            alt="Hero Background" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </AnimatePresence>
      </div>

      <div className="relative z-20 text-center px-4 mt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-6xl md:text-9xl font-cursive font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-rose-200 mb-6 drop-shadow-[0_5px_15px_rgba(255,182,193,0.6)] py-4"
        >
          Happy Birthday My Love
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-3xl border border-rose-300/20 shadow-[0_0_50px_rgba(255,182,193,0.15)]"
        >
          <p className="text-3xl md:text-5xl font-dancing leading-relaxed text-rose-50 tracking-wide drop-shadow-md">
            Today is not just your birthday.
            <br className="hidden md:block my-2" />
            <span className="block mt-4 text-rose-200 font-cursive text-4xl md:text-6xl">Today is the day the world received its most beautiful masterpiece.</span>
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 z-20 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <span className="text-sm uppercase tracking-widest text-rose-200 mb-2 font-light">Scroll to explore our story</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-rose-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
