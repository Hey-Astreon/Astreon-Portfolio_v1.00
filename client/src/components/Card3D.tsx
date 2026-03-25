import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function Card3D({ children, className = '', intensity = 15 }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;

      const rotateX = -(mouseY / rect.height) * intensity;
      const rotateY = (mouseX / rect.width) * intensity;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.2,
        ease: 'power2.out',
      });

      // Update glow position
      const glowElement = card.querySelector('.card-glow') as HTMLElement;
      if (glowElement) {
        gsap.to(glowElement, {
          x: mouseX * 0.5,
          y: mouseY * 0.5,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });

      const glowElement = card.querySelector('.card-glow') as HTMLElement;
      if (glowElement) {
        gsap.to(glowElement, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="card-glow absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
}
