'use client';

import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

/* ─── Brand Tokens ─────────────────────────────────────── */
const DEEP  = '#0D2A52';
const GOLD  = '#B5893B';
const GOLD2 = '#D4AF37';
const CREAM = '#FAF9F7';
const WHITE = '#FFFFFF';
const MUTED = '#5c526b';

function Reveal({ children, delay = 0, dir = 'up', style = {} }) {
  let direction = 'up';
  let distance = 28;
  if (dir === 'left') {
    direction = 'left';
  } else if (dir === 'right') {
    direction = 'right';
  } else if (dir === 'none') {
    direction = 'fade';
  }
  return (
    <ScrollReveal delay={delay / 1000} duration={0.75} direction={direction} distance={distance} style={style}>
      {children}
    </ScrollReveal>
  );
}

export default function OfficeMapSection() {
  const mapSearchUrl = "https://www.google.com/maps/place/Richmond+Rd,+Bengaluru,+Karnataka/@12.9701026,77.5997233,16z/";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Richmond+Road,+Bengaluru,+Karnataka,+India";

  return (
    <div style={{ background: 'var(--bg-cream, #FAF9F7)', padding: '56px 40px 24px', fontFamily: 'var(--font-sans)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <Reveal>
          <div style={{ background: WHITE, borderRadius: '24px', border: '1px solid rgba(181, 137, 59, 0.12)', boxShadow: '0 20px 50px rgba(13, 42, 82, 0.05)', padding: '48px 40px', overflow: 'hidden' }} className="oms-card">
            
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: GOLD, letterSpacing: '2.5px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                Visit Our Office
              </span>
              <h2 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.25 }}>
                Meet Our Cosmetic Consulting Experts in Bengaluru
              </h2>
            </div>

            {/* Map Container */}
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '420px', border: '1px solid rgba(13, 42, 82, 0.08)' }} className="oms-map-container">

              {/* Google Maps Iframe */}
              <iframe
                title="EGC Office Location, Richmond Road, Bengaluru"
                src="https://maps.google.com/maps?q=Richmond%20Road,%20Bengaluru,%20Karnataka,%20India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                style={{ border: 0, width: '100%', height: '100%' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Bottom Direct Contact Strip */}
            <div style={{
              borderTop: '1px solid rgba(181, 137, 59, 0.15)',
              marginTop: '32px',
              paddingTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px'
            }} className="oms-contact-strip">
              <span style={{ fontSize: '15px', fontWeight: 700, color: DEEP, fontFamily: 'var(--font-sans)' }}>
                Contact Us Directly
              </span>
              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }} className="oms-links-row">
                <a href="mailto:info@ekoraglobalconsulting.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#2d2736', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}
                   onMouseEnter={e => e.currentTarget.style.color = GOLD}
                   onMouseLeave={e => e.currentTarget.style.color = '#2d2736'}>
                  <Mail size={16} style={{ color: GOLD }} />
                  info@ekoraglobalconsulting.com
                </a>
                <a href="tel:+917892978516" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#2d2736', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}
                   onMouseEnter={e => e.currentTarget.style.color = GOLD}
                   onMouseLeave={e => e.currentTarget.style.color = '#2d2736'}>
                  <Phone size={16} style={{ color: GOLD }} />
                  +91 78929 78516
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#2d2736', fontWeight: 500 }}>
                  <MapPin size={16} style={{ color: GOLD }} />
                  Bengaluru, India
                </div>
              </div>
            </div>

          </div>
        </Reveal>

      </div>

      {/* ── STYLES ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .oms-card { padding: 32px 24px !important; }
          .oms-contact-strip { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .oms-links-row { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
          .oms-overlay-card { width: calc(100% - 40px) !important; left: 20px !important; right: 20px !important; }
          .oms-map-container { height: 350px !important; }
        }
        @media (max-width: 480px) {
          .oms-card { padding: 24px 16px !important; }
          .oms-map-container { height: 300px !important; }
        }
      `}} />
    </div>
  );
}
