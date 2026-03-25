# Quick Reference Guide

## 📋 File Locations

### Main Files
- **Home Page:** `client/src/pages/Home.tsx`
- **Global Styles:** `client/src/index.css`
- **App Root:** `client/src/App.tsx`
- **HTML Template:** `client/index.html`

### Components
- **Navigation:** `client/src/components/Navigation.tsx`
- **Background:** `client/src/components/AnimatedBackground.tsx`
- **Parallax:** `client/src/components/ScrollParallax.tsx`
- **3D Card:** `client/src/components/Card3D.tsx`
- **Footer:** `client/src/components/Footer.tsx`

### Hooks
- **Scroll Animation:** `client/src/hooks/useScrollAnimation.ts`
- **Scroll Transform:** `client/src/hooks/useScrollTransform.ts`

### Configuration
- **Tailwind:** `tailwind.config.js`
- **Vite:** `vite.config.ts`
- **TypeScript:** `tsconfig.json`
- **Package:** `package.json`

---

## 🚀 Common Commands

```bash
# Development
pnpm run dev              # Start dev server
pnpm run check            # Type check
pnpm run format           # Format code

# Production
pnpm run build            # Build for production
pnpm run preview          # Preview build

# Dependencies
pnpm install              # Install all
pnpm add package-name     # Add package
pnpm remove package-name  # Remove package
pnpm update               # Update all
```

---

## 🎨 Common Styling

```tsx
// Neon buttons
<button className="btn-neon">Cyan</button>
<button className="btn-neon-magenta">Magenta</button>

// Neon cards
<div className="card-neon">Content</div>

// Neon text
<h1 className="neon-glow">Glowing</h1>
<h1 className="neon-glow-magenta">Glowing</h1>

// Glitch effect
<div className="glitch">Glitchy</div>

// Animated grid
<div className="animated-grid">Background</div>
```

---

## 🎬 Common Animations

```tsx
// Scroll animation
const { elementRef } = useScrollAnimation();
<div ref={elementRef}>Fades in on scroll</div>

// Parallax
<ScrollParallax offset={50}>Content</ScrollParallax>

// Counter
<Counter from={0} to={100} suffix="+" />

// 3D Card
<Card3D intensity={15}>Content</Card3D>

// Floating
<FloatingElement duration={3}>Icon</FloatingElement>

// Glitch text
<GlitchText text="Text" />
```

---

## 🔧 Modify Colors

Edit `client/src/index.css`:

```css
:root {
  --neon-cyan: #00d9ff;        /* Change cyan */
  --neon-magenta: #ff006e;     /* Change magenta */
  --space-black: #0a0e27;      /* Change black */
}
```

---

## 📝 Add New Section

1. Create function in `Home.tsx`:
```tsx
function NewSection() {
  const { elementRef } = useScrollAnimation();
  return (
    <section id="new-section" ref={elementRef} className="py-20">
      {/* Content */}
    </section>
  );
}
```

2. Add to Navigation items array

3. Add to Home component return

---

## 🎯 Customize Hero Section

Edit `client/src/pages/Home.tsx` > `HeroSection()`:

```tsx
// Change title
<h1>YOUR NAME</h1>

// Change subtitle
<p>{'< Your Title />'}</p>

// Change description
<p>Your description here</p>

// Change button text
<a href="#projects">Your Text</a>
```

---

## 🎨 Customize Colors in Sections

```tsx
// Cyan text
className="text-cyan-400"

// Magenta text
className="text-pink-500"

// Purple text
className="text-purple-400"

// Cyan border
className="border-cyan-400"

// Magenta border
className="border-pink-500"
```

---

## 🔄 Update Social Links

Edit `Navigation.tsx` and `ContactSection()`:

```tsx
// GitHub link
href="https://github.com/your-username"

// LinkedIn link
href="https://linkedin.com/in/your-profile"

// Email link
href="mailto:your-email@example.com"
```

---

## 📱 Responsive Classes

```tsx
// Mobile first
<div className="text-sm">

// Tablet and up
<div className="md:text-base">

// Desktop and up
<div className="lg:text-lg">

// Full responsive
<div className="text-sm md:text-base lg:text-lg">
```

---

## 🎬 Animation Timing

```tsx
// Fast (0.3s)
duration={0.3}

// Normal (0.8s)
duration={0.8}

// Slow (2s)
duration={2}

// Scroll scrub (1 = 1 second behind scroll)
scrub={1}

// Faster scroll (0.5 = 0.5 second behind)
scrub={0.5}
```

---

## 🐛 Debug Animations

```tsx
// Enable GSAP markers
markers: true

// Log animation events
onStart: () => console.log('Started')
onUpdate: () => console.log('Updating')
onComplete: () => console.log('Done')
```

---

## 📊 File Sizes

```
dist/
├── index.html          ~5KB
├── assets/
│   ├── index-XXXX.js   ~150KB (gzipped: ~50KB)
│   └── index-XXXX.css  ~30KB (gzipped: ~8KB)
└── public/
    └── favicon.ico     ~1KB
```

---

## 🚀 Performance Tips

1. **Use transform/opacity** - GPU accelerated
2. **Avoid width/height changes** - Causes reflow
3. **Memoize components** - Prevent re-renders
4. **Lazy load images** - Load on demand
5. **Use CDN URLs** - Faster delivery
6. **Minify assets** - Smaller file size
7. **Enable compression** - GZIP on server
8. **Cache assets** - Set cache headers

---

## 🔐 Security Checklist

- [ ] No API keys in frontend code
- [ ] Use environment variables
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Input validation
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] Rate limiting

---

## 📚 Documentation Files

- `README.md` - Overview
- `PROJECT_STRUCTURE.md` - Detailed structure
- `CODE_GUIDE.md` - Code examples
- `SETUP_GUIDE.md` - Setup & deployment
- `QUICK_REFERENCE.md` - This file
- `ideas.md` - Design brainstorm

---

## 🆘 Quick Fixes

### Port in use
```bash
lsof -i :3000 && kill -9 <PID>
```

### Clear cache
```bash
rm -rf node_modules pnpm-lock.yaml && pnpm install
```

### Fix TypeScript errors
```bash
pnpm run check
```

### Format code
```bash
pnpm run format
```

---

**Last Updated:** March 22, 2026
