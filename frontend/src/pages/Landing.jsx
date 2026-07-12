import PublicNavbar from '../components/layout/PublicNavbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import HeroSection from '../components/landing/HeroSection.jsx';
import AboutSection from '../components/landing/AboutSection.jsx';
import FeaturesSection from '../components/landing/FeaturesSection.jsx';
import CTASection from '../components/landing/CTASection.jsx';

export default function Landing() {
  return (
    <div>
      <PublicNavbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}