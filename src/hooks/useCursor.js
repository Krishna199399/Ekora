import { useEffect, useRef } from 'react';
import { clamp } from '../utils/cursorHelpers';

/**
 * Custom React Hook for capturing mouse, click, scroll, hover, and magnetic details.
 * Prevents re-renders by storing values in refs, updated via event listeners.
 */
export const useCursor = (options = { magnetic: true }) => {
  const mouse = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const isVisible = useRef(false);
  const isMouseDown = useRef(false);
  
  // Hover state: 'none', 'interactive', 'product-image'
  const hoverType = useRef('none');
  const hoverText = useRef(''); // Dynamic context words: 'VIEW', 'EXPLORE', 'WRITE', 'SHOP', etc.
  
  // Magnetic fields
  const activeMagnetic = useRef(null);
  const releasingMagnetic = useRef(null);
  
  const magneticOffset = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const releasingOffset = useRef({ currentX: 0, currentY: 0 });
  
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    lastScrollY.current = window.scrollY;

    const handleMouseMove = (e) => {
      mouse.current.lastX = mouse.current.x;
      mouse.current.lastY = mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      if (!isVisible.current) {
        isVisible.current = true;
      }
      
      // Calculate target magnetic translation offset if hovering a magnetic button
      if (options.magnetic && activeMagnetic.current) {
        if (!document.body.contains(activeMagnetic.current)) {
          activeMagnetic.current = null;
          magneticOffset.current.targetX = 0;
          magneticOffset.current.targetY = 0;
        } else {
          const rect = activeMagnetic.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;
          
          // Dynamic attraction (e.g. 18% pull), capped at max 8px
          magneticOffset.current.targetX = clamp(dx * 0.18, -8, 8);
          magneticOffset.current.targetY = clamp(dy * 0.18, -8, 8);
        }
      }
    };

    const handleMouseLeaveWindow = () => {
      isVisible.current = false;
      isMouseDown.current = false;
    };

    const handleMouseEnterWindow = (e) => {
      isVisible.current = true;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseDown = () => {
      isMouseDown.current = true;
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;
      
      // Scale scroll speed, clamp to prevent physics explosion
      scrollVelocity.current = clamp(diff * 0.8, -120, 120);
    };

    // Event delegation on mouseover
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // 1. Detect product image hover (skincare products or category grids)
      const isProductImage = target.closest('.product-image, .product-card img, .category-card img, [class*="product"] img');
      if (isProductImage) {
        hoverType.current = 'product-image';
        hoverText.current = 'VIEW';
        return;
      }

      // 2. Detect standard interactive elements
      const isInteractive = target.closest(
        'button, a, input, textarea, select, .product-card, .category-card, .shop-now, .hero-button, [role="button"]'
      );

      if (isInteractive) {
        hoverType.current = 'interactive';

        // Determine context-based hover text dynamically
        const tagName = isInteractive.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'textarea') {
          hoverText.current = 'WRITE';
        } else if (tagName === 'select') {
          hoverText.current = 'CHOOSE';
        } else if (isInteractive.classList.contains('shop-now') || isInteractive.closest('.product-card')) {
          hoverText.current = 'SHOP';
        } else if (tagName === 'a') {
          hoverText.current = 'VIEW';
        } else if (tagName === 'button' || isInteractive.classList.contains('hero-button') || isInteractive.getAttribute('role') === 'button') {
          hoverText.current = 'EXPLORE';
        } else {
          hoverText.current = 'DISCOVER';
        }

        // Set up magnetic target if appropriate
        if (options.magnetic && isInteractive.matches('button, a, .shop-now, .hero-button, [role="button"]')) {
          // If we had another magnetic button active, transition it to releasing
          if (activeMagnetic.current && activeMagnetic.current !== isInteractive) {
            releasingMagnetic.current = activeMagnetic.current;
            releasingOffset.current.currentX = magneticOffset.current.currentX;
            releasingOffset.current.currentY = magneticOffset.current.currentY;
          }
          
          activeMagnetic.current = isInteractive;
        }
      }
    };

    // Event delegation on mouseout
    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      // Handle magnetic release
      if (activeMagnetic.current && !target.closest('button, a, .shop-now, .hero-button, [role="button"]')) {
        // Move current magnetic button to releasing queue
        releasingMagnetic.current = activeMagnetic.current;
        releasingOffset.current.currentX = magneticOffset.current.currentX;
        releasingOffset.current.currentY = magneticOffset.current.currentY;
        
        activeMagnetic.current = null;
        magneticOffset.current.targetX = 0;
        magneticOffset.current.targetY = 0;
      }

      // Handle hover resets
      if (hoverType.current === 'product-image' && !target.closest('.product-image, .product-card img, .category-card img, [class*="product"] img')) {
        hoverType.current = 'none';
        hoverText.current = '';
      }

      if (hoverType.current === 'interactive' && !target.closest('button, a, input, textarea, select, .product-card, .category-card, .shop-now, .hero-button, [role="button"]')) {
        hoverType.current = 'none';
        hoverText.current = '';
      }
    };

    // Add event listeners (passive: true where available)
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [options.magnetic]);

  return {
    mouse,
    isVisible,
    isMouseDown,
    hoverType,
    hoverText,
    activeMagnetic,
    releasingMagnetic,
    magneticOffset,
    releasingOffset,
    scrollVelocity
  };
};
