# CLINIC STARTER - COMPLETE PROJECT DOCUMENTATION

> **Living Document**: This file evolves with every development decision. Each pattern discovered, each principle refined, each lesson learned gets documented here. This is our single source of truth.
>
> *Last Updated: June 15, 2025 - Added Project Structure, Component Patterns, Development Rules*

## TECHNOLOGY STACK (Latest Stable)

### Core Framework
- **Next.js**: 15.3.3 (App Router, RSC, React 19)
- **React**: 19 (Latest with concurrent features)
- **TypeScript**: 5 (Strict mode)

### Styling & UI
- **Tailwind CSS**: 4.1.10 (Latest v4 with @theme, OKLCH colors)
- **shadcn/ui**: 2.6.3 (10 components max constraint)
- **Framer Motion**: 12.18.1 (Subtle animations only)

### Notifications & Forms
- **Sonner**: 2.0.5 (Toast replacement - modern notifications)
- **React Hook Form**: 7.57.0 + Zod validation
- **Lucide React**: Icons (consistent iconography)

---

## MINIMALIST DESIGN PHILOSOPHY (Steve Jobs/Jony Ive Inspired)

### "Simplicity is the ultimate sophistication"

### 1. **Constraint = Freedom**
- **11 Components Maximum**: navigation-menu, sheet, button, dialog, drawer, form, input, textarea, select, label, sonner
- No exceptions, no additions without explicit consent and double confirmation.
- Every component must serve multiple purposes

### 2. **Content-First Design**
- Typography hierarchy drives everything
- White space is not empty space—it's breathing room
- Content clarity over visual complexity

### 3. **Intentional Interactions**
- Every click, hover, and transition must have purpose
- Micro-interactions should feel inevitable, not impressive
- User intent guides interface, not designer preferences

### 4. **Trust Through Transparency**
- Clear pricing, honest messaging
- No hidden information or surprise reveals
- Professional without being intimidating

---

## COLOR SYSTEM

### Primary Palette (Medical Trust + Approachability)
- **Primary**: Deep navy (#1e293b) - Trust, professionalism
- **Secondary**: Warm white (#fefefe) - Cleanliness, clarity  
- **Accent**: Soft green (#10b981) - Health, positive outcomes
- **Warning**: Amber (#f59e0b) - Gentle alerts
- **Neutral**: Cool grays - Supporting content

### Usage Rules
- 70% neutral/white space
- 20% primary (navy)
- 10% accent colors
- Never more than 3 colors per screen

---

## TYPOGRAPHY SYSTEM

### Hierarchy (Only 4 Levels)
1. **Hero** - 3rem+ - Page titles, major CTAs
2. **Heading** - 1.5-2rem - Section headers
3. **Body** - 1rem - Primary content, forms
4. **Caption** - 0.875rem - Supporting text, metadata

### Font Philosophy (Ive's "Inevitability" Principle)
- **Display**: Fraunces Variable Serif - **Humanity + Aspiration**
  - Headings, branding, transformational messaging
  - "Reminds patients they're in a place where transformation is both scientific and deeply personal"
- **Body**: Inter Variable Sans - **Medical Precision**  
  - Body text, forms, clinical information, UI elements
  - "The workhorse sans fulfils the clinic's promise of medical precision"
- **Constraint = Focus**: Two fonts maintain visual clarity, avoiding noise
- **Performance**: WOFF2 optimized, variable fonts, system fallbacks
- **Purpose**: Each font communicates values - competence + care

---

## SPACING SYSTEM (8pt Grid)
**Scale**: 4, 8, 16, 24, 32, 48, 64, 96
- Consistent rhythm creates calm
- Larger spaces between sections than within
- Mobile-first responsive scaling

---

## MOTION PHILOSOPHY

### Subtle, Purposeful Animation Only
- **Framer Motion 12.18.1** - Latest stable
- Micro-interactions for feedback, not entertainment
- Transitions should feel inevitable, not impressive
- Maximum 300ms duration for most animations
- Only 4 animation types: fadeIn, fadeInUp, slideIn, cardHover

### Animation Constraints
- No decorative animations
- No auto-playing motion
- Respect `prefers-reduced-motion`
- Enhance usability, never distract

---

## SITE ARCHITECTURE

### Essential Pages (Maximum 7)
1. **Home** - Clear value proposition, booking CTA
2. **Services** - What we offer, transparent pricing
3. **Book** - Appointment scheduling 
4. **About** - Team credentials, clinic philosophy
5. **Contact** - Location, hours, methods
6. **Resources** - FAQ, prep instructions
7. **Portal** - Patient account access

---

## CONTENT STRATEGY (Commercial Clinic)

### Messaging Principles
- **Accessible Language**: No medical jargon
- **Outcome-Focused**: "Feel better faster" vs "Advanced therapeutic modalities"
- **Reassuring Tone**: Confident but not arrogant
- **Clear Next Steps**: Always obvious what to do next

### Trust Signals
- Team photos and credentials
- Transparent pricing
- Clear policies
- Patient testimonials (authentic, not promotional)
- Professional certifications

---

## 10 CORE PRINCIPLES (IMMUTABLE CONTRACT)

### 1. **Performance & Core Web Vitals**
- **LCP ≤ 2.5s** (Largest Contentful Paint) - Release blocker
- **INP < 200ms** (Interaction to Next Paint) - Release blocker
- **CLS < 0.1** (Cumulative Layout Shift)
- Google 2025 ranking signals enforced

### 2. **Accessibility by Default**
- **WCAG 2.2 AA** compliance mandatory
- **Automated CI checks**: axe, Pa11y
- **Color contrast**: 4.5:1 body, 3:1 at 24px+
- **Focus styles first** - tab navigation required
- **Lighthouse score ≥ 90** or build fails

### 3. **Privacy, Consent & Ethics**
- **GDPR-compliant** - no tracking without opt-in
- **First-party analytics only**
- **Dynamic consent** for patient records
- **Ethical principles**: autonomy, confidentiality, equity

### 4. **Security & Hardening**
- **OWASP headers**: CSP, HSTS, Permissions-Policy, etc.
- **TLS 1.3** default, HTTP/3 where available
- **Subresource Integrity** for third-party scripts
- **Quarterly security audits**

### 5. **Semantic SEO (AI-First Era)**
- **schema.org/MedicalClinic** structured data
- **Rich metadata**: address, hours, specialties
- **Original content only** - no thin articles
- **AI agent optimization**

### 6. **Design System & Component Governance**
- **11 components maximum** (enforced: navigation-menu, sheet, button, dialog, drawer, form, input, textarea, select, label, sonner)
- **No additions without removal** - strict enforcement
- **Regular component audits** - automated checks
- **Design tokens centralized** in Tailwind theme
- **CI check**: `ls components/ui/*.tsx | wc -l` must equal 11

### 7. **Progressive Enhancement & Mobile-First**
- **Start at 360px width**
- **HTML/CSS first** - JS only when necessary
- **Keyboard accessible** before JS
- **Critical path optimized**

### 8. **Internationalization (i18n)**
- **Next.js i18n** configured day 1
- **Localized URLs**: /en/, /es/, etc.
- **JSON-based translations**
- **hreflang headers** automatic

### 9. **Typography & Asset Strategy**
- **Two fonts maximum** - Fraunces + Inter
- **Variable fonts** under 200KB total
- **WOFF2 primary** format
- **System font fallbacks**

### 10. **Analytics & Continuous Improvement**
- **Real User Monitoring** for vitals
- **SLO alerts** on performance
- **Quarterly audits** for compliance
- **Data-driven iterations**

---

## TECHNICAL IMPLEMENTATION

### Performance Targets
- < 2s page load (enforced)
- Mobile-first responsive
- SEO optimized

### Code Philosophy
- Prefer composition over abstraction
- Delete code aggressively
- Component reuse over customization
- Consistent naming conventions
- Single source of truth for all values

### Animation Philosophy (Ive-Inspired Microanimations)
- **Native CSS only** - No animation libraries (Motion, Framer Motion, etc.)
- **Tailwind utilities** - Use built-in transitions and animations
- **Subtle & purposeful** - Every animation must have clear intent
- **Timing**: 200-500ms max (Apple's sweet spot: 300ms)
- **Easing**: ease-out for natural deceleration
- **Never decorative** - Animations guide, inform, or acknowledge

#### Approved Animation Patterns
```css
/* Hover states - barely noticeable but felt */
hover:opacity-90 transition-opacity duration-200

/* Focus states - gentle scale */
focus:scale-[1.02] transition-transform duration-300

/* State changes - smooth color shifts */
hover:bg-primary/90 transition-colors duration-300

/* Sheet/Dialog - slide with fade */
data-[state=open]:animate-in data-[state=open]:slide-in-from-right
data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right
```

#### Animation Principles
1. **Inevitability** - Animations feel natural, not added
2. **Restraint** - If unsure, don't animate
3. **Performance** - CSS transforms only, no layout shifts
4. **Accessibility** - Respect prefers-reduced-motion
5. **Consistency** - Same timings across all interactions

### Project Structure (Skeleton Architecture)

#### Directory Organization
```
/app              - Next.js app router pages
/components       
  /ui            - shadcn/ui components (11 max)
  /layout        - Shared layout components (Footer, Section, Container)
/lib             
  /constants.ts  - Site config, navigation, services
  /config.ts     - Dynamic utilities, helpers
  /fonts.ts      - Font configuration
  /utils.ts      - cn() and other utilities
/types           - TypeScript interfaces
/public          - Static assets
```

#### Key Architectural Decisions
1. **No Code Duplication** - Extract shared components immediately
2. **Configuration First** - All hardcoded values in `/lib/constants.ts`
3. **Type Safety** - Define interfaces in `/types/index.ts`
4. **Component Hierarchy**:
   - `Section` → Handles spacing and backgrounds
   - `Container` → Handles max-width and padding
   - Never use raw `<section>` or `<div className="max-w-*">`
5. **Dynamic Values** - Use utilities from `/lib/config.ts` (e.g., `getCurrentYear()`)

#### Component Patterns
```tsx
// Always use Section for page sections
<Section variant="muted" containerSize="lg">
  <h2>Title</h2>
  <p>Content</p>
</Section>

// Never hardcode values
❌ <p>&copy; 2024 Reshape</p>
✅ <p>&copy; {getCurrentYear()} {SITE_CONFIG.name}</p>

// Use constants for repeated data
❌ Multiple hardcoded service lists
✅ SERVICES.map(service => ...)
```

#### Development Rules
1. **Before creating any file**: Check if similar component exists
2. **Before hardcoding any value**: Add to constants
3. **Before duplicating any code**: Extract to shared component
4. **Before adding inline styles**: Use Tailwind utilities
5. **Before adding new dependencies**: Question if truly needed

---

## FORBIDDEN ELEMENTS

### Never Use
- Carousels/sliders (users miss content)
- Auto-playing media
- Pop-ups for marketing
- More than 2 levels of navigation
- Decorative/flashy animations
- Stock medical photos
- Marketing speak ("revolutionary", "breakthrough")

### Design Debt Prevention
- Regular component audits
- User testing over design opinions
- Analytics-driven decisions
- Question every addition

---

## DEVELOPMENT CHANGELOG & LESSONS LEARNED

### June 15, 2025
- **Structural Refactoring**: Extracted shared components (Footer, Section, Container)
- **Configuration Management**: Created `/lib/constants.ts` as single source of truth
- **Type Safety**: Added TypeScript interfaces in `/types/index.ts`
- **Lesson**: Code duplication happens fast - extract immediately
- **Lesson**: Hardcoded values multiply - centralize from day one
- **Decision**: Use `getCurrentYear()` not hardcoded dates
- **Pattern**: Section/Container composition for consistent spacing

### Earlier Sessions
- **Font Optimization**: Converted to WOFF2, need subsetting for <200KB target
- **Animation Philosophy**: Native CSS only, no libraries needed
- **Component Constraint**: 11 components max enforced
- **Navigation Pattern**: NavigationMenu (desktop) + Sheet (mobile)
- **Lesson**: Sheet better than Drawer for navigation menus
- **Lesson**: Tailwind v4 animations need manual keyframes

---

## SUCCESS METRICS

### Primary
- Appointment booking completion rate
- Time to complete key tasks
- Patient satisfaction scores
- Accessibility compliance

### Secondary  
- Page load speeds
- Mobile usability scores
- SEO rankings for local search
- Component reuse percentage

---

## DEVELOPMENT COMMANDS

```bash
# Development
npm run dev

# Production build
npm run build

# Linting
npm run lint

# Component installation (shadcn)
npx shadcn@latest add [component-name]
```

---

## PROJECT STRUCTURE

```
/app                 # Next.js App Router
/components/ui       # shadcn components (10 max)
/lib                 # Utilities (utils.ts, motion.ts)
/hooks              # Custom React hooks
/public             # Static assets
CLAUDE.md           # This file - single source of truth
```

---

*"The best interface is no interface, but when you need one, make it invisible."*

*Every design decision must answer: Does this help patients get healthier faster?*

---

## BRAND IDENTITY

### Visual Principles
- **Minimalism**: Apple-inspired clean design
- **Trust**: Medical-grade professionalism
- **Warmth**: Approachable, not clinical
- **Clarity**: Every element has purpose

### Voice & Tone
- **Professional** but not intimidating
- **Confident** but not arrogant  
- **Clear** but not condescending
- **Helpful** but not pushy

### Target Patient
- Health-conscious individuals
- Busy professionals
- People seeking preventive care
- Patients wanting transparent healthcare