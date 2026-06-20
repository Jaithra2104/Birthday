import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getPhotosByCategory } from '../data/photoUtils';

gsap.registerPlugin(ScrollTrigger);

const DatesAndOutings = () => {
  const photos = getPhotosByCategory('dates and outings');

  useEffect(() => {
    if (photos.length === 0) return;
    
    gsap.fromTo('.dates-card',
      { opacity: 0, scale: 0.5, y: 100 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: '.dates-container',
          start: 'top 70%',
        }
      }
    );
  }, [photos]);

  if (photos.length === 0) return null;

  return (
    <section className="py-32 px-4 relative min-h-screen overflow-hidden bg-slate-900/50">
      <h2 className="text-4xl md:text-6xl font-serif text-center mb-24 text-rose-300 text-glow">Dates & Outings</h2>
      
      <div className="dates-container max-w-7xl mx-auto flex flex-wrap justify-center gap-12 p-8">
        {photos.map((url, index) => {
          const rotation = (index % 5) * 4 - 8; // -8 to +8
          return (
            <div 
              key={index} 
              className="dates-card bg-white p-4 pb-12 shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-110 hover:z-50 cursor-pointer"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                width: '280px'
              }}
            >
              <div className="aspect-square overflow-hidden mb-4 bg-slate-100">
                <img src={url} alt="Date" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="text-center font-serif text-slate-800 text-xl font-medium" style={{ fontFamily: "'Dancing Script', cursive" }}>Love</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DatesAndOutings;
