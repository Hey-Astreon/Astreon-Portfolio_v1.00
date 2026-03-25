import React from 'react';
import { Github, Linkedin, Mail, Instagram, ExternalLink } from 'lucide-react';

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const socialNodes = [
  { label: 'Neural Mail', href: 'mailto:roushanraut404@gmail.com', icon: Mail, color: '#4dadeb', protocol: 'SMTP_OVER_TLS' },
  { label: 'GitHub Stack', href: 'https://github.com/Hey-Astreon', icon: Github, color: '#bf94ff', protocol: 'GIT_CORE_V3' },
  { label: 'LinkedIn Link', href: 'https://www.linkedin.com/in/roushan-kumar-ab4b19250/', icon: Linkedin, color: '#00f5ff', protocol: 'AUTH_TOKEN_ACTIVE' },
  { label: 'Insta_Signal', href: 'https://www.instagram.com/its_astreon', icon: Instagram, color: '#bf94ff', protocol: 'MEDIA_STREAM' },
  { label: 'Discord Node', href: 'https://discord.com/users/its_astreon', icon: DiscordIcon, color: '#00f5ff', protocol: 'VOICE_RELAY_ON' },
];

export function NeuralNexusSocials() {
  return (
    <div className="relative w-full py-12 px-4 overflow-hidden">
      {/* Background Connecting Lines (Static SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1200 600" fill="none">
        <path d="M600 0V600" stroke="#bf94ff" strokeWidth="1" strokeDasharray="5 5" />
        <path d="M0 300H1200" stroke="#bf94ff" strokeWidth="1" strokeDasharray="5 5" />
        <circle cx="600" cy="300" r="150" stroke="#bf94ff" strokeWidth="0.5" />
        <circle cx="600" cy="300" r="250" stroke="#bf94ff" strokeWidth="0.5" />
      </svg>

      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-10 relative z-10">
        {socialNodes.map((node, idx) => {
          const Icon = node.icon;
          return (
            <a
              key={idx}
              href={node.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center p-6 w-40 h-40 md:w-48 md:h-48 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Tactical Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#bf94ff]/20 group-hover:border-[#bf94ff] transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#bf94ff]/20 group-hover:border-[#bf94ff] transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#bf94ff]/20 group-hover:border-[#bf94ff] transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#bf94ff]/20 group-hover:border-[#bf94ff] transition-colors duration-300" />

              {/* Holographic Pulse */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-2xl" 
                   style={{ backgroundColor: `${node.color}20` }} />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="p-4 rounded-full border border-[#bf94ff]/10 bg-black/40 mb-4 group-hover:scale-110 group-hover:border-[#bf94ff]/50 transition-all duration-500" style={{ boxShadow: `0 0 30px ${node.color}30` }}>
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#fdf0ff] opacity-80 group-hover:opacity-100 transition-all" style={{ color: node.color }} />
                </div>
                
                <span className="text-[10px] md:text-xs font-mono text-[#4dadeb] tracking-[0.2em] uppercase mb-1">{node.protocol}</span>
                <span className="text-xs md:text-sm font-bold font-orbitron text-[#e5e4e2] tracking-tighter flex items-center gap-2 group-hover:text-[#bf94ff] transition-colors">
                  {node.label}
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </div>

              {/* Scanning Beam effect on individual card */}
              <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                <div className="absolute top-0 left-[-100%] w-full h-[2px] bg-gradient-to-r from-transparent via-[#bf94ff]/40 to-transparent group-hover:animate-scan-line-fast" />
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-block px-10 py-1 bg-[#bf94ff]/5 border-y border-[#bf94ff]/20">
          <span className="text-[10px] font-mono text-[#bf94ff]/60 tracking-[0.5em] uppercase animate-pulse">Global Node Synchronization Active</span>
        </div>
      </div>
    </div>
  );
}
