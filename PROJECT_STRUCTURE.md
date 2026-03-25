# Roushan Kumar - 3D Immersive Portfolio

## Project Overview

An immersive 3D portfolio website built with React, Three.js, GSAP, and Tailwind CSS. Features scroll-triggered animations, animated particle backgrounds, and a cyberpunk neon aesthetic design.

**Live URL:** https://3000-itx1twjxqndpxsqb97vy1-615c5e8a.us2.manus.computer

**Version:** cc13f2c4

---

## 📁 Project Structure

```
roushan-portfolio/
├── client/                          # Frontend application
│   ├── public/                      # Static assets
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── __manus__/
│   │       └── version.json
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── AnimatedBackground.tsx      # Particle network animation
│   │   │   ├── Card3D.tsx                  # 3D card with hover effects
│   │   │   ├── ErrorBoundary.tsx           # Error handling wrapper
│   │   │   ├── Footer.tsx                  # Footer component
│   │   │   ├── ManusDialog.tsx             # Dialog component
│   │   │   ├── Map.tsx                     # Google Maps integration
│   │   │   ├── Navigation.tsx              # Top navigation bar
│   │   │   ├── Scene3D.tsx                 # Three.js 3D scene
│   │   │   └── ScrollParallax.tsx          # Parallax scroll components
│   │   ├── contexts/                # React contexts
│   │   │   └── ThemeContext.tsx     # Dark/light theme management
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useComposition.ts    # Composition utilities
│   │   │   ├── useMobile.tsx        # Mobile detection hook
│   │   │   ├── usePersistFn.ts      # Persistent function hook
│   │   │   ├── useScrollAnimation.ts # Scroll animation hook
│   │   │   └── useScrollTransform.ts # 3D scroll transform hook
│   │   ├── lib/                     # Utility functions
│   │   │   └── utils.ts             # Helper utilities
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.tsx             # Main portfolio page
│   │   │   └── NotFound.tsx         # 404 page
│   │   ├── App.tsx                  # Root app component with routing
│   │   ├── const.ts                 # Shared constants
│   │   ├── index.css                # Global styles & theme
│   │   └── main.tsx                 # React entry point
│   └── index.html                   # HTML template
├── server/                          # Backend server (placeholder)
│   └── index.ts                     # Express server
├── shared/                          # Shared types
│   └── const.ts                     # Shared constants
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite build configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── ideas.md                         # Design brainstorm document
└── PROJECT_STRUCTURE.md             # This file
```

---

## 🎨 Design System

### Cyberpunk Neon Minimalism Theme

**Color Palette:**
- **Primary Cyan:** `#00d9ff` - Main accent color with glow effects
- **Primary Magenta:** `#ff006e` - Secondary accent for contrast
- **Space Black:** `#0a0e27` - Primary background
- **Deep Purple:** `#1a0033` - Secondary background
- **Dark Navy:** `#0f1419` - Tertiary background

**Typography:**
- **Headings:** Space Mono (monospace, 400/700 weight) - Technical, futuristic feel
- **Body:** Inter (sans-serif, 400/500/600/700) - Clean, readable

**Visual Effects:**
- Neon glow text shadows
- Glitch animations on hover
- Animated grid background
- Floating particle network with connections
- Parallax scrolling
- 3D card transforms

---

## 🚀 Key Features

### 1. **Animated Particle Background**
- **File:** `client/src/components/AnimatedBackground.tsx`
- Canvas-based particle system with dynamic connections
- Smooth animation loop with fade effects
- Responsive to window resize

### 2. **Scroll-Triggered Animations**
- **Files:** 
  - `client/src/hooks/useScrollAnimation.ts`
  - `client/src/hooks/useScrollTransform.ts`
- GSAP ScrollTrigger integration
- Parallax scrolling effects
- Counter animations for statistics
- Glitch text effects

### 3. **Navigation System**
- **File:** `client/src/components/Navigation.tsx`
- Smooth scroll navigation
- Dynamic background blur on scroll
- Social media links (GitHub, LinkedIn)
- Responsive mobile menu ready

### 4. **3D Components**
- **File:** `client/src/components/Card3D.tsx`
- Mouse-following 3D card transforms
- Perspective effects
- Glow animations on hover

### 5. **Responsive Design**
- Mobile-first approach
- Tailwind CSS utility classes
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Optimized for all screen sizes

---

## 📦 Dependencies

### Core Libraries
```json
{
  "react": "^19.2.1",
  "react-dom": "^19.2.1",
  "wouter": "^3.3.5"
}
```

### Animation & Effects
```json
{
  "gsap": "^3.14.2",
  "framer-motion": "^12.23.22",
  "three": "^0.183.2",
  "@react-three/fiber": "^9.5.0",
  "@react-three/drei": "^10.7.7",
  "lenis": "^1.3.19"
}
```

### Styling
```json
{
  "tailwindcss": "^4.1.14",
  "@tailwindcss/vite": "^4.1.3",
  "tailwind-merge": "^3.3.1",
  "tailwindcss-animate": "^1.0.7"
}
```

### UI Components
```json
{
  "lucide-react": "^0.453.0",
  "@radix-ui/*": "latest",
  "shadcn/ui": "components"
}
```

### Development
```json
{
  "typescript": "5.6.3",
  "vite": "^7.1.7",
  "tailwindcss": "^4.1.14",
  "postcss": "^8.4.47"
}
```

---

## 🎯 Component Breakdown

### Pages

#### `Home.tsx` (Main Portfolio Page)
**Sections:**
1. **HeroSection** - Name, title, description, CTA buttons
2. **AboutSection** - Skills, experience, achievements
3. **ProjectsSection** - Featured projects with links
4. **SkillsSection** - Categorized skills grid
5. **EducationSection** - Education and certifications
6. **StatsSection** - Animated counters
7. **ContactSection** - Contact information and social links

**Animations:**
- Initial fade-in animations on mount
- Scroll-triggered reveals
- Parallax effects on cards
- Floating elements with continuous animation

### Components

#### `Navigation.tsx`
- Fixed top navigation bar
- Smooth scroll to sections
- Dynamic background blur on scroll
- Social media links
- Responsive design

#### `AnimatedBackground.tsx`
- Canvas-based particle system
- 50 particles with velocity and opacity
- Connection lines between nearby particles
- Continuous animation loop
- Responsive to window resize

#### `ScrollParallax.tsx`
- **Counter** - Animated number counter
- **ScrollParallax** - Parallax scroll effect
- **GlitchText** - Glitch animation text
- **FloatingElement** - Continuous floating animation

#### `Card3D.tsx`
- Mouse-following 3D transforms
- Glow effect on hover
- Perspective transforms
- Smooth transitions

#### `Footer.tsx`
- Copyright information
- Built with credits
- Minimal design

### Hooks

#### `useScrollAnimation.ts`
- `useScrollAnimation()` - Fade and slide animations
- `useScrollRotation()` - Rotation on scroll
- `useScrollScale()` - Scale animations

#### `useScrollTransform.ts`
- `useScrollTransform3D()` - 3D perspective transforms
- `useScrollReveal()` - Reveal animations
- `useMouseFollower()` - Mouse-following effects

---

## 🎨 Styling

### Global Styles (`index.css`)

**CSS Variables:**
```css
--neon-cyan: #00d9ff
--neon-magenta: #ff006e
--neon-purple: #b300ff
--space-black: #0a0e27
--deep-purple: #1a0033
```

**Custom Utilities:**
- `.neon-glow` - Cyan text glow
- `.neon-glow-magenta` - Magenta text glow
- `.glitch` - Glitch animation
- `.animated-grid` - Animated background grid
- `.btn-neon` - Cyan neon button
- `.btn-neon-magenta` - Magenta neon button
- `.card-neon` - Neon-styled card

**Animations:**
- `@keyframes glitch` - Glitch effect
- `@keyframes moveGrid` - Grid animation

---

## 🔧 Configuration Files

### `vite.config.ts`
- React plugin configuration
- HMR settings for development
- Build optimization

### `tailwind.config.js`
- Custom theme colors
- Extended spacing
- Custom animations

### `tsconfig.json`
- TypeScript strict mode
- Path aliases (`@/` for src)
- React JSX configuration

### `package.json`
- Scripts: `dev`, `build`, `preview`, `check`, `format`
- Dependencies and dev dependencies
- Package manager: pnpm

---

## 🚀 Getting Started

### Installation
```bash
cd /home/ubuntu/roushan-portfolio
pnpm install
```

### Development
```bash
pnpm run dev
```
Starts dev server at `http://localhost:3000`

### Build
```bash
pnpm run build
```
Creates optimized production build

### Preview
```bash
pnpm run preview
```
Preview production build locally

### Type Check
```bash
pnpm run check
```
Run TypeScript type checking

### Format
```bash
pnpm run format
```
Format code with Prettier

---

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

All components use Tailwind's responsive prefixes:
- `md:` for tablet and up
- `lg:` for desktop and up

---

## 🎬 Animation Details

### Scroll Triggers
- **Start:** `top 80%` - Animation starts when element is 80% visible
- **End:** `top 20%` - Animation ends when element is 20% visible
- **Scrub:** 1-2 seconds - Smooth sync with scroll

### Easing Functions
- `power2.out` - Smooth deceleration
- `power2.inOut` - Smooth acceleration and deceleration
- `back.out` - Bounce effect
- `sine.inOut` - Smooth sine wave

### Effects
- **Fade In:** Opacity 0 → 1
- **Slide Up:** Y position 50-100px → 0
- **Scale:** 0.8-0.95 → 1
- **Rotate:** 0° → 360°
- **Parallax:** Different scroll speeds per layer

---

## 📊 Performance Optimizations

1. **Code Splitting** - Vite handles automatic code splitting
2. **Image Optimization** - No local images, using CDN
3. **CSS-in-JS** - Tailwind purges unused styles
4. **Animation Performance** - GPU-accelerated transforms
5. **Lazy Loading** - Components load on demand
6. **Debounced Events** - Scroll and resize events optimized

---

## 🔐 Security Considerations

- No sensitive data stored in frontend
- Environment variables for API keys
- CORS properly configured
- Input validation on forms
- XSS protection via React's built-in escaping

---

## 🐛 Debugging

### Browser Console
- Check for TypeScript errors
- Monitor animation performance
- Verify scroll trigger activation

### Dev Tools
- React DevTools for component inspection
- Performance tab for animation smoothness
- Network tab for asset loading

### Logs
- Check `.manus-logs/` directory for server logs
- Browser console for client-side errors

---

## 📝 Future Enhancements

1. **3D Scene Integration** - Activate Three.js scene with rotating objects
2. **Contact Form** - Add backend form submission
3. **Blog Section** - Add case studies and technical articles
4. **Dark/Light Theme Toggle** - Implement theme switcher
5. **Analytics** - Track user interactions and page views
6. **SEO Optimization** - Add meta tags and structured data
7. **PWA Support** - Add service worker for offline support

---

## 📞 Contact & Links

- **Email:** roushanraut404@gmail.com
- **GitHub:** https://github.com/Hey-Astreon
- **LinkedIn:** https://www.linkedin.com/in/roushan-kumar-ab4b19250/

---

## 📄 License

© 2026 Roushan Kumar. All rights reserved.

---

**Last Updated:** March 22, 2026
**Checkpoint Version:** cc13f2c4
