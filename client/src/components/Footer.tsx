import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  
  // 3D Mouse Tracking for Brand Signature
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const quickLinks = [
    { id: '01', name: 'ABOUT_PROTOCOL', href: '#about' },
    { id: '02', name: 'COMPILED_PROJECTS', href: '#projects' },
    { id: '03', name: 'TACTICAL_ARSENAL', href: '#skills' },
  ];

  const connectLinks = [
    { id: 'SYNC', name: 'EMAIL_UPLINK', href: 'mailto:roushanraut404@gmail.com' },
    { id: 'NODE', name: 'GITHUB_DATA', href: 'https://github.com/Hey-Astreon' },
    { id: 'LINK', name: 'LINKEDIN_SIGNAL', href: 'https://www.linkedin.com/in/roushan-kumar-ab4b19250/' },
  ];

  return (
    <footer 
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#050508] border-t border-[rgba(0,245,255,0.15)] py-24 px-6 z-20 overflow-hidden"
    >
      {/* High-Frequency Singularity Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent opacity-30 shadow-[0_0_15px_#00f5ff]" />
      
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(0, 245, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-4 gap-16 mb-20 animate-fade-in">
          
          {/* Brand Architecture (3D Perspective) */}
          <div className="lg:col-span-2 space-y-6" style={{ perspective: '1000px' }}>
            <motion.div 
               style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
               className="inline-block"
            >
              <h3 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-[#fdf0ff] pointer-events-none"
                  style={{ textShadow: '0 0 20px rgba(191,148,255,0.4)', transform: 'translateZ(40px)' }}>
                Roushan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#bf94ff]">Kumar</span>
              </h3>
              <div 
                className="mt-2 h-1 bg-gradient-to-r from-[#00f5ff] via-[#bf94ff] to-transparent rounded-full"
                style={{ transform: 'translateZ(20px)', width: '80%' }}
              />
            </motion.div>
            
            <p className="text-[#4dadeb] text-xs md:text-sm font-mono tracking-[0.3em] uppercase opacity-80 mt-4">
              &gt; AI & System Architect // Level_01_Admin
            </p>
            <p className="text-[#e5e4e2]/50 text-xs md:text-sm leading-relaxed max-w-sm mt-6 border-l border-[#bf94ff]/20 pl-4 font-mono">
              Finalizing data synchronization. Portfolio integrity verified at 100%. All systems are fully operational across the Aether Lattice.
            </p>
          </div>

          {/* Data-Link Terminal: Quick Links */}
          <div className="space-y-8">
            <h4 className="font-orbitron font-bold text-[#00f5ff] text-xs tracking-[0.5em] uppercase border-b border-[#00f5ff]/10 pb-4 inline-block w-full">
              // TERMINAL_LINKS
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="group flex items-center justify-between text-[#e5e4e2] hover:text-[#00f5ff] transition-all duration-300">
                    <span className="font-mono text-[10px] md:text-xs tracking-widest flex items-center gap-3">
                      <span className="text-[#bf94ff]/40">MOD_{link.id}</span> {link.name}
                    </span>
                    <div className="w-0 h-px bg-[#00f5ff] group-hover:w-8 transition-all duration-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Data-Link Terminal: Connect */}
          <div className="space-y-8">
            <h4 className="font-orbitron font-bold text-[#bf94ff] text-xs tracking-[0.5em] uppercase border-b border-[#bf94ff]/10 pb-4 inline-block w-full">
              // UPLINK_NODES
            </h4>
            <ul className="space-y-4">
              {connectLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="group flex items-center justify-between text-[#e5e4e2] hover:text-[#bf94ff] transition-all duration-300">
                    <span className="font-mono text-[10px] md:text-xs tracking-widest flex items-center gap-3">
                      <span className="text-[#00f5ff]/40">{link.id}</span> {link.name}
                    </span>
                    <div className="w-0 h-px bg-[#bf94ff] group-hover:w-8 transition-all duration-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tactical Footer Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse shadow-[0_0_10px_#00f5ff]" />
                <span className="text-[10px] font-mono text-[#00f5ff] uppercase tracking-[0.3em]">Singularity_Active</span>
             </div>
             <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">© 2026 Roushan Kumar. All architectural patterns reserved.</p>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            {['REACT_V19', 'GSAP_CORE', 'THREE_JS', 'TAILWIND_UX'].map(tech => (
              <div key={tech} className="relative group/module">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00f5ff]/20 to-[#bf94ff]/20 rounded blur opacity-0 group-hover/module:opacity-100 transition duration-500" />
                <span className="relative px-3 py-1.5 border border-white/10 bg-black text-[9px] text-white/60 font-mono rounded-sm transition-all duration-300 group-hover/module:border-[#00f5ff] group-hover/module:text-[#00f5ff] uppercase tracking-wider">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Astra Core Active HUD Overlay (Corner) */}
      <div className="absolute bottom-8 right-8 hidden xl:flex items-center gap-6 pointer-events-none select-none animate-pulse-slow">
        <div className="flex flex-col items-end gap-1">
           <span className="text-[9px] font-mono text-[#bf94ff] uppercase tracking-[0.4em]">Astra_Core_Active</span>
           <span className="text-[8px] font-mono text-white/20 uppercase">Kernel: Singularity_v4.0.0</span>
        </div>
        <div className="w-16 h-16 flex items-center justify-center relative">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#bf94ff" strokeWidth="1" strokeDasharray="10 5" opacity="0.3" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#00f5ff" strokeWidth="1" strokeDasharray="5 5" opacity="0.5" />
          </svg>
          <div className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-[#00f5ff]/20 to-[#bf94ff]/20 border border-[rgba(255,255,255,0.1)] flex items-center justify-center">
             <div className="w-2 h-2 rounded-full bg-[#bf94ff] shadow-[0_0_10px_#bf94ff]" />
          </div>
        </div>
      </div>

    </footer>
  );
}
