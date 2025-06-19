# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint checking
npm run typecheck    # TypeScript type checking
npm run subset-fonts # Font optimization

# Admin user creation
npx tsx scripts/create-admin.ts  # Create admin users programmatically
```

## Technology Stack

- **Next.js 15.3.3** - App Router with React 19 and Server Components
- **TypeScript 5** - Strict mode enabled
- **Tailwind CSS 4.1.10** - CSS-first configuration with @theme
- **shadcn/ui** - Component library (strict 11-component limit)
- **Supabase** - Authentication and database
- **React Hook Form + Zod** - Form validation
- **tw-animate-css** - Animation utilities for Tailwind v4

## Architecture Overview

### Multi-Language Medical Clinic Website
This is a medical clinic website with internationalization (i18n) support, built following extreme minimalist design principles inspired by Steve Jobs Archive and LoveFrom aesthetics.

### Key Architectural Patterns

1. **Internationalization System**
   - Locale-based routing: `/[locale]/page-name`
   - Middleware handles locale detection and redirection
   - Translations stored in `/i18n/locales/*.json`
   - Supported locales: en, es, fr, ar, ru, zh
   - Cookie-based locale persistence

2. **Authentication & Admin System**
   - Supabase auth with middleware protection
   - Admin routes: `/admin/*` (protected)
   - User management system
   - Session handling via HTTP-only cookies

3. **Component Constraint Philosophy**
   - Maximum 11 shadcn/ui components (enforced)
   - Current components: navigation-menu, sheet, button, dialog, drawer, form, input, textarea, select, label, sonner
   - No new components without removing existing ones

4. **Performance & SEO**
   - Medical schema.org structured data
   - Core Web Vitals monitoring
   - AI crawler detection and analytics
   - Security headers in next.config.js
   - Font optimization (LavaChicken Serif + Inter subset)

### File Structure Patterns

```
/app/[locale]/           # Internationalized pages
  - admin/               # Protected admin area
  - api/                 # API routes (analytics, consent, etc.)
/components/
  - ui/                  # shadcn/ui components (11 max)
  - layout/              # Shared layout components
  - seo/                 # SEO-related components
/i18n/                   # Internationalization
  - locales/             # Translation files
  - config.ts            # i18n configuration
/lib/
  - constants.ts         # Site-wide configuration
  - medical-schemas.ts   # Medical schema.org markup
  - seo-utils.ts         # SEO utilities
/utils/supabase/         # Supabase client configurations
```

### Critical Implementation Details

1. **Middleware Logic**
   - Handles locale redirection based on URL, cookies, and Accept-Language headers
   - Supabase session management
   - Marketing parameter stripping
   - AI crawler detection and logging
   - Redirect loop protection

2. **Medical Compliance**
   - GDPR-compliant cookie consent system
   - Medical schema.org structured data
   - WCAG 2.2 AA accessibility standards
   - OWASP security headers

3. **Design System Constraints**
   - Two-color system: black/white with 98%/2% variants
   - Two fonts maximum: LavaChicken Serif (display), Inter (body)
   - 8pt grid spacing system with 3 gutter sizes
   - Animation limited to 250ms transitions

4. **Performance Budgets**
   - LCP ≤ 2.5s, INP < 200ms, CLS < 0.1
   - Font loading under 400KB total
   - Sub-100ms interactions (target)

### Development Guidelines

1. **Component Development**
   - Check existing components before adding new ones
   - Follow the 11-component limit strictly
   - Use shadcn/ui patterns consistently
   - Extract shared logic to `/lib/` utilities

2. **Internationalization**
   - All user-facing text must use translation keys
   - Add new translations to all locale files
   - Test locale switching functionality
   - Handle RTL languages (Arabic) appropriately

3. **Admin System**
   - Admin routes require authentication middleware
   - Use Supabase client from `/utils/supabase/`
   - Follow existing auth patterns in admin components

4. **Medical Content**
   - Include appropriate schema.org markup
   - Maintain GDPR compliance
   - Test accessibility with screen readers
   - Validate medical information accuracy

### Testing & Deployment

1. **Pre-deployment Checks**
   - Run `npm run typecheck` (no TypeScript errors)
   - Run `npm run lint` (ESLint compliance)
   - Test internationalization functionality
   - Verify admin authentication flows

2. **Deployment Configuration**
   - Vercel deployment with edge functions
   - Environment variables for Supabase configured
   - Security headers applied via next.config.js
   - Font optimization enabled

### Common Patterns

1. **Server Components**
   - Use server components by default
   - Add 'use client' only when necessary (forms, interactivity)
   - Leverage React 19 features appropriately

2. **Form Handling**
   - React Hook Form + Zod validation pattern
   - Server actions for form submissions
   - Error handling with toast notifications

3. **SEO Implementation**
   - Dynamic metadata generation per locale
   - Structured data for medical content
   - Sitemap and robots.txt generation

This codebase prioritizes extreme minimalism, performance, and medical compliance while maintaining internationalization support and modern React patterns.