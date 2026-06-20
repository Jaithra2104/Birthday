import React from 'react';
import photosData from '../data/photos.json';

const PolaroidWall = () => {
  // Use a subset of photos for the infinite marquees (e.g., 40 photos)
  const marqueePhotos = photosData.slice(0, 40);
  
  // Split into two rows for the marquee
  const row1 = marqueePhotos.slice(0, 20);
  const row2 = marqueePhotos.slice(20, 40);

  // We duplicate the array inside the render to create a seamless infinite loop
  const renderMarquee = (photos, reverse = false) => {
    const list = [...photos, ...photos]; // Duplicate for seamless loop
    
    return (
      <div className="overflow-hidden w-full relative py-6">
        <div className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}>
          {list.map((item, index) => {
            // Random rotation for polaroid effect
            const rotation = (index % 5) * 3 - 6; // -6, -3, 0, 3, 6
            
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
                  <img src={item.url} alt="Memory" className="w-full h-full object-cover pointer-events-none" loading="lazy" />
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
      
      <h2 className="text-4xl md:text-6xl font-serif text-center mb-16 text-rose-300 text-glow">River of Memories</h2>
      
      <div className="flex flex-col gap-8 w-full transform -rotate-2">
        {renderMarquee(row1, false)}
        {renderMarquee(row2, true)}
      </div>
    </section>
  );
};

export default PolaroidWall;
