# Clinic Starter

A minimalist medical clinic website starter built with philosophical precision—where Steve Jobs' design minimalism meets medical excellence.

## Philosophy

Built on the principle of "inevitability through constraint," this starter embodies:
- **Humanity through Typography**: Fraunces serif for aspiration, Inter sans for precision
- **Component Minimalism**: Only 11 essential components, nothing more
- **Performance Obsession**: Core Web Vitals as non-negotiable standards
- **Privacy First**: GDPR-compliant, no tracking without explicit consent

## Tech Stack

- **Next.js 15.3.3** - React 19 with App Router
- **Tailwind CSS 4.1.10** - Modern CSS with OKLCH colors
- **Framer Motion 12.18.1** - Subtle, purposeful animations
- **TypeScript 5** - Type safety throughout

## Core Principles

1. **Performance Excellence**: LCP ≤ 2.5s, INP < 200ms, CLS < 0.1
2. **Accessibility**: WCAG 2.2 AA compliance
3. **Privacy & Security**: No third-party scripts, encrypted data
4. **SEO Foundation**: AI-first optimization with schema.org
5. **Mobile First**: 360px base, fluid typography
6. **Component Governance**: 11 components maximum
7. **Design Tokens**: Centralized in Tailwind theme
8. **Progressive Enhancement**: Works without JavaScript
9. **Internationalization**: RTL support, multi-language ready
10. **Developer Experience**: Fast builds, clear documentation

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run type checking
npm run typecheck
```

## Component Library

Our 11 essential components:
- `navigation-menu` - Primary navigation
- `sheet` - Mobile menu and overlays
- `button` - All interactive elements
- `dialog` - Modal interactions
- `drawer` - Sliding panels
- `form` - Form wrapper with validation
- `input` - Text inputs
- `textarea` - Multi-line inputs
- `select` - Dropdown selections
- `label` - Form labels
- `sonner` - Toast notifications

## Design System

### Typography
- **Display**: Fraunces variable serif (humanity + aspiration)
- **Body**: Inter variable sans (medical precision)

### Colors
Using OKLCH color space for perceptual uniformity:
- Carefully crafted light/dark themes
- Accessible contrast ratios
- Semantic color tokens

## Performance

Optimized for Core Web Vitals:
- Font subsetting and WOFF2 compression
- Image optimization with next/image
- Code splitting and lazy loading
- Minimal JavaScript bundle

## Deployment

Ready for instant deployment on Vercel:

```bash
vercel --prod
```

## Philosophy Documentation

See [CLAUDE.md](./CLAUDE.md) for comprehensive design philosophy, technical decisions, and immutable principles.

## License

MIT License - Use freely while honoring the minimalist philosophy.

---

*"Simplicity is the ultimate sophistication" - Leonardo da Vinci*