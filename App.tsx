import React, { useState } from 'react';
import { Experience } from './components/Experience';
import { UI } from './components/UI';
import { AppState, WishResponse } from './types';
import { generateChristmasBlessing } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [wish, setWish] = useState('');
  const [blessing, setBlessing] = useState('');
  const [glowColor, setGlowColor] = useState('#FFD700'); // Default Gold

  const handleMakeWish = async () => {
    if (!wish.trim()) return;
    
    setAppState(AppState.GENERATING);
    
    try {
      const response: WishResponse = await generateChristmasBlessing(wish);
      setBlessing(response.blessing);
      setGlowColor(response.colorTheme);
      setAppState(AppState.REVEAL);
    } catch (error) {
      console.error("Failed to generate wish", error);
      setBlessing("The stars are silent, but your heart shines bright.");
      setAppState(AppState.REVEAL);
    }
  };

  const handleReset = () => {
    setWish('');
    setBlessing('');
    setAppState(AppState.IDLE);
    setGlowColor('#FFD700');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-yellow-500 selection:text-black">
      <Experience glowColor={glowColor} />
      <UI 
        appState={appState}
        wish={wish}
        setWish={setWish}
        blessing={blessing}
        onMakeWish={handleMakeWish}
        onReset={handleReset}
      />
    </div>
  );
};

export default App;