import React from 'react';
import { motion } from 'framer-motion';

const reasons = [
  { title: "❤️ Your Smile", desc: "It literally lights up my entire world." },
  { title: "❤️ Your Kindness", desc: "The way you care for others is beautiful." },
  { title: "❤️ Your Care", desc: "You always know how to make me feel special." },
  { title: "❤️ Your Support", desc: "You are my biggest cheerleader and rock." },
  { title: "❤️ Your Beautiful Heart", desc: "Pure, genuine, and full of love." },
  { title: "❤️ Your Laugh", desc: "The greatest sound I have ever heard." },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

const ReasonsSection = () => {
  return (
    <section className="py-32 px-4 relative min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl md:text-5xl font-serif text-center mb-16 text-rose-300 text-glow">Why I Love You</h2>
      
      <motion.div 
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {reasons.map((reason, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            className="glass p-8 rounded-2xl flex flex-col items-center text-center border-t border-l border-white/20 shadow-[0_8px_32px_rgba(255,182,193,0.1)]"
          >
            <h3 className="text-2xl font-serif text-white mb-4">{reason.title}</h3>
            <p className="text-rose-100/80 font-light leading-relaxed">{reason.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ReasonsSection;
