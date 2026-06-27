"use client";

import { useState } from "react";
import { Smile, TrendingUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const moods = [
  { value: 1, label: "Awful", color: "bg-red-50 text-red-600 border-red-200" },
  { value: 2, label: "Bad", color: "bg-orange-50 text-orange-600 border-orange-200" },
  { value: 3, label: "Okay", color: "bg-amber-50 text-amber-600 border-amber-200" },
  { value: 4, label: "Good", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  { value: 5, label: "Awesome", color: "bg-teal-50 text-teal-600 border-teal-200" },
];

type MoodLog = {
  id: string;
  date: string;
  value: number;
};

export default function MoodTrackerPage() {
  const [logs, setLogs, isMounted] = useLocalStorage<MoodLog[]>("mindmate-moods", []);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = (val: number) => {
    setSelectedMood(val);
    setLogs(prev => [
      ...prev, 
      { id: Date.now().toString(), date: new Date().toISOString(), value: val }
    ]);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold flex flex-col items-center gap-3 mb-2 text-stone-800">
          <Smile className="w-10 h-10 text-brand-500 mb-2" />
          How are you feeling today?
        </h1>
        <p className="text-stone-500">Tracking your mood helps our AI suggest better coping strategies.</p>
      </header>

      <div className="flex justify-center gap-4 flex-wrap">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => handleSave(mood.value)}
            className={cn(
              "p-6 rounded-2xl border transition-all duration-300 w-32 flex flex-col items-center gap-3",
              selectedMood === mood.value ? mood.color + " scale-110 shadow-lg border-opacity-100" : "border-stone-200 glass text-stone-600 hover:border-brand-300 hover:scale-105"
            )}
          >
            <span className="text-3xl font-bold">{mood.value}</span>
            <span className="text-sm font-medium">{mood.label}</span>
          </button>
        ))}
      </div>

      {saved && (
        <div className="mt-12 glass p-6 rounded-2xl max-w-xl mx-auto border-t-4 border-brand-500 animate-in zoom-in-95 fade-in duration-300">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-2 text-stone-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Mood Logged Successfully!
          </h3>
          <p className="text-stone-600 text-sm">
            {selectedMood && selectedMood <= 2 
              ? "It sounds like you're having a tough day. Take a break, step away from your books, and check out the AI companion for some support." 
              : "Great to see you're feeling positive! Keep up the momentum."}
          </p>
        </div>
      )}

      {logs.length > 0 && (
         <div className="mt-16 text-center text-stone-500 text-sm">
            <p>You have logged your mood {logs.length} time(s). Check the Insights tab to see your progress!</p>
         </div>
      )}
    </div>
  );
}
