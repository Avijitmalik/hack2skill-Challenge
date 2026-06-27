"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Smile, MessageSquare, BarChart2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/mood", label: "Mood Tracker", icon: Smile },
  { href: "/chat", label: "AI Companion", icon: MessageSquare },
  { href: "/insights", label: "Insights", icon: BarChart2 },
  { href: "/mindfulness", label: "Mindfulness", icon: Zap },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen shrink-0 glass border-r border-white/10 flex flex-col p-4 sticky top-0 hidden md:flex">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">
          MindMate <span className="text-brand-400">AI</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-1">
        {routes.map((route) => {
          const isActive = pathname === route.href;
          const Icon = route.icon;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-brand-500/10 text-brand-400"
                  : "text-gray-400 hover:text-gray-100 hover:bg-white/5"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )}
              />
              <span className="font-medium">{route.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 rounded-xl bg-gradient-to-r from-brand-600/20 to-brand-900/20 border border-brand-500/20 mt-auto">
        <p className="text-sm text-gray-300 font-medium">Exam Prep Mode</p>
        <p className="text-xs text-gray-500 mt-1">Stay focused and balanced.</p>
      </div>
    </aside>
  );
}
