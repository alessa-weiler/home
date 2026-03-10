'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface TerminalLine {
  type: 'system' | 'user' | 'assistant' | 'error' | 'ascii';
  text: string;
}

const ASCII_ART = `
    ▄▄▄       ██▓    ▓█████   ██████   ██████  ▄▄▄
   ▒████▄    ▓██▒    ▓█   ▀ ▒██    ▒ ▒██    ▒ ▒████▄
   ▒██  ▀█▄  ▒██░    ▒███   ░ ▓██▄   ░ ▓██▄   ▒██  ▀█▄
   ░██▄▄▄▄██ ▒██░    ▒▓█  ▄   ▒   ██▒  ▒   ██▒░██▄▄▄▄██
    ▓█   ▓██▒░██████▒░▒████▒▒██████▒▒▒██████▒▒ ▓█   ▓██▒
`;

const STARTER_PROMPTS = [
  'tell me about yourself',
  "what's most important to you in life?",
  'what are you working on right now?',
];

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [booted, setBooted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const addLine = useCallback((text: string, type: TerminalLine['type'] = 'system') => {
    setLines((prev) => [...prev, { type, text }]);
  }, []);

  useEffect(() => {
    if (booted) return;
    setBooted(true);

    const bootLines = [
      'Initializing terminal...',
      'Loading AI modules...',
      'Connecting to Claude API...',
      'System ready.',
      '',
    ];

    bootLines.forEach((line, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, { type: 'system', text: line }]);
        if (i === bootLines.length - 1) {
          setTimeout(() => {
            setLines((prev) => [
              ...prev,
              { type: 'ascii', text: ASCII_ART },
              { type: 'system', text: '' },
              { type: 'system', text: "Welcome! I'm an AI version of Alessa." },
              {
                type: 'system',
                text: 'Ask me anything about my work, background, or what I\'m up to.',
              },
              { type: 'system', text: '' },
            ]);
          }, 500);
        }
      }, i * 400);
    });
  }, [booted]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSend = useCallback(
    async (message: string) => {
      if (isLoading || !message.trim()) return;

      addLine(`visitor $ ${message}`, 'user');
      setIsLoading(true);
      const updatedMessages: Message[] = [...messages, { role: 'user', content: message }];

      try {
        const response = await fetch('http://localhost:3000/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: updatedMessages }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        addLine(`alessa $ ${data.message}`, 'assistant');
        setMessages([...updatedMessages, { role: 'assistant', content: data.message }]);
      } catch {
        addLine(
          'Error: Could not connect to server. Make sure the backend is running on http://localhost:3000',
          'error'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, addLine]
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      const val = input.trim();
      setInput('');
      handleSend(val);
    }
  };

  return (
    <div className="terminal-window font-mono bg-[#0a0a0a] border border-neutral-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-neutral-800">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-3 text-xs text-neutral-500">alessa@terminal ~ talk to me</span>
      </div>

      {/* Output */}
      <div
        ref={contentRef}
        className="h-80 overflow-y-auto p-4 space-y-1 text-sm"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#333 transparent' }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === 'ascii'
                ? 'text-green-400 text-xs whitespace-pre font-mono leading-tight'
                : line.type === 'user'
                ? 'text-cyan-400'
                : line.type === 'assistant'
                ? 'text-green-300'
                : line.type === 'error'
                ? 'text-red-400'
                : 'text-neutral-400'
            }
          >
            {line.type === 'ascii' ? line.text : line.text || '\u00A0'}
          </div>
        ))}
        {isLoading && (
          <div className="text-neutral-500 animate-pulse">alessa is typing...</div>
        )}
        {/* Starter prompts — show after boot */}
        {lines.length > 6 && messages.length === 0 && !isLoading && (
          <div className="flex flex-col gap-1 mt-2">
            {STARTER_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-left text-xs text-neutral-500 hover:text-green-400 transition-colors border border-neutral-800 hover:border-green-900 rounded px-2 py-1 w-fit"
              >
                {i + 1}. {prompt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-neutral-800 bg-[#0d0d0d]">
        <span className="text-green-400 text-sm shrink-0">visitor $</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-700 disabled:opacity-50"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
