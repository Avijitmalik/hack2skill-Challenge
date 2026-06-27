"use client";

import { useState } from "react";
import { MessageSquare, Send, Bot, User, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Message = {
  role: "assistant" | "user";
  content: string;
};

const defaultMessage: Message = { 
  role: "assistant", 
  content: "Hi! I'm MindMate, your AI study companion. How are you feeling about your prep today?" 
};

export default function ChatPage() {
  const [messages, setMessages, isMounted] = useLocalStorage<Message[]>("mindmate-chat", [defaultMessage]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: "I hear you. Balancing all these subjects can be intense. Have you tried the Pomodoro technique? Breaking your study sessions into 25-minute blocks might help you focus without burning out." }]);
    }, 1200);
  };

  const clearChat = () => {
    if(confirm("Are you sure you want to clear your conversation history?")) {
      setMessages([defaultMessage]);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-3xl mx-auto h-[80vh] flex flex-col pt-4">
      <header className="mb-6 shrink-0 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3 text-stone-800">
          <MessageSquare className="w-6 h-6 text-brand-500" />
          AI Companion
        </h1>
        <div className="flex items-center gap-4">
          <button onClick={clearChat} className="p-2 text-stone-400 hover:text-red-500 transition-colors" title="Clear Chat">
            <Trash2 className="w-5 h-5" />
          </button>
          <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto glass rounded-t-2xl p-4 space-y-4 border-b-0">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === "assistant" ? "" : "flex-row-reverse"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-brand-500 text-white" : "bg-stone-300 text-stone-600"}`}>
              {msg.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === "assistant" ? "bg-white border border-stone-100 shadow-sm text-stone-700" : "bg-brand-500 text-white"}`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="shrink-0 p-4 glass rounded-b-2xl border-t border-stone-100 flex gap-3 shadow-lg">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-white/50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-400 text-stone-800 transition-colors"
        />
        <button type="submit" className="px-5 bg-brand-500 hover:bg-brand-600 rounded-xl text-white transition-colors flex items-center justify-center disabled:opacity-50" disabled={!input.trim()}>
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
