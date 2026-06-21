'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

/* ─── Reveal ─────────────────────────────────────────────── */
function Reveal({ children, delay = 0, style = {} }) {
  return (
    <ScrollReveal delay={delay / 1000} duration={0.65} direction="up" distance={24} style={style}>
      {children}
    </ScrollReveal>
  );
}

const FAQ_DATA = [
  { question: 'What does EGC Ekora Global Consulting do?', answer: 'EGC provides cosmetic product development, manufacturing consulting, factory setup planning, regulatory compliance support, commercialization strategy, and business advisory services for beauty and personal care companies.' },
  { question: 'Do you help with cosmetic manufacturing facility setup?', answer: 'Yes. We assist with factory planning, cleanroom design, equipment selection, workflow optimization, GMP alignment, and turnkey manufacturing project execution.' },
  { question: 'Can EGC support regulatory approvals and compliance?', answer: 'Yes. We provide guidance for FDA, MoCRA, CDSCO, BIS, EU CPNP, and other international cosmetic regulatory requirements.' },
  { question: 'Do you work with startups and emerging beauty brands?', answer: 'Yes. We support startups, D2C brands, private label businesses, manufacturers, wellness brands, dermatology companies, and multinational organizations.' },
  { question: 'Can you help commercialize a cosmetic product?', answer: 'Yes. Our team supports formulation development, scale-up, manufacturing planning, packaging strategy, compliance readiness, and go-to-market execution.' },
  { question: 'Do you support international expansion?', answer: 'Yes. We assist businesses with export readiness, international compliance requirements, product registration guidance, documentation support, and market-entry strategies.' },
  { question: 'Why choose EGC Ekora Global Consulting?', answer: 'EGC combines formulation science, manufacturing expertise, factory planning, regulatory consulting, and commercialization support under one advisory platform, helping cosmetic businesses move from concept to market with confidence.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" style={{ background: '#FAF9F7', padding: '0 0 80px 0', borderBottom: '1px solid rgba(181,137,59,0.1)', position: 'relative', overflow: 'hidden' }}>



      {/* Background pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(13,42,82,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 40px', display: 'flex', flexDirection: 'column', gap: '52px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <Reveal>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '28px', height: '2px', background: '#0D2A52', borderRadius: '2px' }} />
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#0D2A52', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>Common Questions</span>
              <div style={{ width: '28px', height: '2px', background: '#0D2A52', borderRadius: '2px' }} />
            </div>
            <h2 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 44px)', color: '#0D2A52', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
              Frequently Asked<br /><span style={{ color: '#B5893B' }}>Questions</span>
            </h2>
            <div style={{ width: '44px', height: '2.5px', background: 'linear-gradient(90deg, #B5893B, #D4AF37)', borderRadius: '2px' }} />
            <p style={{ fontSize: '15.5px', color: '#4a5568', maxWidth: '600px', margin: 0, lineHeight: 1.75, fontFamily: 'var(--font-sans)' }}>
              Get quick answers to the most common questions about our services, processes, and how we can help your cosmetic business succeed.
            </p>
          </div>
        </Reveal>

        {/* FAQ accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FAQ_DATA.map((faq, index) => (
            <Reveal key={index} delay={index * 40}>
              <div style={{
                background: 'white', border: '1px solid rgba(13,42,82,0.1)',
                borderLeft: `4px solid ${openIndex === index ? '#B5893B' : '#0D2A52'}`,
                borderRadius: '14px', overflow: 'hidden',
                boxShadow: openIndex === index ? '0 8px 28px rgba(13,42,82,0.1)' : '0 2px 10px rgba(13,42,82,0.04)',
                transition: 'all 0.35s ease',
              }}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  style={{ width: '100%', padding: '22px 26px', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,42,82,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: openIndex === index ? 'rgba(181,137,59,0.12)' : 'rgba(13,42,82,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s ease' }}>
                      <HelpCircle size={15} style={{ color: openIndex === index ? '#B5893B' : '#0D2A52' }} />
                    </div>
                    <span style={{ fontSize: '15.5px', fontWeight: 700, color: '#0D2A52', margin: 0, lineHeight: 1.4, fontFamily: 'Syne, var(--font-serif)' }}>
                      {faq.question}
                    </span>
                  </div>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: openIndex === index ? '#B5893B' : 'rgba(13,42,82,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '12px', transition: 'all 0.3s ease' }}>
                    <ChevronDown size={16} style={{ color: openIndex === index ? 'white' : '#0D2A52', transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
                  </div>
                </button>

                {/* Answer panel */}
                <div style={{ maxHeight: openIndex === index ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <div style={{ padding: '0 26px 22px 70px', fontSize: '14.5px', color: '#4a5568', lineHeight: 1.75, fontFamily: 'var(--font-sans)', borderTop: '1px solid rgba(13,42,82,0.06)' }}>
                    <div style={{ paddingTop: '16px' }}>{faq.answer}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA card */}
        <Reveal>
          <div style={{
            background: 'linear-gradient(135deg, #0D2A52 0%, #091f3d 100%)',
            borderRadius: '20px', padding: '48px 56px',
            textAlign: 'center', color: 'white',
            boxShadow: '0 20px 60px rgba(13,42,82,0.3)',
            border: '1px solid rgba(181,137,59,0.15)',
            position: 'relative', overflow: 'hidden',
          }} className="faq-cta-card">
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(181,137,59,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ height: '3px', position: 'absolute', top: 0, left: 0, right: 0, background: 'linear-gradient(90deg, transparent, #B5893B, #D4AF37, transparent)' }} />
            <h3 style={{ fontFamily: 'Syne, var(--font-serif)', fontSize: 'clamp(22px, 2.5vw, 30px)', color: 'white', fontWeight: 800, margin: '0 0 14px 0', position: 'relative', zIndex: 1 }}>
              Still Have <span style={{ color: '#B5893B' }}>Questions?</span>
            </h3>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', marginBottom: '28px', maxWidth: '500px', margin: '0 auto 28px auto', lineHeight: 1.7, fontFamily: 'var(--font-sans)', position: 'relative', zIndex: 1 }}>
              Our team is here to help. Get in touch with our cosmetic industrial consultants and receive personalized answers to your specific needs.
            </p>
            <Link
              href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 32px', background: 'linear-gradient(135deg, #B5893B, #D4AF37)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 6px 20px rgba(181,137,59,0.4)', fontFamily: 'var(--font-sans)', position: 'relative', zIndex: 1, textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(181,137,59,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(181,137,59,0.4)'; }}>
              Contact Our Team <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) { #faq { padding-bottom: 56px !important; } #faq .faq-cta-card { padding: 36px 28px !important; } }
        @media (max-width: 500px) { #faq { padding-bottom: 44px !important; } }
      ` }} />
    </section>
  );
}
