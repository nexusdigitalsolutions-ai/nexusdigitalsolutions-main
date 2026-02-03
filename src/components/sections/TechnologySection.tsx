import { motion } from 'framer-motion';
import { 
  Code2, 
  Brain, 
  Database, 
  Server, 
  Eye, 
  Fingerprint,
  Cpu
} from 'lucide-react';

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  delay: number;
}

function TechCard({ icon, title, items, delay }: TechCardProps) {
  return (
    <motion.div
      className="tech-card"
      initial={{ opacity: 0, y: 30, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 30px hsl(var(--neon-cyan) / 0.3)',
      }}
      style={{ animationDelay: `${delay * 2}s` }}
    >
      {/* Holographic effect */}
      <div className="absolute inset-0 holographic rounded-xl opacity-50" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-14 h-14 mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-3">
          {title}
        </h3>
        
        {/* Items */}
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function TechnologySection() {
  const technologies = [
    {
      icon: <Code2 className="w-7 h-7" />,
      title: 'Frontend',
      items: ['React', 'Vite', 'TypeScript', 'Three.js'],
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: 'AI Models',
      items: ['GPT-4', 'Whisper', 'DALL-E', 'Custom LLMs'],
    },
    {
      icon: <Server className="w-7 h-7" />,
      title: 'Backend',
      items: ['FastAPI', 'Python', 'Node.js'],
    },
    {
      icon: <Database className="w-7 h-7" />,
      title: 'Data',
      items: ['PostgreSQL', 'Vector DBs', 'Redis'],
    },
    {
      icon: <Eye className="w-7 h-7" />,
      title: 'Vision AI',
      items: ['Face Recognition', 'OCR', 'Object Detection'],
    },
    {
      icon: <Fingerprint className="w-7 h-7" />,
      title: 'Biometrics',
      items: ['Voice Auth', 'Face Auth', 'Fingerprint'],
    },
  ];

  return (
    <section
      id="technology"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="technology-title"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      <div className="section-container relative z-10">
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
              className="p-4 rounded-full bg-secondary/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Cpu className="w-10 h-10 text-secondary" />
            </motion.div>
          </div>
          
          <h2
            id="technology-title"
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            Built with{' '}
            <span className="gradient-text">Modern Technology</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade infrastructure designed for security, scalability, and performance.
          </p>
        </motion.div>
        
        {/* Technology Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <TechCard
              key={tech.title}
              {...tech}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
