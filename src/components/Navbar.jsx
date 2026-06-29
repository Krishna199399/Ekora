'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Phone, Mail } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { SERVICES_DATA } from '../data/servicesData';
import { useConsultationModal } from '../context/ConsultationModalContext';

/* ─── Data ─────────────────────────────────────────────── */
const MEGA_COLUMNS = [
  {
    label: 'R&D & Formulation Laboratory',
    color: '#7b5cb7',
    slugs: [
      'cosmetic-research-product-formulation',
      'cosmetic-stability-testing-shelf-life-validation',
      'ingredient-sourcing-support',
      'cosmetic-innovation-rd-productivity-consulting',
    ],
  },
  {
    label: 'Industrial Engineering & Setup',
    color: '#b5893b',
    slugs: [
      'plant-setup-factory-planning',
      'turnkey-cosmetic-project-solutions',
      'cosmetic-manufacturing-consulting',
      'scale-up-commercialization-support',
      'private-label-contract-manufacturing',
    ],
  },
  {
    label: 'Regulatory & Quality Audits',
    color: '#5a8a6b',
    slugs: [
      'regulatory-compliance-support',
      'export-documentation-support',
    ],
  },
  {
    label: 'Brand, DPR & Business Advisory',
    color: '#c06b8a',
    slugs: [
      'cosmetic-dpr-business-consulting',
      'technical-recruitment-team-building',
      'packaging-development-sourcing',
      'branding-go-to-market-consulting',
    ],
  },
];

const SERVICE_MAP = Object.fromEntries(SERVICES_DATA.map((s) => [s.slug, s]));

/* ─── Component ─────────────────────────────────────────── */
export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();
  const { openModal } = useConsultationModal();

  const [mobileMenuOpen,    setMobileMenuOpen]    = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled,          setScrolled]          = useState(false);
  const [megaOpen,          setMegaOpen]          = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openMega      = () => { clearTimeout(closeTimer.current); setMegaOpen(true); };
  const scheduleMegaClose = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 140); };

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    setMegaOpen(false);
    const routes = { home: '/', about: '/about/', capabilities: '/services/', expertise: '/product-expertise/', rdi: '/rd-innovation/', contact: '/contact/' };
    if (routes[target]) router.push(routes[target]);
  };

  // Normalize: strip trailing slash so /product-expertise/ === /product-expertise
  const cleanPath = pathname.replace(/\/$/, '') || '/';

  const isServicesActive = cleanPath === '/services' || pathname.startsWith('/services/');

  const getActive = () => {
    if (cleanPath === '/about')             return 'about';
    if (cleanPath === '/product-expertise') return 'expertise';
    if (cleanPath === '/rd-innovation')    return 'rdi';
    if (cleanPath === '/contact')           return 'contact';
    if (cleanPath === '/')                  return 'home';
    return '';
  };
  const active = getActive();

  /* pill nav link style */
  const navLinkStyle = (key) => ({
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '7px 14px',
    borderRadius: '8px',
    fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.4px',
    fontFamily: 'var(--font-sans)',
    color: (active === key || (key === 'services' && (isServicesActive || megaOpen)))
      ? '#b5893b'
      : scrolled ? '#0D2A52' : '#0D2A52',
    background: (active === key || (key === 'services' && (isServicesActive || megaOpen)))
      ? 'rgba(181,137,59,0.1)' : 'transparent',
    transition: 'all 0.22s ease',
    display: 'flex', alignItems: 'center', gap: '5px',
    position: 'relative',
  });

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          TOP INFO BAR
      ═══════════════════════════════════════════════════ */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '36px',
        background: 'linear-gradient(90deg, #0D2A52 0%, #0a2244 100%)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 301,
        borderBottom: '1px solid rgba(181,137,59,0.2)',
      }} className="nb-topbar">
        {/* Left: Email + Phone */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a href="mailto:info@ekoraglobalconsulting.com" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '11.5px', fontWeight: 500,
            color: 'rgba(255,255,255,0.82)',
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.2px',
            transition: 'color 0.2s',
          }} className="nb-topbar-link">
            <Mail size={11} style={{ color: '#b5893b', flexShrink: 0 }} />
            info@ekoraglobalconsulting.com
          </a>
          <a href="tel:+917892978516" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '11.5px', fontWeight: 500,
            color: 'rgba(255,255,255,0.82)',
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
            letterSpacing: '0.2px',
            transition: 'color 0.2s',
          }} className="nb-topbar-link">
            <Phone size={11} style={{ color: '#b5893b', flexShrink: 0 }} />
            +91 78929 78516
          </a>
        </div>

        {/* Right: Tagline */}
        <div style={{
          fontSize: '10.5px', fontWeight: 600,
          color: 'rgba(181,137,59,0.85)',
          letterSpacing: '1.8px', textTransform: 'uppercase',
          fontFamily: 'var(--font-sans)',
        }} className="nb-topbar-right">
          India · Cosmetic Consulting
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          NAVBAR BAR
      ═══════════════════════════════════════════════════ */}
      <nav style={{
        position: 'fixed', top: '36px', left: 0, right: 0,
        height: '76px',
        background: scrolled
          ? 'rgba(255,255,255,0.97)'
          : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: scrolled
          ? '1px solid rgba(181,137,59,0.2)'
          : '1px solid rgba(181,137,59,0.1)',
        boxShadow: scrolled ? '0 4px 30px rgba(27,11,48,0.08)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', zIndex: 300,
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>

        {/* ── Logo ── */}
        <div onClick={() => handleNavClick('home')} style={{ display: 'flex', cursor: 'pointer', flexShrink: 0 }}>
          <img src="/ekora-global-consulting-logo-black.png" alt="EGC Logo" style={{ height: '56px', width: 'auto', display: 'block', transition: 'opacity 0.2s' }} />
        </div>

        {/* ── Desktop nav links ── */}
        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }} className="nb-desktop-menu">

          {/* About */}
          <button onClick={() => handleNavClick('about')} style={navLinkStyle('about')} className="nb-nav-btn"
            onMouseEnter={e => { if (active !== 'about') { e.currentTarget.style.background = 'rgba(181,137,59,0.07)'; e.currentTarget.style.color = '#b5893b'; } }}
            onMouseLeave={e => { if (active !== 'about') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0D2A52'; } }}>
            About
          </button>

          {/* Services — mega trigger */}
          <div onMouseEnter={openMega} onMouseLeave={scheduleMegaClose} style={{ position: 'relative' }}>
            <button onClick={() => handleNavClick('capabilities')} style={navLinkStyle('services')} className="nb-nav-btn"
              onMouseEnter={e => { if (!(isServicesActive || megaOpen)) { e.currentTarget.style.background = 'rgba(181,137,59,0.07)'; e.currentTarget.style.color = '#b5893b'; } }}
              onMouseLeave={e => { if (!(isServicesActive || megaOpen)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0D2A52'; } }}>
              Services
              <ChevronDown size={13} style={{ transition: 'transform 0.25s ease', transform: megaOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: '#b5893b' }} />
            </button>
          </div>

          {/* Product Expertise */}
          <button onClick={() => handleNavClick('expertise')} style={navLinkStyle('expertise')} className="nb-nav-btn"
            onMouseEnter={e => { if (active !== 'expertise') { e.currentTarget.style.background = 'rgba(181,137,59,0.07)'; e.currentTarget.style.color = '#b5893b'; } }}
            onMouseLeave={e => { if (active !== 'expertise') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0D2A52'; } }}>
            Product Expertise
          </button>

          {/* R&D Innovation */}
          <button onClick={() => handleNavClick('rdi')} style={navLinkStyle('rdi')} className="nb-nav-btn"
            onMouseEnter={e => { if (active !== 'rdi') { e.currentTarget.style.background = 'rgba(181,137,59,0.07)'; e.currentTarget.style.color = '#b5893b'; } }}
            onMouseLeave={e => { if (active !== 'rdi') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0D2A52'; } }}>
            R&D Innovation
          </button>

          {/* Contact */}
          <button onClick={() => handleNavClick('contact')} style={navLinkStyle('contact')} className="nb-nav-btn"
            onMouseEnter={e => { if (active !== 'contact') { e.currentTarget.style.background = 'rgba(181,137,59,0.07)'; e.currentTarget.style.color = '#b5893b'; } }}
            onMouseLeave={e => { if (active !== 'contact') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0D2A52'; } }}>
            Contact Us
          </button>
        </div>

        {/* ── CTA buttons ── */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }} className="nb-desktop-actions">
          {/* Phone Number Link */}
          <a href="tel:+917892978516" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#0D2A52',
            textDecoration: 'none',
            marginRight: '12px',
            transition: 'color 0.2s ease',
          }}
          className="nb-phone-link"
          onMouseEnter={e => e.currentTarget.style.color = '#b5893b'}
          onMouseLeave={e => e.currentTarget.style.color = '#0D2A52'}>
            <Phone size={14} style={{ color: '#b5893b' }} />
            <span>+91 78929 78516</span>
          </a>

          {/* Primary CTA */}
          <button onClick={() => openModal('navbar_desktop')} className="nb-cta-btn" style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            padding: '9px 20px',
            background: 'linear-gradient(135deg, #b5893b, #d4af37)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '12.5px', fontWeight: 700,
            cursor: 'pointer', letterSpacing: '0.3px',
            fontFamily: 'var(--font-sans)',
            boxShadow: '0 4px 16px rgba(181,137,59,0.35)',
            transition: 'all 0.25s ease',
          }}>
            Get Consultation
            <ArrowRight size={13} />
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{
          background: 'none', border: 'none', color: '#0D2A52',
          cursor: 'pointer', display: 'none',
          width: '40px', height: '40px',
          borderRadius: '8px',
          alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }} className="nb-mobile-toggle">
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ═══════════════════════════════════════════════════
          MEGA MENU PANEL
      ═══════════════════════════════════════════════════ */}
      <div
        className={`nb-mega-panel ${megaOpen ? 'nb-mega-open' : ''}`}
        onMouseEnter={openMega}
        onMouseLeave={scheduleMegaClose}
      >
        {/* Top gold accent line */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #b5893b, #d4af37, #b5893b, transparent)' }} />

        <div className="nb-mega-inner">
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#b5893b', letterSpacing: '2.5px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Our Services</span>
              <span style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#0D2A52' }}>Cosmetic Consulting Capabilities</span>
            </div>
             <Link href="/services/" className="nb-view-all-btn" onClick={() => setMegaOpen(false)} style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '9px 20px', background: '#0D2A52', color: 'white',
              textDecoration: 'none', borderRadius: '8px',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.3px',
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.2s ease',
            }}>
              View All Services <ArrowRight size={13} />
            </Link>
          </div>

          {/* 4 columns */}
          <div className="nb-mega-cols">
            {MEGA_COLUMNS.map((col) => (
              <div key={col.label} className="nb-mega-col">
                {/* Column header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: col.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.8px', color: col.color, fontFamily: 'var(--font-sans)' }}>{col.label}</span>
                </div>
                <div style={{ height: '1.5px', background: `linear-gradient(90deg, ${col.color}60, transparent)`, marginBottom: '14px' }} />

                {/* Service links */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {col.slugs.map((slug) => {
                    const svc = SERVICE_MAP[slug];
                    if (!svc) return null;
                    const isActive = pathname === `/services/${slug}`;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/services/${slug}/`}
                          onClick={() => setMegaOpen(false)}
                          className="nb-mega-item"
                          style={{ '--col-color': col.color, background: isActive ? `${col.color}10` : 'transparent', fontWeight: isActive ? 700 : 500 }}
                        >
                          <span className="nb-mega-dot" style={{ background: col.color }} />
                          <span style={{ flex: 1, lineHeight: 1.35 }}>{svc.name}</span>
                          <ArrowRight size={11} className="nb-mega-arrow" style={{ color: col.color }} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer strip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', marginTop: '20px', borderTop: '1px solid rgba(181,137,59,0.12)' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['GMP Aligned', 'FDA · EU · CDSCO', 'Science Led', 'End to End'].map((tag, i) => (
                <span key={i} style={{ fontSize: '10.5px', color: '#9e94ae', fontFamily: 'var(--font-sans)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#b5893b', display: 'inline-block' }} />
                  {tag}
                </span>
              ))}
            </div>
            <span style={{ fontSize: '11px', color: '#b5893b', fontStyle: 'italic', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              15 specialized consulting services across 4 practice areas
            </span>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {megaOpen && (
        <div className="nb-mega-backdrop" onMouseEnter={scheduleMegaClose} onClick={() => setMegaOpen(false)} />
      )}

      {/* ═══════════════════════════════════════════════════
          MOBILE DRAWER
      ═══════════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <div className="nb-mobile-drawer">
          {/* Brand top */}
          <div style={{ padding: '4px 0 20px', borderBottom: '1px solid rgba(181,137,59,0.12)', marginBottom: '8px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#b5893b', letterSpacing: '2px', textTransform: 'uppercase' }}>EGC Ekora Global Consulting</div>
            <div style={{ fontSize: '12px', color: '#9e94ae', marginTop: '3px' }}>Cosmetic Industry Consulting</div>
          </div>

          <button onClick={() => handleNavClick('about')}      className="nb-mobile-item">About</button>

          {/* Services accordion */}
          <div>
            <button className="nb-mobile-item nb-mobile-accord-btn" onClick={() => setMobileServicesOpen(!mobileServicesOpen)}>
              <span>Services</span>
              <ChevronDown size={15} style={{ transition: 'transform 0.25s', transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', color: '#b5893b' }} />
            </button>
            {mobileServicesOpen && (
              <div style={{ paddingLeft: '14px', paddingBottom: '8px' }}>
                <Link href="/services/" className="nb-mobile-overview" onClick={() => setMobileMenuOpen(false)}>→ View All Services Overview</Link>
                {MEGA_COLUMNS.map((col) => (
                  <div key={col.label} style={{ marginBottom: '14px' }}>
                    <span style={{ display: 'block', fontSize: '9.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: col.color, padding: '8px 10px 4px', fontFamily: 'var(--font-sans)' }}>{col.label}</span>
                    {col.slugs.map((slug) => {
                      const svc = SERVICE_MAP[slug];
                      if (!svc) return null;
                      return (
                        <Link key={slug} href={`/services/${slug}/`} className="nb-mobile-service-link" onClick={() => setMobileMenuOpen(false)}>{svc.name}</Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => handleNavClick('expertise')}  className="nb-mobile-item">Product Expertise</button>
          <button onClick={() => handleNavClick('rdi')}        className="nb-mobile-item">R&D Innovation</button>
          <button onClick={() => handleNavClick('contact')}    className="nb-mobile-item">Contact Us</button>

          {/* Mobile CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(181,137,59,0.12)' }}>
            <button onClick={() => { setMobileMenuOpen(false); openModal('navbar_mobile'); }} style={{ padding: '13px', background: 'linear-gradient(135deg, #b5893b, #d4af37)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', fontFamily: 'var(--font-sans)', boxShadow: '0 4px 16px rgba(181,137,59,0.3)' }}>
              Get Consultation →
            </button>
            <a href="tel:+917892978516" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              border: '1px solid rgba(181,137,59,0.3)',
              borderRadius: '8px',
              color: '#0D2A52',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              background: 'rgba(181,137,59,0.04)',
            }}>
              <Phone size={15} style={{ color: '#b5893b' }} />
              +91 78929 78516
            </a>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          STYLES
      ═══════════════════════════════════════════════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Nav hover state ── */
        .nb-ghost-btn:hover {
          background: rgba(181,137,59,0.08) !important;
          border-color: #b5893b !important;
          transform: translateY(-1px);
        }
        .nb-cta-btn:hover {
          background: linear-gradient(135deg, #c9a050, #e8cc7a) !important;
          box-shadow: 0 8px 24px rgba(181,137,59,0.45) !important;
          transform: translateY(-2px);
        }
        .nb-view-all-btn:hover {
          background: #b5893b !important;
          transform: translateY(-1px);
        }

        /* ── Mega panel ── */
        .nb-mega-panel {
          position: fixed;
          top: 112px;
          left: 0; right: 0;
          z-index: 299;
          background: rgba(255,255,255,0.99);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(181,137,59,0.15);
          box-shadow: 0 24px 64px rgba(27,11,48,0.12);
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .nb-mega-open {
          opacity: 1 !important;
          transform: translateY(0) !important;
          pointer-events: all !important;
        }
        .nb-mega-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 28px 40px 0;
        }
        .nb-mega-cols {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .nb-mega-col {
          padding: 0 28px 28px 0;
        }
        .nb-mega-col:not(:first-child) {
          padding-left: 28px;
          border-left: 1px solid rgba(181,137,59,0.1);
        }

        /* Mega service items */
        .nb-mega-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 10px;
          border-radius: 8px;
          text-decoration: none;
          color: #2d2736;
          font-size: 13px;
          font-family: var(--font-sans);
          transition: all 0.18s ease;
        }
        .nb-mega-item:hover {
          background: color-mix(in srgb, var(--col-color, #b5893b) 8%, transparent) !important;
          color: #0D2A52 !important;
          transform: translateX(3px);
        }
        .nb-mega-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0.6;
          transition: opacity 0.18s;
        }
        .nb-mega-item:hover .nb-mega-dot { opacity: 1; }
        .nb-mega-arrow {
          opacity: 0;
          transition: opacity 0.18s ease, transform 0.18s ease;
          flex-shrink: 0;
        }
        .nb-mega-item:hover .nb-mega-arrow {
          opacity: 1;
          transform: translateX(2px);
        }

        /* Backdrop */
        .nb-mega-backdrop {
          position: fixed;
          inset: 0;
          top: 112px;
          z-index: 298;
          background: transparent;
        }

        /* ── Desktop breakpoint ── */
        @media (max-width: 1024px) {
          .nb-desktop-menu, .nb-desktop-actions { display: none !important; }
          .nb-mobile-toggle { display: flex !important; }
          .nb-mega-panel, .nb-mega-backdrop { display: none !important; }
        }

        /* ── Mobile drawer ── */
        .nb-mobile-drawer {
          position: fixed;
          top: 112px; left: 0; right: 0;
          background: #ffffff;
          border-bottom: 1px solid rgba(181,137,59,0.15);
          padding: 20px 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 299;
          max-height: calc(100vh - 112px);
          overflow-y: auto;
          box-shadow: 0 12px 40px rgba(27,11,48,0.12);
          animation: nbDrawerIn 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes nbDrawerIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nb-mobile-item {
          background: none; border: none; cursor: pointer;
          text-align: left; padding: 13px 12px;
          border-radius: 8px;
          font-size: 15px; font-weight: 600;
          color: #0D2A52; font-family: var(--font-sans);
          width: 100%; transition: all 0.2s;
        }
        .nb-mobile-item:hover {
          color: #b5893b;
          background: rgba(181,137,59,0.06);
        }
        .nb-mobile-accord-btn {
          display: flex !important;
          justify-content: space-between;
          align-items: center;
        }
        .nb-mobile-overview {
          display: block;
          padding: 10px 10px 10px;
          font-size: 13px; font-weight: 700;
          color: #b5893b; text-decoration: none;
          border-bottom: 1px solid rgba(181,137,59,0.12);
          margin-bottom: 10px;
          font-family: var(--font-sans);
        }
        .nb-mobile-service-link {
          display: block;
          padding: 8px 10px;
          font-size: 13px; color: #2d2736;
          text-decoration: none; border-radius: 6px;
          font-family: var(--font-sans);
          transition: all 0.18s;
        }
        .nb-mobile-service-link:hover {
          background: rgba(181,137,59,0.06);
          color: #0D2A52;
          padding-left: 16px;
        }

        /* ── Top info bar responsive ── */
        .nb-topbar-link:hover { color: #ffffff !important; }
        @media (max-width: 640px) {
          .nb-topbar { padding: 0 16px !important; }
          .nb-topbar-right { display: none !important; }
        }
        @media (max-width: 480px) {
          nav { padding: 0 16px !important; }
          .nb-mobile-drawer { padding: 16px 16px 24px; }
          .nb-mega-inner { padding: 24px 20px 0; }
        }
      `}} />
    </>
  );
}
