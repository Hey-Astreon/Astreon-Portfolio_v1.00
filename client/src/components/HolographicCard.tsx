import { useRef, useState, MouseEvent } from 'react';
import { ExternalLink } from 'lucide-react';

interface HolographicCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
  date: string;
  index: number;
  previewUrl?: string;
}

export function HolographicCard({ title, description, tech, link, date, index, previewUrl }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shimmerPosition, setShimmerPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element
    
    // Calculate rotation between -10deg and 10deg
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
    
    // Percentage for shimmer gradient
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    setShimmerPosition({ x: px, y: py });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setShimmerPosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group perspective-1000 w-full"
      style={{
        perspective: '1000px',
        animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
      }}
    >
      {/* Holographic glowing wrapper */}
      <div
        className="card-gradient group relative w-full h-full overflow-hidden transition-all duration-300 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Tech Brackets (Signature Design) */}
        <div className="tech-bracket tech-bracket-tl" />
        <div className="tech-bracket tech-bracket-tr" />
        <div className="tech-bracket tech-bracket-bl" />
        <div className="tech-bracket tech-bracket-br" />

        {/* Neural Noise Overlay */}
        <div className="neural-noise" />

        {/* Shimmer Effect */}
        <div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-color-dodge"
          style={{
            background: `radial-gradient(circle at ${shimmerPosition.x}% ${shimmerPosition.y}%, rgba(0, 245, 255, 0.4) 0%, rgba(77, 173, 235, 0.1) 40%, transparent 80%)`
          }}
        />

        {/* Scanline pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(0, 245, 255,0.05) 1px, transparent 1px)',
          backgroundSize: '100% 4px'
        }} />

        {/* Card Content */}
        <div className="relative z-10 flex flex-col h-full" style={{ transform: 'translateZ(40px)' }}>
          {/* Project Preview Image */}
          {previewUrl && (
            <div className="relative w-full h-48 overflow-hidden mb-4 border-b border-[rgba(0,245,255,0.2)]">
              <img 
                src={previewUrl} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent" />
            </div>
          )}
          
          <div className="p-6 flex flex-col h-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00f5ff] transition-colors" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {title}
                </h3>
                <p className="text-[#e5e4e2] opacity-80 text-sm leading-relaxed">{description}</p>
              </div>
              <span className="text-[10px] font-bold mt-4 md:mt-0 whitespace-nowrap px-3 py-1 rounded-sm border border-[#00f5ff]/30 text-[#00f5ff] bg-[rgba(0,245,255,0.05)] font-mono uppercase tracking-widest">
                {date}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-8 flex-grow">
              {tech.map((t, i) => (
                <span key={i} className="badge-cyan">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-max items-center gap-2 text-[#4dadeb] hover:text-[#00f5ff] font-bold transition-all group/link uppercase tracking-wider text-xs border-b border-transparent hover:border-[#00f5ff] pb-1"
              >
                Link Protocol
                <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </a>
              <span className="text-[8px] font-mono text-white/20 opacity-0 group-hover:opacity-100 transition-opacity">DATA_SECURE: YES</span>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
}
