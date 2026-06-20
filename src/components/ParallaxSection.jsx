import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Parallax logic using GSAP
    gsap.to('.parallax-bg', {
      yPercent: 50,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    gsap.to('.parallax-fg', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="relative h-[150vh] overflow-hidden flex items-center justify-center bg-slate-950">
      {/* Background Layer */}
      <div className="parallax-bg absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop" 
          alt="Stars" 
          className="w-full h-[150%] object-cover opacity-30" 
        />
      </div>

      {/* Middle Text Layer */}
      <div className="relative z-10 text-center px-4 mix-blend-screen">
        <h2 className="text-6xl md:text-8xl font-serif text-white/80 font-bold tracking-widest uppercase parallax-fg">
          Timeless
        </h2>
      </div>

      {/* Foreground Image Layer */}
      <div className="parallax-fg absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-lg mb-20 pointer-events-none">
        <img 
          src="/couple_silhouette_1781978625439.png" 
          alt="Us" 
          className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,182,193,0.5)]" 
        />
      </div>
      
      {/* Overlay gradient for smooth blending */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 z-30 pointer-events-none" />
    </section>
  );
};

export default ParallaxSection;
