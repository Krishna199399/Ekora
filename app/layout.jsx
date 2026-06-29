import './globals.css';
import ClientWrapper from './ClientWrapper';

export const metadata = {
  title: 'EGC - Ekora Global Consulting | Engineering Excellence In Every Drop',
  description:
    'EGC Ekora Global Consulting bridges the gap between boutique chemical breakthroughs and high-volume, GMP-compliant manufacturing environments. Explore our cosmetic R&D formulation services, factory architecture planning, and regulatory compliance solutions.',
  keywords:
    'cosmetic consulting, formulation science, factory blueprinting, cosmetic R&D, GMP-compliant, BIS compliance, FDA compliance, CDSCO, EGC, Ekora Global Consulting',
  authors: [{ name: 'Ekora Global Consulting' }],
  robots: 'index, follow',
  openGraph: {
    title: 'EGC - Ekora Global Consulting | Engineering Excellence In Every Drop',
    description:
      'Bridging boutique chemical breakthroughs with high-volume, GMP-compliant manufacturing. Cosmetic R&D, factory blueprinting, and regulatory compliance.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Ekora Global Consulting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EGC - Ekora Global Consulting',
    description: 'Engineering Excellence In Every Drop. Cosmetic R&D + Factory Architecture.',
  },
};

import { ConsultationModalProvider } from '../src/context/ConsultationModalContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/ekora-global-consulting-logo-black.png" />
      </head>
      <body>
        <ConsultationModalProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </ConsultationModalProvider>
      </body>
    </html>
  );
}
