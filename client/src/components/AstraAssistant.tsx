// Re-synchronized ASTRA Neural Link
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ASTRA_SYSTEM_PROMPT, ASTRA_QUICK_CHIPS } from '@/data/astraData';
import { X, Send, Copy, Check, ChevronDown, Sparkles, Brain, Cpu, ShieldCheck, Terminal, Maximize2, Activity } from 'lucide-react';
import { NeuralCore } from './NeuralCore';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

// --- Constants ---
const MAX_REQUESTS_PER_DAY = 1200;
const SESSION_CACHE_KEY_PREFIX = 'astra_cache_v2_';
const USAGE_TRACKER_KEY = 'astra_usage_tracker';

// --- Components ---
const AstraLogo = ({ isStreaming }: { isStreaming: boolean }) => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className="absolute inset-0 bg-[#bf94ff]/10 rounded-full animate-pulse" />
    <NeuralCore isStreaming={isStreaming} className="w-10 h-10" />
    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00f5ff] rounded-full border-2 border-[#000000] shadow-[0_0_10px_#00f5ff]" />
  </div>
);

export function AstraAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: "Greetings. I am **ASTRA** — *Astreon's Synthetic Terminal & Research Assistant*. I am Roushan's custom neural interface. I can provide intel on his architecture, projects, or assist with any complex queries. How shall we proceed?",
    id: 'welcome',
  }]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsInitializing(true);
      const timer = setTimeout(() => setIsInitializing(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // --- Rate Limiting Logic ---
  const getUsage = () => {
    const data = localStorage.getItem(USAGE_TRACKER_KEY);
    if (!data) return { count: 0, date: new Date().toDateString() };
    const parsed = JSON.parse(data);
    if (parsed.date !== new Date().toDateString()) {
      return { count: 0, date: new Date().toDateString() };
    }
    return parsed;
  };

  const incrementUsage = () => {
    const usage = getUsage();
    localStorage.setItem(USAGE_TRACKER_KEY, JSON.stringify({
      count: usage.count + 1,
      date: usage.date
    }));
  };

  // --- Caching Logic ---
  const getCachedResponse = (text: string) => {
    const key = SESSION_CACHE_KEY_PREFIX + btoa(text.trim().toLowerCase()).slice(0, 32);
    return sessionStorage.getItem(key);
  };

  const setCachedResponse = (text: string, response: string) => {
    const key = SESSION_CACHE_KEY_PREFIX + btoa(text.trim().toLowerCase()).slice(0, 32);
    sessionStorage.setItem(key, response);
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom(isStreaming ? 'auto' : 'smooth');
  }, [messages, isStreaming]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed || isStreaming) return;

    // Check Rate Limit
    const usage = getUsage();
    if (usage.count >= MAX_REQUESTS_PER_DAY) {
      setMessages(prev => [...prev, 
        { role: 'user', content: trimmed, id: Date.now().toString() },
        { role: 'assistant', content: "⚠️ **Daily Limit Reached**: System protocols permit 1200 transmissions per 24 hours. Limit reset in several hours.", id: (Date.now() + 1).toString() }
      ]);
      return;
    }

    const userMsg: Message = { role: 'user', content: trimmed, id: Date.now().toString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { role: 'assistant', content: '', id: assistantId }]);

    // Check Cache
    const cached = getCachedResponse(trimmed);
    if (cached) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < cached.length) {
          const chunk = cached.slice(i, i + 8);
          setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: m.content + chunk } : m));
          i += 8;
        } else {
          clearInterval(interval);
          setIsStreaming(false);
          incrementUsage();
        }
      }, 10);
      return;
    }

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: "ERROR: Neural Link Failed. API Key missing." } : m));
      setIsStreaming(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    // Waterfall model list: try each in order if prev returns error
    const MODEL_FALLBACKS = [
      'google/gemini-2.0-flash-exp:free',
      'google/gemini-2.0-flash-lite-preview-02-05:free', // Re-adding just in case naming was the issue
      'meta-llama/llama-3.3-70b-instruct:free',
      'google/gemma-3-27b-it:free',
      'deepseek/deepseek-r1:free',
      'openrouter/auto', // Smart auto-router as last resort
    ];

    let succeeded = false;
    let fullContent = '';

    for (const model of MODEL_FALLBACKS) {
      if (controller.signal.aborted) break;
      
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'ASTRA AI Assistant',
          },
          signal: controller.signal,
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: ASTRA_SYSTEM_PROMPT },
              ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
              { role: 'user', content: trimmed }
            ],
            stream: true,
          }),
        });

        if (response.status === 400 || response.status === 404 || response.status === 429) {
          console.warn(`Model ${model} failed with status ${response.status}. Trying next...`);
          continue;
        }

        if (!response.ok) throw new Error('API Sync Failed');

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices[0]?.delta?.content || '';
                fullContent += content;
                setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: m.content + content } : m));
              } catch (e) {}
            }
          }
        }

        if (fullContent) {
          succeeded = true;
          setCachedResponse(trimmed, fullContent);
          incrementUsage();
          break; // Exit loop on success
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') break;
        console.error(`Attempt with ${model} failed:`, err);
        continue;
      }
    }

    if (!succeeded && !controller.signal.aborted) {
      setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: "⚠️ Connectivity Error. All neural nodes unreachable. Please check API key or network." } : m));
    }

    setIsStreaming(false);
    abortRef.current = null;
  }, [messages, isStreaming]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
        {!isOpen && (
          <div className="bg-[#000000]/90 border border-[#bf94ff]/40 px-3 py-1.5 rounded-full text-[10px] font-mono text-[#d1b3ff] uppercase tracking-widest backdrop-blur-md animate-bounce">
            Astra Core Active
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group p-1 rounded-full border-2 transition-all duration-500 hover:scale-110 active:scale-95 ${isOpen ? 'border-[#d1b3ff] bg-[#bf94ff]/10' : 'border-[#bf94ff] bg-[#000000]'}`}
          style={{ boxShadow: isOpen ? '0 0 30px rgba(191,148,255,0.4)' : '0 0 15px rgba(191,148,255,0.2)' }}
        >
          {isOpen ? <X className="w-10 h-10 text-[#d1b3ff]" /> : <AstraLogo isStreaming={isStreaming} />}
        </button>
      </div>

      {/* Main Panel */}
      {isOpen && (
        <div 
          data-lenis-prevent
          className="fixed bottom-24 right-6 w-[min(420px,calc(100vw-3rem))] h-[min(650px,calc(100vh-140px))] bg-[#000000]/98 border border-[#bf94ff]/30 rounded-2xl z-[9998] flex flex-col shadow-[0_0_50px_rgba(191,148,255,0.15)] backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Floating Tactical Brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#bf94ff]/40 rounded-tl-2xl z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#bf94ff]/40 rounded-tr-2xl z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#bf94ff]/40 rounded-bl-2xl z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#bf94ff]/40 rounded-br-2xl z-20 pointer-events-none" />

          {/* Scanning Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00f5ff]/20 animate-scan-line-fast z-30 pointer-events-none" />

          {/* Initialization Overlay */}
          <AnimatePresence>
            {isInitializing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center rounded-2xl"
              >
                <div className="w-24 h-24 mb-6">
                  <NeuralCore isStreaming={true} />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs font-mono text-[#00f5ff] animate-pulse tracking-[0.4em] uppercase">Initializing_Link...</span>
                  <div className="w-32 h-[2px] bg-white/10 overflow-hidden rounded-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, ease: "linear" }}
                      className="h-full bg-[#bf94ff]"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="relative p-5 border-b border-[#bf94ff]/20 flex items-center justify-between bg-black/40 backdrop-blur-md rounded-t-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg border border-[#bf94ff]/30 flex items-center justify-center bg-[#bf94ff]/5 relative overflow-hidden group">
                <NeuralCore isStreaming={isStreaming} className="w-10 h-10" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-[#bf94ff]/20 to-transparent transition-opacity" />
              </div>
              <div>
                <h3 className="text-sm font-black font-orbitron text-white tracking-[0.3em] uppercase">ASTRA CORE</h3>
                <div className="flex items-center gap-2">
                  <Activity size={10} className="text-[#00f5ff] animate-pulse" />
                  <span className="text-[9px] font-mono text-[#00f5ff] uppercase tracking-widest">Neural Sync active</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-mono text-white/40 uppercase">LATENCY: {Math.floor(Math.random()*20+5)}ms</span>
                <span className="text-[8px] font-mono text-[#bf94ff] uppercase">SECURE_LINK: AES_256</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-[#bf94ff] transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div 
            data-lenis-prevent
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed relative overflow-hidden ${
                  msg.role === 'user' 
                  ? 'bg-[#bf94ff]/10 border border-[#bf94ff]/30 text-white rounded-br-none shadow-[0_0_20px_rgba(191,148,255,0.1)]' 
                  : 'bg-white/[0.03] border border-white/10 text-white/90 rounded-bl-none backdrop-blur-sm'
                }`}>
                  {/* Message Decorator */}
                  <div className={`absolute top-0 ${msg.role === 'user' ? 'right-0 border-t border-r' : 'left-0 border-t border-l'} w-2 h-2 border-[#00f5ff]/40`} />
                  
                  {msg.content ? (
                    <div className="whitespace-pre-wrap break-words relative z-10">{msg.content}</div>
                  ) : (
                    <div className="flex gap-1.5 py-2 px-1">
                      {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-[#00f5ff] rounded-full animate-bounce shadow-[0_0_8px_#00f5ff]" style={{ animationDelay: `${i * 0.15}s` }} />)}
                    </div>
                  )}
                  
                  {/* Metadata Tag */}
                  <div className={`absolute bottom-1 ${msg.role === 'user' ? 'left-2' : 'right-2'} text-[6px] font-mono opacity-20 uppercase tracking-[0.2em]`}>
                    {msg.role === 'user' ? 'User_Transmit' : 'Astra_Output'} // {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips */}
          {!isStreaming && messages.length < 3 && (
            <div className="px-4 py-2 flex gap-2 flex-wrap border-t border-white/5 bg-white/[0.02]">
              {ASTRA_QUICK_CHIPS.slice(0, 3).map(chip => (
                <button
                  key={chip.label}
                  onClick={() => sendMessage(chip.prompt)}
                  className="px-3 py-1 rounded-full border-[#00f5ff]/20 bg-[#00f5ff]/5 text-[10px] font-mono text-[#00f5ff] hover:bg-[#00f5ff]/20 transition-colors uppercase"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-[#bf94ff]/20 bg-[#bf94ff]/5 rounded-b-2xl">
            <div className="relative flex items-end gap-2 bg-black/40 border border-[#bf94ff]/30 rounded-xl p-1.5 focus-within:border-[#d1b3ff] transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Synchronize request..."
                rows={1}
                className="flex-1 bg-transparent border-none outline-none text-white text-sm p-2 resize-none max-h-32 custom-scrollbar font-mono placeholder:text-white/20"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isStreaming}
                className={`p-2 rounded-lg transition-all ${input.trim() && !isStreaming ? 'bg-[#bf94ff] text-white shadow-[0_0_15px_#bf94ff]' : 'bg-white/10 text-white/20'}`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-2 flex justify-between items-center px-1">
              <span className="text-[8px] font-mono text-white/30 tracking-widest">ENCRYPTION: AES-256</span>
              <span className="text-[8px] font-mono text-white/30 tracking-widest">{getUsage().count} / 1200 TRANSFERS USED</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
