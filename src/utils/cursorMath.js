/**
 * cursorMath.js
 * Pure math utility functions for the cursor physics engine.
 */

/** Linear interpolation */
export const lerp = (a, b, t) => a + (b - a) * t;

/** Clamp value between min and max */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/** Euclidean distance between two points */
export const distance = (x1, y1, x2, y2) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

/** Angle in radians from point A to point B */
export const angle = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);

/** Map a value from one range to another */
export const mapRange = (val, inMin, inMax, outMin, outMax) =>
  outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);

/** Check if device supports hover (non-touch) */
export const supportsHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Check if user prefers reduced motion */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Check if viewport is wide enough for desktop cursor */
export const isDesktopViewport = (minWidth = 1024) =>
  typeof window !== 'undefined' && window.innerWidth >= minWidth;

/**
 * Spring simulation — 1D Hooke's law spring.
 * Produces organic, physically-based easing.
 */
export class Spring {
  constructor(value = 0, stiffness = 0.1, damping = 0.75) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
  }

  update(target) {
    if (target !== undefined) this.target = target;
    const force = (this.target - this.value) * this.stiffness;
    this.velocity = (this.velocity + force) * this.damping;
    this.value += this.velocity;
    return this.value;
  }

  snapTo(val) {
    this.value = val;
    this.target = val;
    this.velocity = 0;
  }
}

/**
 * Velocity tracker — computes px/ms speed & direction vector.
 */
export class VelocityTracker {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.speed = 0;
    this.lastTime = 0;
  }

  update(x, y) {
    const now = performance.now();
    const dt = clamp(now - this.lastTime, 1, 50); // prevent spikes
    this.lastTime = now;
    this.vx = (x - this.x) / dt;
    this.vy = (y - this.y) / dt;
    this.x = x;
    this.y = y;
    this.speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
    return { vx: this.vx, vy: this.vy, speed: this.speed };
  }
}
