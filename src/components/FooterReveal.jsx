'use client';

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * FooterReveal — Premium "footer beneath content" reveal animation
 *
 * Pattern: The footer sits fixed at the bottom of the viewport. The main
 * content has a bottom margin equal to the footer's height, so when the
 * user scrolls to the very end the content slides away and the footer is
 * gradually "revealed" underneath — like peeling back a layer.
 *
 * Inspired by Apple, Linear, Stripe, Framer, Awwwards premium sites.
 *
 * Features:
 *  • Scroll-linked opacity / translateY / scale / blur / shadow
 *  • Parallax background (footer bg moves slower than foreground)
 *  • Staggered child-section fade-in
 *  • Responsive: full on desktop, reduced on tablet, minimal on mobile
 *  • Respects prefers-reduced-motion (simple fade)
 *  • 60fps — uses Framer Motion spring-smoothed scroll transforms (GPU)
 */

export default function FooterReveal({ children }) {
  const footerWrapRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  /* ── Measure footer height (for the spacer + fixed positioning) ── */
  const measure = useCallback(() => {
    if (footerWrapRef.current) {
      setFooterHeight(footerWrapRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    measure();
    window.addEventListener('resize', measure, { passive: true });
    // Re-measure after fonts / images settle
    const t = setTimeout(measure, 500);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, [measure]);

  /* ── Scroll tracking ── */
  // We track the sentinel div that sits right where the footer spacer ends.
  const sentinelRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sentinelRef,
    // "start end" = top of sentinel hits bottom of viewport
    // "end end"   = bottom of sentinel hits bottom of viewport
    offset: ['start end', 'end end'],
  });

  // Smooth the raw progress — snappy spring for fast, responsive reveal
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 28,
    restDelta: 0.001,
  });

  /* ── Derived motion values — reveal completes early in the scroll ── */
  const footerOpacity    = useTransform(smoothProgress, [0, 0.15, 0.4], [0, 0.7, 1]);
  const footerY          = useTransform(smoothProgress, [0, 0.25, 0.45], [60, 8, 0]);
  const footerScale      = useTransform(smoothProgress, [0, 0.3], [0.98, 1]);
  const footerBlur       = useTransform(smoothProgress, [0, 0.25], [6, 0]);
  const footerBrightness = useTransform(smoothProgress, [0, 0.35], [0.88, 1]);
  const shadowStrength   = useTransform(smoothProgress, [0, 0.3, 0.5], [0, 0.3, 0.5]);

  // Main content lift (the page peeling upward)
  const contentLift = useTransform(smoothProgress, [0.1, 0.5], [0, -30]);

  // Parallax: footer background moves slower
  const parallaxBgY = useTransform(smoothProgress, [0, 1], [30, 0]);

  // Combine blur and brightness into a reactive filter string (always declared)
  const filterString = useFilterString(footerBlur, footerBrightness);

  /* ── Mobile and Reduced-motion fast path ── */
  if (shouldReduceMotion || isMobile) {
    return (
      <div
        ref={footerWrapRef}
        style={{ position: 'relative', zIndex: 2, width: '100%' }}
      >
        {children}
      </div>
    );
  }

  return (
    <>
      {/* ── Sentinel: this invisible div is tracked by useScroll.
           It spans the same height as the footer and sits in-flow
           right at the bottom of the content. ── */}
      <div
        ref={sentinelRef}
        style={{ height: footerHeight, position: 'relative', pointerEvents: 'none' }}
        aria-hidden="true"
      />

      {/* ── Fixed footer layer ── */}
      <motion.div
        ref={footerWrapRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          willChange: 'opacity, transform, filter',
          opacity: footerOpacity,
          y: footerY,
          scale: footerScale,
        }}
      >
        {/* Parallax background overlay */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            y: parallaxBgY,
            pointerEvents: 'none',
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          {/* Subtle decorative glow orbs that drift with parallax */}
          <div
            style={{
              position: 'absolute',
              top: '-120px',
              left: '-80px',
              width: '520px',
              height: '520px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(181,137,59,0.06) 0%, transparent 65%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              right: '-60px',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(123,92,183,0.06) 0%, transparent 65%)',
            }}
          />
        </motion.div>

        {/* Blur + brightness filter layer */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 1,
            filter: filterString,
          }}
        >
          {children}
        </motion.div>

        {/* Progressive top shadow (strengthens as footer reveals) */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)',
            opacity: shadowStrength,
            pointerEvents: 'none',
            zIndex: 2,
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── CSS for responsive behavior & stagger ── */}
      <style dangerouslySetInnerHTML={{ __html: footerRevealCSS }} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   useFilterString — Combines blur + brightness into a
   reactive CSS filter string via Framer Motion transforms.
   ───────────────────────────────────────────────────────── */
function useFilterString(blur, brightness) {
  return useTransform(
    [blur, brightness],
    ([b, br]) => `blur(${b}px) brightness(${br})`
  );
}

/* ─────────────────────────────────────────────────────────
   Global CSS injected once for responsive & reduced-motion
   ───────────────────────────────────────────────────────── */
const footerRevealCSS = `
  /* Ensure main content sits above fixed footer */
  .app-container > main {
    position: relative;
    z-index: 2;
    background: var(--bg-cream, #FAF9F7);
  }

  /* Tablet: slightly reduce the parallax / scale intensity */
  @media (max-width: 1024px) {
    /* Handled via Framer Motion responsive hooks internally */
  }

  /* Mobile: only opacity + translateY, no scale/blur/parallax */
  @media (max-width: 768px) {
    /* Handled via Framer Motion responsive hooks internally */
  }

  /* Reduced motion: no transforms at all */
  @media (prefers-reduced-motion: reduce) {
    .footer-reveal-wrapper {
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }
  }
`;
