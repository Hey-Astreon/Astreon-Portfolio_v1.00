import { useState, useEffect, useRef, useCallback } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function ScrambleText({ 
  text, 
  duration = 800, 
  delay = 0,
  className = "" 
}: { 
  text: string; 
  duration?: number; 
  delay?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const scramble = useCallback(() => {
    startTimeRef.current = performance.now();
    setIsScrambling(true);

    const update = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const result = text.split('').map((char, i) => {
        if (char === ' ') return ' ';
        const charProgress = (i / text.length) * 0.5; // Stagger per character
        if (progress > charProgress + 0.5 || progress === 1) {
          return char;
        }
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setIsScrambling(false);
      }
    };

    frameRef.current = requestAnimationFrame(update);
  }, [text, duration]);

  useEffect(() => {
    const timer = setTimeout(scramble, delay);
    return () => {
      clearTimeout(timer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [scramble, delay]);

  return (
    <span className={`${className} ${isScrambling ? 'opacity-90' : 'opacity-100'}`}>
      {displayText}
    </span>
  );
}
