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
                className="flex-shrink-0 mx-6 bg-white p-3 pb-10 shadow-lg hover:shadow-[0_0_30px_rgba(255,182,193,0.6)] transition-all duration-300 hover:scale-110 cursor-pointer"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  width: '240px'
                }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                  <img src={url} alt="Cute Memory" className="w-full h-full object-cover pointer-events-none" loading="lazy" />
                </div>
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
