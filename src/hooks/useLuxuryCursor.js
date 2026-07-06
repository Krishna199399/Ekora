/**
 * useLuxuryCursor.js
 * Central state hook for the luxury cursor system.
 *
 * All values are stored in refs to prevent React re-renders on every
 * mouse move. The animation loop reads these refs directly at 60 FPS.
 */

import { useEffect, useRef } from 'react';
import { clamp } from '../utils/cursorMath';
import { CURSOR_CONFIG as CFG } from '../utils/cursorConfig';

export const useLuxuryCursor = () => {
  // ── Mouse position ────────────────────────────────────────────────────────
  const mouse = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);

  // ── Interaction state ─────────────────────────────────────────────────────
  const isMouseDown = useRef(false);

  // ── Hover classification ──────────────────────────────────────────────────
  // 'none' | 'interactive' | 'product'
  const hoverType = useRef('none');

  // ── Scroll state ──────────────────────────────────────────────────────────
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);

  // ── Magnetic fields ───────────────────────────────────────────────────────
  const activeMagnetic = useRef(null);        // currently magnetised element
  const releasingMagnetic = useRef(null);     // element snapping back after leave
  const magneticOffset = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const releasingOffset = useRef({ currentX: 0, currentY: 0 });

  // ── Idle detection ────────────────────────────────────────────────────────
  const isIdle = useRef(false);
  const idleTimer = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    lastScrollY.current = window.scrollY;

    // ── mousemove ────────────────────────────────────────────────────────────
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      isVisible.current = true;

      // Reset idle state
      isIdle.current = false;
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        isIdle.current = true;
      }, CFG.IDLE_TIMEOUT_MS);

      // Update magnetic attraction offset for active element
      if (activeMagnetic.current && document.body.contains(activeMagnetic.current)) {
        const rect = activeMagnetic.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        magneticOffset.current.targetX = clamp((e.clientX - cx) * CFG.MAGNETIC_PULL, -CFG.MAGNETIC_MAX, CFG.MAGNETIC_MAX);
        magneticOffset.current.targetY = clamp((e.clientY - cy) * CFG.MAGNETIC_PULL, -CFG.MAGNETIC_MAX, CFG.MAGNETIC_MAX);
      }
    };

    // ── mouse leave / enter window ───────────────────────────────────────────
    const onMouseLeave = () => {
      isVisible.current = false;
      isMouseDown.current = false;
    };

    const onMouseEnter = (e) => {
      isVisible.current = true;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // ── click state ──────────────────────────────────────────────────────────
    const onMouseDown = () => { isMouseDown.current = true; };
    const onMouseUp   = () => { isMouseDown.current = false; };

    // ── scroll ───────────────────────────────────────────────────────────────
    const onScroll = () => {
      const sy = window.scrollY;
      scrollVelocity.current = clamp(sy - lastScrollY.current, -80, 80);
      lastScrollY.current = sy;
    };

    // ── hover detection (event delegation) ───────────────────────────────────
    const onMouseOver = (e) => {
      const t = e.target;
      if (!t) return;

      // Product hover takes priority
      if (t.closest(CFG.PRODUCT_SELECTORS)) {
        hoverType.current = 'product';
        return;
      }

      // Interactive hover
      const interactive = t.closest(CFG.INTERACTIVE_SELECTORS);
      if (interactive) {
        hoverType.current = 'interactive';

        // Set up magnetic pull on eligible elements
        const isMagnetic = t.closest(CFG.MAGNETIC_SELECTORS);
        if (isMagnetic) {
          if (activeMagnetic.current && activeMagnetic.current !== isMagnetic) {
            // Transition old magnetic to releasing queue
            releasingMagnetic.current = activeMagnetic.current;
            releasingOffset.current.currentX = magneticOffset.current.currentX;
            releasingOffset.current.currentY = magneticOffset.current.currentY;
          }
          activeMagnetic.current = isMagnetic;
          magneticOffset.current.targetX = 0;
          magneticOffset.current.targetY = 0;
        }
        return;
      }

      hoverType.current = 'none';
    };

    const onMouseOut = (e) => {
      const t = e.target;
      if (!t) return;

      // Release magnetic element
      if (activeMagnetic.current && !t.closest(CFG.MAGNETIC_SELECTORS)) {
        releasingMagnetic.current = activeMagnetic.current;
        releasingOffset.current.currentX = magneticOffset.current.currentX;
        releasingOffset.current.currentY = magneticOffset.current.currentY;
        activeMagnetic.current = null;
        magneticOffset.current.targetX = 0;
        magneticOffset.current.targetY = 0;
      }

      if (!t.closest(CFG.INTERACTIVE_SELECTORS) && !t.closest(CFG.PRODUCT_SELECTORS)) {
        hoverType.current = 'none';
      }
    };

    // ── attach listeners ──────────────────────────────────────────────────────
    window.addEventListener('mousemove',  onMouseMove,  { passive: true });
    window.addEventListener('mousedown',  onMouseDown,  { passive: true });
    window.addEventListener('mouseup',    onMouseUp,    { passive: true });
    window.addEventListener('scroll',     onScroll,     { passive: true });
    document.addEventListener('mouseleave',  onMouseLeave);
    document.addEventListener('mouseenter',  onMouseEnter);
    document.addEventListener('mouseover',   onMouseOver);
    document.addEventListener('mouseout',    onMouseOut);

    return () => {
      clearTimeout(idleTimer.current);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mousedown',  onMouseDown);
      window.removeEventListener('mouseup',    onMouseUp);
      window.removeEventListener('scroll',     onScroll);
      document.removeEventListener('mouseleave',  onMouseLeave);
      document.removeEventListener('mouseenter',  onMouseEnter);
      document.removeEventListener('mouseover',   onMouseOver);
      document.removeEventListener('mouseout',    onMouseOut);
    };
  }, []);

  return {
    mouse,
    isVisible,
    isMouseDown,
    hoverType,
    scrollVelocity,
    activeMagnetic,
    releasingMagnetic,
    magneticOffset,
    releasingOffset,
    isIdle,
  };
};
