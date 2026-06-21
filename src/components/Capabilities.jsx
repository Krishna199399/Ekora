'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, FlaskConical, Building, Compass, FileText, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Data ─────────────────────────────────────────────────── */
const CAPABILITIES = [
  {
    id: 'rnd',
    num: '01',
    title: 'Cosmetic R&D & Formulation',
    img: '/photo_2026-05-30_02-33-38.jpg',
    icon: FlaskConical,
    accentColor: '#8a6bbd',
    tag: 'Science-Led',
    bullets: [
      'Customized formulation development',
      'Ingredient compatibility analysis',
      'Texture optimization & prototyping',
      'Stability testing & validation',
    ],
    fullBullets: [
      'Customized formulation development for skincare, haircare, body care, luxury cosmetics, and personal care products.',
      'Ingredient compatibility analysis to assess active ingredient synergies, chemical stability, pH compatibility, and formulation performance.',
      'Texture optimization and prototype development focused on sensory experience, absorption, spreadability, and fragrance integration.',
      'Stability testing and validation support including microbial challenge studies, freeze-thaw testing, and accelerated aging studies.',
    ],
  },
  {
    id: 'setup',
    num: '02',
    title: 'Plant Setup & Factory Planning',
    img: '/photo_2026-05-30_02-23-41.jpg',
    icon: Building,
    accentColor: '#B5893B',
    tag: 'GMP-Ready',
    bullets: [
      'Factory layout & cleanroom zoning',
      'Machinery selection & utility planning',
      'Workflow optimization',
      'Production infrastructure support',
    ],
    fullBullets: [
      'Factory layout development aligned with GMP and ISO 22716 manufacturing requirements.',
      'Machinery selection and utility planning including automated mixers, homogenizers, filling lines, water treatment systems.',
      'Workflow optimization through intelligent zoning, material movement planning, storage management, and contamination control.',
      'Production infrastructure planning covering pilot laboratories, QC facilities, HVAC systems, and cleanrooms.',
    ],
  },
  {
    id: 'turnkey',
    num: '03',
    title: 'Turnkey Project Solutions',
    img: '/photo_2026-05-30_02-23-54.jpg',
    icon: Compass,
    accentColor: '#0D2A52',
    tag: 'End-to-End',
    bullets: [
      'End-to-end project execution',
      'Vendor coordination & install support',
      'Commercial production setup',
      'Operational planning & training',
    ],
    fullBullets: [
      'Complete project management from facility planning and construction through commercial production readiness.',
      'Vendor coordination, equipment sourcing, installation oversight, validation support, and commissioning assistance.',
      'Commercial production scale-up from laboratory prototypes to large-volume manufacturing operations.',
      'SOP development, workforce training, operational planning, safety systems, and quality management frameworks.',
    ],
  },
  {
    id: 'compliance',
    num: '04',
    title: 'Regulatory & FDA Compliance',
    img: '/photo_2026-05-30_02-24-14.jpg',
    icon: FileText,
    accentColor: '#D4AF37',
    tag: 'FDA Ready',
    bullets: [
      'Cosmetic compliance documentation',
      'Product registration guidance',
      'Label review & claim verification',
      'Export documentation & coordination',
    ],
    fullBullets: [
      'Preparation of Product Information Files (PIF), ingredient safety assessments, and technical documentation.',
      'Guidance for FDA facility registrations, MoCRA compliance, CDSCO registrations, and international market approvals.',
      'Label review and claims verification to ensure regulatory compliance and consumer transparency.',
      'Export documentation support including Free Sale Certificates, MSDS documentation, and customs requirements.',
    ],
  },
];

export default function Capabilities() {
  const [activeCap, setActiveCap] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
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
    <section id="capabilities" style={{ background: '#FAF9F7', padding: 0, borderBottom: '1px solid rgba(181,137,59,0.1)', position: 'relative', overflow: 'hidden' }}>

      {/* ─── Header Section ─── */}
      <div style={{ position: 'relative', width: '100%', minHeight: '520px', display: 'flex', overflow: 'hidden' }} className="cap-header-container">
        
        {/* LEFT COLUMN: text description */}
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
          className="cap-header-left"
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
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#B5893B', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>Our Capabilities</span>
            </motion.div>

            {/* Heading */}
            <motion.h2 
              variants={itemVariants}
              style={{ 
                fontFamily: 'Syne, var(--font-serif)', 
                fontSize: 'clamp(36px, 4.5vw, 60px)', 
                color: '#0D2A52', 
                fontWeight: 800, 
                lineHeight: 1.1, 
                margin: 0, 
                letterSpacing: '-0.5px' 
              }}
            >
              Full-Scale Cosmetic<br />Advisory
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

            {/* Paragraph description */}
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
              We support the complete cosmetic product lifecycle from concept development and formulation engineering to manufacturing setup, production planning and regulatory support.
            </motion.p>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Soft-blended image */}
        <div 
          style={{ 
            width: '55%', 
            position: 'relative', 
            overflow: 'hidden', 
            borderTopLeftRadius: '320px 50%', 
            borderBottomLeftRadius: '320px 50%', 
            zIndex: 5 
          }} 
          className="cap-header-right"
        >
          <motion.img 
            src="/services_hero.png" 
            alt="EGC Capabilities Dropper Laboratory"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              objectPosition: 'center'
            }} 
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          
          {/* Soft-blended gradient mask on the left boundary */}
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
      </div>

      {/* ─── Cards Grid Section ─── */}
      <div style={{ background: '#FAF9F7', padding: '48px 0 60px 0', position: 'relative' }}>
        {/* Dot pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(13,42,82,0.03) 1px, transparent 1px)', backgroundSize: '26px 26px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }} className="cap-cards-pad">
          
          {/* Section label */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={scrollFadeIn} style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '2px', background: '#0D2A52', borderRadius: '1.5px' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0D2A52', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>What We Do</span>
              <div style={{ width: '28px', height: '2px', background: '#0D2A52', borderRadius: '1.5px' }} />
            </div>
            <h3 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#0D2A52', fontWeight: 800, margin: 0 }}>
              Our Core <span style={{ color: '#B5893B' }}>Service Areas</span>
            </h3>
          </motion.div>

          {/* Cards container */}
          <motion.div 
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} 
            className="cap-cards-grid"
          >
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              const isHovered = hoveredCard === cap.id;
              return (
                <motion.div 
                  key={cap.id} 
                  variants={cardVariants}
                  style={{ display: 'flex', height: '100%' }}
                >
                  <motion.div
                    onMouseEnter={() => setHoveredCard(cap.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      background: 'white',
                      border: '1px solid rgba(13,42,82,0.06)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      height: '100%',
                      boxShadow: '0 4px 16px rgba(13,42,82,0.02)',
                    }}
                    whileHover={{
                      y: -6,
                      borderColor: 'rgba(181,137,59,0.25)',
                      boxShadow: '0 16px 36px rgba(13,42,82,0.08)'
                    }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  >
                    {/* Image block */}
                    <div style={{ height: '150px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      <motion.img 
                        src={cap.img} 
                        alt={cap.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Image dark vignette */}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,42,82,0.3) 0%, transparent 50%)' }} />
                      
                      {/* Top right tag label */}
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(181,137,59,0.95)', color: 'white', borderRadius: '4px', padding: '3px 8px', fontWeight: 700, fontSize: '9px', letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                        {cap.tag}
                      </div>


                    </div>

                    {/* Content body */}
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', flexGrow: 1 }}>
                      {/* Title & icon */}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <motion.div 
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '10px', 
                            background: `rgba(${cap.accentColor === '#0D2A52' ? '13,42,82' : cap.accentColor === '#B5893B' ? '181,137,59' : cap.accentColor === '#D4AF37' ? '212,175,55' : '138,107,189'}, 0.1)`, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            flexShrink: 0, 
                            border: `1px solid ${cap.accentColor}18` 
                          }}
                          animate={{ 
                            backgroundColor: isHovered ? cap.accentColor : `rgba(${cap.accentColor === '#0D2A52' ? '13,42,82' : cap.accentColor === '#B5893B' ? '181,137,59' : cap.accentColor === '#D4AF37' ? '212,175,55' : '138,107,189'}, 0.1)`,
                            scale: isHovered ? 1.06 : 1
                          }}
                          transition={{ duration: 0.25 }}
                        >
                          <Icon size={18} style={{ color: isHovered ? 'white' : cap.accentColor }} />
                        </motion.div>
                        <h3 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: '15.5px', fontWeight: 800, color: '#0D2A52', margin: 0, lineHeight: 1.3 }}>
                          {cap.title}
                        </h3>
                      </div>

                      {/* Quick bullets */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', flexGrow: 1 }}>
                        {cap.bullets.map((b, i) => (
                          <div key={i} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start', fontSize: '13px', color: '#555555', lineHeight: 1.4, fontFamily: 'var(--font-sans)' }}>
                            <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: isHovered ? 'rgba(181,137,59,0.12)' : 'rgba(13,42,82,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px', transition: 'background 0.2s' }}>
                              <Check size={10} style={{ color: '#B5893B' }} />
                            </div>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>

                      {/* Card separator */}
                      <div style={{ height: '1px', background: 'rgba(13,42,82,0.06)', margin: '0 -4px' }} />

                      {/* Card CTA */}
                      <motion.button
                        onClick={() => setActiveCap(cap.id)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', background: isHovered ? '#0D2A52' : 'rgba(13,42,82,0.03)', color: isHovered ? 'white' : '#0D2A52', border: `1.5px solid ${isHovered ? '#0D2A52' : 'rgba(13,42,82,0.08)'}`, borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-sans)', width: '100%' }}
                        animate={{
                          backgroundColor: isHovered ? '#0D2A52' : 'rgba(13,42,82,0.03)',
                          borderColor: isHovered ? '#0D2A52' : 'rgba(13,42,82,0.08)',
                          color: isHovered ? '#fff' : '#0D2A52'
                        }}
                      >
                        <span>View Full Scope</span>
                        <ChevronRight size={14} style={{ transition: 'transform 0.2s', transform: isHovered ? 'translateX(3px)' : 'none' }} />
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeCap && (() => {
            const cap = CAPABILITIES.find(c => c.id === activeCap);
            const Icon = cap.icon;
            return (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveCap(null)} 
                className="egc-modal-overlay"
              >
                <motion.div 
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                  onClick={e => e.stopPropagation()} 
                  className="egc-modal-card"
                  style={{ maxWidth: '580px' }}
                >
                  <div style={{ height: '4px', background: 'linear-gradient(90deg, #0D2A52, #B5893B, #D4AF37)', flexShrink: 0 }} />
                  
                  {/* Image header */}
                  <div className="egc-modal-header-img">
                    <img src={cap.img} alt={cap.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,42,82,0.8) 0%, rgba(13,42,82,0.2) 50%, transparent 100%)' }} />
                    <div className="egc-modal-header-content">
                      <h2 className="egc-modal-title">{cap.title}</h2>
                      <button onClick={() => setActiveCap(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', cursor: 'pointer', width: '34px', height: '34px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', flexShrink: 0 }}>
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable body */}
                  <div className="egc-modal-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: `${cap.accentColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${cap.accentColor}25`, flexShrink: 0 }}>
                        <Icon size={16} style={{ color: cap.accentColor }} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#B5893B', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'var(--font-sans)' }}>Core Advisory Deliverables</span>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {cap.fullBullets.map((bullet, i) => (
                        <div key={i} className="egc-modal-bullet-item">
                          <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(181,137,59,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                            <Check size={12} style={{ color: '#B5893B' }} />
                          </div>
                          <span style={{ fontSize: '13.5px', color: '#374151', lineHeight: 1.6, fontFamily: 'var(--font-sans)', textAlign: 'justify' }}>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>,
        document.body
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .cap-header-container { flex-direction: column !important; }
          .cap-header-left { width: 100% !important; padding: 48px 24px !important; }
          .cap-header-right {
            width: 100% !important;
            height: 300px !important;
            border-top-left-radius: 50% 20px !important;
            border-top-right-radius: 50% 20px !important;
            border-bottom-left-radius: 0 !important;
          }
          .cap-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .cap-header-left { padding: 32px 16px !important; }
          .cap-header-right { height: 230px !important; }
          .cap-cards-pad { padding-left: 16px !important; padding-right: 16px !important; }
          .cap-cards-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          #capabilities { padding-bottom: 56px !important; }
        }
        @media (max-width: 420px) {
          .cap-header-left { padding: 24px 14px !important; }
          .cap-header-right { height: 190px !important; }
        }

      `}} />
    </section>
  );
}
