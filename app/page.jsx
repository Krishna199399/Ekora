import Hero from '../src/components/Hero';
import AtAGlance from '../src/components/AtAGlance';
import Capabilities from '../src/components/Capabilities';
import ProductExpertise from '../src/components/ProductExpertise';
import GlobalMarkets from '../src/components/GlobalMarkets';
import ResearchInnovation from '../src/components/ResearchInnovation';
import FactorySetup from '../src/components/FactorySetup';
import Testimonials from '../src/components/Testimonials';
import FAQ from '../src/components/FAQ';
import ContactForm from '../src/components/ContactForm';

export const metadata = {
  title: 'Cosmetic Industrial Consultants | EGC Ekora Global Consulting',
  description:
    'EGC Ekora Global Consulting helps cosmetic brands and manufacturers with product development, factory setup, manufacturing, compliance, and growth.',
  alternates: {
    canonical: 'https://www.ekoraglobalconsulting.com/',
  },
};

const mainSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.ekoraglobalconsulting.com/#organization',
      name: 'EGC Ekora Global Consulting',
      alternateName: 'Ekora Global Consulting',
      url: 'https://www.ekoraglobalconsulting.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.ekoraglobalconsulting.com/ekora-global-consulting-logo-black.png',
      },
      email: 'info@ekoraglobalconsulting.com',
      telephone: '+91 78929 78516',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No. 39/3, Richmond Road',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://www.ekoraglobalconsulting.com/#professionalservice',
      name: 'EGC Ekora Global Consulting',
      url: 'https://www.ekoraglobalconsulting.com/',
      image: 'https://www.ekoraglobalconsulting.com/ekora-global-consulting-logo-black.png',
      telephone: '+91 78929 78516',
      email: 'info@ekoraglobalconsulting.com',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No. 39/3, Richmond Road',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
      ],
      parentOrganization: {
        '@id': 'https://www.ekoraglobalconsulting.com/#organization',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.ekoraglobalconsulting.com/#website',
      url: 'https://www.ekoraglobalconsulting.com/',
      name: 'EGC Ekora Global Consulting',
      publisher: {
        '@id': 'https://www.ekoraglobalconsulting.com/#organization',
      },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.ekoraglobalconsulting.com/#webpage',
      url: 'https://www.ekoraglobalconsulting.com/',
      name: 'EGC Ekora Global Consulting | Cosmetic Manufacturing & Product Development Consulting',
      description:
        'End-to-end cosmetic consulting services including product development, formulation, manufacturing setup, regulatory support, and commercialization strategies.',
      isPartOf: {
        '@id': 'https://www.ekoraglobalconsulting.com/#website',
      },
      about: {
        '@id': 'https://www.ekoraglobalconsulting.com/#organization',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://www.ekoraglobalconsulting.com/ekora-global-consulting-logo-black.png',
      },
      inLanguage: 'en',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does EGC Ekora Global Consulting provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EGC Ekora Global Consulting provides end-to-end cosmetic consulting services including product formulation, cosmetic manufacturing consulting, plant setup and factory planning, regulatory compliance support, private label manufacturing, packaging development, and commercialization strategies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can EGC help me start a cosmetic manufacturing business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. EGC supports entrepreneurs, investors, and businesses in establishing cosmetic manufacturing operations through feasibility studies, product development, factory planning, regulatory guidance, and commercialization support.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does EGC develop custom cosmetic formulations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. EGC provides cosmetic research and product formulation support for skincare, haircare, body care, herbal cosmetics, wellness beauty products, and other personal care categories tailored to specific business requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does EGC support regulatory compliance for cosmetic products?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. EGC assists businesses with cosmetic regulatory and compliance requirements, documentation planning, export support, and market readiness initiatives for domestic and international markets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which countries does EGC serve for cosmetic consulting services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EGC primarily supports businesses in India and also works with clients across the Middle East, Southeast Asia, Europe, North America, and Africa for cosmetic product development, manufacturing, and commercialization projects.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <AtAGlance />
      <Capabilities />
      <ProductExpertise />
      <GlobalMarkets />
      <ResearchInnovation />
      <FactorySetup />
      <Testimonials />
      <FAQ />
      <ContactForm />
    </>
  );
}
