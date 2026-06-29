import TermsConditionsPage from '../../src/site-pages/TermsConditionsPage';

export const metadata = {
  title: 'Terms & Conditions | EGC Ekora Global Consulting',
  description:
    'Read the Terms & Conditions of EGC Ekora Global Consulting. Learn about the terms governing our cosmetic formulation design, engineering consulting, and technical advisory services.',
  alternates: {
    canonical: 'https://www.ekoraglobalconsulting.com/terms-conditions/'
  },
  openGraph: {
    title: 'Terms & Conditions | EGC Ekora Global Consulting',
    description: 'Read the Terms & Conditions of EGC Ekora Global Consulting. Learn about the terms governing our cosmetic formulation design, engineering consulting, and technical advisory services.',
    url: 'https://www.ekoraglobalconsulting.com/terms-conditions/',
    siteName: 'EGC Ekora Global Consulting',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | EGC Ekora Global Consulting',
    description: 'Read the Terms & Conditions of EGC Ekora Global Consulting. Learn about the terms governing our cosmetic formulation design, engineering consulting, and technical advisory services.',
  }
};

export default function TermsConditions() {
  return <TermsConditionsPage />;
}
