import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    // Lenis is initialized globally in main.tsx,
    // this hook is just a placeholder if components need direct access.
    // However, global initialization is usually sufficient for smooth scrolling.
    
    return () => {
      // Any cleanup if necessary
    };
  }, []);
}
