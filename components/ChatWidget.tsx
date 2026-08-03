'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';
import { SendHorizontal, BotMessageSquare, X, Sparkles, Loader2 } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === 'submitted' || status === 'streaming';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    // AI SDK v5 input submit
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <>
      {/* 1. FLOATING META-STYLE BUTTON (Bottom Right) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 p-3.5 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95 group"
        aria-label="Toggle AI Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <div className="relative">
              <Sparkles className="w-6 h-6 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
              </span>
            </div>
            <span className="hidden group-hover:inline text-sm font-medium pr-1">Meta AI</span>
          </>
        )}
      </button>

      {/* 2. CHAT POPUP WINDOW */}
      {isOpen && (
        <div
          className="fixed z-50 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 bottom-[5.5rem] md:bottom-24"
          style={{
            right: '1rem',
            top: 'max(1rem, env(safe-area-inset-top, 0px))',
            maxHeight: '520px',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                <BotMessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight">Nexa-Mart Assistant</h3>
                <p className="text-[10px] text-white/80">Powered by AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-zinc-900 text-xs">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-10 px-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-950/50 rounded-full flex items-center justify-center mx-auto mb-3 text-red-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Hi! Main Nexa-Mart AI hoon 👋</p>
                <p className="text-xs text-gray-500 mt-1">Products, delivery, ya discount ke baray me kuch bhi poochain.</p>
              </div>
            )}

            {messages.map((m) => {
              const isUser = m.role === 'user';
              
              // Handle AI SDK v5 parts or legacy content format cleanly
              let messageText = '';
              if (m.parts && Array.isArray(m.parts)) {
                messageText = m.parts
                  .map((p: any) => (p.type === 'text' ? p.text : ''))
                  .join('');
              } else if (typeof (m as any).content === 'string') {
                messageText = (m as any).content;
              }

              if (!messageText) return null;

              return (
                <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                      isUser
                        ? 'bg-red-600 text-white rounded-br-none shadow-sm'
                        : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-none border border-gray-200 dark:border-zinc-700 shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{messageText}</div>
                  </div>
                </div>
              );
            })}

            {/* Thinking / Loading Spinner */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-white dark:bg-zinc-800 text-zinc-500 rounded-2xl rounded-bl-none border border-gray-200 dark:border-zinc-700 shadow-sm flex items-center gap-2 text-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-red-600" />
                  <span>AI reply kar raha hai...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-2.5 bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 px-3.5 py-2.5 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-full text-xs text-black dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={input}
                placeholder="Ask AI..."
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 bg-red-600 text-white rounded-full disabled:bg-gray-400 hover:bg-red-700 transition shadow-md shrink-0"
              >
                <SendHorizontal className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}