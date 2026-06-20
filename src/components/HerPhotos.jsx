import React from 'react';
import { motion } from 'framer-motion';
import { getPhotosByCategory } from '../data/photoUtils';

const HerPhotos = () => {
  const photos = getPhotosByCategory('her photos');

  if (photos.length === 0) return null;

  return (
    <section className="py-32 relative min-h-screen overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-rose-950/20 to-slate-950 z-0" />
      
      <div className="relative z-10 text-center mb-10">
        <h2 className="text-4xl md:text-6xl font-serif text-rose-300 text-glow">The Birthday Girl</h2>
        <p className="text-rose-200 mt-4 font-light tracking-wider">Floating through my mind constantly...</p>
      </div>

      <div className="relative w-full h-[80vh]">
        {photos.map((url, i) => {
          // Randomize positions and animation durations for a bubble effect
          const size = Math.random() * 100 + 150; // 150px to 250px
          const left = Math.random() * 80 + 10; // 10% to 90%
          const delay = Math.random() * 2;
          const duration = Math.random() * 10 + 15; // 15s to 25s

          return (
            <motion.div
              key={i}
              className="absolute rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,182,193,0.3)] border border-rose-300/30"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: '-20%',
              }}
              animate={{
                y: [0, -1000],
                x: [0, Math.random() * 100 - 50, 0],
                rotate: [0, Math.random() * 45 - 22.5]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
              }}
              whileHover={{ scale: 1.2, zIndex: 50, transition: { duration: 0.3 } }}
            >
              <img src={url} alt="Her" className="w-full h-full object-cover" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HerPhotos;
