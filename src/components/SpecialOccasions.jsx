import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPhotosByCategory } from '../data/photoUtils';

const SpecialOccasions = () => {
  const photos = getPhotosByCategory('special occasions');
  const [selectedImg, setSelectedImg] = useState(null);

  if (photos.length === 0) return null;

  return (
    <section className="py-32 px-4 relative min-h-screen">
      <h2 className="text-4xl md:text-6xl font-serif text-center mb-16 text-rose-300 text-glow">Special Occasions</h2>
      
      <div className="max-w-7xl mx-auto masonry-grid">
        {photos.map((url, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.6, delay: (index % 10) * 0.1 }}
            className="masonry-item relative rounded-xl overflow-hidden glass group cursor-pointer shadow-lg shadow-rose-900/10 hover:shadow-rose-400/40 hover:-translate-y-2 transition-all duration-300"
            onClick={() => setSelectedImg(url)}
          >
            <img 
              src={url} 
              alt="Special Occasion" 
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <span className="text-rose-100 font-serif tracking-wider">✨ Magic</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedImg(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImg}
              alt="Enlarged"
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="absolute top-8 right-8 text-white hover:text-rose-400 text-4xl font-light transition-colors" onClick={() => setSelectedImg(null)}>&times;</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SpecialOccasions;
