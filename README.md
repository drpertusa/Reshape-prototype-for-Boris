# Clinic Starter

A minimalist medical clinic website where Steve Jobs Archive aesthetics meet healthcare excellence. Built with obsessive attention to detail and radical simplicity.

## Vision

Creating the future of medical web presence through:
- **Extreme Minimalism**: 2-color palette, 2 fonts, 11 components
- **Performance Obsession**: Sub-100ms interactions
- **Privacy First**: Zero tracking by default
- **International Ready**: Built for global healthcare

## Tech Stack

- **Next.js 15.3.3** - React 19 with App Router
- **Tailwind CSS 4.1.10** - CSS-first configuration with @theme
- **TypeScript 5** - Strict type safety
- **shadcn/ui** - 11 components only (by design)
- **tw-animate-css** - Native CSS animations

## Design System

### Typography
- **Display**: LavaChicken Serif (custom variable font)
- **Body**: Inter (subset, optimized)

### Colors
Inspired by stevejobsarchive.com:
- **Light Mode**: #f9f9f9 background (98% lightness)
- **Dark Mode**: #050505 background (2% lightness)
- **Text**: Pure black/white contrast
- **Overlays**: Subtle light grey (Steve Jobs Archive style)

### Component Constraint (11 Maximum)
1. `navigation-menu` - Desktop navigation
2. `sheet` - Mobile menu/drawer
3. `button` - All CTAs
4. `dialog` - Modal windows
5. `drawer` - Bottom sheets
6. `form` - Form validation wrapper
7. `input` - Text inputs
8. `textarea` - Multi-line inputs
9. `select` - Dropdowns
10. `label` - Form labels
11. `sonner` - Toast notifications

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Type checking
npm run typecheck

# Production build
npm run build

# Lint code
npm run lint

# Deploy to Vercel
vercel --prod
```

## Project Structure

```
/app              # Next.js app router
/components/ui    # shadcn/ui components (11 max)
/components/layout # Shared layout components
/lib              # Utilities and constants
/types            # TypeScript definitions
/public           # Static assets
```

## Core Principles

1. **Performance**: Every millisecond matters
2. **Accessibility**: WCAG 2.2 AA minimum
3. **Privacy**: GDPR-compliant, consent-first
4. **Security**: OWASP headers, CSP enabled
5. **SEO**: Schema.org medical markup
6. **Minimalism**: If it's not essential, remove it

## Future Roadmap

### Phase 1: Internationalization (Q1 2025)
- [ ] Implement next-intl for multi-language support
- [ ] RTL layout support for Arabic/Hebrew
- [ ] Medical terminology translation system
- [ ] Locale-based date/time formatting

### Phase 2: Advanced Features (Q2 2025)
- [ ] Patient portal with authentication
- [ ] Appointment booking system
- [ ] Telemedicine integration
- [ ] HIPAA-compliant data handling

### Phase 3: AI Integration (Q3 2025)
- [ ] Symptom checker with medical LLM
- [ ] Intelligent appointment scheduling
- [ ] Multi-language medical chatbot
- [ ] Predictive health insights

### Phase 4: Platform Expansion (Q4 2025)
- [ ] Native mobile apps (React Native)
- [ ] Offline-first PWA capabilities
- [ ] Wearable device integration
- [ ] Real-time health monitoring

## Development Philosophy

"The best interface is no interface, but when you need one, make it invisible."

Every decision must answer: **Does this help patients get healthier faster?**

### What We Don't Do
- ❌ Carousels or sliders
- ❌ Stock photos
- ❌ Marketing popups
- ❌ Decorative animations
- ❌ Feature creep

### What We Obsess Over
- ✅ Load time under 1 second
- ✅ Interaction under 100ms
- ✅ Clear medical information
- ✅ Patient privacy
- ✅ Universal accessibility

## Contributing

Before contributing, read [CLAUDE.md](./CLAUDE.md) to understand our design philosophy and technical constraints.

Key rules:
1. No new components without removing one
2. Every feature must improve patient outcomes
3. Performance budgets are non-negotiable
4. Accessibility is not optional

## Deployment

Optimized for Vercel edge deployment:

```bash
# Production deployment
vercel --prod

# Preview deployment
vercel
```

Environment variables:
- `NEXT_PUBLIC_SITE_URL` - Your production URL
- Additional medical API keys as needed

## License

MIT License - Use freely while respecting patient privacy and medical ethics.

---

*"Simplicity is not the absence of clutter; it's the presence of clarity."*

Built with ❤️ for the future of healthcare.