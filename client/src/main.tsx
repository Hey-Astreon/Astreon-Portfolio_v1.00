import { createRoot } from "react-dom/client";
import gsap from "gsap";
import Lenis from "lenis";
import App from "./App";
import "./index.css";

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', (e: any) => {
  // We can add ScrollTrigger.update here if needed
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById("root")!).render(<App />);
