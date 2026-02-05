
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    ClipboardList,
    Cpu,
    LineChart,
    MessageSquare,
    ShieldCheck,
    Zap,
    Bot,
    Loader
} from 'lucide-react';

// Import feature images
import dashboardMonitoringImg from '@/assets/feature-dashboard-monitoring.png';
import maintenanceManagementImg from '@/assets/feature-maintenance-management.png';
import predictiveAnalysisImg from '@/assets/feature-predictive-analysis.png';
import aiAssistantImg from '@/assets/feature-ai-assistant.png';
import PredictiveFlowDiagram from '../diagrams/PredictiveFlowDiagram';

// Reuse the generic 3D tree or create a specific one if needed. 
// For now, reusing CapabilitiesTree to maintain consistency as requested ("follow other page theme").
import CapabilitiesTree from '../three/CapabilitiesTree';

interface FeatureCardProps {
    title: string;
    description: string;
    features: string[];
    image: string;
    icon: React.ReactNode;
    index: number;
    tag?: string;
}

// Compact FeatureCard (Reused from CapabilitiesSection)
function FeatureCard({ title, description, features, image, icon, index, tag }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
        >
            {/* Image Height - Compact */}
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 z-10 group-hover:bg-transparent transition-colors duration-300" />
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
                {/* Icon Overlay */}
                <div className="absolute bottom-3 left-3 z-20 w-10 h-10 rounded-lg bg-background/90 backdrop-blur border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                    {icon}
                </div>

                {/* Feature Tag (Top Right) */}
                {tag && (
                    <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-bold shadow-sm backdrop-blur-md border border-white/10">
                        {tag}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {description}
                </p>

                {/* Compact Features List - Fade in on hover/always visible but small */}
                <ul className="space-y-1.5 mt-auto pt-4 border-t border-border/30">
                    {features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-foreground/70">
                            <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

export default function PredictiveMaintenanceSection() {
    const features = [
        {
            title: 'Dashboard & Monitoring',
            description: 'Real-time view of equipment Operating, Under Maintenance, or Out of Service, with telemetry logs for temperature, vibration, and pressure.',
            features: ['Real-time Status', 'Telemetry Logs', 'Visual Severity Indicators'],
            image: dashboardMonitoringImg,
            icon: <Activity className="w-6 h-6" />,
            tag: 'Real-time',
        },
        {
            title: 'Maintenance Management',
            description: 'Comprehensive log management with manual entry capabilities and AI-powered validation to ensure accuracy.',
            features: ['Log Management', 'AI Validation', 'Historical Data Access'],
            image: maintenanceManagementImg,
            icon: <ClipboardList className="w-6 h-6" />,
            tag: 'Core',
        },
        {
            title: 'Predictive Analysis',
            description: 'Trigger AI agents to scan equipment data, generating prediction reports with confidence scores and severity assessments.',
            features: ['One-Click Analysis', 'Confidence Scoring', 'Severity Assessment'],
            image: predictiveAnalysisImg,
            icon: <LineChart className="w-6 h-6" />,
            tag: 'AI Powered',
        },
        {
            title: 'Interactive AI Assistant',
            description: 'A dedicated Chatbot interface to answer technical questions and provide quick actions for common tasks.',
            features: ['Natural Language Query', 'Quick Actions', 'RAG Documentation'],
            image: aiAssistantImg,
            icon: <MessageSquare className="w-6 h-6" />,
        },
        {
            title: 'Predictive Maintenance Agent',
            description: 'Autonomous agent that analyzes monitoring logs to predict equipment failures and create maintenance logs automatically.',
            features: ['Failure Prediction', 'Auto-Log Creation', 'Final Report Generation'],
            image: predictiveAnalysisImg, // Reusing predictive image for agent
            icon: <Bot className="w-6 h-6" />,
            tag: 'Autonomous',
        },
        {
            title: 'Maintenance Validation Agent',
            description: 'Validates human-reported logs against actual monitoring data to ensure reporting accuracy.',
            features: ['Data Comparison', 'Accuracy Verification', 'Validation Reports'],
            image: maintenanceManagementImg, // Reusing maintenance image for agent
            icon: <ShieldCheck className="w-6 h-6" />,
            tag: 'Verification',
        },
    ];

    return (
        <section
            id="capabilities"
            className="relative py-12 md:py-20"
            aria-labelledby="capabilities-title"
        >
            <div className="section-container relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2
                        id="capabilities-title"
                        className="text-2xl md:text-3xl font-bold text-foreground mb-4"
                    >
                        AI-Driven <span className="gradient-text">Predictive Maintenance</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Leveraging Python-based AI agents, vector embeddings, and LLMs to predict equipment failures, validate maintenance logs, and provide actionable insights before issues occur.
                    </p>
                </motion.div>

                {/* Interactive Flow Diagram */}
                <div className="mb-24 w-full">
                    <div className="text-center mb-8">
                        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">How It Works</p>
                        <h3 className="text-2xl font-bold text-foreground">Intelligent Diagnostics Pipeline</h3>
                    </div>
                    <PredictiveFlowDiagram />
                </div>

                {/* Feature Grid Header */}
                <div className="mt-24 mb-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        System Features
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore the key components of our predictive maintenance architecture.
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
