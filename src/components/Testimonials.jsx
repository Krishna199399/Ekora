'use client';

import React from 'react';
import { Star, MessageSquare, ArrowRight, Calendar, Mail, PhoneCall, MapPin, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useConsultationModal } from '../context/ConsultationModalContext';

/* ─── Reveal ─────────────────────────────────────────────── */
function Reveal({ children, delay = 0, dir = 'up', style = {} }) {
  let direction = 'up';
  let distance = 28;
  if (dir === 'left') {
    direction = 'left';
  } else if (dir === 'right') {
    direction = 'right';
  } else if (dir === 'scale') {
    direction = 'scale';
    distance = 20;
  }
  return (
    <ScrollReveal delay={delay / 1000} duration={0.7} direction={direction} distance={distance} style={style}>
      {children}
    </ScrollReveal>
  );
}

const REVIEWS = [
  { name: 'Sarah Mitchell', role: 'Head of R&D', company: 'LuxeSkin Labs, USA', avatar: '/images/assets/avatar_sarah.png', text: 'EGC Ekora Global Consulting is more than a service provider; they are a true innovation partner. Their scientific expertise and end to end support helped us launch with confidence in highly competitive markets.' },
  { name: 'Marco Bianchil', role: 'CEO', company: 'Bella Vita Cosmetics, Italy', avatar: '/images/assets/avatar_marco.png', text: 'From formulation to factory setup and regulatory compliance, their team delivered beyond expectations. Their attention to detail and global knowledge are unmatched.' },
  { name: 'Mei Ling Tan', role: 'VP Operations', company: 'NaturaGlow, Singapore', avatar: '/images/assets/avatar_mei.png', text: 'Their regulatory expertise and understanding of global standards made our international expansion smooth and risk-free. A reliable partner we can always count on.' },
];

const LOGOS = ['LUXE SKIN LABS', 'BELLA VITA COSMETICS', 'NATURAGLOW BEAUTY', 'PURE ESSENCE BOTANICALS', 'GLOWIX BEAUTY', 'DERMA FUTURE SCIENCE', 'VELVETIQUE PARIS'];

export default function Testimonials() {
  const { openModal } = useConsultationModal();
  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="testimonials" style={{ background: '#FAF9F7', padding: '0 0 60px 0', borderBottom: '1px solid rgba(181,137,59,0.1)', overflow: 'hidden', position: 'relative' }}>



      {/* Dot pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(13,42,82,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1340px', margin: '0 auto', padding: '60px 40px', display: 'flex', flexDirection: 'column', gap: '48px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <Reveal dir="up">
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '28px', height: '2px', background: '#0D2A52', borderRadius: '2px' }} />
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#0D2A52', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>Trusted by Global Leaders</span>
              <div style={{ width: '28px', height: '2px', background: '#0D2A52', borderRadius: '2px' }} />
            </div>
            <h2 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: 'clamp(28px, 3.5vw, 46px)', color: '#0D2A52', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
              Proven Excellence.<br /><span style={{ color: '#B5893B' }}>Trusted Worldwide.</span>
            </h2>
            <div style={{ width: '44px', height: '2.5px', background: 'linear-gradient(90deg, #B5893B, #D4AF37)', borderRadius: '2px' }} />
            <p style={{ fontSize: '15.5px', color: '#4a5568', maxWidth: '640px', margin: 0, lineHeight: 1.75, fontFamily: 'var(--font-sans)' }}>
              We partner with beauty brands, manufacturers, investors, wellness companies, and product innovators to transform ideas into commercially successful cosmetic businesses.
            </p>
          </div>
        </Reveal>

        {/* Review cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }} className="tm-reviews-grid">
          {REVIEWS.map((rev, i) => (
            <Reveal key={i} delay={i * 80} dir="scale">
              <div style={{
                background: 'white', border: '1px solid rgba(13,42,82,0.1)', borderTop: '3px solid #0D2A52',
                borderRadius: '18px', padding: '32px', textAlign: 'left',
                display: 'flex', flexDirection: 'column', gap: '22px',
                boxShadow: '0 8px 28px rgba(13,42,82,0.06)', position: 'relative',
                transition: 'all 0.3s ease', height: '100%',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderTopColor = '#B5893B'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(13,42,82,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderTopColor = '#0D2A52'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(13,42,82,0.06)'; }}>

                {/* Large quote mark */}
                <div style={{ position: 'absolute', top: '18px', right: '22px', color: 'rgba(13,42,82,0.06)' }}>
                  <Quote size={72} />
                </div>

                {/* Stars */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={15} fill="#B5893B" color="#B5893B" />)}
                </div>

                {/* Text */}
                <p style={{ fontSize: '14.5px', color: '#4a5568', lineHeight: 1.75, flexGrow: 1, margin: 0, fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>
                  "{rev.text}"
                </p>

                {/* Author */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', borderTop: '1px solid rgba(13,42,82,0.08)', paddingTop: '18px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #0D2A52, #B5893B)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px', fontWeight: 800, color: 'white', fontFamily: 'Syne, var(--font-serif)' }}>
                    {rev.name[0]}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0D2A52', margin: 0, fontFamily: 'Syne, var(--font-serif)' }}>{rev.name}</h4>
                    <span style={{ fontSize: '11.5px', color: '#6b7280', fontFamily: 'var(--font-sans)' }}>{rev.role}, <strong style={{ color: '#B5893B' }}>{rev.company}</strong></span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Logo marquee */}
        <Reveal>
          <div style={{ borderTop: '1px solid rgba(181,137,59,0.2)', borderBottom: '1px solid rgba(181,137,59,0.2)', padding: '24px 0', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #FAF9F7, transparent)', zIndex: 2 }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #FAF9F7, transparent)', zIndex: 2 }} />
            <div style={{ display: 'inline-block', animation: 'tmMarquee 28s linear infinite', fontSize: '11px', fontWeight: 800, color: '#9ca3af', letterSpacing: '3px', whiteSpace: 'nowrap' }}>
              {LOGOS.concat(LOGOS).map((logo, idx) => (
                <span key={idx} style={{ padding: '0 44px', borderRight: '1px solid rgba(181,137,59,0.25)' }}>{logo}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA Banner — navy */}
        <Reveal dir="up">
          <div style={{
            background: 'linear-gradient(135deg, #0D2A52 0%, #091f3d 100%)',
            borderRadius: '24px', padding: '64px 72px',
            color: 'white', display: 'grid', gridTemplateColumns: '1fr 1.1fr',
            gap: '52px', alignItems: 'center', textAlign: 'left',
            boxShadow: '0 28px 72px rgba(13,42,82,0.35)',
            border: '1px solid rgba(181,137,59,0.15)',
            position: 'relative', overflow: 'hidden',
          }} className="tm-cta-banner">
            {/* Gold glow */}
            <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '360px', height: '360px', background: 'radial-gradient(circle, rgba(181,137,59,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ height: '3px', position: 'absolute', top: 0, left: 0, right: 0, background: 'linear-gradient(90deg, transparent, #B5893B, #D4AF37, transparent)' }} />

            {/* Image side */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', minHeight: '300px', alignItems: 'center' }} className="tm-cta-img-wrap">
              <div style={{ position: 'absolute', width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(181,137,59,0.3) 0%, transparent 65%)', filter: 'blur(40px)', zIndex: 1 }} />
              <div style={{ position: 'absolute', width: '100%', maxWidth: '360px', height: '240px', border: '1px solid rgba(181,137,59,0.3)', borderRadius: '20px', transform: 'rotate(5deg) translateY(12px) translateX(8px)', zIndex: 1 }} className="tm-cta-frame" />
              <img src="/ChatGPT Image Jun 1, 2026, 08_11_46 PM.png" alt="Luxury EGC formulations"
                style={{ width: '100%', maxWidth: '360px', height: 'auto', borderRadius: '18px', boxShadow: '0 25px 55px rgba(0,0,0,0.5)', transform: 'rotate(-3deg) translateY(-8px)', zIndex: 2, transition: 'all 0.5s ease', border: '1px solid rgba(255,255,255,0.08)' }}
                className="tm-cta-img" />
            </div>

            {/* Text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '2px', background: '#B5893B', borderRadius: '1px' }} />
                <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#B5893B', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>Let's Build Together</span>
              </div>
              <h3 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: 'clamp(24px, 2.5vw, 36px)', color: 'white', fontWeight: 800, margin: 0, lineHeight: 1.15 }}>
                Ready to Bring Your<br /><span style={{ color: '#B5893B' }}>Vision to Life?</span>
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.7, fontFamily: 'var(--font-sans)' }}>
                Whether you're developing a new brand, expanding globally, or optimizing your manufacturing, we're here to help.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="tm-contacts-grid">
                {[
                  { icon: Calendar, label: 'Book a Consultation', sub: '1-on-1 expert meeting', action: () => openModal('testimonials_booking'), href: null },
                  { icon: Mail, label: 'Email Us', sub: 'info@ekoraglobalconsulting.com', action: null, href: 'mailto:info@ekoraglobalconsulting.com' },
                  { icon: PhoneCall, label: 'Call Us', sub: '+91 78929 78516', action: null, href: 'tel:+917892978516' },
                  { icon: MapPin, label: 'Corporate HQ', sub: 'Richmond Rd, Bengaluru', action: null, href: null },
                ].map((item, i) => {
                  const Icon = item.icon;
                  const inner = (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'rgba(255,255,255,0.06)', padding: '13px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.09)', transition: 'all 0.25s ease', cursor: 'pointer' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(181,137,59,0.12)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
                      <Icon size={17} style={{ color: '#B5893B', flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, display: 'block', color: 'white', fontFamily: 'var(--font-sans)' }}>{item.label}</span>
                        <span style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-sans)' }}>{item.sub}</span>
                      </div>
                    </div>
                  );
                  if (item.href) return <a key={i} href={item.href} style={{ textDecoration: 'none' }}>{inner}</a>;
                  return <div key={i} onClick={item.action}>{inner}</div>;
                })}
              </div>
              <button onClick={() => openModal('testimonials_bottom_cta')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', background: 'linear-gradient(135deg, #B5893B, #D4AF37)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14.5px', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 6px 20px rgba(181,137,59,0.4)', fontFamily: 'var(--font-sans)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(181,137,59,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(181,137,59,0.4)'; }}>
                Get Consultation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes tmMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .tm-cta-banner:hover .tm-cta-img { transform: rotate(0deg) translateY(-14px) scale(1.03) !important; }
        .tm-cta-banner:hover .tm-cta-frame { transform: rotate(7deg) translateY(18px) translateX(10px) !important; border-color: rgba(181,137,59,0.5) !important; }
        @media (max-width: 900px) {
          .tm-cta-banner { grid-template-columns: 1fr !important; padding: 44px !important; }
          .tm-cta-img-wrap { min-height: 200px !important; }
        }
        @media (max-width: 680px) {
          #testimonials { padding-bottom: 56px !important; }
          #testimonials > div { padding: 56px 16px !important; gap: 40px !important; }
          .tm-reviews-grid { grid-template-columns: 1fr !important; }
          .tm-cta-banner { padding: 28px 20px !important; gap: 24px !important; }
          .tm-cta-img-wrap { min-height: 160px !important; }
        }
        @media (max-width: 420px) {
          .tm-contacts-grid { grid-template-columns: 1fr !important; }
          .tm-cta-banner { padding: 22px 14px !important; }
        }
      `}} />

    </section>
  );
}
