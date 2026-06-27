"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Send, Clock } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type JournalEntry = {
  id: string;
  date: string;
  text: string;
  insight: string | null;
};

export default function JournalPage() {
  const [entries, setEntries, isMounted] = useLocalStorage<JournalEntry[]>("mindmate-journals", []);
  const [entry, setEntry] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.trim()) return;
    setAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const insight = "I sense some anxiety about your upcoming mock tests. Remember that taking breaks is just as important as studying. Try the 4-7-8 breathing exercise to ground yourself.";
      
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' }),
        text: entry,
        insight,
      };

      setEntries((prev) => [newEntry, ...prev]);
      setAnalyzing(false);
      setEntry("");
    }, 1500);
  };

  if (!isMounted) return null; // Avoid hydration mismatch

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2 text-stone-800">
          <BookOpen className="w-8 h-8 text-brand-500" />
          Daily Journal
        </h1>
        <p className="text-stone-500">Write down your thoughts. Our AI will help you unpack them.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="How are you feeling about your studies today?"
            className="w-full h-64 p-6 glass rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-400/50 transition-all text-stone-700 placeholder:text-stone-400"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={analyzing || !entry.trim()}
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors shadow-lg shadow-brand-500/20 flex items-center gap-2"
            >
              {analyzing ? (
                <span className="animate-pulse flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" /> Save Entry
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border border-brand-100">
            <h3 className="font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2 flex items-center gap-2">
               <Clock className="w-4 h-4 text-brand-500" /> Past Entries
            </h3>
            
            {entries.length === 0 ? (
              <p className="text-sm text-stone-400 text-center py-4">No entries yet. Start writing!</p>
            ) : (
              <ul className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {entries.map((item) => (
                  <li key={item.id} className="text-sm bg-stone-50/50 p-3 rounded-xl border border-stone-100">
                    <p className="text-brand-600 font-medium text-xs mb-1">{item.date}</p>
                    <p className="text-stone-700 truncate line-clamp-2">{item.text}</p>
                    {item.insight && (
                       <div className="mt-2 pt-2 border-t border-stone-200/50">
                         <p className="text-xs text-stone-500 flex items-center gap-1 font-semibold">
                           <Sparkles className="w-3 h-3 text-brand-500" /> AI Insight
                         </p>
                         <p className="text-xs text-stone-600 mt-1 line-clamp-2">{item.insight}</p>
                       </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
