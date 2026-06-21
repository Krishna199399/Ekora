'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { 
  X, FlaskConical, Atom, Orbit, TestTube, Microscope, 
  ShieldCheck, Hexagon, Droplet, Leaf, 
  Recycle, ArrowRight, ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RESEARCH_DETAILS = {
  formulation: {
    title: 'Advanced Formulation Science',
    icon: <Hexagon size={28} style={{ color: '#B5893B' }} />,
    shortDesc: 'Innovative active delivery systems and performance optimization for superior consumer results.',
    content: 'We research advanced colloidal chemistry, lipid nanoparticles, and encapsulation systems. This allows active ingredients like Retinol or L-Ascorbic Acid to penetrate deeper into the skin layers while maintaining absolute stability in the container.'
  },
  biotech: {
    title: 'Skin & Hair Biotechnology',
    icon: <Droplet size={28} style={{ color: '#B5893B' }} />,
    shortDesc: 'Biotechnology driven solutions for skin barrier repair, anti aging, and scalp health.',
    content: 'Our biotechnology division focuses on peptide synthesis, bio-fermentation, and cellular growth factors. We study hair follicle stimulation and keratin structures to create clinically validated hair regrowth and density treatments.'
  },
  natural: {
    title: 'Natural & Clean Innovation',
    icon: <Leaf size={28} style={{ color: '#B5893B' }} />,
    shortDesc: 'Researching natural actives and clean beauty solutions with proven efficacy and sustainability.',
    content: 'We isolate botanical active compounds using green extraction methods (CO2 extraction, cold pressing). We formulate cosmetic preservation systems using plant-derived esters and organic compounds, avoiding synthetic parabens or formaldehydes.'
  },
  stability: {
    title: 'Stability & Safety Assessment',
    icon: <ShieldCheck size={28} style={{ color: '#B5893B' }} />,
    shortDesc: 'Advanced testing protocols ensuring product safety, stability, and regulatory compliance.',
    content: 'We conduct accelerated aging tests (oven runs at 45°C), UV exposure evaluations, and packaging compatibility checks. Our team performs microbial challenge tests (USP <51>) to ensure shelf life and contamination prevention.'
  },
  clinical: {
    title: 'Clinical & Efficacy Studies',
    icon: <Microscope size={28} style={{ color: '#B5893B' }} />,
    shortDesc: 'In-vitro, ex-vivo & in-vivo studies to validate claims and deliver trusted performance.',
    content: 'EGC designs in-vitro and in-vivo clinical protocols. We measure skin hydration indices, sebum reduction percentages, wrinkle depth metrics, and skin tone changes using high-tech diagnostic cameras and skin hydration sensors.'
  },
  sustainable: {
    title: 'Sustainable Innovation',
    icon: <Recycle size={28} style={{ color: '#B5893B' }} />,
    shortDesc: 'Eco-friendly technologies and sustainable packaging solutions for a better tomorrow.',
    content: 'We focus on circular beauty. We research biodegradable surfactants, upcycled food waste actives (e.g., coffee ground extracts, fruit seed oils), and PCR (Post-Consumer Recycled) packaging compatibility.'
  }
};

const STATS = [
  { label: 'Research Scientists', value: '10+', icon: <FlaskConical size={18} style={{ color: '#B5893B' }} /> },
  { label: 'Active R&D Projects', value: '25+', icon: <Atom size={18} style={{ color: '#B5893B' }} /> },
  { label: 'Ingredient Studies', value: '200+', icon: <Orbit size={18} style={{ color: '#B5893B' }} /> },
  { label: 'New Formulations', value: '15+', icon: <TestTube size={18} style={{ color: '#B5893B' }} /> }
];

export default function ResearchInnovation() {
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
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

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 90, damping: 14 }
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
    <section id="rd" style={{
      background: '#FAF9F7',
      padding: '0 0 60px 0',
      borderBottom: '1px solid rgba(181, 137, 59, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* ── Split Header Section ── */}
      <div style={{ position: 'relative', width: '100%', minHeight: '560px', display: 'flex', overflow: 'hidden' }} className="rd-header-container">
        
        {/* LEFT COLUMN: text and button */}
        <div 
          style={{ 
            width: '46%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            padding: '80px 90px 80px 8%', 
            zIndex: 10,
            position: 'relative'
          }} 
          className="rd-header-left"
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
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#B5893B', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>R&D Innovation</span>
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
              Driving Innovation<br />Through Science
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
            
            {/* Description */}
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
              Our advanced R&D environment combines scientific expertise, formulation research, ingredient innovation, and performance testing to create safe, effective, and commercially viable cosmetic products.
            </motion.p>
            
            {/* Simulator CTA Button */}
            <motion.div variants={itemVariants} style={{ marginTop: '6px' }}>
              <Link
                href="/rd-innovation"
                className="rd-cta-btn"
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
                  fontFamily: 'var(--font-sans)',
                  textDecoration: 'none'
                }}
              >
                <FlaskConical size={15} />
                Launch Formulation Simulator →
              </Link>
            </motion.div>

            {/* Horizontal Feature Strip */}
            <motion.div 
              variants={itemVariants}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                paddingTop: '20px', 
                marginTop: '10px',
                borderTop: '1px solid rgba(13,42,82,0.08)' 
              }}
              className="rd-feature-strip"
            >
              {[
                { icon: FlaskConical, label: 'Advanced R&D Labs' },
                { icon: Atom, label: 'Evidence-Based Formulation' },
                { icon: ShieldCheck, label: 'Safety & Stability Testing' },
                { icon: ClipboardList, label: 'Innovation & Product Engineering' }
              ].map((f, i) => (
                <div 
                  key={i} 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center', 
                    gap: '6px',
                    flex: '1 1 0px',
                    padding: '0 8px',
                    borderRight: i < 3 ? '1px solid rgba(13,42,82,0.1)' : 'none'
                  }}
                  className="rd-feature-item"
                >
                  <f.icon size={16} style={{ color: '#B5893B' }} />
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#0D2A52', fontFamily: 'var(--font-sans)', lineHeight: 1.2 }}>
                    {f.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Scientist image with floating stats card overlay */}
        <div 
          style={{ 
            width: '54%', 
            position: 'relative', 
            overflow: 'visible', // Visible to allow stats overlay to overflow leftward
            zIndex: 5 
          }} 
          className="rd-header-right"
        >
          {/* Inner curved wrapper for clipping image only */}
          <div
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              borderTopLeftRadius: '320px 50%',
              borderBottomLeftRadius: '320px 50%',
              position: 'relative'
            }}
          >
            <motion.img 
              src="/rd_scientist.png" 
              alt="EGC R&D Scientist" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                objectPosition: 'center' 
              }} 
              initial={{ scale: 1.03 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            {/* Blended gradient mask on the left curve */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '180px',
                background: 'linear-gradient(90deg, #FAF9F7 0%, rgba(250, 249, 247, 0.8) 35%, transparent 100%)',
                zIndex: 6,
                pointerEvents: 'none'
              }} 
            />
          </div>

          {/* Floating Stats Card Overlay */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '-60px',
              transform: 'translateY(-50%)',
              zIndex: 10,
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(181, 137, 59, 0.2)',
              borderRadius: '20px',
              padding: '24px 28px',
              width: '280px',
              boxShadow: '0 12px 36px rgba(13,42,82,0.08)'
            }}
            className="rd-stats-card-overlay"
          >
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #B5893B, #D4AF37)', borderRadius: '2px', marginBottom: '16px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 12px' }}>
              {STATS.map((stat, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ marginBottom: '4px' }}>{stat.icon}</div>
                  <div style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: '20px', fontWeight: 800, color: '#0D2A52', lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '9px', color: '#7c728a', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px', letterSpacing: '0.3px', fontFamily: 'var(--font-sans)', lineHeight: 1.1 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CORE RESEARCH AREAS DECK & SHELVES */}
      <div style={{ 
        maxWidth: '1340px', 
        margin: '48px auto 0', 
        padding: '0 40px',
        display: 'flex', 
        flexDirection: 'column', 
        gap: '32px' 
      }}>
        
        {/* Middle Section: Core Research Areas Title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {/* OUR CORE RESEARCH AREAS Title with lines */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFadeIn}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              margin: '10px 0 10px'
            }}
          >
            <div style={{ flexGrow: 1, height: '1px', borderBottom: '1px dashed rgba(181, 137, 59, 0.3)', opacity: 0.8 }} />
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: '800',
              color: '#0D2A52',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              margin: 0
            }}
            className="rd-areas-title"
            >
              Our Core Research Areas
            </h3>
            <div style={{ flexGrow: 1, height: '1px', borderBottom: '1px dashed rgba(181, 137, 59, 0.3)', opacity: 0.8 }} />
          </motion.div>

          {/* 6 Cards Grid */}
          <motion.div 
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }} 
            className="rd-areas-grid"
          >
            {Object.keys(RESEARCH_DETAILS).map((key, idx) => {
              const res = RESEARCH_DETAILS[key];
              return (
                <motion.div key={key} variants={cardVariants} style={{ display: 'flex', height: '100%' }}>
                  <motion.div
                    onClick={() => setSelectedResearch(key)}
                    style={{ 
                      background: 'white', 
                      border: '1px solid rgba(13,42,82,0.08)', 
                      borderTop: '3px solid #0D2A52', 
                      borderRadius: '16px', 
                      padding: '30px 24px', 
                      cursor: 'pointer', 
                      transition: 'all 0.3s ease', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: '14px', 
                      textAlign: 'center', 
                      height: '100%',
                      width: '100%',
                      boxShadow: '0 4px 16px rgba(13,42,82,0.02)'
                    }}
                    whileHover={{ 
                      y: -6, 
                      borderTopColor: '#B5893B',
                      boxShadow: '0 16px 36px rgba(13,42,82,0.08)',
                      borderColor: 'rgba(13,42,82,0.14)'
                    }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(181,137,59,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {res.icon}
                    </div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0D2A52', margin: '4px 0 0 0', lineHeight: 1.3, fontFamily: 'Syne, var(--font-serif)' }}>{res.title}</h4>
                    <p style={{ fontSize: '12.5px', color: '#4b5563', lineHeight: 1.6, margin: 0, fontFamily: 'var(--font-sans)' }}>{res.shortDesc}</p>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#B5893B', paddingTop: '8px' }}>
                      <span>Learn Science</span>
                      <ArrowRight size={12} />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom shelves graphic banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        >
          <img 
            src="/rd_shelves.png"
            alt="Where Science Creates Beauty" 
            style={{ width: '100%', height: 'auto', borderRadius: '16px', display: 'block', boxShadow: '0 8px 32px rgba(13,42,82,0.05)' }}
          />
        </motion.div>
      </div>

      {/* Research Detail Modal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedResearch && (() => {
            const res = RESEARCH_DETAILS[selectedResearch];
            return (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedResearch(null)} 
                className="egc-modal-overlay"
              >
                <motion.div 
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                  onClick={e => e.stopPropagation()} 
                  className="egc-modal-card"
                  style={{ maxWidth: '540px' }}
                >
                  <div style={{ height: '4px', background: 'linear-gradient(90deg, #0D2A52, #B5893B, #D4AF37)', flexShrink: 0 }} />
                  
                  <div className="egc-modal-body">
                    <div className="egc-modal-noimg-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div className="egc-modal-noimg-icon">
                          {res.icon}
                        </div>
                        <h2 className="egc-modal-noimg-title">{res.title}</h2>
                      </div>
                      <button onClick={() => setSelectedResearch(null)} style={{ background: 'rgba(13,42,82,0.06)', border: 'none', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', flexShrink: 0 }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,42,82,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,42,82,0.06)'}>
                        <X size={16} color="#0D2A52" />
                      </button>
                    </div>
                    
                    <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.7, marginBottom: '24px', textAlign: 'justify', fontFamily: 'var(--font-sans)' }}>
                      {res.content}
                    </p>
                    
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '16px 20px', background: 'rgba(181,137,59,0.06)', border: '1px solid rgba(181,137,59,0.12)', borderRadius: '12px' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#B5893B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: '11px', color: 'white', fontWeight: 'bold' }}>!</span>
                      </div>
                      <span style={{ fontSize: '12.5px', color: '#0D2A52', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>Clinically evaluated & scientifically verified deliverables.</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>,
        document.body
      )}

      <style dangerouslySetInnerHTML={{__html:`
        .rd-cta-btn:hover { background: #a37b34 !important; }
        @media (max-width: 1100px) {
          .rd-stats-card-overlay {
            position: relative !important;
            left: 0 !important;
            top: 0 !important;
            transform: none !important;
            margin: 20px auto 0 !important;
            width: calc(100% - 40px) !important;
            max-width: 320px !important;
          }
        }
        @media (max-width: 1024px) {
          .rd-header-container { flex-direction: column !important; }
          .rd-header-left { width: 100% !important; padding: 48px 24px !important; }
          .rd-header-right {
            width: 100% !important;
            height: 300px !important;
          }
          .rd-header-right > div {
            border-top-left-radius: 50% 20px !important;
            border-top-right-radius: 50% 20px !important;
            border-bottom-left-radius: 0 !important;
          }
          .rd-feature-strip { flex-wrap: wrap !important; gap: 14px !important; }
          .rd-feature-item { border-right: none !important; flex: 1 1 40% !important; }
        }
        @media (max-width: 680px) {
          .rd-header-left { padding: 32px 16px !important; }
          .rd-header-right { height: 220px !important; }
          #rd { padding-bottom: 56px !important; }
          .rd-areas-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .rd-feature-item { flex: 1 1 100% !important; }
        }
        @media (max-width: 420px) {
          .rd-header-left { padding: 24px 14px !important; }
          .rd-areas-grid { grid-template-columns: 1fr !important; }
          .rd-areas-title { font-size: 10px !important; letter-spacing: 1.5px !important; }
        }
      `}} />

    </section>
  );
}
