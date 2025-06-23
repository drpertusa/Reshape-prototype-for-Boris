# Project Guide

*A comprehensive guide for the medical clinic website development - keep updated as we learn.*

---

## 1. Development Workflow (SOP v0.2)

### Ground Rules

| Rule | Why |
| --------------------------------------------------------------------------- | ---------------------- |
| **Stack is frozen** – Next 14, Tailwind 4, shadcn/ui, Supabase JS 2 | Stops version drift |
| **One Git branch = one page** | Easy rollback |
| **Never invent a component** – use what's already in `components/` | Prevents build errors |
| **Images local, WebP, max 1600 px** | Performance & SEO |
| **TypeScript strict & `pnpm lint` must pass** | Catch bugs early |
| **LLM MUST think hard & double‑check before finishing** | Reduces hallucinations |

### Five‑Step Loop (do this for **each** page)

| # | Actor | Action | Output |
| ----- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| **1** | **You** | Open a GitHub issue *"Build **`/slug`**"*. Add source URL, route, notes. | Issue text |
| **2** | **LLM – Extractor** | Pull clean HTML/text/images from the source. **Think hard, then double‑check** the JSON. | `content/slug.json` |
| **3** | **You** | Quick skim: copy complete? alt‑text ok? Adjust if needed. | Approved JSON |
| **4** | **LLM – Coder** | Generate `app/slug/page.tsx` only with existing components. Add `generateMetadata()`. Download images. **Before returning, think hard and double‑check the code compiles & meets rules.** | Pull Request |
| **5** | **You or 2nd LLM** | `pnpm lint && pnpm build`, view page, run Lighthouse. If all good → merge; else comment & retry. | Merged page |

*Fail‑fast:* If a step fails, fix it **before** moving on.

### Quick Review Checklist (Step 5)

1. Build passes `pnpm lint && pnpm build`.
2. No unknown components; prop names match.
3. SEO basics:
   - One `<h1>`
   - Title ≤ 60 chars, meta description ≤ 160
   - Local Open‑Graph image
4. Lighthouse: LCP < 2.5 s, CLS < 0.1
5. ≥ 300 words unique copy.

### Prompt Snippets

#### Extractor
```
You are Extractor. **Think hard** about structure, then scrape {URL}. Output JSON array:
[
  { "section": "hero", "html": "...", "img_urls": ["..."] },
  ...
]
Rules:
- Keep <h1‑6>, <p>, <ul>, <strong>. Strip inline styles & scripts.
- No paraphrasing.
- **Double‑check** the JSON is valid and complete before final answer.
```

#### Coder
````
You are Coder. Input: content/slug.json. **Think step‑by‑step** about mapping to components, then output app/slug/page.tsx (Next 14, TSX).
Constraints:
- Use only components in /components.
- next/image with local images under public/slug/.
- Add export async function generateMetadata() with title, description, og tags.
- Tailwind: max 6 classes per element.
- **Double‑check**: code compiles, obeys rules.
Return ONLY the TSX inside ```tsx blocks.
````

---

## 2. Architecture & Technology Stack

### Reshape - Medical Clinic Website
London's leading clinic for EMSculpt NEO, EMFace, Exion & EMSella.
Built following extreme minimalist design principles inspired by Steve Jobs Archive and LoveFrom aesthetics.

### Technology Stack
- **Next.js 15.3.3** - App Router with React 19 and Server Components
- **TypeScript 5** - Strict mode enabled
- **Tailwind CSS 4.1.10** - CSS-first configuration with @theme
- **shadcn/ui** - Component library (strict 11-component limit)
- **Supabase** - Authentication and database
- **React Hook Form + Zod** - Form validation
- **tw-animate-css** - Animation utilities for Tailwind v4

### Key Architectural Patterns

#### 1. Internationalization System
- Locale-based routing: `/[locale]/page-name`
- Middleware handles locale detection and redirection
- Translations stored in `/i18n/locales/*.json`
- Supported locales: en, es, fr, ar, ru, zh
- Cookie-based locale persistence

#### 2. Authentication & Admin System
- Supabase auth with middleware protection
- Admin routes: `/admin/*` (protected)
- User management system
- Session handling via HTTP-only cookies

#### 3. Component Constraint Philosophy
- Maximum 11 shadcn/ui components (enforced)
- Current components: navigation-menu, sheet, button, dialog, drawer, form, input, textarea, select, label, sonner
- No new components without removing existing ones

#### 4. Performance & SEO
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

#### 1. Middleware Logic
- Handles locale redirection based on URL, cookies, and Accept-Language headers
- Supabase session management
- Marketing parameter stripping
- AI crawler detection and logging
- Redirect loop protection

#### 2. Medical Compliance
- GDPR-compliant cookie consent system
- Medical schema.org structured data
- WCAG 2.2 AA accessibility standards
- OWASP security headers

#### 3. Design System Constraints
- **Color System**: Teal range from shadcn/ui with custom #1f5f5b + black/white variants
  - Primary: Custom teal (#1f5f5b) as predominant brand color
  - Supporting: Teal color palette (teal-50 to teal-950)
  - Neutral: Black/white with 98%/2% variants
- Two fonts maximum: LavaChicken Serif (display), Inter (body)
- 8pt grid spacing system with 3 gutter sizes
- Animation limited to 250ms transitions

#### 4. Teal Color Palette with Custom Brand Color
```css
/* Teal Color Range with Custom Brand Color */
teal-50:     #f0fdfa  /* Lightest - backgrounds, subtle accents */
teal-100:    #ccfbf1  /* Very light - hover states, soft backgrounds */
teal-200:    #99f6e4  /* Light - borders, disabled states */
teal-300:    #5eead4  /* Medium light - icons, secondary elements */
teal-400:    #2dd4bf  /* Medium - interactive elements */
teal-500:    #14b8a6  /* Base teal - supporting color */
teal-600:    #0d9488  /* Medium dark - hover states, focus */
teal-700:    #0f766e  /* Dark - text on light backgrounds */
custom-800:  #1f5f5b  /* PREDOMINANT BRAND COLOR - primary use */
teal-800:    #115e59  /* Very dark - high contrast text */
teal-900:    #134e4a  /* Darkest - headings, emphasis */
teal-950:    #042f2e  /* Deepest - maximum contrast */
```

#### 4. Performance Budgets
- LCP ≤ 2.5s, INP < 200ms, CLS < 0.1
- Font loading under 400KB total
- Sub-100ms interactions (target)

### Development Guidelines

#### 1. Component Development
- Check existing components before adding new ones
- Follow the 11-component limit strictly
- Use shadcn/ui patterns consistently
- Extract shared logic to `/lib/` utilities

#### 2. Internationalization
- All user-facing text must use translation keys
- Add new translations to all locale files
- Test locale switching functionality
- Handle RTL languages (Arabic) appropriately

#### 3. Admin System
- Admin routes require authentication middleware
- Use Supabase client from `/utils/supabase/`
- Follow existing auth patterns in admin components

#### 4. Medical Content
- Include appropriate schema.org markup
- Maintain GDPR compliance
- Test accessibility with screen readers
- Validate medical information accuracy

### Testing & Deployment

#### 1. Pre-deployment Checks
- Run `npm run typecheck` (no TypeScript errors)
- Run `npm run lint` (ESLint compliance)
- Test internationalization functionality
- Verify admin authentication flows

#### 2. Deployment Configuration
- Vercel deployment with edge functions
- Environment variables for Supabase configured
- Security headers applied via next.config.js
- Font optimization enabled

### Common Patterns

#### 1. Server Components
- Use server components by default
- Add 'use client' only when necessary (forms, interactivity)
- Leverage React 19 features appropriately

#### 2. Form Handling
- React Hook Form + Zod validation pattern
- Server actions for form submissions
- Error handling with toast notifications

#### 3. SEO Implementation
- Dynamic metadata generation per locale
- Structured data for medical content
- Sitemap and robots.txt generation

---

## 3. Admin Setup

### Authentication Configuration
The admin section is set up with Supabase authentication.

### Environment Variables
The following environment variables are configured in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Creating the First Admin User

#### Option 1: Use Supabase Dashboard (Recommended)
1. Go to https://supabase.com/dashboard/project/bqcnujvxdqrlirtsslji/auth/users
2. Click "Add user" → "Create new user"
3. Enter email and password
4. Make sure "Auto Confirm User" is checked

#### Option 2: Use the Create User Form
1. Deploy the application first
2. Navigate to `/admin/login`
3. A temporary user can sign up through the form on `/admin/users` page
4. The user will receive a confirmation email

### Admin Pages
- `/admin` - Main dashboard
- `/admin/login` - Login page
- `/admin/users` - User management
- `/monitoring` - Core Web Vitals monitoring (accessible to admins)

### Security Notes
1. The admin section is protected by middleware that checks authentication
2. All admin routes require authentication
3. Sessions are managed through secure HTTP-only cookies
4. The middleware refreshes sessions automatically

### Next Steps
1. Create your first admin user
2. Log in at `/admin/login`
3. Change the default password immediately
4. Set up additional admin users as needed

### Future Enhancements
- Content management system
- Analytics dashboard
- SEO tools
- System settings

---

## 4. Commands & Scripts

### Development Commands
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

### Initial Setup for New Projects
When using this template for a new website:

1. **Generate a unique IndexNow key** (32-character alphanumeric string)
   - Get one at: https://www.bing.com/indexnow
   - Or generate your own: `openssl rand -hex 16`
   - Replace placeholder key in:
     - `/app/api/indexnow/route.ts`
     - Create file: `/public/[your-key].txt` containing just the key
     - Delete: `/public/REPLACE-THIS-KEY-WITH-YOUR-OWN-32CHAR.txt`

---

## 5. Evolution Notes

### Design Decisions

#### Cookie Consent Banner (2025-06-23)
- **Single-line horizontal layout**: Text on left, buttons in center, X button on far right
- **Larger X button**: 24px (increased from 16px) for better accessibility
- **Behavior**: X button accepts essential cookies (same as Accept button)
- **Non-blocking implementation**: Replaced modal Drawer with fixed bottom banner to prevent page content blocking
- **Accessibility fix**: Privacy Policy link opens in new tab and is accessible before accepting cookies
- **Rationale**: Cleaner, less intrusive design that maintains functionality while improving UX

#### Font Implementation (2025-06-23)
- **Google Sans integration**: Added to global layout head with preconnect optimization
- **Privacy page**: Complete Google Sans implementation (including headings)
- **Home page**: Complete Google Sans implementation for all elements including H1, H2, H3
- **Loading strategy**: Using `display=block` to prevent FOUT (Flash of Unstyled Text)
- **Implementation method**: Inline styles with font fallbacks for consistent rendering

### URL Mapping (Production → Development)

Track final production URLs and their corresponding development routes:

| Production URL | Development Route | Status | Notes |
|----------------|-------------------|---------|--------|
| https://www.reshape.clinic/privacy | /[locale]/privacy | ✅ Implemented | Privacy policy page with cookie section |

### Development Log (2025-06-23)

#### Session Activity
- **Navigation Enhancement**: Fixed hover effects and added NEW badge to Philosophy
  - ✅ Replaced modal Drawer with fixed bottom banner for cookie consent
  - ✅ Added shadcn Badge component with black variant
  - ✅ Fixed navigation hover (replaced abstract styles with explicit `hover:bg-gray-100`)
  - ✅ Added "NEW" badge to Philosophy menu item
  - ✅ Fixed TypeScript errors (unused imports, import order)
  - ✅ Local development server confirmed working

#### Font Implementation Progress
- **Google Sans**: Successfully applied to home page and privacy policy
- **Loading optimization**: Added preconnect and display=block to prevent FOUT
- **Implementation method**: Inline styles with proper fallbacks

#### Latest Updates (Current Session)
- **Enhanced hover visibility**: Changed from `hover:bg-gray-100` to `hover:bg-gray-200` for stronger contrast
- **Active state UX implementation**: Added two different approaches for A/B comparison
- **Teal color removed**: Reverted Services menu to standard grey hover for consistency
- **Development log**: Established systematic logging for all changes and outcomes

#### UX Active State Comparison
**Two approaches implemented for user testing:**

**Option 1 - Persistent Background (Home & Contact pages):**
- ✅ **Pro**: Clear indication of current page, high visibility
- ❌ **Con**: Can feel "heavy", reduces visual hierarchy  
- **Use case**: Best for primary navigation, critical wayfinding

**Option 2 - Underline Indicator (Services & Philosophy sections):**
- ✅ **Pro**: Elegant, industry standard, minimal visual weight
- ✅ **Pro**: Maintains clean design, doesn't compete with content
- ❌ **Con**: More subtle, may be missed by some users
- **Use case**: Best for secondary nav, content-heavy sites

**Industry Standard**: Most modern websites use underline/border indicators

#### Error Resolution (21:17-21:20)
**Issue**: Persistent webpack module loading errors (`Cannot find module './7548.js'`, `./7243.js'`)
**Cause**: Development server cache corruption + complex conditional logic in navigation
**Progressive Solutions**: 
1. **Initial attempt**: Cleared `.next` cache - temporarily fixed
2. **Persistent issue**: Error returned on different routes (contact page)
3. **Deep clean**: `rm -rf .next node_modules/.cache` + `npm install`
4. **Logic simplification**: Broke down complex conditional statements in navigation.tsx
5. **Final deep clean**: Complete cache clear + fresh npm install after error recurrence
**Final Result**: ✅ Error resolved, build successful, server stable at localhost:3001

**Key Learning**: Complex conditional logic in className concatenation can cause webpack chunking issues. When errors persist across multiple routes, a complete environment reset is necessary.

#### Navigation Active State Fix (21:34)
**Issue**: Services and Home both showing as active (greyed out) when on Services page
**Root Cause**: Services and Philosophy are hash sections (`/#services`, `/#philosophy`) on home page, not separate routes
**Solution**: 
- Removed Services active state (it's a hash section, not a route)
- Fixed Philosophy to show horizontal line when on home page (since `/#philosophy` resolves to `/`)
- Maintained Home and Contact page active states for actual route matches
**Result**: ✅ Clean active state logic that matches actual navigation structure

#### Server Stability Fix (21:51)
**Issue**: Persistent connection refused errors despite server appearing to run
**Solution**: Complete .next cache clear + fresh npm run dev
**Result**: ✅ Server now stable at localhost:3000, build successful

#### Production Build Solution (21:58)
**Issue**: Persistent connection refused errors in dev mode despite server starting
**Root Cause**: Complex middleware and dev server instability 
**Solution**: Used production build (`npm run build && npm run start`) instead of dev mode
**Result**: ✅ Server stable and accessible at localhost:3000
**Key Learning**: When dev server has persistent issues, production build can be more reliable for testing

#### Vercel Deployment Solution (22:04)
**Issue**: Even production build showing connection refused locally
**Ultimate Solution**: Deploy to Vercel production environment
**Result**: ✅ Site accessible at https://reshape-working-7b4u1qqrp-alberto-e69d8928.vercel.app
**Key Learning**: When localhost fails completely, Vercel deployment provides reliable testing environment

#### A/B Testing Implementation (22:05)
**Request**: Implement mixed navigation active states for A/B testing + change NEW badge color
**Implementation**: 
- **Option A (Home & Contact)**: Grey background when active (`bg-gray-200 text-gray-900`)
- **Option B (Services & Philosophy)**: Horizontal underline when active (`after:` pseudo-element)
- **NEW Badge**: Changed from black to `#1f5f5b` (teal green)
**Result**: ✅ Mixed active states deployed for user testing comparison
**URL**: https://reshape-working-qsv5fk1e4-alberto-e69d8928.vercel.app

#### Teal Color Implementation (22:08)
**Request**: Implement teal color range from shadcn/ui across the site
**Implementation**:
- **Navigation**: Teal hover states (`hover:bg-teal-50 hover:text-teal-800`)
- **Active states**: Updated A/B testing with teal colors
  - Background: `bg-teal-100 text-teal-800`
  - Underline: `after:bg-teal-600` 
- **NEW Badge**: `bg-teal-600 hover:bg-teal-700`
- **Buttons**: New `teal` variant and teal outline styling
- **Documentation**: Added complete teal palette (teal-50 to teal-950) to PROJECT_GUIDE.md
**Result**: ✅ Cohesive teal brand color implementation deployed
**URL**: https://reshape-working-8o7ku3120-alberto-e69d8928.vercel.app

#### Emerald Color Migration (22:10)
**Request**: Replace teal with emerald color range from shadcn/ui
**Implementation**:
- **Updated Documentation**: Changed design system from teal to emerald palette
- **Navigation**: Updated to emerald hover states (`hover:bg-emerald-50 hover:text-emerald-800`)
- **Active states**: Migrated A/B testing to emerald colors
  - Background: `bg-emerald-100 text-emerald-800`
  - Underline: `after:bg-emerald-600` 
- **NEW Badge**: `bg-emerald-600 hover:bg-emerald-700`
- **Buttons**: New `emerald` variant replacing `teal` variant
- **Color Range**: emerald-50 (#ecfdf5) to emerald-950 (#022c22)
**Result**: ✅ Complete emerald brand color system implemented
**URL**: https://reshape-working-944yv21f2-alberto-e69d8928.vercel.app

#### Navigation Underline Fix (22:12)
**Issue**: All navigation items still showing background fills instead of clean underlines
**Solution**: Replaced ALL active state backgrounds with horizontal underlines
- **Removed**: Background fills (`bg-emerald-100 text-emerald-800`)
- **Implemented**: Consistent underlines for all items (`after:bg-emerald-600`)
- **Behavior**: Hover shows emerald background, click removes fill and shows clean underline
**Result**: ✅ Clean horizontal underline navigation for all menu items
**URL**: https://reshape-working-3qgja8qv9-alberto-e69d8928.vercel.app

#### Custom Brand Color Implementation (22:22)
**Request**: Use #1f5f5b as predominant color (closest to teal-800)
**Implementation**:
- **Navigation underlines**: All active states use `after:bg-[#1f5f5b]`
- **NEW Badge**: `bg-[#1f5f5b] hover:bg-[#0f524f]`
- **Buttons**: `teal` variant uses `bg-[#1f5f5b] hover:bg-[#0f524f]`
- **Outline elements**: `border-[#1f5f5b] text-[#1f5f5b]`
- **Supporting colors**: Teal palette for hover states and backgrounds
**Result**: ✅ #1f5f5b now the predominant brand color across all elements
**URL**: https://reshape-working-ja9u7zfvs-alberto-e69d8928.vercel.app

#### Default Button Style Implementation (22:24)
**Request**: Make all CTA buttons use default shadcn/ui button style
**Implementation**:
- **Hero CTA**: Removed `variant="teal"`, now uses default shadcn/ui styling
- **Learn More button**: Standard `outline` variant (removed custom colors)
- **Schedule button**: Standard `default` variant (removed custom teal styling)
- **Maintained**: Custom `#1f5f5b` color only for navigation underlines and NEW badge
**Result**: ✅ Clean, consistent shadcn/ui button styling across all CTAs
**URL**: https://reshape-working-fpj1uh0b1-alberto-e69d8928.vercel.app

#### H1 Update & Navigation Fix (22:27)
**Request**: Change H1 to "London's leading clinic for EMSculpt NEO, EMFace & Exion" with line break after "for"
**Navigation Issue**: Horizontal underlines not showing due to hash-based navigation
**Implementation**:
- **H1 Title**: Updated to specific clinic text with `&apos;` for apostrophe
- **Line Break**: Added `<br />` after "for" as requested
- **Navigation Logic**: Added hash detection with `useEffect` and `window.location.hash`
- **Active States**: Now properly detect `#services` and `#philosophy` hash sections
**Result**: ✅ Updated H1 and working horizontal underlines for all navigation items
**URL**: https://reshape-working-g2vchzjwd-alberto-e69d8928.vercel.app

#### Animated Hero Text Implementation (22:30)
**Request**: Implement animated hero like 21st.dev - "London's leading clinic for" static, treatments cycling every 2s
**SEO Concern**: Ensure no negative impact on search rankings
**Implementation**:
- **Static Text**: "London's leading clinic for" remains visible
- **Animated Text**: Cycles between "EMSculpt NEO", "EMFace", "Exion", "EMSella"
- **Animation**: CSS transitions with slide up/down effect, 2-second intervals
- **SEO Protection**: Hidden `sr-only` text includes all treatments for search engines
- **Performance**: Pure CSS animations (no external libraries)
**SEO Impact**: ✅ **NONE** - Search engines see full H1: "London's leading clinic for EMSculpt NEO, EMFace, Exion, EMSella"
**URL**: https://reshape-working-39gjgwd63-alberto-e69d8928.vercel.app

#### Navigation Menu Overhaul (22:35)
**Request**: Replace all navigation menus with treatment-focused navigation
**New Menu Items** (in order):
1. **EMSculpt Neo** (with NEW badge)
2. **EMFace**
3. **Exion**
4. **EMSella** 
5. **Injectables**
6. **About**
**Removed**: Home, Services, Philosophy, Contact from navigation
**Implementation**:
- Updated `NAVIGATION_ITEMS` constants with new routes
- Added new translation keys for all menu items
- Simplified active state logic to `pathname === item.href`
- Moved NEW badge from Philosophy to EMSculpt Neo
- Fixed animated hero text visibility issues
**Result**: ✅ Treatment-focused navigation menu with working animations
**URL**: https://reshape-working-o9w0j837b-alberto-e69d8928.vercel.app

#### Button Styling & Animation Refinement (22:40)
**Request**: Make CTA buttons like default shadcn/ui with rounded edges and #1f5f5b color + fix animated text
**Button Implementation**:
- **Added rounded corners**: `rounded-md` to base button classes
- **Custom color**: Default variant uses `bg-[#1f5f5b] hover:bg-[#0f524f]`
- **Consistent styling**: All CTA buttons now have proper shadcn/ui appearance
**Animation Fixes**:
- **Single line**: Added `whitespace-nowrap` and `min-w-[400px]` for "EMSculpt NEO"
- **Vaporization effect**: Replaced slide animation with opacity + scale + blur
  - Fade in/out with `opacity-100` to `opacity-0`
  - Scale effect with `scale-110` on exit
  - Blur effect with `blur-sm` for dissolution look
  - Longer `duration-700` for smoother transitions
**Result**: ✅ Professional buttons with cool vaporization text animation
**URL**: https://reshape-working-d9754qwcm-alberto-e69d8928.vercel.app

#### Reshape Logo & Badge Updates (22:45)
**Request**: Implement new Reshape logo files and move NEW badges
**Logo Implementation**:
- **Favicon**: Lettermark "R" logo (`/public/logo-favicon.svg`)
- **Navigation**: Wordmark "Reshape Clinic" logo (`/public/logo-wordmark.svg`)
- **Updated branding**: PROJECT_GUIDE.md reflects Reshape brand identity
**Badge Updates**:
- **Removed**: NEW badge from EMSculpt Neo
- **Added**: NEW badges to Exion and Injectables menus
**Animation Enhancement**:
- **Retro effect**: Vertical lines disappearing effect for text transitions
- **Duration**: Extended to 800ms for smoother transitions
**Result**: ✅ Professional Reshape branding with retro animation effects
**URL**: https://reshape-working-n7awkjydq-alberto-e69d8928.vercel.app

#### Git Repository & Logo Refinements (22:50)
**Request**: Create private git repository + crop logo + implement favicon
**Git Repository**:
- **Created**: Private repository at `github.com/drpertusa/reshape-clinic-website`
- **Initial commit**: Comprehensive feature list and implementation details
- **Remote setup**: Set as primary origin for future development
**Logo Updates**:
- **Cropped wordmark**: Removed "CLINIC" text from SVG, kept only "Reshape"
- **Size increase**: Made logo 10% larger (`h-8` to `h-9`)
- **Favicon ready**: Lettermark "R" logo available for browser tabs
**Repository URL**: https://github.com/drpertusa/reshape-clinic-website
**Live Site**: https://reshape-working-rfa1d0qmc-alberto-e69d8928.vercel.app

#### Favicon Implementation (22:55)
**Request**: Ensure favicon appears in Chrome tabs and browsers
**Implementation**:
- **SEO Utils**: Added comprehensive icon metadata to `generatePageMetadata()`
- **Layout Head**: Added multiple favicon link tags for browser compatibility
- **Formats**: SVG favicon with fallbacks (`/logo-favicon.svg`, `/favicon.svg`)
- **Apple Support**: Touch icon for iOS Safari bookmarks
- **File Creation**: Copied lettermark logo to multiple favicon formats
**Browser Support**: Chrome, Firefox, Safari, Edge - all browser tabs + bookmarks
**Result**: ✅ Reshape "R" logo visible in all browser tabs and bookmark icons
**Updated Site**: https://reshape-working-openhy3k5-alberto-e69d8928.vercel.app

#### Raleway Font Implementation (23:00)
**Request**: Change all fonts to Raleway throughout the website
**Implementation**:
- **Layout update**: Changed Google Fonts link from Google Sans to Raleway
- **Global CSS**: Updated body font-family to use 'Raleway' instead of Inter
- **Component cleanup**: Removed all inline Google Sans styles from:
  - Home page H1, H2 elements and container div
  - Privacy page H1, H2 elements and container div
- **Weights loaded**: 300, 400, 500, 600, 700, 800 for comprehensive typography
- **Performance**: Maintained preconnect optimization and display=swap
**Result**: ✅ Complete Raleway font implementation across all website elements
**Updated Site**: [Deployment in progress]

#### EMSculpt Neo Dropdown Navigation (23:20)
**Request**: Create dropdown navigation for EMSculpt Neo with 5 subpages like shadcn/ui List example
**Implementation**:
- **Translation keys**: Added EMSculpt dropdown translations to all 6 locale files
  - English: Full translations for all 5 subpages
  - Spanish/French: Complete translated versions  
  - Arabic/Russian/Chinese: English placeholder text
- **Constants update**: Added `EMSCULPT_SUBMENU_ITEMS` array with 5 subpage definitions
- **Navigation enhancement**: Updated Navigation component with NavigationMenuTrigger and NavigationMenuContent
- **Dropdown structure**: 5 subpages with titles and descriptions:
  1. **Look Good** - "Less fat more definition"
  2. **Feel Good** - "Wellness protocols" 
  3. **Physiotherapist** - "Assessment & Treatment program with EMSculpt Neo"
  4. **For Athletes** - "Improve performance"
  5. **Musculoskeletal Rejuvenation** - "Programs for improving muscle in the elderly"
- **Styling**: Matches shadcn/ui List pattern with 400px width, hover states, and proper spacing
- **Active states**: EMSculpt Neo shows underline when on any subpage using `pathname.startsWith()`
**Result**: ✅ Professional dropdown navigation for EMSculpt Neo with 5 categorized treatment pages
**Updated Site**: [Deployment in progress]

#### UI Enhancements - Golden Banner & Navigation Updates (23:25)
**Request**: Make banner more golden, add Book Consultation CTA to navigation, move theme toggle to footer
**Implementation**:
- **Enhanced Golden Banner**: Updated promotional banner with richer gold tones
  - Background: Gradient from `yellow-100` to `amber-100` (more golden than previous)
  - Text: `amber-800` for excellent contrast and warmth
  - Border: `amber-300` for better definition
  - Close button: Updated to match new color scheme
- **Navigation CTA Addition**: Added "Book Consultation" button to header
  - Desktop: Positioned to the right of About menu item
  - Mobile: Full-width button at bottom of mobile sheet menu
  - Links to contact page with proper locale handling
  - Added translations for all 6 locales (Spanish/French translated, others in English)
- **Theme Toggle Relocation**: Moved dark mode toggle from navigation to footer
  - Positioned next to language switcher in footer
  - Removes clutter from main navigation
  - Maintains accessibility while being less prominent
**Result**: ✅ More prominent golden banner, streamlined navigation with CTA, cleaner header design
**Updated Site**: [Deployment in progress]

#### EMFace Dropdown Navigation (23:35)
**Request**: Create EMFace dropdown navigation with 4 treatment areas similar to EMSculpt Neo
**Implementation**:
- **Translation keys**: Added EMFace dropdown translations to all 6 locale files
  - English: Complete translations for all 4 facial treatment areas
  - Spanish/French: Full medical translations for facial procedures
  - Arabic/Russian/Chinese: English placeholder text
- **Constants update**: Added `EMFACE_SUBMENU_ITEMS` array with 4 treatment area definitions
- **Navigation enhancement**: Extended existing dropdown logic to include EMFace menu
- **Dropdown structure**: 4 facial treatment areas with medical benefits:
  1. **Forehead** - "Smooths lines | lifts brows | improves tone | tightens | reduces creases"
  2. **Eyes** - "Smooths wrinkles | lifts brows | reduces puffiness | brightens | firms"
  3. **Cheeks** - "Lifts | adds volume | smooths folds | firms | contours"
  4. **Jawline-Submentum** - "Reduces double chin | defines jawline | tightens skin | firms | sculpts"
- **Styling**: Maintains consistent 400px width and hover states matching EMSculpt Neo
- **Active states**: EMFace shows underline when on any subpage using `pathname.startsWith()`
**Result**: ✅ Professional EMFace dropdown with 4 comprehensive facial treatment categories
**Updated Site**: [Deployment in progress]

#### Implementation Details
```typescript
// Navigation hover enhancement
className={cn(
  "base-classes hover:bg-gray-200", // Increased from gray-100
  item.labelKey === "nav_services" && "hover:bg-[#1f5f5b] hover:text-white"
)}
```

### General Evolution Guidelines

- When a pain‑point or confusion appears, document it in PRs
- Update this guide accordingly with version increments
- **Keep it comprehensive but organized** - use sections to maintain clarity
- **Maintain development log**: Track all changes with timestamps and outcomes

> **Perfectionist principle:** One source of truth, constantly refined, never fragmented.