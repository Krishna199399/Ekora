'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

/* ─── Brand tokens ──────────────────────────────────────── */
const CREAM = '#FAF9F7';
const GOLD  = '#B5893B';
const NAVY  = '#0D2A52';

/* ─── Laurel Wreath Badge Component ──────────────────────── */
const LaurelBadge = ({ textLines }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    {/* Laurel Wreath Left */}
    <svg width="18" height="34" viewBox="0 0 16 32" fill="none" style={{ flexShrink: 0 }}>
      <path 
        d="M14 28C8.5 25 4 19 4 11C4 7.5 5.5 4 7.5 1.5" 
        stroke={GOLD} 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path d="M6 23C4 21.5 2.5 18.5 3 15.5" stroke={GOLD} strokeWidth="1" strokeLinecap="round"/>
      <path d="M3.5 16.5C2.5 15 1.5 12.5 2 10" stroke={GOLD} strokeWidth="1" strokeLinecap="round"/>
      <path d="M3.5 10C3 8.5 2 6 3.5 4" stroke={GOLD} strokeWidth="1" strokeLinecap="round"/>
    </svg>
    
    {/* Text Stack */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      {textLines.map((line, idx) => (
        <span 
          key={idx} 
          style={{ 
            fontSize: '8px', 
            fontWeight: 800, 
            color: GOLD, 
            letterSpacing: '1px', 
            textTransform: 'uppercase', 
            fontFamily: 'var(--font-sans)', 
            lineHeight: 1.25 
          }}
        >
          {line}
        </span>
      ))}
    </div>
    
    {/* Laurel Wreath Right */}
    <svg width="18" height="34" viewBox="0 0 16 32" fill="none" style={{ transform: 'scaleX(-1)', flexShrink: 0 }}>
      <path 
        d="M14 28C8.5 25 4 19 4 11C4 7.5 5.5 4 7.5 1.5" 
        stroke={GOLD} 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path d="M6 23C4 21.5 2.5 18.5 3 15.5" stroke={GOLD} strokeWidth="1" strokeLinecap="round"/>
      <path d="M3.5 16.5C2.5 15 1.5 12.5 2 10" stroke={GOLD} strokeWidth="1" strokeLinecap="round"/>
      <path d="M3.5 10C3 8.5 2 6 3.5 4" stroke={GOLD} strokeWidth="1" strokeLinecap="round"/>
    </svg>
  </div>
);

/* ─── Main Component ────────────────────────────────────── */
export default function Hero() {
  const router = useRouter();

  // Variants for staggered container entry
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section
      id="home"
      style={{
        marginTop: '76px',
        minHeight: 'calc(100vh - 76px)',
        background: CREAM,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
      }}
      className="hero-section"
    >
      {/* LEFT COLUMN — Text Content */}
      <div
        style={{
          width: '48%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 5% 60px 8%',
          zIndex: 10,
          position: 'relative',
        }}
        className="hero-left"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '2px', background: GOLD, borderRadius: '1px' }} />
            <span 
              style={{ 
                fontSize: '11px', 
                fontWeight: 800, 
                color: GOLD, 
                letterSpacing: '3px', 
                textTransform: 'uppercase', 
                fontFamily: 'var(--font-sans)' 
              }}
            >
              The Science of Luxury Beauty
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: 'Syne, var(--font-serif)',
              fontSize: 'clamp(38px, 4.2vw, 62px)',
              fontWeight: 800,
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: '-0.5px',
              color: NAVY,
            }}
          >
            Engineering<br />
            Excellence In<br />
            Every <span style={{ color: GOLD }}>Drop<span style={{ color: GOLD, marginLeft: '2px' }}>•</span></span>
          </motion.h1>

          {/* Divider rule */}
          <motion.div
            variants={itemVariants}
            style={{
              height: '2px',
              background: GOLD,
              width: '60px'
            }}
          />

          {/* Paragraphs */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: '14.5px',
              lineHeight: '1.7',
              color: '#555555',
              margin: 0,
              fontFamily: 'var(--font-sans)',
            }}
          >
            We help cosmetic brands transform ideas into commercially successful products through formulation science, manufacturing strategy, factory planning, regulatory compliance, and business growth consulting.
          </motion.p>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: '14.5px',
              lineHeight: '1.7',
              color: '#555555',
              margin: '0 0 8px 0',
              fontFamily: 'var(--font-sans)',
            }}
          >
            From innovative skincare formulations and personal care products to large-scale cosmetic manufacturing facilities, EGC Ekora Global Consulting partners with businesses at every stage of their journey from concept development to commercial production and global market expansion.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
          >
            <button
              onClick={() => router.push('/services/')}
              className="hero-btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                background: GOLD,
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '13.5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Explore Services →
            </button>
            
            <button
              onClick={() => router.push('/rd-innovation/')}
              className="hero-btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                background: 'transparent',
                color: NAVY,
                border: `1.5px solid ${GOLD}`,
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '13.5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Enter R&D Lab →
            </button>
          </motion.div>

          {/* Laurel Wreath Badges */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              alignItems: 'center',
              paddingTop: '20px',
              marginTop: '10px',
            }}
          >
            <LaurelBadge textLines={["GLOBAL", "CONSULTING", "EXCELLENCE", "AWARDS"]} />
            <LaurelBadge textLines={["COSMOPROF", "NORTH AMERICA", "BOLOGNA"]} />
            <LaurelBadge textLines={["INDIA", "BUSINESS", "AWARDS"]} />
          </motion.div>
        </motion.div>
      </div>

      {/* RIGHT COLUMN — Curved Lab Image Showcase */}
      <div
        style={{
          width: '52%',
          position: 'relative',
          overflow: 'hidden',
          borderTopLeftRadius: '300px 50%',
          borderBottomLeftRadius: '300px 50%',
          borderLeft: `4px solid ${GOLD}`,
          zIndex: 5,
        }}
        className="hero-right"
      >
        <motion.img
          src="/ChatGPT Image Jun 1, 2026, 08_11_46 PM.png"
          alt="EGC Premium Cosmetic Lab and Products"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* ─── Button Hovers ──────────────────────── */
        .hero-btn-primary:hover {
          background: #a37b34 !important;
          transform: translateY(-1px);
        }
        .hero-btn-secondary:hover {
          background: rgba(181, 137, 59, 0.08) !important;
          transform: translateY(-1px);
        }

        /* ─── Tablet (<=1024px) ── */
        @media (max-width: 1024px) {
          .hero-section { flex-direction: column !important; }
          .hero-left { width: 100% !important; padding: 40px 24px 32px !important; }
          .hero-right {
            width: 100% !important;
            height: 320px !important;
            border-top-left-radius: 80px 20px !important;
            border-top-right-radius: 80px 20px !important;
            border-bottom-left-radius: 0 !important;
            border-left: none !important;
            border-top: 4px solid #B5893B !important;
          }
        }

        /* ─── Mobile (<=680px) ── */
        @media (max-width: 680px) {
          .hero-section { min-height: auto !important; }
          .hero-left { padding: 28px 16px 24px !important; }
          .hero-right { height: 240px !important; }
        }

        /* ─── Small Mobile (<=420px) ── */
        @media (max-width: 420px) {
          .hero-left { padding: 20px 14px 20px !important; }
          .hero-right { height: 190px !important; }
        }
      `}} />

    </section>
  );
}
