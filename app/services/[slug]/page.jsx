import { notFound } from 'next/navigation';
import { getServiceBySlug, getAllServiceSlugs } from '../../../src/data/servicesData';
import ServiceDetailPage from '../../../src/site-pages/services/ServiceDetailPage';

// ─────────────────────────────────────────────────────────────────────────────
// generateStaticParams — pre-generates all 13 service pages at build time (SSG)
// ─────────────────────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllServiceSlugs();
}

// ─────────────────────────────────────────────────────────────────────────────
// generateMetadata — per-page SEO metadata driven by servicesData
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | EGC Ekora Global Consulting',
      description: 'The requested service page could not be found.',
    };
  }

  return {
    title: service.meta.title,
    description: service.meta.description,
    keywords: service.meta.keywords || `cosmetic consulting, ${service.name.toLowerCase()}, EGC Ekora, cosmetic industry, ${service.eyebrow.toLowerCase()}`,
    authors: [{ name: 'Ekora Global Consulting' }],
    robots: 'index, follow',
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      type: 'website',
      locale: 'en_US',
      siteName: 'Ekora Global Consulting',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.meta.title,
      description: service.meta.description,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────
export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  // Show Next.js 404 page for unknown slugs
  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}
