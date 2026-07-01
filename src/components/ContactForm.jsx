'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, User, Building, Phone, Globe, HelpCircle, Mail, Clock } from 'lucide-react';

const BENEFITS = [
  { title: 'Expert Consultation', desc: 'Tailored solutions for your unique needs.' },
  { title: 'Confidential & Secure', desc: 'Your formulation IP is safe with us.' },
  { title: 'End-to-End Support', desc: 'From laboratory concept to factory shelf.' },
  { title: 'Global Reach', desc: 'Supporting brands across 20+ countries.' }
];

const RESPONSES = [
  { time: '24 Hours', desc: 'For general inquiries' },
  { time: '1-2 Days', desc: 'For consult requests' },
  { time: '3-5 Days', desc: 'For detailed proposals' },
  { time: 'Long-Term', desc: 'Partnership & trust' }
];

export default function ContactForm() {
  const DIAL_CODES = [
    { code: '+91',  flag: '🇮🇳', label: 'IN' },
    { code: '+1',   flag: '🇺🇸', label: 'US' },
    { code: '+44',  flag: '🇬🇧', label: 'UK' },
    { code: '+971', flag: '🇦🇪', label: 'AE' },
    { code: '+966', flag: '🇸🇦', label: 'SA' },
    { code: '+65',  flag: '🇸🇬', label: 'SG' },
    { code: '+27',  flag: '🇿🇦', label: 'ZA' },
    { code: '+61',  flag: '🇦🇺', label: 'AU' },
    { code: '+49',  flag: '🇩🇪', label: 'DE' },
    { code: '+33',  flag: '🇫🇷', label: 'FR' },
    { code: '+86',  flag: '🇨🇳', label: 'CN' },
    { code: '+81',  flag: '🇯🇵', label: 'JP' },
    { code: '+55',  flag: '🇧🇷', label: 'BR' },
    { code: '+52',  flag: '🇲🇽', label: 'MX' },
    { code: '+60',  flag: '🇲🇾', label: 'MY' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    interest: '',
    project: ''
  });
  const [dialCode, setDialCode] = useState('+91');

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.company.trim()) errors.company = 'Company name is required';
    if (!formData.country) errors.country = 'Country selection is required';
    if (!formData.interest) errors.interest = 'Area of interest is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setSubmitError('');
    // Use PHP endpoint on Hostinger static hosting; Next.js API on local dev
    const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
      ? '/api/contact'
      : '/api/contact.php';
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSource: 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone ? `${dialCode} ${formData.phone}` : '',
          company: formData.company,
          country: formData.country,
          interest: formData.interest,
          message: formData.project,
          subject: formData.interest || 'Contact Form Inquiry',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(json.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', company: '', phone: '', country: '', interest: '', project: '' });
    setDialCode('+91');
    setFormErrors({});
    setIsSubmitted(false);
    setSubmitError('');
  };

  return (
    <section id="contact" className="contact-section-container">
      <div className="contact-inner-wrapper">
        
        {/* Main Content Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '50px',
          alignItems: 'start'
        }} className="contact-grid">
          
          {/* Left Column: Text & Benefits */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'left' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#b5893b', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Get In Touch
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '42px', color: '#0D2A52', fontWeight: '600', margin: 0, lineHeight: 1.2 }}>
              Ready to Build Your Cosmetic Business?
            </h2>
            <h3 style={{ fontSize: '20px', color: '#5c526b', fontWeight: '500', lineHeight: '1.5', maxWidth: '560px', margin: 0 }}>
              Let's Create the Future of Beauty Together
            </h3>
            <p style={{ fontSize: '16px', color: '#5c526b', lineHeight: '1.6', maxWidth: '560px', margin: 0 }}>
              Whether you're launching a brand, developing products, planning a factory, or expanding globally, our cosmetic industrial consultants are here to help.
            </p>

            {/* Benefits mini-grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginTop: '10px'
            }} className="contact-benefits">
              {BENEFITS.map((b, idx) => (
                <div key={idx} style={{
                  background: 'white',
                  border: '1px solid #e2dfd8',
                  borderRadius: '8px',
                  padding: '15px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.01)'
                }}>
                  <strong style={{ fontSize: '14px', color: '#0D2A52', display: 'block', marginBottom: '4px' }}>{b.title}</strong>
                  <span style={{ fontSize: '12px', color: '#7c728a', lineHeight: '1.3' }}>{b.desc}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: styled HTML form */}
          <div style={{
            background: 'white',
            border: '1px solid #e2dfd8',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 10px 30px rgba(27, 11, 48, 0.04)',
            textAlign: 'left'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#0D2A52', marginBottom: '8px' }}>
              Get Consultation
            </h3>
            <p style={{ fontSize: '13px', color: '#7c728a', marginBottom: '25px' }}>
              Share your requirements and our team will get back to you with the right solution.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Name & Email Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }} className="form-row">
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 35px',
                      border: '1px solid #e2dfd8',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    placeholder="Full Name *"
                    required
                  />
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '15px', color: '#7c728a' }} />
                  {formErrors.name && <span style={{ fontSize: '10px', color: '#c62828', display: 'block', marginTop: '3px' }}>{formErrors.name}</span>}
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 35px',
                      border: '1px solid #e2dfd8',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    placeholder="Email Address *"
                    required
                  />
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '15px', color: '#7c728a' }} />
                  {formErrors.email && <span style={{ fontSize: '10px', color: '#c62828', display: 'block', marginTop: '3px' }}>{formErrors.email}</span>}
                </div>
              </div>

              {/* Company & Phone Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }} className="form-row">
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 35px',
                      border: '1px solid #e2dfd8',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                    placeholder="Company Name *"
                    required
                  />
                  <Building size={16} style={{ position: 'absolute', left: '12px', top: '15px', color: '#7c728a' }} />
                  {formErrors.company && <span style={{ fontSize: '10px', color: '#c62828', display: 'block', marginTop: '3px' }}>{formErrors.company}</span>}
                </div>
                {/* Phone with dial-code selector */}
                <div style={{ display: 'flex', border: '1px solid #e2dfd8', borderRadius: '6px', overflow: 'hidden' }}>
                  <select
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                    style={{
                      flexShrink: 0,
                      width: '78px',
                      padding: '12px 4px',
                      border: 'none',
                      borderRight: '1px solid #e2dfd8',
                      background: '#f7f6f2',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#0D2A52',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {DIAL_CODES.map((d) => (
                      <option key={d.code} value={d.code}>{d.flag} {d.code}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      flex: 1,
                      padding: '12px 10px',
                      border: 'none',
                      fontSize: '14px',
                      outline: 'none',
                      minWidth: 0,
                    }}
                    placeholder="Phone Number"
                  />
                </div>
              </div>

              {/* Country Select */}
              <div style={{ position: 'relative' }}>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 35px',
                    border: '1px solid #e2dfd8',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                  required
                >
                  <option value="" disabled>Select Country / Region *</option>
                  <option value="USA">United States</option>
                  <option value="Europe">Europe (EU)</option>
                  <option value="India">India</option>
                  <option value="Singapore">Singapore</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="Other">Other Region</option>
                </select>
                <Globe size={16} style={{ position: 'absolute', left: '12px', top: '15px', color: '#7c728a', zIndex: 5 }} />
                {formErrors.country && <span style={{ fontSize: '10px', color: '#c62828', display: 'block', marginTop: '3px' }}>{formErrors.country}</span>}
              </div>

              {/* Area of Interest */}
              <div style={{ position: 'relative' }}>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 35px',
                    border: '1px solid #e2dfd8',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                  required
                >
                  <option value="" disabled>Select Area of Interest *</option>
                  <option value="R&D Formulation">Cosmetic R&D & Formulation</option>
                  <option value="Factory Setup">Plant Setup & Factory Planning</option>
                  <option value="Turnkey Solutions">Turnkey Project Solutions</option>
                  <option value="Regulatory Standards">Regulatory, BIS & FDA Compliance</option>
                  <option value="All of the above">Full Scale Advisory Suite</option>
                </select>
                <HelpCircle size={16} style={{ position: 'absolute', left: '12px', top: '15px', color: '#7c728a', zIndex: 5 }} />
                {formErrors.interest && <span style={{ fontSize: '10px', color: '#c62828', display: 'block', marginTop: '3px' }}>{formErrors.interest}</span>}
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    height: '110px',
                    padding: '12px',
                    border: '1px solid #e2dfd8',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'none'
                  }}
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              {submitError && (
                <div style={{
                  padding: '10px 14px',
                  background: '#fff0f0',
                  border: '1px solid #fca5a5',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#c62828',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ⚠️ {submitError}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: '14px',
                  background: isLoading ? '#c9a96a' : '#b5893b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  boxShadow: '0 4px 12px rgba(181, 137, 59, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => { if (!isLoading) e.target.style.background = '#9c732c'; }}
                onMouseLeave={(e) => { if (!isLoading) e.target.style.background = '#b5893b'; }}
              >
                {isLoading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Sending...
                  </>
                ) : 'Submit Inquiry'}
              </button>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

            </form>
          </div>
        </div>



        {/* Bottom response time info row */}
        <div style={{
          marginTop: '30px',
          borderTop: '1px solid rgba(181, 137, 59, 0.2)',
          paddingTop: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left'
        }} className="contact-footer-grid">
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0D2A52', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Clock size={18} style={{ color: '#b5893b' }} />
              We Typically Respond Within
            </h4>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
              width: '100%'
            }} className="response-time-grid">
              {RESPONSES.map((res, i) => (
                <div key={i} style={{ borderRight: i < 3 ? '1px solid #e2dfd8' : 'none', paddingRight: '10px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: '#b5893b', display: 'block' }}>{res.time}</span>
                  <span style={{ fontSize: '11px', color: '#7c728a', lineHeight: 1.3 }}>{res.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Success Modal */}
      {isSubmitted && (
        <div className="modal-overlay" onClick={handleReset}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', textAlign: 'center', padding: '40px' }}>
            <div style={{ display: 'inline-flex', background: '#e8f5e9', padding: '16px', borderRadius: '50%', color: '#2e7d32', marginBottom: '20px' }}>
              <CheckCircle2 size={48} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: '#0D2A52', marginBottom: '10px' }}>
              Inquiry Submitted!
            </h3>
            <p style={{ fontSize: '15px', color: '#7c728a', lineHeight: '1.6', marginBottom: '25px', textAlign: 'center' }}>
              Thank you, <strong>{formData.name}</strong>. EGC Ekora Global Consulting has received your request regarding <strong>{formData.interest}</strong>. Our senior advisors will review your project and contact you at <strong>{formData.email}</strong> within 1-2 business days.
            </p>
            <button
              onClick={handleReset}
              style={{
                padding: '12px 24px',
                background: '#b5893b',
                color: '#fbfaf7',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html:`
        .contact-section-container {
          position: relative;
          overflow: hidden;
          padding: 80px 40px;
          border-bottom: 1px solid rgba(181, 137, 59, 0.1);
          background: #fbfaf7;
        }
        .contact-section-container::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('/bg.png');
          background-size: cover;
          background-position: center;
          filter: blur(8px);
          opacity: 0.16;
          z-index: 1;
          pointer-events: none;
        }
        .contact-inner-wrapper {
          position: relative;
          z-index: 2;
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 50px;
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .contact-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .response-time-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .response-time-grid > div {
            border-right: none !important;
            border-bottom: 1px solid #e2dfd8;
            padding-bottom: 10px;
          }
        }
        @media (max-width: 768px) {
          .contact-section-container {
            padding: 56px 20px !important;
          }
          .contact-inner-wrapper {
            gap: 32px !important;
          }
          #contact h2 {
            font-size: clamp(24px, 6vw, 38px) !important;
          }
        }
        @media (max-width: 500px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
          .contact-benefits {
            grid-template-columns: 1fr !important;
          }
          .contact-section-container {
            padding: 44px 16px !important;
          }
          .response-time-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}} />
    </section>
  );
}
