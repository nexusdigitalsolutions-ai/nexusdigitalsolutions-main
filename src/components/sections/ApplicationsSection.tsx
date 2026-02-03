import { motion } from 'framer-motion';
import { FileText, Brain, Shield, ChevronRight } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ApplicationCardProps {
  title: string;
  features: string[];
  icon: ReactNode;
  isActive: boolean;
  comingSoon?: boolean;
  onClick?: () => void;
  isTransitioning?: boolean;
}

function ApplicationCard({ title, features, icon, isActive, comingSoon, onClick, isTransitioning }: ApplicationCardProps) {
  return (
    <motion.div
      className={`relative glass-card p-6 md:p-8 h-full cursor-pointer ${isActive ? 'neon-border-active' : ''} ${comingSoon ? 'coming-soon-blur' : ''}`}
      whileHover={isActive ? { scale: 1.02, y: -5 } : undefined}
      transition={{ duration: 0.3 }}
      onClick={isActive && onClick ? onClick : undefined}
      layoutId={isActive ? "capability-card" : undefined}
      animate={isTransitioning ? {
        scale: 20,
        opacity: 0,
        zIndex: 100
      } : {
        scale: 1,
        opacity: 1
      }}
    >
      {/* Card content */}
      <motion.div
        className={`relative ${comingSoon ? 'opacity-50 blur-sm' : ''}`}
        animate={isTransitioning ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Icon */}
        <div className="w-14 h-14 mb-6 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
          {title}
        </h3>

        {/* Features List */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-muted-foreground">
              <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-sm md:text-base">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {isActive && (
          <span
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
            aria-label={`Explore ${title}`}
          >
            Explore System
            <ChevronRight className="w-4 h-4" />
          </span>
        )}
      </motion.div>

      {/* Coming Soon Badge */}
      {comingSoon && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.span
            className="px-6 py-3 rounded-full bg-secondary/80 text-secondary-foreground font-semibold text-lg backdrop-blur-sm border border-secondary"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Coming Soon
          </motion.span>
        </div>
      )}
    </motion.div>
  );
}

export default function ApplicationsSection() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCapabilityClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/capability-system');
    }, 400);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="applications"
      className="relative py-24 md:py-32"
      aria-labelledby="applications-title"
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="applications-title"
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            Assistive AI for{' '}
            <span className="gradient-text">Accessibility</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Modular, reusable AI Tools designed for disabled and differently-abled users.
          </p>
        </motion.div>

        {/* Applications Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Capability System - Active */}
          <motion.div variants={itemVariants}>
            <ApplicationCard
              title="Access AI"
              features={[
                'Intelligent Document Processing',
                'Neural Text-to-Speech',
                'Conversational Forms',
                'Biometric Security',
              ]}
              icon={<Brain className="w-7 h-7" />}
              isActive={true}
              onClick={handleCapabilityClick}
              isTransitioning={isTransitioning}
            />
          </motion.div>

          {/* Application 2 - Coming Soon */}
          <motion.div variants={itemVariants}>
            <ApplicationCard
              title="Enterprise Suite"
              features={[
                'Advanced Analytics',
                'Team Collaboration',
                'Custom Integrations',
                'Priority Support',
              ]}
              icon={<FileText className="w-7 h-7" />}
              isActive={false}
              comingSoon={true}
            />
          </motion.div>

          {/* Application 3 - Coming Soon */}
          <motion.div variants={itemVariants}>
            <ApplicationCard
              title="Developer Tools"
              features={[
                'API Access',
                'SDK Libraries',
                'Webhooks',
                'Documentation',
              ]}
              icon={<Shield className="w-7 h-7" />}
              isActive={false}
              comingSoon={true}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
