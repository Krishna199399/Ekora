'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import FooterReveal from '../src/components/FooterReveal';
import { useConsultationModal } from '../src/context/ConsultationModalContext';
import ConsultationModal from '../src/components/ConsultationModal';

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const { openModal } = useConsultationModal();

  // Exit Intent Trigger (Desktop only)
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 10) {
        openModal('exit_intent');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [openModal]);

  // 60% Scroll Trigger
  useEffect(() => {
    let scrolled60 = false;
    const handleScroll = () => {
      if (scrolled60) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight <= 0) return;

      const percent = (scrollTop / scrollHeight) * 100;
      if (percent >= 60) {
        scrolled60 = true;
        openModal('scroll_trigger');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openModal]);

  // Cross-fade with subtle upward motion: 350ms duration (300-400ms)
  const pageTransitionVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.25, 1, 0.5, 1], // premium easeOut
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -16,
      transition: {
        duration: 0.25,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar />

      {/* ── Main content — sits above the fixed footer ── */}
      <main
        style={{
          width: '100%',
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'var(--bg-cream, #FAF9F7)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransitionVariants}
            style={{ width: '100%' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Premium Footer with Reveal Animation ── */}
      <FooterReveal>
        <Footer />
      </FooterReveal>

      {/* ── Sticky Mobile Action Bar (≤680px) ── */}
      <div className="mobile-sticky-bar">
        <a href="tel:+917892978516" className="msb-btn msb-call">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-1.02a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>Call</span>
        </a>

        <a href="https://wa.me/917892978516" target="_blank" rel="noreferrer" className="msb-btn msb-whatsapp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          <span>WhatsApp</span>
        </a>

        <button onClick={() => openModal('mobile_sticky_bar')} className="msb-btn msb-consult">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Consult</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Sticky Mobile Bar ── */
        .mobile-sticky-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9000;
          background: #fff;
          border-top: 1px solid rgba(181,137,59,0.2);
          box-shadow: 0 -4px 20px rgba(13,42,82,0.1);
          padding: 8px 0;
          padding-bottom: max(8px, env(safe-area-inset-bottom));
        }
        @media (max-width: 680px) {
          .mobile-sticky-bar {
            display: flex;
            align-items: stretch;
            justify-content: stretch;
          }
        }
        .msb-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 6px 4px;
          border: none;
          background: none;
          cursor: pointer;
          text-decoration: none;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3px;
          transition: all 0.2s ease;
          color: #0D2A52;
          border-right: 1px solid rgba(181,137,59,0.15);
        }
        .msb-btn:last-child { border-right: none; }
        .msb-call {
          color: #0D2A52;
        }
        .msb-call:hover, .msb-call:active {
          background: rgba(13,42,82,0.06);
          color: #0D2A52;
        }
        .msb-whatsapp {
          color: #25D366;
        }
        .msb-whatsapp:hover, .msb-whatsapp:active {
          background: rgba(37,211,102,0.08);
        }
        .msb-consult {
          background: linear-gradient(135deg, #b5893b, #d4af37) !important;
          color: #fff !important;
          border-right: none;
          border-radius: 0;
        }
        .msb-consult:hover, .msb-consult:active {
          background: linear-gradient(135deg, #c9a050, #e8cc7a) !important;
        }
        .msb-btn span {
          font-size: 10px;
          font-weight: 700;
        }
      `}} />
      <ConsultationModal />
    </div>
  );
}
