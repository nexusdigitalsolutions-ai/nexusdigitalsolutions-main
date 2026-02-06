import { motion } from 'framer-motion';
import { FileText, Brain, FileCheck, Sparkles, Database, Layers } from 'lucide-react';

// Reusable Connector Component (Horizontal on Desktop, Vertical on Mobile)
const Connector = ({ delay = 0 }: { delay?: number }) => {
    return (
        <div className="relative flex-1 md:h-20 h-32 w-full md:w-auto flex items-center justify-center">
            {/* Desktop Line (Horizontal) */}
            <div className="hidden md:block w-full h-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/50 to-green-500/20 relative overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                    animate={{ x: [-100, 400] }}
                    transition={{ duration: 2, repeat: Infinity, delay, ease: "linear" }}
                />
            </div>

            {/* Mobile Line (Vertical) */}
            <div className="md:hidden h-full w-[2px] bg-gradient-to-b from-blue-500/20 via-purple-500/50 to-green-500/20 relative overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-blue-400 to-transparent"
                    animate={{ y: [-100, 200] }}
                    transition={{ duration: 2, repeat: Infinity, delay, ease: "linear" }}
                />
            </div>

            {/* Floating Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur border border-white/10 px-2 py-1 rounded text-[10px] text-gray-400 whitespace-nowrap">
                AI Processing
            </div>
        </div>
    );
};

export default function ProposalArchitectureDiagram() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    const nodeVariants = {
        hidden: { scale: 0.8, opacity: 0, y: 20 },
        visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
    };

    const pulseVariants = {
        idle: { scale: 1, boxShadow: "0 0 0px rgba(168, 85, 247, 0)" },
        pulse: {
            scale: 1.05,
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
            transition: { duration: 3, repeat: Infinity, repeatType: "reverse" as const }
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />

                {/* Background Wave Animation Arrows */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0 flex flex-col md:flex-row items-center justify-between px-4 py-4 md:py-0 opacity-30 md:opacity-40">

                    {/* 1. Left/Top Arrow */}
                    <motion.div
                        className="w-full md:w-[30%] h-[30%] md:h-3/4 bg-primary/20 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.3)] border-primary/30 relative overflow-hidden md:hidden block"
                        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)" }} // Arrow Down (Rotated Desktop Arrow)
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20" />
                    </motion.div>
                    <motion.div
                        className="hidden md:block w-[30%] h-3/4 bg-primary/20 clip-path-arrow-right backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.3)] border-l border-primary/30 relative overflow-hidden"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20" />
                    </motion.div>

                    {/* 2. Middle Chevron */}
                    <motion.div
                        className="w-full h-[30%] bg-purple-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)] relative overflow-hidden md:hidden block"
                        style={{ clipPath: "polygon(0% 0%, 50% 15%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)" }} // Chevron Down (Rotated Desktop Chevron)
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-500/20" />
                    </motion.div>
                    <motion.div
                        className="hidden md:block w-[30%] h-3/4 bg-purple-500/20 clip-path-chevron backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.3)] relative overflow-hidden"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-500/20" />
                    </motion.div>

                    {/* 3. Right/Bottom Chevron */}
                    <motion.div
                        className="w-full h-[30%] bg-green-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.3)] relative overflow-hidden md:hidden block"
                        style={{ clipPath: "polygon(0% 0%, 50% 15%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)" }} // Chevron Down (Rotated Desktop Chevron)
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 1.0 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-500/20" />
                    </motion.div>
                    <motion.div
                        className="hidden md:block w-[30%] h-3/4 bg-green-500/20 clip-path-chevron backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.3)] relative overflow-hidden"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 1.0 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-green-500/20" />
                    </motion.div>
                </div>

                {/* Flex Container */}
                <motion.div
                    className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* NODE 1: INPUT */}
                    <motion.div variants={nodeVariants} className="flex flex-col items-center text-center z-20">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 border border-blue-500/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            <FileText className="w-6 h-6 md:w-10 md:h-10 text-blue-400" />
                        </div>
                        <h3 className="text-sm md:text-lg font-bold text-blue-100">RFP Document</h3>
                        <p className="text-[10px] md:text-xs text-blue-300/70 mt-1 max-w-[120px]">Upload PDF, DOCX, or Excel</p>
                    </motion.div>

                    {/* CONNECTOR 1 */}
                    <Connector delay={0} />

                    {/* NODE 2: AI CORE */}
                    <motion.div variants={nodeVariants} className="flex flex-col items-center text-center z-20 relative">
                        <motion.div
                            variants={pulseVariants}
                            animate="pulse"
                            className="w-32 h-32 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-purple-900/60 via-purple-800/20 to-black border border-purple-500/30 flex flex-col items-center justify-center relative backdrop-blur-xl"
                        >
                            {/* Orbital Rings */}
                            <motion.div
                                className="absolute inset-0 -m-3 border border-purple-500/20 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-0 -m-6 border border-purple-500/10 rounded-full border-dashed"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />

                            <Brain className="w-8 h-8 md:w-16 md:h-16 text-purple-400 mb-2" />
                            <h3 className="text-xs md:text-xl font-bold text-white leading-tight">Reasoning<br />Engine</h3>

                            <div className="flex gap-2 mt-2">
                                <div className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-purple-200 border border-purple-500/20 flex items-center gap-1">
                                    <Sparkles className="w-2 h-2" /> GPT-4o
                                </div>
                            </div>
                        </motion.div>

                        {/* Core Steps Below */}
                        <div className="mt-4 md:mt-6 flex gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                                    <Layers className="w-4 h-4 text-purple-400" />
                                </div>
                                <span className="text-[10px] text-gray-400">Context</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                                    <Database className="w-4 h-4 text-purple-400" />
                                </div>
                                <span className="text-[10px] text-gray-400">Memory</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* CONNECTOR 2 */}
                    <Connector delay={1} />

                    {/* NODE 3: OUTPUT */}
                    <motion.div variants={nodeVariants} className="flex flex-col items-center text-center z-20">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/5 border border-green-500/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                            <FileCheck className="w-6 h-6 md:w-10 md:h-10 text-green-400" />
                        </div>
                        <h3 className="text-sm md:text-lg font-bold text-green-100">Proposal Plan</h3>
                        <p className="text-[10px] md:text-xs text-green-300/70 mt-1 max-w-[120px]">Scope, Estimates & Timeline</p>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}
