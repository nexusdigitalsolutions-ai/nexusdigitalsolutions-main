import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ApplicationsSection from '@/components/sections/ApplicationsSection';
import AccessibilitySection from '@/components/sections/AccessibilitySection';
import TechnologySection from '@/components/sections/TechnologySection';
import Footer from '@/components/sections/Footer';

// Lazy load the background particle field for performance
const ParticleField = lazy(() => import('@/components/three/ParticleField'));

// Loading fallback for 3D scenes
function SceneLoader() {
  return (
    <div className="fixed inset-0 z-0 bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Index() {
  return (
    <motion.main
      className="relative min-h-screen overflow-x-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background 3D particles */}
      <Suspense fallback={<SceneLoader />}>
        <ParticleField />
      </Suspense>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Page Sections */}
      <HeroSection />
      <ApplicationsSection />
      <AccessibilitySection />
      <TechnologySection />
      <Footer />
    </motion.main>
  );
}
