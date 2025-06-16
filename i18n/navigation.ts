import { usePathname as useNextPathname } from 'next/navigation';
import { locales } from './config';

// Get pathname without locale prefix
export function usePathname() {
  const pathname = useNextPathname();
  
  // Remove locale prefix if present
  const segments = pathname.split('/');
  if (segments[1] && locales.includes(segments[1] as any)) {
    segments.splice(1, 1);
    return segments.join('/') || '/';
  }
  
  return pathname;
}

// Create locale-aware href
export function createLocalizedHref(href: string, locale: string): string {
  // Handle root path
  if (href === '/') {
    return `/${locale}`;
  }
  
  // Handle hash links (for same-page navigation)
  if (href.startsWith('/#')) {
    return `/${locale}${href}`;
  }
  
  // Handle other paths
  return `/${locale}${href}`;
}