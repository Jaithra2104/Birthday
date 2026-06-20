import React from 'react';
import Particles from './components/ui/Particles';
import MusicPlayer from './components/ui/MusicPlayer';
import HeroSection from './components/HeroSection';
import HerPhotos from './components/HerPhotos';
import TimelinePhotos from './components/TimelinePhotos';
import FirstMemories from './components/FirstMemories';
import DatesAndOutings from './components/DatesAndOutings';
import CuteMoments from './components/CuteMoments';
import SpecialOccasions from './components/SpecialOccasions';
import FavoriteMemories from './components/FavoriteMemories';
import GiftsSection from './components/GiftsSection';
import LoveLetter from './components/LoveLetter';
import BirthdaySpecial from './components/BirthdaySpecial';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden font-sans">
      <Particles className="z-0" />
      <MusicPlayer />
      
      <div className="relative z-10">
        <HeroSection />
        <HerPhotos />
        <TimelinePhotos />
        <FirstMemories />
        <DatesAndOutings />
        <CuteMoments />
        <SpecialOccasions />
        <FavoriteMemories />
        <GiftsSection />
        <LoveLetter />
        <BirthdaySpecial />
      </div>
    </div>
  );
}

export default App;
