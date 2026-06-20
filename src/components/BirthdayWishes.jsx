import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const BirthdayWishes = () => {
  return (
    <section className="py-32 px-4 relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/20 to-transparent -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1.2, type: "spring" }}
        className="max-w-3xl w-full glass p-12 md:p-20 rounded-3xl text-center border-t border-l border-white/20 shadow-[0_0_50px_rgba(255,182,193,0.15)] relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold-500/20 blur-3xl rounded-full" />

        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="inline-block mb-8"
        >
          <Sparkles className="w-12 h-12 text-gold-400" />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
          HAPPY BIRTHDAY <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-rose-300 to-gold-400 text-glow">
            MY PRINCESS ❤️
          </span>
        </h2>
        
        <p className="text-xl text-rose-100/90 font-light leading-relaxed max-w-xl mx-auto">
          May your special day be as beautiful, magical, and wonderful as you are. I hope this year brings you everything your heart desires.
        </p>
      </motion.div>
    </section>
  );
};

export default BirthdayWishes;
