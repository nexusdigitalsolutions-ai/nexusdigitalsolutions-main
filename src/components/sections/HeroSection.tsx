import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import AICoreSphere from '../three/AICoreSphere';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* 3D AI Core Background */}
      <AICoreSphere />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none z-5" />

      {/* Content */}
      <div className="relative z-20 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-foreground">Nexus</span>{' '}
            <span className="gradient-text">Digital</span>
            <br />
            <span className="text-foreground">Solutions</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Access AI Capabilities for Everyone
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <a
              href="#applications"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full 
                         bg-transparent border-2 border-primary/50 
                         text-primary font-semibold text-lg
                         hover:bg-primary/10 hover:border-primary hover:shadow-lg
                         transition-all duration-300 box-glow-cyan
                         focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Explore AI capabilities"
            >
              Explore Capabilities
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute  left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-5 h-5" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
