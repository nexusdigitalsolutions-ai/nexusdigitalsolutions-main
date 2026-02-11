import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CapabilitiesSection from '@/components/sections/CapabilitiesSection';
import logoImg from '@/assets/logo.png';
import SecondoryNav from '@/components/sections/SecondoryNav';
import SecondoryFooter from '@/components/sections/SecondoryFooter';

// Lazy load the background particle field for performance
const ParticleField = lazy(() => import('@/components/three/ParticleField'));

function SceneLoader() {
  return (
    <div className="fixed inset-0 z-0 bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function CapabilitySystem() {
  return (
    <motion.main
      className="relative min-h-screen overflow-x-hidden"
      initial={{ opacity: 0, scale: 1.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {/* Background 3D particles */}
      <Suspense fallback={<SceneLoader />}>
        <ParticleField />
      </Suspense>

      {/* Back Navigation */}
      <SecondoryNav />

      {/* Hero Banner */}
      <motion.section
        className="relative pt-32 pb-12 md:pt-40 md:pb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="section-container text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Active System</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            ACCESS
            <span className="gradient-text">.AI</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive AI-powered accessibility features designed to break barriers
            and enable equal access to technology for everyone.
          </p>
        </div>
      </motion.section>

      {/* Capabilities Content */}
      <CapabilitiesSection />

      {/* Footer */}
      <SecondoryFooter />
    </motion.main>
  );
}
