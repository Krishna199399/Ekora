'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Wrench, Factory, Activity, ClipboardList, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FACTORY_DETAILS = {
  boutique: {
    title: 'Boutique R&D Plant',
    capacity: '5,000 - 10,000 bottles/day',
    img: '/fac_boutique.png',
    icon: <Wrench size={24} style={{ color: '#b5893b' }} />,
    specs: {
      area: '2,500 - 5,000 sq. ft.',
      cleanroom: 'ISO 8 (Class 100,000) compounding; ISO 7 (Class 10,000) filling.',
      machinery: 'Semi-automated vacuum mixers (100L-300L), manual nozzle liquid/cream filling, tabletop capping, manual carton labelers.',
      timeline: '4 - 6 months from blueprint to validation.'
    },
    useCase: 'Ideal for pilot batches, clinical product testing, startup brand runs, and low-volume premium cosmetic formulations.'
  },
  manufacturing: {
    title: 'Cosmetic Manufacturing Plant',
    capacity: '10,000 - 50,000 bottles/day',
    img: '/fac_cosmetic.png',
    icon: <Factory size={24} style={{ color: '#b5893b' }} />,
    specs: {
      area: '10,000 - 25,000 sq. ft.',
      cleanroom: 'ISO 8 compounding; ISO 7 positive pressure filling rooms with centralized HEPA filter HVAC systems.',
      machinery: 'Automated compounding vacuum emulsifiers (500L-1000L), multi-nozzle rotary filling, inline capping & induction sealing, automated labeling.',
      timeline: '8 - 10 months from blueprint to validation.'
    },
    useCase: 'Best for growing D2C brands, contract manufacturers, and companies looking to automate compounding and primary packaging flows.'
  },
  industrial: {
    title: 'Global Industrial Plant',
    capacity: '50,000 - 100,000+ bottles/day',
    img: '/fac_industrial.png',
    icon: <Activity size={24} style={{ color: '#b5893b' }} />,
    specs: {
      area: '40,000 - 100,000+ sq. ft.',
      cleanroom: 'Full ISO 7/8 pharmaceutical-grade cosmetic cleanrooms with air showers, sanitizing vestibules, and centralized HVAC zoning.',
      machinery: 'Industrial compounding suites (2000L-5000L), automated tube fillers, high-speed cartoning lines, robotic case packing, centralized RO water loops.',
      timeline: '12 - 18 months from blueprint to validation.'
    },
    useCase: 'Designed for MNC brands, large private label conglomerates, and multinational chemical exporters.'
  },
  turnkey: {
    title: 'Turnkey Project Execution',
    capacity: 'End-to-End Service',
    img: '/fac_turnkey.png',
    icon: <ClipboardList size={24} style={{ color: '#b5893b' }} />,
    specs: {
      area: 'Varies by plant scale.',
      cleanroom: 'Design, installation, ducting, testing, and validation certification.',
      machinery: 'Supplier identification, FAT/SAT coordination, calibration verification, and chemical start-up calibration.',
      timeline: 'Coordinates with plant scale milestones.'
    },
    useCase: 'For brands that want a single advisory partner to handle soil testing, architectural mapping, civil engineering oversight, HVAC installation, equipment sourcing, and FDA/BIS validation audits.'
  }
};

const DELIVERABLES = [
  'GMP & ISO Compliant Factories',
  'Advanced Cleanroom & HVAC Systems',
  'Water Treatment & Utility Systems',
  'Automated Manufacturing Lines',
  'Quality Control & Microbiology Labs',
  'Documentation & Compliance Support',
  'Training, Handover & Post-Launch Support'
];

export default function FactorySetup() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showFullSpecs, setShowFullSpecs] = useState(false);
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
    hidden: { opacity: 0, y: 24, scale: 0.98 },
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
    <section id="factory" style={{
      background: '#FAF9F7',
      padding: '0 0 60px 0',
      borderBottom: '1px solid rgba(181, 137, 59, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* ─── Header Section (Curved Split) ─── */}
      <div style={{ position: 'relative', width: '100%', minHeight: '520px', display: 'flex', overflow: 'hidden' }} className="fac-header-container">
        
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
          className="fac-header-left"
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
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#B5893B', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>Factory Setup Planning</span>
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
              State-of-the-Art<br />Factory Blueprinting
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
              We design and build world class cosmetic manufacturing facilities aligned with GMP and ISO standards  while optimizing workflow efficiency, cleanroom zoning, utility planning, and scalable production capacity for future growth.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants} style={{ marginTop: '6px' }}>
              <button
                onClick={() => setShowFullSpecs(true)}
                className="fac-cta-btn"
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
                View Factory Setup Solutions →
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Curved Image */}
        <div 
          style={{ 
            width: '55%', 
            position: 'relative', 
            overflow: 'hidden', 
            borderTopLeftRadius: '320px 50%', 
            borderBottomLeftRadius: '320px 50%', 
            zIndex: 5 
          }} 
          className="fac-header-right"
        >
          <motion.img 
            src="/ChatGPT Image Jun 1, 2026, 07_14_44 PM.png" 
            alt="EGC Factory Setup Sterile Emulsifying Systems"
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

      {/* Factory Solutions & Checklist Grid */}
      <div style={{ 
        maxWidth: '1340px', 
        margin: '48px auto 0', 
        padding: '0 40px',
        display: 'flex', 
        flexDirection: 'column', 
        gap: '32px' 
      }}>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollFadeIn}
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div style={{ width: '28px', height: '2.5px', background: '#0D2A52', borderRadius: '2px' }} />
          <h3 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: '26px', color: '#0D2A52', margin: 0, fontWeight: 700 }}>
            Our Factory Solutions
          </h3>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '40px' }} className="factory-body-grid">

          {/* 4 Plant Scale Cards */}
          <motion.div 
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} 
            className="plant-cards-grid"
          >
            {Object.keys(FACTORY_DETAILS).map((key, idx) => {
              const plant = FACTORY_DETAILS[key];
              return (
                <motion.div key={key} variants={cardVariants} style={{ display: 'flex', height: '100%' }}>
                  <motion.div
                    onClick={() => setSelectedPlant(key)}
                    style={{ 
                      background: 'white', 
                      border: '1px solid rgba(13,42,82,0.08)', 
                      borderTop: '3px solid #0D2A52', 
                      borderRadius: '16px', 
                      overflow: 'hidden', 
                      cursor: 'pointer', 
                      boxShadow: '0 4px 16px rgba(13,42,82,0.02)', 
                      transition: 'all 0.3s ease', 
                      textAlign: 'left', 
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    className="plant-card"
                    whileHover={{ 
                      y: -6, 
                      borderTopColor: '#B5893B',
                      boxShadow: '0 16px 36px rgba(13,42,82,0.08)',
                      borderColor: 'rgba(13,42,82,0.14)'
                    }}
                  >
                    <div style={{ height: '150px', overflow: 'hidden', position: 'relative' }}>
                      <img src={plant.img} alt={plant.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,42,82,0.4) 0%, transparent 50%)' }} />
                    </div>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0D2A52', margin: 0, fontFamily: 'Syne, var(--font-serif)' }}>{plant.title}</h4>
                      <p style={{ fontSize: '12px', color: '#B5893B', fontWeight: 700, fontFamily: 'var(--font-sans)', margin: 0 }}>Capacity: {plant.capacity}</p>
                      <p style={{ fontSize: '12.5px', color: '#4b5563', lineHeight: 1.5, margin: 0, fontFamily: 'var(--font-sans)' }}>{plant.useCase.substring(0, 95)}...</p>
                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 700, color: '#B5893B', paddingTop: '8px' }}>
                        <span>Engineering Specs</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Deliverables Checklist */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ 
              background: 'white', 
              border: '1px solid rgba(13,42,82,0.08)', 
              borderTop: '3px solid #0D2A52', 
              borderRadius: '16px', 
              padding: '32px 28px', 
              textAlign: 'left', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px', 
              boxShadow: '0 4px 16px rgba(13,42,82,0.02)',
              height: 'fit-content'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '2.5px', background: '#0D2A52', borderRadius: '2px' }} />
              <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#0D2A52', textTransform: 'uppercase', letterSpacing: '2px', margin: 0, fontFamily: 'var(--font-sans)' }}>What We Deliver</h4>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {DELIVERABLES.map((del, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(181,137,59,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                    <Check size={11} style={{ color: '#B5893B' }} />
                  </div>
                  <span style={{ color: '#0D2A52', fontWeight: 600, lineHeight: 1.4, fontFamily: 'var(--font-sans)', fontSize: '13px' }}>{del}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Plant Specification Modal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedPlant && (() => {
            const plant = FACTORY_DETAILS[selectedPlant];
            return (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPlant(null)} 
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
                  
                  <div className="egc-modal-body">
                    <div className="egc-modal-noimg-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div className="egc-modal-noimg-icon">
                          {plant.icon}
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <h2 className="egc-modal-noimg-title">{plant.title}</h2>
                          <span style={{ fontSize: '12.5px', color: '#B5893B', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>
                            Capacity: {plant.capacity}
                          </span>
                        </div>
                      </div>
                      
                      <button onClick={() => setSelectedPlant(null)} style={{ background: 'rgba(13,42,82,0.06)', border: 'none', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', flexShrink: 0 }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,42,82,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,42,82,0.06)'}>
                        <X size={16} color="#0D2A52" />
                      </button>
                    </div>
                    
                    <p style={{ fontStyle: 'italic', color: '#4b5563', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6, textAlign: 'justify', fontFamily: 'var(--font-sans)' }}>
                      "{plant.useCase}"
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {[
                        { label: 'Area Required', val: plant.specs.area },
                        { label: 'Cleanroom Standard', val: plant.specs.cleanroom },
                        { label: 'Core Machinery', val: plant.specs.machinery },
                        { label: 'Build Timeline', val: plant.specs.timeline }
                      ].map((spec, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '12px', borderBottom: i === 3 ? 'none' : '1px solid rgba(13,42,82,0.08)', paddingBottom: i === 3 ? 0 : '12px' }}>
                          <span style={{ fontWeight: '700', color: '#0D2A52', fontSize: '13px', fontFamily: 'var(--font-sans)' }}>{spec.label}</span>
                          <span style={{ color: '#4b5563', fontSize: '13px', lineHeight: '1.4', fontFamily: 'var(--font-sans)' }}>{spec.val}</span>
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

      {/* Engineering Guidelines Modal */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showFullSpecs && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFullSpecs(false)} 
              className="egc-modal-overlay"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                onClick={e => e.stopPropagation()} 
                className="egc-modal-card"
                style={{ maxWidth: '560px' }}
              >
                <div style={{ height: '4px', background: 'linear-gradient(90deg, #0D2A52, #B5893B, #D4AF37)', flexShrink: 0 }} />
                
                <div className="egc-modal-body">
                  <div className="egc-modal-noimg-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="egc-modal-noimg-icon" style={{ background: 'rgba(181, 137, 59, 0.1)' }}>
                        <Factory size={24} style={{ color: '#b5893b' }} />
                      </div>
                      <h2 className="egc-modal-noimg-title">Factory Engineering Standards</h2>
                    </div>
                    
                    <button onClick={() => setShowFullSpecs(false)} style={{ background: 'rgba(13,42,82,0.06)', border: 'none', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', flexShrink: 0 }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,42,82,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,42,82,0.06)'}>
                      <X size={16} color="#0D2A52" />
                    </button>
                  </div>
                  
                  <p style={{ fontSize: '14.5px', color: '#4b5563', lineHeight: 1.6, marginBottom: '24px', textAlign: 'justify', fontFamily: 'var(--font-sans)' }}>
                    We design and layout manufacturing facilities to strictly adhere to international quality guidelines. Every floor plan we map is optimized for material segregation, sterile compounding, and dust extraction.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                      { title: 'Material Flow (Unidirectional)', desc: 'Raw materials enter at one end, move through weighing, compounding, filling, labeling, and packing, exiting as finished goods. This completely eliminates cross-contamination.' },
                      { title: 'RO Water Purification Systems', desc: 'Water is the primary ingredient in cosmetics. We design sanitary stainless steel RO circulation loops with ozone/UV sterilization to prevent biofilm formation.' },
                      { title: 'HVAC Zoning & Pressure Differentials', desc: 'Air handling units maintain cleanroom pressure differentials and filter particulates via HEPA filters, ensuring compounding areas remain sterile.' }
                    ].map((std, i) => (
                      <div key={i} style={{ padding: '16px', background: 'rgba(13,42,82,0.02)', border: '1px solid rgba(13,42,82,0.06)', borderRadius: '12px' }}>
                        <strong style={{ color: '#0D2A52', fontSize: '13px', fontFamily: 'var(--font-sans)', display: 'block', marginBottom: '4px' }}>{std.title}</strong>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, lineHeight: 1.5, fontFamily: 'var(--font-sans)', textAlign: 'justify' }}>{std.desc}</p>
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

      <style dangerouslySetInnerHTML={{__html:`
        .fac-cta-btn:hover { background: #a37b34 !important; }
        @media (max-width: 1024px) {
          .fac-header-container { flex-direction: column !important; }
          .fac-header-left { width: 100% !important; padding: 48px 24px !important; }
          .fac-header-right {
            width: 100% !important;
            height: 300px !important;
            border-top-left-radius: 50% 20px !important;
            border-top-right-radius: 50% 20px !important;
            border-bottom-left-radius: 0 !important;
          }
        }
        @media (max-width: 991px) {
          .factory-body-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 680px) {
          .fac-header-left { padding: 32px 16px !important; }
          .fac-header-right { height: 220px !important; }
          #factory { padding-bottom: 56px !important; }
          .plant-cards-grid { grid-template-columns: 1fr !important; }
          .factory-body-grid > div { padding: 0 16px !important; }
        }
        @media (max-width: 420px) {
          .fac-header-left { padding: 24px 14px !important; }
        }
      `}} />

    </section>
  );
}
