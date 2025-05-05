import { HeroSection } from '../components/landing/HeroSection';
import { ChallengeSection } from '../components/landing/ChallengeSection';
import { FeatureSection } from '../components/landing/FeatureSection';
import { BenefitsSection } from '../components/landing/BenefitsSection';
import { DashboardPreview } from '../components/landing/DashboardPreview';
import { CallToAction } from '../components/landing/CallToAction';
import { Footer } from '../components/landing/Footer';
import { Navbar } from '../components/landing/Navbar';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ChallengeSection />
      <div id="features">
        <FeatureSection />
      </div>
      <div id="benefits">
        <BenefitsSection />
      </div>
      <DashboardPreview />
      <CallToAction />
      <Footer />
    </div>
  );
}
