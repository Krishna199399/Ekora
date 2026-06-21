'use client';

import React, { useState, useEffect } from 'react';
import { X, Award, ArrowUp, Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import { useConsultationModal } from '../context/ConsultationModalContext';

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

const SERVICE_LINKS = [
  { label: 'R&D & Product Formulation',             href: '/services/cosmetic-research-product-formulation' },
  { label: 'Stability Testing',                     href: '/services/cosmetic-stability-testing-shelf-life-validation' },
  { label: 'Plant Setup & Factory Planning',        href: '/services/plant-setup-factory-planning' },
  { label: 'Turnkey Project Solutions',             href: '/services/turnkey-cosmetic-project-solutions' },
  { label: 'Manufacturing Consulting',              href: '/services/cosmetic-manufacturing-consulting' },
  { label: 'Regulatory Compliance',                 href: '/services/regulatory-compliance-support' },
  { label: 'Private Label Manufacturing',           href: '/services/private-label-contract-manufacturing' },
  { label: 'Branding & Go-to-Market',              href: '/services/branding-go-to-market-consulting' },
];

const COMPANY_LINKS = [
  { label: 'About Us',          href: '/about' },
  { label: 'Our Vision',        href: '/about' },
  { label: 'Leadership',        href: '/about' },
  { label: 'Core Values',       href: '/about' },
  { label: 'Global Network',    href: '/about' },
];

const EXPLORE_LINKS = [
  { label: 'Product Expertise', href: '/product-expertise' },
  { label: 'Services Overview', href: '/services' },
  { label: 'Contact Us',        href: '/contact' },
  { label: 'Get Consultation',  href: '/contact' },
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
    <Link href={href} className="ft-link" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '7px', padding: '4px 0', transition: 'all 0.22s ease' }}>
      <span className="ft-link-dot" style={{ width: '4px', height: '4px', borderRadius: '50%', background: GOLD, opacity: 0.4, flexShrink: 0, transition: 'all 0.22s ease' }} />
      {children}
    </Link>
  );
}

/* ─── Main Component ───────────────────────────────────── */
export default function Footer() {
  const { openModal } = useConsultationModal();
  const [email, setEmail]         = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showTop, setShowTop]     = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <>
      <footer style={{ background: '#0D2A52', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-sans)', position: 'relative', overflow: 'hidden' }}>

        {/* ── Background decorative glows ── */}
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,137,59,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', right: '-60px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,92,183,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(181,137,59,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(181,137,59,0.025) 1px, transparent 1px)', backgroundSize: '72px 72px', pointerEvents: 'none' }} />

        {/* ══════════════════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════════════════ */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 40px' }}>
            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', alignItems: 'center' }} className="ft-cta-grid">
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '3px', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>Ready to Start?</span>
                  <h2 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 700, color: '#fff', margin: '0 0 14px', lineHeight: 1.15 }}>
                    Let's Build Your Next<br />
                    <span style={{ color: GOLD }}>Cosmetic Success Story</span>
                  </h2>
                  <div style={{ width: '44px', height: '2.5px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})`, borderRadius: '2px', marginBottom: '16px' }} />
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: 0, maxWidth: '580px' }}>
                    From concept to commercialization, EGC's expert consulting team is ready to help you navigate every stage of cosmetic development, manufacturing, and growth.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '220px' }}>
                  <button onClick={() => openModal('footer_cta')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 28px', background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`, color: '#fff', textDecoration: 'none', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', boxShadow: `0 8px 28px ${GOLD}40`, cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'var(--font-sans)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 36px ${GOLD}55`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 28px ${GOLD}40`; }}>
                    Get Free Consultation <ArrowRight size={15} />
                  </button>
                  <Link href="/services" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 28px', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '14px', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', transition: 'all 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.11)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
                    Explore Services
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            NEWSLETTER STRIP
        ══════════════════════════════════════════════════ */}
        <div style={{ background: 'rgba(181,137,59,0.07)', borderBottom: '1px solid rgba(181,137,59,0.12)', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 40px' }}>
            <Reveal>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }} className="ft-newsletter-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${GOLD}18`, border: `1px solid ${GOLD}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, flexShrink: 0 }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '3px' }}>Stay Ahead in Beauty Innovation</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>Formulation R&D insights, regulatory updates & market intelligence, delivered monthly.</div>
                  </div>
                </div>
                {subscribed ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: 'rgba(90,138,107,0.2)', border: '1px solid rgba(90,138,107,0.4)', borderRadius: '8px', color: '#6aaa78', fontSize: '13.5px', fontWeight: 600 }}>
                    <Check size={15} /> Subscribed! Thank you.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px' }} className="ft-newsletter-form">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required
                      style={{ padding: '12px 18px', border: '1px solid rgba(181,137,59,0.25)', background: 'rgba(255,255,255,0.05)', color: '#fff', borderRadius: '8px', fontSize: '13.5px', width: '260px', outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = 'rgba(181,137,59,0.25)'} />
                    <button type="submit" style={{ padding: '12px 22px', background: GOLD, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13.5px', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all 0.25s ease', boxShadow: `0 4px 14px ${GOLD}30` }}
                      onMouseEnter={e => { e.currentTarget.style.background = GOLD2; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = 'translateY(0)'; }}>
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            MAIN LINKS SECTION
        ══════════════════════════════════════════════════ */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 40px 56px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 0.8fr 0.8fr', gap: '52px' }} className="ft-main-grid">

            {/* ── Col 1: Brand ── */}
            <Reveal dir="left" delay={0}>
              <div>
                <img src="/logo_white.png" alt="EGC Ekora Global Consulting" style={{ height: '48px', width: 'auto', display: 'block', marginBottom: '22px' }} />
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: '28px', maxWidth: '340px' }}>
                  EGC Ekora Global Consulting bridges cosmetic science and business success, delivering end to end advisory across formulation, manufacturing, regulatory compliance, and commercial strategy.
                </p>

                {/* Contact details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                  {[
                    { icon: <Mail size={13} />,   text: 'info@ekoraglobalconsulting.com',                           href: 'mailto:info@ekoraglobalconsulting.com' },
                    { icon: <Phone size={13} />,  text: '+91 78929 78516',                                          href: 'tel:+917892978516' },
                    { icon: <MapPin size={13} />, text: 'No. 39/3, Richmond Road, Bengaluru - 560025, India',       href: null },
                  ].map((item, i) => (
                    item.href
                      ? <a key={i} href={item.href} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '13px', lineHeight: 1.4, transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = GOLD}
                          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
                          <span style={{ color: GOLD, marginTop: '2px', flexShrink: 0 }}>{item.icon}</span> {item.text}
                        </a>
                      : <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.5 }}>
                          <span style={{ color: GOLD, marginTop: '2px', flexShrink: 0 }}>{item.icon}</span> {item.text}
                        </div>
                  ))}
                </div>

                {/* Social icons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  {SOCIALS.map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noreferrer" title={s.label} className="ft-social" style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'all 0.25s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${GOLD}18`; e.currentTarget.style.borderColor = `${GOLD}40`; e.currentTarget.style.color = GOLD; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ── Col 2: Services ── */}
            <Reveal dir="up" delay={80}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: GOLD, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '18px', height: '2px', background: GOLD, borderRadius: '1px', display: 'inline-block' }} />
                  Our Services
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {SERVICE_LINKS.map((s, i) => (
                    <li key={i}><FLink href={s.href}>{s.label}</FLink></li>
                  ))}
                  <li style={{ marginTop: '10px' }}>
                    <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: GOLD, textDecoration: 'none', padding: '7px 14px', borderRadius: '7px', border: `1px solid ${GOLD}30`, background: `${GOLD}0a`, transition: 'all 0.25s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${GOLD}18`; e.currentTarget.style.transform = 'translateX(3px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = `${GOLD}0a`; e.currentTarget.style.transform = 'translateX(0)'; }}>
                      All Services <ArrowRight size={11} />
                    </Link>
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* ── Col 3: Company ── */}
            <Reveal dir="up" delay={160}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: GOLD, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '18px', height: '2px', background: GOLD, borderRadius: '1px', display: 'inline-block' }} />
                  Company
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {COMPANY_LINKS.map((c, i) => (
                    <li key={i}><FLink href={c.href}>{c.label}</FLink></li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* ── Col 4: Explore ── */}
            <Reveal dir="right" delay={240}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: GOLD, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '18px', height: '2px', background: GOLD, borderRadius: '1px', display: 'inline-block' }} />
                  Explore
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {EXPLORE_LINKS.map((e, i) => {
                    if (e.label === 'Get Consultation') {
                      return (
                        <li key={i}>
                          <button onClick={() => openModal('footer_link')} className="ft-link" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '7px', padding: '4px 0', transition: 'all 0.22s ease', width: '100%' }}>
                            <span className="ft-link-dot" style={{ width: '4px', height: '4px', borderRadius: '50%', background: GOLD, opacity: 0.4, flexShrink: 0, transition: 'all 0.22s ease' }} />
                            {e.label}
                          </button>
                        </li>
                      );
                    }
                    return <li key={i}><FLink href={e.href}>{e.label}</FLink></li>;
                  })}
                </ul>

                {/* Global presence micro-card */}
                <div style={{ marginTop: '28px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>Global Presence</div>
                  {[
                    ['🇮🇳', 'India (HQ)', 'Bengaluru'],
                    ['🌍', 'Middle East', 'UAE · KSA'],
                    ['🌐', 'International', 'EU · N.America'],
                  ].map(([flag, region, detail], i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '5px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <span style={{ fontSize: '14px' }}>{flag}</span>
                      <div>
                        <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', lineHeight: 1 }}>{region}</div>
                        <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>



          {/* ══════════════════════════════════════════════════
              COPYRIGHT BAR
          ══════════════════════════════════════════════════ */}
          <Reveal delay={60}>
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }} className="ft-copyright">
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                © {new Date().getFullYear()} EGC Ekora Global Consulting Pvt. Ltd. · All Rights Reserved.
              </span>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((t, i) => (
                  <span key={i} style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.28)', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = GOLD}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}>
                    {t}
                  </span>
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
        .ft-link:hover { color: #b5893b !important; padding-left: 4px; }
        .ft-link:hover .ft-link-dot { opacity: 1 !important; }


        /* Tablet */
        @media (max-width: 1100px) {
          .ft-main-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
        }
        /* Mobile */
        @media (max-width: 768px) {
          .ft-main-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .ft-cta-grid  { grid-template-columns: 1fr !important; }
          .ft-newsletter-row { flex-direction: column !important; align-items: flex-start !important; }
          .ft-newsletter-form { width: 100% !important; }
          .ft-newsletter-form input { width: 100% !important; min-width: 0 !important; flex: 1 !important; }

          .ft-copyright { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; }
          footer > div > div { padding-left: 20px !important; padding-right: 20px !important; }
        }
        /* Small Mobile */
        @media (max-width: 480px) {
          .ft-newsletter-form { flex-direction: column !important; width: 100% !important; }
          .ft-newsletter-form input { width: 100% !important; box-sizing: border-box !important; }
          .ft-newsletter-form button { width: 100% !important; }
        }
        @media (max-width: 680px) {
          footer { padding-bottom: 70px; }
        }
      `}} />

    </>
  );
}
