import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
    Shield,
    DollarSign,
    Wifi,
    Smartphone,
    FileText,
    Lock,
    Zap,
    Cloud
} from 'lucide-react';

interface FeatureCardProps {
    title: string;
    description: string;
    features: string[];
    icon: ReactNode;
    index: number;
    tag?: string;
}

function FeatureCard({ title, description, features, icon, index, tag }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
        >
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        {icon}
                    </div>
                    {tag && (
                        <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] uppercase tracking-wider font-bold border border-primary/30">
                            {tag}
                        </div>
                    )}
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {description}
                </p>

                <ul className="space-y-2 mt-auto pt-4 border-t border-border/30">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-foreground/80">
                            <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

interface ProblemItemProps {
    text: string;
    index: number;
}

function ProblemItem({ text, index }: ProblemItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-start gap-3 p-4 bg-destructive/5 border border-destructive/20 rounded-lg"
        >
            <div className="w-2 h-2 rounded-full bg-destructive flex-shrink-0 mt-1.5" />
            <p className="text-sm text-foreground/80">{text}</p>
        </motion.div>
    );
}

export default function AntiGravitySection() {
    const problems = [
        'Force users into $12-30/month perpetual subscriptions',
        'Upload sensitive documents to cloud servers for AI processing',
        'Lack transparency about data usage and AI training practices',
        'Require constant internet connectivity for basic features'
    ];

    const differentiators = [
        {
            title: 'Privacy Architecture',
            description: 'Documents never stored in the cloud; AI requests are stateless and anonymized for maximum data protection.',
            features: ['On-Device Processing', 'Stateless AI Requests', 'Zero Cloud Storage', 'Anonymous Processing'],
            icon: <Shield className="w-6 h-6" />,
            tag: 'Security First',
        },
        {
            title: 'Transparent Pricing',
            description: 'Free tier with generous limits plus one-time lifetime purchase option - no subscriptions, no recurring fees.',
            features: ['Free Tier Available', 'One-Time Payment', 'No Hidden Costs', 'Lifetime Updates'],
            icon: <DollarSign className="w-6 h-6" />,
            tag: 'Fair Pricing',
        },
        {
            title: 'Technical Sovereignty',
            description: '80% of features work completely offline, ensuring productivity even without internet connectivity.',
            features: ['Offline-First Design', 'Local Processing', 'No Internet Required', 'Full Control'],
            icon: <Wifi className="w-6 h-6" />,
            tag: 'Independence',
        },
        {
            title: 'Cross-Platform',
            description: 'Single codebase powers Web, Android, and iOS applications with native performance and user experience.',
            features: ['Web Application', 'Android App', 'iOS App', 'Unified Experience'],
            icon: <Smartphone className="w-6 h-6" />,
            tag: 'Universal',
        },
    ];

    const features = [
        {
            title: 'Professional PDF Tools',
            description: 'Complete suite of PDF editing, annotation, and manipulation tools with enterprise-grade quality.',
            features: ['Advanced Editing', 'Annotations', 'Form Filling', 'Digital Signatures'],
            icon: <FileText className="w-6 h-6" />,
        },
        {
            title: 'AI-Powered Intelligence',
            description: 'Optional AI features through privacy-preserving proxy for smart document analysis and processing.',
            features: ['Document Summarization', 'Smart Search', 'Auto-Tagging', 'Content Extraction'],
            icon: <Zap className="w-6 h-6" />,
        },
        {
            title: 'Local-First Architecture',
            description: 'All processing happens on your device, ensuring maximum privacy and performance without cloud dependencies.',
            features: ['Fast Processing', 'No Upload Delays', 'Complete Privacy', 'Instant Access'],
            icon: <Lock className="w-6 h-6" />,
        },
        {
            title: 'Privacy-Preserving AI Proxy',
            description: 'When AI features are needed, requests are anonymized and stateless, protecting your sensitive data.',
            features: ['Stateless Requests', 'Data Anonymization', 'No Training Use', 'Transparent Processing'],
            icon: <Cloud className="w-6 h-6" />,
        },
    ];

    return (
        <section className="relative py-12 md:py-20">
            <div className="section-container relative z-10">
                {/* The Problem Section */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-8">
                        <span className="px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                            The Problem
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                            The $14B PDF Software Market Crisis
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                            Dominated by subscription-heavy, cloud-dependent tools (Adobe, Foxit, SmallPDF) that:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {problems.map((problem, index) => (
                            <ProblemItem key={index} text={problem} index={index} />
                        ))}
                    </div>
                </motion.div>

                {/* The Solution Section */}
                <motion.div
                    className="mb-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                        The Solution
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        Anti-Gravity: <span className="gradient-text">Local-First AI PDF Toolkit</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        A privacy-first PDF toolkit that processes documents on-device with optional AI intelligence through a privacy-preserving proxy. Built on React/Capacitor for true cross-platform deployment (Web, Android, iOS), offering professional-grade PDF tools with a one-time payment model.
                    </p>
                </motion.div>

                {/* Key Differentiators */}
                <div className="mb-20">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            Key <span className="gradient-text">Differentiators</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            What sets Anti-Gravity apart from traditional PDF software
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {differentiators.map((feature, index) => (
                            <FeatureCard
                                key={feature.title}
                                {...feature}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Platform Features */}
                <div className="mt-24">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            Platform <span className="gradient-text">Features</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive capabilities designed for privacy and performance
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={feature.title}
                                {...feature}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
