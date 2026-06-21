'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger if in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Counter({ value, duration = 1.6 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef(null);

  // Extract number and suffix dynamically (e.g. "100+" -> 100, "+")
  const match = String(value).match(/^(\d+)(.*)$/);
  const numericValue = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';
  const isNaNValue = !match;

  useEffect(() => {
    if (isNaNValue || !elementRef.current) {
      setDisplayValue(value);
      return;
    }

    const targetObj = { val: 0 };
    
    const trigger = ScrollTrigger.create({
      trigger: elementRef.current,
      start: 'top 92%',
      onEnter: () => {
        gsap.to(targetObj, {
          val: numericValue,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            setDisplayValue(Math.floor(targetObj.val));
          }
        });
      },
      once: true
    });

    return () => {
      trigger.kill();
    };
  }, [numericValue, isNaNValue, value, duration]);

  return (
    <span ref={elementRef}>
      {isNaNValue ? value : `${displayValue}${suffix}`}
    </span>
  );
}
