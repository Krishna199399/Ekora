'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Send, CheckCircle2, User, Building, Phone, Globe, HelpCircle,
  Mail, Clock, MapPin, MessageSquare, Sparkles, ArrowRight,
  ShieldCheck, Award, Microscope, TrendingUp, X
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Counter from '../components/Counter';

/* ─── Brand Tokens ─────────────────────────────────────── */
const DEEP  = '#0D2A52';
const GOLD  = '#B5893B';
const GOLD2 = '#D4AF37';
const CREAM = '#FAF9F7';
const WHITE = '#FFFFFF';
const MUTED = '#5c526b';

/* ─── Data ─────────────────────────────────────────────── */
const INFO_CARDS = [
  { icon: MessageSquare, color: '#b5893b', bg: 'rgba(181,137,59,0.1)',   title: 'Expert Consultation',  desc: 'Tailored solutions for your unique cosmetic business needs with deep industry experience across formulation, manufacturing, and commercialization.' },
  { icon: Globe,         color: '#7b5cb7', bg: 'rgba(123,92,183,0.1)',   title: 'Global Reach',          desc: 'Supporting brands across 20+ countries with localized expertise in FDA, EU CPNP, CDSCO, and regional compliance frameworks.' },
  { icon: ShieldCheck,   color: '#5a8a6b', bg: 'rgba(90,138,107,0.1)',   title: 'End-to-End Support',    desc: 'From laboratory concept to factory shelf, we guide you through every stage of development, compliance, and commercialization.' },
  { icon: Clock,         color: '#c06b8a', bg: 'rgba(192,107,138,0.1)',  title: 'Fast Response',         desc: 'We typically respond within 24–48 hours with personalized solutions and clearly defined next steps for your project.' },
];

const STATS = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '20+',  label: 'Countries Served' },
  { value: '15+',  label: 'Service Areas' },
  { value: '48h',  label: 'Response Time' },
];

/* ─── Main Component ───────────────────────────────────── */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', country: '', interest: '', project: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: '' });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim())    errors.name     = 'Full name is required';
    if (!formData.email.trim())   errors.email    = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email address is invalid';
    if (!formData.company.trim()) errors.company  = 'Company name is required';
    if (!formData.country)        errors.country  = 'Country selection is required';
    if (!formData.interest)       errors.interest = 'Area of interest is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => { setIsSubmitting(false); setIsSubmitted(true); }, 1400);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', company: '', phone: '', country: '', interest: '', project: '' });
    setFormErrors({});
    setIsSubmitted(false);
  };

  const inputStyle = (name) => ({
    width: '100%', padding: '13px 14px 13px 44px',
    border: `1.5px solid ${formErrors[name] ? '#e05555' : focusedField === name ? GOLD : 'rgba(181,137,59,0.2)'}`,
    borderRadius: '10px', fontSize: '14px', fontFamily: 'var(--font-sans)',
    color: DEEP, background: focusedField === name ? WHITE : CREAM,
    outline: 'none', transition: 'all 0.25s ease',
    boxShadow: focusedField === name ? `0 0 0 3px ${GOLD}18` : 'none',
  });

  const selectStyle = (name) => ({
    ...inputStyle(name),
    cursor: 'pointer', appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%237c728a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center',
  });

  return (
    <div style={{ background: CREAM, paddingTop: '80px', fontFamily: 'var(--font-sans)', color: DEEP }}>

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section className="cp-hero-section" style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, ${DEEP} 0%, #0b2244 50%, #071730 100%)`, minHeight: '520px', display: 'flex', alignItems: 'center' }}>
        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(181,137,59,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(181,137,59,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        {/* Glows */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,137,59,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,92,183,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="cp-hero-wrap" style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 40px', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="cp-hero-grid">
            {/* Left */}
            <div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, border: `1px solid ${GOLD}40`, borderRadius: '4px', padding: '6px 16px', marginBottom: '28px' }}>
                <Sparkles size={12} /> Let's Connect
              </span>
              <h1 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(30px, 3.8vw, 52px)', fontWeight: 700, color: WHITE, margin: '0 0 20px', lineHeight: 1.12, letterSpacing: '-0.5px' }}>
                Get In Touch With<br />
                <span style={{ color: GOLD }}>Our Consulting</span> Experts
              </h1>
              <div style={{ width: '52px', height: '3px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})`, borderRadius: '2px', marginBottom: '22px' }} />
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '520px' }}>
                Whether you're launching a brand, developing products, planning a factory, or expanding globally, our cosmetic consulting experts are ready to help you succeed.
              </p>
              <div className="cp-contact-links" style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                {[
                  { icon: Mail,   label: 'info@ekoraglobalconsulting.com',  href: 'mailto:info@ekoraglobalconsulting.com' },
                  { icon: Phone,  label: '+91 78929 78516',                 href: 'tel:+917892978516' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <a key={i} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = GOLD}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: `${GOLD}18`, border: `1px solid ${GOLD}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD }}>
                        <Icon size={15} />
                      </div>
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right — stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="cp-hero-stats">
              {STATS.map((stat, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px', padding: '28px 22px', textAlign: 'center', animation: `cpFloat${i % 2 === 0 ? 'A' : 'B'} ${3.5 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
                  <div style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(32px, 3.5vw, 44px)', fontWeight: 800, color: GOLD, lineHeight: 1, marginBottom: '8px' }}>
                    <Counter value={stat.value} />
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, letterSpacing: '0.5px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. MAIN — Info + Form
      ══════════════════════════════════════════════════ */}
      <section className="cp-main-section" style={{ padding: '72px 0', background: WHITE }}>
        <div className="cp-main-wrap" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '72px', alignItems: 'start' }} className="cp-main-grid">

            {/* ── LEFT: Info ── */}
            <div>
              <ScrollReveal>
                <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Why Choose EGC</span>
                <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, color: DEEP, margin: '0 0 14px', lineHeight: 1.2 }}>Partnering for<br /><span style={{ color: GOLD }}>Cosmetic Success</span></h2>
                <div style={{ width: '48px', height: '3px', background: GOLD, borderRadius: '2px', marginBottom: '22px' }} />
                <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '40px' }}>
                  We're committed to transforming your cosmetic vision into reality with end-to-end expertise across formulation science, manufacturing engineering, regulatory compliance, and business strategy.
                </p>
              </ScrollReveal>

              {/* Info cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                {INFO_CARDS.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <ScrollReveal key={i} delay={i * 0.08} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div className="cp-info-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', background: CREAM, border: '1px solid rgba(181,137,59,0.12)', borderRadius: '16px', padding: '22px 24px', transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)', cursor: 'default', height: '100%' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, flexShrink: 0 }}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 style={{ fontFamily: 'Syne, serif', fontSize: '16px', fontWeight: 700, color: DEEP, margin: '0 0 6px' }}>{card.title}</h3>
                          <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.65, margin: 0 }}>{card.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* Direct contact */}
              <ScrollReveal delay={0.2}>
                <div className="cp-direct-box" style={{ background: `linear-gradient(135deg, ${DEEP}, #071730)`, borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}15, transparent 70%)`, pointerEvents: 'none' }} />
                  <div style={{ fontSize: '11px', fontWeight: 700, color: GOLD, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Direct Contact</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { icon: Mail,   label: 'info@ekoraglobalconsulting.com', href: 'mailto:info@ekoraglobalconsulting.com' },
                      { icon: Phone,  label: '+91 78929 78516',                href: 'tel:+917892978516' },
                      { icon: MapPin, label: 'No. 39/3, Richmond Road, Bengaluru, India', href: null },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      const inner = (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: `${GOLD}18`, border: `1px solid ${GOLD}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, flexShrink: 0 }}>
                            <Icon size={15} />
                          </div>
                          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{item.label}</span>
                        </div>
                      );
                      return item.href
                        ? <a key={i} href={item.href} style={{ textDecoration: 'none', display: 'block', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>{inner}</a>
                        : <div key={i}>{inner}</div>;
                    })}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* ── RIGHT: Form ── */}
            <ScrollReveal delay={0.12}>
              <div style={{ background: WHITE, borderRadius: '24px', border: '1px solid rgba(181,137,59,0.15)', boxShadow: '0 30px 80px rgba(27,11,48,0.08)', overflow: 'hidden' }}>
                {/* Top bar */}
                <div style={{ height: '4px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2}, ${GOLD})` }} />
                <div style={{ padding: '44px 44px 48px' }} className="cp-form-pad">

                  {/* Header */}
                  <div style={{ marginBottom: '36px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: `${GOLD}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD }}>
                        <Send size={16} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: GOLD }}>Send Us a Message</span>
                    </div>
                    <h3 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 700, color: DEEP, margin: '0 0 10px' }}>Start Your Consultation</h3>
                    <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.65, margin: 0 }}>Fill out the form below and our expert team will reach out with a tailored solution within 24–48 hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Name & Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="cp-form-row">
                      {/* Name */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                        <label style={{ fontSize: '12.5px', fontWeight: 700, color: DEEP, letterSpacing: '0.3px' }}>Full Name <span style={{ color: GOLD }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                          <User size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'name' ? GOLD : '#9e94ae', pointerEvents: 'none', transition: 'color 0.2s' }} />
                          <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange}
                            onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                            placeholder="John Doe" style={inputStyle('name')} />
                        </div>
                        {formErrors.name && <span style={{ fontSize: '11px', color: '#e05555', marginTop: '-2px' }}>{formErrors.name}</span>}
                      </div>
                      {/* Email */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                        <label style={{ fontSize: '12.5px', fontWeight: 700, color: DEEP, letterSpacing: '0.3px' }}>Email Address <span style={{ color: GOLD }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                          <Mail size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'email' ? GOLD : '#9e94ae', pointerEvents: 'none', transition: 'color 0.2s' }} />
                          <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange}
                            onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                            placeholder="john@company.com" style={inputStyle('email')} />
                        </div>
                        {formErrors.email && <span style={{ fontSize: '11px', color: '#e05555', marginTop: '-2px' }}>{formErrors.email}</span>}
                      </div>
                    </div>

                    {/* Company & Phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="cp-form-row">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                        <label style={{ fontSize: '12.5px', fontWeight: 700, color: DEEP, letterSpacing: '0.3px' }}>Company Name <span style={{ color: GOLD }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                          <Building size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'company' ? GOLD : '#9e94ae', pointerEvents: 'none', transition: 'color 0.2s' }} />
                          <input type="text" name="company" id="company" value={formData.company} onChange={handleInputChange}
                            onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)}
                            placeholder="Your Company" style={inputStyle('company')} />
                        </div>
                        {formErrors.company && <span style={{ fontSize: '11px', color: '#e05555', marginTop: '-2px' }}>{formErrors.company}</span>}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                        <label style={{ fontSize: '12.5px', fontWeight: 700, color: DEEP, letterSpacing: '0.3px' }}>Phone Number</label>
                        <div style={{ position: 'relative' }}>
                          <Phone size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'phone' ? GOLD : '#9e94ae', pointerEvents: 'none', transition: 'color 0.2s' }} />
                          <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleInputChange}
                            onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)}
                            placeholder="+91 00000 00000" style={inputStyle('phone')} />
                        </div>
                      </div>
                    </div>

                    {/* Country */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: 700, color: DEEP, letterSpacing: '0.3px' }}>Country / Region <span style={{ color: GOLD }}>*</span></label>
                      <div style={{ position: 'relative' }}>
                        <Globe size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'country' ? GOLD : '#9e94ae', pointerEvents: 'none', transition: 'color 0.2s', zIndex: 1 }} />
                        <select name="country" id="country" value={formData.country} onChange={handleInputChange}
                          onFocus={() => setFocusedField('country')} onBlur={() => setFocusedField(null)}
                          style={selectStyle('country')}>
                          <option value="">Select your country</option>
                          <option value="India">India</option>
                          <option value="USA">United States</option>
                          <option value="Europe">Europe (EU)</option>
                          <option value="UAE">United Arab Emirates</option>
                          <option value="Singapore">Singapore</option>
                          <option value="China">China</option>
                          <option value="Japan">Japan</option>
                          <option value="Australia">Australia</option>
                          <option value="Other">Other Region</option>
                        </select>
                      </div>
                      {formErrors.country && <span style={{ fontSize: '11px', color: '#e05555', marginTop: '-2px' }}>{formErrors.country}</span>}
                    </div>

                    {/* Interest */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: 700, color: DEEP, letterSpacing: '0.3px' }}>Area of Interest <span style={{ color: GOLD }}>*</span></label>
                      <div style={{ position: 'relative' }}>
                        <HelpCircle size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: focusedField === 'interest' ? GOLD : '#9e94ae', pointerEvents: 'none', transition: 'color 0.2s', zIndex: 1 }} />
                        <select name="interest" id="interest" value={formData.interest} onChange={handleInputChange}
                          onFocus={() => setFocusedField('interest')} onBlur={() => setFocusedField(null)}
                          style={selectStyle('interest')}>
                          <option value="">Select your interest</option>
                          <option value="R&D Formulation">Cosmetic R&D &amp; Formulation</option>
                          <option value="Factory Setup">Plant Setup &amp; Factory Planning</option>
                          <option value="Turnkey Solutions">Turnkey Project Solutions</option>
                          <option value="Manufacturing">Manufacturing Consulting</option>
                          <option value="Regulatory">Regulatory Compliance</option>
                          <option value="Private Label">Private Label Manufacturing</option>
                          <option value="DPR">DPR &amp; Business Consulting</option>
                          <option value="Branding">Branding &amp; Go-to-Market</option>
                          <option value="All Services">Full Scale Advisory Suite</option>
                        </select>
                      </div>
                      {formErrors.interest && <span style={{ fontSize: '11px', color: '#e05555', marginTop: '-2px' }}>{formErrors.interest}</span>}
                    </div>

                    {/* Message */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      <label style={{ fontSize: '12.5px', fontWeight: 700, color: DEEP, letterSpacing: '0.3px' }}>Tell Us About Your Project</label>
                      <textarea name="project" id="project" value={formData.project} onChange={handleInputChange}
                        onFocus={() => setFocusedField('project')} onBlur={() => setFocusedField(null)}
                        placeholder="Share your requirements, timeline, and any specific questions..."
                        rows="5"
                        style={{
                          width: '100%', padding: '13px 16px', resize: 'vertical',
                          border: `1.5px solid ${focusedField === 'project' ? GOLD : 'rgba(181,137,59,0.2)'}`,
                          borderRadius: '10px', fontSize: '14px', fontFamily: 'var(--font-sans)',
                          color: DEEP, background: focusedField === 'project' ? WHITE : CREAM,
                          outline: 'none', transition: 'all 0.25s ease',
                          boxShadow: focusedField === 'project' ? `0 0 0 3px ${GOLD}18` : 'none',
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={isSubmitting} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px 32px', background: isSubmitting ? '#9e8060' : GOLD, color: WHITE, border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-sans)', cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: `0 6px 22px ${GOLD}40`, transition: 'all 0.3s ease' }}
                      onMouseEnter={e => { if (!isSubmitting) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${GOLD}50`; } }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 6px 22px ${GOLD}40`; }}>
                      {isSubmitting
                        ? <><span style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: WHITE, animation: 'cpSpin 0.8s linear infinite', display: 'inline-block' }} /> Sending...</>
                        : <><Send size={17} /> Send Message</>
                      }
                    </button>

                    {/* Trust note */}
                    <div className="cp-trust-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', paddingTop: '4px' }}>
                      {['Confidential', '24–48h Response', 'No Spam'].map((t, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: '#9e94ae', fontWeight: 500 }}>
                          <CheckCircle2 size={12} color={GOLD} /> {t}
                        </div>
                      ))}
                    </div>
                  </form>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. TRUST / WHY SECTION
      ══════════════════════════════════════════════════ */}
      <section className="cp-process-section" style={{ padding: '80px 0', background: CREAM, borderTop: '1px solid rgba(181,137,59,0.1)' }}>
        <div className="cp-process-wrap" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>What to Expect</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: DEEP, margin: '0 0 16px' }}>Our Consulting Process</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto', borderRadius: '2px' }} />
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="cp-process-grid">
            {[
              { num: '01', icon: MessageSquare, title: 'You Reach Out',        desc: 'Submit your inquiry through our contact form or reach us directly by email or phone.' },
              { num: '02', icon: Microscope,    title: 'We Review',             desc: 'Our consulting team reviews your requirements and prepares a tailored response within 24–48 hours.' },
              { num: '03', icon: Award,          title: 'Strategy Session',     desc: 'We schedule a discovery call to understand your project scope, goals, and timeline in detail.' },
              { num: '04', icon: TrendingUp,    title: 'Consulting Begins',     desc: 'We develop your customized consulting plan and begin delivering measurable results.' },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.09} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="cp-process-card" style={{ background: WHITE, border: '1px solid rgba(181,137,59,0.12)', borderRadius: '20px', padding: '32px 26px', textAlign: 'center', position: 'relative', overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', height: '100%' }}>
                    <div style={{ position: 'absolute', top: '14px', right: '18px', fontFamily: 'Syne, serif', fontSize: '52px', fontWeight: 800, color: `${GOLD}08`, lineHeight: 1, userSelect: 'none' }}>{step.num}</div>
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${GOLD}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, margin: '0 auto 20px' }}>
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontFamily: 'Syne, serif', fontSize: '16px', fontWeight: 700, color: DEEP, margin: '0 0 10px' }}>{step.title}</h3>
                    <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SUCCESS MODAL
      ══════════════════════════════════════════════════ */}
      {isSubmitted && (
        <div onClick={handleReset} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(27,11,48,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', animation: 'cpFadeIn 0.3s ease' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: WHITE, borderRadius: '24px', maxWidth: '520px', width: '100%', boxShadow: '0 40px 100px rgba(0,0,0,0.4)', border: '1px solid rgba(181,137,59,0.25)', overflow: 'hidden', animation: 'cpScaleIn 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
            <div style={{ height: '4px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})` }} />
            <div style={{ padding: '48px 44px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `${GOLD}12`, border: `2px solid ${GOLD}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', animation: 'cpScaleIn 0.4s ease 0.1s both' }}>
                <CheckCircle2 size={40} color={GOLD} />
              </div>
              <h3 style={{ fontFamily: 'Syne, serif', fontSize: '26px', fontWeight: 700, color: DEEP, marginBottom: '14px' }}>Message Sent Successfully!</h3>
              <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.75, marginBottom: '32px' }}>
                Thank you, <strong style={{ color: DEEP }}>{formData.name}</strong>. We've received your enquiry regarding <strong style={{ color: GOLD }}>{formData.interest}</strong>. Our expert team will contact you at <strong style={{ color: DEEP }}>{formData.email}</strong> within 1–2 business days.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={handleReset} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', background: GOLD, color: WHITE, border: 'none', borderRadius: '9px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: `0 6px 20px ${GOLD}40`, transition: 'all 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <ArrowRight size={15} /> Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STYLES ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cpFloatA {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes cpFloatB {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes cpSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes cpFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cpScaleIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }

        .cp-info-card:hover {
          transform: translateY(-5px) !important;
          border-color: rgba(181,137,59,0.3) !important;
          box-shadow: 0 16px 40px rgba(27,11,48,0.08) !important;
        }
        .cp-process-card:hover {
          transform: translateY(-7px) !important;
          border-color: rgba(181,137,59,0.3) !important;
          box-shadow: 0 20px 48px rgba(27,11,48,0.08) !important;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .cp-hero-grid    { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cp-hero-stats   { display: none !important; }
          .cp-main-grid    { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cp-process-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
          .cp-hero-section { min-height: auto !important; }
          .cp-hero-wrap    { padding: 48px 20px !important; }
          .cp-main-section { padding: 48px 0 !important; }
          .cp-main-wrap    { padding: 0 16px !important; }
          .cp-process-section { padding: 48px 0 !important; }
          .cp-process-wrap { padding: 0 16px !important; }
          .cp-process-grid { grid-template-columns: 1fr !important; }
          .cp-form-row     { grid-template-columns: 1fr !important; }
          .cp-form-pad     { padding: 28px 20px 32px !important; }
          .cp-contact-links { flex-direction: column !important; gap: 14px !important; }
          .cp-trust-row    { flex-wrap: wrap !important; gap: 10px 16px !important; }
          .cp-info-card    { padding: 18px 16px !important; }
          .cp-direct-box   { padding: 24px 20px !important; }
        }
        @media (max-width: 420px) {
          .cp-hero-wrap    { padding: 36px 16px !important; }
          .cp-form-pad     { padding: 20px 14px 24px !important; }
          .cp-process-card { padding: 24px 18px !important; }
        }

      `}} />
    </div>
  );
}
