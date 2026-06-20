import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';

const playlist = [
  { name: 'Ammaadi', url: '/music/Ammaadi_cut.mp3' },
  { name: 'Samayama', url: '/music/Samayama_cut.mp3' }
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);
  const userInteracted = useRef(false);

  useEffect(() => {
    // If audio exists, pause it before switching tracks
    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(playlist[currentTrack].url);
    
    // Automatically play next track when current finishes
    audioRef.current.addEventListener('ended', handleNextTrack);

    // Try to autoplay on mount (might be blocked by browser)
    const tryAutoplay = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (e) {
        console.log("Autoplay prevented by browser. Waiting for user interaction.");
        
        // If autoplay fails, attach global interaction listeners
        const playOnInteract = async () => {
          if (userInteracted.current) return; // Prevent multiple triggers
          userInteracted.current = true;
          
          try {
            await audioRef.current.play();
            setIsPlaying(true);
          } catch (err) {
            console.error("Play failed after interaction:", err);
          }
          
          // Cleanup listeners after successful play
          ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
            window.removeEventListener(evt, playOnInteract);
          });
        };

        // Attach listeners to wake up audio on first interaction
        ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
          window.addEventListener(evt, playOnInteract, { once: true });
        });
      }
    };

    tryAutoplay();

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleNextTrack);
        audioRef.current.pause();
      }
      
      // Cleanup global listeners
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
        // Just defining a generic cleanup since we can't easily remove anonymous async funcs if not referenced
        // But the { once: true } flag helps auto-remove them.
      });
    };
  }, [currentTrack]); // Run effect when track changes

  const handleNextTrack = () => {
    userInteracted.current = true; // Manual interaction
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const togglePlay = () => {
    userInteracted.current = true; // Manual interaction
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-8 left-8 z-50 flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full shadow-[0_0_20px_rgba(255,182,193,0.3)]"
    >
      <button 
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-rose-400 flex items-center justify-center text-white hover:bg-rose-500 transition-colors shadow-lg"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
      </button>

      <button 
        onClick={handleNextTrack}
        className="w-8 h-8 rounded-full bg-rose-300/20 flex items-center justify-center text-rose-200 hover:bg-rose-300/40 transition-colors"
      >
        <SkipForward className="w-4 h-4" />
      </button>
      
      <div className="hidden md:flex flex-col pr-4">
        <span className="text-white text-sm font-medium flex items-center gap-2">
          {playlist[currentTrack].name} <Music className={`w-3 h-3 ${isPlaying ? 'animate-bounce text-rose-300' : 'text-gray-400'}`} />
        </span>
        <span className="text-rose-200 text-xs font-light">
          {isPlaying ? 'Playing...' : 'Paused'}
        </span>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
