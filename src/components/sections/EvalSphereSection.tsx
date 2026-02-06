
import { motion } from 'framer-motion';
import EvalSphereFlowDiagram from '@/components/diagrams/EvalSphereFlowDiagram';
import {
    ShieldCheck,
    Target,
    Activity,
    Scale,
    Cpu,
    BarChart3,
    Zap,
    Bot
} from 'lucide-react';

interface ComponentProps {
    title: string;
    description: string;
    features: string[];
    icon: React.ReactNode;
    index: number;
    tag?: string;
}

function FeatureCard({ title, description, features, icon, index, tag }: ComponentProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col h-full"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="p-6 flex flex-col h-full relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-cyan-950/50 text-cyan-400 group-hover:text-cyan-300 border border-cyan-900/50 group-hover:border-cyan-500/30 transition-colors">
                        {icon}
                    </div>
                    {tag && (
                        <span className="px-2 py-1 text-xs font-bold rounded-full bg-slate-800/50 text-slate-300 border border-slate-700/50">
                            {tag}
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                    {title}
                </h3>

                <p className="text-sm text-slate-400 mb-4 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {description}
                </p>

                <ul className="space-y-2 mt-auto">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

export default function EvalSphereSection() {
    const keyFeatures = [
        {
            title: 'GenAI SHAP Engine',
            description: 'Retrieves context from Vector DB, computes chunk contributions, and derives metrics for Context Recall and Faithfulness.',
            features: ['Context Recall', 'Faithfulness Metrics', 'Chunk Contribution'],
            icon: <Zap className="w-6 h-6" />,
            tag: 'Core Engine'
        },
        {
            title: 'Automated Test Gen',
            description: 'Uses LLMs to automatically generate comprehensive test suites based on high-level scenario descriptions.',
            features: ['AI-Powered Generation', 'Scenario-Based Testing', 'Comprehensive Coverage'],
            icon: <Bot className="w-6 h-6" />,
            tag: 'Automation'
        },
        {
            title: 'Fairness (Bias) Analysis',
            description: 'Analyzes attention distribution using SHAP entropy to detect if the model is over-relying on specific patterns.',
            features: ['Attention Distribution', 'SHAP Entropy', 'Bias Detection'],
            icon: <Scale className="w-6 h-6" />,
            tag: 'Ethics'
        },
        {
            title: 'Resilience Testing',
            description: 'Evaluates how the system handles irrelevant noise and adversarial inputs without breaking.',
            features: ['Noise Handling', 'Adversarial Inputs', 'System Stability'],
            icon: <ShieldCheck className="w-6 h-6" />,
            tag: 'Security'
        },
        {
            title: 'RAG & Vector DB Integration',
            description: 'Fetches relevant knowledge base chunks for evaluation to distinguish between hallucinations and grounded answers.',
            features: ['Knowledge Base Fetching', 'Hallucination Detection', 'Grounded Answers'],
            icon: <Cpu className="w-6 h-6" />,
            tag: 'Integration'
        },
        {
            title: 'Deployment Readiness',
            description: 'Aggregate score determining transparency, reliability, and if a model is production-ready.',
            features: ['Readiness Score', 'Interactive Dashboards', 'PDF Reporting'],
            icon: <Activity className="w-6 h-6" />,
            tag: 'Analytics'
        }
    ];

    return (
        <section className="relative py-16 md:py-24 overflow-hidden">
            {/* Section Background */}
            <div className="absolute inset-0 bg-slate-950/80 z-0" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />

            <div className="section-container relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Multi-Dimensional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Quality Evaluation</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                        Eval Sphere (QA for AI) evaluates AI agents across five key pillars: Accuracy, Robustness, Resilience, Fairness, and Cost Efficiency.
                    </p>
                </div>

                {/* Interactive Flow Diagram */}
                <div className="mb-24 w-full">
                    <div className="text-center mb-8">
                        <p className="text-sm font-bold text-cyan-500 uppercase tracking-widest mb-3">Architecture & Flow</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">Scoring Pipeline & Workflow</h3>
                    </div>
                    <EvalSphereFlowDiagram />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {keyFeatures.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            features={feature.features}
                            icon={feature.icon}
                            index={index}
                            tag={feature.tag}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
