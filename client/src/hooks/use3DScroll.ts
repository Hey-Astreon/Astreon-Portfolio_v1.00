import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function use3DScroll() {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const st = ScrollTrigger.create({
      trigger: elementRef.current,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1.2,
      markers: false,
      onEnter: () => {
        gsap.fromTo(
          elementRef.current!,
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
        );
      },
    });

    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1.2,
          markers: false,
        },
      }
    );

    return () => {
      st.kill();
    };
  }, []);

  return elementRef;
}

export function useParallaxScroll(offset: number = 50) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const anim = gsap.to(elementRef.current, {
      y: offset,
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        markers: false,
      },
    });

    return () => {
      (anim.scrollTrigger as ScrollTrigger | undefined)?.kill();
    };
  }, [offset]);

  return elementRef;
}

export function useRevealOnScroll() {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const st = ScrollTrigger.create({
      trigger: elementRef.current,
      start: 'top 75%',
      end: 'top 25%',
      scrub: 1.5,
      markers: false,
    });

    const tl = gsap.timeline({ scrollTrigger: st });

    tl.fromTo(
      elementRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    return () => {
      st.kill();
    };
  }, []);

  return elementRef;
}

export function useStaggerChildren() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.querySelectorAll('[data-stagger]');

    const anim = gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
          markers: false,
        },
      }
    );

    return () => {
      (anim.scrollTrigger as ScrollTrigger | undefined)?.kill();
    };
  }, []);

  return containerRef;
}

export function useCounterAnimation(from: number, to: number, duration: number = 2) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const obj = { value: from };

    const anim = gsap.to(obj, {
      value: to,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        markers: false,
      },
      onUpdate: () => {
        if (elementRef.current) {
          elementRef.current.textContent = Math.floor(obj.value).toString();
        }
      },
    });

    return () => {
      (anim.scrollTrigger as ScrollTrigger | undefined)?.kill();
    };
  }, [from, to, duration]);

  return elementRef;
}
