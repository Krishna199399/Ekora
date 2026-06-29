import PrivacyPage from '../../src/site-pages/PrivacyPage';

export const metadata = {
  title: 'Privacy Policy | EGC Ekora Global Consulting',
  description:
    'Read the Privacy Policy of EGC Ekora Global Consulting. Learn about how we collect, use, and protect your information when you engage our cosmetic formulation and engineering advisory services.',
  alternates: {
    canonical: 'https://www.ekoraglobalconsulting.com/privacy/'
  },
  openGraph: {
    title: 'Privacy Policy | EGC Ekora Global Consulting',
    description: 'Read the Privacy Policy of EGC Ekora Global Consulting. Learn about how we collect, use, and protect your information when you engage our cosmetic formulation and engineering advisory services.',
    url: 'https://www.ekoraglobalconsulting.com/privacy/',
    siteName: 'EGC Ekora Global Consulting',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | EGC Ekora Global Consulting',
    description: 'Read the Privacy Policy of EGC Ekora Global Consulting. Learn about how we collect, use, and protect your information when you engage our cosmetic formulation and engineering advisory services.',
  }
};

export default function Privacy() {
  return <PrivacyPage />;
}
