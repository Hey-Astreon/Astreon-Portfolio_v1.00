import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextGlowProps {
  text: string;
  className?: string;
  delay?: number;
  colorType?: 'primary' | 'secondary' | 'neutral';
}

export function SplitTextGlow({ text, className = '', delay = 0, colorType = 'primary' }: SplitTextGlowProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !laserRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });

    // 1. Vertical Laser Scan
    tl.fromTo(laserRef.current, 
      { left: '0%', opacity: 0 },
      { left: '100%', opacity: 1, duration: 1.5, ease: 'power2.inOut', delay }
    );

    // 2. Character Reveal (synchronized with laser)
    tl.fromTo(chars, 
      { opacity: 0, y: 30, skewX: 20, filter: 'blur(10px)' },
      { 
        opacity: 1, 
        y: 0, 
        skewX: 0,
        filter: 'blur(0px)',
        duration: 0.8, 
        stagger: 0.05, 
        ease: 'back.out(2)',
      }, "-=1.2"
    );

    // 3. Flicker effect
    tl.to(chars, {
      opacity: 0.8,
      duration: 0.1,
      repeat: 3,
      yoyo: true,
      ease: "none"
    });

  }, [delay]);

  let textClass = "";
  let glowColor = "";
  if (colorType === 'primary') {
    textClass = "glow-text";
    glowColor = "#bf94ff";
  } else if (colorType === 'secondary') {
    textClass = "glow-text-violet";
    glowColor = "#00f5ff";
  } else {
    textClass = "text-white";
    glowColor = "#ffffff";
  }

  return (
    <div className="relative group/header overflow-hidden py-2">
      {/* Laser Bar */}
      <div 
        ref={laserRef}
        className="absolute top-0 bottom-0 w-1 z-20 pointer-events-none"
        style={{ 
          background: `linear-gradient(to bottom, transparent, ${glowColor}, transparent)`,
          boxShadow: `0 0 20px ${glowColor}`,
          filter: 'blur(1px)'
        }}
      />

      {/* Coordinate HUD */}
      <div className="flex gap-4 mb-2 overflow-hidden">
        <span className="text-[8px] font-mono text-white/20 animate-pulse">LAT: 28.6139° N</span>
        <span className="text-[8px] font-mono text-white/20 animate-pulse" style={{ animationDelay: '0.5s' }}>LON: 77.2090° E</span>
        <div className="h-[1px] flex-grow bg-white/5 self-center" />
        <span className="text-[8px] font-mono text-white/20">SYS_IDENT: {text.substring(0, 4)}</span>
      </div>

      <h2 ref={containerRef} className={`${className} perspective-1000 flex flex-wrap relative z-10`}>
        {text.split(' ').map((word, i) => (
          <span key={i} className="inline-block mr-3 whitespace-nowrap">
            {word.split('').map((char, j) => (
              <span 
                key={j} 
                className={`char inline-block ${textClass}`}
                style={{ transformOrigin: '50% 50% -20px' }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h2>
    </div>
  );
}
