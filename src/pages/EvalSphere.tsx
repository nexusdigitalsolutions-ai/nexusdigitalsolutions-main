
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '@/assets/logo.png';
import EvalSphereSection from '@/components/sections/EvalSphereSection';

// Lazy load the background particle field for performance
// Lazy load the background particle field for performance
const ParticleField = lazy(() => import('@/components/three/ParticleField'));

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

function SceneLoader() {
    return (
        <div className="fixed inset-0 z-0 bg-slate-950 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

export default function EvalSphere() {
    return (
        <motion.main
            className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-cyan-500/30"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
        >
            {/* Deep Space Background Gradient */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0" />

            {/* Ambient Glows */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />

            {/* Background 3D particles */}
            <Suspense fallback={<SceneLoader />}>
                <div className="fixed inset-0 z-0 opacity-60">
                    <ParticleField />
                </div>
            </Suspense>

            {/* Back Navigation */}
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/5"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <nav className="section-container" aria-label="Eval Sphere navigation">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-200 group"
                            aria-label="Back to home"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                            <span className="text-sm font-medium">Back to Home</span>
                        </Link>

                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 shadow-lg shadow-cyan-500/20 group">
                                <img
                                    src={logoImg}
                                    alt="Nexus Digital Solutions"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-lg font-bold text-white hidden sm:block tracking-wide">
                                Nexus AI
                            </span>
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Hero Banner */}
            <motion.section
                className="relative pt-32 pb-12 md:pt-48 md:pb-24 z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="section-container text-center">
                    <motion.div
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/30 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                        </span>
                        <span className="text-sm text-cyan-200 font-bold uppercase tracking-wider">Production Ready Engine</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
                        EVAL
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-gradient-x"> SPHERE <span className="text-3xl md:text-5xl text-slate-400/80 font-bold ml-2">(QA for AI)</span></span>
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed max-w-[800px]">
                        The ultimate <span className="text-cyan-200 font-semibold">Quality Assurance Framework</span> for next-gen AI.
                        Ensuring trustworthiness through deep analytics and rigorous stress testing.
                    </p>
                </div>
            </motion.section>

            {/* Eval Sphere Content */}
            <EvalSphereSection />

            {/* Footer */}
            <footer className="relative py-12 border-t border-border/50">
                <div className="section-container text-center">
                    <p className="text-muted-foreground text-sm">
                        © 2025 Nexus Digital Solutions. Designing AI for Humans.
                    </p>
                </div>
            </footer>
        </motion.main>
    );
}
