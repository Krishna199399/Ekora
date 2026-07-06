'use client';

/**
 * LuxuryCursor.jsx
 * Ultra-premium liquid-glass bubble cursor system.
 *
 * Architecture:
 *  - useLuxuryCursor hook tracks all state via refs (zero re-renders)
 *  - Single requestAnimationFrame loop drives all animation
 *  - Position: fixed on each element (no container overflow artifacts)
 *  - mix-blend-mode: difference only on the 8px precision dot
 *  - LERP for smooth bubble follow; instant dot tracking
 *  - All offsets & stretches disabled during mousedown to prevent drift
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLuxuryCursor } from '../../hooks/useLuxuryCursor';
import {
  lerp,
  clamp,
  VelocityTracker,
  supportsHover,
  prefersReducedMotion,
  isDesktopViewport,
} from '../../utils/cursorMath';
import { CURSOR_CONFIG as CFG } from '../../utils/cursorConfig';
import './LuxuryCursor.css';

/* ─────────────────────────────────────────────────────────────────────────── */

const LuxuryCursor = ({
  bubbleSize    = CFG.BUBBLE_SIZE,
  dotSize       = CFG.DOT_SIZE,
  trail         = true,
  ripple        = true,
  glowSize      = 140,
}) => {
  // ── Activation ──────────────────────────────────────────────────────────
  const [isActive, setIsActive] = useState(false);

  // ── Cursor state from hook ───────────────────────────────────────────────
  const state = useLuxuryCursor();

  // ── DOM refs ─────────────────────────────────────────────────────────────
  const dotRef     = useRef(null);
  const bubbleRef  = useRef(null);
  const glowRef    = useRef(null);
  const trailRefs  = useRef([]);
  const rafId      = useRef(null);

  // ── Animation state ──────────────────────────────────────────────────────
  const tabVisible  = useRef(true);
  const bubblePos   = useRef({ x: -200, y: -200 });   // current bubble position
  const glowPos     = useRef({ x: -200, y: -200 });
  const trailPos    = useRef(
    Array.from({ length: CFG.TRAIL_COUNT }, () => ({ x: -200, y: -200 }))
  );
  const velocity    = useRef(new VelocityTracker());
  const prevDown    = useRef(false);  // detects mousedown leading-edge for instant snap
  const entered     = useRef(false);                    // entrance animation guard

  // ── Ripple pool ──────────────────────────────────────────────────────────
  const rippleContainer = useRef(null);

  // ── Activation check ─────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => {
      const ok =
        supportsHover() &&
        !prefersReducedMotion() &&
        isDesktopViewport(CFG.MIN_DESKTOP_WIDTH);
      setIsActive(ok);
      document.body.classList.toggle('lc-active', ok);
    };
    check();
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('resize', check);
      document.body.classList.remove('lc-active');
    };
  }, []);

  // ── Tab visibility ────────────────────────────────────────────────────────
  useEffect(() => {
    const h = () => { tabVisible.current = document.visibilityState === 'visible'; };
    document.addEventListener('visibilitychange', h);
    return () => document.removeEventListener('visibilitychange', h);
  }, []);

  // ── Ripple helper ─────────────────────────────────────────────────────────
  const fireRipple = useCallback((x, y) => {
    if (!ripple) return;
    const el = document.createElement('div');
    el.className = 'lc-ripple';
    el.style.left = `${x}px`;
    el.style.top  = `${y}px`;
    el.style.width  = `${bubbleSize}px`;
    el.style.height = `${bubbleSize}px`;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }, [ripple, bubbleSize]);

  useEffect(() => {
    if (!isActive || !ripple) return;
    const handler = (e) => fireRipple(e.clientX, e.clientY);
    window.addEventListener('mousedown', handler, { passive: true });
    return () => window.removeEventListener('mousedown', handler);
  }, [isActive, ripple, fireRipple]);

  // ── Main animation loop ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isActive) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      return;
    }

    const tick = () => {
      if (!tabVisible.current) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const {
        mouse, isVisible, isMouseDown, hoverType,
        activeMagnetic, releasingMagnetic,
        magneticOffset, releasingOffset,
        scrollVelocity, isIdle,
      } = state;

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const down = isMouseDown.current;
      const hover = hoverType.current;   // 'none' | 'interactive' | 'product'
      const visible = isVisible.current;

      // ── Dot: instant tracking, always at exact cursor position ─────────
      if (dotRef.current) {
        if (!entered.current && visible) {
          // One-time entrance
          entered.current = true;
          bubblePos.current = { x: mx, y: my };
          glowPos.current   = { x: mx, y: my };
          trailPos.current.forEach(p => { p.x = mx; p.y = my; });
          bubbleRef.current?.classList.add('is-entering');
          setTimeout(() => bubbleRef.current?.classList.remove('is-entering'), 600);
        }

        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

        // Dot classes
        const dotClasses = ['lc-dot'];
        if (!visible)          dotClasses.push('is-hidden');
        if (hover !== 'none')  dotClasses.push('is-hovering');
        dotRef.current.className = dotClasses.join(' ');
      }

      // ── Velocity (for stretch, not used for position offset during click) ─
      const vel = velocity.current.update(mx, my);

      // ── Bubble position ─────────────────────────────────────────────────
      // On the FIRST frame of mousedown (leading edge): instantly snap the
      // bubble to the cursor so there is zero visible gap when clicking.
      // After that, use a fast LERP so it stays locked during the press.
      const justPressed = down && !prevDown.current;
      if (justPressed) {
        // Hard snap — eliminates any accumulated LERP lag immediately
        bubblePos.current.x = mx;
        bubblePos.current.y = my;
        // Also reset trail so it doesn't ghost-drift from old position
        trailPos.current.forEach(p => { p.x = mx; p.y = my; });
      } else {
        const lerpFactor = down ? 0.55 : CFG.BUBBLE_LERP;
        bubblePos.current.x = lerp(bubblePos.current.x, mx, lerpFactor);
        bubblePos.current.y = lerp(bubblePos.current.y, my, lerpFactor);
      }
      prevDown.current = down;

      // ── Magnetic: animate element, NOT the cursor position ───────────────
      if (activeMagnetic.current && document.body.contains(activeMagnetic.current)) {
        const mo = magneticOffset.current;
        mo.currentX = lerp(mo.currentX, mo.targetX, CFG.MAGNETIC_LERP);
        mo.currentY = lerp(mo.currentY, mo.targetY, CFG.MAGNETIC_LERP);
        activeMagnetic.current.style.transform =
          `translate3d(${mo.currentX}px, ${mo.currentY}px, 0)`;
      } else if (activeMagnetic.current && !document.body.contains(activeMagnetic.current)) {
        activeMagnetic.current = null;
      }

      if (releasingMagnetic.current) {
        if (!document.body.contains(releasingMagnetic.current)) {
          releasingMagnetic.current = null;
        } else {
          const ro = releasingOffset.current;
          ro.currentX = lerp(ro.currentX, 0, CFG.MAGNETIC_LERP);
          ro.currentY = lerp(ro.currentY, 0, CFG.MAGNETIC_LERP);
          releasingMagnetic.current.style.transform =
            `translate3d(${ro.currentX}px, ${ro.currentY}px, 0)`;
          if (Math.abs(ro.currentX) < 0.05 && Math.abs(ro.currentY) < 0.05) {
            releasingMagnetic.current.style.transform = '';
            releasingMagnetic.current = null;
          }
        }
      }

      // ── Bubble stretch (only during free movement, never on click) ────────
      let scaleX = 1;
      let scaleY = 1;
      let rotation = 0;

      if (!down && hover === 'none') {
        const speed = vel.speed;
        const stretch = clamp(speed * CFG.SPEED_STRETCH_FACTOR, 0, CFG.SPEED_STRETCH_MAX);
        if (stretch > 0.01) {
          rotation = Math.atan2(vel.vy, vel.vx);
          scaleX = 1 + stretch;
          scaleY = 1 / (1 + stretch * 0.5);
        }
      }

      // Scroll stretch (vertical only) — always safe, no lateral drift
      const sv = scrollVelocity.current;
      const scrollStretch = clamp(Math.abs(sv) * CFG.SCROLL_STRETCH_FACTOR, 0, CFG.SCROLL_STRETCH_MAX);
      if (!down && scrollStretch > 0.01) {
        scaleY = (sv > 0 ? 1 + scrollStretch : 1 - scrollStretch * 0.5);
        scaleX = 1 / (1 + scrollStretch * 0.3);
      }
      // Decay scroll velocity
      scrollVelocity.current *= 0.85;

      // ── Apply bubble transform ────────────────────────────────────────────
      if (bubbleRef.current) {
        const bx = bubblePos.current.x;
        const by = bubblePos.current.y;

        // Transform: position + center + stretch rotation
        const rot = (!down && hover === 'none') ? rotation : 0;
        bubbleRef.current.style.transform =
          `translate3d(${bx}px, ${by}px, 0) translate(-50%, -50%) rotate(${rot}rad) scale(${scaleX}, ${scaleY})`;

        // Bubble classes
        const classes = ['lc-bubble'];
        if (!visible)               classes.push('is-hidden');
        if (hover === 'interactive') classes.push('is-interactive');
        if (hover === 'product')     classes.push('is-product');
        if (down)                    classes.push('is-clicking');
        if (isIdle.current && hover === 'none' && !down) classes.push('is-idle');
        bubbleRef.current.className = classes.join(' ');

        // Bubble size
        const targetSize =
          hover === 'product' ? CFG.PRODUCT_SIZE :
          hover === 'interactive' ? CFG.HOVER_SIZE : bubbleSize;
        bubbleRef.current.style.width  = `${targetSize}px`;
        bubbleRef.current.style.height = `${targetSize}px`;

        // Shift inner highlight based on movement direction
        if (bubbleRef.current.firstChild) {
          const highlightShiftX = clamp(-vel.vx * 600, -8, 8);
          const highlightShiftY = clamp(-vel.vy * 600, -8, 8);
          bubbleRef.current.style.setProperty('--hl-x', `${16 + highlightShiftX}%`);
          bubbleRef.current.style.setProperty('--hl-y', `${10 + highlightShiftY}%`);
        }
      }

      // ── Glow ──────────────────────────────────────────────────────────────
      if (glowRef.current) {
        glowPos.current.x = lerp(glowPos.current.x, mx, 0.09);
        glowPos.current.y = lerp(glowPos.current.y, my, 0.09);
        glowRef.current.style.transform =
          `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;

        const glowClasses = ['lc-glow'];
        if (!visible)                glowClasses.push('is-hidden');
        if (hover === 'interactive') glowClasses.push('is-interactive');
        if (hover === 'product')     glowClasses.push('is-product');
        glowRef.current.className = glowClasses.join(' ');

        const targetGlowSize = hover === 'product' ? glowSize * 1.5 :
                               hover === 'interactive' ? glowSize * 1.2 : glowSize;
        glowRef.current.style.width  = `${targetGlowSize}px`;
        glowRef.current.style.height = `${targetGlowSize}px`;
      }

      // ── Trail ─────────────────────────────────────────────────────────────
      if (trail) {
        trailPos.current.forEach((tp, i) => {
          const prevX = i === 0 ? bubblePos.current.x : trailPos.current[i - 1].x;
          const prevY = i === 0 ? bubblePos.current.y : trailPos.current[i - 1].y;
          const tl = CFG.TRAIL_LERP_BASE * (1 - i * 0.12);
          tp.x = lerp(tp.x, prevX, tl);
          tp.y = lerp(tp.y, prevY, tl);

          const el = trailRefs.current[i];
          if (el) {
            el.style.transform =
              `translate3d(${tp.x}px, ${tp.y}px, 0) translate(-50%, -50%)`;
            // Fade and shrink each successive trail
            el.style.opacity = ((0.18 - i * 0.032) * (visible ? 1 : 0)).toString();
          }
        });
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isActive, trail, bubbleSize, glowSize, state]);

  // ── Don't render on ineligible devices ────────────────────────────────────
  if (!isActive) return null;

  const trailArray = Array.from({ length: CFG.TRAIL_COUNT });

  return (
    <>
      {/* ── Ambient glow ────────────────────────────────────────────────── */}
      <div
        ref={glowRef}
        className="lc-glow"
        style={{ width: glowSize, height: glowSize }}
        aria-hidden="true"
      />

      {/* ── Trail bubbles ────────────────────────────────────────────────── */}
      {trail && trailArray.map((_, i) => {
        const trailSize = Math.round(bubbleSize * (0.75 - i * 0.12));
        return (
          <div
            key={i}
            ref={el => (trailRefs.current[i] = el)}
            className="lc-trail"
            style={{
              width:  trailSize,
              height: trailSize,
              zIndex: 999995 - i,
            }}
            aria-hidden="true"
          />
        );
      })}

      {/* ── Liquid glass bubble ──────────────────────────────────────────── */}
      <div
        ref={bubbleRef}
        className="lc-bubble"
        style={{ width: bubbleSize, height: bubbleSize }}
        aria-hidden="true"
      />

      {/* ── Precision dot ───────────────────────────────────────────────── */}
      <div
        ref={dotRef}
        className="lc-dot"
        style={{ width: dotSize, height: dotSize }}
        aria-hidden="true"
      />
    </>
  );
};

LuxuryCursor.propTypes = {
  bubbleSize: PropTypes.number,
  dotSize:    PropTypes.number,
  trail:      PropTypes.bool,
  ripple:     PropTypes.bool,
  glowSize:   PropTypes.number,
};

export default LuxuryCursor;
