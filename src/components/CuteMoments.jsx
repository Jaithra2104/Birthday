import React from 'react';
import { getPhotosByCategory } from '../data/photoUtils';

const CuteMoments = () => {
  const cutePhotos = getPhotosByCategory('cute moments');

  if (cutePhotos.length === 0) return null;
  
  const midPoint = Math.ceil(cutePhotos.length / 2);
  const row1 = cutePhotos.slice(0, midPoint);
  const row2 = cutePhotos.slice(midPoint);

  const renderMarquee = (photos, reverse = false) => {
    if (photos.length === 0) return null;
    const list = [...photos, ...photos]; 
    
    return (
      <div className="overflow-hidden w-full relative py-6">
        <div className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}>
          {list.map((url, index) => {
            const rotation = (index % 5) * 3 - 6; 
            return (
              <div 
                key={index} 
                className="relative w-48 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,182,193,0.2)] border border-rose-300/20 shrink-0 transform -rotate-2"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <img 
                  src={url} 
                  alt="Cute Moment" 
                  className="w-full h-full object-cover object-top" 
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="py-32 px-0 relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-900/40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/10 via-slate-950 to-slate-950 -z-10" />
      
      <h2 className="text-4xl md:text-6xl font-serif text-center mb-16 text-rose-300 text-glow">Cute Moments</h2>
      
      <div className="flex flex-col gap-8 w-full transform -rotate-2">
        {renderMarquee(row1, false)}
        {renderMarquee(row2, true)}
      </div>
    </section>
  );
};

export default CuteMoments;
