import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPhotosByCategory } from '../data/photoUtils';

gsap.registerPlugin(ScrollTrigger);

const FirstMemories = () => {
  const sectionRef = useRef(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setPhotos(getPhotosByCategory('first memories'));
  }, []);

  useEffect(() => {
    if (photos.length === 0) return;
    
    const cards = gsap.utils.toArray('.fm-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card, 
        { y: 150, opacity: 0, rotationX: -15 },
        { 
          y: 0, opacity: 1, rotationX: 0,
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
  }, [photos]);

  if (photos.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-32 px-4 relative flex flex-col items-center overflow-hidden bg-slate-950">
      <h2 className="text-5xl md:text-7xl font-cursive text-center mb-24 text-rose-300 text-glow">First Memories</h2>
      
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-rose-500/10 via-rose-300/60 to-transparent rounded-full shadow-[0_0_15px_rgba(255,182,193,0.5)]" />
        
        {photos.map((url, index) => (
          <div key={index} className={`fm-card relative flex w-full my-24 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-rose-400 border-4 border-slate-950 z-10 shadow-[0_0_20px_#ffb6c1] animate-pulse" />
            
            <div className={`w-5/12 glass p-6 md:p-8 rounded-3xl hover:scale-[1.02] transition-all duration-500 shadow-[0_0_30px_rgba(255,182,193,0.1)] ${index % 2 === 0 ? 'ml-auto text-left' : 'mr-auto text-right'}`}>
              <div className="text-rose-400 font-bold tracking-widest text-sm mb-3 uppercase">Memory {index + 1}</div>
              <h3 className="text-3xl font-serif mb-4 text-white drop-shadow-md">The Spark</h3>
              
              <div className="mt-6 rounded-2xl overflow-hidden shadow-2xl relative group aspect-[4/3]">
                <img 
                  src={url} 
                  alt="First Memory" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FirstMemories;
