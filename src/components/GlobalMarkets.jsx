'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Globe2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GLOBAL_REGIONS = [
  { region: 'India',         expertise: 'Manufacturing & CDSCO Compliance', x: 68, y: 46, color: '#FF9933' },
  { region: 'Middle East',   expertise: 'Import Regulation & Market Entry', x: 60, y: 40, color: '#C5A028' },
  { region: 'Europe',        expertise: 'EU CPNP & Safety Assessment',      x: 52, y: 28, color: '#1565C0' },
  { region: 'North America', expertise: 'FDA MoCRA & Market Strategy',       x: 23, y: 38, color: '#2E7D32' },
  { region: 'Southeast Asia', expertise: 'Commercialization & Export',       x: 77, y: 53, color: '#7B1FA2' },
  { region: 'Global',        expertise: 'End to End Consulting',            x: 50, y: 48, color: '#B5893B' },
];

export default function GlobalMarkets() {
  const [showGlobalOverview, setShowGlobalOverview] = useState(false);
  const [activePin, setActivePin] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Variants
  const scrollFadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.08, duration: 0.7, ease: 'easeOut' }
    })
  };

  const gridContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="global" style={{ background: '#FAF9F7', padding: 0, borderBottom: '1px solid rgba(181,137,59,0.1)', position: 'relative', overflow: 'hidden' }}>

      {/* ─── Header Section (Curved Split) ─── */}
      <div style={{ position: 'relative', width: '100%', minHeight: '520px', display: 'flex', overflow: 'hidden' }} className="gm-header-container">
        
        {/* LEFT COLUMN: text and button */}
        <div 
          style={{ 
            width: '45%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            padding: '80px 4% 80px 8%', 
            zIndex: 10,
            position: 'relative'
          }} 
          className="gm-header-left"
        >
          <motion.div
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '2px', background: '#B5893B', borderRadius: '1px' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#B5893B', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>Global Distribution</span>
            </motion.div>

            {/* Heading */}
            <motion.h2 
              variants={itemVariants}
              style={{ 
                fontFamily: 'Syne, var(--font-serif)', 
                fontSize: 'clamp(32px, 4.2vw, 56px)', 
                color: '#0D2A52', 
                fontWeight: 800, 
                lineHeight: 1.1, 
                margin: 0, 
                letterSpacing: '-0.5px' 
              }}
            >
              Global Regulatory<br />Compliance
            </motion.h2>

            {/* Divider rule */}
            <motion.div
              variants={itemVariants}
              style={{
                height: '2px',
                background: '#B5893B',
                width: '60px',
                marginTop: '4px'
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
                maxWidth: '540px' 
              }}
            >
              Expanding cosmetic products into international markets requires careful regulatory planning, documentation support, compliance validation, and region-specific product adaptation.
            </motion.p>

            <motion.p 
              variants={itemVariants}
              style={{ 
                fontSize: '14.5px', 
                lineHeight: '1.7', 
                color: '#555555', 
                margin: '0 0 8px 0', 
                fontFamily: 'var(--font-sans)', 
                maxWidth: '540px' 
              }}
            >
              EGC Ekora Global Consulting supports cosmetic brands and manufacturers with international compliance consulting and export readiness solutions for successful global market expansion.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants} style={{ marginTop: '6px' }}>
              <button
                onClick={() => setShowGlobalOverview(true)}
                className="gm-cta-btn"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '12px 24px', 
                  background: '#B5893B', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '6px', 
                  fontWeight: 700, 
                  fontSize: '13.5px', 
                  cursor: 'pointer', 
                  width: 'fit-content', 
                  transition: 'background 0.2s ease', 
                  fontFamily: 'var(--font-sans)' 
                }}
              >
                Explore Global Markets →
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Curved Interactive Map Section */}
        <div 
          style={{ 
            width: '55%', 
            position: 'relative', 
            overflow: 'hidden', 
            borderTopLeftRadius: '320px 50%', 
            borderBottomLeftRadius: '320px 50%', 
            background: 'linear-gradient(135deg, #071730 0%, #0d2a52 50%, #071730 100%)',
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 40px 40px'
          }} 
          className="gm-header-right"
        >
          {/* Header titles */}
          <div style={{ textAlign: 'center', zIndex: 10, pointerEvents: 'none', marginBottom: '24px' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#B5893B', letterSpacing: '2.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Global Presence</span>
            <h3 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: '16px', fontWeight: 700, color: '#ffffff', margin: 0 }}>5+ Regions · 15+ Service Areas · Global Impact</h3>
          </div>

          {/* SVG Map Container */}
          <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(8px)' }}>
            <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto', display: 'block' }}>
              <defs>
                <pattern id="mapGridHome" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0L0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* ── Background Map Image ── */}
              <image href="/world_map_vector.png" x="0" y="0" width="800" height="400" preserveAspectRatio="none" opacity="0.85" />

              {/* Grid Overlay */}
              <rect width="800" height="400" fill="url(#mapGridHome)" style={{ pointerEvents: 'none' }} />

              {/* ── Pin Markers ── */}
              {GLOBAL_REGIONS.map((r, i) => {
                const cx = (r.x / 100) * 800;
                const cy = (r.y / 100) * 400;
                const active = activePin === i;
                const DEEP = '#0D2A52';
                const WHITE = '#FFFFFF';
                const GOLD = '#B5893B';
                
                return (
                  <g
                    key={r.region}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActivePin(i)}
                    onMouseLeave={() => setActivePin(null)}
                  >
                    {/* Pulse rings */}
                    <circle cx={cx} cy={cy} r="16" fill={`${r.color}15`} stroke={`${r.color}35`} strokeWidth="1">
                      <animate attributeName="r" values="11;22;11" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                    </circle>
                    <circle cx={cx} cy={cy} r="10" fill={`${r.color}20`} stroke={`${r.color}45`} strokeWidth="1">
                      <animate attributeName="r" values="6;13;6" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.4 + 0.2}s`} />
                      <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.4 + 0.2}s`} />
                    </circle>

                    {/* Pin dot */}
                    <circle cx={cx} cy={cy} r={active ? 8 : 5} fill={r.color} stroke={WHITE} strokeWidth="2" style={{ transition: 'all 0.25s ease' }} />
                    <circle cx={cx} cy={cy} r={active ? 12 : 9} fill="none" stroke={r.color} strokeWidth="1.2" opacity="0.4" style={{ transition: 'all 0.25s ease' }} />

                    {/* Label below pin */}
                    {activePin !== i && (
                      <g style={{ pointerEvents: 'none' }}>
                        <text x={cx} y={cy + 17} textAnchor="middle" fontSize="9" fontWeight="700" fill={DEEP} stroke={DEEP} strokeWidth="3" strokeLinejoin="round">{r.region}</text>
                        <text x={cx} y={cy + 17} textAnchor="middle" fontSize="9" fontWeight="700" fill={WHITE}>{r.region}</text>
                      </g>
                    )}

                    {/* Tooltip */}
                    {active && (
                      <g style={{ pointerEvents: 'none' }}>
                        <rect x={cx - 80} y={cy - 64} width="160" height="48" rx="8" fill={DEEP} stroke={GOLD} strokeWidth="1.5" opacity="0.96" />
                        <polygon points={`${cx},${cy - 8} ${cx - 5},${cy - 16} ${cx + 5},${cy - 16}`} fill={DEEP} stroke={GOLD} strokeWidth="0" />
                        <line x1={cx - 4} y1={cy - 16} x2={cx + 4} y2={cy - 16} stroke={DEEP} strokeWidth="1.5" />
                        <text x={cx} y={cy - 48} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={GOLD} fontFamily="Syne, sans-serif">{r.region}</text>
                        <text x={cx} y={cy - 32} textAnchor="middle" fontSize="8.5" fontWeight="500" fill={WHITE}>{r.expertise}</text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Modal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showGlobalOverview && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGlobalOverview(false)} 
              className="egc-modal-overlay"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: 'spring', stiffness: 280, damping: 25 }}
                onClick={e => e.stopPropagation()} 
                className="egc-modal-card"
                style={{ maxWidth: '560px' }}
              >
                <div style={{ height: '4px', background: 'linear-gradient(90deg, #0D2A52, #B5893B, #D4AF37)', flexShrink: 0 }} />
                <div className="egc-modal-body">
                  <div className="egc-modal-noimg-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="egc-modal-noimg-icon" style={{ background: 'rgba(13,42,82,0.08)' }}>
                        <Globe2 size={22} color="#0D2A52" />
                      </div>
                      <h2 className="egc-modal-noimg-title">Global Export & Advisory</h2>
                    </div>
                    <button onClick={() => setShowGlobalOverview(false)} style={{ background: 'rgba(13,42,82,0.07)', border: 'none', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <X size={16} color="#0D2A52" />
                    </button>
                  </div>
                  <p style={{ fontSize: '14.5px', color: '#4a5568', lineHeight: 1.7, marginBottom: '20px', textAlign: 'justify' }}>
                    EGC operates a proprietary international regulatory intelligence desk with relationships with testing laboratories, safety assessors, and regional legal representatives globally.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="gm-modal-grid">
                    {[
                      { title: 'Regulatory Testing', text: 'Heavy metal screenings, microbial verifications, skin compatibility, SPF ratings in ISO 17025 labs.' },
                      { title: 'Customs Clearance', text: 'Cosmetic classification codes, SDS formatting, import certificate clearances for seamless global shipments.' },
                      { title: 'Product Registration', text: 'FDA, CDSCO, CPNP, ESMA registration support and documentation preparation.' },
                      { title: 'Export Readiness', text: 'Free Sale Certificates, labeling review, ingredient declarations for each target market.' },
                    ].map((item, i) => (
                      <div key={i} style={{ padding: '16px', border: '1px solid rgba(13,42,82,0.08)', borderTop: '3px solid #B5893B', borderRadius: '10px', background: '#FAF9F7' }}>
                        <h4 style={{ fontWeight: 700, color: '#0D2A52', marginBottom: '6px', fontSize: '13px', fontFamily: 'var(--font-sans)' }}>{item.title}</h4>
                        <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, margin: 0, fontFamily: 'var(--font-sans)', textAlign: 'justify' }}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .gm-cta-btn:hover { background: #a37b34 !important; }
        @media (max-width: 1024px) {
          .gm-header-container { flex-direction: column !important; }
          .gm-header-left { width: 100% !important; padding: 48px 24px !important; }
          .gm-header-right {
            width: 100% !important;
            height: auto !important;
            min-height: 280px !important;
            border-top-left-radius: 50% 20px !important;
            border-top-right-radius: 50% 20px !important;
            border-bottom-left-radius: 0 !important;
            padding: 28px 20px 20px !important;
          }
        }
        @media (max-width: 680px) {
          .gm-header-left { padding: 32px 16px !important; }
          .gm-header-right { padding: 20px 12px 16px !important; }
          #global { padding-bottom: 56px !important; }
          .gm-modal-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 420px) {
          .gm-header-left { padding: 24px 14px !important; }
        }
      `}} />

    </section>
  );
}
