import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getPhotosByCategory } from '../data/photoUtils';

const FavoriteMemories = () => {
  const photos = getPhotosByCategory('favorite memories');
  const [currentIndex, setCurrentIndex] = useState(0);

  if (photos.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section className="py-32 px-4 relative min-h-[80vh] flex flex-col items-center justify-center bg-slate-900/60 overflow-hidden">
      <h2 className="text-4xl md:text-6xl font-serif text-center mb-16 text-rose-300 text-glow">Favorite Memories</h2>

      <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center perspective-[1000px]">
        <AnimatePresence initial={false}>
          {photos.map((url, i) => {
            // Calculate relative index for 3D effect
            let offset = i - currentIndex;
            if (offset < -Math.floor(photos.length / 2)) offset += photos.length;
            if (offset > Math.floor(photos.length / 2)) offset -= photos.length;

            if (Math.abs(offset) > 2) return null; // Only render nearest 5 cards

            const isCenter = offset === 0;

            return (
              <motion.div
                key={i}
                className="absolute top-0 w-64 md:w-96 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: offset * 200, scale: 0.8, rotateY: offset * -45, zIndex: 10 - Math.abs(offset) }}
                animate={{
                  opacity: 1 - Math.abs(offset) * 0.3,
                  x: offset * 150,
                  scale: isCenter ? 1 : 0.8,
                  rotateY: offset * -25,
                  zIndex: 10 - Math.abs(offset),
                  filter: isCenter ? 'blur(0px)' : 'blur(4px)'
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <img src={url} alt="Favorite" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 mix-blend-overlay pointer-events-none" />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Controls */}
        <button onClick={handlePrev} className="absolute left-4 md:left-20 z-50 p-4 rounded-full bg-white/10 hover:bg-rose-500/50 backdrop-blur text-white transition-all">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button onClick={handleNext} className="absolute right-4 md:right-20 z-50 p-4 rounded-full bg-white/10 hover:bg-rose-500/50 backdrop-blur text-white transition-all">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default FavoriteMemories;
