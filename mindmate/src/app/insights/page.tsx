"use client";

import { BarChart2, TrendingUp, Zap } from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
          <BarChart2 className="w-8 h-8 text-brand-400" />
          Weekly Insights
        </h1>
        <p className="text-gray-400">See your progress and identify patterns.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <TrendingUp className="text-emerald-400" /> 
            Mood Trend
          </h3>
          <div className="h-48 flex items-end gap-2 justify-between mt-auto">
            {/* Dummy Bar Chart */}
            {[2, 3, 4, 3, 5, 4, 4].map((v, i) => (
              <div key={i} className="w-full bg-brand-500/20 rounded-t-lg relative group">
                <div style={{ height: `${v * 20}%` }} className="absolute bottom-0 w-full bg-brand-500 rounded-t-lg transition-all" />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-2xl" />
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
            <Zap className="text-brand-400" /> 
            AI Summary
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Your mood has been generally positive this week, with a notable dip on Tuesday corresponding to your "Physics Mock" journal entry.
          </p>
          <ul className="space-y-2 text-sm text-gray-400 list-disc list-inside">
            <li>Top Stressor: Mock Tests</li>
            <li>Best Day: Friday</li>
            <li>Recommended: Short daily walks</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
