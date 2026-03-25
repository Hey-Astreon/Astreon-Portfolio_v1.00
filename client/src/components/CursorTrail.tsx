import { useEffect, useRef } from 'react';

export function CursorTrail() {
  const circleRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Lerp for smooth following
      delayedMouse.current.x += (mouse.current.x - delayedMouse.current.x) * 0.15;
      delayedMouse.current.y += (mouse.current.y - delayedMouse.current.y) * 0.15;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${delayedMouse.current.x}px, ${delayedMouse.current.y}px)`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="cursor-trail-container">
      <div 
        ref={circleRef}
        className="fixed top-0 left-0 w-4 h-4 -ml-2 -mt-2 rounded-full pointer-events-none z-[10000]"
        style={{
          background: 'rgba(233, 30, 140, 0.4)',
          boxShadow: '0 0 15px rgba(233, 30, 140, 0.6), 0 0 30px rgba(0, 245, 255, 0.2)',
          filter: 'blur(2px)',
          transition: 'width 0.3s, height 0.3s, opacity 0.3s'
        }}
      />
    </div>
  );
}
