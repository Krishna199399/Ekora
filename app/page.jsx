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
};

export default function HomePage() {
  return (
    <>
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
