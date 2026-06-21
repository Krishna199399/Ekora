'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.65,
  direction = 'up', // 'up', 'down', 'left', 'right', 'fade', 'scale'
  distance = 30,
  style = {},
  className = '',
  threshold = 0.08
}) {
  const shouldReduceMotion = useReducedMotion();

  const getVariants = () => {
    // If the user prefers reduced motion, only cross-fade without translations
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration, delay, ease: 'easeOut' }
        }
      };
    }

    const hidden = { opacity: 0 };
    const visible = {
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 1, 0.5, 1] // Premium cubic-bezier easeOut
      }
    };

    switch (direction) {
      case 'up':
        hidden.y = distance;
        visible.y = 0;
        break;
      case 'down':
        hidden.y = -distance;
        visible.y = 0;
        break;
      case 'left':
        hidden.x = distance;
        visible.x = 0;
        break;
      case 'right':
        hidden.x = -distance;
        visible.x = 0;
        break;
      case 'scale':
        hidden.scale = 0.95;
        visible.scale = 1;
        break;
      case 'fade':
      default:
        break;
    }

    return { hidden, visible };
  };

  const variants = getVariants();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants}
      style={{ ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
