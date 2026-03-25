import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function ScrollParallax({ children, offset = 50, className = '' }: ScrollParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        y: offset,
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.2,
          markers: false,
        },
      });
    });

    return () => ctx.revert();
  }, [offset]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
  delay?: number;
}

export function Counter({ from, to, duration = 2.5, suffix = '', className = '' }: CounterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        { value: from },
        { value: to },
        {
          duration,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elementRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1.5,
            once: false,
          },
          onUpdate: function () {
            if (elementRef.current) {
              elementRef.current.textContent = Math.floor(this.targets()[0].value) + suffix;
            }
          },
        }
      );
    });

    return () => ctx.revert();
  }, [from, to, duration, suffix]);

  return <span ref={elementRef} className={className}>{from}{suffix}</span>;
}

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elementRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={elementRef} className={`glitch ${className}`}>
      {text}
    </div>
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}

export function FloatingElement({ children, duration = 3, className = '' }: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      y: -15,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, [duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
