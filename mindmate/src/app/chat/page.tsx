"use client";

import { useState } from "react";
import { MessageSquare, Send, Bot, User } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm MindMate, your AI study companion. How are you feeling about your prep today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: "I understand that can be stressful. Have you tried breaking down the syllabus into smaller chunks? Let's take a deep breath." }]);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto h-[80vh] flex flex-col pt-4">
      <header className="mb-6 shrink-0 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-brand-400" />
          AI Companion
        </h1>
        <div className="px-3 py-1 bg-brand-500/20 text-brand-300 rounded-full text-xs font-medium border border-brand-500/30">
          Online
        </div>
      </header>

      <div className="flex-1 overflow-y-auto glass rounded-t-2xl p-4 space-y-4 border-b-0">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === "assistant" ? "" : "flex-row-reverse"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-brand-600 text-white" : "bg-gray-700 text-gray-200"}`}>
              {msg.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === "assistant" ? "bg-white/5 border border-white/10" : "bg-brand-600 text-white"}`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="shrink-0 p-4 glass rounded-b-2xl border-t border-white/10 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500/50 text-white transition-colors"
        />
        <button type="submit" className="px-4 bg-brand-600 hover:bg-brand-500 rounded-xl text-white transition-colors flex items-center justify-center disabled:opacity-50" disabled={!input.trim()}>
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
