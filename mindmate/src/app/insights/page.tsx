"use client";

import { BarChart2, TrendingUp, Zap, Calendar } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function InsightsPage() {
  // Try to grab real mood logs, if none, fallback to empty array
  const [moodLogs, , isMounted] = useLocalStorage<{id: string, date: string, value: number}[]>("mindmate-moods", []);

  if (!isMounted) return null;

  // We only care about the last 7 items for chart
  const recentLogs = moodLogs.slice(-7);
  const hasData = recentLogs.length > 0;
  const dummyData = [3, 4, 2, 4, 5, 4, 4];
  const chartData = hasData ? recentLogs.map(l => l.value) : dummyData;

  const averageMood = hasData ? (recentLogs.reduce((a, b) => a + b.value, 0) / recentLogs.length).toFixed(1) : "N/A";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2 text-stone-800">
          <BarChart2 className="w-8 h-8 text-brand-500" />
          Weekly Insights
        </h1>
        <p className="text-stone-500">See your progress and identify patterns.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center gap-2 text-stone-800">
              <TrendingUp className="text-emerald-500" /> 
              Mood Trend
            </h3>
            {hasData && <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded font-semibold">Avg: {averageMood}/5</span>}
          </div>
          
          <div className="h-48 flex items-end gap-2 justify-between mt-auto pt-6">
            {chartData.map((v, i) => (
              <div key={i} className="w-full bg-brand-100 rounded-t-lg relative group h-full flex items-end">
                <div 
                  style={{ height: `${(v / 5) * 100}%` }} 
                  className={`w-full rounded-t-lg transition-all ${!hasData ? 'bg-stone-300' : 'bg-brand-400'}`} 
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-stone-400 mt-2">
            {!hasData ? (
               <><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></>
            ) : (
               recentLogs.map((log, idx) => (
                 <span key={idx} className="truncate max-w-[40px]" title={new Date(log.date).toLocaleDateString()}>{new Date(log.date).getDate()}</span>
               ))
            )}
          </div>
          {!hasData && <p className="text-xs text-stone-400 text-center mt-2 italic">Showing sample data. Log your mood to see actual trends.</p>}
        </div>

        <div className="glass p-6 rounded-2xl relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-200 blur-2xl" />
          
          <h3 className="font-bold text-lg flex items-center gap-2 mb-4 text-stone-800 relative z-10">
            <Zap className="text-brand-500" /> 
            AI Summary
          </h3>
          
          <div className="bg-white/60 p-4 rounded-xl border border-stone-100 mb-4 relative z-10">
            <p className="text-stone-700 text-sm leading-relaxed font-medium">
              {hasData 
                ? "You've been consistent with tracking! Based on your logs, your mood fluctuates during the mid-week. Consider scheduling lighter study sessions on those days."
                : "Your AI summary will appear here once you log enough journal entries and moods."}
            </p>
          </div>

          <ul className="space-y-3 text-sm text-stone-600 mt-auto relative z-10">
            <li className="flex items-center gap-2"><Calendar className="w-4 h-4 text-stone-400"/> Top Stressor: <span className="font-semibold text-stone-800">Mock Tests</span></li>
            <li className="flex items-center gap-2"><Calendar className="w-4 h-4 text-stone-400"/> Best Strategy: <span className="font-semibold text-stone-800">Pomodoro Breaks</span></li>
            <li className="flex items-center gap-2"><Calendar className="w-4 h-4 text-stone-400"/> Recommended: <span className="font-semibold text-brand-600">Short daily walks</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
