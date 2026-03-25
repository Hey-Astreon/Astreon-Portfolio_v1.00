import React from 'react';
import { use3DScroll, useStaggerChildren } from '@/hooks/use3DScroll';
import { SplitTextGlow } from '@/components/SplitTextGlow';
import { GitHubActivityCard } from '@/components/GitHubActivityCard';
import { Code } from 'lucide-react';

const TechIcon = ({ name }: { name: string }) => {
  const icons: { [key: string]: React.ReactNode } = {
    'Python': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M14.25.18l.9.2.73.26.59.33.45.38.34.44.25.51.15.57.08.62.03.66v.68l-.03.7-.08.71-.15.7-.25.69-.34.67-.45.64-.59.6-.73.55-.9.49-1.08.43-1.26.35-1.44.25-1.62.15-1.8.04-1.8-.04-1.62-.15-1.44-.25-1.26-.35-1.08-.43-.9-.49-.73-.55-.59-.6-.45-.64-.34-.67-.25-.69-.15-.7-.08-.71-.03-.7v-.68l.03-.66.08-.62.15-.57.25-.51.34-.44.45-.38.59-.33.73-.26.9-.2 1.08-.14 1.26-.08L12 0l1.26.04 1.08.08.91.06zM7.5 4.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25zM9 15.75H15l.75-3H8.25v3zM16.5 17.25a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25z"/>
      </svg>
    ),
    'JavaScript': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M0 0h24v24H0V0zm22.034 18.268l-1.29-1.29c-.04-.04-.04-.1 0-.14l.11-.11c.25-.25.5-.25.75 0l1.3 1.3c.04.04.04.1 0 .14l-1.31 1.31c-.04.04-.1.04-.14 0l-.11-.11c-.25-.25-.25-.5 0-.75l.69-.69zm-1.29-1.29l-.69.69c-.25.25-.5.25-.75 0l-1.3-1.3c-.04-.04-.04-.1 0-.14l.11-.11c.25-.25.5-.25.75 0l1.3 1.3c.04.04.04.1 0 .14l-.11.11z"/>
      </svg>
    ),
    'TypeScript': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM22.5 19.29c0 .652-.533 1.185-1.185 1.185h-1.185a1.185 1.185 0 0 1-1.185-1.185v-1.185c0-.652.533-1.185 1.185-1.185h1.185c.652 0 1.185.533 1.185 1.185v1.185zM17.76 6.36c.652 0 1.185.533 1.185 1.185v1.185c0 .652-.533 1.185-1.185 1.185h-1.185a1.185 1.185 0 0 1-1.185-1.185V7.545c0-.652.533-1.185 1.185-1.185h1.185z"/>
      </svg>
    ),
    'React': (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-4 h-4">
        <circle cx="50" cy="50" r="10"/>
        <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="4"/>
        <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(120 50 50)"/>
      </svg>
    ),
    'Next.js': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 17.01l-1.01 1.01-11.01-11.01h12.02v10z"/>
      </svg>
    ),
    'Tailwind': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624C7.666,17.818,9.027,19,12.001,19c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    ),
    'Node.js': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12,0.8C5.8,0.8,0.8,5.8,0.8,12s5,11.2,11.2,11.2s11.2-5,11.2-11.2S18.2,0.8,12,0.8z M17,17l-5,2.7L7,17V8l5-2.7L17,8V17z"/>
      </svg>
    ),
    'Django': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/>
      </svg>
    ),
    'FastAPI': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0l-9 6v12l9 6 9-6V6l-9-6zm-1 16l-4-4 1.41-1.41L11 13.17l5.59-5.59L18 9l-7 7z"/>
      </svg>
    ),
    'Three.js': (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12,2L2,22h20L12,2z M12,6.3l6.5,12.7H5.5L12,6.3z"/>
      </svg>
    ),
  };

  return icons[name] || <Code className="w-4 h-4" />;
};

export function TacticalArsenal() {
  const sectionRef = use3DScroll() as React.RefObject<HTMLElement>;
  const containerRef = useStaggerChildren() as React.RefObject<HTMLDivElement>;

  const skillsMapping = {
    'Core Logic': [
      { name: 'Python', color: '#3776ab' },
      { name: 'JavaScript', color: '#f7df1e' },
      { name: 'TypeScript', color: '#3178c6' },
    ],
    'Frontend Interface': [
      { name: 'React', color: '#61dafb' },
      { name: 'Next.js', color: '#ffffff' },
      { name: 'Tailwind', color: '#06b6d4' },
      { name: 'Three.js', color: '#ffffff' },
      { name: 'WebGL', color: '#990000' },
      { name: 'Framer Motion', color: '#ff0055' },
    ],
    'Backend Systems': [
      { name: 'FastAPI', color: '#05998b' },
      { name: 'Node.js', color: '#339933' },
      { name: 'Django', color: '#092e20' },
      { name: 'Next.js', color: '#ffffff' },
      { name: 'MySQL', color: '#4479a1' },
      { name: 'PostgreSQL', color: '#4169e1' },
    ],
    'AI Systems': [
      { name: 'Prompt Engineering', color: '#00f5ff' },
      { name: 'LangGraph', color: '#9b59b6' },
      { name: 'Gemini API', color: '#4285f4' },
      { name: 'LLM Integration', color: '#e91e8c' },
      { name: 'Logic Systems', color: '#cc99ff' },
    ],
  };

  return (
    <section id="skills" ref={sectionRef} className="neural-border-top py-32 px-4 relative z-10 bg-[rgba(5,5,10,0.4)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <SplitTextGlow text="TACTICAL ARSENAL" className="text-4xl md:text-6xl font-black mb-4 justify-center" colorType="primary" />
          <p className="text-[#bf94ff] text-lg font-mono tracking-widest uppercase">Loaded Technical Modules</p>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div data-stagger className="md:col-span-2 lg:col-span-1">
            <GitHubActivityCard />
          </div>
          {Object.entries(skillsMapping).map(([category, items], catIdx) => (
            <div key={category} data-stagger className="group/cat relative card-premium h-full flex flex-col bg-black/40 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-black/60 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.1)]">
              
              {/* Tactical Brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-transparent transition-colors duration-500 group-hover/cat:border-[#00f5ff]" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] border-transparent transition-colors duration-500 group-hover/cat:border-[#00f5ff]" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] border-transparent transition-colors duration-500 group-hover/cat:border-[#00f5ff]" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-transparent transition-colors duration-500 group-hover/cat:border-[#00f5ff]" />

              {/* Scanning Grid Background (Subtle) */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] transition-opacity duration-700 group-hover/cat:opacity-[0.08]" 
                   style={{ backgroundImage: 'linear-gradient(rgba(0, 245, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.2) 1px, transparent 1px)', backgroundSize: '15px 15px' }} />

              <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10 text-[#bf94ff] transition-colors duration-500 group-hover/cat:text-[#00f5ff] tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                <span className="w-2 h-4 bg-[#bf94ff] rounded-full transition-colors duration-500 group-hover/cat:bg-[#00f5ff] animate-pulse" />
                // {category.toUpperCase()}
              </h3>
              
              <div className="flex flex-wrap gap-4 relative z-10" style={{ perspective: '1200px' }}>
                {items.map((skill, idx) => (
                  <div
                    key={idx}
                    className="group/skill relative flex items-center gap-2.5 px-4 py-2 border border-[#bf94ff]/20 bg-[rgba(191,148,255,0.05)] text-[#e5e4e2] rounded-sm font-mono text-[10px] md:text-xs uppercase cursor-default overflow-hidden"
                    style={{ 
                      '--hover-color': skill.color,
                      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // physics-based bouncy transition
                      transformStyle: 'preserve-3d',
                    } as any}
                    onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateZ(25px) scale(1.08) translateY(-4px)';
                       e.currentTarget.style.borderColor = skill.color;
                       e.currentTarget.style.boxShadow = `0 15px 25px rgba(0,0,0,0.8), 0 0 20px ${skill.color}50`;
                       e.currentTarget.style.backgroundColor = 'rgba(10,10,15,0.95)';
                       e.currentTarget.style.zIndex = '50';
                    }}
                    onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateZ(0px) scale(1) translateY(0px)';
                       e.currentTarget.style.borderColor = 'rgba(191,148,255,0.2)';
                       e.currentTarget.style.boxShadow = 'none';
                       e.currentTarget.style.backgroundColor = 'rgba(191,148,255,0.05)';
                       e.currentTarget.style.zIndex = '1';
                    }}
                  >
                    {/* Node Glowing Edges - Intense on hover */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--hover-color)] to-transparent opacity-0 group-hover/skill:opacity-80 transition-opacity duration-300" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--hover-color)] to-transparent opacity-0 group-hover/skill:opacity-80 transition-opacity duration-300" />

                    <div className="opacity-60 group-hover/skill:opacity-100 transition-all duration-300 relative z-10" style={{ color: 'var(--hover-color)' }}>
                      <TechIcon name={skill.name} />
                    </div>
                    <span className="tracking-widest font-bold relative z-10 transition-colors duration-300 group-hover/skill:text-white" style={{ textShadow: `0 0 10px var(--hover-color)` }}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Data Block Scanner Identifier */}
               <div className="absolute bottom-4 right-4 opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300">
                 <span className="text-[8px] font-mono uppercase tracking-widest text-[#00f5ff] animate-pulse drop-shadow-[0_0_5px_#00f5ff]">
                   MOD_ACTIVE: 0{catIdx + 1}
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
