'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useConsultationModal } from '../../context/ConsultationModalContext';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Phone, Star, Shield, Zap, Award, Users, Globe, Microscope, TrendingUp, FileText, Activity, FlaskConical } from 'lucide-react';
import ContactForm from '../../components/ContactForm';
import { getRelatedServices } from '../../data/servicesData';
import ScrollReveal from '../../components/ScrollReveal';
import { motion } from 'framer-motion';

/* ─── Brand Tokens ────────────────────────────────────────────── */
const NAVY   = '#0D2A52';
const GOLD   = '#D4AF37';
const GOLD2  = '#b5893b';
const WHITE  = '#FFFFFF';
const CREAM  = '#FAFAF7';
const TEXT   = '#1A1A2E';
const MUTED  = '#5c526b';

// useReveal hook removed and replaced with unified ScrollReveal component

/* ─── Lazy Image ─────────────────────────────────────────────── */
function LazyImg({ src, alt, className, style }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [src]);
  if (!src) return null;
  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt || ''}
      className={className}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition: style?.transition
          ? `${style.transition}, opacity 0.5s ease`
          : 'opacity 0.5s ease',
      }}
      loading="lazy"
      onLoad={() => setLoaded(true)}
    />
  );
}

/* ─── RevealBox ──────────────────────────────────────────────── */
function RevealBox({ children, delay = 0, style = {}, direction = 'up', distance = 28 }) {
  return (
    <ScrollReveal delay={delay / 1000} style={style} direction={direction} distance={distance}>
      {children}
    </ScrollReveal>
  );
}

/* ─── Section Badge ──────────────────────────────────────────── */
function SectionBadge({ children, color = GOLD2 }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: '10.5px', fontWeight: 700,
      letterSpacing: '2.8px', textTransform: 'uppercase',
      color, borderBottom: `1.5px solid ${color}`,
      paddingBottom: '3px', marginBottom: '16px',
    }}>
      {children}
    </span>
  );
}

/* ─── Dynamic helper to resolve educational section icons dynamically ─── */
function getEduIcon(title) {
  const t = (title || '').toLowerCase();
  if (t.includes('why') || t.includes('matter') || t.includes('purpose') || t.includes('importance')) return Award;
  if (t.includes('what is') || t.includes('definition') || t.includes('concept')) return FlaskConical;
  if (t.includes('how') || t.includes('support') || t.includes('commercial') || t.includes('benefit')) return TrendingUp;
  if (t.includes('challenge') || t.includes('obstacle') || t.includes('issue') || t.includes('risk') || t.includes('problem')) return Activity;
  if (t.includes('compliance') || t.includes('document') || t.includes('regulatory') || t.includes('quality') || t.includes('standard')) return Shield;
  if (t.includes('when') || t.includes('timing') || t.includes('stage') || t.includes('phase') || t.includes('schedule')) return Zap;
  return Microscope;
}

/* ─── Image Registry (lazy — keyed by string token) ─────────── */
const IMAGE_REGISTRY = {
  'formulation_bespoke':    '/formulation_bespoke.png',
  'formulation_ingredient': '/formulation_ingredient.png',
  'formulation_prototype':  '/formulation_prototype.png',
  'formulation_commercial': '/formulation_commercial.png',
  'fac_cosmetic':           '/cosmetic-manufacturing-plant-ekora.png',
  'fac_industrial':         '/ekora-industrial-project-ekora.png',
  'fac_turnkey':            '/ekora-turnkey-projects.png',
  'fac_boutique':           '/boutique-rd-plant.png',
  'rd_scientist':           '/advanced-rd-innovation.png',
  'rd_shelves':             '/rd-innovation-ekora.png',
  'stability_accelerated':  '/stability_accelerated_study.png',
  'stability_container':    '/stability_container_compatibility.png',
  'stability_realtime':     '/stability_realtime_shelf.jpg',
  'stability_transport':    '/stability_transport_sensory.jpg',
  'mfg_workflow':           '/mfg_workflow.png',
  'mfg_gmp':                '/mfg_gmp.png',
  'mfg_sop':                '/mfg_sop.png',
  'mfg_equipment':          '/mfg_equipment.png',
  'plant_layout':           '/plant_layout.png',
  'plant_utility':          '/plant_utility.png',
  'plant_equipment_install':'/plant_equipment_install.png',
  'plant_commissioning':    '/plant_commissioning.png',
  'turnkey_project':        '/turnkey_project.png',
  'turnkey_construction':   '/turnkey_construction.png',
  'turnkey_handover':       '/turnkey_handover.png',
  'turnkey_training':       '/turnkey_training.png',
  'pl_formulation':         '/pl_formulation.png',
  'pl_filling':             '/pl_filling.png',
  'pl_labeling':            '/pl_labeling.png',
  'pl_quality':             '/pl_quality.png',
  'reg_dossier':            '/reg_dossier.png',
  'reg_safety':             '/reg_safety.png',
  'reg_labeling':           '/reg_labeling.png',
  'reg_audit':              '/reg_audit.png',
  'dpr_report':             '/dpr_report.png',
  'dpr_market':             '/dpr_market.png',
  'dpr_finance':            '/dpr_finance.png',
  'dpr_strategy':           '/dpr_strategy.png',
  'recruit_interview':      '/recruit_interview.png',
  'recruit_assessment':     '/recruit_assessment.png',
  'recruit_onboarding':     '/recruit_onboarding.png',
  'recruit_team':           '/recruit_team.png',
  'pkg_design':             '/pkg_design.png',
  'pkg_sourcing':           '/pkg_sourcing.png',
  'pkg_testing':            '/pkg_testing.png',
  'pkg_sustainability':     '/pkg_sustainability.png',
  'ing_botanical':          '/ing_botanical.png',
  'ing_active':             '/ing_active.png',
  'ing_supplier':           '/ing_supplier.png',
  'ing_docs':               '/ing_docs.png',
  'brand_identity':         '/brand_identity.png',
  'brand_strategy':         '/brand_strategy.png',
  'brand_digital':          '/brand_digital.png',
  'brand_retail':           '/brand_retail.png',
  'scaleup_pilot':          '/scaleup_pilot.png',
  'scaleup_process':        '/scaleup_process.png',
  'scaleup_validation':     '/scaleup_validation.png',
  'scaleup_commercial':     '/scaleup_commercial.png',
  'export_cfs':             '/export_cfs.png',
  'export_sds':             '/export_sds.png',
  'export_multilabel':      '/export_multilabel.png',
  'export_market':          '/export_market.png',
  'rd_ai':                  '/rd_ai.png',
  'rd_highthroughput':      '/rd_highthroughput.png',
  'rd_lean':                '/rd_lean.png',
  'rd_digital':             '/rd_digital.png',
  'branding':               '/Branding & Go-To-Market Consulting Services.png',
  'cat_luxury':             '/cat_luxury.png',
};

async function loadImages() {
  return Promise.resolve();
}

/* ─── Per-service hero image map ────────────────────────────── */
const HERO_IMGS = {
  'cosmetic-research-product-formulation':            '/cosmetic-research-product-forumation.png',
  'cosmetic-manufacturing-consulting':                '/cosmetic-manufacturing-consulting-services-ekora.png',
  'plant-setup-factory-planning':                     '/cosmetic-industry-plant-setup.png',
  'turnkey-cosmetic-project-solutions':               '/turnkey-cosmetic-manufacturing-project-ekora.png',
  'private-label-contract-manufacturing':             '/cosmetic-private-label-contract-support.png',
  'regulatory-compliance-support':                    '/regulatory-compliance-ekora.png',
  'cosmetic-dpr-business-consulting':                 '/cosmetic-dpr-business-consulting-services-ekora.png',
  'technical-recruitment-team-building':              '/cosmetic-industry-recruitment.png',
  'packaging-development-sourcing':                   '/cosmetic-packaging-development-ekora.png',
  'ingredient-sourcing-support':                      '/cosmetic-incredient-sourcing-services.png',
  'branding-go-to-market-consulting':                 '/cosmetic-branding-gotomarket-ekora.png',
  'scale-up-commercialization-support':               '/cosmetic-industry-scale-up-commercialization.png',
  'export-documentation-support':                     '/cosmetic-export-documentation-services-ekora.png',
  'cosmetic-stability-testing-shelf-life-validation': '/stability-testing-cosmetics.png',
  'cosmetic-innovation-rd-productivity-consulting':   '/rd-innovation-cosmetic-ekora.png',
};

/* ─── Category image map ─────────────────────────────────────── */
const CAT_IMGS = {
  'skincare':                '/service_skincare.png',
  'haircare':                '/cosmetic-haircare-manufacturing-ekora.png',
  'bodycare':                '/service_bodycare.png',
  'lipcare':                 '/service_lipcare.png',
  'physicalstability':       '/stability_physical.png',
  'chemicalstability':       '/stability_chemical.png',
  'functionalstability':     '/stability_functional.png',
  'packagingstability':      '/stability_packaging.png',
  'skincareingredients':     '/skincare-incredient-sourcing-ekora.png',
  'haircareingredients':     '/cosmetic-hair-care-manufacturing-ekora.png',
  'bodycareingredients':     '/skincare-formulation-ekora.png',
  'natural&herbalingredients':'/natural-herbal-incredient-sourcing-ekora.png',
  'productionoptimization':  '/cosmetic-production-optimization.png',
  'gmp&compliance':          '/gmp-compliance-cosmetics.png',
  'qualitysystems':          '/cosmetic-manufacturing-quality-systems.png',
  'equipment&scale-up':      '/mfg_scale.png',
  'factoryfloorplanlayout':  '/factory-floorplan-layout.png',
  'cleanroomengineering':    '/cosmetic-cleanroom-engineering.png',
  'hvac&environmentalcontrol':'/hvac-environmental-control-cosmetics.png',
  'utility&infrastructure':  '/utility-infrastructure-cosmetics.png',
  'site&engineering':        '/cosmetic-turnkey-site-engineering.png',
  'construction&approvals':  '/cosmetic-plan-construction-approval.png',
  'equipment&installation':  '/cosmetic-industrial-equipment-installation.png',
  'validation&launch':       '/cosmetic-plan-validation-launch.png',
  'partnerselection':        '/cosmetic-partner-selection.png',
  'gmpaudits':               '/cosmetic-good-manufacturing-practices-audit.png',
  'cost&moq':                '/cosmetic-moq-negotiation.png',
  'quality&production':      '/cosmetic-quality-production.png',
  'marketregistration':      '/cosmetic-market-registration.png',
  'documentation':           '/cosmetic-document-compliance.png',
  'safety&claims':           '/cosmetic-safety-claims-ekora.png',
  'risk&gapanalysis':        '/cosmetic-risk-gap-analysis.png',
  'dprpreparation':          '/cosmetic-dpr-ekora.png',
  'financialanalysis':       '/cosmetic-financial-analysis.png',
  'marketresearch':          '/cosmetic-market-research-ekora.png',
  'fundingsupport':          '/cosmetic-funding-support-ekora.png',
  'scientific&formulation':  '/cosmetic-scientific-innovation.png',
  'manufacturing&operations':'/recruit-manufacturing-operations-ekora.png',
  'qa&regulatory':           '/quality-analysis-regulatory.png',
  'workforceplanning':       '/workforce-planning-ekora.png',
  'design&luxury':           '/cosmetic-luxury-package-design.png',
  'sustainable&pcr':         '/post-consumer-recycled-material.png',
  'compatibility&testing':   '/cosmetic-packaging-compatibility-testing.png',
  'cost&sourcing':           '/cosmetic-packaging-cost-sourcing.png',
  'brandstrategy':           '/cosmetic-brand-strategy-ekora.png',
  'portfolio&pricing':       '/cosmetic-brand-porfolio-ekora.png',
  'gtm&launch':              '/gtm-launch-ekora.png',
  'distribution&global':     '/distribution-global-support-ekoraq.png',
  'pilot&process':           '/cosmetic-production-pilot-scale.png',
  'validation':              '/cosmetic-commercial-batch-validation.png',
  'yield&efficiency':        '/cosmetic-yield-efficiency-ekora.png',
  'documentation&launch':    '/cosmetic-documentation-launch.png',
  'tradecertificates':       '/export-trade-certification.png',
  'safetydocumentation':     '/cosmetic-export-safety.png',
  'labelingcompliance':      '/cosmetic-export-labelling.png',
  'marketreadiness':         '/export-ready-documentation-support-ekora.png',
  'speed':                   '/cosmetic-rd-acceleration.png',
  'innovation':              '/cosmetic-product-innovation.png',
  'efficiency':              '/cosmetic-resource-utilization.png',
  'scalability':             '/cosmetic-scalable-innovation.png',
};
const getCatImg = (title) => {
  if (!title) return null;
  return CAT_IMGS[title.toLowerCase().replace(/\s+/g, '')] || null;
};

/* ─── ServiceDetailPage ──────────────────────────────────────── */
export default function ServiceDetailPage({ service }) {
  const { openModal } = useConsultationModal();
  const [openFaq, setOpenFaq] = useState(null);
  const [imgRegistry, setImgRegistry] = useState({});
  const [activeEduTab, setActiveEduTab] = useState(0);
  const relatedServices = getRelatedServices(service);
  const isLight = service.theme === 'light';
  const svcColor = service.color || GOLD2;
  const heroImg = HERO_IMGS[service.slug] || '/cosmetic-research-product-forumation.png';

  /* load lazy images once */
  useEffect(() => {
    loadImages().then(() => setImgRegistry({ ...IMAGE_REGISTRY }));
  }, []);

  const getFormulationImg = (sec, idx) => {
    if (sec?.image && imgRegistry[sec.image]) return imgRegistry[sec.image];
    const fallbacks = ['formulation_bespoke','formulation_ingredient','formulation_prototype','formulation_commercial'];
    return imgRegistry[fallbacks[idx % 4]] || null;
  };

  const handleContact = () => {
    openModal(`service_detail_${service.slug}`);
  };

  return (
    <div style={{ background: CREAM, paddingTop: '80px', fontFamily: 'var(--font-sans)', color: TEXT }}>

      {/* ══════════════════════════════════════════════════════════
          1. HERO — Split layout with floating stat cards
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: isLight
          ? 'linear-gradient(110deg,#ffffff 0%,#f7f4ee 100%)'
          : `linear-gradient(135deg, #0D1B35 0%, #0D2A52 55%, #0A1E3D 100%)`,
        minHeight: '560px',
        display: 'flex', alignItems: 'center',
      }}>
        {/* Background hero image (right half) */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '55%',
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          maskImage: isLight
            ? 'linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 90%)'
            : 'linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          WebkitMaskImage: isLight
            ? 'linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 90%)'
            : 'linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
        }} />

        {/* Dot grid texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle, ${isLight ? 'rgba(181,137,59,0.12)' : 'rgba(212,175,55,0.12)'} 1px, transparent 1px)`,
          backgroundSize: '36px 36px', opacity: 0.6,
        }} />

        {/* Gold glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at 20% 50%, ${isLight ? 'rgba(181,137,59,0.1)' : 'rgba(212,175,55,0.14)'} 0%, transparent 60%)`,
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '80px 40px', width: '100%' }}>
          <div style={{ maxWidth: '580px' }}>
            {/* Breadcrumb */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <Link href="/" style={{ fontSize: '12px', color: isLight ? 'rgba(45,39,54,0.55)' : 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: isLight ? 'rgba(45,39,54,0.3)' : 'rgba(255,255,255,0.3)', fontSize: '12px' }}>›</span>
              <Link href="/services/" style={{ fontSize: '12px', color: isLight ? 'rgba(45,39,54,0.55)' : 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Services</Link>
              <span style={{ color: isLight ? 'rgba(45,39,54,0.3)' : 'rgba(255,255,255,0.3)', fontSize: '12px' }}>›</span>
              <span style={{ fontSize: '12px', color: svcColor, fontWeight: 600 }}>{service.name}</span>
            </nav>

            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '10.5px', fontWeight: 700, letterSpacing: '2.5px',
              textTransform: 'uppercase', color: svcColor,
              border: `1px solid ${svcColor}55`, borderRadius: '3px',
              padding: '5px 14px', marginBottom: '22px',
            }}>
              {service.eyebrow}
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(28px, 4.5vw, 50px)',
              fontWeight: 600, lineHeight: 1.15,
              color: isLight ? '#0D2A52' : WHITE,
              margin: '0 0 20px',
            }}>
              {service.name}
            </h1>

            {/* Animated gold divider */}
            <div className="sdp-gold-bar" style={{ background: `linear-gradient(90deg, ${svcColor}, ${GOLD})`, marginBottom: '22px' }} />

            {/* Tagline */}
            <p style={{
              fontSize: '17px',
              color: isLight ? '#5c526b' : 'rgba(255,255,255,0.78)',
              lineHeight: 1.65, margin: '0 0 12px',
              fontStyle: isLight ? 'italic' : 'normal',
              fontFamily: isLight ? 'Syne,sans-serif' : 'inherit',
            }}>
              {service.tagline}
            </p>
            {service.subtagline && (
              <p style={{ fontSize: '15px', color: isLight ? '#7c728a' : 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: '0 0 32px' }}>
                {service.subtagline}
              </p>
            )}
            {!service.subtagline && <div style={{ height: '32px' }} />}

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button onClick={handleContact} style={{
                display: 'inline-flex', alignItems: 'center', gap: '9px',
                padding: '14px 28px', background: svcColor, color: WHITE,
                border: 'none', borderRadius: '6px', fontWeight: 700,
                fontSize: '13.5px', cursor: 'pointer',
                boxShadow: `0 6px 20px ${svcColor}50`,
                transition: 'all 0.3s ease', letterSpacing: '0.3px',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 10px 28px ${svcColor}60`; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=`0 6px 20px ${svcColor}50`; }}
              >
                Get a Consultation <ArrowRight size={16} />
              </button>
            </div>

            {/* Trust chips */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '36px', flexWrap: 'wrap' }}>
              {[
                { icon: Shield, label: 'GMP Aligned' },
                { icon: Award,  label: 'End to End' },
                { icon: Globe,  label: 'Global Reach' },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 14px',
                  background: isLight ? 'rgba(181,137,59,0.07)' : 'rgba(255,255,255,0.08)',
                  border: `1px solid ${isLight ? 'rgba(181,137,59,0.25)' : 'rgba(255,255,255,0.14)'}`,
                  borderRadius: '20px',
                  fontSize: '11.5px', fontWeight: 600,
                  color: isLight ? svcColor : 'rgba(255,255,255,0.8)',
                }}>
                  <Icon size={12} color={svcColor} /> {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. OVERVIEW
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '64px 0', background: isLight ? WHITE : CREAM, borderBottom: `1px solid rgba(181,137,59,0.1)` }}>
        <div className="sdp-container">
          {service.included && service.included.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }} className="sdp-overview-grid">
              {/* Left */}
              <RevealBox>
                <div style={{ position: 'relative', paddingLeft: '24px' }}>
                  <div className="sdp-accent-bar-anim" style={{ background: svcColor }} />
                  <SectionBadge color={svcColor}>Overview</SectionBadge>
                  <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(24px,3vw,34px)', fontWeight: 600, color: '#0D2A52', margin: '0 0 18px', lineHeight: 1.25 }}>
                    What We Deliver
                  </h2>
                  <p style={{ fontSize: '15.5px', color: MUTED, lineHeight: 1.8, margin: '0 0 28px' }}>{service.intro}</p>
                  <button onClick={handleContact} className="sdp-btn-dark">
                    Start a Project Conversation <ArrowRight size={15} />
                  </button>
                </div>
              </RevealBox>
              {/* Right — What's Included */}
              <RevealBox delay={120}>
                <div style={{
                  background: WHITE, borderRadius: '18px', overflow: 'hidden',
                  boxShadow: '0 8px 40px rgba(13,42,82,0.08)',
                  border: `1px solid rgba(181,137,59,0.15)`,
                }}>
                  <div style={{ background: NAVY, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check size={16} color={GOLD2} strokeWidth={3} />
                    <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: '17px', fontWeight: 600, color: WHITE, margin: 0 }}>What's Included</h3>
                  </div>
                  <ul style={{ listStyle: 'none', padding: '24px 28px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {service.included.map((item, i) => (
                      <li key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '12px',
                        fontSize: '14px', color: '#2d2736', lineHeight: 1.5,
                        opacity: 0, animation: `sdpFadeInUp 0.4s ease forwards`,
                        animationDelay: `${i * 60}ms`,
                      }}>
                        <span style={{
                          width: '22px', height: '22px', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, background: `${svcColor}18`, color: svcColor, marginTop: '1px',
                          transition: 'transform 0.2s ease',
                        }}>
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBox>
            </div>
          ) : (
            <RevealBox>
              <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
                <SectionBadge color={svcColor}>Overview</SectionBadge>
                <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: '#0D2A52', margin: '0 0 16px', lineHeight: 1.25 }}>
                  What We Deliver
                </h2>
                <div style={{ width: '44px', height: '2px', background: svcColor, margin: '0 auto 24px', borderRadius: '2px' }} />
                <p style={{ fontSize: '16.5px', color: MUTED, lineHeight: 1.8, margin: '0 0 32px' }}>{service.intro}</p>
                <button onClick={handleContact} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '9px',
                  padding: '14px 28px', background: svcColor, color: WHITE,
                  border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '14px',
                  cursor: 'pointer', boxShadow: `0 6px 20px ${svcColor}40`,
                }}>
                  Schedule Strategic Consultation <ArrowRight size={16} />
                </button>
              </div>
            </RevealBox>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INTERNATIONAL STANDARDS STRIP
      ══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 0', background: CREAM, borderBottom: `1px solid rgba(181,137,59,0.1)` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
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

      {/* ══════════════════════════════════════════════════════════
          3. CHALLENGES
      ══════════════════════════════════════════════════════════ */}
      {service.challenges && (
        <section style={{ padding: '64px 0', background: '#fdfcf9', borderBottom: `1px solid rgba(181,137,59,0.1)` }}>
          <div className="sdp-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center' }} className="sdp-2col-grid">
              <RevealBox>
                <SectionBadge color={svcColor}>Industry Obstacles</SectionBadge>
                <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 600, color: '#0D2A52', margin: '0 0 12px' }}>
                  {service.challenges.title}
                </h2>
                <div style={{ width: '44px', height: '2px', background: svcColor, borderRadius: '2px', margin: '0 0 22px' }} />
                <p style={{ fontSize: '15.5px', color: MUTED, lineHeight: 1.7, marginBottom: '24px' }}>{service.challenges.intro}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {service.challenges.list.map((item, i) => (
                    <RevealBox key={i} delay={i * 60}>
                      <div style={{
                        display: 'flex', alignItems: 'flex-start', gap: '12px',
                        padding: '14px 18px', borderRadius: '10px',
                        background: 'rgba(211,47,47,0.04)',
                        border: '1px solid rgba(211,47,47,0.12)',
                        transition: 'transform 0.25s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform='translateX(4px)'}
                      onMouseLeave={e => e.currentTarget.style.transform='translateX(0)'}
                      >
                        <span style={{ color: '#d32f2f', fontWeight: 800, fontSize: '18px', lineHeight: 1, flexShrink: 0, marginTop: '1px' }}>×</span>
                        <span style={{ fontSize: '14.5px', color: '#2d2736', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    </RevealBox>
                  ))}
                </div>
              </RevealBox>
              <RevealBox delay={150}>
                <div style={{
                  background: NAVY, borderRadius: '18px', padding: '36px',
                  border: `1px solid rgba(212,175,55,0.25)`,
                  boxShadow: '0 20px 50px rgba(13,42,82,0.18)',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${svcColor}, ${GOLD})` }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,137,59,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: '50%', left: '-60px', width: '120px', height: '120px', borderRadius: '50%', background: `${svcColor}15`, filter: 'blur(40px)' }} />
                  <Star size={28} color={GOLD2} style={{ marginBottom: '16px' }} />
                  <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: '21px', fontWeight: 600, color: WHITE, margin: '0 0 14px' }}>The EGC Advantage</h3>
                  <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: '0 0 24px' }}>{service.challenges.outro}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                    {['Expert Team', 'Proven Process', 'Full Support'].map((chip, i) => (
                      <span key={i} style={{
                        fontSize: '11px', fontWeight: 700, padding: '5px 12px',
                        borderRadius: '20px', border: `1px solid ${svcColor}60`,
                        color: GOLD2, background: `${svcColor}15`,
                        letterSpacing: '0.5px',
                      }}>{chip}</span>
                    ))}
                  </div>
                  <button onClick={handleContact} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', width: '100%',
                    justifyContent: 'center', padding: '13px 22px',
                    background: svcColor, color: WHITE, border: 'none',
                    borderRadius: '8px', fontWeight: 700, fontSize: '13.5px',
                    cursor: 'pointer', transition: 'all 0.3s ease',
                  }}>
                    Consult with our experts <ArrowRight size={15} />
                  </button>
                </div>
              </RevealBox>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          4. CATEGORIES GRID — Full-bleed image cards
      ══════════════════════════════════════════════════════════ */}
      {service.categoriesGrid && (
        <section style={{ padding: '64px 0', background: CREAM, borderBottom: `1px solid rgba(181,137,59,0.1)` }}>
          <div className="sdp-container">
            <RevealBox style={{ textAlign: 'center', marginBottom: '56px' }}>
              <SectionBadge color={svcColor}>Innovation Segments</SectionBadge>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: '#0D2A52', margin: '0 0 12px' }}>
                {service.categoriesGrid.title}
              </h2>
              <div style={{ width: '44px', height: '2px', background: svcColor, margin: '0 auto 20px', borderRadius: '2px' }} />
              <p style={{ fontSize: '15.5px', color: MUTED, lineHeight: 1.7, maxWidth: '720px', margin: '0 auto' }}>
                {service.categoriesGrid.desc}
              </p>
            </RevealBox>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '22px' }} className="sdp-4col-grid">
              {service.categoriesGrid.items.map((cat, i) => {
                const imgUrl = getCatImg(cat.title);
                return (
                  <RevealBox key={i} delay={i * 70} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <PremiumCategoryCard cat={cat} imgUrl={imgUrl} svcColor={svcColor} />
                  </RevealBox>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          5. EDUCATIONAL SECTIONS — Alternating image/text
      ══════════════════════════════════════════════════════════ */}
      {service.educationalSections && service.educationalSections.length > 0 && (
        <section style={{ 
          padding: '72px 0', 
          background: 'linear-gradient(180deg, #FAFAF7 0%, #FFFFFF 100%)',
          borderBottom: '1px solid rgba(181, 137, 59, 0.12)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle background radial glow */}
          <div style={{
            position: 'absolute',
            top: '40%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${svcColor}08 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${GOLD}05 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div className="sdp-container" style={{ position: 'relative', zIndex: 1 }}>
            <RevealBox style={{ textAlign: 'center', marginBottom: '60px' }}>
              <SectionBadge color={svcColor}>Technical Insights</SectionBadge>
              <h2 style={{ 
                fontFamily: 'Syne,sans-serif', 
                fontSize: 'clamp(26px, 3.5vw, 38px)', 
                fontWeight: 600, 
                color: '#0D2A52', 
                margin: '0 0 16px',
                lineHeight: 1.2
              }}>
                Knowledge & Validation Hub
              </h2>
              <div style={{ width: '52px', height: '2.5px', background: svcColor, margin: '0 auto', borderRadius: '2px' }} />
            </RevealBox>

            {/* Desktop Layout: Interactive Tabs Drawer */}
            <div className="sdp-edu-desktop" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '50px' }}>
              {/* Left Column container */}
              <div>
                {/* Left Column: Topics Sidebar */}
                <div style={{ position: 'sticky', top: '110px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {service.educationalSections.map((section, idx) => {
                    const isActive = activeEduTab === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveEduTab(idx)}
                        style={{
                          textAlign: 'left',
                          padding: '18px 24px',
                          background: isActive ? 'rgba(181, 137, 59, 0.05)' : 'transparent',
                          border: 'none',
                          borderLeft: isActive ? `3.5px solid ${svcColor}` : '3.5px solid rgba(13, 42, 82, 0.05)',
                          borderRadius: '0 12px 12px 0',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) {
                            e.currentTarget.style.background = 'rgba(181, 137, 59, 0.02)';
                            e.currentTarget.style.borderLeft = `3.5px solid ${svcColor}50`;
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderLeft = '3.5px solid rgba(13, 42, 82, 0.05)';
                          }
                        }}
                      >
                        <span style={{
                          fontFamily: 'Syne,sans-serif',
                          fontSize: '15px',
                          fontWeight: 700,
                          color: isActive ? svcColor : '#a0a0b0',
                          letterSpacing: '0.5px',
                          transition: 'color 0.3s'
                        }}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span style={{
                          fontSize: '14.5px',
                          fontWeight: isActive ? 700 : 500,
                          color: isActive ? '#0D2A52' : '#5c526b',
                          lineHeight: 1.35,
                          transition: 'all 0.3s'
                        }}>
                          {section.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Premium Active Content Card */}
              <div style={{ position: 'relative' }}>
                {service.educationalSections.map((section, idx) => {
                  const isActive = activeEduTab === idx;
                  const IconComponent = getEduIcon(section.title);
                  
                  return (
                    <div
                      key={idx}
                      style={{
                        display: isActive ? 'block' : 'none',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateY(0)' : 'translateY(15px)',
                        transition: 'opacity 0.4s ease, transform 0.4s ease',
                        background: WHITE,
                        border: '1px solid rgba(181, 137, 59, 0.18)',
                        borderRadius: '24px',
                        padding: '40px',
                        boxShadow: '0 25px 60px rgba(13, 42, 82, 0.06)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Top decorative badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', borderBottom: '1px solid rgba(181, 137, 59, 0.1)', paddingBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            background: `${svcColor}12`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: svcColor
                          }}>
                            <IconComponent size={18} />
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: svcColor }}>
                            Topic {idx + 1} of {service.educationalSections.length}
                          </span>
                        </div>
                        <span style={{ fontFamily: 'Syne,sans-serif', fontSize: '12px', fontWeight: 600, color: '#a0a0b0' }}>EGC Validation Library</span>
                      </div>

                      <h3 style={{
                        fontFamily: 'Syne,sans-serif',
                        fontSize: 'clamp(20px, 2.5vw, 26px)',
                        fontWeight: 600,
                        color: '#0D2A52',
                        lineHeight: 1.3,
                        margin: '0 0 20px'
                      }}>
                        {section.title}
                      </h3>

                      {/* Drop-cap/lead-in styling for first paragraph */}
                      {section.content && (
                        <p className="sdp-edu-lead" style={{
                          fontSize: '16px',
                          color: '#2d2736',
                          lineHeight: 1.8,
                          marginBottom: '20px',
                          fontWeight: 500
                        }}>
                          {section.content}
                        </p>
                      )}
                      
                      {section.intro && (
                        <p className="sdp-edu-lead" style={{
                          fontSize: '16px',
                          color: '#2d2736',
                          lineHeight: 1.8,
                          marginBottom: '20px',
                          fontWeight: 500
                        }}>
                          {section.intro}
                        </p>
                      )}

                      {section.list && section.list.length > 0 && (
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: section.list.length > 4 ? '1fr 1fr' : '1fr',
                          gap: '12px 24px',
                          margin: '24px 0'
                        }} className="sdp-edu-list-grid">
                          {section.list.map((item, j) => (
                            <div
                              key={j}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                                background: 'rgba(13, 42, 82, 0.02)',
                                border: '1px solid rgba(13, 42, 82, 0.04)',
                                borderRadius: '12px',
                                padding: '14px 18px',
                                transition: 'all 0.25s ease'
                              }}
                              className="sdp-edu-list-item"
                            >
                              <span style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: `${svcColor}15`,
                                color: svcColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: '1px',
                                fontSize: '12px',
                                fontWeight: 800
                              }}>
                                ✓
                              </span>
                              <span style={{ fontSize: '14px', color: '#2d2736', lineHeight: 1.5, fontWeight: 500 }}>
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.outro && (
                        <div style={{
                          borderLeft: `4.5px solid ${GOLD}`,
                          padding: '20px 24px',
                          borderRadius: '0 16px 16px 0',
                          background: `linear-gradient(90deg, rgba(181, 137, 59, 0.04) 0%, rgba(181, 137, 59, 0.01) 100%)`,
                          marginTop: '28px',
                          position: 'relative'
                        }}>
                          <p style={{
                            fontStyle: 'italic',
                            color: '#5c526b',
                            fontSize: '14.5px',
                            lineHeight: 1.75,
                            margin: 0
                          }}>
                            "{section.outro}"
                          </p>
                          <div style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: GOLD,
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            marginTop: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <span>EGC Advisory Principle</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Layout: Responsive stacked visual cards */}
            <div className="sdp-edu-mobile" style={{ display: 'none', flexDirection: 'column', gap: '32px' }}>
              {service.educationalSections.map((section, idx) => {
                const IconComponent = getEduIcon(section.title);
                return (
                  <RevealBox key={idx} delay={idx * 50}>
                    <div style={{
                      background: WHITE,
                      border: '1px solid rgba(181, 137, 59, 0.15)',
                      borderRadius: '20px',
                      padding: '24px 20px',
                      boxShadow: '0 8px 30px rgba(13, 42, 82, 0.04)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <span style={{
                          fontFamily: 'Syne,sans-serif',
                          fontSize: '13px',
                          fontWeight: 800,
                          color: svcColor,
                          letterSpacing: '1.5px'
                        }}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: GOLD }} />
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#7c728a', letterSpacing: '1px' }}>
                          Validation Study
                        </span>
                      </div>

                      <h3 style={{
                        fontFamily: 'Syne,sans-serif',
                        fontSize: '19px',
                        fontWeight: 700,
                        color: '#0D2A52',
                        lineHeight: 1.35,
                        marginBottom: '14px'
                      }}>
                        {section.title}
                      </h3>

                      {section.content && (
                        <p style={{ fontSize: '14.5px', color: '#5c526b', lineHeight: 1.7, marginBottom: '16px' }}>
                          {section.content}
                        </p>
                      )}
                      
                      {section.intro && (
                        <p style={{ fontSize: '14.5px', color: '#5c526b', lineHeight: 1.7, marginBottom: '16px' }}>
                          {section.intro}
                        </p>
                      )}

                      {section.list && section.list.length > 0 && (
                        <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {section.list.map((item, j) => (
                            <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: '#2d2736', lineHeight: 1.5 }}>
                              <span style={{ color: svcColor, fontWeight: 800, flexShrink: 0, marginTop: '2px' }}>✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.outro && (
                        <div style={{
                          borderLeft: `3px solid ${GOLD}`,
                          paddingLeft: '14px',
                          background: `rgba(181, 137, 59, 0.04)`,
                          padding: '12px 14px',
                          borderRadius: '0 8px 8px 0',
                          fontSize: '13.5px',
                          fontStyle: 'italic',
                          color: '#5c526b',
                          lineHeight: 1.6
                        }}>
                          "{section.outro}"
                        </div>
                      )}
                    </div>
                  </RevealBox>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          6. WHY PARTNER WITH EGC — Premium cards with ghost numbers
      ══════════════════════════════════════════════════════════ */}
      {service.whyPartnerWithEGC && (
        <section style={{ padding: '64px 0', background: CREAM }}>
          <div className="sdp-container">
            <RevealBox style={{ textAlign: 'center', marginBottom: '56px' }}>
              <SectionBadge color={svcColor}>Our Differentiators</SectionBadge>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: '#0D2A52', margin: '0 0 12px' }}>
                {service.whyPartnerWithEGC.title}
              </h2>
              <div style={{ width: '44px', height: '2px', background: svcColor, margin: '0 auto', borderRadius: '2px' }} />
            </RevealBox>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="sdp-3col-grid">
              {service.whyPartnerWithEGC.items.map((item, i) => (
                <RevealBox key={i} delay={i * 80} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <WhyPartnerCard item={item} idx={i} svcColor={svcColor} />
                </RevealBox>
              ))}
            </div>
            {service.whyPartnerWithEGC.outro && (
              <RevealBox delay={200}>
                <p style={{ maxWidth: '820px', margin: '48px auto 0', fontSize: '15.5px', lineHeight: 1.8, color: MUTED, textAlign: 'center' }}>
                  {service.whyPartnerWithEGC.outro}
                </p>
              </RevealBox>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          7. PROCESS STEPS — Vertical flow (mobile-first)
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '64px 0',
        background: `linear-gradient(135deg, #0D1B35 0%, #0D2A52 55%, #0A1E3D 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="sdp-container" style={{ position: 'relative', zIndex: 2 }}>
          <RevealBox style={{ textAlign: 'center', marginBottom: '64px' }}>
            <SectionBadge color={GOLD2}>How We Work</SectionBadge>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: WHITE, margin: '0 0 12px' }}>
              Our Engagement Process
            </h2>
            <div style={{ width: '44px', height: '2px', background: GOLD2, margin: '0 auto', borderRadius: '2px' }} />
          </RevealBox>

          {/* Desktop: 4-col grid | Mobile: vertical flow via CSS */}
          <div className="sdp-steps-flow">
            {service.steps.map((step, i) => (
              <RevealBox key={i} delay={i * 90} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <ProcessStepCard step={step} idx={i} total={service.steps.length} svcColor={svcColor} isLight={isLight} />
              </RevealBox>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          8. KEY BENEFITS — Glassmorphism dark cards
      ══════════════════════════════════════════════════════════ */}
      {service.benefits && service.benefits.length > 0 && (
        <section style={{
          padding: '64px 0',
          background: `linear-gradient(135deg, #0D2A52 0%, #0b2244 50%, #0D2A52 100%)`,
          borderTop: `1px solid rgba(212,175,55,0.12)`,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div className="sdp-container" style={{ position: 'relative', zIndex: 2 }}>
            <RevealBox style={{ textAlign: 'center', marginBottom: '56px' }}>
              <SectionBadge color={GOLD2}>Why It Matters</SectionBadge>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: WHITE, margin: '0 0 12px' }}>
                Key Benefits
              </h2>
              <div style={{ width: '44px', height: '2px', background: GOLD2, margin: '0 auto', borderRadius: '2px' }} />
            </RevealBox>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }} className="sdp-3col-grid">
              {service.benefits.map((benefit, i) => (
                <RevealBox key={i} delay={i * 80} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <BenefitCard benefit={benefit} idx={i} svcColor={svcColor} />
                </RevealBox>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          9. WHO THIS IS FOR — Tag cloud with stagger
      ══════════════════════════════════════════════════════════ */}
      {service.audience && service.audience.length > 0 && (
        <AudienceSection
          title="Who This Service Is For"
          eyebrow="Ideal For"
          para="EGC's consulting engagements are tailored to the specific needs of each client. This service is particularly well-suited for organizations at the following stages of the cosmetic business journey."
          tags={service.audience}
          svcColor={svcColor}
        />
      )}

      {/* Optional extra audience-style sections */}
      {service.greenfieldProjects && (
        <AudienceSection
          title={service.greenfieldProjects.title}
          eyebrow="Project Types"
          para={service.greenfieldProjects.content}
          tags={service.greenfieldProjects.list}
          svcColor={svcColor}
          bg={WHITE}
        />
      )}
      {service.projectFeasibility && (
        <AudienceSection
          title={service.projectFeasibility.title}
          eyebrow="Strategic Planning"
          para={service.projectFeasibility.content}
          tags={service.projectFeasibility.list}
          svcColor={svcColor}
        />
      )}
      {service.industries && (
        <AudienceSection
          title={service.industries.title}
          eyebrow="Target Sectors"
          para={service.industries.intro}
          subPara={service.industries.outro}
          tags={service.industries.list}
          svcColor={svcColor}
          bg={WHITE}
        />
      )}

      {/* ══════════════════════════════════════════════════════════
          10. FORMULATION DEEP DIVES — Lazy images, alternating layout
      ══════════════════════════════════════════════════════════ */}
      {service.formulationSections && (
        <section style={{ padding: '72px 0', background: WHITE, borderBottom: `1px solid rgba(181,137,59,0.1)` }}>
          <div className="sdp-container">
            <RevealBox style={{ textAlign: 'center', marginBottom: '64px' }}>
              <SectionBadge color={svcColor}>Service Deep Dives</SectionBadge>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: '#0D2A52', margin: '0 0 12px' }}>
                Core Development Verticals
              </h2>
              <div style={{ width: '44px', height: '2px', background: svcColor, margin: '0 auto', borderRadius: '2px' }} />
            </RevealBox>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '90px' }}>
              {service.formulationSections.map((sec, i) => {
                const imgUrl = getFormulationImg(sec, i);
                const isEven = i % 2 === 0;
                return (
                  <RevealBox key={i} delay={60}>
                    <FormulationRow sec={sec} imgUrl={imgUrl} isEven={isEven} idx={i} svcColor={svcColor} handleContact={handleContact} />
                  </RevealBox>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          11. EVALUATION PARAMETERS — Premium cards
      ══════════════════════════════════════════════════════════ */}
      {service.evaluationParameters && (
        <section style={{ padding: '64px 0', background: CREAM, borderBottom: `1px solid rgba(181,137,59,0.1)` }}>
          <div className="sdp-container">
            <RevealBox style={{ textAlign: 'center', marginBottom: '56px' }}>
              <SectionBadge color={svcColor}>Assessment Framework</SectionBadge>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: '#0D2A52', margin: '0 0 12px' }}>
                {service.evaluationParameters.title}
              </h2>
              <div style={{ width: '44px', height: '2px', background: svcColor, margin: '0 auto', borderRadius: '2px' }} />
            </RevealBox>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '22px' }} className="sdp-4col-grid">
              {service.evaluationParameters.items.map((param, i) => (
                <RevealBox key={i} delay={i * 70} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <PremiumParamCard param={param} idx={i} svcColor={svcColor} />
                </RevealBox>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          12. FAQ — Premium accordion
      ══════════════════════════════════════════════════════════ */}
      {service.faqs && (
        <section style={{ padding: '64px 0', background: '#f8f6f2', borderBottom: `1px solid rgba(181,137,59,0.1)` }}>
          <div className="sdp-container">
            <RevealBox style={{ textAlign: 'center', marginBottom: '56px' }}>
              <SectionBadge color={svcColor}>Common Queries</SectionBadge>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: '#0D2A52', margin: '0 0 12px' }}>
                Frequently Asked Questions
              </h2>
              <div style={{ width: '44px', height: '2px', background: svcColor, margin: '0 auto', borderRadius: '2px' }} />
            </RevealBox>
            <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.faqs.map((faq, i) => (
                <RevealBox key={i} delay={i * 50}>
                  <FaqItem faq={faq} idx={i} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} svcColor={svcColor} />
                </RevealBox>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          13. RELATED SERVICES — Hybrid grid (desktop) / scroll (mobile)
      ══════════════════════════════════════════════════════════ */}
      {relatedServices && relatedServices.length > 0 && (
        <section style={{ padding: '64px 0', background: CREAM }}>
          <div className="sdp-container">
            <RevealBox style={{ textAlign: 'center', marginBottom: '14px' }}>
              <SectionBadge color={GOLD2}>Explore More</SectionBadge>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: '#0D2A52', margin: '0 0 10px' }}>
                Related Services
              </h2>
              <div style={{ width: '44px', height: '2px', background: GOLD2, margin: '0 auto 16px', borderRadius: '2px' }} />
              <p style={{ fontSize: '14.5px', color: MUTED, maxWidth: '560px', margin: '0 auto' }}>
                Businesses often combine these services for an integrated, end to end consulting engagement.
              </p>
            </RevealBox>
            {/* Desktop grid */}
            <div className="sdp-related-desktop">
              {relatedServices.map((rel, i) => (
                <RevealBox key={i} delay={i * 70} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <RelatedCard rel={rel} />
                </RevealBox>
              ))}
            </div>
            {/* Mobile horizontal scroll */}
            <div className="sdp-related-mobile">
              {relatedServices.map((rel, i) => <RelatedCard key={i} rel={rel} />)}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          14. FINAL CTA BAND — Luxury dark with particles
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '64px 40px',
        background: 'radial-gradient(ellipse at center, #0b2244 0%, #0D2A52 100%)',
        color: WHITE, position: 'relative', overflow: 'hidden',
      }}>
        {/* Floating dots */}
        {[...Array(14)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${3 + (i % 3) * 3}px`, height: `${3 + (i % 3) * 3}px`,
            borderRadius: '50%',
            background: i % 2 === 0 ? GOLD2 : 'rgba(255,255,255,0.7)',
            opacity: 0.1 + (i % 5) * 0.04,
            left: `${5 + (i * 6.8) % 90}%`,
            top: `${8 + (i * 11) % 82}%`,
            animation: `sdpPulse ${2.8 + (i % 4) * 0.5}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.22}s`,
            pointerEvents: 'none',
          }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(181,137,59,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '600px' }}>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(24px,3vw,38px)', fontWeight: 600, margin: '0 0 12px' }}>
              {service.finalCta?.title || 'Ready to Begin?'}
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, margin: '0 0 24px', maxWidth: '500px' }}>
              {service.finalCta?.text || 'Connect with our consultants to discuss how EGC can support your next project.'}
            </p>
            {/* Trust strip */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {['✓ GMP Aligned', '✓ Expert Team', '✓ End to End'].map((t, i) => (
                <span key={i} style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', flexShrink: 0 }}>
            <button onClick={handleContact} style={{
              display: 'inline-flex', alignItems: 'center', gap: '9px',
              padding: '16px 32px', background: GOLD2, color: WHITE,
              border: 'none', borderRadius: '6px', fontWeight: 700,
              fontSize: '14px', cursor: 'pointer',
              boxShadow: `0 8px 24px rgba(181,137,59,0.4)`,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; }}
            >
              <Phone size={17} />
              {service.finalCta?.btnText || 'Request a Consultation'}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* ══════════════════════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════════════════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ─── Keyframes ─── */
        @keyframes sdpFadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sdpPulse {
          0%,100% { transform: scale(1); opacity: 0.8; }
          50%      { transform: scale(1.25); opacity: 0.3; }
        }
        @keyframes sdpGoldBarGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes sdpFloatBob {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-7px); }
        }

        /* ─── Gold bar animated ─── */
        .sdp-gold-bar {
          width: 52px; height: 2.5px; border-radius: 2px; margin-bottom: 0;
          transform-origin: left;
          animation: sdpGoldBarGrow 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        /* ─── Accent bar ─── */
        .sdp-accent-bar-anim {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; border-radius: 3px;
        }

        /* ─── Container ─── */
        .sdp-container {
          max-width: 1200px; margin: 0 auto; padding: 0 40px;
        }

        /* ─── Dark button ─── */
        .sdp-btn-dark {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; background: #0D2A52; color: white;
          border: none; border-radius: 6px; font-weight: 600;
          font-size: 13px; cursor: pointer; transition: all 0.3s ease;
          font-family: var(--font-sans);
        }
        .sdp-btn-dark:hover { background: #2d184d; transform: translateY(-2px); }

        /* ─── Process Flow ─── */
        .sdp-steps-flow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        /* ─── Related Services ─── */
        .sdp-related-desktop {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
          margin-top: 48px;
        }
        .sdp-related-mobile { display: none; }

        /* ─── Responsive grids ─── */
        .sdp-4col-grid { grid-template-columns: repeat(4, 1fr); }
        .sdp-3col-grid { grid-template-columns: repeat(3, 1fr); }
        .sdp-2col-grid { grid-template-columns: 1.2fr 0.8fr; }
        .sdp-overview-grid { grid-template-columns: 1fr 1fr; }

        @media (max-width: 1100px) {
          .sdp-related-desktop { grid-template-columns: repeat(2, 1fr); }
          .sdp-steps-flow { grid-template-columns: repeat(2, 1fr); }
          .sdp-4col-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .sdp-3col-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 900px) {
          .sdp-overview-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .sdp-2col-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }

        @media (max-width: 680px) {
          .sdp-container { padding: 0 16px; }
          .sdp-steps-flow { grid-template-columns: 1fr; }
          .sdp-edu-desktop { display: none !important; }
          .sdp-edu-mobile { display: flex !important; }
          .sdp-related-desktop { display: none; }
          .sdp-related-mobile {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            padding: 8px 16px 16px !important;
            margin: 0 -16px !important;
            scrollbar-width: none;
            -ms-overflow-style: none;
            margin-top: 32px;
            align-items: stretch;
          }
          .sdp-related-mobile::-webkit-scrollbar { display: none; }
          /* Each Link wrapper: flexible height, uniform width */
          .sdp-related-mobile .sdp-rel-link {
            flex-shrink: 0 !important;
            width: 230px !important;
            height: auto !important;
            display: flex !important;
            flex-direction: column !important;
          }
          /* The card div: stretch to match the tallest sibling card */
          .sdp-related-mobile .sdp-rel-card {
            height: auto !important;
            flex-grow: 1 !important;
            display: flex !important;
            flex-direction: column !important;
            border-radius: 14px !important;
          }
          /* Image wrapper: fixed height, no padding-top trick */
          .sdp-related-mobile .sdp-rel-img {
            height: 130px !important;
            padding-top: 0 !important;
            flex-shrink: 0 !important;
          }
          .sdp-3col-grid { grid-template-columns: 1fr !important; }
          .sdp-4col-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 420px) {
          .sdp-container { padding: 0 14px; }
          .sdp-related-mobile .sdp-rel-link { width: 210px !important; height: auto !important; }
          .sdp-related-mobile .sdp-rel-img { height: 110px !important; }
        }



        /* ─── Formulation rows ─── */
        .sdp-formulation-row-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 70px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .sdp-formulation-row-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .sdp-formulation-row-grid > div {
            order: unset !important;
          }
        }

        .sdp-edu-list-item {
          transition: all 0.25s ease;
        }
        .sdp-edu-list-item:hover {
          background: rgba(181, 137, 59, 0.05) !important;
          border-color: rgba(181, 137, 59, 0.15) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(13, 42, 82, 0.03);
        }

      `}} />
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */

function PremiumCategoryCard({ cat, imgUrl, svcColor }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: '18px', overflow: 'hidden', cursor: 'default',
        border: `1px solid ${hov ? svcColor + '60' : 'rgba(13,42,82,0.08)'}`,
        boxShadow: hov ? `0 24px 56px rgba(13,42,82,0.18)` : '0 4px 16px rgba(0,0,0,0.05)',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        transform: hov ? 'translateY(-7px)' : 'translateY(0)',
        background: WHITE, display: 'flex', flexDirection: 'column',
        borderTop: `4px solid ${svcColor}`,
        height: '100%',
        flexGrow: 1,
      }}
    >
      {imgUrl && (
        <div style={{ width: '100%', paddingTop: '62.5%', overflow: 'hidden', position: 'relative', background: '#f0ede6' }}>
          <LazyImg
            src={imgUrl} alt={cat.title}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              transform: hov ? 'scale(1.08)' : 'scale(1)', 
              transition: 'transform 0.6s ease' 
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: hov ? 'rgba(13,42,82,0.25)' : 'rgba(13,42,82,0.05)',
            transition: 'background 0.4s',
          }} />
        </div>
      )}
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: '16px', fontWeight: 700, color: '#0D2A52', margin: '0 0 14px' }}>{cat.title}</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {cat.list.map((item, j) => (
            <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#5c526b', lineHeight: 1.45 }}>
              <span style={{ color: svcColor, fontWeight: 800, fontSize: '14px', lineHeight: 1, flexShrink: 0 }}>›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WhyPartnerCard({ item, idx, svcColor }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: WHITE, borderRadius: '18px', padding: '32px 28px',
        border: `1px solid ${hov ? svcColor + '55' : '#e2dfd8'}`,
        boxShadow: hov ? `0 20px 48px rgba(13,42,82,0.12), 0 0 0 1px ${svcColor}30` : '0 4px 16px rgba(27,11,48,0.04)',
        transition: 'all 0.38s cubic-bezier(0.4,0,0.2,1)',
        transform: hov ? 'translateY(-8px)' : 'translateY(0)',
        position: 'relative', overflow: 'hidden',
        height: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Ghost number */}
      <div style={{
        position: 'absolute', top: '-10px', right: '12px',
        fontFamily: 'Syne,sans-serif', fontSize: '76px', fontWeight: 800,
        color: `${svcColor}0d`, lineHeight: 1, pointerEvents: 'none',
      }}>
        {String(idx + 1).padStart(2, '0')}
      </div>
      {/* Top accent */}
      <div style={{ height: '3px', background: `linear-gradient(90deg, ${svcColor}, transparent)`, borderRadius: '2px', marginBottom: '22px' }} />
      <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: '18px', fontWeight: 700, color: svcColor, margin: '0 0 12px', lineHeight: 1.3 }}>
        {item.subtitle}
      </h3>
      <p style={{ fontSize: '14px', color: '#5c526b', lineHeight: 1.7, margin: 0, flexGrow: 1 }}>{item.desc}</p>
    </div>
  );
}

function ProcessStepCard({ step, idx, total, svcColor }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${hov ? svcColor + '70' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '18px', padding: '32px 24px',
        transition: 'all 0.36s cubic-bezier(0.4,0,0.2,1)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hov ? `0 20px 48px rgba(0,0,0,0.28)` : 'none',
        backdropFilter: 'blur(6px)',
        position: 'relative', overflow: 'hidden',
        height: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Ghost number */}
      <div style={{
        position: 'absolute', top: '10px', right: '16px',
        fontFamily: 'Syne,sans-serif', fontSize: '60px', fontWeight: 800,
        color: `${svcColor}18`, lineHeight: 1, pointerEvents: 'none',
      }}>
        {step.num}
      </div>
      {/* Icon badge with pulse ring */}
      <div style={{ position: 'relative', display: 'inline-flex', marginBottom: '20px' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px',
          background: svcColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: hov ? `0 0 0 6px ${svcColor}30` : 'none',
          transition: 'box-shadow 0.3s ease',
        }}>
          <span style={{ fontFamily: 'Syne,sans-serif', fontSize: '13px', fontWeight: 800, color: WHITE }}>{step.num}</span>
        </div>
        {hov && (
          <div style={{
            position: 'absolute', inset: '-6px', borderRadius: '18px',
            border: `1px solid ${svcColor}50`,
            animation: 'sdpPulse 1.5s ease-in-out infinite',
          }} />
        )}
      </div>
      <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: '17px', fontWeight: 600, color: WHITE, margin: '0 0 10px', lineHeight: 1.35 }}>
        {step.title}
      </h3>
      <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
        {step.desc}
      </p>
    </div>
  );
}

function BenefitCard({ benefit, idx, svcColor }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hov ? svcColor + '60' : 'rgba(255,255,255,0.09)'}`,
        borderRadius: '18px', padding: '36px 30px',
        transition: 'all 0.38s cubic-bezier(0.4,0,0.2,1)',
        transform: hov ? 'translateY(-7px)' : 'translateY(0)',
        boxShadow: hov ? '0 20px 48px rgba(0,0,0,0.32)' : 'none',
        backdropFilter: 'blur(8px)',
        position: 'relative', overflow: 'hidden',
        height: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top color accent */}
      <div style={{ height: '2px', background: `linear-gradient(90deg,${svcColor},transparent)`, borderRadius: '2px', marginBottom: '24px' }} />
      <div style={{
        fontFamily: 'Syne,sans-serif', fontSize: '36px', fontWeight: 800,
        color: svcColor, borderBottom: `2px solid ${svcColor}40`,
        paddingBottom: '12px', marginBottom: '18px', display: 'inline-block',
      }}>
        0{idx + 1}
      </div>
      <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: '19px', fontWeight: 600, color: WHITE, margin: '0 0 10px', lineHeight: 1.3 }}>
        {benefit.title}
      </h3>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
        {benefit.desc}
      </p>
    </div>
  );
}

function AudienceSection({ title, eyebrow, para, subPara, tags, svcColor, bg = '#f5f2eb' }) {
  return (
    <section style={{ padding: '64px 0', background: bg, borderTop: `1px solid rgba(181,137,59,0.1)`, borderBottom: `1px solid rgba(181,137,59,0.1)` }}>
      <div className="sdp-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="sdp-overview-grid">
          <RevealBox>
            <SectionBadge color={svcColor}>{eyebrow}</SectionBadge>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 600, color: '#0D2A52', margin: '0 0 14px' }}>{title}</h2>
            <div style={{ width: '40px', height: '2px', background: svcColor, borderRadius: '2px', margin: '0 0 20px' }} />
            <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.7, margin: subPara ? '0 0 12px' : 0 }}>{para}</p>
            {subPara && <p style={{ fontSize: '14px', color: '#7c728a', lineHeight: 1.6, margin: 0 }}>{subPara}</p>}
          </RevealBox>
          <RevealBox delay={120}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {tags.map((tag, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '10px 18px', borderRadius: '100px',
                  border: `1.5px solid ${svcColor}55`,
                  color: svcColor, background: `${svcColor}0d`,
                  fontSize: '13px', fontWeight: 600, letterSpacing: '0.2px',
                  transition: 'all 0.25s ease', cursor: 'default',
                  opacity: 0, animation: `sdpFadeInUp 0.4s ease forwards`,
                  animationDelay: `${i * 55}ms`,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px) scale(1.03)'; e.currentTarget.style.boxShadow='0 6px 16px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </RevealBox>
        </div>
      </div>
    </section>
  );
}

function FormulationRow({ sec, imgUrl, isEven, idx, svcColor, handleContact }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '0.85fr 1.15fr',
      gap: '70px', alignItems: 'center',
    }} className="sdp-formulation-row-grid">
      {/* Image column */}
      <div style={{ order: isEven ? 1 : 2 }}>
        <div
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            borderRadius: '18px', overflow: 'hidden',
            boxShadow: hov ? '0 24px 56px rgba(0,0,0,0.14)' : '0 12px 36px rgba(0,0,0,0.07)',
            border: hov ? `1px solid ${svcColor}50` : '1px solid rgba(226,223,216,0.5)',
            aspectRatio: '16/10', background: '#f0ede6',
            transition: 'all 0.4s ease',
          }}
        >
          {imgUrl ? (
            <LazyImg
              src={imgUrl} alt={sec.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: '#e8e4dc' }} />
          )}
        </div>
      </div>
      {/* Content column */}
      <div style={{ order: isEven ? 2 : 1 }}>
        {/* Ghost row number */}
        <div style={{
          fontFamily: 'Syne,sans-serif', fontSize: '72px', fontWeight: 800,
          color: `${svcColor}0a`, lineHeight: 1, marginBottom: '-20px',
          pointerEvents: 'none', userSelect: 'none',
        }}>
          {String(idx + 1).padStart(2, '0')}
        </div>
        <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(20px,2.5vw,26px)', fontWeight: 600, color: '#0D2A52', margin: '0 0 16px', lineHeight: 1.3 }}>
          {sec.title}
        </h3>
        <div style={{ width: '40px', height: '2px', background: svcColor, borderRadius: '2px', marginBottom: '18px' }} />
        <p style={{ fontSize: '15.5px', color: MUTED, lineHeight: 1.75, margin: '0 0 24px' }}>{sec.desc}</p>
        {sec.bullets && sec.bullets.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {sec.bullets.map((bullet, j) => (
              <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: svcColor, fontSize: '18px', fontWeight: 800, lineHeight: 1 }}>›</span>
                <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.8px', color: '#2d2736', textTransform: 'uppercase' }}>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
        {sec.cta && (
          <button onClick={handleContact} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 22px', background: svcColor, color: WHITE,
            border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '13px',
            cursor: 'pointer', boxShadow: `0 6px 18px ${svcColor}40`,
            transition: 'all 0.3s ease', fontFamily: 'var(--font-sans)',
          }}>
            {sec.cta} <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

function PremiumParamCard({ param, idx, svcColor }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: WHITE, borderRadius: '18px', overflow: 'hidden',
        border: `1px solid ${hov ? svcColor + '55' : 'rgba(13,42,82,0.08)'}`,
        boxShadow: hov ? `0 20px 48px rgba(13,42,82,0.13)` : '0 4px 16px rgba(0,0,0,0.04)',
        transition: 'all 0.38s cubic-bezier(0.4,0,0.2,1)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        borderTop: `4px solid ${svcColor}`,
        height: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
        <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: '16px', fontWeight: 700, color: '#0D2A52', margin: '0 0 14px' }}>{param.title}</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {param.list.map((item, j) => (
            <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#5c526b', lineHeight: 1.45 }}>
              <span style={{ color: svcColor, fontWeight: 800, flexShrink: 0 }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FaqItem({ faq, idx, isOpen, onToggle, svcColor }) {
  return (
    <div
      onClick={onToggle}
      style={{
        background: WHITE, borderRadius: '12px',
        border: `1px solid ${isOpen ? svcColor : '#e2dfd8'}`,
        boxShadow: isOpen ? `0 6px 24px ${svcColor}18` : 'none',
        transition: 'all 0.3s ease', cursor: 'pointer', overflow: 'hidden',
        borderLeft: isOpen ? `4px solid ${svcColor}` : `4px solid transparent`,
      }}
    >
      <div style={{
        padding: '20px 24px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{
            fontFamily: 'Syne,sans-serif', fontSize: '13px', fontWeight: 700,
            color: isOpen ? svcColor : '#a0a0b0', flexShrink: 0, letterSpacing: '0.5px',
          }}>
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '15.5px', fontWeight: 600, color: '#0D2A52', lineHeight: 1.4 }}>{faq.q}</span>
        </div>
        <ChevronDown size={18} color={svcColor} style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{ padding: '0 24px 20px 52px', borderTop: `1px solid rgba(181,137,59,0.1)` }}>
          <p style={{ fontSize: '14.5px', color: MUTED, lineHeight: 1.7, margin: '14px 0 0' }}>{faq.a}</p>
        </div>
      </motion.div>
    </div>
  );
}

function RelatedCard({ rel }) {
  const [hov, setHov] = useState(false);
  const heroUrl = HERO_IMGS[rel.slug] || null;
  return (
    <Link href={`/services/${rel.slug}/`} className="sdp-rel-link" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="sdp-rel-card"
        style={{
          background: WHITE, borderRadius: '16px', overflow: 'hidden',
          border: `1px solid ${hov ? rel.color + '55' : '#e2dfd8'}`,
          boxShadow: hov ? `0 18px 40px rgba(27,11,48,0.12)` : '0 4px 16px rgba(27,11,48,0.04)',
          transition: 'all 0.36s cubic-bezier(0.4,0,0.2,1)',
          transform: hov ? 'translateY(-7px)' : 'translateY(0)',
          display: 'flex', flexDirection: 'column',
          height: '100%',
          flexGrow: 1,
        }}
      >
        {heroUrl && (
          <div className="sdp-rel-img" style={{ width: '100%', paddingTop: '50%', overflow: 'hidden', background: '#f0ede6', position: 'relative' }}>
            <LazyImg
              src={heroUrl} alt={rel.name}
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                transform: hov ? 'scale(1.08)' : 'scale(1)', 
                transition: 'transform 0.6s ease' 
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: hov ? 'rgba(13,42,82,0.2)' : 'rgba(13,42,82,0.05)', transition: 'background 0.3s' }} />
          </div>
        )}
        <div style={{ height: '4px', background: rel.color, flexShrink: 0 }} />
        <div style={{ padding: '20px 22px 22px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: rel.color, marginBottom: '8px' }}>
            {rel.eyebrow}
          </span>
          <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: '15.5px', fontWeight: 600, color: '#0D2A52', margin: '0 0 8px', lineHeight: 1.35 }}>
            {rel.name}
          </h3>
          <p style={{ fontSize: '12.5px', color: MUTED, lineHeight: 1.55, margin: '0 0 16px', flexGrow: 1 }}>{rel.tagline}</p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: hov ? '10px' : '6px',
            fontSize: '12px', fontWeight: 700, color: rel.color,
            textTransform: 'uppercase', letterSpacing: '0.5px',
            transition: 'gap 0.25s ease',
          }}>
            Learn More <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </Link>
  );
}
