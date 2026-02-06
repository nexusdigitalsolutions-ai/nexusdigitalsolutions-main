import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from '@/context/PageTransitionContext';
import { Loader2, Brain } from 'lucide-react';

export default function PageLoader() {
    const { isTransitioning, loadingText } = usePageTransition();

    // Simplified loader without body scroll locking to prevent viewport jumps on mobile


    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    className="fixed top-0 left-0 w-screen h-[100dvh] z-[9999] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center text-center touch-none overscroll-none m-0 p-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Logo / Icon Pulse */}
                    <motion.div
                        className="w-20 h-20 mb-8 relative flex items-center justify-center rounded-full bg-primary/10 border border-primary/20"
                        animate={{ scale: [0.9, 1.1, 0.9], borderColor: ["rgba(var(--primary), 0.2)", "rgba(var(--primary), 0.6)", "rgba(var(--primary), 0.2)"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Brain className="w-10 h-10 text-primary" />
                        {/* Spinning Ring */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>

                    <motion.h2
                        className="text-2xl font-bold text-foreground mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.2 }}
                    >
                        {loadingText || 'Initializing System...'}
                    </motion.h2>

                    {/* <motion.p
                        className="text-muted-foreground text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Loading Application Modules
                    </motion.p> */}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
