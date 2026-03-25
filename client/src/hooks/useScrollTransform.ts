import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Transform3DOptions {
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  skewX?: number;
  skewY?: number;
  perspective?: number;
}

export function useScrollTransform3D(options: Transform3DOptions = {}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const {
      rotateX = 0,
      rotateY = 0,
      rotateZ = 0,
      skewX = 0,
      skewY = 0,
      perspective = 1000,
    } = options;

    const ctx = gsap.context(() => {
      element.style.perspective = `${perspective}px`;

      gsap.to(element, {
        rotationX: rotateX,
        rotationY: rotateY,
        rotationZ: rotateZ,
        skewX,
        skewY,
        scrollTrigger: {
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          scrub: 2,
          markers: false,
        },
      });
    });

    return () => ctx.revert();
  }, [options]);

  return elementRef;
}

export function useScrollReveal() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        {
          opacity: 0,
          y: 100,
          rotationX: 90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: 'back.out',
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

  return elementRef;
}

export function useMouseFollower() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        rotationY: (mouseX / rect.width) * 10,
        rotationX: -(mouseY / rect.height) * 10,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return elementRef;
}
