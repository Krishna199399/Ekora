import AboutPage from '../../src/site-pages/AboutPage';

export const metadata = {
  title: 'About EGC Ekora Global Consulting | Cosmetic Industrial Consultants',
  description:
    'Learn about EGC Ekora Global Consulting, a cosmetic industrial consulting company supporting product development, manufacturing, factory setup, compliance, and growth strategies for beauty businesses worldwide.',
  alternates: {
    canonical: 'https://www.ekoraglobalconsulting.com/about/'
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
  }
};

export default function About() {
  return <AboutPage />;
}
