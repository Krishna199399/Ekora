import ServicesPage from '../../src/site-pages/ServicesPage';

export const metadata = {
  title: 'Cosmetic Consulting Services | EGC Ekora Global Consulting',
  description:
    "Explore EGC's cosmetic consulting services, including formulation R&D, factory planning, GMP compliance, manufacturing, and brand growth strategies.",
  alternates: {
    canonical: 'https://www.ekoraglobalconsulting.com/services/',
  },
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.ekoraglobalconsulting.com/services/#collectionpage',
      url: 'https://www.ekoraglobalconsulting.com/services/',
      name: 'Cosmetic Consulting Services | EGC Ekora Global Consulting',
      description:
        'Explore end-to-end cosmetic consulting services including product formulation, manufacturing consulting, plant setup, regulatory support, private label manufacturing, commercialization, and business advisory solutions.',
      isPartOf: { '@id': 'https://www.ekoraglobalconsulting.com/#website' },
      about: { '@id': 'https://www.ekoraglobalconsulting.com/#organization' },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://www.ekoraglobalconsulting.com/ekora-global-consulting-logo-black.png',
      },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.ekoraglobalconsulting.com/services/#webpage',
      url: 'https://www.ekoraglobalconsulting.com/services/',
      name: 'Cosmetic Consulting Services | EGC Ekora Global Consulting',
      description:
        'Discover cosmetic consulting services for product development, manufacturing, regulatory compliance, commercialization, and business growth across the beauty and personal care industry.',
      isPartOf: { '@id': 'https://www.ekoraglobalconsulting.com/#website' },
      about: { '@id': 'https://www.ekoraglobalconsulting.com/#organization' },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://www.ekoraglobalconsulting.com/ekora-global-consulting-logo-black.png',
      },
      inLanguage: 'en',
    },
    {
      '@type': 'ItemList',
      '@id': 'https://www.ekoraglobalconsulting.com/services/#itemlist',
      name: 'Cosmetic Consulting Services',
      numberOfItems: 15,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Cosmetic Research & Product Formulation', url: 'https://www.ekoraglobalconsulting.com/services/cosmetic-research-product-formulation/' },
        { '@type': 'ListItem', position: 2, name: 'Cosmetic Stability Testing & Shelf Life Validation', url: 'https://www.ekoraglobalconsulting.com/services/cosmetic-stability-testing-shelf-life-validation/' },
        { '@type': 'ListItem', position: 3, name: 'Ingredient Sourcing Support', url: 'https://www.ekoraglobalconsulting.com/services/ingredient-sourcing-support/' },
        { '@type': 'ListItem', position: 4, name: 'Cosmetic Innovation & R&D Productivity Consulting', url: 'https://www.ekoraglobalconsulting.com/services/cosmetic-innovation-rd-productivity-consulting/' },
        { '@type': 'ListItem', position: 5, name: 'Plant Setup & Factory Planning', url: 'https://www.ekoraglobalconsulting.com/services/plant-setup-factory-planning/' },
        { '@type': 'ListItem', position: 6, name: 'Turnkey Cosmetic Project Solutions', url: 'https://www.ekoraglobalconsulting.com/services/turnkey-cosmetic-project-solutions/' },
        { '@type': 'ListItem', position: 7, name: 'Cosmetic Manufacturing Consulting', url: 'https://www.ekoraglobalconsulting.com/services/cosmetic-manufacturing-consulting/' },
        { '@type': 'ListItem', position: 8, name: 'Scale-Up & Commercialization Support', url: 'https://www.ekoraglobalconsulting.com/services/scale-up-commercialization-support/' },
        { '@type': 'ListItem', position: 9, name: 'Private Label & Contract Manufacturing Support', url: 'https://www.ekoraglobalconsulting.com/services/private-label-contract-manufacturing/' },
        { '@type': 'ListItem', position: 10, name: 'Regulatory & Compliance Support', url: 'https://www.ekoraglobalconsulting.com/services/regulatory-compliance-support/' },
        { '@type': 'ListItem', position: 11, name: 'Export Documentation Support', url: 'https://www.ekoraglobalconsulting.com/services/export-documentation-support/' },
        { '@type': 'ListItem', position: 12, name: 'Cosmetic DPR & Business Consulting', url: 'https://www.ekoraglobalconsulting.com/services/cosmetic-dpr-business-consulting/' },
        { '@type': 'ListItem', position: 13, name: 'Technical Recruitment & Team Building Support', url: 'https://www.ekoraglobalconsulting.com/services/technical-recruitment-team-building/' },
        { '@type': 'ListItem', position: 14, name: 'Packaging Development & Sourcing', url: 'https://www.ekoraglobalconsulting.com/services/packaging-development-sourcing/' },
        { '@type': 'ListItem', position: 15, name: 'Branding & Go-To-Market Consulting', url: 'https://www.ekoraglobalconsulting.com/services/branding-go-to-market-consulting/' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.ekoraglobalconsulting.com/services/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ekoraglobalconsulting.com/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.ekoraglobalconsulting.com/services/' },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.ekoraglobalconsulting.com/services/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What cosmetic consulting services does EGC provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'EGC provides end-to-end cosmetic consulting services including product formulation, manufacturing consulting, plant setup, private label support, regulatory compliance, commercialization, and business advisory services.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can EGC help businesses start a cosmetic manufacturing project?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. EGC supports entrepreneurs, investors, and manufacturers with cosmetic business planning, product development, manufacturing readiness, and commercialization strategies.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you support both startups and existing cosmetic brands?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. EGC works with startups, emerging brands, established manufacturers, wellness businesses, and investors seeking product development, manufacturing support, and business expansion.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can EGC support international cosmetic business projects?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. EGC supports businesses targeting India, the Middle East, Southeast Asia, Europe, North America, and Africa through product development, manufacturing consulting, and commercialization support.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do all cosmetic projects require a manufacturing facility?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Depending on business objectives, companies may choose private label manufacturing, contract manufacturing partnerships, or dedicated manufacturing facilities.',
          },
        },
      ],
    },
  ],
};

export default function Services() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <ServicesPage />
    </>
  );
}
