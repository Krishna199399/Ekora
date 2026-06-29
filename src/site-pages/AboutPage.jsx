'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import ScrollReveal from '../components/ScrollReveal';
import Counter from '../components/Counter';
import { useConsultationModal } from '../context/ConsultationModalContext';
import {
  Lightbulb, Shield, Award, Users, Leaf, TrendingUp,
  FlaskConical, Wrench, Factory, FileCheck, Target,
  ChevronDown, ArrowRight, Globe, Check, Sparkles,
  Building2, MapPin, Star, Rocket, CheckCircle2
} from 'lucide-react';

/* ─── Brand Tokens ─────────────────────────────────────── */
const DEEP  = '#0D2A52';
const GOLD  = '#B5893B';
const GOLD2 = '#D4AF37';
const CREAM = '#FAF9F7';
const WHITE = '#FFFFFF';
const MUTED = '#5c526b';

/* ─── Data ─────────────────────────────────────────────── */
const CORE_VALUES = [
  { icon: Lightbulb,   color: '#b5893b', bg: 'rgba(181,137,59,0.1)',  title: 'Innovation',     desc: 'Encouraging continuous improvement through research, scientific advancement, and industry awareness.' },
  { icon: Shield,      color: '#7b5cb7', bg: 'rgba(123,92,183,0.1)',  title: 'Integrity',      desc: 'Building long-term relationships through transparency, accountability, and ethical business practices.' },
  { icon: Award,       color: '#c06b8a', bg: 'rgba(192,107,138,0.1)', title: 'Quality',        desc: 'Promoting high standards across product development, manufacturing, and operational processes.' },
  { icon: Users,       color: '#5a8a6b', bg: 'rgba(90,138,107,0.1)',  title: 'Collaboration',  desc: 'Working closely with clients, partners, and industry stakeholders to achieve shared goals.' },
  { icon: Leaf,        color: '#6aaa78', bg: 'rgba(106,170,120,0.1)', title: 'Sustainability', desc: 'Supporting responsible practices that contribute to long-term environmental and business value.' },
  { icon: TrendingUp,  color: '#4a7cc0', bg: 'rgba(74,124,192,0.1)',  title: 'Growth',         desc: 'Helping businesses create scalable systems, products, and strategies for future expansion.' },
];

const EXPERTISE_AREAS = [
  { icon: FlaskConical, color: '#b5893b', title: 'Product Development',               desc: 'Supporting concept creation, formulation planning, ingredient selection, prototype development, and product optimization.' },
  { icon: Wrench,       color: '#7b5cb7', title: 'Manufacturing Consulting',           desc: 'Guiding production planning, operational workflows, process efficiency, and manufacturing readiness.' },
  { icon: Factory,      color: '#5a8a6b', title: 'Factory Setup & Infrastructure',     desc: 'Supporting businesses with facility planning, cleanroom concepts, equipment selection, utility requirements, and scale-up strategies.' },
  { icon: FileCheck,    color: '#c06b8a', title: 'Regulatory & Compliance Support',   desc: 'Helping businesses understand documentation requirements, compliance frameworks, and market-specific regulatory expectations.' },
  { icon: Target,       color: '#4a7cc0', title: 'Commercialization & Growth',        desc: 'Aligning product development initiatives with manufacturing capability, market readiness, and long-term business objectives.' },
];

const CAPABILITIES = [
  'Cosmetic Product Development Consulting',
  'Formulation Strategy Support',
  'Ingredient Research & Evaluation',
  'Manufacturing Readiness Planning',
  'Factory Setup Consulting',
  'Compliance Guidance',
  'Product Commercialization Support',
  'Packaging Direction',
  'Contract Manufacturing Support',
  'Business Expansion Advisory',
];

const WHY_EGC = [
  'Industry-focused consulting approach',
  'Product development and manufacturing expertise',
  'Understanding of commercialization challenges',
  'Practical operational insights',
  'Scalable business-oriented solutions',
  'Long-term partnership mindset',
  'Focus on quality, innovation, and sustainable growth',
];

const FAQS = [
  { q: 'What does EGC Ekora Global Consulting do?',       a: 'EGC provides consulting support across cosmetic product development, manufacturing planning, factory setup, compliance guidance, commercialization strategy, and business growth initiatives.' },
  { q: 'Who does EGC work with?',                         a: 'We work with startups, beauty brands, manufacturers, wellness companies, private label businesses, investors, and organizations operating within the cosmetic and personal care industry.' },
  { q: 'Does EGC support cosmetic manufacturing projects?', a: 'Yes. We provide consulting support for manufacturing planning, operational readiness, factory setup initiatives, and production scale-up strategies.' },
  { q: 'Can EGC support businesses entering new markets?', a: 'Yes. We help businesses evaluate opportunities, align products with market requirements, and prepare for expansion initiatives.' },
  { q: 'Why choose EGC Ekora Global Consulting?',         a: 'Businesses choose EGC for its combination of industry knowledge, practical consulting expertise, technical understanding, and long-term business-focused approach.' },
];

const STATS = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '15+',  label: 'Service Areas' },
  { value: '5+',   label: 'Global Regions' },
  { value: '10+',  label: 'Years Expertise' },
];

const GLOBAL_REGIONS = [
  { region: 'India',         expertise: 'Manufacturing & CDSCO Compliance', color: '#FF9933' },
  { region: 'Middle East',   expertise: 'Import Regulation & Market Entry', color: '#C5A028' },
  { region: 'Europe',        expertise: 'EU CPNP & Safety Assessment',      color: '#1565C0' },
  { region: 'North America', expertise: 'FDA MoCRA & Market Strategy',       color: '#2E7D32' },
  { region: 'Southeast Asia', expertise: 'Commercialization & Export',       color: '#7B1FA2' },
  { region: 'Global',        expertise: 'End to End Consulting',            color: '#B5893B' },
];

/* ─── Main Component ───────────────────────────────────── */
export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const { openModal } = useConsultationModal();

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: CREAM, paddingTop: '80px', fontFamily: 'var(--font-sans)', color: DEEP }}>

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, ${DEEP} 0%, #0b2244 50%, #071730 100%)`, minHeight: '620px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(181,137,59,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(181,137,59,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '650px', height: '650px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,137,59,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,92,183,0.15) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 40px', width: '100%', position: 'relative', zIndex: 2 }} className="ab-section-pad">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="ab-hero-grid">

            {/* Left */}
            <div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, border: `1px solid ${GOLD}40`, borderRadius: '4px', padding: '6px 16px', marginBottom: '28px' }}>
                <Sparkles size={12} /> Who We Are
              </span>
              <h1 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(28px, 3.8vw, 50px)', fontWeight: 700, color: WHITE, margin: '0 0 20px', lineHeight: 1.12, letterSpacing: '-0.5px' }}>
                About EGC<br />
                <span style={{ color: GOLD }}>Ekora Global</span><br />
                Consulting
              </h1>
              <div style={{ width: '52px', height: '3px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})`, borderRadius: '2px', marginBottom: '22px' }} />
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '540px' }}>
                Building the future of cosmetic innovation, manufacturing excellence, and business growth through scientific expertise, strategic advisory, and end-to-end consulting support.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button onClick={() => openModal('about_hero')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: GOLD, color: WHITE, border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: `0 8px 28px ${GOLD}50`, transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 14px 36px ${GOLD}60`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 28px ${GOLD}50`; }}>
                  Start a Consultation <ArrowRight size={16} />
                </button>
              </div>

              {/* Trust chips */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '40px', flexWrap: 'wrap' }}>
                {['Science-Led', 'GMP Aligned', 'Global Reach', 'End-to-End'].map((chip, i) => (
                  <span key={i} style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', padding: '5px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.13)', background: 'rgba(255,255,255,0.05)' }}>✓ {chip}</span>
                ))}
              </div>
            </div>

            {/* Right — Stats + floating cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="ab-hero-right">
              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {STATS.map((stat, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', padding: '26px 20px', textAlign: 'center', animation: `abFloat${i % 2 === 0 ? 'A' : 'B'} ${3.5 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.18}s` }}>
                    <div style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(30px, 3vw, 42px)', fontWeight: 800, color: GOLD, lineHeight: 1, marginBottom: '7px' }}>
                      <Counter value={stat.value} />
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.55)', fontWeight: 500, letterSpacing: '0.5px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              {/* Tagline card */}
              <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', padding: '24px 28px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '10px' }}>Our Purpose</div>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>
                  "We believe every successful cosmetic brand begins with clarity, expertise, and the right strategic direction."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. VISION & MISSION
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: WHITE }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Our Foundation</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px' }}>Vision & Mission</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto', borderRadius: '2px' }} />
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="ab-vm-grid">
            {[
              { label: 'Our Vision', emoji: '🔭', text: 'To become a trusted global consulting partner for cosmetic businesses seeking innovation, manufacturing excellence, regulatory confidence, and sustainable growth.', color: GOLD },
              { label: 'Our Mission', emoji: '🎯', text: 'To bridge the gap between cosmetic science, manufacturing capability, and commercial success by providing practical consulting solutions that help businesses build competitive and future ready beauty brands.', color: '#7b5cb7' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.12} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="ab-vm-card" style={{ background: CREAM, border: `1px solid ${item.color}22`, borderRadius: '22px', padding: '44px 40px', height: '100%', position: 'relative', overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${item.color}, ${item.color}60)` }} />
                  <div style={{ fontSize: '36px', marginBottom: '18px' }}>{item.emoji}</div>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: item.color, display: 'block', marginBottom: '14px' }}>{item.label}</span>
                  <div style={{ width: '36px', height: '2.5px', background: item.color, borderRadius: '2px', marginBottom: '20px' }} />
                  <p style={{ fontSize: '16px', color: '#2d2736', lineHeight: 1.8, margin: 0 }}>{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. FOUNDER'S MESSAGE
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: CREAM, borderTop: '1px solid rgba(181,137,59,0.1)', borderBottom: '1px solid rgba(181,137,59,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'center' }} className="ab-founder-grid">
            {/* Left — decorative */}
            <ScrollReveal>
              <div style={{ position: 'relative' }}>
                <div style={{ background: `linear-gradient(135deg, ${DEEP}, #071730)`, borderRadius: '24px', padding: '52px 44px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}18, transparent 70%)`, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,92,183,0.18), transparent 70%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '56px', fontFamily: 'Syne, serif', fontWeight: 800, color: `${GOLD}30`, lineHeight: 1, marginBottom: '20px' }}>"</div>
                    <p style={{ fontSize: '18px', color: WHITE, lineHeight: 1.8, fontStyle: 'italic', margin: '0 0 32px', fontWeight: 500 }}>
                      We believe every successful cosmetic brand begins with clarity, expertise, and the right strategic direction.
                    </p>
                    <div style={{ width: '40px', height: '2px', background: GOLD, borderRadius: '2px', marginBottom: '16px' }} />
                    <div style={{ fontSize: '13px', fontWeight: 700, color: GOLD, letterSpacing: '1px' }}>EGC Founder</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>EGC Ekora Global Consulting</div>
                  </div>
                </div>
                {/* Floating badge */}
                <div style={{ position: 'absolute', bottom: '-18px', right: '32px', background: WHITE, border: `1px solid ${GOLD}30`, borderRadius: '14px', padding: '14px 20px', boxShadow: '0 12px 32px rgba(27,11,48,0.12)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${GOLD}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD }}>
                    <Star size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: DEEP }}>Science-Led</div>
                    <div style={{ fontSize: '10.5px', color: MUTED }}>Expert Consulting</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — text */}
            <ScrollReveal delay={0.15}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Leadership</span>
              <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.2 }}>Founder's Message</h2>
              <div style={{ width: '48px', height: '3px', background: GOLD, borderRadius: '2px', marginBottom: '28px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {[
                  'The cosmetic industry presents significant opportunities for businesses willing to invest in innovation, quality, and long term value creation.',
                  'However, developing successful products and building sustainable operations often requires navigating complex technical, regulatory, manufacturing, and commercial challenges.',
                  'EGC was founded with the belief that businesses should have access to practical guidance that combines scientific understanding with real world execution.',
                  'Our objective is simple help beauty businesses make better decisions, reduce risk, improve product quality, and build stronger foundations for long-term growth.',
                ].map((para, i) => (
                  <p key={i} style={{ fontSize: '15.5px', color: '#2d2736', lineHeight: 1.78, margin: 0 }}>{para}</p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. CORE VALUES
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: WHITE }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Our Foundation</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px' }}>Core Values</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto 18px', borderRadius: '2px' }} />
            <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.75, maxWidth: '640px', margin: '0 auto' }}>
              The principles that shape how we work, advise, and build lasting partnerships with every client.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="ab-values-grid">
            {CORE_VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.07} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="ab-val-card" style={{ background: CREAM, border: '1px solid rgba(181,137,59,0.12)', borderRadius: '22px', padding: '36px 28px', textAlign: 'center', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', height: '100%', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${val.color}, ${val.color}60)`, transform: 'scaleX(0)', transition: 'transform 0.4s ease', transformOrigin: 'left' }} className="ab-val-bar" />
                    <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: val.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: val.color, margin: '0 auto 20px', transition: 'transform 0.3s ease' }}>
                      <Icon size={26} />
                    </div>
                    <h3 style={{ fontFamily: 'Syne, serif', fontSize: '18px', fontWeight: 700, color: DEEP, margin: '0 0 12px' }}>{val.title}</h3>
                    <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{val.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INTERNATIONAL STANDARDS STRIP
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 0', background: WHITE }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <h2 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 700, color: '#0D2A52', margin: '0 0 12px', lineHeight: 1.2 }}>
              Built on International Standards.{' '}
              <span style={{ color: '#B5893B' }}>Trusted Across Markets.</span>
            </h2>
            <p style={{ fontSize: '14.5px', color: '#6b7280', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto', fontStyle: 'italic' }}>
              Our commitment to quality, compliance, sustainability, and ethical practices is reflected through globally recognized certification frameworks.
            </p>
          </motion.div>

          {/* Marquee Row 1 — scrolls LEFT */}
          <div className="cert-marquee-wrap" style={{ marginBottom: '16px' }}>
            <div className="cert-marquee-track cert-scroll-left">
              {[...Array(4)].map((_, set) => (
                <div key={set} className="cert-marquee-set">
                  {['/brand1.png','/brand2.png','/brand3.png','/brand4.png','/brand5.png','/brand6.png','/brand7.png'].map((src, i) => (
                    <div key={i} className="cert-logo-card">
                      <img src={src} alt={`Cert logo ${i + 1}`} style={{ maxWidth: '100%', maxHeight: '52px', objectFit: 'contain', display: 'block' }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 — scrolls RIGHT */}
          <div className="cert-marquee-wrap">
            <div className="cert-marquee-track cert-scroll-right">
              {[...Array(4)].map((_, set) => (
                <div key={set} className="cert-marquee-set">
                  {['/brand8.png','/brand9.png','/brand10.png','/brand11.png','/brand12.png','/brand13.png','/brand14.png'].map((src, i) => (
                    <div key={i} className="cert-logo-card">
                      <img src={src} alt={`Cert logo ${i + 8}`} style={{ maxWidth: '100%', maxHeight: '52px', objectFit: 'contain', display: 'block' }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. OUR EXPERTISE
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: CREAM, borderTop: '1px solid rgba(181,137,59,0.1)', borderBottom: '1px solid rgba(181,137,59,0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>What We Do</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px' }}>Our Expertise</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto 18px', borderRadius: '2px' }} />
            <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.75, maxWidth: '640px', margin: '0 auto' }}>
              Our consulting capabilities span multiple areas of the cosmetic and personal care industry.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '28px' }} className="ab-exp-grid">
            {EXPERTISE_AREAS.map((area, i) => {
              const Icon = area.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="ab-exp-card" style={{ background: WHITE, border: '1px solid rgba(181,137,59,0.12)', borderRadius: '20px', padding: '32px', display: 'flex', gap: '20px', alignItems: 'flex-start', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', height: '100%' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${area.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: area.color, flexShrink: 0, border: `1px solid ${area.color}25` }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'Syne, serif', fontSize: '17px', fontWeight: 700, color: DEEP, margin: '0 0 10px', lineHeight: 1.3 }}>{area.title}</h3>
                      <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{area.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.2}>
            <p style={{ textAlign: 'center', fontSize: '15px', color: MUTED, lineHeight: 1.7, maxWidth: '780px', margin: '20px auto 0' }}>
              Businesses exploring our specialized consulting solutions can learn more through our service offerings across product development, manufacturing, and operational planning.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. CAPABILITIES
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: WHITE }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="ab-cap-grid">
            <ScrollReveal>
              <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Our Capabilities</span>
              <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.2 }}>Infrastructure &<br /><span style={{ color: GOLD }}>Service Capabilities</span></h2>
              <div style={{ width: '48px', height: '3px', background: GOLD, borderRadius: '2px', marginBottom: '22px' }} />
              <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '32px' }}>
                Modern cosmetic businesses require access to technical knowledge, industry insights, and scalable development frameworks. Our capabilities are designed to meet those demands at every stage.
              </p>
              <button onClick={() => openModal('about_capabilities')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', background: GOLD, color: WHITE, border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: `0 6px 20px ${GOLD}40`, transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                Discuss Your Project <ArrowRight size={16} />
              </button>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <div style={{ background: CREAM, border: '1px solid rgba(181,137,59,0.15)', borderRadius: '24px', padding: '40px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})` }} />
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: GOLD, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>What We Offer</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px' }}>
                  {CAPABILITIES.map((cap, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#2d2736', lineHeight: 1.4 }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: `${GOLD}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={11} strokeWidth={3} color={GOLD} />
                      </div>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(181,137,59,0.12)', fontSize: '13.5px', color: MUTED, lineHeight: 1.7 }}>
                  This integrated approach allows us to support businesses at different stages of growth while maintaining alignment between technical, operational, and commercial objectives.
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. GLOBAL NETWORK
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: `linear-gradient(135deg, ${DEEP} 0%, #0b2244 60%, ${DEEP} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,137,59,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="ab-global-grid">
            {/* Left */}
            <ScrollReveal>
              <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Global Network</span>
              <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: WHITE, margin: '0 0 16px', lineHeight: 1.15 }}>Supporting Cosmetic<br /><span style={{ color: GOLD }}>Businesses Globally</span></h2>
              <div style={{ width: '48px', height: '3px', background: GOLD, borderRadius: '2px', marginBottom: '24px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'Consumer trends, ingredient innovations, and regulatory frameworks continue to influence opportunities across international markets.',
                  'EGC supports businesses seeking growth opportunities across India and emerging international markets through industry connections, market understanding, and strategic consulting support.',
                  'Our work is focused on helping businesses develop solutions that remain relevant, scalable, and competitive across diverse market environments.',
                ].map((p, i) => (
                  <p key={i} style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, margin: 0 }}>{p}</p>
                ))}
              </div>
            </ScrollReveal>

            {/* Right — region cards */}
            <ScrollReveal delay={0.15}>
              <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '36px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Global Presence</div>
                <div style={{ fontFamily: 'Syne, serif', fontSize: '17px', fontWeight: 700, color: WHITE, marginBottom: '24px' }}>5+ Regions · 15+ Service Areas</div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {GLOBAL_REGIONS.map((r, i) => {
                    const isHovered = activeCard === i;
                    return (
                      <div
                        key={i}
                        onMouseEnter={() => setActiveCard(i)}
                        onMouseLeave={() => setActiveCard(null)}
                        style={{
                          padding: '16px',
                          background: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '12px',
                          border: `1.5px solid ${isHovered ? r.color : 'rgba(255,255,255,0.1)'}`,
                          boxShadow: isHovered ? `0 8px 24px ${r.color}25` : 'none',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: r.color, boxShadow: `0 0 6px ${r.color}` }} />
                          <div style={{ fontSize: '14.5px', fontWeight: 700, color: WHITE }}>{r.region}</div>
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{r.expertise}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. WHY EGC
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: WHITE }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Why Choose Us</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px' }}>Why Businesses Choose EGC</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto 18px', borderRadius: '2px' }} />
            <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.75, maxWidth: '640px', margin: '0 auto' }}>
              Businesses partner with EGC because they need practical guidance that considers the complete business ecosystem — not just technical support.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }} className="ab-why-grid">
            <ScrollReveal style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ background: CREAM, border: '1px solid rgba(181,137,59,0.15)', borderRadius: '24px', padding: '44px', overflow: 'hidden', position: 'relative', height: '100%' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})` }} />
                <div style={{ fontFamily: 'Syne, serif', fontSize: '20px', fontWeight: 700, color: DEEP, marginBottom: '28px' }}>What Sets Us Apart</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {WHY_EGC.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', background: WHITE, borderRadius: '12px', border: '1px solid rgba(181,137,59,0.1)', fontSize: '14px', color: '#2d2736', lineHeight: 1.5, transition: 'all 0.3s ease' }} className="ab-why-item">
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `${GOLD}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={13} strokeWidth={3} color={GOLD} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.14} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%', justifyContent: 'space-between' }}>
                <div style={{ background: `linear-gradient(135deg, ${DEEP}, #071730)`, borderRadius: '20px', padding: '36px', position: 'relative', overflow: 'hidden', flexGrow: 1 }}>
                  <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}12, transparent 70%)` }} />
                  <Rocket size={32} color={GOLD} style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontFamily: 'Syne, serif', fontSize: '20px', fontWeight: 700, color: WHITE, margin: '0 0 12px' }}>Our Objective</h3>
                  <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: '0 0 8px' }}>Our objective is not simply to help businesses launch products.</p>
                  <p style={{ fontSize: '15px', color: WHITE, lineHeight: 1.75, margin: 0, fontWeight: 600 }}>Our objective is to help businesses build stronger, more resilient, and commercially successful cosmetic ventures.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[
                    { icon: Building2, label: 'Enterprise-Grade',    sub: 'Consulting standards' },
                    { icon: CheckCircle2, label: 'Proven Approach',   sub: 'Result-oriented' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} style={{ background: CREAM, border: '1px solid rgba(181,137,59,0.15)', borderRadius: '16px', padding: '22px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${GOLD}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, flexShrink: 0 }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: DEEP }}>{item.label}</div>
                          <div style={{ fontSize: '11.5px', color: MUTED, marginTop: '2px' }}>{item.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. CTA BANNER
      ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, ${DEEP} 0%, #0b2244 50%, #071730 100%)`, padding: '72px 40px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(181,137,59,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(181,137,59,0.05) 1px, transparent 1px)', backgroundSize: '52px 52px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}15 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <ScrollReveal style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, border: `1px solid ${GOLD}40`, borderRadius: '4px', padding: '6px 16px', marginBottom: '28px' }}>
            <Sparkles size={12} /> Ready to Begin
          </span>
          <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 700, color: WHITE, margin: '0 0 20px', lineHeight: 1.12 }}>
            Let's Build the Next Stage of<br />
            <span style={{ color: GOLD }}>Your Business</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '640px', margin: '0 auto 40px' }}>
            Whether you're developing a new cosmetic product, strengthening manufacturing capabilities, planning a production facility, or exploring growth opportunities — EGC is ready to support your journey.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => openModal('about_cta')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', background: GOLD, color: WHITE, border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', boxShadow: `0 10px 32px ${GOLD}50`, transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 18px 44px ${GOLD}60`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 10px 32px ${GOLD}50`; }}>
              Start Your Cosmetic Journey <ArrowRight size={17} />
            </button>
            <Link href="/services/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 28px', background: 'rgba(255,255,255,0.08)', color: WHITE, border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', fontWeight: 600, fontSize: '15px', textDecoration: 'none', backdropFilter: 'blur(8px)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
              Explore Our Services
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════
          10. FAQ
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: CREAM, borderTop: '1px solid rgba(181,137,59,0.1)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '44px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Have Questions?</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px' }}>Frequently Asked Questions</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto', borderRadius: '2px' }} />
          </ScrollReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div onClick={() => setOpenFaq(isOpen ? null : i)} style={{ background: WHITE, border: `1px solid ${isOpen ? GOLD : 'rgba(181,137,59,0.15)'}`, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', boxShadow: isOpen ? `0 8px 28px ${GOLD}12` : '0 2px 10px rgba(27,11,48,0.03)', transition: 'all 0.35s ease' }}>
                    <div style={{ padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: isOpen ? GOLD : 'rgba(181,137,59,0.4)', fontFamily: 'Syne, serif', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                        <span style={{ fontSize: '15.5px', fontWeight: 600, color: DEEP, lineHeight: 1.4 }}>{faq.q}</span>
                      </div>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isOpen ? GOLD : `${GOLD}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s ease' }}>
                        <ChevronDown size={16} color={isOpen ? WHITE : GOLD} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s ease' }} />
                      </div>
                    </div>
                    {isOpen && (
                      <div style={{ padding: '0 28px 24px 60px', borderTop: `1px solid ${GOLD}12`, animation: 'abFadeIn 0.3s ease' }}>
                        <p style={{ fontSize: '14.5px', color: MUTED, lineHeight: 1.8, margin: '16px 0 0' }}>{faq.a}</p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* ── STYLES ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes abFloatA {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
        @keyframes abFloatB {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-13px); }
        }
        @keyframes abFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Marquee ── */
        @keyframes certScrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes certScrollRight {
          0%   { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }

        .cert-marquee-wrap {
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .cert-marquee-track { display: flex; width: max-content; }

        .cert-scroll-left  { animation: certScrollLeft  28s linear infinite; }
        .cert-scroll-right { animation: certScrollRight 28s linear infinite; }

        .cert-marquee-wrap:hover .cert-marquee-track {
          animation-play-state: paused;
        }

        .cert-marquee-set {
          display: flex;
          gap: 16px;
          padding-right: 16px;
          flex-shrink: 0;
        }

        .cert-logo-card {
          background: #fff;
          border: 1px solid rgba(181,137,59,0.15);
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(13,42,82,0.04);
          height: 80px;
          min-width: 110px;
          flex-shrink: 0;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
          cursor: default;
        }

        .cert-logo-card:hover {
          border-color: rgba(181,137,59,0.45);
          box-shadow: 0 6px 20px rgba(181,137,59,0.12);
          transform: translateY(-3px);
        }

        .ab-vm-card:hover {
          transform: translateY(-7px) !important;
          box-shadow: 0 20px 50px rgba(27,11,48,0.08) !important;
        }
        .ab-val-card:hover {
          transform: translateY(-8px) !important;
          border-color: rgba(181,137,59,0.3) !important;
          box-shadow: 0 20px 48px rgba(27,11,48,0.08) !important;
        }
        .ab-val-card:hover .ab-val-bar {
          transform: scaleX(1) !important;
        }
        .ab-exp-card:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(181,137,59,0.3) !important;
          box-shadow: 0 18px 44px rgba(27,11,48,0.08) !important;
        }
        .ab-why-item:hover {
          border-color: rgba(181,137,59,0.3) !important;
          background: rgba(181,137,59,0.03) !important;
          transform: translateX(4px) !important;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .ab-hero-grid    { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ab-vm-grid      { grid-template-columns: 1fr !important; }
          .ab-founder-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ab-cap-grid     { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ab-global-grid  { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ab-why-grid     { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .ab-values-grid { grid-template-columns: repeat(2,1fr) !important; gap: 16px !important; }
          .ab-exp-grid    { grid-template-columns: 1fr !important; }
          .ab-hero-right  { display: none !important; }
          .ab-region-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 680px) {
          .ab-hero-grid    { padding: 48px 16px !important; }
          .ab-section-pad  { padding: 48px 16px !important; }
          .ab-stats-row    { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 520px) {
          .ab-values-grid { grid-template-columns: 1fr !important; }
          .ab-region-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 420px) {
          .ab-vm-card     { padding: 28px 20px !important; }
        }

      `}} />
    </div>
  );
}
