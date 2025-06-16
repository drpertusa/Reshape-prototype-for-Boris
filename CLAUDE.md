# CLINIC STARTER - PROJECT DOCUMENTATION

> **Living Document**: This file evolves with every development decision. Each pattern discovered, each principle refined, each lesson learned gets documented here. This is our single source of truth.
>
> *Last Updated: June 16, 2025 - Consolidated sections, fixed inconsistencies, updated tech stack*

## TECHNOLOGY STACK

### Core Framework
- **Next.js**: 15.3.3 (App Router, RSC, React 19)
- **React**: 19 (Latest with concurrent features)
- **TypeScript**: 5 (Strict mode)

### Styling & UI
- **Tailwind CSS**: 4.1.10 (Latest v4 with CSS-first config)
- **tw-animate-css**: 1.3.4 (Animation utilities for Tailwind v4)
- **shadcn/ui**: 2.6.3 (11 components strictly enforced)

### Typography
- **LoveFrom Serif**: Custom display font (334KB total)
- **Helvetica Neue**: System body font

### Forms & Icons
- **React Hook Form**: 7.57.0 + Zod validation
- **Lucide React**: Icons (consistent iconography)
- **Sonner**: 2.0.5 (Toast notifications)

---

## MINIMALIST DESIGN PHILOSOPHY

### "Simplicity is the ultimate sophistication" - Steve Jobs

### Core Principles
1. **Constraint = Freedom**: 11 shadcn/ui components maximum
2. **Content-First**: Typography hierarchy drives design
3. **Intentional Interactions**: Every animation has purpose
4. **Trust Through Transparency**: Clear, honest messaging

### shadcn/ui Component Constraint (11 Maximum)
1. navigation-menu
2. sheet
3. button
4. dialog
5. drawer
6. form
7. input
8. textarea
9. select
10. label
11. sonner

**CI Check**: `ls components/ui/*.tsx | wc -l` must equal 11

---

## COLOR SYSTEM

### LoveFrom-Inspired Minimalism
- **Light Mode**: White (#ffffff) background, Black (#000000) text
- **Dark Mode**: Black background, White text
- **Muted**: Gray (#707070) for secondary text
- **Borders**: Light gray (#e5e5e5) in light mode

All colors use CSS variables that automatically switch with theme.

---

## TYPOGRAPHY

### Two-Font System
- **Display**: LoveFrom Serif - Headings, branding
- **Body**: Helvetica Neue - Content, UI elements

### Hierarchy (4 Levels)
1. **Hero**: 3rem+ - Page titles
2. **Heading**: 1.5-2rem - Sections
3. **Body**: 1rem - Content
4. **Caption**: 0.875rem - Metadata

---

## ANIMATION PHILOSOPHY

### Steve Jobs Archive Approach
- **tw-animate-css**: Provides Tailwind v4 animation utilities
- **250ms standard**: All transitions use consistent timing
- **Underline hover**: Links animate underline from 0 to 100% width
- **Sheet/Dialog**: Smooth slide + fade animations
- **No decorative animations**: Every motion has purpose

### Implementation
```css
/* Link hover - Steve Jobs Archive style */
a::after {
  width: 0;
  transition: all 0.25s ease;
}
a:hover::after {
  width: 100%;
}
```

---

## PROJECT STRUCTURE

```
/app              - Next.js app router pages
/components       
  /ui            - shadcn/ui components (11 max)
  /layout        - Shared components (Footer, Section, Container)
/lib             
  /constants.ts  - Site config, navigation, services
  /config.ts     - Dynamic utilities
  /fonts.ts      - Font configuration
  /utils.ts      - cn() utility
/types           - TypeScript interfaces
/public          - Static assets
```

### Key Patterns
- **Section/Container**: Consistent spacing and layout
- **Constants**: All hardcoded values in `/lib/constants.ts`
- **No duplication**: Extract shared code immediately
- **Type safety**: Interfaces in `/types/index.ts`

---

## 10 CORE PRINCIPLES

1. **Performance**: LCP ≤ 2.5s, INP < 200ms, CLS < 0.1
2. **Accessibility**: WCAG 2.2 AA, Lighthouse ≥ 90
3. **Privacy**: GDPR-compliant, no tracking without consent
4. **Security**: OWASP headers (CSP, HSTS, etc.)
5. **SEO**: schema.org/MedicalClinic structured data
6. **Component Governance**: 11 shadcn/ui components max
7. **Progressive Enhancement**: Mobile-first, 360px minimum
8. **Internationalization**: Next.js i18n ready (not implemented)
9. **Typography**: Two fonts maximum, <400KB total
10. **Analytics**: Real User Monitoring for vitals

---

## DEVELOPMENT CHANGELOG

### June 16, 2025
- **Animation Fix**: Added tw-animate-css for Tailwind v4 compatibility
- **Dark Mode**: Fixed theme switching with proper CSS variables
- **Security**: Removed deprecated X-XSS-Protection header
- **Typography**: Implemented LoveFrom Serif + Helvetica Neue
- **Colors**: Simplified to 2-color system (black/white)

### June 15, 2025
- **Structure**: Extracted Footer, Section, Container components
- **Constants**: Created single source of truth in `/lib/constants.ts`
- **Font Optimization**: Reduced from 1.1MB to 334KB
- **Component Count**: Enforced 11 component limit

---

## FORBIDDEN ELEMENTS

- Carousels/sliders
- Auto-playing media
- Marketing pop-ups
- Decorative animations
- Stock photos
- Marketing speak ("revolutionary", "breakthrough")

---

## DEVELOPMENT COMMANDS

```bash
npm run dev        # Development
npm run build      # Production build
npm run lint       # Linting
npm run typecheck  # Type checking
```

---

*"The best interface is no interface, but when you need one, make it invisible."*

*Every design decision must answer: Does this help patients get healthier faster?*