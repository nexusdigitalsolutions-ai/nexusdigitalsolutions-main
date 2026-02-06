import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import ProposalArchitectureDiagram from '@/components/diagrams/ProposalArchitectureDiagram';
import {
    FileText,
    Brain,
    Layout,
    Clock,
    Database,
    Server
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

export default function ProposalManagementSection() {
    const features = [
        {
            title: 'Automated RFP Analysis',
            description: 'Instantly processes lengthy RFP documents (30-40+ pages) to extract requirements and business context involving manual effort.',
            features: ['PDF/Docx Parsing', 'Requirement Extraction', 'Risk Identification'],
            icon: <FileText className="w-6 h-6" />,
            tag: 'Processing',
        },
        {
            title: 'Functional Scope Generator',
            description: 'AI-driven generation of detailed functional scopes, modules, and user workflows tailored to the RFP.',
            features: ['Module Breakdown', 'User Story Mapping', 'Gap Analysis'],
            icon: <Brain className="w-6 h-6" />,
            tag: 'Core AI',
        },
        {
            title: 'Tech Stack Recommendation',
            description: 'Intelligent suggestions for frontend, backend, and database technologies based on project constraints and scalability needs.',
            features: ['Architecture Planning', 'Trade-off Analysis', 'Cloud Native Options'],
            icon: <Server className="w-6 h-6" />,
            tag: 'Architecture',
        },
        {
            title: 'Estimation & Planning',
            description: 'Calculates resource requirements, timeline estimates, and team composition based on the generated scope.',
            features: ['Resource Loading', 'Cost Estimation', 'Timeline Generation'],
            icon: <Clock className="w-6 h-6" />,
            tag: 'Planning',
        },
        {
            title: 'Proposal History Repository',
            description: 'Centralized storage of previously analyzed proposals to leverage organizational knowledge and speed up new bids.',
            features: ['Vector Search', 'Historical Insights', 'Reusability'],
            icon: <Database className="w-6 h-6" />,
        },
        {
            title: 'Visual Architecture',
            description: 'Generates interactive diagrams showing module interactions, data flow, and integration points.',
            features: ['System Design', 'Data Flow', 'Integration Mapping'],
            icon: <Layout className="w-6 h-6" />,
        },
    ];

    return (
        <section className="relative py-12 md:py-20">
            <div className="section-container relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        Intelligent <span className="gradient-text">Proposal Workflow</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Transforming the pre-sales process with an integrated AI suite that handles everything from document ingestion to final estimation.
                    </p>
                </motion.div>

                {/* Architecture Visual (Animated) */}
                <div className="mb-24 w-full">
                    <div className="text-center mb-12">
                        <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                            Architecture
                        </span>
                        <h3 className="text-2xl font-bold text-foreground">Intelligent Processing Pipeline</h3>
                    </div>
                    <ProposalArchitectureDiagram />
                </div>

                {/* Feature Grid Header */}
                <div className="mt-24 mb-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        Platform Capabilities
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Core modules designing to accelerate delivery.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.title}
                            {...feature}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
