/**
 * cursorConfig.js
 * Central configuration for the LuxuryCursor system.
 * Customize values here to tune the cursor behaviour site-wide.
 */

export const CURSOR_CONFIG = {
  // ── Sizes ────────────────────────────────────────────────────────────────
  DOT_SIZE: 8,           // Inner precision dot (px)
  BUBBLE_SIZE: 56,       // Default liquid-glass bubble diameter (px)
  HOVER_SIZE: 80,        // Bubble size on interactive hover (px)
  PRODUCT_SIZE: 96,      // Bubble size on product image hover (px)
  TRAIL_COUNT: 5,        // Number of trail ghost bubbles

  // ── Physics ──────────────────────────────────────────────────────────────
  BUBBLE_LERP: 0.11,          // Normal following speed (0–1, lower = more lag)
  BUBBLE_LERP_CLICK: 0.45,    // Faster snap during click to stay concentric
  TRAIL_LERP_BASE: 0.22,      // Trail[0] following speed; each subsequent trail is slower

  // ── Stretch ──────────────────────────────────────────────────────────────
  SPEED_STRETCH_FACTOR: 0.18, // How much speed stretches the bubble shape
  SPEED_STRETCH_MAX: 0.35,    // Maximum stretch ratio
  SCROLL_STRETCH_FACTOR: 0.004,
  SCROLL_STRETCH_MAX: 0.28,

  // ── Idle ─────────────────────────────────────────────────────────────────
  IDLE_TIMEOUT_MS: 2200,      // ms of no movement before idle breathing starts

  // ── Hover Selectors ──────────────────────────────────────────────────────
  INTERACTIVE_SELECTORS: [
    'button',
    'a',
    'input',
    'textarea',
    'select',
    '[role="button"]',
    '.product-card',
    '.category-card',
    '.hero-button',
    '.shop-button',
    '.cta-button',
    '.nav-link',
    '.icon-button',
    '.luxury-btn',
    'label[for]',
  ].join(', '),

  PRODUCT_SELECTORS: [
    '.product-image',
    '.product-card img',
    '.category-card img',
    '[data-cursor="product"]',
  ].join(', '),

  MAGNETIC_SELECTORS: [
    'button',
    'a',
    '[role="button"]',
    '.hero-button',
    '.shop-button',
    '.cta-button',
    '.nav-link',
    '.luxury-btn',
  ].join(', '),

  // ── Magnetic ─────────────────────────────────────────────────────────────
  MAGNETIC_PULL: 0.20,   // How much element moves toward cursor (0–1)
  MAGNETIC_MAX: 9,       // Max pixel displacement of magnetic element
  MAGNETIC_LERP: 0.16,   // Smoothing of magnetic animation

  // ── Ripple ───────────────────────────────────────────────────────────────
  RIPPLE_DURATION_MS: 550,

  // ── Accessibility ────────────────────────────────────────────────────────
  MIN_DESKTOP_WIDTH: 1024,    // Disable below this viewport width
};
