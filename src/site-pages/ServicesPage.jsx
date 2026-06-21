'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useConsultationModal } from '../context/ConsultationModalContext';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import Counter from '../components/Counter';
import ContactForm from '../components/ContactForm';
import {
  FlaskConical, Factory, ShieldCheck, Award, ArrowRight, Check,
  ChevronDown, Beaker, PencilRuler, ShieldAlert, Zap, Globe,
  TrendingUp, Users, Microscope, Layers, Star, Building2,
  Sparkles, Target, BarChart3, CheckCircle2, Phone, Rocket,
  Briefcase, Leaf, Package
} from 'lucide-react';

/* ─── Brand Tokens ─────────────────────────────────────── */
const DEEP   = '#0D2A52';
const GOLD   = '#B5893B';
const GOLD_L = '#D4AF37';
const CREAM  = '#FAF9F7';
const WHITE  = '#FFFFFF';
const MUTED  = '#5c526b';
const NAVY   = '#0D2A52';

/* ─── Data ─────────────────────────────────────────────── */
const SERVICE_CATEGORIES = [
  { id: 'laboratory',  title: 'R&D & Formulation Laboratory',     icon: FlaskConical,  color: '#7b5cb7', short: 'R&D Lab' },
  { id: 'engineering', title: 'Industrial Engineering & Setup',    icon: Factory,       color: '#b5893b', short: 'Engineering' },
  { id: 'regulatory',  title: 'Regulatory & Quality Audits',       icon: ShieldCheck,   color: '#5a8a6b', short: 'Regulatory' },
  { id: 'advisory',    title: 'Brand, DPR & Business Advisory',    icon: Award,         color: '#c06b8a', short: 'Advisory' },
];

const CAPABILITIES_DATA = [
  {
    category: 'laboratory', num: '01',
    title: 'Cosmetic Research & Product Formulation',
    slug: 'cosmetic-research-product-formulation',
    tag: 'Formulation Science',
    desc: 'Developing innovative cosmetic products requires a balance of scientific research, formulation expertise, ingredient intelligence, and efficient development processes. Our team combines advanced biotechnology, AI-assisted formulation insights, and structured laboratory workflows to accelerate product development.',
    bullets: [
      'AI driven formulation screening to predict optimal ingredient synergies faster',
      'High throughput batch testing systems for rapid prototype development',
      'Lean R&D workflow optimization to reduce bottlenecks and improve efficiency',
      'Digital twin laboratory modelling for virtual performance evaluation',
      'Cross functional innovation programs connecting formulation with market needs',
      'Real time R&D analytics and KPI tracking for continuous improvement',
    ]
  },
  {
    category: 'laboratory', num: '02',
    title: 'Stability Testing & Shelf-Life Support',
    slug: 'cosmetic-stability-testing-shelf-life-validation',
    tag: 'Quality Assurance',
    desc: 'Supporting product quality, safety, and consistency through rigorous stability evaluations, compatibility reviews, and shelf-life monitoring. Our testing approach helps identify formulation risks early and validate packaging compatibility.',
    bullets: [
      'Accelerated stability testing under high heat, humidity, and environmental stress',
      'Container product compatibility testing to prevent migration and packaging failures',
      'Real time shelf life evaluations and degradation mapping for long term assessment',
      'pH, viscosity, appearance, fragrance, and sensory parameter drift tracking',
      'Environmental stress studies to evaluate formulation resilience during storage',
      'Stability documentation support for quality assurance and regulatory requirements',
    ]
  },
  {
    category: 'laboratory', num: '03',
    title: 'Ingredient Sourcing',
    slug: 'ingredient-sourcing-support',
    tag: 'Supply Chain',
    desc: 'Access to quality ingredients is essential for developing safe, effective, and commercially successful cosmetic products. We help brands source premium active ingredients, botanical extracts, and specialty raw materials through trusted global supplier networks.',
    bullets: [
      'Procurement of dermatologically validated active ingredients for skincare and haircare',
      'Sourcing certified organic, vegan, sustainable, and herbal extracts from global suppliers',
      'Vetting raw material suppliers for quality standards and regulatory compliance',
      'Evaluation of technical specifications, certificates of analysis, and documentation',
      'Identification of innovative actives, peptides, and performance driven ingredients',
      'Strategic sourcing support to improve supply continuity and cost management',
    ]
  },
  {
    category: 'laboratory', num: '04',
    title: 'Cosmetic Innovation & R&D Productivity Consulting',
    slug: 'cosmetic-innovation-rd-productivity-consulting',
    tag: 'Innovation Strategy',
    desc: 'Pioneering advanced research frameworks that combine artificial intelligence, biotechnology innovation, digital laboratory systems, and efficient workflows to accelerate product development timelines and bring innovative products to market more efficiently.',
    bullets: [
      'AI driven formulation intelligence to identify optimal ingredient combinations',
      'High throughput prototype development systems for faster evaluation',
      'Lean laboratory workflow optimization to reduce bottlenecks',
      'Digital twin laboratory modeling for virtual performance simulation',
      'Cross functional innovation sprints aligning formulation and commercial strategy',
      'KPI dashboards and real time R&D analytics for performance tracking',
    ]
  },
  {
    category: 'engineering', num: '01',
    title: 'Plant Setup & Factory Planning',
    slug: 'plant-setup-factory-planning',
    tag: 'Facility Design',
    desc: 'Strategic facility planning essential for building efficient, compliant, and scalable cosmetic manufacturing operations. We help businesses design production facilities that support GMP requirements, operational efficiency, and future capacity expansion.',
    bullets: [
      'Factory floorplan design aligned with WHO GMP guidelines and production workflows',
      'ISO Class 7 and Class 8 cleanroom planning with contamination control',
      'Utility planning including purified water systems, clean steam, and compressed air',
      'Optimized workflow routing to improve efficiency and prevent cross contamination',
      'Manufacturing zone planning for raw materials, production, and quality control',
      'Facility infrastructure planning to support future expansion and compliance',
    ]
  },
  {
    category: 'engineering', num: '02',
    title: 'Turnkey Cosmetic Project Solutions',
    slug: 'turnkey-cosmetic-project-solutions',
    tag: 'Project Management',
    desc: 'Establishing a cosmetic manufacturing facility requires coordinated execution across infrastructure, equipment, compliance, and production readiness. Our turnkey solutions manage the complete implementation from planning through commercial operations.',
    bullets: [
      'Complete project oversight from site selection through commercial validation',
      'Coordination with architects, construction teams, and machinery vendors',
      'Supervision of equipment installation, commissioning, and utility integration',
      'Commercial trial batch execution to validate production processes',
      'Project scheduling and implementation to improve timelines and readiness',
      'Production startup assistance for smooth transition to commercial manufacturing',
    ]
  },
  {
    category: 'engineering', num: '03',
    title: 'Cosmetic Manufacturing Consulting',
    slug: 'cosmetic-manufacturing-consulting',
    tag: 'Operations Excellence',
    desc: 'Efficient manufacturing operations are critical for maintaining product quality, controlling costs, and improving performance. We help cosmetic manufacturers optimize production processes, strengthen quality systems, and establish scalable manufacturing practices.',
    bullets: [
      'Optimizing batch mixing workflows and process efficiency to reduce cycle times',
      'Procurement auditing and technical evaluation of production equipment',
      'GMP, ISO 22716, and CDSCO audit readiness assessments',
      'Drafting Standard Operating Procedures and quality control documentation',
      'Production process evaluation to improve consistency and resource utilization',
      'Quality assurance recommendations to support long term manufacturing excellence',
    ]
  },
  {
    category: 'engineering', num: '04',
    title: 'Scale Up & Commercialization Support',
    slug: 'scale-up-commercialization-support',
    tag: 'Scale & Growth',
    desc: 'Transitioning a formulation from laboratory to commercial production requires careful process validation, equipment optimization, and manufacturing planning. We help businesses scale efficiently while maintaining product quality and performance.',
    bullets: [
      'Compounding intermediate pilot batches to evaluate process parameters',
      'Designing heating and cooling profiles, mixing speeds, and shear rates',
      'Validating commercial batch uniformity and active ingredient dispersion',
      'Optimizing formulations to reduce product loss and improve efficiency',
      'Scale up assessment to identify manufacturing challenges',
      'Commercialization planning to align production with market launch requirements',
    ]
  },
  {
    category: 'engineering', num: '05',
    title: 'Private Label & Contract Manufacturing Support',
    slug: 'private-label-contract-manufacturing',
    tag: 'Partnership Advisory',
    desc: 'Selecting the right manufacturing partner is essential for product quality, cost efficiency, and long-term business growth. We help brands identify, evaluate, and collaborate with contract manufacturers that align with their production requirements.',
    bullets: [
      'Identifying third-party manufacturers matching product categories and quality standards',
      'Auditing OEM and ODM facilities for GMP compliance and operational capabilities',
      'Supporting commercial discussions around production costs and MOQs',
      'Overseeing quality assurance activities during initial production runs',
      'Evaluating manufacturing partners for scalability and long-term suitability',
    ]
  },
  {
    category: 'regulatory', num: '01',
    title: 'Regulatory & Compliance Support',
    slug: 'regulatory-compliance-support',
    tag: 'Market Access',
    desc: 'Navigating cosmetic regulations requires a clear understanding of market-specific requirements, documentation standards, and product compliance obligations. We help businesses prepare regulatory submissions and streamline approval processes across global markets.',
    bullets: [
      'FDA registration support, MoCRA product listings, and facility compliance guidance',
      'EU CPNP notifications and Responsible Person coordination for European markets',
      'CDSCO manufacturing licences and regulatory documentation support for India',
      'Product Information File preparation and cosmetic safety assessment coordination',
      'Label compliance reviews to verify ingredient declarations and regulatory requirements',
      'Regulatory gap assessments and compliance planning for new product launches',
    ]
  },
  {
    category: 'regulatory', num: '02',
    title: 'Export Documentation Support',
    slug: 'export-documentation-support',
    tag: 'Global Trade',
    desc: 'Successful cosmetic exports require accurate documentation, regulatory compliance, and market-specific labeling to avoid delays. We help businesses prepare export documentation and compliance files that support smooth international trade.',
    bullets: [
      'Compilation of Certificate of Free Sale, Certificate of Analysis, and export documentation',
      'Preparation of MSDS and SDS documentation aligned with destination country requirements',
      'Review of international product labeling and multilingual compliance disclosures',
      'Support with customs clearance documentation and regulatory verification files',
      'Coordination of product safety records and market-specific certification requirements',
      'Export readiness assessments to support international expansion',
    ]
  },
  {
    category: 'advisory', num: '01',
    title: 'Cosmetic DPR & Business Consulting',
    slug: 'cosmetic-dpr-business-consulting',
    tag: 'Business Strategy',
    desc: 'Launching or expanding a cosmetic business requires strategic planning backed by financial, operational, and market insights. We help entrepreneurs, investors, and manufacturers evaluate feasibility, prepare investment-ready reports, and build practical growth strategies.',
    bullets: [
      'Drafting Detailed Project Reports (DPR) to support funding and investment planning',
      'Developing CapEx models covering land, infrastructure, and machinery costs',
      'Preparing OpEx forecasts, ROI calculations, and financial projections',
      'Conducting market feasibility assessments and competitor analysis',
      'Supporting project planning with capacity and operational viability evaluations',
    ]
  },
  {
    category: 'advisory', num: '02',
    title: 'Technical Recruitment & Team Building Support',
    slug: 'technical-recruitment-team-building',
    tag: 'Talent Solutions',
    desc: 'Building a capable team is essential for successful product development, manufacturing operations, and quality management. We help cosmetic businesses identify, evaluate, and recruit technical professionals with the expertise required for operational excellence.',
    bullets: [
      'Hiring senior cosmetic chemists, formulation scientists, and quality professionals',
      'Sourcing plant operators, production supervisors, and cleanroom personnel',
      'Conducting technical competency assessments and structured candidate evaluation',
      'Supporting recruitment for laboratory, manufacturing, and regulatory functions',
      'Developing onboarding and operational training programs for workforce readiness',
    ]
  },
  {
    category: 'advisory', num: '03',
    title: 'Packaging Development & Sourcing',
    slug: 'packaging-development-sourcing',
    tag: 'Packaging Solutions',
    desc: 'Packaging plays a critical role in product protection, brand perception, and consumer experience. We help cosmetic businesses select, source, and evaluate packaging solutions that balance functionality, aesthetics, sustainability, and market positioning.',
    bullets: [
      'Custom packaging development support and design coordination',
      'Sourcing airless pumps, jars, tubes, droppers, and premium packaging components',
      'Identification of sustainable packaging solutions including PCR materials',
      'Packaging compatibility assessments to ensure formulation stability',
      'Supplier evaluation and review of quality testing data and packaging reliability',
    ]
  },
  {
    category: 'advisory', num: '04',
    title: 'Branding & Go-To-Market Consulting',
    slug: 'branding-go-to-market-consulting',
    tag: 'Market Strategy',
    desc: 'A strong product requires a clear market strategy to achieve commercial success. We help cosmetic brands build compelling market positioning, define their brand identity, and develop go-to-market strategies that support customer acquisition and sustainable growth.',
    bullets: [
      'Defining brand identity, positioning frameworks, and value propositions',
      'Developing product launch strategies and initial inventory recommendations',
      'Conducting market entry assessments and target audience validation',
      'Supporting ecommerce growth strategies and distribution channel optimization',
      'Creating brand communication guidelines to maintain consistency across touchpoints',
    ]
  },
];

const WORKFLOW_STEPS = [
  { icon: Beaker,       num: '01', title: 'Formulation & Prototype Development',   desc: 'We develop and refine cosmetic formulations based on product objectives, ingredient compatibility, and performance expectations. Each formulation undergoes technical evaluation to support stability, safety, and commercial viability.' },
  { icon: PencilRuler,  num: '02', title: 'Manufacturing & Facility Planning',      desc: 'Our experts assist with production workflows, cleanroom concepts, utility planning, and facility design to help businesses establish efficient and compliant manufacturing environments.' },
  { icon: ShieldAlert,  num: '03', title: 'Regulatory & Compliance Readiness',      desc: 'We support documentation, licensing requirements, product registrations, and compliance planning across domestic and international markets.' },
  { icon: Zap,          num: '04', title: 'Scale Up & Commercial Production',        desc: 'From pilot batches to full scale manufacturing, we help businesses transition formulations into commercially viable products while maintaining consistency and quality.' },
];

const WHY_CARDS = [
  { icon: Microscope,   title: 'Scientific Expertise',          desc: 'Our consulting team brings deep formulation science, cosmetic chemistry, and ingredient expertise built through real product development and manufacturing projects across diverse cosmetic categories.' },
  { icon: Layers,       title: 'End to End Support',            desc: 'From concept formulation through commercial production, EGC provides integrated consulting support across every critical stage of the cosmetic product and manufacturing lifecycle.' },
  { icon: Globe,        title: 'Global Regulatory Knowledge',   desc: 'We understand regulatory requirements across key cosmetic markets including the US, EU, India, Middle East, and Southeast Asia, helping brands expand with compliance confidence.' },
  { icon: TrendingUp,   title: 'Commercial Growth Focus',       desc: 'Our advisory approach aligns technical execution with commercial objectives, ensuring every consulting engagement supports long-term business growth and market competitiveness.' },
];

const STATS = [
  { value: '100+', label: 'Projects Supported' },
  { value: '15+',  label: 'Service Areas' },
  { value: '5+',   label: 'Global Regions' },
  { value: '10+',  label: 'Years of Expertise' },
];

const INDUSTRIES = [
  { icon: Rocket,    title: 'Cosmetic Startups',           desc: 'Launching a cosmetic brand from the ground up with full-spectrum formulation, manufacturing, and commercialization support.' },
  { icon: Package,   title: 'Private Label Brands',        desc: 'Building private label product lines with quality manufacturing partnerships, formulation guidance, and branding support.' },
  { icon: Factory,   title: 'Manufacturers',               desc: 'Optimizing production operations, GMP compliance, and quality systems for cosmetic manufacturers seeking operational excellence.' },
  { icon: Briefcase, title: 'Investors',                   desc: 'Providing DPR preparation, financial modelling, market feasibility assessments, and project planning for cosmetic sector investors.' },
  { icon: Leaf,      title: 'Wellness Companies',          desc: 'Developing wellness and personal care product lines combining natural ingredients, efficacy, and regulatory-compliant formulations.' },
  { icon: Star,      title: 'Established Cosmetic Brands', desc: 'Supporting brand expansion, new product development, compliance updates, and manufacturing optimization for established cosmetic businesses.' },
];

const ENGAGEMENT_STEPS = [
  { num: '01', title: 'Discover',    desc: 'Understanding your business objectives, product requirements, manufacturing ambitions, and regulatory landscape.', outcome: 'Clear project scope and strategic roadmap' },
  { num: '02', title: 'Plan',        desc: 'Developing a tailored consulting strategy covering formulation, facility planning, compliance, and commercialization pathways.', outcome: 'Detailed implementation plan with milestones' },
  { num: '03', title: 'Implement',   desc: 'Executing the consulting plan with technical support across formulation, manufacturing, regulatory, and business advisory services.', outcome: 'Validated product, process, or compliance deliverables' },
  { num: '04', title: 'Scale',       desc: 'Supporting commercial scale-up, market entry, distribution strategies, and ongoing business growth across global markets.', outcome: 'Commercially ready operations and market presence' },
];

const FAQS = [
  { q: 'What types of cosmetic businesses does EGC support?', a: 'EGC Ekora Global Consulting works with cosmetic startups, established beauty brands, private label businesses, contract manufacturers, wellness companies, and investors entering the beauty industry. Our consulting services are designed to support businesses at different stages of product development, manufacturing, compliance, and commercialization.' },
  { q: 'Can EGC support both product development and manufacturing setup?', a: 'Yes. EGC Ekora Global Consulting supports the complete cosmetic business lifecycle, including product research, formulation development, manufacturing planning, factory setup consulting, regulatory guidance, scale-up support, and commercialization strategy. This integrated approach helps businesses maintain alignment across technical and operational functions.' },
  { q: 'How early should I engage a cosmetic consulting company?', a: 'The earlier the better. Engaging a consulting partner during the concept stage helps identify technical challenges, manufacturing requirements, ingredient considerations, regulatory expectations, and cost implications before significant investments are made, reducing development risks and avoiding costly revisions later.' },
  { q: 'Do you support international cosmetic compliance and exports?', a: 'Yes. We assist businesses with export documentation, product registrations, compliance planning, labeling reviews, safety documentation, and market-specific regulatory requirements. This support helps brands prepare for opportunities across domestic and international cosmetic markets.' },
  { q: 'How can I discuss my cosmetic project with your team?', a: 'Businesses looking for guidance on product development, manufacturing, regulatory compliance, or business planning can contact our consulting team directly. For project discussions and consultation requests, call +91 78929 78516 or submit an enquiry through our contact page.' },
];

/* ─── Main Component ───────────────────────────────────── */
const GLOBAL_REGIONS = [
  { region: 'India',         expertise: 'Manufacturing & CDSCO Compliance', x: 68, y: 46, color: '#FF9933' },
  { region: 'Middle East',   expertise: 'Import Regulation & Market Entry', x: 60, y: 40, color: '#C5A028' },
  { region: 'Europe',        expertise: 'EU CPNP & Safety Assessment',      x: 52, y: 28, color: '#1565C0' },
  { region: 'North America', expertise: 'FDA MoCRA & Market Strategy',       x: 23, y: 38, color: '#2E7D32' },
  { region: 'Southeast Asia', expertise: 'Commercialization & Export',       x: 77, y: 53, color: '#7B1FA2' },
  { region: 'Global',        expertise: 'End to End Consulting',            x: 50, y: 48, color: '#B5893B' },
];

export default function ServicesPage() {
  const { openModal } = useConsultationModal();
  const [activeCategory, setActiveCategory] = useState('laboratory');
  const [activeStep, setActiveStep]         = useState(0);
  const [hoveredStep, setHoveredStep]       = useState(null);
  const [isPaused, setIsPaused]             = useState(false);
  const [openFaq, setOpenFaq]               = useState(null);
  const [activePin, setActivePin]           = useState(null);
  const capSectionRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  const handleInteraction = (stepIndex) => {
    if (stepIndex !== null) {
      setHoveredStep(stepIndex);
      setActiveStep(stepIndex);
    }
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 9000);
  };

  const handleInteractionLeave = () => {
    setHoveredStep(null);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  const activeIndex = hoveredStep !== null ? hoveredStep : activeStep;

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTabSwitch = (catId) => {
    setActiveCategory(catId);
    if (capSectionRef.current) {
      const top = capSectionRef.current.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const activeCaps = CAPABILITIES_DATA.filter(c => c.category === activeCategory);
  const activeCat  = SERVICE_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div style={{ background: CREAM, paddingTop: '80px', fontFamily: 'var(--font-sans)', color: DEEP }}>

      <section style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, ${DEEP} 0%, #0b2244 50%, #071730 100%)`, minHeight: '600px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(181,137,59,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(181,137,59,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,137,59,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(90,60,150,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 40px', position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }} className="sp-hero-grid-resp">
            <div>
              <span style={{ display: 'inline-block', fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, border: `1px solid ${GOLD}40`, borderRadius: '4px', padding: '6px 16px', marginBottom: '28px' }}>
                Consultation · Formulation · Engineering · Compliance
              </span>
              <h1 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(30px, 3.8vw, 52px)', fontWeight: 700, color: WHITE, margin: '0 0 22px', lineHeight: 1.12, letterSpacing: '-0.5px' }}>
                End to End Cosmetic<br />
                <span style={{ color: GOLD }}>Product Development</span> &amp;<br />
                Manufacturing Solutions
              </h1>
              <div style={{ width: '52px', height: '3px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`, borderRadius: '2px', marginBottom: '24px' }} />
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '560px' }}>
                EGC Ekora Global Consulting supports cosmetic brands, manufacturers, investors, and entrepreneurs across the complete product lifecycle, from concept development and formulation to manufacturing, compliance, and commercialization.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={() => openModal('services_hero')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', background: GOLD, color: WHITE, border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: `0 8px 28px ${GOLD}50`, transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 14px 36px ${GOLD}60`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 28px ${GOLD}50`; }}>
                  Schedule Consultation <ArrowRight size={16} />
                </button>
                <Link href="#capabilities" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.88)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', transition: 'all 0.3s ease', backdropFilter: 'blur(8px)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}>
                  Explore Capabilities
                </Link>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '44px', flexWrap: 'wrap' }}>
                {['GMP Aligned', 'Global Reach', 'End to End', 'Science Led'].map((chip, i) => (
                  <span key={i} style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', padding: '5px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.05)' }}>✓ {chip}</span>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', height: '460px' }} className="sp-hero-collage">
              {[
                { top: '0%', left: '10%', bg: 'rgba(255,255,255,0.07)', icon: FlaskConical, label: 'Formulation R&D', sub: '300+ formulations developed', color: '#7b5cb7', delay: '0s' },
                { top: '22%', left: '48%', bg: 'rgba(181,137,59,0.12)', icon: Factory,       label: 'Manufacturing',    sub: 'GMP-aligned facility consulting', color: GOLD, delay: '0.2s' },
                { top: '50%', left: '5%',  bg: 'rgba(90,138,107,0.12)', icon: ShieldCheck,   label: 'Compliance',       sub: 'FDA · EU · CDSCO ready', color: '#5a8a6b', delay: '0.4s' },
                { top: '68%', left: '50%', bg: 'rgba(192,107,138,0.1)', icon: TrendingUp,    label: 'Commercialization', sub: 'Scale to global markets', color: '#c06b8a', delay: '0.6s' },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i} style={{ position: 'absolute', top: c.top, left: c.left, background: c.bg, backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '18px', padding: '18px 22px', minWidth: '220px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', animation: `spFloat${i % 2 === 0 ? 'A' : 'B'} 4s ease-in-out infinite`, animationDelay: c.delay }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${c.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: WHITE }}>{c.label}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>{c.sub}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ position: 'absolute', top: '38%', left: '30%', width: '100px', height: '100px', borderRadius: '50%', border: '1px dashed rgba(181,137,59,0.3)', animation: 'spSpin 18s linear infinite' }} />
              <div style={{ position: 'absolute', top: '42%', left: '34%', width: '60px', height: '60px', borderRadius: '50%', border: '1px dashed rgba(181,137,59,0.2)', animation: 'spSpin 12s linear infinite reverse' }} />
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div key={i} style={{ position: 'absolute', top: `calc(38% + 50px + ${Math.sin(deg * Math.PI / 180) * 42}px)`, left: `calc(30% + 50px + ${Math.cos(deg * Math.PI / 180) * 42}px)`, width: '7px', height: '7px', borderRadius: '50%', background: i % 2 === 0 ? GOLD : '#7b5cb7', boxShadow: `0 0 8px ${i % 2 === 0 ? GOLD : '#7b5cb7'}60` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 0', background: WHITE }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Our Project Pipeline</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.15 }}>Our Development Workflow</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto 20px', borderRadius: '2px' }} />
            <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.75, maxWidth: '640px', margin: '0 auto' }}>
              A structured approach to transforming cosmetic ideas into commercially successful products.
            </p>
          </ScrollReveal>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '52px', left: '12.5%', right: '12.5%', height: '2px', background: `linear-gradient(90deg, ${GOLD}30, ${GOLD}, ${GOLD}30)`, zIndex: 0 }} className="sp-workflow-line" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px', position: 'relative', zIndex: 1 }} className="sp-workflow-grid-resp">
              {WORKFLOW_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.1} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div className="sp-wf-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: WHITE, border: '1px solid rgba(181,137,59,0.15)', borderRadius: '20px', padding: '36px 28px 32px', boxShadow: '0 4px 20px rgba(27,11,48,0.04)', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: '16px', right: '20px', fontFamily: 'Syne, serif', fontSize: '56px', fontWeight: 800, color: `${GOLD}09`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{step.num}</div>
                      <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${GOLD}12`, border: `1.5px solid ${GOLD}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, marginBottom: '24px', flexShrink: 0 }}>
                        <Icon size={22} />
                      </div>
                      <h3 style={{ fontFamily: 'Syne, serif', fontSize: '18px', fontWeight: 700, color: DEEP, margin: '0 0 12px', lineHeight: 1.3 }}>{step.title}</h3>
                      <div style={{ width: '28px', height: '2px', background: GOLD, marginBottom: '20px' }} />
                      <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.72, margin: 0, flexGrow: 1 }}>{step.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. CAPABILITY ECOSYSTEM
      ══════════════════════════════════════════════════ */}
      <section id="capabilities" ref={capSectionRef} style={{ padding: '72px 0', background: CREAM, borderTop: `1px solid rgba(181,137,59,0.12)`, borderBottom: `1px solid rgba(181,137,59,0.12)` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Full Scale Cosmetic Advisory</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.15 }}>Capability Ecosystem</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto 20px', borderRadius: '2px' }} />
            <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.75, maxWidth: '660px', margin: '0 auto' }}>
              We support the complete cosmetic product lifecycle, from concept and formulation through manufacturing, regulatory compliance, and commercialization.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '52px' }} className="sp-cap-layout">
            {/* Left column container */}
            <div>
              {/* Sticky nav */}
              <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SERVICE_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isAct = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleTabSwitch(cat.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        padding: '18px 20px', border: 'none', borderRadius: '14px',
                        background: isAct ? WHITE : 'transparent',
                        borderLeft: `4px solid ${isAct ? cat.color : 'transparent'}`,
                        boxShadow: isAct ? '0 8px 28px rgba(27,11,48,0.08)' : 'none',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                      }}
                      onMouseEnter={e => { if (!isAct) e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; }}
                      onMouseLeave={e => { if (!isAct) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isAct ? `${cat.color}18` : 'rgba(181,137,59,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isAct ? cat.color : MUTED, flexShrink: 0, transition: 'all 0.3s' }}>
                        <Icon size={18} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13.5px', fontWeight: 700, color: isAct ? DEEP : MUTED, lineHeight: 1.3, transition: 'color 0.3s' }}>{cat.title}</div>
                        <div style={{ fontSize: '11px', color: isAct ? cat.color : 'transparent', fontWeight: 600, letterSpacing: '0.5px', marginTop: '3px', transition: 'color 0.3s' }}>Active</div>
                      </div>
                      {isAct && <ArrowRight size={14} color={cat.color} />}
                    </button>
                  );
                })}

                {/* Category summary card */}
                {activeCat && (
                  <div style={{ marginTop: '20px', background: `linear-gradient(135deg, ${activeCat.color}10, ${activeCat.color}05)`, border: `1px solid ${activeCat.color}25`, borderRadius: '16px', padding: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: activeCat.color, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Active Pillar</div>
                    <div style={{ fontFamily: 'Syne, serif', fontSize: '15px', fontWeight: 700, color: DEEP, marginBottom: '8px' }}>{activeCat.title}</div>
                    <div style={{ fontSize: '12px', color: MUTED, lineHeight: 1.5 }}>{activeCaps.length} service{activeCaps.length !== 1 ? 's' : ''} in this category</div>
                  </div>
                )}
              </div>
            </div>

            {/* Right — service panels (keyed so Reveal animations reset on tab change) */}
            <div key={activeCategory} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {activeCaps.map((cap, i) => {
                const catObj = SERVICE_CATEGORIES.find(c => c.id === cap.category);
                const catColor = catObj?.color || GOLD;
                return (
                  <ScrollReveal key={`${cap.slug}-${i}`} delay={i * 0.08}>
                    <div className="sp-cap-panel" style={{ background: WHITE, borderRadius: '22px', overflow: 'hidden', border: `1px solid rgba(181,137,59,0.1)`, boxShadow: '0 4px 24px rgba(27,11,48,0.04)', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                      {/* Color bar */}
                      <div style={{ height: '4px', background: `linear-gradient(90deg, ${catColor}, ${catColor}80)` }} />
                      <div style={{ padding: '36px 40px 32px' }}>
                        {/* Header row */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <span style={{ fontFamily: 'Syne, serif', fontSize: '42px', fontWeight: 800, color: `${catColor}18`, lineHeight: 1 }}>{cap.num}</span>
                            <div>
                              <div style={{ fontSize: '10px', fontWeight: 700, color: catColor, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>{cap.tag}</div>
                              <h3 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(17px, 2vw, 22px)', fontWeight: 700, color: DEEP, margin: 0, lineHeight: 1.25 }}>{cap.title}</h3>
                            </div>
                          </div>
                          <Link href={`/services/${cap.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: catColor, textDecoration: 'none', letterSpacing: '0.5px', whiteSpace: 'nowrap', background: `${catColor}10`, padding: '8px 14px', borderRadius: '8px', border: `1px solid ${catColor}30`, transition: 'all 0.2s', flexShrink: 0 }}>
                            Details <ArrowRight size={12} />
                          </Link>
                        </div>

                        <p style={{ fontSize: '14.5px', color: MUTED, lineHeight: 1.78, margin: '0 0 26px' }}>{cap.desc}</p>

                        {/* Scope checklist */}
                        <div style={{ background: `${CREAM}`, border: `1px solid ${catColor}15`, borderRadius: '14px', padding: '22px 24px', marginBottom: '26px' }}>
                          <div style={{ fontSize: '10.5px', fontWeight: 700, color: DEEP, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '20px', height: '2px', background: catColor, borderRadius: '1px', display: 'inline-block' }} />
                            Scope of Services
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 24px' }} className="sp-bullets-grid">
                            {cap.bullets.map((b, j) => (
                              <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#2d2736', lineHeight: 1.5 }}>
                                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: `${catColor}15`, color: catColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                                  <Check size={10} strokeWidth={3} />
                                </div>
                                <span>{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTAs */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          <button onClick={() => openModal(`services_ecosystem_${cap.title}`)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: catColor, color: WHITE, border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: `0 6px 18px ${catColor}35`, transition: 'all 0.3s ease' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                            Get Consultation <ArrowRight size={14} />
                          </button>
                          <Link href={`/services/${cap.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', background: 'transparent', color: catColor, border: `1px solid ${catColor}40`, borderRadius: '8px', fontWeight: 600, fontSize: '13px', textDecoration: 'none', transition: 'all 0.3s ease' }}
                            onMouseEnter={e => { e.currentTarget.style.background = `${catColor}08`; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                            Learn More <ArrowRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. WHY EGC — Stats + Cards
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: `linear-gradient(135deg, ${DEEP} 0%, #0b2244 60%, ${DEEP} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,137,59,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Our Advantage</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: WHITE, margin: '0 0 16px', lineHeight: 1.15 }}>Why Cosmetic Businesses Choose EGC</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto', borderRadius: '2px' }} />
          </ScrollReveal>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '52px' }} className="sp-stats-grid">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div style={{ textAlign: 'center', padding: '28px 20px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '18px' }}>
                  <div style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 800, color: GOLD, lineHeight: 1, marginBottom: '8px' }}>
                    <Counter value={stat.value} />
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 500, letterSpacing: '0.5px' }}>{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="sp-why-grid">
            {WHY_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="sp-why-card" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px 26px', transition: 'all 0.4s ease', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${GOLD}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, marginBottom: '22px' }}>
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontFamily: 'Syne, serif', fontSize: '17px', fontWeight: 700, color: WHITE, margin: '0 0 12px', lineHeight: 1.3 }}>{card.title}</h3>
                    <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.72, margin: 0, flexGrow: 1 }}>{card.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. INDUSTRIES WE SUPPORT
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: WHITE }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Who We Serve</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.15 }}>Industries We Support</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto', borderRadius: '2px' }} />
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="sp-ind-grid">
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="sp-ind-card" style={{ background: CREAM, border: '1px solid rgba(181,137,59,0.12)', borderRadius: '20px', padding: '36px 28px', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`, transform: 'scaleX(0)', transition: 'transform 0.4s ease', transformOrigin: 'left' }} className="sp-ind-bar" />
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${GOLD}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, marginBottom: '22px', transition: 'all 0.3s ease', flexShrink: 0 }}>
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontFamily: 'Syne, serif', fontSize: '18px', fontWeight: 700, color: DEEP, margin: '0 0 12px', lineHeight: 1.3, flexShrink: 0 }}>{ind.title}</h3>
                    <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.72, margin: 0, flexGrow: 1 }}>{ind.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          6. GLOBAL REACH
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: CREAM, borderTop: `1px solid rgba(181,137,59,0.1)`, borderBottom: `1px solid rgba(181,137,59,0.1)` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '80px', alignItems: 'center' }} className="sp-global-grid">
            <ScrollReveal>
              <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '16px' }}>Worldwide Presence</span>
              <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.2 }}>Supporting Cosmetic Businesses Globally</h2>
              <div style={{ width: '48px', height: '3px', background: GOLD, borderRadius: '2px', marginBottom: '24px' }} />
              <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '36px' }}>
                EGC brings cosmetic consulting expertise to businesses across key global markets, supporting product development, manufacturing compliance, regulatory submissions, and commercial growth strategies.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {GLOBAL_REGIONS.map((r, i) => {
                  const isHovered = activePin === i;
                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setActivePin(i)}
                      onMouseLeave={() => setActivePin(null)}
                      style={{
                        padding: '16px',
                        background: isHovered ? `${r.color}08` : WHITE,
                        borderRadius: '12px',
                        border: `1.5px solid ${isHovered ? r.color : 'rgba(181,137,59,0.12)'}`,
                        boxShadow: isHovered ? `0 8px 24px ${r.color}18` : '0 2px 10px rgba(27,11,48,0.03)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: r.color, boxShadow: `0 0 6px ${r.color}` }} />
                        <div style={{ fontSize: '13.5px', fontWeight: 700, color: DEEP }}>{r.region}</div>
                      </div>
                      <div style={{ fontSize: '11.5px', color: MUTED, lineHeight: 1.4 }}>{r.expertise}</div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* SVG World Map */}
            <ScrollReveal delay={0.15}>
              <div style={{ background: WHITE, borderRadius: '24px', padding: '30px', border: '1px solid rgba(181,137,59,0.15)', boxShadow: '0 20px 60px rgba(27,11,48,0.06)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}06 0%, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: GOLD, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>Global Reach</div>
                  <div style={{ fontFamily: 'Syne, serif', fontSize: '18px', fontWeight: 700, color: DEEP }}>5+ Regions · 15+ Service Areas</div>
                </div>

                <div style={{ position: 'relative', background: `linear-gradient(135deg, rgba(13,42,82,0.02) 0%, rgba(13,42,82,0.05) 100%)`, borderRadius: '16px', border: '1px solid rgba(13,42,82,0.08)', overflow: 'hidden' }}>
                  <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    <defs>
                      <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M40 0L0 0 0 40" fill="none" stroke="rgba(13,42,82,0.05)" strokeWidth="0.5" />
                      </pattern>
                    </defs>

                    {/* ── Background Map Image ── */}
                    <image href="/world_map_vector.png" x="0" y="0" width="800" height="400" preserveAspectRatio="none" opacity="0.85" />

                    {/* Grid Overlay */}
                    <rect width="800" height="400" fill="url(#mapGrid)" style={{ pointerEvents: 'none' }} />

                    {/* ── Pin Markers ── */}
                    {GLOBAL_REGIONS.map((r, i) => {
                      const cx = (r.x / 100) * 800;
                      const cy = (r.y / 100) * 400;
                      const active = activePin === i;
                      return (
                        <g
                          key={r.region}
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setActivePin(i)}
                          onMouseLeave={() => setActivePin(null)}
                        >
                          {/* Pulse rings */}
                          <circle cx={cx} cy={cy} r="16" fill={`${r.color}15`} stroke={`${r.color}35`} strokeWidth="1">
                            <animate attributeName="r" values="11;22;11" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                            <animate attributeName="opacity" values="0.6;0;0.6" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                          </circle>
                          <circle cx={cx} cy={cy} r="10" fill={`${r.color}20`} stroke={`${r.color}45`} strokeWidth="1">
                            <animate attributeName="r" values="6;13;6" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.4 + 0.2}s`} />
                            <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.4 + 0.2}s`} />
                          </circle>

                          {/* Pin dot */}
                          <circle cx={cx} cy={cy} r={active ? 8 : 5} fill={r.color} stroke={WHITE} strokeWidth="2" style={{ transition: 'all 0.25s ease' }} />
                          <circle cx={cx} cy={cy} r={active ? 12 : 9} fill="none" stroke={r.color} strokeWidth="1.2" opacity="0.4" style={{ transition: 'all 0.25s ease' }} />

                          {/* Label below pin */}
                          {activePin !== i && (
                            <g style={{ pointerEvents: 'none' }}>
                              <text x={cx} y={cy + 17} textAnchor="middle" fontSize="8" fontWeight="700" fill={WHITE} stroke={WHITE} strokeWidth="3" strokeLinejoin="round">{r.region}</text>
                              <text x={cx} y={cy + 17} textAnchor="middle" fontSize="8" fontWeight="700" fill={DEEP}>{r.region}</text>
                            </g>
                          )}

                          {/* Tooltip */}
                          {active && (
                            <g style={{ pointerEvents: 'none' }}>
                              <rect x={cx - 80} y={cy - 64} width="160" height="48" rx="8" fill={DEEP} stroke={GOLD} strokeWidth="1" opacity="0.96" />
                              <polygon points={`${cx},${cy - 8} ${cx - 5},${cy - 16} ${cx + 5},${cy - 16}`} fill={DEEP} stroke={GOLD} strokeWidth="0" />
                              <line x1={cx - 4} y1={cy - 16} x2={cx + 4} y2={cy - 16} stroke={DEEP} strokeWidth="1.5" />
                              <text x={cx} y={cy - 48} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={GOLD} fontFamily="Syne, sans-serif">{r.region}</text>
                              <text x={cx} y={cy - 32} textAnchor="middle" fontSize="8.5" fontWeight="500" fill={WHITE}>{r.expertise}</text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                  {['Regulatory', 'Manufacturing', 'Commercialization'].map((tag, i) => (
                    <span key={i} style={{ fontSize: '11px', fontWeight: 600, color: GOLD, padding: '4px 12px', borderRadius: '20px', background: `${GOLD}10`, border: `1px solid ${GOLD}30` }}>{tag}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. CONSULTING ENGAGEMENT MODEL
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: WHITE }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>How We Work</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.15 }}>Consulting Engagement Model</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto', borderRadius: '2px' }} />
          </ScrollReveal>

          <div style={{ position: 'relative' }}>
            {/* Horizontal connector */}
            <div style={{ position: 'absolute', top: '42px', left: '12.5%', right: '12.5%', height: '2px', background: 'rgba(181,137,59,0.15)', zIndex: 0 }} className="sp-timeline-line" />
            <div style={{
              position: 'absolute',
              top: '42px',
              left: '12.5%',
              width: `${(activeIndex / 3) * 75}%`,
              height: '2px',
              background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`,
              boxShadow: `0 0 8px ${GOLD}`,
              transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 1
            }} className="sp-timeline-line" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px', position: 'relative', zIndex: 1 }} className="sp-timeline-grid">
              {ENGAGEMENT_STEPS.map((step, i) => {
                const isActive = i === activeIndex;
                return (
                  <ScrollReveal key={i} delay={i * 0.1} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div
                      onMouseEnter={() => handleInteraction(i)}
                      onMouseLeave={handleInteractionLeave}
                      onClick={() => handleInteraction(i)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', height: '100%' }}
                    >
                      {/* Step number badge */}
                      <div style={{
                        width: '84px',
                        height: '84px',
                        borderRadius: '50%',
                        background: isActive ? GOLD : WHITE,
                        border: `2px solid ${isActive ? GOLD : `${GOLD}40`}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '28px',
                        boxShadow: isActive ? `0 8px 28px ${GOLD}40` : '0 4px 16px rgba(27,11,48,0.06)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isActive ? 'scale(1.12)' : 'scale(1)',
                        zIndex: 2
                      }}>
                        <div>
                          <div style={{ fontFamily: 'Syne, serif', fontSize: '11px', fontWeight: 700, color: isActive ? WHITE : MUTED, letterSpacing: '1px', transition: 'color 0.4s ease' }}>STEP</div>
                          <div style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 800, color: isActive ? WHITE : GOLD, lineHeight: 1, transition: 'color 0.4s ease' }}>{step.num}</div>
                        </div>
                      </div>

                      {/* Card */}
                      <div style={{
                        background: isActive ? WHITE : CREAM,
                        border: `1px solid ${isActive ? GOLD : 'rgba(181,137,59,0.12)'}`,
                        borderRadius: '18px',
                        padding: '28px 22px',
                        width: '100%',
                        boxShadow: isActive ? '0 16px 44px rgba(181,137,59,0.15)' : '0 2px 10px rgba(27,11,48,0.03)',
                        transform: isActive ? 'translateY(-10px)' : 'translateY(0)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1
                      }}>
                        <h3 style={{ fontFamily: 'Syne, serif', fontSize: '19px', fontWeight: 700, color: DEEP, margin: '0 0 12px', transition: 'color 0.4s ease', flexShrink: 0 }}>{step.title}</h3>
                        <p style={{ fontSize: '13px', color: MUTED, lineHeight: 1.7, margin: '0 0 18px', flexGrow: 1 }}>{step.desc}</p>
                        <div style={{
                          padding: '10px 14px',
                          background: isActive ? `${GOLD}15` : `${GOLD}0a`,
                          border: `1px solid ${isActive ? GOLD : `${GOLD}20`}`,
                          borderRadius: '8px',
                          transition: 'all 0.4s ease',
                          marginTop: 'auto',
                          flexShrink: 0
                        }}>
                          <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Outcome</div>
                          <div style={{ fontSize: '12px', color: DEEP, fontWeight: 600, lineHeight: 1.4 }}>{step.outcome}</div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. FAQ
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: CREAM, borderTop: `1px solid rgba(181,137,59,0.1)` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Common Queries</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.15 }}>Frequently Asked Questions</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto', borderRadius: '2px' }} />
          </ScrollReveal>

          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} onClick={() => setOpenFaq(isOpen ? null : i)} style={{ background: WHITE, border: `1px solid ${isOpen ? GOLD : 'rgba(181,137,59,0.15)'}`, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', boxShadow: isOpen ? `0 8px 28px ${GOLD}12` : '0 2px 10px rgba(27,11,48,0.03)', transition: 'all 0.35s ease' }}>
                  <div style={{ padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: isOpen ? GOLD : 'rgba(181,137,59,0.4)', fontFamily: 'Syne, serif', flexShrink: 0 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '15.5px', fontWeight: 600, color: DEEP, lineHeight: 1.4 }}>{faq.q}</span>
                    </div>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isOpen ? GOLD : `${GOLD}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s ease' }}>
                      <ChevronDown size={16} color={isOpen ? WHITE : GOLD} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s ease' }} />
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0 28px 24px 60px', borderTop: `1px solid ${GOLD}12`, animation: 'spFadeIn 0.3s ease' }}>
                      <p style={{ fontSize: '14.5px', color: MUTED, lineHeight: 1.8, margin: '16px 0 0' }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. FINAL CTA BANNER
      ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, ${DEEP} 0%, #0b2244 50%, #071730 100%)`, padding: '72px 40px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(181,137,59,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(181,137,59,0.05) 1px, transparent 1px)', backgroundSize: '52px 52px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}15 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-120px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,92,183,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <ScrollReveal style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, border: `1px solid ${GOLD}40`, borderRadius: '4px', padding: '6px 16px', marginBottom: '32px' }}>
            <Sparkles size={12} /> Ready to Begin
          </span>
          <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, color: WHITE, margin: '0 0 22px', lineHeight: 1.12 }}>
            Ready to Build Your Cosmetic Business <span style={{ color: GOLD }}>with Confidence?</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '44px', maxWidth: '640px', margin: '0 auto 44px' }}>
            Partner with EGC to accelerate innovation, strengthen compliance, and achieve commercial success across every stage of your cosmetic product journey.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button onClick={() => openModal('services_bottom')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 34px', background: GOLD, color: WHITE, border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', boxShadow: `0 10px 32px ${GOLD}50`, transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 18px 44px ${GOLD}60`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 10px 32px ${GOLD}50`; }}>
              Schedule Consultation <ArrowRight size={17} />
            </button>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 30px', background: 'rgba(255,255,255,0.08)', color: WHITE, border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', fontWeight: 600, fontSize: '15px', textDecoration: 'none', backdropFilter: 'blur(8px)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}>
              <Phone size={16} /> Contact Our Experts
            </Link>
          </div>

          {/* Trust indicators */}
          <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Scientific Excellence', 'Manufacturing Expertise', 'Regulatory Confidence', 'Commercial Success'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                <CheckCircle2 size={14} color={GOLD} /> {t}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── Contact Form ── */}
      <ContactForm />

      {/* ── STYLES ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spFloatA {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes spFloatB {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes spSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sp-wf-card:hover {
          transform: translateY(-8px) !important;
          border-color: rgba(181,137,59,0.4) !important;
          box-shadow: 0 20px 48px rgba(181,137,59,0.12) !important;
        }
        .sp-cap-panel:hover {
          transform: translateY(-5px);
          border-color: rgba(181,137,59,0.25) !important;
          box-shadow: 0 20px 56px rgba(27,11,48,0.1) !important;
        }
        .sp-why-card:hover {
          background: rgba(255,255,255,0.09) !important;
          border-color: rgba(181,137,59,0.25) !important;
          transform: translateY(-6px);
        }
        .sp-ind-card:hover {
          transform: translateY(-8px);
          border-color: rgba(181,137,59,0.3) !important;
          box-shadow: 0 20px 48px rgba(27,11,48,0.08) !important;
        }
        .sp-ind-card:hover .sp-ind-bar {
          transform: scaleX(1) !important;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .sp-cap-layout { grid-template-columns: 1fr !important; }
          .sp-global-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .sp-hero-collage { display: none !important; }
          .sp-hero-grid-resp { grid-template-columns: 1fr !important; }
          .sp-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .sp-why-grid { grid-template-columns: repeat(2,1fr) !important; }
          .sp-ind-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 900px) {
          .sp-workflow-grid-resp { grid-template-columns: repeat(2,1fr) !important; }
          .sp-workflow-line { display: none !important; }
          .sp-timeline-grid { grid-template-columns: repeat(2,1fr) !important; }
          .sp-timeline-line { display: none !important; }
        }
        @media (max-width: 680px) {
          .sp-workflow-grid-resp { grid-template-columns: 1fr !important; }
          .sp-timeline-grid { grid-template-columns: 1fr !important; }
          .sp-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .sp-why-grid { grid-template-columns: 1fr !important; }
          .sp-ind-grid { grid-template-columns: 1fr !important; }
          .sp-bullets-grid { grid-template-columns: 1fr !important; }
          .sp-cat-tabs { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; flex-wrap: nowrap !important; padding-bottom: 8px !important; }
          .sp-section-pad { padding: 60px 16px !important; }
          .sp-hero-pad { padding: 60px 16px !important; }
        }
        @media (max-width: 420px) {
          .sp-stats-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .sp-ind-grid { grid-template-columns: 1fr !important; }
        }

      `}} />
    </div>
  );
}
