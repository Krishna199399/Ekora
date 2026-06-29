'use client';

import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

/* ─── Brand Tokens ─────────────────────────────────────── */
const DEEP  = '#0D2A52';
const GOLD  = '#B5893B';
const GOLD2 = '#D4AF37';
const CREAM = '#FAF9F7';
const WHITE = '#FFFFFF';
const MUTED = '#5c526b';

export default function PrivacyPage() {
  return (
    <div style={{ background: CREAM, paddingTop: '80px', fontFamily: 'var(--font-sans)', color: DEEP }}>
      
      {/* Hero Banner */}
      <section style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, ${DEEP} 0%, #0b2244 50%, #071730 100%)`, minHeight: '300px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(181,137,59,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(181,137,59,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,137,59,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 40px', width: '100%', position: 'relative', zIndex: 2 }}>
          <ScrollReveal>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, border: `1px solid ${GOLD}40`, borderRadius: '4px', padding: '6px 16px', marginBottom: '20px' }}>
              Legal Documentation
            </span>
            <h1 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: WHITE, margin: '0 0 16px', lineHeight: 1.2 }}>
              Privacy Policy
            </h1>
            <div style={{ width: '48px', height: '3.5px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})`, borderRadius: '2px', marginBottom: '14px' }} />
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', margin: 0, maxWidth: '600px', lineHeight: 1.6 }}>
              At EGC Ekora Global Consulting, we take your privacy and confidentiality seriously. This policy details how we safeguard your data and formulation secrets.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content Section */}
      <section style={{ padding: '72px 0', background: WHITE }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal>
            <div style={{ color: MUTED, fontSize: '15px', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '24px' }}>
                Effective Date: June 25, 2026
              </p>
              
              <p style={{ marginBottom: '32px' }}>
                EGC Ekora Global Consulting ("we," "our," or "us") operates the website and provides advisory, formulations, turnkey project setup, and regulatory compliance consulting services. We are committed to protecting the privacy, confidentiality, and security of our clients, website users, and partners. This Privacy Policy describes how we handle, collect, use, and share information.
              </p>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                1. Information We Collect
              </h2>
              <p style={{ marginBottom: '20px' }}>
                We collect personal information that you voluntarily provide to us when you fill out contact forms, schedule consultation sessions, or engage our services. This may include:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}>Name, email address, phone number, and physical mailing address.</li>
                <li style={{ marginBottom: '8px' }}>Company name, job title, and country of operation.</li>
                <li style={{ marginBottom: '8px' }}>Project details, industry requirements, raw material formulation lists, and general communications.</li>
              </ul>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                2. How We Use Your Information
              </h2>
              <p style={{ marginBottom: '20px' }}>
                We use the information we collect to deliver exceptional, high-volume, GMP-compliant chemical, engineering, and formulation advisory services. Specifically, we use it to:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}>Respond to your consultation requests, project inquiries, and client services.</li>
                <li style={{ marginBottom: '8px' }}>Optimize and deliver customized stability testing, R&D formulation sheets, and engineering plans.</li>
                <li style={{ marginBottom: '8px' }}>Provide regulatory advice, export compliance documentation support, and DPR consulting updates.</li>
                <li style={{ marginBottom: '8px' }}>Keep you informed about industry trends, formulation R&D, and regulatory adjustments (only if you subscribe to our newsletters).</li>
              </ul>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                3. Formulation and Business Confidentiality
              </h2>
              <p style={{ marginBottom: '24px' }}>
                As cosmetic consulting specialists, we understand the immense competitive value of proprietary cosmetic formulas, stability testing data, and plant blueprints. EGC enforces strict operational confidentiality:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}>All cosmetic R&D formulation data is locked and access-restricted.</li>
                <li style={{ marginBottom: '8px' }}>We do not sell, rent, or distribute client formulation secrets or business models to third parties.</li>
                <li style={{ marginBottom: '8px' }}>We sign Non-Disclosure Agreements (NDAs) with clients before exchanging specific raw material lists, lab prototypes, or factory layouts.</li>
              </ul>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                4. Data Security and Retention
              </h2>
              <p style={{ marginBottom: '24px' }}>
                We implement robust security controls, including firewalls, encryption, and restricted staff permissions, to protect personal and business information. We retain your data only for as long as necessary to fulfill the services requested or comply with corporate tax and regulatory archiving obligations.
              </p>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                5. Third-Party Services
              </h2>
              <p style={{ marginBottom: '24px' }}>
                We do not share your personal information with external parties, except with trusted service providers who help us run our website and business (such as email hosting or web infrastructure) under strict confidentiality agreements. We may release information when necessary to comply with relevant state laws or regulatory requests (such as FDA, CDSCO, or EU audits).
              </p>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                6. Your Rights and Choices
              </h2>
              <p style={{ marginBottom: '24px' }}>
                Depending on your location, you may have the right to access, update, correct, or request deletion of the personal data we hold. You can unsubscribe from our marketing newsletters at any time by clicking the "unsubscribe" link or contacting us directly.
              </p>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                7. Contact Us
              </h2>
              <p style={{ marginBottom: '24px' }}>
                If you have any questions or concerns regarding this Privacy Policy or how your data is handled, please contact our privacy compliance desk:
              </p>
              <div style={{ background: CREAM, border: '1px solid rgba(181,137,59,0.15)', borderRadius: '12px', padding: '24px', color: DEEP }}>
                <p style={{ margin: '0 0 8px', fontWeight: 600 }}>EGC Ekora Global Consulting Pvt. Ltd.</p>
                <p style={{ margin: '0 0 8px' }}>Email: <a href="mailto:info@ekoraglobalconsulting.com" style={{ color: GOLD, textDecoration: 'none' }}>info@ekoraglobalconsulting.com</a></p>
                <p style={{ margin: '0 0 8px' }}>Phone: +91 78929 78516</p>
                <p style={{ margin: 0 }}>Address: No. 39/3, Richmond Road, Bengaluru - 560025, India</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
