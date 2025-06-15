# Steve Jobs Archive-Inspired Animations Implementation

## Analysis Summary

Based on the Steve Jobs Archive website analysis, we've implemented the following design patterns:

### 1. **Link Hover Effect**
- **Animation**: Underline that animates from left to right (width: 0 → 100%)
- **Timing**: 250ms with `ease` function
- **Implementation**: Applied to all `<a>` tags in `globals.css`
- **Special case**: Navigation links use dot indicator (maintaining LoveFrom aesthetic)

### 2. **Navigation Behavior**
- **Desktop**: Subtle opacity change on hover (0.85)
- **Mobile**: Sheet slides in from right with 250ms duration
- **Focus states**: Dotted outline for accessibility

### 3. **Timing & Easing**
- **Universal timing**: 250ms (Steve Jobs Archive standard)
- **Easing function**: `ease` (default cubic-bezier)
- **Consistency**: Applied across all interactive elements

### 4. **Button Interactions**
- **Hover**: Subtle opacity change or background color shift
- **Active**: Scale down to 0.98 (tactile feedback)
- **Transition**: All properties with 250ms ease

### 5. **Page Load/Scroll**
- **Smooth scrolling**: Native CSS `scroll-behavior: smooth`
- **Scroll padding**: Accounts for fixed header
- **Fade-in animation**: 600ms for initial page loads

## Implementation Details

### Global CSS (`/app/globals.css`)
```css
/* Link underline animation */
a::after {
  content: '';
  width: 0;
  height: 1px;
  opacity: 0;
  transition: all 250ms ease;
}

a:hover::after {
  width: 100%;
  opacity: 1;
}

/* Navigation dot indicator */
nav a::after {
  content: '·';
  /* Dot animation */
}

/* Utility classes */
.hover-opacity { transition: opacity 250ms ease; }
.hover-scale { transition: transform 250ms ease; }
.transition-colors-250 { transition: all color properties 250ms ease; }
```

### Component Updates
1. **Button**: Added `active:scale-[0.98]` and 250ms transitions
2. **Sheet**: Updated to 250ms duration for open/close
3. **Dialog**: Updated to 250ms duration for all animations
4. **NavigationMenu**: Removed rounded corners, added opacity hover

## Design Principles Applied

1. **Subtlety**: Animations are barely noticeable but felt
2. **Consistency**: 250ms timing across all interactions
3. **Purpose**: Every animation has clear intent (feedback, guidance)
4. **Performance**: Using CSS transforms and opacity only
5. **Accessibility**: Respecting `prefers-reduced-motion`, clear focus states

## Usage Guidelines

1. **Links**: Automatically get underline animation (except navigation)
2. **Buttons**: Use default Button component for consistent interactions
3. **Modals/Sheets**: Use Sheet/Dialog components with built-in animations
4. **Custom animations**: Stick to 250ms ease timing for consistency

## Color Analysis

The Steve Jobs Archive uses:
- **Text**: High contrast black/dark gray
- **Background**: Clean white/off-white
- **Interactions**: Subtle opacity changes, no color shifts
- **Focus**: Dotted outlines for accessibility

This aligns perfectly with your minimalist medical clinic aesthetic.