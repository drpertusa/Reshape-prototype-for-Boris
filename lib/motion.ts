/**
 * Motion configuration and common animation variants
 * Following minimalist design philosophy - only essential animations
 */

import { Variants } from "framer-motion"

// Subtle, purposeful animations only
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const slideIn: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

// Clinic-specific animations
export const cardHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
}

// Common transition settings
export const transitions = {
  default: { duration: 0.3 },
  quick: { duration: 0.15 },
  gentle: { duration: 0.5 }
}

// Page transition variants
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: transitions.default
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: transitions.quick
  }
}