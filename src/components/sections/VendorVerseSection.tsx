
import { motion } from 'framer-motion';
import {
    MessageSquare,
    Eye,
    Shield,
    Mic,
    Database,
    Bot,
    Server
} from 'lucide-react';

// Import feature images
import ragChatbotImg from '@/assets/feature-rag-chatbot.png';
import multimodalVisionImg from '@/assets/feature-multimodal-vision.png';
import secureUserMgmtImg from '@/assets/feature-secure-user-mgmt.png';
import knowledgeBaseImg from '@/assets/feature-knowledge-base.png';
import voiceInteractionImg from '@/assets/feature-voice-interaction.png';
import VendorVerseArchitectureDiagram from '../diagrams/VendorVerseArchitectureDiagram';

interface FeatureCardProps {
    title: string;
    description: string;
    features: string[];
    image: string;
    icon: React.ReactNode;
    index: number;
    tag?: string;
}

// Compact FeatureCard (Reused)
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

                {/* Compact Features List */}
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

export default function VendorVerseSection() {
    const features = [
        {
            title: 'Intelligent RAG Chatbot',
            description: 'Context-aware chatbot using Retrieval-Augmented Generation to answer queries from uploaded CSVs and PDFs.',
            features: ['Context Awareness', 'Document Search', 'Natural Language'],
            image: ragChatbotImg,
            icon: <MessageSquare className="w-6 h-6" />,
            tag: 'Core AI',
        },
        {
            title: 'Multimodal Vision Agent',
            description: 'AI Agent capable of analyzing images alongside text queries for comprehensive troubleshooting.',
            features: ['Image Analysis', 'Visual QA', 'Llama-3.2 Vision'],
            image: multimodalVisionImg,
            icon: <Eye className="w-6 h-6" />,
            tag: 'Vision',
        },
        {
            title: 'Secure User Management',
            description: 'Role-Based Access Control (RBAC) with secure JWT authentication for Admins, Suppliers, and Users.',
            features: ['JWT Auth', 'RBAC', 'Admin Panel'],
            image: secureUserMgmtImg,
            icon: <Shield className="w-6 h-6" />,
            tag: 'Security',
        },
        {
            title: 'Document Knowledge Base',
            description: 'Vector embeddings stored in ChromaDB for fast semantic search and retrieval.',
            features: ['ChromaDB', 'Vector Embeddings', 'Semantic Search'],
            image: knowledgeBaseImg,
            icon: <Database className="w-6 h-6" />,
        },
        {
            title: 'Real-time Voice Interaction',
            description: 'Integrated Web Speech API for seamless voice-to-text communication with the AI assistant.',
            features: ['Speech-to-Text', 'Hands-free', 'Accessibility'],
            image: voiceInteractionImg,
            icon: <Mic className="w-6 h-6" />,
            tag: 'Voice',
        },
        {
            title: 'Real-time Communication',
            description: 'Socket.IO integration for instant bidirectional updates and chat responses.',
            features: ['Socket.IO', 'Live Updates', 'Low Latency'],
            image: ragChatbotImg, // Reusing chatbot image for comms
            icon: <Server className="w-6 h-6" />,
        },
    ];

    return (
        <section
            id="vendor-verse-features"
            className="relative py-12 md:py-20"
            aria-labelledby="vendor-verse-title"
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
                        id="vendor-verse-title"
                        className="text-2xl md:text-3xl font-bold text-foreground mb-4"
                    >
                        Intelligent <span className="gradient-text">Supplier Support</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        A full-stack AI platform combining RAG, Computer Vision, and Real-time Communication to revolutionize vendor interactions.
                    </p>
                </motion.div>

                {/* Architecture Diagram */}
                <div className="mb-24 w-full">
                    <div className="text-center mb-8">
                        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">System Architecture</p>
                        <h3 className="text-2xl font-bold text-foreground">RAG & Vision Pipeline</h3>
                    </div>
                    <VendorVerseArchitectureDiagram />
                </div>

                {/* Feature Grid Header */}
                <div className="mt-24 mb-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        Platform Capabilities
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore the powerful modules powering VendorVerse.
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
