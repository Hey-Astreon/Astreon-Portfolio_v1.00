import { useState, useEffect } from 'react';

export function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / height) * 100;
      setScroll(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[10001] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-[#bf94ff] to-[#00f5ff] transition-all duration-100 ease-out"
        style={{ 
          width: `${scroll}%`,
          boxShadow: '0 0 10px rgba(191, 148, 255, 0.5), 0 0 20px rgba(0, 245, 255, 0.3)'
        }}
      />
    </div>
  );
}
