import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
// Agent Loop section hidden — re-add <Workflow /> below to show it again.
// import Workflow from '@/components/Workflow';
import Technology from '@/components/Technology';
import Roadmap from '@/components/Roadmap';
import Comparison from '@/components/Comparison';
import Overview from '@/components/Overview';
import Footer from '@/components/Footer';
import Faq from '@/components/Faq';
import Pricing from '@/components/Pricing';
import ContactModal from '@/components/ContactModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useEffect } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { trackOutboundClicks } from '@/lib/track';

function App() {
  const ref = useReveal<HTMLDivElement>();
  useEffect(() => trackOutboundClicks(), []);

  return (
    <div ref={ref} className="min-h-screen bg-ink-950 text-bone-50">
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Technology />
        <Roadmap />
        <Comparison />
        <Overview />
        <Pricing />
        <Faq />
      </main>
      <Footer />
      <WhatsAppButton />
      <ContactModal />
    </div>
  );
}

export default App;
