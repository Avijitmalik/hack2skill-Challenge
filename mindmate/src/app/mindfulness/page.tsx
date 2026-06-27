"use client";

import { Zap, HeartPulse, Brain, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function MindfulnessPage() {
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState("Start");
  
  const [expandedCard, setExpandedCard] = useState<"scan" | "focus" | null>(null);

  // Breathing Timer Logic
  useEffect(() => {
    if (!isBreathingActive) {
      setBreathPhase("Start");
      return;
    }

    let isMounted = true;
    let currentTimeout: ReturnType<typeof setTimeout>;

    const cycleBreath = () => {
      if (!isMounted) return;
      
      setBreathPhase("Breathe In...");
      currentTimeout = setTimeout(() => {
        if (!isMounted) return;
        setBreathPhase("Hold...");
        
        currentTimeout = setTimeout(() => {
          if (!isMounted) return;
          setBreathPhase("Breathe Out...");
          
          currentTimeout = setTimeout(() => {
            if (!isMounted) return;
            cycleBreath();
          }, 8000); // Exhale for 8s
        }, 7000); // Hold for 7s
      }, 4000); // Inhale for 4s
    };

    cycleBreath();

    return () => {
      isMounted = false;
      clearTimeout(currentTimeout);
    };
  }, [isBreathingActive]);

  const bodyScanInstructions = [
    "Sit comfortably with your feet flat on the floor.",
    "Close your eyes and take a deep, slow breath.",
    "Bring your attention to your toes. Notice any tension, and mentally release it.",
    "Slowly scan upwards: ankles, calves, knees, and thighs.",
    "Move through your torso, relaxing your shoulders away from your ears.",
    "Notice your jaw and forehead, softening any tight muscles.",
    "Take one last deep breath and slowly open your eyes."
  ];

  const focusResetInstructions = [
    "Look away from your computer screen.",
    "Find an object roughly 20 feet away.",
    "Focus entirely on that object for 20 seconds (the 20-20-20 rule).",
    "Close your eyes and visualize a calm, quiet place.",
    "Remind yourself of your primary goal for today's study session.",
    "Take 3 deep breaths, open your eyes, and return to your work refreshed."
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold flex flex-col items-center gap-3 mb-2 text-stone-800">
          <Zap className="w-10 h-10 text-brand-500" />
          Mindfulness Hub
        </h1>
        <p className="text-stone-500">Take a break, reset your mind.</p>
      </header>

      {/* 4-7-8 Breathing Tool */}
      <div className="glass p-12 rounded-3xl text-center max-w-lg mx-auto flex flex-col items-center overflow-hidden relative border border-stone-200">
        <div className={cn(
          "absolute inset-0 bg-brand-50 transition-all",
          isBreathingActive && breathPhase === "Breathe In..." ? "opacity-100 duration-[4000ms]" : "",
          isBreathingActive && breathPhase === "Hold..." ? "opacity-100 duration-1000 bg-brand-100" : "",
          isBreathingActive && breathPhase === "Breathe Out..." ? "opacity-0 duration-[8000ms]" : "",
          !isBreathingActive ? "opacity-0" : ""
        )} />
        
        <h2 className="text-2xl font-bold mb-8 text-stone-800 relative z-10">4-7-8 Breathing</h2>
        
        <div 
          onClick={() => setIsBreathingActive(!isBreathingActive)}
          className={cn(
            "w-48 h-48 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all z-10",
            !isBreathingActive 
              ? "border-brand-500 bg-white hover:bg-brand-50 shadow-lg text-stone-800" 
              : "border-brand-500 bg-brand-500 text-white shadow-[0_0_40px_rgba(216,105,64,0.4)]",
            isBreathingActive && breathPhase === "Breathe In..." && "scale-125 duration-[4000ms]",
            isBreathingActive && breathPhase === "Hold..." && "scale-125 duration-1000 border-brand-600 bg-brand-600",
            isBreathingActive && breathPhase === "Breathe Out..." && "scale-100 duration-[8000ms]"
          )}
        >
          <div className="flex flex-col items-center">
             <span className={cn("font-bold text-xl", isBreathingActive && "animate-pulse")}>
               {breathPhase}
             </span>
             {isBreathingActive && (
               <span className="text-xs font-semibold mt-1 opacity-80">(Click to Stop)</span>
             )}
          </div>
        </div>
        
        <p className="mt-12 text-stone-500 max-w-sm relative z-10 text-sm">
          {!isBreathingActive 
            ? "Click the circle to start. Inhale quietly through your nose for 4s, hold your breath for 7s, exhale completely through your mouth for 8s." 
            : "Follow the prompts. Focus only on your breath."}
        </p>
      </div>
      
      {/* Exercises Expandable Cards */}
      <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto mt-12">
        {/* Body Scan */}
        <div 
          onClick={() => setExpandedCard(expandedCard === "scan" ? null : "scan")}
          className="glass p-6 rounded-2xl flex flex-col hover:border-brand-300 transition-colors cursor-pointer border border-stone-200"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-red-100 text-red-600 rounded-xl"><HeartPulse /></div>
               <div className="text-left">
                 <h3 className="font-bold text-stone-800 mb-1">Guided Body Scan</h3>
                 <p className="text-sm text-stone-500">Release physical tension step-by-step.</p>
               </div>
            </div>
            {expandedCard === "scan" ? <ChevronUp className="text-stone-400" /> : <ChevronDown className="text-stone-400" />}
          </div>
          
          {expandedCard === "scan" && (
            <div className="mt-6 pt-6 border-t border-stone-100 animate-in slide-in-from-top-2">
              <ol className="space-y-4 list-decimal list-outside ml-4 text-stone-600 text-sm">
                {bodyScanInstructions.map((step, idx) => <li key={idx} className="pl-2 leading-relaxed">{step}</li>)}
              </ol>
            </div>
          )}
        </div>

        {/* Focus Reset */}
        <div 
           onClick={() => setExpandedCard(expandedCard === "focus" ? null : "focus")}
           className="glass p-6 rounded-2xl flex flex-col hover:border-brand-300 transition-colors cursor-pointer border border-stone-200"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Brain /></div>
               <div className="text-left">
                 <h3 className="font-bold text-stone-800 mb-1">Focus Reset</h3>
                 <p className="text-sm text-stone-500">Clear your mind before your next study block.</p>
               </div>
            </div>
            {expandedCard === "focus" ? <ChevronUp className="text-stone-400" /> : <ChevronDown className="text-stone-400" />}
          </div>
          
          {expandedCard === "focus" && (
            <div className="mt-6 pt-6 border-t border-stone-100 animate-in slide-in-from-top-2">
               <ol className="space-y-4 list-decimal list-outside ml-4 text-stone-600 text-sm">
                {focusResetInstructions.map((step, idx) => <li key={idx} className="pl-2 leading-relaxed">{step}</li>)}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
