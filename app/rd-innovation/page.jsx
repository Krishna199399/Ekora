import RDInnovationPage from '../../src/site-pages/RDInnovationPage';

export const metadata = {
  title: 'Cosmetic Innovation Research & Beauty Technology Trends | EGC',
  description:
    'Explore cosmetic R&D innovation, beauty technologies, ingredient research, AI trends, sustainability, and future opportunities with EGC Ekora Global Consulting.',
  keywords:
    'cosmetic R&D, beauty innovation, ingredient technology, AI formulation, sustainable cosmetics, biotechnology cosmetics, clean beauty, EGC, Ekora Global Consulting',
  alternates: {
    canonical: 'https://www.ekoraglobalconsulting.com/rd-innovation/',
  },
};

const rdInnovationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.ekoraglobalconsulting.com/rd-innovation/#webpage',
      url: 'https://www.ekoraglobalconsulting.com/rd-innovation/',
      name: 'R&D Innovation | EGC Ekora Global Consulting',
      description:
        'Explore cosmetic research and development innovations, advanced ingredient technologies, sustainable beauty trends, functional beauty research, and AI-driven cosmetic manufacturing opportunities.',
      isPartOf: { '@id': 'https://www.ekoraglobalconsulting.com/#website' },
      about: { '@id': 'https://www.ekoraglobalconsulting.com/#organization' },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://www.ekoraglobalconsulting.com/ekora-global-consulting-logo-black.png',
      },
      inLanguage: 'en',
    },
    {
      '@type': 'CreativeWork',
      '@id': 'https://www.ekoraglobalconsulting.com/rd-innovation/#creativework',
      name: 'Cosmetic R&D Innovation',
      url: 'https://www.ekoraglobalconsulting.com/rd-innovation/',
      description:
        'Insights into global cosmetic innovation, advanced ingredient research, clean beauty technologies, sustainable manufacturing, functional beauty, and AI-driven product development.',
      creator: { '@id': 'https://www.ekoraglobalconsulting.com/#organization' },
      publisher: { '@id': 'https://www.ekoraglobalconsulting.com/#organization' },
      mainEntityOfPage: { '@id': 'https://www.ekoraglobalconsulting.com/rd-innovation/#webpage' },
      image: {
        '@type': 'ImageObject',
        url: 'https://www.ekoraglobalconsulting.com/ekora-global-consulting-logo-black.png',
      },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.ekoraglobalconsulting.com/rd-innovation/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',          item: 'https://www.ekoraglobalconsulting.com/' },
        { '@type': 'ListItem', position: 2, name: 'R&D Innovation', item: 'https://www.ekoraglobalconsulting.com/rd-innovation/' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.ekoraglobalconsulting.com/rd-innovation/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is cosmetic R&D innovation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cosmetic R&D innovation involves researching, developing, validating, and commercializing new products, ingredients, technologies, and manufacturing processes that improve product performance, consumer value, and business growth potential.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the latest cosmetic innovation trends?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Current trends include biotechnology ingredients, exosomes, functional beauty, microbiome research, sustainability, clean beauty technologies, predictive formulation systems, and AI-supported product development.',
          },
        },
        {
          '@type': 'Question',
          name: 'What opportunities exist in sustainable cosmetic innovation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Opportunities include waterless beauty products, upcycled ingredients, sustainable packaging, circular manufacturing systems, energy-efficient production methods, and environmentally responsible supply chains.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does AI support cosmetic product development?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'AI helps analyze formulation variables, identify ingredient opportunities, predict product performance, monitor market trends, and accelerate decision-making throughout the product development lifecycle.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can EGC support innovation and commercialization?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EGC supports businesses through product innovation strategy, formulation development, testing, manufacturing readiness, compliance planning, commercialization support, and long-term growth initiatives.',
          },
        },
      ],
    },
  ],
};

export default function RDInnovation() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rdInnovationSchema) }}
      />
      <RDInnovationPage />
    </>
  );
}
