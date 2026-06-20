import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPhotosByCategory } from '../data/photoUtils';

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const [timelinePhotos, setTimelinePhotos] = useState([]);

  useEffect(() => {
    const firstMemories = getPhotosByCategory('first memories');
    const timeline = getPhotosByCategory('timeline photos');
    
    // Combine them, putting first memories at the beginning
    const combined = [...firstMemories, ...timeline];
    
    const memories = combined.map((url, i) => ({
      date: `Chapter ${i + 1}`,
      title: i === 0 ? 'Where It All Began' : i === 1 ? 'Butterflies & Smiles' : i === 2 ? 'Adventures Together' : 'Falling Deeper',
      desc: 'Every moment captured here is a testament to the beautiful story we are writing together.',
      img: url
    }));
    
    setTimelinePhotos(memories);
  }, []);

  useEffect(() => {
    if (timelinePhotos.length === 0) return;
    
    const cards = gsap.utils.toArray('.timeline-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card, 
        { y: 150, opacity: 0, scale: 0.9, rotationX: -15 },
        { 
          y: 0, opacity: 1, scale: 1, rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          }
        }
      );
    });
  }, [timelinePhotos]);

  if (timelinePhotos.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-32 px-4 relative min-h-screen flex flex-col items-center overflow-hidden">
      <h2 className="text-4xl md:text-6xl font-serif text-center mb-24 text-rose-300 text-glow">Our Beautiful Journey</h2>
      
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-rose-500/10 via-rose-300/60 to-transparent rounded-full shadow-[0_0_15px_rgba(255,182,193,0.5)]" />
        
        {timelinePhotos.map((memory, index) => (
          <div key={index} className={`timeline-card relative flex w-full my-16 md:my-24 ${index % 2 === 0 ? 'justify-end md:justify-start' : 'justify-end'}`}>
            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-rose-400 border-2 md:border-4 border-slate-950 z-10 shadow-[0_0_20px_#ffb6c1] animate-pulse" />
            
            <div className={`w-[80%] sm:w-[85%] md:w-5/12 glass p-5 md:p-8 rounded-3xl hover:scale-[1.02] transition-all duration-500 cursor-pointer shadow-[0_0_30px_rgba(255,182,193,0.1)] ${index % 2 === 0 ? 'md:mr-auto md:text-right text-left' : 'ml-auto text-left'}`}>
              <div className="text-rose-400 font-bold tracking-widest text-xs md:text-sm mb-2 md:mb-3 uppercase">{memory.date}</div>
              <h3 className="text-2xl md:text-3xl font-serif mb-3 md:mb-4 text-white drop-shadow-md">{memory.title}</h3>
              <p className="text-rose-100/80 font-light leading-relaxed text-sm md:text-lg">{memory.desc}</p>
              
              <div className="mt-4 md:mt-6 rounded-2xl overflow-hidden shadow-2xl relative group aspect-[4/3]">
                <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                <img 
                  src={memory.img} 
                  alt={memory.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelineSection;
