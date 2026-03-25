# Setup & Deployment Guide

## 📋 Prerequisites

- Node.js 18+ or 22+
- pnpm 10.4.1+
- Git
- A code editor (VS Code recommended)

---

## 🚀 Local Development Setup

### 1. Clone or Download Project

```bash
# If cloning from git
git clone <repository-url>
cd roushan-portfolio

# Or navigate to existing project
cd /home/ubuntu/roushan-portfolio
```

### 2. Install Dependencies

```bash
# Install all dependencies
pnpm install

# Or if you prefer npm
npm install

# Or if you prefer yarn
yarn install
```

### 3. Start Development Server

```bash
pnpm run dev
```

**Output:**
```
➜  Local:   http://localhost:3000/
➜  Network: http://169.254.0.21:3000/
```

Open `http://localhost:3000` in your browser.

### 4. Development Workflow

```bash
# Watch for changes and hot reload
pnpm run dev

# Type check in another terminal
pnpm run check

# Format code
pnpm run format
```

---

## 🏗️ Build for Production

### 1. Build Static Files

```bash
pnpm run build
```

**Output:**
```
dist/
├── index.html
├── assets/
│   ├── index-XXXXX.js
│   └── index-XXXXX.css
└── public/
```

### 2. Preview Production Build

```bash
pnpm run preview
```

Opens `http://localhost:4173` with production build.

### 3. Type Check Before Deploy

```bash
pnpm run check
```

Ensure no TypeScript errors.

---

## 🌐 Deployment Options

### Option 1: Deploy on Manus (Recommended)

**Advantages:**
- Built-in hosting with custom domains
- Automatic SSL/HTTPS
- CDN for fast delivery
- One-click deployment

**Steps:**
1. Create checkpoint (already done)
2. Click "Publish" button in Management UI
3. Configure custom domain (optional)
4. Done! Your site is live

**Custom Domain:**
1. Go to Settings → Domains
2. Purchase new domain or connect existing
3. Update DNS records
4. Assign to your Manus webapp

---

### Option 2: Deploy on Vercel

**Setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Configuration:**
- Framework: Vite
- Build Command: `pnpm run build`
- Output Directory: `dist`

**Environment Variables:**
```
VITE_API_URL=your-api-url
VITE_ANALYTICS_ID=your-id
```

---

### Option 3: Deploy on Netlify

**Setup:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy
```

**Configuration File:** `netlify.toml`
```toml
[build]
  command = "pnpm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 4: Deploy on GitHub Pages

**Setup:**
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)`
5. Your site deploys automatically

**Note:** Requires `vite.config.ts` update:
```typescript
export default {
  base: '/roushan-portfolio/',
  // ... rest of config
}
```

---

### Option 5: Self-Hosted (Docker)

**Dockerfile:**
```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install

COPY . .
RUN pnpm run build

FROM node:22-alpine
WORKDIR /app
RUN npm i -g serve
COPY --from=0 /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Build & Run:**
```bash
docker build -t roushan-portfolio .
docker run -p 3000:3000 roushan-portfolio
```

---

## 🔧 Environment Configuration

### Development Environment

**File:** `.env.local`
```env
# API Configuration
VITE_API_URL=http://localhost:3001

# Analytics
VITE_ANALYTICS_ID=dev-id

# Feature Flags
VITE_ENABLE_ANIMATIONS=true
```

### Production Environment

**File:** `.env.production`
```env
# API Configuration
VITE_API_URL=https://api.production.com

# Analytics
VITE_ANALYTICS_ID=prod-id

# Feature Flags
VITE_ENABLE_ANIMATIONS=true
```

### Accessing Environment Variables

```typescript
// In React components
const apiUrl = import.meta.env.VITE_API_URL;
const analyticsId = import.meta.env.VITE_ANALYTICS_ID;
```

---

## 📊 Performance Optimization

### 1. Image Optimization

```bash
# Use CDN URLs instead of local files
# Example: https://cdn.example.com/image.png

# Or use dynamic imports
const image = await import('./image.png');
```

### 2. Code Splitting

Vite automatically splits code at:
- Route boundaries
- Dynamic imports
- Lazy-loaded components

### 3. CSS Optimization

```bash
# Tailwind purges unused styles in production
# No additional configuration needed
```

### 4. JavaScript Minification

```bash
# Automatic in production build
pnpm run build
```

### 5. Caching Strategy

```typescript
// Set cache headers in server config
// For static assets: 1 year
// For HTML: no-cache
```

---

## 🔐 Security Checklist

- [ ] No sensitive data in frontend code
- [ ] Environment variables for API keys
- [ ] HTTPS enabled on production
- [ ] CORS properly configured
- [ ] Input validation on forms
- [ ] XSS protection enabled
- [ ] CSRF tokens for forms
- [ ] Rate limiting on API
- [ ] Security headers configured
- [ ] Dependencies up to date

---

## 🐛 Troubleshooting

### Issue: Port 3000 Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
pnpm run dev -- --port 3001
```

### Issue: Dependencies Not Installing

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Issue: Build Fails

```bash
# Check TypeScript errors
pnpm run check

# Clear build cache
rm -rf dist

# Rebuild
pnpm run build
```

### Issue: Hot Reload Not Working

```bash
# Restart dev server
pnpm run dev

# Check if file is in src/ directory
# Vite only watches src/ folder
```

### Issue: Animations Stuttering

```bash
# Check browser performance
# Open DevTools → Performance tab
# Record animation and check FPS
# Should be smooth 60fps

# Optimize animations
# Use transform and opacity (GPU accelerated)
# Avoid width, height, left, top changes
```

---

## 📦 Dependency Management

### Update Dependencies

```bash
# Check for updates
pnpm outdated

# Update all dependencies
pnpm update

# Update specific package
pnpm update package-name

# Update to latest major version
pnpm add package-name@latest
```

### Remove Dependencies

```bash
pnpm remove package-name
```

### Lock Dependencies

```bash
# pnpm-lock.yaml is automatically generated
# Commit to version control
git add pnpm-lock.yaml
git commit -m "Lock dependencies"
```

---

## 🔄 Continuous Integration

### GitHub Actions Example

**File:** `.github/workflows/deploy.yml`
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 22
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm run check
      - run: pnpm run build
      
      - name: Deploy
        run: pnpm run deploy
```

---

## 📈 Monitoring & Analytics

### Google Analytics Setup

```typescript
// In index.html
<script
  defer
  src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Error Tracking (Sentry)

```bash
pnpm add @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
});
```

---

## 🚀 Performance Monitoring

### Lighthouse Audit

```bash
# Install Lighthouse CLI
npm i -g lighthouse

# Run audit
lighthouse https://your-site.com --view
```

**Target Scores:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### Web Vitals

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

---

## 📝 Backup & Recovery

### Backup Project

```bash
# Create backup
tar -czf roushan-portfolio-backup.tar.gz roushan-portfolio/

# Upload to cloud storage
aws s3 cp roushan-portfolio-backup.tar.gz s3://backups/
```

### Restore from Backup

```bash
# Extract backup
tar -xzf roushan-portfolio-backup.tar.gz

# Reinstall dependencies
cd roushan-portfolio
pnpm install
```

---

## 🎯 Deployment Checklist

- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No console errors/warnings
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Environment variables set
- [ ] Backup created
- [ ] DNS configured (if custom domain)
- [ ] SSL certificate valid
- [ ] Monitoring configured
- [ ] Analytics enabled
- [ ] Error tracking enabled

---

## 📞 Support & Resources

- **Manus Documentation:** https://docs.manus.im
- **Vite Documentation:** https://vitejs.dev
- **React Documentation:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **GSAP Documentation:** https://gsap.com

---

**Last Updated:** March 22, 2026
