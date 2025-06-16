/**
 * Progressive fallback for scrollbar-gutter CSS property
 * Only executes on browsers that don't support scrollbar-gutter (Safari ≤17)
 */
export function applyScrollbarPadding(open: boolean) {
  // Modern browsers with scrollbar-gutter support - do nothing
  if (CSS.supports('scrollbar-gutter: stable')) return;

  // Calculate scrollbar width
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  
  // Apply or remove padding to compensate for scrollbar
  document.documentElement.style.paddingRight = open ? `${scrollbarWidth}px` : '';
}