import React, { useEffect, useRef, Suspense } from 'react';
import { use3DScroll, useStaggerChildren, useCounterAnimation } from '@/hooks/use3DScroll';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
// import { CyberpunkNeon } from '@/components/CyberpunkNeon';
import { HolographicCard } from '@/components/HolographicCard';
import { SplitTextGlow } from '@/components/SplitTextGlow';
import { CombinedScene } from '@/components/CombinedScene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Github, Linkedin, Mail, Code, Zap, Award, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

import { ScrambleText } from '@/components/ScrambleText';
import { NeuralContactForm } from '@/components/NeuralContactForm';
import { NeuralNexusSocials } from '@/components/NeuralNexusSocials';
import { NeuralTimeline } from '@/components/NeuralTimeline';
import { TacticalArsenal } from '@/components/TacticalArsenal';
import { GitHubActivityCard } from '@/components/GitHubActivityCard';
import { ResumeScanModal } from '@/components/ResumeScanModal';
import { VolumetricAvatar } from '@/components/VolumetricAvatar';
import { useState } from 'react';


function HeroSection() {
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 80 },
        duration: 1.5,
        ease: 'power3.inOut',
      });
    }
  };

  useEffect(() => {
    if (!titleGroupRef.current || !subtitleRef.current || !descRef.current || !ctaRef.current || !badgeRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)' })
      .fromTo(titleGroupRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, "-=0.4")
      .fromTo(subtitleRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, "-=0.8")
      .fromTo(descRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, "-=0.6")
      .fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, "-=0.4");
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto px-6 py-20">
        
        {/* Volumetric Neural Identity (3D upgrade) */}
        <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] lg:-mr-12 group">
          <VolumetricAvatar />
          
          {/* Floating HUD accents */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-[#bf94ff]/10 rounded-full animate-spin-slow pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 font-mono text-[8px] text-[#bf94ff]/40 rotate-90 uppercase tracking-widest">
            Aether_Core_v4.0 // Neural_Volumetric_Active
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center lg:text-left pointer-events-none max-w-3xl">
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-[#bf94ff] bg-[rgba(191,148,255,0.1)] text-[#d1b3ff] mb-8 text-xs md:text-sm font-bold tracking-widest uppercase" style={{ boxShadow: '0 0 15px rgba(191,148,255,0.2)' }}>
            <Sparkles className="w-4 h-4" />
            <span>System Online</span>
          </div>

          <div ref={titleGroupRef} className="mb-6">
            <h1 className="text-[clamp(2.5rem,8vw,6.5rem)] leading-none font-black glow-text relative break-words uppercase tracking-tighter" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <ScrambleText text="ROUSHAN" delay={1200} />
            </h1>
            <h1 className="text-[clamp(2.5rem,8vw,6.5rem)] leading-none font-black glow-text-violet relative break-words uppercase tracking-tighter" style={{ fontFamily: 'Orbitron, sans-serif', marginTop: '-0.05em' }}>
              <ScrambleText text="KUMAR" delay={1400} />
            </h1>
          </div>

          <p ref={subtitleRef} className="text-base md:text-lg lg:text-xl text-[#4dadeb] mb-8 font-bold tracking-[0.2em] uppercase" style={{ fontFamily: 'Share Tech Mono, monospace', textShadow: '0 0 10px rgba(77, 173, 235, 0.5)' }}>
            &gt; <ScrambleText text="Prompt Engineer // AI & System Architect" delay={1600} /> _
          </p>

          <p ref={descRef} className="text-[#e5e4e2] text-sm md:text-base mb-12 max-w-2xl lg:mx-0 leading-relaxed opacity-80 backdrop-blur-sm p-4 rounded-xl border border-[rgba(191,148,255,0.15)] bg-[rgba(5,5,10,0.6)]">
            BCA student crafting immersive digital experiences with Python, AI, and cutting-edge web technologies. Passionate about building scalable applications and exploring the intersection of code and creativity.
          </p>

          <div ref={ctaRef} className="flex gap-4 md:gap-6 justify-center lg:justify-start flex-wrap pointer-events-auto">
            <button onClick={() => scrollToSection('projects')} className="btn-primary group flex items-center gap-3 text-xs md:text-base font-orbitron font-bold">
              Access Database
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={() => (window as any).openResumeScan?.()} 
              className="btn-secondary flex items-center gap-2 text-xs md:text-base font-orbitron font-bold"
            >
              <Award className="w-4 h-4" />
              Scan Credentials
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 md:w-8 md:h-8 text-[#00f5ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 5px #00f5ff)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}



function ProjectsSection() {
  const sectionRef = use3DScroll() as React.RefObject<HTMLDivElement>;

  const projects = [
    {
      title: 'Dynamic Quiz Management System',
      description: 'Python-based structural logic application with advanced user and admin modes for dynamic data management.',
      tech: ['Python', 'File Architecture', 'Modular Programming'],
      link: 'https://github.com/Hey-Astreon/Dynamic-Quiz-Management-System',
      date: 'Jan 2026',
      previewUrl: '/quiz-preview.png'
    },
    {
      title: 'AI CRM HCP Interaction Hub',
      description: 'AI-driven CRM system for logging healthcare professional interactions with an advanced neural chat interface.',
      tech: ['Python', 'React', 'FastAPI', 'JavaScript'],
      link: 'https://github.com/Hey-Astreon/AI-CRM-HCP-Interaction-Logging-Module',
      date: 'Mar 2026',
      previewUrl: '/crm-preview.png'
    },
    {
      title: 'Student Record Management System',
      description: 'A comprehensive student record management system with secure authentication, data management, and admin controls.',
      tech: ['Python', 'File Management', 'Admin Auth', 'CLI'],
      link: 'https://github.com/Hey-Astreon/Student-Record-Management-System',
      date: '2025',
      previewUrl: '/prompt-preview.png'
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-4 relative z-10 border-t border-[rgba(0,245,255,0.2)] bg-[rgba(0,0,0,0.4)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <SplitTextGlow text="COMPILED PROJECTS" className="text-4xl md:text-6xl font-black mb-4 justify-center" colorType="secondary" />
          <p className="text-[#00f5ff] text-lg font-mono tracking-widest uppercase">System Architecture Showcase</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, idx) => (
            <HolographicCard key={idx} index={idx} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}


function EducationSection() {
  const sectionRef = use3DScroll() as React.RefObject<HTMLDivElement>;

  const education = [
    {
      title: 'Bachelor of Computer Applications',
      subtitle: 'Software Development Core',
      school: 'Amity University Noida',
      date: 'Jul 2025 - Jul 2028',
    },
    {
      title: 'Gemini Certified University Student',
      subtitle: 'Google for Education / Generative AI Mastery',
      school: 'AI Infrastructure, LLM Orchestration & Prompt Engineering',
      date: 'Feb 2026 - Feb 2029 (Verified)',
    },
    {
      title: 'Python Automation & Systems Logic',
      subtitle: 'Google Career Certificate / Computer Science',
      school: 'OOP, Computational Thinking & Automated Scripting Protocols',
      date: 'Sep 2022 (Verified)',
    },
    {
      title: 'Relational Database Architecture',
      subtitle: 'Meta Certified Database Engineer',
      school: 'Schema Optimization, SQL Orchestration & Data Integrity',
      date: 'Sep 2022 (Verified)',
    },
  ];

  const certs = [
    { name: 'Gemini University Student', issuer: 'Google for Education', date: '2026' },
    { name: 'Full-Stack Development', issuer: 'Meta', date: '2022' },
    { name: 'Database Architecture', issuer: 'Meta', date: '2022' },
    { name: 'Python Automation', issuer: 'Google', date: '2022' },
  ];

  return (
    <section id="education" ref={sectionRef} className="neural-border-top py-32 px-4 relative z-10 bg-[rgba(5,5,10,0.4)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <SplitTextGlow text="DATA TRAINING CENTERS" className="text-4xl md:text-6xl font-black mb-4 justify-center" colorType="secondary" />
          <p className="text-[#4dadeb] text-lg font-mono tracking-widest uppercase">Academic Archives & Certs</p>
        </div>

        <div className="space-y-6 mb-24">
          {education.map((edu, idx) => (
            <div key={idx} className="card-premium">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>{edu.title}</h3>
                  <p className="text-[#d1b3ff] font-mono text-sm mb-2">{edu.subtitle}</p>
                  <p className="text-[#e5e4e2] opacity-70">{edu.school}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="px-4 py-1 rounded-sm border border-[#4dadeb] text-[#4dadeb] bg-[rgba(77,173,235,0.05)] font-mono text-sm">
                    {edu.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-[#d1b3ff] text-lg font-mono tracking-widest uppercase mb-12">Verified Credentials</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certs.map((cert, idx) => (
              <div key={idx} className="p-6 border border-[rgba(191,148,255,0.2)] bg-[rgba(191,148,255,0.05)] rounded-lg hover:border-[#bf94ff] transition-all group">
                <h4 className="text-[#e5e4e2] font-bold mb-2 group-hover:text-[#d1b3ff]">{cert.name}</h4>
                <p className="text-xs text-[#d1b3ff] uppercase tracking-tighter mb-4">{cert.issuer}</p>
                <span className="text-[10px] font-mono opacity-50">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const sectionRef = use3DScroll() as React.RefObject<HTMLDivElement>;
  const counter1Ref = useCounterAnimation(0, 2);
  const counter2Ref = useCounterAnimation(0, 1);
  const counter3Ref = useCounterAnimation(0, 4);

  return (
    <section id="stats" ref={sectionRef} className="neural-border-top py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { ref: counter1Ref, label: 'Neural Systems Deployed', suffix: '+' },
            { ref: counter2Ref, label: 'Verified Credentials', suffix: '' },
            { ref: counter3Ref, label: 'Architectural Frameworks', suffix: '+' },
          ].map((stat, idx) => (
            <div key={idx} className="card-premium text-center group flex flex-col items-center justify-center py-12">
              <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] to-[#4dadeb] mb-4" style={{ fontFamily: 'Orbitron, sans-serif', filter: 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.4))' }}>
                <span ref={stat.ref}>0</span>
                {stat.suffix}
              </div>
              <p className="text-[#e5e4e2] font-mono tracking-widest uppercase text-[10px] opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const sectionRef = use3DScroll() as React.RefObject<HTMLDivElement>;

  return (
    <section id="contact" ref={sectionRef} className="neural-border-top py-40 px-4 relative z-10 bg-black/80">
      <div className="max-w-6xl mx-auto text-center">
        {/* Terminal Header */}
        <div className="mb-24 relative inline-block">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent to-[#bf94ff]" />
          <SplitTextGlow text="INITIATE UPLINK" className="text-5xl md:text-8xl font-black mb-6 justify-center tracking-tighter" colorType="primary" />
          <div className="flex items-center justify-center gap-4 text-[#bf94ff] font-mono text-xs uppercase tracking-[0.4em]">
            <span className="animate-pulse">●</span>
            SYSTEM_STATUS: NODE_READY
            <span className="animate-pulse">●</span>
          </div>
        </div>

        {/* Neural Nexus Socials (The Orbital Logic) */}
        <div className="mb-32">
          <NeuralNexusSocials />
        </div>

        {/* Global Transmission Terminal (The Form) */}
        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">Transmission_Port: 8080</span>
            <div className="w-px h-12 bg-gradient-to-t from-transparent via-[#bf94ff]/20 to-transparent" />
          </div>
          
          <h3 className="text-2xl font-bold font-orbitron text-[#e5e4e2] mb-12 tracking-widest uppercase">
            Global Transmission <span className="text-[#bf94ff]">Terminal</span>
          </h3>
          
          <NeuralContactForm />

          {/* Bottom Accent */}
          <div className="mt-20 flex flex-col items-center gap-6 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
            <div className="w-px h-16 bg-gradient-to-b from-[#bf94ff] to-transparent" />
            <span className="text-[10px] font-mono text-[#bf94ff] uppercase tracking-[0.5em]">End_Of_Transmission</span>
          </div>
        </div>

        <div className="mt-32 text-[#4dadeb] font-mono tracking-widest text-sm uppercase">
          <p>&gt; LOCATION_PING: INDIA_</p>
        </div>
      </div>
    </section>
  );
}

function NeuralHUD({ 
  isPerformanceMode, 
  setIsPerformanceMode, 
  isOverrideEnabled, 
  setIsOverrideEnabled 
}: { 
  isPerformanceMode: boolean, 
  setIsPerformanceMode: (v: boolean) => void,
  isOverrideEnabled: boolean,
  setIsOverrideEnabled: (v: boolean) => void
}) {
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(24);
  const [memory, setMemory] = useState(128);

  useEffect(() => {
    let frames = 0;
    let lastTime = performance.now();
    
    const updateFPS = () => {
      frames++;
      const now = performance.now();
      if (now >= lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (now - lastTime)));
        frames = 0;
        lastTime = now;
      }
      requestAnimationFrame(updateFPS);
    };
    const reqId = requestAnimationFrame(updateFPS);

    const interval = setInterval(() => {
      setLatency(31 + Math.floor(Math.random() * 5));
      setMemory(Math.floor(Math.random() * 512 + 256));
    }, 2000);

    return () => {
      cancelAnimationFrame(reqId);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed top-24 right-6 z-50 hidden xl:flex flex-col gap-4">
      <div className="glass-panel p-4 border border-[rgba(191,148,255,0.2)] bg-black/40 backdrop-blur-md rounded-lg flex flex-col gap-3 min-w-[220px] pointer-events-auto">
        <div className="flex items-center justify-between border-b border-[rgba(191,148,255,0.1)] pb-2 mb-1">
          <span className="text-[10px] font-mono text-[#4dadeb] tracking-wider uppercase">Neural_Uplink_Sync</span>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-white/40">{fps} FPS</span>
            <div className={`w-2 h-2 rounded-full ${fps > 55 ? 'bg-[#bf94ff]' : 'bg-yellow-500'} animate-pulse`} style={{ boxShadow: fps > 55 ? '0 0 10px #bf94ff' : 'none' }} />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[9px] font-mono">
            <span className="text-white/60">LATENCY_MS</span>
            <span className="text-[#bf94ff]">{latency}.002ms</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div className="bg-[#bf94ff] h-full transition-all duration-1000" style={{ width: `${(latency / 100) * 100}%` }} />
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono">
            <span className="text-white/60">AETHER_POOL</span>
            <span className="text-[#4dadeb]">{memory} MB</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div className="bg-[#4dadeb] h-full transition-all duration-1000" style={{ width: `${(memory / 1024) * 100}%` }} />
          </div>
        </div>

        {/* HUD Controls */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button 
            onClick={() => setIsPerformanceMode(!isPerformanceMode)}
            className={`text-[8px] font-mono border py-1 rounded transition-all ${isPerformanceMode ? 'border-[#00f5ff] text-[#00f5ff] bg-[#00f5ff]/10' : 'border-white/20 text-white/40'}`}
          >
            {isPerformanceMode ? 'MAX_PERF' : 'ECO_MODE'}
          </button>
          <button 
            onClick={() => setIsOverrideEnabled(!isOverrideEnabled)}
            className={`text-[8px] font-mono border py-1 rounded transition-all ${isOverrideEnabled ? 'border-[#bf94ff] text-[#bf94ff] bg-[#bf94ff]/10 animate-pulse' : 'border-white/20 text-white/40 hover:border-[#4dadeb] hover:text-[#4dadeb]'}`}
          >
            {isOverrideEnabled ? 'ACTIVE' : 'OVERRIDE'}
          </button>
        </div>

        <div className="pt-2 flex flex-col gap-1 border-t border-white/5 mt-1">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-[#bf94ff] rounded-full" />
            <span className="text-[8px] font-mono text-white/40 uppercase">Kernel_v4.0.0_Singularity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-[#4dadeb] rounded-full" />
            <span className="text-[8px] font-mono text-white/40 uppercase">GPGPU_Active_State</span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-2 border border-[rgba(191,148,255,0.1)] bg-black/20 backdrop-blur-sm rounded-md self-end pointer-events-none">
        <span className="text-[8px] font-mono text-[#bf94ff] uppercase tracking-[0.2em] animate-pulse">Scanning Grid...</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isPerformanceMode, setIsPerformanceMode] = useState(true);
  const [isOverrideEnabled, setIsOverrideEnabled] = useState(false);

  useEffect(() => {
    (window as any).openResumeScan = () => setIsResumeModalOpen(true);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Roushan_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsResumeModalOpen(false);
  };

  return (
    <main className={`relative bg-[#000000] text-[#e5e4e2] min-h-screen overflow-x-hidden selection:bg-[#bf94ff]/30 selection:text-white transition-all duration-700 ${isOverrideEnabled ? 'hue-rotate-[15deg] brightness-[1.1]' : ''}`}>
      {/* <CyberpunkNeon /> */}
      
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <CombinedScene 
          forceGlitch={isOverrideEnabled ? 2.5 : 0} 
          forceSingularity={isOverrideEnabled ? 1.0 : 0}
          ecoMode={!isPerformanceMode}
        />
      </div>

      <div className="relative z-10">
        <Navigation />
        <NeuralHUD 
          isPerformanceMode={isPerformanceMode} 
          setIsPerformanceMode={setIsPerformanceMode}
          isOverrideEnabled={isOverrideEnabled}
          setIsOverrideEnabled={setIsOverrideEnabled}
        />
        <HeroSection />
        
        <div className="neural-border-top py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <SplitTextGlow text="NEURAL JOURNEY" className="text-3xl md:text-5xl font-black mb-4 justify-center" colorType="primary" />
            <p className="text-[#d1b3ff] text-xs font-mono tracking-[0.3em] uppercase opacity-60">Authentication & Growth History</p>
          </div>
          <NeuralTimeline />
        </div>

        <section id="projects" className="neural-border-top py-32 px-4 relative z-10 bg-[rgba(0,0,0,0.4)]">
          <ProjectsSection />
        </section>
        <TacticalArsenal />
        <EducationSection />
        <StatsSection />
        <ContactSection />
        <Footer />
      </div>

      <ResumeScanModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
        onDownload={handleDownload}
      />
    </main>
  );
}
