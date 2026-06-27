"use client";

import { Zap, HeartPulse, Brain } from "lucide-react";
import { useState } from "react";

export default function MindfulnessPage() {
  const [breathing, setBreathing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold flex flex-col items-center gap-3 mb-2 text-stone-800">
          <Zap className="w-10 h-10 text-brand-500" />
          Mindfulness Hub
        </h1>
        <p className="text-stone-500">Take a break, reset your mind.</p>
      </header>

      <div className="glass p-12 rounded-3xl text-center max-w-lg mx-auto flex flex-col items-center overflow-hidden relative border border-stone-200">
        <div className={`absolute inset-0 bg-brand-50 transition-opacity duration-[4000ms] ${breathing ? 'opacity-100' : 'opacity-0'}`} />
        
        <h2 className="text-2xl font-bold mb-8 text-stone-800">4-7-8 Breathing</h2>
        
        <div 
          onClick={() => setBreathing(!breathing)}
          className={`w-40 h-40 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all duration-[4000ms]
            ${breathing 
              ? 'border-emerald-400 bg-emerald-400/20 scale-150 shadow-[0_0_60px_rgba(52,211,153,0.3)]' 
              : 'border-brand-500 bg-brand-500/10 hover:bg-brand-500/20 shadow-[0_0_30px_rgba(168,85,247,0.2)]'
            }`}
        >
          <span className="font-semibold text-lg animate-pulse text-stone-800 z-10">
            {breathing ? "Breathe In" : "Start"}
          </span>
        </div>
        
        <p className="mt-12 text-stone-500 max-w-sm relative z-10">
          Click the circle to start. Inhale for 4s, hold for 7s, exhale for 8s.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass p-6 rounded-2xl flex items-start gap-4 hover:border-brand-300 transition-colors cursor-pointer border border-stone-200">
          <div className="p-3 bg-red-100 text-red-600 rounded-xl"><HeartPulse /></div>
          <div>
            <h3 className="font-bold text-stone-800 mb-1">Body Scan</h3>
            <p className="text-sm text-stone-500">A quick 5-min guided scan to release physical tension.</p>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl flex items-start gap-4 hover:border-brand-300 transition-colors cursor-pointer border border-stone-200">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Brain /></div>
          <div>
            <h3 className="font-bold text-stone-800 mb-1">Focus Reset</h3>
            <p className="text-sm text-stone-500">Clear your mind before starting your next study block.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
