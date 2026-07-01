'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useInView, motion } from 'framer-motion';
import { useConsultationModal } from '../context/ConsultationModalContext';
import {
  ArrowRight, ChevronRight, ChevronDown, X, Microscope, Leaf, FlaskConical,
  Sparkles, Globe, Award, ShieldCheck, Zap, Star, CheckCircle2,
  Search, Beaker, Package, TrendingUp, Rocket, Users, Layers,
  Cpu, Droplets, Target, Activity
} from 'lucide-react';

/* ─── Brand Colors ─────────────────────────────────────────────── */
const NAVY  = '#0D2A52';
const GOLD  = '#D4AF37';
const GOLD2 = '#B8941F';
const WHITE = '#FFFFFF';
const CREAM = '#FAFAF7';
const GRAY  = '#F8F9FA';
const TEXT  = '#1A1A2E';
const MUTED = '#6B7280';

/* ─── Data ─────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    key: 'skincare', featured: true,
    title: 'Skincare Products',
    desc: 'Performance-driven skincare solutions focused on efficacy, stability, and consumer satisfaction.',
    fullDesc: [
      'Skincare remains one of the largest and fastest-evolving categories within the global beauty industry. Consumers increasingly seek products that combine efficacy, ingredient transparency, sensory appeal, and long-term skin health benefits.',
      'We support the development of skincare products designed for hydration, cleansing, protection, anti-aging, barrier repair, brightening, and targeted treatment applications.'
    ],
    img: '/skincare-products-manufacturing-ekora.png',
    products: ['Face Wash', 'Serum', 'Moisturizer', 'Sunscreen', 'Face Mask', 'Toner'],
    badge: 'Most Popular',
  },
  {
    key: 'haircare',
    title: 'Haircare Products',
    desc: 'Innovative haircare formulations designed for scalp health and superior hair performance.',
    fullDesc: [
      'Haircare products require a careful balance of cleansing performance, conditioning benefits, scalp compatibility, and consumer experience. Product performance often depends on formulation stability, surfactant selection, active ingredient compatibility, and sensory optimization.',
      'We help businesses develop haircare solutions that address cleansing, nourishment, styling, repair, scalp wellness, and hair growth support.'
    ],
    img: '/haircare-products-manufacturing-ekora.png',
    products: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Serum', 'Hair Mask'],
    badge: null,
  },
  {
    key: 'bodycare',
    title: 'Body Care Products',
    desc: 'Premium body care experiences combining wellness and advanced functionality.',
    fullDesc: [
      'Body care products continue to experience strong demand as consumers focus on skin wellness, self-care routines, and premium personal care experiences. These products require effective moisturization, skin compatibility, texture optimization, and appealing sensory characteristics.',
      'Our expertise covers both daily care products and specialized body treatment formulations.'
    ],
    img: '/bodycare-product-manufacturing-ekora.png',
    products: ['Body Lotion', 'Body Butter', 'Body Wash', 'Body Scrub'],
    badge: null,
  },
  {
    key: 'lipcare',
    title: 'Lip Care Products',
    desc: 'Functional and aesthetic lip formulations for hydration and protection.',
    fullDesc: [
      'Lip care products require specialized formulation strategies to maintain hydration, comfort, protection, and aesthetic appeal while performing effectively under varying environmental conditions.',
      'We support the development of both functional and premium lip care solutions for modern beauty brands.'
    ],
    img: '/service_lipcare.png',
    products: ['Lip Balm', 'Lip Scrub', 'Lip Oil'],
    badge: null,
  },
  {
    key: 'mens',
    title: "Men's Grooming",
    desc: "Specialized grooming products for modern men's skincare and grooming routines.",
    fullDesc: [
      "The men's grooming market continues to expand as consumers seek specialized products designed for facial care, beard maintenance, styling, and personal grooming routines.",
      "We help brands create products tailored to modern grooming preferences, functionality, and consumer expectations."
    ],
    img: '/mens-product-manufacturing-ekora.png',
    products: ['Beard Oil', 'Face Wash', 'Hair Styling Products', 'Aftershave Products'],
    badge: 'Trending',
  },
  {
    key: 'babycare',
    title: 'Baby Care Products',
    desc: 'Ultra-mild, dermatologist-aligned formulations for delicate infant skin.',
    fullDesc: [
      'Baby care formulations require a heightened focus on safety, mildness, skin compatibility, and quality assurance. Product development in this category demands careful ingredient selection and formulation design to support delicate skin and hair.',
      'We assist businesses in developing safe and gentle baby care solutions suitable for daily use.'
    ],
    img: '/babycare-products-mamnufacturing-ekora.png',
    products: ['Baby Lotion', 'Baby Shampoo', 'Rash Cream'],
    badge: null,
  },
  {
    key: 'herbal',
    title: 'Herbal & Natural Cosmetics',
    desc: 'Blending traditional botanical wisdom with modern formulation science.',
    fullDesc: [
      'Demand for herbal, botanical, and naturally inspired beauty products continues to grow across global markets. Consumers increasingly value ingredient transparency, plant-based solutions, and wellness-focused formulations.',
      'Our expertise combines traditional ingredient knowledge with modern formulation science to create products aligned with evolving consumer preferences.'
    ],
    img: '/herbal-comstics-manufacturing-ekora.png',
    products: ['Ayurvedic Products', 'Herbal Oils', 'Natural Skincare'],
    badge: null,
  },
  {
    key: 'wellness',
    title: 'Wellness Beauty Products',
    desc: 'Beauty-from-within solutions merging cosmetics and functional health benefits.',
    fullDesc: [
      'Beauty and wellness are becoming increasingly interconnected. Consumers now seek products that support appearance, lifestyle, wellness goals, and overall self-care experiences.',
      'We support the development of emerging beauty and wellness categories that combine cosmetic innovation with functional benefits.'
    ],
    img: '/wellness-product-manufacturing-ekora.png',
    products: ['Beauty Supplements', 'Nutricosmetics', 'Functional Beauty Products'],
    badge: 'Emerging',
  },
  {
    key: 'luxury', featured: true,
    title: 'Luxury Cosmetics',
    desc: 'Prestige formulations with rare actives and elevated sensory experiences.',
    fullDesc: [
      'Premium beauty consumers expect superior product performance, elegant aesthetics, unique ingredients, and exceptional user experiences. Product development within this segment requires attention to detail across formulation, packaging, positioning, and sensory design.',
      'We help brands create distinctive premium beauty experiences that support long-term brand value.'
    ],
    img: '/luxury-cosmetics-manufacturing.png',
    products: ['Premium Skincare', 'Gold-Infused Products', 'Luxury Collections'],
    badge: 'Premium',
  },
  {
    key: 'color',
    title: 'Color Cosmetics',
    desc: 'Performance makeup combining visual appeal, longevity, and skin-friendly benefits.',
    fullDesc: [
      'Color cosmetics combine visual appeal, performance, texture, wearability, and formulation stability. Product development in this category requires specialized expertise across pigments, sensory characteristics, application performance, and consumer expectations.',
      'We support beauty brands in creating innovative makeup products for diverse consumer needs.'
    ],
    img: '/color-cosmetics-manufacturing-ekora.png',
    products: ['Foundation', 'Compact Powder', 'Lipstick', 'Mascara', 'Blush', 'Eyeliner'],
    badge: null,
  },
  {
    key: 'fragrance', featured: true,
    title: 'Fragrances & Perfumes',
    desc: 'Artisan and commercial fragrance development blending creativity with precision.',
    fullDesc: [
      'Fragrance development blends creativity, technical precision, ingredient compatibility, and consumer preference analysis. Successful fragrance products require careful balancing of scent profiles, performance, longevity, and market positioning.',
      'We support the development of both personal fragrance and lifestyle fragrance product categories.'
    ],
    img: '/fragrance-product-manufacturing-ekora.png',
    products: ['Eau De Parfum (EDP)', 'Eau De Toilette (EDT)', 'Body Mist', 'Roll On Perfumes', 'Attar Products'],
    badge: null,
  },
  {
    key: 'nail',
    title: 'Nail Care Products',
    desc: 'Innovative nail formulations balancing aesthetics and long-term nail health.',
    fullDesc: [
      'Nail care products require specialized formulation techniques that support product durability, appearance, user safety, and application performance. This category continues to evolve through innovation, fashion trends, and consumer demand for healthier nail solutions.'
    ],
    img: '/nailcare-product-manufacturing-ekora.png',
    products: ['Nail Polish', 'Gel Polish', 'Nail Strengthener', 'Nail Serum', 'Nail Remover'],
    badge: null,
  },
  {
    key: 'cosmeceutical',
    title: 'Cosmeceutical Products',
    desc: 'Science-driven formulations bridging cosmetics and clinical skincare efficacy.',
    fullDesc: [
      'Cosmeceuticals bridge the gap between traditional cosmetics and science-driven skincare solutions. These products often incorporate advanced active ingredients designed to support specific skin concerns while maintaining cosmetic compliance requirements.',
      'We help businesses develop formulations built around efficacy, stability, safety, and market relevance.'
    ],
    img: '/cosmaceutical-products-manufacturing.png',
    products: ['Dermatology Products', 'Active Ingredient Formulations', 'Clinical Skin Care Products'],
    badge: null,
  },
  {
    key: 'vegan',
    title: 'Vegan & Clean Beauty',
    desc: 'Cruelty-free, sustainable formulations for the conscious modern consumer.',
    fullDesc: [
      'Consumer demand for clean-label, cruelty-free, vegan, and environmentally conscious beauty products continues to reshape the cosmetic industry. Brands entering this category must carefully balance ingredient selection, performance expectations, sustainability goals, and transparency requirements.'
    ],
    img: '/vegan-cosmetics-manufacturing.png',
    products: ['Vegan Beauty Products', 'Cruelty-Free Products', 'Clean-Label Formulations'],
    badge: null,
  },
  {
    key: 'spa',
    title: 'Spa & Salon Products',
    desc: 'Professional-grade treatments designed for salon, spa, and wellness performance.',
    fullDesc: [
      'Professional beauty environments require products designed for performance, consistency, efficiency, and repeat use. These products often differ significantly from retail formulations in both functionality and application requirements.',
      'We support salons, spas, wellness centers, and professional beauty operators with specialized product development solutions.'
    ],
    img: '/spa-cosmetic-manufacturing.png',
    products: ['Professional Facial Kits', 'Salon Hair Systems', 'Spa Product Lines'],
    badge: null,
  },
];

const JOURNEY_STEPS = [
  { icon: Search,       num: '01', title: 'Market Discovery',       desc: 'Consumer insights, trend analysis, and opportunity assessment.' },
  { icon: FlaskConical, num: '02', title: 'Formulation Strategy',   desc: 'Ingredient architecture, performance goals, and claim strategy.' },
  { icon: Beaker,       num: '03', title: 'Product Development',    desc: 'Prototype creation, iteration, and performance optimization.' },
  { icon: ShieldCheck,  num: '04', title: 'Testing & Validation',   desc: 'Stability, safety, and compatibility assessments.' },
  { icon: Package,      num: '05', title: 'Manufacturing Readiness',desc: 'Scale-up, tech transfer, and production planning.' },
  { icon: Rocket,       num: '06', title: 'Commercialization',      desc: 'Market launch strategy and portfolio growth support.' },
];

const TECH_ITEMS = [
  {
    icon: Sparkles, title: 'Peptides & Bioactives',
    summary: 'Cell-signaling peptides for anti-aging, firming, and regeneration.',
    applications: ['Anti-Aging Serums', 'Eye Creams', 'Lifting Treatments', 'Repair Formulas'],
  },
  {
    icon: ShieldCheck, title: 'Ceramides & Barrier Tech',
    summary: 'Skin-identical lipids for hydration and barrier repair.',
    applications: ['Barrier Repair Creams', 'Baby Skincare', 'Sensitive Skin', 'Clinical Hydration'],
  },
  {
    icon: Leaf, title: 'Botanical Extracts',
    summary: 'Plant-derived actives and Ayurvedic botanicals for natural formulations.',
    applications: ['Herbal Cosmetics', 'Natural Haircare', 'Ayurvedic Products', 'Wellness Beauty'],
  },
  {
    icon: Zap, title: 'Vitamins & Functional Actives',
    summary: 'Vitamin C, Niacinamide, Panthenol, Biotin — targeted actives.',
    applications: ['Brightening Serums', 'Haircare Products', 'Body Care', 'Targeted Treatments'],
  },
  {
    icon: Activity, title: 'Microbiome Technologies',
    summary: 'Probiotic and prebiotic solutions for skin and scalp microbiome balance.',
    applications: ['Sensitive Skin Care', 'Scalp Health', 'Acne Solutions', 'Microbiome Beauty'],
  },
  {
    icon: Layers, title: 'Encapsulation Systems',
    summary: 'Controlled delivery for active ingredient stability and efficacy.',
    applications: ['Time-Release Serums', 'Fragrance Longevity', 'Sun Care', 'Vitamin Delivery'],
  },
  {
    icon: Cpu, title: 'Biotechnology Ingredients',
    summary: 'Fermented actives and next-generation biotech for premium beauty.',
    applications: ['Bioferment Serums', 'High-Performance Actives', 'Premium Collections', 'Next-Gen Beauty'],
  },
  {
    icon: Droplets, title: 'Emulsion Technologies',
    summary: 'Advanced emulsification for superior texture and long-term stability.',
    applications: ['Lightweight Moisturizers', 'Sunscreens', 'BB Creams', 'Luxury Textures'],
  },
];

const WHY_EGC = [
  {
    icon: Microscope,
    stat: '15+ Categories',
    title: 'Scientific Expertise',
    desc: 'Deep formulation science spanning skincare, haircare, color cosmetics, fragrances, and beyond — with rigorous testing protocols at every step.',
  },
  {
    icon: Globe,
    stat: '6 Key Regions',
    title: 'Global Market Intelligence',
    desc: 'Insight into regional consumer preferences, regulatory environments, and market growth opportunities across global beauty markets.',
  },
  {
    icon: Target,
    stat: 'Full Lifecycle',
    title: 'End-to-End Support',
    desc: 'From concept ideation through formulation, testing, manufacturing readiness, and commercial launch — complete product expertise.',
  },
  {
    icon: Award,
    stat: 'GMP-Aligned',
    title: 'Manufacturing & Regulatory Excellence',
    desc: 'GMP-aligned processes with comprehensive compliance planning for FDA, BIS, CDSCO, and international market access.',
  },
];

const GLOBAL_MARKETS = [
  { region: 'India',         focus: 'Ayurveda & Haircare',      desc: 'Strong demand for herbal, Ayurvedic, and haircare formulations with wellness positioning.',         x: 68, y: 46, color: '#FF9933' },
  { region: 'Middle East',   focus: 'Luxury Fragrance',          desc: 'Premium fragrances, luxury skincare, and prestige personal care driving high-value growth.',         x: 60, y: 40, color: '#C5A028' },
  { region: 'Europe',        focus: 'Clean Beauty',              desc: 'Consumer demand for clean-label, vegan, and sustainable formulations with full transparency.',         x: 52, y: 28, color: '#1565C0' },
  { region: 'North America', focus: 'Clinical Skincare',         desc: 'Science-backed cosmeceuticals, wellness beauty, and functional skincare driving innovation.',          x: 23, y: 38, color: '#2E7D32' },
  { region: 'SE Asia',       focus: 'Sunscreens & Brightening',  desc: 'Lightweight sunscreens, brightening serums, and hydration-focused multifunctional products.',         x: 77, y: 53, color: '#7B1FA2' },
  { region: 'Africa',        focus: 'Body Care & Haircare',      desc: 'Moisturizing body care, haircare, and sun protection across diverse and growing markets.',            x: 52, y: 56, color: '#BF360C' },
];

const BEYOND_ITEMS = [
  { icon: TrendingUp,   title: 'Product Strategy & Category Planning',   desc: 'Identifying opportunities, evaluating demand, and selecting the right product categories for long-term growth.' },
  { icon: Leaf,         title: 'Ingredient Selection & Sourcing',         desc: 'Supporting ingredient research, supplier evaluation, raw material selection, and formulation compatibility.' },
  { icon: FlaskConical, title: 'Testing & Product Validation',            desc: 'Evaluating performance, stability, packaging compatibility, and quality requirements before commercialization.' },
  { icon: Package,      title: 'Manufacturing Readiness',                 desc: 'Supporting scale-up planning, production preparation, process optimization, and operational readiness.' },
  { icon: ShieldCheck,  title: 'Regulatory & Compliance Support',         desc: 'Assisting with documentation, registrations, compliance planning, and market-specific requirements.' },
  { icon: Rocket,       title: 'Commercialization & Growth Strategy',     desc: 'Supporting product launches, portfolio development, market expansion, and long-term business growth.' },
];

const FAQ_ITEMS = [
  {
    q: 'What types of cosmetic products can EGC support?',
    a: 'EGC supports development across skincare, haircare, body care, fragrances, color cosmetics, baby care, wellness beauty, cosmeceuticals, luxury cosmetics, professional salon products, and clean-label categories.',
  },
  {
    q: 'Do you only provide formulation development services?',
    a: 'No. Our support extends beyond formulation to include product strategy, testing, ingredient sourcing, manufacturing readiness, regulatory guidance, commercialization planning, and market expansion support.',
  },
  {
    q: 'Can EGC help businesses develop private-label cosmetic products?',
    a: 'Yes. We support private-label development by assisting with product selection, formulation, manufacturing planning, packaging considerations, and commercialization strategies aligned with business objectives.',
  },
  {
    q: 'Do you support cosmetic startups and established manufacturers?',
    a: 'Yes. We work with startups, emerging beauty brands, manufacturers, investors, wellness companies, and established businesses looking to develop new products or expand existing portfolios.',
  },
  {
    q: 'How do you determine the right product category for a business?',
    a: 'Category selection depends on market demand, consumer preferences, business goals, investment considerations, competitive positioning, and long-term growth opportunities within the target market.',
  },
  {
    q: 'Can EGC support products intended for international markets?',
    a: 'Yes. EGC supports businesses targeting international markets by considering category trends, regulatory expectations, manufacturing readiness, and commercialization requirements across multiple regions.',
  },
];

/* ─── Scroll Reveal Hook ───────────────────────────────────────── */
function useReveal(threshold = 0.07) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

/* ─── SectionBadge ─────────────────────────────────────────────── */
function SectionBadge({ children }) {
  return (
    <span style={{
      display: 'inline-block', fontSize: '10px', fontWeight: 700,
      letterSpacing: '3px', textTransform: 'uppercase',
      color: GOLD, borderBottom: `1px solid ${GOLD}`,
      paddingBottom: '3px', marginBottom: '18px',
    }}>
      {children}
    </span>
  );
}

/* ─── Hero Floating Collage ────────────────────────────────────── */
function HeroCollage() {
  const collageItems = [
    { img: '/skincare-products-manufacturing-ekora.png',  top: '4%',  left: '8%',  size: 195, rot: '-5deg', dur: 3.8, delay: '0s',    z: 3 },
    { img: '/fragrance-product-manufacturing-ekora.png', top: '0%',  left: '52%', size: 170, rot:  '6deg', dur: 4.1, delay: '0.4s',  z: 4 },
    { img: '/luxury-cosmetics-manufacturing.png',    top: '30%', left: '30%', size: 205, rot:  '0deg', dur: 3.5, delay: '0.7s',  z: 5 },
    { img: '/color-cosmetics-manufacturing-ekora.png',     top: '58%', left: '6%',  size: 162, rot: '-4deg', dur: 4.4, delay: '0.2s',  z: 3 },
    { img: '/haircare-products-manufacturing-ekora.png',  top: '60%', left: '55%', size: 155, rot:  '5deg', dur: 3.9, delay: '0.6s',  z: 3 },
    { img: '/wellness-product-manufacturing-ekora.png',  top: '20%', left: '-3%', size: 125, rot: '-7deg', dur: 4.2, delay: '0.9s',  z: 2 },
  ];

  return (
    <div style={{ position: 'relative', height: '530px', width: '100%' }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '420px', height: '420px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.18) 1px, transparent 1px)',
        backgroundSize: '36px 36px', opacity: 0.55,
      }} />

      {/* Product images */}
      {collageItems.map((item, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: item.top, left: item.left,
          width: item.size, height: item.size,
          zIndex: item.z,
        }}>
          {/* Outer: rotation wrapper */}
          <div style={{ width: '100%', height: '100%', transform: `rotate(${item.rot})` }}>
            {/* Inner: float animation */}
            <div style={{
              width: '100%', height: '100%',
              borderRadius: '22px', overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(13,42,82,0.28), 0 0 0 1px rgba(212,175,55,0.22)',
              border: '1px solid rgba(255,255,255,0.28)',
              animation: `peFloat ${item.dur}s ease-in-out infinite alternate`,
              animationDelay: item.delay,
            }}>
              <img src={item.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%)',
              }} />
            </div>
          </div>
        </div>
      ))}

      {/* Floating particles */}
      {[...Array(16)].map((_, i) => (
        <div key={`p${i}`} style={{
          position: 'absolute',
          width: `${3 + (i % 3) * 3}px`,
          height: `${3 + (i % 3) * 3}px`,
          borderRadius: '50%',
          background: i % 2 === 0 ? GOLD : 'rgba(255,255,255,0.8)',
          opacity: 0.12 + (i % 5) * 0.05,
          left: `${5 + (i * 6.2) % 90}%`,
          top: `${8 + (i * 9.3) % 82}%`,
          animation: `pePulse ${2.5 + (i % 4) * 0.6}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.18}s`,
          pointerEvents: 'none',
        }} />
      ))}
    </div>
  );
}

/* ─── Category Card (Masonry) ──────────────────────────────────── */
function CategoryCard({ cat, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={() => onClick(cat)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridRow: cat.featured ? 'span 2' : 'span 1',
        position: 'relative', borderRadius: '22px', overflow: 'hidden',
        cursor: 'pointer', minHeight: cat.featured ? '458px' : '220px',
        border: `1px solid ${hov ? GOLD : 'rgba(13,42,82,0.08)'}`,
        boxShadow: hov ? '0 28px 64px rgba(13,42,82,0.22)' : '0 4px 18px rgba(0,0,0,0.07)',
        transition: 'all 0.42s cubic-bezier(0.4,0,0.2,1)',
        transform: hov ? 'translateY(-7px)' : 'translateY(0)',
      }}
    >
      {/* Image */}
      <img
        src={cat.img} alt={cat.title}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.6s ease',
          transform: hov ? 'scale(1.1)' : 'scale(1)',
        }}
      />
      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hov
          ? 'linear-gradient(to top, rgba(13,42,82,0.93) 0%, rgba(13,42,82,0.5) 50%, transparent 100%)'
          : 'linear-gradient(to top, rgba(13,42,82,0.78) 0%, rgba(13,42,82,0.12) 65%, transparent 100%)',
        transition: 'background 0.4s',
      }} />

      {/* Badge */}
      {cat.badge && (
        <div style={{
          position: 'absolute', top: '14px', left: '14px', zIndex: 3,
          background: NAVY, color: GOLD,
          fontSize: '9px', fontWeight: 800, letterSpacing: '1.5px',
          padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase',
        }}>
          {cat.badge}
        </div>
      )}

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 22px 22px', zIndex: 2 }}>
        <h3 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: cat.featured ? '20px' : '15px',
          fontWeight: 700, color: WHITE, margin: '0 0 6px', lineHeight: 1.2,
        }}>
          {cat.title}
        </h3>
        <p style={{
          fontSize: '12px', color: 'rgba(255,255,255,0.76)', lineHeight: 1.55,
          margin: '0 0 12px', textAlign: 'left',
          maxHeight: hov ? '80px' : '36px',
          overflow: 'hidden', transition: 'max-height 0.4s ease',
        }}>
          {cat.desc}
        </p>
        {/* Product pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {cat.products.slice(0, hov ? cat.products.length : 3).map(p => (
            <span key={p} style={{
              fontSize: '10px', fontWeight: 600, color: WHITE,
              background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)',
              padding: '3px 9px', borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.25)',
            }}>
              {p}
            </span>
          ))}
          {!hov && cat.products.length > 3 && (
            <span style={{
              fontSize: '10px', fontWeight: 600, color: GOLD,
              background: 'rgba(212,175,55,0.28)', padding: '3px 9px',
              borderRadius: '10px', border: '1px solid rgba(212,175,55,0.4)',
            }}>
              +{cat.products.length - 3}
            </span>
          )}
        </div>
        {hov && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            marginTop: '12px', color: GOLD, fontSize: '11px',
            fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
          }}>
            Explore Category <ChevronRight size={13} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Category Modal ───────────────────────────────────────────── */
function CategoryModal({ cat, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return createPortal(
    <div
      onClick={onClose}
      className="egc-modal-overlay"
      style={{ animation: 'peModalIn 0.3s ease' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="pe-category-modal-card"
      >
        {/* Header image */}
        <div className="pe-category-modal-header">
          <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${NAVY} 0%, transparent 55%)` }} />
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%',
              width: '36px', height: '36px', cursor: 'pointer', color: WHITE,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
          <div style={{ position: 'absolute', bottom: '20px', left: '28px' }}>
            {cat.badge && (
              <span style={{
                display: 'inline-block', fontSize: '9px', fontWeight: 800,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                background: NAVY, color: GOLD, padding: '3px 10px',
                borderRadius: '20px', marginBottom: '8px',
              }}>
                {cat.badge}
              </span>
            )}
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 700, color: WHITE, margin: 0 }}>
              {cat.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="pe-category-modal-body">
          {/* Full detailed paragraphs from specification */}
          {cat.fullDesc && cat.fullDesc.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              {cat.fullDesc.map((para, i) => (
                <p key={i} style={{
                  fontSize: '15px',
                  color: TEXT,
                  lineHeight: 1.8,
                  marginBottom: '16px',
                  textAlign: 'left',
                  fontWeight: 400,
                }}>
                  {para}
                </p>
              ))}
            </div>
          )}
          
          {/* Short description (fallback if no fullDesc) */}
          {(!cat.fullDesc || cat.fullDesc.length === 0) && (
            <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.75, marginBottom: '24px', textAlign: 'left' }}>
              {cat.desc}
            </p>
          )}
          
          <h4 style={{
            fontSize: '10px', fontWeight: 800, color: GOLD,
            letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '14px',
          }}>
            Products We Support
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px', marginBottom: '24px' }}>
            {cat.products.map(p => (
              <div key={p} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '11px 14px', background: CREAM,
                borderRadius: '12px', border: '1px solid rgba(13,42,82,0.07)',
              }}>
                <CheckCircle2 size={14} style={{ color: GOLD, flexShrink: 0 }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: TEXT }}>{p}</span>
              </div>
            ))}
          </div>
          <Link
            href="/contact/"
            onClick={onClose}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '15px', borderRadius: '14px', textDecoration: 'none',
              background: `linear-gradient(135deg, ${NAVY} 0%, #0A1F40 100%)`,
              color: WHITE, fontWeight: 700, fontSize: '13px',
            }}
          >
            Discuss This Category <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ─── Journey Step ─────────────────────────────────────────────── */
function JourneyStep({ step, index, total }) {
  const [hov, setHov] = useState(false);
  const Icon = step.icon;
  return (
    <div
      className="pe-journey-step"
      style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center', position: 'relative', padding: '0 6px',
      }}
    >
      {/* Connector line */}
      {index < total - 1 && (
        <div
          className="pe-journey-connector"
          style={{
            position: 'absolute', top: '50px', left: '50%', right: '-50%',
            height: '2px', zIndex: 0
          }}
        />
      )}
      {/* Icon and Number Column */}
      <div className="pe-journey-icon-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        {/* Step number */}
        <div style={{ marginBottom: '6px' }}>
          <span style={{ fontSize: '9px', fontWeight: 800, color: GOLD, letterSpacing: '2px' }}>
            {step.num}
          </span>
        </div>
        {/* Icon circle */}
        <div
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: hov ? `linear-gradient(135deg, ${NAVY} 0%, #154080 100%)` : WHITE,
            border: `2px solid ${hov ? GOLD : '#E5E7EB'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: hov ? '0 10px 30px rgba(212,175,55,0.32)' : '0 4px 14px rgba(0,0,0,0.08)',
            transition: 'all 0.32s ease', cursor: 'default',
          }}
        >
          <Icon size={24} style={{ color: hov ? GOLD : NAVY, transition: 'color 0.3s' }} />
        </div>
      </div>
      {/* Title and Description Column */}
      <div className="pe-journey-text" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h4 className="pe-journey-title" style={{ fontSize: '13px', fontWeight: 700, color: TEXT, margin: '14px 0 7px', lineHeight: 1.3 }}>
          {step.title}
        </h4>
        <p className="pe-journey-desc" style={{ fontSize: '11.5px', color: MUTED, lineHeight: 1.6, maxWidth: '138px', margin: 0, textAlign: 'center' }}>
          {step.desc}
        </p>
      </div>
    </div>
  );
}

/* ─── Tech Card (expandable on hover) ──────────────────────────── */
function TechCard({ item }) {
  const [hov, setHov] = useState(false);
  const Icon = item.icon;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? WHITE : 'rgba(255, 255, 255, 0.04)',
        border: `1px solid ${hov ? GOLD : 'rgba(255, 255, 255, 0.12)'}`,
        borderRadius: '20px', padding: '24px 22px',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hov ? `0 20px 48px rgba(212, 175, 55, 0.25)` : 'none',
        transform: hov ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
        cursor: 'default',
        position: 'relative',
        height: '285px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Icon & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexShrink: 0 }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '10px',
          background: hov ? 'rgba(13, 42, 82, 0.06)' : 'rgba(255, 255, 255, 0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease', flexShrink: 0,
        }}>
          <Icon size={18} style={{ color: GOLD }} />
        </div>
        <h4 style={{ fontSize: '15px', fontWeight: 700, color: hov ? NAVY : WHITE, transition: 'all 0.3s ease', margin: 0, lineHeight: 1.3 }}>
          {item.title}
        </h4>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Summary (always visible, style adapts dynamically) */}
        <p style={{
          fontSize: '13px',
          color: hov ? TEXT : 'rgba(255, 255, 255, 0.72)',
          lineHeight: 1.65,
          margin: 0,
          textAlign: 'left',
          transition: 'all 0.3s ease',
        }}>
          {item.summary}
        </p>

        {/* Applications list (revealed with smooth slide-up and fade-in) */}
        <div style={{
          opacity: hov ? 1 : 0,
          transform: hov ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          marginTop: '12px',
        }}>
          <p style={{ fontSize: '9px', fontWeight: 800, color: hov ? GOLD2 : GOLD, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', marginTop: '2px' }}>
            Applications
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px' }}>
            {item.applications.map(app => (
              <div key={app} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: GOLD, flexShrink: 0 }} />
                <span style={{ fontSize: '11px', color: hov ? TEXT : 'rgba(255, 255, 255, 0.8)', transition: 'all 0.3s ease', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {app}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Why Card ─────────────────────────────────────────────────── */
function WhyCard({ item }) {
  const [hov, setHov] = useState(false);
  const Icon = item.icon;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `linear-gradient(135deg, ${NAVY} 0%, #0A1F40 100%)` : WHITE,
        border: `1px solid ${hov ? GOLD : '#E5E7EB'}`,
        borderRadius: '22px', padding: '36px 28px',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hov ? '0 24px 60px rgba(13,42,82,0.26)' : '0 4px 16px rgba(0,0,0,0.05)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        display: 'flex', flexDirection: 'column', gap: '16px',
      }}
    >
      <div style={{
        width: '60px', height: '60px', borderRadius: '18px',
        background: hov ? 'rgba(212,175,55,0.15)' : 'rgba(13,42,82,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.3s',
      }}>
        <Icon size={26} style={{ color: GOLD }} />
      </div>
      <div>
        <p style={{ fontSize: '10px', fontWeight: 800, color: GOLD, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 6px' }}>
          {item.stat}
        </p>
        <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700, color: hov ? WHITE : TEXT, margin: '0 0 10px', transition: 'color 0.3s' }}>
          {item.title}
        </h4>
        <p style={{ fontSize: '13px', color: hov ? 'rgba(255,255,255,0.68)' : MUTED, lineHeight: 1.72, margin: 0, textAlign: 'left', transition: 'color 0.3s' }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

/* ─── SVG World Map ────────────────────────────────────────────── */
function WorldMap({ markets }) {
  const [activePin, setActivePin] = useState(null);

  return (
    <div>
      {/* Map container */}
      <div style={{
        background: `linear-gradient(135deg, rgba(13,42,82,0.04) 0%, rgba(13,42,82,0.09) 100%)`,
        borderRadius: '24px', padding: '20px',
        border: '1px solid rgba(13,42,82,0.1)', overflow: 'hidden',
      }}>
        <svg viewBox="0 0 1000 500" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <pattern id="mapGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M50 0L0 0 0 50" fill="none" stroke="rgba(13,42,82,0.06)" strokeWidth="0.5" />
            </pattern>
          </defs>
          
          {/* ── Background Map Image ── */}
          <image href="/world_map_vector.png" x="0" y="0" width="1000" height="500" preserveAspectRatio="none" opacity="0.9" />
          
          {/* Technical Grid Overlay */}
          <rect width="1000" height="500" fill="url(#mapGrid)" style={{ pointerEvents: 'none' }} />

          {/* ── Pin Markers ── */}
          {markets.map((m, i) => {
            const cx = (m.x / 100) * 1000;
            const cy = (m.y / 100) * 500;
            const active = activePin === i;
            return (
              <g
                key={m.region}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setActivePin(i)}
                onMouseLeave={() => setActivePin(null)}
              >
                {/* Pulse rings */}
                <circle cx={cx} cy={cy} r="20" fill={`${m.color}18`} stroke={`${m.color}44`} strokeWidth="1">
                  <animate attributeName="r" values="14;26;14" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.38}s`} />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.38}s`} />
                </circle>
                <circle cx={cx} cy={cy} r="14" fill={`${m.color}22`} stroke={`${m.color}55`} strokeWidth="1">
                  <animate attributeName="r" values="8;17;8" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.38 + 0.22}s`} />
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.38 + 0.22}s`} />
                </circle>
                {/* Pin dot */}
                <circle cx={cx} cy={cy} r={active ? 10 : 7} fill={m.color} stroke={WHITE} strokeWidth="2.5" />
                <circle cx={cx} cy={cy} r={active ? 15 : 11} fill="none" stroke={m.color} strokeWidth="1.5" opacity="0.5" />

                {/* Tooltip */}
                {active && (() => {
                  const tx = cx;
                  const ty = cy - 82;
                  return (
                    <g>
                      <rect x={tx - 88} y={ty} width="176" height="70" rx="10"
                        fill={NAVY} stroke={GOLD} strokeWidth="1.2" opacity="0.98" />
                      <polygon points={`${tx},${cy - 16} ${tx - 9},${cy - 22} ${tx + 9},${cy - 22}`} fill={NAVY} />
                      <text x={tx} y={ty + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill={GOLD} fontFamily="Syne,sans-serif">
                        {m.region}
                      </text>
                      <text x={tx} y={ty + 38} textAnchor="middle" fontSize="10" fontWeight="600" fill={WHITE}>
                        {m.focus}
                      </text>
                      <line x1={tx - 60} y1={ty + 48} x2={tx + 60} y2={ty + 48} stroke={`${GOLD}44`} strokeWidth="0.8" />
                      <text x={tx} y={ty + 61} textAnchor="middle" fontSize="8.5" fill="rgba(255,255,255,0.6)">
                        High Growth Market
                      </text>
                    </g>
                  );
                })()}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend grid */}
      <div
        className="pe-map-legend"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginTop: '22px' }}
      >
        {markets.map((m, i) => (
          <div
            key={m.region}
            onMouseEnter={() => setActivePin(i)}
            onMouseLeave={() => setActivePin(null)}
            style={{
              display: 'flex', gap: '12px', alignItems: 'flex-start',
              padding: '14px 16px', borderRadius: '14px', cursor: 'default',
              background: activePin === i ? `${m.color}12` : WHITE,
              border: `1px solid ${activePin === i ? m.color : '#E5E7EB'}`,
              transition: 'all 0.3s',
              boxShadow: activePin === i ? `0 8px 24px ${m.color}22` : '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{
              width: '12px', height: '12px', borderRadius: '50%',
              background: m.color, flexShrink: 0, marginTop: '2px',
              boxShadow: `0 0 8px ${m.color}66`,
            }} />
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: TEXT, margin: '0 0 3px' }}>{m.region}</p>
              <p style={{ fontSize: '11px', fontWeight: 600, color: m.color, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {m.focus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Beyond Card ──────────────────────────────────────────────── */
function BeyondCard({ item }) {
  const [hov, setHov] = useState(false);
  const Icon = item.icon;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? NAVY : WHITE,
        border: `1px solid ${hov ? NAVY : '#E5E7EB'}`,
        borderRadius: '20px', padding: '24px 22px',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hov ? '0 16px 42px rgba(13,42,82,0.22)' : '0 4px 16px rgba(0,0,0,0.05)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        display: 'flex', gap: '16px', alignItems: 'flex-start',
      }}
    >
      <div style={{
        width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
        background: hov ? 'rgba(212,175,55,0.15)' : 'rgba(13,42,82,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.3s',
      }}>
        <Icon size={20} style={{ color: GOLD }} />
      </div>
      <div>
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: hov ? WHITE : TEXT, margin: '0 0 6px', lineHeight: 1.3, transition: 'color 0.3s' }}>
          {item.title}
        </h4>
        <p style={{ fontSize: '12.5px', color: hov ? 'rgba(255,255,255,0.7)' : MUTED, lineHeight: 1.65, margin: 0, textAlign: 'left', transition: 'color 0.3s' }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

/* ─── FAQ Item ─────────────────────────────────────────────────── */
function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1px solid ${open ? GOLD : '#E5E7EB'}`,
      borderRadius: '16px', overflow: 'hidden',
      transition: 'all 0.3s',
      boxShadow: open ? '0 8px 26px rgba(212,175,55,0.13)' : '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '16px',
          padding: '20px 24px', background: open ? 'rgba(13,42,82,0.03)' : WHITE,
          border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.3s',
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 700, color: TEXT, lineHeight: 1.4 }}>
          {item.q}
        </span>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
          background: open ? NAVY : 'rgba(13,42,82,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s',
        }}>
          <ChevronDown size={14} style={{
            color: open ? GOLD : NAVY,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease, color 0.3s ease',
          }} />
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{ padding: '0 24px 20px', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
          <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.78, margin: '16px 0 0', textAlign: 'left' }}>
            {item.a}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
════════════════════════════════════════════════════════════════ */
export default function ProductExpertisePage() {
  const { openModal } = useConsultationModal();
  const [selectedCat, setSelectedCat] = useState(null);
  const [heroRef,       heroVisible]       = useReveal();
  const [catRef,        catVisible]        = useReveal();
  const [journeyRef,    journeyVisible]    = useReveal();
  const [techRef,       techVisible]       = useReveal();
  const [whyMattersRef, whyMattersVisible] = useReveal();
  const [whyRef,        whyVisible]        = useReveal();
  const [mapRef,        mapVisible]        = useReveal();
  const [beyondRef,     beyondVisible]     = useReveal();
  const [faqRef,        faqVisible]        = useReveal();
  const [ctaRef,        ctaVisible]        = useReveal();

  return (
    <div style={{ background: WHITE, paddingTop: '80px', overflowX: 'hidden', fontFamily: 'Outfit, sans-serif' }}>

      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — HERO (SPLIT-SCREEN)
      ══════════════════════════════════════════════════════════ */}
      <section
        id="pe-hero"
        ref={heroRef}
        style={{
          position: 'relative', background: NAVY,
          minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/cosmetic-formulation-product-categories.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.16 }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${NAVY} 0%, rgba(13,42,82,0.92) 60%, rgba(13,42,82,0.75) 100%)`,
          }} />
        </div>

        {/* Floating ambient particles */}
        {[...Array(22)].map((_, i) => (
          <div key={`ap${i}`} style={{
            position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
            width: `${3 + (i % 4) * 3}px`, height: `${3 + (i % 4) * 3}px`,
            background: i % 3 === 0 ? GOLD : 'rgba(255,255,255,0.55)',
            opacity: 0.07 + (i % 6) * 0.03,
            left: `${(i * 4.7) % 96}%`, top: `${(i * 6.9) % 92}%`,
            animation: `pePulse ${3 + (i % 5) * 0.6}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.22}s`,
          }} />
        ))}

        {/* Content */}
        <div
          className="pe-hero-grid"
          style={{
            position: 'relative', zIndex: 2, width: '100%',
            maxWidth: '1300px', margin: '0 auto',
            padding: 'clamp(70px,8vw,100px) clamp(20px,4vw,64px) 80px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center',
          }}
        >
          {/* LEFT — Text */}
          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateX(0)' : 'translateX(-44px)',
            transition: 'all 0.95s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {/* Pill badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(212,175,55,0.14)', border: '1px solid rgba(212,175,55,0.35)',
              borderRadius: '50px', padding: '6px 18px', marginBottom: '30px',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: GOLD }} />
              <span style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                EGC Ekora Global Consulting
              </span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(34px,5.2vw,68px)',
              fontWeight: 800, color: WHITE, margin: '0 0 26px', lineHeight: 1.08,
            }}>
              Product Expertise<br />
              Across <span style={{ color: GOLD }}>Cosmetic</span><br />
              <span style={{ color: GOLD }}>Categories</span>
            </h1>

            {/* H2 - Tagline */}
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(18px,2.2vw,26px)',
              fontWeight: 700, color: GOLD, margin: '0 0 24px', lineHeight: 1.3,
            }}>
              Transforming Cosmetic Ideas Into Market-Ready Products
            </h2>

            {/* Full specification paragraphs */}
            <div style={{ maxWidth: '560px', marginBottom: '42px' }}>
              <p style={{
                fontSize: 'clamp(14px,1.5vw,16px)',
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.82, margin: '0 0 18px', textAlign: 'left',
              }}>
                Developing a successful cosmetic product requires more than selecting ingredients or creating a formulation. 
                Every category comes with unique scientific, manufacturing, regulatory, and commercial requirements that 
                influence product performance, consumer acceptance, and long-term market success.
              </p>
              <p style={{
                fontSize: 'clamp(14px,1.5vw,16px)',
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.82, margin: '0 0 18px', textAlign: 'left',
              }}>
                At <strong style={{ color: WHITE }}>EGC Ekora Global Consulting</strong>, we support businesses across 
                a wide range of cosmetic, personal care, wellness, and beauty categories. Our expertise extends from 
                product strategy and formulation development to testing, manufacturing readiness, regulatory support, 
                and commercialization planning.
              </p>
              
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '54px' }}>
              <button
                onClick={() => openModal('product_expertise_hero')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '9px',
                  padding: '17px 34px',
                  background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 100%)`,
                  color: NAVY, fontWeight: 800, fontSize: '14px',
                  border: 'none', cursor: 'pointer', borderRadius: '50px',
                  boxShadow: '0 10px 36px rgba(212,175,55,0.46)', letterSpacing: '0.3px',
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                Discuss Your Product Vision <ArrowRight size={16} />
              </button>
              <a href="#pe-categories" style={{
                display: 'inline-flex', alignItems: 'center', gap: '9px',
                padding: '17px 34px',
                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)',
                color: WHITE, fontWeight: 700, fontSize: '14px',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.24)', borderRadius: '50px',
              }}>
                Explore Product Categories <ChevronRight size={16} />
              </a>
            </div>

            {/* Stat pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['15+ Product Categories', 'End-to-End Support', 'Global Market Expertise', 'Innovation-Driven Solutions'].map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(212,175,55,0.2)', borderRadius: '50px',
                  padding: '8px 16px',
                }}>
                  <CheckCircle2 size={13} style={{ color: GOLD, flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Collage */}
          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateX(0)' : 'translateX(44px)',
            transition: 'all 0.95s cubic-bezier(0.4,0,0.2,1) 0.22s',
          }}>
            <HeroCollage />
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '28px', left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}>
          <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.28)', letterSpacing: '3px', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{
            width: '1px', height: '42px',
            background: `linear-gradient(to bottom, rgba(212,175,55,0.7), transparent)`,
            animation: 'peScrollLine 1.7s ease-in-out infinite',
          }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — CATEGORY MASONRY GRID
      ══════════════════════════════════════════════════════════ */}
      <section
        id="pe-categories"
        ref={catRef}
        style={{ padding: 'clamp(56px,6vw,88px) clamp(20px,4vw,60px)', background: GRAY }}
      >
        <div style={{ maxWidth: '1380px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center', marginBottom: '60px',
            opacity: catVisible ? 1 : 0,
            transform: catVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.7s ease',
          }}>
            <SectionBadge>Product Portfolio</SectionBadge>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(28px,4vw,54px)', fontWeight: 800, color: TEXT, margin: '0 0 18px',
            }}>
              Building Products Across Diverse{' '}
              <span style={{ color: NAVY }}>Beauty & Personal Care</span> Segments
            </h2>
            <p style={{ fontSize: '17px', color: MUTED, maxWidth: '680px', margin: '0 auto 24px', lineHeight: 1.72, textAlign: 'left' }}>
              Every cosmetic category serves a different consumer need and requires a unique development approach. 
              Our expertise spans multiple product segments, allowing brands to build complete product portfolios 
              while maintaining quality, performance, and market relevance.
            </p>
            <p style={{ fontSize: '17px', color: MUTED, maxWidth: '680px', margin: '0 auto', lineHeight: 1.72, textAlign: 'left' }}>
              From concept development to commercialization — we support brands across all diverse cosmetic segments.
            </p>
          </div>

          <div
            className="pe-masonry"
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
              gridAutoRows: '220px', gap: '18px', gridAutoFlow: 'dense',
              opacity: catVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.22s',
            }}
          >
            {CATEGORIES.map(cat => (
              <CategoryCard key={cat.key} cat={cat} onClick={setSelectedCat} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <button
              onClick={() => openModal('product_expertise_opportunities')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '17px 42px',
                background: `linear-gradient(135deg, ${NAVY} 0%, #0A1F40 100%)`,
                color: WHITE, fontWeight: 700, fontSize: '14px',
                border: 'none', cursor: 'pointer', borderRadius: '50px',
                boxShadow: '0 8px 30px rgba(13,42,82,0.3)', letterSpacing: '0.3px',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Explore Opportunities For Your Category <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — DEVELOPMENT JOURNEY
      ══════════════════════════════════════════════════════════ */}
      <section
        id="pe-journey"
        ref={journeyRef}
        style={{ padding: 'clamp(56px,6vw,88px) clamp(20px,4vw,60px)', background: WHITE }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center', marginBottom: '72px',
            opacity: journeyVisible ? 1 : 0,
            transform: journeyVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.7s ease',
          }}>
            <SectionBadge>Development Journey</SectionBadge>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: TEXT, margin: '0 0 18px',
            }}>
              From Concept To{' '}
              <span style={{ color: NAVY }}>Commercial Success</span>
            </h2>
            <p style={{ fontSize: '17px', color: MUTED, maxWidth: '560px', margin: '0 auto', lineHeight: 1.72 }}>
              A structured model aligning scientific innovation, manufacturing feasibility, and market opportunity.
            </p>
          </div>

          <div
            className="pe-journey-flex"
            style={{
              display: 'flex', gap: '0', position: 'relative',
              opacity: journeyVisible ? 1 : 0, transition: 'opacity 0.9s ease 0.22s',
            }}
          >
            {JOURNEY_STEPS.map((step, i) => (
              <JourneyStep key={step.num} step={step} index={i} total={JOURNEY_STEPS.length} />
            ))}
          </div>

          {/* Banner CTA */}
          <div style={{
            marginTop: '68px',
            padding: 'clamp(24px,3vw,40px) clamp(24px,4vw,52px)',
            background: `linear-gradient(135deg, ${NAVY} 0%, #0A1F40 100%)`,
            borderRadius: '22px', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between',
            gap: '24px', flexWrap: 'wrap',
          }}>
            <div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(16px,2vw,24px)', fontWeight: 700, color: WHITE, margin: '0 0 8px' }}>
                Ready to start your product development journey?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '14px', margin: 0 }}>
                Our experts guide you from first brief to launch — reducing risk and accelerating time-to-market.
              </p>
            </div>
            <button
              onClick={() => openModal('product_expertise_journey')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '9px', flexShrink: 0,
                padding: '14px 30px',
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 100%)`,
                color: NAVY, fontWeight: 800, fontSize: '13px',
                border: 'none', cursor: 'pointer', borderRadius: '50px', whiteSpace: 'nowrap',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Start Your Project <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — TECHNOLOGY & INGREDIENTS
      ══════════════════════════════════════════════════════════ */}
      <section
        id="pe-tech"
        ref={techRef}
        style={{
          padding: 'clamp(56px,6vw,88px) clamp(20px,4vw,60px)',
          background: NAVY, position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '520px', height: '520px', borderRadius: '50%', background: 'rgba(212,175,55,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(212,175,55,0.04)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            textAlign: 'center', marginBottom: '64px',
            opacity: techVisible ? 1 : 0,
            transform: techVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.7s ease',
          }}>
            <SectionBadge>Innovation Platform</SectionBadge>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: WHITE, margin: '0 0 18px',
            }}>
              Advanced Technologies{' '}
              <span style={{ color: GOLD }}>Powering Innovation</span>
            </h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.72 }}>
              Modern cosmetic breakthroughs powered by advanced actives, biotechnology, and next-generation formulation science.
            </p>
          </div>

          <div
            className="pe-tech-grid"
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '18px',
              opacity: techVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.22s',
            }}
          >
            {TECH_ITEMS.map((item, i) => <TechCard key={i} item={item} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4.5 — WHY PRODUCT EXPERTISE MATTERS
      ══════════════════════════════════════════════════════════ */}
      <section
        id="pe-why-matters"
        ref={whyMattersRef}
        style={{
          padding: 'clamp(56px,6vw,88px) clamp(20px,4vw,60px)',
          background: WHITE,
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            opacity: whyMattersVisible ? 1 : 0,
            transform: whyMattersVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.7s ease',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <SectionBadge>Understanding Complexity</SectionBadge>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: TEXT, margin: 0,
              }}>
                Why Product Expertise{' '}
                <span style={{ color: NAVY }}>Matters In Cosmetic</span> Development
              </h2>
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${CREAM} 0%, #F5F2EF 100%)`,
              border: `1px solid rgba(13,42,82,0.08)`,
              borderRadius: '24px',
              padding: 'clamp(32px,4vw,48px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
            }}>
              <p style={{ fontSize: '17px', color: TEXT, lineHeight: 1.82, margin: '0 0 24px', textAlign: 'left', fontWeight: 500 }}>
                Not all cosmetic categories are developed the same way. Every product segment comes with unique 
                formulation challenges, ingredient requirements, manufacturing considerations, and regulatory expectations.
              </p>

              <div style={{
                display: 'grid',
                gap: '16px',
                marginBottom: '24px',
              }}>
                {[
                  {
                    product: 'Skincare Serum',
                    requirement: 'active ingredient stability and delivery optimization',
                    icon: Droplets,
                  },
                  {
                    product: 'Sunscreen',
                    requirement: 'formulation precision, UV filter compatibility, and regulatory compliance',
                    icon: ShieldCheck,
                  },
                  {
                    product: 'Fragrance',
                    requirement: 'scent stability, ingredient balancing, and consumer preference alignment',
                    icon: Sparkles,
                  },
                  {
                    product: 'Cosmeceutical Product',
                    requirement: 'advanced active ingredient integration, efficacy considerations, and enhanced quality controls',
                    icon: Microscope,
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                      padding: '20px 22px',
                      background: WHITE,
                      border: '1px solid rgba(13,42,82,0.08)',
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${NAVY} 0%, #0A1F40 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Icon size={18} style={{ color: GOLD }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 700, color: NAVY, margin: '0 0 6px', lineHeight: 1.3 }}>
                          {item.product}
                        </h4>
                        <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.65, margin: 0, textAlign: 'left' }}>
                          Requires <strong style={{ color: TEXT }}>{item.requirement}</strong>.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{
                background: `linear-gradient(135deg, ${NAVY} 0%, #0A1F40 100%)`,
                borderRadius: '16px',
                padding: '28px 32px',
                border: `2px solid ${GOLD}22`,
                boxShadow: `0 8px 32px rgba(212,175,55,0.15)`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <Target size={22} style={{ color: GOLD, flexShrink: 0 }} />
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: WHITE, margin: 0 }}>
                    Strategic Development Approach
                  </h4>
                </div>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.78, margin: 0, textAlign: 'left' }}>
                  Understanding these differences early in the development process helps businesses avoid costly 
                  delays, improve product performance, and achieve stronger commercial outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — WHY EGC
      ══════════════════════════════════════════════════════════ */}
      <section
        id="pe-why"
        ref={whyRef}
        style={{
          padding: 'clamp(56px,6vw,88px) clamp(20px,4vw,60px)',
          background: `linear-gradient(135deg, ${CREAM} 0%, #F0EDE8 100%)`,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center', marginBottom: '60px',
            opacity: whyVisible ? 1 : 0,
            transform: whyVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.7s ease',
          }}>
            <SectionBadge>Why EGC</SectionBadge>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: TEXT, margin: '0 0 18px',
            }}>
              Why Leading Brands{' '}
              <span style={{ color: NAVY }}>Choose EGC</span>
            </h2>
            <p style={{ fontSize: '17px', color: MUTED, maxWidth: '540px', margin: '0 auto', lineHeight: 1.72 }}>
              Scientific excellence meets commercial strategy — delivering complete product expertise from concept to market.
            </p>
          </div>

          <div
            className="pe-why-grid"
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px',
              opacity: whyVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.22s',
            }}
          >
            {WHY_EGC.map((item, i) => <WhyCard key={i} item={item} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 6 — GLOBAL MARKET MAP
      ══════════════════════════════════════════════════════════ */}
      <section
        id="pe-global"
        ref={mapRef}
        style={{ padding: 'clamp(56px,6vw,88px) clamp(20px,4vw,60px)', background: WHITE }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center', marginBottom: '56px',
            opacity: mapVisible ? 1 : 0,
            transform: mapVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.7s ease',
          }}>
            <SectionBadge>Global Reach</SectionBadge>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: TEXT, margin: '0 0 18px',
            }}>
              Understanding{' '}
              <span style={{ color: NAVY }}>Global Beauty Opportunities</span>
            </h2>
            <p style={{ fontSize: '17px', color: MUTED, maxWidth: '560px', margin: '0 auto', lineHeight: 1.72 }}>
              Regional consumer preferences shape product opportunities. We align your formulation strategy with global market demand.
            </p>
          </div>
          <div style={{ opacity: mapVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.22s' }}>
            <WorldMap markets={GLOBAL_MARKETS} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 7 — BEYOND FORMULATION
      ══════════════════════════════════════════════════════════ */}
      <section
        id="pe-beyond"
        ref={beyondRef}
        style={{ padding: 'clamp(56px,6vw,88px) clamp(20px,4vw,60px)', background: GRAY }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center', marginBottom: '60px',
            opacity: beyondVisible ? 1 : 0,
            transform: beyondVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.7s ease',
          }}>
            <SectionBadge>Full-Spectrum Support</SectionBadge>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(26px,4vw,52px)', fontWeight: 800, color: TEXT, margin: '0 0 18px',
            }}>
              Beyond{' '}
              <span style={{ color: NAVY }}>Formulation Development</span>
            </h2>
            <p style={{ fontSize: '17px', color: MUTED, maxWidth: '580px', margin: '0 auto', lineHeight: 1.72 }}>
              Long-term success depends on multiple interconnected factors — we support every stage from strategy to market launch.
            </p>
          </div>

          <div
            className="pe-beyond-grid"
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px',
              opacity: beyondVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.22s',
            }}
          >
            {BEYOND_ITEMS.map((item, i) => <BeyondCard key={i} item={item} />)}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button
              onClick={() => openModal('product_expertise_beyond_goals')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '9px',
                padding: '17px 40px',
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 100%)`,
                color: NAVY, fontWeight: 800, fontSize: '14px',
                border: 'none', cursor: 'pointer', borderRadius: '50px',
                boxShadow: '0 8px 28px rgba(212,175,55,0.4)', letterSpacing: '0.3px',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Discuss Your Product Development Goals <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 8 — FAQ
      ══════════════════════════════════════════════════════════ */}
      <section
        id="pe-faq"
        ref={faqRef}
        style={{ padding: 'clamp(56px,6vw,88px) clamp(20px,4vw,60px)', background: WHITE }}
      >
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center', marginBottom: '52px',
            opacity: faqVisible ? 1 : 0,
            transform: faqVisible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'all 0.7s ease',
          }}>
            <SectionBadge>FAQ</SectionBadge>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(24px,3.5vw,46px)', fontWeight: 800, color: TEXT, margin: '0 0 18px',
            }}>
              Questions About{' '}
              <span style={{ color: NAVY }}>Cosmetic Product Development</span>
            </h2>
            <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.72 }}>
              Answers to common questions about working with EGC across categories, services, and markets.
            </p>
          </div>

          <div style={{
            display: 'flex', flexDirection: 'column', gap: '12px',
            opacity: faqVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.22s',
          }}>
            {FAQ_ITEMS.map((item, i) => <FaqItem key={i} item={item} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 9 — FINAL CTA
      ══════════════════════════════════════════════════════════ */}
      <section
        id="pe-cta"
        ref={ctaRef}
        style={{ position: 'relative', overflow: 'hidden', minHeight: '580px', display: 'flex', alignItems: 'center' }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src="/cosmetic-formulation-product-categories.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,42,82,0.96) 0%, rgba(13,42,82,0.88) 55%, rgba(10,30,60,0.93) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 65% 50%, rgba(212,175,55,0.14) 0%, transparent 65%)' }} />
        </div>

        <div style={{
          position: 'relative', zIndex: 2, maxWidth: '960px', margin: '0 auto',
          padding: 'clamp(60px,8vw,90px) clamp(20px,4vw,60px)', textAlign: 'center',
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.85s ease',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.32)',
            borderRadius: '50px', padding: '7px 20px', marginBottom: '32px',
          }}>
            <Star size={12} style={{ color: GOLD }} />
            <span style={{ fontSize: '10px', fontWeight: 800, color: GOLD, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              Start Your Cosmetic Innovation
            </span>
          </div>

          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(30px,5vw,64px)', fontWeight: 800, color: WHITE, margin: '0 0 22px', lineHeight: 1.13,
          }}>
            Ready To Develop Your Next<br />
            <span style={{ color: GOLD }}>Cosmetic Product?</span>
          </h2>

          <p style={{
            fontSize: 'clamp(14px,1.7vw,18px)', color: 'rgba(255,255,255,0.7)',
            maxWidth: '620px', margin: '0 auto 50px', lineHeight: 1.82,
          }}>
            Whether you are launching a new beauty brand, expanding an existing product portfolio, entering a new category, or preparing products for global markets, EGC Ekora Global Consulting provides the expertise needed to transform ideas into commercially successful cosmetic products.

          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '44px' }}>
            <button
              onClick={() => openModal('product_expertise_goals')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '9px',
                padding: '18px 40px',
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD2} 100%)`,
                color: NAVY, fontWeight: 800, fontSize: '15px',
                border: 'none', cursor: 'pointer', borderRadius: '50px',
                boxShadow: '0 12px 42px rgba(212,175,55,0.52)', letterSpacing: '0.3px',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Discuss Your Product Development Goals <ArrowRight size={17} />
            </button>
           
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Scientific Excellence', 'Commercial Expertise', 'Global Market Focus'].map(t => (
              <div key={t} style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50px', padding: '8px 18px',
              }}>
                <CheckCircle2 size={13} style={{ color: GOLD }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.86)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Modal ── */}
      {selectedCat && <CategoryModal cat={selectedCat} onClose={() => setSelectedCat(null)} />}

      {/* ── Keyframe Animations & Responsive CSS ── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pePulse {
          0%   { transform: scale(1); }
          100% { transform: scale(1.85); }
        }
        @keyframes peFloat {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(-18px); }
        }
        @keyframes peScrollLine {
          0%   { transform-origin: top;    transform: scaleY(0); opacity: 0; }
          50%  { transform-origin: top;    transform: scaleY(1); opacity: 1; }
          100% { transform-origin: bottom; transform: scaleY(0); opacity: 0; }
        }
        @keyframes peModalIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes peJourneyPulse {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .pe-journey-connector {
          background: linear-gradient(90deg, rgba(181,137,59,0.15) 0%, #B5893B 50%, rgba(181,137,59,0.15) 100%);
          background-size: 200% 100%;
          animation: peJourneyPulse 3s linear infinite;
        }

        /* ─ Hero grid ─ */
        @media (max-width: 900px) {
          .pe-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .pe-hero-grid > div:last-child {
            display: none !important;
          }
        }

        /* ─ Masonry grid ─ */
        @media (max-width: 1100px) {
          .pe-masonry { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 760px) {
          .pe-masonry { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .pe-masonry { grid-template-columns: 1fr !important; }
          .pe-masonry > div { grid-row: span 1 !important; min-height: 220px !important; }
        }

        /* ─ Journey ─ */
        @media (max-width: 860px) {
          .pe-journey-flex { flex-direction: column !important; gap: 32px !important; }
          .pe-journey-step { flex-direction: row !important; text-align: left !important; align-items: center !important; gap: 24px !important; }
          .pe-journey-step > div { min-width: unset !important; }
          .pe-journey-connector { display: none !important; }
          .pe-journey-text { align-items: flex-start !important; text-align: left !important; }
          .pe-journey-title { margin: 0 0 6px 0 !important; }
          .pe-journey-desc { text-align: left !important; max-width: none !important; }
        }

        /* ─ Tech grid ─ */
        @media (max-width: 1024px) {
          .pe-tech-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 540px) {
          .pe-tech-grid { grid-template-columns: 1fr !important; }
        }

        /* ─ Why grid ─ */
        @media (max-width: 900px) {
          .pe-why-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 520px) {
          .pe-why-grid { grid-template-columns: 1fr !important; }
        }

        /* ─ Map legend ─ */
        @media (max-width: 760px) {
          .pe-map-legend { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .pe-map-legend { grid-template-columns: 1fr !important; }
        }

        /* ─ Beyond grid ─ */
        @media (max-width: 860px) {
          .pe-beyond-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 540px) {
          .pe-beyond-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </div>
  );
}
