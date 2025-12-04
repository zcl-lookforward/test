import React from 'react';
import { AppState } from '../types';

interface UIProps {
  appState: AppState;
  wish: string;
  setWish: (w: string) => void;
  blessing: string;
  onMakeWish: () => void;
  onReset: () => void;
}

export const UI: React.FC<UIProps> = ({ 
  appState, 
  wish, 
  setWish, 
  blessing, 
  onMakeWish, 
  onReset 
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-12 z-10">
      
      {/* Header */}
      <header className="flex justify-between items-start pointer-events-auto">
        <div>
          <h1 className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 font-bold tracking-wider drop-shadow-lg">
            ARIX
          </h1>
          <h2 className="text-emerald-400 text-sm md:text-lg tracking-[0.3em] uppercase mt-2 font-light">
            Signature Collection
          </h2>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-yellow-500 text-xs tracking-widest border-b border-yellow-800 pb-1">
            EST. 2024
          </p>
        </div>
      </header>

      {/* Main Interactive Area */}
      <main className="flex-1 flex flex-col items-center justify-center pointer-events-auto">
        
        {appState === AppState.IDLE && (
          <div className="text-center animate-fade-in-up">
            <p className="text-emerald-100/80 mb-8 font-light italic text-lg md:text-xl max-w-md mx-auto">
              "Amidst the emerald shadows and golden light, cast your wish into the eternal night."
            </p>
            <input
              type="text"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="What is your heart's desire?"
              className="bg-black/40 backdrop-blur-md border border-yellow-600/30 text-yellow-100 text-center px-6 py-4 rounded-full w-full max-w-lg outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder-emerald-700/50 mb-6 font-serif"
            />
            {wish.trim().length > 0 && (
              <button
                onClick={onMakeWish}
                className="group relative px-8 py-3 overflow-hidden rounded-full bg-yellow-600/10 border border-yellow-500/50 transition-all hover:bg-yellow-600/20 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]"
              >
                <span className="relative z-10 text-yellow-300 font-serif tracking-widest uppercase text-sm group-hover:text-white transition-colors">
                  Ignite the Tree
                </span>
              </button>
            )}
          </div>
        )}

        {appState === AppState.GENERATING && (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-yellow-500/20 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
            <p className="text-yellow-200/80 tracking-widest text-sm animate-pulse">
              COMMUNING WITH SPIRITS...
            </p>
          </div>
        )}

        {appState === AppState.REVEAL && (
          <div className="text-center max-w-2xl animate-fade-in-up p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-yellow-500/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="mb-4 text-4xl text-yellow-400">❖</div>
            <p className="text-xl md:text-3xl text-yellow-100 font-serif leading-relaxed mb-8 drop-shadow-md">
              "{blessing}"
            </p>
            <button
              onClick={onReset}
              className="text-emerald-400 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
            >
              Make Another Wish
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="text-center md:text-left pointer-events-auto">
        <p className="text-emerald-800 text-[10px] tracking-[0.2em] uppercase">
          Interactive Experience • Powered by Gemini
        </p>
      </footer>
    </div>
  );
};