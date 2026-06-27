import Link from "next/link";
import { ArrowRight, BookOpen, Smile, MessageSquare, Zap, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Hero Section */}
      <section className="glass rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>AI-Powered Wellness</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Hi there, <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-brand-500">
              Ready to crush your goals?
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            MindMate is your personal AI companion for standardizing focus, relieving exam anxiety, and unlocking your full potential.
          </p>
          <div className="flex gap-4">
            <Link href="/journal" className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium transition-colors shadow-lg shadow-brand-500/25 flex items-center gap-2 group">
              Start Journaling
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/chat" className="px-6 py-3 rounded-xl glass hover:bg-white/10 text-white font-medium transition-colors flex items-center gap-2 group">
              Chat with AI
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/mood" className="glass p-6 rounded-2xl hover:bg-white-[0.03] transition-all hover:scale-[1.02] border border-white/5 hover:border-brand-500/30 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Log Mood</h3>
            <p className="text-sm text-gray-400">Track how you feel today and notice patterns over time.</p>
          </Link>
          
          <Link href="/journal" className="glass p-6 rounded-2xl hover:bg-white-[0.03] transition-all hover:scale-[1.02] border border-white/5 hover:border-brand-500/30 group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Daily Reflection</h3>
            <p className="text-sm text-gray-400">Write out your thoughts to clear your mind and reduce stress.</p>
          </Link>

          <Link href="/chat" className="glass p-6 rounded-2xl hover:bg-white-[0.03] transition-all hover:scale-[1.02] border border-white/5 hover:border-brand-500/30 group">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI Companion</h3>
            <p className="text-sm text-gray-400">Feeling overwhelmed? Talk it out with your empathetic AI assistant.</p>
          </Link>
        </div>
      </section>
      
      {/* Insight Preview */}
      <section className="glass rounded-2xl p-6 border-l-4 border-brand-500">
        <h3 className="text-sm text-brand-400 font-semibold uppercase tracking-wider mb-2">Insight of the Day</h3>
        <p className="text-gray-300 italic">"Taking a 5-minute break every hour improves retention by 20%. Remember to breathe during your study blocks."</p>
      </section>
    </div>
  );
}
