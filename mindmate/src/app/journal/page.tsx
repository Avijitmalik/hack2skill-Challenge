"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Send } from "lucide-react";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.trim()) return;
    setAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      setInsight("I sense some anxiety about your upcoming mock tests. Remember that taking breaks is just as important as studying. You're doing great—try the 4-7-8 breathing exercise to ground yourself.");
      setAnalyzing(false);
      setEntry("");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-brand-400" />
          Daily Journal
        </h1>
        <p className="text-gray-400">Write down your thoughts. Our AI will help you unpack them.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="How are you feeling about your studies today?"
            className="w-full h-64 p-6 glass rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-gray-200 placeholder:text-gray-500"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={analyzing || !entry.trim()}
              className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors shadow-lg shadow-brand-500/25 flex items-center gap-2"
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
          {insight ? (
            <div className="glass p-6 rounded-2xl border border-brand-500/30 relative overflow-hidden animate-in zoom-in duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-emerald-400" />
              <h3 className="font-semibold text-brand-300 flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4" /> AI Insight
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">{insight}</p>
            </div>
          ) : (
            <div className="glass p-6 rounded-2xl border border-white/5 opacity-50">
              <p className="text-gray-400 text-sm text-center">Write a journal entry to get personalized AI insights.</p>
            </div>
          )}

          <div className="glass p-6 rounded-2xl border border-white/5">
            <h3 className="font-semibold mb-4 border-b border-white/10 pb-2">Recent Entries</h3>
            <ul className="space-y-3">
              <li className="text-sm">
                <p className="text-gray-400 mb-1">Yesterday</p>
                <p className="text-gray-300 truncate">Felt really burnt out after fixing the physics mock...</p>
              </li>
              <li className="text-sm">
                <p className="text-gray-400 mb-1">Monday</p>
                <p className="text-gray-300 truncate">I'm finally understanding organic chemistry! Feeling confident.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
