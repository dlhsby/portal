import { AboutSection } from '@/components/AboutSection';
import { AppsSection } from '@/components/AppsSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { SsoComingSoon } from '@/components/SsoComingSoon';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AppsSection />
        <AboutSection />
        <SsoComingSoon />
      </main>
      <Footer />
    </>
  );
}
