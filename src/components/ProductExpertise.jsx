'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { X, ArrowRight, Check, ChevronRight, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Data ────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    key: 'skincare',
    label: 'Skincare',
    emoji: '✨',
    bgImg: '/cat_skincare.png',
    title: 'Skincare Formulations',
    desc: 'Clinical, aesthetic, and botanical formulations built with highly stable active ingredients for superior skin performance.',
    items: [
      { name: 'Anti-Aging Serums', desc: 'Retinol, Bakuchiol, and Peptide delivery systems.' },
      { name: 'Barrier Repair Creams', desc: 'Ceramide NP, Squalane, and Niacinamide emulsions.' },
      { name: 'Hydrating Boosters', desc: 'Multi-weight Hyaluronic Acid and Glycerin complexes.' },
      { name: 'Brightening Treatments', desc: 'Vitamin C (Ascorbic Acid) and Kojic Acid stable formulations.' },
    ]
  },
  {
    key: 'haircare',
    label: 'Haircare',
    emoji: '💧',
    bgImg: '/cat_haircare.png',
    title: 'Haircare Formulations',
    desc: 'Scalp therapies, nourishing conditioners, and styling science engineered for visible efficacy and sensory appeal.',
    items: [
      { name: 'Scalp Revitalizing Serums', desc: 'Caffeine, Peptides, and Rosemary scalp treatments.' },
      { name: 'Deep Conditioning Masks', desc: 'Keratin, Argan Oil, and Amino Acid complex reconstructors.' },
      { name: 'Sulfate-Free Shampoos', desc: 'Mild surfactants (Glucosides, Isethionates) that protect hair dye.' },
      { name: 'Anti-Frizz Oils', desc: 'Lightweight silicone-free dry oils with botanical esters.' },
    ]
  },
  {
    key: 'bodycare',
    label: 'Body Care',
    emoji: '🌿',
    bgImg: '/cat_bodycare.png',
    title: 'Bodycare Formulations',
    desc: 'Sensory-driven formulations developed for body wellness and daily care routines that delight users.',
    items: [
      { name: 'Smoothing Body Lotions', desc: 'Salicylic Acid (BHA) and Lactic Acid (AHA) enriched lotions.' },
      { name: 'Calming Massage Oils', desc: 'Lavender, Centella Asiatica, and Sweet Almond blends.' },
      { name: 'Nourishing Body Butters', desc: 'Shea Butter and Cocoa Butter-rich moisturising systems.' },
      { name: 'Exfoliating Body Scrubs', desc: 'Sugar and salt-based exfoliators with rinse-off technology.' },
    ]
  },
  {
    key: 'luxury',
    label: 'Luxury',
    emoji: '👑',
    bgImg: '/cat_luxury.png',
    title: 'Luxury & Premium Cosmetics',
    desc: 'Premium cosmetic formulations featuring rare botanicals and elevated sensory experiences for discerning consumers.',
    items: [
      { name: '24K Gold Cellular Serums', desc: 'Gold-infused serums with Coenzyme Q10 and Rose Distillate.' },
      { name: 'Bio-Fermented Elixirs', desc: 'Fermented actives designed for advanced skin conditioning.' },
      { name: 'Silk Protein Night Creams', desc: 'Rich creams infused with silk proteins and orchid extracts.' },
      { name: 'Premium Face Oils', desc: 'Squalane, Rosehip, and Marula oil blends for enhanced radiance.' },
    ]
  },
  {
    key: 'lipcare',
    label: 'Lip Care',
    emoji: '💋',
    bgImg: '/cat_color.png',
    title: 'Lipcare Collection',
    desc: 'Nourishing lip treatments that combine hydration, protection, and color with advanced skincare benefits.',
    items: [
      { name: 'Hydrating Lip Balms', desc: 'Nourishing balms with Shea Butter, Vitamin E, and SPF protection.' },
      { name: 'Tinted Lip Oils', desc: 'Lightweight oils enriched with jojoba, avocado, and peptide complexes.' },
      { name: 'Plumping Lip Serums', desc: 'Advanced formulas with hyaluronic acid and mint extracts.' },
      { name: 'Matte Lip Creams', desc: 'Long-wearing color with moisturizing ceramides and botanical oils.' },
    ]
  },
];

const INDUSTRY_ITEMS = [
  { key: 'd2c', title: 'D2C Beauty Brands', desc: 'Accelerate product launches through stable formulation libraries, ingredient sourcing support, and commercialization planning.' },
  { key: 'dermatology', title: 'Dermatology Companies', desc: 'Clinical cosmetic formulations centered around dermatologist-backed active ingredients and scientific validation.' },
  { key: 'wellness', title: 'Wellness & Ayurveda', desc: 'Traditional botanical knowledge with modern formulation science to create clean, effective, scalable wellness products.' },
  { key: 'spa', title: 'Spa & Salon Chains', desc: 'Professional-grade products for treatment rooms, salons, spas, and wellness centers with superior sensory appeal.' },
  { key: 'ecommerce', title: 'Ecommerce Brands', desc: 'Private label development, manufacturing strategies, and scalable production systems for high-growth brands.' },
  { key: 'pharma', title: 'Pharma Companies', desc: 'Advanced cosmetic product development, cleanroom manufacturing strategies, and regulatory-focused production.' },
  { key: 'retail', title: 'Luxury Retail Chains', desc: 'Premium beauty concepts supported by sophisticated formulations and prestige product positioning.' },
];

export default function ProductExpertise() {
  const [activeTab, setActiveTab] = useState('skincare');
  const [showFullCatalog, setShowFullCatalog] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeCat = CATEGORIES.find(c => c.key === activeTab);

  // Variants
  const scrollFadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.08, duration: 0.7, ease: 'easeOut' }
    })
  };

  const gridVariants = {
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
    <section id="expertise" style={{ background: '#FAF9F7', padding: 0, borderBottom: '1px solid rgba(181,137,59,0.1)', position: 'relative', overflow: 'hidden' }}>

      {/* ─── Header Section (Curved Split) ─── */}
      <div style={{ position: 'relative', width: '100%', minHeight: '520px', display: 'flex', overflow: 'hidden' }} className="pe-header-container">
        
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
          className="pe-header-left"
        >
          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            {/* Eyebrow */}
            <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '2px', background: '#B5893B', borderRadius: '1px' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#B5893B', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>Product Expertise</span>
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
              Formulation Mastery<br />Across Categories
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
              Our formulation laboratory develops innovative cosmetic and personal care products across multiple beauty, wellness, and consumer care categories for emerging brands, manufacturers, and global beauty businesses.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants} style={{ marginTop: '6px' }}>
              <Link
                href="/product-expertise/"
                className="pe-cta-btn"
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
                View Complete Product Catalog →
              </Link>
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
          className="pe-header-right"
        >
          <motion.img 
            src="/pe_hero_banner.png" 
            alt="EGC Product Expertise Formulation Cosmetics"
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

      {/* ─── Category Explorer ─── */}
      <div style={{ background: '#FAF9F7', position: 'relative', overflow: 'hidden', paddingBottom: '64px' }}>
        
        {/* Subtle dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(181,137,59,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        {/* Section header */}
        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '48px 40px 0', position: 'relative', zIndex: 2 }} className="pe-pad">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={scrollFadeIn} style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '2px', background: '#B5893B', borderRadius: '1.5px' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#B5893B', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>Category Explorer</span>
              <div style={{ width: '28px', height: '2px', background: '#B5893B', borderRadius: '1.5px' }} />
            </div>
            <h3 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: 'clamp(24px, 3vw, 38px)', color: '#0D2A52', fontWeight: 800, margin: 0 }}>
              Browse Our <span style={{ color: '#B5893B' }}>Formulation</span> Portfolio
            </h3>
          </motion.div>

          {/* Tab pills */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={scrollFadeIn} style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            {CATEGORIES.map(cat => {
              const isSelected = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  style={{
                    padding: '11px 24px',
                    borderRadius: '50px',
                    border: '2px solid rgba(181, 137, 59, 0.25)',
                    background: isSelected ? 'linear-gradient(135deg, #B5893B, #D4AF37)' : 'white',
                    color: isSelected ? '#fff' : '#0D2A52',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    fontFamily: 'var(--font-sans)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: isSelected ? '0 6px 20px rgba(181,137,59,0.3)' : '0 2px 10px rgba(13,42,82,0.03)',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = '#B5893B'; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(181, 137, 59, 0.25)'; }}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Active category panel */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'relative', width: '100%', minHeight: '520px', overflow: 'hidden' }}
          >
            {/* Background image */}
            <img
              src={activeCat.bgImg}
              alt={activeCat.title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
            />

            {/* Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(250,249,247,0.96) 0%, rgba(250,249,247,0.90) 45%, rgba(250,249,247,0.5) 70%, transparent 100%)', zIndex: 1 }} />

            {/* Content layout */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '1340px', margin: '0 auto', padding: '60px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="pe-cat-grid">

              {/* Left text and items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(181,137,59,0.15)', border: '1px solid rgba(181,137,59,0.3)', borderRadius: '50px', width: 'fit-content' }}>
                  <Layers size={13} style={{ color: '#b5893b' }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#b5893b', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>{activeCat.label}</span>
                </div>
                <h3 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: 'clamp(24px, 3vw, 40px)', color: '#0D2A52', fontWeight: 800, margin: 0, lineHeight: 1.15 }}>{activeCat.title}</h3>
                <div style={{ width: '40px', height: '2.5px', background: 'linear-gradient(90deg, #B5893B, #D4AF37)', borderRadius: '2px' }} />
                <p style={{ fontSize: '14.5px', color: '#555555', lineHeight: 1.7, margin: 0, fontFamily: 'var(--font-sans)' }}>{activeCat.desc}</p>

                {/* Sub-products checklist items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
                  {activeCat.items.map((item, i) => (
                    <motion.div 
                      key={i} 
                      style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 16px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(181,137,59,0.15)', borderRadius: '12px', backdropFilter: 'blur(4px)', transition: 'all 0.25s ease' }}
                      whileHover={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderColor: '#B5893B',
                        x: 4
                      }}
                    >
                      <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(181,137,59,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                        <Check size={12} style={{ color: '#B5893B' }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0D2A52', marginBottom: '2px', fontFamily: 'Syne, var(--font-serif)' }}>{item.name}</div>
                        <div style={{ fontSize: '12.5px', color: '#6b7280', lineHeight: 1.45, fontFamily: 'var(--font-sans)' }}>{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right overlay block */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(181, 137, 59, 0.25)', borderRadius: '24px', padding: '36px 32px', maxWidth: '380px', width: '100%', boxShadow: '0 24px 64px rgba(13,42,82,0.08)' }}>
                  <div style={{ height: '3px', background: 'linear-gradient(90deg, #B5893B, #D4AF37)', borderRadius: '2px', marginBottom: '28px' }} />
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#B5893B', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', fontFamily: 'var(--font-sans)' }}>Why EGC</div>
                  <div style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 800, color: '#0D2A52', fontFamily: 'Syne, var(--font-serif)', lineHeight: 1.3, marginBottom: '20px' }}>
                    Science-Backed.<br />Market-Ready.
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {['Stable multi-climate formulations', 'Custom fragrance & texture profiles', 'Clean / vegan / cruelty-free options', 'Scale from 100 to 100,000 units'].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', flexShrink: 0 }} />
                        <span style={{ fontSize: '13px', color: '#4a5568', fontFamily: 'var(--font-sans)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '28px', padding: '20px', background: 'rgba(181,137,59,0.08)', border: '1px solid rgba(181,137,59,0.2)', borderRadius: '14px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: '32px', fontWeight: 900, color: '#B5893B' }}>500+</div>
                    <div style={{ fontSize: '11px', color: '#7c728a', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>Formulations Delivered</div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Industries We Serve (Cream BG) ─── */}
      <div style={{ background: '#FAF9F7', padding: '48px 0 60px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(13,42,82,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }} className="pe-pad">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={scrollFadeIn} style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '2px', background: '#0D2A52', borderRadius: '1.5px' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0D2A52', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>Industries We Serve</span>
              <div style={{ width: '28px', height: '2px', background: '#0D2A52', borderRadius: '1.5px' }} />
            </div>
            <h3 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#0D2A52', fontWeight: 800, margin: 0 }}>
              Who We <span style={{ color: '#B5893B' }}>Partner With</span>
            </h3>
          </motion.div>
          
          <motion.div 
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }} 
            className="pe-industry-grid"
          >
            {INDUSTRY_ITEMS.map((ind) => (
              <motion.div 
                key={ind.key} 
                variants={itemVariants}
                style={{ display: 'flex', height: '100%' }}
              >
                <motion.div
                  style={{ background: 'white', border: '1px solid rgba(13,42,82,0.08)', borderTop: '3px solid #0D2A52', borderRadius: '16px', padding: '24px', cursor: 'default', boxShadow: '0 4px 16px rgba(13,42,82,0.03)', transition: 'all 0.3s ease', height: '100%', width: '100%' }}
                  whileHover={{ borderTopColor: '#B5893B', y: -5, boxShadow: '0 16px 40px rgba(13,42,82,0.1)', borderColor: 'rgba(181,137,59,0.15)' }}
                >
                  <h4 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: '15px', fontWeight: 700, color: '#0D2A52', margin: '0 0 10px 0' }}>{ind.title}</h4>
                  <p style={{ fontSize: '12.5px', color: '#6b7280', lineHeight: 1.6, margin: 0, fontFamily: 'var(--font-sans)', textAlign: 'justify' }}>{ind.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showFullCatalog && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFullCatalog(false)} 
              className="egc-modal-overlay"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                onClick={e => e.stopPropagation()} 
                className="pe-catalog-modal-card"
              >
                <div style={{ height: '4px', background: 'linear-gradient(90deg, #0D2A52, #B5893B, #D4AF37)' }} />
                <div className="pe-catalog-modal-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                    <h2 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: '22px', color: '#0D2A52', fontWeight: 800, margin: 0 }}>Complete Formulation Catalog</h2>
                    <button onClick={() => setShowFullCatalog(false)} style={{ background: 'rgba(13,42,82,0.07)', border: 'none', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={18} color="#0D2A52" />
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="pe-catalog-modal-grid">
                    {CATEGORIES.map((cat) => (
                      <div key={cat.key} style={{ border: '1px solid rgba(13,42,82,0.08)', borderTop: '3px solid #0D2A52', borderRadius: '14px', overflow: 'hidden' }}>
                        <div style={{ height: '100px', overflow: 'hidden', position: 'relative' }}>
                          <img src={cat.bgImg} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,42,82,0.7) 0%, transparent 60%)' }} />
                          <div style={{ position: 'absolute', bottom: '10px', left: '14px', fontFamily: 'Syne, var(--font-serif)', fontSize: '15px', fontWeight: 800, color: 'white' }}>{cat.title}</div>
                        </div>
                        <div style={{ padding: '16px' }}>
                          {cat.items.map((item, ii) => (
                            <div key={ii} style={{ display: 'flex', gap: '8px', alignItems: 'start', padding: '7px 0', borderBottom: ii < cat.items.length - 1 ? '1px solid rgba(13,42,82,0.05)' : 'none' }}>
                              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#B5893B', flexShrink: 0, marginTop: '6px' }} />
                              <span style={{ fontSize: '13px', color: '#4a5568', lineHeight: 1.4, fontFamily: 'var(--font-sans)' }}>{item.name}</span>
                            </div>
                          ))}
                        </div>
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
        .pe-cta-btn:hover { background: #a37b34 !important; }
        @media (max-width: 1024px) {
          .pe-header-container { flex-direction: column !important; }
          .pe-header-left { width: 100% !important; padding: 48px 24px !important; }
          .pe-header-right {
            width: 100% !important;
            height: 300px !important;
            border-top-left-radius: 50% 20px !important;
            border-top-right-radius: 50% 20px !important;
            border-bottom-left-radius: 0 !important;
            border-left: none !important;
          }
          .pe-cat-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 680px) {
          .pe-header-left { padding: 32px 16px !important; }
          .pe-header-right { height: 220px !important; }
          .pe-pad { padding-left: 16px !important; padding-right: 16px !important; }
          .pe-cat-grid { padding: 32px 16px !important; }
          .pe-industry-grid { grid-template-columns: 1fr !important; }
          .pe-catalog-modal-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 420px) {
          .pe-header-left { padding: 24px 14px !important; }
          .pe-header-right { height: 180px !important; }
        }
      `}} />

    </section>
  );
}
