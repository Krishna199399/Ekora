import AboutPage from '../../src/site-pages/AboutPage';

export const metadata = {
  title: 'About EGC Ekora Global Consulting | Cosmetic Industrial Consultants',
  description:
    'Learn about EGC Ekora Global Consulting, a cosmetic industrial consulting company supporting product development, manufacturing, factory setup, compliance, and growth strategies for beauty businesses worldwide.',
  alternates: {
    canonical: 'https://www.ekoraglobalconsulting.com/about/',
  },
  openGraph: {
    title: 'About EGC Ekora Global Consulting | Cosmetic Industrial Consultants',
    description: 'Learn about EGC Ekora Global Consulting, a cosmetic industrial consulting company supporting product development, manufacturing, factory setup, compliance, and growth strategies for beauty businesses worldwide.',
    url: 'https://www.ekoraglobalconsulting.com/about/',
    siteName: 'EGC Ekora Global Consulting',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About EGC Ekora Global Consulting | Cosmetic Industrial Consultants',
    description: 'Learn about EGC Ekora Global Consulting, a cosmetic industrial consulting company supporting product development, manufacturing, factory setup, compliance, and growth strategies for beauty businesses worldwide.',
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.ekoraglobalconsulting.com/about/#aboutpage',
      url: 'https://www.ekoraglobalconsulting.com/about/',
      name: 'About EGC Ekora Global Consulting',
      description:
        'Learn about EGC Ekora Global Consulting, a cosmetic consulting company specializing in product development, manufacturing strategy, regulatory support, and commercialization solutions for beauty and personal care businesses.',
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
    {
      '@type': 'WebPage',
      '@id': 'https://www.ekoraglobalconsulting.com/about/#webpage',
      url: 'https://www.ekoraglobalconsulting.com/about/',
      name: 'About EGC Ekora Global Consulting',
      description:
        'Learn about EGC Ekora Global Consulting, a cosmetic consulting company specializing in product development, manufacturing strategy, regulatory support, and commercialization solutions for beauty and personal care businesses.',
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
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.ekoraglobalconsulting.com/about/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.ekoraglobalconsulting.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About Us',
          item: 'https://www.ekoraglobalconsulting.com/about/',
        },
      ],
    },
  ],
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutPage />
    </>
  );
}
