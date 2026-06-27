"use client";

import { useState } from "react";
import { Smile, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const moods = [
  { value: 1, label: "Awful", color: "bg-red-500/20 text-red-500 border-red-500/30" },
  { value: 2, label: "Bad", color: "bg-orange-500/20 text-orange-500 border-orange-500/30" },
  { value: 3, label: "Okay", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" },
  { value: 4, label: "Good", color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" },
  { value: 5, label: "Awesome", color: "bg-green-500/20 text-green-500 border-green-500/30" },
];

export default function MoodTrackerPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold flex flex-col items-center gap-3 mb-2">
          <Smile className="w-10 h-10 text-brand-400 mb-2" />
          How are you feeling today?
        </h1>
        <p className="text-gray-400">Tracking your mood helps our AI suggest better coping strategies.</p>
      </header>

      <div className="flex justify-center gap-4 flex-wrap">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood.value)}
            className={cn(
              "p-6 rounded-2xl border transition-all duration-300 w-32 flex flex-col items-center gap-3",
              selectedMood === mood.value ? mood.color + " scale-110 shadow-lg" : "border-white/5 glass text-gray-400 hover:border-white/20 hover:scale-105"
            )}
          >
            <span className="text-3xl font-bold">{mood.value}</span>
            <span className="text-sm font-medium">{mood.label}</span>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mt-12 glass p-6 rounded-2xl max-w-xl mx-auto border-t-4 border-brand-500 animate-in slide-in-from-bottom-4">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-brand-400" />
            Mood Logged
          </h3>
          <p className="text-gray-400 text-sm">
            {selectedMood <= 2 
              ? "It sounds like you're having a tough day. Take a break, step away from your books, and check out the AI companion for some support." 
              : "Great to see you're feeling positive! Keep up the momentum."}
          </p>
        </div>
      )}
    </div>
  );
}
