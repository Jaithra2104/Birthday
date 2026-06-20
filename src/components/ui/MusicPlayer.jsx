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

  useEffect(() => {
    // If audio exists, pause it before switching tracks
    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(playlist[currentTrack].url);
    
    // Automatically play next track when current finishes
    audioRef.current.addEventListener('ended', handleNextTrack);

    // If it was already playing, autoplay the next track
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleNextTrack);
        audioRef.current.pause();
      }
    };
  }, [currentTrack]); // Run effect when track changes

  const handleNextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const togglePlay = () => {
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
