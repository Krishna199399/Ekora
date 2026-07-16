'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

/* ─── Brand Tokens ─────────────────────────────────────── */
const GOLD  = '#B5893B';
const GOLD2 = '#D4AF37';

/* ─── Scroll Reveal ────────────────────────────────────── */
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

/* ─── Data ─────────────────────────────────────────────── */
const COLUMNS = [
  {
    title: 'R&D & Formulation',
    links: [
      { label: 'Product Formulation', href: '/services/cosmetic-research-product-formulation/' },
      { label: 'Stability Testing', href: '/services/cosmetic-stability-testing-shelf-life-validation/' },
      { label: 'Ingredient Sourcing', href: '/services/ingredient-sourcing-support/' },
      { label: 'R&D Innovation', href: '/services/cosmetic-innovation-rd-productivity-consulting/' },
    ],
  },
  {
    title: 'Manufacturing',
    links: [
      { label: 'Plant Setup', href: '/services/plant-setup-factory-planning/' },
      { label: 'Turnkey Projects', href: '/services/turnkey-cosmetic-project-solutions/' },
      { label: 'Manufacturing Consulting', href: '/services/cosmetic-manufacturing-consulting/' },
      { label: 'Scale-Up Support', href: '/services/scale-up-commercialization-support/' },
      { label: 'Private Label Manufacturing', href: '/services/private-label-contract-manufacturing/' },
    ],
  },
  {
    title: 'Business Advisory',
    links: [
      { label: 'Regulatory Support', href: '/services/regulatory-compliance-support/' },
      { label: 'Export Documentation', href: '/services/export-documentation-support/' },
      { label: 'DPR Consulting', href: '/services/cosmetic-dpr-business-consulting/' },
      { label: 'Recruitment Support', href: '/services/technical-recruitment-team-building/' },
      { label: 'Packaging Development', href: '/services/packaging-development-sourcing/' },
      { label: 'Go-To-Market', href: '/services/branding-go-to-market-consulting/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about/' },
      { label: 'R&D Innovation', href: '/rd-innovation/' },
      { label: 'Contact Us', href: '/contact/' },
    ],
  },
];

const SOCIALS = [
  {
    label: 'LinkedIn', href: 'https://linkedin.com',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
  },
  {
    label: 'Instagram', href: 'https://instagram.com',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  },
  {
    label: 'YouTube', href: 'https://youtube.com',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>,
  },
  {
    label: 'X / Twitter', href: 'https://x.com',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>,
  },
];

/* ─── Footer Link component ─────────────────────────────── */
function FLink({ href, children }) {
  return (
    <Link href={href} className="ft-link" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13.5px', display: 'inline-block', padding: '2px 0', transition: 'all 0.22s ease' }}>
      {children}
    </Link>
  );
}

/* ─── Main Component ───────────────────────────────────── */
export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <footer style={{ background: '#0b2146', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-sans)', position: 'relative', overflow: 'hidden' }}>

        {/* ── Background decorative glows ── */}
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,137,59,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', right: '-60px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,92,183,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

        {/* ══════════════════════════════════════════════════
            MAIN LINKS SECTION
        ══════════════════════════════════════════════════ */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 40px 40px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr', gap: '40px' }} className="ft-main-grid">

            {/* ── Col 1: Brand ── */}
            <Reveal dir="left" delay={0}>
              <div>
                <img src="/logo_white_footer.png" alt="EGC Ekora Global Consulting" style={{ height: '48px', width: 'auto', display: 'block', marginBottom: '22px' }} />
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '24px', maxWidth: '320px' }}>
                  EGC Ekora Global Consulting bridges cosmetic science and business success through formulation, manufacturing, regulatory compliance and commercialization support.
                </p>

                {/* Contact details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                  <a href="mailto:info@ekoraglobalconsulting.com" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13.5px', transition: 'color 0.2s', width: 'fit-content' }}
                     onMouseEnter={e => e.currentTarget.style.color = GOLD}
                     onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
                    info@ekoraglobalconsulting.com
                  </a>
                  <a href="tel:+917892978516" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13.5px', transition: 'color 0.2s', width: 'fit-content' }}
                     onMouseEnter={e => e.currentTarget.style.color = GOLD}
                     onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
                    +91 78929 78516
                  </a>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13.5px', lineHeight: 1.5 }}>
                    Bengaluru, India
                  </div>
                </div>

                {/* Social icons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  {SOCIALS.map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noreferrer" title={s.label} className="ft-social" style={{ width: '38px', height: '38px', borderRadius: '6px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'all 0.25s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── Link Columns ── */}
            {COLUMNS.map((col, idx) => (
              <Reveal key={col.title} dir="up" delay={80 * (idx + 1)}>
                <div>
                  <div style={{ fontSize: '14.5px', fontWeight: 600, color: GOLD, marginBottom: '22px', fontFamily: 'var(--font-sans)', letterSpacing: '0.5px' }}>
                    {col.title}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {col.links.map((link, i) => (
                      <li key={i}>
                        <FLink href={link.href}>{link.label}</FLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}

          </div>

          {/* ══════════════════════════════════════════════════
              COPYRIGHT BAR
          ══════════════════════════════════════════════════ */}
          <Reveal delay={60}>
            <div style={{ marginTop: '56px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }} className="ft-copyright">
              <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.5)' }}>
                © {new Date().getFullYear()} EGC Ekora Global Consulting Pvt. Ltd. All Rights Reserved.
              </span>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }} className="ft-copyright-links">
                {[
                  { label: 'Privacy Policy', href: '/privacy/' },
                  { label: 'Terms & Conditions', href: '/terms-conditions/' },
                  { label: 'Sitemap', href: '/sitemap.xml' }
                ].map((t, i) => (
                  <Link key={i} href={t.href} style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = GOLD}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════
          BACK TO TOP BUTTON
      ══════════════════════════════════════════════════ */}
      <button
        className="ft-back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed', bottom: '32px', right: '32px', zIndex: 500,
          width: '48px', height: '48px', borderRadius: '12px',
          background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
          color: '#fff', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 24px ${GOLD}50`,
          opacity: showTop ? 1 : 0,
          transform: showTop ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: showTop ? 'all' : 'none',
          transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 14px 32px ${GOLD}60`; }}
        onMouseLeave={e => { e.currentTarget.style.transform = showTop ? 'translateY(0)' : 'translateY(16px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${GOLD}50`; }}
        title="Back to top">
        <ArrowUp size={20} />
      </button>

      {/* ── STYLES ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .ft-link:hover { color: #b5893b !important; transform: translateX(4px); }
        .ft-link { transition: all 0.22s ease !important; display: inline-block !important; }

        /* Tablet */
        @media (max-width: 1024px) {
          .ft-main-grid { grid-template-columns: 1.5fr 1fr 1fr !important; gap: 36px !important; }
        }
        
        /* Small Tablet / Large Mobile */
        @media (max-width: 768px) {
          .ft-main-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
          .ft-copyright { 
            flex-direction: column !important; 
            align-items: flex-start !important; 
            gap: 16px !important; 
          }
          .ft-copyright-links {
            flex-wrap: wrap !important;
            gap: 16px !important;
          }
          footer > div { 
            padding-left: 24px !important; 
            padding-right: 24px !important;
            padding-top: 60px !important;
          }
        }
        
        /* Mobile */
        @media (max-width: 480px) {
          .ft-main-grid { 
            grid-template-columns: 1fr !important; 
            gap: 32px !important;
          }
          footer > div { 
            padding-left: 20px !important; 
            padding-right: 20px !important;
            padding-top: 50px !important;
            padding-bottom: 30px !important;
          }
          .ft-copyright {
            margin-top: 40px !important;
            padding-top: 20px !important;
          }
          .ft-copyright-links {
            width: 100% !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }
        
        /* Back to Top Button Mobile */
        @media (max-width: 680px) {
          footer { padding-bottom: 80px !important; }
          .ft-back-to-top {
            bottom: calc(80px + env(safe-area-inset-bottom)) !important;
            right: 20px !important;
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}} />
    </>
  );
}
