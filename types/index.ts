/**
 * Type definitions for the application
 */

// Navigation
export interface NavigationItem {
  href: string
  label: string
}

// Services
export interface Service {
  title: string
  description: string
}

// Site Configuration
export interface SiteConfig {
  name: string
  tagline: string
  description: string
  domain: string
  email: string
  phone: string
  address: Address
}

export interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

// Form Types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

// API Response Types (for future use)
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Error Types
export interface ApiError {
  code: string
  message: string
  field?: string
}

// Layout Props
export interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  containerSize?: "sm" | "md" | "lg" | "xl" | "full"
  id?: string
  variant?: "default" | "muted" | "transparent"
}

export interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
}