'use client';

import React, { useState } from 'react';
import { X, Award, Globe, Database, Building2, Users, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATS_DETAILS = {
  clients: {
    title: '100+ Global Clients',
    icon: <Users size={32} style={{ color: '#b5893b' }} />,
    content: 'EGC partners with leading cosmetic startups, established D2C brands, and international luxury retail conglomerates. We guide beauty operators from concept formulation through manufacturing and regulatory compliance in global markets.'
  },
  factories: {
    title: '50+ Factories Planned',
    icon: <Building2 size={32} style={{ color: '#b5893b' }} />,
    content: 'We specialize in factory architecture and cleanroom engineering. EGC has successfully designed and scaled over 50 state of the art manufacturing plants, aligning them with global GMP, ISO 22716, and FDA guidelines.'
  },
  countries: {
    title: '20+ Countries Served',
    icon: <Globe size={32} style={{ color: '#b5893b' }} />,
    content: 'EGC has global regulatory compliance capabilities. We have successfully exported and registered products in over 20 countries, guiding brands through MoCRA (USA), CPNP (Europe), CDSCO (India), and NMPA (China) registration portals.'
  },
  team: {
    title: 'Expert R&D Team',
    icon: <Users size={32} style={{ color: '#b5893b' }} />,
    content: 'Our team comprises PhD cosmetic chemists, pharmaceutical scientists, cleanroom architects, and global regulatory officers. We invest heavily in scientific training and cleanroom design expertise.'
  },
  quality: {
    title: 'Quality Assurance Protocol',
    icon: <ShieldCheck size={32} style={{ color: '#b5893b' }} />,
    content: 'We implement rigorous QA/QC measures at every phase. From stability testing and ingredient compatibility analysis to microbial challenge testing, EGC ensures every batch exceeds international safety limits.'
  },
  standards: {
    title: 'Global Certifications',
    icon: <Award size={32} style={{ color: '#b5893b' }} />,
    content: 'We design formulations and facilities to align with ISO 9001, ISO 22716 (Cosmetic GMP), FDA Facility Registration, USDA Organic, ECOCERT COSMOS, and BIS compliance frameworks.'
  }
};

const STAT_ITEMS = [
  { key: 'clients', label: 'Global Clients', value: '100+', desc: 'Trusted by cosmetic brands and manufacturers worldwide', icon: <Users size={20} /> },
  { key: 'factories', label: 'Factories Planned', value: '50+', desc: 'GMP-compliant manufacturing blueprints and production facilities', icon: <Building2 size={20} /> },
  { key: 'countries', label: 'Countries Supported', value: '20+', desc: 'Global regulatory and export consulting expertise', icon: <Globe size={20} /> },
  { key: 'team', label: 'Expert Technical Team', value: 'Chemists', desc: 'Experienced formulation scientists and industry specialists', icon: <Users size={20} /> },
  { key: 'quality', label: 'Quality Assured Processes', value: 'Vetted', desc: 'Stable, scalable, and commercially viable product systems', icon: <ShieldCheck size={20} /> },
  { key: 'standards', label: 'Global Standards Alignment', value: 'Certified', desc: 'FDA, BIS, GMP, ISO, and international compliance frameworks', icon: <Award size={20} /> }
];

export default function AtAGlance() {
  const [selectedStat, setSelectedStat] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const firstChild = container.firstChild;
    if (firstChild) {
      const cardWidth = firstChild.offsetWidth + 16; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      if (index >= 0 && index < STAT_ITEMS.length) {
        setActiveIndex(index);
      }
    }
  };

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.7, ease: 'easeOut' }
    })
  };

  const gridContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardEntranceVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 14 }
    }
  };

  return (
    <section id="about" style={{
      background: '#FAF9F7',
      padding: '0 0 60px 0',
      borderBottom: '1px solid rgba(181, 137, 59, 0.1)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top navy accent bar */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #0D2A52, #1a4a8a, #B5893B, #D4AF37)' }} />

      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(13,42,82,0.025) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '60px 40px', display: 'flex', flexDirection: 'column', gap: '44px', position: 'relative', zIndex: 1 }}>

        {/* Main Content Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'stretch'
        }} className="glance-grid">

          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', textAlign: 'left' }}>
            {/* Eyebrow with navy bar */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              custom={0}
              variants={fadeInVariants}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <div style={{ width: '32px', height: '3px', borderRadius: '2px', background: 'linear-gradient(90deg, #0D2A52, #1a4a8a)' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0D2A52', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                EGC at a Glance
              </span>
            </motion.div>

            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              custom={1}
              variants={fadeInVariants}
              style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: 'clamp(28px, 3vw, 42px)', color: '#0D2A52', fontWeight: 700, margin: 0, lineHeight: 1.15 }}
            >
              Pioneering Cosmetic <br />
              <span style={{ color: '#B5893B' }}>Technology</span> & Factory Architecture
            </motion.h2>

            {/* Gold separator */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              custom={1.5}
              variants={fadeInVariants}
              style={{ width: '44px', height: '2.5px', background: 'linear-gradient(90deg, #B5893B, #D4AF37)', borderRadius: '2px' }} 
            />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              custom={2}
              variants={fadeInVariants}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: '#4a5568', fontSize: '15px', lineHeight: '1.75', fontFamily: 'var(--font-sans)' }}
            >
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#0D2A52' }}>Founded by entrepreneurs passionate about advancing the beauty and personal care industry</strong>, EGC Ekora Global Consulting was created to help businesses transform ideas into commercially successful products, manufacturing operations, and scalable beauty brands.
              </p>
              <p style={{ margin: 0 }}>
                From concept creation and formulation development to factory planning, production scale up, and global market expansion, we partner with cosmetic brands, startups, manufacturers, wellness companies, private label businesses, and international beauty operators.
              </p>
            </motion.div>

            {/* Quote card — navy left border */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              custom={3}
              variants={fadeInVariants}
              style={{
                padding: '22px 24px',
                background: 'linear-gradient(135deg, rgba(13,42,82,0.03), rgba(13,42,82,0.01))',
                borderLeft: '4px solid #0D2A52',
                borderRadius: '0 12px 12px 0',
                boxShadow: '0 4px 20px rgba(13,42,82,0.04)'
              }}
            >
              <p style={{ fontFamily: 'Syne, var(--font-serif)', fontStyle: 'italic', fontSize: '17px', color: '#0D2A52', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
                "A successful cosmetic product is where innovation, quality, and manufacturing excellence come together."
              </p>
            </motion.div>
          </div>

          {/* Right — Brand Collage Photo (fills full column height) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ display: 'flex', height: '100%' }}
          >
            <motion.div 
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                minHeight: '420px',
                borderRadius: '18px',
                boxShadow:
                  '0 0 0 1px rgba(200,155,60,0.15),' +
                  '0 8px 24px rgba(27,11,48,0.06),' +
                  '0 32px 60px rgba(27,11,48,0.08)',
                overflow: 'hidden',
              }}
              whileHover={{
                scale: 1.015,
                boxShadow: 
                  '0 0 0 1.5px rgba(200,155,60,0.35),' +
                  '0 12px 32px rgba(27,11,48,0.10),' +
                  '0 40px 72px rgba(27,11,48,0.13)'
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            >
              <img
                src="/egc_collage.png"
                alt="EGC Cosmetic Science — products, laboratory and factory blueprint collage"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
              {/* Subtle vignette overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, rgba(200,155,60,0.03) 0%, transparent 50%),' +
                  'linear-gradient(to bottom, transparent 65%, rgba(27,11,48,0.08) 100%)',
                pointerEvents: 'none',
              }} />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats Grid */}
        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          onScroll={handleScroll}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '14px',
            marginTop: '8px'
          }} 
          className="stat-items-grid"
        >
          {STAT_ITEMS.map((item) => (
            <motion.div 
              key={item.key} 
              variants={cardEntranceVariants}
              style={{ display: 'flex', width: '100%', minWidth: 0 }}
            >
              <motion.div
                onClick={() => setSelectedStat(item.key)}
                style={{
                  background: 'white',
                  border: '1px solid rgba(13,42,82,0.08)',
                  borderTop: '3px solid #0D2A52',
                  borderRadius: '14px',
                  padding: '22px 14px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 16px rgba(13,42,82,0.03)',
                  overflow: 'hidden',
                  width: '100%',
                  minWidth: 0,
                }}
                whileHover={{
                  borderTopColor: '#B5893B',
                  y: -5,
                  boxShadow: '0 12px 30px rgba(13,42,82,0.12)',
                  borderColor: 'rgba(181, 137, 59, 0.2)'
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                className="stat-card"
              >
                <div style={{ color: '#B5893B', width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(181,137,59,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2px' }}>
                  {item.icon}
                </div>
                <span style={{ 
                  fontFamily: 'Syne, var(--font-serif)', 
                  fontSize: /^[0-9+]+$/.test(item.value) ? 'clamp(18px, 2vw, 26px)' : 'clamp(13px, 1.4vw, 18px)', 
                  fontWeight: 800, 
                  color: '#0D2A52', 
                  lineHeight: 1.1, 
                  whiteSpace: 'nowrap',
                  width: '100%', 
                  display: 'block' 
                }}>
                  {item.value}
                </span>
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#B5893B', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: 'var(--font-sans)', width: '100%', display: 'block' }}>
                  {item.label}
                </span>
                <span style={{ fontSize: '10.5px', color: '#6b7280', lineHeight: 1.4, fontFamily: 'var(--font-sans)', width: '100%', display: 'block' }}>
                  {item.desc}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Page Indicators */}
        <div className="mobile-only-indicators">
          {STAT_ITEMS.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: activeIndex === idx ? '18px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: activeIndex === idx ? '#B5893B' : 'rgba(13,42,82,0.15)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Info Detail Modal */}
      <AnimatePresence>
        {selectedStat && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay" 
            onClick={() => setSelectedStat(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="modal-content" 
              onClick={(e) => e.stopPropagation()}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 24px 70px rgba(13, 42, 82, 0.2)'
              }}
            >
              <div className="info-modal-header" style={{ display: 'flex', gap: '15px', alignItems: 'center', background: '#0D2A52' }}>
                {STATS_DETAILS[selectedStat].icon}
                <h2 className="info-modal-title" style={{ margin: 0, color: '#FAF9F7' }}>{STATS_DETAILS[selectedStat].title}</h2>
                <button onClick={() => setSelectedStat(null)} className="modal-close" style={{ color: 'white' }}>
                  <X size={24} />
                </button>
              </div>
              <div className="info-modal-body">
                <p style={{ fontSize: '16px', color: '#2d2736', lineHeight: '1.7', textAlign: 'justify' }}>
                  {STATS_DETAILS[selectedStat].content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 900px) {
          .glance-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .stat-items-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        
        .mobile-only-indicators {
          display: none !important;
        }

        @media (max-width: 680px) {
          #about { padding: 36px 16px !important; }
          #about h2 { font-size: clamp(26px, 7vw, 40px) !important; }
          
          /* Horizontal swipe slider on mobile */
          .stat-items-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            scroll-behavior: smooth !important;
            -webkit-overflow-scrolling: touch !important;
            padding: 16px 20px 28px !important;
            margin: 0 -16px !important; /* bleed to edge */
            gap: 16px !important;
            scrollbar-width: none !important;
          }
          .stat-items-grid::-webkit-scrollbar {
            display: none !important;
          }
          
          /* Snapping cards width and container alignment */
          .stat-items-grid > div {
            flex: 0 0 78vw !important;
            max-width: 280px !important;
            scroll-snap-align: center !important;
            display: flex !important;
          }
          
          .stat-card {
            padding: 24px 20px !important;
            height: 100% !important;
            box-shadow: 0 8px 30px rgba(13, 42, 82, 0.06) !important;
            border: 1px solid rgba(13, 42, 82, 0.05) !important;
            border-top: 4px solid #0D2A52 !important;
          }

          .mobile-only-indicators {
            display: flex !important;
            justify-content: center;
            align-items: center;
            gap: 6px;
            margin-top: -12px;
            margin-bottom: 12px;
          }
        }
        @media (max-width: 420px) {
          #about { padding: 28px 14px !important; }
        }
      `}} />

    </section>
  );
}

