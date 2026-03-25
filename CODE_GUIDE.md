# Code Guide - Roushan Kumar 3D Portfolio

## Quick Reference

### File Organization

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page-level components
├── contexts/           # React context providers
├── lib/                # Utility functions
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

---

## 🎯 Core Components

### 1. Navigation Component

**File:** `client/src/components/Navigation.tsx`

```typescript
export function Navigation() {
  // Features:
  // - Fixed top navigation
  // - Smooth scroll to sections
  // - Dynamic background blur
  // - Social media links
}
```

**Usage:**
```tsx
import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />
      {/* Page content */}
    </>
  );
}
```

**Customization:**
- Modify navigation items in the array
- Change blur intensity in GSAP animation
- Adjust colors in Tailwind classes

---

### 2. AnimatedBackground Component

**File:** `client/src/components/AnimatedBackground.tsx`

```typescript
export function AnimatedBackground() {
  // Features:
  // - Canvas-based particle system
  // - 50 animated particles
  // - Connection lines between particles
  // - Responsive to window resize
}
```

**Usage:**
```tsx
import { AnimatedBackground } from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <div>
      <AnimatedBackground />
      {/* Content */}
    </div>
  );
}
```

**Customization:**
- Change particle count: `const particleCount = 50;`
- Adjust particle size: `Math.random() * 2 + 0.5`
- Modify connection distance: `if (distance < 150)`
- Change colors: Update `rgba(0, 217, 255, ...)`

---

### 3. ScrollParallax Components

**File:** `client/src/components/ScrollParallax.tsx`

#### Counter Component
```typescript
<Counter 
  from={0} 
  to={100} 
  duration={2} 
  suffix="+" 
  className="text-5xl font-bold"
/>
```

#### ScrollParallax Component
```typescript
<ScrollParallax offset={50} className="card-neon">
  {/* Content that parallaxes on scroll */}
</ScrollParallax>
```

#### FloatingElement Component
```typescript
<FloatingElement duration={3} className="text-4xl">
  🎯
</FloatingElement>
```

#### GlitchText Component
```typescript
<GlitchText 
  text="Glitchy Text" 
  className="text-2xl font-bold"
/>
```

---

### 4. Card3D Component

**File:** `client/src/components/Card3D.tsx`

```typescript
<Card3D className="p-6 rounded-lg" intensity={15}>
  {/* Content with 3D hover effect */}
</Card3D>
```

**Props:**
- `children` - Card content
- `className` - Tailwind classes
- `intensity` - Rotation intensity (default: 15)

**Features:**
- Mouse-following 3D transforms
- Glow effect on hover
- Smooth transitions

---

## 🪝 Custom Hooks

### useScrollAnimation

**File:** `client/src/hooks/useScrollAnimation.ts`

```typescript
const { elementRef, isVisible } = useScrollAnimation();

return <div ref={elementRef}>Content</div>;
```

**Features:**
- Fade and slide animations
- Scroll trigger detection
- Returns ref and visibility state

---

### useScrollScale

**File:** `client/src/hooks/useScrollAnimation.ts`

```typescript
const elementRef = useScrollScale();

return <div ref={elementRef}>Content</div>;
```

**Features:**
- Scale animation from 0.8 to 1
- Fade in effect
- Scroll-triggered

---

### useScrollTransform3D

**File:** `client/src/hooks/useScrollTransform.ts`

```typescript
const elementRef = useScrollTransform3D({
  rotateX: 45,
  rotateY: 45,
  rotateZ: 0,
  perspective: 1000
});

return <div ref={elementRef}>Content</div>;
```

**Options:**
- `rotateX` - X-axis rotation (degrees)
- `rotateY` - Y-axis rotation (degrees)
- `rotateZ` - Z-axis rotation (degrees)
- `skewX` - X-axis skew
- `skewY` - Y-axis skew
- `perspective` - Perspective depth

---

### useMouseFollower

**File:** `client/src/hooks/useScrollTransform.ts`

```typescript
const elementRef = useMouseFollower();

return <div ref={elementRef}>Content responds to mouse</div>;
```

**Features:**
- Rotates element based on mouse position
- Smooth transitions
- Resets on mouse leave

---

## 🎨 Styling Guide

### Tailwind CSS Classes

**Neon Buttons:**
```tsx
<button className="btn-neon">Cyan Button</button>
<button className="btn-neon-magenta">Magenta Button</button>
```

**Neon Cards:**
```tsx
<div className="card-neon">
  {/* Content with neon border and glow */}
</div>
```

**Neon Text:**
```tsx
<h1 className="neon-glow">Glowing Cyan Text</h1>
<h1 className="neon-glow-magenta">Glowing Magenta Text</h1>
```

**Glitch Effect:**
```tsx
<div className="glitch">Glitchy Text</div>
```

**Animated Grid:**
```tsx
<div className="animated-grid">
  {/* Background with animated grid */}
</div>
```

---

### Custom CSS Variables

**In `index.css`:**
```css
:root {
  --neon-cyan: #00d9ff;
  --neon-magenta: #ff006e;
  --neon-purple: #b300ff;
  --space-black: #0a0e27;
  --deep-purple: #1a0033;
}
```

**Usage in Tailwind:**
```tsx
<div className="bg-space-black text-neon-cyan">
  {/* Uses CSS variables */}
</div>
```

---

## 📝 Page Structure

### Home Page (`client/src/pages/Home.tsx`)

**Sections:**

#### 1. HeroSection
```typescript
function HeroSection() {
  // Large title with glow
  // Subtitle with monospace font
  // Description text
  // CTA buttons
  // Scroll indicator
}
```

#### 2. AboutSection
```typescript
function AboutSection() {
  // Technical skills card
  // Experience card
  // Achievements card
  // Uses ScrollParallax for animations
}
```

#### 3. ProjectsSection
```typescript
function ProjectsSection() {
  // Project cards with:
  // - Title and description
  // - Technology tags
  // - GitHub links
  // - Floating emoji icons
  // - 3D hover effects
}
```

#### 4. SkillsSection
```typescript
function SkillsSection() {
  // Categorized skills:
  // - Languages
  // - Frontend
  // - Tools & Platforms
  // - Concepts
  // - Uses ScrollScale for animation
}
```

#### 5. EducationSection
```typescript
function EducationSection() {
  // Education timeline
  // Certifications
  // Uses ScrollParallax for staggered animation
}
```

#### 6. StatsSection
```typescript
function StatsSection() {
  // Animated counters
  // Statistics display
  // Uses Counter component
}
```

#### 7. ContactSection
```typescript
function ContactSection() {
  // Contact information
  // Social media links
  // Email link
  // Footer text
}
```

---

## 🔄 Animation Patterns

### Pattern 1: Scroll-Triggered Fade-In

```typescript
const { elementRef } = useScrollAnimation();

return (
  <section ref={elementRef} className="py-20">
    {/* Content fades in on scroll */}
  </section>
);
```

### Pattern 2: Parallax Offset

```typescript
<ScrollParallax offset={50}>
  <div>Moves 50px up on scroll</div>
</ScrollParallax>
```

### Pattern 3: Counter Animation

```typescript
<div className="text-5xl font-bold">
  <Counter from={0} to={100} suffix="+" />
</div>
```

### Pattern 4: 3D Hover Effect

```typescript
<Card3D intensity={20}>
  <div className="p-6">
    Content with 3D effect on hover
  </div>
</Card3D>
```

### Pattern 5: Floating Element

```typescript
<FloatingElement duration={3}>
  <div>Continuously floats up and down</div>
</FloatingElement>
```

---

## 🔧 Configuration

### GSAP ScrollTrigger Settings

**Default Settings:**
```typescript
{
  trigger: element,
  start: 'top 80%',      // Start when 80% visible
  end: 'top 20%',        // End when 20% visible
  scrub: 1,              // Smooth sync with scroll
  markers: false         // Debug markers (set true to debug)
}
```

**Customization:**
```typescript
// Faster animation
{ scrub: 0.5 }

// Slower animation
{ scrub: 2 }

// One-time animation
{ once: true }

// Debug mode
{ markers: true }
```

---

## 🎬 Animation Easing

**Common Easing Functions:**
```typescript
// Smooth deceleration
ease: 'power2.out'

// Smooth acceleration and deceleration
ease: 'power2.inOut'

// Bounce effect
ease: 'back.out'

// Smooth sine wave
ease: 'sine.inOut'

// Linear (no easing)
ease: 'none'
```

---

## 📱 Responsive Design

### Breakpoints

```typescript
// Mobile: < 640px
// Tablet: 640px - 1024px (md:)
// Desktop: > 1024px (lg:)

<div className="text-2xl md:text-4xl lg:text-6xl">
  Responsive text
</div>
```

### Mobile-First Approach

```typescript
// Start with mobile styles
<div className="w-full px-4">
  
  // Add tablet/desktop styles
  <div className="md:w-1/2 md:px-8">
    
    // Add large screen styles
    <div className="lg:w-1/3 lg:px-12">
      Content
    </div>
  </div>
</div>
```

---

## 🚀 Performance Tips

### 1. Memoize Components
```typescript
import { memo } from 'react';

export const MyComponent = memo(function MyComponent(props) {
  return <div>{props.children}</div>;
});
```

### 2. Use useCallback for Event Handlers
```typescript
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);
```

### 3. Lazy Load Components
```typescript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>
```

### 4. Optimize Animations
```typescript
// Use GPU-accelerated properties
// transform, opacity (good)
// width, height, left, top (bad - causes reflow)

gsap.to(element, {
  x: 100,        // GPU accelerated
  opacity: 0.5,  // GPU accelerated
  duration: 1
});
```

---

## 🐛 Debugging

### Enable GSAP Debug Markers

```typescript
gsap.to(element, {
  y: 100,
  scrollTrigger: {
    trigger: element,
    markers: true,  // Shows debug markers
    scrub: 1
  }
});
```

### Check Animation Performance

```typescript
// In browser DevTools
// Performance tab → Record → Scroll → Stop
// Look for smooth 60fps animations
```

### Log Animation Events

```typescript
gsap.to(element, {
  y: 100,
  onStart: () => console.log('Animation started'),
  onUpdate: () => console.log('Animation updating'),
  onComplete: () => console.log('Animation completed')
});
```

---

## 📦 Adding New Dependencies

```bash
# Install package
pnpm add package-name

# Install dev dependency
pnpm add -D package-name

# Restart dev server
pnpm run dev
```

---

## 🔐 Environment Variables

**File:** `.env.local`

```env
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-id
```

**Usage:**
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [GSAP Documentation](https://gsap.com)
- [Three.js Documentation](https://threejs.org)
- [Vite Documentation](https://vitejs.dev)

---

## 💡 Best Practices

1. **Component Naming** - Use PascalCase for components
2. **File Organization** - Group related files together
3. **Props Typing** - Always type component props
4. **Error Handling** - Use ErrorBoundary for error catching
5. **Performance** - Use React DevTools Profiler
6. **Accessibility** - Include alt text, ARIA labels
7. **Testing** - Write tests for critical functionality
8. **Documentation** - Comment complex logic

---

**Last Updated:** March 22, 2026
