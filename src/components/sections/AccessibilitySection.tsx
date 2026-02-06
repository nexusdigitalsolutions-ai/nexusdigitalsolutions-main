import { motion } from 'framer-motion';
import {
  Sparkles,
  Bot,
  Layout,
  Brain,
  Zap,
  Users,
  Heart
} from 'lucide-react';

interface AccessibilityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function AccessibilityCard({ icon, title, description, delay }: AccessibilityCardProps) {
  return (
    <motion.div
      className="glass-card p-6 text-center group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

export default function AccessibilitySection() {
  const categories = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Context-Aware Models',
      description: 'LLMs fine-tuned on your business data to understand intent, not just keywords.',
    },
    {
      icon: <Layout className="w-8 h-8" />,
      title: 'Generative UI Systems',
      description: 'Interfaces that adapt in real-time, rendering the perfect controls for every task.',
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'Autonomous Agents',
      description: 'AI workers that proactively execute complex workflows behind the scenes.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Hyper-Personalization',
      description: 'Experiences that evolve with every interaction, anticipating user needs.',
    },
  ];

  return (
    <section
      id="accessibility"
      className="relative py-24 md:py-32"
      aria-labelledby="accessibility-title"
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
          <div className="flex justify-center mb-6">
            <motion.div
              className="p-4 rounded-full bg-accent/10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="w-10 h-10 text-accent" />
            </motion.div>
          </div>

          <h2
            id="accessibility-title"
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            Engineering <span className="gradient-text">Next-Gen Experiences</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We don't just build chatbots. We create intelligent, adaptive AI models that
            fundamentally reshape how users interact with technology.
          </p>
        </motion.div>

        {/* Accessibility Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <AccessibilityCard
              key={category.title}
              {...category}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Visual element - wave pattern */}
        <motion.div
          className="relative h-32 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="flex gap-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-primary rounded-full"
                  animate={{ height: [10, 40 + Math.random() * 40, 10] }}
                  transition={{
                    duration: 1 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Inclusive message */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-muted/50 border border-border">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">
              Designed for <span className="text-foreground font-medium">Humans</span>,
              Not Just Users
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
