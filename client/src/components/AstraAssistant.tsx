// Re-synchronized ASTRA Neural Link
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ASTRA_SYSTEM_PROMPT, ASTRA_QUICK_CHIPS } from '@/data/astraData';
import { X, Send, Copy, Check, ChevronDown, Sparkles, Brain, Cpu, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

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
const AstraLogo = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-br from-[#bf94ff] to-[#7d5fff] rounded-full opacity-20 animate-pulse" />
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transition-transform hover:scale-110">
      <path d="M16 4L26 24H6L16 4Z" stroke="#bf94ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 14H21" stroke="#4dadeb" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="14" r="2" fill="#4dadeb" className="animate-ping" />
    </svg>
    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#4dadeb] rounded-full border-2 border-[#000000] shadow-[0_0_8px_#4dadeb]" />
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

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
          {isOpen ? <X className="w-10 h-10 text-[#d1b3ff]" /> : <AstraLogo />}
        </button>
      </div>

      {/* Main Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[min(420px,calc(100vw-3rem))] h-[min(650px,calc(100vh-140px))] bg-[#000000]/98 border border-[#bf94ff]/30 rounded-2xl z-[9998] flex flex-col shadow-[0_0_50px_rgba(191,148,255,0.15)] backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-[#bf94ff]/20 flex items-center justify-between bg-gradient-to-r from-[#bf94ff]/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#bf94ff]/40 flex items-center justify-center bg-[#bf94ff]/10">
                <Brain className="w-5 h-5 text-[#d1b3ff]" />
              </div>
              <div>
                <h3 className="text-sm font-black font-orbitron text-white tracking-widest uppercase">ASTRA CORE</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#4dadeb] rounded-full animate-pulse shadow-[0_0_5px_#4dadeb]" />
                  <span className="text-[9px] font-mono text-[#4dadeb]/60 uppercase tracking-tighter">Neural Link Established</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4dadeb]/40" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-gradient-to-br from-[#bf94ff]/20 to-[#7d5fff]/10 border border-[#bf94ff]/30 text-white rounded-br-none' 
                  : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-none'
                }`}>
                  {msg.content ? (
                    <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                  ) : (
                    <div className="flex gap-1.5 py-2 px-1">
                      {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-[#00f5ff] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                    </div>
                  )}
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
