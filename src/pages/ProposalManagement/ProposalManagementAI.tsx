import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProposalManagementSection from '@/components/sections/ProposalManagementSection';
import logoImg from '@/assets/logo.png';

// Lazy load the background particle field for performance
const ParticleField = lazy(() => import('@/components/three/ParticleField'));

function SceneLoader() {
    return (
        <div className="fixed inset-0 z-0 bg-background flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

export default function ProposalManagementAI() {
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
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <nav className="section-container" aria-label="Proposal Management navigation">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                            aria-label="Back to home"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                            <span className="text-sm font-medium">Back to Home</span>
                        </Link>

                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <img
                                src={logoImg}
                                alt="Nexus Digital Solutions"
                                className="w-10 h-10 rounded-full object-cover border border-primary/20"
                            />
                            <span className="text-lg font-bold text-foreground hidden sm:block">
                                Nexus
                            </span>
                        </div>
                    </div>
                </nav>
            </motion.header>

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
                        <span className="text-sm text-primary font-medium">AI-Powered RFP Analysis</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                        PROPOSAL
                        <span className="gradient-text"> MANAGEMENT AI</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Automated RFP Analysis, Scope Generation, and Technical Planning powered by Azure OpenAI and Gemini.
                    </p>
                </div>
            </motion.section>

            {/* Features Content */}
            <ProposalManagementSection />

            {/* Footer */}
            <footer className="relative py-12 border-t border-border/50">
                <div className="section-container text-center">
                    <p className="text-muted-foreground text-sm">
                        © 2025 Nexus Digital Solutions. Empowering Delivery Teams.
                    </p>
                </div>
            </footer>
        </motion.main>
    );
}
