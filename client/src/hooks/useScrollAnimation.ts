import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Create scroll trigger animation
    const ctx = gsap.context(() => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 20%',
          onEnter: () => setIsVisible(true),
          onLeaveBack: () => setIsVisible(false),
        },
      });

      // Animate element on scroll
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return { elementRef, isVisible };
}

export function useScrollRotation() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        rotation: 360,
        scrollTrigger: {
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          scrub: 2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return elementRef;
}

export function useScrollScale() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return elementRef;
}
