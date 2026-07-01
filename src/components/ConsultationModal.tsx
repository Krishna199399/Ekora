'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Check, Phone, Loader2 } from 'lucide-react';
import { useConsultationModal } from '../context/ConsultationModalContext';

// Zod validation schema
const consultationSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[+]?[0-9\s-]{10,15}$/, 'Please enter a valid phone number (min 10 digits)'),
  companyName: z.string().optional(),
  service: z.enum([
    'Product Development',
    'Research & Development',
    'Manufacturing Support',
    'Regulatory Compliance',
    'Product Launch Strategy',
    'Business Consultation',
    'Other'
  ], {
    message: 'Please select a service interested in',
  }),
  message: z.string().optional(),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

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

export default function ConsultationModal() {
  const { isOpen, closeModal, triggerSource } = useConsultationModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dialCode, setDialCode] = useState('+91');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const services = [
    'Product Development',
    'Research & Development',
    'Manufacturing Support',
    'Regulatory Compliance',
    'Product Launch Strategy',
    'Business Consultation',
    'Other',
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, touchedFields },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      service: undefined,
      message: '',
    },
  });

  const selectedService = watch('service');

  // Handle escape key to close modal & scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock body scroll
      document.documentElement.style.overflow = 'hidden'; // Lock html scroll as well
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, closeModal]);

  // Handle outside clicks to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutsideDropdown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideDropdown);
    return () => document.removeEventListener('mousedown', handleClickOutsideDropdown);
  }, []);

  // Form submission handler
  const onSubmit = async (data: ConsultationFormValues) => {
    setIsSubmitting(true);
    setSubmitError('');

    // Track GA Submit attempt
    if (typeof window !== 'undefined') {
      const gtag = (window as any).gtag;
      if (gtag) {
        gtag('event', 'submit_consultation_form_start', {
          event_category: 'engagement',
          service_interested: data.service,
        });
      }
    }

    try {
      // Use PHP endpoint on Hostinger static hosting; Next.js API on local dev
      const apiUrl = typeof window !== 'undefined' && window.location.hostname === 'localhost'
        ? '/api/contact'
        : '/api/contact.php';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSource: 'modal',
          fullName: data.fullName,
          name: data.fullName,
          email: data.email,
          phone: data.phone ? `${dialCode} ${data.phone}` : '',
          companyName: data.companyName,
          company: data.companyName,
          service: data.service,
          subject: data.service,
          message: data.message,
        }),
      });

      const json = await res.json();

      if (json.success) {
        setIsSuccess(true);
        // Track GA Submit success
        if (typeof window !== 'undefined') {
          const gtag = (window as any).gtag;
          if (gtag) {
            gtag('event', 'submit_consultation_form_success', {
              event_category: 'engagement',
              service_interested: data.service,
            });
          }
        }
      } else {
        setSubmitError(json.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    reset();
    setIsSuccess(false);
    setSubmitError('');
    setIsDropdownOpen(false);
    setDialCode('+91');
  };

  const handleClose = () => {
    closeModal();
    // Delay resetting form state so user doesn't see UI snap back mid-fade-out
    setTimeout(() => {
      handleResetForm();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="luxury-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalContentRef}
            className="luxury-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            {/* Background Orbs */}
            <div className="luxury-orb-1" />
            <div className="luxury-orb-2" />

            {/* Close button */}
            <button
              onClick={handleClose}
              className="luxury-modal-close-btn"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-300 hover:text-white transition-colors duration-200" />
            </button>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="luxury-modal-inner"
                >
                  {/* Header */}
                  <div className="luxury-modal-header text-center">
                    <h2 className="luxury-modal-title">
                      Book Your Free Consultation
                    </h2>
                    <p className="luxury-modal-subtitle">
                      Speak directly with our experts and discover the best solution tailored to your business needs.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="luxury-modal-form">
                    <div className="luxury-form-grid">
                      {/* Name */}
                      <div className="luxury-input-group">
                        <input
                          id="fullName"
                          type="text"
                          className={`luxury-input ${errors.fullName ? 'error' : ''} ${watch('fullName') ? 'has-value' : ''}`}
                          {...register('fullName')}
                          placeholder=" "
                          disabled={isSubmitting}
                        />
                        <label htmlFor="fullName" className="luxury-label">
                          Full Name <span className="text-gold">*</span>
                        </label>
                        {errors.fullName && (
                          <span className="luxury-error-message">{errors.fullName.message}</span>
                        )}
                        {!errors.fullName && touchedFields.fullName && watch('fullName') && (
                          <Check className="luxury-success-icon" />
                        )}
                      </div>

                      {/* Email */}
                      <div className="luxury-input-group">
                        <input
                          id="email"
                          type="email"
                          className={`luxury-input ${errors.email ? 'error' : ''} ${watch('email') ? 'has-value' : ''}`}
                          {...register('email')}
                          placeholder=" "
                          disabled={isSubmitting}
                        />
                        <label htmlFor="email" className="luxury-label">
                          Email Address <span className="text-gold">*</span>
                        </label>
                        {errors.email && (
                          <span className="luxury-error-message">{errors.email.message}</span>
                        )}
                        {!errors.email && touchedFields.email && watch('email') && (
                          <Check className="luxury-success-icon" />
                        )}
                      </div>

                      {/* Phone */}
                      <div className="luxury-input-group" style={{ borderBottom: 'none' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'stretch',
                          border: `1px solid ${errors.phone ? 'rgba(255,107,107,0.5)' : 'rgba(255,255,255,0.12)'}`,
                          borderRadius: '6px',
                          overflow: 'hidden',
                          transition: 'border-color 0.3s ease',
                        }}>
                          <select
                            value={dialCode}
                            onChange={(e) => setDialCode(e.target.value)}
                            disabled={isSubmitting}
                            style={{
                              flexShrink: 0,
                              width: '82px',
                              padding: '10px 4px',
                              border: 'none',
                              borderRight: '1px solid rgba(255,255,255,0.1)',
                              background: 'rgba(255,255,255,0.05)',
                              color: '#e5d7bc',
                              fontSize: '12px',
                              fontWeight: 600,
                              outline: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            {DIAL_CODES.map((d) => (
                              <option key={d.code} value={d.code} style={{ background: '#140824', color: '#fff' }}>
                                {d.flag} {d.code}
                              </option>
                            ))}
                          </select>
                          <input
                            id="phone"
                            type="tel"
                            className={`luxury-input ${errors.phone ? 'error' : ''} ${watch('phone') ? 'has-value' : ''}`}
                            {...register('phone')}
                            placeholder="Phone Number *"
                            disabled={isSubmitting}
                            style={{ flex: 1, minWidth: 0, paddingLeft: '10px' }}
                          />
                        </div>
                        {errors.phone && (
                          <span className="luxury-error-message" style={{ position: 'static', marginTop: '4px' }}>{errors.phone.message}</span>
                        )}
                        {!errors.phone && watch('phone') && (
                          <Check style={{ position: 'absolute', right: 4, bottom: 6, width: 14, height: 14, color: '#25d366' }} />
                        )}
                      </div>

                      {/* Company Name */}
                      <div className="luxury-input-group">
                        <input
                          id="companyName"
                          type="text"
                          className={`luxury-input ${watch('companyName') ? 'has-value' : ''}`}
                          {...register('companyName')}
                          placeholder=" "
                          disabled={isSubmitting}
                        />
                        <label htmlFor="companyName" className="luxury-label">
                          Company Name
                        </label>
                        {touchedFields.companyName && watch('companyName') && (
                          <Check className="luxury-success-icon" />
                        )}
                      </div>
                    </div>

                    {/* Service Dropdown */}
                    <div className="luxury-input-group select-group" ref={dropdownRef}>
                      <label className={`luxury-select-label ${selectedService ? 'floated' : ''}`}>
                        Service Interested In <span className="text-gold">*</span>
                      </label>
                      <button
                        type="button"
                        className={`luxury-select-trigger ${errors.service ? 'error' : ''} ${selectedService ? 'has-val' : ''}`}
                        onClick={() => !isSubmitting && setIsDropdownOpen(!isDropdownOpen)}
                        disabled={isSubmitting}
                      >
                        <span>{selectedService || 'Select a service...'}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                      </button>

                      {errors.service && (
                        <span className="luxury-error-message">{errors.service.message}</span>
                      )}

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.ul
                            className="luxury-select-dropdown"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                          >
                            {services.map((svc) => (
                              <li
                                key={svc}
                                className={`luxury-dropdown-item ${selectedService === svc ? 'selected' : ''}`}
                                onClick={() => {
                                  setValue('service', svc as any, { shouldValidate: true, shouldDirty: true });
                                  setIsDropdownOpen(false);
                                }}
                              >
                                {svc}
                                {selectedService === svc && <Check className="w-4 h-4 text-gold" />}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message */}
                    <div className="luxury-input-group textarea-group">
                      <textarea
                        id="message"
                        className={`luxury-textarea ${watch('message') ? 'has-value' : ''}`}
                        {...register('message')}
                        placeholder=" "
                        disabled={isSubmitting}
                        rows={2}
                      />
                      <label htmlFor="message" className="luxury-label">
                        Message / Project Requirements
                      </label>
                    </div>

                    {/* CTAs */}
                    <div className="luxury-cta-container">
                      <button
                        type="submit"
                        className="luxury-submit-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Processing Request...
                          </>
                        ) : (
                          'Book Consultation'
                        )}
                      </button>

                      <a
                        href="tel:+917892978516"
                        className="luxury-secondary-btn"
                        onClick={() => {
                          if (typeof window !== 'undefined') {
                            const gtag = (window as any).gtag;
                            if (gtag) {
                              gtag('event', 'click_call_us_now', { event_category: 'engagement' });
                            }
                          }
                        }}
                      >
                        <Phone size={18} />
                        Call Us Now
                      </a>
                    </div>

                    {/* Error Message */}
                    {submitError && (
                      <div style={{
                        marginTop: '10px',
                        padding: '10px 14px',
                        background: 'rgba(220,53,69,0.08)',
                        border: '1px solid rgba(220,53,69,0.3)',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#ff6b6b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        ⚠️ {submitError}
                      </div>
                    )}
                  </form>

                  {/* Trust Indicators Removed */}
                </motion.div>
              ) : (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="luxury-success-container text-center"
                >
                  {/* Animated Success Checkmark */}
                  <div className="checkmark-wrapper">
                    <svg className="success-checkmark-svg" viewBox="0 0 52 52">
                      <motion.circle
                        cx="26"
                        cy="26"
                        r="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                      <motion.path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 27l7.5 7.5L37.5 18"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                      />
                    </svg>
                  </div>

                  <h2 className="success-title">Thank You!</h2>
                  <p className="success-message">
                    Your consultation request has been submitted successfully.<br />
                    Our team will contact you within 24 hours.
                  </p>

                  <div className="success-cta-container">
                    <button
                      onClick={handleClose}
                      className="success-close-btn"
                    >
                      Close Window
                    </button>
                    <button
                      onClick={handleResetForm}
                      className="success-another-btn"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Scoped CSS Styles for Glassmorphism & Responsiveness */}
          <style dangerouslySetInnerHTML={{ __html: `
            /* Overlay backdrop */
            .luxury-modal-overlay {
              position: fixed;
              inset: 0;
              z-index: 99999;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(14, 5, 26, 0.75);
              backdrop-filter: blur(16px);
              -webkit-backdrop-filter: blur(16px);
              padding: 24px;
              overscroll-behavior: contain;
            }

            /* Container card with radial velvet theme */
            .luxury-modal-card {
              position: relative;
              background: radial-gradient(circle at top left, #23123a, #0b0314);
              border: 1px solid rgba(181, 137, 59, 0.22);
              border-radius: 24px;
              width: 100%;
              max-width: 560px;
              max-height: 90vh;
              overflow-y: auto;
              box-shadow: 
                0 30px 70px rgba(0, 0, 0, 0.6),
                inset 0 0 30px rgba(181, 137, 59, 0.05);
              padding: 32px 36px;
              z-index: 10;
            }

            /* Luxury ambient glows */
            .luxury-orb-1 {
              position: absolute;
              top: -60px;
              right: -60px;
              width: 180px;
              height: 180px;
              background: radial-gradient(circle, rgba(181, 137, 59, 0.18) 0%, transparent 70%);
              pointer-events: none;
              z-index: 1;
            }
            .luxury-orb-2 {
              position: absolute;
              bottom: -80px;
              left: -80px;
              width: 220px;
              height: 220px;
              background: radial-gradient(circle, rgba(123, 92, 183, 0.15) 0%, transparent 70%);
              pointer-events: none;
              z-index: 1;
            }

            .luxury-modal-inner {
              position: relative;
              z-index: 2;
            }

            /* Close Button */
            .luxury-modal-close-btn {
              position: absolute;
              top: 24px;
              right: 24px;
              width: 38px;
              height: 38px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(255, 255, 255, 0.04);
              border: 1px solid rgba(255, 255, 255, 0.07);
              border-radius: 50%;
              cursor: pointer;
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
              z-index: 20;
            }
            .luxury-modal-close-btn:hover {
              background: rgba(255, 255, 255, 0.08);
              border-color: rgba(181, 137, 59, 0.4);
              transform: rotate(90deg);
            }

            /* Header Section */
            .luxury-modal-header {
              margin-bottom: 18px;
            }
            .luxury-modal-title {
              font-family: 'Montserrat', sans-serif !important;
              font-size: 22px;
              font-weight: 800;
              letter-spacing: -0.5px;
              background: linear-gradient(135deg, #fff 40%, #e5d7bc 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 6px;
            }
            .luxury-modal-subtitle {
              font-size: 13.5px;
              line-height: 1.5;
              color: rgba(255, 255, 255, 0.65);
              font-weight: 400;
              max-width: 460px;
              margin: 0 auto;
            }

            /* Inputs & Forms */
            .luxury-modal-form {
              display: flex;
              flex-direction: column;
              gap: 16px;
            }
            .luxury-form-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
            }

            /* Floating labels group */
            .luxury-input-group {
              position: relative;
              display: flex;
              flex-direction: column;
              border-bottom: 1px solid rgba(255, 255, 255, 0.12);
              transition: border-color 0.3s ease;
            }
            .luxury-input-group:focus-within {
              border-color: #b5893b;
            }
            .luxury-input-group.select-group {
              border-bottom: none;
            }
            .luxury-input-group.textarea-group {
              margin-top: 4px;
            }

            /* Input Element */
            .luxury-input {
              width: 100%;
              background: transparent;
              border: none;
              outline: none;
              font-size: 14px;
              color: #ffffff;
              padding: 18px 0 6px 0;
              font-weight: 500;
              transition: all 0.2s ease;
            }
            .luxury-input.error {
              color: #ff6b6b;
            }

            /* Floating Label */
            .luxury-label {
              position: absolute;
              left: 0;
              top: 18px;
              font-size: 14px;
              color: rgba(255, 255, 255, 0.4);
              font-weight: 500;
              pointer-events: none;
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            
            /* Float effect on focus & value exist */
            .luxury-input:focus ~ .luxury-label,
            .luxury-input:not(:placeholder-shown) ~ .luxury-label,
            .luxury-input.has-value ~ .luxury-label {
              top: 0px;
              font-size: 11px;
              color: #b5893b;
              font-weight: 600;
              letter-spacing: 0.5px;
            }

            .text-gold {
              color: #b5893b;
            }

            /* Error text */
            .luxury-error-message {
              color: #ff6b6b;
              font-size: 11px;
              font-weight: 500;
              margin-top: 4px;
              position: absolute;
              bottom: -16px;
              left: 0;
            }
            
            /* Realtime success check */
            .luxury-success-icon {
              position: absolute;
              right: 4px;
              bottom: 6px;
              width: 14px;
              height: 14px;
              color: #25d366;
            }

            /* Textarea */
            .luxury-textarea {
              width: 100%;
              background: transparent;
              border: none;
              outline: none;
              font-size: 14px;
              color: #ffffff;
              padding: 18px 0 6px 0;
              font-weight: 500;
              resize: none;
              transition: all 0.2s ease;
            }
            .luxury-textarea ~ .luxury-label {
              top: 18px;
            }
            .luxury-textarea:focus ~ .luxury-label,
            .luxury-textarea:not(:placeholder-shown) ~ .luxury-label,
            .luxury-textarea.has-value ~ .luxury-label {
              top: 0px;
              font-size: 11px;
              color: #b5893b;
              font-weight: 600;
            }

            /* Custom Select dropdown styling */
            .luxury-select-trigger {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 10px;
              color: rgba(255, 255, 255, 0.85);
              font-size: 14px;
              font-weight: 500;
              padding: 11px 14px;
              text-align: left;
              cursor: pointer;
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .luxury-select-trigger:focus, .luxury-select-trigger.has-val {
              border-color: rgba(181, 137, 59, 0.6);
              background: rgba(255, 255, 255, 0.05);
            }
            .luxury-select-trigger.error {
              border-color: rgba(255, 107, 107, 0.5);
              background: rgba(255, 107, 107, 0.03);
            }

            .luxury-select-label {
              font-size: 13px;
              font-weight: 600;
              color: rgba(255, 255, 255, 0.55);
              margin-bottom: 8px;
              letter-spacing: 0.3px;
              transition: all 0.3s ease;
            }
            .luxury-select-label.floated {
              color: #b5893b;
            }

            .luxury-select-dropdown {
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background: #140824;
              border: 1px solid rgba(181, 137, 59, 0.3);
              border-radius: 12px;
              margin-top: 6px;
              max-height: 220px;
              overflow-y: auto;
              z-index: 50;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
              padding: 6px;
              list-style: none;
            }
            .luxury-dropdown-item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 10px 14px;
              font-size: 13.5px;
              color: rgba(255, 255, 255, 0.8);
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.2s ease;
            }
            .luxury-dropdown-item:hover {
              background: rgba(181, 137, 59, 0.12);
              color: #ffffff;
            }
            .luxury-dropdown-item.selected {
              background: rgba(181, 137, 59, 0.18);
              color: #b5893b;
              font-weight: 600;
            }

            /* CTA buttons */
            .luxury-cta-container {
              display: flex;
              gap: 16px;
              margin-top: 10px;
            }
            .luxury-submit-btn {
              flex: 3;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              background: linear-gradient(135deg, #b5893b, #d4af37);
              border: none;
              color: #ffffff;
              font-size: 14px;
              font-weight: 700;
              padding: 12px;
              border-radius: 10px;
              cursor: pointer;
              box-shadow: 0 4px 20px rgba(181, 137, 59, 0.3);
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .luxury-submit-btn:hover {
              background: linear-gradient(135deg, #c9a050, #e8cc7a);
              box-shadow: 0 6px 24px rgba(181, 137, 59, 0.45);
              transform: translateY(-1px);
            }
            .luxury-submit-btn:disabled {
              opacity: 0.6;
              cursor: not-allowed;
              transform: none;
              box-shadow: none;
            }
 
            .luxury-secondary-btn {
              flex: 2;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.12);
              color: #e5d7bc;
              font-size: 13.5px;
              font-weight: 650;
              padding: 12px;
              border-radius: 10px;
              cursor: pointer;
              text-decoration: none;
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .luxury-secondary-btn:hover {
              background: rgba(255, 255, 255, 0.08);
              border-color: rgba(181, 137, 59, 0.3);
              color: #ffffff;
            }

            /* Trust Indicators Removed */

            /* Success State styling */
            .luxury-success-container {
              padding: 20px 0;
              text-align: center;
            }
            .checkmark-wrapper {
              display: flex;
              justify-content: center;
              margin-bottom: 24px;
            }
            .success-checkmark-svg {
              width: 80px !important;
              height: 80px !important;
              color: #b5893b !important;
              display: block;
            }
            .success-title {
              font-family: 'Montserrat', sans-serif !important;
              font-size: 32px;
              font-weight: 800;
              letter-spacing: -0.5px;
              background: linear-gradient(135deg, #ffffff 40%, #e5d7bc 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 12px;
            }
            .success-message {
              font-size: 14.5px;
              line-height: 1.6;
              color: rgba(255, 255, 255, 0.7);
              max-width: 440px;
              margin: 0 auto 36px auto;
            }
            .success-cta-container {
              display: flex;
              flex-direction: column;
              gap: 12px;
              max-width: 320px;
              margin: 0 auto;
            }
            .success-close-btn {
              background: linear-gradient(135deg, #b5893b, #d4af37);
              border: none;
              color: #ffffff;
              font-size: 14px;
              font-weight: 700;
              padding: 14px;
              border-radius: 10px;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            .success-close-btn:hover {
              background: linear-gradient(135deg, #c9a050, #e8cc7a);
              transform: translateY(-1px);
            }
            .success-another-btn {
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.15);
              color: rgba(255, 255, 255, 0.7);
              font-size: 13px;
              font-weight: 600;
              padding: 12px;
              border-radius: 10px;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            .success-another-btn:hover {
              background: rgba(255, 255, 255, 0.05);
              border-color: rgba(181, 137, 59, 0.3);
              color: #ffffff;
            }

            /* Responsive Overrides */
            @media (max-width: 768px) {
              .luxury-modal-overlay {
                padding: 16px;
                align-items: flex-start;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
              }
              .luxury-modal-card {
                max-width: 480px;
                width: 100%;
                margin: 20px auto;
                height: auto;
                max-height: none;
                border: 1px solid rgba(181, 137, 59, 0.22);
                border-radius: 20px;
                padding: 30px 20px 24px 20px;
                display: flex;
                flex-direction: column;
                overflow: visible;
              }
              .luxury-modal-inner {
                display: flex;
                flex-direction: column;
              }
              .luxury-modal-form {
                display: flex;
                flex-direction: column;
              }
              .luxury-form-grid {
                grid-template-columns: 1fr;
                gap: 14px;
              }
              .luxury-cta-container {
                margin-top: 10px;
                flex-direction: column;
                gap: 10px;
              }
              .luxury-submit-btn, .luxury-secondary-btn {
                width: 100%;
                padding: 12px;
              }
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
