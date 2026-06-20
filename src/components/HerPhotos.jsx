import React from 'react';
import { motion } from 'framer-motion';
import { getPhotosByCategory } from '../data/photoUtils';

const HerPhotos = () => {
  const photos = getPhotosByCategory('her photos');

  if (photos.length === 0) return null;

  // Split photos into 4 separate rows for the cinematic rolls
  const rowCount = 4;
  const rows = Array.from({ length: rowCount }, () => []);
  
  photos.forEach((url, i) => {
    rows[i % rowCount].push(url);
  });

  return (
    <section className="py-20 relative min-h-[90vh] overflow-hidden bg-slate-950 flex flex-col justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-rose-950/20 to-slate-950 z-0" />
      
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-serif text-rose-300 text-glow">The Birthday Girl</h2>
        <p className="text-rose-200 mt-4 font-light tracking-wider font-sans">Every angle, every moment, purely magic.</p>
      </div>

      <div className="relative z-10 w-full flex flex-col gap-6 md:gap-8 transform -rotate-2 scale-105">
        {rows.map((rowPhotos, rowIndex) => {
          // If a row doesn't have enough photos, we can just use the full photos array to ensure it fills the screen
          const displayPhotos = rowPhotos.length > 3 ? rowPhotos : photos;
          // Duplicate the photos to create a seamless infinite loop
          const seamlessPhotos = [...displayPhotos, ...displayPhotos, ...displayPhotos, ...displayPhotos];
          
          const isReverse = rowIndex % 2 !== 0;

          return (
            <div key={rowIndex} className="flex overflow-hidden w-[120vw] -ml-[10vw]">
              <div className={`flex gap-4 md:gap-8 w-max ${isReverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
                {seamlessPhotos.map((url, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    whileHover={{ scale: 1.05, zIndex: 50 }}
                    className="relative w-40 md:w-56 aspect-[3/4] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,182,193,0.15)] border border-white/10 shrink-0 bg-slate-900"
                  >
                    <img 
                      src={url} 
                      alt="Her" 
                      className="w-full h-full object-cover object-top filter contrast-110" 
                    />
                    {/* Cinematic Film Overlay */}
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
                    <div className="absolute top-1 bottom-1 left-1 right-1 border border-white/5 pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HerPhotos;
