import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-4 relative min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/10 via-slate-950 to-slate-950 -z-10" />
      
      <h2 className="text-5xl md:text-7xl font-cursive text-center mb-16 text-rose-300 text-glow">A Letter For You</h2>

      <div className="relative w-full max-w-2xl aspect-[3/2] flex items-center justify-center cursor-pointer perspective-[1000px]" onClick={() => setIsOpen(true)}>
        
        {/* The Envelope */}
        <motion.div 
          className="absolute inset-0 bg-slate-100 rounded-lg shadow-2xl overflow-hidden border border-slate-200"
          animate={{ rotateX: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        >
          {/* Envelope lines */}
          <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(135deg, transparent 49%, #e2e8f0 50%, transparent 51%)' }} />
          <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(-135deg, transparent 49%, #e2e8f0 50%, transparent 51%)' }} />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart className="w-16 h-16 text-rose-500 fill-rose-500 drop-shadow-md animate-pulse" />
          </div>
        </motion.div>

        {/* The Letter inside */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: 50 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="w-full bg-orange-50/90 backdrop-blur-md p-8 md:p-12 rounded-lg shadow-[0_0_40px_rgba(255,182,193,0.2)] border border-orange-200/50 relative overflow-hidden"
            >
              <p className="text-2xl md:text-4xl font-dancing text-slate-800 leading-relaxed mb-6">
                My Dearest,
              </p>
              <p className="text-xl md:text-3xl font-dancing text-slate-700 leading-loose">
                From the moment you entered my life, everything changed. You brought light to my darkest days and a smile to my face that never fades. 
                <br/><br/>
                Every second with you is a gift, and I promise to cherish you today, tomorrow, and for all of eternity. You are my beautiful masterpiece.
              </p>
              <p className="text-2xl md:text-4xl font-dancing text-slate-800 leading-relaxed mt-10 text-right">
                Forever Yours, <br/>
                <span className="text-rose-500">❤️</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && isInView && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-16 text-rose-300 font-serif tracking-widest text-sm uppercase"
          >
            Click to Open
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LoveLetter;
