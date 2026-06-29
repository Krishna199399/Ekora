'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useConsultationModal } from '../context/ConsultationModalContext';
import ContactForm from '../components/ContactForm';
import {
  ArrowRight, Check, ChevronDown, Sparkles,
  Phone, CheckCircle2,
  Microscope, Leaf, Cpu, ShieldCheck, Beaker,
  Atom, Dna, FlaskConical, Droplets, Layers,
  Recycle, PackageOpen, Zap, RotateCcw, TreePine,
  Heart, Apple, Sun, Brain,
  Eye, Scale, ShieldAlert, ClipboardCheck,
  BarChart3, TrendingUp, Monitor, Factory,
  Globe, MapPin,
  Lightbulb, ThermometerSun, BadgeCheck, Boxes, Settings, Rocket,
  AlertTriangle, Target, Clock, Wrench, Search, PackageX, XCircle,
  FlaskRound, TestTubes, BadgeCheckIcon, ArrowUpRight, Truck
} from 'lucide-react';

/* ─── Brand Tokens (exact match with ServicesPage) ───── */
const DEEP   = '#0D2A52';
const GOLD   = '#B5893B';
const GOLD_L = '#D4AF37';
const CREAM  = '#FAF9F7';
const WHITE  = '#FFFFFF';
const MUTED  = '#5c526b';

import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger if in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Innovation Sandbox Cards ─────────────────────────── */
const SANDBOX_CARDS = [
  { icon: Atom,          title: 'Ingredient Technologies',        desc: 'Explore advanced actives, biotech ingredients, peptides, and delivery systems that define next-generation product performance.' },
  { icon: FlaskConical,  title: 'Formulation Optimization',       desc: 'Balance efficacy, stability, sensory experience, and cost through intelligent formulation strategies.' },
  { icon: ShieldCheck,   title: 'Stability Considerations',       desc: 'Evaluate environmental resilience, shelf-life validation, and packaging compatibility for reliable products.' },
  { icon: Rocket,        title: 'Commercial Readiness',           desc: 'Assess scalability, regulatory alignment, manufacturing feasibility, and market positioning for launch success.' },
];

/* ─── Why Innovation Matters ───────────────────────────── */
const WHY_CARDS = [
  { icon: Target,       title: 'Consumer Expectations',      desc: 'Consumers increasingly prioritize efficacy, safety, transparency, and sustainability, demanding scientifically validated products that deliver real results.' },
  { icon: Sparkles,     title: 'Competitive Differentiation', desc: 'Innovation creates unique market opportunities, enabling brands to stand out through ingredient breakthroughs, novel formats, and differentiated claims.' },
  { icon: Zap,          title: 'Faster Development',          desc: 'Advanced technologies like AI driven formulation and high throughput testing dramatically improve development efficiency and reduce time to market.' },
  { icon: ShieldAlert,  title: 'Risk Reduction',              desc: 'Validated innovation processes improve commercialization success by identifying stability, regulatory, and scalability risks before significant investment.' },
];

/* ─── Evolution Steps ──────────────────────────────────── */
const EVOLUTION_STEPS = [
  { num: '01', title: 'Traditional Development',    desc: 'Trial-and-error experimentation with manual formulation processes and limited predictive capabilities.' },
  { num: '02', title: 'Ingredient Science',          desc: 'Advanced ingredient analysis, performance validation, and systematic sourcing strategies.' },
  { num: '03', title: 'Biotechnology Integration',   desc: 'Fermentation technologies, bio-engineered compounds, and laboratory-cultivated actives.' },
  { num: '04', title: 'AI Driven Formulation',       desc: 'Machine learning predictions for ingredient synergies, stability, and performance optimization.' },
  { num: '05', title: 'Predictive Innovation',        desc: 'Consumer trend intelligence, market opportunity identification, and data-driven development decisions.' },
  { num: '06', title: 'Commercial Excellence',        desc: 'End to end innovation lifecycle management from research through scalable commercialization.' },
];

/* ─── Innovation Hub Categories ────────────────────────── */
const INNOVATION_CATEGORIES = [
  { id: 'ingredients',   title: 'Advanced Ingredient Research',     icon: Microscope,   color: '#7b5cb7', short: 'Ingredients' },
  { id: 'sustainable',   title: 'Sustainable Cosmetic Innovation',  icon: Leaf,         color: '#5a8a6b', short: 'Sustainable' },
  { id: 'functional',    title: 'Functional Beauty Research',       icon: Heart,        color: '#c06b8a', short: 'Functional' },
  { id: 'clean',         title: 'Clean Beauty Technology',          icon: Eye,          color: '#4a90a4', short: 'Clean Beauty' },
  { id: 'ai',            title: 'AI Driven Innovation',             icon: Cpu,          color: '#b5893b', short: 'AI Innovation' },
];

const INNOVATION_DATA = [
  // Advanced Ingredient Research
  {
    category: 'ingredients', num: '01',
    title: 'Biotechnology Driven Ingredients',
    tag: 'Biotech Innovation',
    desc: 'Biotechnology is transforming the way cosmetic ingredients are developed and produced. Manufacturers are increasingly utilizing fermentation technologies, bio-engineered compounds, and laboratory-cultivated actives to create highly consistent ingredients with reduced environmental impact.',
    bullets: [
      'Improved ingredient consistency and batch-to-batch uniformity',
      'Enhanced purity levels through controlled biological processes',
      'Reduced supply chain volatility with laboratory based production',
      'Greater sustainability through reduced agricultural dependence',
      'Increased scalability for premium skincare and anti-aging categories',
      'Applications across barrier repair, functional beauty, and performance actives',
    ]
  },
  {
    category: 'ingredients', num: '02',
    title: 'Exosomes & Cellular Communication Technologies',
    tag: 'Advanced Research',
    desc: 'Exosomes function as biological messengers that facilitate cellular communication. Their potential applications in skin regeneration, repair, and advanced anti-aging solutions have attracted significant attention from both cosmetic and aesthetic medicine sectors.',
    bullets: [
      'Plant-derived exosomes compatible with cosmetic regulatory frameworks',
      'Potential applications in regenerative beauty and advanced treatments',
      'Growing consumer acceptance for science-backed skincare innovations',
      'High potential innovation segment for performance driven products',
      'Bridge between cosmetic science and aesthetic medicine approaches',
      'Next-generation carrier systems for targeted ingredient delivery',
    ]
  },
  {
    category: 'ingredients', num: '03',
    title: 'Peptides & Performance Actives',
    tag: 'Performance Science',
    desc: 'Peptides continue to represent one of the fastest-growing ingredient categories within cosmetic research. Unlike traditional actives, peptides can target specific biological pathways, allowing formulators to design products with highly focused performance objectives.',
    bullets: [
      'Anti-aging and firming treatment formulations',
      'Skin repair and barrier support solutions',
      'Hair growth and scalp health applications',
      'Clinically inspired beauty product development',
      'Targeted biological pathway activation strategies',
      'Growing global consumer demand for evidence-based actives',
    ]
  },
  {
    category: 'ingredients', num: '04',
    title: 'Microbiome & Skin Barrier Research',
    tag: 'Skin Science',
    desc: 'Modern cosmetic science increasingly recognizes the importance of maintaining a healthy skin barrier and balanced microbiome. Products designed around long-term skin health rather than short-term effects are becoming increasingly attractive.',
    bullets: [
      'Microbiome-friendly formulation development approaches',
      'Barrier repair and skin resilience systems',
      'Probiotic and prebiotic-inspired ingredient technologies',
      'Environmental stress protection solutions',
      'Long-term skin health optimization strategies',
      'Sensitive skin compatibility and tolerance testing',
    ]
  },
  {
    category: 'ingredients', num: '05',
    title: 'Advanced Delivery Systems & Encapsulation Technologies',
    tag: 'Delivery Innovation',
    desc: 'The effectiveness of a cosmetic ingredient often depends on how efficiently it reaches its intended target. Advanced delivery technologies help improve ingredient stability, enhance efficacy, reduce degradation, and support better consumer outcomes.',
    bullets: [
      'Liposomal delivery systems for enhanced penetration',
      'Encapsulation technologies for ingredient protection',
      'Controlled release systems for sustained performance',
      'Nano dispersion technologies for improved bioavailability',
      'Multi-phase ingredient delivery platforms',
      'Stability-enhancing carrier systems for sensitive actives',
    ]
  },

  // Sustainable Cosmetic Innovation
  {
    category: 'sustainable', num: '01',
    title: 'Waterless Beauty Technologies',
    tag: 'Sustainability',
    desc: 'One of the fastest-growing innovation categories involves reducing or eliminating water from cosmetic formulations. Waterless products offer significant sustainability, cost, and performance advantages across multiple product categories.',
    bullets: [
      'Lower transportation costs through reduced weight',
      'Reduced packaging requirements and material usage',
      'Improved ingredient concentration and efficacy',
      'Extended shelf life potential without preservative burden',
      'Reduced environmental impact across product lifecycle',
      'Concentrated cleansers, powder formulations, and solid formats',
    ]
  },
  {
    category: 'sustainable', num: '02',
    title: 'Upcycled Cosmetic Ingredients',
    tag: 'Circular Innovation',
    desc: 'Upcycling is transforming agricultural byproducts and industrial waste streams into valuable cosmetic ingredients. These ingredients support circular economy principles while creating compelling brand stories that resonate with modern consumers.',
    bullets: [
      'Coffee-derived antioxidants and botanical residues',
      'Fruit extract compounds from food processing byproducts',
      'Circular economy principles applied to ingredient sourcing',
      'Compelling sustainability narratives for brand positioning',
      'Cost-effective ingredient alternatives with proven efficacy',
      'Environmental responsibility integrated into product development',
    ]
  },
  {
    category: 'sustainable', num: '03',
    title: 'Sustainable Packaging Innovation',
    tag: 'Packaging Design',
    desc: 'Packaging innovation has become a critical component of cosmetic product development. Consumers, retailers, and regulators increasingly expect brands to reduce packaging waste while maintaining product integrity and premium experiences.',
    bullets: [
      'Refillable packaging systems for long-term consumer engagement',
      'Post Consumer Recycled (PCR) materials and formats',
      'Mono material packaging structures for recyclability',
      'Lightweight and reduced plastic packaging solutions',
      'Reusable packaging ecosystems and subscription models',
      'Packaging as competitive differentiator and brand experience',
    ]
  },
  {
    category: 'sustainable', num: '04',
    title: 'Low Energy Manufacturing Systems',
    tag: 'Manufacturing Innovation',
    desc: 'Manufacturing innovation is increasingly focused on reducing energy consumption, minimizing waste generation, and improving operational efficiency across cosmetic production environments.',
    bullets: [
      'Cold process emulsification technologies',
      'Energy-efficient production and processing systems',
      'Automated process monitoring and optimization',
      'Resource optimization and waste reduction technologies',
      'Reduced carbon footprint manufacturing operations',
      'Sustainability-integrated factory planning strategies',
    ]
  },
  {
    category: 'sustainable', num: '05',
    title: 'Circular Beauty Ecosystems',
    tag: 'Ecosystem Design',
    desc: 'The future of cosmetic manufacturing is moving toward circular business models where resources remain in productive use for longer periods. Businesses integrating circular principles gain stronger consumer trust and improved sustainability performance.',
    bullets: [
      'Sustainable ingredient sourcing and supply chain management',
      'Packaging recovery and material reclamation systems',
      'Manufacturing waste reduction and recycling programs',
      'Product lifecycle optimization and end-of-life planning',
      'Responsible supply chain management and supplier auditing',
      'Long-term sustainability performance tracking and reporting',
    ]
  },

  // Functional Beauty Research
  {
    category: 'functional', num: '01',
    title: 'Beauty Meets Wellness',
    tag: 'Wellness Integration',
    desc: 'Consumers increasingly view beauty as an extension of overall health and lifestyle. Modern product development is beginning to address concerns beyond traditional cosmetic benefits, creating entirely new categories.',
    bullets: [
      'Stress-related skin concern formulations',
      'Sleep quality and skin appearance optimization',
      'Environmental stress exposure protection',
      'Healthy aging and longevity-focused products',
      'Long-term skin resilience and wellbeing solutions',
      'Convergence of beauty, health, and lifestyle products',
    ]
  },
  {
    category: 'functional', num: '02',
    title: 'Nutricosmetics & Beauty Supplements',
    tag: 'Beauty Nutrition',
    desc: 'Nutricosmetics represent one of the fastest-growing innovation categories globally. These products focus on supporting beauty outcomes through nutritional and functional ingredients consumed internally.',
    bullets: [
      'Collagen supplement formulations and delivery systems',
      'Hair growth nutrition and scalp health products',
      'Skin health and beauty wellness supplement blends',
      'Functional nutrition with cosmetic performance claims',
      'Product diversification opportunities for beauty brands',
      'Growing consumer awareness driving market expansion',
    ]
  },
  {
    category: 'functional', num: '03',
    title: 'Longevity Beauty & Healthy Aging',
    tag: 'Aging Science',
    desc: 'Consumers are shifting away from traditional anti-aging claims toward healthy aging and skin longevity concepts. The focus is moving from correcting visible concerns to maintaining long-term skin health and cellular resilience.',
    bullets: [
      'Cellular resilience and regenerative beauty technologies',
      'Skin barrier optimization and preventive skincare',
      'Long-term wellness-focused formulation strategies',
      'Shift from corrective to protective product positioning',
      'Science-backed longevity claims and substantiation',
      'Premium positioning opportunities in aging-well categories',
    ]
  },
  {
    category: 'functional', num: '04',
    title: 'Neurocosmetics & Sensory Innovation',
    tag: 'Sensory Science',
    desc: 'Neurocosmetics explores the relationship between cosmetic products, sensory experiences, and emotional wellbeing. This emerging category creates opportunities for highly differentiated premium beauty experiences.',
    bullets: [
      'Mood-enhancing fragrance systems and aromatherapy integration',
      'Sensory skincare rituals and premium texture design',
      'Relaxation-focused beauty products and self-care formats',
      'Emotional wellbeing formulations backed by neuroscience',
      'Multi-sensory product experiences for brand differentiation',
      'Premium positioning through unique sensory narratives',
    ]
  },

  // Clean Beauty Technology
  {
    category: 'clean', num: '01',
    title: 'Ingredient Transparency',
    tag: 'Consumer Trust',
    desc: 'Consumers increasingly seek clear information regarding ingredient sourcing, functionality, and product composition. Brands communicating transparently benefit from stronger consumer trust and credibility.',
    bullets: [
      'Ingredient traceability and origin documentation',
      'Supplier accountability and ethical sourcing verification',
      'Source verification and sustainability disclosures',
      'Scientific substantiation for ingredient claims',
      'Consumer-facing ingredient education and communication',
      'Trust-building through transparency as competitive advantage',
    ]
  },
  {
    category: 'clean', num: '02',
    title: 'Regulatory First Innovation',
    tag: 'Compliance Strategy',
    desc: 'Innovation can no longer be separated from compliance. Integrating regulatory readiness early within the innovation process helps reduce delays, improve efficiency, and support faster commercialization.',
    bullets: [
      'Safety assessments integrated into development lifecycle',
      'Documentation planning from concept through commercialization',
      'Product testing aligned with global regulatory standards',
      'Regulatory validation before significant investment decisions',
      'Market-specific compliance strategies for global expansion',
      'Proactive compliance as accelerator rather than barrier',
    ]
  },
  {
    category: 'clean', num: '03',
    title: 'Sensitive Skin Formulation Science',
    tag: 'Gentle Formulation',
    desc: 'Sensitive skin products continue to experience strong global growth. Consumers seek products delivering performance while minimizing irritation and supporting long-term skin health.',
    bullets: [
      'Reduced irritancy formulation systems and protocols',
      'Barrier support technologies for compromised skin',
      'Minimalist formulations with focused ingredient selection',
      'Gentle preservation systems with safety validation',
      'Skin compatibility optimization and tolerance testing',
      'Dermatological guidance integration into development',
    ]
  },
  {
    category: 'clean', num: '04',
    title: 'Safety & Stability Validation',
    tag: 'Quality Assurance',
    desc: 'Innovation without validation creates risk. Product safety, stability, compatibility, and performance testing remain essential for successful commercialization and consumer trust.',
    bullets: [
      'Comprehensive safety assessment and toxicological review',
      'Stability testing under accelerated environmental conditions',
      'Packaging compatibility and migration evaluation',
      'Performance consistency throughout intended product lifecycle',
      'Documentation support for regulatory submission readiness',
      'Scientific validation as foundation for commercial confidence',
    ]
  },

  // AI-Driven Cosmetic Innovation
  {
    category: 'ai', num: '01',
    title: 'Predictive Formulation Development',
    tag: 'AI Formulation',
    desc: 'AI technologies can analyze ingredient interactions, formulation behaviors, and performance variables before physical testing begins, helping teams accelerate development and reduce costly iterations.',
    bullets: [
      'AI-driven ingredient interaction analysis and prediction',
      'Formulation behavior modeling and optimization',
      'Reduced development cycles through virtual prototyping',
      'Improved formulation efficiency and resource utilization',
      'Compatibility risk identification before lab testing',
      'Accelerated innovation programs with data-driven decisions',
    ]
  },
  {
    category: 'ai', num: '02',
    title: 'Consumer Trend Intelligence',
    tag: 'Market Intelligence',
    desc: 'Consumer behavior evolves rapidly across global markets. AI tools help businesses identify emerging opportunities and make more informed innovation investment decisions.',
    bullets: [
      'Emerging ingredient trend identification and tracking',
      'Product category growth analysis and forecasting',
      'Regional consumer preference mapping and insights',
      'Competitive landscape monitoring and opportunity analysis',
      'Market timing optimization for product launches',
      'Data-driven innovation portfolio prioritization',
    ]
  },
  {
    category: 'ai', num: '03',
    title: 'Digital Product Development',
    tag: 'Digital Innovation',
    desc: 'Digital development tools are transforming traditional research processes, helping reduce uncertainty and accelerate decision-making before significant investments are made.',
    bullets: [
      'Virtual formulation simulations and modeling',
      'Digital testing environments for performance prediction',
      'Product concept validation through data analysis',
      'Faster development workflows with automated optimization',
      'Reduced physical prototyping requirements',
      'Cost-effective early-stage innovation evaluation',
    ]
  },
  {
    category: 'ai', num: '04',
    title: 'Smart Manufacturing Integration',
    tag: 'Industry 4.0',
    desc: 'The next generation of cosmetic manufacturing facilities will increasingly incorporate intelligent systems that support greater consistency, efficiency, and scalability across production operations.',
    bullets: [
      'Automated quality monitoring and real-time defect detection',
      'Real-time production analytics and performance dashboards',
      'IoT-enabled manufacturing systems and sensor networks',
      'Predictive maintenance to minimize equipment downtime',
      'Intelligent process controls and adaptive manufacturing',
      'Data-driven production optimization and capacity planning',
    ]
  },
];

/* ─── Global Innovation Opportunities ──────────────────── */
const GLOBAL_OPPORTUNITIES = [
  { region: 'India',          flag: '🇮🇳', trends: 'Ayurveda-inspired, scalp health, men\'s grooming, herbal cosmetics', opportunity: 'Bridging traditional botanical knowledge with modern clinical validation and international commercialization requirements.' },
  { region: 'Middle East',    flag: '🇦🇪', trends: 'Luxury skincare, prestige fragrances, premium personal care', opportunity: 'Heat-stable formulations, premium sensory experiences, and innovative Halal-compliant product development.' },
  { region: 'Southeast Asia', flag: '🇸🇬', trends: 'Climate-adaptive, lightweight skincare, hybrid beauty', opportunity: 'Products designed for humid environments: sunscreens, brightening solutions, and multifunctional formats.' },
  { region: 'Europe',         flag: '🇪🇺', trends: 'Sustainability, biotechnology, clean beauty, transparency', opportunity: 'Refillable packaging systems, ingredient transparency, and environmentally responsible manufacturing.' },
  { region: 'North America',  flag: '🇺🇸', trends: 'Clinical skincare, dermocosmetics, longevity beauty', opportunity: 'Evidence-based performance, measurable outcomes, and science-driven product positioning.' },
  { region: 'Africa',         flag: '🌍', trends: 'Haircare, moisturizing, sun protection, affordable premium', opportunity: 'Localized innovation, regionally adapted formulations, and manufacturing expansion opportunities.' },
];

/* ─── Emerging Opportunities ───────────────────────────── */
const EMERGING_OPPS = [
  { icon: Lightbulb,       title: 'Science-Backed Ayurveda',           desc: 'Combining traditional botanical systems with modern extraction technologies and scientific validation for global markets.' },
  { icon: ThermometerSun,  title: 'Climate Adaptive Formulations',     desc: 'Designing products specifically for regional environmental conditions and consumer lifestyles.' },
  { icon: BadgeCheck,      title: 'Compliance As Competitive Advantage', desc: 'Integrating regulatory readiness directly into product development rather than treating it as a post-development requirement.' },
  { icon: Boxes,           title: 'Micro Batch Manufacturing',          desc: 'Helping emerging brands validate concepts and enter markets with lower production commitments.' },
  { icon: Settings,        title: 'Smart Factory Ecosystems',           desc: 'Integrating automation, data analytics, and intelligent manufacturing systems into production environments.' },
  { icon: Rocket,          title: 'Scale Up Readiness',                  desc: 'Supporting businesses as they transition from laboratory success to commercial manufacturing reality.' },
];

/* ─── Innovation Failures ──────────────────────────────── */
const FAILURE_REASONS = [
  { icon: Search,     title: 'Poor Market Validation',            desc: 'Products developed without understanding consumer needs, competitive positioning, or market timing often fail to gain traction despite technical quality.' },
  { icon: AlertTriangle, title: 'Stability Failures',             desc: 'Formulations that pass initial testing but fail under real-world storage, transportation, and usage conditions create costly recalls and brand damage.' },
  { icon: Clock,      title: 'Regulatory Delays',                 desc: 'Products entering development without regulatory planning face extended timelines, reformulation requirements, and market entry complications.' },
  { icon: Factory,    title: 'Manufacturing Limitations',          desc: 'Laboratory formulations that cannot be reproduced at commercial scale result in quality inconsistencies and production inefficiencies.' },
  { icon: PackageX,   title: 'Ingredient Sourcing Challenges',    desc: 'Dependency on single-source ingredients or volatile supply chains creates production risks and cost unpredictability.' },
  { icon: TrendingUp, title: 'Scalability Issues',                 desc: 'Products successful in small batches that cannot maintain consistency, cost efficiency, or quality at higher volumes.' },
  { icon: XCircle,    title: 'Weak Commercialization Strategies',  desc: 'Technically excellent products that lack clear market positioning, distribution strategy, or brand narrative fail to achieve commercial potential.' },
];

/* ─── Commercialization Steps ──────────────────────────── */
const COMMERCIALIZATION_STEPS = [
  { icon: Microscope,  num: '01', title: 'Research',          desc: 'Market opportunity analysis, ingredient evaluation, consumer trend intelligence, and innovation feasibility assessment.' },
  { icon: FlaskConical, num: '02', title: 'Formulation',      desc: 'Product development, prototype creation, ingredient optimization, and sensory evaluation for target consumer needs.' },
  { icon: ShieldCheck, num: '03', title: 'Validation',        desc: 'Stability testing, safety assessment, regulatory compliance verification, and performance substantiation.' },
  { icon: Factory,     num: '04', title: 'Scale-Up',          desc: 'Pilot batch production, process optimization, manufacturing readiness, and quality system validation.' },
  { icon: Rocket,      num: '05', title: 'Commercial Launch', desc: 'Market entry strategy, distribution planning, brand positioning, and ongoing growth support.' },
];

/* ─── FAQ ──────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is cosmetic R&D innovation?', a: 'Cosmetic R&D innovation involves researching, developing, validating, and commercializing new products, ingredients, technologies, and manufacturing processes that improve product performance, consumer value, and business growth potential.' },
  { q: 'Why is research and development important in cosmetic manufacturing?', a: 'Research and development helps ensure cosmetic products are safe, stable, effective, compliant, and commercially viable before entering the market, reducing technical risks and improving long-term product success.' },
  { q: 'What are the latest cosmetic innovation trends?', a: 'Current trends include biotechnology ingredients, exosomes, functional beauty, microbiome research, sustainability, clean beauty technologies, predictive formulation systems, and AI-supported product development.' },
  { q: 'How does AI support cosmetic product development?', a: 'AI helps analyze formulation variables, identify ingredient opportunities, predict product performance, monitor market trends, and accelerate decision-making throughout the product development lifecycle.' },
  { q: 'What opportunities exist in sustainable cosmetic innovation?', a: 'Opportunities include waterless beauty products, upcycled ingredients, sustainable packaging, circular manufacturing systems, energy-efficient production methods, and environmentally responsible supply chains.' },
  { q: 'How can EGC support innovation and commercialization?', a: 'EGC supports businesses through product innovation strategy, formulation development, testing, manufacturing readiness, compliance planning, commercialization support, and long-term growth initiatives.' },
];

/* ═══════════════════════════════════════════════════════════
    MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function RDInnovationPage() {
  const { openModal } = useConsultationModal();
  const [activeCategory, setActiveCategory] = useState('ingredients');
  const [openFaq, setOpenFaq]               = useState(null);
  const [openFailure, setOpenFailure]       = useState(null);
  const [activeStep, setActiveStep]         = useState(0);
  const [hoveredStep, setHoveredStep]       = useState(null);
  const [activeEvo, setActiveEvo]           = useState(0);
  const [hoveredEvo, setHoveredEvo]         = useState(null);
  const [isPaused, setIsPaused]             = useState(false);
  const capSectionRef = useRef(null);

  const evoLineRef = useRef(null);
  const commTrackRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  // Handle user interaction with step timelines: pause auto-play and resume after 8-10 seconds of inactivity
  const handleInteraction = (stepIndex) => {
    if (stepIndex !== null) {
      setHoveredStep(stepIndex);
      setActiveStep(stepIndex);
    }
    
    setIsPaused(true);
    
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    // Resume auto-play after 9 seconds of inactivity
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 9000);
  };

  const handleInteractionLeave = () => {
    setHoveredStep(null);
  };

  const handleEvoInteraction = (stepIndex) => {
    if (stepIndex !== null) {
      setHoveredEvo(stepIndex);
      setActiveEvo(stepIndex);
    }
    
    setIsPaused(true);
    
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    // Resume auto-play after 9 seconds of inactivity
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 9000);
  };

  const handleEvoInteractionLeave = () => {
    setHoveredEvo(null);
  };

  // GSAP ScrollTrigger path drawing
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      if (evoLineRef.current) gsap.set(evoLineRef.current, { strokeDashoffset: 0 });
      if (commTrackRef.current) gsap.set(commTrackRef.current, { strokeDashoffset: 0 });
      return;
    }

    if (evoLineRef.current) {
      gsap.fromTo(evoLineRef.current,
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: evoLineRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: true
          }
        }
      );
    }

    if (commTrackRef.current) {
      gsap.fromTo(commTrackRef.current,
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: commTrackRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: true
          }
        }
      );
    }
  }, []);

  // Auto-play timeline interval effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
      setActiveEvo((prev) => (prev + 1) % 6);
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
  const activeEvoIndex = hoveredEvo !== null ? hoveredEvo : activeEvo;

  const scrollToContact = () => {
    openModal('rd_innovation');
  };

  const handleTabSwitch = (catId) => {
    setActiveCategory(catId);
    if (capSectionRef.current) {
      const top = capSectionRef.current.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const activeCaps = INNOVATION_DATA.filter(c => c.category === activeCategory);
  const activeCat  = INNOVATION_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div style={{ background: CREAM, paddingTop: '80px', fontFamily: 'var(--font-sans)', color: DEEP }}>

      {/* ══════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, ${DEEP} 0%, #0b2244 50%, #071730 100%)`, minHeight: '600px', display: 'flex', alignItems: 'center' }}>
        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(181,137,59,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(181,137,59,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px', pointerEvents: 'none' }} />
        {/* Radial glows */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,137,59,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(90,60,150,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 40px', position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }} className="rdi-hero-grid">
            {/* Left */}
            <div>
              <span style={{ display: 'inline-block', fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, border: `1px solid ${GOLD}40`, borderRadius: '4px', padding: '6px 16px', marginBottom: '28px' }}>
                Cosmetic R&D & Innovation
              </span>
              <h1 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(30px, 3.8vw, 52px)', fontWeight: 700, color: WHITE, margin: '0 0 22px', lineHeight: 1.12, letterSpacing: '-0.5px' }}>
                Innovation Driving The<br />
                <span style={{ color: GOLD }}>Future Of Cosmetic</span><br />
                Manufacturing
              </h1>
              <div style={{ width: '52px', height: '3px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`, borderRadius: '2px', marginBottom: '24px' }} />
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '560px' }}>
                Explore cosmetic R&D innovation, advanced ingredient technologies, sustainable beauty solutions, AI-powered formulation strategies, and commercialization opportunities shaping the future of beauty.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={scrollToContact} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 30px', background: GOLD, color: WHITE, border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: `0 8px 28px ${GOLD}50`, transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 14px 36px ${GOLD}60`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 28px ${GOLD}50`; }}>
                  Discuss Your Innovation Strategy <ArrowRight size={16} />
                </button>
                <Link href="#innovation-hub" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.88)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', transition: 'all 0.3s ease', backdropFilter: 'blur(8px)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}>
                  Explore Innovation Trends
                </Link>
              </div>

              {/* Trust chips */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '44px', flexWrap: 'wrap' }}>
                {['Biotech R&D', 'AI-Powered', 'Sustainability', 'Global Reach'].map((chip, i) => (
                  <span key={i} style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', padding: '5px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.05)' }}>✓ {chip}</span>
                ))}
              </div>
            </div>

            {/* Right — floating cards */}
            <div style={{ position: 'relative', height: '460px' }} className="rdi-hero-collage">
              {[
                { top: '0%', left: '10%', icon: Dna,          label: 'Biotech Ingredients', sub: 'Next-gen active development', color: '#7b5cb7', delay: '0s' },
                { top: '22%', left: '48%', icon: Cpu,          label: 'AI Formulation',     sub: 'Predictive development tools', color: GOLD, delay: '0.2s' },
                { top: '50%', left: '5%',  icon: Leaf,         label: 'Sustainability',     sub: 'Circular beauty innovation', color: '#5a8a6b', delay: '0.4s' },
                { top: '68%', left: '50%', icon: Microscope,   label: 'Research',           sub: 'Advanced ingredient science', color: '#c06b8a', delay: '0.6s' },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i} style={{ position: 'absolute', top: c.top, left: c.left, background: `${c.color}12`, backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '18px', padding: '18px 22px', minWidth: '220px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', animation: `rdiFloat${i % 2 === 0 ? 'A' : 'B'} 4s ease-in-out infinite`, animationDelay: c.delay }}>
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
              {/* Decorative molecules */}
              <div style={{ position: 'absolute', top: '38%', left: '30%', width: '100px', height: '100px', borderRadius: '50%', border: '1px dashed rgba(181,137,59,0.3)', animation: 'rdiSpin 18s linear infinite' }} />
              <div style={{ position: 'absolute', top: '42%', left: '34%', width: '60px', height: '60px', borderRadius: '50%', border: '1px dashed rgba(181,137,59,0.2)', animation: 'rdiSpin 12s linear infinite reverse' }} />
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div key={i} style={{ position: 'absolute', top: `calc(38% + 50px + ${Math.sin(deg * Math.PI / 180) * 42}px)`, left: `calc(30% + 50px + ${Math.cos(deg * Math.PI / 180) * 42}px)`, width: '7px', height: '7px', borderRadius: '50%', background: i % 2 === 0 ? GOLD : '#7b5cb7', boxShadow: `0 0 8px ${i % 2 === 0 ? GOLD : '#7b5cb7'}60` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. INNOVATION SANDBOX
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: WHITE }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Explore & Experiment</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.15 }}>Interactive Formulation Sandbox</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto 20px', borderRadius: '2px' }} />
            <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.75, maxWidth: '660px', margin: '0 auto' }}>
              Experience how formulation decisions influence product performance, scalability, sustainability, and commercialization.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="rdi-sandbox-grid">
            {SANDBOX_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                  <div className="rdi-sandbox-card" style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', background: CREAM, border: '1px solid rgba(181,137,59,0.15)', borderRadius: '20px', padding: '36px 28px 32px', boxShadow: '0 4px 20px rgba(27,11,48,0.04)', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`, transform: 'scaleX(0)', transition: 'transform 0.4s ease', transformOrigin: 'left' }} className="rdi-sandbox-bar" />
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${GOLD}12`, border: `1.5px solid ${GOLD}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, marginBottom: '24px', flexShrink: 0 }}>
                      <Icon size={22} />
                    </div>
                    <div style={{ width: '28px', height: '2.5px', background: GOLD, borderRadius: '2px', marginBottom: '18px', flexShrink: 0 }} />
                    <h3 style={{ fontFamily: 'Syne, serif', fontSize: '17px', fontWeight: 700, color: DEEP, margin: '0 0 12px', lineHeight: 1.3, flexShrink: 0 }}>{card.title}</h3>
                    <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.7, margin: 0, flexGrow: 1 }}>{card.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. WHY INNOVATION MATTERS
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: `linear-gradient(135deg, ${DEEP} 0%, #0b2244 60%, ${DEEP} 100%)`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,137,59,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>The Innovation Imperative</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: WHITE, margin: '0 0 16px', lineHeight: 1.15 }}>Why Innovation Matters In Modern Cosmetic Development</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto', borderRadius: '2px' }} />
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }} className="rdi-why-grid">
            {WHY_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                  <div className="rdi-why-card" style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px 26px', transition: 'all 0.4s ease' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${GOLD}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, marginBottom: '22px', flexShrink: 0 }}>
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontFamily: 'Syne, serif', fontSize: '17px', fontWeight: 700, color: WHITE, margin: '0 0 12px', lineHeight: 1.3, flexShrink: 0 }}>{card.title}</h3>
                    <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.72, margin: 0, flexGrow: 1 }}>{card.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INTERNATIONAL STANDARDS STRIP
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '60px 0', background: CREAM }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
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

      {/* ══════════════════════════════════════════════════
          4. EVOLUTION OF COSMETIC INNOVATION
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: WHITE }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Innovation Timeline</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.15 }}>The Evolution Of Cosmetic Innovation</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto 20px', borderRadius: '2px' }} />
            <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.75, maxWidth: '660px', margin: '0 auto' }}>
              From traditional trial and error to predictive, AI driven development: how innovation has transformed cosmetic manufacturing.
            </p>
          </ScrollReveal>

          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', top: '56px', left: 0, width: '100%', height: '4px', zIndex: 0 }}>
              <line x1="8.3%" y1="2" x2="91.7%" y2="2" stroke="rgba(181,137,59,0.15)" strokeWidth="2" />
              <line
                ref={evoLineRef}
                x1="8.3%"
                y1="2"
                x2="91.7%"
                y2="2"
                stroke="url(#evoGoldGrad)"
                strokeWidth="3"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset="100"
              />
              {/* Active animated timeline overlay path */}
              <motion.line
                x1="8.3%"
                y1="2"
                animate={{ x2: `${8.3 + activeEvoIndex * 16.68}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                stroke="url(#evoGoldGrad)"
                strokeWidth="3"
                style={{ filter: 'drop-shadow(0px 0px 4px rgba(181,137,59,0.6))' }}
              />
              <defs>
                <linearGradient id="evoGoldGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#B5893B" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', position: 'relative', zIndex: 1 }} className="rdi-evo-grid">
              {EVOLUTION_STEPS.map((step, i) => {
                const isActive = i === activeEvoIndex;
                return (
                  <ScrollReveal key={i} delay={i * 0.08} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                    <div
                      onMouseEnter={() => handleEvoInteraction(i)}
                      onMouseLeave={handleEvoInteractionLeave}
                      onClick={() => handleEvoInteraction(i)}
                      style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', cursor: 'pointer' }}
                    >
                      <motion.div
                        animate={{
                          backgroundColor: isActive ? WHITE : '#FAF9F7',
                          borderColor: isActive ? GOLD : 'rgba(181,137,59,0.15)',
                          boxShadow: isActive ? `0 16px 44px ${GOLD}20` : '0 4px 20px rgba(27,11,48,0.04)',
                          y: isActive ? -8 : 0
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="rdi-evo-card"
                        style={{
                          height: '100%',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: '20px',
                          border: '1px solid',
                          padding: '32px 20px 28px',
                          position: 'relative',
                          overflow: 'hidden',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ position: 'absolute', top: '12px', right: '14px', fontFamily: 'Syne, serif', fontSize: '48px', fontWeight: 800, color: `${GOLD}09`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{step.num}</div>
                        <motion.div
                          animate={{
                            scale: isActive ? 1.12 : 1.0,
                            backgroundColor: isActive ? GOLD : `${GOLD}12`,
                            borderColor: isActive ? GOLD : `${GOLD}30`
                          }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            border: '2px solid',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px',
                            boxShadow: isActive ? `0 6px 20px ${GOLD}35` : 'none',
                            flexShrink: 0
                          }}
                        >
                          <span style={{ fontFamily: 'Syne, serif', fontSize: '16px', fontWeight: 800, color: isActive ? WHITE : GOLD }}>{step.num}</span>
                        </motion.div>
                        <div style={{ width: '24px', height: '2px', background: GOLD, borderRadius: '2px', margin: '0 auto 14px', flexShrink: 0 }} />
                        <h3 style={{ fontFamily: 'Syne, serif', fontSize: '15px', fontWeight: 700, color: DEEP, margin: '0 0 10px', lineHeight: 1.3, flexShrink: 0 }}>{step.title}</h3>
                        <p style={{ fontSize: '12.5px', color: MUTED, lineHeight: 1.65, margin: 0, flexGrow: 1 }}>{step.desc}</p>
                      </motion.div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          5. INNOVATION EXPERTISE HUB (Sticky Nav + Cards)
      ══════════════════════════════════════════════════ */}
      <section id="innovation-hub" ref={capSectionRef} style={{ padding: '72px 0', background: CREAM, borderTop: `1px solid rgba(181,137,59,0.12)`, borderBottom: `1px solid rgba(181,137,59,0.12)` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Deep Innovation Research</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.15 }}>Innovation Expertise Hub</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto 20px', borderRadius: '2px' }} />
            <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.75, maxWidth: '660px', margin: '0 auto' }}>
              Explore advanced research areas shaping the future of cosmetic innovation: from biotechnology and sustainability to AI driven formulation intelligence.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '52px' }} className="rdi-hub-layout">
            {/* Left column container */}
            <div>
              {/* Sticky nav */}
              <div className="rdi-hub-tabs-container" style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {INNOVATION_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isAct = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleTabSwitch(cat.id)}
                      className={`rdi-hub-tab-btn ${isAct ? 'active-btn' : ''}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        padding: '18px 20px', border: 'none', borderRadius: '14px',
                        background: isAct ? WHITE : 'transparent',
                        borderLeft: `4px solid ${isAct ? cat.color : 'transparent'}`,
                        boxShadow: isAct ? '0 8px 28px rgba(27,11,48,0.08)' : 'none',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                        '--tab-color': cat.color
                      }}
                      onMouseEnter={e => { if (!isAct) e.currentTarget.style.background = 'rgba(255,255,255,0.6)'; }}
                      onMouseLeave={e => { if (!isAct) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isAct ? `${cat.color}18` : 'rgba(181,137,59,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isAct ? cat.color : MUTED, flexShrink: 0, transition: 'all 0.3s' }}>
                        <Icon size={18} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13.5px', fontWeight: 700, color: isAct ? DEEP : MUTED, lineHeight: 1.3, transition: 'color 0.3s' }}>
                          <span className="rdi-tab-title-desktop">{cat.title}</span>
                          <span className="rdi-tab-title-mobile">{cat.short || cat.title}</span>
                        </div>
                        <div className="rdi-tab-active-label" style={{ fontSize: '11px', color: isAct ? cat.color : 'transparent', fontWeight: 600, letterSpacing: '0.5px', marginTop: '3px', transition: 'color 0.3s' }}>Active</div>
                      </div>
                      {isAct && <ArrowRight size={14} color={cat.color} className="rdi-tab-arrow" />}
                    </button>
                  );
                })}

                {/* Category summary card */}
                {activeCat && (
                  <div className="rdi-hub-summary-card" style={{ marginTop: '20px', background: `linear-gradient(135deg, ${activeCat.color}10, ${activeCat.color}05)`, border: `1px solid ${activeCat.color}25`, borderRadius: '16px', padding: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: activeCat.color, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>Active Pillar</div>
                    <div style={{ fontFamily: 'Syne, serif', fontSize: '15px', fontWeight: 700, color: DEEP, marginBottom: '8px' }}>{activeCat.title}</div>
                    <div style={{ fontSize: '12px', color: MUTED, lineHeight: 1.5 }}>{activeCaps.length} innovation area{activeCaps.length !== 1 ? 's' : ''} in this category</div>
                  </div>
                )}
              </div>
            </div>

            {/* Right — capability panels */}
            <div key={activeCategory} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {activeCaps.map((cap, i) => {
                const catObj = INNOVATION_CATEGORIES.find(c => c.id === cap.category);
                const catColor = catObj?.color || GOLD;
                return (
                  <ScrollReveal key={`${cap.title}-${i}`} delay={i * 0.08}>
                    <div className="rdi-cap-panel" style={{ background: WHITE, borderRadius: '22px', overflow: 'hidden', border: `1px solid rgba(181,137,59,0.1)`, boxShadow: '0 4px 24px rgba(27,11,48,0.04)', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
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
                        </div>

                        <p style={{ fontSize: '14.5px', color: MUTED, lineHeight: 1.78, margin: '0 0 26px' }}>{cap.desc}</p>

                        {/* Scope checklist */}
                        <div style={{ background: CREAM, border: `1px solid ${catColor}15`, borderRadius: '14px', padding: '22px 24px', marginBottom: '26px' }}>
                          <div style={{ fontSize: '10.5px', fontWeight: 700, color: DEEP, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '20px', height: '2px', background: catColor, borderRadius: '1px', display: 'inline-block' }} />
                            Scope of Innovation
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 24px' }} className="rdi-bullets-grid">
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

                        {/* CTA */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          <button onClick={scrollToContact} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: catColor, color: WHITE, border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: `0 6px 18px ${catColor}35`, transition: 'all 0.3s ease' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                            Get Consultation <ArrowRight size={14} />
                          </button>
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
          6. GLOBAL INNOVATION OPPORTUNITIES
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: WHITE }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Worldwide Innovation</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.15 }}>Global Innovation Opportunities</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto 20px', borderRadius: '2px' }} />
            <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.75, maxWidth: '660px', margin: '0 auto' }}>
              Innovation trends and growth opportunities shaping cosmetic markets across key global regions.
            </p>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="rdi-global-grid">
            {GLOBAL_OPPORTUNITIES.map((region, i) => (
              <ScrollReveal key={i} delay={i * 0.06} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                <div className="rdi-global-card" style={{ background: CREAM, border: '1px solid rgba(181,137,59,0.12)', borderRadius: '20px', padding: '32px 28px', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`, transform: 'scaleX(0)', transition: 'transform 0.4s ease', transformOrigin: 'left' }} className="rdi-global-bar" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px', flexShrink: 0 }}>
                    <span style={{ fontSize: '32px', lineHeight: 1 }}>{region.flag}</span>
                    <div>
                      <h3 style={{ fontFamily: 'Syne, serif', fontSize: '18px', fontWeight: 700, color: DEEP, margin: 0 }}>{region.region}</h3>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '3px' }}>Growth Market</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '14px', flexShrink: 0 }}>
                    <div style={{ fontSize: '10.5px', fontWeight: 700, color: MUTED, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>Key Trends</div>
                    <p style={{ fontSize: '13px', color: '#2d2736', lineHeight: 1.5, margin: 0 }}>{region.trends}</p>
                  </div>
                  <div style={{ padding: '14px', background: `${GOLD}08`, border: `1px solid ${GOLD}15`, borderRadius: '10px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>Opportunity</div>
                    <p style={{ fontSize: '12.5px', color: MUTED, lineHeight: 1.6, margin: 0 }}>{region.opportunity}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. EMERGING OPPORTUNITIES
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: CREAM, borderTop: `1px solid rgba(181,137,59,0.1)` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Strategic Opportunities</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.15 }}>Emerging Opportunities For Entrepreneurs & Manufacturers</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto', borderRadius: '2px' }} />
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="rdi-emerging-grid">
            {EMERGING_OPPS.map((opp, i) => {
              const Icon = opp.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.06} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                  <div className="rdi-emerging-card" style={{ background: WHITE, border: '1px solid rgba(181,137,59,0.12)', borderRadius: '20px', padding: '36px 28px', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`, transform: 'scaleX(0)', transition: 'transform 0.4s ease', transformOrigin: 'left' }} className="rdi-emerging-bar" />
                    <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${GOLD}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD, marginBottom: '22px', transition: 'all 0.3s ease', flexShrink: 0 }}>
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontFamily: 'Syne, serif', fontSize: '18px', fontWeight: 700, color: DEEP, margin: '0 0 12px', lineHeight: 1.3, flexShrink: 0 }}>{opp.title}</h3>
                    <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.72, margin: 0, flexGrow: 1 }}>{opp.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          8. WHY INNOVATIONS FAIL (Two-column + Accordion)
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: WHITE, borderTop: `1px solid rgba(181,137,59,0.1)` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'start' }} className="rdi-fail-grid">
            {/* Left — info graphic */}
            <ScrollReveal>
              <div>
                <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '16px' }}>Innovation Challenges</span>
                <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.2 }}>Why Do Cosmetic Innovations Fail?</h2>
                <div style={{ width: '48px', height: '3px', background: GOLD, borderRadius: '2px', marginBottom: '24px' }} />
                <p style={{ fontSize: '15px', color: MUTED, lineHeight: 1.8, marginBottom: '36px' }}>
                  Many promising cosmetic concepts fail because businesses focus exclusively on the formulation itself. Successful innovation requires balancing scientific creativity with operational execution, compliance planning, and commercial readiness.
                </p>

                {/* Visual infographic card */}
                <div style={{ background: CREAM, border: `1px solid rgba(181,137,59,0.15)`, borderRadius: '20px', padding: '36px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}06 0%, transparent 70%)`, pointerEvents: 'none' }} />
                  <div style={{ fontSize: '11px', fontWeight: 700, color: GOLD, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '24px' }}>Common Failure Points</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { pct: '65%', label: 'Stability & manufacturing issues' },
                      { pct: '52%', label: 'Regulatory compliance gaps' },
                      { pct: '48%', label: 'Weak market validation' },
                      { pct: '41%', label: 'Scalability challenges' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: DEEP }}>{item.label}</span>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: GOLD, fontFamily: 'Syne, serif' }}>{item.pct}</span>
                        </div>
                        <div style={{ height: '6px', background: `${GOLD}15`, borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: item.pct, background: `linear-gradient(90deg, ${GOLD}, ${GOLD_L})`, borderRadius: '3px', transition: 'width 1s ease' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right — Accordion */}
            <ScrollReveal delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {FAILURE_REASONS.map((reason, i) => {
                  const isOpen = openFailure === i;
                  const Icon = reason.icon;
                  return (
                    <div key={i} onClick={() => setOpenFailure(isOpen ? null : i)} style={{ background: CREAM, border: `1px solid ${isOpen ? GOLD : 'rgba(181,137,59,0.15)'}`, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', boxShadow: isOpen ? `0 8px 28px ${GOLD}12` : '0 2px 10px rgba(27,11,48,0.03)', transition: 'all 0.35s ease' }}>
                      <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: isOpen ? `${GOLD}18` : `${GOLD}08`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isOpen ? GOLD : MUTED, flexShrink: 0, transition: 'all 0.3s' }}>
                            <Icon size={16} />
                          </div>
                          <span style={{ fontSize: '14.5px', fontWeight: 600, color: DEEP, lineHeight: 1.4 }}>{reason.title}</span>
                        </div>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: isOpen ? GOLD : `${GOLD}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s ease' }}>
                          <ChevronDown size={14} color={isOpen ? WHITE : GOLD} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.35s ease' }} />
                        </div>
                      </div>
                      {isOpen && (
                        <div style={{ padding: '0 24px 20px 74px', borderTop: `1px solid ${GOLD}12`, animation: 'rdiFadeIn 0.3s ease' }}>
                          <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.75, margin: '14px 0 0' }}>{reason.desc}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          9. FROM INNOVATION TO COMMERCIALIZATION
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: CREAM, borderTop: `1px solid rgba(181,137,59,0.1)` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Innovation Pipeline</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.15 }}>From Innovation To Commercialization</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto 20px', borderRadius: '2px' }} />
            <p style={{ fontSize: '16px', color: MUTED, lineHeight: 1.75, maxWidth: '660px', margin: '0 auto' }}>
              Innovation creates opportunities. Commercialization creates businesses. A balanced approach integrating every stage.
            </p>
          </ScrollReveal>

          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', top: '42px', left: 0, width: '100%', height: '4px', zIndex: 0 }}>
              {/* Background drawing timeline track */}
              <line
                ref={commTrackRef}
                x1="10%"
                y1="2"
                x2="90%"
                y2="2"
                stroke="rgba(181,137,59,0.15)"
                strokeWidth="2"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset="100"
              />
              {/* Active animated timeline overlay path */}
              <motion.line
                x1="10%"
                y1="2"
                animate={{ x2: `${10 + activeIndex * 20}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                stroke="url(#commGoldGrad)"
                strokeWidth="3"
                style={{ filter: 'drop-shadow(0px 0px 4px rgba(181,137,59,0.6))' }}
              />
              <defs>
                <linearGradient id="commGoldGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#B5893B" />
                  <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', position: 'relative', zIndex: 1 }} className="rdi-comm-grid">
              {COMMERCIALIZATION_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === activeIndex;
                return (
                  <ScrollReveal key={i} delay={i * 0.1} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                    <div
                      onMouseEnter={() => handleInteraction(i)}
                      onMouseLeave={handleInteractionLeave}
                      onClick={() => handleInteraction(i)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer', height: '100%', width: '100%' }}
                    >
                      {/* Step number badge */}
                      <motion.div
                        animate={{
                          scale: isActive ? 1.12 : 1.0,
                          backgroundColor: isActive ? '#B5893B' : '#FFFFFF',
                          borderColor: isActive ? '#B5893B' : 'rgba(181,137,59,0.40)'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        style={{
                          width: '84px',
                          height: '84px',
                          borderRadius: '50%',
                          border: '2px solid',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '28px',
                          boxShadow: isActive ? '0 8px 28px rgba(181,137,59,0.40)' : '0 4px 16px rgba(27,11,48,0.06)',
                          zIndex: 2
                        }}
                      >
                        <div>
                          <div style={{ fontFamily: 'Syne, serif', fontSize: '11px', fontWeight: 700, color: isActive ? WHITE : MUTED, letterSpacing: '1px', transition: 'color 0.4s ease' }}>STEP</div>
                          <div style={{ fontFamily: 'Syne, serif', fontSize: '22px', fontWeight: 800, color: isActive ? WHITE : GOLD, lineHeight: 1, transition: 'color 0.4s ease' }}>{step.num}</div>
                        </div>
                      </motion.div>

                      {/* Card */}
                      <motion.div
                        animate={{
                          backgroundColor: isActive ? '#FFFFFF' : '#FAF9F7',
                          borderColor: isActive ? '#B5893B' : 'rgba(181,137,59,0.12)',
                          boxShadow: isActive ? '0 16px 44px rgba(181,137,59,0.15)' : '0 2px 10px rgba(27,11,48,0.03)',
                          y: isActive ? -10 : 0
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        style={{
                          border: '1px solid',
                          borderRadius: '18px',
                          padding: '28px 20px',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          flexGrow: 1
                        }}
                      >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: isActive ? `${GOLD}22` : `${GOLD}12`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: GOLD,
                          margin: '0 auto 16px',
                          transition: 'all 0.4s ease',
                          flexShrink: 0
                        }}>
                          <Icon size={18} />
                        </div>
                        <h3 style={{ fontFamily: 'Syne, serif', fontSize: '17px', fontWeight: 700, color: DEEP, margin: '0 0 10px', transition: 'color 0.4s ease', flexShrink: 0 }}>{step.title}</h3>
                        <p style={{ fontSize: '12.5px', color: MUTED, lineHeight: 1.65, margin: 0, flexGrow: 1 }}>{step.desc}</p>
                      </motion.div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          10. FAQ
      ══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: WHITE, borderTop: `1px solid rgba(181,137,59,0.1)` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '14px' }}>Common Queries</span>
            <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: DEEP, margin: '0 0 16px', lineHeight: 1.15 }}>Questions About Cosmetic Innovation & Product Development</h2>
            <div style={{ width: '48px', height: '3px', background: GOLD, margin: '0 auto', borderRadius: '2px' }} />
          </ScrollReveal>

          <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} onClick={() => setOpenFaq(isOpen ? null : i)} style={{ background: CREAM, border: `1px solid ${isOpen ? GOLD : 'rgba(181,137,59,0.15)'}`, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', boxShadow: isOpen ? `0 8px 28px ${GOLD}12` : '0 2px 10px rgba(27,11,48,0.03)', transition: 'all 0.35s ease' }}>
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
                    <div style={{ padding: '0 28px 24px 60px', borderTop: `1px solid ${GOLD}12`, animation: 'rdiFadeIn 0.3s ease' }}>
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
          11. FINAL CTA BANNER
      ══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: `linear-gradient(135deg, ${DEEP} 0%, #0b2244 50%, #071730 100%)`, padding: '72px 40px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(181,137,59,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(181,137,59,0.05) 1px, transparent 1px)', backgroundSize: '52px 52px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, ${GOLD}15 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-120px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,92,183,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <ScrollReveal style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10.5px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: GOLD, border: `1px solid ${GOLD}40`, borderRadius: '4px', padding: '6px 16px', marginBottom: '32px' }}>
            <Sparkles size={12} /> Ready to Innovate
          </span>
          <h2 style={{ fontFamily: 'Syne, serif', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, color: WHITE, margin: '0 0 22px', lineHeight: 1.12 }}>
            Transform Your Innovation<br /><span style={{ color: GOLD }}>Into Commercial Success</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '44px', maxWidth: '640px', margin: '0 auto 44px' }}>
            Partner with EGC to navigate the journey from emerging ideas to scalable, compliant, and commercially viable cosmetic solutions.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button onClick={scrollToContact} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 34px', background: GOLD, color: WHITE, border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', boxShadow: `0 10px 32px ${GOLD}50`, transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 18px 44px ${GOLD}60`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 10px 32px ${GOLD}50`; }}>
              Discuss Your Innovation Opportunity <ArrowRight size={17} />
            </button>
            <Link href="/contact/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 30px', background: 'rgba(255,255,255,0.08)', color: WHITE, border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', fontWeight: 600, fontSize: '15px', textDecoration: 'none', backdropFilter: 'blur(8px)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}>
              <Phone size={16} /> Contact Our Experts
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Biotech Excellence', 'AI-Powered R&D', 'Sustainability Focus', 'Commercial Success'].map((t, i) => (
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
        @keyframes rdiFloatA {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes rdiFloatB {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }

        /* ── Marquee ── */
        @keyframes certScrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes certScrollRight {
          0%   { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }

        .cert-marquee-wrap {
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .cert-marquee-track { display: flex; width: max-content; }

        .cert-scroll-left  { animation: certScrollLeft  28s linear infinite; }
        .cert-scroll-right { animation: certScrollRight 28s linear infinite; }

        .cert-marquee-wrap:hover .cert-marquee-track {
          animation-play-state: paused;
        }

        .cert-marquee-set {
          display: flex;
          gap: 16px;
          padding-right: 16px;
          flex-shrink: 0;
        }

        .cert-logo-card {
          background: #fff;
          border: 1px solid rgba(181,137,59,0.15);
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(13,42,82,0.04);
          height: 80px;
          min-width: 110px;
          flex-shrink: 0;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
          cursor: default;
        }

        .cert-logo-card:hover {
          border-color: rgba(181,137,59,0.45);
          box-shadow: 0 6px 20px rgba(181,137,59,0.12);
          transform: translateY(-3px);
        }
        @keyframes rdiSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes rdiFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rdiCommPulse {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .rdi-comm-line {
          background: linear-gradient(90deg, rgba(181,137,59,0.15) 0%, #B5893B 50%, rgba(181,137,59,0.15) 100%);
          background-size: 200% 100%;
          animation: rdiCommPulse 3s linear infinite;
        }
        .rdi-evo-line {
          background: linear-gradient(90deg, rgba(181,137,59,0.15) 0%, #B5893B 50%, rgba(181,137,59,0.15) 100%);
          background-size: 200% 100%;
          animation: rdiCommPulse 3s linear infinite;
        }

        .rdi-sandbox-card:hover {
          transform: translateY(-8px) !important;
          border-color: rgba(181,137,59,0.4) !important;
          box-shadow: 0 20px 48px rgba(181,137,59,0.12) !important;
        }
        .rdi-sandbox-card:hover .rdi-sandbox-bar {
          transform: scaleX(1) !important;
        }
        .rdi-evo-card:hover {
          transform: translateY(-8px) !important;
          border-color: rgba(181,137,59,0.4) !important;
          box-shadow: 0 20px 48px rgba(181,137,59,0.12) !important;
        }
        .rdi-cap-panel:hover {
          transform: translateY(-5px);
          border-color: rgba(181,137,59,0.25) !important;
          box-shadow: 0 20px 56px rgba(27,11,48,0.1) !important;
        }
        .rdi-why-card:hover {
          background: rgba(255,255,255,0.09) !important;
          border-color: rgba(181,137,59,0.25) !important;
          transform: translateY(-6px);
        }
        .rdi-global-card:hover {
          transform: translateY(-8px);
          border-color: rgba(181,137,59,0.3) !important;
          box-shadow: 0 20px 48px rgba(27,11,48,0.08) !important;
        }
        .rdi-global-card:hover .rdi-global-bar {
          transform: scaleX(1) !important;
        }
        .rdi-emerging-card:hover {
          transform: translateY(-8px);
          border-color: rgba(181,137,59,0.3) !important;
          box-shadow: 0 20px 48px rgba(27,11,48,0.08) !important;
        }
        .rdi-emerging-card:hover .rdi-emerging-bar {
          transform: scaleX(1) !important;
        }

        .rdi-tab-title-desktop { display: inline; }
        .rdi-tab-title-mobile { display: none; }

        /* Responsive */
        @media (max-width: 1024px) {
          .rdi-hub-layout { grid-template-columns: 1fr !important; }
          .rdi-hub-layout > div { min-width: 0 !important; }
          .rdi-hub-tabs-container {
            position: relative !important;
            top: 0 !important;
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            padding: 8px 4px !important;
            margin: 0 -40px !important;
            padding-left: 40px !important;
            padding-right: 40px !important;
            gap: 12px !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .rdi-hub-tabs-container::-webkit-scrollbar {
            display: none;
          }
          .rdi-hub-tab-btn {
            flex: 0 0 auto !important;
            white-space: nowrap !important;
            padding: 12px 18px !important;
            border-left: none !important;
            border-bottom: 4px solid transparent !important;
          }
          .rdi-hub-tab-btn.active-btn {
            border-bottom-color: var(--tab-color) !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
          }
          .rdi-tab-arrow {
            display: none !important;
          }
          .rdi-hub-summary-card {
            display: none !important;
          }
          .rdi-tab-title-desktop {
            display: none !important;
          }
          .rdi-tab-title-mobile {
            display: inline !important;
          }
          .rdi-tab-active-label {
            display: none !important;
          }

          .rdi-hero-collage { display: none !important; }
          .rdi-hero-grid { grid-template-columns: 1fr !important; }
          .rdi-why-grid { grid-template-columns: repeat(2,1fr) !important; }
          .rdi-global-grid { grid-template-columns: repeat(2,1fr) !important; }
          .rdi-emerging-grid { grid-template-columns: repeat(2,1fr) !important; }
          .rdi-fail-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .rdi-evo-grid { grid-template-columns: repeat(3,1fr) !important; }
          .rdi-comm-grid { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 900px) {
          .rdi-sandbox-grid { grid-template-columns: repeat(2,1fr) !important; }
          .rdi-evo-line { display: none !important; }
          .rdi-comm-line { display: none !important; }
          .rdi-comm-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 680px) {
          .rdi-hub-tabs-container {
            margin: 0 -16px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .rdi-hero-grid { grid-template-columns: 1fr !important; }
          .rdi-hero-collage { display: none !important; }
          .rdi-sandbox-grid { grid-template-columns: 1fr !important; }
          .rdi-why-grid { grid-template-columns: 1fr !important; }
          .rdi-global-grid { grid-template-columns: 1fr !important; }
          .rdi-emerging-grid { grid-template-columns: 1fr !important; }
          .rdi-evo-grid { grid-template-columns: repeat(2,1fr) !important; }
          .rdi-comm-grid { grid-template-columns: 1fr !important; }
          .rdi-bullets-grid { grid-template-columns: 1fr !important; }
          .rdi-hub-tabs { overflow-x: auto !important; flex-wrap: nowrap !important; -webkit-overflow-scrolling: touch !important; padding-bottom: 8px !important; justify-content: flex-start !important; }
          .rdi-section-pad { padding: 60px 16px !important; }
        }
        @media (max-width: 420px) {
          .rdi-evo-grid { grid-template-columns: 1fr !important; }
          .rdi-global-grid { grid-template-columns: 1fr !important; }
        }
      `}} />

    </div>
  );
}
