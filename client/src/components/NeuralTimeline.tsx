import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { School, Award, Code2, Rocket } from 'lucide-react';

const timelineData = [
  {
    year: '2025',
    title: 'NEURAL INITIALIZATION',
    location: 'BCA — AMITY UNIVERSITY NOIDA',
    desc: 'Commenced Bachelor of Computer Applications. Building foundations in Software Architecture and Data Logic.',
    icon: <School size={20} />,
    color: '#00f5ff'
  },
  {
    year: '2026',
    title: 'GEMINI CERTIFICATION',
    location: 'GOOGLE FOR EDUCATION',
    desc: 'Bypassed standard engineering protocols to become a Google Gemini Certified Engineer. Specializing in Generative AI Integration.',
    icon: <Award size={20} />,
    color: '#bf94ff'
  },
  {
    year: '2026',
    title: 'SYSTEM ARCHITECTURE',
    location: 'FULL-STACK DEPLOYMENT',
    desc: 'Architected multiple full-stack systems including AI CRM Interaction Hubs and Dynamic Quiz Management Systems.',
    icon: <Code2 size={20} />,
    color: '#4dadeb'
  },
  {
    year: '2025 - 2028',
    title: 'FUTURE HORIZON',
    location: 'AMITY UNIVERSITY NOIDA',
    desc: 'Synthesizing BCA degree with real-world AI engineering. Targeted completion: July 2028.',
    icon: <Rocket size={20} />,
    color: '#d1b3ff'
  }
];

function TimelineNode({ item, idx }: { item: typeof timelineData[0], idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const isEven = idx % 2 === 0;

  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''} w-full`}>
      {/* Spacer for empty side (Desktop) */}
      <div className="hidden md:block flex-1" />

      {/* Center Icon Node (Desktop) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
        {/* Radar Pulse */}
        <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${isInView ? 'animate-ping opacity-20' : 'opacity-0 scale-50'}`} style={{ backgroundColor: item.color }} />
        
        {/* Node Base */}
        <div 
          className="w-12 h-12 rounded-full bg-black/80 flex items-center justify-center border-2 transition-all duration-700 backdrop-blur-md relative z-10"
          style={{ 
             borderColor: isInView ? item.color : 'rgba(255,255,255,0.1)',
             boxShadow: isInView ? `0 0 30px ${item.color}40, inset 0 0 10px ${item.color}20` : 'none',
             color: isInView ? item.color : 'rgba(255,255,255,0.4)',
             transform: isInView ? 'scale(1.1)' : 'scale(1)'
          }}
        >
          {item.icon}
        </div>
      </div>

      {/* Mobile Icon */}
      <div className="md:hidden flex items-center justify-center mb-4">
        <div 
          className="w-12 h-12 rounded-full bg-black/80 flex items-center justify-center border-2 transition-all duration-700 backdrop-blur-md"
          style={{ 
             borderColor: isInView ? item.color : 'rgba(255,255,255,0.1)',
             boxShadow: isInView ? `0 0 30px ${item.color}40, inset 0 0 10px ${item.color}20` : 'none',
             color: isInView ? item.color : 'rgba(255,255,255,0.4)'
          }}
        >
          {item.icon}
        </div>
      </div>

      {/* Content Card */}
      <div className={`flex-1 w-full md:max-w-[45%] ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
         <motion.div 
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative bg-black/40 backdrop-blur-xl border border-[rgba(255,255,255,0.05)] p-8 transition-all duration-500 hover:bg-black/60"
            style={{ 
              boxShadow: isInView ? `0 0 40px ${item.color}10` : 'none',
              borderColor: isInView ? `${item.color}30` : 'rgba(255,255,255,0.05)'
            }}
         >
            {/* Tactical Brackets */}
            <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors duration-500`} style={{ borderColor: isInView ? item.color : 'transparent' }} />
            <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors duration-500`} style={{ borderColor: isInView ? item.color : 'transparent' }} />
            <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors duration-500`} style={{ borderColor: isInView ? item.color : 'transparent' }} />
            <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors duration-500`} style={{ borderColor: isInView ? item.color : 'transparent' }} />

            {/* Connection Line (Desktop Only) */}
            <div className={`hidden md:block absolute top-[50%] ${isEven ? 'left-full' : 'right-full'} h-[1px] -translate-y-1/2 transition-all duration-1000`} 
                 style={{ 
                   backgroundColor: isInView ? item.color : 'transparent',
                   opacity: isInView ? 0.5 : 0,
                   width: isInView ? '60px' : '0px'
                 }} 
            />

            <div className="flex items-center gap-4 mb-4">
               <div 
                 className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase border transition-colors duration-500"
                 style={{ 
                   borderColor: `${item.color}40`, 
                   backgroundColor: `${item.color}10`, 
                   color: item.color 
                 }}
               >
                 {item.year}
               </div>
               <div className="h-px flex-1 bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-transparent" />
            </div>

            <h3 className="text-xl font-bold mb-2 font-orbitron transition-colors duration-500 tracking-wide" style={{ color: isInView ? '#e5e4e2' : 'rgba(229,228,226,0.6)' }}>
              {item.title}
            </h3>
            <p className="text-xs font-mono mb-6 tracking-widest uppercase transition-colors duration-500" style={{ color: isInView ? item.color : 'rgba(255,255,255,0.3)' }}>
              {item.location}
            </p>
            <p className="text-sm leading-relaxed font-mono opacity-70 group-hover:opacity-100 transition-opacity">
              {item.desc}
            </p>

            {/* Scanning Readout Effect */}
            <div className="absolute top-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="text-[8px] font-mono uppercase tracking-widest animate-pulse" style={{ color: item.color }}>
                 Data_Block_Active
               </span>
            </div>
         </motion.div>
      </div>
    </div>
  );
}

export function NeuralTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative py-20 px-4 max-w-6xl mx-auto">
      {/* Central Line Base */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-[calc(100%-80px)] top-[40px] w-px bg-white/5 hidden md:block z-0" />
      
      {/* Central Line Energy Beam */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-[calc(100%-80px)] top-[40px] w-[2px] overflow-hidden hidden md:block z-10">
        <motion.div 
          style={{ scaleY: pathLength, originY: 0 }}
          className="w-full h-full bg-gradient-to-b from-[#00f5ff] via-[#bf94ff] to-[#4dadeb] shadow-[0_0_15px_rgba(0,245,255,0.5)]"
        />
      </div>

      <div className="space-y-32 relative z-20">
        {timelineData.map((item, idx) => (
           <TimelineNode key={idx} item={item} idx={idx} />
        ))}
      </div>
    </div>
  );
}
