
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database,
    Wind,
    History,
    Brain,
    Wrench,
    LineChart,
    CalendarClock
} from 'lucide-react';

const FlowCard = ({ icon, title, description, delay, position }: { icon: any, title: string, description: string, delay: number, position: 'left' | 'right' | 'center' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={cardRef} className={`relative w-full z-20`}>
            <motion.div
                layout
                className={`relative p-1.5 md:p-5 rounded-xl border border-primary/20 bg-card/40 backdrop-blur-sm flex flex-col items-center text-center gap-1 md:gap-3 cursor-pointer overflow-hidden
                    ${position === 'center' ? 'border-primary/50 bg-primary/10 shadow-[0_0_30px_rgba(var(--primary),0.3)] scale-110' : 'hover:border-primary/40 hover:bg-card/60'}
                `}
                initial={{ opacity: 0, x: position === 'left' ? -50 : position === 'right' ? 50 : 0, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: position === 'center' ? 1.1 : 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay, layout: { duration: 0.3 } }}
                whileHover={{ scale: position === 'center' ? 1.15 : 1.05 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={`p-1.5 md:p-3 rounded-full ${position === 'center' ? 'bg-primary/20 text-primary animate-pulse' : 'bg-background/50 text-foreground'}`}>
                    {icon}
                </div>
                <div>
                    <h4 className="font-bold text-[9px] md:text-base text-foreground leading-tight">{title}</h4>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="text-[8px] md:text-xs text-muted-foreground mt-1 md:mt-2 leading-tight">{description}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};


export default function PredictiveFlowDiagram() {
    return (
        <div className="w-full py-8 md:py-12 px-2 md:px-4 relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-6xl h-auto min-h-[400px] md:min-h-[650px] grid grid-cols-3 gap-2 md:gap-8 items-center z-10">

                {/* Background Neon Arrows - Separated into 3 Sections */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0 flex flex-row items-center justify-between px-4 opacity-30 md:opacity-40">
                    {/* Left Section Arrow */}
                    <motion.div
                        className="w-[30%] h-3/4 bg-primary/20 clip-path-arrow-right backdrop-blur-sm shadow-[0_0_15px_rgba(var(--primary),0.5)] border-l border-primary/30 relative overflow-hidden"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20" />
                    </motion.div>

                    {/* Middle Section Arrow */}
                    <motion.div
                        className="w-[30%] h-3/4 bg-primary/20 clip-path-chevron backdrop-blur-sm shadow-[0_0_15px_rgba(var(--primary),0.5)] relative overflow-hidden"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20" />
                    </motion.div>

                    {/* Right Section Arrow */}
                    <motion.div
                        className="w-[30%] h-3/4 bg-primary/20 clip-path-chevron backdrop-blur-sm shadow-[0_0_15px_rgba(var(--primary),0.5)] relative overflow-hidden"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20" />
                    </motion.div>
                </div>

                {/* Input Column */}
                <div className="flex flex-col gap-4 md:gap-8 justify-center h-full py-2 md:py-6 order-1 items-center md:items-start">
                    <FlowCard
                        icon={<Database className="w-3 h-3 md:w-5 md:h-5" />}
                        title="Machine Information"
                        description="Specs, model details, and baseline parameters."
                        delay={0.1}
                        position="left"
                    />
                    <FlowCard
                        icon={<Wind className="w-3 h-3 md:w-5 md:h-5" />}
                        title="Working Conditions"
                        description="Environment telemetry: Temp, vibration, pressure."
                        delay={0.2}
                        position="left"
                    />
                    <FlowCard
                        icon={<History className="w-3 h-3 md:w-5 md:h-5" />}
                        title="Repair History"
                        description="Past maintenance logs and failure patterns."
                        delay={0.3}
                        position="left"
                    />
                    <FlowCard
                        icon={<LineChart className="w-3 h-3 md:w-5 md:h-5" />}
                        title="Monitoring"
                        description="Real-time performance tracking and anomaly detection."
                        delay={0.1}
                        position="left"
                    />
                </div>

                {/* Processing - Center */}
                <div className="flex flex-col items-center justify-center h-full relative order-2">
                    <FlowCard
                        icon={<Brain className="w-6 h-6 md:w-12 md:h-12" />}
                        title="AI Prediction Engine"
                        description="Multi-modal analysis processing inputs to predict outcomes."
                        delay={0}
                        position="center"
                    />
                </div>

                {/* Output Column */}
                <div className="flex flex-col gap-4 md:gap-8 justify-center h-full py-2 md:py-6 order-3 items-center md:items-end">
                    <FlowCard
                        icon={<CalendarClock className="w-3 h-3 md:w-5 md:h-5" />}
                        title="Future Predictions"
                        description="Forecasted failure dates and maintenance scheduling."
                        delay={0.2}
                        position="right"
                    />
                    <FlowCard
                        icon={<Wrench className="w-3 h-3 md:w-5 md:h-5" />}
                        title="Technical Guidance and Safty Guidance"
                        description="Step-by-step repair instructions and part list."
                        delay={0.3}
                        position="right"
                    />
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        </div>
    );
}
