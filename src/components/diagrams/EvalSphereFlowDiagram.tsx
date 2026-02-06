import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Database, Bot, ShieldAlert, Scale, BarChart3, Layers, Zap, Workflow, Server, Activity } from 'lucide-react';
import { useMemo, useState } from 'react';

// --- Types & Data ---
type NodeType = 'core' | 'input' | 'output' | 'utility';

interface FlowNode {
    id: string;
    label: string;
    subLabel?: string;
    icon: React.ElementType;
    type: NodeType;
    x: number;
    y: number;
    delay: number;
    stats?: string;
    color: string;
}

const NODES: FlowNode[] = [
    // Center
    { id: 'core', label: 'GenAI SHAP Engine', subLabel: 'Context Retrieval & Contribution Analysis', icon: Brain, type: 'core', x: 50, y: 50, delay: 0, color: '#06b6d4' },

    // Top Semi-Circle
    { id: 'rag', label: 'RAG/Vector DB', subLabel: 'Knowledge Retrieval', icon: Database, type: 'utility', x: 35, y: 20, delay: 0.2, color: '#3b82f6' },
    { id: 'llm', label: 'LLM Service', subLabel: 'Test Case Generation', icon: Bot, type: 'utility', x: 65, y: 20, delay: 0.3, color: '#3b82f6' },

    // Left Inputs
    { id: 'test-gen', label: 'Automated Test Gen', subLabel: 'Generates Comprehensive Suites', icon: Zap, type: 'input', x: 15, y: 35, delay: 0.4, color: '#0ea5e9' },
    { id: 'workflow', label: 'Interactive Workflow', subLabel: 'Visual Builder', icon: Workflow, type: 'input', x: 15, y: 65, delay: 0.5, color: '#0ea5e9' },

    // Right Outputs
    { id: 'analytics', label: 'Deployment Analytics', subLabel: 'Performance Trends', icon: BarChart3, type: 'output', x: 85, y: 35, delay: 0.6, stats: '95/100', color: '#f59e0b' },
    { id: 'readiness', label: 'Readiness Score', subLabel: 'Production Verified', icon: ShieldAlert, type: 'output', x: 85, y: 65, delay: 0.7, stats: 'READY', color: '#10b981' },

    // Inner Quality Ring
    { id: 'resilience', label: 'Resilience', subLabel: 'Noise & Adversarial', icon: Layers, type: 'utility', x: 30, y: 60, delay: 0.5, color: '#8b5cf6' },
    { id: 'fairness', label: 'Fairness (Bias)', subLabel: 'Attention Distribution', icon: Scale, type: 'utility', x: 70, y: 60, delay: 0.6, color: '#8b5cf6' },

    // Components
    { id: 'arch', label: 'System Architecture', subLabel: 'React • Python • LangChain', icon: Server, type: 'utility', x: 50, y: 85, delay: 0.8, color: '#64748b' },
];

export default function EvalSphereFlowDiagram() {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const coreNode = NODES.find(n => n.id === 'core')!;
    const otherNodes = NODES.filter(n => n.id !== 'core');

    return (
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-slate-950 rounded-3xl border border-slate-800/50 overflow-hidden shadow-2xl backdrop-blur-xl group/diagram">
            {/* Dynamic Backgrounds */}
            <div className="absolute inset-0 bg-[#020617] opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),transparent_70%)] animate-pulse-slow" />
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

            {/* Rotating Cyber Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-cyan-500/10 rounded-full animate-spin-slow pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] h-[58%] border border-dashed border-cyan-500/10 rounded-full animate-spin-reverse-slower pointer-events-none" />

            {/* Connectivity Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                    <filter id="glow-path" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {otherNodes.map((node) => {
                    // Determine if this path should be highlighted, dimmed, or normal
                    let state = 'normal';
                    if (hoveredNode) {
                        if (hoveredNode === node.id || hoveredNode === 'core') state = 'highlighted';
                        else state = 'dimmed';
                    }

                    return (
                        <ConnectionPath
                            key={node.id}
                            start={node}
                            end={coreNode}
                            state={state}
                        />
                    );
                })}
            </svg>

            {/* Nodes Layer */}
            <div className="relative z-10 w-full h-full">
                {NODES.map((node) => (
                    <DiagramNode
                        key={node.id}
                        node={node}
                        isHovered={hoveredNode === node.id}
                        onHover={setHoveredNode}
                        dimmed={hoveredNode !== null && hoveredNode !== node.id && node.id !== 'core'}
                    />
                ))}
            </div>

            <FloatingParticles count={25} />
        </div>
    );
}

// --- High-Fidelity Components ---

function DiagramNode({
    node,
    isHovered,
    onHover,
    dimmed
}: {
    node: FlowNode,
    isHovered: boolean,
    onHover: (id: string | null) => void,
    dimmed: boolean
}) {
    const isCore = node.type === 'core';

    return (
        <motion.div
            className={`absolute flex flex-col items-center gap-3 cursor-pointer select-none transition-all duration-500
        ${isCore ? 'z-30' : 'z-20'}
        ${dimmed ? 'opacity-30 blur-[1px] scale-90' : 'opacity-100 scale-100'}
      `}
            style={{ left: `${node.x}%`, top: `${node.y}%`, x: '-50%', y: '-50%' }}
            onMouseEnter={() => onHover(node.id)}
            onMouseLeave={() => onHover(null)}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: node.delay, type: 'spring', damping: 12 }}
        >
            {/* Node Container */}
            <div className="relative group">
                {/* Holographic Ring Effect on Hover */}
                <AnimatePresence>
                    {(isHovered || isCore) && (
                        <motion.div
                            className={`absolute inset-[-20%] rounded-full border border-${isCore ? 'cyan' : 'blue'}-500/30`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, rotate: 180 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.8, repeat: isCore ? Infinity : 0, ease: "linear" }}
                        />
                    )}
                </AnimatePresence>

                {/* Main Icon Box */}
                <div
                    className={`
            relative flex items-center justify-center rounded-2xl backdrop-blur-md transition-all duration-300
            ${isCore
                            ? 'w-28 h-28 bg-slate-900/80 border-2 border-cyan-400/60 shadow-[0_0_60px_rgba(6,182,212,0.4)]'
                            : 'w-16 h-16 bg-slate-900/60 border border-slate-700 hover:border-cyan-400/80 hover:bg-slate-800'
                        }
            ${isHovered ? 'shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-110' : ''}
        `}
                >
                    {/* Core Inner Reactor */}
                    {isCore && (
                        <div className="absolute inset-2 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-xl animate-pulse-slow" />
                    )}

                    <node.icon
                        className={`
              relative z-10 transition-all duration-300
              ${isCore ? 'w-12 h-12 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-7 h-7'}
            `}
                        style={{ color: isCore ? undefined : node.color }}
                    />

                    {/* Stats Badge */}
                    {node.stats && (
                        <motion.div
                            className="absolute -top-3 -right-6 px-2.5 py-1 rounded-md bg-slate-950 border border-emerald-500/50 shadow-lg flex items-center gap-1.5"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <Activity className="w-3 h-3 text-emerald-400" />
                            <span className="text-[10px] font-bold text-emerald-400 tracking-wider">{node.stats}</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Label & Details */}
            <div className={`
         text-center transition-all duration-300 flex flex-col items-center
         ${isHovered ? 'translate-y-0' : 'translate-y-1'}
      `}>
                <span className={`
            font-bold leading-tight tracking-tight
            ${isCore ? 'text-xl text-white drop-shadow-md' : 'text-sm text-slate-200'}
         `}>
                    {node.label}
                </span>

                <div className={`
             overflow-hidden transition-all duration-300
             ${(isHovered || isCore) ? 'max-h-20 opacity-100 mt-1' : 'max-h-0 opacity-0'}
         `}>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-cyan-400/80 bg-cyan-950/30 px-2 py-0.5 rounded-full border border-cyan-800/30">
                        {node.subLabel}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

function ConnectionPath({ start, end, state }: { start: FlowNode, end: FlowNode, state: string }) {
    // Calculate simple path coords
    const isHighlighted = state === 'highlighted';
    const isDimmed = state === 'dimmed';

    const strokeColor = isHighlighted ? '#22d3ee' : start.color; // Cyan if highlighted
    // Convert percentage to coordinate space approx (100% -> 1000 units for safer SVG internal scaling if responsive)
    // But here we're using width/height=100%, so x1,y1 must be percentages.

    const width = isHighlighted ? 2.5 : 1.5;
    const opacity = isDimmed ? 0.05 : (isHighlighted ? 0.8 : 0.2);

    return (
        <>
            <motion.line
                x1={`${start.x}%`}
                y1={`${start.y}%`}
                x2={`${end.x}%`}
                y2={`${end.y}%`}
                stroke={strokeColor}
                strokeWidth={width}
                strokeOpacity={opacity}
                strokeLinecap="round"
                filter="url(#glow-path)"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: start.delay }}
            />

            {/* Moving Data Packet - Only active if not dimmed */}
            {!isDimmed && (
                <circle r={isHighlighted ? 3 : 2} fill={strokeColor}>
                    <animateMotion
                        dur={`${isHighlighted ? '1.5s' : '4s'}`}
                        repeatCount="indefinite"
                    // Note: SVG path for animateMotion needs absolute units or difficult scaling. 
                    // A simple CSS animation or keyframe is more robust for responsive % lines.
                    // However, animateMotion can work if we supply a path string.
                    // Percentages don't work well directly in 'path' attribute for animateMotion.
                    // We'll use a framer motion "animate" on xy to simulate it cleanly.
                    />
                </circle>
            )}

            {/* Fallback Motion Packet using Framer instead of SMIL for better responsive support */}
            {!isDimmed && (
                <motion.div
                    className="absolute w-1 h-1 rounded-full bg-current"
                    style={{
                        color: strokeColor,
                        left: 0,
                        top: 0
                    }}
                    animate={{
                        left: [`${start.x}%`, `${end.x}%`],
                        top: [`${start.y}%`, `${end.y}%`],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: isHighlighted ? 1.5 : 3 + Math.random(),
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                    }}
                />
            )}
        </>
    );
}

function FloatingParticles({ count }: { count: number }) {
    const particles = useMemo(() => Array.from({ length: count }), [count]);
    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-cyan-200 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -40],
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
}
