import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Github, Linkedin, Menu, X } from 'lucide-react';
import { NeuralRKLogo } from '@/components/NeuralRKLogo';

gsap.registerPlugin(ScrollToPlugin);

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0)',
      backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
      borderBottomColor: isScrolled ? 'rgba(191, 148, 255, 0.2)' : 'rgba(191, 148, 255, 0)',
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [isScrolled]);

  const scrollToSection = (id: string) => {
    // Trigger Hyper-Jump Warp Event
    window.dispatchEvent(new CustomEvent('stellar-warp', { detail: { duration: 1.2 } }));

    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 80 },
        duration: 1.5,
        ease: 'expo.inOut',
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 transition-all duration-300 border-b border-transparent"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <NeuralRKLogo />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {[
            { label: 'About', id: 'about' },
            { label: 'Projects', id: 'projects' },
            { label: 'Skills', id: 'skills' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[#e5e4e2] hover:text-[#bf94ff] transition-colors text-xs font-bold uppercase tracking-widest relative group font-mono"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#bf94ff] to-[#7d5fff] group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#bf94ff]"></span>
              </button>
          ))}
        </div>

        {/* Desktop Social Links */}
        <div className="hidden md:flex gap-4">
          <a
            href="https://github.com/Hey-Astreon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fdf0ff] hover:text-[#ff6eb4] transition-colors p-2 hover:bg-[rgba(233,30,140,0.1)] rounded-sm border border-transparent hover:border-[rgba(233,30,140,0.3)]"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/roushan-kumar-ab4b19250/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fdf0ff] hover:text-[#ff6eb4] transition-colors p-2 hover:bg-[rgba(233,30,140,0.1)] rounded-sm border border-transparent hover:border-[rgba(233,30,140,0.3)]"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#fdf0ff] hover:text-[#ff6eb4] transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[rgba(13,10,20,0.95)] backdrop-blur-xl shadow-2xl border-t border-[rgba(233,30,140,0.2)] animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4 p-8">
            {[
              { label: 'About', id: 'about' },
              { label: 'Projects', id: 'projects' },
              { label: 'Skills', id: 'skills' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[#fdf0ff] hover:text-[#ff6eb4] transition-colors text-lg font-bold uppercase tracking-widest text-left py-3 border-b border-[rgba(233,30,140,0.1)] last:border-0 font-mono"
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-8 pt-6 justify-center">
              <a
                href="https://github.com/Hey-Astreon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fdf0ff] hover:text-[#ff6eb4] transition-colors p-3 bg-[rgba(233,30,140,0.1)] rounded-sm border border-[rgba(233,30,140,0.2)]"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/roushan-kumar-ab4b19250/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fdf0ff] hover:text-[#ff6eb4] transition-colors p-3 bg-[rgba(233,30,140,0.1)] rounded-sm border border-[rgba(233,30,140,0.2)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
