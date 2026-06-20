import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FinalSection = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate infinite floating hearts
    const interval = setInterval(() => {
      setHearts(prev => {
        const newHeart = {
          id: Date.now(),
          left: Math.random() * 100,
          duration: Math.random() * 3 + 3,
          size: Math.random() * 20 + 10,
        };
        // Keep only last 20 to prevent performance issues
        return [...prev.slice(-20), newHeart];
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="/romantic_hero_bg_1781978604842.png" 
          alt="Stars" 
          className="w-full h-full object-cover mix-blend-screen" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', opacity: 0, x: '-50%' }}
          animate={{ y: '-20vh', opacity: [0, 1, 0] }}
          transition={{ duration: heart.duration, ease: 'linear' }}
          className="absolute z-10 pointer-events-none"
          style={{ left: `${heart.left}%` }}
        >
          <Heart 
            className="text-rose-500 fill-rose-500" 
            style={{ width: heart.size, height: heart.size, opacity: 0.6 }} 
          />
        </motion.div>
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="relative z-20 text-center glass p-12 rounded-full border border-rose-500/30 shadow-[0_0_50px_rgba(255,182,193,0.2)]"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">I Love You Today,</h2>
        <h2 className="text-4xl md:text-6xl font-serif text-rose-300 mb-4">Tomorrow,</h2>
        <h2 className="text-5xl md:text-7xl font-serif text-white font-bold tracking-wider">And Forever ❤️</h2>
      </motion.div>
    </section>
  );
};

export default FinalSection;
