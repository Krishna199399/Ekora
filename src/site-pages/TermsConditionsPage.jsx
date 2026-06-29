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

export default function TermsConditionsPage() {
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
              Terms &amp; Conditions
            </h1>
            <div style={{ width: '48px', height: '3.5px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})`, borderRadius: '2px', marginBottom: '14px' }} />
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.72)', margin: 0, maxWidth: '600px', lineHeight: 1.6 }}>
              Welcome to EGC Ekora Global Consulting. These Terms &amp; Conditions govern your use of our website, consulting engagements, and technical services.
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
                These Terms &amp; Conditions ("Terms") form a legally binding agreement between you ("Client," "User," or "you") and EGC Ekora Global Consulting Pvt. Ltd. ("we," "our," "us," or "EGC"). By accessing our website, subscribing to our resources, or engaging us for any cosmetic consulting services (including formulation design, stability testing validation, factory layout planning, turnkey engineering, and regulatory advisory), you agree to be bound by these Terms.
              </p>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                1. Scope of Consulting Services
              </h2>
              <p style={{ marginBottom: '24px' }}>
                EGC provides professional, science-led industrial advisory services for the cosmetics and personal care sector. The scope, deliverables, fees, and timelines for specific projects will be outlined in a separate Statement of Work (SOW) or Consulting Agreement. All deliverables (such as formulation recipes, stability reports, raw material audits, and factory layouts) are prepared based on standard industry practices and available compliance frameworks (e.g. BIS, CDSCO, FDA, EU cosmetics regulations).
              </p>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                2. Client Responsibilities
              </h2>
              <p style={{ marginBottom: '20px' }}>
                To ensure project accuracy, safety, and GMP compliance, the Client agrees to:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}>Provide complete, accurate, and timely data regarding raw materials, existing formulation bases, and target specifications.</li>
                <li style={{ marginBottom: '8px' }}>Ensure that any raw materials, labels, or brand assets provided to us do not infringe on third-party intellectual property.</li>
                <li style={{ marginBottom: '8px' }}>Obtain all necessary business licenses, local factory permissions, and regulatory permits required for commercial production.</li>
              </ul>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                3. Intellectual Property (IP) Rights
              </h2>
              <p style={{ marginBottom: '24px' }}>
                The ownership of intellectual property created during our advisory engagement is governed as follows:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}><strong>Proprietary Formulas:</strong> Upon full payment of all consulting fees, ownership of specific, custom-developed cosmetic formulations created for the Client will transfer to the Client.</li>
                <li style={{ marginBottom: '8px' }}><strong>Pre-existing IP:</strong> EGC retains all rights to its pre-existing methodologies, proprietary software, data models, standard engineering guidelines, and generic formulation blueprints.</li>
                <li style={{ marginBottom: '8px' }}><strong>Website Content:</strong> All texts, logos, icons, designs, and graphics on this website are the intellectual property of EGC and may not be reproduced without written consent.</li>
              </ul>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                4. Professional Fees and Payment Terms
              </h2>
              <p style={{ marginBottom: '24px' }}>
                Unless otherwise specified in a Statement of Work, all consulting fees, retainer payments, and milestone fees are non-refundable. Payments must be processed in the currency and bank account details specified in the official project invoices. Late payments may result in temporary suspension of project milestones, formulation handovers, or factory layout approvals.
              </p>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                5. Limitation of Liability
              </h2>
              <p style={{ marginBottom: '24px' }}>
                While EGC strives to design stable formulations and highly efficient GMP-compliant layouts, commercial production results depend on variables beyond our direct control (such as raw material fluctuations, manufacturing machinery calibration, ambient storage, and labor training). To the maximum extent permitted by law:
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc' }}>
                <li style={{ marginBottom: '8px' }}>EGC shall not be liable for any indirect, consequential, special, or incidental damages (including loss of profits, crop/batch loss, or product recalls).</li>
                <li style={{ marginBottom: '8px' }}>EGC's total liability under any project engagement is strictly capped at the total amount paid by the Client to EGC for that specific service.</li>
              </ul>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                6. Confidentiality (NDAs)
              </h2>
              <p style={{ marginBottom: '24px' }}>
                Both parties agree to treat all business plans, cosmetic formulation compositions, stability reports, and financial terms exchanged during the engagement as strictly confidential. This obligation extends beyond the termination of our active consulting project.
              </p>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                7. Governing Law and Dispute Resolution
              </h2>
              <p style={{ marginBottom: '24px' }}>
                These Terms and all project agreements shall be governed by and construed in accordance with the laws of India. Any disputes arising from or relating to our services shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka, India.
              </p>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                8. Modifications to Terms
              </h2>
              <p style={{ marginBottom: '24px' }}>
                We reserve the right to modify these Terms at any time to reflect operational, legal, or regulatory adjustments. Updated Terms will be posted on this page with an updated effective date.
              </p>

              <h2 style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 700, color: DEEP, marginTop: '40px', marginBottom: '16px' }}>
                9. Contact Information
              </h2>
              <p style={{ marginBottom: '24px' }}>
                For any questions regarding these Terms, please contact our consulting operations team:
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
