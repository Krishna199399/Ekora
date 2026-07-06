/**
 * Helper utilities for the Luxury Custom Cursor
 */

/**
 * Linear interpolation between two values
 * @param {number} start
 * @param {number} end
 * @param {number} amt - interpolation factor (0 to 1)
 */
export const lerp = (start, end, amt) => {
  return (1 - amt) * start + amt * end;
};

/**
 * Clamp a value between a min and max limit
 * @param {number} val
 * @param {number} min
 * @param {number} max
 */
export const clamp = (val, min, max) => {
  return Math.min(Math.max(val, min), max);
};

/**
 * Calculate the Euclidean distance between two points
 */
export const getDistance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculate the angle between two points in radians
 */
export const getAngle = (x1, y1, x2, y2) => {
  return Math.atan2(y2 - y1, x2 - x1);
};

/**
 * Check if the browser is running on a touch-enabled or mobile-sized device
 */
export const isMobileOrTouch = () => {
  if (typeof window === 'undefined') return true; // SSR safe default

  const hasTouchScreen =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0);

  const isSmallScreen = window.innerWidth < 1024;

  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  return hasTouchScreen || isSmallScreen || isMobileUA;
};

/**
 * Check if the user has requested reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
