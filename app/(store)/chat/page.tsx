'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect } from 'react';
import { SendHorizontal, BotMessageSquare, User } from 'lucide-react';

export default function ChatPage() {
  const { messages, input = '', handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    // MAIN LAYOUT: Full screen, prevents body scroll
    <div className="flex flex-col h-[calc(100vh-64px)] w-full max-w-7xl mx-auto bg-gray-50 dark:bg-black/5">
      
      {/* 1. COMPACT APP HEADER */}
      <div className="sticky top-0 z-20 flex items-center gap-3 p-4 bg-white dark:bg-zinc-950 border-b shadow-sm">
        <div className="p-2.5 rounded-full bg-red-100 dark:bg-red-950/50">
          <BotMessageSquare className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h1 className="font-semibold text-lg text-black dark:text-white">Nexa-Mart Assistant</h1>
          <p className="text-xs text-green-600 font-medium">
            {isLoading ? 'Thinking...' : 'Always Online'}
          </p>
        </div>
      </div>

      {/* 2. CHAT AREA: Scrolls independently */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gray-50 dark:bg-zinc-900">
        
        {/* EMPTY STATE */}
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-16 px-6 bg-white dark:bg-zinc-950 rounded-2xl shadow-sm border border-black/5 mt-6">
            <div className="p-4 rounded-full bg-red-100 dark:bg-red-950/50 inline-block mb-5">
              <BotMessageSquare className="w-10 h-10 text-red-600" />
            </div>
            <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Hello! I'm your Shopping Assistant 👋</p>
            <p className="text-sm mt-2 text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">Ask me about product specs, shipping updates, or Nexa-Mart offers.</p>
          </div>
        )}

        {/* MESSAGES LIST */}
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div key={m.id} className={`flex items-start gap-2 ${isUser ? 'justify-end' : ''}`}>
              {/* AI Avatar */}
              {!isUser && (
                <div className="shrink-0 p-1.5 rounded-full bg-gray-200 dark:bg-zinc-700 mt-0.5">
                  <BotMessageSquare className="w-4 h-4 text-black dark:text-white" />
                </div>
              )}

              {/* Chat Bubble */}
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] md:max-w-[70%] shadow-sm ${
                  isUser
                    ? 'bg-red-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-zinc-950 text-black dark:text-zinc-100 rounded-bl-none border border-black/5'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="shrink-0 p-1.5 rounded-full bg-gray-300 dark:bg-zinc-700 mt-0.5">
                  <User className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />
                </div>
              )}
            </div>
          );
        })}
        
        {/* Dummy div to anchor the auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. FIX MOBILE-STYLE INPUT BAR */}
      <form 
        onSubmit={handleSubmit} 
        className="sticky bottom-0 z-10 w-full p-3 bg-white dark:bg-zinc-950 border-t border-black/5 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]"
      >
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700/50 rounded-full text-sm text-black dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:bg-white"
            value={input ?? ''}
            placeholder="Write your question..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !(input ?? '').trim()}
            className="shrink-0 p-3 bg-red-600 text-white rounded-full disabled:bg-gray-400 hover:bg-red-700 transition-all shadow-md active:scale-95 disabled:pointer-events-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
            ) : (
              <SendHorizontal className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}