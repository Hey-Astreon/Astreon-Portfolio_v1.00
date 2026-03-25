import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CyberpunkNeon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Neon particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
    }> = [];

    // Create neon particles
    function createParticle(x: number, y: number) {
      const colors = ['#00f5ff', '#4dadeb', '#bf94ff', '#7d5fff'];
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
        maxLife: 1,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Draw neon lines
    function drawNeonLine(x1: number, y1: number, x2: number, y2: number, color: string, alpha: number) {
      if (!ctx) return;
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      // Removed expensive shadowBlur

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.globalAlpha = 1;
    }

    // Draw neon glow circle
    function drawNeonGlow(x: number, y: number, radius: number, color: string, alpha: number) {
      if (!ctx) return;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = alpha * 0.5;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
    }

    // Animation loop
    let animationId: number;
    let time = 0;

    function animate() {
      time += 0.01;

      // Clear canvas
      if (ctx && canvas) {
        ctx.fillStyle = 'rgba(13, 10, 20, 0.1)'; // Use theme background color for trail
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (canvas && ctx) {
        // Draw animated neon lines at top
        const lineY = 100 + Math.sin(time * 0.5) * 10;
        drawNeonLine(0, lineY, canvas.width, lineY, '#00f5ff', 0.15);

        // Draw animated neon lines at bottom
        const lineY2 = canvas.height - 100 + Math.cos(time * 0.5) * 10;
        drawNeonLine(0, lineY2, canvas.width, lineY2, '#4dadeb', 0.15);

        // Draw vertical neon lines
        for (let i = 0; i < 5; i++) {
          const x = (canvas.width / 5) * i + Math.sin(time * 0.3 + i) * 20;
          drawNeonLine(x, 0, x, canvas.height, '#bf94ff', 0.05);
        }

        // Draw neon glows
        drawNeonGlow(canvas.width * 0.2, 150, 150 + Math.sin(time * 0.7) * 30, '#00f5ff', 0.2);
        drawNeonGlow(canvas.width * 0.8, canvas.height - 150, 120 + Math.cos(time * 0.6) * 25, '#4dadeb', 0.1);
      }

      // Update and draw particles
      if (ctx) {
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.015;

          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life * 0.5;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // Randomly create particles - limited for performance
      if (Math.random() < 0.05 && canvas && particles.length < 50) {
        createParticle(Math.random() * canvas.width, Math.random() * canvas.height);
      }


      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-5 opacity-40"
      style={{
        mixBlendMode: 'screen',
        filter: 'blur(0.5px)',
      }}
    />
  );
}

export function NeonBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
      <div className="relative">{children}</div>
    </div>
  );
}

export function NeonText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`${className} relative`}
      style={{
        textShadow: `
          0 0 10px rgba(0, 245, 255, 0.8),
          0 0 20px rgba(77, 173, 235, 0.6),
          0 0 30px rgba(191, 148, 255, 0.4)
        `,
      }}
    >
      {children}
    </span>
  );
}

export function NeonLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={`${className} h-1 bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent`}
      style={{
        boxShadow: '0 0 20px rgba(0, 245, 255, 0.6), 0 0 40px rgba(77, 173, 235, 0.4)',
        animation: 'pulse 2s ease-in-out infinite',
      }}
    />
  );
}
