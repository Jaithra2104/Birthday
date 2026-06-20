import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { getPhotosByCategory } from '../data/photoUtils';

const HeroSection = () => {
  // Use her photos for the cinematic background
  const allHerPhotos = getPhotosByCategory('her photos');
  const heroPhotos = allHerPhotos.length > 0 ? allHerPhotos.slice(0, 5) : [];
  const [currentIdx, setCurrentIdx] = useState(0);

  // Generate magical dust particles
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  useEffect(() => {
    if (heroPhotos.length > 1) {
      const interval = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % heroPhotos.length);
      }, 6000); // Crossfade every 6 seconds
      return () => clearInterval(interval);
    }
  }, [heroPhotos.length]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950">
      
      {/* CINEMATIC BACKGROUND SLIDESHOW */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          {heroPhotos.length > 0 ? (
            <motion.img 
              key={currentIdx}
              initial={{ opacity: 0, scale: 1.0 }}
              animate={{ opacity: 1, scale: 1.15 }} // Ken Burns slow zoom
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 2 },
                scale: { duration: 10, ease: "linear" } 
              }}
              src={heroPhotos[currentIdx]} 
              alt="Her Cinematic Background" 
              className="absolute inset-0 w-full h-full object-cover object-top filter contrast-110 brightness-90" 
            />
          ) : (
            <div className="absolute inset-0 bg-rose-950" />
          )}
        </AnimatePresence>

        {/* ROMANTIC GRADIENT OVERLAY */}
        {/* We use a heavy vignette and gradient to ensure the text pops and it feels moody and romantic */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(2,6,23,0.8)_100%)] z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 via-transparent to-slate-950 z-10" />
        <div className="absolute inset-0 bg-pink-900/20 mix-blend-overlay z-10" />

        {/* MAGICAL DUST PARTICLES */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-rose-200/60 shadow-[0_0_10px_rgba(255,182,193,0.8)]"
              style={{
                left: `${p.x}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: ['100vh', '-10vh'],
                x: [p.x + '%', (p.x + (Math.random() * 10 - 5)) + '%'],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-20 text-center px-4 mt-20 max-w-5xl mx-auto flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-cursive font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-pink-200 mb-6 drop-shadow-[0_5px_15px_rgba(255,182,193,0.4)] py-4"
        >
          Happy Birthday My Love
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 2 }}
          className="relative mt-4"
        >
          {/* Subtle glowing ring behind the text block */}
          <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full" />
          
          <div className="relative glass p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(255,182,193,0.1)] backdrop-blur-md">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-dancing leading-relaxed text-rose-50 tracking-wide drop-shadow-md">
              Today is not just your birthday.
              <br className="my-2" />
              <span className="block mt-4 text-rose-200 font-cursive text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-xl">
                Today is the day the world received its most beautiful masterpiece.
              </span>
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 z-20 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-sm uppercase tracking-widest text-rose-200 mb-2 font-light drop-shadow-md">Scroll to explore our story</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-rose-300 drop-shadow-lg" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
