import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift } from 'lucide-react';
import { getPhotosByCategory } from '../data/photoUtils';

const quotes = [
  "You are my today and all of my tomorrows.",
  "I look at you and see the rest of my life in front of my eyes.",
  "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.",
  "If I know what love is, it is because of you.",
  "I am much more me when I am with you.",
  "Every love story is beautiful, but ours is my favorite.",
  "You are the source of my joy, the center of my world and the whole of my heart.",
  "My six word love story: I can't imagine life without you.",
  "I love you not only for what you are, but for what I am when I am with you."
];

const GiftsSection = () => {
  const photos = getPhotosByCategory('favorite memories');
  const [openedBox, setOpenedBox] = useState(null);

  // We need 9 boxes
  const boxes = Array.from({ length: 9 }).map((_, i) => i);

  const handleOpenGift = (index) => {
    if (openedBox !== null) return; // Only allow opening one box
    
    // Confetti explosion
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ffb6c1', '#ff69b4', '#ffd700', '#ffffff'],
      zIndex: 100
    });

    setOpenedBox(index);
  };

  return (
    <section className="py-32 px-4 relative min-h-screen bg-slate-900/80 flex flex-col items-center justify-center">
      <h2 className="text-5xl md:text-7xl font-cursive text-center mb-6 text-rose-300 text-glow">Pick a Gift</h2>
      <p className="text-xl text-rose-100/80 font-light mb-16 font-serif">Open a box to reveal a special memory...</p>
      
      <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto relative z-10 w-full">
        {boxes.map((index) => (
          <div key={index} className="aspect-square relative flex items-center justify-center perspective-[1000px]">
            <AnimatePresence>
              {openedBox !== index && (
                <motion.button
                  exit={{ opacity: 0, scale: 0, rotateY: 180 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenGift(index)}
                  className="absolute inset-0 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl shadow-[0_10px_30px_rgba(255,182,193,0.3)] border-2 border-rose-300/50 flex items-center justify-center overflow-hidden group cursor-pointer"
                  disabled={openedBox !== null}
                >
                  <div className="absolute w-full h-8 bg-rose-200/40 transform -rotate-45" />
                  <div className="absolute h-full w-8 bg-rose-200/40 transform -rotate-45" />
                  <Gift className="w-16 h-16 text-white z-10 drop-shadow-md group-hover:animate-bounce" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      {/* Overlay to dim background when a box is opened */}
      <AnimatePresence>
        {openedBox !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
            onClick={() => setOpenedBox(null)}
          />
        )}
      </AnimatePresence>

      {/* The Opened Gift Modal */}
      <AnimatePresence>
        {openedBox !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 15 }}
            className="fixed inset-0 m-auto z-50 w-full max-w-2xl h-[80vh] bg-slate-950 p-6 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(255,182,193,0.5)] border border-rose-300/30 flex flex-col items-center justify-center"
          >
            <div className="w-full h-2/3 rounded-2xl overflow-hidden shadow-2xl mb-8">
              <img 
                src={photos[openedBox % Math.max(photos.length, 1)]} 
                alt="Favorite" 
                className="w-full h-full object-contain bg-black/50" 
              />
            </div>
            <p className="text-2xl md:text-4xl font-dancing text-rose-200 text-center leading-relaxed">
              "{quotes[openedBox]}"
            </p>
            
            <button 
              onClick={() => setOpenedBox(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              &times; Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GiftsSection;
