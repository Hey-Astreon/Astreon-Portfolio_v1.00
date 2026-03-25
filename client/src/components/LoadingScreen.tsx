import { useState, useEffect } from 'react';

const BOOT_PHASES = [
  { threshold: 0, text: 'INITIALIZING AETHER LATTICE...' },
  { threshold: 25, text: 'SYNCHRONIZING NEURAL NODES...' },
  { threshold: 50, text: 'ALIGNING QUANTUM SIGNATURES...' },
  { threshold: 75, text: 'CALIBRATING GPGPU KERNEL...' },
  { threshold: 95, text: 'ESTABLISHING SINGULARITY...' },
  { threshold: 100, text: 'UPLINK COMPLETE' },
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2800; // 2.8 seconds for premium 3D appreciation
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 1200); // Wait for cinematic portal expansion
          }, 300); // Brief hold at 100%
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const currentPhase = BOOT_PHASES.slice().reverse().find(p => progress >= p.threshold)?.text || BOOT_PHASES[0].text;

  return (
    <div 
      className={`fixed inset-0 z-[1000] overflow-hidden flex flex-col items-center justify-center bg-[#050508] transition-opacity duration-1000 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Background Glitch / Noise */}
      <div className={`absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00f5ff]/10 via-[#050508] to-[#050508] transition-opacity duration-1000 ${isExiting ? 'opacity-0' : 'opacity-100'}`} />

      {/* Dynamic 3D Quantum Core */}
      <div 
        className={`relative flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${isExiting ? 'scale-[20] opacity-0 blur-2xl' : 'scale-100 opacity-100 blur-0'}`}
        style={{ perspective: '800px' }}
      >
        {/* Core Base Glow */}
        <div className="absolute w-[100px] h-[100px] rounded-full bg-[#bf94ff]/20 blur-[30px] animate-pulse" />
        
        {/* Outer Ring (Cyan) */}
        <div className="absolute w-[240px] h-[240px]" style={{ transform: 'rotateX(70deg) rotateY(20deg)', transformStyle: 'preserve-3d' }}>
          <div className="w-full h-full rounded-full border-t-[3px] border-b-[3px] border-[#00f5ff] opacity-80 animate-[spin_4s_linear_infinite]" style={{ boxShadow: '0 0 25px rgba(0,245,255,0.4)', borderTopStyle: 'double', borderBottomStyle: 'double' }} />
        </div>

        {/* Middle Ring (Violet) */}
        <div className="absolute w-[180px] h-[180px]" style={{ transform: 'rotateX(50deg) rotateY(-40deg)', transformStyle: 'preserve-3d' }}>
          <div className="w-full h-full rounded-full border-r-[2px] border-l-[2px] border-[#bf94ff] animate-[spin_6s_linear_infinite_reverse]" style={{ boxShadow: '0 0 20px rgba(191,148,255,0.3)', borderRightStyle: 'dashed', borderLeftStyle: 'dashed' }} />
        </div>

        {/* Inner Ring (Deep Blue/Cyan) */}
        <div className="absolute w-[120px] h-[120px]" style={{ transform: 'rotateX(30deg) rotateY(60deg)', transformStyle: 'preserve-3d' }}>
          <div className="w-full h-full rounded-full border-[1px] border-[#4dadeb]/60 border-dotted animate-[spin_8s_linear_infinite]" />
        </div>
        
        {/* Core Percentage Display */}
        <div className="absolute z-10 flex flex-col items-center justify-center">
          <div className="font-black font-orbitron text-3xl text-[#fdf0ff] tracking-tight" style={{ textShadow: '0 0 20px rgba(0,245,255,0.8)' }}>
            {Math.round(progress)}<span className="text-sm text-[#00f5ff] ml-1">%</span>
          </div>
        </div>
      </div>

      {/* Boot Phasing Terminal */}
      <div className={`absolute bottom-32 flex flex-col items-center gap-4 transition-all duration-700 ${isExiting ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
        
        {/* Active Phase Text */}
        <div className="flex items-center gap-4 border border-[#bf94ff]/20 bg-black/40 backdrop-blur-md px-6 py-2 rounded-sm shadow-[0_0_20px_rgba(191,148,255,0.1)]">
          <div className="w-2 h-2 rounded-full bg-[#bf94ff] animate-pulse" style={{ boxShadow: '0 0 10px #bf94ff' }} />
          <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-[#e5e4e2] uppercase w-[280px] text-center">
            {currentPhase}
          </span>
          <div className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" style={{ boxShadow: '0 0 10px #00f5ff' }} />
        </div>
        
        {/* Loading Bar Frame */}
        <div className="relative w-80 h-[2px] bg-white/5 overflow-hidden rounded-full">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[#00f5ff] to-[#bf94ff] transition-all duration-200 ease-out"
            style={{ width: `${progress}%`, boxShadow: '0 0 15px rgba(0,245,255,0.8)' }}
          />
        </div>
        
        {/* Technical Footer */}
        <div className="flex w-80 justify-between items-center text-[8px] font-mono tracking-widest uppercase mt-1 opacity-50">
          <span className="text-[#00f5ff]">Boot_Sequence</span>
          <span className="text-[#e5e4e2]">Kernel_v4.0.0</span>
          <span className="text-[#bf94ff]">Singularity</span>
        </div>
      </div>
      
    </div>
  );
}
